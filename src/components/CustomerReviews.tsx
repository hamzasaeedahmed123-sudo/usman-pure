"use client";

import { Star, CheckCircle, Sparkles, Quote } from "lucide-react";

export function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: "Tariq Mahmood",
      city: "Lahore, Punjab",
      product: "Fat2Fuel Weight Loss Flour",
      rating: 5,
      date: "Verified Buyer • 1 week ago",
      text: "I was skeptical at first, but after 3 weeks of eating Fat2Fuel rotis, I've lost 3.8 kgs without feeling hungry or weak. My digestion has never been smoother. Even my wife and mother love the rotis!",
    },
    {
      id: 2,
      name: "Dr. Farzana Akhtar",
      city: "Islamabad, Capital",
      product: "FENUGREEK Plus Diabetic Flour",
      rating: 5,
      date: "Verified Buyer • 2 weeks ago",
      text: "As a physician and diabetic patient, I monitor my fasting sugar daily. Fenugreek Plus flour has eliminated my 2-hour post-prandial spikes. The dough handles just like regular chakki atta and tastes delicious.",
    },
    {
      id: 3,
      name: "Ayesha Imran",
      city: "Karachi, Sindh",
      product: "Rosella Ruby Tea & Chamomile",
      rating: 5,
      date: "Verified Buyer • 3 weeks ago",
      text: "The Rosella tea has this amazing tart hibiscus flavor and I drink it chilled with a spoon of raw honey. It reduced my water bloating in just 5 days. Chamomile tea at night gives me the most peaceful sleep.",
    },
    {
      id: 4,
      name: "Muhammad Bilal",
      city: "Faisalabad, Punjab",
      product: "Giggly Grains (Kids Immunity Blend)",
      rating: 5,
      date: "Verified Buyer • 1 month ago",
      text: "My 6-year-old was a very picky eater and used to complain about tummy ache after white bread. With Giggly Grains, rotis are super soft and he finishes his meal with a smile. Highly recommended for kids!",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Customer Voices
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Loved by 50,000+ Health-Conscious Homes
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Real experiences from families across Pakistan who upgraded to Usman&apos;s Pure unadulterated stone-ground nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-stone-50 rounded-3xl border border-stone-200/80 p-6 flex flex-col justify-between hover:border-amber-400 hover:shadow-lg transition duration-300 relative group"
            >
              <div>
                {/* Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-stone-300 group-hover:text-amber-400 transition" />
                </div>

                <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-2">
                  {r.product}
                </div>

                <p className="text-xs text-stone-700 leading-relaxed italic">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-stone-900 text-white font-bold text-xs flex items-center justify-center">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900 flex items-center gap-1">
                      {r.name}
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                    </div>
                    <div className="text-[10px] text-stone-500">
                      {r.city} • {r.date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
