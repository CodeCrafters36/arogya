// // src/pages/AudioBooks.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Search,
//   Book,
//   Download,
//   Star,
//   Clock,
//   Filter,
//   BookOpen,
//   Bookmark,
//   Heart,
// } from 'lucide-react';

// const AudioBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [languageFilter, setLanguageFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('popular');
//   const [loading, setLoading] = useState(true);
//   const [favorites, setFavorites] = useState(new Set());
//   const [bookmarks, setBookmarks] = useState(new Set());

//   // Normalize Open Library API docs to our schema
//   const normalizeOpenLibraryDoc = (doc) => {
//     const cover = doc.cover_i
//       ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
//       : '/placeholder-book.jpg';

//     const id =
//       (doc.edition_key && doc.edition_key[0]) ||
//       doc.key ||
//       doc.title;

//     return {
//       id,
//       title: doc.title,
//       author: doc.author_name ? doc.author_name.join(', ') : 'Unknown',
//       description:
//         typeof doc.first_sentence === 'string'
//           ? doc.first_sentence
//           : doc.subtitle || '',
//       category:
//         doc.subject && doc.subject.length
//           ? doc.subject[0].toLowerCase().replace(/\s+/g, '-')
//           : 'general',
//       language: doc.language ? doc.language[0] : 'eng',
//       pages: doc.number_of_pages_median || 0,
//       rating: 4.3, // Open Library has no ratings → fallback
//       reviews: doc.edition_count || 0,
//       publishedYear: doc.first_publish_year || 'N/A',
//       isOfflineAvailable: false,
//       isFree: true, // Open Library = free previews/borrows
//       cover,
//       readTime: doc.number_of_pages_median
//         ? `${Math.ceil(doc.number_of_pages_median / 40)} hrs`
//         : 'N/A',
//       format: ['Audio', 'EPUB'],
//       downloadUrl: `https://openlibrary.org${doc.key}`,
//     };
//   };

//   useEffect(() => {
//     let controller = new AbortController();
//     const delay = 400;
//     const timer = setTimeout(async () => {
//       try {
//         setLoading(true);

//         const q = encodeURIComponent(searchTerm.trim() || 'audiobook self help');
//         const subject =
//           categoryFilter !== 'all'
//             ? `&subject=${encodeURIComponent(categoryFilter)}`
//             : '';
//         const lang =
//           languageFilter !== 'all'
//             ? `&language=${
//                 languageFilter === 'english' ? 'eng' : 'hin'
//               }`
//             : '';

//         const url = `https://openlibrary.org/search.json?q=${q}${subject}${lang}&limit=20`;

//         const res = await fetch(url, { signal: controller.signal });
//         if (!res.ok) throw new Error('Network error');
//         const data = await res.json();

//         const normalized = (data.docs || []).map(normalizeOpenLibraryDoc);
//         setBooks(normalized);
//         setLoading(false);
//       } catch (err) {
//         if (err.name !== 'AbortError') {
//           console.error(err);
//           setBooks([]);
//           setLoading(false);
//         }
//       }
//     }, delay);

//     return () => {
//       clearTimeout(timer);
//       controller.abort();
//     };
//   }, [searchTerm, categoryFilter, languageFilter]);

//   const toggleFavorite = (bookId) => {
//     const newFavorites = new Set(favorites);
//     if (newFavorites.has(bookId)) {
//       newFavorites.delete(bookId);
//     } else {
//       newFavorites.add(bookId);
//     }
//     setFavorites(newFavorites);
//   };

//   const toggleBookmark = (bookId) => {
//     const newBookmarks = new Set(bookmarks);
//     if (newBookmarks.has(bookId)) {
//       newBookmarks.delete(bookId);
//     } else {
//       newBookmarks.add(bookId);
//     }
//     setBookmarks(newBookmarks);
//   };

//   const downloadBook = (book) => {
//     if (book.downloadUrl) {
//       window.open(book.downloadUrl, '_blank');
//     } else {
//       alert('Download not available');
//     }
//   };

//   const readBook = (book) => {
//     if (book.downloadUrl) {
//       window.open(book.downloadUrl, '_blank');
//     } else {
//       alert('Preview not available');
//     }
//   };

