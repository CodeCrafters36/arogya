// import React, { useState, useEffect, useCallback } from 'react';
// import bgsound from '../assets/sound/bg-sound.mp3';

// // Bubble component
// const Bubble = ({ bubble, onPop, gameActive }) => {
//   const handleClick = () => {
//     if (gameActive) {
//       onPop(bubble.id);
//     }
//   };

//   return (
//     <div
//       className="bubble"
//       style={{
//         left: `${bubble.x}%`,
//         top: `${bubble.y}%`,
//         animationDuration: `${bubble.duration}s`,
//         '--bubble-color': bubble.color,
//         '--bubble-glow': bubble.color + '30',
//         animationDelay: `${bubble.delay}s`,
//       }}
//       onClick={handleClick}
//     >
//       <div className="bubble-shine"></div>
//     </div>
//   );
// };

// const StressReliefGame = () => {
//   const [bubbles, setBubbles] = useState([]);
//   const [score, setScore] = useState(0);
//   const [gameActive, setGameActive] = useState(false);
//   const [gameStarted, setGameStarted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(120);
//   const [showEndMessage, setShowEndMessage] = useState(false);
//   const [bubbleIdCounter, setBubbleIdCounter] = useState(0);

//   // Audio state
//   const [audioContext, setAudioContext] = useState(null);
//   const [backgroundMusic, setBackgroundMusic] = useState(null);
//   const [popSounds, setPopSounds] = useState([]);

//   const colors = [
//     '#FF0080', '#FF4080', '#FF8080', '#FFB380', '#FFE680',
//     '#E6FF80', '#B3FF80', '#80FF80', '#80FFB3', '#80FFE6',
//     '#80E6FF', '#80B3FF', '#8080FF', '#B380FF', '#E680FF',
//     '#FF80E6', '#FF80B3', '#FF6B6B', '#4ECDC4', '#45B7D1',
//     '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
//   ];

//   const motivationalMessages = [
//     "Take a deep breath 🌿", "You're doing amazing 💙", "Pop away the stress 🫧",
//     "Breathe in peace 🌸", "Let worries bubble away ✨", "You're in zen mode 🧘‍♀️",
//     "Keep flowing 🌊", "Peaceful vibes only 🕊️", "Relax and enjoy 🌈",
//     "You're crushing it! 💪", "So calming 🌙", "Perfect rhythm 🎵"
//   ];
//   const [currentMessage, setCurrentMessage] = useState(motivationalMessages[0]);

//   // Initialize audio
//   const initAudio = async () => {
//     try {
//       const ctx = new (window.AudioContext || window.webkitAudioContext)();
//       setAudioContext(ctx);

//       const bgMusic = new Audio(bgsound);
//       bgMusic.loop = true;
//       bgMusic.volume = 0.3;
//       setBackgroundMusic(bgMusic);

//       const sounds = [];
//       for (let i = 0; i < 5; i++) {
//         sounds.push(() => playPopWithContext(ctx, 1 + i * 0.2));
//       }
//       setPopSounds(sounds);
//     } catch (error) {
//       console.log("Audio init failed:", error);
//     }
//   };

//   const playPopWithContext = (ctx, frequency = 1) => {
//     const oscillator = ctx.createOscillator();
//     const gainNode = ctx.createGain();
//     oscillator.connect(gainNode);
//     gainNode.connect(ctx.destination);

//     oscillator.frequency.setValueAtTime(800 * frequency, ctx.currentTime);
//     oscillator.frequency.exponentialRampToValueAtTime(
//       200 * frequency,
//       ctx.currentTime + 0.1
//     );
//     gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
//     gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

//     oscillator.type = "sine";
//     oscillator.start(ctx.currentTime);
//     oscillator.stop(ctx.currentTime + 0.1);
//   };

//   const playBackgroundMusic = async () => {
//     if (backgroundMusic) {
//       try {
//         await backgroundMusic.play();
//       } catch (err) {
//         console.log("Background music blocked:", err);
//       }
//     }
//   };

