// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, Play, Heart, Brain, Sparkles, Wind, Target, Star } from 'lucide-react';

// const Gamezone = () => {
//   const [selectedGame, setSelectedGame] = useState(null);
//   const [glitchEffect, setGlitchEffect] = useState(false);
//   const [particles, setParticles] = useState([]);
//   const [floatingElements, setFloatingElements] = useState([]);

//   const games = [
//     {
//       id: 1,
//       name: "SNAKE THERAPY",
//       type: "Focus & Growth",
//       difficulty: "Easy",
//       color: "lavender",
//       icon: "🐍",
//       description: "Guide your path to growth while building focus and patience. Each move represents progress in your journey.",
//       rating: 4.8,
//       benefits: "Improves concentration and goal-setting"
//     },
//     {
//       id: 2,
//       name: "BUBBLE POP",
//       type: "Stress Relief",
//       difficulty: "Easy",
//       color: "purple",
//       icon: "🫧",
//       description: "Pop colorful bubbles to release tension and anxiety. Each pop brings a moment of joy and calm.",
//       rating: 4.9,
//       benefits: "Reduces stress and promotes relaxation"
//     },
//     {
//       id: 3,
//       name: "COLOR SPLASH",
//       type: "Mood Boost",
//       difficulty: "Medium",
//       color: "violet",
//       icon: "🎨",
//       description: "Paint your world with vibrant colors. Express emotions through creative color combinations.",
//       rating: 4.7,
//       benefits: "Enhances creativity and emotional expression"
//     },
//     {
//       id: 4,
//       name: "2048 MINDFUL",
//       type: "Mental Clarity",
//       difficulty: "Medium",
//       color: "indigo",
//       icon: "🧩",
//       description: "Combine numbers mindfully while practicing patience and strategic thinking for mental clarity.",
//       rating: 4.6,
//       benefits: "Improves problem-solving and patience"
//     },
//     {
//       id: 5,
//       name: "BREATHE FLOW",
//       type: "Mindfulness",
//       difficulty: "Easy",
//       color: "periwinkle",
//       icon: "🌬️",
//       description: "Follow guided breathing patterns with soothing animations. Find your inner peace and balance.",
//       rating: 4.5,
//       benefits: "Promotes mindfulness and reduces anxiety"
//     }
//   ];

//   // Initialize particles with lavender theme
//   useEffect(() => {
//     const newParticles = Array.from({ length: 60 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 4 + 1,
//       speed: Math.random() * 0.3 + 0.1,
//       opacity: Math.random() * 0.8 + 0.2,
//       color: ['lavender', 'purple', 'violet', 'indigo', 'periwinkle'][Math.floor(Math.random() * 5)]
//     }));
//     setParticles(newParticles);

//     // Floating elements
//     const elements = Array.from({ length: 15 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       size: Math.random() * 30 + 20,
//       speed: Math.random() * 0.2 + 0.05,
//       rotation: Math.random() * 360,
//       rotationSpeed: Math.random() * 2 - 1,
//       opacity: Math.random() * 0.3 + 0.1
//     }));
//     setFloatingElements(elements);
//   }, []);

//   // Animate particles and floating elements
//   useEffect(() => {
//     const animate = () => {
//       setParticles(prev => prev.map(particle => ({
//         ...particle,
//         y: (particle.y + particle.speed) % 100,
//         x: particle.x + (Math.sin(Date.now() * 0.001 + particle.id) * 0.1)
//       })));

//       setFloatingElements(prev => prev.map(element => ({
//         ...element,
//         y: (element.y + element.speed) % 100,
//         x: element.x + (Math.sin(Date.now() * 0.0005 + element.id) * 0.05),
//         rotation: element.rotation + element.rotationSpeed
//       })));
//     };

//     const interval = setInterval(animate, 50);
//     return () => clearInterval(interval);
//   }, []);

//   // Gentle pulse effect instead of glitch
//   useEffect(() => {
//     const pulseInterval = setInterval(() => {
//       if (Math.random() < 0.15) {
//         setGlitchEffect(true);
//         setTimeout(() => setGlitchEffect(false), 1000);
//       }
//     }, 3000);

//     return () => clearInterval(pulseInterval);
//   }, []);

