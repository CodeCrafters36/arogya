import React from "react";
import GoogleTranslate from "../Translate/GoogleTranslate";

function NavbarBeforeLogin() {
  const guestLinks = [
    
    { name: "Login", path: "/login" },
    { name: "Signup", path: "/signup" },
  ];

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 mb-5 flex justify-between items-center ">
      {/* Logo */}
      <a href="/layout" className="flex items-center space-x-2 hover:opacity-80 transition">
        <div className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full font-bold">
          A
        </div>
        <h1 className="text-xl font-bold text-gray-800">Arogya</h1>
      </a>

       {/* <GoogleTranslate /> */}

      {/* Guest Links */}
      <ul className="flex space-x-6">
        {guestLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link.path}
              className="text-gray-700 font-medium hover:text-purple-600 transition"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavbarBeforeLogin;