//   const stopBackgroundMusic = () => {
//     if (backgroundMusic) {
//       backgroundMusic.pause();
//       backgroundMusic.currentTime = 0;
//     }
//   };

//   const createBubble = useCallback(() => {
//     setBubbleIdCounter(prev => prev + 1);
//     return {
//       id: bubbleIdCounter + Math.random(),
//       x: Math.random() * 80,
//       y: Math.random() * 75,
//       duration: 4 + Math.random() * 3,
//       delay: Math.random() * 0.5,
//       color: colors[Math.floor(Math.random() * colors.length)],
//       createdAt: Date.now()
//     };
//   }, [bubbleIdCounter, colors]);

//   const createMultipleBubbles = useCallback((count) => {
//     const newBubbles = [];
//     for (let i = 0; i < count; i++) {
//       newBubbles.push(createBubble());
//     }
//     return newBubbles;
//   }, [createBubble]);

//   const startGame = async () => {
//     setGameStarted(true);
//     setGameActive(true);
//     setScore(0);
//     setTimeLeft(120);
//     setShowEndMessage(false);
//     setBubbleIdCounter(0);

//     if (!audioContext) {
//       await initAudio();
//     }
//     if (audioContext?.state === "suspended") {
//       await audioContext.resume();
//     }
//     playBackgroundMusic();

//     const initialBubbles = createMultipleBubbles(12);
//     setBubbles(initialBubbles);
//   };

//   const popBubble = useCallback((bubbleId) => {
//     setBubbles(prev => prev.filter(bubble => bubble.id !== bubbleId));
//     setScore(prev => prev + 1);

//     if (popSounds.length > 0) {
//       const randomPop = popSounds[Math.floor(Math.random() * popSounds.length)];
//       randomPop();
//     }

//     if ((score + 1) % 3 === 0) {
//       const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
//       setCurrentMessage(randomMessage);
//     }

//     setTimeout(() => {
//       if (gameActive) {
//         const newBubbles = createMultipleBubbles(Math.random() > 0.5 ? 2 : 1);
//         setBubbles(prev => [...prev, ...newBubbles]);
//       }
//     }, 200);
//   }, [score, motivationalMessages, gameActive, createMultipleBubbles, popSounds]);

//   useEffect(() => {
//     let timer;
//     if (gameActive && timeLeft > 0) {
//       timer = setTimeout(() => {
//         setTimeLeft(prev => prev - 1);
//       }, 1000);
//     } else if (timeLeft === 0 && gameActive) {
//       setGameActive(false);
//       setShowEndMessage(true);
//       stopBackgroundMusic();
//     }
//     return () => clearTimeout(timer);
//   }, [gameActive, timeLeft]);

//   useEffect(() => {
//     let bubbleSpawner;
//     if (gameActive) {
//       bubbleSpawner = setInterval(() => {
//         setBubbles(prev => {
//           const now = Date.now();
//           const activeBubbles = prev.filter(bubble =>
//             (now - bubble.createdAt) < (bubble.duration * 1000)
//           );
//           const currentCount = activeBubbles.length;
//           let newBubblesCount = 0;
//           if (currentCount < 8) newBubblesCount = 4;
//           else if (currentCount < 12) newBubblesCount = 2;
//           else if (currentCount < 15) newBubblesCount = 1;

//           if (newBubblesCount > 0) {
//             const newBubbles = createMultipleBubbles(newBubblesCount);
//             return [...activeBubbles, ...newBubbles];
//           }
//           return activeBubbles;
//         });
//       }, 800);
//     }
//     return () => clearInterval(bubbleSpawner);
//   }, [gameActive, createMultipleBubbles]);

