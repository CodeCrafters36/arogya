
import React from "react";

function Navlinks({ isLoggedIn }) {
  const guestLinks = [
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/Gallery" },
    { name: "Login", path: "/login" },
    { name: "Signup", path: "/signup" },
  ];

  const userLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
    { name: "Tracker", path: "#" },
    { name: "Emergency", path: "#" },
    { name: "Analysis", path: "#" },
    { name: "To-Do List", path: "#" },
  ];

  const links = isLoggedIn ? userLinks : guestLinks;

  return (
    <ul className="flex space-x-6">
      {links.map((link, index) => (
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
  );
}

export default Navlinks;

