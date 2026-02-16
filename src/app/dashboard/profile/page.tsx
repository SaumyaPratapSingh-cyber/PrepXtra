"use client";

import { motion } from "framer-motion";
import { User, CreditCard, Bell, Zap, BarChart2, Activity, Trophy, Calendar, CheckCircle, ArrowUpRight } from "lucide-react";
import ProfileForm from "@/components/ui/ProfileForm";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DashboardPage } from "@/components/dashboard/DashboardPage";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("Analytics");

    const tabs = [
        { icon: BarChart2, label: "Analytics" },
        { icon: User, label: "General" },
        { icon: CreditCard, label: "Billing" },
        { icon: Bell, label: "Notifications" },
    ];

    return (
        <DashboardPage className="max-w-7xl mx-auto">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 relative"
            >
                <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/20 blur-[100px] pointer-events-none" />
                <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                    Profile <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">& Analytics</span>
                </h1>
                <p className="text-slate-400 max-w-2xl font-light">
                    Manage your personal information, track your progress, and view your performance metrics.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Navigation (Sticky) */}
                <div className="lg:col-span-3 h-fit sticky top-24">
                    <div className="space-y-2">
                        {tabs.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveTab(item.label)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border",
                                    activeTab === item.label
                                        ? "bg-white/5 text-white border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                                        : "text-slate-400 border-transparent hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4", activeTab === item.label ? "text-orange-500" : "text-slate-500")} />
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 p-1 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/20">
                        <div className="p-5 rounded-[12px] bg-[#0a0a0a]/80 backdrop-blur-sm">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-orange-500/20">
                                <Zap className="h-5 w-5 fill-white" />
                            </div>
                            <h3 className="text-white font-bold mb-1">Upgrade to Pro</h3>
                            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                                Unlock AI interviews, unlimited practice problems, and detailed performance analytics.
                            </p>
                            <button className="w-full py-2.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-slate-200 transition-colors">
                                View Plans &rarr;
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-9 space-y-8">
                    {/* Performance Stats Bento (Reset to 0) */}
                    {activeTab === "Analytics" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Activity className="h-24 w-24 text-orange-500" />
                                    </div>
                                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <CheckCircle className="h-3 w-3" /> Completion Rate
                                    </div>
                                    <div className="text-4xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                                        0%
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 mt-6 rounded-full overflow-hidden">
                                        <div className="h-full w-[0%] bg-gradient-to-r from-orange-400 to-red-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                                    </div>
                                </div>
                                <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <User className="h-24 w-24 text-blue-500" />
                                    </div>
                                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <Activity className="h-3 w-3" /> Current Streak
                                    </div>
                                    <div className="text-4xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                                        0 <span className="text-lg font-medium text-slate-500">Days</span>
                                    </div>
                                    <div className="flex gap-1.5 mt-6">
                                        {[...Array(7)].map((_, i) => (
                                            <div key={i} className={`h-2 flex-1 rounded-full ${i === 0 ? 'bg-white/5' : 'bg-white/5'}`} />
                                        ))}
                                    </div>
                                </div>
                                <div className="p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Trophy className="h-24 w-24 text-yellow-500" />
                                    </div>
                                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <Trophy className="h-3 w-3" /> Total XP
                                    </div>
                                    <div className="text-4xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                                        0
                                    </div>
                                    <div className="mt-6">
                                        <div className="text-xs font-medium text-green-400 flex items-center gap-1">
                                            <ArrowUpRight className="h-3 w-3" /> Start learning to earn XP
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity Graphic (Abstract) */}
                            <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 min-h-[300px] flex flex-col items-center justify-center text-center">
                                <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                    <BarChart2 className="h-10 w-10 text-slate-600" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No data available yet</h3>
                                <p className="text-slate-400 max-w-sm">
                                    Complete problems, quizzes, and assessments to see your detailed performance analytics here.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Content Section Based on Active Tab */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={activeTab === "Analytics" ? "hidden" : "rounded-3xl bg-[#0a0a0a] border border-white/5 overflow-hidden"}
                    >
                        {activeTab === "General" && (
                            <>
                                <div className="p-8">
                                    <ProfileForm />
                                </div>
                            </>
                        )}

                        {activeTab === "Billing" && (
                            <div className="p-12 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-orange-500 blur-3xl opacity-20 rounded-full" />
                                    <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                                        <CreditCard className="h-10 w-10 text-orange-500" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Billing & Plans</h2>
                                    <p className="text-slate-400 max-w-md mx-auto">
                                        You are currently on the <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">Free Plan</span>. Upgrade to unlock premium features.
                                    </p>
                                </div>
                                <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all hover:scale-105 active:scale-95">
                                    View Upgrade Options
                                </button>
                            </div>
                        )}

                        {activeTab === "Notifications" && (
                            <div className="p-12 flex flex-col items-center justify-center text-center space-y-8 min-h-[400px]">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full" />
                                    <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                                        <Bell className="h-10 w-10 text-blue-500" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Notification Preferences</h2>
                                    <p className="text-slate-400 max-w-md mx-auto">
                                        Manage how you receive updates about your streaks, interview results, and platform announcements.
                                    </p>
                                </div>
                                <div className="w-full max-w-md space-y-3">
                                    {["Email Notifications", "Push Notifications", "Marketing Emails"].map((label, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                            <div className="text-left">
                                                <p className="font-bold text-slate-200">{label}</p>
                                                <p className="text-xs text-slate-500">Receive updates via {label.split(" ")[0].toLowerCase()}</p>
                                            </div>
                                            <div className={`h-6 w-11 rounded-full relative cursor-pointer transition-colors ${i === 0 ? "bg-orange-500" : "bg-white/10"}`}>
                                                <div className={`absolute top-1 h-4 w-4 bg-white rounded-full shadow-sm transition-all ${i === 0 ? "right-1" : "left-1"}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </DashboardPage>
    );
}