//   useEffect(() => {
//     let extraSpawner;
//     if (gameActive) {
//       extraSpawner = setInterval(() => {
//         const extraBubbles = createMultipleBubbles(Math.floor(Math.random() * 2) + 2);
//         setBubbles(prev => [...prev, ...extraBubbles]);
//       }, 2000);
//     }
//     return () => clearInterval(extraSpawner);
//   }, [gameActive, createMultipleBubbles]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="game-container">
//       <style>{`
//         .game-container {
//           position: relative;
//           min-height: 100vh;
//           width: 100%;
//           background: radial-gradient(circle at center, #0f172a, #1e293b, #0f172a);
//           overflow: hidden;
//           font-family: 'Poppins', sans-serif;
//           color: white;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: flex-start;
//           padding: 20px;
//         }
//         .game-header { text-align: center; margin-bottom: 20px; z-index: 10; }
//         .game-title { font-size: 2.5rem; font-weight: 700; color: #a78bfa; text-shadow: 0 0 10px #c084fc, 0 0 20px #8b5cf6; margin-bottom: 10px; }
//         .motivation-message { margin-top: 10px; font-size: 1.2rem; color: #7dd3fc; font-style: italic; }
//         .game-stats { display: flex; justify-content: center; gap: 30px; margin-top: 10px; }
//         .stat-item { text-align: center; }
//         .stat-number { font-size: 1.8rem; font-weight: bold; color: #facc15; text-shadow: 0 0 10px #fde047, 0 0 20px #fbbf24; }
//         .stat-label { font-size: 0.9rem; color: #cbd5e1; }
//         .bubble { position: absolute; width: 80px; height: 80px; border-radius: 50%; background: var(--bubble-color, #4ade80); box-shadow: 0 0 25px var(--bubble-glow, #4ade8030), inset -8px -8px 20px rgba(0,0,0,0.3); animation: floatUp linear forwards; cursor: pointer; display: flex; align-items: center; justify-content: center; overflow: hidden; }
//         .bubble-shine { position: absolute; top: 15%; left: 25%; width: 40%; height: 40%; border-radius: 50%; background: rgba(255, 255, 255, 0.5); filter: blur(6px); pointer-events: none; }
//         @keyframes floatUp { from { transform: translateY(100vh) scale(0.8); opacity: 0.8; } to { transform: translateY(-120px) scale(1.1); opacity: 0; } }
//         .btn { background: linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef); border: none; padding: 12px 28px; border-radius: 9999px; font-size: 1.1rem; font-weight: bold; color: white; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; box-shadow: 0 0 20px #8b5cf6, 0 0 40px #d946ef30; }
//         .btn:hover { transform: scale(1.05); box-shadow: 0 0 25px #8b5cf6, 0 0 50px #d946ef50; }
//         .btn:active { transform: scale(0.95); }
//         .welcome-screen, .end-message { text-align: center; max-width: 600px; margin: 60px auto; padding: 20px; background: rgba(30, 41, 59, 0.6); border-radius: 20px; box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }
//         .welcome-title, .end-title { font-size: 2rem; margin-bottom: 15px; color: #f9a8d4; text-shadow: 0 0 10px #ec4899, 0 0 20px #f472b6; }
//         .welcome-description, .end-stats, .end-motivation { font-size: 1rem; color: #e2e8f0; margin-bottom: 15px; }
//         .game-area { position: relative; flex-grow: 1; width: 100%; max-width: 900px; height: 70vh; border-radius: 20px; background: rgba(15, 23, 42, 0.5); overflow: hidden; border: 2px solid rgba(139, 92, 246, 0.3); box-shadow: inset 0 0 20px rgba(139, 92, 246, 0.4); }
//         .game-controls { margin-top: 20px; text-align: center; }
//         .bubble-counter { position: absolute; top: 15px; right: 20px; font-size: 1rem; color: #fcd34d; text-shadow: 0 0 8px #facc15, 0 0 12px #fde047; }
//       `}</style>

//       {gameActive && (
//         <div className="bubble-counter">
//           Bubbles: {bubbles.length}
//         </div>
//       )}

