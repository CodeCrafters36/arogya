


// import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
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
//   X,
//   Sparkles,
//   Heart,
//   Zap,
// } from 'lucide-react';

// const Layout = ({ user }) => {
//   const [resourceLibraryExpanded, setResourceLibraryExpanded] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [hoveredButton, setHoveredButton] = useState(null);
//   const [activeSection, setActiveSection] = useState("dashboard"); // ✅ FIXED

//   const navigate = useNavigate();
//   const location = useLocation();

//   const sidebarItems = [
//     { id: 'dashboard', name: 'Dashboard', icon: Home, route: '/' },
//     { id: 'daily-plan', name: 'Daily Plan / Challenges', icon: Calendar, route: '/planner' }
//   ];

//   const navbarItems = [
//     { id: 'game-zone', name: 'Game Zone', icon: Gamepad2, route: '/gamezone', bgGradient: 'from-purple-500 via-pink-500 to-red-500', shadowColor: 'shadow-purple-500/25' },
//     { id: 'counsellor-connect', name: 'Counsellor Connect', icon: Users, route: '/expert', bgGradient: 'from-blue-500 via-cyan-500 to-teal-500', shadowColor: 'shadow-blue-500/25' },
//     { id: 'peer-support', name: 'Peer Support', icon: MessageCircle, route: '/peersupport', bgGradient: 'from-green-500 via-emerald-500 to-lime-500', shadowColor: 'shadow-green-500/25' },
//     { id: 'emergency', name: 'Emergency', icon: AlertTriangle, urgent: true, route: '/emergency', bgGradient: 'from-red-500 via-orange-500 to-yellow-500', shadowColor: 'shadow-red-500/25' },
//     { id: 'Take-test', name: 'Take Test', icon: RotateCcw, route: '/screening', bgGradient: 'from-indigo-500 via-purple-500 to-pink-500', shadowColor: 'shadow-indigo-500/25' },
//     { id: 'admin-section', name: 'Admin Section', icon: Headphones, route: '/college', bgGradient: 'from-indigo-500 via-purple-500 to-pink-500', shadowColor: 'shadow-indigo-500/25' },
//     { id: 'Home', name: 'Home', icon: User, route: '/', bgGradient: 'from-slate-500 via-gray-500 to-zinc-500', shadowColor: 'shadow-slate-500/25' }
//   ];

//   const handleSectionChange = (sectionId) => {
//     setActiveSection(sectionId);
//     setSidebarOpen(false);
//   };

//   const toggleResourceLibrary = () => {
//     setResourceLibraryExpanded(!resourceLibraryExpanded);
//   };

//   const getSectionTitle = (path) => {
//     const allItems = [...sidebarItems, ...navbarItems];
//     const item = allItems.find(item => item.route === path);
//     return item ? item.name : 'Dashboard';
//   };

//   const renderDashboardContent = () => {
//     switch (activeSection) {
//       case 'dashboard':
//       default:
//         return (
//           <div className="space-y-8 animate-fadeIn">
//             {/* ✅ Your dashboard cards kept unchanged */}
//             <div className="bg-gradient-to-br from-lavender-100 via-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200 shadow-lg">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
//                   <Sparkles className="w-6 h-6 text-white" />
//                 </div>
//                 <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   Welcome back, {user || 'Student'}!
//                 </h2>
//               </div>
//               <p className="text-gray-700 text-lg">How are you feeling today? Let's continue your wellness journey with some exciting activities!</p>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-purple-25 to-pink-50">
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
      
//       {/* ✅ SIDEBAR */}
//       <aside className={`fixed left-0 top-0 h-full w-64 bg-white shadow-2xl border-r border-purple-200 z-50 transform transition-all duration-300 ease-in-out ${
//         sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//       } lg:translate-x-0`}>
//         <div className="p-6 border-b border-purple-200 flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-white text-purple-600 flex items-center justify-center rounded-full font-bold text-lg">A</div>
//             <h2 className="text-2xl font-bold text-white">Arogya</h2>
//           </div>
//           <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-white/20 rounded-lg">
//             <X className="w-5 h-5 text-white" />
//           </button>
//         </div>

