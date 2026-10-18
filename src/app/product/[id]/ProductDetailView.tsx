"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { PRODUCTS, Product } from "@/data/products";
import {
  Star,
  ShoppingBag,
  Check,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Truck,
  MessageCircle,
  Sparkles,
} from "lucide-react";

interface ProductDetailViewProps {
  id: string;
}

export function ProductDetailView({ id }: ProductDetailViewProps) {
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return notFound();
  }

  const [quantity, setQuantity] = useState(1);
  const [selectedPack, setSelectedPack] = useState<"standard" | "large">("standard");
  const [activeTab, setActiveTab] = useState<"overview" | "benefits" | "usage" | "reviews">("overview");
  const [isAdded, setIsAdded] = useState(false);

  const packMultiplier = selectedPack === "large" ? 1.85 : 1;
  const unitPrice = Math.round(product.price * packMultiplier);
  const originalUnitPrice = Math.round(product.originalPrice * packMultiplier);
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    setIsAdded(true);
    const cartEl = document.getElementById("cart-badge-count");
    if (cartEl) {
      const current = parseInt(cartEl.innerText || "0", 10) + quantity;
      cartEl.innerText = current.toString();
    }
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 8);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      <Header isSolid theme="amber" />

      <main className="pt-28 sm:pt-32 flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-amber-800 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <Link href="/shop" className="hover:text-amber-800 transition">
              Collections
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <Link
              href={product.category === "flours" ? "/category/flours" : "/category/teas"}
              className="hover:text-amber-800 transition"
            >
              {product.categoryLabel}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="font-bold text-stone-900 truncate">{product.title}</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Product Showcase Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Image Showcase (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full aspect-square rounded-3xl bg-stone-50 border border-stone-200/80 p-8 flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                    className="object-contain p-4 hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                    {product.discountBadge}
                  </span>
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-900 text-white">
                    {product.weight}
                  </span>
                </div>

                {/* Trust mini-bar */}
                <div className="mt-6 grid grid-cols-3 gap-3 w-full text-center">
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/60 text-[11px] font-bold text-stone-700 flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Lab Verified</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/60 text-[11px] font-bold text-stone-700 flex flex-col items-center gap-1">
                    <RotateCcw className="w-4 h-4 text-emerald-700" />
                    <span>14-Day Return</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/60 text-[11px] font-bold text-stone-700 flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <span>Doorstep COD</span>
                  </div>
                </div>
              </div>

              {/* Right Product Controls (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800">
                      {product.categoryLabel}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-xs font-bold text-emerald-700">In Stock (Freshly Milled)</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-snug">
                    {product.title}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-stone-800">{product.rating.toFixed(1)}</span>
                    <span className="text-xs text-stone-500">({product.reviewCount} Verified Reviews)</span>
                  </div>

                  {/* Price Row */}
                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-stone-900">
                      ₨{unitPrice.toLocaleString()}
                    </span>
                    <span className="text-lg text-stone-400 line-through">
                      ₨{originalUnitPrice.toLocaleString()}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold uppercase bg-emerald-100 text-emerald-800">
                      Save ₨{(originalUnitPrice - unitPrice).toLocaleString()}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-stone-600 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Benefits List */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-stone-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pack Selector */}
                  <div className="mt-6">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-2">
                      Select Packaging:
                    </label>
                    <div className="grid grid-cols-2 gap-3 max-w-md">
                      <button
                        onClick={() => setSelectedPack("standard")}
                        className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                          selectedPack === "standard"
                            ? "border-stone-900 bg-stone-900 text-white shadow-md"
                            : "border-stone-200 bg-stone-50 text-stone-800 hover:border-stone-400"
                        }`}
                      >
                        <div className="text-xs font-bold">Standard Pack ({product.weight})</div>
                        <div className="text-sm font-black mt-1">₨{product.price.toLocaleString()}</div>
                      </button>

                      <button
                        onClick={() => setSelectedPack("large")}
                        className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                          selectedPack === "large"
                            ? "border-stone-900 bg-stone-900 text-white shadow-md"
                            : "border-stone-200 bg-stone-50 text-stone-800 hover:border-stone-400"
                        }`}
                      >
                        <div className="text-xs font-bold">Family Double Pack (Save More)</div>
                        <div className="text-sm font-black mt-1">₨{Math.round(product.price * 1.85).toLocaleString()}</div>
                      </button>
                    </div>
                  </div>

                  {/* Quantity & Action Buttons */}
                  <div className="mt-6 space-y-3">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {/* Quantity Selector */}
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

                      {/* Primary Order Now Button (Navigates to /checkout with selected product) */}
                      <Link
                        href={`/checkout?product=${product.id}&pack=${selectedPack}&qty=${quantity}`}
                        className="flex-1 py-3.5 px-6 rounded-xl text-sm font-extrabold bg-stone-900 hover:bg-amber-900 text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition duration-200 cursor-pointer active:scale-98 text-center"
                      >
                        <Truck className="w-5 h-5 text-amber-400" />
                        <span>Order Now — Cash on Delivery (₨{totalPrice.toLocaleString()})</span>
                      </Link>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      {/* Secondary Add to Cart */}
                      <button
                        onClick={handleAddToCart}
                        className={`flex-1 py-3 px-5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer border ${
                          isAdded
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "bg-white hover:bg-stone-100 border-stone-300 text-stone-800"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" /> Added to Basket
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4 text-stone-600" /> Add to Basket
                          </>
                        )}
                      </button>

                      {/* Tertiary WhatsApp COD Order */}
                      <a
                        href={`https://wa.me/923000000000?text=Hello%20Usman's%20Pure,%20I%20want%20to%20order%20${encodeURIComponent(
                          product.title
                        )}%20(${selectedPack}%20x%20${quantity}%20=%20₨${totalPrice})%20with%20Cash%20on%20Delivery.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-5 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center gap-2 transition shadow-xs"
                      >
                        <MessageCircle className="w-4 h-4" /> Order via WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Tabs */}
            <div className="mt-14 pt-10 border-t border-stone-200">
              <div className="flex items-center gap-2 sm:gap-4 border-b border-stone-200 overflow-x-auto pb-2">
                {[
                  { key: "overview", label: "Product Overview" },
                  { key: "benefits", label: "Nutritional & Clinical Benefits" },
                  { key: "usage", label: "Preparation & Brewing Guide" },
                  { key: "reviews", label: `Customer Reviews (${product.reviewCount})` },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`pb-3 text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
                      activeTab === tab.key
                        ? "text-stone-900 border-b-2 border-stone-900"
                        : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="py-6">
                {activeTab === "overview" && (
                  <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
                    <p>{product.description}</p>
                    <p>
                      Milled in traditional stone chakkis under 40°C. We guarantee zero maida mixing, zero chemical bleaching, and zero synthetic preservatives. Freshly packed in UV-shielded packaging to preserve aroma and living nutrients.
                    </p>
                  </div>
                )}

                {activeTab === "benefits" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                    {product.benefits.map((b, i) => (
                      <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs font-bold text-stone-800">{b}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "usage" && (
                  <div className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
                    {product.category === "flours" ? (
                      <>
                        <h4 className="font-bold text-stone-900">How to Knead &amp; Cook Soft Stone-Ground Rotis:</h4>
                        <ol className="list-decimal pl-5 space-y-1.5 text-xs text-stone-600">
                          <li>Use lukewarm water for kneading. Wholesome stone-ground flour naturally absorbs slightly more water than refined flour.</li>
                          <li>Let the kneaded dough rest for 15–20 minutes to allow natural bran to hydrate completely.</li>
                          <li>Roll into rotis and bake on a hot tawa. Cook each side evenly until soft and puffed.</li>
                        </ol>
                      </>
                    ) : (
                      <>
                        <h4 className="font-bold text-stone-900">How to Brew the Perfect Organic Infusion:</h4>
                        <ol className="list-decimal pl-5 space-y-1.5 text-xs text-stone-600">
                          <li>Add 1 full teaspoon of dried herbs to 1 cup of freshly boiled water (approx. 90°C).</li>
                          <li>Cover with a lid and let steep for 5–7 minutes to preserve essential aromatic volatile oils.</li>
                          <li>Strain and enjoy warm, or chill with ice cubes and a drizzle of raw honey for an iced tonic.</li>
                        </ol>
                      </>
                    )}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-4 max-w-3xl">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                      <div className="text-3xl font-black text-amber-900">{product.rating.toFixed(1)}</div>
                      <div>
                        <div className="flex items-center text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <div className="text-xs text-amber-900 font-bold mt-0.5">
                          Based on {product.reviewCount} verified Pakistani household reviews
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section - When scrolling down, other products are listed */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-200 text-stone-800 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" /> More From Usman&apos;s Pure
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Other Pure Essentials You May Like
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Explore our full line of slow-milled diet flours, cold-pounded spices, and organic teas.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 hover:underline"
            >
              <span>Explore All Products ({PRODUCTS.length})</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="group bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <Link href={`/product/${rel.id}`} className="block">
                    <div className="relative aspect-square w-full rounded-xl bg-stone-50 overflow-hidden mb-3 flex items-center justify-center border border-stone-100">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-600 text-white">
                        {rel.discountBadge}
                      </span>
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-stone-900/80 text-white">
                        {rel.weight}
                      </span>
                    </div>

                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 mb-1">
                      {rel.categoryLabel}
                    </div>
                    <h4 className="text-xs font-bold text-stone-900 line-clamp-2 group-hover:text-amber-800 transition min-h-[32px]">
                      {rel.title}
                    </h4>
                  </Link>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-sm font-black text-stone-900">{rel.priceFormatted}</span>
                    <span className="text-xs text-stone-400 line-through">{rel.originalPriceFormatted}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2">
                  <Link
                    href={`/checkout?product=${rel.id}&pack=standard&qty=1`}
                    className="flex-1 py-2 px-3 rounded-xl bg-stone-900 hover:bg-amber-800 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition text-center"
                  >
                    <Truck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Order (COD)</span>
                  </Link>
                  <Link
                    href={`/product/${rel.id}`}
                    className="py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold transition text-center"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Mobile Order Bar */}
        <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 z-30 shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 shrink-0 overflow-hidden">
              <Image src={product.image} alt={product.title} fill sizes="40px" className="object-contain p-0.5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-stone-900 truncate">{product.title}</div>
              <div className="text-xs font-black text-emerald-800">₨{totalPrice.toLocaleString()}</div>
            </div>
          </div>
          <Link
            href={`/checkout?product=${product.id}&pack=${selectedPack}&qty=${quantity}`}
            className="py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-amber-800 text-white text-xs font-extrabold shrink-0 flex items-center gap-1.5 shadow-md active:scale-95"
          >
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>Order (COD)</span>
          </Link>
        </div>
      </main>

      <StoreFooter />
    </div>
  );
}
