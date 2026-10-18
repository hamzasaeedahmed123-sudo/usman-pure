"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
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

// Fluid animation easing matching exact Shakky liquid-slider reference
const FLUID_EASE = [0.83, 0, 0.17, 1] as const;

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
  bgGradient: string;
  textColor: string;
  kineticColor: string;
  accentBtn: string;
  cardBg: string;
  cardBorder: string;
  progressBarColor: string;
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
      "Cold-milled in traditional chakki stones to preserve natural bran, germ, and wholesome dietary fiber.",
    image: "/atta-bag.png",
    packOptions: [
      { size: "5kg", price: "$16.50" },
      { size: "10kg", price: "$29.99", isDefault: true },
    ],
    badges: ["100% Stone Ground", "High Fiber", "Diabetic Friendly"],
    bgGradient: "from-[#F7EFE1] via-[#EADBCA] to-[#DEC6A6]",
    textColor: "text-[#3B2411]",
    kineticColor: "text-[#3B2411]",
    accentBtn: "bg-[#3E2613] hover:bg-[#28170A] text-[#FAF5EC]",
    cardBg: "bg-[#FAF4EA]/85 backdrop-blur-2xl",
    cardBorder: "border-[#DFC9A9]/80",
    progressBarColor: "bg-[#3E2613]",
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
      "A restorative artisanal infusion of crimson wild rosella, Mediterranean olive leaves, and chamomile.",
    image: "/tea-pouch.png",
    packOptions: [
      { size: "100g Stand-up Pouch", price: "$14.00", isDefault: true },
      { size: "20 Pyramid Bags", price: "$18.50" },
    ],
    badges: ["Caffeine Free", "Antioxidant Rich", "Pure Detox"],
    bgGradient: "from-[#E6F5ED] via-[#D1EBDC] to-[#A2D8BA]",
    textColor: "text-[#08301A]",
    kineticColor: "text-[#08301A]",
    accentBtn: "bg-[#0C3B20] hover:bg-[#072513] text-[#F0FBF4]",
    cardBg: "bg-[#F2FAF5]/85 backdrop-blur-2xl",
    cardBorder: "border-[#B7E2CB]/80",
    progressBarColor: "bg-[#0C3B20]",
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
      "Sun-ripened Kashmiri red chilies and whole royal spices cold-pounded with essential oils intact.",
    image: "/spices-jar.png",
    packOptions: [
      { size: "100g Jar", price: "$12.50", isDefault: true },
      { size: "200g Pouch", price: "$22.00" },
    ],
    badges: ["Cold Ground", "Zero Adulteration", "Rich Aroma"],
    bgGradient: "from-[#9C321C] via-[#812411] to-[#5C1407]",
    textColor: "text-[#FFF5ED]",
    kineticColor: "text-[#FFF5ED]",
    accentBtn: "bg-[#FFF5ED] hover:bg-[#FFE8DA] text-[#6E1C0D]",
    cardBg: "bg-[#671A0B]/80 backdrop-blur-2xl",
    cardBorder: "border-[#B84E37]/60",
    progressBarColor: "bg-[#FFF5ED]",
    learnMoreDetails: {
      origin: "Kashmiri valleys & Malabar coastal organic spice estates",
      milling: "Slow stone-pounding without friction heat to lock in volatile aroma",
      shelfLife: "12 months in amber glass jar and nitrogen-sealed pouch",
      labTested: "Tested for zero Sudan dyes, zero starch fillers, zero lead chromate",
      certifications: ["Spice Board of India Pure Grade", "100% Natural Certified"],
    },
  },
];

const AUTO_SLIDE_DURATION = 4000; // Exact 4-second cycle

