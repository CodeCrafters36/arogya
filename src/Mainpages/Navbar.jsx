import React from "react";
import NavLinks from "./NavLinks.jsx";

function Navbar({ user }) {
  const isLoggedIn = !!user; // check if user exists

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 mb-5 flex justify-between items-center">
      {/* Logo Section - clickable */}
      <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
        <div className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full font-bold">
          A
        </div>
        <h1 className="text-xl font-bold text-gray-800">Arogya</h1>
      </a>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <NavLinks isLoggedIn={isLoggedIn} />

        {/* Show username if logged in */}
        {isLoggedIn && (
          <span className="text-gray-700 font-semibold">
         {user}
          </span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
