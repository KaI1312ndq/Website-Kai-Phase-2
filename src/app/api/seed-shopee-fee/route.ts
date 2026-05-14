import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/**
 * Seed 5 bài blog về Shopee tăng phí 05/2026.
 * GET /api/seed-shopee-fee?secret=<SEED_SECRET>
 */

function block(key: string, style: "normal" | "h2" | "h3" | "blockquote", text: string, bold?: boolean) {
  return {
    _type: "block", _key: key, style, markDefs: [],
    children: [{ _type: "span", _key: `${key}s`, text, marks: bold ? ["strong"] : [] }],
  };
}

function parts(key: string, ps: { text: string; bold?: boolean }[]) {
  return {
    _type: "block", _key: key, style: "normal" as const, markDefs: [],
    children: ps.map((p, i) => ({ _type: "span", _key: `${key}s${i}`, text: p.text, marks: p.bold ? ["strong"] : [] })),
  };
}

/* ── POST 1: Tổng hợp tăng phí ── */
const POST_1 = {
  _id: "blog-shopee-tang-phi-thang-5-2026",
  _type: "post",
  title: "Shopee tăng phí tháng 5/2026 - Tổng hợp đầy đủ thay đổi seller cần biết",
  slug: { _type: "slug", current: "shopee-tang-phi-thang-5-2026" },
  excerpt: "Shopee công bố 2 đợt tăng phí trong tháng 5/2026: ngày 23/05 tăng Voucher Xtra và Pi Ship, ngày 29/05 tăng phí cố định Mall theo từng ngành. Tổng hợp đầy đủ mọi thay đổi.",
  category: "Unit Economics",
  tags: ["shopee", "phi san", "ecommerce", "seller"],
  readTime: 8,
  publishedAt: "2026-05-14T08:00:00.000Z",
  featured: false,
  seoTitle: "Shopee tăng phí tháng 5/2026 - Tổng hợp đầy đủ thay đổi",
  seoDescription: "Shopee tăng phí 2 đợt trong tháng 5/2026: Voucher Xtra lên 5.5%, Pi Ship lên 2.700đ (23/05), phí hoa hồng Mall tăng 1-3% theo ngành (29/05). Chi tiết đầy đủ.",
  body: [
    block("p1", "normal", "Tháng 5/2026 là tháng seller Shopee cần xem lại toàn bộ P&L. Shopee công bố 2 đợt điều chỉnh phí liên tiếp - tổng cộng tác động đến gần như mọi loại phí mà seller phải trả mỗi đơn hàng."),
    block("p2", "h2", "Đợt 1 - Hiệu lực từ 23/05/2026"),
    block("p3", "normal", "Shopee điều chỉnh 2 khoản phí đăng ký (opt-in) từ ngày 23/05:"),
    parts("p4", [{ text: "Phí Voucher Xtra: " }, { text: "tăng từ 4% lên 5.5% giá trị sản phẩm (cap 50.000đ/sản phẩm)", bold: true }, { text: " - mức tăng 37.5% so với trước." }]),
    parts("p5", [{ text: "Phí Pi Ship: " }, { text: "tăng từ 1.620đ lên 2.700đ/đơn", bold: true }, { text: " - mức tăng 67%, tức thêm 1.080đ mỗi đơn." }]),
    block("p6", "blockquote", "Voucher Xtra và Pi Ship là phí đăng ký tự nguyện. Nếu không tham gia 2 chương trình này, bạn không bị ảnh hưởng bởi đợt 23/05. Nhưng nếu đang dùng, P&L sẽ bị tác động ngay."),
    block("p7", "h2", "Đợt 2 - Hiệu lực từ 29/05/2026: Phí cố định Mall"),
    block("p8", "normal", "Shopee điều chỉnh phí hoa hồng (phí cố định) cho Shopee Mall theo từng ngành hàng. Mức tăng phổ biến từ 1% đến 3%, một số ngành giảm nhẹ:"),
    parts("p9", [{ text: "Tăng mạnh (+3%): " }, { text: "Sắc Đẹp (lên 16.5-20.8%), Sức Khỏe (lên 18-20.8%), Sở thích & Sưu tầm (lên 16.5-18.7%), Nhà cửa còn lại (lên 14.5-19.1%)", bold: true }]),
    parts("p10", [{ text: "Tăng vừa (+2%): " }, { text: "Thiết Bị Âm Thanh (lên 14.6-16.7%), Voucher & Dịch vụ (lên 14.6%), Văn Phòng Phẩm (lên 15.5-18.7%), Sách (+2%)", bold: true }]),
    parts("p11", [{ text: "Tăng nhẹ (+1%): " }, { text: "Chăm Sóc Thú Cưng (lên 16.7-17.1%), Gaming & Console (lên 10.5-16.7%)", bold: true }]),
    parts("p12", [{ text: "Thời trang: " }, { text: "tăng không đều (+1% đến +3%) từ mức cũ 15-16.1% lên mức mới 16-19.1%", bold: true }]),
    parts("p13", [{ text: "Giảm: " }, { text: "Bảng Vẽ Điện Tử (-4%, từ 12.6% xuống 8.6%), một số danh mục Mẹ & Bé và Nhà cửa cụ thể (-1%)", bold: true }]),
    parts("p14", [{ text: "Giữ nguyên: " }, { text: "Laptop, Điện thoại, Tivi, Thiết bị gia dụng, Mô tô xe máy, Chất tẩy rửa", bold: true }]),
    block("p15", "h2", "Tác động tổng hợp - ví dụ thực tế"),
    block("p16", "normal", "Giả sử seller Beauty Mall, sản phẩm giá 300.000đ, có đăng ký Voucher Xtra và Pi Ship:"),
    parts("p17", [{ text: "Phí hoa hồng: " }, { text: "300.000 × 16.5% = 49.500đ (cũ: 300.000 × 13.5% = 40.500đ → tăng 9.000đ)", bold: true }]),
    parts("p18", [{ text: "Voucher Xtra: " }, { text: "300.000 × 5.5% = 16.500đ (cũ: 300.000 × 4% = 12.000đ → tăng 4.500đ)", bold: true }]),
    parts("p19", [{ text: "Pi Ship: " }, { text: "2.700đ (cũ: 1.620đ → tăng 1.080đ)", bold: true }]),
    parts("p20", [{ text: "Tổng tăng thêm: ", bold: true }, { text: "~14.580đ/đơn - tức margin giảm ~4.9% nếu không điều chỉnh giá." }]),
    block("p21", "h2", "Seller cần làm gì ngay?"),
    block("p22", "normal", "1. Tính lại P&L với phí mới - dùng Tool tính phí sàn để nhập số liệu thực tế của từng sản phẩm."),
    block("p23", "normal", "2. Đánh giá lại Voucher Xtra: nếu CR (conversion rate) không đủ cao để bù 1.5% tăng thêm, cân nhắc opt-out hoặc giảm voucher seller bù lại."),
    block("p24", "normal", "3. Đánh giá lại Pi Ship: tăng 1.080đ/đơn - tính volume × 1.080đ xem con số thực sự là bao nhiêu/tháng."),
    block("p25", "normal", "4. Với Beauty/Health Mall: margin cần buffer thêm 3% - tức định giá hoặc tối ưu COGS ngay trong tháng này."),
    block("p26", "blockquote", "Shopee có lịch sử tăng phí 1-2 lần/năm. Build P&L với buffer 2-3% để chịu được biến động tương lai mà không phải xoay sở gấp."),
  ],
};

