"use client"

import { useState, useContext, createContext } from "react"


// User Context
const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    language: "en",
    mentalHealthScore: 75,
    avatar: "/user-avatar.jpg",
  })

  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }))
  }

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>
}

const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within UserProvider")
  }
  return context
}

// i18n translations
const translations = {
  en: {
    dashboard: "Dashboard",
    dailyPlan: "Daily Plan",
    resourceLibrary: "Resource Library",
    peerSupport: "Peer Support",
    counsellorConnect: "Counsellor Connect",
    gameZone: "Game Zone",
    emergency: "Emergency",
    retakeTest: "Retake Test",
    profile: "Profile",
    audioList: "Audio List",
    articles: "Articles",
    videoList: "Video List",
    meditation: "Meditation",
    welcome: "Welcome to your Mental Wellness Dashboard",
    mentalHealthScore: "Mental Health Score",
    todaysGoals: "Today's Goals",
    recentActivities: "Recent Activities",
    quickActions: "Quick Actions",
    language: "Language",
    notifications: "Notifications",
    settings: "Settings",
    logout: "Logout",
    chatWithBot: "Chat with AI Assistant",
    emergencyHelp: "Need immediate help?",
    callHelpline: "Call Helpline",
    findCounsellor: "Find Counsellor",
    breathingExercise: "Start Breathing Exercise",
    moodTracker: "Track Your Mood",
    placeholder: "This page is under development. Content will be added soon.",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    dailyPlan: "दैनिक योजना",
    resourceLibrary: "संसाधन पुस्तकालय",
    peerSupport: "साथी सहायता",
    counsellorConnect: "परामर्शदाता कनेक्ट",
    gameZone: "गेम ज़ोन",
    emergency: "आपातकाल",
    retakeTest: "टेस्ट दोबारा लें",
    profile: "प्रोफ़ाइल",
    audioList: "ऑडियो सूची",
    articles: "लेख",
    videoList: "वीडियो सूची",
    meditation: "ध्यान",
    welcome: "आपके मानसिक कल्याण डैशबोर्ड में आपका स्वागत है",
    mentalHealthScore: "मानसिक स्वास्थ्य स्कोर",
    todaysGoals: "आज के लक्ष्य",
    recentActivities: "हाल की गतिविधियां",
    quickActions: "त्वरित कार्य",
    language: "भाषा",
    notifications: "सूचनाएं",
    settings: "सेटिंग्स",
    logout: "लॉगआउट",
    chatWithBot: "AI सहायक से चैट करें",
    emergencyHelp: "तत्काल सहायता चाहिए?",
    callHelpline: "हेल्पलाइन कॉल करें",
    findCounsellor: "परामर्शदाता खोजें",
    breathingExercise: "श्वास अभ्यास शुरू करें",
    moodTracker: "अपना मूड ट्रैक करें",
    placeholder: "यह पृष्ठ विकास के अधीन है। सामग्री जल्द ही जोड़ी जाएगी।",
  },
}

