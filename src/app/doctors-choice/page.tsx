import type { Metadata } from "next";
import { DoctorsChoicePageView } from "./DoctorsChoicePageView";

export const metadata: Metadata = {
  title: "Diabetic & Heart-Healthy Therapeutic Flours | Doctor Recommended Nutrition",
  description:
    "Low-GI flour blends enriched with fenugreek, barley, and cold-milled whole grains. Ideal for blood sugar control and cardiac wellness.",
  alternates: {
    canonical: "/doctors-choice",
  },
  openGraph: {
    title: "Diabetic & Heart-Healthy Therapeutic Flours | Doctor Recommended Nutrition",
    description:
      "Low-GI flour blends enriched with fenugreek, barley, and cold-milled whole grains. Ideal for blood sugar control and cardiac wellness.",
    url: "https://usmanspure.com/doctors-choice",
    type: "website",
    images: [
      {
        url: "/images/products/prod-4.png",
        width: 1200,
        height: 630,
        alt: "Doctor Recommended Diabetic & Heart Health Flours",
      },
    ],
  },
};

export default function DoctorsChoicePage() {
  return <DoctorsChoicePageView />;
}
