import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

// theme.ts
export const getStoredTheme = () => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("theme") || "light";
};

export const setStoredTheme = (theme: "light" | "dark") => {
  localStorage.setItem("theme", theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
};

