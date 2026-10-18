"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ShoppingBag,
  Sparkles,
  HeartHandshake,
} from "lucide-react";

export function FeaturedSpotlight() {
  const [selectedPack, setSelectedPack] = useState<"5kg" | "10kg">("5kg");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const packPrices = {
    "5kg": { price: 1150, original: 1500, label: "5kg Family Pack" },
    "10kg": { price: 2150, original: 2900, label: "10kg Value Saver Pack" },
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
    <section className="py-16 sm:py-24 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Product Image Gallery Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <Link
                href="/product/prod-3"
                className="relative w-full aspect-square max-w-md rounded-2xl bg-stone-50 border border-stone-200/80 p-6 flex items-center justify-center overflow-hidden block group cursor-pointer"
              >
                <Image
                  src="/images/products/prod-3.jpg"
                  alt="Fat2Fuel Advance Multigrain Flour For Effective Weight Loss"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-600 text-white shadow-md">
                  Best Seller • Save 23%
                </span>
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                  100% Stone-Ground
                </span>
              </Link>

              {/* Trust Badges Under Image */}
              <div className="mt-6 grid grid-cols-3 gap-3 w-full max-w-md text-center">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 text-[11px] font-bold text-stone-700 flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Lab Tested</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 text-[11px] font-bold text-stone-700 flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-emerald-700" />
                  <span>14-Day Return</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 text-[11px] font-bold text-stone-700 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <span>COD Pakistan</span>
                </div>
              </div>
            </div>

            {/* Product Purchase Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800">
                    USMAN&apos;S PURE SPECIALTY
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs font-bold text-emerald-700">In Stock (Dispatches in 24h)</span>
                </div>

                <Link href="/product/prod-3">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-snug hover:text-amber-800 transition">
                    Fat2Fuel Advance Multigrain Flour For Effective Weight Loss
                  </h2>
                </Link>

                {/* Star Rating */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-stone-800">5.0</span>
                  <span className="text-xs text-stone-500">(112 Verified Customer Reviews)</span>
                </div>

                {/* Price Display */}
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
                  Formulated with cold-ground barley, oats, chickpeas, flaxseed, and chia seeds. Keeps you satiated for 5+ hours, controls glycemic spikes, and promotes continuous healthy fat metabolism without nutritional deprivation.
                </p>

                {/* Key Benefits List */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    "Low Glycemic Index (<50) — No Sugar Crashes",
                    "Stone-Ground under 40°C — Zero Nutrient Loss",
                    "High Dietary Fiber (18g per 100g serving)",
                    "100% Pure Grains — Zero Maida, Zero Bleach",
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Pack Size Selector */}
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
                            ? "border-stone-900 bg-stone-900 text-white shadow-md"
                            : "border-stone-200 bg-stone-50 text-stone-800 hover:border-stone-400"
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

                {/* Quantity & Add to Cart Controls */}
                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center justify-between sm:justify-start border border-stone-200 rounded-xl bg-stone-50 px-3 py-2 w-full sm:w-auto gap-4">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-700 font-bold hover:bg-stone-200 flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-sm font-black text-stone-900 min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-700 font-bold hover:bg-stone-200 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-md ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-stone-900 hover:bg-amber-800 text-white active:scale-98"
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

                {/* Direct Order Now & Details Buttons */}
                <div className="mt-4 flex flex-col sm:flex-row items-center gap-2.5">
                  <Link
                    href={`/checkout?product=prod-3&pack=${selectedPack === "5kg" ? "standard" : "large"}&qty=${quantity}`}
                    className="w-full sm:flex-1 py-3 px-6 rounded-xl text-xs sm:text-sm font-extrabold bg-stone-900 hover:bg-amber-900 text-white flex items-center justify-center gap-2 transition shadow-md text-center"
                  >
                    <Truck className="w-4 h-4 text-amber-400" />
                    <span>Order (Cash on Delivery) — ₨{totalPrice.toLocaleString()}</span>
                  </Link>

                  <Link
                    href="/product/prod-3"
                    className="w-full sm:w-auto py-3 px-5 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center transition text-center"
                  >
                    Full Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