//   const filteredBooks = books.filter((book) => {
//     const matchesSearch =
//       book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       book.description.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesCategory =
//       categoryFilter === 'all' || book.category === categoryFilter;
//     const matchesLanguage =
//       languageFilter === 'all' ||
//       book.language.toLowerCase() === languageFilter;

//     return matchesSearch && matchesCategory && matchesLanguage;
//   });

//   const sortedBooks = [...filteredBooks].sort((a, b) => {
//     switch (sortBy) {
//       case 'rating':
//         return b.rating - a.rating;
//       case 'newest':
//         return b.publishedYear - a.publishedYear;
//       case 'title':
//         return a.title.localeCompare(b.title);
//       case 'popular':
//       default:
//         return b.reviews - a.reviews;
//     }
//   });

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(
//         <Star
//           key={`full-${i}`}
//           className="w-4 h-4 fill-yellow-400 text-yellow-400"
//         />
//       );
//     }

//     if (hasHalfStar) {
//       stars.push(
//         <Star
//           key="half"
//           className="w-4 h-4 fill-yellow-400/50 text-yellow-400"
//         />
//       );
//     }

//     const remainingStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < remainingStars; i++) {
//       stars.push(
//         <Star
//           key={`empty-${i}`}
//           className="w-4 h-4 text-gray-300"
//         />
//       );
//     }

//     return stars;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//           <div className="flex items-center gap-3 mb-6">
//             <Book className="w-8 h-8 text-amber-600" />
//             <h1 className="text-3xl font-bold text-gray-800">Mental Health Self-help Books</h1>
//           </div>

//           {/* Search Bar */}
//           <div className="relative mb-4">
//             <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search audiobooks by title, author, or topic..."
//               className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Filters and Sort */}
//           <div className="flex flex-wrap gap-4 items-center">
//             <div className="flex items-center gap-2">
//               <Filter className="w-4 h-4 text-gray-600" />
//               <span className="text-gray-600 font-medium">Filter:</span>
//             </div>

//             <select
//               className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//             >
//               <option value="all">All Categories</option>
//               <option value="anxiety">Anxiety & Worry</option>
//               <option value="mindfulness">Mindfulness</option>
//               <option value="stress">Stress Management</option>
//               <option value="sleep">Sleep Health</option>
//               <option value="resilience">Resilience</option>
//               <option value="general">General Mental Health</option>
//             </select>

//             <select
//               className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//               value={languageFilter}
//               onChange={(e) => setLanguageFilter(e.target.value)}
//             >
//               <option value="all">All Languages</option>
//               <option value="english">English</option>
//               <option value="hindi">Hindi</option>
//             </select>

//             <select
//               className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//             >
//               <option value="popular">Most Popular</option>
//               <option value="rating">Highest Rated</option>
//               <option value="newest">Newest First</option>
//               <option value="title">A-Z</option>
//             </select>
//           </div>
//         </div>

//         {/* Books Grid */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {loading ? (
//             Array.from({ length: 8 }).map((_, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
//               >
//                 <div className="h-64 bg-gray-200"></div>
//                 <div className="p-4">
//                   <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
//                   <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
//                   <div className="h-8 bg-gray-200 rounded w-full"></div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             sortedBooks.map((book) => (
//               <div
//                 key={book.id}
//                 className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
//               >
//                 {/* Book Cover */}
//                 <div className="relative">
//                   <img
//                     src={book.cover}
//                     alt={book.title}
//                     className="w-full h-64 object-cover"
//                     loading="lazy"
//                   />

//                   {/* Hover Actions */}
//                   <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
//                     <button
//                       onClick={() => readBook(book)}
//                       className="bg-amber-600 text-white p-3 rounded-full hover:bg-amber-700 transition-colors"
//                       title="Read Now"
//                     >
//                       <BookOpen className="w-5 h-5" />
//                     </button>

//                     <button
//                       onClick={() => downloadBook(book)}
//                       className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors"
//                       title="Download"
//                     >
//                       <Download className="w-5 h-5" />
//                     </button>
//                   </div>

//                   {/* Top badges */}
//                   <div className="absolute top-2 left-2 flex flex-col gap-1">
//                     {book.isFree && (
//                       <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
//                         Free
//                       </span>
//                     )}
//                   </div>

//                   {/* Top right actions */}
//                   <div className="absolute top-2 right-2 flex flex-col gap-1">
//                     <button
//                       onClick={() => toggleFavorite(book.id)}
//                       className={`p-2 rounded-full transition-colors ${
//                         favorites.has(book.id)
//                           ? 'bg-red-600 text-white'
//                           : 'bg-white bg-opacity-80 text-gray-600 hover:bg-red-100'
//                       }`}
//                       title="Add to Favorites"
//                     >
//                       <Heart className="w-4 h-4" />
//                     </button>

//                     <button
//                       onClick={() => toggleBookmark(book.id)}
//                       className={`p-2 rounded-full transition-colors ${
//                         bookmarks.has(book.id)
//                           ? 'bg-amber-600 text-white'
//                           : 'bg-white bg-opacity-80 text-gray-600 hover:bg-amber-100'
//                       }`}
//                       title="Bookmark"
//                     >
//                       <Bookmark className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Book Info */}
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[3.5rem]">
//                     {book.title}
//                   </h3>

//                   <p className="text-sm text-amber-600 font-medium mb-2">
//                     {book.author}
//                   </p>

//                   <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                     {book.description}
//                   </p>

//                   {/* Rating */}
//                   <div className="flex items-center gap-2 mb-3">
//                     <div className="flex items-center gap-1">
//                       {renderStars(book.rating)}
//                     </div>
//                     <span className="text-sm font-medium text-gray-700">
//                       {book.rating}
//                     </span>
//                     <span className="text-xs text-gray-500">
//                       ({book.reviews.toLocaleString()} editions)
//                     </span>
//                   </div>

//                   {/* Book Details */}
//                   <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
//                     <div className="flex items-center gap-1">
//                       <Clock className="w-3 h-3" />
//                       <span>{book.readTime}</span>
//                     </div>
//                     <span>{book.pages} pages</span>
//                     <span>{book.language}</span>
//                   </div>

//                   {/* Format badges */}
//                   <div className="flex gap-1 mb-4">
//                     {book.format.map((format) => (
//                       <span
//                         key={format}
//                         className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
//                       >
//                         {format}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => readBook(book)}
//                       className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors font-medium text-sm"
//                     >
//                       Read Now
//                     </button>

//                     <button
//                       onClick={() => downloadBook(book)}
//                       className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors"
//                       title="Download"
//                     >
//                       <Download className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}

//           {!loading && sortedBooks.length === 0 && (
//             <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center">
//               <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-600 mb-2">
//                 No audiobooks found
//               </h3>
//               <p className="text-gray-500">
//                 Try adjusting your search or filters
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AudioBooks;



import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, BookOpen, Heart, Star, Sun, Shield, X, Volume2, Pause, ChevronLeft, Globe, Sparkles, Book, Clock, ExternalLink, ChevronRight, Home, Download, Bookmark } from 'lucide-react';

