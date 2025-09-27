// src/pages/layout/DashboardLayout.tsx
import { Outlet, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarDemo } from "../sidebarLayout/SideBarLayout";

export default function DashboardLayout() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.navigate({ to: "/" }); // redirect to login
    }
  }, [router]);
  return (
    <div className="flex h-screen">
      <SidebarDemo />
      {/* <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main> */}
    </div>

  );
}
