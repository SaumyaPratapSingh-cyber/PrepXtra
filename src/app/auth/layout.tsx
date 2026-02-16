import { AuthBackground } from "@/components/auth/AuthBackground";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen relative flex items-center justify-center p-4">
            <AuthBackground />

            {/* Back to Home Button */}
            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group z-50 transform hover:-translate-x-1 duration-300"
            >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back to Home</span>
            </Link>

            <div className="w-full max-w-5xl relative z-10 perspective-[1000px]">
                {children}
            </div>

            <div className="absolute bottom-4 text-center w-full text-slate-600 text-xs">
                &copy; 2026 PrepXtra. Secure Access.
            </div>
        </div>
    );
}
