import React, { useState } from 'react';
import { Link } from "react-router-dom";
// import EmergencyForm from './Emergency/EmergencyForm.jsx'

const Emergency = () => {
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [activeSection, setActiveSection] = useState('home');


  const CrisisModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl max-w-4xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🚨</span>
            <h2 className="text-2xl font-bold text-purple-800">Crisis Support</h2>
          </div>
          <button 
            onClick={() => setShowCrisisModal(false)}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">

          {/* Therapist Cards Section */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Available Crisis Counselors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Female Therapist Card */}
              <div className="bg-purple-50 rounded-xl shadow-md p-6 border border-purple-100">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face" 
                      alt="Dr. Sarah Mitchell"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center text-purple-600 font-bold text-lg hidden">
                      SM
                    </div>
                  </div>
                </div>

                <div className="text-center mb-3">
                  <h4 className="text-lg font-bold text-gray-800">Dr.Sara Khan</h4>
                  <p className="text-purple-600 font-medium text-sm">PhD in Clinical Psychology</p>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-gray-700"><strong>Expertise:</strong> Depression, Anxiety, CBT</p>
                  <p className="text-gray-700"><strong>Success Rate:</strong> 94%</p>
                  <p className="text-gray-700"><strong>Consultations:</strong> 1,250+</p>
                  <p className="text-gray-700"><strong>Contact:</strong> +1 (555) 123-4567</p>
                </div>

                <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <span>📞</span>
                  <span>Contact Now</span>
                </button>
              </div>

              {/* Male Therapist Card */}
              <div className="bg-purple-50 rounded-xl shadow-md p-6 border border-purple-100">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face" 
                      alt="Dr. Michael Thompson"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center text-purple-600 font-bold text-lg hidden">
                      MT
                    </div>
                  </div>
                </div>

                <div className="text-center mb-3">
                  <h4 className="text-lg font-bold text-gray-800">Dr.Ishan Sharma</h4>
                  <p className="text-purple-600 font-medium text-sm">MD Psychiatry</p>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="text-gray-700"><strong>Expertise:</strong> Depression, Trauma, Mindfulness</p>
                  <p className="text-gray-700"><strong>Success Rate:</strong> 91%</p>
                  <p className="text-gray-700"><strong>Consultations:</strong> 980+</p>
                  <p className="text-gray-700"><strong>Contact:</strong> +1 (555) 987-6543</p>
                </div>

                <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <span>📞</span>
                  <span>Contact Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-lavender-100 to-purple-200">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-full">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Arogya
                </h1>
                <div className="text-lg font-semibold text-green-600">
                  6267649310
                </div>
                <div className="text-sm text-gray-600">Mental Health Support</div>
              </div>
            </div>

            {/* Crisis Button */}
            <button
              onClick={() => setShowCrisisModal(true)}
              className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg animate-pulse"
            >
          Immediate Support Available ⚠
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'home', label: "What's the problem?" },
              { id: 'help', label: 'How we help' },
              { id: 'resources', label: 'Useful resources' },
              { id: 'professionals', label: 'Health professionals' },
              { id: 'contact', label: 'Contact us' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`py-4 px-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeSection === item.id
                    ? 'border-white text-white'
                    : 'border-transparent text-blue-100 hover:text-white hover:border-blue-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-80 bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200">
              {/* Sample person image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full flex items-center justify-center border-8 border-white shadow-lg">
                  <div className="text-8xl">👩‍⚕</div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-10 left-10 w-16 h-16 bg-purple-300 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute top-20 right-16 w-12 h-12 bg-pink-300 rounded-full opacity-40 animate-pulse"></div>
              <div className="absolute bottom-16 left-20 w-20 h-20 bg-blue-300 rounded-full opacity-50 animate-bounce" style={{animationDelay: '1s'}}></div>
            </div>

            {/* Hero Content */}
            <div className="p-8 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
                <p className="text-gray-700 leading-relaxed">
                  <strong>If there is an immediate danger to life, please dial 999 or go to your nearest</strong>{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 underline font-semibold">
                    Accident and Emergency Department
                  </a>.
                </p>
              </div>

              <div className="text-gray-700">
                <p className="mb-4">
                  Details of our crisis teams and other organisations who may be able to help{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 underline font-semibold">
                    can be found here
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Immediate Support */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="text-4xl mb-4 text-center">🆘</div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Crisis Support</h3>
              <p className="text-gray-600 mb-4">Immediate help available 24/7 for mental health emergencies and crisis situations.</p>
              <Link to="/emergencyForm" className="text-red-500 underline">
        <button
                onClick={() => setShowCrisisModal(true)}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Get Help Now
              </button>
      </Link>
              
            </div>

            {/* Counseling Services */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="text-4xl mb-4 text-center">👨‍⚕</div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Professional Help</h3>
              <p className="text-gray-600 mb-4">Connect with licensed therapists, counselors, and mental health professionals.</p>
             <Link to="/expert"><button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Find a Therapist
              </button>
              </Link> 
            </div>

            {/* Peer Support */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="text-4xl mb-4 text-center">👥</div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Community Support</h3>
              <p className="text-gray-600 mb-4">Join support groups and connect with others who understand your journey.</p>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Join Community
              </button>
            </div>

            {/* Self-Care Resources */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="text-4xl mb-4 text-center">🌱</div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Self-Care Tools</h3>
              <p className="text-gray-600 mb-4">Access guided meditations, breathing exercises, and wellness resources.</p>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Explore Tools
              </button>
            </div>

            {/* Educational Content */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="text-4xl mb-4 text-center">📚</div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Learn & Understand</h3>
              <p className="text-gray-600 mb-4">Educational resources about mental health conditions and treatment options.</p>
              <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Read Articles
              </button>
            </div>

            {/* Campus Resources */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="text-4xl mb-4 text-center">🏫</div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Campus Services</h3>
              <p className="text-gray-600 mb-4">Find mental health services and support available on your campus.</p>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Campus Help
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-800 mb-4">How We Support You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides multiple ways to access mental health support, 
              ensuring you get the help you need when you need it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-bold text-purple-800 mb-2">AI-Guided First Aid</h3>
                  <p className="text-gray-600">Immediate support through our intelligent chatbot that provides coping strategies and professional referrals.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <h3 className="font-bold text-purple-800 mb-2">Confidential Booking</h3>
                  <p className="text-gray-600">Anonymous appointment scheduling with qualified mental health professionals.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <span className="text-2xl">🌍</span>
                </div>
                <div>
                  <h3 className="font-bold text-purple-800 mb-2">Multi-Language Support</h3>
                  <p className="text-gray-600">Resources available in multiple languages to serve diverse student populations.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-2xl">
              <h3 className="font-bold text-purple-800 mb-4 text-xl">Quick Access</h3>
              <div className="space-y-3">
                <button className="w-full bg-white hover:bg-gray-50 text-purple-800 font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm">
                  🧘 Start Breathing Exercise
                </button>
                <button className="w-full bg-white hover:bg-gray-50 text-purple-800 font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm">
                  💬 Chat with AI Assistant
                </button>
                <button className="w-full bg-white hover:bg-gray-50 text-purple-800 font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm">
                  📋 Take Mental Health Screening
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-800 to-blue-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Emergency Contacts</h3>
              <div className="space-y-2 text-sm">
                <p>Crisis Line: 988</p>
                <p>Emergency: 999</p>
                <p>Campus Security: (555) 123-4567</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <p><a href="#" className="hover:text-purple-200">Crisis Support</a></p>
                <p><a href="#" className="hover:text-purple-200">Find Help</a></p>
                <p><a href="#" className="hover:text-purple-200">Resources</a></p>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Support Services</h3>
              <div className="space-y-2 text-sm">
                <p>Counseling Center</p>
                <p>Peer Support</p>
                <p>Group Therapy</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Contact Info</h3>
              <div className="space-y-2 text-sm">
                <p>Email: codecrafter@36edu</p>
                <p>Phone: 6267649310</p>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-purple-700 mt-8 pt-6 text-center text-sm">
            <p>&copy; 2024 Arogya Mental Health Support. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-colors animate-pulse">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1 .2 0 .5-.1.7-.3L14.4 18H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </button>
      </div>

      {/* Crisis Modal */}
      {showCrisisModal && <CrisisModal />}
    </div>
  );
};

export default Emergency;