import React, { useState, useEffect } from "react";

// Custom Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail
      setTrail(prev => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ cursor: 'none' }}>
      {/* Cursor trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-3 h-3 bg-pink-400/50 rounded-full animate-ping"
          style={{
            left: point.x - 6,
            top: point.y - 6,
            opacity: (index + 1) / trail.length * 0.5,
            transform: `scale(${(index + 1) / trail.length})`,
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ${
          isClicking ? 'scale-150' : 'scale-100'
        }`}
        style={{ left: position.x, top: position.y }}
      >
        <div className="relative">
          {/* Flower cursor */}
          <div className={`w-8 h-8 text-2xl ${isClicking ? 'animate-spin' : 'animate-pulse'}`}>
            🌸
          </div>
          {/* Sparkles around cursor */}
          {isClicking && (
            <div className="absolute inset-0">
              {['✨', '🌟', '💫', '⭐'].map((sparkle, i) => (
                <div
                  key={i}
                  className="absolute animate-ping text-xs"
                  style={{
                    left: `${20 + 20 * Math.cos((i * Math.PI * 2) / 4)}px`,
                    top: `${20 + 20 * Math.sin((i * Math.PI * 2) / 4)}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  {sparkle}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Flying Flowers and Elements
const FlyingElements = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const createElements = () => {
      const flowers = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌳', '🍃', '🦋', '✨', '🌟', '💫', '🧚‍♀️', '🌿', '🌱'];
      const newElements = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        emoji: flowers[Math.floor(Math.random() * flowers.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5,
        scale: 0.5 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.7,
      }));
      setElements(newElements);
    };

    createElements();
    const interval = setInterval(() => {
      setElements(prev => 
        prev.map(el => ({
          ...el,
          x: (el.x + el.vx + window.innerWidth) % window.innerWidth,
          y: (el.y + el.vy + window.innerHeight) % window.innerHeight,
          rotation: el.rotation + el.rotationSpeed,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {elements.map(el => (
        <div
          key={el.id}
          className="absolute text-2xl animate-pulse"
          style={{
            left: el.x,
            top: el.y,
            transform: `rotate(${el.rotation}deg) scale(${el.scale})`,
            opacity: el.opacity,
            transition: 'all 0.1s linear',
          }}
        >
          {el.emoji}
        </div>
      ))}
    </div>
  );
};

// Floating Petals Background
const FloatingPetals = () => {
  const petals = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: ['🌸',][Math.floor(Math.random() * 5)],
    size: Math.random() * 30 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 15 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-bounce opacity-60"
          style={{
            fontSize: petal.size,
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            animationDirection: petal.id % 2 === 0 ? 'normal' : 'reverse',
          }}
        >
          {petal.emoji}
        </div>
      ))}
    </div>
  );
};

// Enhanced Breathing Circle with Flower Theme
const FlowerBreathingCircle = ({ isActive, sessionActive, currentTime, totalTime }) => {
  const progress = totalTime > 0 ? (currentTime / totalTime) * 1000 : 0;
  
  return (
    <div className="relative">
      {/* Outer flower petals */}
      <div className={`absolute inset-0 transition-all duration-2000 ${isActive ? 'animate-spin' : ''}`}>
        {Array.from({ length: 1 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-pulse"
            style={{
              left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 8)}%`,
              top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 8)}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.2}s`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Progress ring */}
      {sessionActive && (
        <svg className="absolute inset-0 w-40 h-40 -rotate-90 opacity-80">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="rgba(236, 72, 153, 0.3)"
            strokeWidth="6"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="rgba(236, 72, 153, 0.8)"
            strokeWidth="6"
            strokeDasharray={`${2 * Math.PI * 70}`}
            strokeDashoffset={`${2 * Math.PI * 70 * (1 - progress / 100)}`}
            className="transition-all duration-1000"
          />
        </svg>
      )}
      
      {/* Main circle */}
      <div className={`w-40 h-40 rounded-full bg-gradient-to-br from-pink-300/40 to-rose-400/40 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center transition-all duration-2000 shadow-2xl ${
        isActive ? 'animate-pulse scale-110 shadow-pink-500/50' : 'hover:scale-105'
      }`}>
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex flex-col items-center justify-center text-white font-bold shadow-lg relative overflow-hidden">
          {/* Floating petals inside */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-sm opacity-50 animate-bounce"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${20 + i * 20}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                🌸
              </div>
            ))}
          </div>
          
          {sessionActive ? (
            <>
              <span className="text-xs relative z-10">🌺 Time</span>
              <span className="text-lg relative z-10">{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
            </>
          ) : (
            <>
              <span className="text-2xl mb-1">🌸</span>
              <span className="relative z-10">{isActive ? 'Breathe' : 'Bloom'}</span>
            </>
          )}
        </div>
      </div>
      
      {/* Floating butterflies around circle */}
      {isActive && (
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-xl animate-bounce"
              style={{
                left: `${50 + 50 * Math.cos((i * Math.PI * 2) / 6)}%`,
                top: `${50 + 50 * Math.sin((i * Math.PI * 2) / 6)}%`,
                animationDelay: `${i * 0.3}s`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              🦋
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = target / 100;
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < target) {
          return Math.min(prev + increment, target);
        }
        clearInterval(timer);
        return target;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{Math.floor(count)}{suffix}</span>;
};

// Enhanced Feature Card with Flower Theme
const FlowerFeatureCard = ({ feature, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-8 text-left transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 border-4 border-pink-200 relative overflow-hidden ${
        isHovered ? 'scale-105 border-pink-400' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 0.2}s`,
      }}
    >
      {/* Background flowers */}
      <div className="absolute top-2 right-2 text-6xl opacity-10 animate-pulse">
        🌸
      </div>
      <div className="absolute bottom-2 left-2 text-4xl opacity-10 animate-bounce">
        🌿
      </div>
      
      <div className={`text-6xl mb-4 transition-transform duration-300 relative z-10 ${isHovered ? 'animate-bounce' : ''}`}>
        {feature.icon}
      </div>
      <h3 className="text-2xl font-bold mt-4 text-gray-800 relative z-10">{feature.title}</h3>
      <p className="text-gray-600 mt-3 leading-relaxed text-lg relative z-10">{feature.desc}</p>
      <div className={`mt-6 transition-all duration-300 relative z-10 ${isHovered ? 'translate-x-2' : ''}`}>
        <span className="text-pink-500 font-bold text-lg flex items-center gap-2">
          🌺 Explore More →
        </span>
      </div>
      
      {/* Floating elements on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-sm animate-ping"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function IntroductionPage() {
  const [breathingActive, setBreathingActive] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [isVisible, setIsVisible] = useState({});
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  // Session timer
  useEffect(() => {
    let interval;
    if (sessionActive) {
      interval = setInterval(() => {
        setSessionTime(prev => {
          if (prev >= selectedDuration * 60) {
            setSessionActive(false);
            alert('🌸 Meditation session completed! You bloomed beautifully! 🌸');
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setSessionTime(0);
    }
    return () => clearInterval(interval);
  }, [sessionActive, selectedDuration]);

  // Start meditation session
  const startSession = () => {
    setSessionActive(true);
    setBreathingActive(true);
  };

  // Stop session
  const stopSession = () => {
    setSessionActive(false);
    setBreathingActive(false);
    setSessionTime(0);
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[id^="section-"]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "🌱 AI Bloom Assessment",
      desc: "Discover your mental garden's growth patterns with AI that understands your unique journey toward wellness and inner peace.",
      icon: "🌺",
    },
    {
      title: "🦋 Mindful Metamorphosis",
      desc: "Transform daily through guided meditations, breathing gardens, and mindfulness practices that help you bloom into your best self.",
      icon: "🦋",
    },
    {
      title: "📚 Wisdom Grove Library",
      desc: "Access a forest of knowledge with therapeutic techniques and healing resources cultivated by expert mental health gardeners.",
      icon: "🌳",
    },
    {
      title: "🌸 Blooming Community",
      desc: "Connect with fellow flowers in our nurturing garden - a safe space where every soul can grow, heal, and flourish together.",
      icon: "🌻",
    },
  ];

  const stats = [
    {
      stat: "87",
      suffix: "%",
      title: "🌸 Mental Blooming Success",
      desc: "Watch your mind garden flourish with measurable improvements in mood, anxiety relief, and overall life satisfaction.",
      icon: "🌺",
    },
    {
      stat: "92",
      suffix: "%",
      title: "🦋 Stress Transformation",
      desc: "Master the art of inner peace with our butterfly-gentle stress management techniques and healing practices.",
      icon: "🦋",
    },
    {
      stat: "50",
      suffix: "+",
      title: "🌿 Expert Gardeners",
      desc: "Learn from our team of licensed therapists, psychologists, and wellness experts who cultivate our healing content.",
      icon: "🌿",
    },
    {
      stat: "10",
      suffix: "K+",
      title: "🌻 Thriving Garden",
      desc: "Join thousands of beautiful souls who found their place in our supportive wellness community garden.",
      icon: "🌻",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50" style={{ cursor: 'none' }}>
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Flying Elements */}
      <FlyingElements />
      
      {/* ENCHANTED HERO SECTION */}
      <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between gap-10 px-6 lg:px-20 py-16 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 text-white overflow-hidden">
        <FloatingPetals />
        
        {/* Magical Background Elements */}
        <div className="absolute top-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-pink-300/20 rounded-full blur-2xl animate-bounce" />
        <div className="absolute top-1/2 left-10 w-40 h-40 bg-yellow-300/15 rounded-full blur-xl animate-spin" />
        <div className="absolute top-10 left-1/2 w-32 h-32 bg-purple-300/15 rounded-full blur-lg animate-pulse" />
        
        {/* Flying stickers */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`absolute text-4xl ${
                i % 4 === 0 ? 'animate-bounce' : i % 4 === 1 ? 'animate-ping' : i % 4 === 2 ? 'animate-pulse' : 'animate-spin'
              }`}
              style={{
                left: `${5 + i * 8}%`,
                top: `${10 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.3}s`,
              }}
            >
              {[ '✨',  '🌟'][i]}
            </div>
          ))}
        </div>
        
        {/* Left Content */}
        <div className="max-w-2xl relative z-10 transform transition-all duration-1000 translate-y-0">
          <div className="animate-fadeInUp">
            <span className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-lg font-medium mb-8 animate-bounce">
              🌸 Transform Your Soul Garden 🦋
            </span>
            <h1 className="text-6xl lg:text-8xl font-bold leading-tight mb-8">
              Bloom into{" "}
              <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent animate-pulse">
                Your Best Self
              </span>
            </h1>
            <p className="text-2xl text-purple-100 leading-relaxed mb-12">
              Embark on a magical journey through our enchanted wellness garden, where every breath nurtures your soul and every moment helps you blossom 🌺
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex flex-col items-center group">
              <div
                className="cursor-pointer transition-transform duration-300 hover:scale-110"
                onClick={() => setBreathingActive(!breathingActive)}
              >
                <FlowerBreathingCircle 
                  isActive={breathingActive} 
                  sessionActive={sessionActive}
                  currentTime={sessionTime}
                  totalTime={selectedDuration * 60}
                />
              </div>
              <button
                onClick={() => setBreathingActive(!breathingActive)}
                className="mt-8 px-8 py-4 border-3 border-white/50 backdrop-blur-sm rounded-full hover:bg-white hover:text-purple-500 transition-all duration-300 font-bold text-lg transform hover:scale-105 shadow-lg"
              >
                {breathingActive ? '🌸 Stop Blooming' : '🌺 Start Blooming Exercise'}
              </button>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col items-center justify-center text-2xl font-bold shadow-2xl transition-transform hover:scale-110 relative overflow-hidden border-4 border-white/30">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-20 animate-pulse" />
                
                {/* Floating elements inside timer */}
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-lg opacity-30 animate-bounce"
                      style={{
                        left: `${20 + i * 20}%`,
                        top: `${20 + i * 15}%`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    >
                      {[ '🦋', '🌿'][i]}
                    </div>
                  ))}
                </div>
                
                <span className="text-4xl animate-pulse relative z-10">🕐</span>
                <span className="relative z-10 text-white">
                  {sessionActive ? formatTime(sessionTime) : `${selectedDuration}:00`}
                </span>
                {sessionActive && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="flex gap-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-8 flex items-center gap-6">
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
                  disabled={sessionActive}
                  className="px-6 py-3 rounded-full text-gray-700 font-bold focus:outline-none focus:ring-4 focus:ring-pink-300 disabled:opacity-50 text-lg shadow-lg"
                >
                  <option value={1}>🌸 1 minute bloom</option>
                  <option value={3}>🌺 3 minute garden</option>
                  <option value={5}>🌻 5 minute sanctuary</option>
                  <option value={10}>🦋 10 minute journey</option>
                  <option value={15}>🌈 15 minute paradise</option>
                </select>
                <button 
                  onClick={sessionActive ? stopSession : startSession}
                  className={`px-8 py-4 rounded-full text-white font-bold transition-all duration-300 transform hover:scale-105 shadow-xl text-lg ${
                    sessionActive 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  }`}
                >
                  {sessionActive ? '🛑 Stop Journey' : '🚀 Begin Journey'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Inspiration Card */}
        <div className="hidden lg:block relative z-10">
          <div className="bg-white/20 backdrop-blur-lg p-10 rounded-3xl shadow-2xl max-w-sm transform transition-all duration-500 hover:scale-105 hover:bg-white/25 border-2 border-white/30">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl animate-spin">🌟</span>
              <h3 className="text-3xl font-bold">Daily Magic</h3>
            </div>
            <p className="text-purple-50 italic text-xl leading-relaxed">
              "Like flowers, we bloom at our own pace. Every breath is a chance to grow more beautiful. 🌸"
            </p>
            <div className="mt-6 flex items-center gap-3 text-lg text-purple-200">
              <span className="text-2xl">⏰</span>
              <span>Fresh inspiration blooms at dawn ✨</span>
            </div>
            
            {/* Floating elements around inspiration */}
            <div className="absolute -top-4 -right-4 text-3xl animate-bounce">🦋</div>
            <div className="absolute -bottom-4 -left-4 text-2xl animate-pulse">🌺</div>
          </div>
        </div>
      </section>

      {/* BLOOMING RESULTS SECTION */}
      <section 
        id="section-stats" 
        className={`bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 lg:px-20 py-32 text-center relative overflow-hidden transition-all duration-1000 ${
          isVisible['section-stats'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Floating garden elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-6xl opacity-10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${Math.random() * 20 + 25}s`,
              }}
            >
              {[ '🌻', '🦋', '🌿'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
        
        <div className="relative z-10">
          <span className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-lg font-bold mb-8">
            🌺 Garden of Success 🌺
          </span>
          <h2 className="text-6xl font-bold mb-8">Witness the Magic of Growth</h2>
          <p className="text-2xl text-purple-100 max-w-4xl mx-auto mb-20 leading-relaxed">
            Join our blooming community where thousands of beautiful souls have already transformed their lives through our enchanted wellness garden 🌸
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((item, i) => (
              <div
                key={i}
                className={`bg-white/15 backdrop-blur-sm rounded-3xl p-10 text-left shadow-2xl hover:bg-white/25 transition-all duration-500 transform hover:-translate-y-4 border-2 border-white/20 ${
                  isVisible['section-stats'] ? 'animate-fadeInUp' : ''
                }`}
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-5xl font-bold text-white mb-4">
                  <AnimatedCounter target={parseInt(item.stat)} suffix={item.suffix} />
                </h3>
                <h4 className="font-bold text-2xl mb-4 text-purple-100">{item.title}</h4>
                <p className="text-purple-50 leading-relaxed text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAGICAL FEATURES GARDEN */}
      <section 
        id="section-features" 
        className={`bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 px-6 lg:px-20 py-32 text-center relative overflow-hidden transition-all duration-1000 ${
          isVisible['section-features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background garden elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-8xl opacity-5 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              {[ '🌿', '🌱', '✨'][Math.floor(Math.random() * 7)]}
            </div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="inline-block px-6 py-3 bg-pink-200 text-pink-700 rounded-full text-lg font-bold mb-8">
            🌻 Magical Features Garden 🌻
          </span>
          <h2 className="text-6xl font-bold mb-8">
            Why Choose Our{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Enchanted Arogya? 🌺
            </span>
          </h2>
          <p className="text-gray-600 text-2xl max-w-4xl mx-auto mb-20 leading-relaxed">
            Step into our magical wellness sanctuary where cutting-edge technology meets nature's healing wisdom to create your perfect garden of growth 🦋
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, i) => (
              <FlowerFeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ENCHANTED CALL TO ACTION */}
      <section 
        id="section-cta" 
        className={`bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-6 lg:px-20 py-32 text-center relative overflow-hidden transition-all duration-1000 ${
          isVisible['section-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-pink-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-400/30 rounded-full blur-3xl animate-bounce" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-ping" />
        </div>
        
        {/* Flying magical elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-bounce opacity-60"
              style={{
                left: `${10 + i * 8}%`,
                top: `${20 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2 + i * 0.2}s`,
              }}
            >
              {['🌸', '🦋', '💫', '🧚‍♀️', '🌈',][i]}
            </div>
          ))}
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-6xl lg:text-7xl font-bold mb-8">
            Ready to Bloom in Your{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Magical Garden? 🌸
            </span>
          </h2>
          <p className="text-2xl text-purple-100 max-w-4xl mx-auto mb-16 leading-relaxed">
            Take the first magical step towards your transformation. Join thousands of beautiful souls who found their inner paradise through Arogya's enchanted wellness sanctuary 🦋
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <button 
              onClick={() => window.location.href = '#signup'}
              className="px-12 py-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-2xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-110 border-2 border-white/30"
            >
              🌺 Begin Your Magical Journey
            </button>
            <button className="px-12 py-5 rounded-full border-3 border-white/50 font-bold text-2xl hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm">
              🎬 Watch Our Garden Tour
            </button>
          </div>
          
          <div className="mt-16 flex justify-center items-center gap-12 text-lg text-purple-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌸</span>
              <span>7-day magical trial</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔮</span>
              <span>Sacred privacy protection</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🦋</span>
              <span>Available on all realms</span>
            </div>
          </div>
        </div>
      </section>

      {/* ENCHANTED FOOTER GARDEN */}
      <footer className="bg-gradient-to-b from-white to-pink-50 border-t-8 border-pink-300 py-20 px-8 lg:px-20 relative overflow-hidden">
        {/* Background garden */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-6xl opacity-10 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.7}s`,
              }}
            >
              {['🌸',  '🌿'][Math.floor(Math.random() * 10)]}
            </div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 text-gray-700 mb-16">
            <div className="md:col-span-2">
              <h3 className="font-bold text-4xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-6">
                🌸 Arogya Garden
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed mb-8">
                Nurturing beautiful souls and healing precious hearts through our magical garden of compassion, wonder, and evidence-based wellness practices 🦋
              </p>
              <div className="flex gap-6">
                {['📧', '💬', '📱', '🌐'].map((icon, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center text-3xl hover:bg-pink-300 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:animate-bounce"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
            
            {[
              {
                title: "🌺 Garden Resources",
                links: ["Soul Assessment 🌱", "Daily Practices 🦋", "Wisdom Library 📚", "Community Garden 🌻"]
              },
              {
                title: "🌸 Garden Support",
                links: ["Help Center 💫", "Contact Gardeners 🧚‍♀️", "Privacy Sanctuary 🔮", "Garden Rules 📜"]}
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-bold text-2xl mb-6 text-gray-800">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors text-lg hover:underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t-2 border-pink-200 pt-8 text-center">
            <p className="text-gray-500 text-xl">
              © 2025 Arogya Enchanted Garden. All magic reserved. Crafted with 💖 for blooming souls everywhere 🌸
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-30px) translateX(15px) rotate(90deg);
          }
          50% {
            transform: translateY(-60px) translateX(-15px) rotate(180deg);
          }
          75% {
            transform: translateY(-30px) translateX(20px) rotate(270deg);
          }
        }
        
        @keyframes wave {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 25s ease-in-out infinite;
        }
        
        .animate-wave {
          animation: wave 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default IntroductionPage;