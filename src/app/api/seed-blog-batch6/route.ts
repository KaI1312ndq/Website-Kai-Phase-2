import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/**
 * Seed batch 6 - 5 bài blog:
 * 1. TikTok Shop phí bao nhiêu 2026 - bảng chi tiết theo ngành
 * 2. Phí Shopee Mall vs Non-Mall - khi nào nên lên Mall?
 * 3. Tính lương Net từ Gross 2026 - công cụ và ví dụ
 * 4. ROAS target theo ngành - benchmark thực tế
 * 5. Ecom Foundation - những gì cần biết trước khi bán hàng online
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
   POST 1 - TikTok Shop phí 2026 bảng chi tiết
══════════════════════════════════════════════════════════ */
const POST_TIKTOK_FEE = {
  _id: "blog-phi-tiktok-shop-2026-bang-chi-tiet-theo-nganh",
  _type: "post",
  title: "Phí TikTok Shop 2026: Bảng chi tiết theo ngành hàng cập nhật mới nhất",
  slug: { _type: "slug", current: "phi-tiktok-shop-2026-bang-chi-tiet-theo-nganh" },
  publishedAt: "2026-05-14T18:00:00Z",
  category: "tiktok",
  tags: ["phí TikTok Shop 2026", "phi san", "tiktok", "ecom", "phi hoa hong", "commission", "unit economics"],
  excerpt: "TikTok Shop tăng phí hoa hồng 2-3 lần kể từ 2023. Bài này tổng hợp bảng phí TikTok Shop 2026 theo từng ngành hàng, so sánh Standard vs Mall để bạn tính đúng chi phí trước khi bán.",
  body: [
    b("tt1", "normal", "TikTok Shop đã trải qua nhiều lần điều chỉnh phí kể từ khi ra mắt tại VN năm 2022. Từ mức phí ưu đãi ban đầu 1-2%, hiện tại phí hoa hồng TikTok Shop dao động 5-20% tùy ngành và loại gian hàng. Bài này cập nhật mức phí mới nhất theo từng ngành."),
    b("tt2", "h2", "Cơ cấu phí TikTok Shop bao gồm những gì?"),
    b("tt3", "h3", "1. Phí hoa hồng (Commission Fee)"),
    b("tt4", "normal", "Phí chính, tính trên giá bán sau discount (giá khách thực trả). Đây là khoản phí lớn nhất và khác nhau theo ngành hàng."),
    b("tt5", "h3", "2. Phí giao dịch (Transaction Fee)"),
    b("tt6", "normal", "Phí xử lý thanh toán, hiện tại khoảng 1% trên hầu hết đơn hàng TikTok Shop. Một số payment method có thể khác biệt nhỏ."),
    b("tt7", "h3", "3. Phí vận chuyển (Shipping Subsidy)"),
    b("tt8", "normal", "TikTok Shop thường trợ giá ship cho khách nhưng seller có thể bị charge một phần phí ship hoặc phải subsidise để cạnh tranh. Phí này biến động theo campaign và khu vực."),
    b("tt9", "h2", "Bảng phí hoa hồng TikTok Shop 2026 theo ngành"),
    b("tt10", "normal", "Thời trang & Phụ kiện: Standard 8-10%, TikTok Mall 12-14%"),
    b("tt11", "normal", "Mỹ phẩm & Làm đẹp: Standard 10-14%, TikTok Mall 16-20%"),
    b("tt12", "normal", "Sức khoẻ & Thực phẩm chức năng: Standard 8-12%, TikTok Mall 14-18%"),
    b("tt13", "normal", "Điện tử & Phụ kiện công nghệ: Standard 5-8%, TikTok Mall 8-12%"),
    b("tt14", "normal", "Gia dụng & Nội thất: Standard 6-9%, TikTok Mall 10-14%"),
    b("tt15", "normal", "Thể thao & Outdoor: Standard 7-10%, TikTok Mall 11-15%"),
    b("tt16", "normal", "Mẹ & Bé: Standard 7-10%, TikTok Mall 11-14%"),
    b("tt17", "normal", "Thực phẩm & Đồ uống: Standard 5-8%, TikTok Mall 8-12%"),
    b("tt18", "blockquote", "Lưu ý: Mức phí trên là phạm vi điển hình - phí chính xác phụ thuộc vào ngành hàng cụ thể, loại sản phẩm và điều kiện hợp đồng với TikTok. Luôn kiểm tra trong Seller Center để có con số chính xác nhất."),
    b("tt19", "h2", "So sánh TikTok Standard vs TikTok Mall"),
    b("tt20", "h3", "TikTok Standard (Non-Mall)"),
    b("tt21", "normal", "Phí thấp hơn 3-6 điểm % so với Mall. Phù hợp với: seller nhỏ và vừa, brand chưa được TikTok verify, sản phẩm có margin thấp cần bảo vệ từng điểm % phí."),
    b("tt22", "h3", "TikTok Mall"),
    b("tt23", "normal", "Phí cao hơn nhưng có label 'Mall' - tín hiệu trust mạnh với người mua. Phù hợp với: brand đã có tên tuổi, sản phẩm có Gross Margin cao (>50%), muốn giảm tỷ lệ hoàn trả (khách Mall thường ít hoàn hơn)."),
    b("tt24", "h2", "Tính phí thực tế - ví dụ cụ thể"),
    b("tt25", "normal", "Bán sản phẩm mỹ phẩm giá 350.000đ trên TikTok Standard:"),
    b("tt26", "normal", "- Phí hoa hồng 12%: 42.000đ"),
    b("tt27", "normal", "- Phí giao dịch 1%: 3.500đ"),
    b("tt28", "normal", "- Tổng phí sàn: 45.500đ (13%)"),
    b("tt29", "normal", "- Net Revenue sau phí sàn: 304.500đ"),
    b("tt30", "normal", "Sau đó trừ tiếp giá vốn, logistics, ads để ra Contribution Margin thực tế."),
    b("tt31", "h2", "Tại sao phí TikTok Shop tăng mạnh từ 2024?"),
    b("tt32", "normal", "TikTok Shop đã qua giai đoạn subsidise để acquire seller và buyer. Từ 2024, TikTok bắt đầu tối ưu unit economics của platform - tăng phí về mức bền vững. Đây là pattern giống Lazada (2017-2019) và Shopee (2020-2022)."),
    b("tt33", "normal", "Dự báo: phí TikTok Shop sẽ tiếp tục tăng 1-2%/năm trong 2-3 năm tới cho đến khi đạt mức tương đương Shopee Mall (~17-20% tổng phí)."),
    b("tt34", "h2", "Cách tính phí nhanh với tool miễn phí"),
    b("tt35", "normal", "Thay vì tính tay, bạn có thể dùng tool tính phí sàn để tính chính xác phí TikTok Shop (và Shopee) theo ngành hàng cụ thể của mình - có so sánh side by side giữa hai sàn."),
    b("tt36", "h2", "Kết luận"),
    b("tt37", "normal", "Phí TikTok Shop 2026 không còn thấp như những năm đầu. Trước khi list sản phẩm, tính kỹ phí sàn theo ngành của bạn để đảm bảo Contribution Margin dương. Một phép tính 5 phút có thể tránh được nhiều tháng bán hàng không lãi."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 2 - Phí Shopee Mall vs Non-Mall
══════════════════════════════════════════════════════════ */
const POST_MALL = {
  _id: "blog-phi-shopee-mall-vs-non-mall-khi-nao-nen-len-mall",
  _type: "post",
  title: "Phí Shopee Mall vs Non-Mall 2026: Khi nào nên lên Mall?",
  slug: { _type: "slug", current: "phi-shopee-mall-vs-non-mall-khi-nao-nen-len-mall" },
  publishedAt: "2026-05-14T19:00:00Z",
  category: "shopee",
  tags: ["shopee", "shopee mall", "phi san", "phi hoa hong", "ecom", "unit economics", "commission"],
  excerpt: "Shopee Mall có phí cao hơn Non-Mall 5-8 điểm % nhưng đổi lại traffic, trust và CVR tốt hơn. Bài này phân tích khi nào nên upgrade lên Mall dựa trên Gross Margin và volume của bạn.",
  body: [
    b("sm1", "normal", "Nhiều seller hỏi: 'Nên lên Shopee Mall không?' Câu trả lời không đơn giản là có hoặc không - nó phụ thuộc vào Gross Margin, volume và strategy của từng gian hàng."),
    b("sm2", "h2", "Sự khác biệt phí Shopee Mall vs Non-Mall"),
    b("sm3", "h3", "Shopee Non-Mall (Regular Seller)"),
    b("sm4", "normal", "Phí hoa hồng: 7-13% tùy ngành (trung bình 9-11%)."),
    b("sm5", "normal", "Phí giao dịch: 1%."),
    b("sm6", "normal", "Phí dịch vụ (nếu áp dụng): 0-2%."),
    b("sm7", "normal", "Tổng phí điển hình: 10-14%."),
    b("sm8", "h3", "Shopee Mall"),
    b("sm9", "normal", "Phí hoa hồng: 12-21% tùy ngành (trung bình 15-17%)."),
    b("sm10", "normal", "Phí giao dịch: 1%."),
    b("sm11", "normal", "Phí dịch vụ: 1-2%."),
    b("sm12", "normal", "Tổng phí điển hình: 15-22%."),
    b("sm13", "blockquote", "Chênh lệch phí Mall vs Non-Mall: khoảng 5-8 điểm %. Nghĩa là nếu bạn bán 1 tỷ/tháng, chi phí phí sàn tăng thêm 50-80 triệu/tháng."),
    b("sm14", "h2", "Những lợi ích Mall bù đắp cho phí cao"),
    b("sm15", "h3", "1. Badge 'Mall' - trust signal mạnh"),
    b("sm16", "normal", "CVR (tỷ lệ chuyển đổi) của Shopee Mall cao hơn Non-Mall 20-50% tùy ngành. Đặc biệt với sản phẩm giá cao (>300.000đ) hoặc sản phẩm liên quan đến sức khoẻ/làm đẹp, khách hàng có xu hướng trust Mall nhiều hơn."),
    b("sm17", "h3", "2. Xuất hiện ở filter 'Shopee Mall' riêng"),
    b("sm18", "normal", "Khi khách filter 'Chỉ xem Shopee Mall', Non-Mall sellers hoàn toàn bị loại khỏi kết quả tìm kiếm. Một phần đáng kể traffic Shopee search chỉ dành cho Mall."),
    b("sm19", "h3", "3. Tỷ lệ hoàn trả thấp hơn"),
    b("sm20", "normal", "Khách mua Mall thường ít impulse-buy hơn, intent rõ ràng hơn -> tỷ lệ hoàn trả thường thấp hơn 20-30% so với Non-Mall cùng ngành."),
    b("sm21", "h3", "4. Ưu tiên trong các campaign lớn"),
    b("sm22", "normal", "11.11, 12.12, Shopee Birthday - Mall sellers thường được Shopee subsidise voucher nhiều hơn và được featured trong banner chính. Traffic spike từ campaign lớn thường tập trung vào Mall."),
    b("sm23", "h2", "Khi nào NÊN lên Shopee Mall?"),
    b("sm24", "normal", "1. Gross Margin trên 50%: Phí cao hơn 6% không ăn quá nhiều vào margin. Ví dụ: GM 55%, sau khi phí Mall tăng thêm 6% -> GM còn 49% - vẫn acceptable."),
    b("sm25", "normal", "2. Bán sản phẩm giá cao (>300.000đ): Trust signal của Mall quan trọng hơn với sản phẩm giá cao. CVR tăng 30-50% có thể compensate cho phí tăng 6%."),
    b("sm26", "normal", "3. Brand đã có nhận diện: Nếu khách search brand của bạn, badge Mall giúp tăng CTR và giảm khả năng họ click vào hàng giả/hàng nhái."),
    b("sm27", "normal", "4. Volume lớn (>500 đơn/ngày): Economies of scale trong operations (warehouse, nhân sự) dễ justify phí cao hơn khi volume lớn."),
    b("sm28", "h2", "Khi nào KHÔNG nên lên Mall?"),
    b("sm29", "normal", "1. Gross Margin dưới 35%: Phí Mall tăng thêm 6-8% có thể đẩy Contribution Margin về âm."),
    b("sm30", "normal", "2. Sản phẩm giá thấp (<100.000đ): Trust bonus của Mall ít tác động hơn - khách hàng ít phân tích Mall vs Non-Mall với đơn hàng nhỏ."),
    b("sm31", "normal", "3. Category ít cạnh tranh, đã rank tốt: Nếu bạn đang top search tự nhiên và CVR đã cao, phí thêm không justify."),
    b("sm32", "h2", "Framework quyết định: Tính break-even volume"),
    b("sm33", "normal", "Gọi delta_fee = phí Mall - phí Non-Mall (điểm %)."),
    b("sm34", "normal", "Nếu CVR tăng X% khi lên Mall, doanh thu tăng X%. Để đủ cover phí tăng, bạn cần: X% > delta_fee / (1 - delta_fee)."),
    b("sm35", "normal", "Ví dụ: delta_fee = 6%, CVR cần tăng ít nhất 6.4% để break-even. Nếu bạn dự báo CVR tăng 20% khi lên Mall - quyết định clear. Nếu chỉ tăng 5% - chưa nên."),
    b("sm36", "h2", "Kết luận"),
    b("sm37", "normal", "Lên Shopee Mall không phải là mặc định tốt hơn - nó là trade-off. Tính kỹ phí tăng thêm và CVR uplift dự kiến trước khi quyết định. Dùng tool tính phí sàn để so sánh chính xác chi phí Non-Mall vs Mall theo ngành của bạn."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 3 - ROAS target theo ngành benchmark
══════════════════════════════════════════════════════════ */
const POST_ROAS_BENCH = {
  _id: "blog-roas-target-theo-nganh-benchmark-2026",
  _type: "post",
  title: "ROAS Target theo Ngành 2026: Benchmark thực tế để biết mình đang ở đâu",
  slug: { _type: "slug", current: "roas-target-theo-nganh-benchmark-2026" },
  publishedAt: "2026-05-14T20:00:00Z",
  category: "performance",
  tags: ["roas", "ads", "performance marketing", "benchmark", "ecom", "tiktok", "shopee", "break-even"],
  excerpt: "ROAS 3x tốt hay xấu? Phụ thuộc vào ngành và margin của bạn. Bài này tổng hợp ROAS benchmark theo ngành ecom VN 2026 và công thức tính ROAS target tối thiểu để không lỗ.",
  body: [
    b("rb1", "normal", "Một trong những câu hỏi tôi nhận nhiều nhất từ người mới chạy ads là: 'ROAS của tôi đang là X, vậy có tốt không?' Câu trả lời không thể đơn giản là có hoặc không - ROAS 3x có thể tốt với ngành này nhưng lỗ nặng với ngành khác."),
    b("rb2", "h2", "ROAS là gì và tại sao không thể so sánh ngang?"),
    b("rb3", "normal", "ROAS = Revenue / Ad Spend. ROAS 4x nghĩa là chi 1 triệu ads, thu về 4 triệu doanh thu. Nhưng nếu margin của bạn chỉ 20%, 4 triệu doanh thu chỉ tạo ra 800k Gross Profit - thấp hơn 1 triệu bạn đã chi cho ads."),
    b("rb4", "h2", "Công thức tính Break-even ROAS"),
    b("rb5", "blockquote", "Break-even ROAS = 1 / (Gross Margin% - Phí sàn% - Logistics%)"),
    b("rb6", "normal", "Ví dụ: GM 50%, phí sàn 15%, logistics 8%. Break-even ROAS = 1 / (0.5 - 0.15 - 0.08) = 1 / 0.27 = 3.7x."),
    b("rb7", "normal", "Nghĩa là ROAS phải cao hơn 3.7x mới có Contribution Margin dương sau ads. ROAS 3x với margin structure này = lỗ mỗi đơn hàng."),
    b("rb8", "h2", "ROAS benchmark theo ngành ecom VN 2026"),
    b("rb9", "h3", "Mỹ phẩm & Làm đẹp"),
    b("rb10", "normal", "Gross Margin điển hình: 55-70%. Phí sàn: 14-20%. Break-even ROAS: 3.5-5x. Target ROAS healthy: 5-8x."),
    b("rb11", "h3", "Thời trang & Phụ kiện"),
    b("rb12", "normal", "Gross Margin điển hình: 40-60%. Phí sàn: 10-14%. Hoàn trả cao 15-25%. Break-even ROAS: 3-4x. Target ROAS healthy: 4-6x."),
    b("rb13", "h3", "Thực phẩm chức năng & Sức khoẻ"),
    b("rb14", "normal", "Gross Margin điển hình: 60-75%. Phí sàn: 14-21%. Break-even ROAS: 3-4.5x. Target ROAS healthy: 5-8x (LTV cao vì khách mua lại nhiều)."),
    b("rb15", "h3", "Điện tử & Phụ kiện"),
    b("rb16", "normal", "Gross Margin thấp: 15-30%. Phí sàn: 6-10%. Break-even ROAS: 5-8x - rất khó đạt. Target ROAS healthy: 8-12x. Đây là ngành khó chạy ads profitable nhất."),
    b("rb17", "h3", "Gia dụng & Nội thất"),
    b("rb18", "normal", "Gross Margin: 30-50%. Phí sàn: 8-12%. Break-even ROAS: 3.5-5x. Target ROAS healthy: 5-7x."),
    b("rb19", "h3", "Thể thao & Outdoor"),
    b("rb20", "normal", "Gross Margin: 40-55%. Phí sàn: 9-13%. Break-even ROAS: 3-4.5x. Target ROAS healthy: 4-7x."),
    b("rb21", "h2", "ROAS cao nhưng vẫn lỗ - tại sao?"),
    b("rb22", "normal", "Nguyên nhân 1: ROAS được tính trên Gross Revenue, không phải Net Revenue. Hoàn trả 20% nghĩa là 20% doanh thu báo cáo không thực sự vào túi bạn."),
    b("rb23", "normal", "Nguyên nhân 2: Phân bổ sai - ROAS dashboard tính cả organic orders được touch bởi ads (view-through attribution). ROAS thực tế incremental thấp hơn nhiều."),
    b("rb24", "normal", "Nguyên nhân 3: ROAS campaign tốt nhưng ROAS tổng gian hàng thấp. Nếu bạn cut budget campaign ROAS 10x nhưng tổng ROAS còn 2x, có vấn đề với phần còn lại."),
    b("rb25", "h2", "Cách tính Break-even ROAS cho gian hàng của bạn"),
    b("rb26", "normal", "Bước 1: Biết Gross Margin% thực tế của sản phẩm đang chạy ads."),
    b("rb27", "normal", "Bước 2: Biết phí sàn% theo đúng ngành (dùng tool tính phí sàn để lấy số chính xác)."),
    b("rb28", "normal", "Bước 3: Biết tỷ lệ logistics% (ship + handling) thực tế."),
    b("rb29", "normal", "Bước 4: Break-even ROAS = 1 / (GM% - phí sàn% - logistics%)."),
    b("rb30", "normal", "Bước 5: Target ROAS = Break-even ROAS x 1.3-1.5 (để có 30-50% buffer cho fixed cost + profit)."),
    b("rb31", "h2", "Kết luận"),
    b("rb32", "normal", "Không có ROAS 'tốt' hay 'xấu' theo nghĩa tuyệt đối. Chỉ có ROAS cao hơn hay thấp hơn Break-even ROAS của ngành và margin cụ thể của bạn. Tính Break-even ROAS trước khi set target cho campaign - đây là bước không thể bỏ qua."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 4 - Bán hàng online cần chuẩn bị gì
══════════════════════════════════════════════════════════ */
const POST_START = {
  _id: "blog-ban-hang-online-can-chuan-bi-gi-truoc-khi-bat-dau",
  _type: "post",
  title: "Bán hàng online cần chuẩn bị gì? Checklist đầy đủ trước khi bắt đầu",
  slug: { _type: "slug", current: "ban-hang-online-can-chuan-bi-gi-truoc-khi-bat-dau" },
  publishedAt: "2026-05-14T21:00:00Z",
  category: "ecom",
  tags: ["ecom", "bán hàng online", "shopee", "tiktok", "fresher", "unit economics", "phi san"],
  excerpt: "Nhiều người bắt đầu bán hàng online mà chưa tính kỹ phí sàn, margin, logistics. Checklist này giúp bạn validate ý tưởng sản phẩm và setup gian hàng đúng cách ngay từ đầu.",
  body: [
    b("bs1", "normal", "Lỗi phổ biến nhất của người mới bán hàng online: tìm được sản phẩm, đặt hàng về, mở gian hàng - rồi mới phát hiện ra sau khi trừ phí sàn + ship + ads thì không còn margin để lãi. Checklist này giúp bạn tránh bẫy đó."),
    b("bs2", "h2", "Phần 1: Validate sản phẩm trước khi nhập hàng"),
    b("bs3", "h3", "1.1 Tính Unit Economics sơ bộ"),
    b("bs4", "normal", "Trước khi nhập hàng, tính thử:"),
    b("bs5", "normal", "- Giá bán dự kiến: bao nhiêu?"),
    b("bs6", "normal", "- Giá vốn: bao nhiêu? (bao gồm cả đóng gói)"),
    b("bs7", "normal", "- Gross Margin: (giá bán - giá vốn) / giá bán = ?%"),
    b("bs8", "normal", "- Phí sàn theo ngành: bao nhiêu%? (tra bảng hoặc dùng tool)"),
    b("bs9", "normal", "- Chi phí logistics dự kiến: bao nhiêu đồng/đơn?"),
    b("bs10", "normal", "- Contribution Margin sơ bộ: có dương không?"),
    b("bs11", "normal", "Nếu CM âm khi chưa tính ads, đừng nhập hàng. Không có cách nào ads profitable trên nền CM âm."),
    b("bs12", "h3", "1.2 Nghiên cứu đối thủ"),
    b("bs13", "normal", "Search sản phẩm trên Shopee và TikTok Shop. Xem top 5-10 seller: họ đang bán giá bao nhiêu, có bao nhiêu đánh giá, rating trung bình là gì, voucher đang offer là gì. Nếu thị trường đã quá cạnh tranh (>1000 seller, đối thủ hàng trăm nghìn reviews), khó chen vào trừ khi bạn có differentiation rõ ràng."),
    b("bs14", "h3", "1.3 Kiểm tra trend và seasonality"),
    b("bs15", "normal", "Google Trends và Shopee search insights cho biết sản phẩm đang trending hay declining. Sản phẩm seasonal (như quạt điện, áo khoác) cần tính kỹ timeline nhập hàng và giai đoạn bán cao điểm."),
    b("bs16", "h2", "Phần 2: Setup gian hàng đúng cách"),
    b("bs17", "h3", "2.1 Chọn platform phù hợp"),
    b("bs18", "normal", "Shopee: mạnh về organic search, phù hợp với sản phẩm người chủ động search. Traffic đến từ keyword search nhiều hơn."),
    b("bs19", "normal", "TikTok Shop: mạnh về discovery, phù hợp với sản phẩm visual và có story. Traffic đến từ content/video nhiều hơn."),
    b("bs20", "normal", "Gợi ý: bắt đầu với 1 platform, master xong rồi expand. Đừng dàn trải sức lực khi mới bắt đầu."),
    b("bs21", "h3", "2.2 Chuẩn bị hình ảnh sản phẩm"),
    b("bs22", "normal", "Ảnh chính: nền trắng, sản phẩm rõ nét, đúng tỷ lệ 1:1 cho Shopee. Ít nhất 3-5 ảnh với các góc độ khác nhau."),
    b("bs23", "normal", "Ảnh phụ: lifestyle shot (sản phẩm trong bối cảnh sử dụng thực tế), infographic về tính năng chính, ảnh so sánh kích thước."),
    b("bs24", "normal", "Video: TikTok Shop đặc biệt ưu tiên sản phẩm có video. 15-30 giây, bắt đầu bằng hook trong 3 giây đầu."),
    b("bs25", "h3", "2.3 Viết mô tả sản phẩm SEO"),
    b("bs26", "normal", "Title: bao gồm keyword chính (tên sản phẩm + phân loại + đặc điểm nổi bật). Không spam keyword."),
    b("bs27", "normal", "Mô tả: trả lời câu hỏi của khách - sản phẩm này dùng để làm gì, ai dùng, khác gì đối thủ, kích thước/thông số kỹ thuật."),
    b("bs28", "normal", "Category: chọn đúng category - ảnh hưởng đến phí sàn và khả năng hiển thị trong search."),
    b("bs29", "h2", "Phần 3: Operations - đừng underestimate"),
    b("bs30", "h3", "3.1 Warehouse và fulfillment"),
    b("bs31", "normal", "Tự ship: phù hợp khi volume dưới 20 đơn/ngày. Trên 20 đơn/ngày, thời gian pick & pack bắt đầu ảnh hưởng đến chất lượng cuộc sống và tốc độ xử lý."),
    b("bs32", "normal", "3PL (Third Party Logistics): thuê kho fulfillment để họ xử lý pick, pack, ship thay bạn. Chi phí 3-8k/đơn nhưng free up time để tập trung vào growth."),
    b("bs33", "h3", "3.2 Customer service"),
    b("bs34", "normal", "Tỷ lệ phản hồi và tốc độ phản hồi ảnh hưởng đến ranking trên Shopee. Target: phản hồi trong 1 giờ, tỷ lệ phản hồi >90%."),
    b("bs35", "normal", "Chuẩn bị template trả lời cho 10-15 câu hỏi phổ biến nhất. Tiết kiệm thời gian và đảm bảo chất lượng trả lời nhất quán."),
    b("bs36", "h2", "Phần 4: Tài chính và tracking"),
    b("bs37", "normal", "Setup từ ngày 1: spreadsheet track doanh thu, chi phí, tồn kho theo tuần. Không cần fancy - Google Sheets là đủ."),
    b("bs38", "normal", "Tách tài khoản kinh doanh: không trộn tiền kinh doanh với tiền cá nhân. Làm từ ngày đầu, không phải khi đã complicated."),
    b("bs39", "normal", "Review weekly: ít nhất 30 phút mỗi tuần nhìn vào số - doanh thu, CM, tỷ lệ hoàn trả, rating. Business không nhìn vào số là business đang chạy trong bóng tối."),
    b("bs40", "h2", "Kết luận"),
    b("bs41", "normal", "Bán hàng online không phức tạp, nhưng cần chuẩn bị đúng cách từ đầu. 1 ngày ngồi validate Unit Economics và research thị trường có thể tránh được 3-6 tháng bán thua lỗ. Đừng skip bước này."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 5 - Lương Net từ Gross 2026 - hướng dẫn chi tiết
══════════════════════════════════════════════════════════ */
const POST_NETGROSS = {
  _id: "blog-cach-tinh-luong-net-tu-gross-chi-tiet-2026",
  _type: "post",
  title: "Cách tính lương Net từ Gross 2026 chi tiết: Công thức + Ví dụ thực tế",
  slug: { _type: "slug", current: "cach-tinh-luong-net-tu-gross-chi-tiet-2026" },
  publishedAt: "2026-05-14T22:00:00Z",
  category: "tax",
  tags: ["lương net", "lương gross", "thuế TNCN", "BHXH", "tính lương", "2026"],
  excerpt: "Lương Gross 20 triệu thực nhận về bao nhiêu? Bài này giải thích từng bước tính lương Net từ Gross 2026, bao gồm BHXH, BHYT, BHTN và thuế TNCN theo biểu thuế lũy tiến mới nhất.",
  body: [
    b("ng1", "normal", "Khi nhận offer lương, hầu hết nhà tuyển dụng VN báo lương Gross - lương trước khi trừ các khoản bảo hiểm và thuế. Nhiều người nhận offer 20 triệu Gross nhưng thực nhận chỉ 16-17 triệu vì không biết cách tính."),
    b("ng2", "h2", "Gross và Net khác nhau như thế nào?"),
    b("ng3", "normal", "Lương Gross: lương ghi trên hợp đồng, là cơ sở tính các khoản khấu trừ."),
    b("ng4", "normal", "Lương Net: tiền thực nhận sau khi trừ BHXH, BHYT, BHTN (phần người lao động đóng) và thuế TNCN."),
    b("ng5", "h2", "Các khoản khấu trừ từ lương Gross"),
    b("ng6", "h3", "1. Bảo hiểm xã hội - BHXH (8%)"),
    b("ng7", "normal", "Người lao động đóng 8% lương Gross vào BHXH. Mức tối đa đóng BHXH: 20 x lương cơ sở (2026 = 2.340.000đ) = 46.800.000đ/tháng. Nếu lương Gross dưới 46.8 triệu, đóng đủ 8%."),
    b("ng8", "h3", "2. Bảo hiểm y tế - BHYT (1.5%)"),
    b("ng9", "normal", "Người lao động đóng 1.5% lương Gross vào BHYT. Mức trần tương tự BHXH."),
    b("ng10", "h3", "3. Bảo hiểm thất nghiệp - BHTN (1%)"),
    b("ng11", "normal", "Người lao động đóng 1% lương Gross vào BHTN. Mức tối đa: 20 x lương cơ sở."),
    b("ng12", "normal", "Tổng BHXH + BHYT + BHTN = 10.5% lương Gross."),
    b("ng13", "h3", "4. Thuế TNCN (0-35% lũy tiến)"),
    b("ng14", "normal", "Thuế TNCN tính trên Thu nhập chịu thuế = Lương Gross - BHXH/BHYT/BHTN - Giảm trừ gia cảnh."),
    b("ng15", "normal", "Giảm trừ bản thân: 11.000.000đ/tháng."),
    b("ng16", "normal", "Giảm trừ người phụ thuộc: 4.400.000đ/tháng/người."),
    b("ng17", "h2", "Biểu thuế TNCN lũy tiến 2026"),
    b("ng18", "normal", "Bậc 1: Thu nhập chịu thuế 0 - 5 triệu -> thuế suất 5%"),
    b("ng19", "normal", "Bậc 2: 5 - 10 triệu -> thuế suất 10%"),
    b("ng20", "normal", "Bậc 3: 10 - 18 triệu -> thuế suất 15%"),
    b("ng21", "normal", "Bậc 4: 18 - 32 triệu -> thuế suất 20%"),
    b("ng22", "normal", "Bậc 5: 32 - 52 triệu -> thuế suất 25%"),
    b("ng23", "normal", "Bậc 6: 52 - 80 triệu -> thuế suất 30%"),
    b("ng24", "normal", "Bậc 7: Trên 80 triệu -> thuế suất 35%"),
    b("ng25", "h2", "Ví dụ tính lương Net từ Gross 20 triệu"),
    b("ng26", "normal", "Giả sử: Gross 20 triệu, không có người phụ thuộc."),
    b("ng27", "normal", "Bước 1: Tính các khoản bảo hiểm."),
    b("ng28", "normal", "BHXH 8%: 20.000.000 x 8% = 1.600.000đ"),
    b("ng29", "normal", "BHYT 1.5%: 20.000.000 x 1.5% = 300.000đ"),
    b("ng30", "normal", "BHTN 1%: 20.000.000 x 1% = 200.000đ"),
    b("ng31", "normal", "Tổng BH: 2.100.000đ"),
    b("ng32", "normal", "Bước 2: Thu nhập trước thuế = 20.000.000 - 2.100.000 = 17.900.000đ"),
    b("ng33", "normal", "Bước 3: Thu nhập chịu thuế = 17.900.000 - 11.000.000 (giảm trừ bản thân) = 6.900.000đ"),
    b("ng34", "normal", "Bước 4: Tính thuế TNCN lũy tiến:"),
    b("ng35", "normal", "- 5 triệu đầu x 5% = 250.000đ"),
    b("ng36", "normal", "- 1.9 triệu tiếp x 10% = 190.000đ"),
    b("ng37", "normal", "Thuế TNCN: 440.000đ"),
    b("ng38", "normal", "Bước 5: Lương Net = 20.000.000 - 2.100.000 - 440.000 = 17.460.000đ"),
    b("ng39", "blockquote", "Gross 20 triệu -> Net thực nhận ~17.46 triệu (tỷ lệ khấu trừ 12.7%)"),
    b("ng40", "h2", "Ví dụ lương Gross 30 triệu"),
    b("ng41", "normal", "Tổng BH: 30.000.000 x 10.5% = 3.150.000đ"),
    b("ng42", "normal", "Thu nhập chịu thuế: 30.000.000 - 3.150.000 - 11.000.000 = 15.850.000đ"),
    b("ng43", "normal", "Thuế TNCN: 5tr x 5% + 5tr x 10% + 5.85tr x 15% = 250k + 500k + 877.5k = 1.627.500đ"),
    b("ng44", "normal", "Net: 30.000.000 - 3.150.000 - 1.627.500 = 25.222.500đ"),
    b("ng45", "blockquote", "Gross 30 triệu -> Net ~25.2 triệu (tỷ lệ khấu trừ 16%)"),
    b("ng46", "h2", "Cách tính nhanh không cần tính tay"),
    b("ng47", "normal", "Thay vì tính tay theo từng bước, bạn có thể dùng tool tính thuế TNCN miễn phí để nhập lương Gross và nhận ngay kết quả Net, bao gồm breakdown từng khoản khấu trừ. Tool cũng cho phép thêm số người phụ thuộc để tính chính xác."),
    b("ng48", "h2", "Kết luận"),
    b("ng49", "normal", "Lương Net thường thấp hơn Gross 10-20% tùy mức lương. Khi nhận offer, luôn hỏi rõ là Gross hay Net, hoặc tự tính để không bị ngạc nhiên khi nhận lương tháng đầu tiên."),
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

  const posts = [POST_TIKTOK_FEE, POST_MALL, POST_ROAS_BENCH, POST_START, POST_NETGROSS];
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
