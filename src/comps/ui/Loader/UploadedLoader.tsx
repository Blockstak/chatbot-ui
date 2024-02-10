import React from "react";

import Tik from "../../../../public/Tik.json";
import Lottie from "lottie-react";

const UploadedLoader = () => {
  return (
    <div>
      <Lottie className={`w-10 h-10`} animationData={Tik} loop={false} />
    </div>
  );
};

export default UploadedLoader;