//   const getColorClasses = (color) => {
//     const colorMap = {
//       lavender: 'from-purple-300 to-lavender-400 border-purple-300 text-purple-200 shadow-purple-300/50',
//       purple: 'from-purple-400 to-violet-500 border-purple-400 text-purple-300 shadow-purple-400/50',
//       violet: 'from-violet-400 to-purple-500 border-violet-400 text-violet-300 shadow-violet-400/50',
//       indigo: 'from-indigo-400 to-purple-500 border-indigo-400 text-indigo-300 shadow-indigo-400/50',
//       periwinkle: 'from-blue-300 to-purple-300 border-blue-300 text-blue-200 shadow-blue-300/50'
//     };
//     return colorMap[color] || colorMap.lavender;
//   };

//   return (
//     <div className=" w-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-violet-900 text-white overflow-x-hidden">
//       {/* Animated Grid Background */}
//       <div className="fixed inset-0 opacity-10">
//         <div className="w-screen h-full" 
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
//             `,
//             backgroundSize: '60px 60px',
//             animation: 'gridMove 20s linear infinite'
//           }}
//         ></div>
//       </div>

//       {/* Floating Particles */}
//       <div className="fixed inset-0 pointer-events-none">
//         {particles.map(particle => (
//           <div
//             key={particle.id}
//             className={`absolute w-2 h-2 bg-purple-300 rounded-full animate-pulse`}
//             style={{
//               left: `${particle.x}%`,
//               top: `${particle.y}%`,
//               opacity: particle.opacity,
//               boxShadow: '0 0 10px rgba(147, 51, 234, 0.5)',
//               animation: `float ${3 + particle.id % 3}s ease-in-out infinite`
//             }}
//           />
//         ))}
//       </div>

//       {/* Floating Geometric Elements */}
//       <div className="fixed inset-0 pointer-events-none">
//         {floatingElements.map(element => (
//           <div
//             key={element.id}
//             className="absolute bg-gradient-to-r from-purple-400/20 to-violet-400/20 rounded-full blur-sm"
//             style={{
//               left: `${element.x}%`,
//               top: `${element.y}%`,
//               width: `${element.size}px`,
//               height: `${element.size}px`,
//               opacity: element.opacity,
//               transform: `rotate(${element.rotation}deg)`,
//               animation: `gentleFloat ${5 + element.id % 5}s ease-in-out infinite`
//             }}
//           />
//         ))}
//       </div>

//       {/* Aurora Effect */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-violet-400/20 to-indigo-400/10 animate-pulse"
//           style={{
//             animation: 'aurora 8s ease-in-out infinite'
//           }}
//         ></div>
//       </div>

//       <div className="relative z-10 min-h-screen p-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-12">
//           <button className="group flex items-center space-x-3 bg-gradient-to-r from-purple-500/30 to-violet-500/30 backdrop-blur-sm border border-purple-300/50 px-6 py-3 rounded-xl hover:from-purple-500/40 hover:to-violet-500/40 transition-all duration-500 hover:scale-105">
//             <ArrowLeft className="w-5 h-5 text-purple-300 group-hover:-translate-x-1 transition-transform duration-300" />
//             <span className="text-purple-200 font-semibold">Back</span>
//           </button>

//           <div className={`text-center ${glitchEffect ? 'animate-pulse' : ''}`}>
//             <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent mb-3 relative"
//               style={{
//                 textShadow: '0 0 40px rgba(147, 51, 234, 0.8)',
//                 animation: 'titleGlow 3s ease-in-out infinite'
//               }}
//             >
//               WELLNESS GAMES
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent opacity-50 blur-sm">
//                 WELLNESS GAMES
//               </div>
//             </h1>
//             <div className="flex items-center justify-center space-x-6 text-purple-200">
//               <div className="flex items-center space-x-2 bg-purple-900/30 px-4 py-2 rounded-full backdrop-blur-sm">
//                 <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
//                 <span className="text-sm font-medium">Therapeutic Games</span>
//               </div>
//               <div className="w-1 h-6 bg-purple-400/50 rounded-full"></div>
//               <span className="text-sm font-medium bg-purple-900/30 px-4 py-2 rounded-full backdrop-blur-sm">5 Activities Available</span>
//             </div>
//           </div>

//           <div className="w-24"></div>
//         </div>