/* ── POST 2: Phí Mall từng ngành ── */
const POST_2 = {
  _id: "blog-phi-shopee-mall-2026-chi-tiet-nganh",
  _type: "post",
  title: "Phí hoa hồng Shopee Mall 2026 - Chi tiết từng ngành hàng sau tăng 29/05",
  slug: { _type: "slug", current: "phi-shopee-mall-2026-chi-tiet-nganh" },
  excerpt: "Từ 29/05/2026, Shopee Mall điều chỉnh phí cố định theo từng ngành. Beauty lên 20.8%, Sức Khỏe lên 20.8%, Thời Trang lên 19.1%. Chi tiết đầy đủ kèm ví dụ tính.",
  category: "Unit Economics",
  tags: ["shopee mall", "phi hoa hong", "phi san 2026"],
  readTime: 10,
  publishedAt: "2026-05-14T09:00:00.000Z",
  featured: false,
  seoTitle: "Phí hoa hồng Shopee Mall 2026 từng ngành - Cập nhật 29/05/2026",
  seoDescription: "Bảng phí hoa hồng Shopee Mall mới nhất từ 29/05/2026: Beauty 16.5-20.8%, Sức Khỏe 18-20.8%, Thời trang 16-19.1%, Âm Thanh 14.6-16.7%. Chi tiết kèm ví dụ tính.",
  body: [
    block("p1", "normal", "Từ ngày 29/05/2026, Shopee Mall áp dụng bảng phí cố định (phí hoa hồng) mới theo từng ngành hàng. Đây là đợt điều chỉnh lớn nhất từ trước đến nay với nhiều ngành tăng 2-3%."),
    block("p2", "h2", "Ngành hàng Tiêu dùng nhanh"),
    parts("p3", [{ text: "Sắc Đẹp (Beauty): " }, { text: "16.5% - 20.8%", bold: true }, { text: " (tăng +3% toàn bộ - trước là 13.5-17.8%)" }]),
    parts("p4", [{ text: "Sức Khỏe: " }, { text: "18% - 20.8%", bold: true }, { text: " (tăng +3% - trước là 15-17.8%)" }]),
    parts("p5", [{ text: "Chăm Sóc Thú Cưng: " }, { text: "16.7% - 17.1%", bold: true }, { text: " (tăng +1% - trước là 15.7-16.1%)" }]),
    parts("p6", [{ text: "Thực phẩm tươi sống, Mì ăn liền, Gạo, Gia vị: " }, { text: "13.7% (giữ nguyên)", bold: true }]),
    parts("p7", [{ text: "Nước tinh khiết, Thực phẩm khô: " }, { text: "13.7%", bold: true }, { text: " (giảm nhẹ từ 14.7%)" }]),
    parts("p8", [{ text: "Mẹ & Bé - Chăm sóc da cho bé: " }, { text: "14%", bold: true }, { text: " (giảm từ 15%)" }]),
    block("p9", "blockquote", "Sắc Đẹp và Sức Khỏe Mall đang có mức phí hoa hồng cao nhất toàn sàn - 20.8% là mức kỷ lục. Seller Beauty Mall cần review margin ngay."),
    block("p10", "h2", "Ngành hàng Nhà cửa & Đời sống"),
    parts("p11", [{ text: "Nhà cửa còn lại (đồ gia dụng, nội thất...): " }, { text: "tăng +3%", bold: true }, { text: " lên 14.5-19.1% (trước 11.5-16.1%)" }]),
    parts("p12", [{ text: "Sở thích & Sưu tầm: " }, { text: "16.5-18.7%", bold: true }, { text: " (tăng +3%)" }]),
    parts("p13", [{ text: "Văn Phòng Phẩm: " }, { text: "15.5-18.7%", bold: true }, { text: " (tăng +2-3%)" }]),
    parts("p14", [{ text: "Sách & Tạp Chí: " }, { text: "16%", bold: true }, { text: " (tăng +2% từ 14%)" }]),
    parts("p15", [{ text: "Ô tô: " }, { text: "3.5%", bold: true }, { text: " (tăng mạnh từ 1.5%)" }]),
    parts("p16", [{ text: "Mô tô, xe máy: " }, { text: "1.5% (giữ nguyên)", bold: true }]),
    parts("p17", [{ text: "Chổi, Cây lau, Túi nilon, Miếng bọt biển: " }, { text: "14.7%", bold: true }, { text: " (giảm từ 15.7%)" }]),
    parts("p18", [{ text: "Chất tẩy rửa, Phụ kiện giặt là, Giấy vệ sinh: " }, { text: "14-14.7% (giữ nguyên)", bold: true }]),
    block("p19", "h2", "Ngành hàng Thời trang"),
    parts("p20", [{ text: "Thời Trang Nam, Nữ, Trẻ em: " }, { text: "16-19.1%", bold: true }, { text: " (tăng không đều - từ mức cũ 15-16.1%)" }]),
    parts("p21", [{ text: "Giày Dép, Phụ Kiện Thời Trang, Túi Ví: " }, { text: "16-19.1%", bold: true }, { text: " (tăng +1-3% tùy sub-category)" }]),
    block("p22", "h2", "Ngành hàng Điện tử"),
    parts("p23", [{ text: "Laptop, Điện thoại, Máy tính bảng, Tivi, Gia dụng lớn: " }, { text: "giữ nguyên", bold: true }, { text: " (không đổi)" }]),
    parts("p24", [{ text: "Thiết Bị Âm Thanh: " }, { text: "14.6-16.7%", bold: true }, { text: " (tăng +2% từ 12.6-14.7%)" }]),
    parts("p25", [{ text: "Voucher & Dịch vụ: " }, { text: "14.6%", bold: true }, { text: " (tăng +2% từ 12.6%)" }]),
    parts("p26", [{ text: "Gaming & Console: " }, { text: "10.5-16.7%", bold: true }, { text: " (tăng +1-2%)" }]),
    parts("p27", [{ text: "Bảng Vẽ Điện Tử: " }, { text: "8.6%", bold: true }, { text: " (giảm mạnh từ 12.6% - hiếm gặp)" }]),
    block("p28", "h2", "So sánh trước - sau: ví dụ seller Beauty Mall"),
    block("p29", "normal", "Sản phẩm 500.000đ, ngành Mỹ Phẩm Làm Đẹp Mall:"),
    parts("p30", [{ text: "Phí hoa hồng cũ (13.5%): 67.500đ | Phí mới (16.5%): 82.500đ → ", bold: true }, { text: "Tăng thêm 15.000đ/đơn chỉ riêng phí hoa hồng" }]),
    block("p31", "normal", "Với shop có 1.000 đơn/tháng, tăng phí hoa hồng đơn thuần đã thêm 15.000.000đ chi phí/tháng. Chưa kể Voucher Xtra và Pi Ship tăng song song."),
    block("p32", "blockquote", "Dùng Tool tính phí sàn để nhập số liệu thực tế của sản phẩm bạn - công cụ đã cập nhật bảng phí mới nhất từ 29/05/2026."),
  ],
};

