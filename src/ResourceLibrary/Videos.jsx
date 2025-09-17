import React, { useState, useEffect } from 'react';
import { Search, Play, Download, Globe, Subtitles, Clock, Eye, AlertCircle } from 'lucide-react';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // YouTube API configuration
  const YOUTUBE_API_KEY = 'AIzaSyAcH3tFGkB5LDkWAAAXpg6YP37BqFEfdGQ';
  const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

  // Default search queries for different categories
  const getSearchQuery = () => {
    if (searchTerm.trim()) {
      return searchTerm.trim();
    }
    
    const categoryQueries = {
      all: 'stress relief meditation mindfulness relaxation',
      meditation: 'guided meditation mindfulness breathing exercises relaxation',
      awareness: 'mental health awareness anxiety depression stress management',
      relaxation: 'relaxation techniques stress relief yoga calming music'
    };
    
    return categoryQueries[categoryFilter] || categoryQueries.all;
  };

  const fetchYouTubeVideos = async (pageToken = null, isNewSearch = false) => {
    try {
      setLoading(true);
      if (isNewSearch) {
        setError(null);
        setVideos([]);
        setNextPageToken(null);
      }

      const query = getSearchQuery();
      const languageCode = languageFilter !== 'all' ? (languageFilter === 'hindi' ? 'hi' : 'en') : null;

      let apiUrl = `${YOUTUBE_API_URL}/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}&order=relevance&videoDuration=medium`;
      
      if (languageCode) {
        apiUrl += `&relevanceLanguage=${languageCode}`;
      }
      
      if (pageToken) {
        apiUrl += `&pageToken=${pageToken}`;
      }

      console.log('Fetching from:', apiUrl);
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        if (isNewSearch) {
          setVideos([]);
        }
        setLoading(false);
        return;
      }

      // Get video details for duration and view count
      const videoIds = data.items.map(item => item.id.videoId).join(',');
      const detailsUrl = `${YOUTUBE_API_URL}/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
      
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      // Combine search results with video details
      const videosWithDetails = data.items.map(item => {
        const details = detailsData.items?.find(detail => detail.id === item.id.videoId);
        
        return {
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          duration: details ? formatDuration(details.contentDetails.duration) : 'N/A',
          category: categoryFilter,
          language: detectLanguage(item.snippet.title, item.snippet.description),
          source: "YouTube",
          views: details ? formatViewCount(details.statistics.viewCount) : '0',
          thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default.url,
          videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
          hasSubtitles: true,
          isOfflineAvailable: false,
          instructor: item.snippet.channelTitle,
          publishedAt: item.snippet.publishedAt
        };
      });

      if (isNewSearch || !pageToken) {
        setVideos(videosWithDetails);
      } else {
        setVideos(prev => [...prev, ...videosWithDetails]);
      }
      
      setNextPageToken(data.nextPageToken);
      
    } catch (error) {
      console.error('YouTube API Error:', error);
      setError(error.message);
      
      // Show dummy data only on first load if API fails
      if (isNewSearch || videos.length === 0) {
        setVideos(getDummyVideos());
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format ISO 8601 duration to readable format
  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 'N/A';
    
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');
    
    let formatted = '';
    if (hours) formatted += hours + ':';
    if (minutes) formatted += minutes.padStart(hours ? 2 : 1, '0') + ':';
    else if (hours) formatted += '00:';
    formatted += (seconds || '0').padStart(2, '0');
    
    return formatted;
  };

  // Helper function to format view count
  const formatViewCount = (count) => {
    if (!count) return '0';
    const num = parseInt(count);
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Helper function to detect language
  const detectLanguage = (title, description) => {
    const text = (title + ' ' + description).toLowerCase();
    const hindiPattern = /[\u0900-\u097F]/;
    
    if (hindiPattern.test(text)) return 'Hindi';
    return 'English';
  };

  // Fallback dummy data
  const getDummyVideos = () => [
    {
      id: 'dummy1',
      title: "10 Minute Guided Meditation for Stress Relief",
      description: "A calming guided meditation to help reduce stress and anxiety. Perfect for beginners.",
      duration: "10:25",
      category: "meditation",
      language: "English",
      source: "YouTube",
      views: "1.2M",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=inpok4MKVLM",
      embedUrl: "https://www.youtube.com/embed/inpok4MKVLM",
      hasSubtitles: true,
      isOfflineAvailable: false,
      instructor: "Meditation Guru"
    },
    {
      id: 'dummy2',
      title: "Deep Breathing Exercises for Anxiety",
      description: "Simple yet effective breathing techniques to manage anxiety and panic attacks instantly.",
      duration: "8:30",
      category: "relaxation",
      language: "English",
      source: "YouTube",
      views: "856K",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=225&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=tybOi4hjZFQ",
      embedUrl: "https://www.youtube.com/embed/tybOi4hjZFQ",
      hasSubtitles: true,
      isOfflineAvailable: false,
      instructor: "Wellness Coach"
    },
    {
      id: 'dummy3',
      title: "5 Minute Stress Relief Meditation",
      description: "Quick stress relief meditation that you can do anywhere, anytime.",
      duration: "5:15",
      category: "meditation",
      language: "English",
      source: "YouTube",
      views: "423K",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
      videoUrl: "https://www.youtube.com/watch?v=ZToicYcHIOU",
      embedUrl: "https://www.youtube.com/embed/ZToicYcHIOU",
      hasSubtitles: true,
      isOfflineAvailable: false,
      instructor: "Mindful Living"
    }
  ];

  // Load default stress relief and meditation videos on component mount
  useEffect(() => {
    fetchYouTubeVideos(null, true);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    fetchYouTubeVideos(null, true);
  };

  // Handle filter changes
  useEffect(() => {
    fetchYouTubeVideos(null, true);
  }, [categoryFilter, languageFilter]);

  const filteredVideos = videos.filter(video => {
    const matchesCategory = categoryFilter === 'all' || video.category === categoryFilter;
    const matchesLanguage = languageFilter === 'all' || video.language.toLowerCase().includes(languageFilter);
    
    return matchesCategory && matchesLanguage;
  });

  const playVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const loadMoreVideos = () => {
    if (nextPageToken && !loading) {
      fetchYouTubeVideos(nextPageToken, false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Play className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-800">Stress Relief & Meditation Videos</h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for meditation, stress relief, relaxation videos..."
              className="w-full pl-12 pr-20 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-gray-600 font-medium">Filters:</span>
            
            <select 
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="meditation">Meditation</option>
              <option value="awareness">Mental Health</option>
              <option value="relaxation">Relaxation</option>
            </select>

            <select 
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
            >
              <option value="all">All Languages</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800 text-sm">
                {error.includes('quotaExceeded') ? 
                  'YouTube API quota exceeded. Showing sample videos.' : 
                  `API Error: ${error}. Showing sample videos.`
                }
              </p>
            </div>
          )}
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold truncate">{selectedVideo.title}</h3>
                <button
                  onClick={closeVideo}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="aspect-video">
                <iframe
                  src={selectedVideo.embedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-2">By {selectedVideo.instructor}</p>
                <p className="text-sm text-gray-500">{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Videos Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading && videos.length === 0 ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))
          ) : (
            filteredVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                {/* Video Thumbnail */}
                <div className="relative cursor-pointer" onClick={() => playVideo(video)}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-red-600 text-white p-4 rounded-full hover:bg-red-700 transition-colors">
                      <Play className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>

                  {/* Source Badge */}
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    YouTube
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {video.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <span>By {video.instructor}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{video.views}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span>{video.language}</span>
                      </div>
                      
                      {video.hasSubtitles && (
                        <div className="flex items-center gap-1">
                          <Subtitles className="w-3 h-3" />
                          <span>CC</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => playVideo(video)}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                    >
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {!loading && filteredVideos.length === 0 && (
            <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center">
              <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No videos found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {nextPageToken && !loading && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreVideos}
              className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Load More Videos
            </button>
          </div>
        )}

        {/* Loading indicator for load more */}
        {loading && videos.length > 0 && (
          <div className="text-center mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        )}

        {/* API Status */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 text-sm">
            <strong>✅ YouTube API Active:</strong> Fetching real stress relief & meditation videos. Videos play directly in the app with embedded player.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Videos;