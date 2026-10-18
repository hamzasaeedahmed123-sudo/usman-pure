"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Leaf,
  ShoppingBag,
  Search,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Trash2,
} from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [cartItems, setCartItems] = useState([
    {
      id: "prod-1",
      name: "Cold-Pressed Black Seed Oil",
      volume: "250ml",
      price: 28.0,
      quantity: 1,
    },
    {
      id: "prod-2",
      name: "Raw Wild Sidr Honey",
      volume: "500g",
      price: 42.0,
      quantity: 1,
    },
  ]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Command/Ctrl + K shortcut for search
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
    { label: "Pure Oils", href: "#pure-oils", badge: "Cold-Pressed" },
    { label: "Raw Honey", href: "#raw-honey" },
    { label: "Organic Herbs", href: "#organic-herbs" },
    { label: "Purity Standards", href: "#purity-standards" },
    { label: "Lab Reports", href: "#lab-reports" },
  ];

  const searchableProducts = [
    { name: "Cold-Pressed Black Seed Oil", category: "Pure Oils", price: "$28.00" },
    { name: "Raw Wild Sidr Honey", category: "Raw Honey", price: "$42.00" },
    { name: "Extra Virgin Cold-Pressed Olive Oil", category: "Pure Oils", price: "$32.00" },
    { name: "Pure Sweet Almond Oil", category: "Pure Oils", price: "$24.00" },
    { name: "Grade-A Kashmiri Saffron", category: "Organic Herbs", price: "$45.00" },
  ];

  const filteredProducts = searchableProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-emerald-950 via-zinc-900 to-emerald-950 border-b border-emerald-500/20 px-4 py-1.5 text-center text-[11px] sm:text-xs font-medium text-emerald-300 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>100% Certified Organic & Cold-Pressed. Free delivery on orders over $50.</span>
          <span className="hidden md:inline-flex items-center gap-1 font-semibold text-emerald-200 underline underline-offset-2">
            View Lab Certificates <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Main Glassmorphic Navigation Bar */}
        <div
          className={`mx-auto transition-all duration-300 ${
            isScrolled
              ? "bg-zinc-950/85 backdrop-blur-xl border-b border-zinc-800/80 shadow-2xl py-3 px-4 sm:px-8"
              : "bg-zinc-950/50 backdrop-blur-md border-b border-zinc-800/40 py-4 px-4 sm:px-8"
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-emerald-600/30 border border-emerald-500/30 group-hover:border-emerald-400/60 shadow-lg shadow-emerald-500/10 transition duration-300">
                <Leaf className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-emerald-300 transition">
                    Usman&apos;s Pure
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Organic
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono tracking-wider -mt-0.5">
                  Nature In Its Purest Form
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/70 rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition duration-200 flex items-center gap-1.5 group"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Header Utilities / Right CTA */}
            <div className="flex items-center gap-3">
              {/* Search Trigger */}
              <button
                onClick={() => setSearchModalOpen(true)}
                aria-label="Search Pure Products"
                className="cursor-pointer hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 text-xs transition"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search...</span>
                <kbd className="hidden md:inline-block font-mono text-[10px] bg-zinc-800 text-zinc-400 px-1 rounded border border-zinc-700">
                  ⌘K
                </kbd>
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={() => setCartDrawerOpen(true)}
                className="cursor-pointer relative p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/70 hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition duration-200"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-[10px] font-bold text-zinc-950 shadow-md animate-pulse">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* Primary Action Button */}
              <Link
                href="#pure-oils"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition duration-200"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Shop Pure</span>
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-zinc-800/80 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col gap-1.5 pb-2">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900/90 transition"
                  >
                    <span>{item.label}</span>
                    {item.badge ? (
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-600 -rotate-90" />
                    )}
                  </Link>
                ))}

                <div className="pt-2 mt-1 border-t border-zinc-800 flex gap-2">
                  <Link
                    href="#pure-oils"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md"
                  >
                    Browse Pure Collection
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Quick Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900/95 p-4 shadow-2xl">
            <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
              <Search className="w-5 h-5 text-emerald-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search oils, honey, organic herbs..."
                autoFocus
                className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-zinc-500"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 max-h-60 overflow-y-auto space-y-1">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <Link
                    key={p.name}
                    href="#pure-oils"
                    onClick={() => setSearchModalOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-800/70 transition text-xs text-zinc-300"
                  >
                    <div>
                      <div className="font-semibold text-white">{p.name}</div>
                      <div className="text-[10px] text-zinc-500">{p.category}</div>
                    </div>
                    <span className="font-bold text-emerald-400">{p.price}</span>
                  </Link>
                ))
              ) : (
                <div className="py-6 text-center text-xs text-zinc-500">
                  No matching pure items found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Mini-Cart Drawer */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-zinc-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md h-full bg-zinc-900/95 border-l border-zinc-800 p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-white text-base">Your Pure Basket</span>
                  <span className="text-xs text-zinc-400 font-mono">({cartItems.length} items)</span>
                </div>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/70 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-semibold text-zinc-100">{item.name}</div>
                      <div className="text-xs text-zinc-400">{item.volume} • Qty: {item.quantity}</div>
                      <div className="text-xs font-bold text-emerald-400 mt-1">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-zinc-400">Estimated Total:</span>
                <span className="text-lg font-extrabold text-white">${cartSubtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={() => alert("Proceeding to checkout with 100% Purity Guarantee!")}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-zinc-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/20 transition duration-200"
              >
                Proceed to Secure Checkout
              </button>
              <div className="mt-2 text-center text-[11px] text-zinc-500">
                🔒 256-bit encrypted • 100% Money-back Purity Guarantee
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
