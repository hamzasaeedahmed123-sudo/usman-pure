"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { DietConsultationBanner } from "@/components/DietConsultationBanner";
import { MEGA_BUNDLES, BundleItem } from "@/data/products";
import {
  ChevronRight,
  Sparkles,
  Check,
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  Truck,
  MessageCircle,
} from "lucide-react";

export default function BundlesPage() {
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const handleAddBundle = (bundle: BundleItem) => {
    setAddedIds((prev) => ({ ...prev, [bundle.id]: true }));
    const cartEl = document.getElementById("cart-badge-count");
    if (cartEl) {
      const current = parseInt(cartEl.innerText || "0", 10) + 1;
      cartEl.innerText = current.toString();
    }
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [bundle.id]: false }));
    }, 2000);
  };

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
            <Link href="/shop" className="hover:text-amber-800 transition">
              Collections
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-bold text-stone-900">Mega Discounted Bundles</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Hero Header */}
        <div className="bg-stone-900 text-white py-12 sm:py-16 border-b border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> High-Value Wellness Combos
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Usman&apos;s Pure Mega Bundles
              </h1>
              <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
                Save up to ₨800 on complete lifestyle packages. Curated by our nutritionists pairing cold stone-ground flours with targeted organic herbal teas for maximum wellness impact.
              </p>
            </div>
          </div>
        </div>

        {/* Bundles Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MEGA_BUNDLES.map((bundle) => {
              const isAdded = addedIds[bundle.id];
              return (
                <div
                  key={bundle.id}
                  className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 group"
                >
                  <div>
                    {/* Bundle Image */}
                    <div className="relative aspect-[4/3] w-full rounded-2xl bg-stone-50 border border-stone-200/80 p-4 overflow-hidden mb-6 flex items-center justify-center">
                      <Image
                        src={bundle.image}
                        alt={bundle.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                        {bundle.badge}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-stone-900 group-hover:text-amber-800 transition">
                      {bundle.title}
                    </h2>

                    <div className="flex items-baseline gap-2.5 mt-3">
                      <span className="text-2xl sm:text-3xl font-black text-stone-900">
                        ₨{bundle.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-stone-400 line-through">
                        ₨{bundle.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                        Save ₨{bundle.savings}
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {bundle.description}
                    </p>

                    {/* What's Included */}
                    <div className="mt-5 pt-4 border-t border-stone-100 space-y-2">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                        Included in this combo:
                      </div>
                      {bundle.includes.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-stone-100 flex flex-col gap-2.5">
                    <button
                      onClick={() => handleAddBundle(bundle)}
                      className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-stone-900 hover:bg-amber-800 text-white active:scale-98"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" /> Added to Basket
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
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center gap-2 transition text-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Order via WhatsApp COD
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Free Diet Consultation Banner */}
        <DietConsultationBanner />
      </main>

      <StoreFooter />
    </div>
  );
}
