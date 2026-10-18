"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  ArrowRight,
  Sparkles,
  Terminal,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Zap,
  GitBranch,
  Play,
  RotateCw,
} from "lucide-react";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"stories" | "terminal">("stories");
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simStep, setSimStep] = useState(1);

  // GSAP Interactive Fluid Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle nodes for fluid mesh
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      originX: number;
      originY: number;
      radius: number;
      hue: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        originX: x,
        originY: y,
        radius: Math.random() * 2 + 1.2,
        hue: Math.random() > 0.5 ? 210 : 270, // Cyan to Purple
      });
    }

    const mouse = { x: -1000, y: -1000, radius: 180 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect fluid lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Fluid drift
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce walls
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse interaction displacement with GSAP physics easing
        const dx = mouse.x - p1.x;
        const dy = mouse.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 4;
          const angle = Math.atan2(dy, dx);
          p1.x -= Math.cos(angle) * force;
          p1.y -= Math.sin(angle) * force;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p1.hue}, 80%, 65%, 0.45)`;
        ctx.fill();

        // Connect nearby particles with fluid gradients
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (distBetween < 130) {
            const alpha = (1 - distBetween / 130) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP Entrance Choreography
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { y: -25, opacity: 0, duration: 0.8, delay: 0.1 })
        .from(".hero-headline", { y: 30, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(".hero-sub", { y: 25, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-actions", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-hud", { y: 40, opacity: 0, scale: 0.96, duration: 1 }, "-=0.5");

      // Continuous floating pulse for HUD
      gsap.to(".hud-glow", {
        scale: 1.25,
        opacity: 0.8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Autonomous loop simulator for interactive HUD
  const triggerSimulation = () => {
    if (isRunningSim) return;
    setIsRunningSim(true);
    setActiveTab("terminal");
    setSimStep(1);

    setTimeout(() => setSimStep(2), 1200);
    setTimeout(() => setSimStep(3), 2600);
    setTimeout(() => {
      setSimStep(4);
      setIsRunningSim(false);
    }, 4200);
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden min-h-screen bg-zinc-950 text-white flex flex-col justify-center items-center pt-24 pb-20 px-4 sm:px-6 selection:bg-indigo-500/30 selection:text-indigo-200"
    >
      {/* Background Interactive Fluid Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
      />

      {/* Radial Gradient Ambient Lighting */}
      <div className="hud-glow pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-600/20 via-indigo-600/20 to-fuchsia-600/15 blur-[140px] rounded-full z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Status Pill Badge */}
        <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-zinc-800/80 bg-zinc-900/70 backdrop-blur-md text-xs font-medium text-zinc-300 mb-8 shadow-xl hover:border-zinc-700 transition">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-zinc-400">GSD Engine Active</span>
          <span className="text-zinc-600">•</span>
          <span className="text-indigo-400 font-semibold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Ralph Loop Ready
          </span>
        </div>

        {/* Fluid Kinetic Headline */}
        <h1
          ref={titleRef}
          className="hero-headline text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-balance max-w-4xl leading-[1.08]"
        >
          Build Next.js Apps with{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
            Zero Context Rot
          </span>
        </h1>

        {/* Subhead Description */}
        <p className="hero-sub mt-6 text-base sm:text-xl text-zinc-400 max-w-2xl leading-relaxed">
          Decouple memory from chat windows into structured disk artifacts. GSD
          orchestrates spec-driven phases while Ralph Loop grinds through atomic
          iterations until <code className="text-indigo-300 font-mono text-sm bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-800/50">&lt;promise&gt;COMPLETE&lt;/promise&gt;</code>.
        </p>

        {/* Action Button Group */}
        <div className="hero-actions mt-9 flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={triggerSimulation}
            className="cursor-pointer group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-medium shadow-lg shadow-indigo-500/25 transition duration-200"
          >
            <Play className={`w-4 h-4 text-cyan-200 ${isRunningSim ? "animate-spin" : ""}`} />
            <span>{isRunningSim ? "Running Simulation..." : "Simulate Autonomous Loop"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-300 font-medium transition duration-200 backdrop-blur-sm"
          >
            <GitBranch className="w-4 h-4 text-zinc-400" />
            <span>GitHub Connected</span>
          </a>
        </div>

        {/* Live HUD / Autonomous Loop Card */}
        <div className="hero-hud mt-14 w-full max-w-3xl rounded-2xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-2xl p-5 sm:p-6 shadow-2xl text-left">
          {/* HUD Window Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/70 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-zinc-400">ralph-loop.sh --status</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("stories")}
                className={`cursor-pointer px-2.5 py-1 rounded-md transition ${
                  activeTab === "stories"
                    ? "bg-zinc-800 text-zinc-100 font-medium"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                PRD Tasks
              </button>
              <button
                onClick={() => setActiveTab("terminal")}
                className={`cursor-pointer px-2.5 py-1 rounded-md transition ${
                  activeTab === "terminal"
                    ? "bg-zinc-800 text-zinc-100 font-medium"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Live Loop Log
              </button>
            </div>
          </div>

          {/* Tab 1: Structured PRD Story Pipeline */}
          {activeTab === "stories" ? (
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/70 flex items-start justify-between">
                <div>
                  <div className="font-semibold text-zinc-200">US-001: Validate CLI Dependencies</div>
                  <div className="text-zinc-400 mt-1">git, jq, and GitHub CLI authenticated</div>
                </div>
                <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded text-[11px] font-mono">
                  <CheckCircle2 className="w-3 h-3" /> passes
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-indigo-500/30 flex items-start justify-between">
                <div>
                  <div className="font-semibold text-zinc-100">US-002: GSAP Fluid Hero Section</div>
                  <div className="text-zinc-400 mt-1">Interactive canvas, motion choreography</div>
                </div>
                <span className="inline-flex items-center gap-1 text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 px-2 py-0.5 rounded text-[11px] font-mono">
                  <RotateCw className="w-3 h-3 animate-spin" /> active
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/70 flex items-start justify-between">
                <div>
                  <div className="font-semibold text-zinc-200">US-003: Dynamic Component Shell</div>
                  <div className="text-zinc-400 mt-1">Responsive header & navigation</div>
                </div>
                <span className="text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-[11px] font-mono">
                  queued
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/70 flex items-start justify-between">
                <div>
                  <div className="font-semibold text-zinc-200">US-004: Live Autonomous HUD</div>
                  <div className="text-zinc-400 mt-1">Real-time disk state sync</div>
                </div>
                <span className="text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-[11px] font-mono">
                  queued
                </span>
              </div>
            </div>
          ) : (
            /* Tab 2: Terminal Simulation */
            <div className="pt-3 font-mono text-xs text-zinc-300 space-y-2 bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/70 mt-3 min-h-[140px]">
              <div className="text-zinc-500 flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span>$ ./ralph-loop.sh --tool claude 5</span>
              </div>
              <div className="text-zinc-400">
                🔍 Checking dependencies: git [ok] | jq [ok] | gh [authenticated]
              </div>
              <div className="text-cyan-400">
                🌿 Branch: ralph/feature-foundation
              </div>
              {simStep >= 2 && (
                <div className="text-indigo-400">
                  ⚙️ Iteration 1 of 5: Implementing [US-002] GSAP Fluid Hero Canvas...
                </div>
              )}
              {simStep >= 3 && (
                <div className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Quality checks passed: npm run lint ✓ | npm run build ✓</span>
                </div>
              )}
              {simStep >= 4 && (
                <div className="text-amber-300 font-semibold">
                  💾 Committed: feat: US-002 - GSAP Fluid Hero Section
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
