"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import {
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Award,
  Leaf,
  Layers,
  Truck,
  HeartHandshake,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
} from "lucide-react";

export default function AboutPage() {
  const pillars = [
    {
      icon: Award,
      title: "100% Traditional Cold Stone-Chakki",
      desc: "Our ancient millstones rotate at low RPM to ensure flour temperature never exceeds 40°C. This preserves living enzymes, natural wheat germ, and delicate vitamins B & E that modern roller mills incinerate.",
    },
    {
      icon: Leaf,
      title: "Direct Organic Farm Partnerships",
      desc: "We bypass wholesale grain brokers to contract directly with certified organic cultivators in Punjab and Sindh who follow chemical-free regenerative farming practices without synthetic pesticides.",
    },
    {
      icon: ShieldCheck,
      title: "Complete Laboratory Transparency",
      desc: "Every single production batch undergoes ISO-standard lab testing for heavy metals (lead, cadmium, arsenic), moisture levels, and zero presence of chemical bleaching agents like benzoyl peroxide.",
    },
    {
      icon: Truck,
      title: "Freshness-Sealed Nationwide Dispatch",
      desc: "Flour is ground on order demand and sealed into multilayer UV-protective breathable packaging to ensure grain aroma and nutrients reach your kitchen as fresh as if you stood at the chakki yourself.",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      <Header isSolid theme="amber" />

      <main className="pt-28 sm:pt-32 flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-stone-500">
            <Link href="/" className="hover:text-amber-800 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-bold text-stone-900">About Us</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Hero Header */}
        <div className="bg-stone-900 text-white py-16 sm:py-24 border-b border-stone-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Our Heritage &amp; Mission
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Pure Food. Real Nutrition. Zero Compromise.
              </h1>
              <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed">
                Usman&apos;s Pure Products was born out of a simple, urgent mission: to take commercial roller-mill starch, chemical bleaching, and synthetic adulteration off Pakistani dining tables, and restore the ancient, life-giving nutrition of whole stone-ground grains.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800">
                  THE INDUSTRIAL PROBLEM
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-stone-900 mt-2 tracking-tight">
                  Why Modern Commercial Flour Is Making Families Sick
                </h2>
                <div className="mt-4 space-y-4 text-sm text-stone-600 leading-relaxed">
                  <p>
                    Over the past four decades, industrial factory roller mills took over wheat processing. To maximize factory profits, grains are crushed at over 90°C with high-speed steel rollers. The nutritious germ oil is stripped away to sell separately, the fiber bran is sifted out, and what remains is bleached with benzoyl peroxide.
                  </p>
                  <p>
                    The result is modern white flour (maida and refined atta) that behaves almost like pure sugar in the human bloodstream — driving sudden glucose spikes, chronic fatigue, fatty liver, and digestive disorders across generations of Pakistani families.
                  </p>
                  <p className="font-semibold text-stone-900">
                    At Usman&apos;s Pure, we refuse to cut corners. We slow down the milling process to natural stone speeds, keeping 100% of the natural germ, bran, and essential nutrients intact in every bag.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <Link
                    href="/shop"
                    className="py-3 px-6 rounded-xl bg-stone-900 hover:bg-amber-800 text-white font-bold text-xs transition"
                  >
                    Explore Pure Products &rarr;
                  </Link>
                  <a
                    href="https://wa.me/923000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Story Visual Box */}
              <div className="rounded-3xl bg-stone-100 border border-stone-200 p-8 flex flex-col justify-between">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 bg-stone-200">
                  <Image
                    src="/images/products/prod-3.jpg"
                    alt="Usman's Pure Traditional Chakki"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-4"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-stone-200/80">
                    <div className="text-2xl font-black text-stone-900">&lt;40°C</div>
                    <div className="text-xs text-stone-600 mt-0.5">Cold Milling Temperature</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-stone-200/80">
                    <div className="text-2xl font-black text-stone-900">100%</div>
                    <div className="text-xs text-stone-600 mt-0.5">Whole Germ &amp; Bran Retention</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-stone-200/80">
                    <div className="text-2xl font-black text-stone-900">Zero</div>
                    <div className="text-xs text-stone-600 mt-0.5">Chemical Bleach or Additives</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-stone-200/80">
                    <div className="text-2xl font-black text-stone-900">50,000+</div>
                    <div className="text-xs text-stone-600 mt-0.5">Satisfied Pakistani Homes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars Section */}
        <section className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800">
                UNCOMPROMISING PURITY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 mt-2 tracking-tight">
                The 4 Pillars of Usman&apos;s Pure
              </h2>
              <p className="mt-3 text-stone-600 text-sm leading-relaxed">
                From farm cultivation to low-rpm stone grinding, discover the standards that set our products apart.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-amber-400/80 transition duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-stone-900">{p.title}</h3>
                      <p className="mt-2 text-xs text-stone-600 leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified Standard
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Outlets & Facilities */}
        <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800">
                OUR PRESENCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 mt-2 tracking-tight">
                Facilities &amp; Nationwide Delivery
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-stone-600">
                We mill in traditional agricultural heartlands and dispatch nationwide with fast couriers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-7 rounded-3xl bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-stone-900">Lahore Central Dispatch Hub</h4>
                    <p className="text-xs text-stone-500">Fast Urban Logistics &amp; COD Processing</p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Serving Lahore with same-day and next-day home deliveries, plus central coordination for express courier routes across Punjab, KPK, Sindh, and Balochistan.
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-stone-50 border border-stone-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-stone-900">Faisalabad Milling &amp; QC Unit</h4>
                    <p className="text-xs text-stone-500">Traditional Chakki Facility &amp; Herb Curing</p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Located near fertile grain belts, housing our slow stone chakki mills, batch quality testing equipment, and shade-drying herbal preservation suites.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <StoreFooter />
    </div>
  );
}
