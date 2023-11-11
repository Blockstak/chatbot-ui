import ChatContent from "./ChatContent";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

const ChatSpace = () => {
  const { chat } = useAppSelector((state) => state.chat);

  return (
    <div className="flex flex-col gap-y-2">
      {chat &&
        chat?.map((item, index) => (
          <ChatContent key={index} text={item.text} type={item.type} />
        ))}
    </div>
  );
};

export default ChatSpace;
