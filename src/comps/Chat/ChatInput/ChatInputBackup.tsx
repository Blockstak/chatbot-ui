import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Suggestions from "../Suggestions";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useProcessDocsMutation } from "@/api/chatbot/utilities";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaFileCircleCheck } from "react-icons/fa6";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaFileCircleXmark } from "react-icons/fa6";
import { PiSpinnerBold } from "react-icons/pi";
import { IoCloudUploadOutline } from "react-icons/io5";

import { TbReload } from "react-icons/tb";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  ChangeEvent,
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

import {
  addChatContent,
  updateChatContent,
  setCurrentSources,
} from "@/state/slices/chatSlice";
import BarLoader from "@/comps/ui/Loader/BarLoader";
import UploadedLoader from "@/comps/ui/Loader/UploadedLoader";

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
    icon: <IoCloudUploadOutline className="w-5 h-5 text-[#F3F4F6]" />,
    message: "Uploading to server",
  },

  upload_failed: {
    icon: <FaFileCircleXmark className="w-5 h-5 text-[#F3F4F6]" />,
    message: "Upload Failed",
  },

  processing: {
    icon: <PiSpinnerBold className="w-5 h-5 text-[#F3F4F6]" />,
    message: "Processing",
  },

  processed: {
    icon: <AiOutlineFileDone className="w-5 h-5 text-[#F3F4F6]" />,
    message: "This file is processed",
  },

  process_failed: {
    icon: <HiXCircle className="w-5 h-5 text-[#F87171]" />,
    message: "Failed to process file. Try again",
  },
};

const ChatInputBackup = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(false);
  const [chat, chatResult] = useLazyChatQuery();
  const [uploaded, setUploaded] = useState(false);
  const [minimizeInputBar, setMinimizeInputBar] = useState(false);
  const topicId = router.query.id as unknown as number;
  const { data } = useGetFilesByTopicIdQuery(topicId as unknown as string, {
    skip,
  });

  const { viewSuggestions } = useAppSelector((state) => state.ui);

  const textbox = useRef<HTMLTextAreaElement | null>(null);
  const [files, setFiles] = useState<FileList | File[] | []>([]);
  const [fetchingChatResponse, setFetchingChatResponse] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("Upload some documents");
  const [uploadFilesMutation, uploadFilesResult] = useUploadFilesMutation();
  const [processDocsMutation, processDocsResult] = useProcessDocsMutation();

  interface FileWithId {
    file: File;
    fileId: string;
  }
  const [selectedFiles, setSelectedFiles] = useState<FileWithId[]>([]);

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

  type StatusObjType<T> = {
    [key: string]: T;
  };

  const [statusObj, setStatusObj] = useState<StatusObjType<any>>({});

  const adjustHeight = () => {
    if (textbox?.current) {
      textbox.current.style.height = "inherit";
      textbox.current.style.height = `${textbox.current.scrollHeight}px`;
    }
  };

  const uploadFiles = useCallback(
    async (files: FileList | []) => {
      setSkip(true);

      [...files].forEach(async (file, i) => {
        setStatus("uploading");

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
    console.log(action);

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
      setFiles([]);
      // setSelectedFiles([]);

      const chatId = uuidv4();

      dispatch(
        addChatContent({
          id: chatId,
          sources: null,
          userText: message,
          isStreaming: true,
          botText: "Typing...",
          topic: Number(topicId),
          // files: data ? data : null,
          files: data ? data : null,
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
              files: data ? data : null,
              sources: res.response_source,
              botText: res.response_message,
            })
          );

          setFetchingChatResponse(false);
        }
      } catch (error) {
        dispatch(
          updateChatContent({
            id: chatId,
            sources: null,
            files: data ? data : null,
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
        <div className="w-full flex flex-wrap justify-between gap-2 mt-2">
          {Array.from(files).map((file) => (
            <div
              key={file.name}
              className="flex basis-full md:basis-1/2 items-center justify-between p-4 border border-green-500 rounded-lg font-medium"
            >
              <div className="flex gap-x-2">
                <span className="cursor-pointer text-neutral-200">
                  {statusEnum[status]?.icon}
                </span>

                <div className="flex flex-col">
                  <span className="text-base">{file.name}</span>
                  <span
                    onClick={() => tryAgain(statusEnum[status]?.message ?? "")}
                    className={`inline-block text-sm italic text-[#F0FDF4] font-normal`}
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

  return (
    <div
      className={`${
        viewSuggestions ? "hidden" : "block"
      } max-w-6xl mx-auto bg-surface-secondary p-7 rounded-3xl relative`}
    >
      <div className={files && `border rounded-lg p-4 `}>
        <div
          className={`flex items-center gap-x-2 ${
            !files ? `border` : ``
          } rounded-lg`}
        >
          <textarea
            rows={1}
            ref={textbox}
            onChange={adjustHeight}
            placeholder={placeHolder}
            disabled={
              fetchingChatResponse || (data && data?.results?.length === 0)
            }
            onKeyDown={(e) => e.key === "Enter" && dispatch(initiateChat)}
            className={`disabled:pointer-events-none disabled:opacity-40 py-2 focus:outline-none bg-transparent flex-grow outline-none resize-none w-[95%] overflow-hidden`}
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
                  color={
                    files.length > 0 || (data && data?.results?.length > 0)
                      ? "#A4A4FD"
                      : "#1F2937"
                  }
                  className={`${
                    files.length > 0 || (data && data?.results?.length > 0)
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
            // onChange={handleFileSelect}
          />
        </div>
      </div>

      {/* {renderFiles()} */}
      <div
        className={`${
          minimizeInputBar ? "max-h-0" : "max-h-[300px]"
        } duration-300 overflow-hidden`}
      >
        {Array.from(files).length !== 0 && renderFiles()}
      </div>

      {Array.from(files).length === 0 && data?.results?.length === 0 && (
        <div className="my-4 w-full p-5 rounded-lg justify-start items-center gap-3 inline-flex">
          <HiOutlineInformationCircle className="w-6 h-6 text-neutral-200" />
          <div className="text-gray-50 text-lg">
            You can upload multiple documents. We support .pdf, .json, .docx,
            .xls, and .rtf
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="absolute -bottom-5 left-0 w-full text-center">
          <button
            onClick={() => setMinimizeInputBar(!minimizeInputBar)}
            className="bg-neutral-800 rounded-full p-1"
          >
            <MdKeyboardArrowDown className="text-daisy-bush-400 text-3xl rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatInputBackup;
