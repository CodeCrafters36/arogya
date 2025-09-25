import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Play, Pause, Heart, Star, Moon, Shield, X, Volume2, VolumeX, ChevronLeft, Globe, Sparkles, Headphones, Clock, Music, SkipForward, SkipBack, ChevronRight, Home } from 'lucide-react';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import ArnorAudio from '../assets/music/Arnor(chosic.com).mp3';
import EveningImprovisation from '../assets/music/Evening-Improvisation-with-Ethera(chosic.com).mp3';
import MagicalMoments from '../assets/music/Magical-Moments-chosic.com_.mp3';
import Sonder from '../assets/music/Sonder(chosic.com).mp3';
import Wildflowers from '../assets/music/Wildflowers-chosic.com_.mp3';
import WinterLong from '../assets/music/Winter-Long-Version(chosic.com).mp3';
import Expitition from '../assets/music/Expitition.mp3';
import Fission from '../assets/music/fission.mp3';

const AudioLibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [language, setLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedAudios, setCompletedAudios] = useState(new Set());
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [showAIGuide, setShowAIGuide] = useState(false);
  const [currentView, setCurrentView] = useState('library'); // 'library' or 'detail'
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [audioProgress, setAudioProgress] = useState({});
  const [audioDurations, setAudioDurations] = useState({});
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const floatingRef = useRef();
  const characterRef = useRef();
  const audioRefs = useRef({});

  // Multilingual content
  const content = {
    en: {
      title: "Audio Sanctuary",
      subtitle: "Soothing sounds, music, and guided meditations",
      searchPlaceholder: "Search audio content...",
      aiGreeting: "Hi! I'm your wellness companion. Let me help you find the perfect audio content for relaxation and mindfulness.",
      filters: {
        all: "All Audio",
        relaxation: "Relaxation",
        meditation: "Meditation",
        music: "Music",
        mindfulness: "Mindfulness",
        therapy: "Therapy",
        focus: "Focus"
      },
      playNow: "Play Now",
      listenNow: "Listen Now",
      duration: "Duration",
      category: "Category",
      complete: "Mark Complete",
      completed: "Completed",
      continue: "Continue Listening",
      backToLibrary: "Back to Library",
      backToHub: "Back to Hub",
      playAmbient: "Play Ambient",
      stopAmbient: "Stop Ambient",
      nowPlaying: "Now Playing",
      paused: "Paused"
    },
    hi: {
      title: "ऑडियो अभयारण्य",
      subtitle: "मधुर ध्वनियां, संगीत और निर्देशित ध्यान",
      searchPlaceholder: "ऑडियो सामग्री खोजें...",
      aiGreeting: "नमस्ते! मैं आपका कल्याण साथी हूं। विश्राम और माइंडफुलनेस के लिए सही ऑडियो सामग्री खोजने में मदद करता हूं।",
      filters: {
        all: "सभी ऑडियो",
        relaxation: "विश्राम",
        meditation: "ध्यान",
        music: "संगीत",
        mindfulness: "माइंडफुलनेस",
        therapy: "चिकित्सा",
        focus: "फोकस"
      },
      playNow: "अभी चलाएं",
      listenNow: "अभी सुनें",
      duration: "अवधि",
      category: "श्रेणी",
      complete: "पूर्ण का निशान लगाएं",
      completed: "पूर्ण",
      continue: "सुनना जारी रखें",
      backToLibrary: "पुस्तकालय में वापस",
      backToHub: "हब में वापस",
      playAmbient: "परिवेशी चलाएं",
      stopAmbient: "परिवेशी रोकें",
      nowPlaying: "अब चल रहा है",
      paused: "रुका हुआ"
    }
  };

  const t = content[language];

  // Audio Library Data with working audio sources
  const audioLibrary = [
    {
      id: 101,
      title: "Ocean Waves - Deep Relaxation",
      duration: "30:00",
      category: "Relaxation",
      src: ArnorAudio ,
      description: "Gentle ocean waves to help you unwind and find inner peace. Perfect for stress relief and deep relaxation.",
      tags: ["ocean", "waves", "nature", "calming"],
      artist: "Nature Sounds Collective"
    },
    {
      id: 102,
      title: "Guided Breathing Exercise",
      duration: "15:00",
      category: "Meditation",
      src: EveningImprovisation,
      description: "Professional guided breathing techniques for stress relief and mindfulness practice.",
      tags: ["breathing", "guided", "meditation", "stress-relief"],
      artist: "Dr. Sarah Wellness"
    },
    {
      id: 103,
      title: "Peaceful Piano Melodies",
      duration: "45:00",
      category: "Music",
      src: MagicalMoments,
      description: "Gentle piano melodies composed specifically for relaxation and mental clarity.",
      tags: ["piano", "instrumental", "peaceful", "classical"],
      artist: "Harmony Studios"
    },
    {
      id: 104,
      title: "Forest Sounds - Birds Chirping",
      duration: "60:00",
      category: "Relaxation",
      src: Sonder ,
      description: "Natural forest ambiance with gentle bird songs for relaxation and connection with nature.",
      tags: ["forest", "birds", "nature", "ambient"],
      artist: "Wilderness Audio"
    },
    {
      id: 105,
      title: "Body Scan Meditation",
      duration: "25:00",
      category: "Mindfulness",
      src: Wildflowers,
      description: "Progressive body scan meditation to release tension and promote deep relaxation.",
      tags: ["body-scan", "mindfulness", "relaxation", "guided"],
      artist: "Mindful Living Institute"
    },
    {
      id: 106,
      title: "Rain Sounds for Sleep",
      duration: "2:00:00",
      category: "Relaxation",
      src: WinterLong,
      description: "Gentle rain sounds to help you fall asleep peacefully and stay asleep through the night.",
      tags: ["rain", "sleep", "nature", "ambient"],
      artist: "Sleep Sanctuary"
    },
    {
      id: 107,
      title: "Anxiety Relief Sounds",
      duration: "20:00",
      category: "Therapy",
      src: Expitition,
      description: "Therapeutic sound frequencies designed to calm anxiety and promote emotional balance.",
      tags: ["anxiety", "therapy", "healing", "frequencies"],
      artist: "Therapeutic Audio Labs"
    },
    {
      id: 108,
      title: "Focus Enhancement Binaural",
      duration: "30:00",
      category: "Focus",
      src: Fission,
      description: "Binaural beats tuned to enhance concentration and mental performance.",
      tags: ["binaural", "focus", "concentration", "study"],
      artist: "Cognitive Enhancement Audio"
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

  // Audio event listeners
  useEffect(() => {
    audioLibrary.forEach(audio => {
      const audioElement = audioRefs.current[audio.id];
      if (audioElement) {
        audioElement.addEventListener('loadedmetadata', () => {
          setAudioDurations(prev => ({
            ...prev,
            [audio.id]: audioElement.duration
          }));
        });

        audioElement.addEventListener('timeupdate', () => {
          if (audioElement.duration) {
            setAudioProgress(prev => ({
              ...prev,
              [audio.id]: (audioElement.currentTime / audioElement.duration) * 100
            }));
          }
        });

        audioElement.addEventListener('ended', () => {
          setCurrentlyPlaying(null);
          markComplete(audio.id);
        });
      }
    });
  }, []);

  const categoryFilters = ['all', 'relaxation', 'meditation', 'music', 'mindfulness', 'therapy', 'focus'];

  const playAmbientSound = () => {
    setIsPlaying(!isPlaying);
  };

  const markComplete = (audioId) => {
    setCompletedAudios(prev => new Set([...prev, audioId]));
  };

  const playAudio = (audioId) => {
    // Pause all other audios
    Object.values(audioRefs.current).forEach(audio => {
      if (audio && !audio.paused) {
        audio.pause();
      }
    });

    const audio = audioRefs.current[audioId];
    if (audio) {
      if (currentlyPlaying === audioId) {
        audio.pause();
        setCurrentlyPlaying(null);
      } else {
        audio.volume = isMuted ? 0 : volume;
        audio.play().catch(error => {
          console.log('Audio play failed:', error);
        });
        setCurrentlyPlaying(audioId);
      }
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const filteredAudios = audioLibrary.filter(audio => {
    const matchesSearch = audio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         audio.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         audio.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = activeFilter === 'all' || 
                         audio.category.toLowerCase() === activeFilter ||
                         audio.tags.some(tag => tag.toLowerCase() === activeFilter);
    
    return matchesSearch && matchesFilter;
  });

  // Library View
  if (currentView === 'library') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating orbs without rotation */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full opacity-20 ${i % 3 === 0 ? 'bg-purple-400' : i % 3 === 1 ? 'bg-pink-400' : 'bg-indigo-400'}`}
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
          
          {/* Musical notes */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`note-${i}`}
              className="absolute text-purple-300 opacity-40 text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `sparkle ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              ♪
            </div>
          ))}
        </div>

        {/* 3D Character Assistant */}
        <div 
          ref={characterRef}
          className="absolute top-20 right-10 z-30 cursor-pointer"
          onClick={() => setShowAIGuide(true)}
        >
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white/50 backdrop-blur-sm">
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
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-xl">
                <Headphones className="w-8 h-8" />
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

              {/* Volume Control */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:scale-110 transition-transform duration-200"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

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
                  className="w-full pl-12 pr-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 shadow-lg text-lg"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap justify-center">
                {categoryFilters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
                      activeFilter === filter 
                        ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-xl scale-105' 
                        : 'bg-white/90 text-gray-600 hover:bg-white hover:scale-105'
                    }`}
                  >
                    {t.filters[filter]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Audio Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAudios.map((audio, index) => {
                const isCompleted = completedAudios.has(audio.id);
                const isCurrentlyPlaying = currentlyPlaying === audio.id;
                const progress = audioProgress[audio.id] || 0;
                
                return (
                  <div
                    key={audio.id}
                    className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 border border-white/50"
                  >
                    {/* Completion Badge */}
                    {isCompleted && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-xl z-10 animate-bounce">
                        <Star className="w-4 h-4 text-white fill-current" />
                      </div>
                    )}

                    {/* Audio Visualizer */}
                    <div className="relative mb-4 overflow-hidden rounded-xl">
                      <div className={`w-full h-40 bg-gradient-to-br ${isCurrentlyPlaying ? 'from-purple-500 to-pink-500' : 'from-purple-400 to-pink-400'} rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-500`}>
                        <div className="flex items-center gap-2">
                          {isCurrentlyPlaying ? (
                            <>
                              {/* Animated equalizer bars */}
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-2 bg-white rounded-full animate-pulse"
                                  style={{
                                    height: `${20 + Math.random() * 40}px`,
                                    animationDelay: `${i * 0.1}s`,
                                    animationDuration: `${0.5 + Math.random() * 0.5}s`
                                  }}
                                />
                              ))}
                            </>
                          ) : (
                            <Headphones className="w-16 h-16 text-white" />
                          )}
                        </div>
                      </div>
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                        <button
                          onClick={() => playAudio(audio.id)}
                          className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300"
                        >
                          {isCurrentlyPlaying ? (
                            <Pause className="w-6 h-6 text-purple-600" />
                          ) : (
                            <Play className="w-6 h-6 text-purple-600 ml-1" />
                          )}
                        </button>
                      </div>

                      {/* Progress Bar */}
                      {progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                          <div 
                            className="h-full bg-white transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Audio Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900 line-clamp-2 leading-tight">
                          {audio.title}
                        </h3>
                        {!isCompleted && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markComplete(audio.id);
                            }}
                            className="ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                          >
                            <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                          </button>
                        )}
                      </div>

                      <p className="text-gray-600 text-sm mb-2">
                        {audio.artist}
                      </p>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {audio.description}
                      </p>

                      <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{audio.duration}</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                          {audio.category}
                        </span>
                        {isCurrentlyPlaying && (
                          <>
                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium animate-pulse">
                              {t.nowPlaying}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => playAudio(audio.id)}
                          className="flex-1 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          {isCurrentlyPlaying ? (
                            <>
                              <Pause className="w-4 h-4" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              {t.playNow}
                            </>
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAudio(audio);
                            setCurrentView('detail');
                          }}
                          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Hidden audio element */}
                    <audio
                      ref={el => audioRefs.current[audio.id] = el}
                      src={audio.src}
                      preload="metadata"
                    />
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

              <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">AI Audio Guide</h3>
                    <p className="text-gray-600">Your wellness companion</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">{t.aiGreeting}</p>
                <button
                  onClick={() => setShowAIGuide(false)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
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

  // Audio Detail View
  if (currentView === 'detail' && selectedAudio) {
    const isCompleted = completedAudios.has(selectedAudio.id);
    const isCurrentlyPlaying = currentlyPlaying === selectedAudio.id;
    const progress = audioProgress[selectedAudio.id] || 0;
    const duration = audioDurations[selectedAudio.id] || 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400/10 to-pink-400/10"></div>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20"
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

          {/* Audio Detail Content */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                {/* Audio Player */}
                <div className="lg:col-span-2">
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <div className={`w-full h-80 bg-gradient-to-br ${isCurrentlyPlaying ? 'from-purple-500 to-pink-500' : 'from-purple-400 to-pink-400'} rounded-2xl flex flex-col items-center justify-center p-8`}>
                      {/* Audio Visualizer */}
                      <div className="flex items-center gap-3 mb-8">
                        {isCurrentlyPlaying ? (
                          <>
                            {[...Array(7)].map((_, i) => (
                              <div
                                key={i}
                                className="w-3 bg-white rounded-full animate-pulse"
                                style={{
                                  height: `${30 + Math.random() * 60}px`,
                                  animationDelay: `${i * 0.15}s`,
                                  animationDuration: `${0.6 + Math.random() * 0.4}s`
                                }}
                              />
                            ))}
                          </>
                        ) : (
                          <Headphones className="w-24 h-24 text-white" />
                        )}
                      </div>

                      {/* Play Controls */}
                      <div className="flex items-center gap-6 mb-6">
                        <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <SkipBack className="w-6 h-6 text-white" />
                        </button>
                        
                        <button
                          onClick={() => playAudio(selectedAudio.id)}
                          className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
                        >
                          {isCurrentlyPlaying ? (
                            <Pause className="w-10 h-10 text-purple-600" />
                          ) : (
                            <Play className="w-10 h-10 text-purple-600 ml-1" />
                          )}
                        </button>

                        <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <SkipForward className="w-6 h-6 text-white" />
                        </button>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full max-w-md">
                        <div className="w-full h-2 bg-white/20 rounded-full mb-2">
                          <div 
                            className="h-2 bg-white rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-white/80 text-sm">
                          <span>{formatTime((progress / 100) * duration)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                      {selectedAudio.title}
                    </h1>
                    <p className="text-xl text-gray-600">
                      by {selectedAudio.artist}
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {selectedAudio.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {selectedAudio.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Audio Info Card */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Audio Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-purple-600" />
                        <div>
                          <span className="font-medium text-gray-700">{t.duration}:</span>
                          <span className="ml-2 text-gray-600">{selectedAudio.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Filter className="w-5 h-5 text-purple-600" />
                        <div>
                          <span className="font-medium text-gray-700">{t.category}:</span>
                          <span className="ml-2 text-gray-600">{selectedAudio.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Music className="w-5 h-5 text-purple-600" />
                        <div>
                          <span className="font-medium text-gray-700">Artist:</span>
                          <span className="ml-2 text-gray-600">{selectedAudio.artist}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => playAudio(selectedAudio.id)}
                      className="w-full py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                    >
                      {isCurrentlyPlaying ? (
                        <>
                          <Pause className="w-6 h-6" />
                          Pause Audio
                        </>
                      ) : (
                        <>
                          <Play className="w-6 h-6" />
                          {t.playNow}
                        </>
                      )}
                    </button>

                    {!isCompleted ? (
                      <button
                        onClick={() => markComplete(selectedAudio.id)}
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
                      className="w-full py-3 bg-indigo-100 text-indigo-800 border-2 border-indigo-200 rounded-2xl font-bold hover:bg-indigo-200 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      Get AI Guidance
                    </button>
                  </div>

                  {/* Related Audio */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Similar Audio</h3>
                    <div className="space-y-3">
                      {audioLibrary
                        .filter(a => a.id !== selectedAudio.id && a.category === selectedAudio.category)
                        .slice(0, 3)
                        .map((relatedAudio) => (
                          <div 
                            key={relatedAudio.id}
                            className="flex gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setSelectedAudio(relatedAudio)}
                          >
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                              <Headphones className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-800 line-clamp-1">
                                {relatedAudio.title}
                              </h4>
                              <p className="text-xs text-gray-500">{relatedAudio.artist}</p>
                              <p className="text-xs text-gray-400 mt-1">{relatedAudio.duration}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Progress Stats */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Your Progress</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-600">Audio Completed</span>
                          <span className="text-sm font-bold text-indigo-600">
                            {completedAudios.size}/{audioLibrary.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-indigo-400 to-purple-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(completedAudios.size / audioLibrary.length) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-indigo-600">{completedAudios.size}</div>
                          <div className="text-xs text-gray-600">Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {audioLibrary.length - completedAudios.size}
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
                <h3 className="text-2xl font-bold text-gray-800 mb-6">About This Audio</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    {selectedAudio.description} This carefully curated audio content is designed to support your mental 
                    wellness journey through {selectedAudio.category.toLowerCase()} techniques and immersive soundscapes.
                  </p>
                  
                  <div className="bg-purple-50 rounded-2xl p-6 border-l-4 border-purple-400">
                    <h4 className="font-bold text-gray-800 mb-3">What to Expect:</h4>
                    <ul className="space-y-2 text-gray-600">
                      {selectedAudio.category === 'Relaxation' && (
                        <>
                          <li>• Natural soundscapes designed to calm the nervous system</li>
                          <li>• High-quality audio for immersive relaxation experience</li>
                          <li>• Perfect for stress relief and unwinding after a long day</li>
                          <li>• Creates a peaceful atmosphere for meditation or rest</li>
                        </>
                      )}
                      {selectedAudio.category === 'Meditation' && (
                        <>
                          <li>• Guided meditation with clear, soothing voice instruction</li>
                          <li>• Structured practices for beginners and experienced meditators</li>
                          <li>• Focus on mindfulness and present-moment awareness</li>
                          <li>• Background music or silence to support your practice</li>
                        </>
                      )}
                      {selectedAudio.category === 'Music' && (
                        <>
                          <li>• Instrumental compositions crafted for relaxation</li>
                          <li>• Gentle melodies that promote peace and tranquility</li>
                          <li>• Perfect background for work, study, or relaxation</li>
                          <li>• High-quality audio production with rich harmonics</li>
                        </>
                      )}
                      {selectedAudio.category === 'Therapy' && (
                        <>
                          <li>• Evidence-based therapeutic content</li>
                          <li>• Supportive guidance for emotional wellbeing</li>
                          <li>• Professional voice and carefully structured sessions</li>
                          <li>• Tools for building resilience and coping skills</li>
                        </>
                      )}
                      {selectedAudio.category === 'Focus' && (
                        <>
                          <li>• Specially designed frequencies to enhance concentration</li>
                          <li>• Binaural beats and ambient sounds for productivity</li>
                          <li>• Helps maintain attention during work or study</li>
                          <li>• Background audio that doesn't distract from tasks</li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> This audio content is for wellness and relaxation purposes. 
                      Use comfortable volume levels and headphones or speakers for the best experience.
                      If you have hearing sensitivities, please adjust volume accordingly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden audio element for the selected audio */}
        <audio
          ref={el => audioRefs.current[selectedAudio.id] = el}
          src={selectedAudio.src}
          preload="metadata"
        />
      </div>
    );
  }

  return null;
};

export default AudioLibraryPage;



























// import React, { useState, useRef, useEffect } from 'react';
// import { Play, Pause, Search, Headphones } from 'lucide-react';

// const Audio = () => {
//   const [activeAudio, setActiveAudio] = useState(null);
//   const [progress, setProgress] = useState({});
//   const [duration, setDuration] = useState({});
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('Sleep');
//   const audioRefs = useRef({});

//   const audioBooks = [
//     {
//       id: 1,
//       title: "Ocean Waves",
//       duration: "10 min",
//       category: "Sleep",
//       src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
//     },
//     {
//       id: 2,
//       title: "Rain Sounds",
//       duration: "15 min",
//       category: "Sleep",
//       src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
//     },
//     {
//       id: 3,
//       title: "Forest Ambience",
//       duration: "8 min",
//       category: "Motivation",
//       src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
//     },
//     {
//       id: 4,
//       title: "Peaceful Piano",
//       duration: "20 min",
//       category: "Sleep",
//       src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
//     },
//     {
//       id: 5,
//       title: "Soft Guitar",
//       duration: "12 min",
//       category: "Motivation",
//       src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
//     },
//     {
//       id: 6,
//       title: "Focus Sounds",
//       duration: "14 min",
//       category: "ADHD",
//       src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
//     }
//   ];

//   const filteredAudioBooks = audioBooks.filter(audio => {
//     const matchesSearch = audio.title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'Sleep' || audio.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const toggleAudio = (audioId) => {
//     Object.values(audioRefs.current).forEach(audio => {
//       if (audio && !audio.paused) audio.pause();
//     });

//     if (activeAudio === audioId) {
//       setActiveAudio(null);
//     } else {
//       setActiveAudio(audioId);
//       const audio = audioRefs.current[audioId];
//       if (audio) {
//         audio.play().catch(err => console.log("Audio play failed:", err));
//       }
//     }
//   };

//   useEffect(() => {
//     audioBooks.forEach(audio => {
//       const audioElement = audioRefs.current[audio.id];
//       if (audioElement) {
//         audioElement.addEventListener("timeupdate", () => {
//           setProgress(prev => ({
//             ...prev,
//             [audio.id]: (audioElement.currentTime / audioElement.duration) * 100
//           }));
//           setDuration(prev => ({
//             ...prev,
//             [audio.id]: audioElement.duration
//           }));
//         });

//         audioElement.addEventListener("ended", () => {
//           setActiveAudio(null);
//         });
//       }
//     });
//   }, []);

//   const formatTime = (time) => {
//     if (!time || isNaN(time)) return "0:00";
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60).toString().padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 p-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
//           {/* Header */}
//           <div className="bg-purple-50 p-6 border-b border-purple-100">
//             <div className="flex items-center gap-3 mb-4">
//               <Headphones className="w-6 h-6 text-purple-600" />
//               <h2 className="text-2xl font-bold text-gray-800">Audios For Relaxation</h2>
//             </div>

//             {/* Search */}
//             <div className="relative mb-4">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-4 w-4 text-purple-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 bg-white"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             {/* Category Filter */}
//             <div className="text-sm text-gray-600">
//               <span className="mr-4">Category:</span>
//               {["Sleep", "Motivation", "ADHD"].map(cat => (
//                 <button
//                   key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`mr-2 px-3 py-1 rounded ${selectedCategory === cat
//                     ? "bg-purple-200 text-purple-800"
//                     : "text-purple-600 hover:bg-purple-100"}`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Audio List */}
//           <div className="p-6">
//             {filteredAudioBooks.map(audio => (
//               <div key={audio.id} className="mb-6">
//                 <div className="flex items-center justify-between py-3 px-4 hover:bg-purple-50 rounded-lg transition-colors border border-purple-100">
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={() => toggleAudio(audio.id)}
//                       className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
//                     >
//                       {activeAudio === audio.id ? (
//                         <Pause className="w-4 h-4" />
//                       ) : (
//                         <Play className="w-4 h-4 ml-0.5" />
//                       )}
//                     </button>
//                     <div>
//                       <span className="font-medium text-gray-800">{audio.title}</span>
//                       <div className="text-xs text-gray-500">{audio.category}</div>
//                     </div>
//                   </div>
//                   <span className="text-sm text-gray-500">
//                     {formatTime(duration[audio.id])}
//                   </span>
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="w-full h-2 bg-purple-100 rounded-full mt-2">
//                   <div
//                     className="h-2 bg-purple-500 rounded-full"
//                     style={{ width: `${progress[audio.id] || 0}%` }}
//                   ></div>
//                 </div>

//                 {/* Hidden audio */}
//                 <audio ref={(el) => (audioRefs.current[audio.id] = el)} src={audio.src} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Audio;
