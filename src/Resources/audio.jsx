// import React, { useState, useRef, useEffect } from 'react';
// import { Play, Pause, Search, Headphones } from 'lucide-react';

// const Audio = () => {
//   const [activeAudio, setActiveAudio] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('Sleep');
//   const audioRefs = useRef({});

//   const audioBooks = [
//     {
//       id: 1,
//       title: "Mindfulness for Beginners",
//       duration: "10 min",
//       category: "Sleep",
//       src: "https://ia800304.us.archive.org/1/items/OceanWavesRelaxingSound/Ocean%20Waves%20Relaxing%20Sound.mp3"
//     },
//     {
//       id: 2,
//       title: "Sleep Stories in Hindi",
//       duration: "15 min",
//       category: "Sleep",
//       src: "https://ia800605.us.archive.org/32/items/RainSoundsForSleepAndRelaxation/Rain%20Sounds%20for%20Sleep%20and%20Relaxation.mp3"
//     },
//     {
//       id: 3,
//       title: "Handling Exam Stress",
//       duration: "8 min",
//       category: "Motivation",
//       src: "https://ia800108.us.archive.org/26/items/BirdsChirpingForestSounds/Birds%20Chirping%20Forest%20Sounds.mp3"
//     },
//     {
//       id: 4,
//       title: "Ocean Waves Meditation",
//       duration: "20 min",
//       category: "Sleep",
//       src: "https://ia600304.us.archive.org/1/items/OceanWavesRelaxingSound/Ocean%20Waves%20Relaxing%20Sound.mp3"
//     },
//     {
//       id: 5,
//       title: "Rain Sounds for Sleep",
//       duration: "30 min",
//       category: "Sleep",
//       src: "https://ia800605.us.archive.org/32/items/RainSoundsForSleepAndRelaxation/Rain%20Sounds%20for%20Sleep%20and%20Relaxation.mp3"
//     },
//     {
//       id: 6,
//       title: "Forest Birds Chirping",
//       duration: "25 min",
//       category: "Sleep",
//       src: "https://ia800108.us.archive.org/26/items/BirdsChirpingForestSounds/Birds%20Chirping%20Forest%20Sounds.mp3"
//     },
//     {
//       id: 7,
//       title: "Confidence Building",
//       duration: "12 min",
//       category: "Motivation",
//       src: "https://ia800304.us.archive.org/1/items/OceanWavesRelaxingSound/Ocean%20Waves%20Relaxing%20Sound.mp3"
//     },
//     {
//       id: 8,
//       title: "Deep Breathing Exercise",
//       duration: "6 min",
//       category: "ADHD",
//       src: "https://ia800605.us.archive.org/32/items/RainSoundsForSleepAndRelaxation/Rain%20Sounds%20for%20Sleep%20and%20Relaxation.mp3"
//     },
//     {
//       id: 9,
//       title: "Self-Compassion Meditation",
//       duration: "18 min",
//       category: "Motivation",
//       src: "https://ia800108.us.archive.org/26/items/BirdsChirpingForestSounds/Birds%20Chirping%20Forest%20Sounds.mp3"
//     },
//     {
//       id: 10,
//       title: "Focus Enhancement",
//       duration: "14 min",
//       category: "ADHD",
//       src: "https://ia600304.us.archive.org/1/items/OceanWavesRelaxingSound/Ocean%20Waves%20Relaxing%20Sound.mp3"
//     },
//     {
//       id: 11,
//       title: "Anxiety Relief Sounds",
//       duration: "22 min",
//       category: "ADHD",
//       src: "https://ia800605.us.archive.org/32/items/RainSoundsForSleepAndRelaxation/Rain%20Sounds%20for%20Sleep%20and%20Relaxation.mp3"
//     }
//   ];

//   const filteredAudioBooks = audioBooks.filter(audio => {
//     const matchesSearch = audio.title.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'Sleep' || audio.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   // Limit to 5-6 sounds per category
//   const limitedAudioBooks = filteredAudioBooks.slice(0, 6);

//   const toggleAudio = (audioId) => {
//     // Pause all other audios first
//     Object.values(audioRefs.current).forEach(audio => {
//       if (audio && !audio.paused) {
//         audio.pause();
//       }
//     });

//     if (activeAudio === audioId) {
//       setActiveAudio(null);
//     } else {
//       setActiveAudio(audioId);
//       const audio = audioRefs.current[audioId];
//       if (audio) {
//         audio.play().catch(error => {
//           console.log('Audio play failed:', error);
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     // Set up audio event listeners
//     audioBooks.forEach(audio => {
//       const audioElement = audioRefs.current[audio.id];
//       if (audioElement) {
//         audioElement.addEventListener('ended', () => {
//           setActiveAudio(null);
//         });
//       }
//     });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-25 to-purple-100 p-6" style={{background: 'linear-gradient(135deg, #f3f0ff 0%, #e9e5f3 50%, #ddd6fe 100%)'}}>
//       <div className="max-w-4xl mx-auto">
        
//         {/* Audio Books Section */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
//           {/* Header */}
//           <div className="bg-purple-50 p-6 border-b border-purple-100">
//             <div className="flex items-center gap-3 mb-4">
//               <Headphones className="w-6 h-6 text-purple-600" />
//               <h2 className="text-2xl font-bold text-gray-800">Audio Books</h2>
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

