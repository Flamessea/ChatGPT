import React from "react";
import useTextarea from "../hooks/useTextarea";
import { ReactComponent as SendBtn } from "../svg/send_btn.svg";

const SendMessageInput: React.FC = () => {
  const { textareaRef } = useTextarea();
  return (
    <div className="absolute left-0 right-0 bottom-0 w-full">
      <div className="max-w-2xl m-auto">
        <form>
          <div></div>
          <div className="relative py-4 pl-2 flex flex-col flex-grow bg-gray-700 border border-black/10 rounded-xl shadow-md">
            <textarea
              ref={textareaRef}
              className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 pl-3 text-white outline-none"
              placeholder="Send a message"
              rows={1}
            ></textarea>
            <button className="absolute right-4 bottom-5 z-2">
              <SendBtn className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </form>
        <p className="text-gray-300 text-sm pt-3 pb-6">
          Free Research Preview. ChatGPT may produce inaccurate information
          about people, places, or facts.
        </p>
      </div>
    </div>
  );
};

export default SendMessageInput;
