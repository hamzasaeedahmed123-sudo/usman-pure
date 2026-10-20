import type { Metadata } from "next";
import { BundlesPageView } from "./BundlesPageView";

export const metadata: Metadata = {
  title: "Health & Transformation Bundles | Value Combos with Free Delivery",
  description:
    "Save up to Rs 800 on carefully curated health bundles: Fat Loss Transformation Combo, Diabetic Care Pack, and Family Vitality.",
  alternates: {
    canonical: "/bundles",
  },
  openGraph: {
    title: "Health & Transformation Bundles | Value Combos with Free Delivery",
    description:
      "Save up to Rs 800 on carefully curated health bundles: Fat Loss Transformation Combo, Diabetic Care Pack, and Family Vitality.",
    url: "https://usmanspure.com/bundles",
    type: "website",
    images: [
      {
        url: "/images/products/prod-3.jpg",
        width: 1200,
        height: 630,
        alt: "Curated Health & Transformation Bundles",
      },
    ],
  },
};

export default function BundlesPage() {
  return <BundlesPageView />;
}
