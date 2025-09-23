import React, { useState } from 'react';
import { Sparkles, Play, Heart, Zap } from 'lucide-react';

function Colorsplash() {
  const [start, setStart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const startGame = () => {
    setStart(true); // Show iframe when button is clicked
  };

  // Array of motivational thoughts
  const motivationalThoughts = [
    "Every challenge is an opportunity in disguise 🌈",
    "Your potential is limitless - unleash it! ⚡",
    "Progress, not perfection, is the goal 🎯",
    "You grow through what you go through 🌱",
    "The only way to do great work is to love what you do ❤️",
    "Your mind is a powerful tool - sharpen it daily 🧠"
  ];

  // Select a random thought
  const randomThought = motivationalThoughts[
    Math.floor(Math.random() * motivationalThoughts.length)
  ];

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-green-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-red-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {!start ? (
        <div className="flex flex-col items-center justify-center space-y-8 p-8 bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/30 shadow-2xl">
          {/* Motivational message */}
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-4">
              <Sparkles className="text-yellow-300 animate-pulse" size={32} />
            </div>
            <p className="text-white text-xl font-medium mb-2">{randomThought}</p>
            <p className="text-white/80">Don't get depressed - just drill! Your skills are waiting to be unleashed.</p>
          </div>

          {/* Unique start button */}
          <button
            onClick={startGame}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-110 hover:shadow-3xl group overflow-hidden"
          >
            {/* Button background shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            {/* Button content */}
            <div className="flex items-center justify-center space-x-3 relative z-10">
              <Play className="transition-all duration-300" fill="currentColor" size={20} />
              <span className="text-lg">Start Drilling</span>
              <Zap className={`transition-all duration-300 ${isHovered ? 'text-yellow-300 animate-bounce' : ''}`} size={20} />
            </div>
            
            {/* Floating particles around button */}
            <div className="absolute -top-2 -left-2 text-xl opacity-70">✨</div>
            <div className="absolute -top-2 -right-2 text-xl opacity-70">🌟</div>
            <div className="absolute -bottom-2 -left-2 text-xl opacity-70">💫</div>
            <div className="absolute -bottom-2 -right-2 text-xl opacity-70">⚡</div>
          </button>

          {/* Additional encouragement */}
          <div className="flex items-center text-white/70">
            <Heart className="text-pink-300 mr-2" size={16} fill="currentColor" />
            <span className="text-sm">You've got this! Just take the first step.</span>
          </div>
        </div>
      ) : (
        <iframe
          src="https://dreamshowadventures.github.io/LudumDare29/"
          title="LudumDare29 Game"
          className="w-full h-full border-0"
        />
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}

export default Colorsplash;