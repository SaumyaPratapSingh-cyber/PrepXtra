"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FileText,
    BookOpen,
    Cpu,
    User,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Map,
    Zap,
    ShieldCheck,
    Bell
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Resume Maker", href: "/dashboard/resume-maker", icon: FileText },
    { label: "Resume Track", href: "/dashboard/resume-track", icon: FileText },
    { label: "General Track", href: "/dashboard/general-track", icon: BookOpen },
    { label: "Core Subjects", href: "/dashboard/core-subjects", icon: Cpu },
    { label: "Roadmap", href: "/dashboard/roadmap", icon: Map },
    { label: "Job Alerts", href: "/dashboard/newsletter", icon: Bell },
    { label: "Profile", href: "/dashboard/profile", icon: User },
];

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
    const pathname = usePathname();

    return (
        <motion.div
            initial={{ width: 256 }}
            animate={{ width: isCollapsed ? 88 : 280 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="hidden md:flex flex-col h-screen fixed left-0 top-0 z-50 bg-[#050505] border-r border-white/5 shadow-[20px_0_40px_rgba(0,0,0,0.4)]"
        >
            {/* Brand Section */}
            <div className="h-20 flex items-center px-7 border-b border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />
                <Link href="/dashboard" className="flex items-center gap-4 group relative z-10">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-black shadow-[0_0_20px_rgba(249,115,22,0.3)] flex-shrink-0 transition-transform group-hover:scale-105 duration-500">
                        PX
                    </div>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col"
                        >
                            <span className="text-lg font-black tracking-tighter text-white leading-none">PREPXTRA</span>
                            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-0.5">Engine v2.0</span>
                        </motion.div>
                    )}
                </Link>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                {!isCollapsed && (
                    <div className="px-4 mb-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Navigation Matrix</div>
                )}

                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? "bg-white/[0.03] text-white border border-white/5 shadow-lg"
                                    : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-red-600 rounded-r-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <item.icon className={cn(
                                "h-5 w-5 flex-shrink-0 transition-all duration-500",
                                isActive ? "text-orange-500 scale-110" : "group-hover:scale-110 group-hover:text-slate-300"
                            )} />

                            {!isCollapsed && (
                                <span className={cn(
                                    "text-sm tracking-tight transition-all",
                                    isActive ? "font-black" : "font-medium"
                                )}>{item.label}</span>
                            )}

                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                                <div className="absolute left-full ml-4 px-3 py-2 bg-[#111] border border-white/10 text-[10px] font-black uppercase tracking-widest text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 pointer-events-none z-50 shadow-2xl">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Actions */}
            <div className="p-6 border-t border-white/5 space-y-4">
                {!isCollapsed && (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 group relative cursor-pointer overflow-hidden transform transition-transform hover:scale-[1.02]">
                        <div className="absolute top-0 right-0 p-2 opacity-20">
                            <Zap className="h-10 w-10 text-white fill-current" />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-[11px] font-black text-white/80 uppercase tracking-widest mb-1">Membership</h4>
                            <p className="text-sm font-black text-white">UPGRADE PRO</p>
                        </div>
                    </div>
                )}

                <button
                    onClick={onToggle}
                    className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5"
                >
                    <div className="h-6 w-6 flex items-center justify-center">
                        {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                    </div>
                    {!isCollapsed && <span className="text-[11px] font-black uppercase tracking-widest">Minimalist Mode</span>}
                </button>
            </div>
        </motion.div>
    );
}
