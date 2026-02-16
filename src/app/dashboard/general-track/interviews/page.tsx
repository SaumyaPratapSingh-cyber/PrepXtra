"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MessageCircle, Brain, User, Bot, AlertCircle, Info, Mic, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";

export default function AIInterviewPage() {
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
        {
            role: "ai",
            content: "Welcome to your AI-powered technical evaluation. I've analyzed your background and the target role. We'll start by exploring your architectural decisions in previous projects. Ready to begin?"
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await axios.post("/api/ai-interview", {
                messages: [...messages, { role: "user", content: userMessage }]
            });

            setMessages(prev => [...prev, {
                role: "ai",
                content: response.data.message || "That's a structured response. Following up on that, how would you handle horizontal scaling for this particular component?"
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: "ai",
                content: "Interesting perspective. Moving forward, could you describe a situation where you had to debug a complex production issue under tight deadlines?"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col bg-black overflow-hidden">
            {/* Header */}
            <header className="px-6 py-4 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-white transition-all border border-transparent hover:border-white/5 md:hidden"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                                <Brain className="h-5 w-5 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-[#0a0a0a] animate-pulse" />
                        </div>
                        <div>
                            <h1 className="text-sm font-black text-white leading-none mb-1">AI Technical Lead</h1>
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Session</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Session Duration</span>
                        <span className="text-xs font-mono text-white">12:45</span>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 custom-scrollbar bg-[#0a0a0a]"
            >
                <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
                    {/* Guidance Note */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex gap-4 items-start"
                    >
                        <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-400 leading-relaxed">
                            <span className="text-orange-400 font-bold uppercase tracking-widest text-[9px] block mb-1">Interview Tip</span>
                            Focus on the behavioral aspects of your project decisions. Explain the "Why" behind your technical choices. Use the STAR method for behavioral questions.
                        </p>
                    </motion.div>

                    <AnimatePresence initial={false}>
                        {messages.map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "flex gap-4 group",
                                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                                )}
                            >
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105",
                                    message.role === "ai" ? "bg-white/5 border border-white/10 text-purple-400" : "bg-orange-500/10 border border-orange-500/20 text-orange-500"
                                )}>
                                    {message.role === "ai" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                                </div>

                                <div className={cn(
                                    "max-w-[85%] md:max-w-[70%] p-5 rounded-2xl shadow-lg relative",
                                    message.role === "user"
                                        ? "bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-tr-none"
                                        : "bg-[#111] border border-white/5 text-slate-300 rounded-tl-none font-light"
                                )}>
                                    {message.role === "ai" && (
                                        <div className="absolute -top-3 left-4 px-2 py-1 rounded bg-[#111] border border-white/10 text-[9px] font-black text-purple-400 uppercase tracking-widest">
                                            Analyst
                                        </div>
                                    )}
                                    <p className="text-[14px] leading-relaxed whitespace-pre-line tracking-wide">
                                        {message.content}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-4"
                        >
                            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400">
                                <Bot className="h-5 w-5" />
                            </div>
                            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl rounded-tl-none">
                                <div className="flex gap-1.5 items-center">
                                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-2">Evaluating Response...</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Input Controller */}
            <div className="bg-[#0a0a0a] border-t border-white/5 p-4 md:p-6 pb-8 md:pb-10 relative">
                <div className="max-w-4xl mx-auto flex items-end gap-4 relative">
                    <div className="flex-1 relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Detail your experience or project decisions..."
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 pr-12 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/5 transition-all resize-none min-h-[60px] max-h-[200px] font-light"
                            rows={1}
                        />
                        <button className="absolute right-3 bottom-3 p-2 rounded-lg text-slate-500 hover:text-white transition-colors">
                            <Mic className="h-4 w-4" />
                        </button>
                    </div>

                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] flex-shrink-0 flex items-center justify-center transition-all disabled:opacity-30 disabled:grayscale disabled:hover:shadow-none translate-y-[-2px]"
                    >
                        <Send className="h-5 w-5 text-white transform group-hover:translate-x-1" />
                    </button>
                    <div className="absolute -top-6 left-4 flex gap-4 text-[9px] font-black text-slate-600 uppercase tracking-tighter">
                        <span>Enter to Transmit</span>
                        <span className="md:inline hidden opacity-30">•</span>
                        <span className="md:inline hidden">Shift+Enter for multi-line logic</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
