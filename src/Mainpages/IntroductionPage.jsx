"use client";
import React from "react";
import NavbarBeforeLogin from "./NavbarBeforeLogin";
function IntroductionPage() {
  return (
    <>
      {/* <NavbarBeforeLogin /> */}
    
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center gap-10 justify-between px-8 lg:px-0  bg-white relative">
        {/* Left Content */}
        <div className="max-w-xl text-left">
          <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
            ✨ Mental Wellness Platform
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mt-4 text-left">
            <span className="text-purple-500">Arogya</span> <br />
            Nurturing Minds, <br /> Healing Hearts
          </h1>
          <p className="mt-6 text-gray-600">
            Transform your mental wellness journey with personalized tools,
            expert guidance, and a supportive community designed to help you
            thrive.
          </p>
          <div className="flex gap-4 mt-6">
            <button className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-md hover:opacity-90">
              Start Your Journey
            </button>
            <button className="px-6 py-3 rounded-md border border-gray-300 font-semibold hover:bg-gray-100">
              Explore Resources
            </button>
          </div>
          <div className="flex gap-10 mt-10 text-blue-600 font-semibold">
            <div>
              <p className="text-xl">10K+</p>
              <p className="text-gray-500 text-sm">Active Users</p>
            </div>
            <div>
              <p className="text-xl">95%</p>
              <p className="text-gray-500 text-sm">Success Rate</p>
            </div>
            <div>
              <p className="text-xl">24/7</p>
              <p className="text-gray-500 text-sm">Support</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="mt-10 lg:mt-0 lg:ml-10">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000" 
            alt="Meditation"
            className="rounded-2xl shadow-lg"
            
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 lg:px-20 py-20 text-center bg-gray-50">
        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
          ✨ Platform Features
        </span>
        <h2 className="text-4xl font-bold mt-4">
          Why Choose <span className="text-purple-500">Arogya?</span>
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Our comprehensive platform combines cutting-edge technology with
          human-centered design to support your mental wellness journey
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {[
            {
              title: "Self-Assessment",
              desc: "Understand your mental health with AI-powered assessments.",
              icon: "🧠",
            },
            {
              title: "Daily Growth",
              desc: "Build habits with guided exercises & mindfulness practices.",
              icon: "🌱",
            },
            {
              title: "Learning & Healing",
              desc: "Access expert-curated resources & therapeutic techniques.",
              icon: "📚",
            },
            {
              title: "Community Support",
              desc: "Connect with a safe, supportive community for healing.",
              icon: "🤝",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl p-6 text-left hover:shadow-lg transition"
            >
              <div className="text-4xl">{f.icon}</div>
              <h3 className="text-lg font-semibold mt-4">{f.title}</h3>
              <p className="text-gray-600 mt-2">{f.desc}</p>
              <a
                href="#"
                className="text-purple-500 font-medium mt-4 inline-block"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>

        <button className="mt-10 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md shadow-md font-semibold">
          Discover All Features →
        </button>
      </section>

      {/* Proven Results Section */}
      <section className="px-8 lg:px-20 py-20 bg-white text-center">
        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
          ✨ Proven Results
        </span>
        <h2 className="text-4xl font-bold mt-4">
          Transform Your <span className="text-purple-500">Mental Wellness</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
          {[
            {
              stat: "87% improvement",
              title: "Mental Health Improvement",
              desc: "Experience measurable improvements in mood, anxiety, and wellness.",
              icon: "🧘",
            },
            {
              stat: "92% stress reduction",
              title: "Stress Relief",
              desc: "Master stress management techniques and guided practices.",
              icon: "🌊",
            },
            {
              stat: "50+ experts",
              title: "Professional Guidance",
              desc: "Access resources by licensed mental health professionals.",
              icon: "👩‍⚕️",
            },
            {
              stat: "10K+ members",
              title: "Safe Community",
              desc: "Join a thriving supportive community where you feel understood.",
              icon: "💖",
            },
          ].map((r, i) => (
            <div
              key={i}
              className="bg-gray-50 shadow-md rounded-xl p-6 hover:shadow-lg transition"
            >
              <div className="text-4xl">{r.icon}</div>
              <h3 className="text-lg font-semibold mt-2">
                <span className="text-purple-500">{r.stat}</span>
              </h3>
              <h4 className="text-xl font-semibold mt-1">{r.title}</h4>
              <p className="text-gray-600 mt-2">{r.desc}</p>
              <a
                href="#"
                className="text-purple-500 font-medium mt-4 inline-block"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 lg:px-20 py-20 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold">
          Ready to Begin Your{" "}
          <span className="text-purple-500">Healing Journey?</span>
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Take the first step towards better mental health. Join thousands who
          found peace, growth, and support through Arogya.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <button className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-md hover:opacity-90">
            Start Your Journey
          </button>
          <button className="px-6 py-3 rounded-md border border-gray-300 font-semibold hover:bg-gray-100">
            Watch Demo
          </button>
        </div>
        <div className="flex gap-10 mt-10 text-blue-600 font-semibold justify-center">
          <div>
            <p className="text-xl">Free</p>
            <p className="text-gray-500 text-sm">to start</p>
          </div>
          <div>
            <p className="text-xl">5 min</p>
            <p className="text-gray-500 text-sm">setup time</p>
          </div>
          <div>
            <p className="text-xl">24/7</p>
            <p className="text-gray-500 text-sm">support</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-10 px-8 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
          <div>
            <h3 className="font-bold text-lg text-purple-500">Arogya</h3>
            <p className="mt-2 text-gray-600">
              Nurturing minds and healing hearts through compassionate support.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>Self-Assessment</li>
              <li>Daily Practices</li>
              <li>Learning Center</li>
              <li>Community</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <ul className="space-y-2">
              <li>Newsletter</li>
              <li>Social Media</li>
              <li>Blog</li>
              <li>Events</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-10">
          © 2025 Arogya. All rights reserved. Made with care for your mental
          wellness.
        </p>
      </footer>
    </div>
      </>
  );
}

export default IntroductionPage;
