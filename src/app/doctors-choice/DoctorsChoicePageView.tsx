"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { StoreFooter } from "@/components/StoreFooter";
import { TickerMarquee } from "@/components/TickerMarquee";
import { BotanicalWatermark } from "@/components/BotanicalWatermark";
import {
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Check,
  ShoppingBag,
  Truck,
  Sparkles,
  Heart,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Activity,
  Award,
} from "lucide-react";

interface DoctorProductPackOption {
  size: string;
  price: number;
  originalPrice: number;
}

interface DoctorProduct {
  id: string;
  title: string;
  problemTag: string;
  easyBenefit: string;
  simplePoints: string[];
  image: string;
  detailUrl: string;
  checkoutUrl: string;
  packOptions: DoctorProductPackOption[];
}

const DOCTOR_PRODUCTS: DoctorProduct[] = [
  {
    id: "prod-3",
    title: "Fat2Fuel Advance Multigrain Flour",
    problemTag: "WEIGHT LOSS & BELLY FAT",
    easyBenefit: "Keeps you full for 5+ hours so you stop feeling hungry and lose extra fat naturally.",
    simplePoints: [
      "No hunger attacks between meals",
      "100% natural grains — Zero Maida",
      "Keeps you active all day without feeling weak",
    ],
    image: "/images/products/prod-3.jpg",
    detailUrl: "/product/prod-3",
    checkoutUrl: "/checkout?product=prod-3",
    packOptions: [
      { size: "5kg", price: 1150, originalPrice: 1500 },
      { size: "10kg", price: 2150, originalPrice: 2900 },
    ],
  },
  {
    id: "prod-4",
    title: "FENUGREEK Plus – Diabetic Care Flour",
    problemTag: "SUGAR & DIABETES CONTROL",
    easyBenefit: "Stops blood sugar from shooting up after eating roti or heavy meals.",
    simplePoints: [
      "Controls fasting and after-meal sugar",
      "Made with real roasted methi seeds (tastes great, not bitter)",
      "Soft rotis that the whole family can eat",
    ],
    image: "/images/products/prod-4.png",
    detailUrl: "/product/prod-4",
    checkoutUrl: "/checkout?product=prod-4",
    packOptions: [
      { size: "5kg", price: 1200, originalPrice: 1500 },
      { size: "10kg", price: 2300, originalPrice: 3000 },
    ],
  },
  {
    id: "prod-7",
    title: "Olive Leaf Cardiac Herbal Infusion",
    problemTag: "HIGH BLOOD PRESSURE & HEART",
    easyBenefit: "Helps calm high blood pressure and keeps your heart arteries healthy.",
    simplePoints: [
      "Helps manage everyday high BP",
      "100% Caffeine-Free (Won't disturb your night sleep)",
      "Rich in natural olive antioxidants",
    ],
    image: "/images/products/prod-7.jpg",
    detailUrl: "/product/prod-7",
    checkoutUrl: "/checkout?product=prod-7",
    packOptions: [
      { size: "50g", price: 700, originalPrice: 1000 },
      { size: "100g", price: 1300, originalPrice: 1800 },
    ],
  },
  {
    id: "prod-13",
    title: "Pure Lakadong High-Curcumin Turmeric",
    problemTag: "JOINT PAIN & KNEE RELIEF",
    easyBenefit: "Relieves stiff knees, back ache, and body pain with pure 100% natural haldi.",
    simplePoints: [
      "High curcumin (7%+) for joint mobility",
      "Drink in warm milk at night for peaceful sleep and pain relief",
      "Lab-tested zero lead, zero fake yellow color",
    ],
    image: "/images/spices-product.jpg",
    detailUrl: "/product/prod-13",
    checkoutUrl: "/checkout?product=prod-13",
    packOptions: [
      { size: "100g", price: 450, originalPrice: 600 },
      { size: "200g", price: 800, originalPrice: 1100 },
    ],
  },
];