/* ── POST 3: Voucher Xtra 5.5% ── */
const POST_3 = {
  _id: "blog-voucher-xtra-shopee-5-5-phan-tram-2026",
  _type: "post",
  title: "Voucher Xtra Shopee tăng lên 5.5% từ 23/05/2026 - Nên tiếp tục hay bỏ?",
  slug: { _type: "slug", current: "voucher-xtra-shopee-5-5-phan-tram-2026" },
  excerpt: "Shopee tăng Phí Dịch vụ Gói Voucher Xtra từ 4% lên 5.5% từ 23/05/2026. Phân tích khi nào đáng đăng ký, khi nào nên opt-out, và chiến lược tối ưu chi phí.",
  category: "Unit Economics",
  tags: ["voucher xtra", "shopee", "phi san"],
  readTime: 6,
  publishedAt: "2026-05-14T10:00:00.000Z",
  featured: false,
  seoTitle: "Voucher Xtra Shopee tăng 5.5% từ 23/05/2026 - Có nên đăng ký không?",
  seoDescription: "Phí Voucher Xtra Shopee tăng từ 4% lên 5.5% (cap 50.000đ) từ 23/05/2026. Phân tích chi phí-lợi ích: khi nào đáng dùng, khi nào nên tắt, chiến lược tối ưu margin.",
  body: [
    block("p1", "normal", "Từ 23/05/2026, Phí Dịch vụ Gói Voucher Xtra của Shopee tăng từ 4% lên 5.5% - mức tăng 37.5% so với trước. Cap vẫn giữ 50.000đ/sản phẩm. Câu hỏi nhiều seller đang đặt ra: có nên tiếp tục đăng ký không?"),
    block("p2", "h2", "Voucher Xtra là gì và tính thế nào?"),
    block("p3", "normal", "Voucher Xtra là chương trình Shopee cung cấp mã giảm giá cho buyer, seller trả phí để tham gia. Phí được tính trên giá trị từng sản phẩm trong đơn hàng thành công (hoặc hoàn tiền được chấp nhận ngay)."),
    parts("p4", [{ text: "Công thức: " }, { text: "Phí Voucher Xtra = Giá sản phẩm × 5.5% (tối đa 50.000đ/sản phẩm)", bold: true }]),
    block("p5", "normal", "Ví dụ: Sản phẩm 500.000đ → Phí = 27.500đ. Sản phẩm 1.000.000đ → Phí = 50.000đ (đã chạm cap)."),
    block("p6", "h2", "So sánh trước và sau 23/05/2026"),
    parts("p7", [{ text: "Sản phẩm 200.000đ: " }, { text: "Phí cũ 8.000đ → Phí mới 11.000đ (+3.000đ)", bold: true }]),
    parts("p8", [{ text: "Sản phẩm 500.000đ: " }, { text: "Phí cũ 20.000đ → Phí mới 27.500đ (+7.500đ)", bold: true }]),
    parts("p9", [{ text: "Sản phẩm 1.000.000đ: " }, { text: "Phí cũ 40.000đ → Phí mới 50.000đ (+10.000đ, đã cap)", bold: true }]),
    parts("p10", [{ text: "Sản phẩm trên 909.000đ: " }, { text: "50.000đ cố định (không đổi vì đã cap trước)", bold: true }]),
    block("p11", "h2", "Khi nào đáng tiếp tục đăng ký Voucher Xtra?"),
    block("p12", "normal", "Voucher Xtra tạo ra traffic từ trang voucher Shopee, flash sale, và ưu tiên hiển thị trong một số campaign. Đáng đăng ký khi:"),
    block("p13", "normal", "1. Sản phẩm có AOV cao (>1 triệu): cap 50.000đ tương đương <5% - chi phí tương đối thấp."),
    block("p14", "normal", "2. Ngành hàng cạnh tranh cao: Voucher tạo differentiation khi buyer so sánh giá."),
    block("p15", "normal", "3. Conversion rate từ voucher campaign > 15%: phí voucher được bù đắp bởi volume tăng thêm."),
    block("p16", "normal", "4. Gross margin > 40%: có đủ headroom để hấp thụ thêm 1.5% phí."),
    block("p17", "h2", "Khi nào nên opt-out?"),
    block("p18", "normal", "1. Sản phẩm AOV thấp (100.000-200.000đ): 5.5% là quá cao so với margin, đặc biệt khi kết hợp với phí hoa hồng mới."),
    block("p19", "normal", "2. Margin sau phí hiện tại < 15%: thêm 1.5% sẽ đẩy nhiều SKU vào vùng lỗ."),
    block("p20", "normal", "3. Traffic chủ yếu từ kênh khác (social, live, TikTok): Voucher Xtra ít tác động hơn."),
    block("p21", "blockquote", "Thay vì opt-out hoàn toàn, nhiều seller chọn giảm voucher seller (từ 10% xuống 7%) để compensate phí Voucher Xtra tăng - buyer vẫn thấy voucher hấp dẫn nhưng seller không bị âm margin."),
    block("p22", "h2", "Chiến lược tối ưu sau khi phí tăng"),
    block("p23", "normal", "Phương án A - Giữ Voucher Xtra, tăng giá niêm yết 2%: buyer thực sự trả bằng với trước, seller không mất margin."),
    block("p24", "normal", "Phương án B - Opt-out Voucher Xtra, bù bằng Flash Sale nội bộ: kiểm soát chi phí hơn nhưng mất một số lượng traffic từ trang voucher."),
    block("p25", "normal", "Phương án C - Giữ Voucher Xtra nhưng giảm tỷ lệ voucher seller: từ seller voucher 10% xuống 7-8% - tổng ưu đãi buyer nhận vẫn hấp dẫn."),
  ],
};

