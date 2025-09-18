
import React, { useState } from 'react';
import { Search, FileText, ExternalLink, Clock, User, BookOpen, Heart } from 'lucide-react';

const ArticlesComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Depression');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const articles = [
    // English articles (kept as before)
    {
      id: 1,
      title: "10 Tips to Handle Exam Stress",
      description: "Practical strategies to manage anxiety and perform better during exams.",
      category: "Stress",
      language: "English",
      readTime: "5 min read",
      author: "Mind.org.uk",
      link: "https://www.mind.org.uk/information-support/tips-for-everyday-living/stress/",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "How to Improve Sleep Cycle",
      description: "Essential guide to better sleep hygiene and resetting your circadian rhythm.",
      category: "Sleep",
      language: "English",
      readTime: "7 min read",
      author: "Sleep Foundation",
      link: "https://www.sleepfoundation.org/sleep-hygiene",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Overcoming Social Anxiety",
      description: "Step-by-step approach to managing social anxiety and building confidence.",
      category: "Anxiety",
      language: "English",
      readTime: "8 min read",
      author: "Healthline",
      link: "https://www.healthline.com/health/anxiety/social-anxiety-tips",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Understanding Depression Symptoms",
      description: "Comprehensive guide to recognizing depression signs and when to seek help.",
      category: "Depression",
      language: "English",
      readTime: "10 min read",
      author: "NIMH",
      link: "https://www.nimh.nih.gov/health/topics/depression",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Self-Care Activities for Depression",
      description: "Daily self-care practices that can help improve mood and mental health.",
      category: "Depression",
      language: "English",
      readTime: "6 min read",
      author: "Psychology Today",
      link: "https://www.psychologytoday.com/us/basics/self-care",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
    },
    {
      id: 6,
      title: "Managing ADHD in Daily Life",
      description: "Practical strategies for adults with ADHD to improve focus and productivity.",
      category: "ADHD",
      language: "English",
      readTime: "9 min read",
      author: "AdditudeMag",
      link: "https://www.additudemag.com/category/manage-adhd-life/",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop"
    },

    // >>> Replaced Hindi articles (new reliable sources) <<<
    {
      id: 7,
      title: "डिप्रेशन क्या है? (लक्षण और उपचार)",
      description: "अवसाद के लक्षण, कारण और उपचार — सरल हिन्दी गाइड।",
      category: "Depression",
      language: "Hindi",
      readTime: "8 min read",
      author: "Narayana Health",
      link: "https://www.narayanahealth.org/blog/%E0%A4%A1%E0%A4%BF%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A5%87%E0%A4%B6%E0%A4%A8-%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A4%BE-%E0%A4%B9%E0%A5%88",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop"
    },
    {
      id: 8,
      title: "तनाव: कारण, लक्षण और उपचार",
      description: "तनाव प्रबंधन के व्यावहारिक उपाय — हिन्दी में।",
      category: "Stress",
      language: "Hindi",
      readTime: "6 min read",
      author: "C K Birla Hospitals (CMRI)",
      link: "https://ckbirlahospitals.com/cmri/blog/stress-in-hindi",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
    },
    {
      id: 9,
      title: "Depression (वृद्ध वयस्कों के लिए) — हिन्दी अनुवाद",
      description: "रॉयल कॉलेज ऑफ़ साइकियाट्रिस्ट्स का हिन्दी अनुवाद — डिप्रेशन पर भरोसेमंद सूचना।",
      category: "Depression",
      language: "Hindi",
      readTime: "9 min read",
      author: "Royal College of Psychiatrists (हिन्दी अनुवाद)",
      link: "https://www.rcpsych.ac.uk/mental-health/translations/hindi/depression-in-adults",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=200&fit=crop"
    },
    {
      id: 10,
      title: "मानसिक स्वास्थ्य — सामान्य सलाह (Vikaspedia)",
      description: "सरकारी/लोकल रूप से उपयोगी मानसिक स्वास्थ्य जानकारी और सुझाव (हिंदी)।",
      category: "Mindfulness",
      language: "Hindi",
      readTime: "7 min read",
      author: "Vikaspedia (Hindi)",
      link: "https://health.vikaspedia.in/viewcontent/health/mental-health/92492893e935-92492593e-92e92894b91a93f91593f92494d93893e?lgn=hi",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
    }
  ];

  const categories = ['Depression', 'Stress', 'Anxiety', 'Sleep', 'ADHD', 'Relationships', 'Mindfulness'];
  const languages = ['English', 'Hindi'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Depression' || article.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'English' || article.language === selectedLanguage;
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const limitedArticles = filteredArticles.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-25 to-purple-100 p-6" style={{background: 'linear-gradient(135deg, #f3f0ff 0%, #e9e5f3 50%, #ddd6fe 100%)'}}>
      <div className="max-w-6xl mx-auto">
        {/* Articles & Self-help Guides Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
          {/* Header */}
          <div className="bg-purple-50 p-6 border-b border-purple-100">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800">Articles & Self-help Guides</h2>
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

            {/* Filter Options */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>Filter:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-purple-200 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-purple-400 bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-purple-200 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-purple-400 bg-white"
              >
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {limitedArticles.map(article => (
                <div key={article.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-purple-100 group">
                  {/* Article Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop"; }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                        {article.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-black bg-opacity-60 text-white text-xs font-medium rounded-full">
                        {article.language}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {article.description}
                    </p>
                    
                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* External Read More */}
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2"
                    >
                      Read More
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {limitedArticles.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search or filter options</p>
              </div>
            )}
          </div>
        </div>

        {/* Featured Self-Help Resources */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
          <div className="bg-purple-50 p-6 border-b border-purple-100">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800">Featured Self-Help Resources</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-800">Crisis Support</h3>
                </div>
                <p className="text-gray-600 mb-4">If you're in crisis, please reach out for immediate help. You're not alone.</p>
                <div className="space-y-2 text-sm">
                  <p><strong>National Suicide Prevention:</strong> 988</p>
                  <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
                  <p><strong>SAMHSA Helpline:</strong> 1-800-662-4357</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-800">Daily Wellness Tips</h3>
                </div>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Practice 5 minutes of deep breathing daily</li>
                  <li>• Write down 3 things you're grateful for</li>
                  <li>• Take a 10-minute walk in nature</li>
                  <li>• Connect with a supportive friend or family member</li>
                  <li>• Maintain a consistent sleep schedule</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Supportive Message */}
        <div className="mt-8 text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Knowledge is Healing</h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            These evidence-based articles and guides are here to support your mental health journey. Take what resonates with you and remember that professional help is always available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticlesComponent;
