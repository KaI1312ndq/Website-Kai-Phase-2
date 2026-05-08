import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nguyễn Đức Quảng — Ecom Growth Expert",
  description: "Digital Marketing Manager, Team Builder & Ecom Strategist. Giúp thương hiệu tăng trưởng bền vững trên TikTok Shop, Shopee, Meta và các nền tảng Ecommerce.",
  keywords: ["ecommerce", "digital marketing", "tiktok shop", "shopee", "performance marketing"],
  authors: [{ name: "Nguyễn Đức Quảng" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Nguyễn Đức Quảng — Ecom Growth Expert",
    description: "Digital Marketing Manager, Team Builder & Ecom Strategist.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body>{children}</body>
    </html>
  );
}
