import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import NoiseOverlay from "@/components/NoiseOverlay";
import Analytics from "@/components/Analytics";
import LeadPopup from "@/components/LeadPopup";
import PageTransition from "@/components/PageTransition";

// Reduced weights to cut critical font requests in half (was 5+4 = 9 weights → 3+2 = 5)
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  variable: "--font-be-vn",
  display: "swap",
  preload: false,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nguyenducquang.website";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nguyễn Đức Quảng — Ecom Growth Expert",
    template: "%s — Nguyễn Đức Quảng",
  },
  description:
    "Digital Marketing Manager, Team Builder & Ecom Strategist. Giúp thương hiệu tăng trưởng bền vững trên TikTok Shop, Shopee, Meta và các nền tảng Ecommerce.",
  keywords: [
    "ecommerce", "digital marketing", "tiktok shop", "shopee", "performance marketing",
    "ecom mentor", "khoá học ecom", "foundation ecommerce", "nguyễn đức quảng",
    "tính phí sàn", "phí sàn tiktok", "phí sàn shopee",
  ],
  authors: [{ name: "Nguyễn Đức Quảng", url: SITE_URL }],
  creator: "Nguyễn Đức Quảng",
  publisher: "Nguyễn Đức Quảng",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Nguyễn Đức Quảng",
    url: SITE_URL,
    title: "Nguyễn Đức Quảng — Ecom Growth Expert",
    description: "Digital Marketing Manager, Team Builder & Ecom Strategist.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyễn Đức Quảng — Ecom Growth Expert",
    description: "Marketer · Leader · Mentor.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#08102b",
  width: "device-width",
  initialScale: 1,
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nguyễn Đức Quảng",
  alternateName: "Kai",
  url: SITE_URL,
  image: `${SITE_URL}/kai-photo.webp`,
  jobTitle: "Digital Marketing Manager",
  worksFor: { "@type": "Organization", name: "UpBase Vietnam" },
  knowsAbout: [
    "Ecommerce", "Performance Marketing", "TikTok Shop", "Shopee", "Meta Ads", "Google Ads",
    "Team Building", "Ecommerce Strategy", "Marketplace Management",
    "ROAS Optimization", "P&L Analysis", "Live Commerce", "Brand Building",
    "Digital Marketing Vietnam", "Growth Marketing", "Affiliate Marketing",
    "MBTI", "Leadership Development", "Career Coaching",
  ],
  knowsLanguage: [
    { "@type": "Language", name: "Vietnamese", alternateName: "vi" },
    { "@type": "Language", name: "English", alternateName: "en" },
  ],
  award: [
    "TikTok Awards 2024 — Best Commerce Campaign Gold",
  ],
  alumniOf: { "@type": "EducationalOrganization", name: "Marketing/Ecom Vietnam" },
  hasOccupation: {
    "@type": "Occupation",
    name: "Digital Marketing Manager / Ecom Growth Expert",
    occupationLocation: { "@type": "City", name: "Hà Nội" },
    skills: "Performance Marketing, P&L gian hàng, Team Building, TikTok Shop, Shopee Mall",
  },
  sameAs: [
    "https://www.linkedin.com/in/duc-quang-nguyen-b7495223a/",
    "https://nguyenducquang.website",
  ],
  email: "qforwork13@gmail.com",
  telephone: "+84868464658",
  address: { "@type": "PostalAddress", addressLocality: "Hà Nội", addressCountry: "VN" },
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Nguyễn Đức Quảng",
  url: SITE_URL,
  inLanguage: "vi-VN",
  publisher: { "@type": "Person", name: "Nguyễn Đức Quảng" },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/blog?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Nguyễn Đức Quảng — Ecom Growth Expert",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/kai-photo.webp`,
  founder: { "@type": "Person", name: "Nguyễn Đức Quảng" },
  email: "qforwork13@gmail.com",
  telephone: "+84868464658",
  priceRange: "999.000đ — 5.000.000đ",
  address: { "@type": "PostalAddress", addressLocality: "Hà Nội", addressRegion: "Thanh Xuân", addressCountry: "VN" },
  areaServed: { "@type": "Country", name: "Vietnam" },
  serviceType: ["Ecommerce Consulting", "Digital Marketing Training", "Team Building", "Performance Marketing"],
  sameAs: ["https://www.linkedin.com/in/duc-quang-nguyen-b7495223a/"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${jakarta.variable} ${beVietnam.variable}`}>
      <head>
        {/* Preconnect to external services for faster handshake */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.web3forms.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />

        {/* Site-wide structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      </head>
      <body className="font-sans antialiased">
        <NextTopLoader
          color="#7da9ff"
          height={2.5}
          showSpinner={false}
          shadow="0 0 12px rgba(20,110,245,0.6),0 0 6px rgba(122,61,255,0.4)"
          easing="cubic-bezier(0.2, 0.8, 0.2, 1)"
          speed={550}
        />
        <NoiseOverlay />
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
        <LeadPopup />
        <Analytics />
      </body>
    </html>
  );
}
