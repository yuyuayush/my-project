"use client";
import React from "react";
import { HoveredLink } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed top-4 inset-x-0 max-w-4xl mx-auto z-50 flex items-center justify-center space-x-6 bg-white/80 dark:bg-neutral-900/80 rounded-xl shadow-lg px-6 py-3 backdrop-blur-md",
        className
      )}
    >
      <HoveredLink href="/dashboard">Dashboard</HoveredLink>
      <HoveredLink href="/dashboard/team">Teams</HoveredLink>
      <HoveredLink href="/dashboard/board">Board</HoveredLink>
      <HoveredLink href="/dashboard/settings">Settings</HoveredLink>
      <HoveredLink href="/dashboard/profile">Profile</HoveredLink>
    </div>
  );
}
