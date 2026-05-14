import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/**
 * Seed batch 2 - 5 bài blog traffic cao:
 * 1. ROAS bao nhiêu là đủ - theo ngành
 * 2. Thuế TNCN 2026 thay đổi gì
 * 3. Tính lương Net từ Gross
 * 4. Phí hoa hồng TikTok Shop 2026 từng ngành
 * 5. Cách build P&L gian hàng từ số 0
 * GET /api/seed-blog-batch2?secret=<SEED_SECRET>
 */

function b(key: string, style: "normal" | "h2" | "h3" | "blockquote", text: string, bold?: boolean) {
  return {
    _type: "block", _key: key, style, markDefs: [],
    children: [{ _type: "span", _key: `${key}s`, text, marks: bold ? ["strong"] : [] }],
  };
}

function p(key: string, ps: { text: string; bold?: boolean }[]) {
  return {
    _type: "block", _key: key, style: "normal" as const, markDefs: [],
    children: ps.map((x, i) => ({ _type: "span", _key: `${key}s${i}`, text: x.text, marks: x.bold ? ["strong"] : [] })),
  };
}

/* ══════════════════════════════════════════════════════════
   POST 1 - ROAS bao nhiêu là đủ theo ngành
══════════════════════════════════════════════════════════ */
const POST_ROAS = {
  _id: "blog-roas-bao-nhieu-la-du-theo-nganh-2026",
  _type: "post",
  title: "ROAS bao nhiêu là đủ? Ngưỡng chuẩn theo từng ngành hàng TMĐT 2026",
  slug: { _type: "slug", current: "roas-bao-nhieu-la-du-theo-nganh-2026" },
  excerpt: "ROAS 3 đủ hay phải 8? Câu trả lời phụ thuộc hoàn toàn vào ngành hàng và cấu trúc chi phí của bạn. Bài này tính break-even ROAS cụ thể cho Beauty, Fashion, F&B, Electronics và hướng dẫn cách tự tính cho sản phẩm của bạn.",
  category: "Performance Marketing",
  tags: ["roas", "performance marketing", "break even", "ads", "ecommerce"],
  readTime: 10,
  publishedAt: "2026-05-14T10:00:00.000Z",
  featured: true,
  seoTitle: "ROAS bao nhiêu là đủ? Break-even ROAS theo ngành hàng 2026",
  seoDescription: "ROAS 3 đủ hay phải 8? Tính break-even ROAS chính xác cho Beauty (2.5-4), Fashion (4-7), Electronics (7-12), F&B (3-5). Có công thức tự tính theo margin và phí sàn.",
  body: [
    b("i1", "normal", "ROAS 3 với Beauty là lãi tốt. ROAS 3 với Electronics là đang lỗ nặng. Cùng một con số - hai kết quả hoàn toàn trái ngược. Đó là lý do 'ROAS bao nhiêu là đủ' không có một câu trả lời chung cho tất cả."),
    b("h1", "h2", "ROAS là gì và tại sao không thể so giữa các ngành?"),
    b("i2", "normal", "ROAS (Return on Ad Spend) = Doanh thu / Chi phí quảng cáo. ROAS 5 nghĩa là mỗi 1 đồng bỏ vào ads thu về 5 đồng doanh thu."),
    b("i3", "normal", "Vấn đề là ROAS chỉ đo quan hệ doanh thu - ads, không đo lợi nhuận. Hai shop cùng ROAS 4 nhưng khác nhau về:"),
    p("i4", [{ text: "- COGS:" }, { text: " Beauty 35% vs Electronics 70% giá bán", bold: true }]),
    p("i5", [{ text: "- Phí sàn:" }, { text: " Beauty Mall ~25% vs Electronics ~22% (tổng các loại phí)", bold: true }]),
    p("i6", [{ text: "- Chi phí vận hành:" }, { text: " Beauty đóng gói đơn giản vs Electronics cần test QC kỹ", bold: true }]),
    b("i7", "normal", "Kết quả: Beauty ROAS 4 có thể margin 20%, Electronics ROAS 4 margin -5%. Đó là lý do break-even ROAS mới là số quan trọng cần biết."),

    b("h2", "h2", "Công thức tính Break-even ROAS"),
    b("j1", "normal", "Break-even ROAS là mức ROAS tối thiểu để không lỗ (profit = 0). Công thức:"),
    b("j2", "blockquote", "Break-even ROAS = Giá bán / (Giá bán - COGS - Phí sàn tổng - Chi phí ops)"),
    b("j3", "normal", "Hoặc viết theo %:"),
    b("j4", "blockquote", "Break-even ROAS = 1 / Gross Margin sau phí sàn và ops (tính theo % giá bán)"),
    b("j5", "normal", "Ví dụ: Sản phẩm giá 200.000đ, COGS 80.000đ (40%), phí sàn tổng 50.000đ (25%), ops 20.000đ (10%). Gross margin còn lại: 200k - 80k - 50k - 20k = 50.000đ = 25%."),
    b("j6", "blockquote", "Break-even ROAS = 1 / 0.25 = 4.0 | Muốn margin 10% -> Target ROAS = 1 / (0.25 - 0.10) = 6.7"),

    b("h3", "h2", "Break-even ROAS thực tế từng ngành hàng"),
    b("k1", "h3", "Beauty & Skincare"),
    b("k2", "normal", "Cấu trúc điển hình: COGS 30-40%, phí sàn 23-30% (Mall Beauty Shopee lên 20.8% sau 29/05 + phí giao dịch 6% + ops), chi phí đóng gói và fulfillment 5-8%."),
    p("k3", [{ text: "Break-even ROAS: 2.5 - 4.0" }, { text: " tùy COGS và Mall/Non-Mall", bold: false }]),
    p("k4", [{ text: "Target ROAS 10% margin: 3.5 - 6.0", bold: true }]),
    b("k5", "normal", "Beauty là ngành có margin gross cao nhất khi COGS thấp (OEM/ODM), nhưng phí sàn Beauty Mall vừa tăng lên 20.8% - cần re-check break-even toàn bộ SKU sau đợt 29/05/2026."),

    b("l1", "h3", "Fashion (Thời Trang)"),
    b("l2", "normal", "Cấu trúc điển hình: COGS 40-55%, phí sàn Mall Shopee 19-21% sau 29/05, return rate cao (5-15% tùy danh mục) ăn vào margin."),
    p("l3", [{ text: "Break-even ROAS: 4.0 - 7.0", bold: true }]),
    p("l4", [{ text: "Target ROAS 10% margin: 6.0 - 10.0", bold: false }]),
    b("l5", "normal", "Fashion là ngành ROAS cao nhất vì margin mỏng và return rate ảnh hưởng lớn. ROAS 5 với Fashion chưa chắc đủ - phải trừ tiếp cost of return (~15% đơn có vấn đề)."),

    b("m1", "h3", "F&B / Thực Phẩm"),
    b("m2", "normal", "Cấu trúc: COGS 45-60%, phí sàn thấp hơn (Thực phẩm Shopee 13-15%), logistics phức tạp hơn (date, nhiệt độ), fulfillment cao."),
    p("m3", [{ text: "Break-even ROAS: 3.0 - 5.5", bold: true }]),
    p("m4", [{ text: "Target ROAS 10% margin: 4.5 - 8.0", bold: false }]),
    b("m5", "normal", "F&B có lợi thế phí sàn thấp hơn, nhưng logistics cost và hao hụt hàng hóa thường bị tính sai. Cần cộng cả cost of expired/damaged vào COGS thực tế."),

    b("n1", "h3", "Electronics & Gadgets"),
    b("n2", "normal", "Cấu trúc: COGS 60-80%, phí sàn tương đối thấp (7-12%), nhưng warranty/after-sales cost cao, return rate cao."),
    p("n3", [{ text: "Break-even ROAS: 7.0 - 15.0", bold: true }]),
    p("n4", [{ text: "Target ROAS 10% margin: 10.0 - 25.0", bold: false }]),
    b("n5", "normal", "Electronics là ngành khó chạy ads nhất vì break-even ROAS quá cao. Nhiều shop Electronics chạy ads để tăng nhận diện và review, chứ không kỳ vọng ads có ROAS positive ngay."),

    b("o1", "h3", "Health & Supplement"),
    b("o2", "normal", "Cấu trúc: COGS 25-45% (OEM thấp, import cao), phí sàn sau 29/05 lên 18-20.8% Mall, nhưng repeat purchase rate cao - LTV (lifetime value) tốt."),
    p("o3", [{ text: "Break-even ROAS: 2.8 - 5.0", bold: true }]),
    p("o4", [{ text: "Target ROAS (tính LTV 3 đơn): 1.5 - 2.5", bold: false }]),
    b("o5", "blockquote", "Health là ngành nên tính ROAS theo LTV 3-6 tháng, không theo đơn đầu. ROAS đơn đầu hòa vốn hoặc lỗ nhẹ là chấp nhận được nếu CLV đủ cao."),

    b("h4", "h2", "Bảng tổng hợp - Break-even ROAS theo ngành"),
    p("p1", [{ text: "Beauty Mall Shopee: ", bold: true }, { text: "break-even ~3.5, target 10% margin ~5.5" }]),
    p("p2", [{ text: "Beauty Non-Mall Shopee: ", bold: true }, { text: "break-even ~3.0, target 10% margin ~4.5" }]),
    p("p3", [{ text: "Fashion Mall: ", bold: true }, { text: "break-even ~5.5, target 10% margin ~8.0" }]),
    p("p4", [{ text: "F&B / Thực phẩm: ", bold: true }, { text: "break-even ~4.0, target 10% margin ~6.0" }]),
    p("p5", [{ text: "Electronics: ", bold: true }, { text: "break-even ~8.0+, ads thường không ROAS positive" }]),
    p("p6", [{ text: "Health & Supplement: ", bold: true }, { text: "break-even ~3.5 đơn đầu, target LTV 2.0" }]),

    b("h5", "h2", "Cách tự tính Break-even ROAS cho sản phẩm của bạn"),
    b("q1", "normal", "Bước 1: Tính Gross Margin thực tế = (Giá bán - COGS - Phí sàn tổng - Fulfillment) / Giá bán"),
    b("q2", "normal", "Bước 2: Break-even ROAS = 1 / Gross Margin"),
    b("q3", "normal", "Bước 3: Target ROAS = 1 / (Gross Margin - Target Margin%). Ví dụ muốn 10% margin: 1 / (Gross Margin - 0.10)"),
    b("q4", "normal", "Bước 4: So sánh ROAS thực tế của campaign với Target ROAS. Nếu thực tế < Break-even: tắt hoặc tối ưu ngay."),
    b("q5", "blockquote", "Dùng ROAS Calculator miễn phí tại /tools/roas-calculator để tự tính break-even và target ROAS cho từng SKU - nhập COGS, phí sàn, target margin là ra kết quả ngay."),

    b("h6", "h2", "3 lỗi phổ biến khi đặt ROAS target"),
    p("r1", [{ text: "Lỗi 1 - Copy target ROAS của người khác: ", bold: true }, { text: "ROAS 5 của shop Beauty không áp dụng cho shop Fashion của bạn. Mỗi ngành, mỗi cấu trúc chi phí có break-even riêng." }]),
    p("r2", [{ text: "Lỗi 2 - Không tính phí sàn mới vào break-even: ", bold: true }, { text: "Sau đợt tăng phí 05/2026, break-even ROAS của toàn bộ Beauty Mall tăng thêm 0.3-0.8 điểm. Campaign cũ đang lỗ mà không biết." }]),
    p("r3", [{ text: "Lỗi 3 - Tính ROAS theo GMV thay vì Net Revenue: ", bold: true }, { text: "Nếu có voucher seller 10%, doanh thu thực chỉ là 90% GMV. Break-even ROAS thực tế cao hơn tính toán ban đầu." }]),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 2 - Thuế TNCN 2026 thay đổi gì
══════════════════════════════════════════════════════════ */
const POST_TAX = {
  _id: "blog-thue-tncn-2026-thay-doi-gi-so-voi-2025",
  _type: "post",
  title: "Thuế TNCN 2026 thay đổi gì so với 2025? Ví dụ tính cụ thể từng mức lương",
  slug: { _type: "slug", current: "thue-tncn-2026-thay-doi-gi-so-voi-2025" },
  excerpt: "Từ 01/01/2026, luật thuế TNCN mới (Nghị quyết 110/2025) chính thức có hiệu lực. Số bậc giảm từ 7 xuống 5, giảm trừ gia cảnh tăng mạnh. Bài này so sánh chi tiết và tính ví dụ cụ thể cho lương 15tr, 25tr, 50tr, 100tr.",
  category: "Tài chính cá nhân",
  tags: ["thue tncn", "luong net", "thue thu nhap ca nhan", "2026", "tai chinh"],
  readTime: 9,
  publishedAt: "2026-05-14T11:00:00.000Z",
  featured: true,
  seoTitle: "Thuế TNCN 2026 thay đổi gì so với 2025? Ví dụ tính cụ thể",
  seoDescription: "Từ 01/01/2026, thuế TNCN mới: 5 bậc (bỏ bậc 15% và 25%), giảm trừ bản thân 15.5tr (tăng từ 11tr), người phụ thuộc 6.2tr. Ví dụ tính lương 15tr, 25tr, 50tr, 100tr.",
  body: [
    b("a1", "normal", "Từ ngày 01/01/2026, Nghị quyết số 110/2025/UBTVQH15 chính thức áp dụng. Đây là lần điều chỉnh lớn nhất của luật thuế TNCN trong 10 năm qua - thay đổi cả bậc thuế lẫn mức giảm trừ gia cảnh."),
    b("a2", "normal", "Nếu bạn là người đi làm, freelancer, hoặc chủ doanh nghiệp nhỏ, bài này sẽ giải thích chính xác bạn được lợi bao nhiêu - hoặc phải nộp thêm bao nhiêu - so với năm 2025."),

    b("h1", "h2", "Tóm tắt: 3 thay đổi lớn nhất"),
    p("b1", [{ text: "1. Số bậc thuế giảm từ 7 xuống 5:", bold: true }, { text: " Bỏ 2 bậc 15% và 25%. Người có thu nhập chịu thuế 20-50tr/tháng giờ chỉ đóng 10% thay vì 15-20%." }]),
    p("b2", [{ text: "2. Giảm trừ gia cảnh tăng mạnh:", bold: true }, { text: " Bản thân tăng từ 11tr lên 15.5tr (+41%). Người phụ thuộc tăng từ 4.4tr lên 6.2tr (+41%)." }]),
    p("b3", [{ text: "3. Ngưỡng chịu thuế tăng cao:", bold: true }, { text: " Người độc thân lương gross < ~28tr/tháng (sau BHXH 10.5%) giờ có thể không phải nộp thuế." }]),

    b("h2", "h2", "Bảng bậc thuế 2026 vs 2025"),
    b("c1", "h3", "Bậc thuế 2025 (7 bậc - sắp bãi bỏ)"),
    p("c2", [{ text: "Bậc 1: ", bold: true }, { text: "0 - 5tr -> 5%" }]),
    p("c3", [{ text: "Bậc 2: ", bold: true }, { text: "5 - 10tr -> 10%" }]),
    p("c4", [{ text: "Bậc 3: ", bold: true }, { text: "10 - 18tr -> 15%" }]),
    p("c5", [{ text: "Bậc 4: ", bold: true }, { text: "18 - 32tr -> 20%" }]),
    p("c6", [{ text: "Bậc 5: ", bold: true }, { text: "32 - 52tr -> 25%" }]),
    p("c7", [{ text: "Bậc 6: ", bold: true }, { text: "52 - 80tr -> 30%" }]),
    p("c8", [{ text: "Bậc 7: ", bold: true }, { text: "> 80tr -> 35%" }]),
    b("c9", "h3", "Bậc thuế 2026 (5 bậc - đang áp dụng)"),
    p("d1", [{ text: "Bậc 1: ", bold: true }, { text: "0 - 20tr -> 5%" }]),
    p("d2", [{ text: "Bậc 2: ", bold: true }, { text: "20 - 50tr -> 10%" }]),
    p("d3", [{ text: "Bậc 3: ", bold: true }, { text: "50 - 100tr -> 20%" }]),
    p("d4", [{ text: "Bậc 4: ", bold: true }, { text: "100 - 200tr -> 28%" }]),
    p("d5", [{ text: "Bậc 5: ", bold: true }, { text: "> 200tr -> 35%" }]),
    b("d6", "blockquote", "Điểm đột phá: bậc 15% và 25% bị xóa. Thu nhập chịu thuế từ 10-50tr/tháng giờ chỉ chịu tối đa 10%. Ai có thu nhập trung bình sẽ được lợi nhiều nhất."),

    b("h3", "h2", "Giảm trừ gia cảnh 2026 - chi tiết"),
    p("e1", [{ text: "Giảm trừ bản thân: ", bold: true }, { text: "15.500.000đ/tháng (tăng từ 11.000.000đ/tháng)" }]),
    p("e2", [{ text: "Giảm trừ người phụ thuộc: ", bold: true }, { text: "6.200.000đ/người/tháng (tăng từ 4.400.000đ)" }]),
    p("e3", [{ text: "BHXH vẫn được trừ: ", bold: true }, { text: "10.5% lương gross (tối đa theo mức lương đóng BHXH max của nhà nước)" }]),
    b("e4", "normal", "Ví dụ: Người độc thân, không người phụ thuộc, lương gross 25.000.000đ/tháng:"),
    b("e5", "normal", "BHXH = 25tr x 10.5% = 2.625.000đ. Thu nhập sau BHXH = 22.375.000đ. Giảm trừ bản thân = 15.500.000đ. Thu nhập chịu thuế = 22.375.000 - 15.500.000 = 6.875.000đ. Thuế = 6.875.000 x 5% = 343.750đ/tháng."),
    b("e6", "blockquote", "So với 2025 cùng lương 25tr: thu nhập chịu thuế cao hơn vì giảm trừ thấp hơn (11tr) -> thuế 2025 = 1.543.750đ. Tiết kiệm 2026: ~1.200.000đ/tháng."),

    b("h4", "h2", "Ví dụ tính thuế 4 mức lương - 2025 vs 2026"),
    b("f1", "h3", "Mức lương 15 triệu/tháng - người độc thân"),
    b("f2", "normal", "2025: BHXH 1.575.000đ, TN chịu thuế = 15tr - 1.575tr - 11tr = 2.425tr. Thuế = 2.425tr x 5% = 121.250đ. Lương net = 13.303.750đ."),
    b("f3", "normal", "2026: BHXH 1.575.000đ, TN chịu thuế = 15tr - 1.575tr - 15.5tr = âm -> KHÔNG phải đóng thuế. Lương net = 15tr - 1.575tr = 13.425.000đ."),
    p("f4", [{ text: "Lợi 2026 so với 2025: +121.250đ/tháng", bold: true }]),

    b("g1", "h3", "Mức lương 25 triệu/tháng - người độc thân"),
    b("g2", "normal", "2025: BHXH 2.625.000đ, TN chịu thuế = 25tr - 2.625tr - 11tr = 11.375tr. Thuế = 5tr x 5% + 6.375tr x 10% = 250.000 + 637.500 + 656.250 (phần 10-11.375tr x 15%) = ~1.543.750đ. Lương net = 20.831.250đ."),
    b("g3", "normal", "2026: BHXH 2.625.000đ, TN chịu thuế = 25tr - 2.625tr - 15.5tr = 6.875tr. Thuế = 6.875tr x 5% = 343.750đ. Lương net = 22.031.250đ."),
    p("g4", [{ text: "Lợi 2026 so với 2025: +1.200.000đ/tháng", bold: true }]),

    b("h1a", "h3", "Mức lương 50 triệu/tháng - người độc thân"),
    b("h2a", "normal", "2025: BHXH ~5.250.000đ (giả sử đóng max), TN chịu thuế = 50tr - 5.25tr - 11tr = 33.75tr. Thuế luỹ tiến 7 bậc = ~7.062.500đ. Lương net = ~37.687.500đ."),
    b("h3a", "normal", "2026: TN chịu thuế = 50tr - 5.25tr - 15.5tr = 29.25tr. Thuế luỹ tiến 5 bậc: 20tr x 5% + 9.25tr x 10% = 1.000.000 + 925.000 = 1.925.000đ. Lương net = ~42.825.000đ."),
    p("h4a", [{ text: "Lợi 2026 so với 2025: +5.137.500đ/tháng - gần 62tr/năm", bold: true }]),

    b("i1a", "h3", "Mức lương 100 triệu/tháng - người độc thân"),
    b("i2a", "normal", "2026: TN chịu thuế = 100tr - BHXH tối đa - 15.5tr ~ 80tr. Thuế: 20tr x 5% + 30tr x 10% + 30tr x 20% = 1tr + 3tr + 6tr = 10.000.000đ/tháng. Lương net ~ 85.000.000đ."),
    p("i3a", [{ text: "Tổng tiết kiệm 2026 so với 2025: ~+7.000.000đ/tháng cho mức 100tr", bold: true }]),

    b("h5", "h2", "Ai được lợi nhiều nhất?"),
    p("j1", [{ text: "Người lương 20-80tr/tháng:", bold: true }, { text: " lợi nhất - đây là vùng bị bậc 15% và 25% cũ 'ăn' nhiều nhất, nay bậc 10% thay thế." }]),
    p("j2", [{ text: "Người có 1-2 người phụ thuộc:", bold: true }, { text: " giảm trừ tăng từ 4.4tr lên 6.2tr/người, giảm thêm 1.8tr x 2 = 3.6tr khỏi thu nhập chịu thuế." }]),
    p("j3", [{ text: "Freelancer lương 15-25tr:", bold: true }, { text: " nhiều người trước đây phải đóng thuế, nay dưới ngưỡng chịu thuế." }]),

    b("h6", "h2", "Cách tính nhanh lương Net 2026"),
    b("k1a", "normal", "Bước 1: Trừ BHXH 10.5% khỏi Gross. Bước 2: Trừ giảm trừ bản thân 15.5tr và giảm trừ người phụ thuộc 6.2tr x số người. Bước 3: Áp dụng bậc thuế 5 bậc 2026. Bước 4: Net = Gross - BHXH - Thuế."),
    b("k2a", "blockquote", "Dùng Tool tính thuế TNCN 2026 miễn phí tại /tools/tinh-thue-tncn - nhập lương Gross và số người phụ thuộc, so sánh ngay 2025 vs 2026 trong 3 giây."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 3 - Tính lương Net từ Gross
══════════════════════════════════════════════════════════ */
const POST_NET = {
  _id: "blog-cach-tinh-luong-net-tu-gross-2026",
  _type: "post",
  title: "Cách tính lương Net từ Gross 2026 - Công thức chuẩn + Ví dụ 5 mức lương",
  slug: { _type: "slug", current: "cach-tinh-luong-net-tu-gross-2026" },
  excerpt: "Lương Gross 20tr thực nhận bao nhiêu? Bài này hướng dẫn công thức tính lương Net từ Gross theo luật 2026 - trừ BHXH 10.5%, áp dụng bậc thuế 5 bậc mới, có ví dụ tính cho 5 mức lương phổ biến.",
  category: "Tài chính cá nhân",
  tags: ["luong net", "luong gross", "thue tncn", "tinh luong", "tai chinh ca nhan"],
  readTime: 8,
  publishedAt: "2026-05-14T12:00:00.000Z",
  featured: false,
  seoTitle: "Cách tính lương Net từ Gross 2026 - Công thức + Ví dụ chi tiết",
  seoDescription: "Gross 15tr, 20tr, 30tr, 50tr net bao nhiêu? Công thức: Net = Gross - BHXH 10.5% - Thuế TNCN 2026 (5 bậc, giảm trừ 15.5tr). Ví dụ tính chi tiết kèm tool tính nhanh.",
  body: [
    b("a1n", "normal", "Nhận offer 25.000.000đ gross nhưng thực nhận về tay bao nhiêu? Đây là câu hỏi mà hầu hết người đi làm đều tính sai ít nhất một lần. Bài này sẽ hướng dẫn công thức đúng theo luật 2026."),

    b("h1n", "h2", "Công thức tính lương Net 2026"),
    b("b1n", "blockquote", "Lương Net = Lương Gross - BHXH người lao động - Thuế TNCN"),
    b("b2n", "normal", "Trong đó:"),
    p("b3n", [{ text: "BHXH người lao động = Gross x 10.5%", bold: true }, { text: " (BHXH 8% + BHYT 1.5% + BHTN 1%). Giới hạn mức đóng tối đa theo quy định nhà nước." }]),
    p("b4n", [{ text: "Thuế TNCN 2026 = ", bold: true }, { text: "Tính theo 5 bậc lũy tiến, trên thu nhập chịu thuế sau trừ BHXH và giảm trừ gia cảnh." }]),
    b("b5n", "normal", "Thu nhập chịu thuế = Gross - BHXH - Giảm trừ bản thân (15.5tr) - Giảm trừ người phụ thuộc (6.2tr x số người)"),

    b("h2n", "h2", "Bảng bậc thuế TNCN 2026"),
    p("c1n", [{ text: "Bậc 1 (0 - 20tr): ", bold: true }, { text: "5% - trừ đi 0đ" }]),
    p("c2n", [{ text: "Bậc 2 (20 - 50tr): ", bold: true }, { text: "10% - trừ đi 1.000.000đ" }]),
    p("c3n", [{ text: "Bậc 3 (50 - 100tr): ", bold: true }, { text: "20% - trừ đi 6.000.000đ" }]),
    p("c4n", [{ text: "Bậc 4 (100 - 200tr): ", bold: true }, { text: "28% - trừ đi 14.000.000đ" }]),
    p("c5n", [{ text: "Bậc 5 (> 200tr): ", bold: true }, { text: "35% - trừ đi 28.000.000đ" }]),
    b("c6n", "normal", "(Công thức rút gọn: Thuế = TN chịu thuế x % bậc cao nhất - Số khấu trừ tương ứng)"),

    b("h3n", "h2", "Ví dụ tính 5 mức lương phổ biến"),
    b("h3an", "h3", "Lương Gross 10.000.000đ - không phụ thuộc"),
    b("d1n", "normal", "BHXH = 10tr x 10.5% = 1.050.000đ. TN sau BHXH = 8.950.000đ. Giảm trừ bản thân = 15.500.000đ. TN chịu thuế = 8.950.000 - 15.500.000 = âm. Thuế = 0đ."),
    p("d2n", [{ text: "Lương Net = 10.000.000 - 1.050.000 = 8.950.000đ", bold: true }]),

    b("h3bn", "h3", "Lương Gross 20.000.000đ - không phụ thuộc"),
    b("e1n", "normal", "BHXH = 20tr x 10.5% = 2.100.000đ. TN chịu thuế = 20tr - 2.1tr - 15.5tr = 2.400.000đ. Thuế = 2.4tr x 5% = 120.000đ."),
    p("e2n", [{ text: "Lương Net = 20.000.000 - 2.100.000 - 120.000 = 17.780.000đ", bold: true }]),

    b("h3cn", "h3", "Lương Gross 30.000.000đ - không phụ thuộc"),
    b("f1n", "normal", "BHXH = 30tr x 10.5% = 3.150.000đ. TN chịu thuế = 30tr - 3.15tr - 15.5tr = 11.350.000đ. Thuế = 11.35tr x 5% = 567.500đ."),
    p("f2n", [{ text: "Lương Net = 30.000.000 - 3.150.000 - 567.500 = 26.282.500đ", bold: true }]),

    b("h3dn", "h3", "Lương Gross 50.000.000đ - không phụ thuộc"),
    b("g1n", "normal", "BHXH = 5.250.000đ (giả sử không đến max). TN chịu thuế = 50tr - 5.25tr - 15.5tr = 29.250.000đ. Thuế = 20tr x 5% + 9.25tr x 10% = 1.000.000 + 925.000 = 1.925.000đ."),
    p("g2n", [{ text: "Lương Net = 50.000.000 - 5.250.000 - 1.925.000 = 42.825.000đ", bold: true }]),

    b("h3en", "h3", "Lương Gross 100.000.000đ - không phụ thuộc"),
    b("h1na", "normal", "BHXH ~ 5.250.000đ (tính theo mức max). TN chịu thuế = 100tr - 5.25tr - 15.5tr = 79.250.000đ. Thuế: 20tr x 5% + 30tr x 10% + 29.25tr x 20% = 1tr + 3tr + 5.85tr = 9.850.000đ."),
    p("h2na", [{ text: "Lương Net = 100.000.000 - 5.250.000 - 9.850.000 = 84.900.000đ", bold: true }]),

    b("h4n", "h2", "Người phụ thuộc ảnh hưởng thế nào?"),
    b("i1n", "normal", "Mỗi người phụ thuộc được giảm trừ thêm 6.200.000đ/tháng. Ví dụ lương gross 30tr, có 1 con:"),
    b("i2n", "normal", "TN chịu thuế = 30tr - 3.15tr - 15.5tr - 6.2tr = 5.150.000đ. Thuế = 5.15tr x 5% = 257.500đ. So với không phụ thuộc (567.500đ), tiết kiệm 310.000đ/tháng = 3.720.000đ/năm."),

    b("h5n", "h2", "Bảng tóm tắt nhanh Gross -> Net 2026"),
    p("j1n", [{ text: "10tr Gross -> ~8.95tr Net", bold: true }, { text: " (không phụ thuộc)" }]),
    p("j2n", [{ text: "15tr Gross -> ~13.43tr Net", bold: true }, { text: " (không phụ thuộc - không phải đóng thuế)" }]),
    p("j3n", [{ text: "20tr Gross -> ~17.78tr Net", bold: true }, { text: " (không phụ thuộc)" }]),
    p("j4n", [{ text: "30tr Gross -> ~26.28tr Net", bold: true }, { text: " (không phụ thuộc)" }]),
    p("j5n", [{ text: "50tr Gross -> ~42.83tr Net", bold: true }, { text: " (không phụ thuộc)" }]),
    p("j6n", [{ text: "100tr Gross -> ~84.90tr Net", bold: true }, { text: " (không phụ thuộc)" }]),
    b("j7n", "blockquote", "Dùng Tool tính thuế TNCN 2026 miễn phí tại /tools/tinh-thue-tncn để tính chính xác theo số người phụ thuộc, so sánh 2025 vs 2026."),

    b("h6n", "h2", "3 điều cần lưu ý khi tính lương Net"),
    p("k1n", [{ text: "1. BHXH có mức đóng tối đa:", bold: true }, { text: " Lương gross rất cao không đóng BHXH trên toàn bộ gross - mức tối đa theo quy định nhà nước. Khi lương > mức max BHXH, BHXH giữ nguyên, TN chịu thuế tăng." }]),
    p("k2n", [{ text: "2. Thu nhập phải tính đủ:", bold: true }, { text: " Lương cơ bản + phụ cấp chịu thuế + thưởng đều phải cộng vào gross. Chỉ một số phụ cấp được miễn (ăn ca, đi lại theo quy định)." }]),
    p("k3n", [{ text: "3. Đăng ký giảm trừ người phụ thuộc:", bold: true }, { text: " Phải đăng ký tại công ty mới được trừ. Nếu chưa đăng ký, thuế bị khấu trừ thừa - hoàn thuế cuối năm." }]),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 4 - Phí hoa hồng TikTok Shop 2026 từng ngành
══════════════════════════════════════════════════════════ */
const POST_TIKTOK_FEE = {
  _id: "blog-phi-hoa-hong-tiktok-shop-2026-tung-nganh",
  _type: "post",
  title: "Phí hoa hồng TikTok Shop 2026 từng ngành hàng - Bảng đầy đủ + Ví dụ tính",
  slug: { _type: "slug", current: "phi-hoa-hong-tiktok-shop-2026-tung-nganh" },
  excerpt: "Từ 09/05/2026, TikTok Shop áp dụng bảng phí hoa hồng mới. Phí dao động 11.5% - 17.8% tuỳ ngành và loại shop (Mall/Non-Mall). Bảng đầy đủ từng ngành kèm ví dụ tính tổng phí thực tế.",
  category: "Unit Economics",
  tags: ["tiktok shop", "phi hoa hong", "phi san", "tiktok 2026", "seller"],
  readTime: 9,
  publishedAt: "2026-05-14T13:00:00.000Z",
  featured: true,
  seoTitle: "Phí hoa hồng TikTok Shop 2026 theo ngành hàng - Bảng đầy đủ",
  seoDescription: "Bảng phí hoa hồng TikTok Shop 2026 từ 09/05: Beauty Non-Mall 15%, Mall 17.8%; Fashion Non-Mall 12.5%, Mall 15.5%; Electronics Non-Mall 11.5%, Mall 13%. Tổng phí thực tế kèm ví dụ.",
  body: [
    b("a1t", "normal", "TikTok Shop công bố bảng phí hoa hồng mới hiệu lực từ 09/05/2026 - tăng phổ biến 2-3% so với bảng cũ. Đây là loại phí 'ẩn' mà nhiều seller không tính đủ khi build P&L."),
    b("a2t", "normal", "Bài này tổng hợp đầy đủ phí hoa hồng TikTok Shop 2026 từng ngành, so sánh Mall vs Non-Mall, và hướng dẫn cách tính tổng phí thực tế phải trả mỗi đơn."),

    b("h1t", "h2", "Cấu trúc phí TikTok Shop 2026"),
    b("b1t", "normal", "TikTok Shop có 4 loại phí chính cộng dồn vào mỗi đơn hàng:"),
    p("b2t", [{ text: "1. Phí hoa hồng nền tảng:", bold: true }, { text: " Dao động 11.5% - 17.8% tuỳ ngành và Mall/Non-Mall. Tính trên giá bán sau voucher seller." }]),
    p("b3t", [{ text: "2. Phí giao dịch:", bold: true }, { text: " 6% tính trên (Giá bán + Phí ship buyer trả - Voucher seller)." }]),
    p("b4t", [{ text: "3. Phí xử lý đơn:", bold: true }, { text: " 3.000đ/đơn cố định." }]),
    p("b5t", [{ text: "4. Phí tự chọn:", bold: true }, { text: " SFR 1.620đ/đơn (bồi hoàn vận chuyển) + Voucher Extra 4% / Extra Plus 5.5%." }]),
    b("b6t", "blockquote", "Phí hoa hồng là phí biến động lớn nhất - dao động 6.3 điểm % giữa ngành thấp nhất và cao nhất. Biết ngành hàng mình bán là bước đầu tiên để tính đúng."),

    b("h2t", "h2", "Bảng phí hoa hồng TikTok Shop 2026 từng ngành"),
    b("h2at", "h3", "Sắc đẹp & Chăm sóc cá nhân"),
    p("c1t", [{ text: "Non-Mall: 15% | Mall: 17.8%", bold: true }]),
    b("c2t", "normal", "Ngành cao nhất TikTok. Beauty Mall 17.8% + giao dịch 6% + xử lý đơn = tổng ~24-25% trước khi tính voucher và SFR."),

    b("h2bt", "h3", "Thời trang & Quần áo"),
    p("d1t", [{ text: "Non-Mall: 12.5% | Mall: 15.5%", bold: true }]),
    b("d2t", "normal", "Fashion là ngành TikTok có thế mạnh live commerce. Non-Mall 12.5% hợp lý cho seller vừa và nhỏ."),

    b("h2ct", "h3", "Điện tử & Phụ kiện"),
    p("e1t", [{ text: "Non-Mall: 11.5% | Mall: 13%", bold: true }]),
    b("e2t", "normal", "Electronics thấp nhất TikTok. Tuy nhiên Electronics cũng khó scale live commerce - phù hợp hơn với flash sale và content review."),

    b("h2dt", "h3", "Sức khoẻ & Thực phẩm chức năng"),
    p("f1t", [{ text: "Non-Mall: 14% | Mall: 16.5%", bold: true }]),
    b("f2t", "normal", "Health là ngành tăng trưởng nhanh nhất TikTok 2025-2026. Mall 16.5% - tương đương Beauty, cần COGS tốt để đảm bảo margin."),

    b("h2et", "h3", "Mẹ & Bé"),
    p("g1t", [{ text: "Non-Mall: 12.5% | Mall: 15%", bold: true }]),
    b("g2t", "normal", "Mẹ & Bé TikTok đang tăng mạnh nhờ content parenting. Phí ở mức trung bình, margin tốt nếu COGS được kiểm soát."),

    b("h2ft", "h3", "Gia dụng & Nhà bếp"),
    p("h1ta", [{ text: "Non-Mall: 12% | Mall: 14.5%", bold: true }]),
    b("h2ta", "normal", "Gia dụng TikTok bán tốt qua demo video. Phí vừa phải, nhưng cần tính thêm chi phí đóng gói (hàng fragile) vào COGS."),

    b("h2gt", "h3", "Thể thao & Thể dục"),
    p("i1t", [{ text: "Non-Mall: 12% | Mall: 14.5%", bold: true }]),

    b("h2ht", "h3", "Thú cưng"),
    p("j1t", [{ text: "Non-Mall: 13% | Mall: 15.5%", bold: true }]),

    b("h3t", "h2", "Ví dụ tính tổng phí thực tế TikTok Mall - Beauty"),
    b("k1t", "normal", "Sản phẩm: Serum 300.000đ. Voucher seller 5%. Buyer trả ship 25.000đ. Không đăng ký SFR, không Voucher Extra."),
    p("k2t", [{ text: "Phí hoa hồng:", bold: true }, { text: " (300k - 15k) x 17.8% = 285.000 x 17.8% = 50.730đ" }]),
    p("k3t", [{ text: "Phí giao dịch:", bold: true }, { text: " (300k + 25k - 15k) x 6% = 310.000 x 6% = 18.600đ" }]),
    p("k4t", [{ text: "Phí xử lý đơn:", bold: true }, { text: " 3.000đ" }]),
    p("k5t", [{ text: "Tổng phí sàn: 72.330đ (24.1% giá bán)", bold: true }]),
    b("k6t", "normal", "Nếu thêm Voucher Extra Plus 5.5%: 285k x 5.5% = 15.675đ -> tổng phí sàn = 88.005đ (29.3%)."),

    b("h4t", "h2", "So sánh TikTok vs Shopee - cùng ngành Beauty"),
    p("l1t", [{ text: "TikTok Mall Beauty: ", bold: true }, { text: "17.8% hoa hồng" }]),
    p("l2t", [{ text: "Shopee Mall Beauty (sau 29/05/2026): ", bold: true }, { text: "19.1-20.8% hoa hồng" }]),
    b("l3t", "normal", "Shopee Mall Beauty giờ cao hơn TikTok Mall Beauty 1.3-3%. Đây là đảo chiều so với 2025 - trước đây TikTok thường cao hơn. Seller Beauty nên re-calculate P&L cho cả 2 sàn."),
    b("l4t", "blockquote", "Dùng Tool tính phí sàn tại /tools/tinh-phi-san để so sánh đồng thời 4 phương án (TikTok/Shopee x Mall/Non-Mall) - nhập tên ngành là ra phí chính xác ngay."),

    b("h5t", "h2", "Khi nào nên chọn TikTok Mall?"),
    p("m1t", [{ text: "Nên chọn TikTok Mall khi:", bold: true }]),
    b("m2t", "normal", "- Brand đã có nhận diện và muốn badge 'Chính hãng'. - Volume live commerce ổn định (> 50 đơn/buổi live). - Ngành hàng phù hợp live demo (Beauty, Health, Fashion). - Margin gross đủ chịu phí cao hơn Non-Mall 2-3%."),
    p("m3t", [{ text: "Nên ở Non-Mall khi:", bold: true }]),
    b("m4t", "normal", "- Mới start hoặc đang test sản phẩm. - Volume chưa đủ để ROI từ badge Mall. - Giá bán thấp (< 200k), margin mỏng không chịu được phí chênh lệch."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 5 - Build P&L gian hàng từ số 0
══════════════════════════════════════════════════════════ */
const POST_PNL = {
  _id: "blog-cach-build-pl-gian-hang-tmdt-tu-so-0",
  _type: "post",
  title: "Cách build P&L gian hàng TMĐT từ số 0 - Template 5 tầng chuẩn",
  slug: { _type: "slug", current: "cach-build-pl-gian-hang-tmdt-tu-so-0" },
  excerpt: "P&L (Profit & Loss) là bản đồ tài chính của gian hàng. Bài này hướng dẫn xây dựng P&L 5 tầng chuẩn cho shop TikTok/Shopee - từ Net Revenue xuống EBITDA, kèm ví dụ số liệu thực tế.",
  category: "Unit Economics",
  tags: ["p&l", "gian hang tmdt", "unit economics", "ecommerce", "loi nhuan"],
  readTime: 12,
  publishedAt: "2026-05-14T14:00:00.000Z",
  featured: false,
  seoTitle: "Cách build P&L gian hàng TMĐT 2026 - Template 5 tầng chuẩn",
  seoDescription: "Hướng dẫn xây dựng P&L gian hàng TikTok Shop/Shopee từ số 0: 5 tầng Net Revenue -> Gross Profit -> Contribution Margin 1 & 2 -> EBITDA. Template + ví dụ số liệu thực tế.",
  body: [
    b("a1pl", "normal", "Nhiều seller Shopee/TikTok biết mình 'có lời' nhưng không biết lời bao nhiêu, lời từ đâu, và đang mất tiền ở tầng nào. P&L gian hàng giải quyết đúng vấn đề này."),
    b("a2pl", "normal", "Bài này hướng dẫn cách xây P&L theo chuẩn 5 tầng - từ đơn giản đến chi tiết, phù hợp cả shop mới lẫn shop đang scale."),

    b("h1pl", "h2", "Tại sao cần P&L? Không phải chỉ nhìn ngân hàng?"),
    p("b1pl", [{ text: "Vấn đề 1 - Nhầm doanh thu với lợi nhuận:", bold: true }, { text: " Tháng GMV 500tr nghe có vẻ ổn, nhưng sau khi trừ phí sàn, COGS, ads, ops - còn lại bao nhiêu?" }]),
    p("b2pl", [{ text: "Vấn đề 2 - Không biết điểm hòa vốn:", bold: true }, { text: " Cần bán tối thiểu bao nhiêu đơn để không lỗ tháng này?" }]),
    p("b3pl", [{ text: "Vấn đề 3 - Scale mù:", bold: true }, { text: " Tăng ads 50% thì lợi nhuận tăng hay giảm? Không có P&L không thể trả lời." }]),
    b("b4pl", "blockquote", "P&L không phải báo cáo kế toán phức tạp. Đối với gian hàng TMĐT, P&L là bảng theo dõi 5 tầng chi phí để biết tiền đang 'chảy' đi đâu mỗi tháng."),

    b("h2pl", "h2", "Cấu trúc P&L 5 tầng cho gian hàng TMĐT"),
    b("h2apl", "h3", "Tầng 1: Net Revenue (Doanh thu thực)"),
    b("c1pl", "normal", "Net Revenue = GMV - Voucher seller - Hàng hoàn trả"),
    b("c2pl", "normal", "Đây là số tiền sàn thực sự chuyển cho bạn trước khi trừ phí. Nhiều seller nhầm GMV với Net Revenue - khác nhau 5-15% tùy mức voucher."),
    p("c3pl", [{ text: "Ví dụ:", bold: true }, { text: " GMV 300.000.000đ, voucher seller 5% (15tr), hoàn hàng 2% (6tr) -> Net Revenue = 279.000.000đ" }]),

    b("h2bpl", "h3", "Tầng 2: Gross Profit (Lãi gộp)"),
    b("d1pl", "normal", "Gross Profit = Net Revenue - COGS - Phí sàn (hoa hồng + giao dịch + xử lý đơn)"),
    b("d2pl", "normal", "Gross Margin % = Gross Profit / Net Revenue x 100%"),
    b("d3pl", "normal", "Đây là tầng quan trọng nhất để đánh giá sức khoẻ sản phẩm. Gross Margin < 20% là tín hiệu nguy hiểm cho hầu hết ngành."),
    p("d4pl", [{ text: "Ví dụ tiếp:", bold: true }, { text: " COGS 120tr, phí sàn tổng 70tr (gồm hoa hồng 16% + giao dịch 6% + xử lý đơn). Gross Profit = 279tr - 120tr - 70tr = 89tr. Gross Margin = 89/279 = 31.9%" }]),

    b("h2cpl", "h3", "Tầng 3: Contribution Margin 1 (CM1)"),
    b("e1pl", "normal", "CM1 = Gross Profit - Chi phí biến đổi trực tiếp (Voucher Extra, Pi Ship/SFR, đóng gói, fulfillment)"),
    b("e2pl", "normal", "CM1 đo lợi nhuận sau khi trừ HẾT chi phí liên quan trực tiếp đến từng đơn hàng. Nếu CM1 âm, tức là bán mỗi đơn là lỗ mỗi đơn - không thể scale được."),
    p("e3pl", [{ text: "Ví dụ tiếp:", bold: true }, { text: " Voucher Extra 5.5% x 279tr = 15.3tr, fulfillment 4% x 279tr = 11.2tr. CM1 = 89tr - 15.3tr - 11.2tr = 62.5tr. CM1% = 22.4%" }]),

    b("h2dpl", "h3", "Tầng 4: Contribution Margin 2 (CM2)"),
    b("f1pl", "normal", "CM2 = CM1 - Chi phí quảng cáo (Ads TikTok/Shopee/Meta) - Chi phí marketing khác"),
    b("f2pl", "normal", "CM2 là tầng quyết định bạn có thể scale ads không. CM2 > 15% là vùng an toàn để tăng budget. CM2 < 5% rất rủi ro."),
    p("f3pl", [{ text: "Ví dụ tiếp:", bold: true }, { text: " Ads tháng 40tr (tương đương 14.3% Net Revenue). CM2 = 62.5tr - 40tr = 22.5tr. CM2% = 8.1% - vùng cần tối ưu." }]),

    b("h2epl", "h3", "Tầng 5: EBITDA"),
    b("g1pl", "normal", "EBITDA = CM2 - Chi phí cố định (nhân sự, thuê kho, phần mềm, điện nước, hành chính)"),
    b("g2pl", "normal", "EBITDA là lợi nhuận vận hành thực sự của gian hàng. Đây là số cuối cùng cho biết business có bền vững không."),
    p("g3pl", [{ text: "Ví dụ tiếp:", bold: true }, { text: " Chi phí cố định: nhân sự 10tr, kho 3tr, tools 2tr = 15tr. EBITDA = 22.5tr - 15tr = 7.5tr. EBITDA% = 2.7% - vùng nguy hiểm." }]),

    b("h3pl", "h2", "Ví dụ P&L đầy đủ - shop Beauty Shopee Mall"),
    p("h1pla", [{ text: "GMV: 300.000.000đ", bold: true }]),
    p("h2pla", [{ text: "Net Revenue: 279.000.000đ", bold: true }, { text: " (sau voucher 5% + hoàn hàng 2%)" }]),
    p("h3pla", [{ text: "Gross Profit: 89.000.000đ | 31.9%", bold: true }, { text: " (sau COGS 120tr + phí sàn 70tr)" }]),
    p("h4pla", [{ text: "CM1: 62.500.000đ | 22.4%", bold: true }, { text: " (sau Voucher Extra + fulfillment)" }]),
    p("h5pla", [{ text: "CM2: 22.500.000đ | 8.1%", bold: true }, { text: " (sau ads 40tr)" }]),
    p("h6pla", [{ text: "EBITDA: 7.500.000đ | 2.7%", bold: true }, { text: " (sau ops cố định 15tr)" }]),
    b("h7pla", "blockquote", "EBITDA 2.7% là tín hiệu cần tái cấu trúc. Vấn đề ở đây không phải phí sàn quá cao, mà là ads spend 14.3% Net Revenue đang 'ăn' hết CM1. Cần tăng ROAS ads hoặc giảm ads% trước khi nghĩ đến scale."),

    b("h4pl", "h2", "Cách xây P&L từ số 0 trong 1 giờ"),
    p("i1pl", [{ text: "Bước 1:", bold: true }, { text: " Lấy báo cáo Seller Center 30 ngày gần nhất - download GMV, đơn hàng, hoàn hàng, phí sàn." }]),
    p("i2pl", [{ text: "Bước 2:", bold: true }, { text: " Tính COGS thực từ kho - số lượng xuất x giá nhập. Đừng dùng giá nhập cũ nếu đã tái nhập với giá mới." }]),
    p("i3pl", [{ text: "Bước 3:", bold: true }, { text: " Cộng hết chi phí marketing (ads + KOL + seeding)." }]),
    p("i4pl", [{ text: "Bước 4:", bold: true }, { text: " Tổng hợp ops cố định (lương, kho, tools)." }]),
    p("i5pl", [{ text: "Bước 5:", bold: true }, { text: " Dùng template P&L để điền vào - hoặc dùng Tool P&L Ecom tại /tools/pnl-ecom để tính và xuất báo cáo." }]),
    b("i6pl", "blockquote", "Dùng Mẫu P&L Ecom miễn phí tại /tools/pnl-ecom - nhập số liệu vào 5 tầng, tool tính tự động Gross Margin, CM1, CM2, EBITDA và highlight vùng cần tối ưu."),

    b("h5pl", "h2", "Benchmark P&L theo ngành - bạn đang ở đâu?"),
    p("j1pl", [{ text: "Beauty/Skincare khoẻ mạnh:", bold: true }, { text: " Gross Margin > 35%, CM2 > 15%, EBITDA > 8%" }]),
    p("j2pl", [{ text: "Fashion khoẻ mạnh:", bold: true }, { text: " Gross Margin > 25%, CM2 > 12%, EBITDA > 5%" }]),
    p("j3pl", [{ text: "F&B khoẻ mạnh:", bold: true }, { text: " Gross Margin > 20%, CM2 > 10%, EBITDA > 5%" }]),
    p("j4pl", [{ text: "Electronics khoẻ mạnh:", bold: true }, { text: " Gross Margin > 15%, CM2 > 8%, EBITDA > 3%" }]),
    b("j5pl", "normal", "Nếu bất kỳ tầng nào thấp hơn benchmark, đó là nơi cần tối ưu trước. P&L giúp bạn biết chính xác tầng nào đang 'thủng'."),
  ],
};

/* ══════════════════════════════════════════════════════════
   Handler
══════════════════════════════════════════════════════════ */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.SEED_SECRET || "kai-seed-2026";
  if (secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return NextResponse.json({ error: "Missing SANITY_API_WRITE_TOKEN" }, { status: 500 });

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    token,
    apiVersion: "2024-01-01",
    useCdn: false,
  });

  const posts = [POST_ROAS, POST_TAX, POST_NET, POST_TIKTOK_FEE, POST_PNL];

  const results = await Promise.all(
    posts.map(async (post) => {
      try {
        const doc = await client.createIfNotExists(post as any);
        return { id: post._id, status: "ok", _rev: doc._rev };
      } catch (err: any) {
        return { id: post._id, status: "error", error: err?.message };
      }
    })
  );

  return NextResponse.json({ seeded: results.filter((r) => r.status === "ok").length, results });
}
