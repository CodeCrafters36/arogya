
// import React, { useState } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Heart,
//   Brain,
//   CheckCircle,
// } from "lucide-react";
// import GeminiCall from "../Mainpages/GeminiCall.jsx";
// import { toast, ToastContainer } from "react-toastify";

// // PHQ-9 (Depression) questions
// const phq9Questions = [
//   "Little interest or pleasure in doing things",
//   "Feeling down, depressed, or hopeless",
//   "Trouble falling or staying asleep, or sleeping too much",
//   "Feeling tired or having little energy",
//   "Poor appetite or overeating",
//   "Feeling bad about yourself — or that you are a failure",
//   "Trouble concentrating on things",
//   "Moving/speaking slowly or being fidgety",
//   "Thoughts that you would be better off dead",
// ];

// // GAD-7 (Anxiety) questions
// const gad7Questions = [
//   "Feeling nervous, anxious, or on edge",
//   "Not being able to stop or control worrying",
//   "Worrying too much about different things",
//   "Trouble relaxing",
//   "Being so restless that it is hard to sit still",
//   "Becoming easily annoyed or irritable",
//   "Feeling afraid as if something awful might happen",
// ];

// // Options
// const options = [
//   "Not at all",
//   "Several days",
//   "More than half the days",
//   "Nearly every day",
// ];
// import { useNavigate } from "react-router-dom";

// const MentalHealthScreener = () => {
//     const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [phq9Answers, setPhq9Answers] = useState(Array(9).fill(null));
//   const [gad7Answers, setGad7Answers] = useState(Array(7).fill(null));
//   const totalSteps = phq9Questions.length + gad7Questions.length;

//   const handleAnswer = (index, value, isPhq) => {
//     if (isPhq) {
//       const updated = [...phq9Answers];
//       updated[index] = value;
//       setPhq9Answers(updated);
//     } else {
//       const updated = [...gad7Answers];
//       updated[index] = value;
//       setGad7Answers(updated);
//     }
//   };

//   const getResults = () => {
//     const phq9Score = phq9Answers.reduce((a, b) => a + (b ?? 0), 0);
//     const gad7Score = gad7Answers.reduce((a, b) => a + (b ?? 0), 0);

//     const depressionLevel =
//       phq9Score <= 4
//         ? "Minimal"
//         : phq9Score <= 9
//         ? "Mild"
//         : phq9Score <= 14
//         ? "Moderate"
//         : phq9Score <= 19
//         ? "Moderately Severe"
//         : "Severe";

//     const anxietyLevel =
//       gad7Score <= 4
//         ? "Minimal"
//         : gad7Score <= 9
//         ? "Mild"
//         : gad7Score <= 14
//         ? "Moderate"
//         : "Severe";

//     return { phq9Score, gad7Score, depressionLevel, anxietyLevel };
//   };

//    const handleSavePlanner = () => {
//       toast.success("Planner saved successfully!"); // ✅ Show toast
//       setTimeout(() => {
//         navigate("/planner"); // ✅ Navigate after toast
//       }, 1500); // Delay to allow toast to show
//     };


//   // ✅ Combine all responses into one array
//   const getAllResponses = () => {
//     const phqResponses = phq9Questions.map((q, i) => ({
//       question: q,
//       response: phq9Answers[i] !== null ? options[phq9Answers[i]] : "Not answered",
//     }));

//     const gadResponses = gad7Questions.map((q, i) => ({
//       question: q,
//       response: gad7Answers[i] !== null ? options[gad7Answers[i]] : "Not answered",
//     }));

//     return [...phqResponses, ...gadResponses];
//   };

//   const isPhq = currentStep < phq9Questions.length;
//   const questionIndex = isPhq
//     ? currentStep
//     : currentStep - phq9Questions.length;

//   const question = isPhq
//     ? phq9Questions[questionIndex]
//     : gad7Questions[questionIndex];

//   const answers = isPhq ? phq9Answers : gad7Answers;

