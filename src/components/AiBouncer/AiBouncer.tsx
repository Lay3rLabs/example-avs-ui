// AiBouncer.tsx
import React from "react";
import { JetBrains_Mono } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
});

interface Message {
  id: number;
  sender: "bouncer" | "user";
  timestamp: string;
  text: string;
  status?: string;
  statusColor?: "purple" | "green" | "red";
}

interface AiBouncerProps {
  messages: Message[];
}

const AiBouncer: React.FC<AiBouncerProps> = ({ messages }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[914px] bg-[#1e1e1e] rounded-lg border border-[#333] flex flex-col p-4 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-[#282c34] rounded-md border border-[#3a3d42] flex justify-center items-center">
          <span className="material-icons text-white">smart_toy</span>
        </div>
        <div className="flex flex-col">
          <div className="text-white text-lg font-semibold">NFT Bouncer</div>
          <div className="text-[#7b61ff]/90 text-sm font-medium">AI Agent</div>
        </div>
      </div>
      <div className="grid  grid-cols-4 p-8">
        <pre
          className="text-white text-sm"
          style={{
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          {`
 __  _.-'"\\-'-. 
/||\\'._ __{}_(  
||||  |'--.__\\  
|  L.(   o_\\o  
\\ .-' |   _ |  
| |   )\\___/   
|  \\-'\\\`:._]   
\\__/;      '-.
                    `}
        </pre>
        {/* Chat Area */}
        <div className="col-span-3">
          <div className="p-4 flex flex-col w-full space-y-4 overflow-y-auto h-[300px] max-h-[300px]">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{
                    opacity: 0,
                    x: message.sender === "bouncer" ? -20 : 20,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`flex ${
                    message.sender === "bouncer"
                      ? "justify-start"
                      : "justify-end"
                  } space-x-2`}
                >
                  {message.sender === "bouncer" && (
                    <div className="w-16 flex-shrink-0 flex items-center justify-center"></div>
                  )}
                  <div className="flex flex-col space-y-1 max-w-[75%]">
                    <div
                      className={`${jetBrainsMono.variable} font-mono text-xs text-[#aaa]`}
                    >
                      {message.timestamp}
                      <br />
                      {message.status && (
                        <span
                          style={
                            {
                              "--status-color":
                                message.statusColor === "purple"
                                  ? "rgba(123, 97, 255, 0.95)"
                                  : message.statusColor === "green"
                                  ? "rgba(57, 166, 153, 0.95)"
                                  : //@ts-expect-error Yellow
                                  message.statusColor === "yellow"
                                  ? "rgba(215, 147, 73, 0.95)"
                                  : message.statusColor === "red"
                                  ? "rgba(199, 62, 89, 0.95)"
                                  : "inherit", // fallback color
                            } as React.CSSProperties
                          }
                          className="text-[var(--status-color)]"
                        >
                          {message.status}
                        </span>
                      )}
                    </div>
                    <div className="flex">
                      <div
                        style={{ color: "rgba(243, 246, 248, 0.95)" }}
                        className={`${
                          jetBrainsMono.variable
                        } font-mono p-2 rounded-lg ${
                          message.sender === "bouncer"
                            ? "text-left"
                            : "text-right"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="w-full flex items-center space-x-2 mt-4">
            {/* Input Field for Responses */}
            <input
              type="text"
              placeholder="Ask me anything..."
              className="w-full px-4 py-2 bg-background-tertiary rounded-md border border-border-primary text-text-tertiary placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-[#7b61ff]/50"
            />
            <button className="px-3 py-2 bg-[#7b61ff] rounded-md text-white flex items-center justify-center hover:bg-[#624ecc] transition-colors duration-300">
              <span className="material-icons">send</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AiBouncer;