//         <nav className="p-6">
//           <ul className="space-y-3">
//             {sidebarItems.map((item) => {
//               const IconComponent = item.icon;
//               return (
//                 <li key={item.id}>
//                   <Link to={item.route}>
//                     <button
//                       onClick={() => handleSectionChange(item.id)}
//                       className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 ${
//                         activeSection === item.id
//                           ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
//                           : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-md'
//                       }`}
//                     >
//                       <div className="flex items-center space-x-3">
//                         <IconComponent className="w-5 h-5" />
//                         <span>{item.name}</span>
//                       </div>
//                     </button>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       </aside>

//       {/* ✅ MAIN CONTENT */}
//       <div className="lg:ml-64 flex flex-col min-h-screen">
//         <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-200 px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4 flex-1">
//             <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-3 hover:bg-purple-100 rounded-xl">
//               <Menu className="w-5 h-5" />
//             </button>

//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
//               <input 
//                 type="text"
//                 placeholder="Search your wellness journey..."
//                 value={searchQuery}
//                 onChange={e => setSearchQuery(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-400"
//               />
//             </div>
//           </div>

//           {/* Navbar buttons */}
//           <div className="hidden md:flex items-center space-x-2">
//             {navbarItems.map(item => {
//               const IconComponent = item.icon;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => navigate(item.route)}
//                   onMouseEnter={() => setHoveredButton(item.id)}
//                   onMouseLeave={() => setHoveredButton(null)}
//                   className={`relative flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 ${
//                     location.pathname === item.route
//                       ? `bg-gradient-to-r ${item.bgGradient} text-white shadow-xl ${item.shadowColor}`
//                       : `text-gray-700 hover:bg-gradient-to-r ${item.bgGradient} hover:text-white`
//                   }`}
//                 >
//                   <IconComponent className="w-5 h-5" />
//                   <span className="hidden xl:inline">{item.name}</span>
//                 </button>
//               );
//             })}
//             {/* <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-purple-200">
//               <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center rounded-full font-bold text-sm">
//                 {user ? user.charAt(0).toUpperCase() : 'U'}
//               </div>
//               <span className="hidden lg:inline font-semibold text-gray-700">{user || 'User'}</span>
//             </div> */}
//           </div>
//         </header>

//         <main className="flex-1 p-6">
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
//               {getSectionTitle(location.pathname)}
//             </h1>
//             <p className="text-gray-600">Dashboard / {getSectionTitle(location.pathname)}</p>
//           </div>
//           {renderDashboardContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Home, 
  Calendar, 
  BookOpen, 
  ChevronDown, 
  ChevronRight,
  Gamepad2,
  Users,
  MessageCircle,
  AlertTriangle,
  RotateCcw,
  User,
  Headphones,
  FileText,
  Video,
  Brain,
  Menu,
  X,
  Sparkles,
  Headphones as AudioIcon,
} from 'lucide-react';

