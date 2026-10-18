"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface CategoryCollectionsProps {
  onSelectCategory?: (cat: "all" | "flours" | "spices" | "teas") => void;
}

export function CategoryCollections({ onSelectCategory }: CategoryCollectionsProps = {}) {
  const collections = [
    {
      id: "flour",
      title: "Diet & Chakki Flours",
      subtitle: "Weight Loss, Diabetic Care & Kids Nutrition",
      itemCount: "5 Specialized Blends",
      image: "/images/products/prod-3.jpg",
      badge: "Best Seller",
      href: "/flour",
      color: "from-amber-950/85 via-stone-900/60 to-transparent",
    },
    {
      id: "spices",
      title: "Cold Stone-Pounded Spices",
      subtitle: "Kashmiri Chili, Turmeric & Whole Garam Masala",
      itemCount: "6 Pure Spices",
      image: "/spices-jar.png",
      badge: "100% Zero Dyes",
      href: "/spices",
      color: "from-[#661D0F]/90 via-stone-900/60 to-transparent",
    },
    {
      id: "herbals",
      title: "Pure Organic Herbal Teas",
      subtitle: "Rosella, Chamomile, Olive Leaf & Wild Botanicals",
      itemCount: "6 Pure Infusions",
      image: "/images/products/prod-9.jpg",
      badge: "100% Caffeine Free",
      href: "/herbals",
      color: "from-emerald-950/85 via-stone-900/60 to-transparent",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-200 text-stone-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Dedicated Store Sections
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
              Explore Our Pure Collections
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md">
            Wholesome, unadulterated essentials slow-ground in natural stone chakkis and hand-packed with zero chemical additives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {collections.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition duration-500 border border-stone-200/80 bg-white flex flex-col justify-end p-6 sm:p-8"
            >
              {/* Product Background Image */}
              <div className="absolute inset-0 bg-stone-100 transition-transform duration-700 group-hover:scale-105">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-6 group-hover:scale-105 transition duration-700"
                />
              </div>

              {/* Gradient Scrim for Readability */}
              <div className={`absolute inset-0 bg-gradient-to-t ${item.color}`} />

              {/* Top Badge */}
              <div className="absolute top-5 left-5 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-stone-900 shadow-sm backdrop-blur-sm">
                  {item.badge}
                </span>
              </div>

              {/* Card Content */}
              <div className="relative z-10 text-white">
                <div className="text-xs uppercase font-extrabold tracking-wider text-amber-300 mb-1">
                  {item.itemCount}
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white mb-1.5 group-hover:text-amber-200 transition">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-200 line-clamp-2 mb-4 leading-relaxed">
                  {item.subtitle}
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:translate-x-1.5 transition duration-300">
                  <span>Explore {item.title}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
