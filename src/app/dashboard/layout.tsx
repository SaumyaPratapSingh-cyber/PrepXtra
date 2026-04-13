"use client";

import { useState, useEffect } from "react"; // Added missing imports
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Added missing import
import { cn } from "@/lib/utils"; // Added missing import
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Cpu,
  User,
  LogOut
} from "lucide-react"; // Added missing icons

const sidebarItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "3D Interview", href: "/dashboard/3d-interview", icon: Cpu },
  { label: "Resume Maker", href: "/dashboard/resume-maker", icon: FileText },
  { label: "Resume Track", href: "/dashboard/resume-track", icon: FileText },
  { label: "General Track", href: "/dashboard/general-track", icon: BookOpen },
  { label: "Core Subjects", href: "/dashboard/core-subjects", icon: Cpu },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ fullName: string; email: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/profile");
        if (res.data.data) setUser(res.data.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          router.push("/auth/login");
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-black text-slate-50 font-sans selection:bg-orange-500/30">

      {/* Desktop Sidebar */}
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-[#0a0a0a] border-r border-white/10 z-50 md:hidden flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
                <span className="text-xl font-bold tracking-tight text-white">PrepXtra</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors",
                        isActive
                          ? "bg-orange-600/10 text-orange-400"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", isActive ? "text-orange-400" : "text-slate-400")} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </div>

              <div className="p-4 border-t border-white/5">
                <button
                  onClick={async () => {
                    await axios.post("/api/auth/logout");
                    window.location.href = "/";
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300 ease-[0.23,1,0.32,1]",
          isCollapsed ? "md:pl-[88px]" : "md:pl-[280px]"
        )}
      >
        <Topbar
          user={user}
          onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
          isCollapsed={isCollapsed}
        />

        <main className="flex-1 pt-16 animate-in fade-in duration-500 overflow-hidden flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