//         {/* Game Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
//           {games.map((game, index) => (
//             <div
//               key={game.id}
//               className={`group relative bg-gradient-to-br from-purple-900/40 to-violet-900/40 backdrop-blur-lg rounded-3xl border-2 ${
//                 selectedGame === game.id 
//                   ? 'scale-110 border-purple-300 shadow-2xl shadow-purple-300/30' 
//                   : 'border-purple-700/50 hover:border-purple-400/70'
//               } overflow-hidden cursor-pointer transition-all duration-700 hover:scale-105 hover:shadow-xl hover:shadow-purple-400/20`}
//               style={{
//                 animationDelay: `${index * 200}ms`,
//                 animation: 'cardAppear 0.8s ease-out forwards'
//               }}
//               onClick={() => setSelectedGame(selectedGame === game.id ? null : game.id)}
//             >
//               {/* Glowing Border Effect */}
//               <div className={`absolute inset-0 bg-gradient-to-r ${getColorClasses(game.color)} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl blur-sm`}></div>

//               {/* Inner Glow */}
//               <div className="absolute inset-1 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

//               <div className="relative p-8 h-full">
//                 {/* Game Icon */}
//                 <div className="flex items-center justify-center mb-6">
//                   <div className={`w-28 h-28 rounded-3xl bg-gradient-to-r ${getColorClasses(game.color)} flex items-center justify-center text-5xl transform group-hover:rotate-6 group-hover:scale-125 transition-all duration-700 shadow-2xl`}
//                     style={{
//                       boxShadow: `0 0 30px rgba(147, 51, 234, 0.4)`,
//                       animation: 'iconFloat 4s ease-in-out infinite'
//                     }}
//                   >
//                     {game.icon}
//                   </div>
//                 </div>

//                 {/* Game Info */}
//                 <div className="text-center space-y-4">
//                   <div>
//                     <h3 className={`text-2xl font-bold bg-gradient-to-r ${getColorClasses(game.color).split(' ')[4] || 'text-purple-300'} bg-clip-text text-transparent group-hover:animate-pulse`}>
//                       {game.name}
//                     </h3>
//                     <p className="text-purple-200 text-sm font-medium mt-2 bg-purple-900/30 px-3 py-1 rounded-full inline-block">{game.type}</p>
//                   </div>

//                   {/* Game Stats */}
//                   <div className="flex justify-center space-x-4 text-sm">
//                     <div className="flex items-center space-x-2 bg-purple-900/40 px-3 py-2 rounded-lg backdrop-blur-sm">
//                       <Brain className="w-4 h-4 text-purple-300" />
//                       <span className="text-purple-200">{game.difficulty}</span>
//                     </div>
//                     <div className="flex items-center space-x-2 bg-purple-900/40 px-3 py-2 rounded-lg backdrop-blur-sm">
//                       <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                       <span className="text-yellow-300 font-bold">{game.rating}</span>
//                     </div>
//                   </div>

//                   {/* Benefits */}
//                   <div className="bg-purple-800/30 backdrop-blur-sm rounded-lg p-3 border border-purple-600/30">
//                     <div className="flex items-center justify-center space-x-2 mb-2">
//                       <Heart className="w-4 h-4 text-pink-300" />
//                       <span className="text-pink-200 text-sm font-medium">Benefits</span>
//                     </div>
//                     <p className="text-purple-200 text-xs leading-relaxed">{game.benefits}</p>
//                   </div>

//                   {/* Description - Shows when selected */}
//                   {selectedGame === game.id && (
//                     <div className="mt-4 p-4 bg-gradient-to-r from-purple-800/40 to-violet-800/40 backdrop-blur-sm rounded-xl border border-purple-500/30 animate-expandIn">
//                       <p className="text-purple-100 text-sm leading-relaxed">
//                         {game.description}
//                       </p>
//                     </div>
//                   )}

//                   {/* Play Button */}
//                   <button className={`mt-6 w-full bg-gradient-to-r ${getColorClasses(game.color)} py-4 px-6 rounded-xl font-bold transition-all duration-500 transform hover:scale-105 flex items-center justify-center space-x-3 group/btn shadow-lg hover:shadow-2xl`}
//                     style={{
//                       boxShadow: `0 0 25px rgba(147, 51, 234, 0.4)`,
//                       animation: 'buttonGlow 3s ease-in-out infinite'
//                     }}
//                   >
//                     <Play className="w-5 h-5 group-hover/btn:animate-bounce transition-all duration-300" />
//                     <span className="tracking-wider">START THERAPY</span>
//                     <Sparkles className="w-5 h-5 group-hover/btn:animate-spin transition-all duration-300" />
//                   </button>
//                 </div>

//                 {/* Animated Scan Line */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
//                   style={{
//                     background: 'linear-gradient(45deg, transparent, rgba(147, 51, 234, 0.2), transparent)',
//                     animation: 'diagonalScan 3s ease-in-out infinite'
//                   }}
//                 ></div>
//               </div>

