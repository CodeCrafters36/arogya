import React, { useState, useEffect } from "react";
import {
  Mail,
  GraduationCap,
  Award,
  Star,
  ArrowRight,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Expert() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  const experts = [
    {
      id: 1,
      name: "Dr. Sara Khan",
      role: "Clinical Psychologist",
      education: "Ph.D. in Clinical Psychology, Harvard University",
      skills: "Anxiety, Depression, Trauma Therapy",
      experience: "12 years",
      rating: 4.9,
      email: "s.mitchell@therapyconnect.com",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
      bio: "Specializing in cognitive behavioral therapy with extensive experience in treating anxiety disorders and PTSD.",
      sessions: "1200+ sessions",
      city: "New York, NY",
      available: "Tomorrow 2:00 PM",
    },
    {
      id: 2,
      name: "Dr. Manish Rajput",
      role: "Psychiatrist",
      education: "M.D. Psychiatry, Johns Hopkins University",
      skills: "Bipolar Disorder, Depression, Medication Management",
      experience: "15 years",
      rating: 4.8,
      email: "m.rodriguez@therapyconnect.com",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
      bio: "Board-certified psychiatrist with expertise in mood disorders and personalized medication therapy.",
      sessions: "2000+ sessions",
      city: "Los Angeles, CA",
      available: "Today 4:30 PM",
    },
    {
      id: 3,
      name: "Dr. Eva Shrivastav",
      role: "Marriage & Family Therapist",
      education: "Ph.D. in Marriage & Family Therapy, UCLA",
      skills: "Couples Therapy, Family Counseling, Relationship Issues",
      experience: "10 years",
      rating: 4.9,
      email: "e.chen@therapyconnect.com",
      avatar: "https://images.unsplash.com/photo-1594824475317-2ea67471c530?w=200&h=200&fit=crop&crop=face",
      bio: "Dedicated to helping couples and families build stronger, healthier relationships through evidence-based approaches.",
      sessions: "800+ sessions",
      city: "San Francisco, CA",
      available: "Monday 10:00 AM",
    },
    {
      id: 4,
      name: "Dr. Jalaj Thakur",
      role: "Addiction Counselor",
      education: "Ph.D. in Addiction Psychology, Stanford University",
      skills: "Substance Abuse, Behavioral Addictions, Recovery",
      experience: "18 years",
      rating: 4.7,
      email: "j.thompson@therapyconnect.com",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face",
      bio: "Compassionate addiction specialist helping individuals overcome dependencies and build lasting recovery.",
      sessions: "1500+ sessions",
      city: "Chicago, IL",
      available: "Wednesday 1:00 PM",
    },
    {
      id: 5,
      name: "Dr. Lakshya Patel",
      role: "Child & Adolescent Psychologist",
      education: "Ph.D. in Developmental Psychology, MIT",
      skills: "ADHD, Autism Spectrum, Behavioral Issues",
      experience: "14 years",
      rating: 4.9,
      email: "l.park@therapyconnect.com",
      avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=200&h=200&fit=crop&crop=face",
      bio: "Specialized in helping children and teenagers navigate developmental challenges and mental health issues.",
      sessions: "1000+ sessions",
      city: "Boston, MA",
      available: "Friday 11:00 AM",
    },
  ];

  // autoplay
  useEffect(() => {
    if (autoSlide) {
      const slideInterval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % experts.length);
      }, 4000);
      return () => clearInterval(slideInterval);
    }
  }, [autoSlide, experts.length]);

  const changeSlide = (index) => {
    setActiveIndex(index);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 5000);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + experts.length) % experts.length);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 5000);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % experts.length);
    setAutoSlide(false);
    setTimeout(() => setAutoSlide(true), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-violet-50 via-purple-50 to-indigo-100 py-10 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700">
          Our Professional Experts
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Experienced specialists ready to guide you towards better mental
          health and wellness.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-6xl mx-auto">
        {/* Navigation */}
        <button
          onClick={prevSlide}
          className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white shadow-md w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition z-10"
        >
          <ChevronLeft className="w-6 h-6 text-purple-600" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white shadow-md w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition z-10"
        >
          <ChevronRight className="w-6 h-6 text-purple-600" />
        </button>

        {/* Slide Track */}
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-700"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {experts.map((expert) => (
              <div
                key={expert.id}
                className="w-full flex-shrink-0 px-6 py-4 bg-white rounded-2xl shadow-xl flex flex-col md:flex-row gap-8"
              >
                {/* Left */}
                <div className="flex-1 flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-6">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg mb-4">
                    <img 
                      src={expert.avatar} 
                      alt={expert.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-32 h-32 flex items-center justify-center bg-gradient-to-br from-purple-200 to-purple-300 text-purple-600 font-bold text-2xl hidden">
                      {expert.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {expert.name}
                  </h3>
                  <p className="text-purple-600 font-semibold">{expert.role}</p>

                  {/* Stats */}
                  <div className="mt-6 flex flex-col gap-3 text-sm text-gray-600">
                    <div className="flex justify-center items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-semibold">{expert.rating}</span>
                    </div>
                    <p>Experience: {expert.experience}</p>
                    <p>Sessions: {expert.sessions}</p>
                    <p>📍 {expert.city}</p>
                    <p className="text-green-600">Next: {expert.available}</p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex-[2] space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-500" />
                      Education
                    </h4>
                    <p className="text-gray-700">{expert.education}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-500" />
                      Specialization
                    </h4>
                    <p className="text-gray-700">{expert.skills}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">About</h4>
                    <p className="text-gray-600">{expert.bio}</p>
                  </div>

                  {/* Contact */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-purple-600 text-white font-medium py-3 px-5 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition">
                      <Mail className="w-5 h-5" />
                      Book Session
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    
                     < a href={`mailto:${expert.email}`}
                      className="flex-1 border-2 border-purple-400 text-purple-600 py-3 px-5 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-50 transition"
                    >
                      <Mail className="w-5 h-5" />
                      Send Email
                    </a>
                  </div>
                  <p className="text-center text-sm text-gray-500">
                    {expert.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-8 gap-3">
        {experts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => changeSlide(idx)}
            className={`h-3 rounded-full transition-all ${
              activeIndex === idx ? "bg-purple-600 w-8" : "bg-purple-300 w-3"
            }`}
          />
        ))}
      </div>

      {/* Auto-play Status */}
      <div className="flex justify-center mt-4">
        <div
          className={`flex items-center gap-2 text-sm ${
            autoSlide ? "opacity-100 text-gray-500" : "opacity-50"
          }`}
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Auto-sliding
        </div>
      </div>
    </div>
  );
}

export default Expert;
