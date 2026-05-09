import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import NoiseOverlay from "@/components/NoiseOverlay";

export const metadata: Metadata = {
  title: "Nguyễn Đức Quảng — Ecom Growth Expert",
  description:
    "Digital Marketing Manager, Team Builder & Ecom Strategist. Giúp thương hiệu tăng trưởng bền vững trên TikTok Shop, Shopee, Meta và các nền tảng Ecommerce.",
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
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <NoiseOverlay />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
