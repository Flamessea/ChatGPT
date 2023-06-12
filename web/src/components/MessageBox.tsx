import React from "react";
import MessageItem from "./MessageItem";
import { useChat } from "../context/chat";

const MessageBox: React.FC = () => {
  const { messages } = useChat();

  return (
    <main className="w-full h-full overflow-hidden overflow-y-auto pb-[140px] scrollbar scrollbar-thumb-gray-100 scrollbar-track-gray-900 scrollbar-w-[10px] scrollbar-thumb-rounded-md">
      {messages.map((item: any) => (
        <MessageItem key={item.id} {...item} />
      ))}
    </main>
  );
};

export default MessageBox;
