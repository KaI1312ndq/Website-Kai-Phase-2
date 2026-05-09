import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import NoiseOverlay from "@/components/NoiseOverlay";
import Analytics from "@/components/Analytics";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vn",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nguyenducquang.website"),
  title: {
    default: "Nguyễn Đức Quảng — Ecom Growth Expert",
    template: "%s — Nguyễn Đức Quảng",
  },
  description:
    "Digital Marketing Manager, Team Builder & Ecom Strategist. Giúp thương hiệu tăng trưởng bền vững trên TikTok Shop, Shopee, Meta và các nền tảng Ecommerce.",
  keywords: [
    "ecommerce",
    "digital marketing",
    "tiktok shop",
    "shopee",
    "performance marketing",
    "ecom mentor",
    "khoá học ecom",
    "foundation ecommerce",
    "nguyễn đức quảng",
  ],
  authors: [{ name: "Nguyễn Đức Quảng" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Nguyễn Đức Quảng",
    title: "Nguyễn Đức Quảng — Ecom Growth Expert",
    description: "Digital Marketing Manager, Team Builder & Ecom Strategist.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyễn Đức Quảng — Ecom Growth Expert",
    description: "Marketer · Leader · Mentor.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${jakarta.variable} ${beVietnam.variable}`}>
      <body className="font-sans antialiased">
        <NoiseOverlay />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
