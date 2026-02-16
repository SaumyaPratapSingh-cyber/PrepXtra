"use client";

import { motion } from "framer-motion";
import {
  Upload,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Trophy,
  Flame,
  Target,
  Code2,
  Map,
  Brain,
  GraduationCap,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DashboardPage } from "@/components/dashboard/DashboardPage";
import { cn } from "@/lib/utils";

export default function DashboardHome() {
  const router = useRouter();
  const [user, setUser] = useState<{ fullName: string; selectedTrack?: string } | null>(null);
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/profile");
        if (res.data.data) setUser(res.data.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, []);

  const handleTrackSelect = async (track: string) => {
    try {
      await axios.put("/api/user/profile", { selectedTrack: track });

      if (track === "resume-based") {
        router.push("/dashboard/resume-track/upload");
      } else {
        router.push("/dashboard/general-track");
      }
    } catch (error) {
      console.error("Failed to save track selection", error);
    }
  };

  const tracks = [
    {
      id: "resume-based",
      title: "Resume-Based Prep",
      subtitle: "Personalized & Company-Specific",
      description:
        "Upload your resume and get a tailored preparation plan for your target company with curated DSA, personalized roadmaps, and AI mock interviews.",
      icon: Upload,
      gradient: "from-orange-500 to-red-600",
      glowColor: "orange",
      features: [
        "AI Resume Analysis",
        "Company-Specific DSA Sheet",
        "Personalized Tech Roadmap",
        "3D AI Mock Interview",
      ],
    },
    {
      id: "general",
      title: "General Practice",
      subtitle: "Comprehensive & Self-Paced",
      description:
        "Access the complete platform with full DSA sheets, roadmap.sh integration, core subjects, quizzes, and a 3-round assessment system.",
      icon: BookOpen,
      gradient: "from-blue-500 to-purple-600",
      glowColor: "blue",
      features: [
        "500+ DSA Problems with IDE",
        "Roadmap.sh Integration",
        "Role/Company-Based AI Interviews",
        "Core Subjects (OS, DBMS, CN)",
      ],
    },
  ];

  const quickActions = [
    {
      label: "3D Mock Interview",
      description: "Voice-based AI rounds",
      icon: Sparkles,
      route: "/dashboard/3d-interview",
      gradient: "from-indigo-500 to-purple-600",
      isNew: true,
    },
    {
      label: "DSA Practice",
      description: "Solve curated problems",
      icon: Code2,
      route: "/dashboard/general-track/dsa",
      gradient: "from-orange-500 to-red-500",
    },
    {
      label: "Tech Roadmaps",
      description: "Explore learning paths",
      icon: Map,
      route: "/dashboard/general-track/roadmaps",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      label: "AI Interviews",
      description: "3D Voice Mock Rounds",
      icon: Brain,
      route: "/dashboard/3d-interview",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      label: "Core Subjects",
      description: "OS, DBMS, CN & more",
      icon: GraduationCap,
      route: "/dashboard/core-subjects",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <DashboardPage>
      <div className="space-y-10">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Dashboard Online
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                Welcome back,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  {user?.fullName?.split(" ")[0] || "Scholar"}
                </span>
                !
              </h1>
              <p className="text-slate-400 font-light max-w-lg">
                Pick up where you left off or start a new challenge. Your journey to mastery continues here.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/dashboard/general-track")}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-shadow flex items-center gap-2"
            >
              <Zap className="h-4 w-4 fill-white" />
              Resume Learning
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <StatsCard
            title="Daily Streak"
            value="0 Days"
            icon={Flame}
            trend={{ value: 0, label: "start today" }}
            delay={100}
          />
          <StatsCard
            title="Problems Solved"
            value="0"
            icon={CheckCircle2}
            trend={{ value: 0, label: "this week" }}
            delay={200}
          />
          <StatsCard
            title="Global Rank"
            value="—"
            icon={Trophy}
            trend={{ value: 0, label: "unranked" }}
            delay={300}
          />
        </div>

        {/* Quick Actions Grid */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <h2 className="text-sm font-black text-white uppercase tracking-[0.15em]">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 + 0.3 }}
                onClick={() => router.push(action.route)}
                className="group cursor-pointer relative p-5 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden"
              >
                <div
                  className={cn(
                    "absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br opacity-0 group-hover:opacity-10 blur-2xl rounded-full transition-opacity duration-500 pointer-events-none",
                    action.gradient
                  )}
                />
                <div
                  className={cn(
                    "h-10 w-10 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300",
                    action.gradient
                  )}
                >
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                    {action.label}
                  </h3>
                  {(action as any).isNew && (
                    <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-indigo-500 text-white uppercase tracking-tighter">
                      New
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">{action.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Track Selection — Full Width */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Target className="h-4 w-4 text-orange-500" />
            <h2 className="text-sm font-black text-white uppercase tracking-[0.15em]">
              Your Learning Path
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.5 }}
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredTrack(track.id)}
                onMouseLeave={() => setHoveredTrack(null)}
                onClick={() => handleTrackSelect(track.id)}
              >
                <div
                  className={cn(
                    "relative p-[1px] rounded-3xl transition-all duration-500",
                    track.id === user?.selectedTrack || hoveredTrack === track.id
                      ? `bg-gradient-to-r ${track.gradient}`
                      : "bg-white/5"
                  )}
                >
                  <div className="bg-[#0a0a0a] rounded-[23px] p-6 md:p-8 h-full relative overflow-hidden">
                    {/* Background Glow */}
                    <div
                      className={cn(
                        "absolute top-0 right-0 w-72 h-72 bg-gradient-to-br opacity-0 group-hover:opacity-[0.07] blur-[100px] rounded-full pointer-events-none transition-opacity duration-700",
                        track.gradient
                      )}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start gap-5 mb-5">
                        <div
                          className={cn(
                            "h-14 w-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300",
                            track.gradient
                          )}
                        >
                          <track.icon className="h-7 w-7 text-white" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-white">{track.title}</h3>
                            {track.id === user?.selectedTrack && (
                              <span className="text-[9px] font-black px-2 py-0.5 rounded-lg bg-orange-500/15 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                            {track.subtitle}
                          </p>
                        </div>

                        <div className="h-9 w-9 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300 flex-shrink-0 group-hover:scale-110">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>

                      <p className="text-sm text-slate-400 font-light mb-5 leading-relaxed">
                        {track.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {track.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white/[0.03] text-slate-400 border border-white/5 uppercase tracking-wider"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardPage>
  );
}
