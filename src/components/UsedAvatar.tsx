import React, { useEffect, useState } from "react";

// Utility to get random color for avatar
const getRandomColor = () => {
  const colors = [
    "bg-red-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-orange-400",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const UserAvatar: React.FC = () => {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}"); // key in localStorage
    if (user) setUserName(user.firstname);
  }, []);

  if (!userName) return null; // or a placeholder

  const firstLetter = userName.charAt(0).toUpperCase();
  const avatarColor = getRandomColor();

  return (
    <div className="flex items-center gap-2">
      {/* Avatar */}
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${avatarColor}`}
      >
        {firstLetter}
      </div>

      {/* Name */}
      <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
        {userName}
      </span>
    </div>
  );
};
