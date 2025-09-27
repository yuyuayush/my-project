"use client";
import { applyTheme } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState<any>({
    theme: "light",
    notifications: true,
    language: "en",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const storedSettings = localStorage.getItem("settings");
    if (storedSettings) {
      const parsed = JSON.parse(storedSettings);
      setSettings(parsed);
      applyTheme(parsed.theme); // ✅ Apply theme on page load
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
    applyTheme(settings.theme); // ✅ Apply theme immediately
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      {/* Settings Card */}
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Settings
        </h2>

        <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            🌙 Theme:{" "}
            <span className="font-medium capitalize">{settings.theme}</span>
          </p>
          <p>
            🔔 Notifications:{" "}
            <span className="font-medium">
              {settings.notifications ? "Enabled" : "Disabled"}
            </span>
          </p>
          <p>
            🌐 Language:{" "}
            <span className="font-medium uppercase">{settings.language}</span>
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-5 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition"
        >
          Edit Settings
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Update Settings
            </h2>

            <div className="space-y-4">
              {/* Theme */}
              <select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>

              {/* Notifications */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                Enable Notifications
              </label>

              {/* Language */}
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-400 transition"
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

export default Settings;
