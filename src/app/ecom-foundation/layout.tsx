import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nguyenducquang.website";

export const metadata: Metadata = {
  title: "Foundation Ecommerce — Tư duy thật, Thực chiến thật",
  description:
    "Khoá foundation về thương mại điện tử cho người mới và marketer trẻ. 12 buổi · 6 tuần · 100% Offline Hà Nội. Khoá 1: 999.000đ — giới hạn 7 học viên.",
  alternates: { canonical: "/ecom-foundation" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Foundation Ecommerce — Tư duy thật, Thực chiến thật",
    description: "Khoá học TMĐT cho người muốn làm thật. Khoá 1 chỉ 999.000đ — giới hạn 7 học viên.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Foundation Ecommerce — Tư duy thật, Thực chiến thật",
    description: "Khoá học TMĐT cho người muốn làm thật. Khoá 1 chỉ 999.000đ.",
  },
};

const courseLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Foundation Ecommerce",
  description:
    "Khoá foundation về thương mại điện tử cho người mới và marketer trẻ. 12 buổi · 6 tuần · 100% Offline tại Hà Nội. Tư duy thị trường, chiến lược sản phẩm, vận hành sàn (tư duy giá, tồn kho, điểm gian hàng), performance marketing, data & plan.",
  url: `${SITE_URL}/ecom-foundation`,
  inLanguage: "vi-VN",
  provider: {
    "@type": "Person",
    name: "Nguyễn Đức Quảng",
    url: SITE_URL,
  },
  educationalLevel: "Beginner",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  hasCourseInstance: [
    {
      "@type": "CourseInstance",
      name: "Foundation Ecommerce — Khoá 1",
      courseMode: "Offline",
      location: {
        "@type": "Place",
        name: "Khu Thanh Xuân, Hà Nội",
        address: { "@type": "PostalAddress", addressLocality: "Hà Nội", addressRegion: "Thanh Xuân", addressCountry: "VN" },
      },
      courseWorkload: "PT36H",
      courseSchedule: {
        "@type": "Schedule",
        repeatFrequency: "P3D5H",
        startDate: "2026-07-01",
      },
      instructor: {
        "@type": "Person",
        name: "Nguyễn Đức Quảng",
        jobTitle: "Digital Marketing Manager",
      },
      offers: {
        "@type": "Offer",
        price: "999000",
        priceCurrency: "VND",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/ecom-foundation#apply`,
        category: "Khoá 1 — Giới hạn 7 học viên",
      },
    },
  ],
  syllabusSections: [
    { "@type": "Syllabus", name: "Module 1 — Tư duy thị trường TMĐT (2 buổi)" },
    { "@type": "Syllabus", name: "Module 2 — Chiến lược sản phẩm, đối thủ, USP, SWOT (1 buổi)" },
    { "@type": "Syllabus", name: "Module 3 — Vận hành sàn: setup, tư duy giá, tồn kho, điểm gian hàng (2 buổi)" },
    { "@type": "Syllabus", name: "Module 4 — Performance Marketing: traffic, chỉ số, TikTok/Shopee/Facebook Ads (4 buổi)" },
    { "@type": "Syllabus", name: "Module 5 — Data & Plan: lập plan, P&L, phân tích data (2 buổi)" },
    { "@type": "Syllabus", name: "Capstone — Plan 1 năm + P&L cho 1 brand thật (1 buổi)" },
  ],
  offers: {
    "@type": "Offer",
    price: "999000",
    priceCurrency: "VND",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/ecom-foundation#apply`,
    validFrom: "2026-05-09",
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Foundation Ecommerce", item: `${SITE_URL}/ecom-foundation` },
  ],
};

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {children}
    </>
  );
}
