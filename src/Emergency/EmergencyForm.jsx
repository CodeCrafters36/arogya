
import { useState } from 'react';
import { Heart, User, Phone, FileText, Send, CheckCircle } from 'lucide-react';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function EmergencyForm() {
  const [formData, setFormData] = useState({
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      address: ''
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      email: ''
    },
    conditions: [],
    suggestions: '',
    pastConditions: '',
    currentConditions: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const conditionOptions = [
    'Work-related stress',
    'Relationship problems',
    'Financial difficulties',
    'Loss of loved one',
    'Academic pressure',
    'Social isolation',
    'Chronic illness',
    'Substance abuse',
    'Family conflicts',
    'Career uncertainty',
    'Trauma or PTSD',
    'Seasonal changes'
  ];

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleConditionChange = (condition) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.personalDetails.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.personalDetails.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.emergencyContact.name.trim()) {
      newErrors.emergencyName = 'Emergency contact name is required';
    }
    if (!formData.emergencyContact.phone.trim()) {
      newErrors.emergencyPhone = 'Emergency contact phone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Store in React state (localStorage not available in Claude.ai)
      console.log('Form submitted:', formData);
      toast.success("Form submitted successfully")
      setSubmitted(true);
      
      
      // In a real application, you would send this to your backend
      // setTimeout(() => {
      //   setSubmitted(false);
      //   // Reset form or redirect user
      // }, 30000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-lavender-100 to-purple-200 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center max-w-md mx-auto shadow-2xl animate-pulse">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Form Submitted Successfully!</h2>
          <p className="text-purple-600">A mental health professional will contact you within 24 hours. You're taking an important step towards healing.</p>
          <div>
         
         <Link to="/expert">
         <button
              type="button"
              className="inline-flex items-center mt-2.5 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-purple-300"
            >
              <Send className="w-5 h-5 mr-2" />
              Know Your Councelors
            </button>
            </Link>
            
            
          <Link to="/">
            <button
              type="button"
              className="inline-flex items-center mt-2.5 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-purple-300"
            >
              <Send className="w-5 h-5 mr-2" />
              Go To The Main Page
            </button>
            </Link>
          </div>
          
        </div>
        
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-lavender-100 to-purple-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-full mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
            <Heart className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-purple-800 mb-2">Mental Health Support</h1>
          <p className="text-purple-600 text-lg">Connect with a professional who can help</p>
        </div>

        <div className="space-y-8">
          {/* Personal Details Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold text-purple-800">Personal Details</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-purple-700 font-medium">First Name *</label>
                <input
                  type="text"
                  value={formData.personalDetails.firstName}
                  onChange={(e) => handleInputChange('personalDetails', 'firstName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-white/80"
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-purple-700 font-medium">Last Name</label>
                <input
                  type="text"
                  value={formData.personalDetails.lastName}
                  onChange={(e) => handleInputChange('personalDetails', 'lastName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-white/80"
                  placeholder="Enter your last name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-purple-700 font-medium">Email *</label>
                <input
                  type="email"
                  value={formData.personalDetails.email}
                  onChange={(e) => handleInputChange('personalDetails', 'email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-white/80"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-purple-700 font-medium">Phone (required)</label>
                <input
                  type="tel"
                  value={formData.personalDetails.phone}
                  onChange={(e) => handleInputChange('personalDetails', 'phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-white/80"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-purple-700 font-medium">Age (required)</label>
                <input
                  type="number"
                  value={formData.personalDetails.age}
                  onChange={(e) => handleInputChange('personalDetails', 'age', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-white/80"
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-purple-700 font-medium">Address</label>
                <input
                  type="text"
                  value={formData.personalDetails.address}
                  onChange={(e) => handleInputChange('personalDetails', 'address', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-white/80"
                  placeholder="Enter your address"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <Phone className="w-6 h-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-semibold text-red-800">Emergency Contact</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-red-700 font-medium">Contact Name *</label>
                <input
                  type="text"
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleInputChange('emergencyContact', 'name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-200 transition-all duration-300 bg-white/80"
                  placeholder="Emergency contact name"
                />
                {errors.emergencyName && <p className="text-red-500 text-sm">{errors.emergencyName}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-red-700 font-medium">Relationship (required)</label>
                <input
                  type="text"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => handleInputChange('emergencyContact', 'relationship', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-200 transition-all duration-300 bg-white/80"
                  placeholder="Relationship to you"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-red-700 font-medium">Contact Phone *</label>
                <input
                  type="tel"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => handleInputChange('emergencyContact', 'phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-200 transition-all duration-300 bg-white/80"
                  placeholder="Emergency contact phone"
                />
                {errors.emergencyPhone && <p className="text-red-500 text-sm">{errors.emergencyPhone}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-red-700 font-medium">Contact Email</label>
                <input
                  type="email"
                  value={formData.emergencyContact.email}
                  onChange={(e) => handleInputChange('emergencyContact', 'email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-200 transition-all duration-300 bg-white/80"
                  placeholder="Emergency contact email"
                />
              </div>
            </div>
          </div>

          {/* Conditions Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <h2 className="text-2xl font-semibold text-purple-800 mb-6">Possible Contributing Factors</h2>
            <p className="text-purple-600 mb-6">Select any conditions that may have contributed to your current situation:</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              {conditionOptions.map((condition, index) => (
                <label key={index} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-purple-100 transition-colors duration-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.conditions.includes(condition)}
                    onChange={() => handleConditionChange(condition)}
                    className="w-5 h-5 text-purple-600 rounded border-2 border-purple-300 focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-purple-700">{condition}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Text Areas Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <FileText className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-2xl font-semibold text-purple-800">Additional Information</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-purple-700 font-medium">Past Mental Health History</label>
                <textarea
                  value={formData.pastConditions}
                  onChange={(e) => setFormData(prev => ({ ...prev, pastConditions: e.target.value }))}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-white/80 resize-none"
                  placeholder="Please describe any past mental health treatments, medications, or diagnoses..."
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-purple-700 font-medium">Current Situation (required)</label>
                <textarea
                  value={formData.currentConditions}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentConditions: e.target.value }))}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-white/80 resize-none"
                  placeholder="Please describe how you're feeling now and what brought you to seek help..."
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-purple-700 font-medium">Suggestions for the Professional</label>
                <textarea
                  value={formData.suggestions}
                  onChange={(e) => setFormData(prev => ({ ...prev, suggestions: e.target.value }))}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-white/80 resize-none"
                  placeholder="Any specific requests, preferences, or information you'd like the professional to know..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-purple-300"
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Form & Connect with Professional
            </button>
          </div>
        </div>
        
        {/* Crisis Resources */}
        <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Immediate Crisis Resources</h3>
          <p className="text-red-700 mb-2">If you're having thoughts of suicide or self-harm, please contact:</p>
          <div className="space-y-1 text-red-800 font-medium">
            <p>• National Suicide Prevention Lifeline: 988</p>
            <p>• Crisis Text Line: Text HOME to 741741</p>
            <p>• Emergency Services: 911</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}