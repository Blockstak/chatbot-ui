import Suggestions from "../Suggestions";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useState, useLayoutEffect, useRef } from "react";
import { PaperAirplane, PaperClip } from "@/assets/icons";
import { HiOutlineInformationCircle, HiXCircle } from "react-icons/hi";

const ChatInput = () => {
  const textbox = useRef<HTMLTextAreaElement | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);

  function adjustHeight() {
    if (textbox?.current) {
      textbox.current.style.height = "inherit";
      textbox.current.style.height = `${textbox.current.scrollHeight}px`;
    }
  }

  useLayoutEffect(adjustHeight, []);

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
                <AiOutlineCloudUpload className="cursor-pointer text-neutral-200 w-5 h-5" />
                <div className="flex flex-col">
                  <span className="text-base">{file.name}</span>
                  <span className="text-base text-[#9CA3AF]">Uploading...</span>
                </div>
              </div>

              <HiXCircle className="cursor-pointer text-[#9CA3AF] w-6 h-6" />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className={`max-w-6xl mx-auto`}>
      <Suggestions />

      <div className={`${files && `border rounded-lg p-4`}`}>
        <div
          className={`flex items-center gap-x-2 p-2 ${
            !files && `border`
          } rounded-lg mb-4`}
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
              color="#a4a4fd"
              className="border-2 border-daisy-bush-300 w-10 h-10 rounded-lg p-2"
            />
          </label>

          <span onClick={() => console.log(files)}>
            <PaperAirplane className="bg-daisy-bush-300 w-10 h-10 rounded-lg p-2" />
          </span>

          <input
            multiple
            type="file"
            accept="pdf/*"
            id="upload-files"
            className="hidden"
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>

        {!files && (
          <div className="w-full p-5 bg-[#202020] rounded-lg justify-start items-center gap-3 inline-flex">
            <HiOutlineInformationCircle className="w-6 h-6 text-neutral-200" />
            <div className="text-gray-50 text-lg">
              You can upload multiple documents. We support .pdf, .json, .docx,
              .xls, and .rtf
            </div>
          </div>
        )}

        {renderFiles()}
      </div>
    </div>
  );
};

export default ChatInput;