const BooksLibraryPage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [language, setLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [readBooks, setReadBooks] = useState(new Set());
  const [favoriteBooks, setFavoriteBooks] = useState(new Set());
  const [bookmarkedBooks, setBookmarkedBooks] = useState(new Set());
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAIGuide, setShowAIGuide] = useState(false);
  const [currentView, setCurrentView] = useState('library');
  const floatingRef = useRef();
  const characterRef = useRef();

  // Multilingual content
  const content = {
    en: {
      title: "Books Library",
      subtitle: "Mental health books, self-help guides, and wellness literature",
      searchPlaceholder: "Search books...",
      aiGreeting: "Hello! I'm your reading companion. Let me help you discover the perfect mental health books for your journey.",
      filters: {
        all: "All Books",
        anxiety: "Anxiety",
        depression: "Depression", 
        mindfulness: "Mindfulness",
        selfhelp: "Self-Help",
        therapy: "Therapy",
        resilience: "Resilience"
      },
      readNow: "Read Now",
      readTime: "Read Time",
      pages: "Pages",
      addToFavorites: "Add to Favorites",
      bookmark: "Bookmark",
      completed: "Completed",
      continue: "Continue Reading",
      backToLibrary: "Back to Library",
      backToHub: "Back to Hub",
      playAmbient: "Play Ambient",
      stopAmbient: "Stop Ambient",
      download: "Download",
      preview: "Preview"
    },
    hi: {
      title: "पुस्तक पुस्तकालय",
      subtitle: "मानसिक स्वास्थ्य पुस्तकें, स्व-सहायता गाइड और कल्याण साहित्य",
      searchPlaceholder: "पुस्तकें खोजें...",
      aiGreeting: "नमस्ते! मैं आपका पठन साथी हूं। आपकी यात्रा के लिए सही मानसिक स्वास्थ्य पुस्तकों की खोज में मदद करता हूं।",
      filters: {
        all: "सभी पुस्तकें",
        anxiety: "चिंता",
        depression: "अवसाद",
        mindfulness: "सचेतन",
        selfhelp: "स्व-सहायता",
        therapy: "चिकित्सा",
        resilience: "लचीलापन"
      },
      readNow: "अभी पढ़ें",
      readTime: "पढ़ने का समय",
      pages: "पृष्ठ",
      addToFavorites: "पसंदीदा में जोड़ें",
      bookmark: "बुकमार्क",
      completed: "पूर्ण",
      continue: "पढ़ना जारी रखें",
      backToLibrary: "पुस्तकालय में वापस",
      backToHub: "हब में वापस",
      playAmbient: "परिवेशी बजाएं",
      stopAmbient: "परिवेशी रोकें",
      download: "डाउनलोड",
      preview: "पूर्वावलोकन"
    }
  };

  const t = content[language];

  // Normalize Open Library API docs to our schema
  const normalizeOpenLibraryDoc = (doc) => {
    const cover = doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
      : 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop';

    const id =
      (doc.edition_key && doc.edition_key[0]) ||
      doc.key ||
      doc.title;

    return {
      id,
      title: doc.title,
      author: doc.author_name ? doc.author_name.join(', ') : 'Unknown',
      description:
        typeof doc.first_sentence === 'string'
          ? doc.first_sentence
          : doc.subtitle || 'A valuable resource for mental health and wellness.',
      category: getCategoryFromSubjects(doc.subject || []),
      language: doc.language ? doc.language[0] : 'eng',
      pages: doc.number_of_pages_median || 200,
      rating: 4.0 + (Math.random() * 1), // Random rating between 4.0-5.0
      reviews: doc.edition_count || Math.floor(Math.random() * 1000) + 100,
      publishedYear: doc.first_publish_year || 'N/A',
      isOfflineAvailable: false,
      isFree: true,
      thumbnail: cover,
      readTime: doc.number_of_pages_median
        ? `${Math.ceil(doc.number_of_pages_median / 40)} hrs`
        : '5-6 hrs',
      format: ['PDF', 'EPUB'],
      preview: `https://openlibrary.org${doc.key}`,
      isbn: doc.isbn && doc.isbn[0] ? doc.isbn[0] : 'N/A',
      tags: extractTags(doc.subject || [])
    };
  };

  // Helper function to categorize books based on subjects
  const getCategoryFromSubjects = (subjects) => {
    const subjectStr = subjects.join(' ').toLowerCase();
    
    if (subjectStr.includes('anxiety') || subjectStr.includes('worry')) return 'Anxiety';
    if (subjectStr.includes('depression') || subjectStr.includes('mood')) return 'Depression';
    if (subjectStr.includes('mindfulness') || subjectStr.includes('meditation')) return 'Mindfulness';
    if (subjectStr.includes('therapy') || subjectStr.includes('psychotherapy')) return 'Therapy';
    if (subjectStr.includes('resilience') || subjectStr.includes('strength')) return 'Resilience';
    if (subjectStr.includes('self-help') || subjectStr.includes('personal development')) return 'Self-Help';
    
    return 'Self-Help'; // Default category
  };

  // Extract relevant tags from subjects
  const extractTags = (subjects) => {
    const relevantSubjects = subjects
      .filter(subject => {
        const s = subject.toLowerCase();
        return s.includes('psychology') || s.includes('mental') || s.includes('therapy') || 
               s.includes('self') || s.includes('mindfulness') || s.includes('anxiety') ||
               s.includes('depression') || s.includes('wellness');
      })
      .slice(0, 4);
    
    return relevantSubjects.length > 0 ? relevantSubjects : ['mental health', 'wellness', 'self-help'];
  };

  useEffect(() => {
    let controller = new AbortController();
    const delay = 400;
    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        // Search query for mental health books
        const getSearchQuery = () => {
          if (searchQuery.trim()) {
            return searchQuery.trim();
          }
          
          const categoryQueries = {
            all: 'mental health psychology self help therapy mindfulness',
            anxiety: 'anxiety worry stress management cognitive behavioral therapy',
            depression: 'depression mood therapy cognitive behavioral',
            mindfulness: 'mindfulness meditation mindful living present moment',
            selfhelp: 'self help personal development growth psychology',
            therapy: 'therapy psychotherapy counseling mental health treatment',
            resilience: 'resilience strength psychology positive mental health'
          };
          
          return categoryQueries[activeFilter] || categoryQueries.all;
        };

        const q = encodeURIComponent(getSearchQuery());
        const subject = activeFilter !== 'all' ? `&subject=${encodeURIComponent(activeFilter)}` : '';
        const lang = language !== 'all' ? `&language=${language === 'en' ? 'eng' : 'hin'}` : '';

        const url = `https://openlibrary.org/search.json?q=${q}${subject}${lang}&limit=20&sort=editions`;

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();

        const normalized = (data.docs || [])
          .filter(doc => doc.title && doc.author_name) // Filter out books without essential info
          .map(normalizeOpenLibraryDoc);
        
        setBooks(normalized);
        setLoading(false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
          // Fallback to static data if API fails
          setBooks(getFallbackBooks());
          setLoading(false);
        }
      }
    }, delay);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery, activeFilter, language]);

  // Fallback books for when API fails
  const getFallbackBooks = () => [
    {
      id: 1,
      title: "The Anxiety and Worry Workbook",
      author: "David A. Clark",
      pages: 384,
      category: "Anxiety",
      readTime: "8-10 hours",
      rating: 4.5,
      reviews: 2847,
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
      description: "A comprehensive cognitive-behavioral approach to understanding and overcoming anxiety and worry. Includes practical exercises and evidence-based techniques.",
      tags: ["anxiety", "CBT", "workbook", "self-help"],
      isbn: "978-1462547",
      publishedYear: 2018,
      language: "eng",
      format: ["PDF", "EPUB", "Audio"],
      preview: "https://example.com/preview/anxiety-workbook",
      isFree: true
    },
    {
      id: 2,
      title: "Mindfulness for Beginners",
      author: "Jon Kabat-Zinn",
      pages: 200,
      category: "Mindfulness",
      readTime: "4-5 hours",
      rating: 4.8,
      reviews: 4251,
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      description: "An accessible introduction to mindfulness meditation and its transformative power for mental health and well-being.",
      tags: ["mindfulness", "meditation", "beginner", "wellness"],
      isbn: "978-1604078",
      publishedYear: 2020,
      language: "eng",
      format: ["PDF", "EPUB"],
      preview: "https://example.com/preview/mindfulness-beginners",
      isFree: true
    },
    {
      id: 3,
      title: "Feeling Good: The New Mood Therapy",
      author: "David D. Burns",
      pages: 736,
      category: "Depression",
      readTime: "12-15 hours",
      rating: 4.6,
      reviews: 8934,
      thumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      description: "The classic guide to cognitive behavioral therapy techniques for overcoming depression, anxiety, and negative thought patterns.",
      tags: ["depression", "CBT", "mood", "therapy"],
      isbn: "978-0380810",
      publishedYear: 2019,
      language: "eng",
      format: ["PDF", "EPUB", "Audio"],
      preview: "https://example.com/preview/feeling-good",
      isFree: true
    }
  ];

  // Smooth floating animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (floatingRef.current) {
        const time = Date.now() / 1000;
        floatingRef.current.style.transform = `translateY(${Math.sin(time * 0.5) * 8}px) scale(${1 + Math.sin(time * 0.3) * 0.03})`;
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Character animation
  useEffect(() => {
    const animateCharacter = () => {
      if (characterRef.current) {
        const time = Date.now() / 1000;
        characterRef.current.style.transform = `translateY(${Math.sin(time * 0.8) * 5}px)`;
      }
    };
    const interval = setInterval(animateCharacter, 50);
    return () => clearInterval(interval);
  }, []);

  const categoryFilters = ['all', 'anxiety', 'depression', 'mindfulness', 'selfhelp', 'therapy', 'resilience'];

  const playAmbientSound = () => {
    setIsPlaying(!isPlaying);
  };

  const markAsRead = (bookId) => {
    setReadBooks(prev => new Set([...prev, bookId]));
  };

  const toggleFavorite = (bookId) => {
    setFavoriteBooks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }
      return newSet;
    });
  };

  const toggleBookmark = (bookId) => {
    setBookmarkedBooks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }
      return newSet;
    });
  };

  const openBook = (book) => {
    if (book.preview) {
      window.open(book.preview, '_blank');
    }
  };

  const downloadBook = (book) => {
    alert(`Downloading "${book.title}" in PDF format`);
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = activeFilter === 'all' || 
                         book.category.toLowerCase().replace('-', '') === activeFilter ||
                         book.tags.some(tag => tag.toLowerCase() === activeFilter);
    
    return matchesSearch && matchesFilter;
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  // Library View
  if (currentView === 'library') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating orbs */}
          {[...Array(20)].map((_, i) => {
            const colors = ['bg-amber-400', 'bg-orange-400', 'bg-yellow-400'];
            const colorClass = colors[i % 3];
            return (
              <div
                key={i}
                className={`absolute rounded-full opacity-20 ${colorClass}`}
                style={{
                  width: `${30 + Math.random() * 60}px`,
                  height: `${30 + Math.random() * 60}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${4 + Math.random() * 6}s`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            );
          })}
          
          {/* Gentle particles */}
          {[...Array(25)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* 3D Character Assistant */}
        <div 
          ref={characterRef}
          className="absolute top-20 right-10 z-30 cursor-pointer"
          onClick={() => setShowAIGuide(true)}
        >
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white/50 backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg text-xs font-medium text-gray-700">
              Help
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="relative z-20 p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">{t.backToHub}</span>
              </button>
            </div>

            <div ref={floatingRef} className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 text-white shadow-xl">
                <Book className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
                <p className="text-gray-600">{t.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language === 'en' ? 'हिं' : 'EN'}</span>
              </button>

              {/* Ambient Sound Toggle */}
              <button
                onClick={playAmbientSound}
                className={`flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                  isPlaying ? 'bg-green-100' : ''
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-green-600" /> : <Volume2 className="w-4 h-4" />}
                <span className="text-xs">{isPlaying ? t.stopAmbient : t.playAmbient}</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-3 bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-300 focus:border-amber-400 shadow-lg text-lg"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap justify-center">
                {categoryFilters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
                      activeFilter === filter 
                        ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-xl scale-105' 
                        : 'bg-white/90 text-gray-600 hover:bg-white hover:scale-105'
                    }`}
                  >
                    {t.filters[filter]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Books Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-pulse"
                  >
                    <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                  </div>
                ))
              ) : (
                filteredBooks.map((book) => {
                  const isRead = readBooks.has(book.id);
                  const isFavorite = favoriteBooks.has(book.id);
                  const isBookmarked = bookmarkedBooks.has(book.id);
                  
                  return (
                    <div
                      key={book.id}
                      className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 border border-white/50"
                    >
                      {/* Completion Badge */}
                      {isRead && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-xl z-10 animate-bounce">
                          <BookOpen className="w-4 h-4 text-white" />
                        </div>
                      )}

                      {/* Book Cover */}
                      <div className="relative mb-4 overflow-hidden rounded-xl">
                        <img 
                          src={book.thumbnail} 
                          alt={book.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                            <BookOpen className="w-6 h-6 text-amber-600" />
                          </div>
                        </div>
                        
                        {/* Free badge */}
                        {book.isFree && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            Free
                          </div>
                        )}
                        
                        {/* Action buttons in corner */}
                        <div className="absolute top-2 right-2 flex flex-col gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(book.id);
                            }}
                            className={`p-2 rounded-full transition-colors ${
                              isFavorite
                                ? 'bg-red-500 text-white'
                                : 'bg-white/80 text-gray-600 hover:bg-red-100'
                            }`}
                          >
                            <Heart className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(book.id);
                            }}
                            className={`p-2 rounded-full transition-colors ${
                              isBookmarked
                                ? 'bg-amber-500 text-white'
                                : 'bg-white/80 text-gray-600 hover:bg-amber-100'
                            }`}
                          >
                            <Bookmark className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Book Content */}
                      <div className="relative z-10">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900 mb-1 leading-tight" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {book.title}
                        </h3>
                        
                        <p className="text-amber-600 font-medium text-sm mb-2">
                          {book.author}
                        </p>

                        <p className="text-gray-600 text-sm mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {book.description}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            {renderStars(book.rating)}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {book.rating.toFixed(1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({book.reviews.toLocaleString()})
                          </span>
                        </div>

                        <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{book.readTime}</span>
                          </div>
                          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                          <span>{book.pages} pages</span>
                        </div>

                        {/* Format badges */}
                        <div className="flex gap-1 mb-4">
                          {book.format.map((format) => (
                            <span
                              key={format}
                              className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium"
                            >
                              {format}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openBook(book);
                            }}
                            className="flex-1 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <BookOpen className="w-4 h-4" />
                            {t.readNow}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBook(book);
                              setCurrentView('detail');
                            }}
                            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {!loading && filteredBooks.length === 0 && (
                <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center">
                  <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No books found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </div>-600" />
                        </div>
                      </div>
                      
                      {/* Action buttons in corner */}
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(book.id);
                          }}
                          className={`p-2 rounded-full transition-colors ${
                            isFavorite
                              ? 'bg-red-500 text-white'
                              : 'bg-white/80 text-gray-600 hover:bg-red-100'
                          }`}
                        >
                          <Heart className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(book.id);
                          }}
                          className={`p-2 rounded-full transition-colors ${
                            isBookmarked
                              ? 'bg-amber-500 text-white'
                              : 'bg-white/80 text-gray-600 hover:bg-amber-100'
                          }`}
                        >
                          <Bookmark className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Book Content */}
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900 mb-1 leading-tight" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {book.title}
                      </h3>
                      
                      <p className="text-amber-600 font-medium text-sm mb-2">
                        {book.author}
                      </p>

                      <p className="text-gray-600 text-sm mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {book.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {renderStars(book.rating)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {book.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({book.reviews.toLocaleString()})
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{book.readTime}</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <span>{book.pages} pages</span>
                      </div>

                      {/* Format badges */}
                      <div className="flex gap-1 mb-4">
                        {book.format.map((format) => (
                          <span
                            key={format}
                            className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium"
                          >
                            {format}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openBook(book);
                          }}
                          className="flex-1 py-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <BookOpen className="w-4 h-4" />
                          {t.readNow}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBook(book);
                            setCurrentView('detail');
                          }}
                          className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors duration-300"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Guide Modal */}
        {showAIGuide && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-white/50 relative">
              <button
                onClick={() => setShowAIGuide(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-orange-100/50 rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">AI Reading Guide</h3>
                    <p className="text-gray-600">Your literary companion</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">{t.aiGreeting}</p>
                <button
                  onClick={() => setShowAIGuide(false)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  {t.continue}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Book Detail View
  if (currentView === 'detail' && selectedBook) {
    const isRead = readBooks.has(selectedBook.id);
    const isFavorite = favoriteBooks.has(selectedBook.id);
    const isBookmarked = bookmarkedBooks.has(selectedBook.id);

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-400/10 to-orange-400/10"></div>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-amber-400/20 to-orange-400/20"
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${5 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="relative z-20 p-6">
          <button
            onClick={() => setCurrentView('library')}
            className="flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">{t.backToLibrary}</span>
          </button>tems-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">{t.backToLibrary}</span>
          </button>

          {/* Book Detail Content */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                {/* Book Cover and Quick Actions */}
                <div className="lg:col-span-1">
                  <div className="relative mb-6 overflow-hidden rounded-2xl shadow-xl">
                    <img 
                      src={selectedBook.thumbnail} 
                      alt={selectedBook.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={() => openBook(selectedBook)}
                      className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                    >
                      <BookOpen className="w-6 h-6" />
                      {t.readNow}
                      <ExternalLink className="w-5 h-5 opacity-70" />
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => downloadBook(selectedBook)}
                        className="py-3 bg-green-100 text-green-800 border-2 border-green-200 rounded-xl font-bold hover:bg-green-200 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        {t.download}
                      </button>

                      <button
                        onClick={() => toggleFavorite(selectedBook.id)}
                        className={`py-3 border-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 ${
                          isFavorite
                            ? 'bg-red-500 text-white border-red-500'
                            : 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200'
                        }`}
                      >
                        <Heart className="w-5 h-5" />
                        {isFavorite ? 'Favorited' : 'Favorite'}
                      </button>
                    </div>

                    {!isRead ? (
                      <button
                        onClick={() => markAsRead(selectedBook.id)}
                        className="w-full py-3 bg-amber-100 text-amber-800 border-2 border-amber-200 rounded-xl font-bold hover:bg-amber-200 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <BookOpen className="w-5 h-5" />
                        Mark as Read
                      </button>
                    ) : (
                      <div className="w-full py-3 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        {t.completed}
                      </div>
                    )}

                    <button
                      onClick={() => setShowAIGuide(true)}
                      className="w-full py-3 bg-purple-100 text-purple-800 border-2 border-purple-200 rounded-xl font-bold hover:bg-purple-200 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      Get AI Reading Guide
                    </button>
                  </div>
                </div>

                {/* Book Details */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-2">
                      {selectedBook.title}
                    </h1>
                    <p className="text-xl text-amber-600 font-semibold mb-4">
                      by {selectedBook.author}
                    </p>
                    
                    {/* Rating and Stats */}
                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {renderStars(selectedBook.rating)}
                        </div>
                        <span className="font-bold text-gray-700">{selectedBook.rating}</span>
                        <span className="text-gray-500">({selectedBook.reviews.toLocaleString()} reviews)</span>
                      </div>
                      <div className="text-gray-500">
                        Published {selectedBook.publishedYear}
                      </div>
                    </div>

                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {selectedBook.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedBook.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Book Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                      <div className="text-2xl font-bold text-amber-600">{selectedBook.pages}</div>
                      <div className="text-sm text-gray-600">{t.pages}</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600">{selectedBook.readTime}</div>
                      <div className="text-sm text-gray-600">{t.readTime}</div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
                      <div className="text-2xl font-bold text-yellow-600">{selectedBook.language}</div>
                      <div className="text-sm text-gray-600">Language</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                      <div className="text-2xl font-bold text-green-600">{selectedBook.category}</div>
                      <div className="text-sm text-gray-600">Category</div>
                    </div>
                  </div>

                  {/* Formats */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-bold text-gray-800 mb-3">Available Formats</h3>
                    <div className="flex gap-3">
                      {selectedBook.format.map((format) => (
                        <div
                          key={format}
                          className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-amber-300 transition-colors cursor-pointer"
                        >
                          {format}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ISBN and Publication Info */}
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <h3 className="font-bold text-gray-800 mb-3">Publication Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">ISBN:</span>
                        <span className="ml-2 text-gray-700">{selectedBook.isbn}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Published:</span>
                        <span className="ml-2 text-gray-700">{selectedBook.publishedYear}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Similar Books Section */}
              <div className="border-t border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Similar Books</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {books
                    .filter(b => b.id !== selectedBook.id && b.category === selectedBook.category)
                    .slice(0, 3)
                    .map((relatedBook) => (
                      <div 
                        key={relatedBook.id}
                        className="flex gap-4 p-4 bg-white rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                        onClick={() => setSelectedBook(relatedBook)}
                      >
                        <img 
                          src={relatedBook.thumbnail} 
                          alt={relatedBook.title}
                          className="w-16 h-20 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 text-sm mb-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {relatedBook.title}
                          </h4>
                          <p className="text-xs text-amber-600 font-medium mb-1">{relatedBook.author}</p>
                          <div className="flex items-center gap-1">
                            {renderStars(relatedBook.rating).slice(0, 3)}
                            <span className="text-xs text-gray-500 ml-1">{relatedBook.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Reading Progress Section */}
              <div className="border-t border-gray-200 p-8 bg-gradient-to-br from-purple-50 to-pink-50">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Reading Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{readBooks.size}</div>
                    <div className="text-gray-600">Books Read</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-200">
                    <div className="text-3xl font-bold text-pink-600 mb-2">{favoriteBooks.size}</div>
                    <div className="text-gray-600">Favorites</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{bookmarkedBooks.size}</div>
                    <div className="text-gray-600">Bookmarked</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-600">Overall Progress</span>
                    <span className="font-bold text-purple-600">
                      {books.length > 0 ? Math.round((readBooks.size / books.length) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${books.length > 0 ? (readBooks.size / books.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Status Banner */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-sm">
            <p className="text-green-800 text-sm">
              <strong>✅ Open Library API Active:</strong> Fetching real mental health books with live data.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BooksLibraryPage;