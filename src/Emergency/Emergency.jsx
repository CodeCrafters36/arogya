import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ambu from './ambulance.gif';

const Emergency = () => {
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [showAmbulance, setShowAmbulance] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
 

  // Animation sequence on component mount
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowAmbulance(true);
    }, 500);
    
    const timer2 = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 1500); // Show speech bubble after ambulance appears
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);


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

                <Link to="/contact-therapist">
                  <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <span>📞</span>
                    <span>Contact Now</span>
                  </button>
                </Link>
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

                <Link to="/contact-therapist">
                  <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <span>📞</span>
                    <span>Contact Now</span>
                  </button>
                </Link>
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
        <div className="px-4 sm:px-6 lg:px-8">
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

   

      {/* Hero Section */}
      <section className="py-5 px-4">
        <div className="min-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-80 bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 overflow-hidden">
              {/* Animated Ambulance */}
              <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-1000 ${showAmbulance ? 'translate-x-0' : '-translate-x-full'}`}>
                <img src={ambu}/>
              </div>
              
              {/* Speech Bubble */}
              <div className={`absolute top-2 left-3/5 transform -translate-x-1/2 transition-all duration-1000 ${showSpeechBubble ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <div className="relative bg-white rounded-2xl px-6 py-4 shadow-lg border-2 border-purple-300 max-w-xs">
                  <p className="text-red-800 font-bold text-center text-sm">
                    Dont Worry!! AROGYA is here to help you.
                  </p>
                  {/* Speech bubble tail */}
                  <div className="absolute bottom-0 left-1/2 transform translate-y-full -translate-x-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-purple-300"></div>
                    <div className="w-0 h-0 border-l-3 border-r-3 border-t-5 border-l-transparent border-r-transparent border-t-white absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-px"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-10 left-10 w-16 h-16 bg-purple-300 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute top-20 right-16 w-12 h-12 bg-pink-300 rounded-full opacity-40 animate-pulse"></div>
              <div className="absolute bottom-16 left-20 w-20 h-20 bg-blue-300 rounded-full opacity-50 animate-bounce" style={{animationDelay: '1s'}}></div>
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
              <Link to="/emergencyForm">
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
              <Link to="/expert">
                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Find a Therapist
                </button>
              </Link> 
            </div>

            {/* Peer Support */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="text-4xl mb-4 text-center">👥</div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Community Support</h3>
              <p className="text-gray-600 mb-4">Join support groups and connect with others who understand your journey.</p>
              <Link to="/peersupport">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Join Community
                </button>
              </Link>
            </div>

            {/* Self-Care Resources */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="text-4xl mb-4 text-center">🌱</div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Self-Care Tools</h3>
              <p className="text-gray-600 mb-4">Access guided meditations, breathing exercises, and wellness resources.</p>
              <Link to="/tools">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Explore Tools
                </button>
              </Link>
            </div>

            {/* Educational Content */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="text-4xl mb-4 text-center">📚</div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Learn & Understand</h3>
              <p className="text-gray-600 mb-4">Educational resources about mental health conditions and treatment options.</p>
              <Link to="/article">
                <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Read Articles
                </button>
              </Link>
            </div>

            {/* Campus Resources */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
              <div className="text-4xl mb-4 text-center">🏫</div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Campus Services</h3>
              <p className="text-gray-600 mb-4">Find mental health services and support available on your campus.</p>
              <Link to="/campus">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Campus Help
                </button>
              </Link>
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
                <Link to="/breathing">
                  <button className="w-full bg-white hover:bg-gray-50 text-purple-800 font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm">
                    🧘 Start Breathing Exercise
                  </button>
                </Link>
                <Link to="/chat">
                  <button className="w-full bg-white hover:bg-gray-50 text-purple-800 font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm">
                    💬 Chat with AI Assistant
                  </button>
                </Link>
                <Link to="/screening">
                  <button className="w-full bg-white hover:bg-gray-50 text-purple-800 font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm">
                    📋 Take Mental Health Screening
                  </button>
                </Link>
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
                <p><Link to="/crisis" className="hover:text-purple-200">Crisis Support</Link></p>
                <p><Link to="/help" className="hover:text-purple-200">Find Help</Link></p>
                <p><Link to="/resources" className="hover:text-purple-200">Resources</Link></p>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Support Services</h3>
              <div className="space-y-2 text-sm">
                <p><Link to="/counseling" className="hover:text-purple-200">Counseling Center</Link></p>
                <p><Link to="/peer-support" className="hover:text-purple-200">Peer Support</Link></p>
                <p><Link to="/group-therapy" className="hover:text-purple-200">Group Therapy</Link></p>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Contact Info</h3>
              <div className="space-y-2 text-sm">
                <p>Email: codecrafter@36edu</p>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-purple-700 mt-8 pt-6 text-center text-sm">
            <p>&copy; 2024 Arogya Mental Health Support. All rights reserved. | <Link to="/privacy" className="hover:text-purple-200">Privacy Policy</Link> | <Link to="/terms" className="hover:text-purple-200">Terms of Service</Link></p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link to="/chat">
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-colors animate-pulse">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1 .2 0 .5-.1.7-.3L14.4 18H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </button>
        </Link>
      </div>

      {/* Crisis Modal */}
      {showCrisisModal && <CrisisModal />}
    </div>
  );
};

export default Emergency;