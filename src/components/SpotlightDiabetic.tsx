"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ShoppingBag,
  Activity,
  Heart,
} from "lucide-react";

export function SpotlightDiabetic() {
  const [selectedPack, setSelectedPack] = useState<"5kg" | "10kg">("5kg");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const packPrices = {
    "5kg": { price: 1200, original: 1500, label: "5kg Standard Pack" },
    "10kg": { price: 2300, original: 3000, label: "10kg Monthly Care Pack" },
  };

  const current = packPrices[selectedPack];
  const totalPrice = current.price * quantity;

  const handleAddToCart = () => {
    setIsAdded(true);
    const cartEl = document.getElementById("cart-badge-count");
    if (cartEl) {
      const currentVal = parseInt(cartEl.innerText || "0", 10) + quantity;
      cartEl.innerText = currentVal.toString();
    }
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Purchase Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between order-2 lg:order-1">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800">
                    DIABETIC & CARDIAC HEALTH
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs font-bold text-stone-600">Pure Organic Methi Infusion</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-snug">
                  FENUGREEK Plus – Flour for Good Diabetic Control
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-stone-800">4.9</span>
                  <span className="text-xs text-stone-500">(97 Clinical & Customer Reviews)</span>
                </div>

                {/* Price */}
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-stone-900">
                    ₨{current.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-stone-400 line-through">
                    ₨{current.original.toLocaleString()}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold uppercase bg-emerald-100 text-emerald-800">
                    Save ₨{(current.original - current.price).toLocaleString()}
                  </span>
                </div>

                <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                  Infused with therapeutic-grade whole fenugreek (methi) seeds and roasted barley. Galactomannan soluble fiber slows carbohydrate breakdown in the small intestine, eliminating sudden sugar surges after meals.
                </p>

                {/* Bullets */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    "Supports Healthy Fasting & Post-Meal Glucose",
                    "Rich in Soluble Galactomannan Fiber",
                    "Reduces Sugar Spikes Naturally",
                    "Chakki Milled Fresh — Zero Maida or Fillers",
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Pack Selector */}
                <div className="mt-6">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-2">
                    Select Pack Size:
                  </label>
                  <div className="grid grid-cols-2 gap-3 max-w-md">
                    {(["5kg", "10kg"] as const).map((pack) => (
                      <button
                        key={pack}
                        onClick={() => setSelectedPack(pack)}
                        className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                          selectedPack === pack
                            ? "border-emerald-800 bg-emerald-800 text-white shadow-md"
                            : "border-stone-200 bg-white text-stone-800 hover:border-stone-400"
                        }`}
                      >
                        <div className="text-xs font-bold">{packPrices[pack].label}</div>
                        <div className="text-sm font-black mt-1">
                          ₨{packPrices[pack].price.toLocaleString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart & Actions */}
                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <div className="flex items-center justify-between sm:justify-start border border-stone-200 rounded-xl bg-white px-3 py-2 w-full sm:w-auto gap-4">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 font-bold hover:bg-stone-200 flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-sm font-black text-stone-900 min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 font-bold hover:bg-stone-200 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-stone-900 hover:bg-emerald-800 text-white active:scale-98"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-5 h-5" /> Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" /> Add to Cart — ₨{totalPrice.toLocaleString()}
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-3">
                  <a
                    href={`https://wa.me/923000000000?text=Hello%20Usman's%20Pure,%20I%20want%20to%20order%20FENUGREEK%20Plus%20Diabetic%20Flour%20(${selectedPack}%20x%20${quantity}%20=%20₨${totalPrice})%20with%20Cash%20on%20Delivery.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-6 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center gap-2 transition"
                  >
                    Buy with Cash on Delivery (COD)
                  </a>
                </div>
              </div>
            </div>

            {/* Right Image Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2">
              <div className="relative w-full aspect-square max-w-md rounded-2xl bg-white border border-stone-200/80 p-6 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/products/prod-4.png"
                  alt="FENUGREEK Plus – Flour for Good Diabetic Control"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain p-4 hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-600 text-white shadow-md">
                  Doctor Recommended • Save 20%
                </span>
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-200">
                  Sugar Free
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-md text-center">
                <div className="p-2.5 rounded-xl bg-white border border-stone-200/60 text-[11px] font-bold text-stone-700 flex items-center justify-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-700" />
                  <span>Low Glycemic (GI &lt; 45)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-stone-200/60 text-[11px] font-bold text-stone-700 flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4 text-rose-600" />
                  <span>Cardiac Friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