/* ── POST 4: Pi Ship tăng 2.700đ ── */
const POST_4 = {
  _id: "blog-pi-ship-shopee-2700d-2026-co-dang-dang-ky",
  _type: "post",
  title: "Pi Ship Shopee tăng lên 2.700đ từ 23/05/2026 - Còn đáng đăng ký không?",
  slug: { _type: "slug", current: "pi-ship-shopee-2700d-2026-co-dang-dang-ky" },
  excerpt: "Pi Ship Shopee tăng từ 1.620đ lên 2.700đ/đơn từ 23/05/2026 - mức tăng 67%. Phân tích thực tế: khi nào Pi Ship vẫn có lợi, khi nào nên dừng và chuyển sang hãng vận chuyển khác.",
  category: "Unit Economics",
  tags: ["pi ship", "shopee", "van chuyen", "phi san"],
  readTime: 5,
  publishedAt: "2026-05-14T11:00:00.000Z",
  featured: false,
  seoTitle: "Pi Ship Shopee 2.700đ từ 23/05/2026 - Còn đáng dùng không?",
  seoDescription: "Pi Ship Shopee tăng 67% lên 2.700đ/đơn từ 23/05/2026. Phân tích thực tế: khi nào vẫn đáng đăng ký, khi nào nên opt-out, so sánh với hãng vận chuyển khác.",
  body: [
    block("p1", "normal", "Ngày 23/05/2026, Shopee điều chỉnh phí Pi Ship từ 1.620đ lên 2.700đ/đơn - mức tăng 67% chỉ trong một lần. Với shop có volume lớn, con số này tích lũy thành khoản chi phí đáng kể mỗi tháng."),
    block("p2", "h2", "Pi Ship là gì và tại sao seller dùng?"),
    block("p3", "normal", "Pi Ship là dịch vụ vận chuyển nội bộ của Shopee - tích hợp trực tiếp với Seller Center, tự động cập nhật trạng thái đơn hàng real-time, và thường có rate ship rẻ hơn so với ký hợp đồng ngoài. Phí Pi Ship là khoản seller trả để sử dụng dịch vụ này."),
    block("p4", "h2", "Tác động thực tế theo volume"),
    parts("p5", [{ text: "100 đơn/tháng: " }, { text: "Chi phí tăng thêm 108.000đ/tháng (1.080đ × 100)", bold: true }]),
    parts("p6", [{ text: "500 đơn/tháng: " }, { text: "Chi phí tăng thêm 540.000đ/tháng", bold: true }]),
    parts("p7", [{ text: "1.000 đơn/tháng: " }, { text: "Chi phí tăng thêm 1.080.000đ/tháng", bold: true }]),
    parts("p8", [{ text: "5.000 đơn/tháng: " }, { text: "Chi phí tăng thêm 5.400.000đ/tháng", bold: true }]),
    block("p9", "blockquote", "Với shop 1.000 đơn/tháng, chỉ riêng Pi Ship tăng đã thêm hơn 1 triệu đồng chi phí/tháng - tương đương lương nhân viên part-time."),
    block("p10", "h2", "Khi nào Pi Ship vẫn đáng dùng?"),
    block("p11", "normal", "Pi Ship vẫn có lợi khi: (1) Rate ship thực tế từ Pi Ship thấp hơn hãng vận chuyển bạn đang ký ngoài ít nhất 2.700đ/đơn sau phí. (2) Bạn cần tracking tự động và không có team xử lý đơn riêng. (3) Sản phẩm nhỏ gọn, nhẹ - benefit từ rate Pi Ship rõ hơn."),
    block("p12", "h2", "Khi nào nên opt-out Pi Ship?"),
    block("p13", "normal", "Nên xem xét dừng Pi Ship khi: (1) Bạn đã ký hợp đồng volume với GHTK, GHN, Viettel Post - rate thực tế của họ cộng 0đ Pi Ship < rate Pi Ship + 2.700đ phí. (2) Shop ở tỉnh thành tier 2 - Pi Ship đôi khi không cover đủ địa bàn. (3) Volume < 200 đơn/tháng - lợi ích từ tích hợp không đủ bù 2.700đ/đơn thêm."),
    block("p14", "h2", "Cách so sánh đúng"),
    block("p15", "normal", "Đừng so sánh '2.700đ Pi Ship' với '0đ tự ký'. Cần so sánh TỔNG chi phí vận chuyển thực ra (rate + phí dịch vụ + thời gian xử lý) trên cùng 1 đơn hàng giống nhau."),
    parts("p16", [{ text: "Công thức: " }, { text: "(Rate Pi Ship + 2.700đ phí) vs (Rate hãng ngoài + 0đ phí + thời gian xử lý quy ra tiền)", bold: true }]),
    block("p17", "normal", "Nếu shop đang xử lý tốt với hãng ngoài và rate tương đương, việc tiếp tục trả 2.700đ/đơn chỉ cho tính năng 'tích hợp Seller Center' không còn hợp lý với mức phí mới."),
  ],
};