//               {/* Corner Glow Effects */}
//               <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-purple-300/60 rounded-tl-lg"></div>
//               <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-purple-300/60 rounded-tr-lg"></div>
//               <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-purple-300/60 rounded-bl-lg"></div>
//               <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-purple-300/60 rounded-br-lg"></div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom Status Bar */}
//         <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900/80 to-violet-900/80 backdrop-blur-lg border-t border-purple-400/30 p-6">
//           <div className="flex items-center justify-between max-w-7xl mx-auto">
//             <div className="flex items-center space-x-8 text-sm">
//               <div className="flex items-center space-x-3 bg-purple-800/40 px-4 py-2 rounded-full backdrop-blur-sm">
//                 <Target className="w-5 h-5 text-purple-300 animate-pulse" />
//                 <span className="text-purple-200 font-medium">Mental Wellness Focus</span>
//               </div>
//               <div className="flex items-center space-x-3 bg-purple-800/40 px-4 py-2 rounded-full backdrop-blur-sm">
//                 <Wind className="w-5 h-5 text-violet-300 animate-pulse" />
//                 <span className="text-purple-200 font-medium">Therapeutic Benefits</span>
//               </div>
//             </div>
            
//             <div className="text-sm text-purple-300 bg-purple-800/40 px-4 py-2 rounded-full backdrop-blur-sm">
//               Wellness Mode: <span className="text-green-400 font-bold">Active</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes gridMove {
//           0% { transform: translate(0, 0); }
//           100% { transform: translate(60px, 60px); }
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }

//         @keyframes gentleFloat {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-30px) rotate(180deg); }
//         }

//         @keyframes aurora {
//           0%, 100% { opacity: 0.3; transform: translateX(-50px); }
//           50% { opacity: 0.8; transform: translateX(50px); }
//         }

//         @keyframes titleGlow {
//           0%, 100% { text-shadow: 0 0 40px rgba(147, 51, 234, 0.8); }
//           50% { text-shadow: 0 0 60px rgba(147, 51, 234, 1), 0 0 80px rgba(139, 92, 246, 0.8); }
//         }

//         @keyframes iconFloat {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-10px) rotate(5deg); }
//         }

//         @keyframes buttonGlow {
//           0%, 100% { box-shadow: 0 0 25px rgba(147, 51, 234, 0.4); }
//           50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.8), 0 0 60px rgba(139, 92, 246, 0.4); }
//         }

//         @keyframes cardAppear {
//           from { opacity: 0; transform: translateY(50px) scale(0.8); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }

//         @keyframes expandIn {
//           from { opacity: 0; transform: scaleY(0); }
//           to { opacity: 1; transform: scaleY(1); }
//         }

//         @keyframes diagonalScan {
//           0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
//           100% { transform: translateX(200%) translateY(200%) rotate(45deg); }
//         }

//         .animate-expandIn {
//           animation: expandIn 0.4s ease-out;
//           transform-origin: top;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Gamezone;


import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Heart, Brain, Sparkles, Wind, Target, Star } from 'lucide-react';
import { Link } from "react-router-dom";

