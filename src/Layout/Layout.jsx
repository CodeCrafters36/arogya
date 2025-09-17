import React, { useState } from 'react';
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
  Bot,
  Headphones,
  FileText,
  Video,
  Brain,
  Menu,
  X
} from 'lucide-react';

const Layout = ({ user }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [resourceLibraryExpanded, setResourceLibraryExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'daily-plan', name: 'Daily Plan / Challenges', icon: Calendar },
    { 
      id: 'resource-library', 
      name: 'Resource Library', 
      icon: BookOpen, 
      expandable: true,
      subItems: [
        { id: 'audio-books', name: 'Audio Books', icon: Headphones },
        { id: 'articles', name: 'Articles & Guides', icon: FileText },
        { id: 'videos', name: 'Videos', icon: Video },
        { id: 'meditation', name: 'Meditation', icon: Brain }
      ]
    }
  ];

  const navbarItems = [
    { id: 'game-zone', name: 'Game Zone', icon: Gamepad2 },
    { id: 'counsellor-connect', name: 'Counsellor Connect', icon: Users },
    { id: 'peer-support', name: 'Peer Support', icon: MessageCircle },
    { id: 'emergency', name: 'Emergency', icon: AlertTriangle, urgent: true },
    { id: 'retake-test', name: 'Retake Test', icon: RotateCcw },
    { id: 'profile', name: 'Profile', icon: User }
  ];

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false); // Close mobile sidebar when item is selected
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
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome back, {user || 'Student'}! 👋
              </h2>
              <p className="text-gray-600">How are you feeling today? Let's continue your wellness journey.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Daily Mood</p>
                    <p className="text-2xl font-bold text-blue-600">😊</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Feeling positive</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Streak</p>
                    <p className="text-2xl font-bold text-green-600">7</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Days active</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-purple-600">12</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Activities done</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Score</p>
                    <p className="text-2xl font-bold text-orange-600">85%</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Wellness score</p>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Plan</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Morning meditation - 10 min</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Mood check-in</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Evening reflection</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleSectionChange('daily-plan')}
                    className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors"
                  >
                    <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-700">Daily Plan</span>
                  </button>
                  <button 
                    onClick={() => handleSectionChange('meditation')}
                    className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition-colors"
                  >
                    <Brain className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-700">Meditate</span>
                  </button>
                  <button 
                    onClick={() => handleSectionChange('game-zone')}
                    className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition-colors"
                  >
                    <Gamepad2 className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-700">Play Game</span>
                  </button>
                  <button 
                    onClick={() => handleSectionChange('counsellor-connect')}
                    className="p-4 bg-orange-50 rounded-lg text-center hover:bg-orange-100 transition-colors"
                  >
                    <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-700">Talk</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {getSectionTitle(activeSection)}
              </h2>
              <p className="text-gray-600">
                This section is under development. Content will be added soon!
              </p>
              <button 
                onClick={() => handleSectionChange('dashboard')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full font-bold">
                A
              </div>
              <h2 className="text-xl font-bold text-gray-800">Arogya</h2>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      if (item.expandable) {
                        toggleResourceLibrary();
                      } else {
                        handleSectionChange(item.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
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
                  
                  {item.expandable && resourceLibraryExpanded && (
                    <ul className="mt-2 ml-4 space-y-1">
                      {item.subItems.map((subItem) => {
                        const SubIconComponent = subItem.icon;
                        return (
                          <li key={subItem.id}>
                            <button
                              onClick={() => handleSectionChange(subItem.id)}
                              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-left transition-colors ${
                                activeSection === subItem.id
                                  ? 'bg-green-100 text-green-700 border border-green-200'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <SubIconComponent className="w-4 h-4" />
                              <span className="text-sm">{subItem.name}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button & Search */}
            <div className="flex items-center space-x-4 flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Navbar Items */}
            <div className="hidden md:flex items-center space-x-1">
              {navbarItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : item.urgent
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    title={item.name}
                  >
                    <IconComponent className={`w-4 h-4 ${item.urgent ? 'text-red-500' : ''}`} />
                    <span className="hidden xl:inline">{item.name}</span>
                  </button>
                );
              })}
              
              {/* User Profile */}
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full font-semibold text-sm">
                  {user ? user.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="hidden lg:inline text-sm font-medium text-gray-700">
                  {user || 'User'}
                </span>
              </div>
            </div>

            {/* Mobile Navbar Menu */}
            <div className="md:hidden">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {getSectionTitle(activeSection)}
            </h1>
            <p className="text-gray-600 text-sm">
              Dashboard / {getSectionTitle(activeSection)}
            </p>
          </div>

          {/* Dynamic Content */}
          <div className="animate-fadeIn">
            {renderDashboardContent()}
          </div>
        </main>
      </div>

      {/* Floating Chat Bot */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-30 group">
        <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <div className="absolute bottom-16 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI Chat Bot
        </div>
      </button>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;