"use client";

import { Upload, FileText, Sparkles, ShieldCheck, Zap, ArrowRight, X, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ResumeUploadPage() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [targetRole, setTargetRole] = useState("");
    const [user, setUser] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const res = await axios.get("/api/user/profile");
            setUser(res.data.data);
            if (res.data.data?.targetRole) {
                setTargetRole(res.data.data.targetRole);
            }
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === "application/pdf") {
            setFile(droppedFile);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleAnalyze = async () => {
        if (!file || !targetRole) return;

        setIsAnalyzing(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append("file", file);
            // Fallback to user's company or default if not set, but ensure it's not empty
            formData.append("company", user?.targetCompany || "General Tech");
            formData.append("role", targetRole);

            const res = await axios.post("/api/resume-upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                router.push(res.data.redirectUrl);
            }
        } catch (error: any) {
            console.error("Analysis failed", error);
            setError(error.response?.data?.error || "Failed to analyze resume. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <DashboardPage>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium border border-orange-500/20 mb-4">
                            <Sparkles className="h-3 w-3" />
                            AI Analysis Powered
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                            Upload Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Resume</span>
                        </h1>
                        <p className="text-slate-400 max-w-2xl">
                            Targeting <span className="text-white font-bold">{user?.targetCompany || "Your Dream Company"}</span>? Our AI engine will parse your skills to craft a personalized strategy.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Upload Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-8 space-y-6"
                    >
                        {/* Role Selection */}
                        <div className="relative group">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 z-10" />
                            <div className="relative">
                                <select
                                    value={targetRole}
                                    onChange={(e) => setTargetRole(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-[#0a0a0a] border border-white/5 text-white appearance-none focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all cursor-pointer hover:bg-white/[0.02]"
                                >
                                    <option value="" disabled>Select Target Role</option>
                                    <optgroup label="Software Engineering">
                                        <option value="Frontend Engineer">Frontend Engineer</option>
                                        <option value="Backend Engineer">Backend Engineer</option>
                                        <option value="Full Stack Developer">Full Stack Developer</option>
                                        <option value="Mobile Developer">Mobile Developer (iOS/Android)</option>
                                        <option value="DevOps Engineer">DevOps Engineer</option>
                                    </optgroup>
                                    <optgroup label="Data & AI">
                                        <option value="Data Scientist">Data Scientist</option>
                                        <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                                        <option value="Data Engineer">Data Engineer</option>
                                    </optgroup>
                                    <optgroup label="Product & Design">
                                        <option value="Product Manager">Product Manager</option>
                                        <option value="UI/UX Designer">UI/UX Designer</option>
                                    </optgroup>
                                    <option value="Other">Other</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={cn(
                                "relative group rounded-3xl p-1 bg-[#0a0a0a] border border-white/5 transition-all duration-500 overflow-hidden",
                                isDragging ? "border-orange-500/50 scale-[1.01]" : "hover:border-white/10"
                            )}
                        >
                            {/* Animated Background Gradient for dragging */}
                            <AnimatePresence>
                                {isDragging && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 animate-pulse"
                                    />
                                )}
                            </AnimatePresence>

                            <div className={cn(
                                "relative rounded-[22px] border-2 border-dashed p-12 transition-all duration-500",
                                isDragging ? "border-orange-500 bg-orange-500/5" : "border-white/5 bg-white/[0.02] group-hover:bg-white/[0.04] group-hover:border-white/10"
                            )}>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileSelect}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />

                                <div className="flex flex-col items-center text-center">
                                    <div className="relative mb-8">
                                        <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full" />
                                        <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-xl transform transition-transform group-hover:scale-110 duration-500">
                                            <AnimatePresence mode="wait">
                                                {file ? (
                                                    <motion.div
                                                        key="file"
                                                        initial={{ scale: 0.5, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0.5, opacity: 0 }}
                                                    >
                                                        <FileText className="h-10 w-10 text-white" />
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="upload"
                                                        initial={{ scale: 0.5, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0.5, opacity: 0 }}
                                                    >
                                                        <Upload className="h-10 w-10 text-white" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {file ? (
                                            <motion.div
                                                key="file-info"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="w-full"
                                            >
                                                <div className="mb-6">
                                                    <h3 className="text-xl font-bold text-white mb-2 truncate max-w-xs mx-auto">
                                                        {file.name}
                                                    </h3>
                                                    <div className="flex items-center justify-center gap-3">
                                                        <span className="px-2 py-0.5 rounded bg-white/5 text-xs font-medium text-slate-400">
                                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                                        </span>
                                                        <span className="px-2 py-0.5 rounded bg-green-500/10 text-xs font-medium text-green-400 border border-green-500/20 flex items-center gap-1">
                                                            <ShieldCheck className="h-3 w-3" /> Analysis Ready
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="no-file"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <h3 className="text-xl font-bold text-white mb-2">
                                                    Drop your resume here
                                                </h3>
                                                <p className="text-slate-400 mb-6 max-w-sm text-sm">
                                                    Supports PDF only, max 10MB
                                                </p>
                                                <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-slate-400 text-sm font-medium">
                                                    <div className="flex -space-x-2">
                                                        {[1, 2, 3].map(i => (
                                                            <div key={i} className="h-6 w-6 rounded-full border-2 border-[#0a0a0a] bg-slate-800" />
                                                        ))}
                                                    </div>
                                                    Joined by 10k+ Engineers
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* SEPARATED ACTION AREA */}
                        <AnimatePresence>
                            {file && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-[#0a0a0a] border border-orange-500/20 shadow-2xl shadow-orange-500/5 mt-4"
                                >
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-1">Ready to generate?</h4>
                                        <p className="text-slate-400 text-sm">
                                            We'll analyze <span className="text-white font-medium">{file.name}</span> for {targetRole || "your target role"}.
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setFile(null);
                                            }}
                                            disabled={isAnalyzing}
                                            className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAnalyze();
                                            }}
                                            disabled={isAnalyzing || !targetRole}
                                            className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isAnalyzing ? (
                                                <>
                                                    <Sparkles className="h-4 w-4 animate-spin" /> Analyzing...
                                                </>
                                            ) : (
                                                <>
                                                    Generate Roadmap
                                                    <ArrowRight className="h-4 w-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Error Message Display (Separate block) */}
                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 mt-4">
                                <X className="h-5 w-5 flex-shrink-0" />
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Benefits / Process */}
                    <div className="lg:col-span-4 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Zap className="h-24 w-24 text-orange-500" />
                            </div>
                            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-orange-500" /> How it works
                            </h4>
                            <div className="space-y-6">
                                {[
                                    { title: "AI Skill Extraction", desc: "Our models parse technical skills & seniority from your resume sections." },
                                    { title: "Company Tailoring", desc: `We align the prep specifically for ${user?.targetCompany || "your target company"}'s tech stack.` },
                                    { title: "Personalized Sheet", desc: "Get a curated set of DSA & System Design problems just for you." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="h-8 w-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-sm flex-shrink-0">
                                            {// @ts-ignore
                                                i + 1}
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-bold text-white mb-1">{step.title}</h5>
                                            <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="p-6 rounded-3xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20"
                        >
                            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-blue-400" /> Privacy First
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Your resume data is processed securely and is only used to generate your personalized track. We never sell your data.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </DashboardPage>
    );
}
