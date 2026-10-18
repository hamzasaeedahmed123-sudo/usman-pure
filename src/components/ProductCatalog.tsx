"use client";

import { useState } from "react";
import Image from "next/image";
import { PRODUCTS, Product } from "@/data/products";
import {
  Star,
  ShoppingBag,
  Check,
  Eye,
  X,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  ExternalLink,
} from "lucide-react";

export function ProductCatalog({
  activeFilter = "all",
  setActiveFilter,
}: {
  activeFilter?: "all" | "flours" | "teas";
  setActiveFilter?: (filter: "all" | "flours" | "teas") => void;
}) {
  const [internalFilter, setInternalFilter] = useState<"all" | "flours" | "teas">("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});
  const [cartCount, setCartCount] = useState(0);

  const currentFilter = setActiveFilter ? activeFilter : internalFilter;
  const changeFilter = (f: "all" | "flours" | "teas") => {
    if (setActiveFilter) setActiveFilter(f);
    else setInternalFilter(f);
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (currentFilter === "all") return true;
    return p.category === currentFilter;
  });

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setCartCount((c) => c + 1);

    // Update global cart badge if present
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
    <section id="product-catalog" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching Virsa Pure */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Complete Product Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Featured Organic Essentials
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Every product is sourced with uncompromising purity, 100% stone-ground in traditional chakkis, and free from any chemical preservatives or artificial fillers.
          </p>
        </div>

        {/* Filter Tabs matching Virsa Pure's category tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12 flex-wrap">
          <button
            onClick={() => changeFilter("all")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
              currentFilter === "all"
                ? "bg-stone-900 text-white shadow-md shadow-stone-900/20"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            All Products ({PRODUCTS.length})
          </button>
          <button
            onClick={() => changeFilter("flours")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
              currentFilter === "flours"
                ? "bg-amber-800 text-white shadow-md shadow-amber-900/20"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            Stone-Ground Flours ({PRODUCTS.filter((p) => p.category === "flours").length})
          </button>
          <button
            onClick={() => changeFilter("teas")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition duration-200 cursor-pointer ${
              currentFilter === "teas"
                ? "bg-emerald-800 text-white shadow-md shadow-emerald-900/20"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            Organic Herbal Teas ({PRODUCTS.filter((p) => p.category === "teas").length})
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isAdded = addedIds[product.id];
            return (
              <div
                key={product.id}
                className="group relative flex flex-col bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-amber-300/80 transition-all duration-300 overflow-hidden"
              >
                {/* Product Image Box */}
                <div
                  onClick={() => setQuickViewProduct(product)}
                  className="relative w-full aspect-square bg-stone-50 overflow-hidden cursor-pointer flex items-center justify-center p-6 border-b border-stone-100"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Discount / Sale Badge */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-rose-600 text-white shadow-sm">
                      {product.discountBadge}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-900/80 text-white backdrop-blur-xs">
                      {product.weight}
                    </span>
                  </div>

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-x-4 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-white/95 text-stone-900 text-xs font-bold shadow-lg hover:bg-stone-900 hover:text-white transition flex items-center justify-center gap-1.5 backdrop-blur-sm cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> Quick View
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Label */}
                    <div className="text-[11px] uppercase tracking-wider font-bold text-amber-800 mb-1.5">
                      {product.categoryLabel}
                    </div>

                    {/* Product Title */}
                    <h3
                      onClick={() => setQuickViewProduct(product)}
                      className="text-base font-bold text-stone-900 leading-snug line-clamp-2 hover:text-amber-800 transition cursor-pointer min-h-[44px]"
                    >
                      {product.title}
                    </h3>

                    {/* Star Rating & Review count */}
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
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                        Cash on Delivery Available
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`h-10 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-sm ${
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
      </div>

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
            {/* Close Button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Product Modal Image */}
              <div className="relative aspect-square w-full rounded-2xl bg-stone-50 border border-stone-200/80 p-6 flex items-center justify-center">
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

              {/* Product Modal Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                    {quickViewProduct.categoryLabel} • {quickViewProduct.weight}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                    {quickViewProduct.title}
                  </h3>

                  {/* Rating */}
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

                  {/* Pricing */}
                  <div className="flex items-baseline gap-3 mt-4">
                    <span className="text-2xl font-black text-stone-900">
                      {quickViewProduct.priceFormatted}
                    </span>
                    <span className="text-sm text-stone-400 line-through">
                      {quickViewProduct.originalPriceFormatted}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded">
                      In Stock
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                    {quickViewProduct.description}
                  </p>

                  {/* Benefits */}
                  <div className="mt-4 space-y-1.5">
                    {quickViewProduct.benefits.slice(0, 3).map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
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

                  <a
                    href={`https://wa.me/923000000000?text=Hi%20Usman's%20Pure,%20I%20want%20to%20order%20${encodeURIComponent(
                      quickViewProduct.title
                    )}%20(${quickViewProduct.priceFormatted})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center gap-2 transition"
                  >
                    Order via WhatsApp Cash on Delivery
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
