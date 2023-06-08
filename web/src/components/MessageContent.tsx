import React, { useMemo } from "react";

interface MessageProps {
  id: string;
  type: "me" | "ai";
  data: {
    content: string;
  };
}

const baseClasses = "w-full text-white";

const MessageContent: React.FC<MessageProps> = ({ type, data }) => {
  const classes = useMemo(() => {
    if (type === "ai") {
      return `${baseClasses} bg-gray-50`;
    }
    return `${baseClasses} bg-gray-800`;
  }, [type]);

  return (
    <div className={classes}>
      <div className="max-w-3xl m-auto py-6 flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-[30px] h-[30px] rounded-md bg-green-950"></div>
        </div>
        <div>{data.content}</div>
      </div>
    </div>
  );
};

export default MessageContent;
