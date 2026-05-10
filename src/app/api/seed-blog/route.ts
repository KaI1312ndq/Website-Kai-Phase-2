import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/**
 * Seed 2 blog posts vào Sanity.
 * Idempotent — gọi lại không tạo trùng (createIfNotExists).
 *
 * Cách dùng:
 *   /api/seed-blog?secret=<SEED_SECRET>
 *
 * Sau khi seed xong vào /studio để:
 *   - Upload ảnh bìa (coverImage)
 *   - Edit/bổ sung nội dung
 *   - Publish (bỏ draft nếu cần)
 */

function block(
  key: string,
  style: "normal" | "h2" | "h3" | "blockquote",
  text: string,
  bold?: boolean,
) {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `${key}s`,
        text,
        marks: bold ? ["strong"] : [],
      },
    ],
  };
}

function normalWithParts(key: string, parts: { text: string; bold?: boolean }[]) {
  return {
    _type: "block",
    _key: key,
    style: "normal" as const,
    markDefs: [],
    children: parts.map((p, i) => ({
      _type: "span",
      _key: `${key}s${i}`,
      text: p.text,
      marks: p.bold ? ["strong"] : [],
    })),
  };
}

/* ────────────────────────────────────────────────
   BÀI 1: PHÍ TIKTOK SHOP 2026
──────────────────────────────────────────────── */
const POST_PHI_TIKTOK: any = {
  _id: "blog-phi-tiktok-shop-2026",
  _type: "post",
  title: "Phí TikTok Shop 2026 — Bảng đầy đủ từ 09/05/2026 + Cách tính",
  slug: { _type: "slug", current: "phi-tiktok-shop-2026" },
  excerpt:
    "TikTok Shop áp bảng phí mới từ 09/05/2026. Hoa hồng 11.5–18%, phí giao dịch 6%, Voucher Extra Plus 5.5%. Tổng hợp đầy đủ và ví dụ tính thực tế.",
  category: "tiktok",
  readTime: 7,
  publishedAt: "2026-05-10T09:00:00.000Z",
  featured: true,
  seoTitle: "Phí TikTok Shop 2026 — Bảng đầy đủ hoa hồng + giao dịch + Voucher Extra",
  seoDescription:
    "Cập nhật bảng phí TikTok Shop từ 09/05/2026: hoa hồng 11.5–18%, phí giao dịch 6%, Voucher Extra Plus 5.5%, SFR 1.620đ. Ví dụ tính phí thực tế theo ngành hàng.",
  body: [
    block("b1", "normal",
      "Từ 09/05/2026, TikTok Shop áp dụng bảng phí mới với mức hoa hồng tăng đáng kể ở nhiều ngành hàng, đặc biệt phân khúc Mall. Bài viết này tổng hợp đầy đủ tất cả các loại phí, ví dụ tính thực tế, và những điều seller cần biết trước khi lên kế hoạch P&L."),
    block("b2", "h2", "Tóm tắt thay đổi phí TikTok Shop từ 09/05/2026"),
    normalWithParts("b3", [
      { text: "Đợt điều chỉnh 05/2026 là mức tăng lớn nhất từ trước đến nay của TikTok Shop tại Việt Nam. Điểm nổi bật:" },
    ]),
    block("b4", "normal",
      "• Phí hoa hồng Non-Mall tăng trung bình 0.5–2% so với bảng cũ, hiện dao động 11.5%–15% tùy ngành."),
    block("b5", "normal",
      "• Phí hoa hồng Mall tăng mạnh hơn, lên đến 13%–18% — ngành Sức khoẻ Làm đẹp Mall chạm 18% (từ 16.5% trước đó)."),
    block("b6", "normal",
      "• Phí giao dịch giữ nguyên 6% tính trên (Giá bán + Phí ship buyer trả - Voucher seller)."),
    block("b7", "normal",
      "• Voucher Extra Plus nâng cap từ 70.000đ lên 80.000đ (5.5% giá trị đơn hàng)."),
    block("b8", "h2", "Bảng phí hoa hồng TikTok Shop 2026 — theo ngành hàng"),
    block("b9", "normal",
      "Phí hoa hồng (commission) là % TikTok Shop thu trên Giá bán của sản phẩm. Dưới đây là các mức phổ biến nhất (xem bảng đầy đủ tại Tool tính phí sàn):"),
    normalWithParts("b10", [
      { text: "Beauty & Sức khoẻ Làm đẹp: " },
      { text: "Non-Mall 14.5% — Mall 18%", bold: true },
      { text: " (cao nhất toàn sàn)" },
    ]),
    normalWithParts("b11", [
      { text: "Fashion / Thời trang: " },
      { text: "Non-Mall 12.5% — Mall 15.5%", bold: true },
    ]),
    normalWithParts("b12", [
      { text: "F&B / Thực phẩm: " },
      { text: "Non-Mall 11.5% — Mall 13%", bold: true },
    ]),
    normalWithParts("b13", [
      { text: "Electronics / Điện tử: " },
      { text: "Non-Mall 11.5% — Mall 13%", bold: true },
    ]),
    normalWithParts("b14", [
      { text: "Home & Living / Đồ gia dụng: " },
      { text: "Non-Mall 12% — Mall 15%", bold: true },
    ]),
    block("b15", "blockquote",
      "Lưu ý: Phí hoa hồng được tính theo ngành cấp 3 (leaf category) của sản phẩm — không phải ngành cấp 1. Đặt sai ngành có thể bị áp nhầm mức phí cao hơn."),
    block("b16", "h2", "Phí giao dịch — 6% tính thế nào?"),
    block("b17", "normal",
      "Phí giao dịch 6% không tính trên Giá bán đơn thuần mà theo công thức:"),
    normalWithParts("b18", [
      { text: "Phí giao dịch = (Giá bán + Phí ship buyer trả − Voucher seller) × 6%", bold: true },
    ]),
    block("b19", "normal",
      "Điều này có nghĩa: nếu buyer trả thêm phí ship 30.000đ, TikTok tính phí 6% trên cả số đó. Ngoài ra có thêm phí xử lý đơn (phí đơn hàng) 3.000đ/đơn cố định — áp dụng cho mọi đơn hàng hoàn thành."),
    block("b20", "h2", "Voucher Extra và Voucher Extra Plus — nên chọn cái nào?"),
    normalWithParts("b21", [
      { text: "Voucher Extra: " },
      { text: "4% giá trị đơn hàng, cap 50.000đ/đơn.", bold: true },
      { text: " Phù hợp shop vừa tập làm quen với campaign voucher." },
    ]),
    normalWithParts("b22", [
      { text: "Voucher Extra Plus: " },
      { text: "5.5% giá trị đơn hàng, cap 80.000đ/đơn.", bold: true },
      { text: " Thêm nhiều loại voucher độc quyền, ưu tiên hiển thị tìm kiếm. Phù hợp shop có volume > 500 đơn/tháng." },
    ]),
    block("b23", "normal",
      "Chỉ được chọn 1 trong 2. Seller thường nhầm rằng Extra Plus 'đắt hơn nhiều' — thực ra chỉ hơn 1.5% nhưng cap cao hơn 30.000đ và có thêm nhiều ưu đãi. Với shop GMV ổn định, Plus gần như luôn tốt hơn."),
    block("b24", "h2", "SFR (Bồi hoàn vận chuyển) — 1.620đ/đơn"),
    block("b25", "normal",
      "SFR là phí TikTok Shop thu để xử lý bồi hoàn vận chuyển cho buyer khi có sự cố (hoàn hàng, giao sai địa chỉ). Mức phí: 1.620đ/đơn hoàn thành. Nếu không đăng ký SFR, seller tự xử lý bồi hoàn — tốn thời gian hơn nhưng không mất phí cố định. Shop có tỷ lệ hoàn hàng < 2% thường bỏ SFR để tiết kiệm."),
    block("b26", "h2", "Ví dụ tính phí thực tế — sản phẩm 300.000đ ngành Fashion"),
    block("b27", "normal", "Giả sử: Giá bán 300.000đ, phí ship buyer trả 30.000đ, không có Voucher seller, không đăng ký Voucher Extra hay SFR. Shop Non-Mall ngành Fashion:"),
    normalWithParts("b28", [
      { text: "• Phí hoa hồng: 300.000 × 12.5% = 37.500đ", bold: true },
    ]),
    normalWithParts("b29", [
      { text: "• Phí giao dịch: (300.000 + 30.000) × 6% = 19.800đ", bold: true },
    ]),
    normalWithParts("b30", [
      { text: "• Phí xử lý đơn: 3.000đ", bold: true },
    ]),
    normalWithParts("b31", [
      { text: "• Tổng phí TikTok thu: 60.300đ (20.1% doanh thu)", bold: true },
    ]),
    block("b32", "normal",
      "Seller nhận về: 300.000 − 60.300 = 239.700đ. Nếu COGS là 150.000đ và ops cost 8%, profit per đơn còn lại: 239.700 − 150.000 − 24.000 = 65.700đ (~21.9% margin). Dùng Tool tính phí sàn để tính nhanh theo ngành hàng cụ thể của bạn."),
    block("b33", "h2", "So sánh nhanh TikTok Shop vs Shopee 2026"),
    block("b34", "normal",
      "Shopee áp bảng phí mới từ 08/05/2026 — gần như cùng thời điểm với TikTok. Phí hoa hồng Shopee Non-Mall thường thấp hơn TikTok Non-Mall 0.5–1% ở hầu hết ngành. Tuy nhiên TikTok có lợi thế về live commerce và content viral — ROAS tự nhiên thường cao hơn nếu vận hành tốt TikTok content."),
    block("b35", "h2", "Lời khuyên thực chiến từ kinh nghiệm 60+ project"),
    block("b36", "normal",
      "1. Luôn build P&L với buffer 1–2% margin cho đợt tăng phí tiếp theo. TikTok và Shopee tăng phí 1–2 lần/năm — đây không phải rủi ro, đây là chi phí vận hành cần dự phòng."),
    block("b37", "normal",
      "2. Kiểm tra ngành cấp 3 của sản phẩm trong Seller Center. Nhiều seller bị áp sai mức phí chỉ vì đặt ngành hàng ở cấp 1 hoặc sai ngành — có thể chênh 1–3% hoa hồng."),
    block("b38", "normal",
      "3. So sánh cụ thể trước khi đăng ký Mall. Phí Mall cao hơn Non-Mall 3–5% nhưng bù lại bằng badge thương hiệu và ưu tiên hiển thị — chỉ nên upgrade khi GMV > 200tr/tháng và gross margin còn > 40%."),
  ],
};

