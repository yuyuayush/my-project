"use client";
import React, { useState, useEffect } from "react";

// ---------------- Avatar Component ----------------
const Avatar = ({ name }: { name: string }) => {
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  return (
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
      {initial}
    </div>
  );
};

// ---------------- Profile Component ----------------
const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "user",
  });

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({ ...parsedUser, phone: parsedUser.phone || "", address: parsedUser.address || "", role: parsedUser.role || "user" });
    }
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated user
  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700">
        {user ? (
          <>
            <Avatar name={user.firstname} />
            <h2 className="mt-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
              {user.firstname} {user.lastname}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>

            {/* Extra details if available */}
            {user.phone && <p className="text-gray-600 dark:text-gray-400">📞 {user.phone}</p>}
            {user.address && <p className="text-gray-600 dark:text-gray-400">📍 {user.address}</p>}

            <span className="mt-2 inline-block px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
              {user.role || "User"}
            </span>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-5 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <div>
            <p className="text-gray-600">No user data found.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition"
            >
              Create Profile
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Edit Profile</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
