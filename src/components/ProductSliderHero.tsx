"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Check,
  X,
  Award,
  Layers,
  Leaf,
  Info,
} from "lucide-react";
import { Header } from "@/components/Header";

export interface SlideData {
  id: number;
  theme: "amber" | "green" | "terracotta";
  themeKey: "amber" | "green" | "terracotta";
  kineticLine1: string;
  kineticLine2: string;
  productName: string;
  productTagline: string;
  description: string;
  image: string;
  packOptions: Array<{ size: string; price: string; isDefault?: boolean }>;
  badges: string[];
  bgStyle: string;
  textColor: string;
  kineticColor: string;
  accentBtn: string;
  specCardBg: string;
  specCardBorder: string;
  learnMoreDetails: {
    origin: string;
    milling: string;
    shelfLife: string;
    labTested: string;
    certifications: string[];
  };
}

const SLIDES: SlideData[] = [
  {
    id: 0,
    theme: "amber",
    themeKey: "amber",
    kineticLine1: "MULTIGRAIN",
    kineticLine2: "FLOUR",
    productName: "Premium Chakki Multigrain Flour",
    productTagline: "100% Stone-Ground, Zero Maida",
    description:
      "Crafted from 9 ancient nutrient-dense grains stone-milled in traditional chakki stone mills to preserve raw bran, wheat germ, and vital dietary fiber.",
    image: "/images/flour-product.jpg",
    packOptions: [
      { size: "5kg", price: "$16.50" },
      { size: "10kg", price: "$29.99", isDefault: true },
    ],
    badges: ["100% Stone Ground", "High Fiber", "Diabetic Friendly"],
    bgStyle:
      "bg-gradient-to-br from-[#F8F1E2] via-[#EEDCC2] to-[#DFBE91] text-[#422C18]",
    textColor: "text-[#422C18]",
    kineticColor: "text-[#422C18]/[0.88]",
    accentBtn: "bg-[#4D3019] hover:bg-[#38210F] text-[#FAF5EB]",
    specCardBg: "bg-[#FAF4EA]/80",
    specCardBorder: "border-[#D6BE9C]/80",
    learnMoreDetails: {
      origin: "Single-source organic wheat & millets from certified family farms",
      milling: "Cold chakki stone-grinding at <40°C preserving vitamins & minerals",
      shelfLife: "90 days (100% chemical & preservative free)",
      labTested: "Tested for zero heavy metals, zero pesticides, zero maida adulteration",
      certifications: ["ISO 22000 Certified", "100% Whole Grain Council", "Non-GMO Verified"],
    },
  },
  {
    id: 1,
    theme: "green",
    themeKey: "green",
    kineticLine1: "HERBAL",
    kineticLine2: "TEAS",
    productName: "Pure Organic Herbal Tea",
    productTagline: "Rosella & Olive Leaf Blend",
    description:
      "A soothing artisanal restorative infusion of crimson wild rosella calyces, Mediterranean olive leaves, and aromatic chamomile flowers.",
    image: "/images/tea-product.jpg",
    packOptions: [
      { size: "100g Stand-up Pouch", price: "$14.00", isDefault: true },
      { size: "20 Pyramid Bags", price: "$18.50" },
    ],
    badges: ["Caffeine Free", "Antioxidant Rich", "Pure Detox"],
    bgStyle:
      "bg-gradient-to-br from-[#E3F4EA] via-[#CAE9D5] to-[#9FD6B6] text-[#0E3E23]",
    textColor: "text-[#0E3E23]",
    kineticColor: "text-[#0E3E23]/[0.90]",
    accentBtn: "bg-[#114828] hover:bg-[#0B341C] text-[#F0FBF4]",
    specCardBg: "bg-[#F0FAF4]/80",
    specCardBorder: "border-[#B2DEC5]/80",
    learnMoreDetails: {
      origin: "Highland organic botanical reserves & wild-crafted olive groves",
      milling: "Sun-dried whole petals and leaves gently coarse-cut by hand",
      shelfLife: "18 months in airtight UV-protective kraft pouch",
      labTested: "100% caffeine-free verified, non-irradiated, zero artificial flavors",
      certifications: ["USDA Organic Certified", "EU Bio Organic", "Fair Trade"],
    },
  },
  {
    id: 2,
    theme: "terracotta",
    themeKey: "terracotta",
    kineticLine1: "ORGANIC",
    kineticLine2: "SPICES",
    productName: "Pure Hand-Pounded Spices",
    productTagline: "Kashmiri Chili & Whole Masalas",
    description:
      "Sun-ripened Kashmiri red chilies and royal whole spices cold-pounded in small artisanal batches with natural essential oils fully intact.",
    image: "/images/spices-product.jpg",
    packOptions: [
      { size: "100g Jar", price: "$12.50", isDefault: true },
      { size: "200g Pouch", price: "$22.00" },
    ],
    badges: ["Cold Ground", "Zero Adulteration", "Rich Aroma"],
    bgStyle:
      "bg-gradient-to-br from-[#A0351E] via-[#862714] to-[#601407] text-[#FDF4EE]",
    textColor: "text-[#FDF4EE]",
    kineticColor: "text-[#FDF4EE]/[0.92]",
    accentBtn: "bg-[#FBF0E7] hover:bg-[#F3DEC9] text-[#7A2110]",
    specCardBg: "bg-[#772111]/75",
    specCardBorder: "border-[#B64D36]/60",
    learnMoreDetails: {
      origin: "Kashmiri valleys & Malabar coastal organic spice estates",
      milling: "Slow stone-pounding without friction heat to lock in volatile aroma",
      shelfLife: "12 months in amber glass jar and nitrogen-sealed pouch",
      labTested: "Tested for zero Sudan dyes, zero starch fillers, zero lead chromate",
      certifications: ["Spice Board of India Pure Grade", "100% Natural Certified"],
    },
  },
];

