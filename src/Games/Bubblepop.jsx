import React, { useState, useEffect } from 'react';
import { Leaf, Heart, Star, Sparkles, Music, Share2, TreePine, Target, Award, Clock } from 'lucide-react';

const ZenGardenBuilder = () => {
  const [score, setScore] = useState(0);
  const [gardenItems, setGardenItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [ripples, setRipples] = useState([]);
  const [floatingElements, setFloatingElements] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [challengeProgress, setChallengeProgress] = useState({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioContext, setAudioContext] = useState(null);

  const positiveThoughts = [
    "You are capable of amazing things ✨",
    "Peace begins with your breath 🌸",
    "Every moment is a fresh start 🌱",
    "You deserve tranquility and joy 💖",
    "Your mind is a beautiful garden 🌺",
    "Breathe in calm, breathe out stress 🍃"
  ];

  const gardenElements = {
    cherry_tree: { icon: '🌸', name: 'Cherry Tree', color: '#ff69b4', size: 40 },
    lotus_flower: { icon: '🪷', name: 'Lotus Flower', color: '#ffc0cb', size: 30 },
    zen_stone: { icon: '🪨', name: 'Zen Stone', color: '#708090', size: 25 },
    bamboo: { icon: '🎋', name: 'Bamboo', color: '#90ee90', size: 35 },
    mountain: { icon: '⛰️', name: 'Mountain', color: '#8fbc8f', size: 45 },
    water: { icon: '💧', name: 'Water Drop', color: '#87ceeb', size: 20 },
    bridge: { icon: '🌉', name: 'Bridge', color: '#daa520', size: 35 }
  };

  const challenges = [
    {
      id: 1,
      title: "Harmony Balance",
      description: "Place 3 Cherry Trees in the left half of your garden",
      type: "placement",
      target: { element: 'cherry_tree', count: 3, zone: 'left' },
      reward: 200,
      icon: "🌸"
    },
    {
      id: 2,
      title: "Stone Circle",
      description: "Create a circle with 5 Zen Stones in the center area",
      type: "pattern",
      target: { element: 'zen_stone', count: 5, zone: 'center' },
      reward: 300,
      icon: "🪨"
    },
    {
      id: 3,
      title: "Mountain Peaks",
      description: "Place 2 Mountains in the top half of your garden",
      type: "placement",
      target: { element: 'mountain', count: 2, zone: 'top' },
      reward: 250,
      icon: "⛰️"
    },
    {
      id: 4,
      title: "Bamboo Forest",
      description: "Create a bamboo grove with 4 bamboo plants on the right side",
      type: "placement",
      target: { element: 'bamboo', count: 4, zone: 'right' },
      reward: 300,
      icon: "🎋"
    },
    {
      id: 5,
      title: "Water Garden",
      description: "Place 6 Water Drops in the bottom half for a peaceful pond",
      type: "placement",
      target: { element: 'water', count: 6, zone: 'bottom' },
      reward: 350,
      icon: "💧"
    },
    {
      id: 6,
      title: "Sacred Lotus",
      description: "Place 3 Lotus Flowers anywhere to complete your zen sanctuary",
      type: "placement",
      target: { element: 'lotus_flower', count: 3, zone: 'anywhere' },
      reward: 400,
      icon: "🪷"
    }
  ];

  // Intro sequence
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
        // Start with first challenge
        setCurrentChallenge(challenges[0]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  // Create floating particles
  useEffect(() => {
    if (!showIntro) {
      const interval = setInterval(() => {
        setFloatingElements(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            y: 100,
            type: Math.random() > 0.5 ? '✨' : '🍃'
          }
        ].slice(-8));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [showIntro]);

  // Clean up floating elements
  useEffect(() => {
    const cleanup = setInterval(() => {
      setFloatingElements(prev => prev.slice(-5));
    }, 5000);

    return () => clearInterval(cleanup);
  }, []);

  // Audio setup and bird sounds
  useEffect(() => {
    if (audioEnabled && !audioContext) {
      createBirdSounds();
    }
  }, [audioEnabled]);

  const createBirdSounds = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(ctx);
      
      // Create continuous bird chirping sounds
      const playBirdChirp = () => {
        if (!ctx) return;
        
        // Create different bird sounds
        const frequencies = [800, 1200, 600, 1000, 1400];
        const frequency = frequencies[Math.floor(Math.random() * frequencies.length)];
        
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.8, ctx.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        
        oscillator.type = 'sine';
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
        
        // Schedule next chirp randomly between 2-8 seconds
        setTimeout(playBirdChirp, Math.random() * 6000 + 2000);
      };
      
      // Start the bird sounds
      setTimeout(playBirdChirp, 1000);
      
      // Add ambient background
      const createAmbientSound = () => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.setValueAtTime(100, ctx.currentTime);
        oscillator.type = 'sawtooth';
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, ctx.currentTime);
        
        gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
        
        oscillator.start();
        
        return { oscillator, gainNode };
      };
      
      createAmbientSound();
      
    } catch (error) {
      console.log('Audio not supported in this browser');
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (audioContext && !audioEnabled) {
      audioContext.resume();
    } else if (audioContext && audioEnabled) {
      audioContext.suspend();
    }
  };

  const playPlacementSound = () => {
    if (!audioContext || !audioEnabled) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
    
    oscillator.type = 'sine';
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const playCelebrationSound = () => {
    if (!audioContext || !audioEnabled) return;
    
    // Play a series of ascending notes for celebration
    const notes = [523, 659, 784, 1047]; // C, E, G, C (higher octave)
    
    notes.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
        
        oscillator.type = 'sine';
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
      }, index * 150);
    });
  };
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  // Check challenge completion
  useEffect(() => {
    if (currentChallenge) {
      checkChallengeCompletion();
    }
  }, [gardenItems, currentChallenge]);

  const getItemsInZone = (zone, elementType) => {
    return gardenItems.filter(item => {
      if (elementType && item.type !== elementType) return false;
      
      switch (zone) {
        case 'left':
          return item.x < 50;
        case 'right':
          return item.x > 50;
        case 'top':
          return item.y < 50;
        case 'bottom':
          return item.y > 50;
        case 'center':
          return item.x > 30 && item.x < 70 && item.y > 30 && item.y < 70;
        case 'anywhere':
          return true;
        default:
          return false;
      }
    });
  };

  const checkChallengeCompletion = () => {
    if (!currentChallenge) return;

    const { element, count, zone } = currentChallenge.target;
    const itemsInZone = getItemsInZone(zone, element);
    
    setChallengeProgress({
      current: itemsInZone.length,
      target: count,
      percentage: Math.min((itemsInZone.length / count) * 100, 100)
    });

    if (itemsInZone.length >= count) {
      completeChallenge();
    }
  };

  const completeChallenge = () => {
    if (!currentChallenge) return;

    setScore(prev => prev + currentChallenge.reward);
    setCompletedChallenges(prev => [...prev, currentChallenge.id]);
    setShowCelebration(true);
    
    // Play celebration sound
    playCelebrationSound();

    setTimeout(() => {
      setShowCelebration(false);
      // Move to next challenge
      const nextChallengeIndex = challenges.findIndex(c => c.id === currentChallenge.id) + 1;
      if (nextChallengeIndex < challenges.length) {
        setCurrentChallenge(challenges[nextChallengeIndex]);
        setChallengeProgress({ current: 0, target: challenges[nextChallengeIndex].target.count, percentage: 0 });
      } else {
        setCurrentChallenge(null);
      }
    }, 3000);
  };

  const createRipple = (x, y) => {
    const ripple = {
      id: Date.now(),
      x: x + '%',
      y: y + '%'
    };
    setRipples(prev => [...prev, ripple]);
  };

  const handleGardenClick = (e) => {
    if (!selectedItem) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (x < 5 || x > 95 || y < 5 || y > 95) return;

    const newItem = {
      id: Date.now(),
      type: selectedItem,
      x: x,
      y: y
    };

    setGardenItems(prev => [...prev, newItem]);
    createRipple(x, y);
    
    // Play placement sound
    playPlacementSound();
  };

  const selectItem = (itemType) => {
    setSelectedItem(selectedItem === itemType ? null : itemType);
  };

  const clearGarden = () => {
    setGardenItems([]);
    setScore(0);
    setSelectedItem(null);
    setCurrentChallenge(challenges[0]);
    setCompletedChallenges([]);
    setChallengeProgress({ current: 0, target: challenges[0].target.count, percentage: 0 });
  };

  const skipChallenge = () => {
    const nextChallengeIndex = challenges.findIndex(c => c.id === currentChallenge.id) + 1;
    if (nextChallengeIndex < challenges.length) {
      setCurrentChallenge(challenges[nextChallengeIndex]);
      setChallengeProgress({ current: 0, target: challenges[nextChallengeIndex].target.count, percentage: 0 });
    } else {
      setCurrentChallenge(null);
    }
  };

  // Intro Screen
  if (showIntro) {
    const randomThought = positiveThoughts[Math.floor(Math.random() * positiveThoughts.length)];
    
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center z-50">
        <div className="text-center text-white px-8">
          <div className="relative">
            {/* Animated background circles */}
            <div className="absolute -inset-20">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full absolute top-0 left-0 animate-ping" style={{ animationDelay: '0s' }} />
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full absolute top-10 right-0 animate-ping" style={{ animationDelay: '0.5s' }} />
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full absolute bottom-0 left-10 animate-ping" style={{ animationDelay: '1s' }} />
            </div>
            
            {/* Main content */}
            <div className="relative z-10">
              <div className="text-6xl mb-6 animate-bounce">🌸</div>
              <h1 className="text-4xl font-bold mb-4 animate-pulse">Welcome to Your Zen Garden</h1>
              <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-xl font-medium animate-pulse">{randomThought}</p>
              </div>
            </div>
            
            {/* Floating sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="text-2xl absolute top-4 left-4 animate-bounce" style={{ animationDelay: '0.2s' }}>✨</div>
              <div className="text-2xl absolute top-8 right-8 animate-bounce" style={{ animationDelay: '0.8s' }}>🌟</div>
              <div className="text-2xl absolute bottom-6 left-12 animate-bounce" style={{ animationDelay: '1.2s' }}>💫</div>
              <div className="text-2xl absolute bottom-4 right-4 animate-bounce" style={{ animationDelay: '1.6s' }}>✨</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Floating particles */}
      {floatingElements.map(particle => (
        <div
          key={particle.id}
          className="fixed text-2xl pointer-events-none opacity-70 transition-all duration-1000"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: 'translateY(-200px)',
            animation: 'floatUp 8s linear infinite'
          }}
        >
          {particle.type}
        </div>
      ))}

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 max-w-md mx-4 shadow-2xl transform animate-bounce">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Challenge Complete!</h3>
              <p className="text-lg text-gray-600 mb-4">{currentChallenge?.title}</p>
              <div className="text-3xl text-green-600 font-bold">+{currentChallenge?.reward} points!</div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 bg-white bg-opacity-20 backdrop-blur-md border-b border-white border-opacity-30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Zen Garden Builder</h1>
                <p className="text-sm text-gray-600">Complete challenges to build your sanctuary</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Score</p>
                <p className="text-xl font-bold text-purple-600">{score}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-bold text-green-600">{completedChallenges.length}/{challenges.length}</p>
              </div>
              <button 
                onClick={clearGarden}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-300 text-sm font-medium"
              >
                Reset
              </button>
              <button 
                onClick={toggleAudio}
                className={`p-2 rounded-full transition-all duration-300 ${
                  audioEnabled 
                    ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Music className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Game */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Garden Area */}
          <div className="lg:col-span-3">
            <div 
              className="relative bg-gradient-to-br from-green-100 to-emerald-50 rounded-3xl border-4 border-white border-opacity-50 shadow-2xl overflow-hidden cursor-crosshair"
              style={{ minHeight: '400px', aspectRatio: '16/10' }}
              onClick={handleGardenClick}
            >
              {/* Zone indicators when challenge is active */}
              {currentChallenge && (
                <div className="absolute inset-0 pointer-events-none">
                  {currentChallenge.target.zone === 'left' && (
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-200 bg-opacity-30 border-2 border-blue-300 border-dashed rounded-l-3xl" />
                  )}
                  {currentChallenge.target.zone === 'right' && (
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-200 bg-opacity-30 border-2 border-blue-300 border-dashed rounded-r-3xl" />
                  )}
                  {currentChallenge.target.zone === 'top' && (
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-200 bg-opacity-30 border-2 border-blue-300 border-dashed rounded-t-3xl" />
                  )}
                  {currentChallenge.target.zone === 'bottom' && (
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-blue-200 bg-opacity-30 border-2 border-blue-300 border-dashed rounded-b-3xl" />
                  )}
                  {currentChallenge.target.zone === 'center' && (
                    <div className="absolute top-1/2 left-1/2 w-2/5 h-2/5 bg-blue-200 bg-opacity-30 border-2 border-blue-300 border-dashed rounded-2xl transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
              )}

              {/* Selection indicator */}
              {selectedItem && (
                <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-lg z-10">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{gardenElements[selectedItem].icon}</span>
                    <span className="text-sm font-medium">Click to place {gardenElements[selectedItem].name}</span>
                  </div>
                </div>
              )}

              {/* Ripple effects */}
              {ripples.map(ripple => (
                <div
                  key={ripple.id}
                  className="absolute w-20 h-20 border-4 border-purple-300 rounded-full pointer-events-none"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    transform: 'translate(-50%, -50%)',
                    animation: 'ripple 1s ease-out forwards'
                  }}
                />
              ))}

              {/* Garden Items */}
              {gardenItems.map(item => (
                <div
                  key={item.id}
                  className="absolute transform transition-all duration-500 hover:scale-110 cursor-pointer"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    fontSize: `${gardenElements[item.type]?.size || 30}px`,
                    transform: 'translate(-50%, -50%)',
                    animation: 'bounceIn 0.8s ease-out'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    createRipple(item.x, item.y);
                  }}
                >
                  <div className="relative">
                    <span className="block filter drop-shadow-lg">
                      {gardenElements[item.type]?.icon}
                    </span>
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-full opacity-20 animate-pulse" />
                  </div>
                </div>
              ))}

              {/* Empty state */}
              {gardenItems.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Target className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                    <p className="text-xl font-medium">Complete challenges to build your garden</p>
                    <p className="text-sm mt-2">Select elements and follow the challenge guide</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Current Challenge */}
            {currentChallenge && (
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Current Challenge
                </h3>
                <div className="bg-white bg-opacity-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{currentChallenge.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-800">{currentChallenge.title}</h4>
                      <p className="text-sm text-gray-600">{currentChallenge.description}</p>
                    </div>
                  </div>
                  
                  {challengeProgress && (
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{challengeProgress.current}/{challengeProgress.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${challengeProgress.percentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <div className="text-xs text-gray-600 flex-1">
                    Reward: <span className="font-bold text-purple-600">+{currentChallenge.reward} points</span>
                  </div>
                  <button
                    onClick={skipChallenge}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Skip
                  </button>
                </div>
              </div>
            )}

            {/* Garden Elements */}
            <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-50">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <TreePine className="w-5 h-5 mr-2 text-green-500" />
                Garden Elements
              </h3>
              
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(gardenElements).map(([key, element]) => {
                  const isRequired = currentChallenge?.target.element === key;
                  return (
                    <button
                      key={key}
                      onClick={() => selectItem(key)}
                      className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        selectedItem === key
                          ? 'bg-gradient-to-r from-purple-200 to-blue-200 border-2 border-purple-300 shadow-lg'
                          : isRequired 
                          ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300'
                          : 'bg-white bg-opacity-50 border-2 border-gray-200 border-opacity-50 hover:bg-opacity-70'
                      }`}
                    >
                      <span className="text-2xl">{element.icon}</span>
                      <div className="flex-1 text-left">
                        <p className={`text-sm font-medium ${isRequired ? 'text-orange-700' : 'text-gray-700'}`}>
                          {element.name}
                        </p>
                        {isRequired && (
                          <p className="text-xs text-orange-600">Required for challenge!</p>
                        )}
                      </div>
                      {selectedItem === key && (
                        <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Progress Summary */}
            <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-50">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Your Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Score:</span>
                  <span className="font-bold text-purple-600">{score}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Elements Placed:</span>
                  <span className="font-bold text-gray-800">{gardenItems.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Challenges Left:</span>
                  <span className="font-bold text-green-600">{challenges.length - completedChallenges.length}</span>
                </div>
              </div>
              
              {completedChallenges.length === challenges.length && (
                <div className="mt-4 p-3 bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg text-center">
                  <p className="text-sm font-bold text-green-700">🎉 All Challenges Complete!</p>
                  <p className="text-xs text-green-600 mt-1">You are a Zen Master!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0px);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
        
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
        
        @keyframes bounceIn {
          0% {
            transform: translate(-50%, -50%) scale(0);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default ZenGardenBuilder;