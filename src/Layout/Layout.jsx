


// import React, { useState } from 'react';
// import { 
//   Search, 
//   Home, 
//   Calendar, 
//   BookOpen, 
//   ChevronDown, 
//   ChevronRight,
//   Gamepad2,
//   Users,
//   MessageCircle,
//   AlertTriangle,
//   RotateCcw,
//   User,
//   Headphones,
//   FileText,
//   Video,
//   Brain,
//   Menu,
//   X
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const Layout = ({ user }) => {
//   const [activeSection, setActiveSection] = useState('dashboard');
//   const [resourceLibraryExpanded, setResourceLibraryExpanded] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const navigate = useNavigate();

//   // Sidebar items
//   const sidebarItems = [
//     { id: 'dashboard', name: 'Dashboard', icon: Home },
//     { id: 'daily-plan', name: 'Daily Plan / Challenges', icon: Calendar, route: '/planner' },
//     // { 
//     //   id: 'resource-library', 
//     //   name: 'Resource Library', 
//     //   icon: BookOpen, 
//     //   expandable: true,
//     //   subItems: [
//     //     { id: 'audio-books', name: 'Audio Books', icon: Headphones, route: '' },
//     //     { id: 'articles', name: 'Articles & Guides', icon: FileText, route: '' },
//     //     { id: 'videos', name: 'Videos', icon: Video, route: '' },
//     //     { id: 'meditation', name: 'Meditation', icon: Brain, route: '' }
//     //   ]
//     // }
//   ];

//   // Top navbar items with routes
//   const navbarItems = [
//     { id: 'game-zone', name: 'Game Zone', icon: Gamepad2, route: '/gamezone' },
//     { id: 'counsellor-connect', name: 'Counsellor Connect', icon: Users, route: '/expert' },
//     { id: 'peer-support', name: 'Peer Support', icon: MessageCircle, route: '/peersupport' },
//     { id: 'emergency', name: 'Emergency', icon: AlertTriangle, urgent: true, route: '/emergency' },
//     { id: 'retake-test', name: 'Retake Test', icon: RotateCcw, route: '/screening' },
//     { id: 'profile', name: 'Profile', icon: User, route: '/profile' }
//   ];

//   // Handle section change or navigation
//   const handleSectionChange = (sectionId, route = null) => {
//     if (route) {
//       navigate(route);
//     } else {
//       setActiveSection(sectionId);
//     }
//     setSidebarOpen(false);
//   };

//   const toggleResourceLibrary = () => {
//     setResourceLibraryExpanded(!resourceLibraryExpanded);
//   };

//   const getSectionTitle = (sectionId) => {
//     const allItems = [
//       ...sidebarItems,
//       ...navbarItems,
//       ...(sidebarItems.find(item => item.subItems)?.subItems || [])
//     ];
//     const item = allItems.find(item => item.id === sectionId);
//     return item ? item.name : 'Dashboard';
//   };

//   // Render main dashboard content for active section
//   const renderDashboardContent = () => {
//     switch (activeSection) {
//       case 'dashboard':
//         return (
//           <div className="space-y-6">
//             {/* Welcome */}
//             <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 Welcome back, {user || 'Student'}! 👋
//               </h2>
//               <p className="text-gray-600">How are you feeling today? Let's continue your wellness journey.</p>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Daily Mood</p>
//                     <p className="text-2xl font-bold text-blue-600">😊</p>
//                   </div>
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                     <Brain className="w-6 h-6 text-blue-600" />
//                   </div>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">Feeling positive</p>
//               </div>
//               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Streak</p>
//                     <p className="text-2xl font-bold text-green-600">7</p>
//                   </div>
//                   <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                     <Calendar className="w-6 h-6 text-green-600" />
//                   </div>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">Days active</p>
//               </div>
//               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Completed</p>
//                     <p className="text-2xl font-bold text-purple-600">12</p>
//                   </div>
//                   <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                     <BookOpen className="w-6 h-6 text-purple-600" />
//                   </div>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">Activities done</p>
//               </div>
//               <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-600">Score</p>
//                     <p className="text-2xl font-bold text-orange-600">85%</p>
//                   </div>
//                   <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
//                     <User className="w-6 h-6 text-orange-600" />
//                   </div>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">Wellness score</p>
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return (
//           <div className="space-y-6">
//             <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
//               <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <BookOpen className="w-10 h-10 text-gray-400" />
//               </div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 {getSectionTitle(activeSection)}
//               </h2>
//               <p className="text-gray-600">
//                 This section is under development. Content will be added soon!
//               </p>
//               <button 
//                 onClick={() => handleSectionChange('dashboard')}
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Back to Dashboard
//               </button>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
//         sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//       } lg:translate-x-0`}>
//         <div className="p-6 border-b border-gray-200 flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full font-bold">A</div>
//             <h2 className="text-xl font-bold text-gray-800">Arogya</h2>
//           </div>
//           <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <nav className="p-4">
//           <ul className="space-y-2">
//             {sidebarItems.map((item) => {
//               const IconComponent = item.icon;
//               return (
//                 <li key={item.id}>
//                   <button
//                     onClick={() => {
//                       if (item.expandable) toggleResourceLibrary();
//                       else handleSectionChange(item.id, item.route);
//                     }}
//                     className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
//                       activeSection === item.id
//                         ? 'bg-blue-100 text-blue-700 border border-blue-200'
//                         : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                   >
//                     <div className="flex items-center space-x-3">
//                       <IconComponent className="w-5 h-5" />
//                       <span className="font-medium">{item.name}</span>
//                     </div>
//                     {item.expandable && (
//                       resourceLibraryExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
//                     )}
//                   </button>

//                   {item.expandable && resourceLibraryExpanded && (
//                     <ul className="mt-2 ml-4 space-y-1">
//                       {item.subItems.map(subItem => {
//                         const SubIcon = subItem.icon;
//                         return (
//                           <li key={subItem.id}>
//                             <button
//                               onClick={() => handleSectionChange(subItem.id, subItem.route)}
//                               className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors ${
//                                 activeSection === subItem.id
//                                   ? 'bg-green-100 text-green-700 border border-green-200'
//                                   : 'text-gray-600 hover:bg-gray-50'
//                               }`}
//                             >
//                               <SubIcon className="w-4 h-4" />
//                               <span className="text-sm">{subItem.name}</span>
//                             </button>
//                           </li>
//                         )
//                       })}
//                     </ul>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="lg:ml-64 flex flex-col min-h-screen">
//         {/* Top Navbar */}
//         <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4 flex-1">
//             <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
//               <Menu className="w-5 h-5" />
//             </button>

//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input 
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={e => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           {/* Top navbar buttons */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navbarItems.map(item => {
//               const IconComponent = item.icon;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => handleSectionChange(item.id, item.route)}
//                   className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                     activeSection === item.id
//                       ? 'bg-blue-100 text-blue-700'
//                       : item.urgent
//                       ? 'text-red-600 hover:bg-red-50'
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`}
//                   title={item.name}
//                 >
//                   <IconComponent className={`w-4 h-4 ${item.urgent ? 'text-red-500' : ''}`} />
//                   <span className="hidden xl:inline">{item.name}</span>
//                 </button>
//               );
//             })}

//             {/* User */}
//             <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
//               <div className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full font-semibold text-sm">
//                 {user ? user.charAt(0).toUpperCase() : 'U'}
//               </div>
//               <span className="hidden lg:inline text-sm font-medium text-gray-700">{user || 'User'}</span>
//             </div>
//           </div>

//           {/* Mobile Navbar Menu */}
//           <div className="md:hidden">
//             <button className="p-2 hover:bg-gray-100 rounded-lg">
//               <User className="w-5 h-5" />
//             </button>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="flex-1 p-6">
//           {/* Breadcrumb */}
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold text-gray-800 mb-1">{getSectionTitle(activeSection)}</h1>
//             <p className="text-gray-600 text-sm">Dashboard / {getSectionTitle(activeSection)}</p>
//           </div>

//           <div className="animate-fadeIn">{renderDashboardContent()}</div>
//         </main>
//       </div>

//       {/* Fade-in Animation */}
//       <style jsx>{`
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-in-out;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Layout;




import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Home, Calendar, ChevronDown, ChevronRight, Gamepad2, Users, 
  MessageCircle, AlertTriangle, RotateCcw, User, Menu, X, Sparkles
} from 'lucide-react';

const Layout = ({ user }) => {
  const [resourceLibraryExpanded, setResourceLibraryExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, route: '/' },
    { id: 'daily-plan', name: 'Daily Plan / Challenges', icon: Calendar, route: '/planner' }
  ];

  const navbarItems = [
    { 
      id: 'game-zone', name: 'Game Zone', icon: Gamepad2, route: '/gamezone',
      bgGradient: 'from-purple-500 via-pink-500 to-red-500',
      shadowColor: 'shadow-purple-500/25'
    },
    { 
      id: 'counsellor-connect', name: 'Counsellor Connect', icon: Users, route: '/expert',
      bgGradient: 'from-blue-500 via-cyan-500 to-teal-500',
      shadowColor: 'shadow-blue-500/25'
    },
    { 
      id: 'peer-support', name: 'Peer Support', icon: MessageCircle, route: '/peersupport',
      bgGradient: 'from-green-500 via-emerald-500 to-lime-500',
      shadowColor: 'shadow-green-500/25'
    },
    { 
      id: 'emergency', name: 'Emergency', icon: AlertTriangle, urgent: true, route: '/emergency',
      bgGradient: 'from-red-500 via-orange-500 to-yellow-500',
      shadowColor: 'shadow-red-500/25'
    },
    { 
      id: 'retake-test', name: 'Retake Test', icon: RotateCcw, route: '/screening',
      bgGradient: 'from-indigo-500 via-purple-500 to-pink-500',
      shadowColor: 'shadow-indigo-500/25'
    },
    { 
      id: 'profile', name: 'Profile', icon: User, route: '/profile',
      bgGradient: 'from-slate-500 via-gray-500 to-zinc-500',
      shadowColor: 'shadow-slate-500/25'
    }
  ];

  const toggleResourceLibrary = () => {
    setResourceLibraryExpanded(!resourceLibraryExpanded);
  };

  const getSectionTitle = (path) => {
    const allItems = [...sidebarItems, ...navbarItems];
    const item = allItems.find(item => item.route === path);
    return item ? item.name : 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-purple-25 to-pink-50">
      {/* Sidebar + Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-white/95 backdrop-blur-md shadow-2xl border-r border-purple-200 z-50 transform transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-6 border-b border-purple-200 flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white text-purple-600 flex items-center justify-center rounded-full font-bold text-lg shadow-lg animate-pulse">A</div>
            <h2 className="text-2xl font-bold text-white">Arogya</h2>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <nav className="p-6">
          <ul className="space-y-3">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <Link to={item.route}>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                        location.pathname === item.route
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      {item.expandable && (
                        resourceLibraryExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main layout */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-3 hover:bg-purple-100 rounded-xl transition-colors">
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input 
                type="text"
                placeholder="Search your wellness journey..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Navbar Items */}
          <div className="hidden md:flex items-center space-x-2">
            {navbarItems.map(item => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.route)}
                  onMouseEnter={() => setHoveredButton(item.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  className={`relative flex items-center space-x-2 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-110 ${
                    location.pathname === item.route
                      ? `bg-gradient-to-r ${item.bgGradient} text-white shadow-xl ${item.shadowColor}`
                      : `text-gray-700 hover:bg-gradient-to-r ${item.bgGradient} hover:text-white hover:shadow-lg ${item.shadowColor}`
                  } ${hoveredButton === item.id ? 'animate-pulse' : ''}`}
                  title={item.name}
                >
                  <IconComponent className={`w-5 h-5 ${item.urgent ? 'animate-bounce' : ''}`} />
                  <span className="hidden xl:inline">{item.name}</span>
                  {item.urgent && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                  )}
                </button>
              );
            })}

            {/* User Avatar */}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-purple-200">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center rounded-full font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
                {user ? user.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="hidden lg:inline text-sm font-semibold text-gray-700 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{user || 'User'}</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {getSectionTitle(location.pathname)}
            </h1>
            <p className="text-gray-600">Dashboard / {getSectionTitle(location.pathname)}</p>
          </div>

          {/* 👉 Children components will render here via react-router */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
