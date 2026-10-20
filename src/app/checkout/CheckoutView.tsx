"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useStoreData } from "@/context/StoreDataContext";
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
  Phone,
  MapPin,
  Building,
  CreditCard,
  Banknote,
  Package,
  Smartphone,
  Copy,
  Check,
  Upload,
  Lock,
  AlertCircle,
  FileText,
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
    paymentMethod: "cod" as "cod" | "wallet" | "card",
    walletProvider: "jazzcash" as "jazzcash" | "easypaisa",
    transactionId: "",
    screenshotFileName: "",
    cardHolderName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

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

  const { clearCart } = useCart();
  const { addOrder } = useStoreData();

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `UPP-${randomNum}`;
    setGeneratedOrderId(orderId);

    // Save to real StoreDataContext
    const paymentMethodLabel =
      formData.paymentMethod === "cod"
        ? "Cash on Delivery (COD)"
        : formData.paymentMethod === "wallet"
        ? (formData.walletProvider === "jazzcash" ? "JazzCash" : "Easypaisa")
        : "Bank Transfer";

    addOrder({
      orderNumber: orderId,
      customerName: formData.name || "Customer",
      customerEmail: formData.phone
        ? `${formData.phone.replace(/[^0-9]/g, "")}@customer.pk`
        : "guest@usmanspure.com",
      phone: formData.phone || "N/A",
      address: formData.address || "N/A",
      city: formData.city || "Lahore",
      items: orderItems.map((item) => ({
        id: item.id,
        name: item.name,
        pack: item.pack,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalAmount: grandTotal,
      status: "Pending",
      paymentMethod: paymentMethodLabel,
      notes:
        formData.notes ||
        (formData.transactionId ? `TID: ${formData.transactionId}` : undefined),
    });

    setOrderConfirmed(true);

    // Clear cart in context and storage
    clearCart();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generateWhatsAppLink = () => {
    const itemsText = orderItems
      .map((i) => `• ${i.name} (${i.pack}) x ${i.quantity} = ₨${(i.price * i.quantity).toLocaleString()}`)
      .join("%0A");

    const paymentLabel =
      formData.paymentMethod === "cod"
        ? "Cash on Delivery (COD) - Payable at Doorstep"
        : formData.paymentMethod === "wallet"
        ? `JazzCash / Easypaisa ${formData.transactionId ? `(TID: ${formData.transactionId})` : "(Transfer Slip / Screenshot Attached)"}`
        : "Debit / Credit Card (Direct Gateway)";

    const text = `Hello Usman's Pure Products,%0A%0A*Order Booking Request:*%0A${
      generatedOrderId ? `*Order ID:* ${generatedOrderId}%0A` : ""
    }${itemsText}%0A%0A*Subtotal:* ₨${subtotal.toLocaleString()}%0A*Delivery:* ${
      shippingFee === 0 ? "FREE" : "₨199"
    }%0A*Grand Total:* ₨${grandTotal.toLocaleString()}%0A%0A*Delivery Details:*%0AName: ${encodeURIComponent(
      formData.name || "Customer"
    )}%0APhone: ${encodeURIComponent(formData.phone || "N/A")}%0ACity: ${encodeURIComponent(
      formData.city
    )}%0AAddress: ${encodeURIComponent(formData.address || "N/A")}%0A*Payment Method:* ${encodeURIComponent(
      paymentLabel
    )}`;

    return `https://wa.me/923000000000?text=${text}`;
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      <Header isSolid theme="amber" />

      <main className="flex-1 pb-16">
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
            <span className="font-bold text-stone-900">Checkout &amp; Payment</span>
          </div>
        </div>

        <TickerMarquee />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {orderConfirmed ? (
            /* Order Success State */
            <div className="max-w-2xl mx-auto bg-white rounded-sm border border-stone-200 p-8 sm:p-12 shadow-ambient text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <span className="inline-block mb-3 tag-quiet">
                {formData.paymentMethod === "cod" && "Order Confirmed — Cash on Delivery"}
                {formData.paymentMethod === "wallet" && "Transfer Details Submitted — Mobile Wallet"}
                {formData.paymentMethod === "card" && "Payment Successful — Debit / Credit Card"}
              </span>

              <h1 className="text-2xl sm:text-4xl font-semibold text-stone-900 tracking-tight">
                Shukriya, {formData.name || "Valued Customer"}!
              </h1>

              <div className="mt-3 text-stone-600 text-sm leading-relaxed max-w-lg mx-auto">
                {formData.paymentMethod === "cod" && (
                  <p>
                    Your order <strong className="text-stone-900 font-bold">#{generatedOrderId}</strong> has been received and is being prepared fresh at our traditional chakki facility. Our delivery agent will call your phone (<span className="font-bold text-stone-900">{formData.phone}</span>) before delivery. Please keep <strong className="text-emerald-800 font-bold">₨{grandTotal.toLocaleString()}</strong> cash ready.
                  </p>
                )}
                {formData.paymentMethod === "wallet" && (
                  <p>
                    Your order <strong className="text-stone-900 font-bold">#{generatedOrderId}</strong> and mobile transfer details{" "}
                    {formData.transactionId ? (
                      <span className="font-bold text-stone-900">(TID: {formData.transactionId})</span>
                    ) : (
                      "have been submitted"
                    )}
                    . Our accounts desk will verify and dispatch your fresh parcels without delay.
                  </p>
                )}
                {formData.paymentMethod === "card" && (
                  <p>
                    Your online payment of <strong className="text-emerald-800 font-bold">₨{grandTotal.toLocaleString()}</strong> for order <strong className="text-stone-900 font-bold">#{generatedOrderId}</strong> was authorized securely. Your pure essentials are queued for priority packing.
                  </p>
                )}
              </div>

              {/* Order Receipt Box */}
              <div className="mt-8 bg-stone-50 rounded-sm border border-stone-200 p-6 text-left">
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
                      <div className="text-xs font-semibold text-stone-900 shrink-0">
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
                  <div className="flex justify-between text-sm font-semibold text-stone-900 pt-2 border-t border-stone-200">
                    <span>{formData.paymentMethod === "cod" ? "Payable on Delivery" : "Total Amount"}</span>
                    <span className="text-emerald-800 font-medium text-base">₨{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-200 text-xs text-stone-600 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-stone-900 shrink-0">Payment Method:</strong>
                    <span className="font-medium text-stone-800">
                      {formData.paymentMethod === "cod" && "Cash on Delivery (COD) — Pay rider at doorstep"}
                      {formData.paymentMethod === "wallet" && `JazzCash / Easypaisa ${formData.transactionId ? `(TID: ${formData.transactionId})` : "(Receipt Pending)"}`}
                      {formData.paymentMethod === "card" && "Debit / Credit Card (Direct Gateway)"}
                    </span>
                  </div>
                  <div>
                    <strong className="text-stone-900">Delivery Address:</strong> {formData.address},{" "}
                    {formData.city}
                  </div>
                  <div>
                    <strong className="text-stone-900">Estimated Dispatch:</strong> Within 24-48 Hours across Pakistan
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-ambient transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {formData.paymentMethod === "wallet"
                      ? "Send Payment Screenshot on WhatsApp"
                      : "Receive WhatsApp Dispatch Updates"}
                  </span>
                </a>

                <Link
                  href="/products"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-[3px] bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9] font-medium text-[11px] flex items-center justify-center gap-2 transition uppercase tracking-[0.18em] duration-200 ease-out"
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
                <div className="inline-flex items-center gap-1.5 mb-2 tag-quiet">
                  <Truck className="w-3.5 h-3.5 text-amber-800" /> Nationwide Delivery Across Pakistan
                </div>
                <h1 className="text-2xl sm:text-4xl font-semibold text-stone-900 tracking-tight">
                  Complete Your Pure Order
                </h1>
                <p className="mt-2 text-stone-600 text-xs sm:text-sm">
                  Select your preferred payment method: Cash on Delivery at your doorstep anywhere in Pakistan, JazzCash/Easypaisa, or secure Card payment.
                </p>
              </div>

              {orderItems.length === 0 ? (
                <div className="bg-white rounded-sm border border-stone-200 p-12 text-center max-w-lg mx-auto">
                  <Package className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-stone-900">No Product Selected</h3>
                  <p className="text-xs text-stone-500 mt-2 mb-6">
                    Please select a product from our catalog to place your Cash on Delivery order.
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[3px] bg-[#1E1510] text-[#F6F1E9] text-[11px] font-medium hover:bg-[#8B3A22] transition uppercase tracking-[0.18em] duration-200 ease-out"
                  >
                    <span>Browse Products Catalog</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Delivery Details Form (7 cols) */}
                  <div className="lg:col-span-7 bg-white rounded-sm border border-stone-200/90 p-6 sm:p-8 shadow-sm">
                    <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-6">
                      <div>
                        <h2 className="text-lg font-medium text-stone-900 tracking-tight flex items-center gap-2">
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
                            className="w-full py-3 px-4 rounded-xl border border-stone-300 text-base font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700 transition shadow-2xs"
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
                            className="w-full py-3 px-4 rounded-xl border border-stone-300 text-base font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700 transition shadow-2xs"
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
                            className="w-full py-3 px-4 rounded-xl border border-stone-300 text-base font-medium text-stone-900 focus:outline-none focus:border-amber-700 transition bg-white shadow-2xs cursor-pointer"
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
                            className="w-full py-3 px-4 rounded-xl border border-stone-300 text-base font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700 transition shadow-2xs"
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
                          className="w-full py-3 px-4 rounded-xl border border-stone-300 text-base font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700 transition shadow-2xs"
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
                          className="w-full py-3 px-4 rounded-xl border border-stone-300 text-base font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700 transition shadow-2xs"
                        />
                      </div>

                      {/* Payment Method Options */}
                      <div className="pt-6 border-t border-stone-200">
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-base font-semibold text-stone-900 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-amber-800" />
                            <span>2. Payment Method</span>
                          </h2>
                          <span className="text-xs text-stone-500 font-medium">Select one option</span>
                        </div>
                        <p className="text-xs text-stone-600 mb-4">
                          Choose how you would like to pay. <strong>Cash on Delivery (COD) is available across all of Pakistan</strong> with zero advance needed.
                        </p>

                        <div className="space-y-3.5">
                          {/* Option 1: Cash on Delivery (COD) */}
                          <div
                            onClick={() => setFormData({ ...formData, paymentMethod: "cod" })}
                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                              formData.paymentMethod === "cod"
                                ? "border-[#1E1510] bg-[#FAF8F5] shadow-sm ring-1 ring-[#1E1510]/15"
                                : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/60"
                            }`}
                          >
                            <div className="flex items-start gap-3.5">
                              {/* Custom accessible radio dot */}
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  formData.paymentMethod === "cod"
                                    ? "border-[#1E1510] bg-[#1E1510]"
                                    : "border-stone-400 bg-white"
                                }`}
                              >
                                {formData.paymentMethod === "cod" && (
                                  <div className="w-2 h-2 rounded-full bg-[#FAF8F5]" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <Banknote className="w-4 h-4 text-emerald-700 shrink-0" />
                                    <span className="text-sm font-bold text-stone-900">
                                      Cash on Delivery (COD)
                                    </span>
                                  </div>
                                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-700 text-white tracking-wide">
                                    Default • Most Popular
                                  </span>
                                </div>
                                <p className="text-xs text-stone-600 mt-1">
                                  Pay in cash at your doorstep.
                                </p>

                                {formData.paymentMethod === "cod" && (
                                  <div className="mt-3 pt-3 border-t border-stone-200/80 text-xs text-stone-700 space-y-1.5">
                                    <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                      <span>Cash on Delivery is available across all cities and villages of Pakistan.</span>
                                    </div>
                                    <p className="text-[11px] text-stone-500 pl-6 leading-relaxed">
                                      No bank cards, apps, or passwords needed. The courier rider will hand over your stone-ground package at your door. You inspect the parcel and pay cash.
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Option 2: JazzCash / Easypaisa */}
                          <div
                            onClick={() => setFormData({ ...formData, paymentMethod: "wallet" })}
                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                              formData.paymentMethod === "wallet"
                                ? "border-[#1E1510] bg-[#FAF8F5] shadow-sm ring-1 ring-[#1E1510]/15"
                                : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/60"
                            }`}
                          >
                            <div className="flex items-start gap-3.5">
                              {/* Custom accessible radio dot */}
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  formData.paymentMethod === "wallet"
                                    ? "border-[#1E1510] bg-[#1E1510]"
                                    : "border-stone-400 bg-white"
                                }`}
                              >
                                {formData.paymentMethod === "wallet" && (
                                  <div className="w-2 h-2 rounded-full bg-[#FAF8F5]" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-amber-800 shrink-0" />
                                    <span className="text-sm font-bold text-stone-900">
                                      JazzCash / Easypaisa
                                    </span>
                                  </div>
                                  {/* Mobile wallet badges */}
                                  <div className="flex items-center gap-1.5">
                                    <span className="px-2 py-0.5 rounded text-[11px] font-black bg-[#ED1C24] text-white tracking-tight shadow-xs">
                                      JazzCash
                                    </span>
                                    <span className="px-2 py-0.5 rounded text-[11px] font-black bg-[#009E49] text-white tracking-tight shadow-xs">
                                      easypaisa
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs text-stone-600 mt-1">
                                  Direct mobile wallet transfer or QR pay with instant confirmation.
                                </p>

                                {formData.paymentMethod === "wallet" && (
                                  <div
                                    className="mt-3.5 pt-3.5 border-t border-stone-200 space-y-3"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="bg-white rounded-lg border border-stone-200/90 p-3.5 space-y-2.5">
                                      <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                                        Official Store Accounts:
                                      </div>

                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                        {/* JazzCash account box */}
                                        <div className="p-2.5 rounded-md border border-red-100 bg-red-50/50 flex items-center justify-between gap-2">
                                          <div>
                                            <div className="text-[10px] font-bold text-red-800 flex items-center gap-1">
                                              <span>JazzCash Mobile Account</span>
                                            </div>
                                            <div className="font-mono font-bold text-stone-900 text-xs sm:text-sm">
                                              0300-7654321
                                            </div>
                                            <div className="text-[10px] text-stone-500">Title: Usman Pure Products</div>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleCopy("03007654321", "jazzcash")}
                                            className="px-2 py-1 rounded bg-white hover:bg-red-100 text-stone-700 hover:text-red-800 border border-red-200 text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
                                            title="Copy Account Number"
                                          >
                                            {copiedKey === "jazzcash" ? (
                                              <>
                                                <Check className="w-3 h-3 text-emerald-600" />
                                                <span className="text-emerald-700">Copied</span>
                                              </>
                                            ) : (
                                              <>
                                                <Copy className="w-3 h-3" />
                                                <span>Copy</span>
                                              </>
                                            )}
                                          </button>
                                        </div>

                                        {/* Easypaisa account box */}
                                        <div className="p-2.5 rounded-md border border-emerald-100 bg-emerald-50/50 flex items-center justify-between gap-2">
                                          <div>
                                            <div className="text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                                              <span>Easypaisa Mobile Account</span>
                                            </div>
                                            <div className="font-mono font-bold text-stone-900 text-xs sm:text-sm">
                                              0345-1234567
                                            </div>
                                            <div className="text-[10px] text-stone-500">Title: Usman Pure Products</div>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleCopy("03451234567", "easypaisa")}
                                            className="px-2 py-1 rounded bg-white hover:bg-emerald-100 text-stone-700 hover:text-emerald-800 border border-emerald-200 text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
                                            title="Copy Account Number"
                                          >
                                            {copiedKey === "easypaisa" ? (
                                              <>
                                                <Check className="w-3 h-3 text-emerald-600" />
                                                <span className="text-emerald-700">Copied</span>
                                              </>
                                            ) : (
                                              <>
                                                <Copy className="w-3 h-3" />
                                                <span>Copy</span>
                                              </>
                                            )}
                                          </button>
                                        </div>
                                      </div>

                                      <div className="text-[11px] text-stone-500 italic">
                                        💡 Transfer exactly <strong>₨{grandTotal.toLocaleString()}</strong> to either account. Then provide the TID or slip below:
                                      </div>
                                    </div>

                                    {/* Transaction ID & Screenshot inputs */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                      <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">
                                          Transaction ID / TID (Optional)
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="e.g. 1029485736"
                                          value={formData.transactionId}
                                          onChange={(e) =>
                                            setFormData({ ...formData, transactionId: e.target.value })
                                          }
                                          className="w-full py-3 px-4 rounded-xl border border-stone-300 text-base font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700 bg-white shadow-2xs"
                                        />
                                        <span className="text-[10px] text-stone-400 mt-0.5 block">
                                          10-12 digit code from SMS or confirmation screen
                                        </span>
                                      </div>

                                      <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">
                                          Upload Payment Screenshot / Slip (Optional)
                                        </label>
                                        <label className="flex items-center gap-2 px-3 py-2 rounded-md border border-dashed border-stone-300 hover:border-stone-400 bg-white cursor-pointer transition">
                                          <Upload className="w-4 h-4 text-stone-500 shrink-0" />
                                          <span className="text-xs text-stone-600 truncate">
                                            {formData.screenshotFileName || "Choose receipt screenshot..."}
                                          </span>
                                          <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                              const file = e.target.files?.[0];
                                              if (file) {
                                                setFormData({ ...formData, screenshotFileName: file.name });
                                              }
                                            }}
                                          />
                                        </label>
                                        <span className="text-[10px] text-stone-400 mt-0.5 block">
                                          PNG, JPG or JPEG from mobile gallery
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Option 3: Debit / Credit Card (Visa / Mastercard) */}
                          <div
                            onClick={() => setFormData({ ...formData, paymentMethod: "card" })}
                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                              formData.paymentMethod === "card"
                                ? "border-[#1E1510] bg-[#FAF8F5] shadow-sm ring-1 ring-[#1E1510]/15"
                                : "border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/60"
                            }`}
                          >
                            <div className="flex items-start gap-3.5">
                              {/* Custom accessible radio dot */}
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                  formData.paymentMethod === "card"
                                    ? "border-[#1E1510] bg-[#1E1510]"
                                    : "border-stone-400 bg-white"
                                }`}
                              >
                                {formData.paymentMethod === "card" && (
                                  <div className="w-2 h-2 rounded-full bg-[#FAF8F5]" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-blue-700 shrink-0" />
                                    <span className="text-sm font-bold text-stone-900">
                                      Debit / Credit Card (Visa / Mastercard)
                                    </span>
                                  </div>
                                  {/* Card badges */}
                                  <div className="flex items-center gap-1.5">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-black italic bg-[#1434CB] text-white tracking-widest shadow-xs">
                                      VISA
                                    </span>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1E1510] text-white flex items-center gap-1 shadow-xs">
                                      <span className="flex -space-x-1">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B] inline-block" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] inline-block" />
                                      </span>
                                      <span>Mastercard</span>
                                    </span>
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#007A3D] text-white shadow-xs">
                                      PayPak
                                    </span>
                                  </div>
                                </div>
                                <p className="text-xs text-stone-600 mt-1">
                                  Direct online payment via local payment gateway. 256-bit SSL encrypted.
                                </p>

                                {formData.paymentMethod === "card" && (
                                  <div
                                    className="mt-3.5 pt-3.5 border-t border-stone-200 space-y-3"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200/80 flex items-start gap-2.5 text-xs text-blue-900">
                                      <Lock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                                      <div className="leading-relaxed">
                                        <strong>Bank-Grade 256-bit SSL Encryption:</strong> When you click below, you will securely finalize your card payment through Pakistan&apos;s authorized banking gateway (1LINK / PayFast). We never store or view your CVV or card number.
                                      </div>
                                    </div>

                                    {/* Quick card input preview */}
                                    <div className="bg-white rounded-lg border border-stone-200 p-3.5 space-y-2.5">
                                      <div className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                                        Cardholder Details:
                                      </div>
                                      <div className="space-y-2">
                                        <div>
                                          <label className="block text-[11px] font-bold text-stone-700 mb-1">
                                            Name on Card
                                          </label>
                                          <input
                                            type="text"
                                            placeholder="e.g. MUHAMMAD USMAN"
                                            value={formData.cardHolderName}
                                            onChange={(e) =>
                                              setFormData({ ...formData, cardHolderName: e.target.value })
                                            }
                                            className="w-full px-3 py-1.5 rounded border border-stone-300 text-xs font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700"
                                          />
                                        </div>

                                        <div className="grid grid-cols-3 gap-2">
                                          <div className="col-span-2">
                                            <label className="block text-[11px] font-bold text-stone-700 mb-1">
                                              Card Number (Visa / Mastercard)
                                            </label>
                                            <input
                                              type="text"
                                              maxLength={19}
                                              placeholder="4000 1234 5678 9010"
                                              value={formData.cardNumber}
                                              onChange={(e) =>
                                                setFormData({ ...formData, cardNumber: e.target.value })
                                              }
                                              className="w-full px-3 py-1.5 rounded border border-stone-300 text-xs font-mono font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-[11px] font-bold text-stone-700 mb-1">
                                              Expiry
                                            </label>
                                            <input
                                              type="text"
                                              maxLength={5}
                                              placeholder="MM/YY"
                                              value={formData.cardExpiry}
                                              onChange={(e) =>
                                                setFormData({ ...formData, cardExpiry: e.target.value })
                                              }
                                              className="w-full px-3 py-1.5 rounded border border-stone-300 text-xs font-mono font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-4 px-6 rounded-[3px] bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9] font-medium text-xs sm:text-sm flex items-center justify-center gap-2.5 transition duration-200 cursor-pointer uppercase tracking-[0.18em] ease-out shadow-sm"
                        >
                          {formData.paymentMethod === "cod" && (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                              <span>Place Cash on Delivery Order</span>
                            </>
                          )}
                          {formData.paymentMethod === "wallet" && (
                            <>
                              <Smartphone className="w-5 h-5 text-amber-400 shrink-0" />
                              <span>Confirm &amp; Submit Transfer Details</span>
                            </>
                          )}
                          {formData.paymentMethod === "card" && (
                            <>
                              <Lock className="w-5 h-5 text-amber-300 shrink-0" />
                              <span>Proceed to Secure Card Payment</span>
                            </>
                          )}
                          <span className="opacity-70 font-normal ml-1">
                            — ₨{grandTotal.toLocaleString()}
                          </span>
                        </button>
                        <p className="text-center text-[11px] text-stone-500 mt-2">
                          🔒 100% Guaranteed Fresh Chakki Milling • Safe &amp; Verified Delivery across Pakistan.
                        </p>
                      </div>
                    </form>
                  </div>

                  {/* Right Column: Order Summary (5 cols) */}
                  <div className="lg:col-span-5 bg-white rounded-sm border border-stone-200/90 p-6 sm:p-8 shadow-sm lg:sticky lg:top-28">
                    <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                      <h2 className="text-base font-medium text-stone-900 flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-amber-800" />
                        <span>Selected Products ({orderItems.length})</span>
                      </h2>
                      <Link href="/products" className="text-xs font-bold text-amber-800 hover:underline">
                        + Add More
                      </Link>
                    </div>

                    {/* Free Delivery Bar */}
                    <div className="mt-4 p-3.5 rounded-sm bg-amber-50/80 border border-amber-200/70 text-xs">
                      {amountToFreeShipping === 0 ? (
                        <div className="flex items-center gap-2 font-bold text-emerald-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Congratulations! Your order qualifies for FREE Delivery across Pakistan!</span>
                        </div>
                      ) : (
                        <div>
                          <div className="text-stone-700 font-medium">
                            Add <strong className="text-amber-900 font-semibold">₨{amountToFreeShipping.toLocaleString()}</strong> more to get <strong className="text-emerald-700 font-bold">FREE Delivery</strong> (Standard: ₨199).
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
                          <div className="relative w-16 h-16 rounded-md bg-stone-50 border border-stone-200 overflow-hidden shrink-0 flex items-center justify-center">
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
                            <div className="text-xs font-semibold text-stone-900 mt-1">
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
                              <span className="w-6 text-center text-xs font-semibold text-stone-900">
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
                            <span className="text-emerald-700 font-medium uppercase">FREE</span>
                          ) : (
                            "₨199"
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-base font-semibold text-stone-900 pt-3 border-t border-stone-200">
                        <span>Total Amount (PKR)</span>
                        <span className="text-emerald-800 text-lg">₨{grandTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Large Confirm Order Button */}
                    <div className="mt-5">
                      <button
                        type="submit"
                        form="checkout-form"
                        className="w-full py-4 px-6 rounded-[3px] bg-[#1E1510] hover:bg-[#8B3A22] text-[#F6F1E9] font-medium text-xs sm:text-sm flex items-center justify-center gap-2.5 transition duration-200 cursor-pointer uppercase tracking-[0.18em] ease-out shadow-md"
                      >
                        {formData.paymentMethod === "cod" && (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            <span>Confirm Order (COD)</span>
                          </>
                        )}
                        {formData.paymentMethod === "wallet" && (
                          <>
                            <Smartphone className="w-5 h-5 text-amber-400 shrink-0" />
                            <span>Confirm &amp; Submit Transfer</span>
                          </>
                        )}
                        {formData.paymentMethod === "card" && (
                          <>
                            <Lock className="w-5 h-5 text-amber-300 shrink-0" />
                            <span>Confirm &amp; Pay by Card</span>
                          </>
                        )}
                        <span className="opacity-75 font-normal ml-1">
                          — ₨{grandTotal.toLocaleString()}
                        </span>
                      </button>
                      <p className="text-center text-[10px] text-stone-500 mt-2">
                        🔒 Safe &amp; verified checkout across all cities of Pakistan.
                      </p>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-6 pt-5 border-t border-stone-200 grid grid-cols-3 gap-2 text-center text-[10px] text-stone-600 font-bold">
                      <div className="p-2 rounded-md bg-stone-50 flex flex-col items-center gap-1">
                        <Truck className="w-4 h-4 text-emerald-700" />
                        <span>Doorstep Delivery</span>
                      </div>
                      <div className="p-2 rounded-md bg-stone-50 flex flex-col items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        <span>100% Stone-Ground</span>
                      </div>
                      <div className="p-2 rounded-md bg-stone-50 flex flex-col items-center gap-1">
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