//       <div className="game-header">
//         <h1 className="game-title">🫧 Bubble Pop Zen 🫧</h1>
//         {gameStarted && (
//           <>
//             <div className="game-stats">
//               <div className="stat-item">
//                 <span className="stat-number">{score}</span>
//                 <div className="stat-label">Bubbles Popped</div>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-number">{formatTime(timeLeft)}</span>
//                 <div className="stat-label">Time Left</div>
//               </div>
//             </div>
//             {gameActive && <div className="motivation-message">{currentMessage}</div>}
//           </>
//         )}
//       </div>

//       {!gameStarted ? (
//         <div className="welcome-screen">
//           <h2 className="welcome-title">Welcome to Bubble Pop Zen</h2>
//           <p className="welcome-description">
//             Get ready for a bubble-filled relaxation session! Pop the colorful bubbles floating around your screen. 
//             The more you pop, the more appear. No pressure, just pure zen vibes! 🌈
//           </p>
//           <button className="btn" onClick={startGame}>
//             Start Bubble Paradise 🫧
//           </button>
//         </div>
//       ) : showEndMessage ? (
//         <div className="end-message">
//           <h2 className="end-title">Absolutely Amazing! 🎉</h2>
//           <div className="end-stats">You popped <strong>{score}</strong> bubbles! 🧘‍♀️</div>
//           <div className="end-motivation">
//             "You've created your own peaceful bubble of calm. Well done!" 💙
//           </div>
//           <button className="btn" onClick={startGame}>
//             Another Zen Session 🌸
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className="game-area">
//             {bubbles.map(bubble => (
//               <Bubble 
//                 key={bubble.id} 
//                 bubble={bubble} 
//                 onPop={popBubble}
//                 gameActive={gameActive}
//               />
//             ))}
//           </div>
//           <div className="game-controls">
//             <button className="btn" onClick={() => {
//               setGameActive(false);
//               setShowEndMessage(true);
//               stopBackgroundMusic();
//             }}>
//               End Session 🧘‍♀️
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default StressReliefGame;

import React, { useState, useEffect, useCallback } from "react";
import bgsound from "../assets/sound/bg-sound.mp3";

