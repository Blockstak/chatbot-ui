const suggestions = [
  "What is the purpose of life?",
  "What is the meaning of life?",
  "What is the meaning of life?",
  "What is the purpose of life?",
  "What is the meaning of life?",
  "What is the meaning of life?",
];

const Suggestions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center place-items-stretch gap-4">
      {suggestions.map((suggestion, index) => {
        return (
          <div
            key={index}
            className="px-4 py-6 hover:bg-neutral-700 cursor-pointer text-lg font-medium border rounded-lg"
          >
            {suggestion}
          </div>
        );
      })}
    </div>
  );
};

export default Suggestions;
