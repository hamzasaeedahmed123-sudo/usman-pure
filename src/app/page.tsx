import Image from "next/image";
import { ProductSliderHero } from "@/components/ProductSliderHero";
import {
  ShieldCheck,
  Leaf,
  Award,
  Sparkles,
  Truck,
  RotateCcw,
  CheckCircle2,
  HeartHandshake,
} from "lucide-react";

export default function Home() {
  const purityPillars = [
    {
      icon: Award,
      title: "100% Stone-Ground",
      desc: "Slow-milled in traditional chakki stones under 40°C to keep natural oils, germ, and bran intact.",
    },
    {
      icon: Leaf,
      title: "Certified Organic Farms",
      desc: "Direct partnerships with certified smallholder organic cultivators with zero chemical pesticides.",
    },
    {
      icon: ShieldCheck,
      title: "Lab-Tested Transparency",
      desc: "Every single batch is tested for zero lead, zero heavy metals, and zero artificial adulterants.",
    },
    {
      icon: Truck,
      title: "Farm-to-Door Freshness",
      desc: "Freshly ground upon order demand and shipped nationwide in UV-protective eco-friendly packaging.",
    },
  ];

  return (
    <div className="relative w-full bg-stone-100 text-stone-900">
      {/* 4-Second Interactive Product Slider Hero */}
      <ProductSliderHero />

      {/* Purity & Trust Pillars Section */}
      <section className="relative z-10 py-16 sm:py-24 bg-white border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" /> The Purity Promise
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
              Why Families Trust Usman&apos;s Pure Products
            </h2>
            <p className="mt-4 text-base text-stone-600 leading-relaxed">
              Industrial processing strips away living nutrition with high heat and bleaching agents.
              We preserve ancient slow-milling traditions so your kitchen receives wholesome, unadulterated food.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {purityPillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-6 rounded-3xl bg-stone-50 border border-stone-200/70 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/5 transition duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-800 group-hover:text-white transition duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="mt-5 text-base font-bold text-stone-900 tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Purity Standard
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brand Footer */}
      <footer className="py-12 bg-stone-900 text-stone-300 text-xs border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-40 h-10 flex items-center">
              <Image
                src="/logo.png"
                alt="USMAN'S PURE PRODUCTS"
                fill
                sizes="160px"
                className="object-contain object-left invert brightness-200"
              />
            </div>
            <span className="hidden sm:inline-block text-stone-600">•</span>
            <span className="hidden sm:inline-block text-stone-400 font-medium">Pure Food. Real Nutrition.</span>
          </div>

          <div className="flex items-center gap-6 text-stone-400">
            <a href="#purity" className="hover:text-white transition">Lab Reports</a>
            <a href="#shipping" className="hover:text-white transition">Nationwide Delivery</a>
            <a href="#contact" className="hover:text-white transition">Contact Us</a>
          </div>

          <div className="text-stone-500 text-[11px]">
            © 2026 Usman&apos;s Pure Products. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
