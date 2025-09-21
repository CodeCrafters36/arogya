import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Play, Heart, Star, Moon, Shield, X, Volume2, Pause, ChevronLeft, Globe, Sparkles, Video, Clock, PlayCircle, ExternalLink, ChevronRight, Home } from 'lucide-react';

const VideoLibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [language, setLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedVideos, setCompletedVideos] = useState(new Set());
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showAIGuide, setShowAIGuide] = useState(false);
  const [currentView, setCurrentView] = useState('library'); // 'library' or 'detail'
  const floatingRef = useRef();
  const characterRef = useRef();

  // Multilingual content
  const content = {
    en: {
      title: "Video Library",
      subtitle: "Calming videos, meditations, and visual wellness content",
      searchPlaceholder: "Search videos...",
      aiGreeting: "Hi! I'm your wellness companion. Let me help you find the perfect video content for your current needs.",
      filters: {
        all: "All Videos",
        sleep: "Sleep",
        motivation: "Motivation", 
        adhd: "ADHD",
        meditation: "Meditation",
        anxiety: "Anxiety"
      },
      watchNow: "Watch Now",
      duration: "Duration",
      category: "Category",
      complete: "Mark Complete",
      completed: "Completed",
      continue: "Continue Watching",
      backToLibrary: "Back to Library",
      backToHub: "Back to Hub",
      playAmbient: "Play Ambient",
      stopAmbient: "Stop Ambient"
    },
    hi: {
      title: "वीडियो पुस्तकालय",
      subtitle: "शांत वीडियो, ध्यान और दृश्य कल्याण सामग्री",
      searchPlaceholder: "वीडियो खोजें...",
      aiGreeting: "नमस्ते! मैं आपका कल्याण साथी हूं। आपकी वर्तमान आवश्यकताओं के लिए सही वीडियो सामग्री खोजने में मदद करता हूं।",
      filters: {
        all: "सभी वीडियो",
        sleep: "नींद",
        motivation: "प्रेरणा",
        adhd: "ADHD",
        meditation: "ध्यान",
        anxiety: "चिंता"
      },
      watchNow: "अभी देखें",
      duration: "अवधि",
      category: "श्रेणी",
      complete: "पूर्ण का निशान लगाएं",
      completed: "पूर्ण",
      continue: "देखना जारी रखें",
      backToLibrary: "पुस्तकालय में वापस",
      backToHub: "हब में वापस",
      playAmbient: "परिवेशी बजाएं",
      stopAmbient: "परिवेशी रोकें"
    }
  };

  const t = content[language];

  // Video Library Data
  const videoLibrary = [
    {
      id: 1,
      title: "10 Hour Rain Sounds for Deep Sleep",
      duration: "10:00:00",
      category: "Sleep",
      videoId: "mPZkdNFkNps",
      thumbnail: `https://img.youtube.com/vi/mPZkdNFkNps/maxresdefault.jpg`,
      description: "Gentle rain sounds to help you fall asleep and stay asleep peacefully through the night. Perfect for creating a calming atmosphere in your bedroom.",
      tags: ["rain", "sleep", "relaxation", "nature"]
    },
    {
      id: 2,
      title: "Guided Sleep Meditation for Anxiety",
      duration: "45:32",
      category: "Sleep",
      videoId: "1vx8iUvfyCY",
      thumbnail: `https://img.youtube.com/vi/1vx8iUvfyCY/maxresdefault.jpg`,
      description: "A soothing guided meditation designed to calm anxious thoughts before bedtime. Features gentle voice guidance and peaceful background music.",
      tags: ["meditation", "anxiety", "sleep", "guided"]
    },
    {
      id: 3,
      title: "Ocean Waves 8 Hours for Sleep",
      duration: "8:00:00",
      category: "Sleep",
      videoId: "V1bFr2SWP1I",
      thumbnail: `https://img.youtube.com/vi/V1bFr2SWP1I/maxresdefault.jpg`,
      description: "Peaceful ocean wave sounds for deep, restorative sleep throughout the night. Natural white noise to mask disruptive sounds.",
      tags: ["ocean", "waves", "sleep", "nature"]
    },
    {
      id: 4,
      title: "Forest Sounds - Birds Chirping",
      duration: "3:00:00",
      category: "Sleep",
      videoId: "xNN7iTA57jM",
      thumbnail: `https://img.youtube.com/vi/xNN7iTA57jM/maxresdefault.jpg`,
      description: "Natural forest ambiance with gentle bird songs for relaxation and stress relief. Transport yourself to a peaceful woodland setting.",
      tags: ["forest", "birds", "nature", "relaxation"]
    },
    {
      id: 5,
      title: "Morning Motivation for Depression",
      duration: "15:24",
      category: "Motivation",
      videoId: "mgmVOuLgFB0",
      thumbnail: `https://img.youtube.com/vi/mgmVOuLgFB0/maxresdefault.jpg`,
      description: "Uplifting morning affirmations and motivation to start your day with positivity. Designed to combat negative thought patterns.",
      tags: ["motivation", "morning", "affirmations", "depression"]
    },
    {
      id: 6,
      title: "Self Love Affirmations",
      duration: "20:18",
      category: "Motivation",
      videoId: "WQf6kWUqKmI",
      thumbnail: `https://img.youtube.com/vi/WQf6kWUqKmI/maxresdefault.jpg`,
      description: "Powerful self-love affirmations to boost confidence and self-acceptance. Practice daily for improved self-esteem.",
      tags: ["self-love", "affirmations", "confidence", "positivity"]
    },
    {
      id: 7,
      title: "Overcoming Depression - Daily Habits",
      duration: "12:45",
      category: "Motivation",
      videoId: "2X4qySqsYP8",
      thumbnail: `https://img.youtube.com/vi/2X4qySqsYP8/maxresdefault.jpg`,
      description: "Practical daily habits and strategies for managing depression and building resilience. Evidence-based approaches for mental wellness.",
      tags: ["depression", "habits", "wellness", "strategies"]
    },
    {
      id: 8,
      title: "ADHD Focus Music - Study Sounds",
      duration: "2:00:00",
      category: "ADHD",
      videoId: "kgx4WGK0oNU",
      thumbnail: `https://img.youtube.com/vi/kgx4WGK0oNU/maxresdefault.jpg`,
      description: "Specially designed music to enhance focus and concentration for ADHD minds. Instrumental tracks optimized for studying and work.",
      tags: ["ADHD", "focus", "study", "concentration"]
    },
    {
      id: 9,
      title: "Meditation for ADHD Mind",
      duration: "18:52",
      category: "ADHD",
      videoId: "2-FGE1zWVLE",
      thumbnail: `https://img.youtube.com/vi/2-FGE1zWVLE/maxresdefault.jpg`,
      description: "Gentle meditation techniques specifically adapted for ADHD brains and hyperactivity. Short, manageable sessions with clear guidance.",
      tags: ["ADHD", "meditation", "hyperactivity", "mindfulness"]
    },
    {
      id: 10,
      title: "Anxiety Relief Breathing Exercise",
      duration: "10:33",
      category: "Anxiety",
      videoId: "tybOi4hjZFQ",
      thumbnail: `https://img.youtube.com/vi/tybOi4hjZFQ/maxresdefault.jpg`,
      description: "Simple but effective breathing exercises to reduce anxiety and promote calm. Learn techniques you can use anywhere, anytime.",
      tags: ["anxiety", "breathing", "exercises", "calm"]
    }
  ];

  // Smooth floating animation without rotation
  useEffect(() => {
    const interval = setInterval(() => {
      if (floatingRef.current) {
        const time = Date.now() / 1000;
        floatingRef.current.style.transform = `translateY(${Math.sin(time * 0.5) * 8}px) scale(${1 + Math.sin(time * 0.3) * 0.03})`;
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Character animation without rotation
  useEffect(() => {
    const animateCharacter = () => {
      if (characterRef.current) {
        const time = Date.now() / 1000;
        characterRef.current.style.transform = `translateY(${Math.sin(time * 0.8) * 5}px)`;
      }
    };
    const interval = setInterval(animateCharacter, 50);
    return () => clearInterval(interval);
  }, []);

  const categoryFilters = ['all', 'sleep', 'motivation', 'adhd', 'anxiety'];

  const playAmbientSound = () => {
    setIsPlaying(!isPlaying);
  };

  const markComplete = (videoId) => {
    setCompletedVideos(prev => new Set([...prev, videoId]));
  };

  const openVideo = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const filteredVideos = videoLibrary.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = activeFilter === 'all' || 
                         video.category.toLowerCase() === activeFilter ||
                         video.tags.some(tag => tag.toLowerCase() === activeFilter);
    
    return matchesSearch && matchesFilter;
  });

  // Library View
  if (currentView === 'library') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 relative overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating orbs without rotation */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full opacity-20 ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-cyan-400' : 'bg-purple-400'}`}
              style={{
                width: `${30 + Math.random() * 60}px`,
                height: `${30 + Math.random() * 60}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
          
          {/* Gentle particles */}
          {[...Array(25)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `sparkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* 3D Character Assistant */}
        <div 
          ref={characterRef}
          className="absolute top-20 right-10 z-30 cursor-pointer"
          onClick={() => setShowAIGuide(true)}
        >
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white/50 backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg text-xs font-medium text-gray-700">
              Help
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="relative z-20 p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">{t.backToHub}</span>
              </button>
            </div>

            <div ref={floatingRef} className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 text-white shadow-xl">
                <Video className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
                <p className="text-gray-600">{t.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language === 'en' ? 'हिं' : 'EN'}</span>
              </button>

              {/* Ambient Sound Toggle */}
              <button
                onClick={playAmbientSound}
                className={`flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${isPlaying ? 'bg-green-100' : ''}`}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-green-600" /> : <Volume2 className="w-4 h-4" />}
                <span className="text-xs">{isPlaying ? t.stopAmbient : t.playAmbient}</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 shadow-lg text-lg"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap justify-center">
                {categoryFilters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
                      activeFilter === filter 
                        ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-xl scale-105' 
                        : 'bg-white/90 text-gray-600 hover:bg-white hover:scale-105'
                    }`}
                  >
                    {t.filters[filter]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Video Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video, index) => {
                const isCompleted = completedVideos.has(video.id);
                
                return (
                  <div
                    key={video.id}
                    className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 border border-white/50"
                  >
                    {/* Completion Badge */}
                    {isCompleted && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-xl z-10 animate-bounce">
                        <Star className="w-4 h-4 text-white fill-current" />
                      </div>
                    )}

                    {/* Video Thumbnail */}
                    <div className="relative mb-4 overflow-hidden rounded-xl">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-40 bg-gradient-to-br from-blue-400 to-cyan-400 items-center justify-center">
                        <Video className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <PlayCircle className="w-8 h-8 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    {/* Video Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900 line-clamp-2 leading-tight">
                          {video.title}
                        </h3>
                        {!isCompleted && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markComplete(video.id);
                            }}
                            className="ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                          >
                            <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                          </button>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {video.description}
                      </p>

                      <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{video.duration}</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                          {video.category}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openVideo(video.videoId);
                          }}
                          className="flex-1 py-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <PlayCircle className="w-4 h-4" />
                          {t.watchNow}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVideo(video);
                            setCurrentView('detail');
                          }}
                          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Guide Modal */}
        {showAIGuide && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-white/50 relative">
              <button
                onClick={() => setShowAIGuide(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-cyan-100/50 rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">AI Video Guide</h3>
                    <p className="text-gray-600">Your wellness companion</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">{t.aiGreeting}</p>
                <button
                  onClick={() => setShowAIGuide(false)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  {t.continue}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    );
  }

  // Video Detail View
  if (currentView === 'detail' && selectedVideo) {
    const isCompleted = completedVideos.has(selectedVideo.id);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10"></div>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20"
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="relative z-20 p-6">
          <button
            onClick={() => setCurrentView('library')}
            className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">{t.backToLibrary}</span>
          </button>

          {/* Video Detail Content */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                {/* Video Preview */}
                <div className="lg:col-span-2">
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <img 
                      src={selectedVideo.thumbnail} 
                      alt={selectedVideo.title}
                      className="w-full h-80 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-80 bg-gradient-to-br from-blue-400 to-cyan-400 items-center justify-center">
                      <Video className="w-20 h-20 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <button
                        onClick={() => openVideo(selectedVideo.videoId)}
                        className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
                      >
                        <PlayCircle className="w-12 h-12 text-blue-600" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                      {selectedVideo.title}
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {selectedVideo.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {selectedVideo.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Video Info Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Video Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <div>
                          <span className="font-medium text-gray-700">{t.duration}:</span>
                          <span className="ml-2 text-gray-600">{selectedVideo.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Filter className="w-5 h-5 text-blue-600" />
                        <div>
                          <span className="font-medium text-gray-700">{t.category}:</span>
                          <span className="ml-2 text-gray-600">{selectedVideo.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => openVideo(selectedVideo.videoId)}
                      className="w-full py-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                    >
                      <PlayCircle className="w-6 h-6" />
                      {t.watchNow}
                      <ExternalLink className="w-5 h-5 opacity-70" />
                    </button>

                    {!isCompleted ? (
                      <button
                        onClick={() => markComplete(selectedVideo.id)}
                        className="w-full py-3 bg-green-100 text-green-800 border-2 border-green-200 rounded-2xl font-bold hover:bg-green-200 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <Star className="w-5 h-5" />
                        {t.complete}
                      </button>
                    ) : (
                      <div className="w-full py-3 bg-green-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
                        <Star className="w-5 h-5 fill-current" />
                        {t.completed}
                      </div>
                    )}

                    <button
                      onClick={() => setShowAIGuide(true)}
                      className="w-full py-3 bg-purple-100 text-purple-800 border-2 border-purple-200 rounded-2xl font-bold hover:bg-purple-200 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      Get AI Guidance
                    </button>
                  </div>

                  {/* Related Videos */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Similar Videos</h3>
                    <div className="space-y-3">
                      {videoLibrary
                        .filter(v => v.id !== selectedVideo.id && v.category === selectedVideo.category)
                        .slice(0, 3)
                        .map((relatedVideo) => (
                          <div 
                            key={relatedVideo.id}
                            className="flex gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setSelectedVideo(relatedVideo)}
                          >
                            <img 
                              src={relatedVideo.thumbnail} 
                              alt={relatedVideo.title}
                              className="w-16 h-12 object-cover rounded-lg"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="hidden w-16 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 items-center justify-center rounded-lg">
                              <Video className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-800 line-clamp-2">
                                {relatedVideo.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">{relatedVideo.duration}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Your Progress</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-600">Videos Completed</span>
                          <span className="text-sm font-bold text-purple-600">
                            {completedVideos.size}/{videoLibrary.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(completedVideos.size / videoLibrary.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{completedVideos.size}</div>
                          <div className="text-xs text-gray-600">Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {videoLibrary.length - completedVideos.size}
                          </div>
                          <div className="text-xs text-gray-600">Remaining</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Preview Section */}
              <div className="border-t border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">About This Video</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    {selectedVideo.description} This carefully curated content is designed to support your mental 
                    wellness journey through {selectedVideo.category.toLowerCase()} techniques and practices.
                  </p>
                  
                  <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-400">
                    <h4 className="font-bold text-gray-800 mb-3">What to Expect:</h4>
                    <ul className="space-y-2 text-gray-600">
                      {selectedVideo.category === 'Sleep' && (
                        <>
                          <li>• Gentle sounds designed to promote deep relaxation</li>
                          <li>• Extended duration for full sleep cycles</li>
                          <li>• Natural audio that helps mask disruptive noises</li>
                          <li>• Calming atmosphere for bedtime routines</li>
                        </>
                      )}
                      {selectedVideo.category === 'Motivation' && (
                        <>
                          <li>• Positive affirmations and uplifting content</li>
                          <li>• Practical strategies for daily motivation</li>
                          <li>• Evidence-based techniques for mood improvement</li>
                          <li>• Inspirational guidance for personal growth</li>
                        </>
                      )}
                      {selectedVideo.category === 'ADHD' && (
                        <>
                          <li>• ADHD-specific techniques and approaches</li>
                          <li>• Focus enhancement strategies</li>
                          <li>• Adapted content for hyperactive minds</li>
                          <li>• Practical tools for daily management</li>
                        </>
                      )}
                      {selectedVideo.category === 'Anxiety' && (
                        <>
                          <li>• Anxiety reduction techniques</li>
                          <li>• Breathing exercises and relaxation methods</li>
                          <li>• Immediate relief strategies</li>
                          <li>• Long-term coping mechanisms</li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> This content is for educational and wellness purposes. 
                      If you're experiencing severe mental health symptoms, please consult with a healthcare professional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default VideoLibraryPage;


// import React, { useState, useEffect } from 'react';
// import { Search, Play, Download, Globe, Subtitles, Clock, Eye, AlertCircle } from 'lucide-react';

// const Videos = () => {
//   const [videos, setVideos] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [languageFilter, setLanguageFilter] = useState('all');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [nextPageToken, setNextPageToken] = useState(null);
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   // YouTube API configuration
//   const YOUTUBE_API_KEY = 'AIzaSyAcH3tFGkB5LDkWAAAXpg6YP37BqFEfdGQ';
//   const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

//   // Default search queries for different categories
//   const getSearchQuery = () => {
//     if (searchTerm.trim()) {
//       return searchTerm.trim();
//     }
    
//     const categoryQueries = {
//       all: 'stress relief meditation mindfulness relaxation',
//       meditation: 'guided meditation mindfulness breathing exercises relaxation',
//       awareness: 'mental health awareness anxiety depression stress management',
//       relaxation: 'relaxation techniques stress relief yoga calming music'
//     };
    
//     return categoryQueries[categoryFilter] || categoryQueries.all;
//   };

//   const fetchYouTubeVideos = async (pageToken = null, isNewSearch = false) => {
//     try {
//       setLoading(true);
//       if (isNewSearch) {
//         setError(null);
//         setVideos([]);
//         setNextPageToken(null);
//       }

//       const query = getSearchQuery();
//       const languageCode = languageFilter !== 'all' ? (languageFilter === 'hindi' ? 'hi' : 'en') : null;

//       let apiUrl = `${YOUTUBE_API_URL}/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}&order=relevance&videoDuration=medium`;
      
//       if (languageCode) {
//         apiUrl += `&relevanceLanguage=${languageCode}`;
//       }
      
//       if (pageToken) {
//         apiUrl += `&pageToken=${pageToken}`;
//       }

//       console.log('Fetching from:', apiUrl);
//       const response = await fetch(apiUrl);
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
//       }

//       const data = await response.json();
      
//       if (!data.items || data.items.length === 0) {
//         if (isNewSearch) {
//           setVideos([]);
//         }
//         setLoading(false);
//         return;
//       }

//       // Get video details for duration and view count
//       const videoIds = data.items.map(item => item.id.videoId).join(',');
//       const detailsUrl = `${YOUTUBE_API_URL}/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
      
//       const detailsResponse = await fetch(detailsUrl);
//       const detailsData = await detailsResponse.json();

//       // Combine search results with video details
//       const videosWithDetails = data.items.map(item => {
//         const details = detailsData.items?.find(detail => detail.id === item.id.videoId);
        
//         return {
//           id: item.id.videoId,
//           title: item.snippet.title,
//           description: item.snippet.description,
//           duration: details ? formatDuration(details.contentDetails.duration) : 'N/A',
//           category: categoryFilter,
//           language: detectLanguage(item.snippet.title, item.snippet.description),
//           source: "YouTube",
//           views: details ? formatViewCount(details.statistics.viewCount) : '0',
//           thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url,
//           videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
//           embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
//           hasSubtitles: true,
//           isOfflineAvailable: false,
//           instructor: item.snippet.channelTitle,
//           publishedAt: item.snippet.publishedAt
//         };
//       });

//       if (isNewSearch || !pageToken) {
//         setVideos(videosWithDetails);
//       } else {
//         setVideos(prev => [...prev, ...videosWithDetails]);
//       }
      
//       setNextPageToken(data.nextPageToken);
      
//     } catch (error) {
//       console.error('YouTube API Error:', error);
//       setError(error.message);
      
//       // Show dummy data only on first load if API fails
//       if (isNewSearch || videos.length === 0) {
//         setVideos(getDummyVideos());
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to format ISO 8601 duration to readable format
//   const formatDuration = (duration) => {
//     const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
//     if (!match) return 'N/A';
    
//     const hours = (match[1] || '').replace('H', '');
//     const minutes = (match[2] || '').replace('M', '');
//     const seconds = (match[3] || '').replace('S', '');
    
//     let formatted = '';
//     if (hours) formatted += hours + ':';
//     if (minutes) formatted += minutes.padStart(hours ? 2 : 1, '0') + ':';
//     else if (hours) formatted += '00:';
//     formatted += (seconds || '0').padStart(2, '0');
    
//     return formatted;
//   };

//   // Helper function to format view count
//   const formatViewCount = (count) => {
//     if (!count) return '0';
//     const num = parseInt(count);
//     if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
//     if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
//     return num.toString();
//   };

//   // Helper function to detect language
//   const detectLanguage = (title, description) => {
//     const text = (title + ' ' + description).toLowerCase();
//     const hindiPattern = /[\u0900-\u097F]/;
    
//     if (hindiPattern.test(text)) return 'Hindi';
//     return 'English';
//   };

//   // Fallback dummy data
//   const getDummyVideos = () => [
//     {
//       id: 'dummy1',
//       title: "10 Minute Guided Meditation for Stress Relief",
//       description: "A calming guided meditation to help reduce stress and anxiety. Perfect for beginners.",
//       duration: "10:25",
//       category: "meditation",
//       language: "English",
//       source: "YouTube",
//       views: "1.2M",
//       thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
//       videoUrl: "https://www.youtube.com/watch?v=inpok4MKVLM",
//       embedUrl: "https://www.youtube.com/embed/inpok4MKVLM",
//       hasSubtitles: true,
//       isOfflineAvailable: false,
//       instructor: "Meditation Guru"
//     },
//     {
//       id: 'dummy2',
//       title: "Deep Breathing Exercises for Anxiety",
//       description: "Simple yet effective breathing techniques to manage anxiety and panic attacks instantly.",
//       duration: "8:30",
//       category: "relaxation",
//       language: "English",
//       source: "YouTube",
//       views: "856K",
//       thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=225&fit=crop",
//       videoUrl: "https://www.youtube.com/watch?v=tybOi4hjZFQ",
//       embedUrl: "https://www.youtube.com/embed/tybOi4hjZFQ",
//       hasSubtitles: true,
//       isOfflineAvailable: false,
//       instructor: "Wellness Coach"
//     },
//     {
//       id: 'dummy3',
//       title: "5 Minute Stress Relief Meditation",
//       description: "Quick stress relief meditation that you can do anywhere, anytime.",
//       duration: "5:15",
//       category: "meditation",
//       language: "English",
//       source: "YouTube",
//       views: "423K",
//       thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
//       videoUrl: "https://www.youtube.com/watch?v=ZToicYcHIOU",
//       embedUrl: "https://www.youtube.com/embed/ZToicYcHIOU",
//       hasSubtitles: true,
//       isOfflineAvailable: false,
//       instructor: "Mindful Living"
//     }
//   ];

//   // Load default stress relief and meditation videos on component mount
//   useEffect(() => {
//     fetchYouTubeVideos(null, true);
//   }, []);

//   // Handle search
//   const handleSearch = (e) => {
//     if (e) e.preventDefault();
//     fetchYouTubeVideos(null, true);
//   };

//   // Handle filter changes
//   useEffect(() => {
//     fetchYouTubeVideos(null, true);
//   }, [categoryFilter, languageFilter]);

//   const filteredVideos = videos.filter(video => {
//     const matchesCategory = categoryFilter === 'all' || video.category === categoryFilter;
//     const matchesLanguage = languageFilter === 'all' || video.language.toLowerCase().includes(languageFilter);
    
//     return matchesCategory && matchesLanguage;
//   });

//   const playVideo = (video) => {
//     setSelectedVideo(video);
//   };

//   const closeVideo = () => {
//     setSelectedVideo(null);
//   };

//   const loadMoreVideos = () => {
//     if (nextPageToken && !loading) {
//       fetchYouTubeVideos(nextPageToken, false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//           <div className="flex items-center gap-3 mb-6">
//             <Play className="w-8 h-8 text-red-600" />
//             <h1 className="text-3xl font-bold text-gray-800">Stress Relief & Meditation Videos</h1>
//           </div>

//           {/* Search Bar */}
//           <form onSubmit={handleSearch} className="relative mb-4">
//             <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search for meditation, stress relief, relaxation videos..."
//               className="w-full pl-12 pr-20 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="absolute right-2 top-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
//               disabled={loading}
//             >
//               {loading ? 'Searching...' : 'Search'}
//             </button>
//           </form>

//           {/* Filters */}
//           <div className="flex flex-wrap gap-4 items-center">
//             <span className="text-gray-600 font-medium">Filters:</span>
            
//             <select 
//               className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//             >
//               <option value="all">All Categories</option>
//               <option value="meditation">Meditation</option>
//               <option value="awareness">Mental Health</option>
//               <option value="relaxation">Relaxation</option>
//             </select>

//             <select 
//               className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//               value={languageFilter}
//               onChange={(e) => setLanguageFilter(e.target.value)}
//             >
//               <option value="all">All Languages</option>
//               <option value="english">English</option>
//               <option value="hindi">Hindi</option>
//             </select>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
//               <AlertCircle className="w-5 h-5 text-red-600" />
//               <p className="text-red-800 text-sm">
//                 {error.includes('quotaExceeded') ? 
//                   'YouTube API quota exceeded. Showing sample videos.' : 
//                   `API Error: ${error}. Showing sample videos.`
//                 }
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Video Player Modal */}
//         {selectedVideo && (
//           <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
//               <div className="flex justify-between items-center p-4 border-b">
//                 <h3 className="text-lg font-semibold truncate">{selectedVideo.title}</h3>
//                 <button
//                   onClick={closeVideo}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="aspect-video">
//                 <iframe
//                   src={selectedVideo.embedUrl}
//                   className="w-full h-full"
//                   frameBorder="0"
//                   allowFullScreen
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 ></iframe>
//               </div>
//               <div className="p-4">
//                 <p className="text-sm text-gray-600 mb-2">By {selectedVideo.instructor}</p>
//                 <p className="text-sm text-gray-500">{selectedVideo.description}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Videos Grid */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {loading && videos.length === 0 ? (
//             // Loading skeleton
//             Array.from({ length: 6 }).map((_, index) => (
//               <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
//                 <div className="h-48 bg-gray-200"></div>
//                 <div className="p-4">
//                   <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             filteredVideos.map((video) => (
//               <div key={video.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
//                 {/* Video Thumbnail */}
//                 <div className="relative cursor-pointer" onClick={() => playVideo(video)}>
//                   <img
//                     src={video.thumbnail}
//                     alt={video.title}
//                     className="w-full h-48 object-cover"
//                   />
                  
//                   {/* Play Overlay */}
//                   <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
//                     <div className="bg-red-600 text-white p-4 rounded-full hover:bg-red-700 transition-colors">
//                       <Play className="w-6 h-6" />
//                     </div>
//                   </div>

//                   {/* Duration Badge */}
//                   <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                     {video.duration}
//                   </div>

//                   {/* Source Badge */}
//                   <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
//                     YouTube
//                   </div>
//                 </div>

//                 {/* Video Info */}
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
//                     {video.title}
//                   </h3>
                  
//                   <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                     {video.description}
//                   </p>

//                   <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
//                     <span>By {video.instructor}</span>
//                     <span>•</span>
//                     <div className="flex items-center gap-1">
//                       <Eye className="w-3 h-3" />
//                       <span>{video.views}</span>
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center gap-1">
//                         <Globe className="w-3 h-3" />
//                         <span>{video.language}</span>
//                       </div>
                      
//                       {video.hasSubtitles && (
//                         <div className="flex items-center gap-1">
//                           <Subtitles className="w-3 h-3" />
//                           <span>CC</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => playVideo(video)}
//                       className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
//                     >
//                       Watch Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}

//           {!loading && filteredVideos.length === 0 && (
//             <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center">
//               <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-600 mb-2">No videos found</h3>
//               <p className="text-gray-500">Try adjusting your search or filters</p>
//             </div>
//           )}
//         </div>

//         {/* Load More Button */}
//         {nextPageToken && !loading && (
//           <div className="text-center mt-8">
//             <button
//               onClick={loadMoreVideos}
//               className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium"
//             >
//               Load More Videos
//             </button>
//           </div>
//         )}

//         {/* Loading indicator for load more */}
//         {loading && videos.length > 0 && (
//           <div className="text-center mt-8">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
//           </div>
//         )}

//         {/* API Status */}
//         <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
//           <p className="text-green-800 text-sm">
//             <strong>✅ YouTube API Active:</strong> Fetching real stress relief & meditation videos. Videos play directly in the app with embedded player.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Videos;