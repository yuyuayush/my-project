"use client";

import TeamLeadLanding from "@/pages/homepage/Landing";
import { motion } from "motion/react";

export default function LandingPage() {
  return (
    <div className="w-full bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative mx-auto px-6 py-20 flex flex-col items-center text-center max-w-6xl">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
          Lead Your Team Like a Pro
        </h1>
        <p className="max-w-2xl text-lg md:text-xl mb-8 text-neutral-600 dark:text-neutral-400">
          Efficient task management, team collaboration, and AI-driven insights to help you deliver faster and smarter.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="rounded-lg bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="rounded-lg border border-gray-300 dark:border-neutral-700 px-6 py-3 font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
            Learn More
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 w-full max-w-4xl rounded-xl overflow-hidden shadow-lg"
        >
          <img
            src="https://assets.aceternity.com/pro/aceternity-landing.webp"
            alt="Software Preview"
            className="w-full object-cover"
          />
        </motion.div>
      </section>
      <TeamLeadLanding />

      {/* Features Section */}
     

      {/* Call to Action */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start Building Smarter Today
        </h2>
        <p className="max-w-xl mx-auto mb-8 text-neutral-600 dark:text-neutral-400">
          Join thousands of users leveraging AI to accelerate their work and launch software with ease.
        </p>
        <button className="rounded-lg bg-blue-600 text-white px-8 py-4 font-semibold hover:bg-blue-700 transition">
          Get Started Free
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-100 dark:bg-neutral-900 px-6 py-10 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 dark:text-neutral-400">© 2025 Civil Guruji. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-600 transition">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition">Terms</a>
            <a href="#" className="hover:text-blue-600 transition">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-xl md:text-2xl font-bold">Civil Guruji</h1>
      </div>
      <div className="flex gap-4">
        <a href="/login" className="rounded-lg bg-black text-white px-6 py-2 font-medium hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition">
          Login
        </a>
        <a href="/login" className="rounded-lg border border-gray-300 dark:border-neutral-700 px-6 py-2 font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
          Sign Up
        </a>
      </div>
    </nav>
  );
};
