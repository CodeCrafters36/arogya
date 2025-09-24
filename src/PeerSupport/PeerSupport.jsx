import React, { useState, useEffect } from 'react';

const PeerSupport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showThreadModal, setShowThreadModal] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [buddyStatus, setBuddyStatus] = useState('idle'); // idle, searching, matched
  const [newReply, setNewReply] = useState('');
  const [showChatModal, setShowChatModal] = useState(false);
  const [affirmations, setAffirmations] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hey! Thanks for connecting with me 😊", sender: "buddy", timestamp: "2:30 PM" },
    { id: 2, text: "I'm Alex, a 3rd year psychology student. How are you feeling today?", sender: "buddy", timestamp: "2:31 PM" }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [buddyInfo, setBuddyInfo] = useState({
    name: "Alex_22",
    status: "online",
    bio: "Psychology student, here to listen and support 💙"
  });
  
  const [threads, setThreads] = useState([
    {
      id: 1,
      question: "Feeling anxious before exams 😔",
      description: "I have my finals next week and I'm getting really stressed. Anyone else going through this?",
      author: "Anonymous",
      color: "from-blue-400 to-purple-500",
      replies: [
        { id: 1, text: "I totally understand! Try deep breathing exercises, they really help me.", author: "Student_Helper", likes: 5, timeAgo: "1 hour ago" },
        { id: 2, text: "Break your study sessions into smaller chunks. Don't try to study everything at once!", author: "Anonymous", likes: 3, timeAgo: "2 hours ago" }
      ],
      likes: 24,
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      question: "Anyone has tips for better sleep?",
      description: "I've been staying up too late and can't seem to fix my sleep schedule.",
      author: "Student_23",
      color: "from-indigo-400 to-blue-500",
      replies: [
        { id: 1, text: "Try keeping your phone away from bed. Screen time affects sleep quality!", author: "SleepExpert", likes: 8, timeAgo: "30 minutes ago" }
      ],
      likes: 15,
      timeAgo: "4 hours ago"
    },
    {
      id: 3,
      question: "How do you manage burnout?",
      description: "Feeling overwhelmed with coursework and part-time job. Need some advice.",
      author: "Anonymous",
      color: "from-purple-400 to-pink-500",
      replies: [
        { id: 1, text: "Take breaks! Even 10 minutes of walking helps reset your mind.", author: "Wellness_Coach", likes: 12, timeAgo: "45 minutes ago" },
        { id: 2, text: "I started saying no to extra commitments. It's okay to prioritize your mental health.", author: "Anonymous", likes: 9, timeAgo: "1 hour ago" }
      ],
      likes: 32,
      timeAgo: "6 hours ago"
    },
    {
      id: 4,
      question: "Dealing with social anxiety in college",
      description: "I find it really hard to make friends and speak up in class. Any tips?",
      author: "Anonymous",
      color: "from-green-400 to-teal-500",
      replies: [
        { id: 1, text: "Start small - maybe just smile at someone or ask a simple question. Baby steps!", author: "SocialButterfly", likes: 6, timeAgo: "20 minutes ago" }
      ],
      likes: 28,
      timeAgo: "8 hours ago"
    }
  ]);
  
  const [newPost, setNewPost] = useState({
    question: '',
    description: '',
    anonymous: true
  });

  // Floating particles animation
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Initialize floating particles
    const initialParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(initialParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed) % 110,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.1
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Show affirmation animation
  const showAffirmation = (text, type = 'star') => {
    const newAffirmation = {
      id: Date.now(),
      text,
      type,
      x: Math.random() * 80 + 10,
      y: Math.random() * 30 + 20
    };
    
    setAffirmations(prev => [...prev, newAffirmation]);
    
    setTimeout(() => {
      setAffirmations(prev => prev.filter(a => a.id !== newAffirmation.id));
    }, 3000);
  };

  // Filter threads based on search
  const filteredThreads = threads.filter(thread =>
    thread.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewPost = () => {
    if (newPost.question.trim()) {
      const colors = [
        "from-rose-400 to-orange-500",
        "from-cyan-400 to-blue-500",
        "from-violet-400 to-purple-500",
        "from-emerald-400 to-green-500"
      ];
      
      const newThread = {
        id: Date.now(),
        question: newPost.question,
        description: newPost.description,
        author: newPost.anonymous ? "Anonymous" : "You",
        color: colors[Math.floor(Math.random() * colors.length)],
        replies: [],
        likes: 0,
        timeAgo: "Just now"
      };
      
      setThreads([newThread, ...threads]);
      setNewPost({ question: '', description: '', anonymous: true });
      setShowNewPostModal(false);
      
      // Show affirmation
      showAffirmation("Your voice matters! ✨", 'sparkle');
      
      setTimeout(() => {
        alert('🎉 Your post has been shared with the community!');
      }, 500);
    }
  };

  const openThread = (thread) => {
    setSelectedThread(thread);
    setShowThreadModal(true);
  };

  const closeThread = () => {
    setShowThreadModal(false);
    setSelectedThread(null);
    setNewReply('');
  };

  const addReply = () => {
    if (newReply.trim() && selectedThread) {
      const reply = {
        id: Date.now(),
        text: newReply,
        author: "You",
        likes: 0,
        timeAgo: "Just now"
      };

      const updatedThreads = threads.map(thread => {
        if (thread.id === selectedThread.id) {
          return {
            ...thread,
            replies: [...thread.replies, reply]
          };
        }
        return thread;
      });

      setThreads(updatedThreads);
      setSelectedThread({
        ...selectedThread,
        replies: [...selectedThread.replies, reply]
      });
      setNewReply('');
      
      showAffirmation("Thank you for caring! 🌟", 'heart');
      alert('✅ Your support has been shared!');
    }
  };

  const likeThread = (threadId) => {
    const updatedThreads = threads.map(thread => {
      if (thread.id === threadId) {
        return { ...thread, likes: thread.likes + 1 };
      }
      return thread;
    });
    setThreads(updatedThreads);
    showAffirmation("Spreading positivity! 💫", 'star');
  };

  const startBuddyConnect = () => {
    setBuddyStatus('searching');
    
    setTimeout(() => {
      setBuddyStatus('matched');
      showAffirmation("Connection made! 🤝", 'heart');
      alert('✨ You\'ve been matched with a caring buddy!');
    }, 3000);
  };

  const openBuddyChat = () => {
    setShowChatModal(true);
  };

  const closeChatModal = () => {
    setShowChatModal(false);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };

      setChatMessages([...chatMessages, message]);
      setNewMessage('');

      setTimeout(() => {
        const responses = [
          "That sounds really challenging. How long have you been feeling this way?",
          "I understand what you're going through. You're not alone in this.",
          "Have you tried any coping strategies before? What worked for you?",
          "It's completely normal to feel overwhelmed sometimes. Take it one step at a time.",
          "Thank you for sharing that with me. It takes courage to open up.",
          "What would help you feel a little better right now?"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const buddyMessage = {
          id: Date.now() + 1,
          text: randomResponse,
          sender: "buddy",
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        };

        setChatMessages(prev => [...prev, buddyMessage]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 via-pink-50 to-blue-100">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent animate-pulse"></div>
        
        {/* Floating Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`,
              animation: `float ${5 + particle.id}s ease-in-out infinite alternate`
            }}
          />
        ))}
        
        {/* Gentle Wave Animation */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-200/30 to-transparent animate-pulse"></div>
      </div>

      {/* Floating Affirmations */}
      {affirmations.map(affirmation => (
        <div
          key={affirmation.id}
          className="fixed z-50 pointer-events-none animate-bounce"
          style={{
            left: `${affirmation.x}%`,
            top: `${affirmation.y}%`,
            animation: 'fadeUpOut 3s ease-out forwards'
          }}
        >
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm font-medium text-indigo-600 flex items-center gap-2">
            {affirmation.type === 'star' && '⭐'}
            {affirmation.type === 'heart' && '💖'}
            {affirmation.type === 'sparkle' && '✨'}
            {affirmation.text}
          </div>
        </div>
      ))}

      {/* Safety Guide Ribbon */}
      <div className="fixed top-4 right-4 z-40 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span>🛡️</span>
          <span>Safe Space</span>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4">
        {/* Floating Header */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                🫂 Peer Support Sanctuary
              </h1>
              <p className="text-gray-600 text-lg">A safe haven for connection, understanding, and mutual support</p>
            </div>
          </div>
        </div>

        {/* Search & Create Section */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/50">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-xl">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search for support topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 bg-white/80 border-2 border-purple-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-200 transition-all duration-300 outline-none text-lg"
                />
              </div>
              <button
                onClick={() => setShowNewPostModal(true)}
                className="bg-gradient-to-r from-emerald-400 to-green-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-emerald-500 hover:to-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap text-lg"
              >
                ✨ Share Your Thoughts
              </button>
            </div>
          </div>
        </div>

        {/* Floating Thread Bubbles */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredThreads.map((thread, index) => (
              <div
                key={thread.id}
                className="group cursor-pointer"
                onClick={() => openThread(thread)}
                style={{
                  animation: `float ${3 + index * 0.5}s ease-in-out infinite alternate`
                }}
              >
                <div className={`bg-gradient-to-br ${thread.color} p-1 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500`}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 h-full">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors leading-tight">
                        {thread.question}
                      </h3>
                      
                      {thread.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">{thread.description}</p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">{thread.author}</span> • {thread.timeAgo}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-blue-500">
                            <span>💬</span>
                            <span>{thread.replies.length}</span>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              likeThread(thread.id);
                            }}
                            className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
                          >
                            <span>💖</span>
                            <span>{thread.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredThreads.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-12 shadow-xl border border-white/50 max-w-md mx-auto">
                <div className="text-8xl mb-6 animate-bounce">🔍</div>
                <p className="text-gray-600 text-lg mb-4">No conversations found</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold text-lg"
                >
                  Explore all topics
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Buddy Connect Campfire Zone */}
        <div className="mb-8">
          <div className="relative">
            <div className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 rounded-3xl p-1 shadow-2xl">
              <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-3xl p-8 text-center relative overflow-hidden">
                
                {/* Campfire Animation */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4">
                  <div className="text-6xl animate-pulse">🔥</div>
                </div>
                
                <div className="relative z-10 mb-8">
                  <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
                    <span>🤝</span> Buddy Connect Zone
                  </h3>
                  <p className="text-gray-700 text-lg mb-6">Find a caring peer for personal support and understanding</p>
                  
                  {buddyStatus === 'idle' && (
                    <button
                      onClick={startBuddyConnect}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg text-lg"
                    >
                      🌟 Find Your Buddy
                    </button>
                  )}
                  
                  {buddyStatus === 'searching' && (
                    <div className="flex items-center justify-center gap-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-orange-500"></div>
                      <span className="text-lg font-medium text-gray-700">Connecting hearts...</span>
                    </div>
                  )}
                  
                  {buddyStatus === 'matched' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl animate-pulse">
                          A
                        </div>
                        <div className="text-left">
                          <div className="text-lg font-bold text-gray-800">Matched with {buddyInfo.name}</div>
                          <div className="text-green-600 flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Ready to chat
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={openBuddyChat}
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg text-lg"
                      >
                        💬 Start Conversation
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl w-full max-w-lg shadow-2xl border border-white/50 transform animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Share Your Thoughts</h2>
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-3xl font-light transition-colors hover:rotate-90 transform duration-300"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    What's on your mind? ✨
                  </label>
                  <input
                    type="text"
                    placeholder="Share your thoughts or ask for support..."
                    value={newPost.question}
                    onChange={(e) => setNewPost({...newPost, question: e.target.value})}
                    className="w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-200 transition-all outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Tell us more (Optional) 💭
                  </label>
                  <textarea
                    placeholder="Share additional details if you'd like..."
                    value={newPost.description}
                    onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                    rows="4"
                    className="w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-200 transition-all outline-none resize-none text-lg"
                  />
                </div>

                <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={newPost.anonymous}
                    onChange={(e) => setNewPost({...newPost, anonymous: e.target.checked})}
                    className="w-5 h-5 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="anonymous" className="text-lg font-medium text-gray-700 flex items-center gap-2">
                    <span>🎭</span> Share anonymously
                  </label>
                </div>

                <button
                  onClick={handleNewPost}
                  disabled={!newPost.question.trim()}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  🌟 Share with Community
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thread Detail Modal */}
      {showThreadModal && selectedThread && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-white/50">
            <div className="p-8 border-b border-gray-200">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800 pr-4 leading-tight">{selectedThread.question}</h2>
                <button
                  onClick={closeThread}
                  className="text-gray-400 hover:text-gray-600 text-3xl font-light transition-colors hover:rotate-90 transform duration-300 flex-shrink-0"
                >
                  ×
                </button>
              </div>
              
              {selectedThread.description && (
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{selectedThread.description}</p>
              )}
              
              <div className="flex items-center gap-6 text-gray-600">
                <span className="flex items-center gap-2"><span>👤</span>{selectedThread.author}</span>
                <span className="flex items-center gap-2"><span>🕐</span>{selectedThread.timeAgo}</span>
                <span className="flex items-center gap-2"><span>💖</span>{selectedThread.likes}</span>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto p-8">
              <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
                <span>💬</span> Community Responses ({selectedThread.replies.length})
              </h3>
              
              {selectedThread.replies.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">🤗</div>
                  <p className="text-lg">No responses yet. Be the first to offer support!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {selectedThread.replies.map((reply) => (
                    <div key={reply.id} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 shadow-sm">
                      <p className="text-gray-800 mb-4 text-lg leading-relaxed">{reply.text}</p>
                      <div className="flex items-center gap-4 text-gray-600">
                        <span className="flex items-center gap-1"><span>👤</span>{reply.author}</span>
                        <span className="flex items-center gap-1"><span>🕐</span>{reply.timeAgo}</span>
                        <span className="flex items-center gap-1"><span>💖</span>{reply.likes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 border-t border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
              <div className="space-y-4">
                <textarea
                  placeholder="Share your support, advice, or encouragement... 💙"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  rows="4"
                  className="w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-200 transition-all outline-none resize-none text-lg"
                />
                <button
                  onClick={addReply}
                  disabled={!newReply.trim()}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  🌟 Send Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl w-full max-w-3xl h-[700px] shadow-2xl flex flex-col border border-white/50">
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {buddyInfo.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">{buddyInfo.name}</h3>
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Online & Ready to Listen</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeChatModal}
                  className="text-gray-400 hover:text-gray-600 text-3xl font-light transition-colors hover:rotate-90 transform duration-300"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-600 mt-3 text-lg">{buddyInfo.bio}</p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-sm lg:max-w-md">
                    <div
                      className={`rounded-3xl px-6 py-4 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-lg shadow-lg'
                          : 'bg-white text-gray-800 rounded-bl-lg shadow-lg border border-gray-200'
                      }`}
                      style={{
                        animation: 'messageSlideIn 0.3s ease-out'
                      }}
                    >
                      <p className="text-lg leading-relaxed">{message.text}</p>
                    </div>
                    <p className={`text-sm text-gray-500 mt-2 ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-gray-200 bg-white rounded-b-3xl">
              <div className="flex gap-4 mb-4">
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share what's on your heart... 💭"
                    rows="2"
                    className="w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-200 transition-all outline-none resize-none text-lg"
                    style={{ minHeight: '60px', maxHeight: '140px' }}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="text-2xl">💫</span>
                </button>
              </div>
              
              {/* Chat Guidelines */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4">
                <p className="text-sm text-green-700 flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <strong>Safe Chat:</strong> This conversation is private and supportive. Feel free to share openly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
      
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }
        
        @keyframes fadeUpOut {
          0% { opacity: 0; transform: translateY(20px) scale(0.8); }
          20% { opacity: 1; transform: translateY(0px) scale(1); }
          80% { opacity: 1; transform: translateY(-10px) scale(1); }
          100% { opacity: 0; transform: translateY(-30px) scale(0.8); }
        }
        
        @keyframes messageSlideIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .fade-in {
          animation-name: fadeIn;
        }
        
        .slide-in-from-bottom-4 {
          animation-name: slideInFromBottom;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInFromBottom {
          from { transform: translateY(1rem); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PeerSupport;