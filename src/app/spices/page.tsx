import type { Metadata } from "next";
import { SpicesPageView } from "./SpicesPageView";

export const metadata: Metadata = {
  title: "Pure Cold-Pounded Organic Spices | Usman's Pure",
  description:
    "Single-origin Lakadong Turmeric (7%+ curcumin), pure Kashmiri chili, and stone-pounded garam masala. Zero synthetic colors or adulterants.",
  alternates: {
    canonical: "/spices",
  },
  openGraph: {
    title: "Pure Cold-Pounded Organic Spices | Usman's Pure",
    description:
      "Single-origin Lakadong Turmeric (7%+ curcumin), pure Kashmiri chili, and stone-pounded garam masala. Zero synthetic colors or adulterants.",
    url: "https://usmanspure.com/spices",
    type: "website",
    images: [
      {
        url: "/images/spices-product.jpg",
        width: 1200,
        height: 630,
        alt: "Pure Cold-Pounded Organic Spices",
      },
    ],
  },
};

export default function SpicesPage() {
  return <SpicesPageView />;
}
