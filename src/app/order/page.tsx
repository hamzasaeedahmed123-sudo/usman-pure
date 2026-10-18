import { Suspense } from "react";
import { CheckoutView } from "../checkout/CheckoutView";

export const metadata = {
  title: "Order with Cash on Delivery (COD) | Usman's Pure Products",
  description: "Place your order for fresh stone-ground chakki flours, spices, and herbal teas.",
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-8">
      <div className="w-10 h-10 border-4 border-amber-800 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CheckoutView />
    </Suspense>
  );
}
