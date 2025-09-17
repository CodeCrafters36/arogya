import React, { useState, useEffect } from 'react';

const PeerSupport = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showThreadModal, setShowThreadModal] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [buddyStatus, setBuddyStatus] = useState('idle'); // idle, searching, matched
  const [newReply, setNewReply] = useState('');
  const [showChatModal, setShowChatModal] = useState(false);
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

  // Filter threads based on search
  const filteredThreads = threads.filter(thread =>
    thread.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewPost = () => {
    if (newPost.question.trim()) {
      const newThread = {
        id: Date.now(),
        question: newPost.question,
        description: newPost.description,
        author: newPost.anonymous ? "Anonymous" : "You",
        replies: [],
        likes: 0,
        timeAgo: "Just now"
      };
      
      setThreads([newThread, ...threads]);
      setNewPost({ question: '', description: '', anonymous: true });
      setShowNewPostModal(false);
      
      // Show success notification
      setTimeout(() => {
        alert('🎉 Your post has been created successfully! The community will help you soon.');
      }, 300);
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

      // Update the thread with new reply
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
      
      alert('✅ Your reply has been posted!');
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
  };

  const startBuddyConnect = () => {
    setBuddyStatus('searching');
    
    // Simulate buddy matching process
    setTimeout(() => {
      setBuddyStatus('matched');
      alert('✨ Great news! You\'ve been matched with Alex_22. You can now start chatting!');
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

      // Simulate buddy response after 2 seconds
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              👥 Peer Support
            </h1>
            <p className="text-indigo-100">Connect with your community for support and guidance</p>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden">
          
          {/* Search Section */}
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-lg">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 outline-none"
                />
              </div>
              <button
                onClick={() => setShowNewPostModal(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                + New Post
              </button>
            </div>
          </div>

          {/* Safety Banner */}
          <div className="mx-6 mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-amber-200 rounded-xl p-5 flex items-start gap-4">
            <div className="bg-white p-2.5 rounded-full shadow-sm">
              <span className="text-xl">📢</span>
            </div>
            <div>
              <h3 className="font-bold text-amber-800 mb-1">Safety Reminder:</h3>
              <p className="text-amber-700 text-sm">Please keep discussions respectful. All chats are moderated. 🚦</p>
            </div>
          </div>

          {/* Threads Section */}
          <div className="p-6 space-y-4">
            {filteredThreads.map((thread, index) => (
              <div
                key={thread.id}
                className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-indigo-300 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    Q: {thread.question}
                  </h3>
                  
                  {thread.description && (
                    <p className="text-gray-600 text-sm">{thread.description}</p>
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>By: {thread.author}</span>
                      <span>•</span>
                      <span>{thread.timeAgo}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          💬 {thread.replies.length} Replies
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            likeThread(thread.id);
                          }}
                          className="flex items-center gap-1 hover:text-red-500 transition-colors"
                        >
                          👍 {thread.likes}
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => openThread(thread)}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
                      >
                        View Thread
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredThreads.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500">No threads found matching your search.</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Buddy Connect Section */}
          <div className="mx-6 mb-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 text-white text-center">
            <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
              👥 Buddy Connect
            </h3>
            <p className="text-pink-100 mb-4">Find a peer buddy for one-on-one support</p>
            
            {buddyStatus === 'idle' && (
              <button
                onClick={startBuddyConnect}
                className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                Start Matching
              </button>
            )}
            
            {buddyStatus === 'searching' && (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Searching for available buddies...</span>
              </div>
            )}
            
            {buddyStatus === 'matched' && (
              <div className="space-y-3">
                <div className="text-pink-100">✨ Matched with Alex_22</div>
                <button
                  onClick={openBuddyChat}
                  className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  Open Chat
                </button>
              </div>
            )}
          </div>
        </div>

        {/* New Post Modal */}
        {showNewPostModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all duration-300">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Create New Post</h2>
                  <button
                    onClick={() => setShowNewPostModal(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Question/Topic *
                    </label>
                    <input
                      type="text"
                      placeholder="What's on your mind?"
                      value={newPost.question}
                      onChange={(e) => setNewPost({...newPost, question: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      placeholder="Share more details..."
                      value={newPost.description}
                      onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={newPost.anonymous}
                      onChange={(e) => setNewPost({...newPost, anonymous: e.target.checked})}
                      className="w-4 h-4 text-indigo-600 border-2 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="anonymous" className="text-sm font-medium text-gray-700">
                      Post anonymously
                    </label>
                  </div>

                  <button
                    onClick={handleNewPost}
                    disabled={!newPost.question.trim()}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Create Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Thread Detail Modal */}
        {showThreadModal && selectedThread && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-800 pr-4">{selectedThread.question}</h2>
                  <button
                    onClick={closeThread}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors flex-shrink-0"
                  >
                    ×
                  </button>
                </div>
                
                {selectedThread.description && (
                  <p className="text-gray-600 mb-4">{selectedThread.description}</p>
                )}
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>By: {selectedThread.author}</span>
                  <span>•</span>
                  <span>{selectedThread.timeAgo}</span>
                  <span>•</span>
                  <span>👍 {selectedThread.likes}</span>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Replies ({selectedThread.replies.length})</h3>
                
                {selectedThread.replies.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">💬</div>
                    <p>No replies yet. Be the first to help!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedThread.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-800 mb-2">{reply.text}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>By: {reply.author}</span>
                          <span>•</span>
                          <span>{reply.timeAgo}</span>
                          <span>•</span>
                          <span>👍 {reply.likes}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200">
                <div className="space-y-3">
                  <textarea
                    placeholder="Share your thoughts or advice..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
                  />
                  <button
                    onClick={addReply}
                    disabled={!newReply.trim()}
                    className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Chat Modal */}
        {showChatModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-2xl h-[600px] shadow-2xl flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                      {buddyInfo.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{buddyInfo.name}</h3>
                      <div className="flex items-center gap-1 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-600">Online</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={closeChatModal}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
                  >
                    ×
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">{buddyInfo.bio}</p>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-xs lg:max-w-md">
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.sender === 'user'
                            ? 'bg-indigo-500 text-white rounded-br-sm'
                            : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <p className={`text-xs text-gray-500 mt-1 ${
                        message.sender === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message... (Press Enter to send)"
                      rows="1"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <span className="text-lg">📤</span>
                  </button>
                </div>
                
                {/* Chat Guidelines */}
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-700">
                    🛡️ <strong>Safe Chat:</strong> Keep conversations respectful. Report any inappropriate behavior.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerSupport;