import React from "react";

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white/70 p-8 shadow-xl backdrop-blur-lg dark:bg-neutral-800/80">
      {children}
    </div>
  );
}
