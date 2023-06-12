export type Sender = "chatbot" | "user";

export interface Message {
  id: string;
  sender: Sender;
  content: string;
  done: boolean;
}

export interface ChatState {
  isInit: boolean;
  isFetching: boolean;
  inputValue: string;
  messages: Message[];
}

export interface ChatApi extends ChatState {
  setIsInit: (setIsInit: boolean) => void;
  setIsFetching: (isFetching: boolean) => void;
  setInputValue: (inputValue: string) => void;
  setMessages: (sender: Sender, content: string) => void;
  updateLastMessage: (content: string, done: boolean) => void;
}
