import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        label: string;
    };
    className?: string;
    delay?: number;
}

export function StatsCard({ title, value, icon: Icon, trend, className, delay = 0 }: StatsCardProps) {
    const isPositive = trend && trend.value >= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay / 1000, duration: 0.5 }}
            className={cn(
                "relative group overflow-hidden",
                className
            )}
        >
            <div className="relative p-6 rounded-3xl bg-[#0a0a0a] border border-white/5 group-hover:border-white/10 transition-all duration-300">
                {/* Subtle Background Glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/5 blur-[50px] rounded-full group-hover:bg-orange-500/10 transition-colors pointer-events-none" />

                <div className="flex items-start justify-between mb-5">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-orange-500 group-hover:border-orange-500/20 transition-all transform group-hover:scale-110 duration-500">
                        <Icon className="h-5 w-5" />
                    </div>

                    {trend && (
                        <div className={cn(
                            "flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-xl border",
                            isPositive
                                ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/10"
                                : "bg-rose-500/5 text-rose-500 border-rose-500/10"
                        )}>
                            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse md:inline hidden" />
                            {trend.value > 0 ? "+" : ""}{trend.value}%
                            <span className="opacity-50 ml-1">{trend.label}</span>
                        </div>
                    )}
                </div>

                <div>
                    <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.15em] mb-2">{title}</h3>
                    <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-black text-white tracking-tight leading-none group-hover:text-orange-500 transition-colors">
                            {value}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
