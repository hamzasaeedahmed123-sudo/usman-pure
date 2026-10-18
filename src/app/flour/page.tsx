"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { ChakkiProcessStory } from "@/components/ChakkiProcessStory";
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
  MessageCircle,
} from "lucide-react";

export default function FlourPage() {
  const flourProducts = PRODUCTS.filter((p) => p.category === "flours");
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
      <Header isSolid theme="amber" />

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
            <span className="font-bold text-stone-900">Stone-Ground Chakki Flours</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Hero Banner */}
        <div className="bg-stone-900 text-white py-14 sm:py-20 border-b border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> 100% Stone-Ground Whole Grain
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Stone-Ground Chakki Flours
              </h1>
              <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
                Milled slowly under 40°C in natural stone chakkis to preserve living vitamins, natural wheat germ, and dietary fiber. Zero maida mixing, zero chemical bleaching agents, and zero preservatives.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Cold stone-milling at <40°C",
                  "Formulated for Weight Loss & Diabetic Glucose Control",
                  "Preserves 100% Natural Dietary Fiber",
                  "Pliable, soft rotis that stay fresh all day",
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-bold px-3 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5"
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
              <h2 className="text-xl font-bold text-stone-900">Specialized Flour Blends</h2>
              <p className="text-xs text-stone-500">Showing {flourProducts.length} whole grain products</p>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-amber-800 hover:text-amber-900 transition flex items-center gap-1"
            >
              <span>View All Store Products</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {flourProducts.map((product) => {
              const isAdded = addedIds[product.id];
              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative w-full aspect-square bg-stone-50 overflow-hidden p-6 border-b border-stone-100 flex items-center justify-center">
                    <Link href={`/product/${product.id}`} className="absolute inset-0">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
                      <div className="text-[11px] uppercase tracking-wider font-bold text-amber-800 mb-1">
                        {product.categoryLabel}
                      </div>
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-base font-bold text-stone-900 leading-snug line-clamp-2 hover:text-amber-800 transition min-h-[44px]">
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

                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/checkout?product=${product.id}&pack=standard&qty=1`}
                          className="h-10 px-3 rounded-xl text-xs font-bold bg-stone-900 hover:bg-amber-800 text-white flex items-center gap-1 transition shadow-xs"
                        >
                          <Truck className="w-3.5 h-3.5 text-amber-400" />
                          <span>Order</span>
                        </Link>
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className={`h-10 px-3 rounded-xl text-xs font-bold flex items-center gap-1 transition-all duration-200 cursor-pointer border ${
                            isAdded
                              ? "bg-emerald-600 border-emerald-600 text-white"
                              : "bg-stone-100 hover:bg-stone-200 border-stone-200 text-stone-800"
                          }`}
                        >
                          {isAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Traditional Milling Comparison */}
        <ChakkiProcessStory />
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
                  <Link
                    href={`/checkout?product=${quickViewProduct.id}&pack=standard&qty=1`}
                    className="w-full py-3 px-4 rounded-xl text-sm font-extrabold bg-stone-900 hover:bg-amber-900 text-white flex items-center justify-center gap-2 transition cursor-pointer shadow-md text-center"
                  >
                    <Truck className="w-4 h-4 text-amber-400" /> Order Now — Cash on Delivery ({quickViewProduct.priceFormatted})
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        handleAddToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold border border-stone-300 hover:bg-stone-100 text-stone-800 flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Add to Basket
                    </button>

                    <Link
                      href={`/product/${quickViewProduct.id}`}
                      className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center gap-1 transition text-center"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
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
