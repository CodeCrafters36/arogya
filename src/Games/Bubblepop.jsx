import React, { useState, useEffect } from 'react';
import { Leaf, Heart, Star, Sparkles, Music, Share2, TreePine, Target, Award, Clock } from 'lucide-react';

const ZenGardenBuilder = () => {
  const [zenScore, setZenScore] = useState(0);
  const [zenGardenItems, setZenGardenItems] = useState([]);
  const [zenSelectedItem, setZenSelectedItem] = useState(null);
  const [zenShowIntro, setZenShowIntro] = useState(true);
  const [zenRipples, setZenRipples] = useState([]);
  const [zenFloatingElements, setZenFloatingElements] = useState([]);
  const [zenCurrentChallenge, setZenCurrentChallenge] = useState(null);
  const [zenCompletedChallenges, setZenCompletedChallenges] = useState([]);
  const [zenChallengeProgress, setZenChallengeProgress] = useState({});
  const [zenShowCelebration, setZenShowCelebration] = useState(false);
  const [zenAudioEnabled, setZenAudioEnabled] = useState(false);
  const [zenAudioContext, setZenAudioContext] = useState(null);
  const [zenFlyingBirds, setZenFlyingBirds] = useState([]);

  const zenPositiveThoughts = [
    "You are capable of amazing things ✨",
    "Peace begins with your breath 🌸",
    "Every moment is a fresh start 🌱",
    "You deserve tranquility and joy 💖",
    "Your mind is a beautiful garden 🌺",
    "Breathe in calm, breathe out stress 🍃"
  ];

  const zenGardenElements = {
    cherry_tree: { icon: '🌸', name: 'Cherry Tree', color: '#ff69b4', size: 40 },
    lotus_flower: { icon: '🪷', name: 'Lotus Flower', color: '#ffc0cb', size: 30 },
    zen_stone: { icon: '🪨', name: 'Zen Stone', color: '#708090', size: 25 },
    bamboo: { icon: '🎋', name: 'Bamboo', color: '#90ee90', size: 35 },
    mountain: { icon: '⛰️', name: 'Mountain', color: '#8fbc8f', size: 45 },
    water: { icon: '💧', name: 'Water Drop', color: '#87ceeb', size: 20 },
    bridge: { icon: '🌉', name: 'Bridge', color: '#daa520', size: 35 }
  };

  const zenChallenges = [
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

  // Intro sequence with flying birds
  useEffect(() => {
    if (zenShowIntro) {
      // Create flying birds for the intro
      const birdInterval = setInterval(() => {
        setZenFlyingBirds(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: -20,
            y: Math.random() * 80 + 10,
            direction: Math.random() > 0.5 ? 'right' : 'left',
            speed: Math.random() * 3 + 2,
            type: Math.random() > 0.5 ? '🐦' : '🕊️'
          }
        ].slice(-8));
      }, 1500);

      const timer = setTimeout(() => {
        setZenShowIntro(false);
        setZenFlyingBirds([]);
        // Start with first challenge
        setZenCurrentChallenge(zenChallenges[0]);
        setZenChallengeProgress({ current: 0, target: zenChallenges[0].target.count, percentage: 0 });
      }, 8000);
      
      return () => {
        clearTimeout(timer);
        clearInterval(birdInterval);
      };
    }
  }, [zenShowIntro]);



  
  // Update bird positions
  useEffect(() => {
    if (zenFlyingBirds.length > 0) {
      const birdMoveInterval = setInterval(() => {
        setZenFlyingBirds(prev => 
          prev.map(bird => {
            const newX = bird.direction === 'right' 
              ? bird.x + bird.speed 
              : bird.x - bird.speed;
            
            // Remove birds that have flown off screen
            if (newX > 120 || newX < -20) return null;
            
            return { ...bird, x: newX };
          }).filter(Boolean)
        );
      }, 50);
      
      return () => clearInterval(birdMoveInterval);
    }
  }, [zenFlyingBirds.length]);

  // Create floating particles
  useEffect(() => {
    if (!zenShowIntro) {
      const interval = setInterval(() => {
        setZenFloatingElements(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            y: 100,
            type: Math.random() > 0.5 ? '✨' : '🍃',
            rotation: Math.random() * 360
          }
        ].slice(-12));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [zenShowIntro]);

  // Clean up floating elements
  useEffect(() => {
    const cleanup = setInterval(() => {
      setZenFloatingElements(prev => prev.slice(-8));
    }, 5000);

    return () => clearInterval(cleanup);
  }, []);

  // Audio setup and bird sounds
  useEffect(() => {
    if (zenAudioEnabled && !zenAudioContext) {
      zenCreateBirdSounds();
    }
  }, [zenAudioEnabled, zenAudioContext]);

  const zenCreateBirdSounds = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      setZenAudioContext(ctx);
      
      // Create continuous bird chirping sounds
      const playBirdChirp = () => {
        if (!ctx || ctx.state === 'closed') return;
        
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
        if (zenAudioEnabled) {
          setTimeout(playBirdChirp, Math.random() * 6000 + 2000);
        }
      };
      
      // Start the bird sounds after a small delay
      setTimeout(playBirdChirp, 1000);
      
    } catch (error) {
      console.log('Audio not supported in this browser');
    }
  };

  const zenToggleAudio = () => {
    setZenAudioEnabled(!zenAudioEnabled);
    if (zenAudioContext && !zenAudioEnabled) {
      zenAudioContext.resume();
    } else if (zenAudioContext && zenAudioEnabled) {
      zenAudioContext.suspend();
    }
  };

  const zenPlayPlacementSound = () => {
    if (!zenAudioContext || !zenAudioEnabled || zenAudioContext.state !== 'running') return;
    
    try {
      const oscillator = zenAudioContext.createOscillator();
      const gainNode = zenAudioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(zenAudioContext.destination);
      
      oscillator.frequency.setValueAtTime(400, zenAudioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, zenAudioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0, zenAudioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, zenAudioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, zenAudioContext.currentTime + 0.2);
      
      oscillator.type = 'sine';
      oscillator.start(zenAudioContext.currentTime);
      oscillator.stop(zenAudioContext.currentTime + 0.2);
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const zenPlayCelebrationSound = () => {
    if (!zenAudioContext || !zenAudioEnabled || zenAudioContext.state !== 'running') return;
    
    // Play a series of ascending notes for celebration
    const notes = [523, 659, 784, 1047]; // C, E, G, C (higher octave)
    
    notes.forEach((freq, index) => {
      setTimeout(() => {
        try {
          const oscillator = zenAudioContext.createOscillator();
          const gainNode = zenAudioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(zenAudioContext.destination);
          
          oscillator.frequency.setValueAtTime(freq, zenAudioContext.currentTime);
          gainNode.gain.setValueAtTime(0, zenAudioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.15, zenAudioContext.currentTime + 0.05);
          gainNode.gain.exponentialRampToValueAtTime(0.001, zenAudioContext.currentTime + 0.4);
          
          oscillator.type = 'sine';
          oscillator.start(zenAudioContext.currentTime);
          oscillator.stop(zenAudioContext.currentTime + 0.4);
        } catch (error) {
          console.log('Error playing celebration sound:', error);
        }
      }, index * 150);
    });
  };

  // Clean up ripples
  useEffect(() => {
    if (zenRipples.length > 0) {
      const timer = setTimeout(() => {
        setZenRipples([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [zenRipples]);

  // Check challenge completion
  useEffect(() => {
    if (zenCurrentChallenge) {
      zenCheckChallengeCompletion();
    }
  }, [zenGardenItems, zenCurrentChallenge]);

  const zenGetItemsInZone = (zone, elementType) => {
    return zenGardenItems.filter(item => {
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

  const zenCheckChallengeCompletion = () => {
    if (!zenCurrentChallenge) return;

    const { element, count, zone } = zenCurrentChallenge.target;
    const itemsInZone = zenGetItemsInZone(zone, element);
    
    setZenChallengeProgress({
      current: itemsInZone.length,
      target: count,
      percentage: Math.min((itemsInZone.length / count) * 100, 100)
    });

    if (itemsInZone.length >= count && !zenCompletedChallenges.includes(zenCurrentChallenge.id)) {
      zenCompleteChallenge();
    }
  };

  const zenCompleteChallenge = () => {
    if (!zenCurrentChallenge || zenCompletedChallenges.includes(zenCurrentChallenge.id)) return;

    setZenScore(prev => prev + zenCurrentChallenge.reward);
    setZenCompletedChallenges(prev => [...prev, zenCurrentChallenge.id]);
    setZenShowCelebration(true);
    
    // Play celebration sound
    zenPlayCelebrationSound();

    setTimeout(() => {
      setZenShowCelebration(false);
      // Move to next challenge
      const nextChallengeIndex = zenChallenges.findIndex(c => c.id === zenCurrentChallenge.id) + 1;
      if (nextChallengeIndex < zenChallenges.length) {
        const nextChallenge = zenChallenges[nextChallengeIndex];
        setZenCurrentChallenge(nextChallenge);
        setZenChallengeProgress({ current: 0, target: nextChallenge.target.count, percentage: 0 });
      } else {
        setZenCurrentChallenge(null);
        setZenChallengeProgress({});
      }
    }, 3000);
  };

  const zenCreateRipple = (x, y) => {
    const ripple = {
      id: Date.now() + Math.random(),
      x: x + '%',
      y: y + '%'
    };
    setZenRipples(prev => [...prev.slice(-4), ripple]);
  };

  const zenHandleGardenClick = (e) => {
    if (!zenSelectedItem) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (x < 5 || x > 95 || y < 5 || y > 95) return;

    const newItem = {
      id: Date.now() + Math.random(),
      type: zenSelectedItem,
      x: x,
      y: y
    };

    setZenGardenItems(prev => [...prev, newItem]);
    zenCreateRipple(x, y);
    
    // Play placement sound
    zenPlayPlacementSound();
  };

  const zenSelectItem = (itemType) => {
    setZenSelectedItem(zenSelectedItem === itemType ? null : itemType);
  };

  const zenClearGarden = () => {
    setZenGardenItems([]);
    setZenScore(0);
    setZenSelectedItem(null);
    setZenCurrentChallenge(zenChallenges[0]);
    setZenCompletedChallenges([]);
    setZenChallengeProgress({ current: 0, target: zenChallenges[0].target.count, percentage: 0 });
  };

  const zenSkipChallenge = () => {
    if (!zenCurrentChallenge) return;
    
    const nextChallengeIndex = zenChallenges.findIndex(c => c.id === zenCurrentChallenge.id) + 1;
    if (nextChallengeIndex < zenChallenges.length) {
      const nextChallenge = zenChallenges[nextChallengeIndex];
      setZenCurrentChallenge(nextChallenge);
      setZenChallengeProgress({ current: 0, target: nextChallenge.target.count, percentage: 0 });
    } else {
      setZenCurrentChallenge(null);
      setZenChallengeProgress({});
    }
  };

  // Intro Screen
  if (zenShowIntro) {
    const randomThought = zenPositiveThoughts[Math.floor(Math.random() * zenPositiveThoughts.length)];
    
    return (
      <div className="zen-intro-screen fixed inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center z-50 overflow-hidden">
        {/* Flying birds in the background */}
        {zenFlyingBirds.map(bird => (
          <div
            key={bird.id}
            className="zen-flying-bird absolute text-2xl pointer-events-none transition-all duration-75"
            style={{
              left: `${bird.x}%`,
              top: `${bird.y}%`,
              transform: bird.direction === 'left' ? 'scaleX(-1)' : 'none'
            }}
          >
            {bird.type}
          </div>
        ))}
        
        <div className="zen-intro-content text-center text-white px-8 relative z-10">
          <div className="zen-intro-wrapper relative">
            {/* Animated background circles */}
            <div className="zen-intro-bg absolute -inset-20">
              <div className="zen-circle-1 w-32 h-32 bg-white bg-opacity-20 rounded-full absolute top-0 left-0 animate-ping" style={{ animationDelay: '0s' }} />
              <div className="zen-circle-2 w-24 h-24 bg-white bg-opacity-20 rounded-full absolute top-10 right-0 animate-ping" style={{ animationDelay: '0.5s' }} />
              <div className="zen-circle-3 w-20 h-20 bg-white bg-opacity-20 rounded-full absolute bottom-0 left-10 animate-ping" style={{ animationDelay: '1s' }} />
            </div>
            
            {/* Main content */}
            <div className="zen-intro-main relative z-10">
              <div className="zen-intro-emoji text-6xl mb-6 animate-bounce" style={{ animationDuration: '2s' }}>🌸</div>
              <h1 className="zen-intro-title text-4xl font-bold mb-4 animate-pulse" style={{ animationDuration: '3s' }}>Welcome to Your Zen Garden</h1>
              <div className="zen-intro-message bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm zen-scale-in">
                <p className="zen-intro-text text-xl font-medium text-black">{randomThought}</p>
              </div>
            </div>
            
            {/* Floating sparkles */}
            <div className="zen-intro-sparkles absolute inset-0 pointer-events-none">
              <div className="zen-sparkle-1 text-2xl absolute top-4 left-4 animate-bounce" style={{ animationDelay: '0.2s' }}>✨</div>
              <div className="zen-sparkle-2 text-2xl absolute top-8 right-8 animate-bounce" style={{ animationDelay: '0.8s' }}>🌟</div>
              <div className="zen-sparkle-3 text-2xl absolute bottom-6 left-12 animate-bounce" style={{ animationDelay: '1.2s' }}>💫</div>
              <div className="zen-sparkle-4 text-2xl absolute bottom-4 right-4 animate-bounce" style={{ animationDelay: '1.6s' }}>✨</div>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          .zen-scale-in {
            animation: zenScaleIn 1s ease-out forwards;
            transform: scale(0);
          }
          
          @keyframes zenScaleIn {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            70% {
              transform: scale(1.1);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="zen-main-container min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="zen-bg-elements absolute inset-0 pointer-events-none">
        <div className="zen-bg-circle-1 w-64 h-64 bg-purple-200 rounded-full opacity-20 absolute -top-32 -left-32 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="zen-bg-circle-2 w-48 h-48 bg-blue-200 rounded-full opacity-20 absolute bottom-0 right-0 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="zen-bg-circle-3 w-72 h-72 bg-green-200 rounded-full opacity-10 absolute top-1/2 left-1/4 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      </div>

      {/* Floating particles */}
      {zenFloatingElements.map(particle => (
        <div
          key={particle.id}
          className="zen-floating-particle fixed text-2xl pointer-events-none opacity-70"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `translateY(0px) rotate(${particle.rotation}deg)`
          }}
        >
          {particle.type}
        </div>
      ))}

      {/* Celebration Modal */}
      {zenShowCelebration && (
        <div className="zen-celebration-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="zen-celebration-content bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-8 max-w-md mx-4 shadow-2xl zen-scale-in">
            <div className="zen-celebration-inner text-center relative">
              <div className="zen-celebration-emoji text-6xl mb-4 animate-bounce" style={{ animationDuration: '2s' }}>🎉</div>
              <h3 className="zen-celebration-title text-2xl font-bold text-gray-800 mb-2">Challenge Complete!</h3>
              <p className="zen-celebration-name text-lg text-gray-600 mb-4">{zenCurrentChallenge?.title}</p>
              <div className="zen-celebration-reward text-3xl text-green-600 font-bold animate-pulse" style={{ animationDuration: '1s' }}>+{zenCurrentChallenge?.reward} points!</div>
              
              {/* Confetti effect */}
              <div className="zen-confetti absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="zen-confetti-piece absolute w-2 h-4 rounded-sm"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: '-10%',
                      backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`,
                      animationDelay: `${i * 0.1}s`,
                      transform: `rotate(${Math.random() * 360}deg)`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="zen-header relative z-10 bg-white bg-opacity-20 backdrop-blur-md border-b border-white border-opacity-30">
        <div className="zen-header-content max-w-6xl mx-auto px-6 py-4">
          <div className="zen-header-inner flex items-center justify-between">
            <div className="zen-header-left flex items-center space-x-3">
              <div className="zen-header-logo w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="zen-header-text">
                <h1 className="zen-header-title text-2xl font-bold text-gray-800">Zen Garden Builder</h1>
                <p className="zen-header-subtitle text-sm text-gray-600">Complete challenges to build your sanctuary</p>
              </div>
            </div>
            <div className="zen-header-right flex items-center space-x-6">
              <div className="zen-score-display text-center transform hover:scale-105 transition-transform duration-300">
                <p className="zen-score-label text-sm text-gray-600">Score</p>
                <p className="zen-score-value text-xl font-bold text-purple-600">{zenScore}</p>
              </div>
              <div className="zen-progress-display text-center transform hover:scale-105 transition-transform duration-300">
                <p className="zen-progress-label text-sm text-gray-600">Completed</p>
                <p className="zen-progress-value text-xl font-bold text-green-600">{zenCompletedChallenges.length}/{zenChallenges.length}</p>
              </div>
              <button 
                onClick={zenClearGarden}
                className="zen-reset-btn px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Reset
              </button>
              <button 
                onClick={zenToggleAudio}
                className={`zen-audio-btn p-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                  zenAudioEnabled 
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
      <div className="zen-game-container max-w-6xl mx-auto px-6 py-8">
        <div className="zen-game-layout grid lg:grid-cols-4 gap-8">
          {/* Garden Area */}
          <div className="zen-garden-section lg:col-span-3">
            <div 
              className="zen-garden-canvas relative bg-gradient-to-br from-green-100 to-emerald-50 rounded-3xl border-4 border-white border-opacity-50 shadow-2xl overflow-hidden cursor-crosshair hover:shadow-xl transition-shadow duration-300"
              style={{ minHeight: '400px', aspectRatio: '16/10' }}
              onClick={zenHandleGardenClick}
            >
              {/* Zone indicators when challenge is active */}
              {zenCurrentChallenge && (
                <div className="zen-zone-indicators absolute inset-0 pointer-events-none">
                  {zenCurrentChallenge.target.zone === 'left' && (
                    <div className="zen-zone-left absolute top-0 left-0 w-1/2 h-full bg-blue-200 bg-opacity-30 border-2 border-blue-300 border-dashed rounded-l-3xl" />
                  )}
                  {zenCurrentChallenge.target.zone === 'right' && (
                    <div className="zen-zone-right absolute top-0 right-0 w-1/2 h-full bg-blue-200 bg-opacity-30 border-2 border-blue-300 border-dashed rounded-r-3xl" />
                  )}
                  {zenCurrentChallenge.target.zone === 'top' && (
                    <div className="zen-zone-top absolute top-0 left-0 w-full h-1/2 bg-blue-200 bg-opacity-30 border-2 border-blue-300 border-dashed rounded-t-3xl" />
                  )}
                  {zenCurrentChallenge.target.zone === 'bottom' && (
                    <div className="zen-zone-bottom absolute bottom-0 left-0 w-full h-1/2 bg-blue-200 bg-opacity-30 border-2 border-blue-300 border-dashed rounded-b-3xl" />
                  )}
                  {zenCurrentChallenge.target.zone === 'center' && (
                    <div className="zen-zone-center absolute top-1/2 left-1/2 w-2/5 h-2/5 bg-blue-200 bg-opacity-30 border-2 border-blue-300 border-dashed rounded-2xl transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
              )}

              {/* Selection indicator */}
              {zenSelectedItem && (
                <div className="zen-selection-indicator absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-lg z-10 animate-pulse">
                  <div className="zen-selection-content flex items-center space-x-2">
                    <span className="zen-selection-icon text-2xl">{zenGardenElements[zenSelectedItem].icon}</span>
                    <span className="zen-selection-text text-sm font-medium">Click to place {zenGardenElements[zenSelectedItem].name}</span>
                  </div>
                </div>
              )}

              {/* Ripple effects */}
              {zenRipples.map(ripple => (
                <div
                  key={ripple.id}
                  className="zen-ripple absolute w-20 h-20 border-4 border-purple-300 rounded-full pointer-events-none"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}

              {/* Garden Items */}
              {zenGardenItems.map(item => (
                <div
                  key={item.id}
                  className="zen-garden-item absolute transform transition-all duration-500 hover:scale-110 cursor-pointer zen-bounce-in"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    fontSize: `${zenGardenElements[item.type]?.size || 30}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    zenCreateRipple(item.x, item.y);
                  }}
                >
                  <div className="zen-item-wrapper relative">
                    <span className="zen-item-emoji block filter drop-shadow-lg hover:drop-shadow-xl transition-all duration-300">
                      {zenGardenElements[item.type]?.icon}
                    </span>
                    <div className="zen-item-glow absolute -inset-2 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-full opacity-20 animate-pulse" />
                  </div>
                </div>
              ))}

              {/* Empty state */}
              {zenGardenItems.length === 0 && (
                <div className="zen-empty-state absolute inset-0 flex items-center justify-center">
                  <div className="zen-empty-content text-center text-gray-400">
                    <Target className="zen-empty-icon w-16 h-16 mx-auto mb-4 animate-pulse" />
                    <p className="zen-empty-title text-xl font-medium">Complete challenges to build your garden</p>
                    <p className="zen-empty-subtitle text-sm mt-2">Select elements and follow the challenge guide</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Control Panel */}
          <div className="zen-controls-section space-y-6">
            {/* Current Challenge */}
            {zenCurrentChallenge && (
              <div className="zen-challenge-panel bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="zen-challenge-header text-lg font-bold text-gray-800 mb-2 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Current Challenge
                </h3>
                <div className="zen-challenge-details bg-white bg-opacity-50 rounded-lg p-4 mb-4">
                  <div className="zen-challenge-info flex items-center space-x-3 mb-2">
                    <span className="zen-challenge-icon text-2xl">{zenCurrentChallenge.icon}</span>
                    <div className="zen-challenge-text">
                      <h4 className="zen-challenge-name font-bold text-gray-800">{zenCurrentChallenge.title}</h4>
                      <p className="zen-challenge-desc text-sm text-gray-600">{zenCurrentChallenge.description}</p>
                    </div>
                  </div>
                  
                  {zenChallengeProgress && zenChallengeProgress.target && (
                    <div className="zen-progress-section mt-3">
                      <div className="zen-progress-header flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{zenChallengeProgress.current}/{zenChallengeProgress.target}</span>
                      </div>
                      <div className="zen-progress-bar w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="zen-progress-fill bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${zenChallengeProgress.percentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="zen-challenge-actions flex space-x-2">
                  <div className="zen-reward-info text-xs text-gray-600 flex-1">
                    Reward: <span className="zen-reward-points font-bold text-purple-600">+{zenCurrentChallenge.reward} points</span>
                  </div>
                  <button
                    onClick={zenSkipChallenge}
                    className="zen-skip-btn text-xs text-gray-500 hover:text-gray-700 underline transition-colors duration-300"
                  >
                    Skip
                  </button>
                </div>
              </div>
            )}

            {/* Garden Elements */}
            <div className="zen-elements-panel bg-white bg-opacity-30 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="zen-elements-header text-lg font-bold text-gray-800 mb-4 flex items-center">
                <TreePine className="w-5 h-5 mr-2 text-green-500" />
                Garden Elements
              </h3>
              
              <div className="zen-elements-grid grid grid-cols-1 gap-2">
                {Object.entries(zenGardenElements).map(([key, element]) => {
                  const isRequired = zenCurrentChallenge?.target.element === key;
                  return (
                    <button
                      key={key}
                      onClick={() => zenSelectItem(key)}
                      className={`zen-element-btn flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        zenSelectedItem === key
                          ? 'bg-gradient-to-r from-purple-200 to-blue-200 border-2 border-purple-300 shadow-lg'
                          : isRequired 
                          ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 animate-pulse'
                          : 'bg-white bg-opacity-50 border-2 border-gray-200 border-opacity-50 hover:bg-opacity-70'
                      }`}
                    >
                      <span className="zen-element-icon text-2xl">{element.icon}</span>
                      <div className="zen-element-info flex-1 text-left">
                        <p className={`zen-element-name text-sm font-medium ${isRequired ? 'text-orange-700' : 'text-gray-700'}`}>
                          {element.name}
                        </p>
                        {isRequired && (
                          <p className="zen-element-required text-xs text-orange-600">Required for challenge!</p>
                        )}
                      </div>
                      {zenSelectedItem === key && (
                        <div className="zen-element-check w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
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
            <div className="zen-summary-panel bg-white bg-opacity-30 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="zen-summary-header text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Your Progress
              </h3>
              <div className="zen-summary-stats space-y-3">
                <div className="zen-stat-row flex justify-between items-center">
                  <span className="zen-stat-label text-sm text-gray-600">Total Score:</span>
                  <span className="zen-stat-value font-bold text-purple-600">{zenScore}</span>
                </div>
                <div className="zen-stat-row flex justify-between items-center">
                  <span className="zen-stat-label text-sm text-gray-600">Elements Placed:</span>
                  <span className="zen-stat-value font-bold text-gray-800">{zenGardenItems.length}</span>
                </div>
                <div className="zen-stat-row flex justify-between items-center">
                  <span className="zen-stat-label text-sm text-gray-600">Challenges Left:</span>
                  <span className="zen-stat-value font-bold text-green-600">{zenChallenges.length - zenCompletedChallenges.length}</span>
                </div>
              </div>
              
              {zenCompletedChallenges.length === zenChallenges.length && (
                <div className="zen-complete-badge mt-4 p-3 bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg text-center animate-pulse">
                  <p className="zen-complete-text text-sm font-bold text-green-700">🎉 All Challenges Complete!</p>
                  <p className="zen-master-text text-xs text-green-600 mt-1">You are a Zen Master!</p>
                </div>
              )}
            </div>

            {/* Audio Controls */}
            <div className="zen-audio-panel bg-white bg-opacity-30 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="zen-audio-header text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Music className="w-5 h-5 mr-2 text-purple-500" />
                Forest Sounds
              </h3>
              <div className="zen-audio-controls text-center">
                <button
                  onClick={zenToggleAudio}
                  className={`zen-audio-toggle px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                    zenAudioEnabled
                      ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-md'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300 shadow-md'
                  }`}
                >
                  {zenAudioEnabled ? '🔊 Birds Chirping' : '🔇 Click to Enable'}
                </button>
                <p className="zen-audio-status text-xs text-gray-600 mt-2">
                  {zenAudioEnabled ? 'Relaxing forest ambiance playing' : 'Enable peaceful nature sounds'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        .zen-floating-particle {
          animation: zenFloatUp 8s linear infinite;
        }
        
        .zen-ripple {
          animation: zenRipple 1s ease-out forwards;
        }
        
        .zen-bounce-in {
          animation: zenBounceIn 0.8s ease-out;
        }
        
        .zen-scale-in {
          animation: zenScaleIn 0.5s ease-out forwards;
          transform: scale(0);
        }
        
        .zen-confetti-piece {
          animation: zenConfettiFall 2s linear forwards;
        }
        
        @keyframes zenFloatUp {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) rotate(180deg);
            opacity: 0;
          }
        }
        
        @keyframes zenRipple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
        
        @keyframes zenBounceIn {
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
        
        @keyframes zenScaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          70% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes zenConfettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        /* Zen Garden specific classes to avoid conflicts */
        .zen-intro-screen {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }
        
        .zen-main-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }
        
        /* Prevent conflicts with external styles */
        .zen-main-container * {
          box-sizing: border-box;
        }
        
        .zen-main-container button {
          border: none;
          background: none;
          cursor: pointer;
          outline: none;
        }
        
        .zen-main-container input {
          border: none;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default ZenGardenBuilder;