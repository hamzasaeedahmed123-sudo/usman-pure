"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Trash2,
  Check,
  ArrowRight,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";

interface HeaderProps {
  theme?: "amber" | "green" | "terracotta";
  isSolid?: boolean;
}

export function Header({ theme = "amber", isSolid = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [cartItems, setCartItems] = useState([
    {
      id: "prod-3",
      name: "Fat2Fuel Advance Multigrain Flour",
      pack: "5kg Family Pack",
      price: 1150,
      quantity: 1,
    },
    {
      id: "prod-9",
      name: "Rosella Tea (Organic Hibiscus)",
      pack: "50g Stand-up Pouch",
      price: 1000,
      quantity: 1,
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchModalOpen(false);
        setCartDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Products", href: "/shop", badge: "11 Items" },
    { label: "Diet Flour", href: "/category/flours", badge: "Stone Ground" },
    { label: "Herbal Teas", href: "/category/teas", badge: "Pure Herbs" },
    { label: "Mega Bundles", href: "/bundles", badge: "Save ₨800" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Theme styling for header elements
  const themeClasses = {
    amber: {
      bar: "bg-[#452D17] text-[#F9F3EA]",
      glass: isSolid
        ? "bg-[#FAF5EC] border-[#D8C2A0]/80 text-[#3F2A17] shadow-md"
        : isScrolled
        ? "bg-[#FAF5EC]/90 border-[#D8C2A0]/70 text-[#3F2A17] shadow-lg shadow-[#3F2A17]/5"
        : "bg-white/45 border-white/60 text-[#3F2A17]",
      accent: "bg-[#54361C] hover:bg-[#3D2511] text-[#FAF5EC]",
      pill: "bg-[#EFE2CE] text-[#54361C] border-[#D8C2A0]",
      badge: "bg-[#54361C] text-[#FAF5EC]",
    },
    green: {
      bar: "bg-[#114427] text-[#EEF9F2]",
      glass: isSolid
        ? "bg-[#EDF8F1] border-[#B5DFCA]/80 text-[#124227] shadow-md"
        : isScrolled
        ? "bg-[#EDF8F1]/90 border-[#B5DFCA]/70 text-[#124227] shadow-lg shadow-[#124227]/5"
        : "bg-white/45 border-white/60 text-[#124227]",
      accent: "bg-[#145330] hover:bg-[#0D3B22] text-[#EEF9F2]",
      pill: "bg-[#DCF0E5] text-[#145330] border-[#B5DFCA]",
      badge: "bg-[#145330] text-[#EEF9F2]",
    },
    terracotta: {
      bar: "bg-[#661D0F] text-[#FDF4EF]",
      glass: isSolid
        ? "bg-[#FCF1EC] border-[#E8BFB2]/80 text-[#681E10] shadow-md"
        : isScrolled
        ? "bg-[#FCF1EC]/90 border-[#E8BFB2]/70 text-[#681E10] shadow-lg shadow-[#681E10]/5"
        : "bg-white/50 border-white/60 text-[#681E10]",
      accent: "bg-[#8D2D1B] hover:bg-[#6D2012] text-[#FDF4EF]",
      pill: "bg-[#F7DDD5] text-[#8D2D1B] border-[#E8BFB2]",
      badge: "bg-[#8D2D1B] text-[#FDF4EF]",
    },
  }[theme];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
        {/* Top Purity Ribbon */}
        <div
          className={`${themeClasses.bar} transition-colors duration-500 py-1.5 px-4 text-center text-[11px] sm:text-xs font-medium flex items-center justify-center gap-2 tracking-wide`}
        >
          <Sparkles className="w-3.5 h-3.5 opacity-90 animate-pulse text-amber-300" />
          <span>
            100% Certified Organic • Traditional Stone-Ground • Zero Preservatives
          </span>
          <span className="hidden md:inline-block opacity-60">|</span>
          <span className="hidden md:inline-flex items-center gap-1 font-semibold underline underline-offset-2">
            Free Nationwide Shipping on Orders ₨2,500+
          </span>
        </div>

        {/* Main Frosted Glass Navbar */}
        <div
          className={`mx-auto transition-all duration-300 backdrop-blur-xl border-b ${themeClasses.glass} px-4 sm:px-8 ${
            isScrolled || isSolid ? "py-2.5" : "py-3.5"
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Official Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
              aria-label="USMAN'S PURE PRODUCTS"
            >
              <div className="relative w-40 sm:w-52 h-10 sm:h-12 flex items-center">
                <Image
                  src="/logo.png"
                  alt="USMAN'S PURE PRODUCTS"
                  fill
                  sizes="(max-width: 640px) 160px, 210px"
                  className="object-contain object-left group-hover:scale-[1.02] transition-transform duration-300"
                  priority
                />
              </div>
              <span className="sr-only">USMAN&apos;S PURE PRODUCTS</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/60 border border-white/80 rounded-full px-4 py-1.5 backdrop-blur-md shadow-xs">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold hover:bg-black/5 transition duration-200 flex items-center gap-1.5 group tracking-tight text-stone-800"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${themeClasses.pill}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Header Utilities */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Quick Search Trigger */}
              <button
                onClick={() => setSearchModalOpen(true)}
                aria-label="Search Pure Products"
                className="cursor-pointer hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-white/80 hover:bg-white text-xs font-medium shadow-xs transition"
              >
                <Search className="w-3.5 h-3.5 opacity-70" />
                <span className="opacity-80">Search store...</span>
                <kbd className="hidden md:inline-block font-mono text-[10px] bg-black/5 px-1.5 py-0.5 rounded">
                  ⌘K
                </kbd>
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="cursor-pointer relative p-2.5 rounded-full bg-white/70 hover:bg-white border border-white/80 shadow-xs transition duration-200"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span
                  id="cart-badge-count"
                  className={`absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold shadow-xs ${themeClasses.badge}`}
                >
                  {cartItems.length}
                </span>
              </button>

              {/* Primary Call to Action */}
              <Link
                href="/shop"
                className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shadow-sm transition duration-200 ${themeClasses.accent}`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Shop Pure</span>
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full bg-white/70 hover:bg-white border border-white/80 transition"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Slide-down Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-black/10 animate-in fade-in slide-in-from-top-2 duration-200 bg-white/95 rounded-2xl p-4 shadow-xl">
              <div className="px-2 pb-2.5 mb-1 border-b border-black/10 flex items-center justify-between">
                <div className="relative w-36 h-9 flex items-center">
                  <Image
                    src="/logo.png"
                    alt="USMAN'S PURE PRODUCTS"
                    fill
                    sizes="150px"
                    className="object-contain object-left"
                  />
                </div>
                <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">
                  Menu
                </span>
              </div>
              <div className="flex flex-col gap-1 pb-2">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold hover:bg-stone-100 transition text-stone-900"
                  >
                    <span>{item.label}</span>
                    {item.badge ? (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${themeClasses.pill}`}
                      >
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronDown className="w-4 h-4 opacity-50 -rotate-90" />
                    )}
                  </Link>
                ))}

                <div className="pt-2 mt-1 border-t border-black/10 flex flex-col gap-2">
                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full text-center py-2.5 rounded-xl font-bold text-xs shadow-sm ${themeClasses.accent}`}
                  >
                    Explore Pure Catalog
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl font-bold text-xs bg-emerald-700 text-white shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" /> View Cart &amp; Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Quick Search Modal Dialog */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-white/70 bg-white/95 backdrop-blur-2xl p-5 shadow-2xl text-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-stone-200">
              <Search className="w-5 h-5 text-amber-800" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flour, herbal teas, bundles..."
                autoFocus
                className="w-full bg-transparent text-sm font-medium focus:outline-none placeholder:text-stone-400"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-md text-stone-400 hover:text-stone-800 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 max-h-72 overflow-y-auto space-y-1.5">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    onClick={() => setSearchModalOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-stone-100 transition text-xs group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg bg-stone-50 border border-stone-200 p-1 shrink-0 overflow-hidden">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="40px"
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-stone-900 group-hover:text-amber-800">
                          {p.title}
                        </div>
                        <div className="text-[10px] text-stone-500 font-medium">
                          {p.categoryLabel} • {p.weight}
                        </div>
                      </div>
                    </div>
                    <span className="font-black text-stone-900 bg-stone-100 px-2.5 py-1 rounded-md">
                      {p.priceFormatted}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="py-6 text-center text-xs text-stone-500">
                  No products found matching &ldquo;{searchQuery}&rdquo;.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Mini Cart Drawer */}
      {cartDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setCartDrawerOpen(false)}
        >
          <div
            className="w-full max-w-md h-full bg-white/95 backdrop-blur-2xl border-l border-white/60 p-6 flex flex-col justify-between shadow-2xl text-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-800" />
                  <span className="font-bold text-base tracking-tight">
                    Your Pure Basket
                  </span>
                  <span className="text-xs text-stone-500 font-mono">
                    ({cartItems.length} items)
                  </span>
                </div>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-bold text-stone-900">
                        {item.name}
                      </div>
                      <div className="text-xs text-stone-500 font-medium">
                        {item.pack} • Qty: {item.quantity}
                      </div>
                      <div className="text-xs font-black text-stone-900 mt-1">
                        ₨{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setCartItems(cartItems.filter((i) => i.id !== item.id))
                      }
                      className="p-1.5 text-stone-400 hover:text-red-500 transition cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500 font-medium">Order Subtotal:</span>
                <span className="text-xl font-black text-stone-900">
                  ₨{cartTotal.toLocaleString()}
                </span>
              </div>
              <Link
                href="/cart"
                onClick={() => setCartDrawerOpen(false)}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-amber-800 hover:bg-amber-900 shadow-md shadow-amber-900/20 transition duration-200 flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>View Cart &amp; Cash on Delivery Checkout</span>
              </Link>
              <div className="text-center text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Purity Certified • 14-Day Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
