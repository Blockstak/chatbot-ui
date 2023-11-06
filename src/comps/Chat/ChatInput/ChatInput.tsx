import { TbReload } from "react-icons/tb";
import { HiXCircle } from "react-icons/hi";
import { useState, useLayoutEffect, useRef } from "react";
import { PaperAirplane, PaperClip } from "@/assets/icons";

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
              className="flex items-center justify-between p-4 border rounded-lg flex-grow font-medium"
            >
              <div className="flex gap-x-2">
                <TbReload className="cursor-pointer text-neutral-500 w-5 h-5 mt-1" />
                <div className="flex flex-col">
                  <span className="text-base">{file.name}</span>
                  <span className="text-base">Uploading...</span>
                </div>
              </div>

              <HiXCircle className="cursor-pointer text-neutral-500 w-6 h-6" />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className={`flex items-center gap-x-2 p-2 border rounded-lg mb-4`}>
        <textarea
          rows={1}
          ref={textbox}
          onChange={adjustHeight}
          placeholder="Ask me anything..."
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
      {/* {renderFiles()} */}
    </div>
  );
};

export default ChatInput;
