// src/pages/AudioBooks.jsx
import React, { useState, useEffect } from 'react';
import {
  Search,
  Book,
  Download,
  Star,
  Clock,
  Filter,
  BookOpen,
  Bookmark,
  Heart,
} from 'lucide-react';

const AudioBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [bookmarks, setBookmarks] = useState(new Set());

  // Normalize Open Library API docs to our schema
  const normalizeOpenLibraryDoc = (doc) => {
    const cover = doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
      : '/placeholder-book.jpg';

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
          : doc.subtitle || '',
      category:
        doc.subject && doc.subject.length
          ? doc.subject[0].toLowerCase().replace(/\s+/g, '-')
          : 'general',
      language: doc.language ? doc.language[0] : 'eng',
      pages: doc.number_of_pages_median || 0,
      rating: 4.3, // Open Library has no ratings → fallback
      reviews: doc.edition_count || 0,
      publishedYear: doc.first_publish_year || 'N/A',
      isOfflineAvailable: false,
      isFree: true, // Open Library = free previews/borrows
      cover,
      readTime: doc.number_of_pages_median
        ? `${Math.ceil(doc.number_of_pages_median / 40)} hrs`
        : 'N/A',
      format: ['Audio', 'EPUB'],
      downloadUrl: `https://openlibrary.org${doc.key}`,
    };
  };

  useEffect(() => {
    let controller = new AbortController();
    const delay = 400;
    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const q = encodeURIComponent(searchTerm.trim() || 'audiobook self help');
        const subject =
          categoryFilter !== 'all'
            ? `&subject=${encodeURIComponent(categoryFilter)}`
            : '';
        const lang =
          languageFilter !== 'all'
            ? `&language=${
                languageFilter === 'english' ? 'eng' : 'hin'
              }`
            : '';

        const url = `https://openlibrary.org/search.json?q=${q}${subject}${lang}&limit=20`;

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();

        const normalized = (data.docs || []).map(normalizeOpenLibraryDoc);
        setBooks(normalized);
        setLoading(false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
          setBooks([]);
          setLoading(false);
        }
      }
    }, delay);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchTerm, categoryFilter, languageFilter]);

  const toggleFavorite = (bookId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(bookId)) {
      newFavorites.delete(bookId);
    } else {
      newFavorites.add(bookId);
    }
    setFavorites(newFavorites);
  };

  const toggleBookmark = (bookId) => {
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(bookId)) {
      newBookmarks.delete(bookId);
    } else {
      newBookmarks.add(bookId);
    }
    setBookmarks(newBookmarks);
  };

  const downloadBook = (book) => {
    if (book.downloadUrl) {
      window.open(book.downloadUrl, '_blank');
    } else {
      alert('Download not available');
    }
  };

  const readBook = (book) => {
    if (book.downloadUrl) {
      window.open(book.downloadUrl, '_blank');
    } else {
      alert('Preview not available');
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || book.category === categoryFilter;
    const matchesLanguage =
      languageFilter === 'all' ||
      book.language.toLowerCase() === languageFilter;

    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.publishedYear - a.publishedYear;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'popular':
      default:
        return b.reviews - a.reviews;
    }
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-yellow-400/50 text-yellow-400"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300"
        />
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Book className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl font-bold text-gray-800">Mental Health Audiobooks</h1>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search audiobooks by title, author, or topic..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600 font-medium">Filter:</span>
            </div>

            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="anxiety">Anxiety & Worry</option>
              <option value="mindfulness">Mindfulness</option>
              <option value="stress">Stress Management</option>
              <option value="sleep">Sleep Health</option>
              <option value="resilience">Resilience</option>
              <option value="general">General Mental Health</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
            >
              <option value="all">All Languages</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
              <option value="title">A-Z</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-64 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))
          ) : (
            sortedBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
              >
                {/* Book Cover */}
                <div className="relative">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => readBook(book)}
                      className="bg-amber-600 text-white p-3 rounded-full hover:bg-amber-700 transition-colors"
                      title="Read Now"
                    >
                      <BookOpen className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => downloadBook(book)}
                      className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors"
                      title="Download"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Top badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {book.isFree && (
                      <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                        Free
                      </span>
                    )}
                  </div>

                  {/* Top right actions */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <button
                      onClick={() => toggleFavorite(book.id)}
                      className={`p-2 rounded-full transition-colors ${
                        favorites.has(book.id)
                          ? 'bg-red-600 text-white'
                          : 'bg-white bg-opacity-80 text-gray-600 hover:bg-red-100'
                      }`}
                      title="Add to Favorites"
                    >
                      <Heart className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleBookmark(book.id)}
                      className={`p-2 rounded-full transition-colors ${
                        bookmarks.has(book.id)
                          ? 'bg-amber-600 text-white'
                          : 'bg-white bg-opacity-80 text-gray-600 hover:bg-amber-100'
                      }`}
                      title="Bookmark"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2 min-h-[3.5rem]">
                    {book.title}
                  </h3>

                  <p className="text-sm text-amber-600 font-medium mb-2">
                    {book.author}
                  </p>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
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
                      ({book.reviews.toLocaleString()} editions)
                    </span>
                  </div>

                  {/* Book Details */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{book.readTime}</span>
                    </div>
                    <span>{book.pages} pages</span>
                    <span>{book.language}</span>
                  </div>

                  {/* Format badges */}
                  <div className="flex gap-1 mb-4">
                    {book.format.map((format) => (
                      <span
                        key={format}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {format}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => readBook(book)}
                      className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors font-medium text-sm"
                    >
                      Read Now
                    </button>

                    <button
                      onClick={() => downloadBook(book)}
                      className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {!loading && sortedBooks.length === 0 && (
            <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center">
              <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No audiobooks found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioBooks;