// Bubble component
const Bubble = ({ bubble, onPop, gameActive }) => {
  const handleClick = () => {
    if (gameActive) {
      onPop(bubble.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="absolute flex items-center justify-center rounded-full cursor-pointer"
      style={{
        left: `${bubble.x}%`,
        top: `${bubble.y}%`,
        width: "80px",
        height: "80px",
        background: bubble.color,
        boxShadow: `0 0 25px ${bubble.color}55, inset -8px -8px 20px rgba(0,0,0,0.3)`,
        animation: `floatUp ${bubble.duration}s linear forwards`,
        animationDelay: `${bubble.delay}s`,
      }}
    >
      <div className="absolute w-2/5 h-2/5 top-[15%] left-[25%] bg-white/50 rounded-full blur-md pointer-events-none"></div>
    </div>
  );
};

// Floating animation (added globally)
const bubbleAnimation = `
@keyframes floatUp {
  from { transform: translateY(100vh) scale(0.8); opacity: 0.8; }
  to { transform: translateY(-120px) scale(1.1); opacity: 0; }
}
`;

const StressReliefGame = () => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [bubbleIdCounter, setBubbleIdCounter] = useState(0);

  // Audio state
  const [audioContext, setAudioContext] = useState(null);
  const [backgroundMusic, setBackgroundMusic] = useState(null);
  const [popSounds, setPopSounds] = useState([]);

  const colors = [
    "#FF0080", "#FF4080", "#FF8080", "#FFB380", "#FFE680",
    "#E6FF80", "#B3FF80", "#80FF80", "#80FFB3", "#80FFE6",
    "#80E6FF", "#80B3FF", "#8080FF", "#B380FF", "#E680FF",
    "#FF80E6", "#FF80B3", "#FF6B6B", "#4ECDC4", "#45B7D1",
    "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F",
  ];

  const motivationalMessages = [
    "Take a deep breath 🌿", "You're doing amazing 💙", "Pop away the stress 🫧",
    "Breathe in peace 🌸", "Let worries bubble away ✨", "You're in zen mode 🧘‍♀️",
    "Keep flowing 🌊", "Peaceful vibes only 🕊️", "Relax and enjoy 🌈",
    "You're crushing it! 💪", "So calming 🌙", "Perfect rhythm 🎵",
  ];
  const [currentMessage, setCurrentMessage] = useState(motivationalMessages[0]);

  // --- AUDIO LOGIC (unchanged) ---
  const initAudio = async () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(ctx);

      const bgMusic = new Audio(bgsound);
      bgMusic.loop = true;
      bgMusic.volume = 0.3;
      setBackgroundMusic(bgMusic);

      const sounds = [];
      for (let i = 0; i < 5; i++) {
        sounds.push(() => playPopWithContext(ctx, 1 + i * 0.2));
      }
      setPopSounds(sounds);
    } catch (error) {
      console.log("Audio init failed:", error);
    }
  };

  const playPopWithContext = (ctx, frequency = 1) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(800 * frequency, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      200 * frequency,
      ctx.currentTime + 0.1
    );
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.type = "sine";
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  };

  const playBackgroundMusic = async () => {
    if (backgroundMusic) {
      try {
        await backgroundMusic.play();
      } catch (err) {
        console.log("Background music blocked:", err);
      }
    }
  };

  const stopBackgroundMusic = () => {
    if (backgroundMusic) {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    }
  };

  // --- BUBBLE LOGIC (unchanged) ---
  const createBubble = useCallback(() => {
    setBubbleIdCounter((prev) => prev + 1);
    return {
      id: bubbleIdCounter + Math.random(),
      x: Math.random() * 80,
      y: Math.random() * 75,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      createdAt: Date.now(),
    };
  }, [bubbleIdCounter, colors]);

  const createMultipleBubbles = useCallback(
    (count) => {
      const newBubbles = [];
      for (let i = 0; i < count; i++) {
        newBubbles.push(createBubble());
      }
      return newBubbles;
    },
    [createBubble]
  );

  const startGame = async () => {
    setGameStarted(true);
    setGameActive(true);
    setScore(0);
    setTimeLeft(120);
    setShowEndMessage(false);
    setBubbleIdCounter(0);

    if (!audioContext) {
      await initAudio();
    }
    if (audioContext?.state === "suspended") {
      await audioContext.resume();
    }
    playBackgroundMusic();

    const initialBubbles = createMultipleBubbles(12);
    setBubbles(initialBubbles);
  };

  const popBubble = useCallback(
    (bubbleId) => {
      setBubbles((prev) => prev.filter((bubble) => bubble.id !== bubbleId));
      setScore((prev) => prev + 1);

      if (popSounds.length > 0) {
        const randomPop =
          popSounds[Math.floor(Math.random() * popSounds.length)];
        randomPop();
      }

      if ((score + 1) % 3 === 0) {
        const randomMessage =
          motivationalMessages[
            Math.floor(Math.random() * motivationalMessages.length)
          ];
        setCurrentMessage(randomMessage);
      }

      setTimeout(() => {
        if (gameActive) {
          const newBubbles = createMultipleBubbles(
            Math.random() > 0.5 ? 2 : 1
          );
          setBubbles((prev) => [...prev, ...newBubbles]);
        }
      }, 200);
    },
    [score, motivationalMessages, gameActive, createMultipleBubbles, popSounds]
  );

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false);
      setShowEndMessage(true);
      stopBackgroundMusic();
    }
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);

  useEffect(() => {
    let bubbleSpawner;
    if (gameActive) {
      bubbleSpawner = setInterval(() => {
        setBubbles((prev) => {
          const now = Date.now();
          const activeBubbles = prev.filter(
            (bubble) => now - bubble.createdAt < bubble.duration * 1000
          );
          const currentCount = activeBubbles.length;
          let newBubblesCount = 0;
          if (currentCount < 8) newBubblesCount = 4;
          else if (currentCount < 12) newBubblesCount = 2;
          else if (currentCount < 15) newBubblesCount = 1;

          if (newBubblesCount > 0) {
            const newBubbles = createMultipleBubbles(newBubblesCount);
            return [...activeBubbles, ...newBubbles];
          }
          return activeBubbles;
        });
      }, 800);
    }
    return () => clearInterval(bubbleSpawner);
  }, [gameActive, createMultipleBubbles]);

  useEffect(() => {
    let extraSpawner;
    if (gameActive) {
      extraSpawner = setInterval(() => {
        const extraBubbles = createMultipleBubbles(
          Math.floor(Math.random() * 2) + 2
        );
        setBubbles((prev) => [...prev, ...extraBubbles]);
      }, 2000);
    }
    return () => clearInterval(extraSpawner);
  }, [gameActive, createMultipleBubbles]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-poppins overflow-hidden px-4">
      <style>{bubbleAnimation}</style>

      {/* Bubble counter */}
      {gameActive && (
        <div className="absolute top-3 right-5 text-yellow-300 drop-shadow-lg text-sm sm:text-base">
          Bubbles: {bubbles.length}
        </div>
      )}

      {/* Header */}
      <div className="text-center mt-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-300 drop-shadow-lg">
          🫧 Bubble Pop Zen 🫧
        </h1>
        {gameStarted && (
          <>
            <div className="flex justify-center gap-6 sm:gap-12 mt-4">
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {score}
                </div>
                <div className="text-xs text-gray-300">Bubbles Popped</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-xs text-gray-300">Time Left</div>
              </div>
            </div>
            {gameActive && (
              <div className="mt-3 text-sky-300 italic text-sm sm:text-base">
                {currentMessage}
              </div>
            )}
          </>
        )}
      </div>

      {/* Screens */}
      {!gameStarted ? (
        <div className="mt-10 bg-slate-800/60 p-6 rounded-2xl max-w-md text-center shadow-lg">
          <h2 className="text-2xl font-bold text-pink-300 mb-3">
            Welcome to Bubble Pop Zen
          </h2>
          <p className="text-gray-200 mb-4 text-sm sm:text-base">
            Get ready for a bubble-filled relaxation session! Pop the colorful
            bubbles floating around your screen. The more you pop, the more
            appear. No pressure, just pure zen vibes! 🌈
          </p>
          <button
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition"
            onClick={startGame}
          >
            Start Bubble Paradise 🫧
          </button>
        </div>
      ) : showEndMessage ? (
        <div className="mt-10 bg-slate-800/60 p-6 rounded-2xl max-w-md text-center shadow-lg">
          <h2 className="text-2xl font-bold text-pink-300 mb-3">
            Absolutely Amazing! 🎉
          </h2>
          <p className="text-gray-200 mb-3">
            You popped <strong>{score}</strong> bubbles! 🧘‍♀️
          </p>
          <p className="text-sky-300 italic mb-4">
            "You've created your own peaceful bubble of calm. Well done!" 💙
          </p>
          <button
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition"
            onClick={startGame}
          >
            Another Zen Session 🌸
          </button>
        </div>
      ) : (
        <>
          <div className="relative w-full max-w-3xl h-[60vh] bg-slate-900/50 border border-purple-500/30 rounded-2xl mt-6 overflow-hidden shadow-inner">
            {bubbles.map((bubble) => (
              <Bubble
                key={bubble.id}
                bubble={bubble}
                onPop={popBubble}
                gameActive={gameActive}
              />
            ))}
          </div>
          <div className="mt-4">
            <button
              className="px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition"
              onClick={() => {
                setGameActive(false);
                setShowEndMessage(true);
                stopBackgroundMusic();
              }}
            >
              End Session 🧘‍♀️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StressReliefGame;
