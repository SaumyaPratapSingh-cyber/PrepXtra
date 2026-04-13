"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2, ArrowLeft, Mail, KeyRound, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundBeams } from "@/components/landing/BackgroundBeams";

type Step = "email" | "otp" | "success";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("email");
    
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to send OTP");
            }

            setStep("otp");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to reset password");
            }

            setStep("success");
            // Automatically redirect after a few seconds
            setTimeout(() => {
                router.push("/auth/login");
            }, 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const slideVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] shadow-2xl border border-white/5 relative group min-h-[600px]"
        >
            {/* Glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />

            {/* LEFT: Form Section */}
            <div className="lg:col-span-7 p-12 lg:p-16 flex flex-col justify-center relative z-10 overflow-hidden">

                <Link href="/auth/login" className="absolute top-8 left-8 text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2 text-sm font-bold">
                    <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>

                <AnimatePresence mode="wait">
                    {step === "email" && (
                        <motion.div
                            key="email-step"
                            variants={slideVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-10">
                                <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center mb-6">
                                    <KeyRound className="w-7 h-7 text-orange-500" />
                                </div>
                                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 uppercase tracking-wide mb-2">
                                    Forgot Password
                                </h2>
                                <p className="text-slate-400 font-medium">
                                    No worries! Enter your email address below and we'll send you an OTP to reset your password.
                                </p>
                            </div>

                            <form onSubmit={handleSendOTP} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-4">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                        <Input
                                            type="email"
                                            placeholder="example@gmail.com"
                                            className="pl-14 h-14 rounded-full bg-[#111] border-2 border-[#222] focus:border-orange-500 text-white placeholder:text-slate-600 transition-all font-medium text-lg px-6"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 rounded-lg bg-red-900/20 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    className="w-full h-14 mt-4 rounded-full bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 hover:from-yellow-500 hover:via-orange-500 hover:to-red-500 text-black font-black text-xl uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    type="submit"
                                    disabled={isLoading || !email}
                                >
                                    {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-black" /> : "Send OTP"}
                                </Button>
                            </form>
                        </motion.div>
                    )}

                    {step === "otp" && (
                        <motion.div
                            key="otp-step"
                            variants={slideVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-10">
                                <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center mb-6">
                                    <Lock className="w-7 h-7 text-orange-500" />
                                </div>
                                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 uppercase tracking-wide mb-2">
                                    OTP & New Password
                                </h2>
                                <p className="text-slate-400 font-medium">
                                    Enter the 6-digit code sent to <span className="text-orange-400">{email}</span> and your new password.
                                </p>
                            </div>

                            <form onSubmit={handleResetPassword} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-4">6-Digit OTP</label>
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            placeholder="123456"
                                            className="h-14 rounded-full bg-[#111] border-2 border-[#222] focus:border-orange-500 text-white placeholder:text-slate-600 transition-all font-bold text-xl px-6 tracking-[0.2em] text-center"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                                            required
                                            maxLength={6}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-4">New Password</label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="pl-6 h-14 rounded-full bg-[#111] border-2 border-[#222] focus:border-orange-500 text-white placeholder:text-slate-600 transition-all font-medium text-lg px-6 pr-12"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            minLength={6}
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

                                {error && (
                                    <div className="p-3 rounded-lg bg-red-900/20 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    className="w-full h-14 mt-4 rounded-full bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 hover:from-yellow-500 hover:via-orange-500 hover:to-red-500 text-black font-black text-xl uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    type="submit"
                                    disabled={isLoading || otp.length < 6 || newPassword.length < 6}
                                >
                                    {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-black" /> : "Reset Password"}
                                </Button>
                            </form>
                        </motion.div>
                    )}

                    {step === "success" && (
                        <motion.div
                            key="success-step"
                            variants={slideVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col items-center justify-center text-center py-10"
                        >
                            <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-12 h-12 text-green-500" />
                            </div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-wide mb-4">
                                Password Reset!
                            </h2>
                            <p className="text-slate-400 font-medium mb-8 max-w-sm">
                                Your account is secure again. You can now use your new password to access your dashboard.
                            </p>
                            
                            <Button
                                onClick={() => router.push("/auth/login")}
                                className="h-14 px-8 rounded-full bg-white text-black font-black uppercase tracking-wider hover:bg-slate-200 transition-colors"
                            >
                                Continue to Login
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* RIGHT: Visual Section */}
            <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center bg-[#050505] border-l border-white/5 overflow-hidden">
                <div className="absolute w-[150%] h-[80%] bg-gradient-to-b from-yellow-500 to-orange-600 rounded-full blur-[2px] opacity-100 right-[-50%] z-0" />
                <BackgroundBeams className="opacity-50" />

                <div className="relative z-10 w-64 h-64 rounded-full bg-black border-[10px] border-orange-500/20 flex items-center justify-center shadow-2xl">
                    <div className="absolute inset-0 rounded-full bg-[url('/bg/grid.svg')] opacity-20" />
                    <span className="text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-orange-600 drop-shadow-2xl">
                        P
                    </span>
                    <div className="absolute -bottom-4 bg-orange-600 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                        Security
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
