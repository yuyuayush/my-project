import React from "react";

export function AuthToggle({
  isLogin,
  onToggle,
}: {
  isLogin: boolean;
  onToggle: () => void;
}) {
  return (
    <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-300">
      {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
      <button
        onClick={onToggle}
        className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
      >
        {isLogin ? "Sign Up" : "Login"}
      </button>
    </p>
  );
}
