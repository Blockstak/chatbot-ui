import React from "react";
import styles from "./Loader.module.scss";

const BarLoader = () => {
  return (
    <div className={` bg-primary-600 h-3 w-full rounded-lg overflow-hidden`}>
      <div
        className={`${styles.animateProgress} bg-daisy-bush-500 h-full w-3/5 rounded`}
      ></div>
    </div>
  );
};

export default BarLoader;
