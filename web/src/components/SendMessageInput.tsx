import React, { useCallback, KeyboardEvent, ChangeEvent } from "react";
import useTextarea from "../hooks/useTextarea";
import { ReactComponent as SendBtnIcon } from "../svg/send_btn.svg";
import { useChat } from "../context/chat";
import Request from "../utils/request";

const request = new Request(process.env.BASE_URL);

const sendBtnBaseClasses =
  "w-[32px] h-[32px] rounded-md flex items-center justify-center";

const SendMessageInput: React.FC = () => {
  const {
    isFetching,
    inputValue,
    setInputValue,
    setMessages,
    setIsFetching,
    setIsInit,
    updateLastMessage,
  } = useChat();
  const { textareaRef, autoResizeTextarea } = useTextarea();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setInputValue(event.target.value);
  };

  const sendMessage = useCallback(
    async (content: string): Promise<void> => {
      if (!content || isFetching) return;
      setIsInit(false);
      setMessages("user", content);
      setInputValue("");
      setTimeout(() => {
        autoResizeTextarea();
      }, 0);
      setIsFetching(true);

      try {
        setMessages("chatbot", "");
        const res = await request.post("/chat", {
          message: content,
        });
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } =
            ((await reader?.read()) as
              | ReadableStreamReadResult<Uint8Array>
              | undefined) || {};
          if (done) {
            updateLastMessage("", true);
            break;
          }
          const { content } = JSON.parse(decoder.decode(value));
          if (content !== undefined) {
            updateLastMessage(content, done as boolean);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    },
    [
      isFetching,
      setInputValue,
      autoResizeTextarea,
      setMessages,
      setIsFetching,
      setIsInit,
      updateLastMessage,
    ]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>): void => {
      if (
        !event.shiftKey &&
        event.key === "Enter" &&
        inputValue &&
        !isFetching
      ) {
        event.preventDefault();
        sendMessage(inputValue);
      }
    },
    [inputValue, isFetching, sendMessage]
  );

  const sendBtnClasses = inputValue
    ? `${sendBtnBaseClasses} bg-green-600 text-white`
    : `${sendBtnBaseClasses} text-gray-600`;

  return (
    <div className="absolute left-0 right-0 bottom-0 w-full bg-footer">
      <div className="max-w-3xl m-auto">
        <form>
          <div></div>
          <div className="relative py-4 pl-2 flex flex-col flex-grow bg-gray-700 border border-black/10 rounded-xl shadow-md bg-gray-800">
            <textarea
              value={inputValue}
              ref={textareaRef}
              className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 pl-3 text-white outline-none"
              placeholder="Send a message"
              rows={1}
              onKeyDown={handleKeyPress}
              onChange={handleChange}
            ></textarea>
            <button
              disabled={isFetching || !inputValue}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-2 text-white"
              onClick={() => sendMessage(inputValue)}
            >
              {isFetching ? (
                "..."
              ) : (
                <div className={sendBtnClasses}>
                  <SendBtnIcon className="w-4 h-4" />
                </div>
              )}
            </button>
          </div>
        </form>
        <p className="text-gray-300 text-sm pt-3 pb-6 text-center">
          Free Research Preview. ChatGPT may produce inaccurate information
          about people, places, or facts.
        </p>
      </div>
    </div>
  );
};

export default SendMessageInput;
