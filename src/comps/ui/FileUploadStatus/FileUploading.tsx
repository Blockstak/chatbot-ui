import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

interface Props {
  file: File;
}

const FileUploading: React.FC<Props> = ({ file }) => {
  return (
    <div className="bg-daisy-bush-500 p-4 border border-neutral-400 rounded-lg mt-2 ">
      <div className="flex items-center justify-between ">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-neutral-200">
              <IoCloudUploadOutline className="w-5 h-5 text-[#F3F4F6]" />
            </span>
            <span className="text-base">{file.name}</span>
          </div>
        </div>

        <div className="font-medium flex items-center justify-end gap-1 w-40 text-[#FEF2F2]">
          <span>Uploading...</span>
        </div>
      </div>
      <div className="mt-2">100%</div>
    </div>
  );
};

export default FileUploading;
