import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/**
 * One-time fix: patch Shopee Non-Mall blog post with correct Pi Ship (1.600đ not 2.700đ).
 * Run once via GET /api/seed-fix-pi-ship-nonmall?secret=...
 */

const POST_ID = "blog-phi-shopee-non-mall-2026-bang-day-du";

// Block-level patches keyed by _key (Portable Text blocks)
const BLOCK_PATCHES: Array<{ key: string; newSpans: { text: string; bold?: boolean }[] }> = [
  {
    key: "b3",
    newSpans: [
      { text: "2. Phí tự chọn (opt-in):", bold: true },
      { text: " Voucher Xtra 5.5% trên doanh thu sau seller voucher (tăng từ 4% ngày 23/05/2026) + Pi Ship 1.600đ/đơn (Non-Mall giữ nguyên; Mall tăng lên 2.700đ từ 23/05/2026)." },
    ],
  },
  {
    key: "b4",
    newSpans: [
      { text: "Nếu đăng ký cả Voucher Xtra và Pi Ship: tổng phí opt-in = 5.5% doanh thu thực + 1.600đ. Trên sản phẩm 300.000đ (không seller voucher): 16.500đ + 1.600đ = 18.100đ thêm vào mỗi đơn." },
    ],
  },
  {
    key: "j6",
    newSpans: [
      { text: "Pi Ship:", bold: true },
      { text: " 1.600đ (Non-Mall giữ nguyên)" },
    ],
  },
  {
    key: "j7",
    newSpans: [
      { text: "Tổng phí sàn: 64.525đ (21.5% giá bán)", bold: true },
    ],
  },
];

const NEW_EXCERPT = "Shopee Non-Mall 2026 có phí hoa hồng dao động 7-13% tùy ngành hàng, thấp hơn Mall 3-5%. Bài này tổng hợp bảng phí đầy đủ Non-Mall từng ngành, cộng với phí giao dịch, Voucher Xtra mới 5.5%, và Pi Ship 1.600đ (Non-Mall giữ nguyên, Mall tăng lên 2.700đ).";
const NEW_SEO_DESC = "Bảng phí hoa hồng Shopee Non-Mall 2026: Beauty 8-10%, Fashion 8-10%, Sức Khỏe 10-12%, Electronics 5-7%. Cộng phí giao dịch 6%, Voucher Xtra 5.5%, Pi Ship 1.600đ Non-Mall (Mall 2.700đ).";

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

  // Fetch current body
  const doc = await client.fetch(`*[_id == $id][0]{ _id, body }`, { id: POST_ID });
  if (!doc) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  const body = doc.body as any[];
  const results: string[] = [];

  // Update blocks in place by _key
  for (const patch of BLOCK_PATCHES) {
    const idx = body.findIndex((b) => b._key === patch.key);
    if (idx < 0) { results.push(`MISS ${patch.key}`); continue; }
    body[idx] = {
      ...body[idx],
      children: patch.newSpans.map((s, i) => ({
        _type: "span",
        _key: `${patch.key}s${i}`,
        text: s.text,
        marks: s.bold ? ["strong"] : [],
      })),
    };
    results.push(`OK ${patch.key}`);
  }

  // Patch body + excerpt + seoDescription
  await client.patch(POST_ID).set({
    body,
    excerpt: NEW_EXCERPT,
    seoDescription: NEW_SEO_DESC,
  }).commit();

  return NextResponse.json({ success: true, postId: POST_ID, blockUpdates: results });
}
