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
} from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(2);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Pure Oils", href: "#pure-oils", badge: "Cold-Pressed" },
    { label: "Raw Honey", href: "#raw-honey" },
    { label: "Organic Herbs", href: "#organic-herbs" },
    { label: "Purity Standards", href: "#purity-standards" },
    { label: "Lab Reports", href: "#lab-reports" },
  ];

  return (
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
            <Link
              href="#cart"
              className="relative p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/70 hover:bg-zinc-800/80 text-zinc-300 hover:text-white transition duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-[10px] font-bold text-zinc-950 shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

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
  );
}
