import type { Metadata } from "next";
import { ReviewsPageView } from "./ReviewsPageView";

export const metadata: Metadata = {
  title: "Verified Customer Reviews & Real Stories | Usman's Pure",
  description:
    "Read 500+ verified customer experiences with our stone-ground flours, diabetic flour, and organic teas. Authentic meal photos and health transformations.",
  alternates: {
    canonical: "/reviews",
  },
  openGraph: {
    title: "Verified Customer Reviews & Real Stories | Usman's Pure",
    description:
      "Read 500+ verified customer experiences with our stone-ground flours, diabetic flour, and organic teas. Authentic meal photos and health transformations.",
    url: "https://usmanspure.com/reviews",
    type: "website",
    images: [
      {
        url: "/images/products/prod-3.jpg",
        width: 1200,
        height: 630,
        alt: "500+ Verified Customer Reviews - Usman's Pure",
      },
    ],
  },
};

export default function ReviewsPage() {
  return <ReviewsPageView />;
}