const Layout = ({ user }) => {
  const [resourceLibraryExpanded, setResourceLibraryExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");

  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, route: '/' },
    { id: 'daily-plan', name: 'Daily Plan / Challenges', icon: Calendar, route: '/planner' },
    { id: 'resource-library', name: 'Resource Library', icon: BookOpen, isDropdown: true }
  ];

  const resourceSubItems = [
    { id: 'videos', name: 'Videos', icon: Video, route: '/videos' },
    { id: 'articles', name: 'Articles', icon: FileText, route: '/article' },
    { id: 'books', name: 'Books', icon: BookOpen, route: '/selfhelpbooks' },
    { id: 'audio', name: 'Audio', icon: AudioIcon, route: '/audio' },
  ];

  const navbarItems = [
    { id: 'game-zone', name: 'Game Zone', icon: Gamepad2, route: '/gamezone', bgGradient: 'from-purple-500 via-pink-500 to-red-500', shadowColor: 'shadow-purple-500/25' },
    { id: 'counsellor-connect', name: 'Counsellor Connect', icon: Users, route: '/expert', bgGradient: 'from-blue-500 via-cyan-500 to-teal-500', shadowColor: 'shadow-blue-500/25' },
    { id: 'peer-support', name: 'Peer Support', icon: MessageCircle, route: '/peersupport', bgGradient: 'from-green-500 via-emerald-500 to-lime-500', shadowColor: 'shadow-green-500/25' },
    { id: 'emergency', name: 'Emergency', icon: AlertTriangle, urgent: true, route: '/emergency', bgGradient: 'from-red-500 via-orange-500 to-yellow-500', shadowColor: 'shadow-red-500/25' },
    { id: 'Take-test', name: 'Take Test', icon: RotateCcw, route: '/screening', bgGradient: 'from-indigo-500 via-purple-500 to-pink-500', shadowColor: 'shadow-indigo-500/25' },
    { id: 'admin-section', name: 'Admin Section', icon: Headphones, route: '/college', bgGradient: 'from-indigo-500 via-purple-500 to-pink-500', shadowColor: 'shadow-indigo-500/25' },
    { id: 'Home', name: 'Home', icon: User, route: '/', bgGradient: 'from-slate-500 via-gray-500 to-zinc-500', shadowColor: 'shadow-slate-500/25' }
  ];

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
  };

  const toggleResourceLibrary = () => {
    setResourceLibraryExpanded(!resourceLibraryExpanded);
  };

  const getSectionTitle = (path) => {
    const allItems = [...sidebarItems, ...resourceSubItems, ...navbarItems];
    const item = allItems.find(item => item.route === path);
    return item ? item.name : 'Dashboard';
  };

  const renderDashboardContent = () => {
    switch (activeSection) {
      case 'dashboard':
      default:
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-br from-lavender-100 via-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome back, {user || 'Student'}!
                </h2>
              </div>
              <p className="text-gray-700 text-lg">
                How are you feeling today? Let's continue your wellness journey with some exciting activities!
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-purple-25 to-pink-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* ✅ SIDEBAR */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-white shadow-2xl border-r border-purple-200 z-50 transform transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-6 border-b border-purple-200 flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-500">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white text-purple-600 flex items-center justify-center rounded-full font-bold text-lg">A</div>
            <h2 className="text-2xl font-bold text-white">Arogya</h2>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-white/20 rounded-lg">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <nav className="p-6">
          <ul className="space-y-3">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;

              if (item.isDropdown) {
                return (
                  <li key={item.id}>
                    <button
                      onClick={toggleResourceLibrary}
                      className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 ${
                        resourceLibraryExpanded
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                      {resourceLibraryExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>

                    {/* Sub items */}
                    {resourceLibraryExpanded && (
                      <ul className="ml-6 mt-2 space-y-2">
                        {resourceSubItems.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <li key={sub.id}>
                              <Link to={sub.route}>
                                <button
                                  onClick={() => handleSectionChange(sub.id)}
                                  className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                                    location.pathname === sub.route
                                      ? 'bg-purple-100 text-purple-700 font-semibold'
                                      : 'text-gray-600 hover:bg-purple-50'
                                  }`}
                                >
                                  <SubIcon className="w-4 h-4" />
                                  <span>{sub.name}</span>
                                </button>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <Link to={item.route}>
                    <button
                      onClick={() => handleSectionChange(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                    </button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* ✅ MAIN CONTENT */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-3 hover:bg-purple-100 rounded-xl">
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input 
                type="text"
                placeholder="Search your wellness journey..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {/* Navbar buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {navbarItems.map(item => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.route)}
                  onMouseEnter={() => setHoveredButton(item.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  className={`relative flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    location.pathname === item.route
                      ? `bg-gradient-to-r ${item.bgGradient} text-white shadow-xl ${item.shadowColor}`
                      : `text-gray-700 hover:bg-gradient-to-r ${item.bgGradient} hover:text-white`
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="hidden xl:inline">{item.name}</span>
                </button>
              );
            })}
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {getSectionTitle(location.pathname)}
            </h1>
            <p className="text-gray-600">Dashboard / {getSectionTitle(location.pathname)}</p>
          </div>
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout;