/* ── POST 5: Tính lại margin ── */
const POST_5 = {
  _id: "blog-tinh-lai-margin-sau-phi-shopee-moi-2026",
  _type: "post",
  title: "Tính lại margin sau phí Shopee mới 2026 - Hướng dẫn và ví dụ thực tế",
  slug: { _type: "slug", current: "tinh-lai-margin-sau-phi-shopee-moi-2026" },
  excerpt: "Shopee vừa tăng phí 2 đợt trong tháng 5/2026. Hướng dẫn chi tiết cách tính lại P&L, điều chỉnh giá bán, và những seller nào bị ảnh hưởng nặng nhất.",
  category: "Unit Economics",
  tags: ["margin", "pl", "shopee", "phi san 2026"],
  readTime: 9,
  publishedAt: "2026-05-14T12:00:00.000Z",
  featured: false,
  seoTitle: "Tính lại margin sau phí Shopee 2026 - Hướng dẫn chi tiết",
  seoDescription: "Shopee tăng phí Voucher Xtra lên 5.5%, Pi Ship lên 2.700đ, hoa hồng Mall tăng 1-3%. Hướng dẫn tính lại P&L, điều chỉnh giá bán, và chiến lược maintain margin.",
  body: [
    block("p1", "normal", "Hai đợt tăng phí của Shopee trong tháng 5/2026 đang buộc seller phải ngồi lại tính toán. Bài này hướng dẫn cụ thể cách review P&L và quyết định bước tiếp theo."),
    block("p2", "h2", "Bước 1 - Xác định loại phí ảnh hưởng đến bạn"),
    block("p3", "normal", "Không phải mọi seller đều bị ảnh hưởng như nhau. Kiểm tra:"),
    block("p4", "normal", "Câu hỏi 1: Bạn có đăng ký Voucher Xtra không? Nếu có: tăng 1.5% giá trị đơn (tối đa 10.000đ thêm nếu chưa cap)."),
    block("p5", "normal", "Câu hỏi 2: Bạn có dùng Pi Ship không? Nếu có: tăng 1.080đ/đơn cố định từ 23/05."),
    block("p6", "normal", "Câu hỏi 3: Bạn có bán trên Shopee Mall không? Nếu có: phí hoa hồng thay đổi theo ngành từ 29/05 - cần check bảng phí ngành của bạn."),
    block("p7", "h2", "Bước 2 - Tính tác động thực tế"),
    block("p8", "normal", "Lấy 3 SKU bestseller của bạn, dùng Tool tính phí sàn, nhập số liệu thực tế và so sánh margin trước/sau. Đừng estimate - số thực từ bestseller sẽ cho bức tranh chính xác nhất."),
    parts("p9", [{ text: "Ví dụ seller Beauty Mall, sản phẩm 400.000đ, COGS 140.000đ, có Voucher Xtra và Pi Ship:", bold: true }]),
    parts("p10", [{ text: "Phí hoa hồng cũ (13.5%): 54.000đ | Phí mới (16.5%): 66.000đ → tăng 12.000đ", bold: true }]),
    parts("p11", [{ text: "Voucher Xtra cũ (4%): 16.000đ | Mới (5.5%): 22.000đ → tăng 6.000đ", bold: true }]),
    parts("p12", [{ text: "Pi Ship: 1.620đ → 2.700đ → tăng 1.080đ", bold: true }]),
    parts("p13", [{ text: "Phí giao dịch 6%: giữ nguyên 24.000đ", bold: true }]),
    parts("p14", [{ text: "Tổng phí tăng thêm: 12.000 + 6.000 + 1.080 = 19.080đ/đơn", bold: true }]),
    block("p15", "normal", "Nếu trước đây margin là 35.000đ/đơn (8.75%), nay còn 15.920đ (3.98%) - đã vào vùng nguy hiểm."),
    block("p16", "h2", "Bước 3 - 4 lựa chọn để xử lý"),
    block("p17", "normal", "Lựa chọn A - Tăng giá bán: cần tăng ~5% để bù phí. Rủi ro: conversion rate giảm nếu cạnh tranh nhiều. Thực hiện: test A/B giá trong 2 tuần trước khi áp toàn bộ."),
    block("p18", "normal", "Lựa chọn B - Giảm voucher seller: từ 10% xuống 7% seller voucher - buyer vẫn có voucher nhưng seller bù được phí tăng. Ít rủi ro hơn tăng giá."),
    block("p19", "normal", "Lựa chọn C - Tối ưu COGS: đàm phán lại với nhà cung cấp, tăng order size để giảm đơn giá. Khả thi nhưng cần thời gian."),
    block("p20", "normal", "Lựa chọn D - Opt-out Voucher Xtra và Pi Ship: nếu 2 dịch vụ này không đem lại CR đủ cao để bù phí, đây là cách cắt giảm chi phí nhanh nhất."),
    block("p21", "blockquote", "Không có lựa chọn nào phù hợp tất cả. Seller có margin >35% có thể chịu được tăng phí. Seller margin 15-20% cần hành động ngay tuần này."),
    block("p22", "h2", "Ngành nào bị ảnh hưởng nặng nhất?"),
    parts("p23", [{ text: "Ảnh hưởng nặng nhất: " }, { text: "Beauty và Sức Khỏe Mall (tăng 3% hoa hồng + Voucher Xtra + Pi Ship = tổng tăng ~20.000-30.000đ/đơn với AOV 500K)", bold: true }]),
    parts("p24", [{ text: "Ảnh hưởng trung bình: " }, { text: "Thời Trang Mall, Nhà cửa Mall, Sở thích & Sưu tầm (tăng 2-3% hoa hồng)", bold: true }]),
    parts("p25", [{ text: "Ảnh hưởng nhẹ: " }, { text: "Điện tử (Laptop, Tivi, Điện thoại giữ nguyên phí hoa hồng - chỉ bị Voucher Xtra và Pi Ship nếu đăng ký)", bold: true }]),
    block("p26", "h2", "Công cụ hỗ trợ"),
    block("p27", "normal", "Tool tính phí sàn trên website đã cập nhật đầy đủ bảng phí mới từ 23/05 và 29/05/2026. Nhập số liệu thực tế của sản phẩm - tool sẽ hiển thị breakdown từng loại phí và margin thực tế theo 4 cột: Shopee Non-Mall, Shopee Mall, TikTok Non-Mall, TikTok Mall."),
  ],
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");

  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  const posts = [POST_1, POST_2, POST_3, POST_4, POST_5];
  const results = [];

  for (const post of posts) {
    try {
      const result = await client.createIfNotExists(post as any);
      results.push({ id: post._id, status: "ok", _rev: result._rev });
    } catch (err: any) {
      results.push({ id: post._id, status: "error", message: err.message });
    }
  }

  return NextResponse.json({ seeded: results.length, results });
}
