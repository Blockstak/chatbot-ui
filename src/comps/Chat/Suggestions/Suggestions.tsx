import { HiOutlineRefresh } from "react-icons/hi";

const suggestions = [
  "What is the purpose of life?",
  "What is the meaning of life?",
  "What is the meaning of life?",
];

const Suggestions = () => {
  return (
    <div className="w-full">
      <div className="transition-colors duration-200 ease-in-out flex text-daisy-bush-300 hover:text-daisy-bush-500 font-medium gap-x-2 justify-end cursor-pointer">
        <HiOutlineRefresh className="w-6 h-6" />
        <span>Reload Suggestions</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center place-items-stretch gap-4 my-4">
        {suggestions.map((suggestion, index) => {
          return (
            <div
              key={index}
              className="px-4 py-6 hover:bg-neutral-900 cursor-pointer text-lg font-medium bg-[#202020] rounded-lg"
            >
              {suggestion}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Suggestions;
