"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Truck,
  Check,
  ShoppingBag,
} from "lucide-react";
import { BotanicalWatermark } from "@/components/BotanicalWatermark";

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
    <section className="relative py-16 sm:py-24 bg-stone-100/70 border-b border-stone-200 overflow-hidden">
      {/* Organic Wheat Watermark in Section Background */}
      <BotanicalWatermark
        type="wheat"
        className="absolute -top-16 -left-16 w-[450px] h-[450px]"
        opacity={0.30}
        size={450}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative bg-white rounded-sm shadow-ambient overflow-hidden p-6 sm:p-10 lg:p-12">
          {/* Organic Wheat Watermark in Spotlight Card Background */}
          <BotanicalWatermark
            type="wheat"
            className="absolute -bottom-12 -right-12 w-[440px] h-[440px] sm:w-[520px] sm:h-[520px]"
            opacity={0.38}
            size={520}
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
            {/* Product Image Gallery Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <Link
                href="/product/prod-3"
                className="relative w-full aspect-square max-w-md rounded-sm bg-stone-50 p-6 flex items-center justify-center overflow-hidden block group cursor-pointer"
              >
                <Image
                  src="/images/products/prod-3.jpg"
                  alt="Fat2Fuel Advance Multigrain Flour For Effective Weight Loss"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-[2px] text-xs font-medium uppercase tracking-[0.18em] bg-[#F6F1E9] text-[#8B3A22]">
                  Sale
                </span>
              </Link>
            </div>

            {/* Product Purchase Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                    Chakki Atta
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs font-medium text-emerald-700">In Stock</span>
                </div>

                <Link href="/product/prod-3">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight leading-snug hover:text-amber-800 transition">
                    Fat2Fuel Advance Multigrain Flour For Effective Weight Loss
                  </h2>
                </Link>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-extrabold font-sans text-stone-900 tracking-tight">
                    Rs {current.price.toLocaleString()}
                  </span>
                  <span className="text-base font-normal font-sans text-stone-500 line-through">
                    Rs {current.original.toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-sm font-bold font-sans text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                    Save Rs {(current.original - current.price).toLocaleString()}
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
                  <label className="block text-xs font-medium uppercase tracking-wider text-stone-700 mb-2">
                    Select Pack Size:
                  </label>
                  <div className="grid grid-cols-2 gap-3 max-w-md">
                    {(["5kg", "10kg"] as const).map((pack) => (
                      <button
                        key={pack}
                        onClick={() => setSelectedPack(pack)}
                        className={`p-3.5 rounded-md border text-left transition cursor-pointer ${
                          selectedPack === pack
                            ? "border-stone-900 bg-[#1E1510] text-white shadow-ambient"
                            : "border-stone-200 bg-stone-50 text-stone-800 hover:border-stone-400"
                        }`}
                      >
                        <div className="text-xs font-bold">{packPrices[pack].label}</div>
                        <div className="text-sm font-semibold mt-1">
                          ₨{packPrices[pack].price.toLocaleString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart Controls */}
                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center justify-between sm:justify-start border border-stone-200 rounded-md bg-stone-50 px-3 py-2 w-full sm:w-auto gap-4">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-stone-200 text-stone-700 font-bold hover:bg-stone-200 flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold text-stone-900 min-w-[20px] text-center">
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
                    className={`flex-1 py-3.5 px-6 rounded-xl min-h-[48px] text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-ambient ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9] uppercase tracking-[0.14em] transition-colors duration-200 ease-out"
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
                    className="w-full sm:flex-1 py-3 px-6 rounded-[3px] text-[11px] font-medium bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9] flex items-center justify-center gap-2 transition text-center uppercase tracking-[0.18em] duration-200 ease-out"
                  >
                    <Truck className="w-4 h-4 text-amber-400" />
                    <span>Order (Cash on Delivery) — ₨{totalPrice.toLocaleString()}</span>
                  </Link>

                  <Link
                    href="/product/prod-3"
                    className="w-full sm:w-auto py-3 px-5 rounded-[3px] text-[11px] font-medium flex items-center justify-center transition text-center bg-transparent border border-[#1E1510]/25 text-[#1E1510] hover:border-[#1E1510] hover:bg-[#1E1510] hover:text-[#F6F1E9] uppercase tracking-[0.18em] transition-colors duration-200 ease-out"
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
