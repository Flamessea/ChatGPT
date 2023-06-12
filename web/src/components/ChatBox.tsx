import React, { useState } from "react";
import SendMessageInput from "./SendMessageInput";
import MessageBox from "./MessageBox";
import Introduction from "./Introduction";
import { useChat } from "../context/chat";

const ChatBox: React.FC = () => {
  const { isInit } = useChat();
  return (
    <div className="relative flex-1 overflow-hidden h-full">
      {isInit ? <Introduction /> : <MessageBox />}
      <SendMessageInput />
    </div>
  );
};

export default ChatBox;
