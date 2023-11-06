import React from "react";
import ChatContent from "./ChatContent";

const ChatSpace = () => {
  return (
    <div className="">
      <ChatContent type="user" />
      <ChatContent />
      <ChatContent type="user" />
      <ChatContent />
      <ChatContent type="user" />
      <ChatContent />
      <ChatContent type="user" />
      <ChatContent />
    </div>
  );
};

export default ChatSpace;
