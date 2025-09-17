import React, { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    instituteName: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  // Load profile from localStorage when page loads
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) {
      setProfile(storedProfile);
      setFormData(storedProfile);
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save profile
  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(formData));
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50 p-6">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          👤 User Profile
        </h2>

        {!isEditing ? (
          <>
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-medium">First Name:</span>{" "}
                {profile.firstName || "Not set"}
              </p>
              <p>
                <span className="font-medium">Last Name:</span>{" "}
                {profile.lastName || "Not set"}
              </p>
              <p>
                <span className="font-medium">Date of Birth:</span>{" "}
                {profile.dob || "Not set"}
              </p>
              <p>
                <span className="font-medium">Institute:</span>{" "}
                {profile.instituteName || "Not set"}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {profile.address || "Not set"}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <div className="space-y-3">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="text"
                name="instituteName"
                placeholder="Institute Name"
                value={formData.instituteName}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
