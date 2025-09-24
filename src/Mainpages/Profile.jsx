import React, { useEffect, useState } from "react";
import NavbarAfterLogin from "../Mainpages/NavbarAfterLogin.jsx";
import { 
  User, 
  Calendar, 
  Home, 
  MapPin, 
  Edit2, 
  Save, 
  Mail 
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  // Initial state for profile
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    dob: "2000-01-01",
    instituteName: "XYZ University",
    address: "123 Main Street, City, Country"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  // Load profile from localStorage if exists
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) {
      setProfile(storedProfile);
      setFormData(storedProfile);
    } else {
      localStorage.setItem("userProfile", JSON.stringify(profile));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save profile
  const handleSave = () => {
    setProfile(formData);
    localStorage.setItem("userProfile", JSON.stringify(formData));
    setIsEditing(false);
    toast.success("Profile saved successfully!");
  };

  return (
    <>
      <NavbarAfterLogin />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50 p-6">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
          <User className="w-6 h-6 text-green-500" /> User Profile
        </h2>

        <div className="space-y-4">
          {/* First Name */}
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-500" />
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="flex-1 border rounded-lg px-3 py-2"
              />
            ) : (
              <p className="flex-1 text-gray-700">
                <span className="font-medium">First Name:</span> {profile.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-500" />
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="flex-1 border rounded-lg px-3 py-2"
              />
            ) : (
              <p className="flex-1 text-gray-700">
                <span className="font-medium">Last Name:</span> {profile.lastName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-500" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 border rounded-lg px-3 py-2"
              />
            ) : (
              <p className="flex-1 text-gray-700">
                <span className="font-medium">Email:</span> {profile.email}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-500" />
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="flex-1 border rounded-lg px-3 py-2"
              />
            ) : (
              <p className="flex-1 text-gray-700">
                <span className="font-medium">Date of Birth:</span> {profile.dob}
              </p>
            )}
          </div>

          {/* Institute Name */}
          <div className="flex items-center gap-3">
            <Home className="w-5 h-5 text-gray-500" />
            {isEditing ? (
              <input
                type="text"
                name="instituteName"
                placeholder="Institute Name"
                value={formData.instituteName}
                onChange={handleChange}
                className="flex-1 border rounded-lg px-3 py-2"
              />
            ) : (
              <p className="flex-1 text-gray-700">
                <span className="font-medium">Institute:</span> {profile.instituteName}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            {isEditing ? (
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="flex-1 border rounded-lg px-3 py-2"
              />
            ) : (
              <p className="flex-1 text-gray-700">
                <span className="font-medium">Address:</span> {profile.address}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition"
              >
                <Save className="w-4 h-4" /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4" /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
            >
              <Edit2 className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default Profile;
