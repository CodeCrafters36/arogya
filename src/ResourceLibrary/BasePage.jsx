import React, { useState, useEffect, useRef } from 'react';
import { Heart, Brain, Moon, Shield, BookOpen, Volume2, Pause, Globe, Sparkles, Video, Headphones, FileText, ChevronRight, X } from 'lucide-react';

const WellnessHubBase = () => {
  const [showAIGuide, setShowAIGuide] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const floatingRef = useRef();
  const characterRef = useRef();

  // Multilingual content
  const content = {
    en: {
      welcome: "Welcome to Your Wellness Media Hub",
      subtitle: "Explore curated content designed for your mental health journey",
      aiGreeting: "Hi! I'm your wellness companion. Let me help you find the perfect content for your current needs. What would you like to explore today?",
      zones: {
        video: { name: "Video Library", desc: "Calming videos, meditations, and visual content" },
        audio: { name: "Audio Sanctuary", desc: "Soothing sounds, music, and guided meditations" },
        books: { name: "Digital Library", desc: "Self-help books and wellness guides" },
        articles: { name: "Article Collection", desc: "Expert articles and research-backed content" }
      },
      continue: "Continue Journey",
      suggestions: [
        "Help me find calming content",
        "I'm feeling stressed", 
        "I need motivation",
        "Sleep better tonight",
        "Focus and concentration"
      ]
    },
    hi: {
      welcome: "आपके कल्याण मीडिया हब में आपका स्वागत है",
      subtitle: "अपनी मानसिक स्वास्थ्य यात्रा के लिए तैयार की गई सामग्री का अन्वेषण करें",
      aiGreeting: "नमस्ते! मैं आपका कल्याण साथी हूं। आपकी वर्तमान आवश्यकताओं के लिए सही सामग्री खोजने में मदद करता हूं।",
      zones: {
        video: { name: "वीडियो पुस्तकालय", desc: "शांत वीडियो, ध्यान और दृश्य सामग्री" },
        audio: { name: "ऑडियो अभयारण्य", desc: "मधुर ध्वनियां, संगीत और निर्देशित ध्यान" },
        books: { name: "डिजिटल पुस्तकालय", desc: "स्व-सहायता पुस्तकें और कल्याण गाइड" },
        articles: { name: "लेख संग्रह", desc: "विशेषज्ञ लेख और अनुसंधान-आधारित सामग्री" }
      },
      continue: "यात्रा जारी रखें",
      suggestions: [
        "शांत सामग्री खोजने में मदद करें",
        "मैं तनावग्रस्त महसूस कर रहा हूँ",
        "मुझे प्रेरणा चाहिए", 
        "आज रात बेहतर नींद",
        "फोकस और एकाग्रता"
      ]
    }
  };

  const t = content[language];

  // 3D Character animation
  useEffect(() => {
    const animateCharacter = () => {
      if (characterRef.current) {
        const time = Date.now() / 1000;
        characterRef.current.style.transform = `translateY(${Math.sin(time * 0.5) * 10}px)`;
      }
    };
    const interval = setInterval(animateCharacter, 50);
    return () => clearInterval(interval);
  }, []);

  // Floating animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (floatingRef.current) {
        floatingRef.current.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 8}px) scale(${1 + Math.sin(Date.now() / 2000) * 0.05})`;
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Auto-show AI guide on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAIGuide(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const zones = [
    { 
      id: 'video', 
      icon: Video, 
      color: 'from-blue-400 to-cyan-400', 
      bgColor: 'bg-blue-50', 
      accentColor: 'bg-blue-500',
      onClick: () => alert('Navigate to Video Library Page')
    },
    { 
      id: 'audio', 
      icon: Headphones, 
      color: 'from-purple-400 to-pink-400', 
      bgColor: 'bg-purple-50', 
      accentColor: 'bg-purple-500',
      onClick: () => alert('Navigate to Audio Sanctuary Page')
    },
    { 
      id: 'books', 
      icon: BookOpen, 
      color: 'from-green-400 to-emerald-400', 
      bgColor: 'bg-green-50', 
      accentColor: 'bg-green-500',
      onClick: () => alert('Navigate to Digital Library Page')
    },
    { 
      id: 'articles', 
      icon: FileText, 
      color: 'from-orange-400 to-red-400', 
      bgColor: 'bg-orange-50', 
      accentColor: 'bg-orange-500',
      onClick: () => alert('Navigate to Article Collection Page')
    }
  ];

  const playAmbientSound = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full opacity-20 ${i % 4 === 0 ? 'bg-blue-400' : i % 4 === 1 ? 'bg-purple-400' : i % 4 === 2 ? 'bg-pink-400' : 'bg-cyan-400'}`}
            style={{
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        
        {/* Glowing particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-white rounded-full opacity-60"
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
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50 backdrop-blur-sm">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg text-xs font-medium text-gray-700 animate-bounce">
            Click me!
          </div>
        </div>
      </div>

      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{language === 'en' ? 'हिं' : 'EN'}</span>
        </button>
      </div>

      {/* Ambient Sound Toggle */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={playAmbientSound}
          className={`flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${isPlaying ? 'bg-green-100' : ''}`}
        >
          {isPlaying ? <Pause className="w-4 h-4 text-green-600" /> : <Volume2 className="w-4 h-4" />}
          <span className="text-xs">{isPlaying ? 'Playing' : 'Ambient'}</span>
        </button>
      </div>

      {/* Main Welcome Content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-8 relative z-10">
        <div ref={floatingRef} className="text-center mb-16">
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl animate-pulse">
              <Heart className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            {t.welcome}
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Enhanced Zone Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          {zones.map((zone, index) => {
            const Icon = zone.icon;
            return (
              <div
                key={zone.id}
                className={`group relative p-10 rounded-3xl ${zone.bgColor} cursor-pointer transform transition-all duration-700 hover:scale-105 hover:shadow-2xl border border-white/50 backdrop-blur-sm`}
                onClick={zone.onClick}
              >
                {/* 3D Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${zone.color} opacity-0 group-hover:opacity-20 rounded-3xl transition-all duration-500 blur-xl`}></div>
                
                <div className="relative z-10 flex items-center gap-6">
                  <div className={`p-6 rounded-2xl bg-gradient-to-br ${zone.color} text-white shadow-2xl transition-all duration-500`}>
                    <Icon className="w-12 h-12" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-800 group-hover:text-gray-900 mb-2">
                      {t.zones[zone.id].name}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{t.zones[zone.id].desc}</p>
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <ChevronRight className="w-8 h-8 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-4 right-4 w-4 h-4 bg-white/50 rounded-full animate-ping"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced AI Guide Modal */}
      {showAIGuide && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 max-w-lg w-full shadow-2xl border border-white/50 relative">
            <button
              onClick={() => setShowAIGuide(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>

            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl animate-bounce">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">AI Wellness Guide</h3>
                  <p className="text-gray-600">Your personal companion</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">{t.aiGreeting}</p>
              
              <div className="space-y-3 mb-8">
                {t.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 text-gray-700"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setShowAIGuide(false)}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
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
          50% { transform: translateY(-20px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default WellnessHubBase;