/* ────────────────────────────────────────────────
   BÀI 2: ROAS BAO NHIÊU LÀ ĐỦ
──────────────────────────────────────────────── */
const POST_ROAS_BENCHMARK: any = {
  _id: "blog-roas-bao-nhieu-la-du",
  _type: "post",
  title: "ROAS bao nhiêu là đủ? Benchmark theo ngành hàng TMĐT 2026",
  slug: { _type: "slug", current: "roas-bao-nhieu-la-du" },
  excerpt:
    "Không có con số ROAS chung cho tất cả. Beauty target 8–12x, Fashion 10–15x, F&B 12–18x, Electronics 30–50x. Hiểu công thức break-even ROAS để đặt KPI ads đúng.",
  category: "performance",
  readTime: 8,
  publishedAt: "2026-05-10T10:00:00.000Z",
  featured: true,
  seoTitle: "ROAS bao nhiêu là đủ? Benchmark ngành Beauty, Fashion, F&B, Electronics 2026",
  seoDescription:
    "Break-even ROAS và target ROAS theo ngành hàng TMĐT 2026. Beauty 8–12x, Fashion 10–15x, F&B 12–18x. Công thức tính và 3 cách tăng ROAS không cần tăng ngân sách.",
  body: [
    block("r1", "normal",
      "Một trong những câu hỏi phổ biến nhất của seller khi bắt đầu chạy ads: 'ROAS bao nhiêu là đủ?' Câu trả lời ngắn gọn là: không có con số chung — mỗi ngành hàng, mỗi platform, mỗi cấu trúc chi phí sẽ có break-even ROAS khác nhau. Bài viết này giúp bạn tính được con số đó cho sản phẩm cụ thể của mình."),
    block("r2", "h2", "Tại sao không có con số ROAS chung?"),
    block("r3", "normal",
      "ROAS (Return on Ad Spend) = Doanh thu ÷ Chi phí ads. Con số này chỉ có ý nghĩa khi đặt trong bối cảnh gross margin và cấu trúc chi phí của từng sản phẩm."),
    block("r4", "normal",
      "Ví dụ: ROAS 5x trên sản phẩm Beauty gross margin 65% = lãi tốt. ROAS 5x trên sản phẩm Electronics gross margin 18% = lỗ nặng. Cùng một con số ROAS, kết quả ngược chiều hoàn toàn."),
    block("r5", "h2", "Công thức tính Break-even ROAS"),
    normalWithParts("r6", [
      { text: "Break-even ROAS = 1 ÷ (Gross Margin% − Phí sàn% − Chi phí vận hành%)", bold: true },
    ]),
    block("r7", "normal",
      "Trong đó: Gross Margin = (Giá bán − COGS) ÷ Giá bán. Phí sàn = hoa hồng + giao dịch (TikTok Non-Mall ~18.5%, Mall ~21.5%). Chi phí vận hành = fulfillment + nhân sự + marketing khác (không gồm ads)."),
    normalWithParts("r8", [
      { text: "Target ROAS (để đạt margin X%) = 1 ÷ (Gross Margin% − Phí sàn% − Vận hành% − X%)", bold: true },
    ]),
    block("r9", "blockquote",
      "Dùng ROAS Calculator miễn phí tại nguyenducquang.website/tools/roas-calculator để tính nhanh break-even và target ROAS theo số thực của sản phẩm bạn."),
    block("r10", "h2", "Beauty & Health — Target ROAS 8–12x"),
    block("r11", "normal",
      "Đây là ngành hàng có gross margin cao nhất trên sàn TMĐT Việt Nam, thường 55–70%. Tuy nhiên phí sàn cũng cao nhất — TikTok Mall Beauty lên đến 18% hoa hồng, cộng 6% giao dịch = 24% tổng phí."),
    block("r12", "normal",
      "Với gross margin 60%, phí sàn Non-Mall 18.5%, ops 8%: Break-even ROAS = 1 ÷ (60% − 18.5% − 8%) = 1 ÷ 33.5% ≈ 3x. Nhưng đây chỉ là điểm hoà vốn — không có lãi. Để đạt margin 15%, target ROAS = 1 ÷ 18.5% ≈ 5.4x. Trên thực tế với ads overhead và sai số, seller Beauty nên target 8–12x để có buffer đủ an toàn."),
    block("r13", "normal",
      "Tin tốt cho Beauty: ngành này có lợi thế live commerce TikTok rất lớn — ROAS tự nhiên từ livestream thường cao hơn search ads 2–3x. Nhiều brand Beauty đạt ROAS 10–15x nhờ build được cộng đồng loyalist."),
    block("r14", "h2", "Fashion & Apparel — Target ROAS 10–15x"),
    block("r15", "normal",
      "Fashion có gross margin khá tốt (45–60%) nhưng tỷ lệ hoàn hàng cao (10–25%) làm giảm effective margin đáng kể. Đây là điểm thường bị bỏ sót: seller tính ROAS trên gross revenue nhưng quên tính effective revenue sau trừ hoàn hàng."),
    block("r16", "normal",
      "Với hoàn hàng 15% và gross margin 55%, effective gross margin chỉ còn khoảng 47%. Cộng phí sàn 18.5% + ops 8% → available for ads & profit = 20.5%. Break-even ROAS ≈ 4.9x. Target 15% margin → target ROAS ≈ 12.2x."),
    block("r17", "normal",
      "Chiến lược thực chiến cho Fashion: tập trung tăng CVR (conversion rate) thay vì giảm CPM. Một trang sản phẩm tốt hơn = cùng budget ads nhưng nhiều đơn hơn = ROAS cao hơn mà không tốn thêm tiền."),
    block("r18", "h2", "F&B / FMCG — Target ROAS 12–18x"),
    block("r19", "normal",
      "F&B và FMCG là ngành khó chạy ads TMĐT nhất về mặt margin. Gross margin thường chỉ 35–50% — sản phẩm càng phổ thông, margin càng mỏng. Cộng thêm chi phí bao bì, logistics lạnh (nếu có), phí sàn cao → available for ads rất hẹp."),
    block("r20", "normal",
      "Với F&B gross margin 40%, phí sàn 18.5%, ops 10%: available = 11.5%. Break-even ROAS = 1 ÷ 11.5% ≈ 8.7x. Chỉ để không lỗ. Target 10% margin → target ROAS = 1 ÷ 1.5% ≈ 67x — không thực tế!"),
    block("r21", "normal",
      "Bài học: F&B không thể sống bằng ads paid đơn thuần. Model thành công trong ngành này thường build brand organic trước (TikTok content, influencer) để giảm dependency vào paid ads, hoặc tập trung bundle/upsell để tăng AOV."),
    block("r22", "h2", "Electronics / Điện tử — Target ROAS 30–50x (và tại sao khó)"),
    block("r23", "normal",
      "Electronics là ngành hàng mà paid ads trên TMĐT gần như không viable nếu chỉ tính profit per đơn đầu. Gross margin 15–25%, phí sàn ~18.5% → available for ads = âm số với nhiều SKU. Break-even ROAS = vô hạn trong nhiều trường hợp."),
    block("r24", "normal",
      "Vậy tại sao seller Electronics vẫn chạy ads? Vì họ không tính ROAS theo đơn đơn lẻ mà theo lifetime value: đơn hàng phụ kiện, warranty, service, và repeat purchase. Một máy tính bảng bán hòa vốn có thể mang về 3–5 đơn phụ kiện với margin 40–60% trong 6 tháng tiếp theo."),
    block("r25", "normal",
      "Nếu bạn chỉ bán electronics thuần không có chiến lược LTV, nên xem xét lại toàn bộ unit economics trước khi đổ ngân sách vào paid ads."),
    block("r26", "h2", "3 cách tăng ROAS không cần tăng ngân sách ads"),
    normalWithParts("r27", [
      { text: "1. Tăng giá bán hoặc upsell/bundle: " },
      { text: "tăng gross margin → giảm break-even ROAS. Bundle 2 sản phẩm tăng AOV 50% nhưng cost tăng ít hơn → ROAS tự nhiên tăng.", bold: false },
    ]),
    normalWithParts("r28", [
      { text: "2. Tối ưu CVR landing page: " },
      { text: "cùng số tiền ads nhưng trang sản phẩm tốt hơn = nhiều đơn hơn. Từ CVR 2% lên 3% = ROAS tăng 50% mà không tốn thêm đồng ads nào.", bold: false },
    ]),
    normalWithParts("r29", [
      { text: "3. Tối ưu creative & targeting: " },
      { text: "giảm CPM/CPC bằng cách test nhiều creative angle. Nhiều seller cải thiện ROAS 30–50% chỉ bằng cách thay đổi hook đầu video TikTok.", bold: false },
    ]),
    block("r30", "h2", "ROAS vs MER — Đo cái nào quan trọng hơn?"),
    normalWithParts("r31", [
      { text: "ROAS (per campaign/channel): " },
      { text: "đo hiệu quả của từng đồng ads chi ra trong một kênh cụ thể. Dùng để tối ưu campaign.", bold: false },
    ]),
    normalWithParts("r32", [
      { text: "MER — Marketing Efficiency Ratio (toàn business): " },
      { text: "Tổng doanh thu ÷ Tổng chi marketing (mọi kênh: paid, influencer, photoshoot, samples). Phản ánh sức khoẻ tổng thể.", bold: false },
    ]),
    block("r33", "normal",
      "Câu trả lời thực tế: cần track cả 2. ROAS để tối ưu campaign hàng ngày. MER để đánh giá sustainability của business mỗi tháng. Một business có ROAS paid 8x nhưng MER chỉ 3x có nghĩa chi marketing organic + influencer đang kéo tổng hiệu quả xuống — cần review lại allocation."),
    block("r34", "blockquote",
      "Tính ngay break-even ROAS và target ROAS cho sản phẩm của bạn tại: nguyenducquang.website/tools/roas-calculator — miễn phí, không cần đăng ký."),
  ],
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");

  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized — pass ?secret=<SEED_SECRET>" }, { status: 401 });
  }

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return NextResponse.json({ error: "Missing SANITY_API_WRITE_TOKEN" }, { status: 500 });

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId === "placeholder") {
    return NextResponse.json({ error: "Missing NEXT_PUBLIC_SANITY_PROJECT_ID" }, { status: 500 });
  }

  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });

  const posts = [POST_PHI_TIKTOK, POST_ROAS_BENCHMARK];
  const results: { id: string; status: string }[] = [];

  for (const post of posts) {
    try {
      await client.createIfNotExists(post);
      results.push({ id: post._id, status: "created" });
    } catch (e) {
      results.push({ id: post._id, status: `error: ${e instanceof Error ? e.message : String(e)}` });
    }
  }

  return NextResponse.json({
    success: results.every((r) => !r.status.startsWith("error")),
    results,
    note: "Vào /studio → Blog / Insights để edit, thêm ảnh bìa và publish.",
  });
}
