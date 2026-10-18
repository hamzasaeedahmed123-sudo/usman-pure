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
  Search,
  Filter,
  ArrowUpDown,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Truck,
  Sparkles,
} from "lucide-react";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "flours" | "teas">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
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

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      {/* Top Header in Solid Mode */}
      <Header isSolid theme="amber" />

      {/* Page Body Offset for Fixed Header */}
      <main className="pt-28 sm:pt-32 flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-stone-500">
            <Link href="/" className="hover:text-amber-800 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-bold text-stone-900">All Products</span>
          </div>
        </div>

        {/* Marquee Ticker */}
        <TickerMarquee />

        {/* Collection Hero Header */}
        <div className="bg-stone-900 text-white py-12 sm:py-16 border-b border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Complete Pure Inventory
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                All Pure Products ({PRODUCTS.length})
              </h1>
              <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
                Discover unadulterated stone-chakki flours and organic herbal teas directly from smallholder certified farms. 100% whole grain, zero maida, zero bleaching agents.
              </p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border-b border-stone-200 sticky top-20 z-20 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                    selectedCategory === "all"
                      ? "bg-stone-900 text-white shadow-sm"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  All Items ({PRODUCTS.length})
                </button>
                <button
                  onClick={() => setSelectedCategory("flours")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                    selectedCategory === "flours"
                      ? "bg-amber-800 text-white shadow-sm"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  Diet &amp; Chakki Flours ({PRODUCTS.filter((p) => p.category === "flours").length})
                </button>
                <button
                  onClick={() => setSelectedCategory("teas")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                    selectedCategory === "teas"
                      ? "bg-emerald-800 text-white shadow-sm"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  Organic Herbal Teas ({PRODUCTS.filter((p) => p.category === "teas").length})
                </button>
              </div>

              {/* Search & Sort Controls */}
              <div className="flex items-center gap-3">
                {/* Search Input */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search product..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-600 transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative shrink-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="pl-3 pr-8 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-bold text-stone-800 focus:outline-none focus:border-amber-600 transition appearance-none cursor-pointer"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ArrowUpDown className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-stone-200 p-8 max-w-md mx-auto">
              <Search className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-stone-800">No products matched your search</h3>
              <p className="text-xs text-stone-500 mt-1">
                Try searching with different keywords or reset your category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-5 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product) => {
                const isAdded = addedIds[product.id];
                return (
                  <div
                    key={product.id}
                    className="group relative flex flex-col bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 overflow-hidden"
                  >
                    {/* Product Image Link */}
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

                      {/* Discount Badges */}
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase bg-rose-600 text-white shadow-xs">
                          {product.discountBadge}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-900/80 text-white">
                          {product.weight}
                        </span>
                      </div>

                      {/* Quick View Button */}
                      <div className="absolute inset-x-4 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="w-full py-2 px-3 rounded-lg bg-white/95 text-stone-900 text-xs font-bold shadow-md hover:bg-stone-900 hover:text-white transition flex items-center justify-center gap-1.5 backdrop-blur-xs cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" /> Quick View
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider font-bold text-amber-800 mb-1">
                          {product.categoryLabel}
                        </div>
                        <Link href={`/product/${product.id}`}>
                          <h2 className="text-base font-bold text-stone-900 leading-snug line-clamp-2 hover:text-amber-800 transition min-h-[44px]">
                            {product.title}
                          </h2>
                        </Link>

                        {/* Star Rating */}
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

                      {/* Price & Action Row */}
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
                              : "bg-stone-900 hover:bg-amber-800 text-white active:scale-95"
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
          )}
        </div>

        {/* Trust Badges Bar */}
        <div className="bg-white border-t border-stone-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-4">
                <RotateCcw className="w-8 h-8 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">14-Day Money Back Guarantee</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    If not 100% satisfied with purity or taste, return with zero hassle.
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-4">
                <Truck className="w-8 h-8 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Nationwide Cash on Delivery</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Doorstep COD across Lahore, Karachi, Islamabad, and every town in Pakistan.
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">100% Stone-Ground Purity</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Cold-milled under 40°C. Zero maida, zero bleach, zero chemical preservatives.
                  </p>
                </div>
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
                    className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-stone-900 hover:bg-amber-800 text-white flex items-center justify-center gap-2 transition cursor-pointer"
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

      {/* Footer */}
      <StoreFooter />
    </div>
  );
}
