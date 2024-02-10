import { RiLoader4Fill } from "react-icons/ri";

const StaticLoader = () => {
  return (
    <div className="fixed bg-surface-primary overflow-hidden flex justify-center items-center top-0 bottom-0 left-0 right-0 z-[1000]">
      <RiLoader4Fill
        className="animate-spin text-5xl text-neutral-200 font-bold"
        data-testid="loading-svg"
      />
    </div>
  );
};

export default StaticLoader;
