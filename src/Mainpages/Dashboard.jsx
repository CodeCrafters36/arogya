import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { BellIcon } from "@heroicons/react/24/outline";

const moodData = [
  { date: "Aug 10", happy: 6, neutral: 4, sad: 1 },
  { date: "Aug 11", happy: 5, neutral: 4, sad: 1 },
  { date: "Aug 12", happy: 7, neutral: 2, sad: 1 },
  { date: "Aug 13", happy: 4, neutral: 4, sad: 2 },
  { date: "Aug 14", happy: 6, neutral: 3, sad: 1 },
  { date: "Aug 15", happy: 7, neutral: 2, sad: 1 },
  { date: "Aug 16", happy: 8, neutral: 3, sad: 1 },
];

const emotionData = [
  { name: "Happy", value: 45, color: "#22c55e" },
  { name: "Neutral", value: 32, color: "#6b7280" },
  { name: "Anxious", value: 12, color: "#60a5fa" },
  { name: "Sad", value: 8, color: "#ef4444" },
];
import { useState,useEffect  } from "react";

function Dashboard() {
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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Arogya Dashboard</h1>
          <p className="text-gray-500">
            Personalized insights for better mental well-being
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <BellIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              3
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="user"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-sm text-gray-500">Welcome back,</p>
              <p className="text-gray-800 font-medium">Mohit</p>
            </div>
          </div>
        </div>
      </header>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mood Trends */}
        <div className="bg-white p-5 rounded-2xl shadow-sm col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Mood Trends</h2>
              <p className="text-sm text-gray-500">
                Your emotional journey over the last 7 days
              </p>
            </div>
            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
              Last 7 days
            </span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={moodData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="happy" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="neutral" stroke="#6b7280" strokeWidth={2} />
              <Line type="monotone" dataKey="sad" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Notifications */}
      <div className="bg-white p-5 rounded-2xl shadow-sm">
  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
    <span className="text-green-600">🔔</span> Notifications
  </h2>
  <ul className="space-y-4">
    
    {/* Therapist session */}
    <li className="p-4 border rounded-xl flex items-start gap-3 bg-green-50">
      <div className="text-green-600 text-xl">📅</div>
      <div className="flex-1">
        <p className="text-gray-700 font-medium">Therapist session tomorrow</p>
        <p className="text-sm text-gray-500">2025-09-18 10:00</p>
        <button className="mt-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
          Reminder
        </button>
      </div>
    </li>

    {/* Daily check-in */}
    <li className="p-4 border rounded-xl flex items-start gap-3">
      <div className="text-orange-500 text-xl">❤️</div>
      <div className="flex-1">
        <p className="text-gray-700 font-medium">Daily check-in: You haven't logged mood today</p>
        <p className="text-sm text-gray-500">Today</p>
        <button className="mt-2 text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
          Check-in
        </button>
      </div>
    </li>

    {/* New exercise */}
    <li className="p-4 border rounded-xl flex items-start gap-3">
      <div className="text-blue-500 text-xl">▶️</div>
      <div className="flex-1">
        <p className="text-gray-700 font-medium">New: Guided breathing exercise</p>
        <p className="text-sm text-gray-500">2025-09-15</p>
        <button className="mt-2 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          New content
        </button>
      </div>
    </li>
    
  </ul>
</div>

        {/* Wellness Score */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Wellness Score</h2>
          <div className="text-4xl font-bold text-green-500 mb-6">78%</div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Meditation</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full w-[70%]"></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Sleep 7+ hrs</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full w-[55%]"></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Journaling</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-400 h-2 rounded-full w-[40%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Emotion Distribution */}
                <div className="bg-white p-5 rounded-2xl shadow-sm">
            {/* Title with icon */}
            <h2 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
                <span className="text-green-600">💚</span> Emotion Distribution
            </h2>
            <p className="text-sm text-gray-500 mb-4">Your emotional patterns this week</p>

            {/* Donut Chart */}
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                <Pie
                    data={emotionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                    paddingAngle={2}
                >
                    {emotionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-y-2 mt-4 text-sm text-gray-600">
                {emotionData.map((e) => (
                <div key={e.name} className="flex items-center justify-between pr-4">
                    <div className="flex items-center gap-2">
                    <span
                        className="w-3 h-3 rounded-full"
                        style={{ background: e.color }}
                    ></span>
                    <span>{e.name}</span>
                    </div>
                    <span>{e.value}%</span>
                </div>
                ))}
            </div>
            </div>


        {/* Quick Actions */}
                <div className="bg-white p-5 rounded-2xl shadow-sm">
            {/* Heading */}
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-1">
                <span className="text-green-600">⚡</span> Quick Actions
            </h2>
            <p className="text-sm text-gray-500 mb-4">Start your wellness journey</p>

            {/* Actions */}
            <div className="space-y-3">
                {/* Start Meditation */}
                <button className="w-full flex items-center gap-2 bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700">
                <span className="text-lg">▶️</span>
                <span className="font-medium">Start Meditation</span>
                </button>

                {/* Log Mood */}
                <button className="w-full flex items-center gap-2 border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50">
                <span className="text-lg text-gray-500">🤍</span>
                <span className="font-medium">Log Mood</span>
                </button>

                {/* Schedule Session */}
                <button className="w-full flex items-center gap-2 border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50">
                <span className="text-lg text-gray-500">📅</span>
                <span className="font-medium">Schedule Session</span>
                </button>

                {/* Read Tips */}
                <button className="w-full flex items-center gap-2 border border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50">
                <span className="text-lg text-gray-500">📖</span>
                <span className="font-medium">Read Tips</span>
                </button>
            </div>
            </div>


        {/* Achievements */}
            <div className="bg-white p-5 rounded-2xl shadow-sm">
        {/* Title with icon */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-green-600">🏅</span> Achievements
        </h2>

        <div className="space-y-3">
            {/* 7-day Streak */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-yellow-50 border border-yellow-100">
            <div className="text-yellow-500 text-xl">🏅</div>
            <div>
                <p className="font-medium text-gray-800">7-day Streak</p>
                <p className="text-sm text-gray-500">Logged mood for 7 days</p>
            </div>
            </div>

            {/* Mindful Beginner */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 border border-blue-100">
            <div className="text-blue-500 text-xl">▶️</div>
            <div>
                <p className="font-medium text-gray-800">Mindful Beginner</p>
                <p className="text-sm text-gray-500">Completed 5 meditations</p>
            </div>
            </div>

            {/* Early Riser */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-50 border border-purple-100">
            <div className="text-purple-500 text-xl">🌙</div>
            <div>
                <p className="font-medium text-gray-800">Early Riser</p>
                <p className="text-sm text-gray-500">Tracked sleep for 10 nights</p>
            </div>
            </div>
        </div>
            </div>


        {/* daily task range  */}
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


      </div>
    </div>
  );
}

export default Dashboard;




