"use client";

import { Button } from "@/components/ui/Button";
import { ArrowRight, Terminal, Cpu, Globe, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { motion } from "framer-motion";
import { FeatureBento } from "@/components/landing/FeatureBento";
import { TechShowcase } from "@/components/landing/TechShowcase";
import { LogoTicker } from "@/components/landing/LogoTicker";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSpotlight } from "@/components/landing/HeroSpotlight";
import { AnimatedGrid } from "@/components/landing/AnimatedGrid";
import { StarsBackground } from "@/components/landing/StarsBackground";
import { useState } from "react";

export default function Home() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      <Navbar variant="public" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden min-h-screen flex flex-col justify-center">
        <HeroSpotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        <AnimatedGrid />

        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-600/10 rounded-[100%] blur-[120px] -z-10 opacity-50" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-600/10 rounded-[100%] blur-[120px] -z-10 opacity-30" />

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >

                <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6">
                  Accelerate Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 animate-gradient-x">
                    Tech Career
                  </span>
                </h1>

                <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  PrepXtra is the definitive platform for engineering excellence. From personalized roadmaps
                  to real-time AI mock interviews, we provide everything you need to crack your dream role
                  in Software Development, Data Science, and beyond.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <Link href="/auth/register">
                    <Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-slate-200 text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                      Start For Free <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" className="h-14 px-8 rounded-full border-white/10 hover:bg-white/5 text-lg font-medium backdrop-blur-sm">
                      Explore Platform
                    </Button>
                  </Link>
                </div>

                <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-slate-500 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> 10k+ Engineers
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> FAANG Curated
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> AI-Powered
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Visual */}
            <div
              className="flex-1 w-full max-w-[600px] lg:max-w-none perspective-[2000px]"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-square md:aspect-[4/3] w-full transform-style-3d transition-transform duration-100 ease-out"
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                }}
              >
                {/* Main Interface Card */}
                <div className="absolute inset-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col transform translate-z-0">
                  <div className="h-10 border-b border-white/5 bg-white/5 px-4 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="ml-4 text-xs text-slate-500 font-mono">prepxtra.ai/dashboard</div>
                  </div>
                  <div className="flex-1 p-6 relative">
                    {/* Abstract UI Mockup */}
                    <div className="flex gap-4 mb-6">
                      <div className="w-1/4 h-32 bg-white/5 rounded-xl animate-pulse" />
                      <div className="w-3/4 h-32 bg-white/5 rounded-xl flex items-center justify-center border border-dashed border-white/10">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">Top 1%</div>
                          <div className="text-xs text-slate-500">Global Ranking</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-12 bg-white/5 rounded-lg flex items-center px-4 justify-between">
                          <div className="w-1/3 h-2 bg-slate-700 rounded full" />
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold text-xs">
                            A+
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Gradient Glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-600/20 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Floating Elements */}
                <div
                  className="absolute -right-8 top-1/4 bg-black/90 border border-orange-500/30 p-4 rounded-xl shadow-xl w-48 backdrop-blur-xl animate-float-slow transform translate-z-20"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded bg-orange-500 flex items-center justify-center text-white font-bold">P</div>
                    <div className="text-xs font-bold text-white">Daily Streak</div>
                  </div>
                  <div className="text-2xl font-bold text-white">42 Days</div>
                  <div className="text-[10px] text-orange-400 mt-1">Keep it up! 🔥</div>
                </div>

                <div
                  className="absolute -left-8 bottom-1/4 bg-black/90 border border-white/10 p-4 rounded-xl shadow-xl w-56 backdrop-blur-xl animate-float-delayed transform translate-z-30"
                  style={{ transform: 'translateZ(60px)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-400">System Design</span>
                    <span className="text-xs text-green-400">98% Match</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[98%] bg-gradient-to-r from-green-500 to-emerald-400" />
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <LogoTicker />

      {/* Feature Bento Grid */}
      <section id="features" className="relative">
        {/* Background Typography */}
        <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none">
          <div className="text-[20vw] font-black text-white leading-none whitespace-nowrap animate-marquee-slow">
            LEARN BUILD MASTER DEPLOY
          </div>
        </div>
        <FeatureBento />
      </section>

      {/* Tech Showcase */}
      <TechShowcase />

      {/* Roadmap / How It Works Layout */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/bg/grid.svg')] opacity-5 pointer-events-none" />
        <StarsBackground className="opacity-30" starDensity={0.0001} />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="mb-24 text-center">
            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2 block">The Journey</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">Mastery</span></h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A structured ecosystem designed to guide you from your first line of code to your dream offer.
            </p>
          </div>

          <div className="relative">
            {/* Central Spine Line (Visible only on Desktop) */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-900/0 via-orange-600/50 to-orange-900/0 md:-translate-x-1/2 rounded-full hidden md:block" />

            <div className="space-y-24">
              {[
                { step: "01", title: "Skill Assessment", desc: "AI evaluates your current proficiency across Data Structures, System Design, and Core CS concepts to create a baseline.", icon: "🎯" },
                { step: "02", title: "Targeted Plan", desc: "Receive a bespoke roadmap that prioritizes your weak spots and targets the specific requirements of your dream companies.", icon: "🗺️" },
                { step: "03", title: "Deep Practice", desc: "Solve curated problems with our Real-time Solver, ensuring you understand the 'Why' behind every optimization.", icon: "💻" },
                { step: "04", title: "Mock Simulation", desc: "Validate your readiness with our Hyper-Realistic 3D AI Interviewer. Get feedback on tone, accuracy, and body language.", icon: "🤖" },
              ].map((item, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} group relative`}>

                  {/* Content Card */}
                  <div className="flex-1 w-full relative z-10">
                    <div className="p-8 bg-[#111] border border-white/10 rounded-[2rem] hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-900/20 relative overflow-hidden group-hover:bg-[#151515]">
                      <div className="absolute top-0 right-0 p-8 opacity-5 text-6xl grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                        <span className="text-orange-500 text-sm font-mono border border-orange-500/30 px-2 py-1 rounded">STEP {item.step}</span>
                        {item.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed text-lg">{item.desc}</p>
                    </div>
                  </div>

                  {/* Center Marker */}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-[#050505] border-4 border-[#222] group-hover:border-orange-500 transition-colors shadow-xl shrink-0">
                    <span className="text-2xl">{item.icon}</span>
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Space Filler (Visual Elements instead of empty space) */}
                  <div className="flex-1 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-10 group-hover:translate-x-0">
                    {/* Contextual Visual based on index */}
                    {i === 0 && (
                      <div className="text-slate-700 font-mono text-xs p-4 border border-slate-800 rounded-lg bg-black/50 backdrop-blur-sm -rotate-6">
                        <div>Assessment_Score: 85%</div>
                        <div>Weakness: Dynamic Programming</div>
                        <div className="w-32 h-2 bg-slate-800 rounded mt-2"><div className="w-[85%] h-full bg-green-500 rounded" /></div>
                      </div>
                    )}
                    {i === 1 && (
                      <div className="relative">
                        <div className="w-40 h-32 border border-orange-500/20 rounded-lg bg-orange-500/5 rotate-3 absolute -top-4 -left-4" />
                        <div className="w-40 h-32 border border-white/10 rounded-lg bg-black p-4 relative z-10">
                          <div className="h-2 w-20 bg-slate-700 rounded mb-2" />
                          <div className="h-2 w-16 bg-slate-800 rounded mb-4" />
                          <div className="space-y-1">
                            <div className="h-6 w-full border border-orange-500/30 rounded bg-orange-500/10" />
                            <div className="h-6 w-full border border-white/5 rounded" />
                          </div>
                        </div>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="font-mono text-xs text-green-500 p-4 rounded-lg bg-black border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                        <div>&gt; running tests...</div>
                        <div>&gt; test_case_1: PASS</div>
                        <div>&gt; test_case_2: PASS</div>
                        <div>&gt; complexity: O(n)</div>
                      </div>
                    )}
                    {i === 3 && (
                      <div className="relative h-24 w-24 rounded-full border border-indigo-500/30 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-indigo-500/10 animate-ping" />
                        <div className="h-2 w-8 bg-indigo-500 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA with massive gradient */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-orange-950/40" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">
            READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">ASCEND?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join the fastest growing community of engineers preparing for their dream careers.
          </p>
          <Link href="/auth/register">
            <Button className="h-20 px-12 rounded-full bg-white text-black hover:bg-slate-200 text-2xl font-bold shadow-[0_0_50px_rgba(255,165,0,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_80px_rgba(255,165,0,0.6)]">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      <SiteFooter />

    </main>
  );
}
