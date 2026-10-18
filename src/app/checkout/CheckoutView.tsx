"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { PRODUCTS, Product } from "@/data/products";
import {
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Truck,
  CheckCircle2,
  Trash2,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Banknote,
  Package,
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  pack: string;
  price: number;
  quantity: number;
  image: string;
}

export function CheckoutView() {
  const searchParams = useSearchParams();
  const paramProductId = searchParams.get("product");
  const paramPack = searchParams.get("pack") || "standard";
  const paramQty = parseInt(searchParams.get("qty") || "1", 10);

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    altPhone: "",
    city: "Lahore",
    address: "",
    notes: "",
    paymentMethod: "cod", // 'cod' | 'bank'
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState("");

  useEffect(() => {
    // 1. If direct product param passed from "Order Now" button
    if (paramProductId) {
      const foundProduct = PRODUCTS.find((p) => p.id === paramProductId);
      if (foundProduct) {
        const isLarge = paramPack === "large";
        const unitPrice = isLarge ? Math.round(foundProduct.price * 1.85) : foundProduct.price;
        const packLabel = isLarge ? "Family Double Pack" : `Standard Pack (${foundProduct.weight})`;

        setOrderItems([
          {
            id: foundProduct.id,
            name: foundProduct.title,
            pack: packLabel,
            price: unitPrice,
            quantity: Math.max(1, paramQty),
            image: foundProduct.image,
          },
        ]);
        setIsLoaded(true);
        return;
      }
    }

    // 2. Check localStorage cart if available
    try {
      const stored = localStorage.getItem("usman_cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrderItems(parsed);
          setIsLoaded(true);
          return;
        }
      }
    } catch {
      // ignore
    }

    // 3. Fallback to default featured product (Fat2Fuel 5kg)
    const defaultProduct = PRODUCTS.find((p) => p.id === "prod-3") || PRODUCTS[0];
    setOrderItems([
      {
        id: defaultProduct.id,
        name: defaultProduct.title,
        pack: `Standard Pack (${defaultProduct.weight})`,
        price: defaultProduct.price,
        quantity: 1,
        image: defaultProduct.image,
      },
    ]);
    setIsLoaded(true);
  }, [paramProductId, paramPack, paramQty]);

  const updateQuantity = (index: number, delta: number) => {
    setOrderItems((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index] = { ...updated[index], quantity: newQty };
      return updated;
    });
  };

  const removeItem = (index: number) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 2000;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 199;
  const grandTotal = subtotal + shippingFee;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `UPP-${randomNum}`;
    setGeneratedOrderId(orderId);
    setOrderConfirmed(true);

    // Save to localStorage or clear cart
    try {
      localStorage.removeItem("usman_cart");
      const cartEl = document.getElementById("cart-badge-count");
      if (cartEl) cartEl.innerText = "0";
    } catch {
      // ignore
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generateWhatsAppLink = () => {
    const itemsText = orderItems
      .map((i) => `• ${i.name} (${i.pack}) x ${i.quantity} = ₨${(i.price * i.quantity).toLocaleString()}`)
      .join("%0A");

    const text = `Hello Usman's Pure Products,%0A%0A*Order Inquiry / Cash on Delivery Request:*%0A${
      generatedOrderId ? `*Order ID:* ${generatedOrderId}%0A` : ""
    }${itemsText}%0A%0A*Subtotal:* ₨${subtotal.toLocaleString()}%0A*Delivery:* ${
      shippingFee === 0 ? "FREE" : "₨199"
    }%0A*Grand Total:* ₨${grandTotal.toLocaleString()}%0A%0A*Delivery Details:*%0AName: ${encodeURIComponent(
      formData.name || "Customer"
    )}%0APhone: ${encodeURIComponent(formData.phone || "N/A")}%0ACity: ${encodeURIComponent(
      formData.city
    )}%0AAddress: ${encodeURIComponent(formData.address || "N/A")}%0APayment: Cash on Delivery (COD)`;

    return `https://wa.me/923000000000?text=${text}`;
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      <Header isSolid theme="amber" />

      <main className="pt-28 sm:pt-32 flex-1 pb-16">
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
            <span className="font-bold text-stone-900">Cash on Delivery Order</span>
          </div>
        </div>

        <TickerMarquee />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {orderConfirmed ? (
            /* Order Success State */
            <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-xl text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block mb-3">
                Order Confirmed — Cash on Delivery
              </span>

              <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                Shukriya, {formData.name || "Valued Customer"}!
              </h1>

              <p className="mt-3 text-stone-600 text-sm leading-relaxed max-w-lg mx-auto">
                Your order <strong className="text-stone-900 font-bold">#{generatedOrderId}</strong> has been received and is being prepared fresh at our traditional chakki facility. Our delivery agent will call your phone (<span className="font-bold text-stone-900">{formData.phone}</span>) before delivery.
              </p>

              {/* Order Receipt Box */}
              <div className="mt-8 bg-stone-50 rounded-2xl border border-stone-200 p-6 text-left">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200 text-xs font-bold text-stone-500">
                  <span>Ordered Items ({orderItems.length})</span>
                  <span>Amount (PKR)</span>
                </div>

                <div className="divide-y divide-stone-200/60 py-2">
                  {orderItems.map((item, i) => (
                    <div key={i} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg bg-white border border-stone-200 overflow-hidden shrink-0 flex items-center justify-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-contain p-1"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-900 line-clamp-1">{item.name}</div>
                          <div className="text-[11px] text-stone-500">
                            {item.pack} • Qty: {item.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-black text-stone-900 shrink-0">
                        ₨{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-stone-200 space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-bold">₨{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Nationwide Delivery</span>
                    <span className="font-bold text-emerald-700">
                      {shippingFee === 0 ? "FREE" : "₨199"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-200">
                    <span>Payable on Delivery</span>
                    <span className="text-emerald-800 font-extrabold text-base">₨{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-200 text-xs text-stone-600 space-y-1">
                  <div>
                    <strong className="text-stone-900">Delivery Address:</strong> {formData.address},{" "}
                    {formData.city}
                  </div>
                  <div>
                    <strong className="text-stone-900">Estimated Dispatch:</strong> Within 24-48 Hours
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Receive WhatsApp Dispatch Updates</span>
                </a>

                <Link
                  href="/products"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          ) : (
            /* Checkout Form & Items Layout */
            <div>
              {/* Heading */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 mb-2">
                  <Banknote className="w-3.5 h-3.5" /> Cash on Delivery (Doorstep Delivery)
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                  Complete Your Pure Order
                </h1>
                <p className="mt-2 text-stone-600 text-xs sm:text-sm">
                  Zero advance payment required. Inspect your fresh stone-ground package at your doorstep and pay cash to the rider.
                </p>
              </div>

              {orderItems.length === 0 ? (
                <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-lg mx-auto">
                  <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-stone-900">No Product Selected</h3>
                  <p className="text-xs text-stone-500 mt-2 mb-6">
                    Please select a product from our catalog to place your Cash on Delivery order.
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-amber-800 transition"
                  >
                    <span>Browse Products Catalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Delivery Details Form (7 cols) */}
                  <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-sm">
                    <form onSubmit={handleSubmitOrder} className="space-y-6">
                      <div>
                        <h2 className="text-lg font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-amber-800" />
                          <span>1. Customer &amp; Delivery Address</span>
                        </h2>
                        <p className="text-xs text-stone-500 mt-1">
                          Please enter your complete address where the rider can deliver.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1.5">
                            Full Name <span className="text-rose-600">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Muhammad Usman"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700 transition"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1.5">
                            Mobile Phone Number <span className="text-rose-600">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="0300-1234567"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700 transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1.5">
                            City / District <span className="text-rose-600">*</span>
                          </label>
                          <select
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium text-stone-900 focus:outline-none focus:border-amber-700 transition bg-white"
                          >
                            <option value="Lahore">Lahore</option>
                            <option value="Karachi">Karachi</option>
                            <option value="Islamabad">Islamabad</option>
                            <option value="Rawalpindi">Rawalpindi</option>
                            <option value="Faisalabad">Faisalabad</option>
                            <option value="Multan">Multan</option>
                            <option value="Gujranwala">Gujranwala</option>
                            <option value="Peshawar">Peshawar</option>
                            <option value="Sialkot">Sialkot</option>
                            <option value="Quetta">Quetta</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Sargodha">Sargodha</option>
                            <option value="Abbottabad">Abbottabad</option>
                            <option value="Bahawalpur">Bahawalpur</option>
                            <option value="Other City">Other City (All Pakistan)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1.5">
                            Alternative Phone / WhatsApp (Optional)
                          </label>
                          <input
                            type="tel"
                            placeholder="0321-9876543"
                            value={formData.altPhone}
                            onChange={(e) => setFormData({ ...formData, altPhone: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700 transition"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5">
                          Full Delivery Address (House / Street / Colony) <span className="text-rose-600">*</span>
                        </label>
                        <textarea
                          required
                          rows={2}
                          placeholder="House #, Street name, Sector / Area / Colony, Landmark"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5">
                          Special Delivery Instructions / Notes (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Call before arrival, leave with neighbor if unavailable"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700 transition"
                        />
                      </div>

                      {/* Payment Method Option */}
                      <div className="pt-4 border-t border-stone-200">
                        <h2 className="text-sm font-extrabold text-stone-900 mb-3 flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-emerald-700" />
                          <span>2. Payment Option</span>
                        </h2>

                        <div className="space-y-3">
                          <label className="flex items-center gap-3 p-4 rounded-2xl border-2 border-emerald-700 bg-emerald-50/50 cursor-pointer">
                            <input
                              type="radio"
                              name="payment"
                              checked={formData.paymentMethod === "cod"}
                              onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                              className="w-4 h-4 text-emerald-700 focus:ring-emerald-700"
                            />
                            <div className="flex-1">
                              <div className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-2">
                                <span>Cash on Delivery (COD)</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-700 text-white">
                                  Default
                                </span>
                              </div>
                              <p className="text-[11px] text-stone-600 mt-0.5">
                                Pay cash when the courier hands over the fresh package at your doorstep. Zero risk.
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-4 px-6 rounded-2xl bg-stone-900 hover:bg-amber-900 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition duration-200 cursor-pointer active:scale-98"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <span>Confirm Cash on Delivery Order — ₨{grandTotal.toLocaleString()}</span>
                        </button>
                        <p className="text-center text-[11px] text-stone-500 mt-2">
                          🔒 By placing this order, you agree to inspect and receive your pure stone-ground essentials.
                        </p>
                      </div>
                    </form>
                  </div>

                  {/* Right Column: Order Summary (5 cols) */}
                  <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-sm lg:sticky lg:top-28">
                    <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                      <h2 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-amber-800" />
                        <span>Selected Products ({orderItems.length})</span>
                      </h2>
                      <Link href="/products" className="text-xs font-bold text-amber-800 hover:underline">
                        + Add More
                      </Link>
                    </div>

                    {/* Free Delivery Bar */}
                    <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs">
                      {amountToFreeShipping === 0 ? (
                        <div className="flex items-center gap-2 font-bold text-emerald-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Congratulations! Your order qualifies for FREE Delivery across Pakistan!</span>
                        </div>
                      ) : (
                        <div>
                          <div className="text-stone-700 font-medium">
                            Add <strong className="text-amber-900 font-black">₨{amountToFreeShipping.toLocaleString()}</strong> more to get <strong className="text-emerald-700 font-bold">FREE Delivery</strong> (Standard: ₨199).
                          </div>
                          <div className="w-full h-1.5 bg-amber-200 rounded-full mt-2 overflow-hidden">
                            <div
                              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Items List */}
                    <div className="divide-y divide-stone-100 my-4 max-h-80 overflow-y-auto pr-1">
                      {orderItems.map((item, index) => (
                        <div key={index} className="py-4 flex items-center justify-between gap-3">
                          <div className="relative w-16 h-16 rounded-xl bg-stone-50 border border-stone-200 overflow-hidden shrink-0 flex items-center justify-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="64px"
                              className="object-contain p-1"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                              {item.name}
                            </h4>
                            <div className="text-[11px] font-medium text-amber-900 mt-0.5">
                              {item.pack}
                            </div>
                            <div className="text-xs font-black text-stone-900 mt-1">
                              ₨{item.price.toLocaleString()}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                              <button
                                type="button"
                                onClick={() => updateQuantity(index, -1)}
                                className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-700 hover:bg-stone-200 rounded-l cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-xs font-black text-stone-900">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(index, 1)}
                                className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-700 hover:bg-stone-200 rounded-r cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="text-[10px] text-stone-400 hover:text-rose-600 transition"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="pt-4 border-t border-stone-200 space-y-2 text-xs">
                      <div className="flex justify-between text-stone-600">
                        <span>Items Subtotal</span>
                        <span className="font-bold text-stone-900">₨{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>Delivery Fee</span>
                        <span className="font-bold">
                          {shippingFee === 0 ? (
                            <span className="text-emerald-700 font-extrabold uppercase">FREE</span>
                          ) : (
                            "₨199"
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-base font-black text-stone-900 pt-3 border-t border-stone-200">
                        <span>Total Amount (PKR)</span>
                        <span className="text-emerald-800 text-lg">₨{grandTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-6 pt-5 border-t border-stone-200 grid grid-cols-3 gap-2 text-center text-[10px] text-stone-600 font-bold">
                      <div className="p-2 rounded-xl bg-stone-50 flex flex-col items-center gap-1">
                        <Truck className="w-4 h-4 text-emerald-700" />
                        <span>Doorstep Delivery</span>
                      </div>
                      <div className="p-2 rounded-xl bg-stone-50 flex flex-col items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        <span>100% Stone-Ground</span>
                      </div>
                      <div className="p-2 rounded-xl bg-stone-50 flex flex-col items-center gap-1">
                        <RotateCcw className="w-4 h-4 text-emerald-700" />
                        <span>14-Day Guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <StoreFooter />
    </div>
  );
}
