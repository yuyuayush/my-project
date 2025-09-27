import React, { useState } from "react";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconLayoutBoard,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Outlet } from "@tanstack/react-router";
import { TableCellsMerge } from "lucide-react";
import { NavbarDemo } from "@/components/navbar/Navbar";
import { UserAvatar } from "@/components/UsedAvatar";

export function SidebarDemo() {
    const links = [
        { label: "Dashboard", href: "/dashboard", icon: <IconBrandTabler /> },
        { label: "Board", href: "/dashboard/board", icon: <IconLayoutBoard /> },
        { label: "Team", href: "/dashboard/team", icon: <TableCellsMerge /> },
        { label: "Profile", href: "/dashboard/profile", icon: <IconUserBolt /> },
        { label: "Settings", href: "/dashboard/settings", icon: <IconSettings /> },
        { label: "Logout", href: "/", icon: <IconArrowLeft />, action: () => { localStorage.clear(); } },
    ];

    const [open, setOpen] = useState(true);

    return (
        <div className="flex h-screen">
            {/* Sidebar container */}
            <Sidebar
                open={open}
                setOpen={setOpen}
                animate={true}
                className="flex flex-col bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-gray-700 shadow-lg w-64"
            >
                <SidebarBody className="flex flex-col justify-between h-full p-4">
                    {/* Top logo */}
                    <div className="flex flex-col">
                        <Logo />
                        <div className="mt-10 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink
                                    key={idx}
                                    link={{
                                        ...link,
                                        icon: (
                                            <span className="text-neutral-700 dark:text-neutral-200">
                                                {link.icon}
                                            </span>
                                        ),
                                    }}
                                    className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-indigo-100 dark:hover:bg-indigo-700 transition-colors"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Profile at bottom */}
                    <UserAvatar />
                </SidebarBody>
            </Sidebar>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-neutral-900">

                <NavbarDemo />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 rounded-2xl p-4 w-[93vw] bg-white dark:bg-neutral-800 shadow-lg min-h-[90vh]"
                >

                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
}

export const Logo = () => {
    return (
        <a
            href="#"
            className="flex items-center space-x-2 text-black dark:text-white"
        >
            <div className="h-6 w-6 bg-indigo-600 rounded-full"></div>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-lg"
            >
                Team Lead
            </motion.span>
        </a>
    );
};