const CLINICAL_FAQS = [
  {
    q: "How does stone-ground Chakki flour differ clinically from commercial roller-mill flour?",
    a: "Modern industrial roller mills operate at high speeds (>90°C), stripping away the germ (rich in Vitamin E and essential oils) and the outer bran fiber to produce white flour or artificially reconstituted brown atta. This high heat oxidizes nutrients and creates fast-absorbing starches that trigger rapid insulin surges. Usman's Pure stone-ground chakkis rotate slowly under 40°C, keeping 100% of the living germ, insoluble fiber, and natural micronutrients completely intact.",
  },
  {
    q: "Can the entire family eat FENUGREEK Plus flour, or only diabetic patients?",
    a: "FENUGREEK Plus is a 100% natural whole-grain flour enriched with organic fenugreek seeds and barley. It is safe, delicious, and highly beneficial for the entire family. While formulated to prevent sugar spikes for diabetic and pre-diabetic individuals, non-diabetic family members benefit from its high prebiotic fiber, digestive support, and prolonged satiety.",
  },
  {
    q: "What is the best way to consume Fat2Fuel Multigrain Flour for weight loss?",
    a: "Replace your regular wheat roti at lunch and dinner with Fat2Fuel rotis. Because of its dense soluble fiber and roasted barley-oat composition, 1 to 2 rotis will keep you comfortably full for 5+ hours, eliminating evening snack cravings. Pair with lentils, grilled meats, and fresh seasonal vegetables.",
  },
  {
    q: "How do I take Olive Leaf Tea for cardiovascular support?",
    a: "Steep 1 teaspoon (approx 2 grams) in 250ml of freshly boiled water for 6 to 8 minutes. Drink 1 cup in the morning and 1 cup in the evening. It has a light, earthy herbal flavor and contains zero caffeine, making it suitable for evening consumption.",
  },
];