//             {/* Category Filter */}
//             <div className="text-sm text-gray-600">
//               <span className="mr-4">Category Filter:</span>
//               <button
//                 onClick={() => setSelectedCategory('Sleep')}
//                 className={`mr-2 px-3 py-1 rounded ${selectedCategory === 'Sleep' ? 'bg-purple-200 text-purple-800' : 'text-purple-600 hover:bg-purple-100'}`}
//               >
//                 Sleep
//               </button>
//               <span className="text-gray-400 mr-2">|</span>
//               <button
//                 onClick={() => setSelectedCategory('Motivation')}
//                 className={`mr-2 px-3 py-1 rounded ${selectedCategory === 'Motivation' ? 'bg-purple-200 text-purple-800' : 'text-purple-600 hover:bg-purple-100'}`}
//               >
//                 Motivation
//               </button>
//               <span className="text-gray-400 mr-2">|</span>
//               <button
//                 onClick={() => setSelectedCategory('ADHD')}
//                 className={`px-3 py-1 rounded ${selectedCategory === 'ADHD' ? 'bg-purple-200 text-purple-800' : 'text-purple-600 hover:bg-purple-100'}`}
//               >
//                 ADHD
//               </button>
//             </div>
//           </div>

//           {/* Audio List */}
//           <div className="p-6">
//             {limitedAudioBooks.map(audio => (
//               <div key={audio.id} className="flex items-center justify-between py-3 px-4 hover:bg-purple-25 rounded-lg transition-colors duration-200 border-b border-gray-100 last:border-b-0">
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={() => toggleAudio(audio.id)}
//                     className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors duration-200"
//                   >
//                     {activeAudio === audio.id ? (
//                       <Pause className="w-4 h-4" />
//                     ) : (
//                       <Play className="w-4 h-4 ml-0.5" />
//                     )}
//                   </button>
//                   <span className="font-medium text-gray-800">{audio.title}</span>
//                 </div>
//                 <span className="text-sm text-gray-500">{audio.duration}</span>
                
//                 {/* Hidden Audio Element */}
//                 <audio
//                   ref={(el) => audioRefs.current[audio.id] = el}
//                   src={audio.src}
//                   preload="metadata"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Supportive Message */}
//         <div className="mt-8 text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
//           <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
//             <Headphones className="w-4 h-4 text-white" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">Take Your Time to Heal</h3>
//           <p className="text-gray-600 max-w-xl mx-auto">
//             These carefully selected audio resources are here to support you on your journey. Find what brings you peace and comfort.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Audio;



























import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Search, Headphones } from 'lucide-react';

const Audio = () => {
  const [activeAudio, setActiveAudio] = useState(null);
  const [progress, setProgress] = useState({});
  const [duration, setDuration] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Sleep');
  const audioRefs = useRef({});

  const audioBooks = [
    {
      id: 1,
      title: "Ocean Waves",
      duration: "10 min",
      category: "Sleep",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      id: 2,
      title: "Rain Sounds",
      duration: "15 min",
      category: "Sleep",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      id: 3,
      title: "Forest Ambience",
      duration: "8 min",
      category: "Motivation",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
      id: 4,
      title: "Peaceful Piano",
      duration: "20 min",
      category: "Sleep",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
      id: 5,
      title: "Soft Guitar",
      duration: "12 min",
      category: "Motivation",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
      id: 6,
      title: "Focus Sounds",
      duration: "14 min",
      category: "ADHD",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    }
  ];

  const filteredAudioBooks = audioBooks.filter(audio => {
    const matchesSearch = audio.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Sleep' || audio.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAudio = (audioId) => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio && !audio.paused) audio.pause();
    });

    if (activeAudio === audioId) {
      setActiveAudio(null);
    } else {
      setActiveAudio(audioId);
      const audio = audioRefs.current[audioId];
      if (audio) {
        audio.play().catch(err => console.log("Audio play failed:", err));
      }
    }
  };

  useEffect(() => {
    audioBooks.forEach(audio => {
      const audioElement = audioRefs.current[audio.id];
      if (audioElement) {
        audioElement.addEventListener("timeupdate", () => {
          setProgress(prev => ({
            ...prev,
            [audio.id]: (audioElement.currentTime / audioElement.duration) * 100
          }));
          setDuration(prev => ({
            ...prev,
            [audio.id]: audioElement.duration
          }));
        });

        audioElement.addEventListener("ended", () => {
          setActiveAudio(null);
        });
      }
    });
  }, []);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
          {/* Header */}
          <div className="bg-purple-50 p-6 border-b border-purple-100">
            <div className="flex items-center gap-3 mb-4">
              <Headphones className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800">Audios For Relaxation</h2>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-purple-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="text-sm text-gray-600">
              <span className="mr-4">Category:</span>
              {["Sleep", "Motivation", "ADHD"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`mr-2 px-3 py-1 rounded ${selectedCategory === cat
                    ? "bg-purple-200 text-purple-800"
                    : "text-purple-600 hover:bg-purple-100"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Audio List */}
          <div className="p-6">
            {filteredAudioBooks.map(audio => (
              <div key={audio.id} className="mb-6">
                <div className="flex items-center justify-between py-3 px-4 hover:bg-purple-50 rounded-lg transition-colors border border-purple-100">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleAudio(audio.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
                    >
                      {activeAudio === audio.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                    <div>
                      <span className="font-medium text-gray-800">{audio.title}</span>
                      <div className="text-xs text-gray-500">{audio.category}</div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatTime(duration[audio.id])}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-purple-100 rounded-full mt-2">
                  <div
                    className="h-2 bg-purple-500 rounded-full"
                    style={{ width: `${progress[audio.id] || 0}%` }}
                  ></div>
                </div>

                {/* Hidden audio */}
                <audio ref={(el) => (audioRefs.current[audio.id] = el)} src={audio.src} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Audio;
