import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import { useNavigate } from "react-router-dom";

import { useNavigate } from "react-router-dom"; // <-- import useNavigate
const StudentListPage = () => {
  const [expandedStudents, setExpandedStudents] = useState([]);
  const [floatingShapes, setFloatingShapes] = useState([]);
  const navigate = useNavigate();

  // Generate floating bubble shapes
  useEffect(() => {
    const shapes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 50 + 20,
      duration: Math.random() * 25 + 10,
    }));
    setFloatingShapes(shapes);
  }, []);

  const students = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Student ${i + 1}`,
    branch: "Computer Science",
    year: "3rd Year",
    enrollment: `JEC2025${i + 1000}`,
    anxietyLevel: Math.floor(Math.random() * 100),
  }));

  const toggleExpand = (id) => {
    setExpandedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const pieColors = ["#A78BFA", "#E0E0E0"]; // Purple + Light Grey

  // Floating bubble component
  const FloatingBubble = ({ shape }) => (
    <div
      className="absolute pointer-events-none rounded-full bg-purple-300/20"
      style={{
        left: `${shape.x}%`,
        top: `${shape.y}%`,
        width: `${shape.size}px`,
        height: `${shape.size}px`,
        animation: `float ${shape.duration}s ease-in-out infinite alternate`,
      }}
    />
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-50 to-indigo-100 relative overflow-hidden p-6">
      {/* Floating Bubbles */}
      <div className="fixed inset-0 z-0">
        {floatingShapes.map((shape) => (
          <FloatingBubble key={shape.id} shape={shape} />
        ))}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-20px);
          }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center mb-6 relative z-10">
        <button
          onClick={() => window.history.back()}
          className="bg-white/50 hover:bg-white/70 text-purple-900 py-1 px-3 rounded-lg transition-all duration-200 mr-4"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-purple-900">
          Jabalpur Engineering College Students
        </h1>
      </div>

      {/* Student List */}
      <div className="flex flex-col gap-4 relative z-10">
        {students.map((student, index) => (
          <div
            key={student.id}
            className="bg-gradient-to-r from-purple-200/60 to-purple-400/50 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <p className="text-purple-900 font-semibold">{student.name}</p>
              <button
                onClick={() => toggleExpand(student.id)}
                className="text-purple-700 bg-white/30 hover:bg-white/50 py-1 px-3 rounded-lg transition-all duration-200"
              >
                {expandedStudents.includes(student.id) ? "Hide" : "Show More"}
              </button>
            </div>

            {expandedStudents.includes(student.id) && index < 6 && (
              <div className="mt-3 space-y-2 border-t border-white/30 pt-3">
                <p className="text-purple-800 text-sm">
                  <span className="font-semibold">Branch:</span> {student.branch}
                </p>
                <p className="text-purple-800 text-sm">
                  <span className="font-semibold">Year:</span> {student.year}
                </p>
                <p className="text-purple-800 text-sm">
                  <span className="font-semibold">Enrollment No.:</span>{" "}
                  {student.enrollment}
                </p>

                <div className="flex items-center justify-between mt-2">
                  <div className="w-20 h-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Anxiety", value: student.anxietyLevel },
                            { name: "Remaining", value: 100 - student.anxietyLevel },
                          ]}
                          innerRadius={20}
                          outerRadius={30}
                          dataKey="value"
                        >
                          {[
                            { name: "Anxiety", value: student.anxietyLevel },
                            { name: "Remaining", value: 100 - student.anxietyLevel },
                          ].map((entry, idx) => (
                            <Cell key={idx} fill={pieColors[idx]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <button onClick={() => navigate("/chat")} className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105">
                    Chat
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentListPage;