export function ProductSliderHero() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedPackIndex, setSelectedPackIndex] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [direction, setDirection] = useState<number>(1); // 1 = forward, -1 = backward

  const currentSlide = SLIDES[currentSlideIndex];

  // Reset pack selection when slide changes
  useEffect(() => {
    const defaultIdx = currentSlide.packOptions.findIndex((o) => o.isDefault);
    setSelectedPackIndex(defaultIdx >= 0 ? defaultIdx : 0);
  }, [currentSlideIndex, currentSlide]);

  const goToSlide = useCallback((newIndex: number, newDir: number = 1) => {
    setDirection(newDir);
    setCurrentSlideIndex(newIndex);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlideIndex + 1) % SLIDES.length, 1);
  }, [currentSlideIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlideIndex - 1 + SLIDES.length) % SLIDES.length, -1);
  }, [currentSlideIndex, goToSlide]);

  // Exact 4-second auto slide cycle
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  // Keyboard controls
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
    <div className="relative w-full min-h-screen overflow-hidden select-none">
      {/* Dynamic Header Component */}
      <Header theme={currentSlide.themeKey} />

      {/* Main Hero Viewport Canvas */}
      <div className="relative w-full min-h-screen flex flex-col justify-center items-center pt-16 pb-8 overflow-hidden">
        
        {/* Liquid Sliding Background Layers */}
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={`bg-${currentSlide.id}`}
            custom={direction}
            variants={{
              enter: (dir: number) => ({
                opacity: 0,
                x: dir > 0 ? "8%" : "-8%",
                scale: 1.04,
              }),
              center: {
                opacity: 1,
                x: "0%",
                scale: 1,
              },
              exit: (dir: number) => ({
                opacity: 0,
                x: dir > 0 ? "-8%" : "8%",
                scale: 0.98,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.95, ease: FLUID_EASE }}
            className={`absolute inset-0 bg-gradient-to-br ${currentSlide.bgGradient}`}
          />
        </AnimatePresence>

        {/* Ambient Radial Glow Lighting Layer */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-30">
          <div className="absolute top-[10%] left-[15%] w-[60vw] h-[60vw] rounded-full bg-white/40 blur-[130px]" />
          <div className="absolute bottom-[5%] right-[10%] w-[55vw] h-[55vw] rounded-full bg-black/15 blur-[140px]" />
        </div>

        {/* Hero Visual Stage: Giant Centered Typography & Floating Borderless Product */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center justify-center">
          
          {/* 1. Giant Kinetic Background Typography (Bold, Massive, High-Contrast) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={`text-${currentSlide.id}`}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    opacity: 0,
                    x: dir > 0 ? 140 : -140,
                    scale: 0.95,
                  }),
                  center: {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  },
                  exit: (dir: number) => ({
                    opacity: 0,
                    x: dir > 0 ? -140 : 140,
                    scale: 1.05,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.95, ease: FLUID_EASE, delay: 0.04 }}
                className="flex flex-col items-center justify-center w-full leading-[0.8] tracking-tighter text-center select-none"
              >
                <span
                  className={`font-black uppercase tracking-tight ${currentSlide.kineticColor} text-[clamp(3.5rem,13.5vw,11.5rem)]`}
                >
                  {currentSlide.kineticLine1}
                </span>
                <span
                  className={`font-black uppercase tracking-tight ${currentSlide.kineticColor} text-[clamp(3.5rem,13.5vw,11.5rem)] mt-1 sm:mt-2`}
                >
                  {currentSlide.kineticLine2}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 2. Floating Borderless Product Cutout (No frame/container, free floating with soft physics) */}
          <div className="relative z-10 flex items-center justify-center">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={`product-${currentSlide.id}`}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    opacity: 0,
                    x: dir > 0 ? 180 : -180,
                    scale: 0.82,
                    rotate: dir > 0 ? 4 : -4,
                  }),
                  center: {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    rotate: 0,
                  },
                  exit: (dir: number) => ({
                    opacity: 0,
                    x: dir > 0 ? -180 : 180,
                    scale: 0.82,
                    rotate: dir > 0 ? -4 : 4,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.9, ease: FLUID_EASE }}
                className="relative cursor-pointer group"
              >
                {/* Continuous Soft Breathing Floating Motion */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.8,
                    ease: "easeInOut",
                  }}
                  className="relative w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] md:w-[430px] md:h-[430px] lg:w-[500px] lg:h-[500px] flex items-center justify-center filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.32)] drop-shadow-[0_45px_65px_rgba(0,0,0,0.18)]"
                >
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.productName}
                    fill
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 440px, 520px"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. Overlay Detail Card (Bottom-Left: Sleek, Compact Glassmorphic Card) */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-10 lg:left-8 z-20 pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${currentSlide.id}`}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.7, ease: FLUID_EASE, delay: 0.1 }}
                className={`w-[calc(100vw-2rem)] sm:w-[280px] md:w-[305px] rounded-2xl p-3.5 sm:p-4 border shadow-[0_15px_40px_rgba(0,0,0,0.18)] flex flex-col gap-2 sm:gap-2.5 ${currentSlide.cardBg} ${currentSlide.cardBorder} ${currentSlide.textColor}`}
              >
                {/* Header Tag / Rating */}
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold uppercase tracking-wider opacity-80 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    100% Pure Guarantee
                  </span>
                  <span className="font-extrabold px-2 py-0.5 rounded-full bg-white/40 border border-white/60 text-[10px]">
                    ★ 4.9 Score
                  </span>
                </div>

                {/* Product Name & Subtitle */}
                <div>
                  <h2 className="text-base sm:text-lg font-black leading-tight tracking-tight">
                    {currentSlide.productName}
                  </h2>
                  <p className="text-[11px] font-semibold opacity-80 mt-0.5">
                    {currentSlide.productTagline}
                  </p>
                </div>

                {/* Compact Description */}
                <p className="text-[11px] leading-snug opacity-75 line-clamp-2">
                  {currentSlide.description}
                </p>

                {/* Clean Pack Selector & Price Row */}
                <div className="pt-1.5 border-t border-black/10 flex items-center justify-between gap-1.5">
                  <div className="flex gap-1">
                    {currentSlide.packOptions.map((opt, idx) => (
                      <button
                        key={opt.size}
                        onClick={() => setSelectedPackIndex(idx)}
                        className={`cursor-pointer px-2 py-0.5 rounded-lg text-[10px] font-bold transition ${
                          selectedPackIndex === idx
                            ? currentSlide.accentBtn
                            : "bg-white/40 hover:bg-white/70"
                        }`}
                      >
                        {opt.size}
                      </button>
                    ))}
                  </div>

                  <span className="text-base sm:text-lg font-black tracking-tight">
                    {selectedPack.price}
                  </span>
                </div>

                {/* Action Buttons: Add to Cart & Info */}
                <div className="flex gap-1.5 pt-0.5">
                  <button
                    onClick={handleAddToCart}
                    className={`cursor-pointer flex-1 py-2 px-3 rounded-xl font-bold text-[11px] tracking-wide shadow-sm transition duration-200 flex items-center justify-center gap-1.5 ${currentSlide.accentBtn}`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart ({selectedPack.price})</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setDetailsModalOpen(true)}
                    className="cursor-pointer p-2 rounded-xl border border-white/70 bg-white/40 hover:bg-white/80 shadow-2xs transition flex items-center justify-center"
                    title="View Purity Specifications & Lab Reports"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Purity & Lab Certificate Modal */}
      <AnimatePresence>
        {detailsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: FLUID_EASE }}
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

                <div className="pt-2">
                  <span className="font-bold text-stone-700 block mb-2">Recognized Accreditations:</span>
                  <div className="flex flex-wrap gap-2">
                    {currentSlide.learnMoreDetails.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200"
                      >
                        ✓ {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end">
                <button
                  onClick={() => setDetailsModalOpen(false)}
                  className="cursor-pointer px-5 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition"
                >
                  Close Specifications
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
