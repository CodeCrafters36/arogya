import React, { useState } from 'react';
import { Play, Search, Video, Clock } from 'lucide-react';

const VideoComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Sleep');

  const videoLibrary = [
    {
      id: 1,
      title: "10 Hour Rain Sounds for Deep Sleep",
      duration: "10:00:00",
      category: "Sleep",
      videoId: "mPZkdNFkNps",
      thumbnail: `https://img.youtube.com/vi/mPZkdNFkNps/maxresdefault.jpg`
    },
    {
      id: 2,
      title: "Guided Sleep Meditation for Anxiety",
      duration: "45:32",
      category: "Sleep",
      videoId: "1vx8iUvfyCY",
      thumbnail: `https://img.youtube.com/vi/1vx8iUvfyCY/maxresdefault.jpg`
    },
    {
      id: 3,
      title: "Ocean Waves 8 Hours for Sleep",
      duration: "8:00:00",
      category: "Sleep",
      videoId: "V1bFr2SWP1I",
      thumbnail: `https://img.youtube.com/vi/V1bFr2SWP1I/maxresdefault.jpg`
    },
    {
      id: 4,
      title: "Forest Sounds - Birds Chirping",
      duration: "3:00:00",
      category: "Sleep",
      videoId: "xNN7iTA57jM",
      thumbnail: `https://img.youtube.com/vi/xNN7iTA57jM/maxresdefault.jpg`
    },
    {
      id: 5,
      title: "Morning Motivation for Depression",
      duration: "15:24",
      category: "Motivation",
      videoId: "mgmVOuLgFB0",
      thumbnail: `https://img.youtube.com/vi/mgmVOuLgFB0/maxresdefault.jpg`
    },
    {
      id: 6,
      title: "Self Love Affirmations",
      duration: "20:18",
      category: "Motivation",
      videoId: "WQf6kWUqKmI",
      thumbnail: `https://img.youtube.com/vi/WQf6kWUqKmI/maxresdefault.jpg`
    },
    {
      id: 7,
      title: "Overcoming Depression - Daily Habits",
      duration: "12:45",
      category: "Motivation",
      videoId: "2X4qySqsYP8",
      thumbnail: `https://img.youtube.com/vi/2X4qySqsYP8/maxresdefault.jpg`
    },
    {
      id: 8,
      title: "ADHD Focus Music - Study Sounds",
      duration: "2:00:00",
      category: "ADHD",
      videoId: "kgx4WGK0oNU",
      thumbnail: `https://img.youtube.com/vi/kgx4WGK0oNU/maxresdefault.jpg`
    },
    {
      id: 9,
      title: "Meditation for ADHD Mind",
      duration: "18:52",
      category: "ADHD",
      videoId: "2-FGE1zWVLE",
      thumbnail: `https://img.youtube.com/vi/2-FGE1zWVLE/maxresdefault.jpg`
    },
    {
      id: 10,
      title: "Anxiety Relief Breathing Exercise",
      duration: "10:33",
      category: "ADHD",
      videoId: "tybOi4hjZFQ",
      thumbnail: `https://img.youtube.com/vi/tybOi4hjZFQ/maxresdefault.jpg`
    }
  ];

  const filteredVideos = videoLibrary.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Sleep' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Limit to 5-6 videos per category
  const limitedVideos = filteredVideos.slice(0, 6);

  const openVideo = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-25 to-purple-100 p-6" style={{background: 'linear-gradient(135deg, #f3f0ff 0%, #e9e5f3 50%, #ddd6fe 100%)'}}>
      <div className="max-w-6xl mx-auto">
        
        {/* Video Library Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
          {/* Header */}
          <div className="bg-purple-50 p-6 border-b border-purple-100">
            <div className="flex items-center gap-3 mb-4">
              <Video className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800">Video Library</h2>
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-purple-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="text-sm text-gray-600">
              <span className="mr-4">Category Filter:</span>
              <button
                onClick={() => setSelectedCategory('Sleep')}
                className={`mr-2 px-3 py-1 rounded ${selectedCategory === 'Sleep' ? 'bg-purple-200 text-purple-800' : 'text-purple-600 hover:bg-purple-100'}`}
              >
                Sleep
              </button>
              <span className="text-gray-400 mr-2">|</span>
              <button
                onClick={() => setSelectedCategory('Motivation')}
                className={`mr-2 px-3 py-1 rounded ${selectedCategory === 'Motivation' ? 'bg-purple-200 text-purple-800' : 'text-purple-600 hover:bg-purple-100'}`}
              >
                Motivation
              </button>
              <span className="text-gray-400 mr-2">|</span>
              <button
                onClick={() => setSelectedCategory('ADHD')}
                className={`px-3 py-1 rounded ${selectedCategory === 'ADHD' ? 'bg-purple-200 text-purple-800' : 'text-purple-600 hover:bg-purple-100'}`}
              >
                ADHD
              </button>
            </div>
          </div>

          {/* Video Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {limitedVideos.map(video => (
                <div key={video.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-purple-100">
                  {/* Video Thumbnail */}
                  <div className="relative group cursor-pointer" onClick={() => openVideo(video.videoId)}>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {video.duration}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-purple-600 cursor-pointer" 
                        onClick={() => openVideo(video.videoId)}>
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full capitalize">
                        {video.category}
                      </span>
                      <button
                        onClick={() => openVideo(video.videoId)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 text-sm font-medium"
                      >
                        Watch Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {limitedVideos.length === 0 && (
              <div className="text-center py-12">
                <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No videos found</h3>
                <p className="text-gray-500">Try adjusting your search or category filter</p>
              </div>
            )}
          </div>
        </div>

        {/* Alternative: Embedded Video Player Section */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
          <div className="bg-purple-50 p-6 border-b border-purple-100">
            <div className="flex items-center gap-3">
              <Play className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800">Featured Relaxation Video</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/1ZYbU82GVz4?si=example"
                title="Calming Nature Sounds"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              ></iframe>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                3 Hours of Gentle Rain for Deep Sleep and Relaxation
              </h3>
              <p className="text-gray-600">
                Let the soothing sounds of gentle rainfall wash away your stress and guide you into peaceful sleep.
              </p>
            </div>
          </div>
        </div>

        {/* Supportive Message */}
        <div className="mt-8 text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Video className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Visual Healing Journey</h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            These carefully selected videos combine soothing visuals with calming sounds to support your mental wellness and provide comfort during difficult times.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;