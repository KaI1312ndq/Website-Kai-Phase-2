import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foundation Ecommerce — Khoá học TMĐT",
  description:
    "Khoá foundation về thương mại điện tử cho người mới và marketer trẻ. 12 buổi · 6 tuần · 100% Offline Hà Nội. Khoá 1: 999.000đ — giới hạn 7 học viên.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Foundation Ecommerce — Khoá học TMĐT 2 buổi/tuần",
    description: "12 buổi · 6 tuần · 100% Offline. Khoá 1 chỉ 999.000đ — giới hạn 7 học viên.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Foundation Ecommerce — Khoá học TMĐT",
    description: "12 buổi · 6 tuần · 100% Offline. Khoá 1 chỉ 999.000đ.",
  },
};

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
