"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2, Lock, Mail, Facebook, Twitter, Instagram, Github, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/landing/BackgroundBeams";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] shadow-2xl border border-white/5 relative group"
        >
            {/* Glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />

            {/* LEFT: Form Section (Cols 7) */}
            <div className="lg:col-span-7 p-12 lg:p-16 flex flex-col justify-center relative z-10">

                <div className="mb-10">
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 uppercase tracking-wide mb-2">
                        Welcome Back!
                    </h2>
                    <p className="text-slate-400 font-medium">
                        Don't have an account? <Link href="/auth/register" className="text-orange-400 hover:text-orange-300 transition-colors font-bold hover:underline">Sign up</Link>
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-300 ml-4">Email Address</label>
                        <div className="relative">
                            <Input
                                type="email"
                                placeholder="example@gmail.com"
                                className="pl-6 h-14 rounded-full bg-[#111] border-2 border-[#222] focus:border-orange-500 text-white placeholder:text-slate-600 transition-all font-medium text-lg px-6"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-300 ml-4">Password</label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-6 h-14 rounded-full bg-[#111] border-2 border-[#222] focus:border-orange-500 text-white placeholder:text-slate-600 transition-all font-medium text-lg px-6 pr-12"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-orange-400 transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="w-5 h-5 rounded-md border-2 border-[#333] group-hover:border-orange-500 flex items-center justify-center transition-colors">
                                <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-sm text-slate-400 group-hover:text-white transition-colors font-medium">Remember me</span>
                        </label>
                        <Link href="/auth/forgot-password">
                            <span className="text-sm text-orange-400 hover:text-orange-300 hover:underline font-medium">Forget password?</span>
                        </Link>
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-900/20 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                            {error}
                        </div>
                    )}

                    <Button
                        className="w-full h-14 mt-4 rounded-full bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 hover:from-yellow-500 hover:via-orange-500 hover:to-red-500 text-black font-black text-xl uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-black" /> : "Sign In"}
                    </Button>
                </form>
            </div>

            {/* RIGHT: Visual Section (Cols 5) - With Social Sidebar */}
            <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center bg-[#050505] border-l border-white/5 overflow-hidden">
                {/* Background Circle */}
                <div className="absolute w-[150%] h-[80%] bg-gradient-to-b from-yellow-500 to-orange-600 rounded-full blur-[2px] opacity-100 right-[-50%] z-0" />
                <BackgroundBeams className="opacity-50" />

                {/* Logo / Mascot Placeholder */}
                <div className="relative z-10 w-64 h-64 rounded-full bg-black border-[10px] border-orange-500/20 flex items-center justify-center shadow-2xl">
                    <div className="absolute inset-0 rounded-full bg-[url('/bg/grid.svg')] opacity-20" />
                    {/* Big 'P' Logo */}
                    <span className="text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-orange-600 drop-shadow-2xl">
                        P
                    </span>
                    {/* Floating Badge */}
                    <div className="absolute -bottom-4 bg-orange-600 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                        PrepXtra
                    </div>
                </div>

                {/* Social Sidebar (Far Right) */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
                    {[Facebook, Twitter, Instagram, Github].map((Icon, idx) => (
                        <div key={idx} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all cursor-pointer shadow-lg hover:shadow-orange-500/50">
                            <Icon className="h-5 w-5" />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
