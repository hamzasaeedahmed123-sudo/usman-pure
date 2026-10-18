"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { PRODUCTS, Product } from "@/data/products";
import {
  Star,
  ShoppingBag,
  Check,
  Eye,
  X,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Truck,
  Sparkles,
  CupSoda,
  Flame,
  Leaf,
} from "lucide-react";

export default function HerbalsPage() {
  const teaProducts = PRODUCTS.filter((p) => p.category === "teas");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    const cartEl = document.getElementById("cart-badge-count");
    if (cartEl) {
      const current = parseInt(cartEl.innerText || "0", 10) + 1;
      cartEl.innerText = current.toString();
    }
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      <Header isSolid theme="green" />

      <main className="pt-28 sm:pt-32 flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-stone-500">
            <Link href="/" className="hover:text-amber-800 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link href="/products" className="hover:text-amber-800 transition">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-bold text-stone-900">Pure Organic Herbal Teas &amp; Infusions</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-[#0D3B22] via-[#082816] to-[#04160C] text-white py-14 sm:py-20 border-b border-emerald-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> 100% Caffeine-Free &bull; Whole Dried Botanicals
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Pure Organic Herbal Teas &amp; Infusions
              </h1>
              <p className="mt-3 text-emerald-100 text-sm sm:text-base leading-relaxed">
                Hand-harvested whole dried herbs and flowers shade-dried naturally to retain essential volatile oils and polyphenols. Zero synthetic flavorings, zero artificial food coloring, and completely caffeine-free.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "100% naturally caffeine-free",
                  "Whole dried calyces, flowers, and leaves",
                  "Formulated for weight detox, sleep, and heart vitality",
                  "Sealed in UV-shielded aroma-lock standing pouches",
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-bold px-3 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5 text-emerald-200"
                  >
                    <Check className="w-3.5 h-3.5 text-amber-400" /> {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
            <div>
              <h2 className="text-xl font-bold text-stone-900">Pure Herbal Infusions</h2>
              <p className="text-xs text-stone-500">Showing {teaProducts.length} certified organic teas</p>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-amber-800 hover:text-amber-900 transition flex items-center gap-1"
            >
              <span>View All Store Products</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
            {teaProducts.map((product) => {
              const isAdded = addedIds[product.id];
              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-xl hover:border-emerald-500/80 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative w-full aspect-square bg-stone-50 overflow-hidden p-6 border-b border-stone-100 flex items-center justify-center">
                    <Link href={`/product/${product.id}`} className="absolute inset-0">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase bg-rose-600 text-white shadow-xs">
                        {product.discountBadge}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-900/80 text-white">
                        {product.weight}
                      </span>
                    </div>

                    <div className="absolute inset-x-4 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="w-full py-2 px-3 rounded-lg bg-white/95 text-stone-900 text-xs font-bold shadow-md hover:bg-stone-900 hover:text-white transition flex items-center justify-center gap-1.5 backdrop-blur-xs cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> Quick View
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-bold text-emerald-800 mb-1">
                        {product.categoryLabel}
                      </div>
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-base font-bold text-stone-900 leading-snug line-clamp-2 hover:text-emerald-800 transition min-h-[44px]">
                          {product.title}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex items-center text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-stone-700">
                          {product.rating.toFixed(1)}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          ({product.reviewCount})
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-black text-stone-900">
                            {product.priceFormatted}
                          </span>
                          <span className="text-xs text-stone-400 line-through">
                            {product.originalPriceFormatted}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 uppercase">
                          Cash on Delivery
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`h-10 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-xs ${
                          isAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-stone-900 hover:bg-emerald-800 text-white active:scale-95"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" /> Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brewing Guide Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-stone-200">
          <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-800">
                  HERBAL BREWING WISDOM
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">
                  How to Brew for Peak Vitality
                </h3>
                <div className="mt-4 space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  <div className="flex items-start gap-3">
                    <Flame className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-stone-900">Warm Restorative Infusion</h4>
                      <p className="mt-0.5 text-xs text-stone-600">
                        Steep 1 full teaspoon in freshly boiled water (90°C) covered for 5–7 minutes. Drink after dinner for restful sleep or between meals for metabolic stimulation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CupSoda className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-stone-900">Chilled Summer Tonic</h4>
                      <p className="mt-0.5 text-xs text-stone-600">
                        Brew Rosella (Hibiscus) or Chamomile concentrated, chill in the refrigerator, and serve over ice with fresh mint and a spoonful of raw mountain honey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-50 border border-stone-200 flex items-center justify-center p-6">
                <Image
                  src="/images/products/prod-9.jpg"
                  alt="Usman's Pure Herbal Teas"
                  fill
                  sizes="400px"
                  className="object-contain p-4"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-square w-full rounded-2xl bg-stone-50 border border-stone-200 p-6 flex items-center justify-center">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  fill
                  sizes="320px"
                  className="object-contain p-4"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-extrabold uppercase bg-rose-600 text-white">
                  {quickViewProduct.discountBadge}
                </span>
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                  {quickViewProduct.categoryLabel} • {quickViewProduct.weight}
                </span>
                <h3 className="text-xl font-black text-stone-900 mt-1">
                  {quickViewProduct.title}
                </h3>

                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-stone-700">
                    {quickViewProduct.rating.toFixed(1)} ({quickViewProduct.reviewCount} Reviews)
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-2xl font-black text-stone-900">
                    {quickViewProduct.priceFormatted}
                  </span>
                  <span className="text-sm text-stone-400 line-through">
                    {quickViewProduct.originalPriceFormatted}
                  </span>
                </div>

                <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-stone-900 hover:bg-emerald-800 text-white flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart — {quickViewProduct.priceFormatted}
                  </button>

                  <Link
                    href={`/product/${quickViewProduct.id}`}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center gap-1.5 transition text-center"
                  >
                    View Full Product Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <StoreFooter />
    </div>
  );
}
