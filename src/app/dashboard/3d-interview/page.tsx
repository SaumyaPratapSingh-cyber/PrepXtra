"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { Avatar } from "@/components/interview/Avatar";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
    Mic, MicOff, Video, VideoOff, PhoneOff,
    Activity, Gauge, History, ChevronRight,
    Maximize2, Minimize2, Settings2, Volume2, Sparkles, Send, Loader2, Keyboard, RefreshCcw, Power, Play, AlertTriangle, FileText, CheckCircle, BarChart, X
} from "lucide-react";
import { OrbitControls } from "@react-three/drei";

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
        <div className="fixed inset-0 bg-[#050505] text-white overflow-hidden z-[100] font-sans selection:bg-indigo-500/30">
            {/* BACKGROUND */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1a1a1a] to-[#050505]">
                <Canvas camera={{ position: [0, 0, 1.8], fov: 30 }} shadows>
                    <ambientLight intensity={2.5} />
                    <spotLight position={[5, 5, 5]} intensity={3.0} />
                    <pointLight position={[-3, 2, 3]} intensity={2.0} color="#818cf8" />
                    <Suspense fallback={null}>
                        <Avatar isSpeaking={status === 'speaking'} isListening={status === 'listening'} volume={volume} />
                    </Suspense>
                    <OrbitControls target={[0, 0, 0]} enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
                </Canvas>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
            </div>

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

            {/* SETUP SCREEN */}
            <AnimatePresence>
                {status === 'setup' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-8">
                        <div className="max-w-md w-full space-y-8 bg-neutral-900/50 p-8 rounded-3xl border border-white/10 shadow-2xl">
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
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-8 text-center">
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

            {/* REPORT SCREEN - Unchanged from previous mostly */}
            <AnimatePresence>
                {status === 'finished' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[60] bg-[#050505] overflow-y-auto p-4 md:p-8">
                        <div className="max-w-4xl mx-auto space-y-8">
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl font-black text-white">Interview Analysis</h1>
                                <button onClick={() => router.push('/dashboard')} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
                            </div>

                            {isGeneratingReport ? (
                                <div className="h-64 flex flex-col items-center justify-center gap-4 text-slate-400">
                                    <Loader2 className="animate-spin text-indigo-500" size={48} />
                                    <p>Compiling comprehensive report...</p>
                                </div>
                            ) : reportData ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* SCORE CARD */}
                                    <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-white/10 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl overflow-hidden relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative w-32 h-32 flex items-center justify-center bg-black/40 rounded-full border-4 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                                            <span className="text-4xl font-black text-white">{reportData.score || 0}%</span>
                                        </div>
                                        <div className="flex-1 space-y-2 text-center md:text-left relative z-10">
                                            <h2 className="text-2xl font-bold text-white">Overall Performance</h2>
                                            <p className="text-slate-300 text-lg leading-relaxed">{reportData.feedback}</p>
                                        </div>
                                    </div>

                                    {/* METRICS GRID */}
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"><Activity size={16} /> Communication Metrics</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                                                <p className="text-xs text-slate-400 mb-1">Filler Words</p>
                                                <p className="text-2xl font-black text-amber-400">{fillerWordCount}</p>
                                            </div>
                                            <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
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
                                    <div className="col-span-1 md:col-span-2 space-y-4">
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2"><History size={20} className="text-indigo-400" /> Interview Transcript</h3>
                                        <div className="space-y-4">
                                            {history.map((item, idx) => (
                                                <div key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-3">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">Q{idx + 1}</div>
                                                        <p className="text-slate-200 font-medium italic">"{item.question}"</p>
                                                    </div>
                                                    <div className="pl-12 flex items-start gap-4">
                                                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold shrink-0">A</div>
                                                        <p className="text-slate-400 leading-relaxed text-sm">{item.answer}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button onClick={() => router.push('/dashboard')} className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold mt-4 md:col-span-2 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 text-lg">
                                        Return to Dashboard <ChevronRight size={20} />
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center text-red-400">Failed to load report.</div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TOP BAR & GAUGE */}
            {(status !== 'setup' && status !== 'finished') && (
                <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-start z-10 pointer-events-none">
                    <div className="flex flex-col gap-1 pointer-events-auto">
                        <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
                            <span className="text-indigo-500">AI</span> INTERVIEW
                        </h1>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                            Question {questionCount} of {MAX_QUESTIONS}
                        </div>
                    </div>

                    <div className="flex items-start gap-4 pointer-events-auto">
                        <div className="hidden md:flex flex-col items-end gap-1 bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-2xl">
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

                        <button onClick={() => router.push('/dashboard')} className="p-3 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-full transition-all border border-white/5 backdrop-blur-md">
                            <Power size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* MAIN INTERFACE */}
            {(status === 'listening' || status === 'speaking' || status === 'processing' || status === 'idle') && (
                <div className="absolute inset-0 z-10 flex flex-col justify-end pb-8 px-8 md:px-16 pointer-events-none">
                    <div className="w-full max-w-4xl mx-auto mb-8 pointer-events-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-indigo-500/10 rounded-2xl shrink-0">
                                        <Sparkles size={20} className="text-indigo-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-lg md:text-2xl font-medium leading-relaxed text-slate-100">"{currentQuestion}"</h2>
                                        <div className="flex items-center gap-3">
                                            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{status === 'speaking' ? 'Interviewer Speaking...' : 'Awaiting Response'}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="w-full max-w-4xl mx-auto flex items-end gap-6 pointer-events-auto">
                        <div className="flex-1 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-4 flex gap-4 items-center shadow-lg relative group transition-colors hover:border-white/20">
                            {showTextFallback ? (
                                <input
                                    autoFocus
                                    value={interimTranscript ? `${transcript} ${interimTranscript}` : transcript}
                                    onChange={(e) => setTranscript(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-base text-white placeholder:text-slate-500 px-2 font-medium"
                                    placeholder="Type your answer here..."
                                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                />
                            ) : (
                                <div className="flex-1 px-4 text-slate-400 text-sm font-medium flex items-center gap-3" onClick={() => setShowTextFallback(true)}>
                                    {status === 'listening' ? (
                                        <>
                                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                            <span className="truncate max-w-[200px] md:max-w-md">{(transcript || interimTranscript) ? `${transcript} ${interimTranscript}` : "Listening... (Speak naturally)"}</span>
                                        </>
                                    ) : status === 'processing' ? (
                                        <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={14} /> processing answer...</span>
                                    ) : (
                                        <span>Mic paused - Click to type</span>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center gap-2 shrink-0">
                                <button onClick={() => setShowTextFallback(!showTextFallback)} className="p-3 hover:bg-white/10 rounded-full text-slate-400 transition-colors"><Keyboard size={20} /></button>
                                <button onClick={toggleMic} title="Toggle Mic" className={`p-4 rounded-2xl transition-all ${isMicOpen ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-slate-800 text-slate-400'}`}>
                                    {isMicOpen ? <Mic size={20} /> : <MicOff size={20} />}
                                </button>

                                {/* MANUAL END BUTTON */}
                                <button
                                    onClick={() => {
                                        console.log("[Interview] Manual termination requested.");
                                        generateFinalReport(history);
                                    }}
                                    disabled={status === 'processing' || (status as string) === 'finished'}
                                    className="p-4 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-2xl transition-all border border-red-500/20 group flex items-center gap-2"
                                    title="End Interview Early"
                                >
                                    <PhoneOff size={20} />
                                    <span className="text-xs font-bold hidden md:inline uppercase tracking-tight">End Session</span>
                                </button>

                                <button
                                    onClick={() => handleSubmit()}
                                    disabled={status === 'processing'}
                                    className="p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                                >
                                    <Send size={20} className={status === 'processing' ? 'animate-pulse' : ''} />
                                </button>
                            </div>
                        </div>

                        {/* USER WEBCAM (PIP) - REMOVED HIDDEN CLASS FOR ROBUSTNESS */}
                        <div className="relative w-48 aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl shrink-0 group">
                            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
                            {errorMsg && <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-xs text-red-400 text-center p-2">{errorMsg}</div>}
                            {!isCamOpen && !errorMsg && <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-xs text-slate-500 font-bold uppercase tracking-widest text-center">Camera Off</div>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