//   if (currentStep >= totalSteps) {
//     const results = getResults();
//     const responses = getAllResponses();
//   console.log("All Responses:", responses);
//     return (
//       <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl text-center">
//         <CheckCircle className="mx-auto w-12 h-12 text-green-500 mb-4" />
//         <h2 className="text-2xl font-bold mb-4">Screening Results</h2>
//         <div className="space-y-4 text-lg">
//           <p>
//             <Heart className="inline w-5 h-5 text-red-500 mr-2" />
//             <b>Depression:</b> {results.depressionLevel} ({results.phq9Score})
//           </p>
//           <p>
//             <Brain className="inline w-5 h-5 text-blue-500 mr-2" />
//             <b>Anxiety:</b> {results.anxietyLevel} ({results.gad7Score})
//           </p>
//         </div>

//         {/* 👇 Pass all responses to Gemini component */}
//         <div className="mt-6 text-left">
      
//           <GeminiCall responses={responses} />
//         </div>

//         <button
//           onClick={() => {
//             setCurrentStep(0);
//             setPhq9Answers(Array(9).fill(null));
//             setGad7Answers(Array(7).fill(null));
//           }}
//           className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
//         >
//           Restart
//         </button>
//      <button
//           onClick={handleSavePlanner}
//           className="mt-6 px-6 py-2 ml-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
//         >
//           Save the planner
//         </button>

//         <ToastContainer position="top-right" autoClose={1500} />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-bold flex items-center gap-2">
//           {isPhq ? (
//             <Heart className="w-6 h-6 text-red-500" />
//           ) : (
//             <Brain className="w-6 h-6 text-blue-500" />
//           )}
//           {isPhq ? "PHQ-9 (Depression)" : "GAD-7 (Anxiety)"}
//         </h2>
//         <span className="text-sm text-gray-600">
//           {currentStep + 1}/{totalSteps}
//         </span>
//       </div>

//       <p className="text-lg font-medium mb-4">{question}</p>

//       <div className="space-y-3">
//         {options.map((opt, i) => (
//           <button
//             key={i}
//             onClick={() => handleAnswer(questionIndex, i, isPhq)}
//             className={`w-full p-3 rounded-lg border text-left transition ${
//               answers[questionIndex] === i
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             {opt}
//           </button>
//         ))}
//       </div>

//       <div className="flex justify-between mt-6">
//         <button
//           onClick={() => setCurrentStep((s) => Math.max(s - 1, 0))}
//           disabled={currentStep === 0}
//           className="flex items-center gap-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
//         >
//           <ChevronLeft className="w-4 h-4" /> Back
//         </button>
//         <button
//           onClick={() => setCurrentStep((s) => s + 1)}
//           disabled={answers[questionIndex] === null}
//           className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
//         >
//           Next <ChevronRight className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MentalHealthScreener;




import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Brain,
  CheckCircle,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import GeminiCall from "../Mainpages/GeminiCall.jsx";
import { useNavigate } from "react-router-dom";

const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure",
  "Trouble concentrating on things",
  "Moving/speaking slowly or being fidgety",
  "Thoughts that you would be better off dead",
];

const gad7Questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

const options = [
  { label: "Not at all", desc: "0 days" },
  { label: "Several days", desc: "1–6 days" },
  { label: "More than half the days", desc: "7+ days" },
  { label: "Nearly every day", desc: "11+ days" },
];

