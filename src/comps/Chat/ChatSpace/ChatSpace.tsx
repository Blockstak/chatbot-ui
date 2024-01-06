import { useRouter } from "next/router";
import ChatContent from "./ChatContent";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

const ChatSpace = () => {
  const router = useRouter();
  const topicId = router.query.id as unknown as number;
  const { chat } = useAppSelector((state) => state.chat);

  return (
    <div className="flex flex-col gap-y-2">
      {chat &&
        chat
          ?.filter((item) => item.topic === Number(topicId))
          .map((item, index) => (
            <ChatContent
              key={index}
              id={item.id}
              files={item.files}
              sources={item.sources}
              botText={item.botText ?? ""}
              userText={item.userText ?? ""}
              isStreaming={item.isStreaming ?? false}
            />
          ))}
    </div>
  );
};

export default ChatSpace;
