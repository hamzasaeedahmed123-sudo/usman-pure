"use client";

import Image from "next/image";
import { MessageCircle, CheckCircle2, UserCheck } from "lucide-react";

export function DietConsultationBanner() {
  return (
    <section className="py-16 sm:py-24 bg-emerald-950 text-white relative overflow-hidden border-b border-emerald-900">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Content (7 cols) */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              Free Nutrition Consultation
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
              Customized Diet Plan &amp; Health Guidance by Usman&apos;s Pure
            </h2>

            <p className="mt-4 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              In response to thousands of customer requests, our clinical nutrition team offers personalized dietary guidance for <strong>Weight Loss</strong>, <strong>Diabetes Glycemic Management</strong>, <strong>PCOS</strong>, and <strong>Digestive Wellness</strong> using pure stone-ground grains and organic herbal infusions.
            </p>

            {/* Checklist */}
            <div className="mt-6 space-y-3">
              {[
                "Personalized meal plan matched to your target weight & BMI",
                "Diabetic carb counting & sugar spike reduction techniques",
                "Daily brewing schedule for organic herbal teas",
                "Direct WhatsApp support with dedicated wellness advisors",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="https://wa.me/923000000000?text=Hi%20Usman's%20Pure,%20I%20would%20like%20a%20Customized%20Diet%20Plan%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-8 rounded-sm bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-sm flex items-center justify-center gap-3 transition shadow-ambient shadow-amber-400/20 active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Get Customized Diet Plan on WhatsApp</span>
              </a>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-emerald-300 font-medium">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Over 12,000+ Diet Plans Delivered</span>
              </div>
            </div>
          </div>

          {/* Right Image/Card Preview (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-sm bg-emerald-900/50 border border-emerald-800/80 p-6 sm:p-8 backdrop-blur-sm shadow-ambient">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-emerald-800/60">
                <div className="w-14 h-14 rounded-sm bg-amber-400 text-stone-950 font-semibold text-lg flex items-center justify-center shadow-ambient">
                  UP
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Clinical Nutrition Protocol</h4>
                  <p className="text-xs text-emerald-300">Certified Holistic Diet Guidance</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-sm bg-emerald-950/70 border border-emerald-800/60 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                    1
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-white">Share Your Health Goals</h5>
                    <p className="text-[11px] text-emerald-200/80 mt-0.5">
                      Tell our team on WhatsApp your current weight, fasting sugar, or digestive symptoms.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-sm bg-emerald-950/70 border border-emerald-800/60 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                    2
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-white">Receive Your Personalized Routine</h5>
                    <p className="text-[11px] text-emerald-200/80 mt-0.5">
                      Get exact roti portions, tea brewing times, and healthy daily habits.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-sm bg-emerald-950/70 border border-emerald-800/60 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-white">Ongoing WhatsApp Check-ins</h5>
                    <p className="text-[11px] text-emerald-200/80 mt-0.5">
                      Weekly progress tracking to ensure you reach your target feeling energetic.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
