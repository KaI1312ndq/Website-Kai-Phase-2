import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientBlobs from "@/components/GradientBlobs";
import Icon from "@/components/icons/Icon";
import { getProductBySlug, getAllProductSlugs } from "@/lib/queries";
import { urlFor } from "../../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import ProductDetailClient from "./ProductDetailClient";
import PublicVouchers from "@/components/voucher/PublicVouchers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nguyenducquang.website";

export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs();
    return (slugs || []).map((s: string) => ({ slug: s }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) return { title: "Sản phẩm" };

  const image = product.coverImage ? urlFor(product.coverImage).width(1200).height(630).url() : undefined;

  return {
    title: `${product.title} — ${product.price.toLocaleString("vi-VN")}đ`,
    description: product.shortDescription,
    alternates: { canonical: `/shop/${slug}` },
    openGraph: {
      type: "website",
      title: `${product.title} — ${product.price.toLocaleString("vi-VN")}đ`,
      description: product.shortDescription,
      url: `${SITE_URL}/shop/${slug}`,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
  };
}

export const revalidate = 60;

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) notFound();

  const reviews = product.reviews || [];
  const relatedProducts = product.relatedProducts || [];
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((s: number, r: any) => s + (r.rating || 0), 0) / reviews.length
      : null;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription,
    image: product.coverImage ? urlFor(product.coverImage).width(1200).url() : undefined,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/shop/${slug}`,
    },
    ...(avgRating !== null && reviews.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating.toFixed(1),
        reviewCount: reviews.length,
      },
      review: reviews.map((r: any) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.reviewerName },
        reviewRating: { "@type": "Rating", ratingValue: r.rating },
        reviewBody: r.content,
      })),
    }),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
      { "@type": "ListItem", position: 3, name: product.title, item: `${SITE_URL}/shop/${slug}` },
    ],
  };

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

        {/* HERO with gallery + buy */}
        <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
          <div className="grid-pattern" />
          <GradientBlobs blobs={[
            { variant: "blue", size: 500, top: "-20%", right: "-5%" },
            { variant: "purple", size: 420, bottom: "-30%", left: "-5%", delay: "2s" },
          ]} />
          <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 pt-28 pb-12 md:pt-32 md:pb-16">
            <div className="mb-5">
              <Link href="/shop" className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium" style={{ color: "var(--ink-mute)" }}>
                ← Shop
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
              {/* Gallery */}
              <div className="flex flex-col gap-3">
                {product.coverImage && (
                  <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ background: "var(--grad-primary-soft)" }}>
                    <img src={urlFor(product.coverImage).width(1200).url()} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                )}
                {Array.isArray(product.mockupImages) && product.mockupImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.mockupImages.slice(0, 4).map((img: any, i: number) => (
                      <div key={i} className="rounded-lg overflow-hidden aspect-square" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)" }}>
                        <img src={urlFor(img).width(300).url()} alt={`${product.title} mockup ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-5">
                <div className="section-tag">{product.category || "Premium"}</div>
                <h1 className="t-h1 leading-[1.1] text-white">{product.title}</h1>

                {/* Rating summary */}
                {avgRating !== null && reviews.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-[1rem] font-bold" style={{ color: "#ffd479" }}>
                      {"★".repeat(Math.round(avgRating))}
                      <span style={{ color: "rgba(255,255,255,0.2)" }}>{"★".repeat(5 - Math.round(avgRating))}</span>
                    </span>
                    <span className="text-[0.9rem] font-semibold text-white">{avgRating.toFixed(1)}/5</span>
                    <span className="text-[0.85rem]" style={{ color: "var(--ink-mute)" }}>· {reviews.length} đánh giá</span>
                  </div>
                )}

                <p className="text-[1rem] leading-[1.7]" style={{ color: "var(--ink-soft)" }}>
                  {product.shortDescription}
                </p>

                {/* Price */}
                <div className="rounded-2xl p-5 flex items-baseline gap-3" style={{ background: "rgba(20,110,245,0.08)", border: "1px solid rgba(20,110,245,0.25)" }}>
                  <span className="text-[2rem] font-extrabold grad-text leading-none">{product.price.toLocaleString("vi-VN")}đ</span>
                  <span className="text-[0.78rem] font-semibold px-2 py-0.5 rounded" style={{ background: "rgba(95,255,170,0.15)", color: "#5fffaa" }}>
                    Mua mãi, dùng mãi
                  </span>
                </div>

                {/* Public vouchers */}
                <PublicVouchers />

                {/* Buy now */}
                <ProductDetailClient productId={product._id} productTitle={product.title} price={product.price} />

                {/* Preview link */}
                {product.previewFileUrl && (
                  <a href={product.previewFileUrl} target="_blank" rel="noreferrer"
                    className="text-[0.88rem] font-semibold inline-flex items-center gap-2"
                    style={{ color: "#7da9ff" }}>
                    <Icon name="book-open" size={14} />
                    Xem preview miễn phí (PDF)
                  </a>
                )}

                {/* Trust badges */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <TrustBadge icon="check" color="#5fffaa" title="Tải xuống ngay" desc="Email file trong 1h sau khi nhận tiền" />
                  <TrustBadge icon="zap" color="#ffd479" title="Update miễn phí" desc="Mọi version mới gửi tự động" />
                  <TrustBadge icon="user" color="#7da9ff" title="500+ khách đã mua" desc="Marketers, founders, sinh viên" />
                  <TrustBadge icon="info" color="#a78bff" title="Hỗ trợ Zalo" desc="Quảng trả lời trong 24h" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* "Trong này có gì" — Bullets */}
        {Array.isArray(product.bullets) && product.bullets.length > 0 && (
          <section className="relative border-b" style={{ borderColor: "var(--line)" }}>
            <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-14 md:py-20">
              <div className="section-tag">Trong này có gì</div>
              <h2 className="t-h2 mb-8 text-white">Bạn nhận được <span className="grad-text">cụ thể.</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.bullets.map((b: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
                    <span className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(95,255,170,0.15)", color: "#5fffaa" }}>
                      <Icon name="check" size={14} strokeWidth={3} />
                    </span>
                    <span className="text-[0.95rem] leading-[1.6]" style={{ color: "rgba(255,255,255,0.9)" }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* USP / Why buy */}
        <section className="relative border-b" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-14 md:py-20">
            <div className="section-tag">Vì sao mua</div>
            <h2 className="t-h2 mb-10 text-white">3 lý do <span className="grad-text">đáng đầu tư.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <USPCard
                number="01"
                title="Đã được kiểm chứng"
                desc="Đúc kết từ 60+ project Ecom thực chiến. Không phải lý thuyết suông — mỗi template/data đều có context thực."
              />
              <USPCard
                number="02"
                title="Tiết kiệm 10-50h research"
                desc="Bỏ ra 99k thay vì 1-2 tuần tự research, build, format. Áp dụng ngay từ ngày đầu vào việc."
              />
              <USPCard
                number="03"
                title="Update mãi mãi"
                desc="Khi data thay đổi (phí sàn 2027, salary mới), Quảng update file → bạn nhận lại miễn phí qua email."
              />
            </div>
          </div>
        </section>

        {/* Long description */}
        {product.longDescription && (
          <section className="relative border-b" style={{ borderColor: "var(--line)" }}>
            <div className="max-w-[820px] mx-auto px-6 md:px-10 py-14 md:py-20">
              <div className="section-tag">Mô tả chi tiết</div>
              <h2 className="t-h2 mb-8 text-white">Tất cả những gì <span className="grad-text">bạn cần biết.</span></h2>
              <article className="prose-ndq">
                <PortableText value={product.longDescription} />
              </article>
            </div>
          </section>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <section className="relative border-b" style={{ borderColor: "var(--line)" }}>
            <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-14 md:py-20">
              <div className="section-tag">Đánh giá</div>
              <div className="flex items-baseline gap-3 mb-8 flex-wrap">
                <h2 className="t-h2 text-white">Khách hàng nói gì.</h2>
                {avgRating && (
                  <div className="text-[1rem] font-bold" style={{ color: "#ffd479" }}>
                    {"★".repeat(Math.round(avgRating))} {avgRating.toFixed(1)}/5 · {reviews.length} đánh giá
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {reviews.map((r: any) => (
                  <div key={r._id} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white" style={{ background: "var(--grad-primary)" }}>
                        {r.reviewerAvatar ? (
                          <img src={urlFor(r.reviewerAvatar).width(80).height(80).url()} alt={r.reviewerName} className="w-full h-full object-cover rounded-full" />
                        ) : (
                          r.reviewerName.split(" ").map((s: string) => s[0]).slice(-2).join("").toUpperCase()
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[0.92rem] font-bold text-white">{r.reviewerName}</span>
                          {r.verified && (
                            <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(95,255,170,0.15)", color: "#5fffaa" }}>
                              <Icon name="check" size={10} strokeWidth={3} />
                              Đã mua
                            </span>
                          )}
                        </div>
                        {r.reviewerRole && (
                          <div className="text-[0.74rem]" style={{ color: "var(--ink-mute)" }}>{r.reviewerRole}</div>
                        )}
                      </div>
                      <div className="text-[0.9rem]" style={{ color: "#ffd479" }}>
                        {"★".repeat(r.rating)}
                      </div>
                    </div>
                    <p className="text-[0.92rem] leading-[1.65]" style={{ color: "rgba(255,255,255,0.85)" }}>
                      {r.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="relative border-b" style={{ borderColor: "var(--line)" }}>
            <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-14 md:py-20">
              <div className="section-tag">Có thể bạn thích</div>
              <h2 className="t-h2 mb-8 text-white">Sản phẩm <span className="grad-text">khác.</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedProducts.map((p: any) => (
                  <Link key={p._id} href={`/shop/${p.slug.current}`} className="rounded-2xl overflow-hidden flex flex-col group" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
                    <div className="aspect-[4/3] overflow-hidden" style={{ background: "var(--grad-primary-soft)" }}>
                      {p.coverImage ? (
                        <img src={urlFor(p.coverImage).width(600).url()} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[0.78rem] uppercase tracking-[0.2em] grad-text font-semibold">{p.category}</div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-[1rem] font-bold text-white mb-2 leading-tight group-hover:text-[#7da9ff] transition-colors">{p.title}</h3>
                      <div className="text-[1.1rem] font-extrabold grad-text">{p.price.toLocaleString("vi-VN")}đ</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Combo CTA */}
        <section className="relative">
          <div className="max-w-[820px] mx-auto px-6 md:px-10 py-14 md:py-20 text-center">
            <div className="rounded-2xl p-8 md:p-10" style={{ background: "linear-gradient(135deg, rgba(20,110,245,0.10) 0%, rgba(122,61,255,0.10) 100%)", border: "1px solid rgba(20,110,245,0.25)" }}>
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: "#7da9ff" }}>Combo tiết kiệm</div>
              <h3 className="text-[1.4rem] font-bold text-white mb-3">Mua combo 3 — chỉ 199k</h3>
              <p className="text-[0.95rem] mb-5" style={{ color: "rgba(255,255,255,0.8)" }}>
                Mua từng cái 297k. Combo 3 chỉ 199k (-98k). Khuyến mãi giới hạn.
              </p>
              <Link href="/shop" className="btn btn-primary">Xem combo 3 sản phẩm →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function TrustBadge({ icon, color, title, desc }: { icon: any; color: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-2.5 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)" }}>
      <span className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: `${color}18`, color }}>
        <Icon name={icon} size={16} />
      </span>
      <div className="min-w-0">
        <div className="text-[0.82rem] font-bold text-white">{title}</div>
        <div className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.55)" }}>{desc}</div>
      </div>
    </div>
  );
}

function USPCard({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)" }}>
      <div className="text-[1.6rem] font-extrabold grad-text leading-none mb-3">{number}</div>
      <h3 className="text-[1.05rem] font-bold text-white mb-2">{title}</h3>
      <p className="text-[0.9rem] leading-[1.6]" style={{ color: "rgba(255,255,255,0.7)" }}>{desc}</p>
    </div>
  );
}
