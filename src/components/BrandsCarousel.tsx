"use client";
import { useEffect, useRef } from "react";
import { DEFAULT_BRANDS, distributeToRows, type BrandEntry } from "@/lib/brand-data";
import { urlFor } from "../../sanity/lib/image";

export type SanityBrand = {
  _id: string;
  name: string;
  logo?: any;
  url?: string;
  order?: number;
};

type DisplayBrand = {
  name: string;
  /** ready-to-use src (data URL or Sanity CDN URL) */
  img?: string;
  url?: string;
};

function CarouselRow({ items, reverse = false }: { items: DisplayBrand[]; reverse?: boolean }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    let pos = reverse ? -el.scrollWidth / 2 : 0;
    const speed = reverse ? 0.4 : -0.4;

    function step() {
      pos += speed;
      const half = el!.scrollWidth / 2;
      if (!reverse && pos <= -half) pos = 0;
      if (reverse && pos >= 0) pos = -half;
      el!.style.transform = `translate3d(${pos}px,0,0)`;
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reverse, items]);

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden w-full" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <div ref={track} className="flex gap-6 w-max" style={{ willChange: "transform" }}>
        {doubled.map((brand, i) => (
          <div key={i} className="flex items-center justify-center px-6 py-3 rounded-xl flex-shrink-0"
            style={{
              background: brand.img ? "white" : "rgba(255,255,255,0.04)",
              border: brand.img ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.10)",
              minWidth: "120px",
              height: "56px",
              backdropFilter: brand.img ? "none" : "blur(10px)",
            }}>
            {brand.img ? (
              <img src={brand.img} alt={brand.name} className="h-7 w-auto object-contain" style={{ maxWidth: "100px" }} />
            ) : (
              <span className="font-bold text-[0.92rem] whitespace-nowrap grad-text tracking-tight">{brand.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function fallbackToDisplay(b: BrandEntry): DisplayBrand {
  return { name: b.name, img: b.logoBase64 };
}

function sanityToDisplay(b: SanityBrand): DisplayBrand {
  let img: string | undefined;
  if (b.logo) {
    try { img = urlFor(b.logo).width(200).height(80).url(); } catch {}
  }
  return { name: b.name, img, url: b.url };
}

export default function BrandsCarousel({ brands }: { brands?: SanityBrand[] } = {}) {
  const items: DisplayBrand[] =
    brands && brands.length > 0
      ? brands.map(sanityToDisplay)
      : DEFAULT_BRANDS.map(fallbackToDisplay);

  const rows = distributeToRows(items, 5);

  return (
    <div className="border-y" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10">
        <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.18em] mb-8" style={{ color: "var(--ink-mute)" }}>Đã làm việc cùng</p>
      </div>
      <div className="flex flex-col gap-4 pb-10">
        {rows.map((rowItems, i) => (
          <CarouselRow key={i} items={rowItems} reverse={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
}
