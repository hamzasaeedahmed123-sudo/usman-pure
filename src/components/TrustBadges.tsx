"use client";

import { RotateCcw, Truck, ShieldCheck } from "lucide-react";

interface TrustBadgesProps {
  className?: string;
  wrapperClassName?: string;
}

export function TrustBadges({ className = "", wrapperClassName = "" }: TrustBadgesProps) {
  return (
    <div className={`w-full ${wrapperClassName}`}>
      <div
        className={`grid grid-cols-3 divide-x divide-[#EBE4D8]/80 py-3 px-2 sm:py-4 sm:px-4 md:py-6 md:px-6 bg-white/90 border border-[#EBE4D8]/80 rounded-xl md:rounded-2xl mx-auto max-w-5xl shadow-2xs ${className}`}
      >
        {/* Card 1: 14-Day Return */}
        <div className="px-1.5 sm:px-3 text-center flex flex-col items-center justify-start h-full">
          <RotateCcw className="w-7 h-7 sm:w-8 sm:h-8 text-[#8C6D46] mb-1.5 shrink-0" />
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight text-center leading-tight">
            14-Day Return
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-600 font-medium text-center mt-0.5 leading-tight">
            Zero Hassle
          </p>
        </div>

        {/* Card 2: Nationwide Cash on Delivery */}
        <div className="px-1.5 sm:px-3 text-center flex flex-col items-center justify-start h-full">
          <Truck className="w-7 h-7 sm:w-8 sm:h-8 text-[#8C6D46] mb-1.5 shrink-0" />
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight text-center leading-tight">
            Nationwide COD
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-600 font-medium text-center mt-0.5 leading-tight">
            Pay at doorstep
          </p>
        </div>

        {/* Card 3: 100% Stone-Ground Purity */}
        <div className="px-1.5 sm:px-3 text-center flex flex-col items-center justify-start h-full">
          <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#8C6D46] mb-1.5 shrink-0" />
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 tracking-tight text-center leading-tight">
            100% Pure
          </h4>
          <p className="text-[11px] sm:text-xs text-stone-600 font-medium text-center mt-0.5 leading-tight">
            Cold-Milled
          </p>
        </div>
      </div>
    </div>
  );
}
