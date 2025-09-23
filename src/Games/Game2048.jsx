import React, { useState, useEffect, useRef } from 'react';

const LifeBalanceTower = () => {
  const [gameState, setGameState] = useState('playing');
  const [stackedBlocks, setStackedBlocks] = useState([]);
  const [currentBlockType, setCurrentBlockType] = useState(0);
  const [score, setScore] = useState(0);
  const [towerTilt, setTowerTilt] = useState(0);
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationQuote, setMotivationQuote] = useState('');
  const [explosionParticles, setExplosionParticles] = useState([]);
  const audioRef = useRef(null);

  const blockTypes = [
    { type: 'work', color: 'bg-red-500', icon: '💼', label: 'Work', weight: 3, bgColor: '#ef4444' },
    { type: 'study', color: 'bg-teal-500', icon: '📚', label: 'Study', weight: 2, bgColor: '#14b8a6' },
    { type: 'sleep', color: 'bg-blue-500', icon: '😴', label: 'Sleep', weight: 4, bgColor: '#3b82f6' },
    { type: 'relationships', color: 'bg-green-500', icon: '❤️', label: 'Love', weight: 2, bgColor: '#22c55e' },
    { type: 'fun', color: 'bg-yellow-500', icon: '🎮', label: 'Fun', weight: 1, bgColor: '#eab308' }
  ];

  const motivationQuotes = [
    "Balance is not something you find, it's something you create! ⚖️",
    "A balanced life is a happy life! Take care of all aspects! 🌟",
    "Remember: You can't pour from an empty cup! 💧",
    "Life is like a bicycle, to keep balance you must keep moving! 🚴‍♂️",
    "Balance is the key to everything! Work hard, rest well! 🗝️",
    "Your future self will thank you for creating balance today! 🙏",
    "Small steps towards balance create big life changes! 👣",
    "Don't let one area of life overshadow the others! 🌈",
    "Balance today, happiness tomorrow! ✨",
    "Life's beauty lies in its perfect imperfect balance! 🌸"
  ];

  const getCurrentBlock = () => blockTypes[currentBlockType];

  const calculateBalance = (blocks) => {
    if (blocks.length === 0) return 0;
    
    let totalMoment = 0;
    let totalWeight = 0;

    blocks.forEach((block, index) => {
      // Add random offset for each block to create instability
      const randomOffset = (Math.random() - 0.5) * 60; // Random position offset
      const blockX = 200 + randomOffset; // Not perfectly centered
      const distance = blockX - 200; // Distance from center
      totalMoment += distance * block.weight * (1 + index * 0.3); // Amplify with height
      totalWeight += block.weight;
    });

    // Add cumulative instability - higher towers are more unstable
    const heightFactor = blocks.length * 3; // Increases difficulty with height
    const weightImbalance = blocks.reduce((acc, block, index) => {
      return acc + (block.weight - 2.4) * (index + 1) * 2; // Weight imbalance grows with height
    }, 0);

    return totalMoment + weightImbalance + heightFactor;
  };

  const checkTowerStability = (blocks) => {
    if (blocks.length < 2) return true; // Very short towers are safe
    if (blocks.length < 4) {
      // Early towers have some stability but can still fall
      const balance = calculateBalance(blocks);
      return Math.abs(balance) <= 35;
    }
    if (blocks.length < 7) {
      // Medium towers are more unstable
      const balance = calculateBalance(blocks);
      return Math.abs(balance) <= 25;
    }
    // Tall towers are very unstable
    const balance = calculateBalance(blocks);
    return Math.abs(balance) <= 15;
  };

  const playBreakingSound = () => {
    // Create breaking sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create multiple oscillators for crash sound
    const frequencies = [200, 300, 150, 400, 100];
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      oscillator.type = 'sawtooth';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime + index * 0.1);
      oscillator.stop(audioContext.currentTime + 0.5 + index * 0.1);
    });
  };

  const createExplosion = () => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        id: Math.random(),
        x: 200 + (Math.random() - 0.5) * 100,
        y: 500 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 15,
        vy: Math.random() * -10 - 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 20,
        life: 1,
        decay: 0.02,
        size: Math.random() * 20 + 10,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][Math.floor(Math.random() * 5)]
      });
    }
    setExplosionParticles(particles);
  };

  const showMotivationalQuote = () => {
    const randomQuote = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];
    setMotivationQuote(randomQuote);
    setShowMotivation(true);
    
    setTimeout(() => {
      setShowMotivation(false);
      setTimeout(() => {
        setGameState('gameOver');
      }, 500);
    }, 4000);
  };

  // Update tower tilt and check stability
  useEffect(() => {
    const balance = calculateBalance(stackedBlocks);
    setTowerTilt(balance * 0.8);

    if (!checkTowerStability(stackedBlocks) && stackedBlocks.length > 0) {
      playBreakingSound();
      createExplosion();
      showMotivationalQuote();
    }
  }, [stackedBlocks]);

  // Animate explosion particles
  useEffect(() => {
    if (explosionParticles.length === 0) return;
    
    const interval = setInterval(() => {
      setExplosionParticles(prev => prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.5, // gravity
          rotation: particle.rotation + particle.rotationSpeed,
          life: particle.life - particle.decay
        }))
        .filter(particle => particle.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [explosionParticles]);

  const addBlock = () => {
    if (gameState !== 'playing') return;
    
    const currentBlock = getCurrentBlock();
    // Add slight random positioning to create imbalance
    const randomXOffset = (Math.random() - 0.5) * 30; // Random offset up to 15px each side
    
    const newBlock = {
      ...currentBlock,
      id: Date.now(),
      x: 200 + randomXOffset, // Not perfectly centered
      y: 600 - (stackedBlocks.length + 1) * 50,
    };
    
    setStackedBlocks(prev => [...prev, newBlock]);
    setScore(prev => prev + currentBlock.weight * 10);
    setCurrentBlockType((prev) => (prev + 1) % blockTypes.length);
    
    // Add extra challenge: heavier blocks create more instability
    if (currentBlock.weight >= 3 && stackedBlocks.length >= 2) {
      // Force recalculation of balance with new difficulty
      setTimeout(() => {
        const newBlocks = [...stackedBlocks, newBlock];
        const balance = calculateBalance(newBlocks);
        setTowerTilt(balance * 1.2); // More dramatic tilt
      }, 100);
    }
  };

  const resetGame = () => {
    setGameState('playing');
    setStackedBlocks([]);
    setCurrentBlockType(0);
    setScore(0);
    setTowerTilt(0);
    setShowMotivation(false);
    setExplosionParticles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400 rounded-full blur-3xl animate-ping"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-pink-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-400 rounded-full blur-3xl animate-bounce delay-500"></div>
      </div>
      
      {/* Header */}
      <div className="text-center py-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
          Life Balance Tower
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 text-lg font-bold px-4">
          <div className="bg-white/20 px-6 py-2 rounded-full backdrop-blur-md border border-white/30">
            Score: {score}
          </div>
          <div className="bg-white/20 px-6 py-2 rounded-full backdrop-blur-md border border-white/30">
            Balance: <span className={Math.abs(towerTilt) > 10 ? 'text-red-400 animate-pulse' : Math.abs(towerTilt) > 5 ? 'text-yellow-400' : 'text-green-400'}>
              {Math.abs(towerTilt).toFixed(1)}°
            </span>
            {stackedBlocks.length >= 4 && (
              <span className="ml-2 text-xs text-red-300 animate-bounce">⚠️ DANGER</span>
            )}
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex justify-center px-4">
        <div className="w-96 h-[600px] relative bg-white/10 rounded-3xl border-2 border-white/30 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Base platform */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-gradient-to-r from-amber-700 to-amber-500 rounded-t-lg shadow-lg z-10"></div>

          {/* Tower blocks */}
          <div 
            className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ease-out z-20 ${showMotivation ? 'animate-wiggle' : ''}`}
            style={{ 
              transform: `rotate(${towerTilt}deg)`,
              transformOrigin: 'center bottom'
            }}
          >
            {stackedBlocks.map((block, index) => (
              <div
                key={block.id}
                className={`absolute w-16 h-12 rounded-lg flex flex-col items-center justify-center shadow-lg border-2 border-white/40 transition-all duration-500 ${showMotivation ? 'animate-shake' : ''} ${Math.abs(towerTilt) > 10 ? 'animate-pulse' : ''}`}
                style={{
                  backgroundColor: block.bgColor,
                  left: `${block.x - 32}px`,
                  bottom: `${16 + index * 50}px`,
                  animationDelay: `${index * 0.1}s`,
                  transform: `rotate(${(Math.random() - 0.5) * 5}deg)` // Slight random rotation for each block
                }}
              >
                <span className="text-sm">{block.icon}</span>
                <span className="text-xs font-bold text-white drop-shadow text-center">{block.label}</span>
              </div>
            ))}
          </div>

          {/* Next block preview */}
          {gameState === 'playing' && (
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
              <div className="text-center mb-2">
                <span className="text-sm opacity-75">Next Block:</span>
              </div>
              <div
                className="w-16 h-12 rounded-lg flex flex-col items-center justify-center shadow-xl border-2 border-white/40 animate-bounce"
                style={{ backgroundColor: getCurrentBlock().bgColor }}
              >
                <span className="text-sm">{getCurrentBlock().icon}</span>
                <span className="text-xs font-bold text-white drop-shadow">{getCurrentBlock().label}</span>
              </div>
            </div>
          )}

          {/* Add Block Button */}
          {gameState === 'playing' && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
              <button
                onClick={addBlock}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-110 active:scale-95 transition-all duration-200 shadow-2xl animate-pulse hover:animate-none"
              >
                Add Block 📦
              </button>
            </div>
          )}

          {/* Explosion Particles */}
          {explosionParticles.map(particle => (
            <div
              key={particle.id}
              className="absolute pointer-events-none z-40 rounded-full"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                opacity: particle.life,
                transform: `rotate(${particle.rotation}deg) scale(${particle.life})`,
                boxShadow: `0 0 ${particle.size}px ${particle.color}`
              }}
            />
          ))}

          {/* Motivational Quote Overlay */}
          {showMotivation && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-md animate-fadeIn">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-3xl text-center shadow-2xl max-w-sm mx-4 animate-scaleIn border-4 border-white/30">
                <div className="text-6xl mb-4 animate-bounce">✨</div>
                <h2 className="text-2xl font-bold mb-4 animate-glow">Take a Deep Breath</h2>
                <p className="text-lg leading-relaxed animate-slideUp">
                  {motivationQuote}
                </p>
                <div className="flex justify-center gap-2 mt-4 text-3xl animate-float">
                  <span>🌟</span>
                  <span>💪</span>
                  <span>🎯</span>
                </div>
              </div>
            </div>
          )}

          {/* Game Over Modal */}
          {gameState === 'gameOver' && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-md">
              <div className="bg-white/95 p-8 rounded-3xl text-center text-gray-800 shadow-2xl max-w-sm mx-4 animate-bounceIn">
                <div className="text-6xl mb-4">🏗️💥</div>
                <h2 className="text-2xl font-bold text-red-500 mb-3">Tower Collapsed!</h2>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Your tower reached {stackedBlocks.length} blocks! Remember, life balance takes practice.
                </p>
                <p className="text-lg font-bold text-green-600 mb-4">Final Score: {score}</p>
                <button 
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-200 shadow-lg"
                  onClick={resetGame}
                >
                  🔄 Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-4xl mx-auto mt-6 px-4 text-center">
        <h3 className="text-xl font-bold mb-3 text-yellow-300">How to Play:</h3>
        <p className="text-base mb-4 opacity-90">
          Simply click "Add Block" to stack life aspects! Keep your tower balanced or it will collapse! 🏗️
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {blockTypes.map(type => (
            <div key={type.type} className="bg-white/15 px-3 py-2 rounded-xl backdrop-blur-md border border-white/20 flex items-center gap-2 text-sm shadow-lg">
              <span>{type.icon}</span>
              <span>{type.label}</span>
              <span className="text-xs opacity-75">(Weight: {type.weight})</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(${towerTilt}deg); }
          25% { transform: rotate(${towerTilt + 2}deg); }
          75% { transform: rotate(${towerTilt - 2}deg); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0) translateY(0); }
          10% { transform: translateX(-2px) translateY(-1px); }
          20% { transform: translateX(2px) translateY(1px); }
          30% { transform: translateX(-1px) translateY(2px); }
          40% { transform: translateX(1px) translateY(-1px); }
          50% { transform: translateX(-1px) translateY(1px); }
          60% { transform: translateX(1px) translateY(1px); }
          70% { transform: translateX(-1px) translateY(-1px); }
          80% { transform: translateX(2px) translateY(1px); }
          90% { transform: translateX(-2px) translateY(-1px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: scale(0.3) rotate(-10deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff; }
          50% { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-wiggle { animation: wiggle 0.3s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.7s ease-out; }
        .animate-slideUp { animation: slideUp 0.5s ease-out 0.3s both; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-float { animation: float 2s ease-in-out infinite; }
        .animate-bounceIn { animation: bounceIn 0.8s ease-out; }
      `}</style>
    </div>
  );
};

export default LifeBalanceTower;