"use client";

import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
} from "lucide-react";

export function StoreFooter() {
  return (
    <footer className="bg-stone-950 text-stone-300 text-xs border-t border-stone-800">
      {/* Top Banner inside Footer */}
      <div className="border-b border-stone-800/80 py-8 bg-stone-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Truck className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <h5 className="font-bold text-white text-sm">Nationwide Cash on Delivery</h5>
                <p className="text-[11px] text-stone-400">Doorstep delivery to every city across Pakistan</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <RotateCcw className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <h5 className="font-bold text-white text-sm">14-Day Money Back Guarantee</h5>
                <p className="text-[11px] text-stone-400">100% satisfaction or immediate hassle-free refund</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <h5 className="font-bold text-white text-sm">100% Stone-Ground Purity</h5>
                <p className="text-[11px] text-stone-400">Zero maida, zero chemical bleaching, lab-verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Bio (2 cols on lg) */}
          <div className="lg:col-span-2">
            <div className="relative w-48 h-12 mb-4">
              <Image
                src="/logo.png"
                alt="Usman's Pure Products"
                fill
                sizes="192px"
                className="object-contain object-left invert brightness-200"
              />
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm mt-3">
              Usman&apos;s Pure Products is dedicated to reviving ancient dietary traditions. We specialize in slow-milled stone-chakki flours and pure organic herbal infusions crafted with zero preservatives, chemicals, or roller-mill adulterants.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Support</span>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <a href="#product-catalog" className="hover:text-amber-400 transition">
                  All Products
                </a>
              </li>
              <li>
                <a href="#product-catalog" className="hover:text-amber-400 transition">
                  Stone-Ground Atta
                </a>
              </li>
              <li>
                <a href="#product-catalog" className="hover:text-amber-400 transition">
                  Weight Loss Flour
                </a>
              </li>
              <li>
                <a href="#product-catalog" className="hover:text-amber-400 transition">
                  Diabetic Control Flour
                </a>
              </li>
              <li>
                <a href="#product-catalog" className="hover:text-amber-400 transition">
                  Organic Herbal Teas
                </a>
              </li>
              <li>
                <a href="#product-catalog" className="hover:text-amber-400 transition">
                  Mega Bundles
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <a href="#purity" className="hover:text-amber-400 transition">
                  14-Day Return Guarantee
                </a>
              </li>
              <li>
                <a href="#purity" className="hover:text-amber-400 transition">
                  Shipping & Delivery Info
                </a>
              </li>
              <li>
                <a href="#purity" className="hover:text-amber-400 transition">
                  Lab Test Certificates
                </a>
              </li>
              <li>
                <a href="#purity" className="hover:text-amber-400 transition">
                  Customized Diet Plans
                </a>
              </li>
              <li>
                <a href="#purity" className="hover:text-amber-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#purity" className="hover:text-amber-400 transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-stone-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>+92 300 0000000 / UAN Support</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>info@usmanzpure.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Lahore &amp; Faisalabad, Pakistan (Nationwide Delivery)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Payment Badges & Copyright */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-[11px] text-center sm:text-left">
            © 2026 Usman&apos;s Pure Products. All rights reserved. Pure Food. Real Nutrition.
          </p>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[10px] font-bold text-stone-400">
              Cash on Delivery (COD)
            </span>
            <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[10px] font-bold text-stone-400">
              Online Bank Transfer
            </span>
            <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[10px] font-bold text-stone-400">
              JazzCash / EasyPaisa
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