const useTranslation = () => {
  const { user } = useUser()
  const t = (key) => translations[user.language]?.[key] || translations.en[key] || key
  return { t }
}

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar, currentPage, setCurrentPage }) => {
  const { t } = useTranslation()

  const menuItems = [
    { id: "dashboard", label: t("dashboard"), icon: "🏠" },
    { id: "dailyPlan", label: t("dailyPlan"), icon: "📅" },
    { id: "resourceLibrary", label: t("resourceLibrary"), icon: "📚" },
    { id: "peerSupport", label: t("peerSupport"), icon: "👥" },
    { id: "counsellorConnect", label: t("counsellorConnect"), icon: "🧑‍⚕️" },
    { id: "gameZone", label: t("gameZone"), icon: "🎮" },
    { id: "emergency", label: t("emergency"), icon: "🚨" },
    { id: "retakeTest", label: t("retakeTest"), icon: "📝" },
    { id: "profile", label: t("profile"), icon: "👤" },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-purple-50 to-pink-50 border-r border-purple-100 transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto ${isOpen ? "w-64" : "w-64"}`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-purple-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">MW</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-purple-800">Mental Wellness</h1>
              <p className="text-sm text-purple-600">Student Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 fixed">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id)
                if (window.innerWidth < 1024) toggleSidebar()
              }}
              className={` w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                currentPage === item.id
                  ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 shadow-sm"
                  : "text-purple-700 hover:bg-purple-50 hover:text-purple-800"
              }`}
              aria-label={item.label}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}

// Navbar Component
const Navbar = ({ toggleSidebar }) => {
  const { user, updateUser } = useUser()
  const { t } = useTranslation()
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleLanguage = () => {
    updateUser({ language: user.language === "en" ? "hi" : "en" })
  }

  return (
    <nav className="sticky top-0 bg-white border-b border-purple-100 px-4 py-3 z-30 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-purple-50 text-purple-700"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden lg:block">
            <h2 className="text-xl font-semibold text-purple-800">{t("dashboard")}</h2>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium hover:bg-purple-200 transition-colors"
            aria-label={`Switch to ${user.language === "en" ? "Hindi" : "English"}`}
          >
            {user.language === "en" ? "हिं" : "EN"}
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-purple-50 text-purple-700 relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5zM10.07 2.82l3.93 3.93-3.93 3.93-3.93-3.93z"
              />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full"></span>
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-50"
            >
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-purple-200"
              />
              <span className="hidden md:block text-sm font-medium text-purple-800">{user.name}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-purple-100 py-2">
                <button className="w-full px-4 py-2 text-left text-sm text-purple-700 hover:bg-purple-50">
                  {t("profile")}
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-purple-700 hover:bg-purple-50">
                  {t("settings")}
                </button>
                <hr className="my-2 border-purple-100" />
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                  {t("logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

// Floating Chat Bot Component
const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-purple-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">{t("chatWithBot")}</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-purple-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat content */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <p className="text-sm text-purple-800">
                  Hello! I'm here to help with your mental wellness journey. How are you feeling today?
                </p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-purple-100">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center"
        aria-label={t("chatWithBot")}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </>
  )
}

// Page Components
const DashboardPage = () => {
  const { user } = useUser()
  const { t } = useTranslation()

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-purple-800 mb-2">{t("welcome")}</h1>
        <p className="text-purple-600">Hello {user.name}, let's take care of your mental wellness today!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">{t("mentalHealthScore")}</p>
              <p className="text-3xl font-bold text-purple-800">{user.mentalHealthScore}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💚</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">{t("todaysGoals")}</p>
              <p className="text-3xl font-bold text-purple-800">3/5</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">{t("recentActivities")}</p>
              <p className="text-3xl font-bold text-purple-800">12</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
        <h2 className="text-xl font-semibold text-purple-800 mb-4">{t("quickActions")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center">
            <span className="text-2xl block mb-2">🧘</span>
            <span className="text-sm text-purple-700">{t("breathingExercise")}</span>
          </button>
          <button className="p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors text-center">
            <span className="text-2xl block mb-2">😊</span>
            <span className="text-sm text-pink-700">{t("moodTracker")}</span>
          </button>
          <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center">
            <span className="text-2xl block mb-2">🧑‍⚕️</span>
            <span className="text-sm text-blue-700">{t("findCounsellor")}</span>
          </button>
          <button className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-center">
            <span className="text-2xl block mb-2">🚨</span>
            <span className="text-sm text-red-700">{t("emergencyHelp")}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const DailyPlanPage = () => {
  const { t } = useTranslation()
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-purple-100 text-center">
        <span className="text-6xl block mb-4">📅</span>
        <h1 className="text-2xl font-bold text-purple-800 mb-4">{t("dailyPlan")}</h1>
        <p className="text-purple-600">{t("placeholder")}</p>
      </div>
    </div>
  )
}

const ResourceLibraryPage = ({ setCurrentPage }) => {
  const { t } = useTranslation()

  const resources = [
    { id: "audioList", label: t("audioList"), icon: "🎵", color: "purple" },
    { id: "articles", label: t("articles"), icon: "📖", color: "blue" },
    { id: "videoList", label: t("videoList"), icon: "🎥", color: "pink" },
    { id: "meditation", label: t("meditation"), icon: "🧘", color: "green" },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-purple-800 mb-2">{t("resourceLibrary")}</h1>
        <p className="text-purple-600">Explore our collection of mental wellness resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <button
            key={resource.id}
            onClick={() => setCurrentPage(resource.id)}
            className={`bg-white rounded-xl p-6 shadow-sm border border-${resource.color}-100 hover:shadow-md transition-all duration-200 text-center group`}
          >
            <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform">{resource.icon}</span>
            <h3 className={`text-lg font-semibold text-${resource.color}-800`}>{resource.label}</h3>
          </button>
        ))}
      </div>
    </div>
  )
}

const AudioListPage = () => {
  const { t } = useTranslation()
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-purple-100 text-center">
        <span className="text-6xl block mb-4">🎵</span>
        <h1 className="text-2xl font-bold text-purple-800 mb-4">{t("audioList")}</h1>
        <p className="text-purple-600">{t("placeholder")}</p>
      </div>
    </div>
  )
}

const ArticlesPage = () => {
  const { t } = useTranslation()
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-purple-100 text-center">
        <span className="text-6xl block mb-4">📖</span>
        <h1 className="text-2xl font-bold text-purple-800 mb-4">{t("articles")}</h1>
        <p className="text-purple-600">{t("placeholder")}</p>
      </div>
    </div>
  )
}

const VideoListPage = () => {
  const { t } = useTranslation()
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-purple-100 text-center">
        <span className="text-6xl block mb-4">🎥</span>
        <h1 className="text-2xl font-bold text-purple-800 mb-4">{t("videoList")}</h1>
        <p className="text-purple-600">{t("placeholder")}</p>
      </div>
    </div>
  )
}

const MeditationPage = () => {
  const { t } = useTranslation()
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-purple-100 text-center">
        <span className="text-6xl block mb-4">🧘</span>
        <h1 className="text-2xl font-bold text-purple-800 mb-4">{t("meditation")}</h1>
        <p className="text-purple-600">{t("placeholder")}</p>
      </div>
    </div>
  )
}

const PeerSupportPage = () => {
  const { t } = useTranslation()
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-purple-100 text-center">
        <span className="text-6xl block mb-4">👥</span>
        <h1 className="text-2xl font-bold text-purple-800 mb-4">{t("peerSupport")}</h1>
        <p className="text-purple-600">{t("placeholder")}</p>
      </div>
    </div>
  )
}

const CounsellorConnectPage = () => {
  const { t } = useTranslation()
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-purple-100 text-center">
        <span className="text-6xl block mb-4">🧑‍⚕️</span>
        <h1 className="text-2xl font-bold text-purple-800 mb-4">{t("counsellorConnect")}</h1>
        <p className="text-purple-600">{t("placeholder")}</p>
      </div>
    </div>
  )
}

const GameZonePage = () => {
  const { t } = useTranslation()
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-purple-100 text-center">
        <span className="text-6xl block mb-4">🎮</span>
        <h1 className="text-2xl font-bold text-purple-800 mb-4">{t("gameZone")}</h1>
        <p className="text-purple-600">{t("placeholder")}</p>
      </div>
    </div>
  )
}

const EmergencyPage = () => {
  const { t } = useTranslation()
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-red-100 text-center">
        <span className="text-6xl block mb-4">🚨</span>
        <h1 className="text-2xl font-bold text-red-800 mb-4">{t("emergency")}</h1>
        <p className="text-red-600 mb-6">{t("emergencyHelp")}</p>
        <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors">
          {t("callHelpline")}
        </button>
      </div>
    </div>
  )
}

const RetakeTestPage = () => {
  const { t } = useTranslation()
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-purple-100 text-center">
        <span className="text-6xl block mb-4">📝</span>
        <h1 className="text-2xl font-bold text-purple-800 mb-4">{t("retakeTest")}</h1>
        <p className="text-purple-600">{t("placeholder")}</p>
      </div>
    </div>
  )
}

const ProfilePage = () => {
  const { user } = useUser()
  const { t } = useTranslation()

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-purple-100">
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={user.name}
            className="w-20 h-20 rounded-full border-4 border-purple-200"
          />
          <div>
            <h1 className="text-2xl font-bold text-purple-800">{user.name}</h1>
            <p className="text-purple-600">{user.email}</p>
            <p className="text-sm text-purple-500">
              {t("mentalHealthScore")}: {user.mentalHealthScore}%
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Personal Information</h3>
            <p className="text-purple-600">{t("placeholder")}</p>
          </div>

          <div className="p-4 bg-pink-50 rounded-lg">
            <h3 className="font-semibold text-pink-800 mb-2">Wellness Journey</h3>
            <p className="text-pink-600">{t("placeholder")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Dashboard Component
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard")

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboardmain/>
      case "dailyPlan":
        return <DailyPlanPage />
      case "resourceLibrary":
        return <ResourceLibraryPage setCurrentPage={setCurrentPage} />
      case "audioList":
        return <AudioListPage />
      case "articles":
        return <ArticlesPage />
      case "videoList":
        return <VideoListPage />
      case "meditation":
        return <MeditationPage />
      case "peerSupport":
        return <PeerSupportPage />
      case "counsellorConnect":
        return <CounsellorConnectPage />
      case "gameZone":
        return <GameZonePage />
      case "emergency":
        return <EmergencyPage />
      case "retakeTest":
        return <RetakeTestPage />
      case "profile":
        return <ProfilePage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="flex">
          {/* Sidebar */}
          <Sidebar
            isOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          {/* Main content */}
          <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
            {/* Navbar */}
            <Navbar toggleSidebar={toggleSidebar} />

            {/* Page content */}
            <main className="flex-1 overflow-auto">{renderPage()}</main>
          </div>
        </div>

        {/* Floating Chat Bot */}
        <FloatingChatBot />
      </div>
    </UserProvider>
  )
}

export default Dashboard




