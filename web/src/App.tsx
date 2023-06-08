import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import SendMessageInput from "./components/SendMessageInput";
import MessageContent from "./components/MessageContent";
import Request from "./utils/request";

const request = new Request(process.env.BASE_URL);

const App: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([
    {
      id: "1",
      type: "me",
      data: {
        content: "say hello",
      },
    },
    {
      id: "2",
      type: "ai",
      data: {
        content: "hello",
      },
    },
  ]);
  useEffect(() => {
    const fetch = async () => {
      await request.get("/apis");
    };
    fetch();
  }, []);

  return (
    <div className="bg-body overflow-hidden w-full h-screen flex">
      <Sidebar />
      <div className="relative flex-1 overflow-hidden h-full">
        <main className="w-full h-full overflow-hidden overflow-y-auto">
          {messages.map((item: any) => (
            <MessageContent key={item.id} {...item} />
          ))}
        </main>
        <SendMessageInput />
      </div>
    </div>
  );
};

export default App;
