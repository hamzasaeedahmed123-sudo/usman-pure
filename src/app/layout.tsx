import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Usman's Pure Products | 100% Organic & Stone-Ground Essentials",
  description:
    "Discover premium Chakki Multigrain Flour, pure Organic Herbal Teas, and cold-ground spices from Usman's Pure Products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased text-stone-900 bg-stone-100 overflow-x-hidden selection:bg-emerald-600/20 selection:text-emerald-900">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
