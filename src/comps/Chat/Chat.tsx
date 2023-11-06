import ChatInput from "./ChatInput";
import ChatSpace from "./ChatSpace";
import Suggestions from "./Suggestions";
import { useLayoutEffect, useRef } from "react";

const Chat = () => {
  const textbox = useRef<HTMLTextAreaElement | null>(null);

  function adjustHeight() {
    if (textbox?.current) {
      textbox.current.style.height = "inherit";
      textbox.current.style.height = `${textbox.current.scrollHeight}px`;
    }
  }

  useLayoutEffect(adjustHeight, []);

  return (
    <div className="text-neutral-200 w-full custom-container-2 flex flex-col justify-between relative">
      <ChatSpace />

      <div className="p-4 sticky bottom-0 bg-neutral-800">
        <ChatInput />
        {/* <Suggestions /> */}
      </div>
    </div>
  );
};

export default Chat;
