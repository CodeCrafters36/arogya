import React, { useState } from "react";
import {
  PaperAirplaneIcon,
  XMarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
   ArrowUpCircleIcon,
} from "@heroicons/react/24/solid";

const API_KEY = "AIzaSyD207A1u4jMnqg8Khj7gD8kRdOG9WHaegQ";
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
  API_KEY;

const SYSTEM_PROMPT = `
You are Arogya, a warm and caring AI companion focused on mental well-being. 
Your role is to actively listen and reply with empathy, encouragement, and practical advice.

📌 Response Style Guidelines:
1. **Always respond in structured points** (numbered or bulleted).  
2. **Use bold for key words/phrases** to make advice easy to scan.  
3. Begin with a short **empathetic acknowledgment**.  
4. Keep your tone **human-like, supportive, and friendly**.  
5. Provide **practical, actionable tips**.  
6. Keep answers concise (3–6 points max).  
7. Add a gentle **closing note of encouragement**.  
`;

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi, I'm **Arogya**! How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${SYSTEM_PROMPT}\nUser: ${input}\nAI:` }],
            },
          ],
        }),
      });

      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ Sorry, I couldn’t generate a response.";

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-lg transition"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
        </button>
      )}

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 flex justify-between items-center shadow">
            <span className="font-semibold flex items-center gap-2">
              🌱 Arogya
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Window */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-md leading-relaxed whitespace-pre-line
                ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl text-sm text-gray-500 animate-pulse">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex items-center gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-full hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 transition"
            >
              <ArrowUpCircleIcon className="h-5 w-5 rotate-45" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
