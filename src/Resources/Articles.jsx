import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, FileText, Heart, Star, Moon, Shield, X, Volume2, Pause, ChevronLeft, Globe, Sparkles, ExternalLink, Clock, User, ChevronRight, Home, BookOpen, Bookmark, Eye, TrendingUp, Award } from 'lucide-react';

const ArticlesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [language, setLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [bookmarkedArticles, setBookmarkedArticles] = useState(new Set());
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showAIGuide, setShowAIGuide] = useState(false);
  const [currentView, setCurrentView] = useState('library'); // 'library' or 'detail'
  const floatingRef = useRef();
  const characterRef = useRef();

  // Multilingual content
  const content = {
    en: {
      title: "Articles & Guides",
      subtitle: "Evidence-based articles, self-help guides, and mental wellness resources",
      searchPlaceholder: "Search articles...",
      aiGreeting: "Hello! I'm your wellness guide. Let me help you find the perfect articles and resources for your mental health journey.",
      filters: {
        all: "All Articles",
        depression: "Depression",
        anxiety: "Anxiety", 
        stress: "Stress",
        sleep: "Sleep",
        adhd: "ADHD",
        mindfulness: "Mindfulness"
      },
      readNow: "Read Now",
      readTime: "Read Time",
      category: "Category",
      bookmark: "Bookmark",
      bookmarked: "Bookmarked",
      continue: "Continue Reading",
      backToLibrary: "Back to Articles",
      backToHub: "Back to Hub",
      playAmbient: "Play Ambient",
      stopAmbient: "Stop Ambient",
      author: "Author",
      featured: "Featured",
      trending: "Trending"
    },
    hi: {
      title: "लेख और गाइड",
      subtitle: "साक्ष्य-आधारित लेख, स्व-सहायता गाइड और मानसिक कल्याण संसाधन",
      searchPlaceholder: "लेख खोजें...",
      aiGreeting: "नमस्ते! मैं आपका कल्याण मार्गदर्शक हूं। आपकी मानसिक स्वास्थ्य यात्रा के लिए सही लेख खोजने में मदद करता हूं।",
      filters: {
        all: "सभी लेख",
        depression: "अवसाद",
        anxiety: "चिंता",
        stress: "तनाव",
        sleep: "नींद",
        adhd: "ADHD",
        mindfulness: "माइंडफुलनेस"
      },
      readNow: "अभी पढ़ें",
      readTime: "पढ़ने का समय",
      category: "श्रेणी",
      bookmark: "बुकमार्क करें",
      bookmarked: "बुकमार्क किया गया",
      continue: "पढ़ना जारी रखें",
      backToLibrary: "लेखों में वापस",
      backToHub: "हब में वापस",
      playAmbient: "परिवेशी बजाएं",
      stopAmbient: "परिवेशी रोकें",
      author: "लेखक",
      featured: "विशेष रूप से प्रदर्शित",
      trending: "ट्रेंडिंग"
    }
  };

  const t = content[language];

  // Articles Library Data - Enhanced with more comprehensive content
  const articlesLibrary = [
    {
      id: 1,
      title: "Understanding Depression: A Complete Guide",
      description: "Comprehensive guide to recognizing depression symptoms, causes, and evidence-based treatment options. Learn about different types of depression and when to seek professional help.",
      category: "Depression",
      language: "English",
      readTime: "10 min",
      author: "Dr. Sarah Johnson, Clinical Psychologist",
      link: "https://www.nimh.nih.gov/health/topics/depression",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      tags: ["depression", "mental health", "symptoms", "treatment"],
      featured: true,
      views: 2840,
      rating: 4.8
    },
    {
      id: 2,
      title: "10 Evidence-Based Techniques for Managing Anxiety",
      description: "Practical, scientifically-backed strategies to reduce anxiety in daily life. Includes breathing exercises, cognitive techniques, and lifestyle modifications.",
      category: "Anxiety",
      language: "English",
      readTime: "8 min",
      author: "Anxiety & Depression Society",
      link: "https://adaa.org/understanding-anxiety",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
      tags: ["anxiety", "coping", "techniques", "mindfulness"],
      trending: true,
      views: 3120,
      rating: 4.9
    },
    {
      id: 3,
      title: "Sleep Hygiene: The Ultimate Guide to Better Rest",
      description: "Transform your sleep quality with evidence-based sleep hygiene practices. Learn about circadian rhythms, sleep environment, and healthy bedtime routines.",
      category: "Sleep",
      language: "English",
      readTime: "12 min",
      author: "National Sleep Foundation",
      link: "https://www.sleepfoundation.org/sleep-hygiene",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop",
      tags: ["sleep", "hygiene", "insomnia", "rest"],
      views: 1980,
      rating: 4.7
    },
    {
      id: 4,
      title: "ADHD in Adults: Recognition and Management",
      description: "Complete guide to understanding adult ADHD, including symptoms, diagnosis, and effective management strategies for work and relationships.",
      category: "ADHD",
      language: "English",
      readTime: "15 min",
      author: "Dr. Michael Chen, Psychiatrist",
      link: "https://www.additudemag.com/category/manage-adhd-life/",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      tags: ["ADHD", "adults", "focus", "productivity"],
      views: 2156,
      rating: 4.6
    },
    {
      id: 5,
      title: "Stress Management: Building Resilience in Modern Life",
      description: "Learn practical stress management techniques, from quick relief strategies to long-term resilience building. Includes workplace stress solutions.",
      category: "Stress",
      language: "English",
      readTime: "9 min",
      author: "American Psychological Association",
      link: "https://www.apa.org/topics/stress",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      tags: ["stress", "resilience", "workplace", "management"],
      trending: true,
      views: 2674,
      rating: 4.5
    },
    {
      id: 6,
      title: "Mindfulness Meditation: A Beginner's Guide",
      description: "Start your mindfulness journey with this comprehensive beginner's guide. Learn basic techniques, benefits, and how to establish a daily practice.",
      category: "Mindfulness",
      language: "English",
      readTime: "7 min",
      author: "Mindfulness Institute",
      link: "https://www.mindful.org/meditation/mindfulness-getting-started/",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      tags: ["mindfulness", "meditation", "beginner", "practice"],
      featured: true,
      views: 1845,
      rating: 4.8
    },
    // Hindi Articles
    {
      id: 7,
      title: "डिप्रेशन को समझना: एक संपूर्ण गाइड",
      description: "अवसाद के लक्षण, कारण और उपचार की पूरी जानकारी। जानें कि कब और कैसे सहायता लें।",
      category: "Depression",
      language: "Hindi",
      readTime: "10 min",
      author: "डॉ. प्रिया शर्मा, मनोचिकित्सक",
      link: "https://www.narayanahealth.org/blog/%E0%A4%A1%E0%A4%BF%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A5%87%E0%A4%B6%E0%A4%A8-%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A4%BE-%E0%A4%B9%E0%A5%88",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      tags: ["अवसाद", "मानसिक स्वास्थ्य", "उपचार"],
      featured: true,
      views: 1234,
      rating: 4.7
    },
    {
      id: 8,
      title: "तनाव प्रबंधन: आधुनिक जीवन में संतुलन",
      description: "दैनिक जीवन में तनाव को कम करने के व्यावहारिक तरीके और मानसिक स्वास्थ्य बनाए रखने के उपाय।",
      category: "Stress",
      language: "Hindi",
      readTime: "8 min",
      author: "सी के बिड़ला अस्पताल",
      link: "https://ckbirlahospitals.com/cmri/blog/stress-in-hindi",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      tags: ["तनाव", "प्रबंधन", "जीवनशैली"],
      views: 987,
      rating: 4.6
    }
  ];

  // Smooth floating animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (floatingRef.current) {
        const time = Date.now() / 1000;
        floatingRef.current.style.transform = `translateY(${Math.sin(time * 0.5) * 8}px) scale(${1 + Math.sin(time * 0.3) * 0.03})`;
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Character animation
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

  const categoryFilters = ['all', 'depression', 'anxiety', 'stress', 'sleep', 'adhd', 'mindfulness'];

  const playAmbientSound = () => {
    setIsPlaying(!isPlaying);
  };

  const bookmarkArticle = (articleId) => {
    setBookmarkedArticles(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(articleId)) {
        newBookmarks.delete(articleId);
      } else {
        newBookmarks.add(articleId);
      }
      return newBookmarks;
    });
  };

  const openArticle = (link) => {
    window.open(link, '_blank');
  };

  const filteredArticles = articlesLibrary.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = activeFilter === 'all' || 
                         article.category.toLowerCase() === activeFilter ||
                         article.tags.some(tag => tag.toLowerCase() === activeFilter);
    
    const matchesLanguage = language === 'en' ? article.language === 'English' : article.language === 'Hindi';
    
    return matchesSearch && matchesFilter && matchesLanguage;
  });

  // Library View
  if (currentView === 'library') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating orbs */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full opacity-20 ${i % 3 === 0 ? 'bg-emerald-400' : i % 3 === 1 ? 'bg-teal-400' : 'bg-green-400'}`}
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
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white/50 backdrop-blur-sm">
              <BookOpen className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg text-xs font-medium text-gray-700">
              Guide
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
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-400 text-white shadow-xl">
                <FileText className="w-8 h-8" />
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
                  className="w-full pl-12 pr-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:border-emerald-400 shadow-lg text-lg"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap justify-center">
                {categoryFilters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
                      activeFilter === filter 
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-xl scale-105' 
                        : 'bg-white/90 text-gray-600 hover:bg-white hover:scale-105'
                    }`}
                  >
                    {t.filters[filter]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Articles Section */}
          <div className="max-w-7xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-600" />
              {t.featured}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.filter(article => article.featured).map(article => (
                <div
                  key={`featured-${article.id}`}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 border border-white/50 bg-gradient-to-br from-emerald-50 to-teal-50"
                >
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {t.featured}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative overflow-hidden rounded-xl">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-40 bg-gradient-to-br from-emerald-400 to-teal-400 items-center justify-center">
                        <FileText className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {article.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{article.rating}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openArticle(article.link);
                        }}
                        className="w-full py-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t.readNow}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
                All Articles
              </h2>
              <div className="text-sm text-gray-600">
                Showing {filteredArticles.length} articles
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArticles.filter(article => !article.featured).map((article, index) => {
                const isBookmarked = bookmarkedArticles.has(article.id);
                
                return (
                  <div
                    key={article.id}
                    className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 border border-white/50"
                  >
                    {/* Trending Badge */}
                    {article.trending && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-400 to-red-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </div>
                    )}

                    {/* Bookmark Badge */}
                    {isBookmarked && (
                      <div className="absolute -top-2 -left-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl z-10 animate-bounce">
                        <Bookmark className="w-4 h-4 text-white fill-current" />
                      </div>
                    )}

                    {/* Article Image */}
                    <div className="relative mb-4 overflow-hidden rounded-xl">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-full h-40 bg-gradient-to-br from-emerald-400 to-teal-400 items-center justify-center">
                        <FileText className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-black/60 text-white text-xs font-medium rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900 line-clamp-2 leading-tight">
                          {article.title}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            bookmarkArticle(article.id);
                          }}
                          className="ml-2 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'text-emerald-500 fill-current' : 'text-gray-400 hover:text-emerald-500'}`} />
                        </button>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {article.description}
                      </p>

                      <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span className="text-xs truncate">{article.author.split(',')[0]}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{article.rating}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openArticle(article.link);
                          }}
                          className="flex-1 py-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {t.readNow}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedArticle(article);
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

              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-teal-100/50 rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">AI Reading Guide</h3>
                    <p className="text-gray-600">Your wellness companion</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">{t.aiGreeting}</p>
                <button
                  onClick={() => setShowAIGuide(false)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
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
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    );
  }

  // Article Detail View
  if (currentView === 'detail' && selectedArticle) {
    const isBookmarked = bookmarkedArticles.has(selectedArticle.id);

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-400/10 to-teal-400/10"></div>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20"
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

          {/* Article Detail Content */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                {/* Article Preview */}
                <div className="lg:col-span-2">
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <img 
                      src={selectedArticle.image} 
                      alt={selectedArticle.title}
                      className="w-full h-80 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-80 bg-gradient-to-br from-emerald-400 to-teal-400 items-center justify-center">
                      <FileText className="w-20 h-20 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <button
                        onClick={() => openArticle(selectedArticle.link)}
                        className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
                      >
                        <ExternalLink className="w-12 h-12 text-emerald-600" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      {selectedArticle.featured && (
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-bold rounded-full">
                          {t.featured}
                        </span>
                      )}
                      {selectedArticle.trending && (
                        <span className="px-3 py-1 bg-gradient-to-r from-pink-400 to-red-400 text-white text-sm font-bold rounded-full flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {t.trending}
                        </span>
                      )}
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                        {selectedArticle.category}
                      </span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                      {selectedArticle.title}
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {selectedArticle.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Author Info */}
                    <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
                      <div className="flex items-center gap-3">
                        <User className="w-8 h-8 text-emerald-600 bg-white p-1 rounded-full" />
                        <div>
                          <h4 className="font-bold text-gray-800">{t.author}</h4>
                          <p className="text-gray-600 text-sm">{selectedArticle.author}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Article Info Card */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Article Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-emerald-600" />
                        <div>
                          <span className="font-medium text-gray-700">{t.readTime}:</span>
                          <span className="ml-2 text-gray-600">{selectedArticle.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Eye className="w-5 h-5 text-emerald-600" />
                        <div>
                          <span className="font-medium text-gray-700">Views:</span>
                          <span className="ml-2 text-gray-600">{selectedArticle.views}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <div>
                          <span className="font-medium text-gray-700">Rating:</span>
                          <span className="ml-2 text-gray-600">{selectedArticle.rating}/5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => openArticle(selectedArticle.link)}
                      className="w-full py-4 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                    >
                      <ExternalLink className="w-6 h-6" />
                      {t.readNow}
                    </button>

                    <button
                      onClick={() => bookmarkArticle(selectedArticle.id)}
                      className={`w-full py-3 border-2 rounded-2xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 ${
                        isBookmarked 
                          ? 'bg-emerald-500 text-white border-emerald-500' 
                          : 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                      {isBookmarked ? t.bookmarked : t.bookmark}
                    </button>

                    <button
                      onClick={() => setShowAIGuide(true)}
                      className="w-full py-3 bg-purple-100 text-purple-800 border-2 border-purple-200 rounded-2xl font-bold hover:bg-purple-200 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      Get AI Guidance
                    </button>
                  </div>

                  {/* Related Articles */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Related Articles</h3>
                    <div className="space-y-3">
                      {articlesLibrary
                        .filter(a => a.id !== selectedArticle.id && a.category === selectedArticle.category)
                        .slice(0, 3)
                        .map((relatedArticle) => (
                          <div 
                            key={relatedArticle.id}
                            className="flex gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setSelectedArticle(relatedArticle)}
                          >
                            <img 
                              src={relatedArticle.image} 
                              alt={relatedArticle.title}
                              className="w-16 h-12 object-cover rounded-lg"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="hidden w-16 h-12 bg-gradient-to-br from-emerald-400 to-teal-400 items-center justify-center rounded-lg">
                              <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-800 line-clamp-2">
                                {relatedArticle.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">{relatedArticle.readTime}</p>
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
                          <span className="text-sm font-medium text-gray-600">Articles Bookmarked</span>
                          <span className="text-sm font-bold text-purple-600">
                            {bookmarkedArticles.size}/{articlesLibrary.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(bookmarkedArticles.size / articlesLibrary.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{bookmarkedArticles.size}</div>
                          <div className="text-xs text-gray-600">Bookmarked</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-600">
                            {articlesLibrary.length - bookmarkedArticles.size}
                          </div>
                          <div className="text-xs text-gray-600">To Explore</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Preview Section */}
              <div className="border-t border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">About This Article</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">
                    {selectedArticle.description} This evidence-based content provides comprehensive insights 
                    into {selectedArticle.category.toLowerCase()} and offers practical strategies for mental wellness.
                  </p>
                  
                  <div className="bg-emerald-50 rounded-2xl p-6 border-l-4 border-emerald-400">
                    <h4 className="font-bold text-gray-800 mb-3">What You'll Learn:</h4>
                    <ul className="space-y-2 text-gray-600">
                      {selectedArticle.category === 'Depression' && (
                        <>
                          <li>• Understanding depression symptoms and types</li>
                          <li>• Evidence-based treatment approaches</li>
                          <li>• Self-care strategies and coping mechanisms</li>
                          <li>• When and how to seek professional help</li>
                        </>
                      )}
                      {selectedArticle.category === 'Anxiety' && (
                        <>
                          <li>• Recognizing anxiety triggers and patterns</li>
                          <li>• Practical anxiety management techniques</li>
                          <li>• Breathing exercises and relaxation methods</li>
                          <li>• Building long-term resilience</li>
                        </>
                      )}
                      {selectedArticle.category === 'Sleep' && (
                        <>
                          <li>• Understanding sleep cycles and hygiene</li>
                          <li>• Creating optimal sleep environments</li>
                          <li>• Addressing common sleep disorders</li>
                          <li>• Lifestyle factors affecting sleep quality</li>
                        </>
                      )}
                      {selectedArticle.category === 'Stress' && (
                        <>
                          <li>• Identifying stress sources and patterns</li>
                          <li>• Quick stress relief techniques</li>
                          <li>• Building resilience and coping skills</li>
                          <li>• Work-life balance strategies</li>
                        </>
                      )}
                      {(selectedArticle.category === 'ADHD' || selectedArticle.category === 'Mindfulness') && (
                        <>
                          <li>• Understanding the condition and its impact</li>
                          <li>• Practical management strategies</li>
                          <li>• Tools for daily life improvement</li>
                          <li>• Building support systems</li>
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

        {/* AI Guide Modal for Detail View */}
        {showAIGuide && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-white/50 relative">
              <button
                onClick={() => setShowAIGuide(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-teal-100/50 rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Article Guide</h3>
                    <p className="text-gray-600">Personalized reading assistance</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  I can help you understand key concepts from this article about {selectedArticle.category.toLowerCase()}, 
                  provide additional context, or suggest related resources for your wellness journey.
                </p>
                <button
                  onClick={() => setShowAIGuide(false)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Continue Reading
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default ArticlesPage;

// import React, { useState } from 'react';
// import { Search, FileText, ExternalLink, Clock, User, BookOpen, Heart } from 'lucide-react';

// const ArticlesComponent = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('Depression');
//   const [selectedLanguage, setSelectedLanguage] = useState('English');

//   const articles = [
//     // English articles (kept as before)
//     {
//       id: 1,
//       title: "10 Tips to Handle Exam Stress",
//       description: "Practical strategies to manage anxiety and perform better during exams.",
//       category: "Stress",
//       language: "English",
//       readTime: "5 min read",
//       author: "Mind.org.uk",
//       link: "https://www.mind.org.uk/information-support/tips-for-everyday-living/stress/",
//       image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop"
//     },
//     {
//       id: 2,
//       title: "How to Improve Sleep Cycle",
//       description: "Essential guide to better sleep hygiene and resetting your circadian rhythm.",
//       category: "Sleep",
//       language: "English",
//       readTime: "7 min read",
//       author: "Sleep Foundation",
//       link: "https://www.sleepfoundation.org/sleep-hygiene",
//       image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=200&fit=crop"
//     },
//     {
//       id: 3,
//       title: "Overcoming Social Anxiety",
//       description: "Step-by-step approach to managing social anxiety and building confidence.",
//       category: "Anxiety",
//       language: "English",
//       readTime: "8 min read",
//       author: "Healthline",
//       link: "https://www.healthline.com/health/anxiety/social-anxiety-tips",
//       image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop"
//     },
//     {
//       id: 4,
//       title: "Understanding Depression Symptoms",
//       description: "Comprehensive guide to recognizing depression signs and when to seek help.",
//       category: "Depression",
//       language: "English",
//       readTime: "10 min read",
//       author: "NIMH",
//       link: "https://www.nimh.nih.gov/health/topics/depression",
//       image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop"
//     },
//     {
//       id: 5,
//       title: "Self-Care Activities for Depression",
//       description: "Daily self-care practices that can help improve mood and mental health.",
//       category: "Depression",
//       language: "English",
//       readTime: "6 min read",
//       author: "Psychology Today",
//       link: "https://www.psychologytoday.com/us/basics/self-care",
//       image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
//     },
//     {
//       id: 6,
//       title: "Managing ADHD in Daily Life",
//       description: "Practical strategies for adults with ADHD to improve focus and productivity.",
//       category: "ADHD",
//       language: "English",
//       readTime: "9 min read",
//       author: "AdditudeMag",
//       link: "https://www.additudemag.com/category/manage-adhd-life/",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop"
//     },

//     // >>> Replaced Hindi articles (new reliable sources) <<<
//     {
//       id: 7,
//       title: "डिप्रेशन क्या है? (लक्षण और उपचार)",
//       description: "अवसाद के लक्षण, कारण और उपचार — सरल हिन्दी गाइड।",
//       category: "Depression",
//       language: "Hindi",
//       readTime: "8 min read",
//       author: "Narayana Health",
//       link: "https://www.narayanahealth.org/blog/%E0%A4%A1%E0%A4%BF%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A5%87%E0%A4%B6%E0%A4%A8-%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A4%BE-%E0%A4%B9%E0%A5%88",
//       image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop"
//     },
//     {
//       id: 8,
//       title: "तनाव: कारण, लक्षण और उपचार",
//       description: "तनाव प्रबंधन के व्यावहारिक उपाय — हिन्दी में।",
//       category: "Stress",
//       language: "Hindi",
//       readTime: "6 min read",
//       author: "C K Birla Hospitals (CMRI)",
//       link: "https://ckbirlahospitals.com/cmri/blog/stress-in-hindi",
//       image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
//     },
//     {
//       id: 9,
//       title: "Depression (वृद्ध वयस्कों के लिए) — हिन्दी अनुवाद",
//       description: "रॉयल कॉलेज ऑफ़ साइकियाट्रिस्ट्स का हिन्दी अनुवाद — डिप्रेशन पर भरोसेमंद सूचना।",
//       category: "Depression",
//       language: "Hindi",
//       readTime: "9 min read",
//       author: "Royal College of Psychiatrists (हिन्दी अनुवाद)",
//       link: "https://www.rcpsych.ac.uk/mental-health/translations/hindi/depression-in-adults",
//       image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=200&fit=crop"
//     },
//     {
//       id: 10,
//       title: "मानसिक स्वास्थ्य — सामान्य सलाह (Vikaspedia)",
//       description: "सरकारी/लोकल रूप से उपयोगी मानसिक स्वास्थ्य जानकारी और सुझाव (हिंदी)।",
//       category: "Mindfulness",
//       language: "Hindi",
//       readTime: "7 min read",
//       author: "Vikaspedia (Hindi)",
//       link: "https://health.vikaspedia.in/viewcontent/health/mental-health/92492893e935-92492593e-92e92894b91a93f91593f92494d93893e?lgn=hi",
//       image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
//     }
//   ];

//   const categories = ['Depression', 'Stress', 'Anxiety', 'Sleep', 'ADHD', 'Relationships', 'Mindfulness'];
//   const languages = ['English', 'Hindi'];

//   const filteredArticles = articles.filter(article => {
//     const matchesSearch =
//       article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       article.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'Depression' || article.category === selectedCategory;
//     const matchesLanguage = selectedLanguage === 'English' || article.language === selectedLanguage;
//     return matchesSearch && matchesCategory && matchesLanguage;
//   });

//   const limitedArticles = filteredArticles.slice(0, 6);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-25 to-purple-100 p-6" style={{background: 'linear-gradient(135deg, #f3f0ff 0%, #e9e5f3 50%, #ddd6fe 100%)'}}>
//       <div className="max-w-6xl mx-auto">
//         {/* Articles & Self-help Guides Section */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
//           {/* Header */}
//           <div className="bg-purple-50 p-6 border-b border-purple-100">
//             <div className="flex items-center gap-3 mb-4">
//               <FileText className="w-6 h-6 text-purple-600" />
//               <h2 className="text-2xl font-bold text-gray-800">Articles & Self-help Guides</h2>
//             </div>
            
//             {/* Search Bar */}
//             <div className="relative mb-4">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-4 w-4 text-purple-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             {/* Filter Options */}
//             <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//               <span>Filter:</span>
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="border border-purple-200 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-purple-400 bg-white"
//               >
//                 {categories.map(category => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
//               <select
//                 value={selectedLanguage}
//                 onChange={(e) => setSelectedLanguage(e.target.value)}
//                 className="border border-purple-200 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-purple-400 bg-white"
//               >
//                 {languages.map(language => (
//                   <option key={language} value={language}>{language}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Articles Grid */}
//           <div className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {limitedArticles.map(article => (
//                 <div key={article.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-purple-100 group">
//                   {/* Article Image */}
//                   <div className="relative overflow-hidden">
//                     <img
//                       src={article.image}
//                       alt={article.title}
//                       className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                       onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop"; }}
//                     />
//                     <div className="absolute top-3 left-3">
//                       <span className="px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
//                         {article.category}
//                       </span>
//                     </div>
//                     <div className="absolute top-3 right-3">
//                       <span className="px-2 py-1 bg-black bg-opacity-60 text-white text-xs font-medium rounded-full">
//                         {article.language}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Article Content */}
//                   <div className="p-5">
//                     <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
//                       {article.title}
//                     </h3>
                    
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
//                       {article.description}
//                     </p>
                    
//                     {/* Article Meta */}
//                     <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
//                       <div className="flex items-center gap-1">
//                         <User className="w-3 h-3" />
//                         <span>{article.author}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-3 h-3" />
//                         <span>{article.readTime}</span>
//                       </div>
//                     </div>

//                     {/* External Read More */}
//                     <a
//                       href={article.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2"
//                     >
//                       Read More
//                       <ExternalLink className="w-4 h-4" />
//                     </a>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* No Results */}
//             {limitedArticles.length === 0 && (
//               <div className="text-center py-12">
//                 <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-xl font-medium text-gray-600 mb-2">No articles found</h3>
//                 <p className="text-gray-500">Try adjusting your search or filter options</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Featured Self-Help Resources */}
//         <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
//           <div className="bg-purple-50 p-6 border-b border-purple-100">
//             <div className="flex items-center gap-3">
//               <BookOpen className="w-6 h-6 text-purple-600" />
//               <h2 className="text-2xl font-bold text-gray-800">Featured Self-Help Resources</h2>
//             </div>
//           </div>
//           <div className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <Heart className="w-8 h-8 text-purple-600" />
//                   <h3 className="text-xl font-bold text-gray-800">Crisis Support</h3>
//                 </div>
//                 <p className="text-gray-600 mb-4">If you're in crisis, please reach out for immediate help. You're not alone.</p>
//                 <div className="space-y-2 text-sm">
//                   <p><strong>National Suicide Prevention:</strong> 988</p>
//                   <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
//                   <p><strong>SAMHSA Helpline:</strong> 1-800-662-4357</p>
//                 </div>
//               </div>
              
//               <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 border border-purple-200">
//                 <div className="flex items-center gap-3 mb-4">
//                   <BookOpen className="w-8 h-8 text-blue-600" />
//                   <h3 className="text-xl font-bold text-gray-800">Daily Wellness Tips</h3>
//                 </div>
//                 <ul className="text-gray-600 space-y-2 text-sm">
//                   <li>• Practice 5 minutes of deep breathing daily</li>
//                   <li>• Write down 3 things you're grateful for</li>
//                   <li>• Take a 10-minute walk in nature</li>
//                   <li>• Connect with a supportive friend or family member</li>
//                   <li>• Maintain a consistent sleep schedule</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Supportive Message */}
//         <div className="mt-8 text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
//           <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
//             <FileText className="w-4 h-4 text-white" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">Knowledge is Healing</h3>
//           <p className="text-gray-600 max-w-xl mx-auto">
//             These evidence-based articles and guides are here to support your mental health journey. Take what resonates with you and remember that professional help is always available.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArticlesComponent;
