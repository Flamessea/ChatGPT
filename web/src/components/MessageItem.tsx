import React from "react";
import { ReactComponent as ChatGpt } from "../svg/chat_gpt.svg";
import { Message } from "../context/chat";

const baseClasses = "w-full text-white border-b border-black/10";

const MessageItem: React.FC<Message> = ({ sender, content, done }) => {
  const classes =
    sender === "chatbot"
      ? `${baseClasses} bg-gray-50`
      : `${baseClasses} bg-gray-800`;
  const messageIcon =
    sender === "chatbot" ? (
      <div className="w-[30px] h-[30px] rounded-sm bg-ai flex items-center justify-center">
        <ChatGpt className="w-[20px] h-[20px]" />
      </div>
    ) : (
      <div className="w-[30px] h-[30px] rounded-sm bg-yellow-500 flex items-center justify-center">
        Y
      </div>
    );

  return (
    <div className={classes}>
      <div className="max-w-3xl m-auto py-6 flex gap-4">
        <div className="flex-shrink-0">{messageIcon}</div>
        <div className=" leading-8">
          {content}
          {!done && (
            <span className="inline-flex w-[8px] h-[20px] bg-gray-200 ml-1 translate-y-1 animate-cursor" />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MessageItem);