export function DoctorsChoicePageView() {
  const [selectedPacks, setSelectedPacks] = useState<Record<string, string>>({
    "prod-3": "5kg",
    "prod-4": "5kg",
    "prod-7": "50g",
    "prod-13": "100g",
  });

  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleAddToCart = (product: DoctorProduct, option: DoctorProductPackOption, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));

    const cartEl = document.getElementById("cart-badge-count");
    if (cartEl) {
      const current = parseInt(cartEl.innerText || "0", 10) + 1;
      cartEl.innerText = current.toString();
    }

    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1510] flex flex-col justify-between selection:bg-[#8B3A22]/15 selection:text-[#1E1510]">
      <Header isSolid theme="amber" />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-[#FAF7F2] border-b border-[#1E1510]/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-3.5 flex items-center gap-2 text-xs text-[#6B5D52]">
            <Link href="/" className="hover:text-[#8B3A22] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <Link href="/products" className="hover:text-[#8B3A22] transition-colors">
              Store
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="font-medium text-[#1E1510]">Doctor&apos;s Advice &amp; Clinical Wellness</span>
          </div>
        </div>

        <TickerMarquee />

        {/* Hero Header Section */}
        <section className="relative py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#1E1510]/10 overflow-hidden">
          <BotanicalWatermark
            type="wheat"
            className="absolute top-2 -left-10 w-[380px] h-[380px] pointer-events-none -z-0"
            opacity={0.2}
            size={380}
          />
          <BotanicalWatermark
            type="herbal"
            className="absolute -bottom-10 -right-10 w-[420px] h-[420px] pointer-events-none -z-0"
            opacity={0.22}
            size={420}
          />

          <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18281E] text-[#E5B869] text-[11px] font-semibold uppercase tracking-[0.2em] mb-6 shadow-xs">
              <Stethoscope className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span>Expert Formulated &bull; Clinical Wellness</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1E1510] leading-[1.08] tracking-tight">
              Doctor Recommended <br className="hidden sm:inline" />
              <em className="italic font-normal text-[#8B3A22]">Food As Medicine</em>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[#5A4E45] max-w-3xl mx-auto font-light leading-relaxed">
              Therapeutic whole-food formulations designed by clinical nutritionists to support diabetic control, fat metabolism, and cardiovascular health naturally.
            </p>

            {/* Clinical Trust Strip */}
            <div className="mt-10 pt-8 border-t border-[#1E1510]/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#4A3F37] font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#8B3A22]" strokeWidth={2} />
                <span>Doctor Approved Formulations</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#8B3A22]" strokeWidth={2} />
                <span>Lab Verified Purity &bull; 0% Adulterants</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#8B3A22]" strokeWidth={2} />
                <span>100% Preservative-Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#8B3A22]" strokeWidth={2} />
                <span>Cold Stone-Milled &lt;40&deg;C</span>
              </div>
            </div>
          </div>
        </section>

        {/* Clinical Advisory Philosophy Box */}
        <section className="py-12 bg-[#FAF7F2] border-b border-[#1E1510]/10">
          <div className="max-w-4xl mx-auto px-5 sm:px-8">
            <div className="p-8 sm:p-10 rounded-sm bg-[#F0EBE1] border border-[#1E1510]/10">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8B3A22]">
                Clinical Advisory Perspective
              </span>
              <p className="mt-3 text-base sm:text-lg text-[#2E241E] font-serif italic leading-relaxed">
                &ldquo;Food as medicine is biological reality. Modern roller milling strips the living germ and fiber from grain, creating fast starches that cause insulin surges. By cold stone-milling unbleached grains with therapeutic botanicals like fenugreek, olive leaf, and high-curcumin turmeric, we deliver active plant compounds exactly as human physiology requires.&rdquo;
              </p>

              <div className="mt-6 pt-5 border-t border-[#1E1510]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs text-[#6B5D52]">
                  <span className="font-semibold text-[#1E1510]">Dr. Advisory Panel</span>
                  <span>&bull;</span>
                  <span>Clinical Nutrition &amp; Preventive Lifestyle Care</span>
                </div>

                <a
                  href="https://wa.me/923000000000?text=Hello%20Dr.%20Advisory%2C%20I%20would%20like%20guidance%20on%20choosing%20the%20right%20Doctor%27s%20Choice%20food%20plan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start sm:self-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#1E1510] hover:bg-[#8B3A22] text-[#FAF7F2] text-xs font-bold uppercase tracking-[0.16em] transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#E5B869]" />
                  <span>Ask a Nutritionist</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Product Roster Section — Clean 2-Column Luxury Magazine Cards */}
        <section className="py-16 sm:py-24 bg-[#FAF7F2]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="eyebrow">Therapeutic Product Roster</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-serif text-[#1E1510]">
                Clinically Formulated <em className="italic font-normal text-[#8B3A22]">Essentials</em>
              </h2>
              <p className="mt-3 text-sm text-[#6B5D52]">
                Carefully calibrated whole-food remedies to manage blood sugar, support healthy fat metabolism, and nurture heart health.
              </p>
            </div>

            {/* 2-Column Grid of High-Readability Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {DOCTOR_PRODUCTS.map((product) => {
                const currentSize = selectedPacks[product.id] || product.packOptions[0].size;
                const currentOption =
                  product.packOptions.find((o) => o.size === currentSize) || product.packOptions[0];
                const isAdded = addedIds[product.id];

                return (
                  <article
                    key={product.id}
                    className="flex flex-col rounded-sm bg-white border border-[#1E1510]/10 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Top Photograph Container — Uncropped Full Bag Display */}
                    <div className="relative w-full aspect-[4/5] bg-[#FAF7F2] p-4 flex items-center justify-center overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                      />
                      {/* Big Bold Problem Tag on Image Badge */}
                      <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-extrabold uppercase tracking-wider bg-[#18281E]/95 text-[#E5B869] backdrop-blur-xs shadow-md">
                        <Activity className="w-3.5 h-3.5 text-[#E5B869]" />
                        {product.problemTag}
                      </span>
                    </div>

                    {/* Card Content with Generous Typography for Elderly Customers */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        {/* 1. Big Bold Problem Tag (Above Title) */}
                        <div className="mb-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#8B3A22]/10 text-[#8B3A22] border border-[#8B3A22]/20 text-xs sm:text-sm font-black tracking-wider uppercase">
                            <Activity className="w-4 h-4 text-[#8B3A22]" />
                            {product.problemTag}
                          </span>
                        </div>

                        {/* Product Title */}
                        <Link href={product.detailUrl}>
                          <h3 className="text-2xl sm:text-3xl font-serif text-[#1E1510] hover:text-[#8B3A22] transition-colors leading-snug font-bold">
                            {product.title}
                          </h3>
                        </Link>

                        {/* 2. Easy 1-Line Benefit (Below Title in Bold text) */}
                        <p className="mt-3.5 text-base sm:text-lg font-bold text-[#8B3A22] leading-snug">
                          {product.easyBenefit}
                        </p>

                        {/* 3. Simple 3 Bullet Points (Large Text, No Medical Jargon) */}
                        <ul className="mt-6 space-y-3.5">
                          {product.simplePoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-base sm:text-lg text-stone-900 leading-snug">
                              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-4 h-4 text-emerald-700" strokeWidth={3} />
                              </div>
                              <span className="font-medium">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pricing, Packaging Toggles & CTA Action Area */}
                      <div className="mt-8 pt-6 border-t border-[#1E1510]/10">
                        {/* Packaging Toggle */}
                        <div className="flex items-center justify-between gap-4 mb-5">
                          <div className="text-[11px] font-semibold text-[#6B5D52] uppercase tracking-[0.14em]">
                            Select Pack:
                          </div>
                          <div className="flex items-center gap-2">
                            {product.packOptions.map((opt) => (
                              <button
                                key={opt.size}
                                onClick={() =>
                                  setSelectedPacks((prev) => ({ ...prev, [product.id]: opt.size }))
                                }
                                className={`px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border ${
                                  currentSize === opt.size
                                    ? "bg-[#1E1510] text-[#FAF7F2] border-[#1E1510]"
                                    : "bg-stone-50 text-[#6B5D52] border-stone-200 hover:border-stone-400"
                                }`}
                              >
                                {opt.size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Price & Primary CTA */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <div className="flex items-baseline gap-2.5">
                              <span className="text-2xl font-bold text-[#1E1510]">
                                ₨ {currentOption.price.toLocaleString()}
                              </span>
                              <span className="text-sm text-[#6B5D52]/60 line-through">
                                ₨ {currentOption.originalPrice.toLocaleString()}
                              </span>
                            </div>
                            <span className="text-[11px] font-medium text-emerald-700">
                              Save ₨ {(currentOption.originalPrice - currentOption.price).toLocaleString()} &bull; Fresh Milled
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <button
                              onClick={(e) => handleAddToCart(product, currentOption, e)}
                              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                                isAdded ? "btn-lux-terra" : "btn-lux"
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-4 h-4" /> Added
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                                </>
                              )}
                            </button>

                            <Link
                              href={`${product.checkoutUrl}&pack=${currentOption.size}&qty=1`}
                              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-md bg-[#8B3A22] hover:bg-[#A0452C] text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>Order COD</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Clinical FAQ / Doctor Q&A Section */}
        <section className="py-16 sm:py-20 bg-[#F5EFE6] border-t border-[#1E1510]/10">
          <div className="max-w-4xl mx-auto px-5 sm:px-8">
            <div className="text-center mb-12">
              <span className="eyebrow">Medical &amp; Nutritional Clarity</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-serif text-[#1E1510]">
                Frequently Asked <em className="italic font-normal text-[#8B3A22]">Clinical Questions</em>
              </h2>
            </div>

            <div className="space-y-4">
              {CLINICAL_FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-sm bg-white border border-[#1E1510]/10 overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50"
                    >
                      <span className="font-serif text-lg sm:text-xl text-[#1E1510] leading-snug">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#8B3A22] shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-sm sm:text-base text-[#5A4E45] leading-relaxed border-t border-stone-100 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Free Doctor / WhatsApp Consultation Strip */}
        <section className="py-16 bg-[#18281E] text-[#F9F6F0] relative overflow-hidden">
          <BotanicalWatermark
            type="wheat"
            className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none -z-0"
            opacity={0.15}
            size={400}
          />
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
            <Stethoscope className="w-10 h-10 text-[#E5B869] mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="text-3xl sm:text-4xl font-serif text-[#F9F6F0]">
              Need Personalized Guidance for Your Health Reports?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#D5CEBF] font-light max-w-2xl mx-auto">
              Our clinical nutrition advisory team provides direct, confidential recommendations tailored to your fasting sugar levels, lipid panel, and lifestyle goals.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/923000000000?text=Hello%20Dr.%20Advisory%2C%20I%20would%20like%20a%20free%20clinical%20food%20consultation%20for%20my%20health%20needs."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-md bg-[#25D366] hover:bg-[#20ba5a] text-[#1E1510] text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#1E1510]" />
                <span>WhatsApp Clinical Advisor (Free)</span>
              </a>

              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-white/10 hover:bg-white/15 border border-white/20 text-[#FAF7F2] text-xs font-bold uppercase tracking-[0.16em] transition-colors"
              >
                <span>Browse All 17 Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <StoreFooter />
    </div>
  );
}
