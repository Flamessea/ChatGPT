import React, { useState, createContext, PropsWithChildren } from "react";
import type { ChatState, ChatApi, Sender, Message } from "./types";
import { generateRandomString } from "../../utils";

const initState: ChatState = {
  isInit: true,
  isFetching: false,
  inputValue: "",
  messages: [],
};

export const ChatContext = createContext<ChatApi | undefined>(undefined);

export const ChatProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<ChatState>(() => ({ ...initState }));

  const setIsInit = (isInit: boolean) => {
    setState((prevState) => ({ ...prevState, isInit }));
  };

  const setIsFetching = (isFetching: boolean) => {
    setState((prevState) => ({ ...prevState, isFetching }));
  };

  const setInputValue = (inputValue: string) => {
    setState((prevState) => ({ ...prevState, inputValue }));
  };

  const setMessages = (sender: Sender, content: string, done?: boolean) => {
    setState(({ messages, ...otherState }) => ({
      ...otherState,
      messages: [
        ...messages,
        {
          id: generateRandomString(6),
          sender,
          content,
          done: sender === "user" ? true : (done as boolean),
        },
      ],
    }));
  };

  const updateLastMessage = (content: string, done: boolean) => {
    setState((prevState) => {
      const { messages, ...otherState } = prevState;
      const lastMessage = messages.pop();
      if (lastMessage && lastMessage.sender === "chatbot") {
        lastMessage.content += "" + content;
        lastMessage.done = done;
        messages.push(lastMessage as Message);
        return {
          ...otherState,
          messages,
        };
      }
      return prevState;
    });
  };

  return (
    <ChatContext.Provider
      value={{
        ...state,
        setInputValue,
        setIsInit,
        setIsFetching,
        setMessages,
        updateLastMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
