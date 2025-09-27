import React from "react";

export function SubmitButton({ isLogin }: { isLogin: boolean }) {
  return (
    <button
      type="submit"
      className="group relative w-full rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02] focus:ring-2 focus:ring-indigo-400"
    >
      {isLogin ? "Login" : "Sign Up"}
    </button>
  );
}
