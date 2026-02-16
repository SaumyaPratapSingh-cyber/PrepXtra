"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Mic, MicOff, Send, Zap, MousePointer2, AlertCircle, Power, Play, CheckCircle2, RefreshCcw, Loader2, Volume2, Radio, Activity, Keyboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InterviewInterfaceProps {
    role: string;
    onStatusChange: (status: "idle" | "listening" | "speaking") => void;
    onVolumeChange: (volume: number) => void;
    onNextQuestion: (question: string) => void;
    onEndSession: (results: any) => void;
    onConfidenceUpdate: (score: number) => void;
}

export const InterviewInterface = ({ role, onStatusChange, onVolumeChange, onNextQuestion, onEndSession, onConfidenceUpdate }: InterviewInterfaceProps) => {
    const [status, setStatus] = useState<"idle" | "listening" | "speaking">("idle");
    const [isAutoMode, setIsAutoMode] = useState(true);
    const [history, setHistory] = useState<{ question: string; answer: string }[]>([]);
    const [transcript, setTranscript] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [isHeard, setIsHeard] = useState(false);
    const [micError, setMicError] = useState<string | null>(null);
    const [showTextFallback, setShowTextFallback] = useState(false);

    // Low-level control refs to avoid closure stale data
    const recognitionRef = useRef<any>(null);
    const recognitionActiveRef = useRef(false);
    const statusRef = useRef(status);
    const isSpeakingRef = useRef(false);
    const isThinkingRef = useRef(false);
    const ttsStartTimeRef = useRef<number>(0);
    const listeningStartTimeRef = useRef<number>(0);
    const silenceStartRef = useRef<number | null>(null);
    const currentQuestionRef = useRef<string>("");
    const audioContextRef = useRef<AudioContext | null>(null);

    const autoSubmitDelay = 4000;
    const vadThreshold = 0.02;
    const safetyWindow = 3500;

    const fillerWords = ["um", "uh", "like", "actually", "basically", "so", "you know", "i mean"];

    useEffect(() => {
        statusRef.current = status;
        isSpeakingRef.current = (status === "speaking");
        if (status === "listening") {
            listeningStartTimeRef.current = Date.now();
        } else {
            listeningStartTimeRef.current = 0;
        }
    }, [status]);

    useEffect(() => {
        isThinkingRef.current = isThinking;
    }, [isThinking]);

    // Confidence Calculation
    useEffect(() => {
        if (status !== "listening" && !isThinking) return;
        let score = 100;
        const text = transcript.trim();
        if (text.length > 0 && listeningStartTimeRef.current > 0) {
            const latency = (Date.now() - listeningStartTimeRef.current) / 1000;
            if (latency > 3) score -= Math.min(25, (latency - 3) * 5);
        }
        const words = text.toLowerCase().split(/\s+/);
        let fillerCount = 0;
        words.forEach(w => {
            if (fillerWords.includes(w)) fillerCount++;
        });
        score -= Math.min(50, fillerCount * 10);
        onConfidenceUpdate(Math.max(10, Math.min(100, score)));
    }, [transcript, status, isThinking]);

    const stopRecognition = useCallback(() => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.onend = null;
                recognitionRef.current.onerror = null;
                recognitionRef.current.onresult = null;
                recognitionRef.current.stop();
            } catch (e) { }
            recognitionRef.current = null;
            recognitionActiveRef.current = false;
        }
    }, []);

    const startRecognition = useCallback(() => {
        if (isSpeakingRef.current || isThinkingRef.current || statusRef.current === "idle") return;

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setMicError("Speech API not supported. Use Chrome.");
            return;
        }

        if (recognitionActiveRef.current) return;

        stopRecognition();

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = () => {
            recognitionActiveRef.current = true;
            setMicError(null);
            console.log("[STT] ACTIVE");
        };

        recognition.onresult = (event: any) => {
            let finalTranscript = "";
            for (let i = 0; i < event.results.length; ++i) {
                finalTranscript += event.results[i][0].transcript;
            }
            if (finalTranscript.trim()) {
                setTranscript(finalTranscript);
                setIsHeard(true);
                silenceStartRef.current = Date.now();
            }
        };

        recognition.onend = () => {
            recognitionActiveRef.current = false;
            console.log("[STT] ENDED");
            // Check ref, not state!
            if (statusRef.current === "listening" && !isSpeakingRef.current && !isThinkingRef.current) {
                setTimeout(startRecognition, 100);
            }
        };

        recognition.onerror = (event: any) => {
            if (event.error === 'not-allowed') setMicError("Mic Denied.");
            recognitionActiveRef.current = false;
        };

        try {
            recognition.start();
            recognitionRef.current = recognition;
        } catch (e) {
            recognitionActiveRef.current = false;
        }
    }, [stopRecognition]);

    // Mic Watchdog
    useEffect(() => {
        const i = setInterval(() => {
            if (status === "listening" && !isSpeakingRef.current && !isThinkingRef.current && !recognitionActiveRef.current) {
                startRecognition();
            }
        }, 1500);
        return () => clearInterval(i);
    }, [status, startRecognition]);

    useEffect(() => {
        let animationFrame: number;
        const initVAD = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const context = new (window.AudioContext || (window as any).webkitAudioContext)();
                const analyzer = context.createAnalyser();
                const source = context.createMediaStreamSource(stream);
                source.connect(analyzer);
                analyzer.fftSize = 256;
                const dataArray = new Uint8Array(analyzer.frequencyBinCount);
                audioContextRef.current = context;

                const check = () => {
                    analyzer.getByteFrequencyData(dataArray);
                    const avg = dataArray.reduce((p, c) => p + c, 0) / dataArray.length;
                    const vol = avg / 255;
                    onVolumeChange(vol);

                    const now = Date.now();
                    if (isAutoMode && isSpeakingRef.current && vol > vadThreshold * 4 && (now - ttsStartTimeRef.current) > safetyWindow) {
                        handleInterruption();
                        return;
                    }

                    if (isAutoMode && status === "listening" && transcript.trim().length > 5 && !isThinkingRef.current) {
                        if (vol < vadThreshold) {
                            if (!silenceStartRef.current) silenceStartRef.current = Date.now();
                            if (now - silenceStartRef.current > autoSubmitDelay) {
                                silenceStartRef.current = null;
                                finalizeResponse(transcript);
                            }
                        } else {
                            silenceStartRef.current = Date.now();
                        }
                    }
                    animationFrame = requestAnimationFrame(check);
                };
                check();
            } catch (err) { }
        };
        initVAD();
        return () => {
            cancelAnimationFrame(animationFrame);
            if (audioContextRef.current) audioContextRef.current.close();
        };
    }, [status, transcript, isAutoMode, safetyWindow]);

    const handleInterruption = useCallback(() => {
        window.speechSynthesis.cancel();
        isSpeakingRef.current = false;
        setStatus("listening");
        onStatusChange("listening");
        setTranscript("");
        setIsHeard(false);
        setTimeout(startRecognition, 100);
    }, [onStatusChange, startRecognition]);

    const clean = (t: string) => t.replace(/[*_#`~]/g, "").replace(/\(.*?\)/g, "").trim();

    const getVoice = () => {
        const v = window.speechSynthesis.getVoices();
        return v.find(x => x.name.includes("Google US English")) || v.find(x => x.lang === "en-US") || v[0];
    };

    const talk = useCallback((text: string) => {
        if (!text) return;
        stopRecognition();
        window.speechSynthesis.cancel();

        const content = clean(text);
        const sentences = content.match(/[^.!?]+[.!?]+/g) || [content];
        let idx = 0;

        const next = () => {
            if (idx >= sentences.length) {
                isSpeakingRef.current = false;
                setStatus("listening");
                onStatusChange("listening");
                setTranscript("");
                setIsHeard(false);
                onConfidenceUpdate(100);
                setTimeout(startRecognition, 200);
                return;
            }

            const s = sentences[idx].trim();
            if (!s) { idx++; next(); return; }

            const u = new SpeechSynthesisUtterance(s);
            u.voice = getVoice();
            u.onstart = () => {
                if (idx === 0) ttsStartTimeRef.current = Date.now();
                isSpeakingRef.current = true;
                setStatus("speaking");
                onStatusChange("speaking");
            };
            u.onend = () => { idx++; next(); };
            u.onerror = () => { idx++; next(); };
            window.speechSynthesis.speak(u);
        };
        next();
    }, [onStatusChange, startRecognition, stopRecognition, onConfidenceUpdate]);

    const finalizeResponse = async (answer: string) => {
        const finalAnswer = (answer || transcript).trim();
        if (finalAnswer.length < 2 || isThinkingRef.current) return;

        stopRecognition();
        setIsThinking(true);
        setStatus("idle");
        onStatusChange("idle");
        setShowTextFallback(false);

        const q = currentQuestionRef.current;
        const hist = [...history, { question: q, answer: finalAnswer }];
        setHistory(hist);

        try {
            const r = await axios.post("/api/interview/analyze", { role, question: q, userAnswer: finalAnswer, history: hist });
            const data = r.data;
            setIsThinking(false);
            if (data.isFollowUp) {
                currentQuestionRef.current = data.nextQuestion;
                onNextQuestion(data.nextQuestion);
                talk(`${data.feedback} ${data.nextQuestion}`);
            } else {
                talk(`${data.feedback} Thank you for your time. Your report is ready.`);
                setTimeout(() => onEndSession(hist), 5000);
            }
        } catch (e) {
            setIsThinking(false);
            talk("Apologies, I encountered a glitch. Could you repeat that?");
            setStatus("listening");
            onStatusChange("listening");
            setTimeout(startRecognition, 400);
        }
    };

    return (
        <div className="w-full max-w-2xl px-6 py-6 bg-black/70 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl relative">

            <div className="flex items-center justify-between mb-8 px-2">
                <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5 shadow-inner w-[280px]">
                    <button onClick={() => setIsAutoMode(true)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isAutoMode ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'}`}>
                        <Zap size={13} className={isAutoMode ? 'fill-current animate-pulse' : ''} />
                        Auto
                    </button>
                    <button onClick={() => setIsAutoMode(false)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isAutoMode ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-slate-500 hover:text-slate-300'}`}>
                        <MousePointer2 size={13} />
                        Manual
                    </button>
                </div>

                <div className="flex flex-col items-end gap-1">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Neural Link</span>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isThinking ? 'bg-amber-500 animate-spin' : status === 'listening' ? (isHeard ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.3)]') : 'bg-indigo-500'}`} />
                        <span className="text-xs font-black text-white/80 tracking-tight">{isThinking ? 'Thinking' : status === 'listening' ? 'Online' : 'Standby'}</span>
                    </div>
                </div>
            </div>

            {status === "idle" && history.length === 0 ? (
                <div className="flex flex-col items-center gap-10 py-12">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => {
                        currentQuestionRef.current = "Could you please introduce yourself and your background?";
                        onNextQuestion(currentQuestionRef.current);
                        talk("Hello! I'm Siddharth. To begin, could you please tell me about yourself and your background?");
                    }} className="px-20 py-10 bg-white text-black rounded-[2.5rem] font-black text-3xl tracking-tighter shadow-xl">
                        COMMENCE
                    </motion.button>
                </div>
            ) : (
                <div className="space-y-8 animate-in fade-in duration-700">
                    <div className="flex justify-center items-end gap-2 h-16">
                        {Array.from({ length: 14 }).map((_, i) => (
                            <motion.div key={i} className={`w-2 rounded-full ${status === 'listening' ? 'bg-emerald-500' : status === 'speaking' ? 'bg-indigo-500' : 'bg-white/5'}`}
                                animate={{ height: status === 'listening' ? `${20 + Math.random() * 80}%` : status === 'speaking' ? `${10 + Math.random() * 40}%` : '5%' }}
                                transition={{ repeat: Infinity, duration: 0.3, ease: "linear" }}
                            />
                        ))}
                    </div>

                    <div className="relative p-8 bg-black/50 border border-white/5 rounded-[3rem] min-h-[160px] flex flex-col justify-center text-center shadow-inner overflow-hidden">
                        <AnimatePresence mode="wait">
                            {isThinking ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-5">
                                    <Loader2 className="animate-spin text-indigo-400" size={40} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Deciphering Response</span>
                                </motion.div>
                            ) : showTextFallback ? (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full h-full flex flex-col gap-4">
                                    <textarea
                                        autoFocus
                                        value={transcript}
                                        onChange={(e) => {
                                            setTranscript(e.target.value);
                                            setIsHeard(e.target.value.trim().length > 0);
                                        }}
                                        placeholder="Type your response here if microphone is offline..."
                                        className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-medium text-white focus:outline-none focus:border-indigo-500/50 resize-none placeholder:text-slate-600"
                                    />
                                    <button onClick={() => setShowTextFallback(false)} className="text-[8px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                                        Back to Voice Mode
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                    {micError ? (
                                        <div className="flex flex-col items-center gap-3 text-red-400">
                                            <AlertCircle size={24} />
                                            <p className="text-xs font-black uppercase tracking-widest">{micError}</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-4">
                                            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                                                {status === 'speaking' ? 'Interviewer Speaking' : isHeard ? 'Neural Signal Logged' : 'Awaiting Vocal Stream'}
                                            </p>
                                            {status === 'listening' && (
                                                <div className="flex items-center gap-3 px-6 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                                    <div className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${isHeard ? 'animate-ping' : ''}`} />
                                                    <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">
                                                        {isHeard ? 'Receiving Voice...' : 'Mic Active'}
                                                    </span>
                                                </div>
                                            )}
                                            {!isHeard && status === 'listening' && (
                                                <button
                                                    onClick={() => setShowTextFallback(true)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all mt-2"
                                                >
                                                    <Keyboard size={12} />
                                                    Type Instead
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="grid grid-cols-12 gap-5">
                        <button onClick={() => onEndSession(history)} className="col-span-3 flex items-center justify-center p-7 bg-white/5 hover:bg-red-500/10 border border-white/5 rounded-[2rem] text-slate-500 hover:text-red-400 transition-all">
                            <Power size={24} />
                        </button>

                        <div className="col-span-9 flex gap-5">
                            <button
                                onClick={() => finalizeResponse(transcript)}
                                disabled={!isHeard || isThinking}
                                className={`flex-1 flex items-center justify-center gap-4 py-7 rounded-[2.2rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl ${isHeard ? 'bg-indigo-600 text-white hover:bg-indigo-500 scale-100 shadow-indigo-500/20' : 'bg-white text-black opacity-10 cursor-not-allowed scale-95'}`}
                            >
                                <Send size={16} />
                                Submit Response
                            </button>
                            <button onClick={() => { setTranscript(""); setIsHeard(false); stopRecognition(); setTimeout(startRecognition, 50); }} className="p-7 bg-white/5 border border-white/5 rounded-[2rem] text-slate-500 hover:text-indigo-400 transition-all">
                                <RefreshCcw size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
