import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Menu, Home, Users, User, AlertTriangle, Award, MessageCircle, X } from 'lucide-react';

const CollegeDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [floatingShapes, setFloatingShapes] = useState([]);

  // Sample data
  const studentInteractionData = [
    { day: 'Mon', students: 45 },
    { day: 'Tue', students: 52 },
    { day: 'Wed', students: 38 },
    { day: 'Thu', students: 61 },
    { day: 'Fri', students: 49 },
    { day: 'Sat', students: 33 },
    { day: 'Sun', students: 28 }
  ];

  const messages = [
    { id: 1, student: 'Rahul Sharma', message: 'Thank you for the anxiety management tips, feeling much better', time: '2 hours ago' },
    { id: 2, student: 'Priya Patel', message: 'The breathing exercises you suggested really helped during my panic attack', time: '4 hours ago' },
    { id: 3, student: 'Amit Kumar', message: 'Grateful for the mental health resources and counseling session', time: '6 hours ago' },
    { id: 4, student: 'Sneha Singh', message: 'Your support helped me overcome my social anxiety. Thank you!', time: '1 day ago' },
    { id: 5, student: 'Vikash Yadav', message: 'The stress management techniques are working great for me', time: '1 day ago' }
  ];

  const emergencyAlerts = [
    { id: 1, student: 'Anonymous', severity: 'High', time: '30 min ago' },
    { id: 2, student: 'Anonymous', severity: 'Medium', time: '2 hours ago' },
    { id: 3, student: 'Anonymous', severity: 'Low', time: '5 hours ago' }
  ];

  // Floating bubbles for theme
  useEffect(() => {
    const shapes = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      size: Math.random() * 30 + 15,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 5,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.2 + 0.1
    }));
    setFloatingShapes(shapes);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="-m-8 relative w-screen h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 flex flex-col">

      {/* Floating bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingShapes.map(shape => (
          <div
            key={shape.id}
            className="absolute rounded-full bg-purple-300"
            style={{
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              opacity: shape.opacity,
              animation: `floatBubble ${shape.duration}s ease-in-out ${shape.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes floatBubble {
          0% { transform: translateY(0); }
          100% { transform: translateY(-30px); }
        }
      `}</style>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white/90 backdrop-blur-md border-r border-gray-200 transition-all duration-300 z-50 shadow-lg ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center text-white">
                <User className="w-6 h-6"/>
              </div>
              <div>
                <p className="font-semibold text-gray-800">J.S. Thakur</p>
                <p className="text-gray-500 text-xs">Administrator</p>
              </div>
            </div>
            <button onClick={toggleSidebar} className="text-gray-700 hover:text-purple-600 transition">
              <X className="w-5 h-5"/>
            </button>
          </div>

          <nav className="space-y-4">
            <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-100 transition">
              <Home className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700 font-medium">Home</span>
            </a>
            <a href="/students" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-100 transition">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700 font-medium">Student List</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className={` transition-all w-full duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'} flex-1 flex flex-col overflow-y-auto scrollbar-none relative z-10`}>
        {/* Header */}
        <div className="flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-md rounded-xl shadow-md mb-4">
          <button onClick={toggleSidebar} className="p-2 rounded-lg bg-purple-100 hover:bg-purple-200 transition">
            <Menu className="w-6 h-6 text-purple-600"/>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex flex-left">Profile</h1>
            <p className="text-gray-500">Jabalpur Engineering College</p>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student Interactions Chart */}
          <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart className="w-6 h-6 mr-2 text-purple-600"/>
              Daily Student Interactions
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={studentInteractionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="day" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    color: 'black'
                  }}
                />
                <Bar dataKey="students" fill="#A78BFA" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Messages */}
          <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MessageCircle className="w-6 h-6 mr-2 text-purple-600"/>
              Recent Messages
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {messages.map(msg => (
                <div key={msg.id} className="bg-purple-50 rounded-lg p-3 hover:bg-purple-100 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-800 font-medium">{msg.student}</p>
                      <p className="text-gray-500 text-sm mt-1">{msg.message}</p>
                    </div>
                    <span className="text-purple-400 text-xs">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reward Points */}
          <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Award className="w-6 h-6 mr-2 text-purple-600"/>
              Reward Points
            </h3>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">2,847</div>
              <p className="text-gray-500 mb-4">Points Earned This Month</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-gray-800">156</div>
                  <div className="text-gray-500 text-sm">Students Helped</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-gray-800">92%</div>
                  <div className="text-gray-500 text-sm">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Alerts */}
          <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-purple-600"/>
              Emergency Alerts
            </h3>
            <div className="space-y-3">
              {emergencyAlerts.map(alert => (
                <div key={alert.id} className="bg-purple-50 rounded-lg p-3 hover:bg-purple-100 transition flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${alert.severity==='High'?'bg-red-500':alert.severity==='Medium'?'bg-yellow-500':'bg-green-500'} animate-pulse`}></div>
                    <div>
                      <p className="text-gray-800 font-medium">{alert.student}</p>
                      <p className="text-gray-500 text-sm">Depression Alert - {alert.severity} Priority</p>
                    </div>
                  </div>
                  <span className="text-purple-400 text-xs">{alert.time}</span>
                </div>
              ))}
              <button className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-2 px-4 rounded-lg hover:scale-105 transition">View All Alerts</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDashboard;
