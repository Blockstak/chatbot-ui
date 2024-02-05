import React from "react";
import { PiSpinnerBold } from "react-icons/pi";
import BarLoader from "../Loader/BarLoader";

interface Props {
  file: File;
}

const FileProcessing: React.FC<Props> = ({ file }) => {
  return (
    <div className="p-4 border border-neutral-400 rounded-lg mt-2">
      <div className="flex items-center justify-between ">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-neutral-200">
              <PiSpinnerBold className="w-5 h-5 text-[#F3F4F6]" />
            </span>
            <span className="text-base">{file.name}</span>
          </div>
        </div>

        <div className="font-medium flex items-center justify-end gap-1 w-40 text-[#FEF2F2]">
          <span>Processing...</span>
        </div>
      </div>
      <div className="mt-2">
        <BarLoader />
      </div>
    </div>
  );
};

export default FileProcessing;