const AUTO_SLIDE_DURATION = 4000; // Exact 4-second auto loop

export function ProductSliderHero() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedPackIndex, setSelectedPackIndex] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const currentSlide = SLIDES[currentSlideIndex];

  // Reset pack selection when slide changes
  useEffect(() => {
    const defaultIdx = currentSlide.packOptions.findIndex((o) => o.isDefault);
    setSelectedPackIndex(defaultIdx >= 0 ? defaultIdx : 0);
  }, [currentSlideIndex, currentSlide]);

  const goToSlide = useCallback((newIndex: number, newDir: number = 1) => {
    setDirection(newDir);
    setCurrentSlideIndex(newIndex);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlideIndex + 1) % SLIDES.length, 1);
  }, [currentSlideIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlideIndex - 1 + SLIDES.length) % SLIDES.length, -1);
  }, [currentSlideIndex, goToSlide]);

  // Exact 4-second high-resolution timeline progress scrubber
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 25; // 25ms tick
    const increment = (intervalTime / AUTO_SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  const selectedPack = currentSlide.packOptions[selectedPackIndex] || currentSlide.packOptions[0];

  return (
    <div className="relative w-full min-h-screen overflow-hidden select-none transition-colors duration-700">
      {/* Top Brand Header Component */}
      <Header theme={currentSlide.themeKey} />

      {/* Main Slide Canvas */}
      <div className={`relative w-full min-h-screen flex items-center justify-center pt-24 pb-24 sm:pt-28 sm:pb-28 ${currentSlide.bgStyle} transition-colors duration-700`}>
        {/* Organic Ambient Wave Lighting Layer */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-40">
          <div className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] rounded-full bg-white/40 blur-[130px]" />
          <div className="absolute -bottom-[25%] -right-[10%] w-[80vw] h-[80vw] rounded-full bg-black/10 blur-[140px]" />
        </div>

        {/* Content Viewport */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between min-h-[calc(100vh-12rem)]">
          
          {/* Middle Stage: Giant Kinetic Background Typography & Floating Product */}
          <div className="relative w-full flex-1 flex flex-col items-center justify-center my-auto py-4">
            
            {/* Giant Kinetic Background Text Layer */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${currentSlide.id}`}
                  initial={{ opacity: 0, scale: 0.94, y: direction * 25 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -direction * 25 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center w-full leading-[0.82] tracking-tighter text-center"
                >
                  <span
                    className={`font-black uppercase tracking-tight ${currentSlide.kineticColor} text-[clamp(2.75rem,11.5vw,10.25rem)] drop-shadow-xs`}
                  >
                    {currentSlide.kineticLine1}
                  </span>
                  <span
                    className={`font-black uppercase tracking-tight ${currentSlide.kineticColor} text-[clamp(2.75rem,11.5vw,10.25rem)] drop-shadow-xs mt-1 sm:mt-2`}
                  >
                    {currentSlide.kineticLine2}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Central Product Visual Stage with Parallax & Hover Physics */}
            <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10">
              
              {/* Left Floating Badge: Pack Sizes Selector Pill */}
              <motion.div
                key={`badge-${currentSlide.id}`}
                initial={{ opacity: 0, x: -35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="hidden lg:flex flex-col gap-2.5 z-20"
              >
                <div
                  className={`backdrop-blur-xl border p-3 rounded-2xl shadow-xl flex flex-col gap-2 ${currentSlide.specCardBg} ${currentSlide.specCardBorder}`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                    Select Pack Size
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {currentSlide.packOptions.map((opt, idx) => (
                      <button
                        key={opt.size}
                        onClick={() => setSelectedPackIndex(idx)}
                        className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between gap-3 ${
                          selectedPackIndex === idx
                            ? currentSlide.accentBtn
                            : "bg-white/40 hover:bg-white/70"
                        }`}
                      >
                        <span>{opt.size}</span>
                        <span className="opacity-90">{opt.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stone Ground / Purity Seal */}
                <div
                  className={`backdrop-blur-xl border px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md flex items-center gap-2 ${currentSlide.specCardBg} ${currentSlide.specCardBorder}`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>100% Pure Guarantee</span>
                </div>
              </motion.div>

              {/* Central Floating Product Image Hero */}
              <div className="relative flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`img-${currentSlide.id}`}
                    initial={{ opacity: 0, scale: 0.88, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -30 }}
                    transition={{
                      duration: 0.75,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                    className="relative group cursor-pointer"
                  >
                    {/* Radial Backlight behind the product */}
                    <div className="absolute inset-0 rounded-full bg-white/35 blur-3xl scale-75 group-hover:scale-95 transition-transform duration-700 pointer-events-none" />

                    {/* Product Presentation Card */}
                    <div className="relative w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] md:w-[410px] md:h-[410px] lg:w-[460px] lg:h-[460px] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/60 bg-white/10 backdrop-blur-md transform group-hover:scale-[1.02] transition-transform duration-500">
                      <Image
                        src={currentSlide.image}
                        alt={currentSlide.productName}
                        fill
                        priority
                        sizes="(max-width: 640px) 280px, (max-width: 1024px) 420px, 480px"
                        className="object-cover object-center"
                      />

                      {/* Glossy sheen overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/10 pointer-events-none" />
                    </div>

                    {/* Mobile Pack Size Badge Overlay */}
                    <div className="lg:hidden absolute bottom-3 left-3 backdrop-blur-md bg-white/80 text-stone-900 border border-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {selectedPack.size} • {selectedPack.price}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Floating Frosted Spec Card */}
              <motion.div
                key={`spec-${currentSlide.id}`}
                initial={{ opacity: 0, x: 35 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-sm lg:max-w-xs z-20"
              >
                <div
                  className={`backdrop-blur-2xl border p-5 sm:p-6 rounded-3xl shadow-2xl flex flex-col gap-4 text-left ${currentSlide.specCardBg} ${currentSlide.specCardBorder}`}
                >
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider opacity-70 flex items-center gap-1">
                      <Leaf className="w-3.5 h-3.5" /> Pure Selection
                    </span>
                    <span className="text-xs font-extrabold flex items-center gap-1 bg-white/60 px-2 py-0.5 rounded-full border border-white/80">
                      ★ 4.9 Purity Score
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h2 className="text-lg sm:text-xl font-black leading-tight tracking-tight">
                      {currentSlide.productName}
                    </h2>
                    <p className="text-xs font-semibold opacity-80 mt-1">
                      {currentSlide.productTagline}
                    </p>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs leading-relaxed opacity-75 line-clamp-3">
                    {currentSlide.description}
                  </p>

                  {/* Feature Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentSlide.badges.map((b) => (
                      <span
                        key={b}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white/50 border border-white/80 shadow-2xs"
                      >
                        ✓ {b}
                      </span>
                    ))}
                  </div>

                  {/* Mobile Pack Size Selector if small screen */}
                  <div className="lg:hidden flex gap-2 pt-1">
                    {currentSlide.packOptions.map((opt, idx) => (
                      <button
                        key={opt.size}
                        onClick={() => setSelectedPackIndex(idx)}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition text-center ${
                          selectedPackIndex === idx
                            ? currentSlide.accentBtn
                            : "bg-white/40 border border-white/60"
                        }`}
                      >
                        {opt.size}
                      </button>
                    ))}
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="pt-3 border-t border-black/10 flex flex-col gap-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs opacity-70 font-medium">Selected Price:</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black tracking-tight">
                          {selectedPack.price}
                        </span>
                        <span className="text-[11px] opacity-75 font-semibold">
                          ({selectedPack.size})
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={handleAddToCart}
                        className={`cursor-pointer flex-1 py-3 rounded-2xl font-bold text-xs tracking-wide shadow-md transition duration-200 flex items-center justify-center gap-2 ${currentSlide.accentBtn}`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Cart!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setDetailsModalOpen(true)}
                        className="cursor-pointer px-3.5 py-3 rounded-2xl font-semibold text-xs border border-white/80 bg-white/40 hover:bg-white/80 shadow-2xs transition"
                        title="View Purity Specs & Lab Report"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Interactive Navigation & Progress Bar Scrubber */}
          <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 sm:pt-6 z-20">
            
            {/* Play/Pause & Arrow Cluster */}
            <div className="flex items-center gap-2.5">
              {/* Play / Pause Toggle Button */}
              <button
                onClick={() => setIsPlaying((prev) => !prev)}
                className="cursor-pointer p-3 rounded-full bg-white/70 hover:bg-white border border-white/90 shadow-md transition duration-200"
                aria-label={isPlaying ? "Pause 4s Auto Slider" : "Resume Auto Slider"}
                title={isPlaying ? "Pause automatic slide change" : "Resume automatic slide change"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-stone-900" />
                ) : (
                  <Play className="w-4 h-4 text-stone-900 fill-stone-900" />
                )}
              </button>

              {/* Prev Slide Arrow */}
              <button
                onClick={prevSlide}
                className="cursor-pointer p-3 rounded-full bg-white/55 hover:bg-white border border-white/80 shadow-md transition duration-200"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4 text-stone-900" />
              </button>

              {/* Next Slide Arrow */}
              <button
                onClick={nextSlide}
                className="cursor-pointer p-3 rounded-full bg-white/55 hover:bg-white border border-white/80 shadow-md transition duration-200"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4 text-stone-900" />
              </button>

              <span className="ml-1 text-xs font-mono font-bold opacity-75">
                0{currentSlideIndex + 1} / 0{SLIDES.length}
              </span>
            </div>

            {/* Continuous 4-Second Liquid Progress Bar Scrubber */}
            <div className="flex-1 w-full sm:max-w-md flex items-center gap-2.5">
              {SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlideIndex;
                const isPast = idx < currentSlideIndex;

                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx, idx > currentSlideIndex ? 1 : -1)}
                    className="cursor-pointer flex-1 group flex flex-col gap-1 text-left focus:outline-none"
                  >
                    {/* Slide Title Tag */}
                    <div className="flex items-center justify-between text-[11px] font-bold tracking-tight">
                      <span className={`transition-opacity ${isActive ? "opacity-100" : "opacity-50"}`}>
                        0{idx + 1} {slide.kineticLine1}
                      </span>
                    </div>

                    {/* Scrubber Segment Track */}
                    <div className="relative w-full h-2 rounded-full bg-black/15 overflow-hidden backdrop-blur-xs border border-white/30">
                      <div
                        className={`absolute top-0 bottom-0 left-0 rounded-full transition-all duration-75 ${
                          currentSlide.theme === "terracotta"
                            ? "bg-white"
                            : "bg-stone-900"
                        }`}
                        style={{
                          width: isActive
                            ? `${progress}%`
                            : isPast
                            ? "100%"
                            : "0%",
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Purity Guarantee Badge on Right */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold opacity-80 bg-white/40 px-3.5 py-1.5 rounded-full border border-white/60">
              <ShieldCheck className="w-4 h-4" />
              <span>Lab Verified Pure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More & Lab Certificate Modal Drawer */}
      <AnimatePresence>
        {detailsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg rounded-3xl bg-white border border-stone-200 p-6 sm:p-7 shadow-2xl text-stone-900"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold">{currentSlide.productName}</h3>
                    <p className="text-xs text-stone-500 font-medium">Authenticity & Lab Specifications</p>
                  </div>
                </div>
                <button
                  onClick={() => setDetailsModalOpen(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-3.5 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="font-bold text-stone-700 flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-emerald-700" /> Sourcing Origin
                  </div>
                  <p className="mt-1 text-stone-600 leading-relaxed">
                    {currentSlide.learnMoreDetails.origin}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="font-bold text-stone-700 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-700" /> Traditional Crafting & Milling
                  </div>
                  <p className="mt-1 text-stone-600 leading-relaxed">
                    {currentSlide.learnMoreDetails.milling}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="font-bold text-stone-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-700" /> Lab Purity Verification
                  </div>
                  <p className="mt-1 text-stone-600 leading-relaxed">
                    {currentSlide.learnMoreDetails.labTested}
                  </p>
                </div>

                <div className="flex items-center justify-between text-stone-500 pt-1">
                  <span>Shelf Life: <strong>{currentSlide.learnMoreDetails.shelfLife}</strong></span>
                  <div className="flex gap-1.5">
                    {currentSlide.learnMoreDetails.certifications.map((c) => (
                      <span key={c} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex gap-2">
                <button
                  onClick={() => {
                    handleAddToCart();
                    setDetailsModalOpen(false);
                  }}
                  className="w-full py-3 rounded-xl font-bold text-xs text-white bg-emerald-800 hover:bg-emerald-900 shadow-md transition"
                >
                  Order {currentSlide.productName} ({selectedPack.size})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
