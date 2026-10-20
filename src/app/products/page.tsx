import type { Metadata } from "next";
import { ProductsPageView } from "./ProductsPageView";

export const metadata: Metadata = {
  title: "All Products | Stone-Ground Flours, Spices & Organic Teas",
  description:
    "Explore all 17 unadulterated essentials from Usman's Pure. Cold-milled chakki atta, therapeutic diabetic flour, single-origin Lakadong turmeric, and wild herbal teas.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "All Products | Stone-Ground Flours, Spices & Organic Teas",
    description:
      "Explore all 17 unadulterated essentials from Usman's Pure. Cold-milled chakki atta, therapeutic diabetic flour, single-origin Lakadong turmeric, and wild herbal teas.",
    url: "https://usmanspure.com/products",
    type: "website",
    images: [
      {
        url: "/images/products/prod-3.jpg",
        width: 1200,
        height: 630,
        alt: "Usman's Pure Products Catalog",
      },
    ],
  },
};

export default function ProductsPage() {
  return <ProductsPageView />;
}
