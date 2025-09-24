import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarAfterLogin from "../Mainpages/NavbarAfterLogin.jsx";
function Planner() {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedPlanner = localStorage.getItem("dailyPlanner");
    if (storedPlanner) {
      let tasks = [];
      try {
        tasks = JSON.parse(storedPlanner);
        if (!Array.isArray(tasks)) throw new Error("Not an array");
      } catch (e) {
        tasks = storedPlanner
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);
      }
      setDailyTasks(tasks);
      const count = tasks.filter((t) => t.startsWith("✔️")).length;
      setCompletedCount(count);
    }
  }, []);

  const toggleTask = (index) => {
    const updatedTasks = [...dailyTasks];
    updatedTasks[index] = updatedTasks[index].startsWith("✔️")
      ? updatedTasks[index].replace("✔️ ", "")
      : "✔️ " + updatedTasks[index];
    setDailyTasks(updatedTasks);

    const count = updatedTasks.filter((t) => t.startsWith("✔️")).length;
    setCompletedCount(count);
  };

  const saveTasks = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("dailyPlanner", JSON.stringify(dailyTasks));
      setLoading(false);
      toast.success("✅ Successfully saved!");
    }, 1000); // simulate loader for 1s
  };

  return (
    <>
      <NavbarAfterLogin />
    
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      {/* Toastify container */}
      <ToastContainer position="top-center" autoClose={2000} />

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Daily Wellness Planner
        </h1>
        <p className="text-gray-500 mt-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <span className="inline-block mt-3 bg-green-600 text-white text-sm px-4 py-1 rounded-full shadow">
          Today's Focus: Mindful Living
        </span>
      </div>

      {/* Daily Progress */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
          <span className="text-green-600 text-xl">✅</span> Daily Progress
        </h2>
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Completed Tasks</span>
          <span>
            {completedCount}/{dailyTasks.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-green-500 h-3 transition-all duration-300"
            style={{
              width: `${
                dailyTasks.length > 0
                  ? (completedCount / dailyTasks.length) * 100
                  : 0
              }%`,
            }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Keep going! You're{" "}
          {dailyTasks.length > 0
            ? Math.round((completedCount / dailyTasks.length) * 100)
            : 0}
          % there.
        </p>
      </div>

      {/* Morning Rituals Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
          <span className="text-yellow-500 text-xl">☀️</span> Morning Rituals
        </h2>
        {dailyTasks.length === 0 ? (
          <p className="text-gray-500 italic">
            No tasks for today. Complete your mental health screening to
            generate your planner.
          </p>
        ) : (
          <ul className="space-y-3">
            {dailyTasks.map((task, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer"
                onClick={() => toggleTask(index)}
              >
                <input
                  type="checkbox"
                  checked={task.startsWith("✔️")}
                  readOnly
                  className="w-5 h-5 accent-green-500"
                />
                <span
                  className={`text-gray-800 font-medium text-sm ${
                    task.startsWith("✔️") ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.replace("✔️ ", "")}
                </span>
              </li>
            ))}
          </ul>
        )}
        {/* Save Button */}
        {dailyTasks.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={saveTasks}
              disabled={loading}
              className={`px-6 py-2 rounded-lg shadow text-white transition ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 cursor-pointer"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Progress"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Planner;
