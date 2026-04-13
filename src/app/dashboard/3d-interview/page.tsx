"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
    Mic, MicOff, Video, VideoOff, PhoneOff,
    Activity, Gauge, History, ChevronRight,
    Maximize2, Minimize2, Settings2, Volume2, Sparkles, Send, Loader2, Keyboard, RefreshCcw, Power, Play, AlertTriangle, FileText, CheckCircle, BarChart, X
} from "lucide-react";

export default function ThreeDInterviewPage() {
    const router = useRouter();

    // --- STATE ---
    // status: setup -> start -> idle/listening/speaking -> processing -> finished
    const [status, setStatus] = useState<"setup" | "start" | "idle" | "listening" | "speaking" | "processing" | "finished">("setup");

    // Setup Data
    const [role, setRole] = useState("Full Stack Developer");
    const [domain, setDomain] = useState("Web Development");

    // Session Data
    const [questionCount, setQuestionCount] = useState(0);
    const MAX_QUESTIONS = 4;
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [transcript, setTranscript] = useState("");
    const [interimTranscript, setInterimTranscript] = useState("");
    const [history, setHistory] = useState<{ question: string; answer: string }[]>([]);

    // Metrics
    const [confidence, setConfidence] = useState(100);
    const [fillerWordCount, setFillerWordCount] = useState(0);
    const [volume, setVolume] = useState(0);

    // Media
    const [isCamOpen, setIsCamOpen] = useState(false);
    const [isMicOpen, setIsMicOpen] = useState(false);
    const [showTextFallback, setShowTextFallback] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Final Report Data
    const [reportData, setReportData] = useState<any>(null);
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);

    // --- REFS ---
    const videoRef = useRef<HTMLVideoElement>(null);
    const recognitionRef = useRef<any>(null);
    const isSpeakingRef = useRef(false);
    const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null); // To prevent GC

    // ... (rest of code)

    // --- LOGIC: TTS (Improved) ---
    const speak = (text: string) => {
        if (!text) return;
        try {
            // Priority 1: STOP ANY ONGOING LISTENING IMMEDIATELY
            stopListening();

            // Priority 2: CANCEL ANY CURRENT SPEECH
            window.speechSynthesis.cancel();

            // Small delay to ensure browser speech engine and audio tracks reset
            setTimeout(() => {
                const cleanText = text.replace(/[*_#`]/g, "");
                const u = new SpeechSynthesisUtterance(cleanText);
                utteranceRef.current = u;

                const voices = window.speechSynthesis.getVoices();
                const maleVoice = voices.find(v => (v.name.includes("Male") || v.name.includes("David") || v.name.includes("Mark") || v.name.includes("Guy")) && v.lang.includes("en"));
                const naturalVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Natural"));

                if (maleVoice) u.voice = maleVoice;
                else if (naturalVoice) u.voice = naturalVoice;

                u.rate = 1.0;
                u.pitch = 0.85;
                u.volume = 1.0;

                u.onstart = () => {
                    console.log("[TTS] Started:", cleanText);
                    setStatus("speaking");
                    isSpeakingRef.current = true;
                };

                u.onend = () => {
                    console.log("[TTS] Finished. Preparing to listen...");
                    isSpeakingRef.current = false;
                    // GIVE THE AUDIO ENGINE A MOMENT TO BREATHE
                    setTimeout(() => {
                        if (status !== 'finished') {
                            setStatus("listening");
                        }
                    }, 400);
                    utteranceRef.current = null;
                };

                u.onerror = (e) => {
                    console.error("[TTS] Error:", e);
                    isSpeakingRef.current = false;
                    setStatus("listening");
                    utteranceRef.current = null;
                };

                window.speechSynthesis.speak(u);
            }, 100);

        } catch (e) {
            console.error("TTS System Error", e);
            setStatus("listening");
        }
    };
    const startWebcam = useCallback(async () => {
        if (status === 'setup' || status === 'finished') return;

        try {
            console.log("Requesting media permissions...");
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: 640 }, height: { ideal: 360 }, facingMode: "user" },
                audio: true
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                // Explicitly play to avoid autoplay blockers
                videoRef.current.play().catch(e => console.error("Video play error", e));
            }

            setIsCamOpen(true);
            setIsMicOpen(true);
            setErrorMsg(null);
        } catch (err: any) {
            console.error("Webcam/Mic Error:", err);
            setIsCamOpen(false);
            if (err.name === 'NotAllowedError') {
                setErrorMsg("Access Denied: Please allow camera/microphone permissions in your browser settings.");
            } else if (err.name === 'NotFoundError') {
                setErrorMsg("No camera/microphone found.");
            } else {
                setErrorMsg("Media Error: " + err.message);
            }
        }
    }, [status]);

    useEffect(() => {
        startWebcam();
        return () => {
            // Cleanup on unmount only
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [status, startWebcam]);

    // --- LOGIC: Session Control ---
    const handleStartSession = () => {
        setIsMicOpen(true);
        startWebcam();
        setQuestionCount(1);
        setStatus("speaking");
        const initialQ = `Welcome. I see you're applying for the ${role} position in ${domain}. To start, could you describe a significant project you've worked on recently?`;
        setCurrentQuestion(initialQ);
        speak(initialQ);
    };

    // --- LOGIC: Submit Answer & Analyze ---
    const handleSubmit = async () => {
        const fullAnswer = (transcript + " " + interimTranscript).trim();
        console.log(`[Interview] Submitting answer. Count: ${questionCount}/${MAX_QUESTIONS}`);

        if (!fullAnswer && !showTextFallback) return;

        stopListening();
        setStatus("processing");
        // Clear question box while processing for better visual feedback
        setCurrentQuestion("Analyzing your response...");

        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

        // Filler words are now tracked in real-time in onresult
        // But we double check the final combined transcript for any missed ones
        const currentAnswerFillers = (fullAnswer.match(/\b(um|uh|like|you know|sort of|actually|basically|i mean)\b/gi) || []).length;

        // Commit Answer
        setTranscript("");
        setInterimTranscript("");
        const newHistory = [...history, { question: currentQuestion, answer: fullAnswer || "[No Answer / Skipped]" }];
        setHistory(newHistory);

        // Check if Interview Finished
        if (questionCount >= MAX_QUESTIONS) {
            console.log("[Interview] Termination Limit Reached. Ending.");
            await generateFinalReport(newHistory);
            return;
        }

        // Get Next Question
        try {
            const r = await axios.post("/api/interview/analyze", {
                role,
                question: currentQuestion,
                userAnswer: fullAnswer,
                history: newHistory
            });

            const data = r.data;
            if (data.isFollowUp && questionCount < MAX_QUESTIONS) {
                const nextQCount = questionCount + 1;
                console.log(`[Interview] AI suggested follow-up. Moving to Q${nextQCount}`);
                setQuestionCount(nextQCount);
                setCurrentQuestion(data.nextQuestion);
                speak(data.nextQuestion);
            } else {
                console.log("[Interview] AI ended follow-up or limit reached. Generating report.");
                await generateFinalReport(newHistory);
            }
            setConfidence(prev => Math.max(20, Math.min(100, prev - (currentAnswerFillers * 2) + 5)));
        } catch (e) {
            console.error(e);
            setStatus("listening");
            const retryMsg = "I didn't quite catch that. Could you repeat?";
            setCurrentQuestion(retryMsg);
            speak(retryMsg);
        }
    };

    const generateFinalReport = async (finalHistory: any[]) => {
        setIsGeneratingReport(true);
        setStatus("finished");

        try {
            const r = await axios.post("/api/interview/analyze", {
                role,
                history: finalHistory,
                type: "report"
            });
            setReportData(r.data);
        } catch (e) {
            console.error("Report Generation Failed", e);
            setReportData({ error: "Failed to generate report." });
        } finally {
            setIsGeneratingReport(false);
        }
    };

    // --- LOGIC: Speech Recognition (Continuous) ---
    const startListening = useCallback(() => {
        if (typeof window === 'undefined') return;

        // Checking window type directly for robustness
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setErrorMsg("Your browser does not support Speech Recognition. Please use Chrome/Edge.");
            setShowTextFallback(true);
            return;
        }

        if (recognitionRef.current) return;

        try {
            console.log("[Mic] Starting recognition...");
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                console.log("[Mic] Active and listening.");
                if (status !== 'processing' && status !== 'finished') {
                    setStatus("listening");
                }
            };

            recognition.onend = () => {
                console.log("[Mic] Stopped.");
                recognitionRef.current = null;
                // Auto-restart if we are still supposed to be listening
                if (status === 'listening' && !isSpeakingRef.current) {
                    console.log("[Mic] Auto-restarting...");
                    setTimeout(startListening, 100);
                }
            };

            recognition.onresult = (event: any) => {
                let final = "";
                let interim = "";

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        const chunk = event.results[i][0].transcript.toLowerCase();
                        final += chunk;

                        // REAL-TIME FILLER & FUMBLE DETECTION
                        const fillers = (chunk.match(/\b(um|uh|like|you know|sort of|actually|basically|i mean)\b/gi) || []).length;
                        if (fillers > 0) {
                            setFillerWordCount(prev => prev + fillers);
                            setConfidence(prev => Math.max(15, prev - (fillers * 4))); // Immediate penalty
                        } else if (chunk.trim().length > 10) {
                            // Reward clear speech segments
                            setConfidence(prev => Math.min(100, prev + 2));
                        }
                    } else {
                        interim += event.results[i][0].transcript;
                    }
                }

                if (final) {
                    setTranscript(prev => `${prev} ${final}`);
                    // Silence timer logic
                    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
                    silenceTimerRef.current = setTimeout(() => {
                        handleSubmit();
                    }, 4000);
                }
                setInterimTranscript(interim);
                setVolume(Math.random() * 0.5 + 0.2);
            };

            recognition.onerror = (event: any) => {
                console.warn("Speech recognition warning/error", event.error);
                if (event.error === 'not-allowed') {
                    setErrorMsg("Microphone blocked. Please check permissions.");
                    setIsMicOpen(false);
                }
                // Ignore 'no-speech' errors as they just mean silence
            };

            recognitionRef.current = recognition;
            recognition.start();
        } catch (e) {
            console.error("Speech Init Error", e);
            setErrorMsg("Speech Engine Failed.");
        }
    }, [status]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
        }
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    }, []);

    useEffect(() => {
        if (status === 'listening' && isMicOpen) {
            startListening();
        } else {
            stopListening();
        }
    }, [status, isMicOpen, startListening, stopListening]);

    // --- LOGIC: TTS ---


    const toggleMic = () => {
        setIsMicOpen(!isMicOpen);
        if (!isMicOpen) {
            startWebcam(); // Ensure permissions are fresh
            setStatus("listening");
        }
        // If turning off, handled by useEffect dependency
    };

    return (
        <div className="fixed inset-0 bg-[#050505] text-white flex overflow-hidden z-[100] font-sans selection:bg-indigo-500/30">
            {/* LEFT SIDE: PHOTOREALISTIC AVATAR */}
            <div className="hidden md:flex md:w-[50%] lg:w-[55%] relative border-r border-white/10 bg-gradient-to-b from-[#1a1a2e] via-[#16162a] to-[#0a0a15] items-center justify-center overflow-hidden">
                {/* Ambient background glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full transition-all duration-1000 ${status === 'speaking' ? 'bg-indigo-500/15 scale-110' : 'bg-indigo-500/5 scale-100'}`} style={{ filter: 'blur(100px)' }} />
                </div>

                {/* Avatar Image Container */}
                <div className="relative z-10 flex flex-col items-center">
                    {/* Speaking ring indicator */}
                    <div className={`relative rounded-full p-1.5 transition-all duration-700 ${status === 'speaking' ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.4)]' : status === 'listening' ? 'bg-gradient-to-r from-emerald-500/50 via-emerald-600/50 to-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-white/10'}`}>
                        <div className="relative overflow-hidden rounded-full bg-[#0f0f1a]">
                            <img
                                src="/models/interviewer-photo.png"
                                alt="AI Interviewer"
                                className="w-56 h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 object-cover object-top rounded-full"
                                style={{
                                    animation: status === 'speaking'
                                        ? 'subtle-breathe 3s ease-in-out infinite'
                                        : 'subtle-idle 5s ease-in-out infinite',
                                }}
                            />
                            {/* Speaking overlay pulse */}
                            {status === 'speaking' && (
                                <div className="absolute inset-0 rounded-full border-2 border-indigo-400/30 animate-ping" style={{ animationDuration: '2s' }} />
                            )}
                        </div>
                    </div>

                    {/* Name & Status */}
                    <div className="mt-6 text-center">
                        <h3 className="text-lg font-bold text-white tracking-wide">AI Interviewer</h3>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <span className={`w-2 h-2 rounded-full ${status === 'speaking' ? 'bg-indigo-500 animate-pulse' : status === 'listening' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
                                {status === 'speaking' ? 'Speaking' : status === 'listening' ? 'Listening' : status === 'processing' ? 'Thinking...' : 'Ready'}
                            </span>
                        </div>
                    </div>

                    {/* Audio Visualizer when speaking */}
                    {status === 'speaking' && (
                        <div className="flex items-end gap-1 mt-4 h-6">
                            {[...Array(7)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1 bg-indigo-400/60 rounded-full"
                                    style={{
                                        animation: `audio-bar 0.6s ease-in-out infinite alternate`,
                                        animationDelay: `${i * 0.08}s`,
                                        height: '4px',
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Live Badge */}
                {(status !== 'setup' && status !== 'finished') && (
                    <div className="absolute top-6 left-6 flex items-center gap-2 z-10 pointer-events-none">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur border border-red-500/30 text-red-400 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE
                        </span>
                    </div>
                )}

                {/* CSS Animations */}
                <style jsx>{`
                    @keyframes subtle-breathe {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.015); }
                    }
                    @keyframes subtle-idle {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.005); }
                    }
                    @keyframes audio-bar {
                        from { height: 4px; }
                        to { height: 20px; }
                    }
                `}</style>
            </div>

            {/* RIGHT SIDE: UI PANELS */}
            <div className="w-full md:w-[50%] lg:w-[45%] flex flex-col relative z-20 bg-[#0a0a0a]">
                
                 {/* ERROR TOAST */}
                <AnimatePresence>
                    {errorMsg && (
                        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} className="absolute top-4 left-1/2 -translate-x-1/2 z-[200] bg-red-500/90 text-white px-6 py-3 rounded-full shadow-lg border border-red-400 backdrop-blur-md flex items-center gap-3">
                            <AlertTriangle size={18} />
                            <span className="text-sm font-bold">{errorMsg}</span>
                            <button onClick={() => { setErrorMsg(null); startWebcam(); }} className="ml-2 bg-white/20 p-1 rounded-full hover:bg-white/30"><RefreshCcw size={14} /></button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* HEADER */}
                {(status !== 'setup' && status !== 'finished') && (
                    <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-black/40">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                                <span className="text-indigo-500">AI</span> INTERVIEW
                            </h1>
                            <div className="text-xs font-medium text-slate-400">
                                Question {questionCount} of {MAX_QUESTIONS}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden lg:flex flex-col items-end gap-1 bg-white/5 border border-white/10 p-3 rounded-2xl">
                                <div className="flex items-center gap-2 mb-1">
                                    <Gauge size={14} className="text-indigo-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confidence</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Activity size={12} className={confidence > 80 ? 'text-emerald-500' : 'text-amber-500'} />
                                    <span className={`text-xl font-black ${confidence > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{Math.round(confidence)}%</span>
                                </div>
                                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                                    <div className={`h-full transition-all duration-500 ${confidence > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${confidence}%` }} />
                                </div>
                            </div>

                            <button onClick={() => router.push('/dashboard')} className="p-3 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-full transition-all border border-white/5">
                                <Power size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* SETUP SCREEN */}
                <AnimatePresence>
                    {status === 'setup' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-8">
                            <div className="max-w-md w-full space-y-8 bg-[#111] p-8 rounded-3xl border border-white/10 shadow-2xl">
                                <div className="space-y-2 text-center">
                                    <h1 className="text-3xl font-black tracking-tight text-white">Interview Setup</h1>
                                    <p className="text-slate-400">Configure your session parameters.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Target Role</label>
                                        <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Domain / Focus</label>
                                        <input value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                                    </div>
                                </div>
                                <button onClick={() => setStatus("start")} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/25">
                                    Continue to Audio Check
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* START SCREEN */}
                <AnimatePresence>
                    {status === 'start' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-[#0a0a0a] flex items-center justify-center p-8 text-center">
                            <div className="max-w-md space-y-8">
                                <h1 className="text-4xl font-black tracking-tight text-white">Ready?</h1>
                                <div className="flex flex-col gap-4">
                                    <p className="text-slate-400 text-sm">Please ensure your camera and microphone are allowed.</p>
                                    <button onClick={handleStartSession} className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                                        <Play size={20} /> START INTERVIEW
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* REPORT SCREEN */}
                <AnimatePresence>
                    {status === 'finished' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[60] bg-[#050505] overflow-y-auto p-4 md:p-8">
                            <div className="max-w-4xl mx-auto space-y-8">
                                <div className="flex justify-between items-center bg-[#111] border border-white/10 p-6 rounded-3xl">
                                    <h1 className="text-3xl font-black text-white">Interview Analysis</h1>
                                    <button onClick={() => router.push('/dashboard')} className="p-3 bg-white/5 hover:bg-white/10 rounded-full"><X size={24} /></button>
                                </div>

                                {isGeneratingReport ? (
                                    <div className="h-64 flex flex-col items-center justify-center gap-4 text-slate-400 mt-20">
                                        <Loader2 className="animate-spin text-indigo-500" size={48} />
                                        <p className="text-lg">Compiling comprehensive technical report...</p>
                                    </div>
                                ) : reportData ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* SCORE CARD */}
                                        <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-white/10 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
                                            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center bg-black/40 rounded-full border-4 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                                                <span className="text-4xl font-black text-white">{reportData.score || 0}%</span>
                                            </div>
                                            <div className="flex-1 space-y-3 text-center md:text-left z-10">
                                                <h2 className="text-2xl font-bold text-white">Overall Performance</h2>
                                                <p className="text-slate-300 text-lg leading-relaxed">{reportData.feedback}</p>
                                            </div>
                                        </div>

                                        {/* METRICS GRID */}
                                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"><Activity size={16} /> Metrics</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex flex-col justify-center">
                                                    <p className="text-xs text-slate-400 mb-1">Filler Words</p>
                                                    <p className="text-2xl font-black text-amber-400">{fillerWordCount}</p>
                                                </div>
                                                <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex flex-col justify-center">
                                                    <p className="text-xs text-slate-400 mb-1">Final Confidence</p>
                                                    <p className="text-2xl font-black text-emerald-400">{Math.round(confidence)}%</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"><BarChart size={16} /> Key Strengths</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {(reportData.strengths || ["Technical Depth", "Clarity", "Confidence"]).map((s: string) => (
                                                    <span key={s} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/20">{s}</span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Q&A HISTORY */}
                                        <div className="col-span-1 md:col-span-2 space-y-4 mt-4">
                                            <h3 className="text-xl font-bold text-white flex items-center gap-2"><History size={20} className="text-indigo-400" /> Interview Transcript</h3>
                                            <div className="space-y-4 text-justify">
                                                {history.map((item, idx) => (
                                                    <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-4">
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-1">Q{idx + 1}</div>
                                                            <p className="text-slate-200 font-medium text-lg italic">"{item.question}"</p>
                                                        </div>
                                                        <div className="pl-[3.25rem] flex items-start gap-4">
                                                            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-1">A</div>
                                                            <p className="text-slate-400 leading-relaxed text-[15px]">{item.answer}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <button onClick={() => router.push('/dashboard')} className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold md:col-span-2 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 text-lg">
                                            Return to Dashboard <ChevronRight size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center text-red-400 mt-20">Failed to load report.</div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* MIDDLE: CONVERSATION BOX */}
                {(status === 'listening' || status === 'speaking' || status === 'processing' || status === 'idle') && (
                    <div className="flex-1 flex flex-col justify-center p-8 overflow-y-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-[#141414] border border-white/5 p-8 rounded-[2rem] shadow-xl relative"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="p-3 bg-indigo-500/10 rounded-2xl shrink-0 mt-1">
                                        <Sparkles size={24} className="text-indigo-400" />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-xl md:text-[22px] font-medium leading-[1.6] text-slate-100">"{currentQuestion}"</h2>
                                        <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest inline-block px-3 py-1 bg-indigo-500/10 rounded-md">
                                            {status === 'speaking' ? 'Interviewer Speaking...' : 'Awaiting Response'}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

                {/* BOTTOM: INPUT & WEBCAM */}
                {(status === 'listening' || status === 'speaking' || status === 'processing' || status === 'idle') && (
                    <div className="p-6 md:p-8 border-t border-white/5 bg-[#0e0e0e] flex flex-col gap-6 shrink-0 z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                        
                        {/* Status Area */}
                        <div className="flex items-center gap-4 px-2">
                            <div className="relative w-28 md:w-36 aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shrink-0">
                                <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
                                {errorMsg && <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-[10px] text-red-500 text-center p-1 font-bold">{errorMsg}</div>}
                                {!isCamOpen && !errorMsg && <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center">Cam Off</div>}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                    {status === 'listening' && <><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Listening to your mic...</>}
                                    {status === 'processing' && <><Loader2 className="animate-spin text-indigo-400" size={14} /> Processing answer...</>}
                                    {status === 'speaking' && <span className="text-indigo-400 font-bold">Interviewer is talking...</span>}
                                </p>
                            </div>
                        </div>

                        {/* Input Control Bar */}
                        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-2 flex gap-3 items-center">
                            {showTextFallback ? (
                                <input
                                    autoFocus
                                    value={interimTranscript ? `${transcript} ${interimTranscript}` : transcript}
                                    onChange={(e) => setTranscript(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-[15px] text-white placeholder:text-slate-500 px-4 font-medium"
                                    placeholder="Type your answer manually..."
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                />
                            ) : (
                                <div className="flex-1 px-4 text-slate-400 text-[15px] font-medium cursor-text truncate" onClick={() => setShowTextFallback(true)}>
                                    {(transcript || interimTranscript) ? `${transcript} ${interimTranscript}` : "Click here to type, or speak into mic..."}
                                </div>
                            )}

                            <div className="flex items-center gap-2 shrink-0 border-l border-white/10 pl-3">
                                <button onClick={() => setShowTextFallback(!showTextFallback)} className="p-3 hover:bg-white/10 rounded-xl text-slate-400 transition-colors" title="Toggle Keyboard">
                                    <Keyboard size={18} />
                                </button>
                                <button onClick={toggleMic} title="Toggle Mic" className={`p-3 rounded-xl transition-all ${isMicOpen ? 'bg-red-500/10 text-red-500' : 'bg-slate-800 text-slate-400'}`}>
                                    {isMicOpen ? <Mic size={18} /> : <MicOff size={18} />}
                                </button>
                                <button
                                    onClick={() => { generateFinalReport(history); }}
                                    disabled={status === 'processing' || (status as string) === 'finished'}
                                    className="p-3 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-xl transition-all disabled:opacity-50 hidden md:flex items-center gap-2"
                                    title="End Session Early"
                                >
                                    <PhoneOff size={18} /> 
                                </button>
                                <button
                                    onClick={() => handleSubmit()}
                                    disabled={status === 'processing' || (!transcript && !interimTranscript && showTextFallback === false)}
                                    className="p-3 px-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 font-bold focus:ring border focus:border-indigo-400"
                                >
                                    Send <Send size={16} />
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
