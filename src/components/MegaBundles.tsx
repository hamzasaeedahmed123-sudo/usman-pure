"use client";

import { useState } from "react";
import Image from "next/image";
import { MEGA_BUNDLES, BundleItem } from "@/data/products";
import { Check, ShoppingBag, Sparkles, ShieldCheck } from "lucide-react";

export function MegaBundles() {
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const handleAddBundle = (bundle: BundleItem) => {
    setAddedIds((prev) => ({ ...prev, [bundle.id]: true }));
    const cartEl = document.getElementById("cart-badge-count");
    if (cartEl) {
      const currentVal = parseInt(cartEl.innerText || "0", 10) + 1;
      cartEl.innerText = currentVal.toString();
    }
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [bundle.id]: false }));
    }, 2000);
  };

  return (
    <section className="py-16 sm:py-24 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" /> High-Value Combos
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Usman&apos;s Pure Mega Bundles
            </h2>
          </div>
          <p className="text-sm text-stone-400 max-w-md">
            Save up to ₨800 on carefully paired lifestyle bundles. Complete wellness regimen with free nationwide doorstep delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEGA_BUNDLES.map((bundle) => {
            const isAdded = addedIds[bundle.id];
            return (
              <div
                key={bundle.id}
                className="bg-stone-800/80 rounded-3xl border border-stone-700/80 p-6 sm:p-7 flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300 shadow-xl group"
              >
                <div>
                  {/* Image showcase */}
                  <div className="relative aspect-[4/3] w-full rounded-2xl bg-stone-900/90 border border-stone-700/60 p-4 overflow-hidden mb-6 flex items-center justify-center">
                    <Image
                      src={bundle.image}
                      alt={bundle.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-stone-950 shadow-md">
                      {bundle.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition">
                    {bundle.title}
                  </h3>

                  <div className="flex items-baseline gap-2.5 mt-3">
                    <span className="text-2xl sm:text-3xl font-black text-amber-400">
                      ₨{bundle.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-stone-400 line-through">
                      ₨{bundle.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 uppercase">
                      Save ₨{bundle.savings}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-stone-300 leading-relaxed line-clamp-3">
                    {bundle.description}
                  </p>

                  {/* Included Items */}
                  <div className="mt-5 pt-4 border-t border-stone-700/80 space-y-2">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400/90">
                      What&apos;s Included:
                    </div>
                    {bundle.includes.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-stone-700/80 flex flex-col gap-2.5">
                  <button
                    onClick={() => handleAddBundle(bundle)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-amber-500 hover:bg-amber-400 text-stone-950 font-black active:scale-98"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Claim Bundle — ₨{bundle.price.toLocaleString()}
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/923000000000?text=Hello%20Usman's%20Pure,%20I%20want%20to%20order%20the%20${encodeURIComponent(
                      bundle.title
                    )}%20(₨${bundle.price})%20on%20Cash%20on%20Delivery.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-stone-700 hover:bg-stone-600 text-white flex items-center justify-center gap-2 transition text-center"
                  >
                    Order on WhatsApp Cash on Delivery
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
