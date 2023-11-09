import { useRouter } from "next/router";
import Suggestions from "../Suggestions";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useProcessDocsMutation } from "@/api/chatbot/utilities";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";

import { PaperAirplane, PaperClip } from "@/assets/icons";
import { useUploadFilesMutation } from "@api/chatbot/files";

import {
  HiXCircle,
  HiCheckCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";

interface FilesObject {
  [key: string]: File;
}

const mapStatusToIcon = {
  idle: null,
  error: <HiXCircle className="w-5 h-5 text-[#F87171]" />,
  uploaded: <HiCheckCircle className="w-5 h-5 text-[#4ADE80]" />,
  uploading: <AiOutlineCloudUpload className="w-5 h-5 text-[#F3F4F6]" />,
};

const ChatInput = () => {
  const router = useRouter();
  const textbox = useRef<HTMLTextAreaElement | null>(null);
  const [files, setFiles] = useState<FileList | File[] | []>([]);
  const [uploadFilesMutation, result] = useUploadFilesMutation();
  const [processDocsMutation, processDocsResult] = useProcessDocsMutation();

  const [status, setStatus] = useState<
    "idle" | "uploading" | "uploaded" | "error" | "processing"
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

          // if (res) {
          //   const processDocsResponse = await processDocsMutation({
          //     id: res.id,
          //   }).unwrap();

          //   setStatus("processing");
          //   console.log(processDocsResponse);
          // }
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
                  {mapStatusToIcon[status as keyof typeof mapStatusToIcon]}
                </span>

                <div className="flex flex-col">
                  <span className="text-base">{file.name}</span>
                  <span className={`capitalize text-base text-[#9CA3AF]`}>
                    {status === "error" ? (
                      <span className="text-[#F87171]">
                        Failed to upload file.{" "}
                        <span className="text-white underline">Try again</span>
                      </span>
                    ) : (
                      status
                    )}
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
            placeholder="Upload some documents to get started"
            className={`p-4 focus:outline-none bg-transparent flex-grow outline-none resize-none w-[95%] overflow-hidden`}
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
            <span>
              <PaperAirplane className="bg-daisy-bush-300 w-10 h-10 rounded-lg p-2" />
            </span>
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
