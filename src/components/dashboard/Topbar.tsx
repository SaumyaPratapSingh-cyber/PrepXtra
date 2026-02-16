"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, Menu, User, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TopbarProps {
    user: { fullName: string; email?: string } | null;
    onMobileMenuOpen: () => void;
    isCollapsed: boolean;
}

export function Topbar({ user, onMobileMenuOpen, isCollapsed }: TopbarProps) {
    const pathname = usePathname();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Helper to get current section name
    const getSectionName = () => {
        if (pathname === "/dashboard") return "Overview";
        if (pathname.includes("resume-track")) return "Resume Track";
        if (pathname.includes("general-track")) return "General Track";
        if (pathname.includes("core-subjects")) return "Core Subjects";
        if (pathname === "/dashboard/profile") return "Profile";
        return "Dashboard";
    };

    return (
        <header
            className={cn(
                "h-16 fixed top-0 right-0 z-30 bg-black/50 backdrop-blur-xl border-b border-white/5 transition-all duration-300 ease-[0.23,1,0.32,1]",
                isCollapsed ? "md:left-[88px]" : "md:left-[280px]",
                "left-0"
            )}
        >
            <div className="h-full px-4 md:px-8 flex items-center justify-between">
                {/* Left: Mobile Menu & Breadcrumb */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMobileMenuOpen}
                        className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex flex-col">
                        <h1 className="text-lg font-semibold text-white tracking-tight">
                            {getSectionName()}
                        </h1>
                    </div>
                </div>

                {/* Right: Actions & Profile */}
                <div className="flex items-center gap-4 md:gap-6">
                    {/* Search (Optional - can be expanded later) */}
                    <button className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors">
                        <Search className="h-5 w-5" />
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 transition-colors">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-black" />
                    </button>

                    <div className="h-8 w-px bg-white/10 hidden md:block" />

                    {/* User Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 p-1 rounded-full md:rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
                        >
                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-orange-500 to-red-600 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20">
                                {user?.fullName ? user.fullName[0].toUpperCase() : <User className="h-4 w-4" />}
                            </div>
                            <span className="hidden md:block text-sm font-medium text-slate-300 pr-2">
                                {user?.fullName || "Student"}
                            </span>
                        </button>

                        {/* Dropdown */}
                        <AnimatePresence>
                            {isProfileOpen && (
                                <>
                                    {/* Backdrop to close */}
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsProfileOpen(false)}
                                    />

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                        className="absolute right-0 top-full mt-2 w-56 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                                    >
                                        <div className="p-4 border-b border-white/5">
                                            <p className="text-sm font-medium text-white">{user?.fullName || "Student"}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{user?.email || "student@example.com"}</p>
                                        </div>
                                        <div className="p-1">
                                            <Link
                                                href="/dashboard/profile"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                            >
                                                <User className="h-4 w-4" />
                                                My Profile
                                            </Link>
                                            <button
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
                                            >
                                                <Settings className="h-4 w-4" />
                                                Settings
                                            </button>
                                            <div className="h-px bg-white/5 my-1" />
                                            <button
                                                onClick={async () => {
                                                    // Logout logic here
                                                    await fetch("/api/auth/logout", { method: "POST" });
                                                    window.location.href = "/";
                                                }}
                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Logout
                                            </button>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
}
