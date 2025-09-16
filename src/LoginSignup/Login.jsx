import React, { useState } from "react";
import loginImage from "../assets/signupimage.jpeg"; 
import {
  HiOutlineMail,
  HiOutlineLockClosed,
} from "react-icons/hi";
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebookF,
  FaCheckCircle,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login({setUser}) {
  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Show waiting toast
    toast.info("⏳ Please wait...");

    setTimeout(() => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("user"));
             let loggedInUser = { name: username };
        if (
          savedUser &&
          savedUser.email === formData.email &&
          savedUser.password === formData.password
        ) {
          console.log("mohit",savedUser)
          loggedInUser = savedUser.firstName || "User";
          toast.success("✅ Login successful!");
             setUser(loggedInUser);
           setTimeout(() => {
            navigate("/home");
          }, 2000);

        } else {
          toast.error("❌ Invalid email or password!");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("❌ Something went wrong!");
      } finally {
        setLoading(false);
      }
    }, 3000); // 3 seconds delay
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white flex flex-col justify-center p-12">
        <h2 className="text-4xl font-bold mb-3">Welcome Back!</h2>
        <p className="text-gray-300 mb-8 text-lg leading-relaxed">
          Log in to access your account <br /> and continue your journey with us.
        </p>

        <img
          src={loginImage}
          alt="Login Illustration"
          className="rounded-2xl shadow-lg mb-8"
        />

        <div className="space-y-4 text-gray-300 text-lg">
          <div className="flex items-center gap-3">
            <FaCheckCircle className="w-6 h-6 text-green-400" />
            <span>Secure and encrypted data</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCheckCircle className="w-6 h-6 text-green-400" />
            <span>24/7 customer support</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCheckCircle className="w-6 h-6 text-green-400" />
            <span>Free to get started</span>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex justify-center items-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-10 rounded-2xl shadow-xl w-3/4 max-w-md"
        >
          <h2 className="text-3xl font-bold text-center mb-4 mt-10">
            Your Next Step Awaits
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Sign in to unlock new opportunities and keep moving forward.
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1 text-left">
              Email Address
            </label>
            <div className="relative">
              <HiOutlineMail
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-1 text-left">
              Password
            </label>
            <div className="relative">
              <HiOutlineLockClosed
                className="absolute top-3 left-3 text-gray-400"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 pl-10 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute top-3 right-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-900 text-white p-3 rounded-md hover:bg-green-800 transition flex justify-center items-center"
          >
            {loading ? (
              <span className="loader border-2 border-t-2 border-white rounded-full w-5 h-5 animate-spin"></span>
            ) : (
              "Sign In →"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500 text-sm mt-3 mb-3">
              OR CONTINUE WITH
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social */}
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              className="flex-1 border p-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <FaGoogle className="text-red-500" /> Google
            </button>
            <button
              type="button"
              className="flex-1 border p-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <FaFacebookF className="text-blue-600" /> Facebook
            </button>
          </div>

          {/* Signup Link */}
          <p className="text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-green-600">
              Sign up
            </a>
          </p>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}

export default Login;