const MentalHealthScreener = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [phq9Answers, setPhq9Answers] = useState(Array(9).fill(null));
  const [gad7Answers, setGad7Answers] = useState(Array(7).fill(null));
  const totalSteps = phq9Questions.length + gad7Questions.length;

  const handleAnswer = (index, value, isPhq) => {
    if (isPhq) {
      const updated = [...phq9Answers];
      updated[index] = value;
      setPhq9Answers(updated);
    } else {
      const updated = [...gad7Answers];
      updated[index] = value;
      setGad7Answers(updated);
    }
  };

  const getResults = () => {
    const phq9Score = phq9Answers.reduce((a, b) => a + (b ?? 0), 0);
    const gad7Score = gad7Answers.reduce((a, b) => a + (b ?? 0), 0);

    const depressionLevel =
      phq9Score <= 4
        ? "Minimal"
        : phq9Score <= 9
        ? "Mild"
        : phq9Score <= 14
        ? "Moderate"
        : phq9Score <= 19
        ? "Moderately Severe"
        : "Severe";

    const anxietyLevel =
      gad7Score <= 4
        ? "Minimal"
        : gad7Score <= 9
        ? "Mild"
        : gad7Score <= 14
        ? "Moderate"
        : "Severe";

    return { phq9Score, gad7Score, depressionLevel, anxietyLevel };
  };

  const handleSavePlanner = () => {
    toast.success("Planner saved successfully!");
    setTimeout(() => {
      navigate("/planner");
    }, 1500);
  };

  const getAllResponses = () => {
    const phqResponses = phq9Questions.map((q, i) => ({
      question: q,
      response:
        phq9Answers[i] !== null ? options[phq9Answers[i]].label : "Not answered",
    }));

    const gadResponses = gad7Questions.map((q, i) => ({
      question: q,
      response:
        gad7Answers[i] !== null ? options[gad7Answers[i]].label : "Not answered",
    }));

    return [...phqResponses, ...gadResponses];
  };

  const isPhq = currentStep < phq9Questions.length;
  const questionIndex = isPhq
    ? currentStep
    : currentStep - phq9Questions.length;

  const question = isPhq
    ? phq9Questions[questionIndex]
    : gad7Questions[questionIndex];

  const answers = isPhq ? phq9Answers : gad7Answers;
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  if (currentStep >= totalSteps) {
    const results = getResults();
    const responses = getAllResponses();
    return (
      <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-3xl text-center">
        <CheckCircle className="mx-auto w-16 h-16 text-emerald-500 mb-4" />
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Screening Results
        </h2>
        <div className="space-y-4 text-lg text-gray-700">
          <p>
            <Heart className="inline w-6 h-6 text-rose-500 mr-2" />
            <b>Depression:</b> {results.depressionLevel} ({results.phq9Score})
          </p>
          <p>
            <Brain className="inline w-6 h-6 text-sky-500 mr-2" />
            <b>Anxiety:</b> {results.anxietyLevel} ({results.gad7Score})
          </p>
        </div>

        <div className="mt-6 text-left">
          <GeminiCall responses={responses} />
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => {
              setCurrentStep(0);
              setPhq9Answers(Array(9).fill(null));
              setGad7Answers(Array(7).fill(null));
            }}
            className="px-6 py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition font-medium"
          >
            Restart
          </button>
          <button
            onClick={handleSavePlanner}
            className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-medium"
          >
            Save Planner
          </button>
        </div>

        <ToastContainer position="top-right" autoClose={1500} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
          {isPhq ? (
            <Heart className="w-6 h-6 text-rose-500" />
          ) : (
            <Brain className="w-6 h-6 text-sky-500" />
          )}
          {isPhq ? "PHQ-9 Assessment" : "GAD-7 Assessment"}
        </h2>
        <span className="text-sm text-gray-500">{progressPercent}% Complete</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
        <div
          className="h-2 bg-green-500 rounded-full transition-all"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Question */}
      <p className="text-base text-gray-600 mb-2">
        Over the last 2 weeks, how often have you been bothered by:
      </p>
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">{question}</h3>

      {/* Options */}
      <div className="space-y-4">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(questionIndex, i, isPhq)}
            className={`w-full flex justify-between items-center p-4 rounded-xl border transition font-medium ${
              answers[questionIndex] === i
                ? "bg-green-600 text-white border-green-600 shadow-md"
                : "bg-white hover:bg-sky-50 border-gray-300 text-gray-700"
            }`}
          >
            <span className="text-lg">{opt.label}</span>
            <span className="text-sm opacity-70">{opt.desc}</span>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentStep((s) => Math.max(s - 1, 0))}
          disabled={currentStep === 0}
          className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 font-medium"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={() => setCurrentStep((s) => s + 1)}
          disabled={answers[questionIndex] === null}
          className="flex items-center gap-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MentalHealthScreener;
