import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import { getActiveProducts } from "@/lib/queries";
import ShopClient from "./ShopClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nguyenducquang.website";

export const metadata: Metadata = {
  title: "Shop — Templates Excel, Báo cáo PDF & Brief Marketing 2026",
  description:
    "Mẫu P&L Excel, Salary Benchmark VN 2026, Brief Templates Marketing — premium templates từ kinh nghiệm 60+ project Ecom. Combo 3 chỉ 199k.",
  alternates: { canonical: "/shop" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Shop — Templates Marketing & Ecom Premium 2026",
    description: "Mẫu P&L Excel, Salary PDF, Brief Templates — combo từ 99k.",
    url: `${SITE_URL}/shop`,
  },
};

export const revalidate = 60;

export default async function ShopPage() {
  let products: any[] = [];
  try {
    products = await getActiveProducts();
  } catch {}

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Shop — Premium Templates Marketing",
    description: "Mẫu Excel, PDF, Brief templates premium cho marketer + ecom seller VN.",
    url: `${SITE_URL}/shop`,
    numberOfItems: products.length,
    itemListElement: products.map((p: any, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.title,
        offers: { "@type": "Offer", price: p.price, priceCurrency: "VND", availability: "https://schema.org/InStock" },
      },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
    ],
  };

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "blue", size: 500, top: "-20%", right: "-5%" },
            { variant: "purple", size: 420, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 pt-32 pb-12 md:pt-36 md:pb-16">
            <div className="section-tag">Shop · Premium Templates</div>
            <h1 className="t-display tracking-tight mb-4 max-w-[840px] text-white">
              Templates &<br /><span className="grad-text">Báo cáo Marketing.</span>
            </h1>
            <p className="t-body-lg max-w-[640px]">
              Mẫu Excel, PDF, Brief templates đã đóng gói sẵn — từ kinh nghiệm 60+ project Ecom. Mỗi sản phẩm 99k. Mua combo càng nhiều càng giảm sâu.
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-12 md:py-16">
            {products.length === 0 ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
                <h2 className="text-[1.2rem] font-bold text-white mb-2">Sản phẩm đang được chuẩn bị</h2>
                <p className="text-[0.92rem]" style={{ color: "var(--ink-mute)" }}>
                  Quay lại sớm — Quảng đang upload templates lên.
                </p>
              </div>
            ) : (
              <ShopClient products={products} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
