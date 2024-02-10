import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

interface SingleFile {
  file: File;
  status: string;
  progress?: number;
}

interface FileUploadingProps {
  singleFile: SingleFile;
}

const FileUploading: React.FC<FileUploadingProps> = ({ singleFile }) => {
  return (
    <div className="p-4 border border-neutral-400 rounded-lg mt-2 relative overflow-hidden">
      {/* Progress bar as the first element to ensure it's in the background */}
      <div
        className="absolute top-0 left-0 bottom-0 bg-daisy-bush-500 z-0 progress-bar"
        style={{ width: `${singleFile.progress}%` }}
      ></div>

      {/* Wrap content in a container to control z-index relative to the progress bar */}
      <div className="relative z-10 ">
        <div className="grid grid-cols-3 items-center">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-neutral-200">
                <IoCloudUploadOutline className="w-5 h-5 text-[#F3F4F6]" />
              </span>
              <span className="text-base">{singleFile.file.name}</span>
            </div>
            <div className="mt-2 text-[#FEF2F2]">{"singleFile.progress"}%</div>
          </div>
          <div className=" col-span-1 font-medium flex items-center justify-end gap-1 w-40 text-[#FEF2F2]">
            <span>Uploading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploading;
