import React, { useState, useEffect, useRef } from "react";

const ChatPage = ({ studentName = "Student Name", onBack }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "student", text: "Hello!" },
    { id: 2, sender: "admin", text: "Hi, how are you feeling today?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);

  // Scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Generate floating bubbles
  useEffect(() => {
    const bubblesArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 40 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 5, // faster animation
      delay: Math.random() * 5,          // stagger animation
      opacity: Math.random() * 0.2 + 0.1,
    }));
    setBubbles(bubblesArray);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, sender: "admin", text: newMessage },
    ]);
    setNewMessage("");
  };

  return (
    <div className=" -mx-8 -my-8 relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 overflow-hidden flex flex-col">

      {/* Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full bg-purple-300"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              opacity: bubble.opacity,
              animation: `floatBubble ${bubble.duration}s ease-in-out ${bubble.delay}s infinite alternate`,
            }}
          ></div>
        ))}
      </div>

      {/* Bubble Animation */}
      <style>{`
        @keyframes floatBubble {
          0% { transform: translateY(0); }
          100% { transform: translateY(-30px); }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => window.history.back()}
          className="bg-white shadow-sm hover:bg-gray-200 text-gray-700 py-1 px-3 rounded-lg transition duration-200 mr-4"
        >
          ← Back
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{studentName}</h1>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-xl shadow-inner flex flex-col">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end max-w-[70%] ${
              msg.sender === "admin" ? "self-end flex-row-reverse" : "self-start"
            }`}
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold shadow-md">
              {msg.sender === "admin" ? "A" : "S"}
            </div>

            {/* Message Bubble */}
            <div
              className={`px-4 py-2 rounded-2xl shadow-sm break-words ml-2 mr-2 ${
                msg.sender === "admin"
                  ? "bg-blue-300 text-gray-800"
                  : "bg-purple-300 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input Box */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white/90"
        />
        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-2xl transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
