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
import { useUploadFilesMutation } from "@api/chatbot/files";

import {
  HiXCircle,
  HiCheckCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";

import { addChatContent } from "@/state/slices/chatSlice";
import showAlert from "@/comps/ui/Alert/Alert";

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
    message: "Uploaded",
  },

  uploading: {
    icon: <AiOutlineCloudUpload className="w-5 h-5 text-[#F3F4F6]" />,
    message: "Uploading",
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
  const textbox = useRef<HTMLTextAreaElement | null>(null);
  const [files, setFiles] = useState<FileList | File[] | []>([]);
  const [uploadFilesMutation, result] = useUploadFilesMutation();
  const [fetchingchatResponse, setFetchingchatResponse] = useState(false);
  const [processDocsMutation, processDocsResult] = useProcessDocsMutation();
  const [chat, setChat] = useLazyChatQuery();

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

  const topicId = router.query.id as unknown as number;

  const adjustHeight = () => {
    if (textbox?.current) {
      textbox.current.style.height = "inherit";
      textbox.current.style.height = `${textbox.current.scrollHeight}px`;
    }
  };

  // const packFiles = useCallback(
  //   (myFiles: FileList | []) => {
  //     const fileInput = myFiles?.[0];

  //     const formData = new FormData();
  //     const filesObject: FilesObject = {};

  //     [...myFiles].forEach((file, i) => {
  //       filesObject[`file-${i}`] = file;
  //     });

  //     formData.append("file", fileInput);
  //     formData.append("files", JSON.stringify(filesObject));
  //     formData.append("topic", topicId as unknown as string);

  //     return formData;
  //   },
  //   [topicId]
  // );

  const uploadFiles = useCallback(
    async (files: FileList | []) => {
      setStatus("uploading");
      // const formData = packFiles(files || []);

      [...files].forEach(async (file, i) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("topic", topicId as unknown as string);

        console.log(formData.getAll("file"));

        try {
          const res = await uploadFilesMutation(formData).unwrap();
          setStatus("uploaded");

          if (res) {
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
          }
        } catch (error) {
          setStatus("error");
          console.log(error);
        }
      });
    },
    [processDocsMutation, topicId, uploadFilesMutation]
  );

  useLayoutEffect(adjustHeight, []);

  useEffect(() => {
    if (files.length > 0) uploadFiles((files as FileList) || []);
  }, [files, uploadFiles]);

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

      dispatch(
        addChatContent({
          text: message,
          type: "user",
        })
      );

      try {
        setFetchingchatResponse(true);

        const res = await chat({
          message: message,
          topicId,
        }).unwrap();

        if (res) {
          window.scrollTo(0, document.body.scrollHeight);

          dispatch(
            addChatContent({
              text: res?.response_message,
              type: "bot",
            })
          );

          setFetchingchatResponse(false);
        }
      } catch (error) {
        console.log(error);
        dispatch(
          addChatContent({
            text: "Something went wrong. Try again",
            type: "bot",
          })
        );

        setFetchingchatResponse(false);
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
                    className={`inline-block capitalize text-base text-[#9CA3AF]`}
                    onClick={() => tryAgain(statusEnum[status]?.message ?? "")}
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
    <div className={`max-w-6xl mx-auto`}>
      {/* <Suggestions /> */}

      <div className={`${files && `border rounded-lg p-4`}`}>
        <div
          className={`flex items-center gap-x-2 ${
            !files && `border`
          } rounded-lg `}
        >
          <textarea
            rows={1}
            ref={textbox}
            onChange={adjustHeight}
            disabled={fetchingchatResponse}
            placeholder="Upload some documents to get started"
            className={`disabled:pointer-events-none disabled:opacity-40 p-4 focus:outline-none bg-transparent flex-grow outline-none resize-none w-[95%] overflow-hidden`}
          />

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

          {files.length > 0 && (
            <button
              className="cursor-pointer"
              onClick={() => dispatch(initiateChat)}
            >
              <PaperAirplane className="bg-daisy-bush-300 w-10 h-10 rounded-lg p-2" />
            </button>
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
