import React from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { HiXCircle } from "react-icons/hi";

interface Props {
  file: File;
}

const FileProcessed: React.FC<Props> = ({ file }) => {
  return (
    <div className="p-4 border border-green-500 rounded-lg mt-2">
      <div className="grid grid-cols-4 items-center ">
        <div className="col-span-3 ">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-neutral-200">
              <AiOutlineFileDone className="w-5 h-5 text-[#F3F4F6]" />
            </span>
            <span className="text-base">{file.name}</span>
          </div>
          <p className={`text-sm italic text-[#FEF2F2] font-normal `}>
            This file is processed
          </p>
        </div>

        <div className="col-span-1 font-medium flex justify-end gap-1 text-[#FEF2F2]">
          <HiXCircle
            className="cursor-pointer text-[#9CA3AF] w-6 h-6"
            // onClick={() =>
            //   setFiles(Array.from(files).filter((f) => f.name !== file.name))
            // }
            // onClick={() =>
            //   setSelectedFiles(
            //     Array.from(selectedFiles).filter(
            //       (singleFile) => singleFile.file.name !== file.name
            //     )
            //   )
            // }
          />
        </div>
      </div>
    </div>
  );
};

export default FileProcessed;
