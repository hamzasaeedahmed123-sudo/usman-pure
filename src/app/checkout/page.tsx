import { Suspense } from "react";
import { CheckoutView } from "./CheckoutView";

export const metadata = {
  title: "Order with Cash on Delivery (COD) | Usman's Pure Products",
  description:
    "Place your order for fresh stone-ground chakki flours, cold-pounded spices, and organic herbal teas. 100% Cash on Delivery across Pakistan.",
};

function CheckoutLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-amber-800 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-bold text-stone-700">Loading Order Checkout...</span>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoadingSkeleton />}>
      <CheckoutView />
    </Suspense>
  );
}
