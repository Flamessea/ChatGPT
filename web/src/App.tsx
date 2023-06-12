import React from "react";
import Sidebar from "./components/Sidebar";
import ChatBox from "./components/ChatBox";
import { ChatProvider } from "./context/chat";

const App: React.FC = () => {
  return (
    <div className="bg-body overflow-hidden w-full h-screen flex">
      <Sidebar />
      <ChatProvider>
        <ChatBox />
      </ChatProvider>
    </div>
  );
};

export default App;
