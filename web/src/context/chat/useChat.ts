import { useContext } from "react";
import { ChatContext } from "./Provider";

const useChat = () => {
  const chatContext = useContext(ChatContext);

  if (chatContext === undefined) {
    throw new Error("Chat context is undefined");
  }

  return chatContext;
};

export default useChat;
