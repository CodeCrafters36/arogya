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
  Heart,
  Zap
} from 'lucide-react';

const Layout = ({ user }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [resourceLibraryExpanded, setResourceLibraryExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

    const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
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

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
  };

  const toggleResourceLibrary = () => {
    setResourceLibraryExpanded(!resourceLibraryExpanded);
  };

  const getSectionTitle = (sectionId) => {
    const allItems = [
      ...sidebarItems,
      ...navbarItems,
      ...(sidebarItems.find(item => item.subItems)?.subItems || [])
    ];
    const item = allItems.find(item => item.id === sectionId);
    return item ? item.name : 'Dashboard';
  };

  const renderDashboardContent = () => {
    switch (activeSection) {
      case 'dashboard':
      default:  
      return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-br from-lavender-100 via-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200 shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome back, {user || 'Student'}!
                </h2>
              </div>
              <p className="text-gray-700 text-lg">How are you feeling today? Let's continue your wellness journey with some exciting activities!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-2xl hover:border-blue-300 transform hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Daily Mood</p>
                    <p className="text-4xl font-bold animate-pulse">😊</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  <p className="text-sm text-green-600 font-medium">Feeling positive</p>
                </div>
              </div>

              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-2xl hover:border-green-300 transform hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Streak</p>
                    <p className="text-4xl font-bold text-green-600 animate-bounce">7</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  <p className="text-sm text-green-600 font-medium">Days active</p>
                </div>
              </div>

              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-2xl hover:border-purple-300 transform hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Completed</p>
                    <p className="text-4xl font-bold text-purple-600">12</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                  <p className="text-sm text-purple-600 font-medium">Activities done</p>
                </div>
              </div>

              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-2xl hover:border-orange-300 transform hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Score</p>
                    <p className="text-4xl font-bold text-orange-600">85%</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                  <p className="text-sm text-orange-600 font-medium">Wellness score</p>
                </div>
              </div>
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
                  {item.route ? (
                    <Link to={item.route}>
                      <button
                        onClick={() => {
                          if (item.expandable) toggleResourceLibrary();
                          else handleSectionChange(item.id);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                          activeSection === item.id
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
                  ) : (
                    <button
                      onClick={() => {
                        if (item.expandable) toggleResourceLibrary();
                        else handleSectionChange(item.id);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                        activeSection === item.id
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
                  )}

                  {item.expandable && resourceLibraryExpanded && (
                    <ul className="mt-3 ml-4 space-y-2">
                      {item.subItems.map(subItem => {
                        const SubIcon = subItem.icon;
                        return (
                          <li key={subItem.id}>
                            <button
                              onClick={() => handleSectionChange(subItem.id, subItem.route)}
                              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                                activeSection === subItem.id
                                  ? 'bg-gradient-to-r from-green-400 to-blue-400 text-white shadow-md'
                                  : 'text-gray-600 hover:bg-purple-50 hover:shadow-sm'
                              }`}
                            >
                              <SubIcon className="w-4 h-4" />
                              <span className="text-sm">{subItem.name}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

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

            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-purple-200">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center rounded-full font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
                {user ? user.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="hidden lg:inline text-sm font-semibold text-gray-700 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{user || 'User'}</span>
            </div>
          </div>

          <div className="md:hidden">
            <button className="p-3 hover:bg-purple-100 rounded-xl transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {getSectionTitle(activeSection)}
            </h1>
            <p className="text-gray-600">Dashboard / {getSectionTitle(activeSection)}</p>
          </div>

          <div>{renderDashboardContent()}</div>
        </main>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }
      `}</style>
    </div>
  );
};

export default Layout;