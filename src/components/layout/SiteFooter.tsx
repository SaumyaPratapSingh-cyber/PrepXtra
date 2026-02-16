import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Twitter, Github, Linkedin, Instagram } from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="bg-[#050505] border-t border-white/10 pt-24 pb-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-900/20 rounded-[100%] blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white text-xl">P</div>
                            <span className="text-xl font-bold text-white tracking-tight">PrepXtra</span>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            The definitive platform for engineering interviews. Master System Design, DSA, and Full Stack development with AI-driven tools.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                                <div key={i} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                                    <Icon className="h-5 w-5" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6">Platform</h3>
                        <ul className="space-y-4">
                            {['Roadmaps', 'AI Interviewer', 'Problem Solver', 'Mock Tests', 'Company Archives'].map(link => (
                                <li key={link}>
                                    <Link href="#" className="text-slate-400 hover:text-orange-500 transition-colors">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6">Resources</h3>
                        <ul className="space-y-4">
                            {['System Design Guide', 'DSA Sheets', 'Behavioral Questions', 'Salary Negotiation', 'Blog'].map(link => (
                                <li key={link}>
                                    <Link href="#" className="text-slate-400 hover:text-orange-500 transition-colors">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6">Stay Updated</h3>
                        <p className="text-slate-400 mb-4 text-sm">Join our newsletter for daily coding challenges and tips.</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 w-full" />
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Join</Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">© 2026 PrepXtra Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="text-slate-500 hover:text-white text-sm">Privacy Policy</Link>
                        <Link href="#" className="text-slate-500 hover:text-white text-sm">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
