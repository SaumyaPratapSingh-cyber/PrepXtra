"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
    variant?: "public" | "dashboard";
    user?: { fullName: string } | null;
}

const navItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Pricing", href: "/pricing" },
];

export function Navbar({ variant = "public", user }: NavbarProps) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 z-50 w-full transition-all duration-300",
            variant === "dashboard"
                ? "bg-black/80 border-b border-white/5 backdrop-blur-xl"
                : scrolled
                    ? "bg-black/50 border-b border-white/5 backdrop-blur-xl py-2"
                    : "bg-transparent border-transparent py-4"
        )}>
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* Brand */}
                <Link href={variant === "dashboard" ? "/dashboard" : "/"} className="flex items-center gap-2 group">
                    <div className="h-8 w-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20">
                        P
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">
                        PrepXtra
                    </span>
                </Link>

                {/* Desktop Nav - Only for Dashboard or if we want public links */}
                <div className="hidden md:flex items-center gap-6">
                    {variant === "dashboard" && navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-orange-400",
                                pathname === item.href ? "text-white" : "text-slate-400"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">

                    {variant === "public" ? (
                        // Public Actions
                        <div className="flex items-center gap-4">
                            <Link href="/auth/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                                Sign In
                            </Link>
                            <Link href="/auth/register">
                                <Button size="sm" variant="primary" className="bg-orange-600 hover:bg-orange-700 text-white border-0">Get Started</Button>
                            </Link>
                        </div>
                    ) : (
                        // Dashboard Actions
                        <div className="flex items-center gap-4 relative">
                            {/* User Profile Dropdown Trigger */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Mobile toggle
                                className="md:hidden text-slate-400"
                            >
                                <Menu className="h-6 w-6" />
                            </button>

                            {/* Desktop User Menu with Dropdown */}
                            <div className="hidden md:block relative group">
                                <button className="flex items-center gap-3 hover:bg-white/5 p-1.5 rounded-lg transition-colors cursor-pointer group-hover:bg-white/10">
                                    <div className="text-right hidden lg:block">
                                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold group-hover:text-orange-400 transition-colors">Welcome back</p>
                                        <p className="text-sm font-medium text-white group-hover:text-orange-300 transition-colors">{user?.fullName || "Student"}</p>
                                    </div>
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-orange-500 to-red-600 border border-white/10 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                                        {user?.fullName ? user.fullName[0].toUpperCase() : <User className="h-4 w-4" />}
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                <div className="absolute right-0 top-full mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
                                    <div className="p-1">
                                        <Link href="/dashboard/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                            <User className="h-4 w-4" />
                                            My Profile
                                        </Link>
                                        <div className="h-px bg-white/5 my-1" />
                                        <button
                                            onClick={async () => {
                                                await fetch("/api/auth/logout", { method: "POST" });
                                                window.location.href = "/";
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden border-t border-white/5 bg-slate-950 overflow-hidden"
                    >
                        <div className="p-4 space-y-2">
                            {variant === "dashboard" ? (
                                <>
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-orange-400 rounded-lg transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                    <div className="border-t border-white/10 my-2 pt-2">
                                        <Link
                                            href="/dashboard/profile"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-orange-400 rounded-lg transition-colors"
                                        >
                                            <div className="h-6 w-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                                                <User className="h-3 w-3 text-orange-400" />
                                            </div>
                                            Profile Settings
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/login"
                                        className="block px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 rounded-lg"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        className="block px-4 py-3 text-sm font-medium text-orange-400 hover:bg-orange-500/10 rounded-lg"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
