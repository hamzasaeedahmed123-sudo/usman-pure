import type { Metadata } from "next";
import { AboutPageView } from "./AboutPageView";

export const metadata: Metadata = {
  title: "Our Heritage & Cold Stone-Milling Standards | Usman's Pure",
  description:
    "Discover our traditional stone-ground chakki process operating below 40°C to preserve live nutrients, healthy wheat germ, and raw dietary fiber.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Our Heritage & Cold Stone-Milling Standards | Usman's Pure",
    description:
      "Discover our traditional stone-ground chakki process operating below 40°C to preserve live nutrients, healthy wheat germ, and raw dietary fiber.",
    url: "https://usmanspure.com/about",
    type: "website",
    images: [
      {
        url: "/images/products/prod-3.jpg",
        width: 1200,
        height: 630,
        alt: "Usman's Pure Traditional Stone Chakki Milling Process",
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutPageView />;
}
