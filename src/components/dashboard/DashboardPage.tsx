import { ReactNode } from "react";

interface DashboardPageProps {
    children: ReactNode;
    className?: string;
}

export function DashboardPage({ children, className }: DashboardPageProps) {
    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar">
            <div className={`flex-1 p-4 md:p-8 ${className || ""}`}>
                {children}
            </div>
            <footer className="border-t border-white/5 py-6 px-8 text-center text-slate-600 text-xs mt-auto">
                <p>&copy; 2026 PrepXtra. Crafted for Engineers.</p>
            </footer>
        </div>
    );
}
