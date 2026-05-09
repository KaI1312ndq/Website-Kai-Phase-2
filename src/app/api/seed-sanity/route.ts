import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/**
 * Seed Sanity với content mặc định đang hiển thị trên homepage.
 * Idempotent — dùng deterministic _id, gọi lại không tạo trùng (createIfNotExists).
 *
 * Setup:
 *   1) Sanity → Manage → API → Tokens → Add token (write permission)
 *   2) Vercel env:
 *        SANITY_API_WRITE_TOKEN = <token>
 *        SEED_SECRET            = <chuỗi tự đặt, vd "kai-seed-2026">
 *   3) Mở:  /api/seed-sanity?secret=<SEED_SECRET>
 */

const CASE_STUDIES = [
  {
    _id: "case-tiktok-fashion-superbrand",
    title: "TikTok Shop · Fashion · Super Brand Day",
    brand: "Top 1 TikTok Shop Fashion",
    platforms: ["TikTok Shop"],
    category: "performance",
    role: "Lead Media + Content Strategy",
    headline: "11B",
    headlineLabel: "VNĐ",
    description: "Doanh thu 3 ngày Super Brand Day — Top 1 TikTok Shop ngành Fashion.",
    award: "Best Commerce Campaign Gold — TikTok Awards 2024",
    tags: ["TikTok Shop", "Media", "KOC/KOL"],
    order: 1,
    featured: true,
  },
  {
    _id: "case-multiplatform-health-beauty",
    title: "Multi-platform · Health & Beauty",
    brand: "Health & Beauty portfolio",
    platforms: ["TikTok Shop", "Shopee", "Meta Ads", "Google Ads"],
    category: "performance",
    role: "Digital Marketing Manager",
    headline: "60+",
    headlineLabel: "dự án",
    description: "Quản lý 60+ dự án Ecommerce đồng thời. Ngân sách 10B+/tháng, tăng trưởng 5-20%/tháng.",
    award: "Ngân sách 10B+/tháng, tăng trưởng 5-20%/tháng",
    tags: ["Performance", "Multi-platform", "ROAS"],
    order: 2,
    featured: true,
  },
  {
    _id: "case-team-building-upbase",
    title: "Team Building · UpBase",
    brand: "UpBase Vietnam",
    platforms: [],
    category: "team",
    role: "Team Lead",
    headline: "12",
    headlineLabel: "thành viên",
    description: "Tuyển dụng và đào tạo đội Performance 12 người trong 5 tháng. Quản lý ngân sách 8-10 tỷ/tháng.",
    award: "",
    tags: ["Recruitment", "Training", "OKR/KPI"],
    order: 3,
    featured: true,
  },
];

const TIMELINE = [
  {
    _id: "tl-2025-upbase-manager",
    year: "2025 – Nay",
    title: "Digital Marketing Manager · UpBase",
    description:
      "Xây dựng & phát triển đội ngũ 10 nhân sự trong 5 tháng. Quản lý ngân sách team 8-10 tỷ/tháng, cover doanh thu 50-70 tỷ/tháng. Quản lý 60+ dự án đa nền tảng TikTok, Shopee, Meta, Website, O2O. Mở rộng kênh sang Philippines từ con số 0.",
    current: true,
    order: 1,
  },
  {
    _id: "tl-2024-upbase-exec",
    year: "T1/2024 – 2025",
    title: "Ecommerce Executive · UpBase",
    description:
      "Triển khai TikTok Ads cho 18 gian hàng, GMV ~7 tỷ/tháng. Lên plan IMC cho 3 thương hiệu ngân sách ~500M/campaign đạt ROI 6. Mentor 2 nhân sự, nhân viên xuất sắc 2024 & giải nhất dự án tối ưu hoá vận hành.",
    current: false,
    order: 2,
  },
  {
    _id: "tl-2023-thebadgod",
    year: "2023",
    title: "Ecommerce Executive · The Bad God",
    description:
      "Vận hành TikTok Shop & Shopee cho thương hiệu thời trang. Booking KOC/KOL, content performance, media buying.",
    current: false,
    order: 3,
  },
  {
    _id: "tl-2022-bigmi-xiaomi",
    year: "2022",
    title: "Ecommerce Junior · Bigmi / Xiaomi Vietnam",
    description: "Vận hành sàn TMĐT, hỗ trợ triển khai campaigns cho ngành hàng gia dụng.",
    current: false,
    order: 4,
  },
  {
    _id: "tl-2021-start",
    year: "2021",
    title: "Bắt đầu hành trình Ecommerce",
    description: "Sinh viên Greenwich BTEC FPT. Bắt đầu với Shopee & Facebook Ads từ năm 2 đại học.",
    current: false,
    order: 5,
  },
];

const TESTIMONIALS = [
  {
    _id: "tm-placeholder-1",
    name: "Sắp cập nhật",
    role: "Client",
    company: "—",
    content: "Sắp cập nhật — nhận xét từ client hoặc đồng nghiệp đã làm việc cùng.",
    rating: 5,
    order: 1,
  },
  {
    _id: "tm-placeholder-2",
    name: "Sắp cập nhật",
    role: "Mentee",
    company: "—",
    content: "Sắp cập nhật — feedback từ mentee đã tham gia chương trình.",
    rating: 5,
    order: 2,
  },
  {
    _id: "tm-placeholder-3",
    name: "Sắp cập nhật",
    role: "Đồng nghiệp",
    company: "UpBase",
    content: "Sắp cập nhật — nhận xét từ đồng nghiệp UpBase.",
    rating: 5,
    order: 3,
  },
];

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");

  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized — set SEED_SECRET env var and pass ?secret=..." }, { status: 401 });
  }

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Missing SANITY_API_WRITE_TOKEN env var" }, { status: 500 });
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId === "placeholder") {
    return NextResponse.json({ error: "Missing NEXT_PUBLIC_SANITY_PROJECT_ID env var" }, { status: 500 });
  }

  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });

  const created: string[] = [];
  const errors: { id: string; error: string }[] = [];

  // Helper to upsert with createIfNotExists
  async function upsert(_type: string, items: any[], slugField: string | null = null) {
    for (const item of items) {
      try {
        const doc: any = { _type, ...item };
        if (slugField && item.title) {
          doc.slug = { _type: "slug", current: item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") };
        }
        await client.createIfNotExists(doc);
        created.push(`${_type}:${item._id}`);
      } catch (e) {
        errors.push({ id: `${_type}:${item._id}`, error: e instanceof Error ? e.message : String(e) });
      }
    }
  }

  await upsert("caseStudy", CASE_STUDIES, "slug");
  await upsert("timeline", TIMELINE);
  await upsert("testimonial", TESTIMONIALS);

  return NextResponse.json({
    success: errors.length === 0,
    created_count: created.length,
    created,
    errors,
    note: "Idempotent — gọi lại nhiều lần OK, không tạo trùng. Vào /studio để edit.",
  });
}
