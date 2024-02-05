import React from "react";
import UploadedLoader from "../Loader/UploadedLoader";

interface Props {
  file: File;
}
const FileUploaded: React.FC<Props> = ({ file }) => {
  return (
    <div className="w-full p-4 border border-neutral-400 rounded-lg mt-2 ">
      <div className="flex justify-center -mt-2">
        <UploadedLoader />
      </div>
      <p className="text-base text-center">{file.name}</p>
    </div>
  );
};

export default FileUploaded;
