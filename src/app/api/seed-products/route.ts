import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/**
 * Seed 3 placeholder products vào Sanity.
 * Quảng vào Studio sau đó upload masterFile + previewFile + ảnh thật.
 *
 * GET /api/seed-products?secret=<SEED_SECRET>
 */

const PRODUCTS = [
  {
    _id: "product-pl-excel-template",
    _type: "product",
    title: "Mẫu P&L Excel cho gian hàng TMĐT",
    slug: { _type: "slug", current: "pl-excel-template" },
    shortDescription: "File Excel tính P&L gian hàng theo 5 tầng - Net Revenue -> Gross -> Contribution -> Marketing -> EBITDA. Áp dụng được cho TikTok Shop + Shopee.",
    bullets: [
      "12 tab Excel theo dõi P&L 12 tháng",
      "Auto-calc gross margin, contribution margin, EBITDA",
      "Format VND đẹp + chart tự động",
      "Preset phí TikTok Shop & Shopee 2026",
      "Hướng dẫn dùng kèm 5 trang PDF",
    ],
    price: 99000,
    order: 1,
    active: true,
    category: "excel",
  },
  {
    _id: "product-salary-benchmark-pdf",
    _type: "product",
    title: "Salary Benchmark Digital Marketing VN 2026",
    slug: { _type: "slug", current: "salary-benchmark-2026" },
    shortDescription: "Báo cáo lương thực tế Performance Marketing & Media Buyer Việt Nam 2025-2026. Data từ TopCV, Navigos, LinkedIn, MISA AMIS + 60+ project Quảng quản lý.",
    bullets: [
      "Lương 6 level từ Intern -> Director (range cụ thể)",
      "So sánh 4 model: Enabler, Agency, Brand In-house, MNC",
      "Skill premium: Performance + Data = +20-30%, Full-stack = +35-50%",
      "10 nguồn tham khảo (TopCV, Navigos, AON, LinkedIn...)",
      "Update theo năm - bonus mỗi version mới miễn phí",
    ],
    price: 99000,
    order: 2,
    active: true,
    category: "pdf",
  },
  {
    _id: "product-brief-templates-pack",
    _type: "product",
    title: "Brief Templates Pack - Marketing Manager Toolkit",
    slug: { _type: "slug", current: "brief-templates-pack" },
    shortDescription: "Bộ 7 templates Word/Notion cho Marketing Manager: Campaign Brief, KPI Doc, Performance Review, Content Brief, Media Plan, Hiring JD, Onboarding Plan.",
    bullets: [
      "7 templates Word/Notion sẵn dùng",
      "Campaign Brief - structure 4P+STP đầy đủ",
      "KPI Doc - Performance Marketing + Brand metrics",
      "Hiring JD + Interview Scoring Rubric",
      "Onboarding Plan 30-60-90 cho new hire",
    ],
    price: 99000,
    order: 3,
    active: true,
    category: "templates",
  },
];

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.SANITY_API_WRITE_TOKEN;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!token || !projectId) {
    return NextResponse.json({ error: "Sanity not configured" }, { status: 500 });
  }

  const sanity = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });

  const results: any[] = [];
  for (const p of PRODUCTS) {
    try {
      await sanity.createIfNotExists(p as any);
      results.push({ id: p._id, status: "created" });
    } catch (e) {
      results.push({ id: p._id, status: `error: ${e instanceof Error ? e.message : String(e)}` });
    }
  }

  return NextResponse.json({
    ok: true,
    note: "Vào /studio -> 🛍️ Shop -> upload masterFile + previewFile + ảnh cho từng sản phẩm.",
    results,
  });
}