const Gamezone = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [particles, setParticles] = useState([]);
  const [floatingElements, setFloatingElements] = useState([]);

  const games = [
   
    {
      id: 2,
      name: "BUBBLE POP",
      type: "Stress Relief",
      difficulty: "Easy",
      color: "blue",
      icon: "🫧",
      description: "Pop colorful bubbles to release tension and anxiety. Each pop brings a moment of joy and calm.",
      rating: 4.9,
      benefits: "Reduces stress and promotes relaxation",
      url: "/games/bubble-pop"
    },
     {
      id: 4,
      name: "2048 MINDFUL",
      type: "Mental Clarity",
      difficulty: "Medium",
      color: "indigo",
      icon: "🧩",
      description: "Combine numbers mindfully while practicing patience and strategic thinking for mental clarity.",
      rating: 4.6,
      benefits: "Improves problem-solving and patience",
      url: "/games/2048-mindful"
    },
    {
      id: 3,
      name: "COLOR SPLASH",
      type: "Mood Boost",
      difficulty: "Medium",
      color: "emerald",
      icon: "🎨",
      description: "Paint your world with vibrant colors. Express emotions through creative color combinations.",
      rating: 4.7,
      benefits: "Enhances creativity and emotional expression"
    },
   
    {
      id: 5,
      name: "BREATHE FLOW",
      type: "Mindfulness",
      difficulty: "Easy",
      color: "slate",
      icon: "🌬️",
      description: "Follow guided breathing patterns with soothing animations. Find your inner peace and balance.",
      rating: 4.5,
      benefits: "Promotes mindfulness and reduces anxiety"
    }, {
      id: 1,
      name: "SNAKE THERAPY",
      type: "Focus & Growth",
      difficulty: "Easy",
      color: "teal",
      icon: "🐍",
      description: "Guide your path to growth while building focus and patience. Each move represents progress in your journey.",
      rating: 4.8,
      benefits: "Improves concentration and goal-setting"
    }
  ];

  // Initialize particles with calming theme
  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.2 + 0.05,
      opacity: Math.random() * 0.6 + 0.2,
      color: ['teal', 'blue', 'emerald', 'indigo', 'slate'][Math.floor(Math.random() * 5)]
    }));
    setParticles(newParticles);

    // Floating elements
    const elements = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 15,
      speed: Math.random() * 0.1 + 0.02,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 1 - 0.5,
      opacity: Math.random() * 0.2 + 0.05
    }));
    setFloatingElements(elements);
  }, []);

  // Animate particles and floating elements
  useEffect(() => {
    const animate = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed) % 100,
        x: particle.x + (Math.sin(Date.now() * 0.0008 + particle.id) * 0.05)
      })));

      setFloatingElements(prev => prev.map(element => ({
        ...element,
        y: (element.y + element.speed) % 100,
        x: element.x + (Math.sin(Date.now() * 0.0003 + element.id) * 0.03),
        rotation: element.rotation + element.rotationSpeed
      })));
    };

    const interval = setInterval(animate, 60);
    return () => clearInterval(interval);
  }, []);

  // Gentle pulse effect
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 800);
      }
    }, 4000);

    return () => clearInterval(pulseInterval);
  }, []);

  const getColorClasses = (color) => {
    const colorMap = {
      teal: 'from-teal-500 to-teal-600 border-teal-400 text-teal-200 shadow-teal-400/30',
      blue: 'from-blue-500 to-blue-600 border-blue-400 text-blue-200 shadow-blue-400/30',
      emerald: 'from-emerald-500 to-emerald-600 border-emerald-400 text-emerald-200 shadow-emerald-400/30',
      indigo: 'from-indigo-500 to-indigo-600 border-indigo-400 text-indigo-200 shadow-indigo-400/30',
      slate: 'from-slate-500 to-slate-600 border-slate-400 text-slate-200 shadow-slate-400/30'
    };
    return colorMap[color] || colorMap.teal;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white relative overflow-x-hidden">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 opacity-5">
        <div className="w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(100, 116, 139, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100, 116, 139, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animation: 'subtleGridMove 25s linear infinite'
          }}
        ></div>
      </div>

      {/* Gentle Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-slate-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              boxShadow: '0 0 6px rgba(100, 116, 139, 0.3)',
              animation: `gentleFloat ${4 + particle.id % 3}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map(element => (
          <div
            key={element.id}
            className="absolute bg-gradient-to-r from-slate-600/10 to-teal-600/10 rounded-full blur-sm"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              opacity: element.opacity,
              transform: `rotate(${element.rotation}deg)`,
              animation: `slowFloat ${8 + element.id % 4}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* Calming Ambient Light */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/5 via-blue-900/10 to-emerald-900/5"
          style={{
            animation: 'ambientGlow 12s ease-in-out infinite'
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 w-full max-w-7xl mx-auto">
          <button className="group flex items-center space-x-3 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 px-6 py-3 rounded-lg hover:bg-slate-700/60 transition-all duration-300 hover:scale-105">
            <ArrowLeft className="w-5 h-5 text-slate-300 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-slate-200 font-medium">Back</span>
          </button>

          <div className={`text-center ${glitchEffect ? 'animate-pulse' : ''}`}>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-300 via-teal-300 to-blue-300 bg-clip-text text-transparent mb-3"
              style={{
                textShadow: '0 0 20px rgba(100, 116, 139, 0.4)',
                animation: 'subtleGlow 4s ease-in-out infinite'
              }}
            >
              WELLNESS GAMES
            </h1>
            <div className="flex items-center justify-center space-x-6 text-slate-300">
              <div className="flex items-center space-x-2 bg-slate-800/40 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-400/50"></div>
                <span className="text-sm font-medium">Therapeutic Games</span>
              </div>
              <div className="w-px h-4 bg-slate-500"></div>
              <span className="text-sm font-medium bg-slate-800/40 px-4 py-2 rounded-full backdrop-blur-sm">5 Activities</span>
            </div>
          </div>

          <div className="w-24"></div>
        </div>

        {/* Game Grid */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {games.map((game, index) => (
              <div
                key={game.id}
                className={`group relative bg-gradient-to-br from-slate-800/40 to-gray-800/40 backdrop-blur-sm rounded-2xl border ${
                  selectedGame === game.id 
                    ? 'scale-105 border-teal-400/50 shadow-lg shadow-teal-400/20' 
                    : 'border-slate-600/30 hover:border-slate-500/50'
                } overflow-hidden cursor-pointer transition-all duration-500 hover:scale-102 hover:shadow-lg hover:shadow-slate-400/10`}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: 'cardFadeIn 0.6s ease-out forwards'
                }}
                onClick={() => setSelectedGame(selectedGame === game.id ? null : game.id)}
              >
                {/* Subtle Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${getColorClasses(game.color)} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>

                {/* Inner Highlight */}
                <div className="absolute inset-px bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>

                <div className="relative p-6 h-full">
                  {/* Game Icon */}
                  <div className="flex items-center justify-center mb-6">
                    <div className={`w-20 h-20 rounded-xl bg-gradient-to-r ${getColorClasses(game.color)} flex items-center justify-center text-3xl transform group-hover:rotate-3 group-hover:scale-110 transition-all duration-500 shadow-lg`}
                      style={{
                        boxShadow: '0 0 20px rgba(100, 116, 139, 0.2)',
                        animation: 'iconGentle 6s ease-in-out infinite'
                      }}
                    >
                      {game.icon}
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="text-center space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-200 group-hover:text-teal-300 transition-colors duration-300">
                        {game.name}
                      </h3>
                      <p className="text-slate-400 text-sm font-medium mt-2 bg-slate-800/30 px-3 py-1 rounded-full inline-block">{game.type}</p>
                    </div>

                    {/* Game Stats */}
                    <div className="flex justify-center space-x-3 text-sm">
                      <div className="flex items-center space-x-2 bg-slate-800/40 px-3 py-2 rounded-lg">
                        <Brain className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300">{game.difficulty}</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-slate-800/40 px-3 py-2 rounded-lg">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-300 font-medium">{game.rating}</span>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Heart className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300 text-sm font-medium">Benefits</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">{game.benefits}</p>
                    </div>

                    {/* Description - Shows when selected */}
                    {selectedGame === game.id && (
                      <div className="mt-4 p-4 bg-slate-800/40 rounded-lg border border-slate-600/30 animate-slideDown">
                        <p className="text-slate-200 text-sm leading-relaxed">
                          {game.description}
                        </p>
                      </div>
                    )}

                    {/* Play Button */}
                   <Link
  to={game.url}
  className={`mt-6 w-full bg-gradient-to-r ${getColorClasses(game.color)} py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group/btn shadow-md hover:shadow-lg`}
  style={{ boxShadow: '0 0 15px rgba(100, 116, 139, 0.2)' }}
>
  <Play className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
  <span className="tracking-wide">Start Game</span>
</Link>
                  </div>

                  {/* Subtle Scan Line */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.1), transparent)',
                      animation: 'subtleScan 4s ease-in-out infinite'
                    }}
                  ></div>
                </div>

                {/* Minimal Corner Details */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-slate-500/30 rounded-tl"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-slate-500/30 rounded-tr"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-slate-500/30 rounded-bl"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-slate-500/30 rounded-br"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900/90 to-gray-900/90 backdrop-blur-md border-t border-slate-700/30 p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 bg-slate-800/40 px-4 py-2 rounded-full">
                <Target className="w-4 h-4 text-teal-400" />
                <span className="text-slate-300 font-medium">Mental Wellness</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/40 px-4 py-2 rounded-full">
                <Wind className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300 font-medium">Therapeutic Games</span>
              </div>
            </div>
            
            <div className="text-sm text-slate-300 bg-slate-800/40 px-4 py-2 rounded-full">
              Status: <span className="text-emerald-400 font-medium">Ready</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes subtleGridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }

        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes slowFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(90deg); }
        }

        @keyframes ambientGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes subtleGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(100, 116, 139, 0.4); }
          50% { text-shadow: 0 0 30px rgba(100, 116, 139, 0.6); }
        }

        @keyframes iconGentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 200px; }
        }

        @keyframes subtleScan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default Gamezone;