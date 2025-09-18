import React, { useEffect, useState } from "react";
import Planner from "./Planner.jsx";
function GeminiCall({ responses }) {
  const [response, setResponse] = useState("");
  const [dailyPlanner, setDailyPlanner] = useState("");
  const [resources, setResources] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // Build QA string
  const qaText = responses
    .map((item, index) => `Q${index + 1}: ${item.question}\nA${index + 1}: ${item.answer}`)
    .join("\n\n");

  // Prompt Template
  const promptTemplate = `
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

Now here are the user's inputs:  
${qaText}
`;

  useEffect(() => {
    if (responses && responses.length > 0) {
      generateResponse();
    }
    // eslint-disable-next-line
  }, [responses]);

  const generateResponse = async () => {
    setLoading(true);
    setError("");
    setResponse("");
    setDailyPlanner("");
    setResources("");

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDRmHaxIE8N63Ir5ZIErkowbl6lak2gu0I",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: promptTemplate }],
              },
            ],
          }),
        }
      );

      const data = await res.json();

      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const fullResponse = data.candidates[0].content.parts[0].text;
        setResponse(fullResponse);

        // Split response into sections
        const dailyMatch = fullResponse.match(/🗓️ Daily Planner([\s\S]*?)📚 Resource Hub/);
        const resourcesMatch = fullResponse.match(/📚 Resource Hub([\s\S]*?)✅ Motivation/);

        const dailyText = dailyMatch ? dailyMatch[1].trim() : "";
        const resourcesText = resourcesMatch ? resourcesMatch[1].trim() : "";

        setDailyPlanner(dailyText);
        setResources(resourcesText);

        // Save to localStorage
        localStorage.setItem("dailyPlanner", dailyText);
        localStorage.setItem("resources", resourcesText);
        
      } else {
        setError("No response received from Gemini.");
      }
    } catch (err) {
      setError("Error fetching response: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Counselor's Guidance
      </h2>

      {loading && <p className="text-blue-500">Generating response...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {response && (
        <>
          {/* <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-line">
            <h3 className="font-semibold mb-2">Full Response:</h3>
            {response}
          </div> */}

          <div className="mt-4 p-4 bg-green-50 rounded-lg whitespace-pre-line">
            <h3 className="font-semibold mb-2">Daily Planner:</h3>
            {dailyPlanner}
          </div>

          <div className="mt-4 p-4 bg-yellow-50 rounded-lg whitespace-pre-line">
            <h3 className="font-semibold mb-2">Resources & Articles:</h3>
            {resources}
          </div>
        </>
      )}
    </div>
  );
}

export default GeminiCall;

