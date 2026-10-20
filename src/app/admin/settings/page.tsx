"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Save,
  CheckCircle2,
  Store,
  Truck,
  CreditCard,
  ShieldCheck,
  User,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { user } = useAuth();

  const [storeName, setStoreName] = useState("Usman's Pure Products");
  const [storePhone, setStorePhone] = useState("+92 300 8472910");
  const [storeEmail, setStoreEmail] = useState("support@usmanspure.com");
  const [storeAddress, setStoreAddress] = useState("Milling Facility, G.T. Road, Lahore, Punjab, Pakistan");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(2000);
  const [standardDeliveryFee, setStandardDeliveryFee] = useState(250);
  const [codEnabled, setCodEnabled] = useState(true);
  const [jazzCashEnabled, setJazzCashEnabled] = useState(true);
  const [easyPaisaEnabled, setEasyPaisaEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage("Settings saved successfully!");
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#1C1613] text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          Store Configuration & Operational Settings
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Store contact info, shipping fee rules, payment integrations, and staff security controls.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Store Identity */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Store className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Store Identity & Customer Support
              </h2>
              <p className="text-xs text-stone-500">Contact information displayed on customer invoices and website footer</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Store Business Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                WhatsApp / Support Helpline
              </label>
              <input
                type="text"
                value={storePhone}
                onChange={(e) => setStorePhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Official Support Email
              </label>
              <input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Facility Dispatch Address
              </label>
              <input
                type="text"
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold"
              />
            </div>
          </div>
        </div>

        {/* 2. Shipping & Delivery Rules */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Truck className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Shipping & Delivery Rules
              </h2>
              <p className="text-xs text-stone-500">Nationwide courier calculation and free shipping threshold</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Free Shipping Threshold (₨)
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold"
              />
              <p className="text-[11px] text-stone-500 mt-1">Orders above this amount qualify for zero delivery fee</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Standard Shipping Fee (₨)
              </label>
              <input
                type="number"
                value={standardDeliveryFee}
                onChange={(e) => setStandardDeliveryFee(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-xs font-semibold"
              />
              <p className="text-[11px] text-stone-500 mt-1">Applied on orders below the free shipping threshold</p>
            </div>
          </div>
        </div>

        {/* 3. Payment Methods */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <CreditCard className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Accepted Payment Gateways
              </h2>
              <p className="text-xs text-stone-500">Toggle active payment channels at checkout</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Cash on Delivery (COD)</p>
                <p className="text-[11px] text-stone-500">Pay courier on doorstep</p>
              </div>
              <input
                type="checkbox"
                checked={codEnabled}
                onChange={(e) => setCodEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-amber-900"
              />
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">JazzCash Digital</p>
                <p className="text-[11px] text-stone-500">Direct mobile wallet</p>
              </div>
              <input
                type="checkbox"
                checked={jazzCashEnabled}
                onChange={(e) => setJazzCashEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-amber-900"
              />
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">Easypaisa Wallet</p>
                <p className="text-[11px] text-stone-500">QR & direct account</p>
              </div>
              <input
                type="checkbox"
                checked={easyPaisaEnabled}
                onChange={(e) => setEasyPaisaEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-amber-900"
              />
            </div>
          </div>
        </div>

        {/* 4. Active Admin Account */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                Current Authenticated Administrator
              </h2>
              <p className="text-xs text-stone-500">Security credentials & role privileges</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <div className="w-10 h-10 rounded-full bg-amber-900 text-white flex items-center justify-center font-bold text-sm">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">{user?.name}</p>
              <p className="text-[11px] text-stone-500">{user?.email} • Role: {user?.role}</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1C1613] hover:bg-black text-white text-xs font-bold shadow-md transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Operational Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
