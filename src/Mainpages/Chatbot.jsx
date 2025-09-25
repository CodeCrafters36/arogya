// import React, { useState } from "react";
// import {
//   PaperAirplaneIcon,
//   XMarkIcon,
//   ChatBubbleOvalLeftEllipsisIcon,
//    ArrowUpCircleIcon,
// } from "@heroicons/react/24/solid";

// const API_KEY = "AIzaSyD207A1u4jMnqg8Khj7gD8kRdOG9WHaegQ";
// const API_URL =
//   "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
//   API_KEY;

// const SYSTEM_PROMPT = `
// You are Arogya, a warm and caring AI companion focused on mental well-being. 
// Your role is to actively listen and reply with empathy, encouragement, and practical advice.

// 📌 Response Style Guidelines:
// 1. **Always respond in structured points** (numbered or bulleted).  
// 2. **Use bold for key words/phrases** to make advice easy to scan.  
// 3. Begin with a short **empathetic acknowledgment**.  
// 4. Keep your tone **human-like, supportive, and friendly**.  
// 5. Provide **practical, actionable tips**.  
// 6. Keep answers concise (3–6 points max).  
// 7. Add a gentle **closing note of encouragement**. 
 
// `;

// function Chatbot() {
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text: "👋 Hi, I'm **Arogya**! How are you feeling today?",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   // ✅ Send message
//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               role: "user",
//               parts: [{ text: `${SYSTEM_PROMPT}\nUser: ${input}\nAI:` }],
//             },
//           ],
//         }),
//       });

//       const data = await response.json();
//       const reply =
//         data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "⚠️ Sorry, I couldn’t generate a response.";

//       setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bot",
//           text: "⚠️ Something went wrong. Please try again.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Floating Chat Button */}
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-lg transition"
//         >
//           <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
//         </button>
//       )}

//       {/* Chat Popup */}
//       {isOpen && (
//         <div className="fixed bottom-6 right-6 w-80 h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 flex justify-between items-center shadow">
//             <span className="font-semibold flex items-center gap-2">
//               🌱 Arogya
//             </span>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="hover:bg-white/20 rounded-full p-1 transition"
//             >
//               <XMarkIcon className="h-5 w-5" />
//             </button>
//           </div>

//           {/* Chat Window */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
//             {messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`flex ${
//                   msg.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-md leading-relaxed whitespace-pre-line
//                 ${
//                   msg.sender === "user"
//                     ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-none"
//                     : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
//                 }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}

//             {loading && (
//               <div className="flex justify-start">
//                 <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl text-sm text-gray-500 animate-pulse">
//                   Typing...
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Input */}
//           <div className="p-3 border-t flex items-center gap-2 bg-white">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button
//               onClick={sendMessage}
//               disabled={loading}
//               className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-full hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 transition"
//             >
//               <ArrowUpCircleIcon className="h-5 w-5 rotate-45" />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Chatbot;


import React, { useState } from "react";
import {
  XMarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const API_KEY = "AIzaSyD207A1u4jMnqg8Khj7gD8kRdOG9WHaegQ"; // ⚠️ Replace with your actual key
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
  API_KEY;

const SYSTEM_PROMPT = `
You are Arogya, a warm and caring AI companion focused on mental well-being.
You are a kind, supportive, and professional mental health counselor.  
Analyze the user's responses carefully.  

If you feel the user is in a very depressed or emergency situation,  
immediately advise them to call an SOS helpline or local emergency number first.  

Otherwise, generate a well-structured response in the following format.  
Please make sure each section is point-wise (with bullet points or numbers).  

============================
🆘 Emergency Note (if needed)
- Example: "If you feel unsafe or extremely depressed, please call SOS helpline: 9152987821 (India) or your local emergency number."

🗓️ Daily Planner
- Morning:
  • Simple healthy habits (e.g., drink water, affirmations, light exercise)  
- Afternoon:
  • Productive tasks (journaling, mindful eating, short walk)  
- Evening:
  • Relaxing activities (reading, connecting with loved ones)  
- Night:
  • Gratitude practice, meditation, proper sleep routine  

📚 Resource Hub
- Audiobooks:
  • "The Power of Now" by Eckhart Tolle  
  • "Atomic Habits" by James Clear  

- Articles & Guides:
  • [Article Title 1] - Short description  
  • [Article Title 2] - Short description  

- Videos:
  • [YouTube Video Title 1] - link  
  • [YouTube Video Title 2] - link  

- Meditation & Mindfulness:
  • Headspace app - Guided meditations  
  • Calm app - Sleep and relaxation techniques  

✅ Motivation
- 2–3 short motivational lines in point-wise format.
============================
`;

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi, I'm **Arogya!** 👋 How are you feeling today? I'm here to help with your health and wellness questions.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [animateOpen, setAnimateOpen] = useState(false);

  const openChat = () => {
    setIsOpen(true);
    setTimeout(() => setAnimateOpen(true), 50);
  };

  const closeChat = () => {
    setAnimateOpen(false);
    setTimeout(() => setIsOpen(false), 500);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        { sender: "bot", text: "⚠️ Something went wrong. Please try again." },
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
          onClick={openChat}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white p-4 rounded-full shadow-xl transition z-200"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
        </button>
      )}

      {/* Full-width Chat Popup */}
      {isOpen && (
        <div
          className={`fixed bottom-0 right-0 h-full w-full bg-white rounded-t-xl shadow-2xl z-100 flex flex-col border border-gray-200
                      transform transition-all duration-500 ease-in-out
                      ${animateOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white p-5 flex justify-between items-center shadow">
            <span className="font-extrabold text-xl flex items-center gap-2">
              ✨ Arogya – Your AI Health Assistant
            </span>
            <button
              onClick={closeChat}
              className="hover:bg-white/20 rounded-full p-2 transition"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Chat Window */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-end gap-3 max-w-[80%]">
                  {/* Icon */}
                  {msg.sender === "bot" && <span className="text-2xl">🤖</span>}
                  {msg.sender === "user" && (
                    <span className="text-2xl">👤</span>
                  )}

                  {/* Bubble */}
                  <div
                    className={`px-5 py-3 rounded-2xl text-lg font-bold shadow-md leading-relaxed whitespace-pre-line
                    ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white rounded-br-none"
                        : "bg-white/95 text-gray-900 rounded-bl-none border border-gray-300"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Typing animation */}
            {loading && (
              <div className="flex justify-start items-center gap-2">
                <span className="text-2xl">🤖</span>
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl text-lg font-bold text-gray-600">
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-300"></span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t flex items-center gap-3 bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="✨ Share your thoughts..."
              className="flex-1 border-2 rounded-full px-5 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white p-3 rounded-full hover:from-pink-600 hover:to-indigo-700 disabled:opacity-50 transition shadow-lg"
            >
              <ArrowUpCircleIcon className="h-7 w-7 rotate-45" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
