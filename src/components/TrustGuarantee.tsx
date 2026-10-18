"use client";

import { RotateCcw, Truck, HeartHandshake, ShieldCheck } from "lucide-react";

export function TrustGuarantee() {
  const guarantees = [
    {
      icon: RotateCcw,
      title: "14 Days Happiness Guarantee",
      desc: "If you are not completely satisfied with our purity or taste, we offer an unconditional 14-day money-back guarantee.",
      badge: "No Questions Asked",
    },
    {
      icon: Truck,
      title: "Cash on Delivery Nationwide",
      desc: "Order safely with doorstep Cash on Delivery anywhere across Pakistan. Pay only when you receive your fresh package.",
      badge: "All Cities & Towns",
    },
    {
      icon: HeartHandshake,
      title: "50,000+ Satisfied Families",
      desc: "Thousands of Pakistani households have switched from industrial flour to living organic nutrition with visible health gains.",
      badge: "Verified Trust",
    },
    {
      icon: ShieldCheck,
      title: "100% Purity & Lab-Tested",
      desc: "Strictly zero maida, zero preservatives, zero artificial additives. Tested rigorously for heavy metals and purity.",
      badge: "100% Organic",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-stone-100/80 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-stone-200/80 p-6 flex flex-col justify-between hover:shadow-lg hover:border-amber-300 transition duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-800 group-hover:text-white transition duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mt-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold text-amber-800">
                  <span>{item.badge}</span>
                  <span className="text-stone-300">✓</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
