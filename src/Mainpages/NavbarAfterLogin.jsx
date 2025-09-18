import React from "react";

function NavbarAfterLogin({ user }) {
  const userLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
    { name: "Tracker", path: "#" },
    { name: "Emergency", path: "/emergency" },
    { name: "To-Do List", path: "/planner" },
    { name: "Layout", path: "/layout" }
  ];

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 mb-5 flex justify-between items-center">
      {/* Logo */}
      <a href="/layout" className="flex items-center space-x-2 hover:opacity-80 transition">
        <div className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full font-bold">
          A
        </div>
        <h1 className="text-xl font-bold text-gray-800">Arogya</h1>
      </a>

      <GoogleTranslate />

      {/* User Links */}
      <div className="flex items-center space-x-6">
        <ul className="flex space-x-6">
          {userLinks.map((link, index) => (
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

        {/* Show Username */}
        <span className="text-gray-700 font-semibold">
          {user}
        </span>
      </div>
    </nav>
  );
}

export default NavbarAfterLogin;


