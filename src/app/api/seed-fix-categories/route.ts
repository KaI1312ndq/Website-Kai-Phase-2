import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/**
 * One-time fix: patch incorrect category values + featuredOrder on all seeded posts.
 * Run once via GET /api/seed-fix-categories?secret=...
 */

const PATCHES: Array<{ id: string; category: string; featuredOrder?: number }> = [
  // "Unit Economics" -> "unit-economics"
  { id: "blog-phi-hoa-hong-tiktok-shop-2026-tung-nganh",          category: "unit-economics" },
  { id: "blog-cach-build-pl-gian-hang-tmdt-tu-so-0",              category: "unit-economics" },
  { id: "blog-phi-shopee-non-mall-2026-bang-day-du",              category: "unit-economics" },
  { id: "blog-tiktok-shop-hay-shopee-so-sanh-chi-phi-2026",       category: "unit-economics" },
  { id: "blog-contribution-margin-la-gi-trong-ecom",              category: "unit-economics" },
  { id: "blog-gross-margin-vs-net-margin-seller-can-biet",        category: "unit-economics" },
  { id: "blog-unit-economics-ecom-framework-5-tang",              category: "unit-economics" },
  { id: "blog-shopee-mall-vuot-30-phi-san-4-huong-di",            category: "unit-economics", featuredOrder: 1 },

  // "Performance Marketing" -> "performance"
  { id: "blog-roas-bao-nhieu-la-du-theo-nganh-2026",              category: "performance" },
  { id: "blog-break-even-roas-la-gi-cong-thuc-tinh",              category: "performance" },
  { id: "blog-roas-cao-van-lo-3-ly-do-pho-bien",                  category: "performance" },
  { id: "blog-phi-tiktok-shop-2026-bang-chi-tiet-theo-nganh",     category: "tiktok" },

  // "Tài chính cá nhân" + "tax" -> "thue-cong-cu"
  { id: "blog-thue-tncn-2026-thay-doi-gi-so-voi-2025",            category: "thue-cong-cu" },
  { id: "blog-cach-tinh-luong-net-tu-gross-2026",                 category: "thue-cong-cu" },
  { id: "blog-luong-bao-nhieu-phai-dong-thue-tncn-2026",          category: "thue-cong-cu" },
  { id: "blog-cach-tinh-luong-net-tu-gross-chi-tiet-2026",        category: "thue-cong-cu" },
];

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    token: process.env.SANITY_API_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  const results = [];
  for (const patch of PATCHES) {
    try {
      const setFields: Record<string, unknown> = { category: patch.category };
      if (patch.featuredOrder !== undefined) setFields.featuredOrder = patch.featuredOrder;

      await client.patch(patch.id).set(setFields).commit();
      results.push({ id: patch.id, status: "patched", category: patch.category });
    } catch (err: any) {
      results.push({ id: patch.id, status: "error", message: err.message });
    }
  }

  return NextResponse.json({ success: true, count: results.length, results });
}
