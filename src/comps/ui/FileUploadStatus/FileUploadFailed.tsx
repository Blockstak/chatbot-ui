import React from "react";
import { FaFileCircleXmark } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";

interface Props {
  file: File;
  message: string;
}

const FileUploadFailed: React.FC<Props> = ({ file, message }) => {
  return (
    <div className="p-4 border border-red-500 rounded-lg mt-2">
      <div className="flex items-center justify-between ">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-neutral-200">
              <FaFileCircleXmark className="w-5 h-5 text-[#F3F4F6]" />
            </span>
            <span className="text-base">{file.name}</span>
          </div>
        </div>

        <div
          //   onClick={() => tryAgain(status ? status : "")}
          className="cursor-pointer select-none font-medium flex items-center justify-end gap-1 w-40 text-[#FEF2F2]"
        >
          <TbReload className="text-3xl  " />
          <span>Try again</span>
        </div>
      </div>
      <div className="">
        <p className={`text-sm italic text-gray-500 font-normal `}>{message}</p>
      </div>
    </div>
  );
};

export default FileUploadFailed;
