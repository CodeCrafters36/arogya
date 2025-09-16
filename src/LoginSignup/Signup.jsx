import React, { useState } from "react";
import signup from "../assets/signupimage.jpeg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Signup({setUser}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    institute: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
   let loggedUser = { name: formData.firstName };

  // Handle form submit
  // Handle form submit
const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  // Step 1: Show "Please wait..."
  toast.info("⏳ Please wait...");

  setTimeout(() => {
    try {
      // Step 2: Save data
      localStorage.setItem("user", JSON.stringify(formData));

      // Step 3: Show success toast
      toast.success("✅ Signup successful!");
      setUser(loggedUser.name);
      // Step 4: Redirect after 1s so toast is visible
      setTimeout(() => {
        navigate("/test");
      }, 2000); // wait 1s after success
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, 2000); // simulate 2s processing
};


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center px-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Join our platform
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Create your account and start your journey with us today.
        </p>

        <ul className="space-y-4 text-gray-700">
          <li className="flex items-center">
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3">
              ✓
            </span>
            Secure and encrypted data
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3">
              ✓
            </span>
            24/7 customer support
          </li>
          <li className="flex items-center">
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3">
              ✓
            </span>
            Free to get started
          </li>
        </ul>

        <div className="mt-12">
          <img
            src={signup}
            alt="Signup Illustration"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 bg-white shadow-xl rounded-xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Create Account
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Enter your information to get started
          </p>

          <div className="grid grid-cols-2 gap-4">
            {/* Email */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left leading-tight">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Password */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                  required
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* DOB */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Institute */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Institute
              </label>
              <input
                type="text"
                name="institute"
                placeholder="Your institute"
                value={formData.institute}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="block justify-start text-sm font-medium text-gray-700 mb-1 text-left">
                Address
              </label>
              <textarea
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              ></textarea>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition flex justify-center items-center"
          >
            {loading ? (
              <span className="loader border-2 border-t-2 border-white rounded-full w-5 h-5 animate-spin"></span>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Sign in link */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Signup;
