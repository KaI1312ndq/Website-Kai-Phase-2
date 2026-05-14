import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/**
 * Seed batch 4 - 5 bài blog:
 * 1. Contribution Margin là gì - tầng quan trọng nhất trong P&L ecom
 * 2. Gross Margin vs Net Margin - cái nào quan trọng hơn với seller?
 * 3. Marketing Manager lương bao nhiêu 2026 - lộ trình 1-5 năm
 * 4. Fresher Marketing nên bắt đầu từ đâu - roadmap 12 tháng
 * 5. Performance Marketing là gì - nghề hot nhất ecom 2026
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
   POST 1 - Contribution Margin là gì
══════════════════════════════════════════════════════════ */
const POST_CM = {
  _id: "blog-contribution-margin-la-gi-trong-ecom",
  _type: "post",
  title: "Contribution Margin là gì? Tầng P&L quan trọng nhất mà seller hay bỏ qua",
  slug: { _type: "slug", current: "contribution-margin-la-gi-trong-ecom" },
  publishedAt: "2026-05-14T08:00:00Z",
  category: "Unit Economics",
  tags: ["contribution margin", "p&l", "unit economics", "ecom", "phi san", "loi nhuan"],
  excerpt: "Contribution Margin (CM) là tầng lợi nhuận sau khi trừ phí biến đổi - phí sàn, ship, voucher, ads. Đây là con số quyết định bạn có nên scale hay không, quan trọng hơn cả doanh thu.",
  body: [
    b("cm1", "normal", "Nhiều seller nhìn doanh thu 500 triệu/tháng mà vẫn loay hoay không biết tiền đâu. Lý do phổ biến nhất: họ không theo dõi Contribution Margin - tầng lợi nhuận quan trọng nhất trong P&L ecom."),
    b("cm2", "h2", "Contribution Margin là gì?"),
    b("cm3", "normal", "Contribution Margin (CM) hay còn gọi là Lợi nhuận đóng góp, là phần doanh thu còn lại sau khi trừ tất cả chi phí biến đổi trực tiếp liên quan đến việc bán hàng đó."),
    b("cm4", "normal", "Công thức:"),
    b("cm5", "blockquote", "CM = Net Revenue - COGS - Phí sàn - Phí ship - Voucher/Discount - Chi phí ads"),
    b("cm6", "normal", "Ví dụ: Bạn bán 1 đơn hàng giá 200.000đ. Chi phí hàng 80.000đ, phí sàn 17% = 34.000đ, ship 15.000đ, ads 20.000đ. CM = 200.000 - 80.000 - 34.000 - 15.000 - 20.000 = 51.000đ (25.5%)."),
    b("cm7", "h2", "Tại sao CM quan trọng hơn Gross Margin?"),
    b("cm8", "normal", "Gross Margin chỉ trừ COGS. Nhưng trong ecom, phí sàn có thể lên đến 17-21%, ads chiếm 15-25% doanh thu nếu scale mạnh. Nếu chỉ nhìn Gross Margin 60% mà ignore phí sàn + ads, bạn sẽ bị lừa bởi con số đẹp."),
    b("cm9", "normal", "CM dưới 15%: nguy hiểm - bất kỳ biến động phí nào cũng có thể làm lỗ."),
    b("cm10", "normal", "CM từ 20-30%: vùng lành mạnh để scale."),
    b("cm11", "normal", "CM trên 35%: excellent - có room để đầu tư thêm ads hoặc tăng voucher để giành market share."),
    b("cm12", "h2", "3 lỗi phổ biến khi tính CM"),
    b("cm13", "h3", "1. Bỏ quên phí hoàn trả"),
    b("cm14", "normal", "Tỷ lệ hoàn ở một số ngành (thời trang, giày dép) có thể 15-25%. Mỗi đơn hoàn = mất phí ship 2 chiều + công xử lý. Nếu không tính vào CM, bạn đang overstate lợi nhuận."),
    b("cm15", "h3", "2. Dùng phí sàn trung bình thay vì phí thực tế theo ngành"),
    b("cm16", "normal", "Phí Shopee Mall ngành Sức khoẻ - Làm đẹp có thể lên 19-21%. Nếu bạn dùng số trung bình 13%, CM tính ra sẽ cao hơn thực tế 6-8 điểm - đủ để một shop tưởng có lãi hoá ra đang lỗ."),
    b("cm17", "h3", "3. Không tách ads theo sản phẩm"),
    b("cm18", "normal", "Nhiều shop chạy ads tổng theo gian hàng, rồi chia đều cho tất cả sản phẩm. Nhưng thực tế một số hero product tiêu hết 80% ngân sách ads. Nếu không tách được, CM theo sản phẩm sẽ sai hoàn toàn."),
    b("cm19", "h2", "Cách tính CM đúng trong 5 phút"),
    b("cm20", "normal", "Bước 1: Lấy doanh thu net (sau hoàn trả, sau voucher platform)."),
    b("cm21", "normal", "Bước 2: Trừ COGS (giá vốn thực tế bao gồm đóng gói)."),
    b("cm22", "normal", "Bước 3: Trừ phí sàn theo đúng ngành hàng của bạn (dùng tool tính phí sàn để lấy số chính xác)."),
    b("cm23", "normal", "Bước 4: Trừ chi phí logistics (ship + bảo hiểm + xử lý hoàn)."),
    b("cm24", "normal", "Bước 5: Trừ chi phí ads trực tiếp cho sản phẩm đó."),
    b("cm25", "normal", "Con số ra là Contribution Margin tầng 1. Đây là số bạn cần theo dõi hằng ngày."),
    b("cm26", "h2", "CM bao nhiêu là đủ để có lãi?"),
    b("cm27", "normal", "Sau CM, bạn còn phải trừ Fixed Cost (lương team, kho bãi, phần mềm, overhead). Nếu Fixed Cost của bạn là 50 triệu/tháng và CM trung bình là 20%, bạn cần tối thiểu 250 triệu doanh thu net mỗi tháng để hòa vốn."),
    b("cm28", "normal", "Rule of thumb: CM% cần lớn hơn (Fixed Cost / Revenue) ít nhất 5-10 điểm % để có EBITDA dương sau khi scale."),
    b("cm29", "h2", "Kết luận"),
    b("cm30", "normal", "Contribution Margin là la bàn tài chính của mọi gian hàng ecom. Trước khi quyết định scale một sản phẩm, hỏi: CM% của nó là bao nhiêu? Nếu không biết con số này, bạn đang scale trong bóng tối."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 2 - Gross Margin vs Net Margin trong ecom
══════════════════════════════════════════════════════════ */
const POST_MARGIN = {
  _id: "blog-gross-margin-vs-net-margin-seller-can-biet",
  _type: "post",
  title: "Gross Margin vs Net Margin: Cái nào quan trọng hơn với seller ecom?",
  slug: { _type: "slug", current: "gross-margin-vs-net-margin-seller-can-biet" },
  publishedAt: "2026-05-14T09:00:00Z",
  category: "Unit Economics",
  tags: ["gross margin", "net margin", "p&l", "unit economics", "ecom", "loi nhuan", "phi san"],
  excerpt: "Gross Margin và Net Margin đều đo lợi nhuận, nhưng ở những tầng khác nhau. Với seller ecom, biết con số nào để ra quyết định nào sẽ giúp bạn tránh được nhiều cạm bẫy tài chính.",
  body: [
    b("gm1", "normal", "Trong buổi báo cáo kinh doanh, hai con số hay được hỏi nhất là Gross Margin và Net Margin. Nhiều seller biết tên nhưng hay nhầm lẫn ứng dụng của từng loại. Bài này sẽ giải quyết dứt điểm."),
    b("gm2", "h2", "Định nghĩa nhanh"),
    b("gm3", "h3", "Gross Margin (Biên lợi nhuận gộp)"),
    b("gm4", "blockquote", "Gross Margin = (Revenue - COGS) / Revenue x 100%"),
    b("gm5", "normal", "COGS bao gồm: giá vốn hàng hoá, chi phí đóng gói, chi phí sản xuất trực tiếp. Chưa tính phí sàn, chưa tính ads, chưa tính lương nhân viên."),
    b("gm6", "h3", "Net Margin (Biên lợi nhuận ròng)"),
    b("gm7", "blockquote", "Net Margin = Net Profit / Revenue x 100%"),
    b("gm8", "normal", "Net Profit là sau khi trừ tất cả: COGS, phí sàn, ads, lương, kho bãi, phần mềm, thuế, lãi vay. Đây là 'lợi nhuận thực về tay'."),
    b("gm9", "h2", "Ví dụ thực tế với gian hàng ecom"),
    b("gm10", "normal", "Gian hàng bán 1 tỷ doanh thu/tháng:"),
    b("gm11", "normal", "- COGS 400 triệu -> Gross Profit 600 triệu, Gross Margin 60%"),
    b("gm12", "normal", "- Phí sàn 15% = 150 triệu"),
    b("gm13", "normal", "- Chi phí ads 12% = 120 triệu"),
    b("gm14", "normal", "- Logistics 8% = 80 triệu"),
    b("gm15", "normal", "- Fixed cost (lương, kho, overhead) 80 triệu"),
    b("gm16", "normal", "-> Net Profit = 600 - 150 - 120 - 80 - 80 = 170 triệu, Net Margin chỉ 17%"),
    b("gm17", "normal", "Gross Margin 60% trông rất đẹp. Nhưng Net Margin 17% mới là con số thực tế. Và đây là shop hoạt động hiệu quả - nhiều shop Net Margin còn thấp hơn."),
    b("gm18", "h2", "Dùng con số nào để ra quyết định gì?"),
    b("gm19", "h3", "Gross Margin - dùng để: chọn sản phẩm, định giá, đàm phán NCC"),
    b("gm20", "normal", "Khi muốn biết một sản phẩm mới có đáng bán không, nhìn Gross Margin trước. Gross Margin dưới 30% trong ecom thường rất khó có Net Margin dương sau khi trừ phí sàn + ads + fixed cost."),
    b("gm21", "normal", "Khi đàm phán với nhà cung cấp, bạn cần biết mình có thể chịu được giá vốn tối đa bao nhiêu để vẫn đạt target Gross Margin - từ đó mới có điểm dừng trong đàm phán."),
    b("gm22", "h3", "Net Margin - dùng để: đánh giá sức khoẻ business, quyết định scale hay không"),
    b("gm23", "normal", "Nếu Net Margin âm, dù doanh thu tăng bạn cũng đang chảy máu. Scale trong trường hợp này chỉ làm lỗ nhanh hơn, không phải giải pháp."),
    b("gm24", "normal", "Net Margin dương và ổn định mới là điều kiện để tự tin tăng budget ads hoặc mở rộng danh mục sản phẩm."),
    b("gm25", "h2", "Contribution Margin - tầng ở giữa mà nhiều seller bỏ qua"),
    b("gm26", "normal", "Giữa Gross Margin và Net Margin còn có Contribution Margin - lợi nhuận sau khi trừ phí sàn, ship, ads (chi phí biến đổi) nhưng chưa trừ fixed cost. Đây là tầng phù hợp nhất để so sánh hiệu quả giữa các sản phẩm trong cùng một gian hàng."),
    b("gm27", "h2", "Benchmark theo loại hình ecom"),
    b("gm28", "normal", "D2C brand (hàng riêng): Gross Margin 50-70%, Net Margin target 15-25%."),
    b("gm29", "normal", "Reseller/dropship: Gross Margin 20-35%, Net Margin thường 5-12% - rất mỏng."),
    b("gm30", "normal", "Handmade/craft: Gross Margin 60-80%, nhưng chi phí thời gian thường không được tính vào COGS - attention."),
    b("gm31", "h2", "Kết luận thực chiến"),
    b("gm32", "normal", "Gross Margin cho bạn biết tiềm năng. Net Margin cho bạn biết thực tế. Contribution Margin giúp bạn ra quyết định hằng ngày. Seller giỏi theo dõi cả 3, nhưng hành động dựa trên Contribution Margin trước tiên."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 3 - Marketing Manager lương bao nhiêu 2026
══════════════════════════════════════════════════════════ */
const POST_SALARY = {
  _id: "blog-marketing-manager-luong-bao-nhieu-2026",
  _type: "post",
  title: "Marketing Manager lương bao nhiêu 2026? Lộ trình 1-5 năm thực tế",
  slug: { _type: "slug", current: "marketing-manager-luong-bao-nhieu-2026" },
  publishedAt: "2026-05-14T10:00:00Z",
  category: "career",
  tags: ["lương", "marketing manager", "career", "salary", "ecom", "performance marketing", "career path"],
  excerpt: "Lương Marketing Manager 2026 dao động từ 20-60 triệu tùy vào specialization, công ty và portfolio. Bài này breakdown theo từng level và cho bạn biết kỹ năng nào tăng lương nhanh nhất.",
  body: [
    b("sal1", "normal", "Câu hỏi tôi nhận nhiều nhất từ sinh viên năm 4 và junior 1-2 năm kinh nghiệm là: 'Lương Marketing Manager là bao nhiêu và bao lâu lên được vị trí đó?' Bài này là data thực tế từ thị trường 2025-2026."),
    b("sal2", "h2", "Tổng quan salary theo level"),
    b("sal3", "h3", "Intern / Fresher (0-1 năm)"),
    b("sal4", "normal", "Lương: 3-8 triệu/tháng (intern thường 2-4 triệu). Công việc chủ yếu: content execution, report, assist senior. Đây là giai đoạn học - đừng quan tâm lương quá, quan tâm chất lượng mentor và exposure."),
    b("sal5", "h3", "Junior (1-2 năm)"),
    b("sal6", "normal", "Lương: 8-15 triệu/tháng. Bắt đầu own một channel hoặc một function nhỏ (content, ads, SEO). Khoảng cách lương lớn ở giai đoạn này - junior biết tự học và có portfolio thực tế có thể đạt 12-15 triệu dù chỉ 1 năm kinh nghiệm."),
    b("sal7", "h3", "Senior / Specialist (2-4 năm)"),
    b("sal8", "normal", "Lương: 15-30 triệu/tháng. Đây là bước nhảy lớn nhất. Senior Performance Marketer hoặc Growth Lead tại startup tốt có thể đạt 25-30 triệu ở năm thứ 3. Specialization bắt đầu phân hóa lương mạnh ở đây."),
    b("sal9", "h3", "Marketing Manager (4-6 năm)"),
    b("sal10", "normal", "Lương: 25-50 triệu/tháng. Manage team 3-8 người, responsible cho budget và KPI tổng. Công ty lớn / MNC: 40-60 triệu. Startup Series A+: 30-45 triệu kèm equity. Agency: 20-35 triệu (thấp hơn nhưng exposure rộng hơn)."),
    b("sal11", "h3", "Head of Marketing / CMO (6+ năm)"),
    b("sal12", "normal", "Lương: 50-150 triệu/tháng + performance bonus. Một số CMO startup tăng trưởng tốt kiếm 80-120 triệu/tháng. Nhưng đây là con số của top 5-10% - không phải mặt bằng chung."),
    b("sal13", "h2", "Specialization nào tăng lương nhanh nhất?"),
    b("sal14", "h3", "1. Performance Marketing / Growth"),
    b("sal15", "normal", "Đây là specialization hot nhất trong ecom 2024-2026. Senior Performance Marketer với track record scale ROAS tốt có thể đàm phán 25-35 triệu/tháng ở năm 3-4. Lý do: đây là vị trí trực tiếp tạo ra revenue - dễ đo lường ROI nhất cho công ty."),
    b("sal16", "h3", "2. Data/Analytics Marketing"),
    b("sal17", "normal", "Biết SQL + Python + đọc hiểu funnel attribution model ngày càng hiếm. Senior Marketing Analyst ở các công ty tech/ecom lớn có thể đạt 30-40 triệu dù chỉ 3-4 năm kinh nghiệm."),
    b("sal18", "h3", "3. Brand/Content"),
    b("sal19", "normal", "Tăng chậm hơn nhưng ceiling cũng cao nếu bạn build được portfolio thương hiệu lớn. Brand Manager tại FMCG lớn năm 4-5 thường ở mức 20-30 triệu."),
    b("sal20", "h2", "5 yếu tố ảnh hưởng lương ngoài kinh nghiệm"),
    b("sal21", "normal", "1. Loại công ty: MNC > Tech startup > Agency > SME về mặt base salary trung bình."),
    b("sal22", "normal", "2. Portfolio vs bằng cấp: Hiring manager ngành marketing quan tâm bạn đã làm được gì hơn là học ở đâu."),
    b("sal23", "normal", "3. Khả năng tự học: Người tự học Google Ads certification, Meta Blueprint trong 6 tháng đầu đi làm thường thăng tiến nhanh hơn người chờ công ty train."),
    b("sal24", "normal", "4. Networking: 40-60% job offer ở senior level đến từ referral, không phải job board."),
    b("sal25", "normal", "5. Khả năng đàm phán lương: Nhiều người để lại 20-30% lương tiềm năng trên bàn vì không biết cách negotiate."),
    b("sal26", "h2", "Lộ trình 5 năm thực tế"),
    b("sal27", "normal", "Năm 1: Intern/Fresher tại startup hoặc agency - học nhanh, exposure nhiều. Target: thành thạo 1-2 channel."),
    b("sal28", "normal", "Năm 2: Junior chuyên sâu vào một specialization. Bắt đầu build portfolio với số liệu thực."),
    b("sal29", "normal", "Năm 3: Own một campaign/project lớn. Target lương 18-25 triệu."),
    b("sal30", "normal", "Năm 4-5: Senior/Lead. Manage junior, own P&L một channel. Target 25-40 triệu."),
    b("sal31", "normal", "Năm 5+: Manager/Head. Nếu muốn tăng trưởng mạnh - consider startup có equity, không chỉ maximize base salary."),
    b("sal32", "h2", "Kết luận"),
    b("sal33", "normal", "Lương Marketing Manager không có con số duy nhất - nó phụ thuộc vào specialization, loại công ty và portfolio của bạn. Tập trung vào việc tạo impact đo lường được trong 2-3 năm đầu thay vì chạy theo title, và lương sẽ tự đến."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 4 - Fresher Marketing roadmap 12 tháng
══════════════════════════════════════════════════════════ */
const POST_FRESHER = {
  _id: "blog-fresher-marketing-bat-dau-tu-dau-roadmap-12-thang",
  _type: "post",
  title: "Fresher Marketing bắt đầu từ đâu? Roadmap 12 tháng để không bị bỏ lại",
  slug: { _type: "slug", current: "fresher-marketing-bat-dau-tu-dau-roadmap-12-thang" },
  publishedAt: "2026-05-14T11:00:00Z",
  category: "career",
  tags: ["fresher", "junior", "marketing", "career", "career path", "roadmap", "ecom"],
  excerpt: "Fresher marketing thường bị overwhelm vì không biết học gì trước. Roadmap 12 tháng này giúp bạn build foundation đúng thứ tự - từ kỹ năng cứng đến tư duy chiến lược - để không bị stuck ở junior mãi.",
  body: [
    b("fr1", "normal", "Tôi từng nhận CV của fresher liệt kê 15 kỹ năng - từ SEO đến AI video đến branding - nhưng khi hỏi sâu thì không cái nào thực sự proficient. Đây là vấn đề phổ biến nhất của fresher marketing: học rộng thay vì học sâu."),
    b("fr2", "normal", "Roadmap 12 tháng dưới đây được thiết kế để bạn build đúng thứ tự - tránh lãng phí thời gian vào những thứ chưa cần thiết."),
    b("fr3", "h2", "Tháng 1-3: Foundation - Hiểu business trước khi làm marketing"),
    b("fr4", "normal", "Nhiều fresher vội học tool ngay - nhảy vào Google Ads, Canva, Meta Ads Manager. Nhưng nếu không hiểu business model, bạn sẽ không biết tại sao mình làm những việc đó."),
    b("fr5", "h3", "Cần học trong giai đoạn này:"),
    b("fr6", "normal", "- Marketing Funnel cơ bản: Awareness -> Consideration -> Conversion -> Retention"),
    b("fr7", "normal", "- P&L cơ bản: Revenue, COGS, Gross Margin, Net Margin (không cần chuyên sâu, cần đọc được report)"),
    b("fr8", "normal", "- Các kênh marketing chính và mục đích của từng kênh: paid ads, SEO, content, email, social"),
    b("fr9", "normal", "- Excel/Sheets cơ bản: VLOOKUP, pivot table, basic dashboard"),
    b("fr10", "h3", "Output target:"),
    b("fr11", "normal", "Sau 3 tháng, bạn phải đọc được một báo cáo marketing cơ bản và hiểu tại sao mỗi con số quan trọng."),
    b("fr12", "h2", "Tháng 4-6: Pick 1 Specialization và go deep"),
    b("fr13", "normal", "Đây là quyết định quan trọng nhất. Đừng cố học tất cả - chọn 1 trong 3 hướng dưới đây dựa trên sở thích và thị trường:"),
    b("fr14", "h3", "Hướng 1: Performance Marketing / Paid Ads"),
    p("fr15", [
      { text: "Phù hợp với ai: " },
      { text: "thích data, thích thấy kết quả nhanh, tư duy analytical", bold: true },
    ]),
    b("fr16", "normal", "Học: Google Ads (Search + Shopping), Meta Ads, TikTok Ads. Lấy chứng chỉ Google Ads certification miễn phí. Xin chạy nhỏ một campaign thực tế dù 500k budget."),
    b("fr17", "h3", "Hướng 2: Content / SEO"),
    p("fr18", [
      { text: "Phù hợp với ai: " },
      { text: "thích viết, thích nghiên cứu, kiên nhẫn với kết quả dài hạn", bold: true },
    ]),
    b("fr19", "normal", "Học: SEO on-page + keyword research (Ahrefs free trial, Google Search Console), Content framework, Copywriting cơ bản. Target: viết 10 bài blog có keyword research thực sự."),
    b("fr20", "h3", "Hướng 3: Ecommerce Operations / Growth"),
    p("fr21", [
      { text: "Phù hợp với ai: " },
      { text: "thích ecom, thích tối ưu conversion, tư duy product", bold: true },
    ]),
    b("fr22", "normal", "Học: Shopee/TikTok Ads Manager, gian hàng mechanics (phí, voucher, flash sale), CRO cơ bản. Tham gia quản lý một gian hàng nhỏ dù là của bạn bè/gia đình."),
    b("fr23", "h2", "Tháng 7-9: Build Portfolio thực tế"),
    b("fr24", "normal", "Certificate không thay thế được portfolio. Hiring manager muốn thấy bạn đã làm gì, không phải bạn biết gì theo lý thuyết."),
    b("fr25", "normal", "Cách build portfolio khi chưa có kinh nghiệm chính thức:"),
    b("fr26", "normal", "1. Freelance nhỏ: Nhận project nhỏ 2-5 triệu để có case study thực. Fiverr, Facebook group, người quen."),
    b("fr27", "normal", "2. Side project: Chạy một page nhỏ, gian hàng nhỏ, blog cá nhân - quan trọng là có số liệu thực."),
    b("fr28", "normal", "3. Phân tích case: Chọn 3 brand VN đang làm tốt, viết case study phân tích strategy của họ. Upload lên LinkedIn."),
    b("fr29", "h2", "Tháng 10-12: Job search và negotiate"),
    b("fr30", "normal", "Apply với portfolio, không chỉ CV. Chuẩn bị 2-3 case study có số liệu cụ thể để kể trong phỏng vấn: 'Tôi đã làm X, kết quả là Y% tăng trưởng.'"),
    b("fr31", "normal", "Tips phỏng vấn:"),
    b("fr32", "normal", "- Hỏi về mentor và learning culture, không chỉ về lương"),
    b("fr33", "normal", "- Chuẩn bị câu hỏi thông minh cho hiring manager - cho thấy bạn đã research công ty"),
    b("fr34", "normal", "- Đừng nhận offer đầu tiên ngay - take 2-3 ngày để so sánh"),
    b("fr35", "h2", "Sai lầm phổ biến nhất của fresher"),
    b("fr36", "normal", "Chờ 'ready' mới apply: Bạn sẽ không bao giờ cảm thấy ready. Apply khi đạt 70% requirement là đủ."),
    b("fr37", "normal", "Chọn công ty vì lương cao nhất: Ở 1-2 năm đầu, chất lượng học quan trọng hơn lương. Chênh 3-5 triệu/tháng không đáng nếu bạn không được mentor tốt."),
    b("fr38", "normal", "Không build network: 40-60% job senior đến từ referral. Bắt đầu network từ ngày 1, không phải khi cần việc."),
    b("fr39", "h2", "Kết luận"),
    b("fr40", "normal", "12 tháng đầu là nền tảng cho cả career. Đầu tư đúng vào giai đoạn này - chọn đúng specialization, build portfolio thực, network sớm - sẽ tạo compound effect trong nhiều năm tiếp theo."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 5 - Performance Marketing là gì
══════════════════════════════════════════════════════════ */
const POST_PERFMKT = {
  _id: "blog-performance-marketing-la-gi-nghe-hot-ecom-2026",
  _type: "post",
  title: "Performance Marketing là gì? Vì sao là nghề hot nhất Ecom 2026",
  slug: { _type: "slug", current: "performance-marketing-la-gi-nghe-hot-ecom-2026" },
  publishedAt: "2026-05-14T12:00:00Z",
  category: "performance",
  tags: ["performance marketing", "career", "ecom", "roas", "ads", "tiktok", "career path", "junior"],
  excerpt: "Performance Marketing là nhánh marketing đo lường được - mọi đồng chi ra đều track được kết quả. Với ecom bùng nổ, đây là vị trí hiếm nhất và được trả lương cao nhất trong ngành marketing VN hiện tại.",
  body: [
    b("pm1", "normal", "Khi tôi hỏi sinh viên marketing năm 4 muốn làm gì sau khi ra trường, đa số trả lời 'content' hoặc 'brand'. Ít người chọn Performance Marketing vì nghe có vẻ kỹ thuật và khó. Đây là lý do tại sao đây lại là vị trí khan hiếm và lương cao nhất trong ngành."),
    b("pm2", "h2", "Performance Marketing là gì?"),
    b("pm3", "normal", "Performance Marketing là nhánh marketing tập trung vào kết quả đo lường được - bạn chỉ trả tiền khi có action cụ thể xảy ra: click, lead, purchase, install. Trái ngược với brand marketing nơi kết quả (brand awareness, recall) khó đo chính xác."),
    b("pm4", "normal", "Các kênh chính trong performance marketing:"),
    b("pm5", "normal", "- Paid Search (Google Ads, Bing Ads): target người đang tìm kiếm sản phẩm"),
    b("pm6", "normal", "- Paid Social (Meta Ads, TikTok Ads): target theo demographics, interest, behavior"),
    b("pm7", "normal", "- Shopping Ads (Google Shopping, Shopee/TikTok Ads): target người sẵn sàng mua"),
    b("pm8", "normal", "- Affiliate Marketing: trả hoa hồng cho publisher theo sale"),
    b("pm9", "normal", "- Retargeting: remarketing tới người đã visit nhưng chưa mua"),
    b("pm10", "h2", "Metrics cốt lõi mà performance marketer phải thuộc lòng"),
    b("pm11", "h3", "ROAS (Return on Ad Spend)"),
    b("pm12", "normal", "ROAS = Revenue từ ads / Chi phí ads. ROAS 4x nghĩa là chi 1 triệu ads thu về 4 triệu doanh thu. Nhưng ROAS cao chưa chắc có lợi nhuận - cần tính Break-even ROAS."),
    b("pm13", "h3", "CPA (Cost Per Acquisition)"),
    b("pm14", "normal", "Chi phí để có 1 khách hàng mới. CPA phải thấp hơn LTV (Life Time Value) của khách hàng đó mới có lợi nhuận dài hạn."),
    b("pm15", "h3", "CTR (Click-Through Rate) và CVR (Conversion Rate)"),
    b("pm16", "normal", "CTR đo độ hấp dẫn của creative/ad copy. CVR đo độ thuyết phục của landing page/product page. Tối ưu cả hai mới maximize performance."),
    b("pm17", "h2", "Ngày làm việc của một Performance Marketer trông như thế nào?"),
    b("pm18", "normal", "9:00 - Review performance dashboard ngày hôm trước: ROAS, CPA, spend, revenue theo campaign."),
    b("pm19", "normal", "10:00 - Optimize: pause ad sets không đạt, scale ad sets tốt, điều chỉnh bidding strategy."),
    b("pm20", "normal", "11:00 - Creative review: phân tích top/bottom performing creatives, brief creative team cho tuần tới."),
    b("pm21", "normal", "14:00 - Keyword research / audience research cho campaign mới."),
    b("pm22", "normal", "16:00 - Report weekly cho manager: số liệu, insight, recommendation."),
    b("pm23", "normal", "Không có ngày nào giống ngày nào - thuật toán thay đổi liên tục, market dynamics thay đổi, season thay đổi. Đây là lý do vị trí này không thể tự động hoá hoàn toàn dù AI phát triển nhanh."),
    b("pm24", "h2", "Tại sao performance marketer khan hiếm và lương cao?"),
    b("pm25", "normal", "Thứ nhất: cần kết hợp kỹ năng analytical (đọc data, tư duy A/B test) với kỹ năng creative (viết ad copy, hiểu tâm lý người mua). Combo này hiếm."),
    b("pm26", "normal", "Thứ hai: kết quả đo lường được rõ ràng - performance marketer tốt trực tiếp tạo ra doanh thu. Dễ justify mức lương cao hơn cho company."),
    b("pm27", "normal", "Thứ ba: thị trường ecom VN tăng trưởng mạnh 20-30%/năm nhưng số lượng senior performance marketer không tăng kịp."),
    b("pm28", "h2", "Lộ trình vào nghề Performance Marketing"),
    b("pm29", "normal", "Bước 1: Học Google Ads certification miễn phí (Google Skillshop) + Meta Blueprint. 2-3 tuần học nghiêm túc."),
    b("pm30", "normal", "Bước 2: Chạy campaign thực với budget nhỏ (500k-2 triệu) - dù là bán hàng của người nhà hay freelance nhỏ."),
    b("pm31", "normal", "Bước 3: Học đọc Google Analytics 4 / Facebook Pixel data - không cần dev nhưng cần hiểu attribution."),
    b("pm32", "normal", "Bước 4: Apply vào agency performance hoặc startup ecom. Agency giúp bạn expose với nhiều account/ngành nhanh hơn."),
    b("pm33", "normal", "Bước 5: Sau 1-2 năm, in-house tại brand để học sâu về product margin và có data để tối ưu full funnel."),
    b("pm34", "h2", "Performance Marketing vs Brand Marketing: chọn gì?"),
    b("pm35", "normal", "Không cần chọn 1 trong 2 forever - nhiều người bắt đầu từ performance để học kỷ luật data, sau đó expand sang brand strategy khi có kinh nghiệm. Nhưng nếu phải chọn điểm bắt đầu cho career ecom, performance marketing có learning curve dốc hơn nhưng ceiling lương và tốc độ tăng trưởng cũng cao hơn."),
    b("pm36", "h2", "Kết luận"),
    b("pm37", "normal", "Performance Marketing không phải nghề glamorous nhất trong marketing - không có photoshoot đẹp hay viral video. Nhưng đây là nghề có tác động rõ ràng nhất đến business, và trong thế giới mà mọi công ty cần chứng minh ROI từ marketing budget, đây là kỹ năng ngày càng được định giá cao hơn."),
  ],
};

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

  const posts = [POST_CM, POST_MARGIN, POST_SALARY, POST_FRESHER, POST_PERFMKT];
  const results = [];

  for (const post of posts) {
    try {
      const doc = await client.createIfNotExists(post as any);
      results.push({ id: doc._id, status: "created" });
    } catch (err: any) {
      results.push({ id: post._id, status: "error", message: err.message });
    }
  }

  return NextResponse.json({ success: true, count: results.length, results });
}
