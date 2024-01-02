import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Suggestions from "../Suggestions";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useProcessDocsMutation } from "@/api/chatbot/utilities";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";

import { useLazyChatQuery } from "@api/chatbot/chat";
import { PaperAirplane, PaperClip } from "@/assets/icons";
import {
  useUploadFilesMutation,
  useGetFilesByTopicIdQuery,
} from "@api/chatbot/files";

import {
  HiXCircle,
  HiCheckCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";

import showAlert from "@/comps/ui/Alert/Alert";
import { RiLoader4Fill } from "react-icons/ri";
import { addChatContent, updateChatContent } from "@/state/slices/chatSlice";

interface FilesObject {
  [key: string]: File;
}

const statusEnum = {
  idle: null,
  error: {
    icon: <HiXCircle className="w-5 h-5 text-[#F87171]" />,
    message: "Failed to upload file. Try again",
  },

  uploaded: {
    icon: <HiCheckCircle className="w-5 h-5 text-[#34D399]" />,
    message: "Uploaded to server",
  },

  uploading: {
    icon: <AiOutlineCloudUpload className="w-5 h-5 text-[#F3F4F6]" />,
    message: "Uploading to server",
  },

  upload_failed: {
    icon: <HiXCircle className="w-5 h-5 text-[#F87171]" />,
    message: "Failed to upload file. Try again",
  },

  processing: {
    icon: <AiOutlineCloudUpload className="w-5 h-5 text-[#F3F4F6]" />,
    message: "Processing",
  },

  processed: {
    icon: <HiCheckCircle className="w-5 h-5 text-[#34D399]" />,
    message: "Processed",
  },

  process_failed: {
    icon: <HiXCircle className="w-5 h-5 text-[#F87171]" />,
    message: "Failed to process file. Try again",
  },
};

const ChatInput = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(false);
  const [chat, chatResult] = useLazyChatQuery();
  const [uploaded, setUploaded] = useState(false);
  const topicId = router.query.id as unknown as number;
  const { data, refetch } = useGetFilesByTopicIdQuery(
    topicId as unknown as string,
    {
      skip,
    }
  );

  const textbox = useRef<HTMLTextAreaElement | null>(null);
  const [files, setFiles] = useState<FileList | File[] | []>([]);
  const [fetchingChatResponse, setFetchingChatResponse] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("Upload some documents");
  const [uploadFilesMutation, uploadFilesResult] = useUploadFilesMutation();
  const [processDocsMutation, processDocsResult] = useProcessDocsMutation();

  const [status, setStatus] = useState<
    | "idle"
    | "error"
    | "uploaded"
    | "uploading"
    | "processed"
    | "processing"
    | "upload_failed"
    | "process_failed"
  >("idle");

  const adjustHeight = () => {
    if (textbox?.current) {
      textbox.current.style.height = "inherit";
      textbox.current.style.height = `${textbox.current.scrollHeight}px`;
    }
  };

  const uploadFiles = useCallback(
    async (files: FileList | []) => {
      setSkip(true);
      setStatus("uploading");

      [...files].forEach(async (file, i) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("topic", topicId as unknown as string);

        try {
          const res = await uploadFilesMutation(formData).unwrap();

          if (res) {
            setUploaded(true);
            setStatus("uploaded");

            try {
              setStatus("processing");
              setFetchingChatResponse(true);
              setPlaceHolder("Processing your documents");
              const processDocsResponse = await processDocsMutation({
                id: topicId,
              }).unwrap();

              if (processDocsResponse.msg === "Documents have processed!") {
                setStatus("processed");
                setFetchingChatResponse(false);
                setPlaceHolder("Ask a question");

                setSkip(false);
                showAlert(
                  "Files processed successfully. Start chatting!",
                  "success"
                );
              }
            } catch (error) {
              console.log(error);
              setStatus("process_failed");
              showAlert("File processing failed. Try again", "error");
            }
          }
        } catch (error) {
          console.log(error);
          setStatus("error");
          showAlert("File upload failed. Try again", "error");
        }
      });
    },
    [processDocsMutation, topicId, uploadFilesMutation]
  );

  useLayoutEffect(adjustHeight, []);

  useEffect(() => {
    if (files.length > 0 && uploaded === false) {
      uploadFiles((files as FileList) || []);
    }
  }, [files, uploadFiles, uploaded]);

  useEffect(() => {
    setPlaceHolder(
      data?.results && data?.results?.length > 0
        ? "Ask a question"
        : "Upload some documents"
    );
  }, [data?.results]);

  const tryAgain = async (action: string) => {
    if (action === "upload_failed") {
      showAlert("File re-upload feature pending", "info");
    } else if (action === "process_failed") {
      try {
        const processDocsResponse = await processDocsMutation({
          id: topicId,
        }).unwrap();

        setStatus("processing");
        console.log(processDocsResponse);
      } catch (error) {
        console.log(error);
        setStatus("process_failed");
      }
    } else {
      showAlert("Invalid action", "error");
    }
  };

  const initiateChat = async () => {
    if (textbox.current?.value) {
      const message = textbox.current.value;
      textbox.current.value = "";

      const chatId = uuidv4();

      dispatch(
        addChatContent({
          id: chatId,
          userText: message,
          isStreaming: true,
          botText: "Typing...",
          topic: Number(topicId),
        })
      );

      try {
        setFetchingChatResponse(true);
        const res = await chat({
          message: message,
          topicId,
        }).unwrap();

        if (res) {
          dispatch(
            updateChatContent({
              id: chatId,
              isStreaming: true,
              botText: res.response_message,
            })
          );

          setFetchingChatResponse(false);
        }
      } catch (error) {
        dispatch(
          updateChatContent({
            id: chatId,
            botText: "Failed to fetch response. Try again",
          })
        );

        setFetchingChatResponse(false);
      }
    }
  };

  const renderFiles = () => {
    if (files) {
      return (
        <div className="w-full flex flex-wrap justify-between gap-2">
          {Array.from(files).map((file) => (
            <div
              key={file.name}
              className="flex -mx-1 basis-full md:basis-1/2 items-center justify-between p-4 border rounded-lg font-medium"
            >
              <div className="flex gap-x-2">
                <span className="cursor-pointer text-neutral-200">
                  {statusEnum[status]?.icon}
                </span>

                <div className="flex flex-col">
                  <span className="text-base">{file.name}</span>
                  <span
                    onClick={() => tryAgain(statusEnum[status]?.message ?? "")}
                    className={`inline-block capitalize text-base text-[#9CA3AF]`}
                  >
                    {statusEnum[status]?.message}
                  </span>
                </div>
              </div>

              <HiXCircle
                className="cursor-pointer text-[#9CA3AF] w-6 h-6"
                onClick={() =>
                  setFiles(
                    Array.from(files).filter((f) => f.name !== file.name)
                  )
                }
              />
            </div>
          ))}
        </div>
      );
    }
  };

  const displayFiles = () => {
    if (data?.results) {
      return (
        <div className="w-full flex flex-wrap justify-between gap-2 my-1">
          {data?.results.map((file) => (
            <div
              key={file.file}
              className="flex -mx-1 basis-full md:basis-1/2 items-center justify-between p-4 border rounded-lg font-medium"
            >
              <div className="flex gap-x-2">
                <span className="cursor-pointer text-neutral-200">
                  {statusEnum["processed"]?.icon}
                </span>
                <div className="flex flex-col">
                  <span className="text-base">
                    {file.file.split("/").toReversed()[0].split("_").join(" ")}
                  </span>
                  <span className={`inline-block capitalize text-[#9CA3AF]`}>
                    {statusEnum["processed"]?.message}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className={`max-w-6xl mx-auto`}>
      {/* <Suggestions /> */}

      <div className={files && `border rounded-lg p-4`}>
        <div
          className={`flex items-center gap-x-2 mt-1 ${
            !files ? `border` : ``
          } rounded-lg `}
        >
          <textarea
            rows={1}
            ref={textbox}
            onChange={adjustHeight}
            placeholder={placeHolder}
            disabled={fetchingChatResponse}
            onKeyDown={(e) => e.key === "Enter" && dispatch(initiateChat)}
            className={`disabled:pointer-events-none disabled:opacity-40 p-4 focus:outline-none bg-transparent flex-grow outline-none resize-none w-[95%] overflow-hidden`}
          />

          {fetchingChatResponse ? (
            <RiLoader4Fill
              className="animate-spin text-4xl text-neutral-200 font-bold mb-2"
              data-testid="loading-svg"
            />
          ) : (
            <>
              <label htmlFor="upload-files" className="cursor-pointer">
                <PaperClip
                  color={files.length > 0 ? "#a4a4fd" : "#ffffff"}
                  className={`${
                    files.length > 0
                      ? `border-2 border-daisy-bush-300`
                      : `bg-daisy-bush-300`
                  } w-10 h-10 rounded-lg p-2`}
                />
              </label>
              {(files.length > 0 ||
                (data?.results && data?.results?.length > 0)) && (
                <button
                  disabled={fetchingChatResponse}
                  onClick={() => dispatch(initiateChat)}
                  className="cursor-pointer disabled:pointer-events-none"
                >
                  <PaperAirplane
                    className={`${
                      fetchingChatResponse ? `bg-gray-300` : `bg-daisy-bush-300`
                    } w-10 h-10 rounded-lg p-2 `}
                  />
                </button>
              )}
            </>
          )}

          <input
            multiple
            type="file"
            accept="pdf/*"
            id="upload-files"
            className="hidden"
            onChange={(e) => setFiles(e.target.files || [])}
          />
        </div>

        {renderFiles()}
        {displayFiles()}
      </div>

      {files.length === 0 && (
        <div className="mt-4 w-full p-5 bg-[#202020] rounded-lg justify-start items-center gap-3 inline-flex">
          <HiOutlineInformationCircle className="w-6 h-6 text-neutral-200" />
          <div className="text-gray-50 text-lg">
            You can upload multiple documents. We support .pdf, .json, .docx,
            .xls, and .rtf
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
