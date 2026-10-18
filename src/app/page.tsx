"use client";

import { useState } from "react";
import { ProductSliderHero } from "@/components/ProductSliderHero";
import { TickerMarquee } from "@/components/TickerMarquee";
import { CategoryCollections } from "@/components/CategoryCollections";
import { ProductCatalog } from "@/components/ProductCatalog";
import { FeaturedSpotlight } from "@/components/FeaturedSpotlight";
import { MegaBundles } from "@/components/MegaBundles";
import { SpotlightDiabetic } from "@/components/SpotlightDiabetic";
import { DietConsultationBanner } from "@/components/DietConsultationBanner";
import { ChakkiProcessStory } from "@/components/ChakkiProcessStory";
import { TrustGuarantee } from "@/components/TrustGuarantee";
import { CustomerReviews } from "@/components/CustomerReviews";
import { NewsletterSection } from "@/components/NewsletterSection";
import { StoreFooter } from "@/components/StoreFooter";

export default function Home() {
  const [activeCatalogFilter, setActiveCatalogFilter] = useState<"all" | "flours" | "spices" | "teas">("all");

  return (
    <div className="relative w-full bg-stone-100 text-stone-900 selection:bg-amber-500/20 selection:text-amber-900">
      {/* 1. Hero Section Slider (Preserved strictly as built) */}
      <ProductSliderHero />

      {/* 2. Virsa-Style Scrolling Marquee Ticker */}
      <TickerMarquee />

      {/* 3. Virsa-Style Category Collections ("Our Collections") */}
      <CategoryCollections onSelectCategory={(cat) => setActiveCatalogFilter(cat)} />

      {/* 4. Complete Product Catalog Listing All 11 Products from usmanzpure.com */}
      <ProductCatalog
        activeFilter={activeCatalogFilter}
        setActiveFilter={setActiveCatalogFilter}
      />

      {/* 5. Virsa-Style Featured Product Spotlight: Fat2Fuel Weight Loss Flour */}
      <FeaturedSpotlight />

      {/* 6. Virsa-Style Mega Bundles Section */}
      <MegaBundles />

      {/* 7. Virsa-Style Second Spotlight: FENUGREEK Plus Diabetic Control Flour */}
      <SpotlightDiabetic />

      {/* 8. Virsa-Style Personalized Diet Plan & Health Guidance Banner */}
      <DietConsultationBanner />

      {/* 9. Cold Stone-Chakki Traditional Sourcing vs Commercial Mills */}
      <ChakkiProcessStory />

      {/* 10. Virsa-Style 14-Day Guarantee & Nationwide COD Multi-column */}
      <TrustGuarantee />

      {/* 11. Customer Voices & Testimonials */}
      <CustomerReviews />

      {/* 12. Email Newsletter Subscription */}
      <NewsletterSection />

      {/* 13. Comprehensive Virsa-Style E-Commerce Footer */}
      <StoreFooter />
    </div>
  );
}
