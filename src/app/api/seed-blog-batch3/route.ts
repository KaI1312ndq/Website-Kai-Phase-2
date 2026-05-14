import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/**
 * Seed batch 3 - 5 bài blog:
 * 1. Break-even ROAS là gì - công thức + ví dụ
 * 2. Tại sao ROAS cao mà vẫn lỗ - 3 lý do
 * 3. Lương Gross bao nhiêu phải đóng thuế TNCN
 * 4. Shopee Non-Mall 2026 - bảng phí đầy đủ
 * 5. TikTok Shop hay Shopee - so sánh chi phí thực tế
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
   POST 1 - Break-even ROAS là gì
══════════════════════════════════════════════════════════ */
const POST_BEVROAS = {
  _id: "blog-break-even-roas-la-gi-cong-thuc-tinh",
  _type: "post",
  title: "Break-even ROAS là gì? Công thức tính và ví dụ thực tế cho seller TMĐT",
  slug: { _type: "slug", current: "break-even-roas-la-gi-cong-thuc-tinh" },
  excerpt: "Break-even ROAS là mức ROAS tối thiểu để không lỗ trên chi phí quảng cáo. Bài này giải thích công thức, sự khác biệt với Target ROAS, và cách tính cho sản phẩm của bạn trên TikTok Shop và Shopee.",
  category: "Performance Marketing",
  tags: ["break even roas", "roas", "ads", "performance marketing", "tiktok shop", "shopee"],
  readTime: 8,
  publishedAt: "2026-05-14T15:00:00.000Z",
  featured: false,
  seoTitle: "Break-even ROAS là gì? Công thức tính + Ví dụ thực tế 2026",
  seoDescription: "Break-even ROAS = 1 / Gross Margin sau phí sàn. Ví dụ: Beauty margin 30% -> break-even ROAS = 3.33. Hướng dẫn tính Target ROAS theo ngành TikTok Shop & Shopee.",
  body: [
    b("a1", "normal", "Bạn chạy ads với ROAS 4.5 nhưng vẫn không thấy tiền về. Hoặc sếp hỏi 'ROAS bao nhiêu là đủ?' mà bạn chưa có câu trả lời chính xác. Break-even ROAS là khái niệm giải quyết cả hai vấn đề này."),
    b("h1", "h2", "Break-even ROAS là gì?"),
    b("b1", "normal", "Break-even ROAS (hay còn gọi là BEROAS) là mức ROAS tối thiểu mà tại đó lợi nhuận từ quảng cáo bằng đúng 0 - tức chi phí ads bằng đúng lãi gộp. Thấp hơn break-even = lỗ trên ads. Cao hơn = lãi."),
    b("b2", "blockquote", "Break-even ROAS = 1 / Gross Margin (% sau phí sàn và COGS, trước khi trừ ads)"),
    b("b3", "normal", "Ví dụ đơn giản: Sản phẩm giá 200.000đ, COGS 80.000đ, phí sàn tổng 50.000đ. Gross margin còn lại = (200k - 80k - 50k) / 200k = 35%. Break-even ROAS = 1 / 0.35 = 2.86."),
    b("b4", "normal", "Điều này có nghĩa: Nếu campaign của bạn đang đạt ROAS 2.86, bạn vừa đủ hòa vốn trên ads - chưa có lãi nhưng cũng không lỗ."),
    b("h2", "h2", "Break-even ROAS vs Target ROAS - Khác nhau thế nào?"),
    p("c1", [{ text: "Break-even ROAS:", bold: true }, { text: " Ngưỡng tối thiểu để không lỗ. Đây là số bạn KHÔNG được thấp hơn." }]),
    p("c2", [{ text: "Target ROAS:", bold: true }, { text: " Mức ROAS bạn cần đạt để có lợi nhuận theo mục tiêu. Luôn cao hơn break-even." }]),
    b("c3", "normal", "Công thức Target ROAS khi muốn đạt margin X%:"),
    b("c4", "blockquote", "Target ROAS = 1 / (Gross Margin - Target Margin%)"),
    b("c5", "normal", "Ví dụ tiếp: Gross margin 35%, muốn lãi 10% sau ads -> Target ROAS = 1 / (0.35 - 0.10) = 1 / 0.25 = 4.0. Muốn lãi 15% -> Target ROAS = 1 / 0.20 = 5.0."),
    b("h3", "h2", "Cách tính Break-even ROAS theo từng bước"),
    p("d1", [{ text: "Bước 1 - Tính Gross Margin:", bold: true }, { text: " Gross Margin = (Giá bán - COGS - Phí sàn tổng - Fulfillment) / Giá bán" }]),
    p("d2", [{ text: "Bước 2 - Tính Break-even:", bold: true }, { text: " BEROAS = 1 / Gross Margin" }]),
    p("d3", [{ text: "Bước 3 - Tính Target:", bold: true }, { text: " Target ROAS = 1 / (Gross Margin - Margin mục tiêu)" }]),
    p("d4", [{ text: "Bước 4 - Monitor:", bold: true }, { text: " So sánh ROAS thực tế của từng campaign/adgroup với BEROAS. Tắt hoặc tối ưu bất kỳ adgroup nào có ROAS thực < BEROAS." }]),
    b("h4", "h2", "Ví dụ tính BEROAS cho 4 ngành hàng phổ biến"),
    b("h4a", "h3", "Beauty - Shopee Non-Mall"),
    b("e1", "normal", "Sản phẩm kem dưỡng 350.000đ. COGS 120.000đ (34%). Phí sàn Non-Mall tổng ~24% (hoa hồng 10% + giao dịch 6% + xử lý đơn 0.86% + Voucher Extra 5.5% + fulfillment 3%) = 84.000đ. Gross margin = (350k - 120k - 84k) / 350k = 41.7%."),
    p("e2", [{ text: "Break-even ROAS = 1 / 0.417 = 2.40", bold: true }]),
    p("e3", [{ text: "Target ROAS đạt 15% margin = 1 / (0.417 - 0.15) = 3.75", bold: true }]),
    b("h4b", "h3", "Fashion - TikTok Non-Mall"),
    b("f1", "normal", "Áo thun 180.000đ. COGS 80.000đ (44%). Phí sàn TikTok Non-Mall tổng ~22% (hoa hồng 12.5% + giao dịch 6% + xử lý đơn 1.67% + Voucher Extra 4%) = 39.600đ. Gross margin = (180k - 80k - 39.6k) / 180k = 33.5%."),
    p("f2", [{ text: "Break-even ROAS = 1 / 0.335 = 2.99", bold: true }]),
    p("f3", [{ text: "Target ROAS đạt 10% margin = 1 / (0.335 - 0.10) = 4.26", bold: true }]),
    b("h4c", "h3", "Supplement - Shopee Mall (sau 29/05)"),
    b("g1", "normal", "Viên uống 500.000đ. COGS 175.000đ (35%). Phí sàn Mall tổng ~30% (hoa hồng 18% + giao dịch 6% + xử lý đơn 0.6% + Voucher Extra 5.5%) = 150.000đ. Gross margin = (500k - 175k - 150k) / 500k = 35%."),
    p("g2", [{ text: "Break-even ROAS = 1 / 0.35 = 2.86", bold: true }]),
    p("g3", [{ text: "Target ROAS đạt 12% margin = 1 / (0.35 - 0.12) = 4.35", bold: true }]),
    b("h5", "h2", "Lưu ý quan trọng khi dùng BEROAS"),
    p("h1a", [{ text: "1. Tính phí sàn đúng:", bold: true }, { text: " Nhiều seller chỉ tính phí hoa hồng, quên phí giao dịch 6% và Voucher Extra. BEROAS tính sai sẽ khiến bạn nghĩ campaign đang lãi trong khi thực tế đang lỗ." }]),
    p("h2a", [{ text: "2. Cập nhật sau mỗi đợt tăng phí:", bold: true }, { text: " Shopee tăng phí 29/05/2026 khiến BEROAS của Beauty Mall tăng từ ~2.5 lên ~3.0+. Campaign cũ đang profitable có thể đang lỗ mà bạn không biết." }]),
    p("h3a", [{ text: "3. Tính riêng cho từng SKU:", bold: true }, { text: " COGS và phí sàn khác nhau theo sản phẩm và ngành. Không dùng một BEROAS cho toàn bộ shop." }]),
    b("i1", "blockquote", "Dùng ROAS Calculator miễn phí tại /tools/roas-calculator để tính break-even và target ROAS cho từng sản phẩm - nhập COGS, chọn phí sàn theo ngành, chọn target margin là ra kết quả."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 2 - Tại sao ROAS cao mà vẫn lỗ
══════════════════════════════════════════════════════════ */
const POST_ROAS_LOI = {
  _id: "blog-roas-cao-van-lo-3-ly-do-pho-bien",
  _type: "post",
  title: "Tại sao ROAS cao mà vẫn lỗ? 3 lý do phổ biến nhất và cách fix",
  slug: { _type: "slug", current: "roas-cao-van-lo-3-ly-do-pho-bien" },
  excerpt: "ROAS 6 trông rất đẹp trên báo cáo, nhưng cuối tháng tài khoản vẫn âm. Đây là vấn đề rất phổ biến. Bài này phân tích 3 nguyên nhân chính khiến ROAS cao nhưng shop vẫn lỗ, và cách fix từng nguyên nhân.",
  category: "Performance Marketing",
  tags: ["roas", "ads", "performance marketing", "p&l", "loi nhuan"],
  readTime: 9,
  publishedAt: "2026-05-14T16:00:00.000Z",
  featured: false,
  seoTitle: "Tại sao ROAS cao mà vẫn lỗ? 3 lý do + Cách fix",
  seoDescription: "ROAS 5-6 nhưng vẫn lỗ? 3 nguyên nhân: (1) ROAS đo trên GMV không phải Net Revenue, (2) quên chi phí ops ngoài ads, (3) phí sàn tăng mà không cập nhật break-even. Cách fix chi tiết.",
  body: [
    b("a1", "normal", "Đây là một trong những câu hỏi phổ biến nhất trong cộng đồng seller ecom: 'ROAS tôi đang 5-6, tại sao cuối tháng vẫn không có tiền?'"),
    b("a2", "normal", "Câu trả lời gần như luôn nằm ở 1 trong 3 nguyên nhân dưới đây. Và tin tốt là cả 3 đều fix được."),
    b("h1", "h2", "Lý do 1 - Bạn đang tính ROAS trên GMV, không phải Net Revenue"),
    b("b1", "normal", "ROAS = Doanh thu / Chi phí ads. Vấn đề là 'doanh thu' ở đây là doanh thu nào?"),
    b("b2", "normal", "Nếu bạn dùng GMV (Gross Merchandise Value) trực tiếp từ báo cáo ads TikTok hoặc Shopee, bạn đang tính trên số chưa trừ voucher seller, chưa trừ hoàn hàng, và chưa trừ phí sàn."),
    p("b3", [{ text: "Ví dụ:", bold: true }, { text: " GMV 100tr, voucher seller 5% (5tr), hoàn hàng 3% (3tr), phí sàn 25% (25tr). Net Revenue thực nhận = 67tr. ROAS tính trên GMV = 100/20 = 5.0. ROAS tính trên Net Revenue = 67/20 = 3.35." }]),
    b("b4", "blockquote", "ROAS 5.0 trên GMV có thể tương đương ROAS 3.35 thực tế. Nếu break-even ROAS thực của bạn là 3.5, bạn đang LỖ dù báo cáo nói ROAS tốt."),
    p("b5", [{ text: "Fix:", bold: true }, { text: " Luôn tính ROAS = Net Revenue / Chi phí ads. Net Revenue = GMV - Voucher seller - Hoàn hàng. Đây là số sàn thực sự chuyển vào tài khoản bạn." }]),
    b("h2", "h2", "Lý do 2 - Chỉ tính ads cost, quên hết chi phí còn lại"),
    b("c1", "normal", "ROAS chỉ đo quan hệ doanh thu và chi phí quảng cáo. Nhưng để bán được 1 đơn, bạn còn trả nhiều thứ khác ngoài ads:"),
    p("c2", [{ text: "COGS (giá vốn):", bold: true }, { text: " 30-60% giá bán tùy ngành." }]),
    p("c3", [{ text: "Phí sàn:", bold: true }, { text: " 20-30%+ tổng các loại phí (hoa hồng + giao dịch + xử lý đơn + voucher extra)." }]),
    p("c4", [{ text: "Fulfillment & đóng gói:", bold: true }, { text: " 3-7% tùy sản phẩm." }]),
    p("c5", [{ text: "Nhân sự, kho bãi, tools:", bold: true }, { text: " Chi phí cố định hàng tháng." }]),
    b("c6", "normal", "ROAS 6 trông đẹp, nhưng nếu COGS 40% + phí sàn 25% + fulfillment 5% = 70% giá bán, thì chỉ còn 30% margin trước ads. Ads chiếm 17% (ROAS 6 ~ 1/6 doanh thu) -> margin sau ads chỉ còn 13%."),
    b("c7", "normal", "Sau đó trừ thêm nhân sự, kho, tools... có thể về 0 hoặc âm dù ROAS 6."),
    p("c8", [{ text: "Fix:", bold: true }, { text: " Tính Contribution Margin 2 = Gross Margin - Ads cost. Target CM2 > 10% để shop bền vững. Dùng mẫu P&L 5 tầng để nhìn toàn bộ cấu trúc chi phí." }]),
    b("h3", "h2", "Lý do 3 - Phí sàn tăng mà chưa cập nhật break-even ROAS"),
    b("d1", "normal", "Shopee tăng phí 2 đợt trong tháng 5/2026. TikTok tăng phí tháng 5/2026. Nếu bạn không cập nhật lại break-even ROAS sau mỗi đợt tăng phí, campaign đang profitable hôm qua có thể đang lỗ hôm nay."),
    b("d2", "normal", "Ví dụ cụ thể: Beauty Shopee Mall trước 29/05, phí hoa hồng 13.5%. Sau 29/05, lên 16.5-20.8%. Nếu trước đây break-even ROAS là 2.8, giờ có thể là 3.4+. Campaign ROAS 3.0 từng profitable, giờ đang lỗ."),
    p("d3", [{ text: "Fix:", bold: true }, { text: " Mỗi khi sàn thông báo thay đổi phí, re-calculate break-even ROAS ngay cho toàn bộ SKU. Tắt hoặc giảm budget những campaign dưới break-even mới." }]),
    b("h4", "h2", "Bonus - Lý do 4 ít nói đến: Attribution window quá rộng"),
    b("e1", "normal", "TikTok Ads mặc định credit conversion trong 7 ngày click + 1 ngày view. Shopee Ads tương tự. Điều này có nghĩa: 1 người xem ads hôm thứ 2, mua hàng tự nhiên hôm thứ 7 cũng được tính vào ROAS của campaign."),
    b("e2", "normal", "Kết quả: ROAS bị inflate vì credit cả những đơn không phải do ads trực tiếp tạo ra. Shop có brand recognition mạnh bị ảnh hưởng nhiều nhất."),
    p("e3", [{ text: "Fix:", bold: true }, { text: " Đặt attribution window ngắn hơn (1-day click), hoặc so sánh ROAS theo MER (Marketing Efficiency Ratio = Tổng doanh thu / Tổng chi phí marketing) để có cái nhìn toàn diện hơn." }]),
    b("h5", "h2", "Checklist - 5 bước kiểm tra khi ROAS cao nhưng vẫn lỗ"),
    p("f1", [{ text: "1.", bold: true }, { text: " Tính lại ROAS trên Net Revenue (sau voucher + hoàn hàng)." }]),
    p("f2", [{ text: "2.", bold: true }, { text: " Tính break-even ROAS với phí sàn mới nhất (cập nhật 05/2026)." }]),
    p("f3", [{ text: "3.", bold: true }, { text: " Build P&L đầy đủ 5 tầng để thấy tiền 'chảy' đi đâu." }]),
    p("f4", [{ text: "4.", bold: true }, { text: " So sánh CM2 (lãi sau ads) với target margin." }]),
    p("f5", [{ text: "5.", bold: true }, { text: " Kiểm tra attribution window - nếu cần thu hẹp lại." }]),
    b("g1", "blockquote", "Dùng ROAS Calculator tại /tools/roas-calculator để tính break-even và target ROAS chính xác, hoặc P&L Ecom tại /tools/pnl-ecom để build báo cáo 5 tầng cho shop."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 3 - Lương bao nhiêu phải đóng thuế TNCN
══════════════════════════════════════════════════════════ */
const POST_THUE_NGUONG = {
  _id: "blog-luong-bao-nhieu-phai-dong-thue-tncn-2026",
  _type: "post",
  title: "Lương bao nhiêu phải đóng thuế TNCN 2026? Ngưỡng chịu thuế theo số người phụ thuộc",
  slug: { _type: "slug", current: "luong-bao-nhieu-phai-dong-thue-tncn-2026" },
  excerpt: "Năm 2026, ngưỡng lương Gross phải đóng thuế TNCN tăng đáng kể do giảm trừ gia cảnh tăng 41%. Người độc thân cần lương > 28.2tr/tháng mới phải đóng. Có 1 con: > 35.1tr. Có 2 con: > 42.1tr.",
  category: "Tài chính cá nhân",
  tags: ["thue tncn", "luong gross", "nguong chiu thue", "tai chinh ca nhan", "2026"],
  readTime: 7,
  publishedAt: "2026-05-14T17:00:00.000Z",
  featured: false,
  seoTitle: "Lương bao nhiêu phải đóng thuế TNCN 2026? Ngưỡng theo số người phụ thuộc",
  seoDescription: "Ngưỡng lương Gross phải đóng thuế TNCN 2026: độc thân > 28.2tr, có 1 con > 35.1tr, có 2 con > 42.1tr. Giải thích công thức tính + bảng tóm tắt chi tiết.",
  body: [
    b("a1", "normal", "Một trong những câu hỏi phổ biến nhất sau khi Nghị quyết 110/2025 có hiệu lực từ 01/01/2026: 'Lương tôi bao nhiêu thì phải đóng thuế TNCN?' Câu trả lời phụ thuộc vào số người phụ thuộc của bạn."),
    b("h1", "h2", "Nguyên tắc tính ngưỡng chịu thuế"),
    b("b1", "normal", "Bạn phải đóng thuế TNCN khi Thu nhập chịu thuế > 0. Mà:"),
    b("b2", "blockquote", "Thu nhập chịu thuế = Gross - BHXH (10.5%) - Giảm trừ bản thân (15.5tr) - Giảm trừ người phụ thuộc (6.2tr x số người)"),
    b("b3", "normal", "Thu nhập chịu thuế > 0 khi Gross - BHXH > 15.5tr + 6.2tr x số người phụ thuộc."),
    b("b4", "normal", "Hay: Gross x (1 - 10.5%) > 15.5tr + 6.2tr x số người. Gross x 89.5% > tổng giảm trừ."),
    b("h2", "h2", "Bảng ngưỡng lương phải đóng thuế TNCN 2026"),
    p("c1", [{ text: "Không người phụ thuộc:", bold: true }, { text: " Ngưỡng Gross tối thiểu = 15.500.000 / 89.5% = 17.318.000đ -> làm tròn thực tế ~17.3tr/tháng" }]),
    b("c2", "normal", "Nhưng chú ý: BHXH được tính theo mức lương đóng BHXH tối thiểu theo quy định. Với lương dưới 1 mức nhất định, BHXH được áp dụng đầy đủ. Thực tế ngưỡng an toàn (gross không phải đóng thuế):"),
    p("c3", [{ text: "Không phụ thuộc: Gross < khoảng 17.3tr/tháng", bold: true }, { text: " -> Không phải đóng thuế" }]),
    p("c4", [{ text: "Có 1 người phụ thuộc: Gross < khoảng 24.2tr/tháng", bold: true }, { text: " -> Không phải đóng thuế" }]),
    p("c5", [{ text: "Có 2 người phụ thuộc: Gross < khoảng 31.1tr/tháng", bold: true }, { text: " -> Không phải đóng thuế" }]),
    p("c6", [{ text: "Có 3 người phụ thuộc: Gross < khoảng 38.0tr/tháng", bold: true }, { text: " -> Không phải đóng thuế" }]),
    b("c7", "blockquote", "So với 2025: Ngưỡng không phụ thuộc tăng từ ~12.3tr lên ~17.3tr - tức nhiều người thu nhập trung bình thấp giờ thoát khỏi vùng chịu thuế hoàn toàn."),
    b("h3", "h2", "Ví dụ tính ngưỡng cụ thể"),
    b("h3a", "h3", "Người độc thân, lương Gross 20tr"),
    b("d1", "normal", "BHXH = 20tr x 10.5% = 2.1tr. Thu nhập sau BHXH = 17.9tr. Giảm trừ bản thân = 15.5tr. Thu nhập chịu thuế = 17.9tr - 15.5tr = 2.4tr > 0 -> Phải đóng thuế, nhưng rất ít: 2.4tr x 5% = 120.000đ/tháng."),
    b("h3b", "h3", "Có 1 người phụ thuộc (vợ/con không đi làm), lương 20tr"),
    b("e1", "normal", "Thu nhập chịu thuế = 17.9tr - 15.5tr - 6.2tr = -3.8tr -> Âm -> KHÔNG phải đóng thuế. Lương Net = 20tr - 2.1tr = 17.9tr."),
    b("h3c", "h3", "Người độc thân, lương Gross 30tr"),
    b("f1", "normal", "BHXH = 3.15tr. TN sau BHXH = 26.85tr. TN chịu thuế = 26.85tr - 15.5tr = 11.35tr. Thuế: 11.35tr x 5% = 567.500đ/tháng. Lương Net = 30tr - 3.15tr - 0.5675tr = 26.28tr."),
    b("h4", "h2", "Người phụ thuộc gồm những ai?"),
    b("g1", "normal", "Theo quy định 2026, người phụ thuộc được giảm trừ 6.2tr/người/tháng gồm:"),
    p("g2", [{ text: "Con dưới 18 tuổi:", bold: true }, { text: " Tự động được tính, chỉ cần đăng ký tại công ty." }]),
    p("g3", [{ text: "Con từ 18-25 tuổi đang học đại học:", bold: true }, { text: " Cần cung cấp giấy xác nhận học sinh/sinh viên." }]),
    p("g4", [{ text: "Vợ/chồng không có thu nhập (hoặc thu nhập < 1tr/tháng):", bold: true }, { text: " Cần giấy xác nhận không đi làm hoặc xác nhận thu nhập thấp." }]),
    p("g5", [{ text: "Cha/mẹ không có thu nhập:", bold: true }, { text: " Kèm giấy xác nhận quan hệ và thu nhập." }]),
    b("g6", "blockquote", "Lưu ý: Mỗi người phụ thuộc chỉ được 1 người khai. Nếu cả vợ và chồng đều đi làm, không thể cùng khai 1 người con - phải phân chia."),
    b("h5", "h2", "Cách đăng ký giảm trừ để giảm thuế hợp pháp"),
    p("h1a", [{ text: "Bước 1:", bold: true }, { text: " Điền mẫu đăng ký người phụ thuộc (Mẫu 02/ĐK-NPT-TNCN) tại phòng kế toán." }]),
    p("h2a", [{ text: "Bước 2:", bold: true }, { text: " Nộp kèm hồ sơ chứng minh (giấy khai sinh, sổ hộ khẩu, giấy xác nhận học tập...)." }]),
    p("h3a", [{ text: "Bước 3:", bold: true }, { text: " Kế toán cập nhật giảm trừ vào bảng lương từ tháng tiếp theo. Nếu nộp muộn, hoàn thuế vào quyết toán cuối năm." }]),
    b("i1", "blockquote", "Dùng Tool tính thuế TNCN 2026 miễn phí tại /tools/tinh-thue-tncn - nhập lương Gross và số người phụ thuộc để thấy ngay mình có phải đóng thuế không và đóng bao nhiêu."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 4 - Shopee Non-Mall 2026 bảng phí
══════════════════════════════════════════════════════════ */
const POST_NONMALL = {
  _id: "blog-phi-shopee-non-mall-2026-bang-day-du",
  _type: "post",
  title: "Phí Shopee Non-Mall 2026 - Bảng đầy đủ từng ngành và so sánh với Mall",
  slug: { _type: "slug", current: "phi-shopee-non-mall-2026-bang-day-du" },
  excerpt: "Shopee Non-Mall 2026 có phí hoa hồng dao động 7-13% tùy ngành hàng, thấp hơn Mall 3-5%. Bài này tổng hợp bảng phí đầy đủ Non-Mall từng ngành, cộng với phí giao dịch, Voucher Xtra mới 5.5%, và Pi Ship 2.700đ.",
  category: "Unit Economics",
  tags: ["shopee non mall", "phi shopee 2026", "phi san", "ecommerce", "seller shopee"],
  readTime: 9,
  publishedAt: "2026-05-14T18:00:00.000Z",
  featured: false,
  seoTitle: "Phí Shopee Non-Mall 2026 từng ngành - Bảng đầy đủ + So sánh Mall",
  seoDescription: "Bảng phí hoa hồng Shopee Non-Mall 2026: Beauty 8-10%, Fashion 8-10%, Sức Khỏe 10-12%, Electronics 5-7%. Cộng phí giao dịch 6%, Voucher Xtra 5.5%, Pi Ship 2.700đ.",
  body: [
    b("a1", "normal", "Shopee Non-Mall là loại tài khoản phổ biến nhất, chiếm hơn 90% seller trên nền tảng. Phí hoa hồng Non-Mall thấp hơn Mall 3-5%, nhưng sau đợt điều chỉnh 08/05/2026, cộng thêm các loại phí opt-in, tổng phí thực tế có thể cao hơn nhiều seller nghĩ."),
    b("h1", "h2", "Cấu trúc phí Shopee Non-Mall 2026"),
    b("b1", "normal", "Một đơn hàng Shopee Non-Mall phải chịu các loại phí sau:"),
    p("b2", [{ text: "1. Phí cố định (bắt buộc):", bold: true }, { text: " Phí hoa hồng theo ngành (7-13%) + Phí giao dịch 6% + Phí cơ sở hạ tầng 3.000đ/đơn." }]),
    p("b3", [{ text: "2. Phí tự chọn (opt-in):", bold: true }, { text: " Voucher Xtra 5.5% (tăng từ 4% ngày 23/05/2026) + Pi Ship 2.700đ/đơn (tăng từ 1.620đ)." }]),
    b("b4", "blockquote", "Nếu đăng ký cả Voucher Xtra và Pi Ship: tổng phí opt-in = 5.5% giá sản phẩm + 2.700đ. Trên sản phẩm 300.000đ: 16.500đ + 2.700đ = 19.200đ thêm vào mỗi đơn."),
    b("h2", "h2", "Bảng phí hoa hồng Shopee Non-Mall 2026 theo ngành"),
    b("h2a", "h3", "Sắc Đẹp & Chăm Sóc Da"),
    p("c1", [{ text: "Phí hoa hồng Non-Mall: 8% - 10%", bold: true }]),
    b("c2", "normal", "Thấp hơn đáng kể so với Mall (13.5-20.8%). Tổng phí Non-Mall với Voucher Xtra: 8-10% + 6% + 0.86% + 5.5% = khoảng 20-22.4%."),
    b("h2b", "h3", "Thời Trang & Quần Áo"),
    p("d1", [{ text: "Phí hoa hồng Non-Mall: 7% - 10%", bold: true }]),
    b("d2", "normal", "Fashion Non-Mall vẫn là ngành phí thấp nhất trên Shopee. Phù hợp seller thời trang indie, local brand chưa đủ điều kiện Mall."),
    b("h2c", "h3", "Sức Khỏe & Thực Phẩm Chức Năng"),
    p("e1", [{ text: "Phí hoa hồng Non-Mall: 10% - 12%", bold: true }]),
    b("e2", "normal", "Health Non-Mall ở mức trung bình. Sau 29/05, Mall Health tăng lên 18-20.8% - chênh lệch Mall/Non-Mall lên đến 8-10%."),
    b("h2d", "h3", "Điện Tử & Phụ Kiện"),
    p("f1", [{ text: "Phí hoa hồng Non-Mall: 5% - 7%", bold: true }]),
    b("f2", "normal", "Electronics Shopee có phí hoa hồng thấp nhất. Tuy nhiên margin ngành này vốn mỏng, nên tổng phí vẫn ăn mạnh vào lợi nhuận."),
    b("h2e", "h3", "Gia Dụng & Nhà Bếp"),
    p("g1", [{ text: "Phí hoa hồng Non-Mall: 8% - 12%", bold: true }]),
    b("g2", "normal", "Gia dụng Shopee dao động nhiều theo danh mục cấp 3. Máy lọc nước, máy xay... thường ở mức cao hơn dụng cụ nhà bếp thông thường."),
    b("h2f", "h3", "Mẹ & Bé"),
    p("h1a", [{ text: "Phí hoa hồng Non-Mall: 8% - 10%", bold: true }]),
    b("h2a", "normal", "Mẹ & Bé là ngành tăng trưởng ổn định trên Shopee. Phí vừa phải, nhưng đặc thù ngành là review quan trọng - nhiều seller cần đầu tư seeding ban đầu."),
    b("h2g", "h3", "Thực Phẩm & Đồ Uống"),
    p("i1", [{ text: "Phí hoa hồng Non-Mall: 7% - 10%", bold: true }]),
    b("i2", "normal", "F&B trên Shopee phí hoa hồng thấp, nhưng cần tính thêm chi phí logistics đặc thù (date ngắn, bảo quản lạnh, hao hụt)."),
    b("h3", "h2", "Ví dụ tính tổng phí thực tế - Non-Mall Beauty"),
    b("j1", "normal", "Sản phẩm: Serum 300.000đ. Voucher seller 5% (15.000đ). Buyer trả ship 25.000đ. Đăng ký Voucher Xtra + Pi Ship."),
    p("j2", [{ text: "Phí hoa hồng (9%):", bold: true }, { text: " (300k - 15k) x 9% = 285k x 9% = 25.650đ" }]),
    p("j3", [{ text: "Phí giao dịch (6%):", bold: true }, { text: " (300k + 25k - 15k) x 6% = 310k x 6% = 18.600đ" }]),
    p("j4", [{ text: "Phí cơ sở hạ tầng:", bold: true }, { text: " 3.000đ" }]),
    p("j5", [{ text: "Voucher Xtra (5.5%):", bold: true }, { text: " 285k x 5.5% = 15.675đ" }]),
    p("j6", [{ text: "Pi Ship:", bold: true }, { text: " 2.700đ" }]),
    p("j7", [{ text: "Tổng phí sàn: 65.625đ (21.9% giá bán)", bold: true }]),
    b("j8", "blockquote", "So với Mall cùng ngành: Mall Beauty có thể tổng phí 30-33%. Non-Mall tiết kiệm ~8-11% giá bán mỗi đơn - đáng kể với volume lớn."),
    b("h4", "h2", "Non-Mall có nên đăng ký Voucher Xtra sau khi tăng 5.5%?"),
    b("k1", "normal", "Câu hỏi này nhiều seller đang hỏi sau đợt tăng 23/05/2026. Đánh giá nhanh:"),
    p("k2", [{ text: "Nên giữ Voucher Xtra khi:", bold: true }, { text: " Conversion rate tăng rõ rệt khi có voucher, volume đơn đủ lớn để bù cost 5.5%, sản phẩm cạnh tranh cao cần voucher để win buy box." }]),
    p("k3", [{ text: "Cân nhắc opt-out khi:", bold: true }, { text: " CR không cải thiện, margin mỏng (< 15% gross), sản phẩm unique không có cạnh tranh trực tiếp." }]),
    b("k4", "normal", "Cách test: Opt-out 2 tuần, so sánh CR và doanh thu với 2 tuần trước. Nếu CR không giảm > 5%, khả năng cao opt-out là quyết định đúng."),
    b("l1", "blockquote", "Dùng Tool tính phí sàn tại /tools/tinh-phi-san để tính chính xác tổng phí Non-Mall cho ngành hàng cụ thể của bạn và so sánh với Mall."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 5 - TikTok Shop hay Shopee - so sánh chi phí
══════════════════════════════════════════════════════════ */
const POST_COMPARE = {
  _id: "blog-tiktok-shop-hay-shopee-so-sanh-chi-phi-2026",
  _type: "post",
  title: "TikTok Shop hay Shopee? So sánh chi phí thực tế 2026 theo từng ngành",
  slug: { _type: "slug", current: "tiktok-shop-hay-shopee-so-sanh-chi-phi-2026" },
  excerpt: "TikTok Shop hay Shopee phí cao hơn? Câu trả lời thay đổi theo ngành hàng và loại shop. Sau đợt tăng phí 05/2026 của Shopee, so sánh tổng phí thực tế đã có những đảo chiều bất ngờ.",
  category: "Unit Economics",
  tags: ["tiktok shop", "shopee", "phi san", "so sanh san", "ecommerce 2026"],
  readTime: 10,
  publishedAt: "2026-05-14T19:00:00.000Z",
  featured: true,
  seoTitle: "TikTok Shop hay Shopee? So sánh phí thực tế 2026 từng ngành",
  seoDescription: "So sánh tổng phí TikTok Shop vs Shopee 2026: Beauty Mall Shopee 30-33% vs TikTok Mall 25-28%. Fashion Non-Mall Shopee 20-23% vs TikTok 21-24%. Đảo chiều sau 29/05.",
  body: [
    b("a1", "normal", "Câu hỏi 'TikTok Shop hay Shopee phí cao hơn?' không có câu trả lời chung. Và sau đợt tăng phí Shopee 29/05/2026, so sánh này đã thay đổi đáng kể - thậm chí đảo chiều ở một số ngành."),
    b("h1", "h2", "Phương pháp so sánh"),
    b("b1", "normal", "Để so sánh công bằng, bài này tính tổng phí sàn thực tế = Phí hoa hồng + Phí giao dịch 6% + Phí xử lý đơn + Voucher Extra (nếu đăng ký)."),
    b("b2", "normal", "Giả định chung: Sản phẩm 300.000đ, voucher seller 5%, buyer trả ship 25.000đ, có đăng ký Voucher Extra/Xtra."),
    b("h2", "h2", "So sánh ngành Beauty"),
    b("h2a", "h3", "Beauty Non-Mall"),
    p("c1", [{ text: "Shopee Non-Mall:", bold: true }, { text: " Hoa hồng ~9% + giao dịch 6% + CSHT + Voucher Xtra 5.5% = tổng ~21.4%" }]),
    p("c2", [{ text: "TikTok Non-Mall:", bold: true }, { text: " Hoa hồng 15% + giao dịch 6% + xử lý đơn + Voucher Extra 4% = tổng ~26%" }]),
    p("c3", [{ text: "Kết luận: Shopee Non-Mall rẻ hơn ~4.6%", bold: true }]),
    b("h2b", "h3", "Beauty Mall"),
    p("d1", [{ text: "Shopee Mall (sau 29/05):", bold: true }, { text: " Hoa hồng ~18-20% + giao dịch 6% + Voucher Xtra 5.5% = tổng ~30-32%" }]),
    p("d2", [{ text: "TikTok Mall:", bold: true }, { text: " Hoa hồng 17.8% + giao dịch 6% + Voucher Extra Plus 5.5% = tổng ~30%" }]),
    p("d3", [{ text: "Kết luận: Gần ngang bằng - đây là đảo chiều lớn. Trước 29/05, TikTok Mall Beauty cao hơn rõ rệt.", bold: true }]),
    b("h3", "h2", "So sánh ngành Fashion"),
    b("h3a", "h3", "Fashion Non-Mall"),
    p("e1", [{ text: "Shopee Non-Mall:", bold: true }, { text: " Hoa hồng ~8% + giao dịch 6% + Voucher Xtra 5.5% = tổng ~20.4%" }]),
    p("e2", [{ text: "TikTok Non-Mall:", bold: true }, { text: " Hoa hồng 12.5% + giao dịch 6% + Voucher Extra 4% = tổng ~23.4%" }]),
    p("e3", [{ text: "Kết luận: Shopee Non-Mall rẻ hơn ~3%", bold: true }]),
    b("h3b", "h3", "Fashion Mall"),
    p("f1", [{ text: "Shopee Mall (sau 29/05):", bold: true }, { text: " Hoa hồng ~16-19% + giao dịch 6% + Voucher Xtra 5.5% = tổng ~28-31%" }]),
    p("f2", [{ text: "TikTok Mall:", bold: true }, { text: " Hoa hồng 15.5% + giao dịch 6% + Voucher Extra Plus 5.5% = tổng ~28%" }]),
    p("f3", [{ text: "Kết luận: Ngang bằng đến Shopee hơi cao hơn 1-3%", bold: true }]),
    b("h4", "h2", "So sánh ngành Health & Supplement"),
    p("g1", [{ text: "Shopee Mall Health (sau 29/05):", bold: true }, { text: " Hoa hồng 18-20.8% + phí khác = tổng 30-33%. Tăng mạnh nhất trong đợt này." }]),
    p("g2", [{ text: "TikTok Mall Health:", bold: true }, { text: " Hoa hồng 16.5% + phí khác = tổng ~28%." }]),
    p("g3", [{ text: "Kết luận: TikTok Mall rẻ hơn Shopee Mall Health 2-5%. Lần đầu tiên TikTok rẻ hơn trong ngành này.", bold: true }]),
    b("h5", "h2", "So sánh ngành Electronics"),
    p("h1a", [{ text: "Shopee Non-Mall Electronics:", bold: true }, { text: " Hoa hồng 5-7% + giao dịch 6% = tổng ~12-14%. Không cần Voucher Xtra." }]),
    p("h2a", [{ text: "TikTok Non-Mall Electronics:", bold: true }, { text: " Hoa hồng 11.5% + giao dịch 6% = tổng ~18.4%." }]),
    p("h3a", [{ text: "Kết luận: Shopee rẻ hơn đáng kể ~4-6% cho Electronics. Shopee vẫn là sàn tốt hơn cho Electronics về chi phí.", bold: true }]),
    b("h6", "h2", "Bảng tổng hợp - Sàn nào rẻ hơn theo ngành 2026"),
    p("i1", [{ text: "Beauty Non-Mall: Shopee rẻ hơn ~4-5%", bold: true }]),
    p("i2", [{ text: "Beauty Mall: Ngang bằng (đảo chiều so với 2025)", bold: true }]),
    p("i3", [{ text: "Fashion Non-Mall: Shopee rẻ hơn ~3%", bold: true }]),
    p("i4", [{ text: "Fashion Mall: Ngang bằng đến Shopee cao hơn nhẹ", bold: true }]),
    p("i5", [{ text: "Health/Supplement Mall: TikTok rẻ hơn 2-5% (lần đầu tiên)", bold: true }]),
    p("i6", [{ text: "Electronics: Shopee rẻ hơn đáng kể 4-6%", bold: true }]),
    p("i7", [{ text: "F&B: Shopee thấp hơn nhẹ", bold: true }]),
    b("h7", "h2", "Vậy nên chọn sàn nào?"),
    b("j1", "normal", "Phí chỉ là một yếu tố. Quyết định sàn cần xem xét thêm:"),
    p("j2", [{ text: "Traffic và phân khúc buyer:", bold: true }, { text: " TikTok mạnh hơn ở discovery (người chưa biết đến bạn), Shopee mạnh hơn ở search intent (người đã có nhu cầu)." }]),
    p("j3", [{ text: "Loại sản phẩm:", bold: true }, { text: " Beauty, Health, Fashion - TikTok live commerce tạo impulse buying rất hiệu quả. Electronics, gia dụng lớn - Shopee search/compare vẫn tốt hơn." }]),
    p("j4", [{ text: "Khả năng tạo content:", bold: true }, { text: " TikTok cần đầu tư content/live liên tục. Shopee phù hợp với seller không có bandwidth làm content." }]),
    b("j5", "blockquote", "Khuyến nghị thực tế: Đừng chọn 1 sàn - hãy có mặt cả 2. Dùng Tool tính phí sàn tại /tools/tinh-phi-san để so sánh 4 phương án (2 sàn x Mall/Non-Mall) cho sản phẩm cụ thể của bạn trước khi quyết định."),
    b("h8", "h2", "Khi nào nên ưu tiên TikTok hơn Shopee?"),
    p("k1", [{ text: "Ưu tiên TikTok khi:", bold: true }]),
    b("k2", "normal", "- Sản phẩm cần demo để mua (skincare, supplement, thiết bị nhỏ). - Brand muốn build awareness nhanh với budget hạn chế. - Team có khả năng làm live hoặc short video. - Health/Supplement ngành: phí TikTok Mall giờ rẻ hơn Shopee Mall."),
    p("k3", [{ text: "Ưu tiên Shopee khi:", bold: true }]),
    b("k4", "normal", "- Electronics, gia dụng lớn, sản phẩm cần compare nhiều. - Brand muốn tập trung SEO sàn hơn content. - Team nhỏ không có bandwidth làm content/live liên tục. - Ngân sách ads thấp - Shopee search ads ROI thường ổn định hơn."),
  ],
};

/* ══════════════════════════════════════════════════════════
   Handler
══════════════════════════════════════════════════════════ */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== (process.env.SEED_SECRET || "kai-seed-2026")) {
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

  const posts = [POST_BEVROAS, POST_ROAS_LOI, POST_THUE_NGUONG, POST_NONMALL, POST_COMPARE];
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

  return NextResponse.json({ seeded: results.filter(r => r.status === "ok").length, results });
}
