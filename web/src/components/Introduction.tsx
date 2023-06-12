import React from "react";
import { ReactComponent as ExamplesIcon } from "../svg/examples.svg";
import { ReactComponent as CapabilitiesIcon } from "../svg/capabilities.svg";
import { ReactComponent as LimitationsIcon } from "../svg/limitations.svg";
import { useChat } from "../context/chat";

const examples: string[] = [
  "Explain quantum computing in simple terms",
  "Got any creative ideas for a 10 year old’s birthday?",
  "How do I make an HTTP request in Javascript?",
];

const capabilities: string[] = [
  "Remembers what user said earlier in the conversation",
  "Allows user to provide follow-up corrections",
  "Trained to decline inappropriate requests",
];

const limitations: string[] = [
  "May occasionally generate incorrect information",
  "May occasionally produce harmful instructions or biased content",
  "Limited knowledge of world and events after 2021",
];

const Introduction: React.FC = () => {
  const { setInputValue } = useChat();

  return (
    <div className="w-full h-full flex flex-col items-center text-white mt-[20vh]">
      <h1 className="text-4xl font-bold mb-10">ChatGPT</h1>
      <div className="grid grid-cols-3 gap-4 max-w-3xl text-center">
        <div>
          <h5 className="text-lg font-semibold my-4 flex flex-col items-center">
            <ExamplesIcon className="w-[25px] h-[25px] mb-4" />
            Examples
          </h5>
          <ul className="text-sm space-y-4">
            {examples.map((content, index) => (
              <li
                key={index}
                className="rounded-md bg-gray-500/10 p-4 hover:bg-black/40"
              >
                <button onClick={() => setInputValue(content)}>
                  "{content}" →
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-lg font-semibold my-4 flex flex-col items-center">
            <CapabilitiesIcon className="w-[25px] h-[25px] mb-4" />
            Capabilities
          </h5>
          <ul className="text-sm space-y-4">
            {capabilities.map((content, index) => (
              <li key={index} className="rounded-md bg-gray-500/10 p-4">
                {content}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-lg font-semibold my-4 flex flex-col items-center">
            <LimitationsIcon className="w-[25px] h-[25px] mb-4" />
            Limitations
          </h5>
          <ul className="text-sm space-y-4">
            {limitations.map((content, index) => (
              <li key={index} className="rounded-md bg-gray-500/10 p-4">
                {content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
