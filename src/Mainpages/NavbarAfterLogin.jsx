// import React from "react";

// function NavbarAfterLogin({ user }) {
//   const userLinks = [
//     { name: "Dashboard", path: "/dashboard" },
//     // add drop down..
//     // 1 video
//     // 2 mediation
//     // 3 articles
//     { name: "Layout", path: "/layout" }
//   ];

//   return (
//     <nav className="w-full bg-white shadow-md px-6 py-4 mb-5 flex justify-between items-center">
//       {/* Logo */}
//       <a href="/layout" className="flex items-center space-x-2 hover:opacity-80 transition">
//         <div className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full font-bold">
//           A
//         </div>
//         <h1 className="text-xl font-bold text-gray-800">Arogya</h1>
//       </a>

//       {/* User Links */}
//       <div className="flex items-center space-x-6">
//         <ul className="flex space-x-6">
//           {userLinks.map((link, index) => (
//             <li key={index}>
//               <a
//                 href={link.path}
//                 className="text-gray-700 font-medium hover:text-purple-600 transition"
//               >
//                 {link.name}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* Show Username */}
//         <span className="text-gray-700 font-semibold">
//           {user}
//         </span>
//       </div>
//     </nav>
//   );
// }

// export default NavbarAfterLogin;





import React, { useState } from "react";

function NavbarAfterLogin({ user }) {
  const userLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Layout", path: "/layout" }
  ];

  const dropdownLinks = [
    { name: "Video", path: "/videos" },
    { name: "Books", path: "/selfhelpbooks" },
    { name: "Articles", path: "/article" }
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 mb-5 flex justify-between items-center">
      {/* Logo */}
      <a
        href="/layout"
        className="flex items-center space-x-2 hover:opacity-80 transition"
      >
        <div className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full font-bold">
          A
        </div>
        <h1 className="text-xl font-bold text-gray-800">Arogya</h1>
      </a>

      <GoogleTranslate />

      {/* User Links */}
      <div className="flex items-center space-x-6">
        <ul className="flex space-x-6 items-center">
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

          {/* Dropdown */}
          <li className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 font-medium hover:text-purple-600 transition focus:outline-none"
            >
              Resources ▾
            </button>

            {isOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                {dropdownLinks.map((drop, index) => (
                  <li key={index}>
                    <a
                      href={drop.path}
                      className="block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition"
                    >
                      {drop.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* Show Username */}
        <span className="text-gray-700 font-semibold">{user}</span>
      </div>
    </nav>
  );
}

export default NavbarAfterLogin;
