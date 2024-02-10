import React from "react";
import { FaFileCircleXmark } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";

interface SingleFile {
  file: File;
  status: string;
  progress?: number;
}

interface FileUploadingProps {
  singleFile: SingleFile;
}

const FileUploadFailed: React.FC<FileUploadingProps> = ({ singleFile }) => {
  return (
    <div className="p-4 border border-red-500 rounded-lg mt-2">
      <div className="grid grid-cols-4 items-center justify-between ">
        <div className="col-span-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-neutral-200">
              <FaFileCircleXmark className="w-5 h-5 text-[#F3F4F6]" />
            </span>
            <span className="text-base">{singleFile.file.name}</span>
          </div>
          <p className={`text-sm italic text-gray-500 font-normal`}>
            {singleFile.status === "upload_failed" && "Upload Failed"}
            {singleFile.status === "process_failed" && "Process Failed"}
            {singleFile.status === "error" && "Something Went Wrong"}
          </p>
        </div>

        <div
          //   onClick={() => tryAgain(status ? status : "")}
          className="col-span-1 flex justify-end"
        >
          <button className="font-medium  flex items-center gap-1 text-[#FEF2F2]">
            <TbReload className="text-3xl" />
            <span>Try again</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadFailed;
