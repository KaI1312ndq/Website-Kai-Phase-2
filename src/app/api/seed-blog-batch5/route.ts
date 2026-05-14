import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

/**
 * Seed batch 5 - 5 bài blog:
 * 1. Unit Economics ecom là gì - framework 5 tầng
 * 2. Tại sao scale ads mà lợi nhuận không tăng - LTV vs CAC
 * 3. Flash sale Shopee có thực sự có lợi không - phân tích chi phí
 * 4. MBTI trong công việc - 4 nhóm tính cách phù hợp với marketing nào
 * 5. Làm ecom có cần biết code không - trả lời thẳng
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
   POST 1 - Unit Economics ecom framework 5 tầng
══════════════════════════════════════════════════════════ */
const POST_UE = {
  _id: "blog-unit-economics-ecom-framework-5-tang",
  _type: "post",
  title: "Unit Economics Ecom: Framework 5 tầng để biết gian hàng có thực sự lãi không",
  slug: { _type: "slug", current: "unit-economics-ecom-framework-5-tang" },
  publishedAt: "2026-05-14T13:00:00Z",
  category: "Unit Economics",
  tags: ["unit economics", "p&l", "contribution margin", "ecom", "phi san", "shopee", "tiktok", "loi nhuan"],
  excerpt: "Unit Economics là bộ chỉ số đo lợi nhuận tại cấp độ từng đơn hàng, từng sản phẩm. Framework 5 tầng này giúp bạn nhìn rõ tiền chảy vào và ra ở đâu - trước khi quyết định scale hay dừng.",
  body: [
    b("ue1", "normal", "Rất nhiều gian hàng Shopee/TikTok báo cáo doanh thu tốt nhưng cuối tháng tài khoản không có tiền. Unit Economics - kinh tế học từng đơn vị - là công cụ để bóc tách xem tiền thực sự chảy về đâu."),
    b("ue2", "h2", "Unit Economics là gì?"),
    b("ue3", "normal", "Unit Economics là tập hợp các chỉ số tài chính đo lường lợi nhuận tại cấp độ một đơn vị - có thể là một đơn hàng, một sản phẩm, hoặc một khách hàng. Khi bạn hiểu Unit Economics của mình, bạn biết chính xác: mỗi đơn hàng mình lãi hay lỗ bao nhiêu trước khi tính chi phí cố định."),
    b("ue4", "h2", "Framework 5 tầng - từ Revenue xuống EBITDA"),
    b("ue5", "h3", "Tầng 1: Gross Revenue (Doanh thu gộp)"),
    b("ue6", "normal", "Tổng tiền khách trả trước mọi loại phí và hoàn trả. Con số này nhìn đẹp nhất nhưng ít thực tế nhất. Đừng bao giờ dùng Gross Revenue để đánh giá hiệu quả."),
    b("ue7", "h3", "Tầng 2: Net Revenue (Doanh thu thuần)"),
    b("ue8", "normal", "Gross Revenue - Voucher/Discount - Hoàn trả. Đây là tiền thực sự chảy vào gian hàng. Tỷ lệ hoàn trả 15-25% ở ngành thời trang có thể làm Net Revenue thấp hơn Gross Revenue đáng kể."),
    b("ue9", "h3", "Tầng 3: Gross Profit (Lợi nhuận gộp)"),
    b("ue10", "normal", "Net Revenue - COGS. COGS bao gồm giá vốn hàng hoá + đóng gói. Gross Margin = Gross Profit / Net Revenue. Với ecom, Gross Margin dưới 40% thường khó có Net Margin dương."),
    b("ue11", "h3", "Tầng 4: Contribution Margin (Lợi nhuận đóng góp)"),
    b("ue12", "normal", "Gross Profit - Phí sàn - Chi phí logistics - Chi phí ads trực tiếp. Đây là tầng quan trọng nhất để quyết định có nên scale một sản phẩm hay không. CM dương = mỗi đơn hàng đang có lãi trước fixed cost."),
    b("ue13", "normal", "Ví dụ nhanh: Net Revenue 200k, COGS 80k, phí sàn Shopee Mall 17% = 34k, ship 15k, ads 25k. CM = 200 - 80 - 34 - 15 - 25 = 46k (23%). Mỗi đơn lãi 46k - khả thi để scale."),
    b("ue14", "h3", "Tầng 5: EBITDA (Lợi nhuận trước thuế, lãi, khấu hao)"),
    b("ue15", "normal", "Tổng Contribution Margin - Fixed Cost (lương team, kho, phần mềm, văn phòng). Đây là số cho biết business tổng thể có lãi không. Khi scale, Fixed Cost tăng chậm hơn Revenue - đây là lý do tại sao scale có lợi nếu CM% đủ cao."),
    b("ue16", "h2", "Ví dụ thực tế: So sánh 2 gian hàng"),
    b("ue17", "h3", "Gian hàng A: Doanh thu 500 triệu, nhìn impressive"),
    b("ue18", "normal", "Gross Revenue: 500 triệu. Hoàn trả 20%: -100 triệu. Net Revenue: 400 triệu."),
    b("ue19", "normal", "COGS 50%: -200 triệu. Gross Profit: 200 triệu (50%)."),
    b("ue20", "normal", "Phí sàn 18%: -72 triệu. Ship 8%: -32 triệu. Ads 20%: -80 triệu."),
    b("ue21", "normal", "Contribution Margin: 200 - 72 - 32 - 80 = 16 triệu (4%). Rất mỏng."),
    b("ue22", "normal", "Fixed cost 30 triệu -> EBITDA: -14 triệu. Lỗ dù doanh thu 500 triệu!"),
    b("ue23", "h3", "Gian hàng B: Doanh thu 200 triệu, nhìn bình thường"),
    b("ue24", "normal", "Gross Revenue: 200 triệu. Hoàn trả 5%: -10 triệu. Net Revenue: 190 triệu."),
    b("ue25", "normal", "COGS 35%: -66.5 triệu. Gross Profit: 123.5 triệu (65%)."),
    b("ue26", "normal", "Phí sàn 12%: -22.8 triệu. Ship 6%: -11.4 triệu. Ads 10%: -19 triệu."),
    b("ue27", "normal", "Contribution Margin: 123.5 - 22.8 - 11.4 - 19 = 70.3 triệu (37%). Rất tốt."),
    b("ue28", "normal", "Fixed cost 25 triệu -> EBITDA: 45.3 triệu (23.8%). Lãi thực tế."),
    b("ue29", "h2", "3 sai lầm Unit Economics phổ biến nhất"),
    b("ue30", "normal", "1. Không tính phí hoàn trả vào COGS hoặc logistics: mỗi đơn hoàn = mất 2 lần ship + công xử lý."),
    b("ue31", "normal", "2. Dùng phí sàn mặc định không đúng ngành: sai 5-8 điểm % là sai toàn bộ Unit Economics."),
    b("ue32", "normal", "3. Phân bổ ads tổng đều cho mọi sản phẩm: hero product tiêu 80% ads budget - nếu không tách, CM theo SKU sẽ sai."),
    b("ue33", "h2", "Công cụ tính Unit Economics nhanh"),
    b("ue34", "normal", "Bước 1: Dùng tool tính phí sàn để lấy số chính xác theo ngành hàng thực tế của bạn."),
    b("ue35", "normal", "Bước 2: Nhập vào mẫu P&L ecom 5 tầng để tính từng tầng tự động."),
    b("ue36", "normal", "Bước 3: Phân tích theo từng SKU, không tổng hợp - sản phẩm tốt và xấu sẽ triệt tiêu nhau trong số tổng."),
    b("ue37", "h2", "Kết luận"),
    b("ue38", "normal", "Unit Economics không phải là công việc của kế toán - đây là framework tư duy mà mọi người làm ecom cần có. Biết CM% của từng sản phẩm trước khi scale là sự khác biệt giữa người kiếm tiền thực và người chạy doanh số ảo."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 2 - Scale ads mà lợi nhuận không tăng - LTV vs CAC
══════════════════════════════════════════════════════════ */
const POST_LTV = {
  _id: "blog-scale-ads-loi-nhuan-khong-tang-ltv-cac",
  _type: "post",
  title: "Tại sao scale ads mà lợi nhuận không tăng? Vấn đề LTV vs CAC",
  slug: { _type: "slug", current: "scale-ads-loi-nhuan-khong-tang-ltv-cac" },
  publishedAt: "2026-05-14T14:00:00Z",
  category: "performance",
  tags: ["ads", "roas", "ltv", "cac", "performance marketing", "ecom", "scale", "tiktok", "shopee"],
  excerpt: "Bạn tăng budget ads gấp đôi nhưng lợi nhuận không tăng - thậm chí giảm? Đây là vấn đề LTV vs CAC. Bài này giải thích tại sao điều đó xảy ra và cách fix để scale có lãi.",
  body: [
    b("ltv1", "normal", "Một trong những bẫy phổ biến nhất trong ecom: doanh nghiệp tăng budget ads 3x, doanh thu tăng 2.5x, nhưng lợi nhuận ròng lại thấp hơn tháng trước. Cảm giác như chạy càng nhanh càng mệt hơn."),
    b("ltv2", "h2", "LTV và CAC là gì?"),
    b("ltv3", "h3", "CAC - Customer Acquisition Cost"),
    b("ltv4", "blockquote", "CAC = Tổng chi phí marketing & sales / Số khách hàng mới"),
    b("ltv5", "normal", "Ví dụ: Chi 100 triệu ads trong tháng, thu được 500 khách hàng mới. CAC = 200.000đ/khách."),
    b("ltv6", "h3", "LTV - Lifetime Value (Giá trị vòng đời khách hàng)"),
    b("ltv7", "blockquote", "LTV = Average Order Value x Purchase Frequency x Customer Lifespan x Gross Margin%"),
    b("ltv8", "normal", "Ví dụ: Khách trung bình mua 300.000đ/lần, mua 3 lần/năm, gắn bó 2 năm, Gross Margin 50%. LTV = 300.000 x 3 x 2 x 50% = 900.000đ."),
    b("ltv9", "h2", "Tỷ lệ LTV:CAC - thước đo sức khoẻ business"),
    b("ltv10", "normal", "LTV:CAC < 1:1: Bạn đang mất tiền với mỗi khách hàng mới. Business không sustainable."),
    b("ltv11", "normal", "LTV:CAC = 2:1 - 3:1: Vùng có thể hoạt động, nhưng chưa đủ để scale mạnh."),
    b("ltv12", "normal", "LTV:CAC > 3:1: Healthy - có thể tăng budget ads mà biết chắc sẽ có lợi nhuận."),
    b("ltv13", "normal", "LTV:CAC > 5:1: Excellent, nhưng cũng có nghĩa bạn đang under-invest vào growth."),
    b("ltv14", "h2", "Tại sao scale ads mà lợi nhuận không tăng?"),
    b("ltv15", "h3", "Nguyên nhân 1: CAC tăng theo quy mô (Diminishing Returns)"),
    b("ltv16", "normal", "Khi bạn tăng budget ads, thuật toán phải tìm thêm audience mới - những người ít có khả năng mua hơn audience core ban đầu. Kết quả: CPM tăng, CVR giảm, CAC leo thang. Budget tăng 2x nhưng khách hàng mới chỉ tăng 1.5x."),
    b("ltv17", "h3", "Nguyên nhân 2: LTV thấp vì retention kém"),
    b("ltv18", "normal", "Nếu khách mua 1 lần rồi không quay lại, LTV của bạn gần bằng Average Order Value lần đầu. Với margin thấp, rất khó để CAC < LTV. Đây là vấn đề của nhiều gian hàng chỉ focus vào new customer mà ignore repeat purchase."),
    b("ltv19", "h3", "Nguyên nhân 3: Attribution sai làm tưởng ROAS cao"),
    b("ltv20", "normal", "Nhiều seller đo ROAS trong cửa sổ attribution 7 ngày. Nhưng khi scale, ads bắt đầu touch những khách hàng đang trong journey mua dài hơn - và conversion rate thực tế thấp hơn số báo cáo. Kết quả: ROAS dashboard trông tốt nhưng revenue thực không tương ứng."),
    b("ltv21", "h2", "Cách fix để scale có lãi"),
    b("ltv22", "h3", "Fix 1: Tính Break-even CAC trước khi scale"),
    b("ltv23", "normal", "Break-even CAC = LTV x tỷ lệ lợi nhuận target. Nếu LTV của bạn là 600k và bạn muốn margin 30%, Break-even CAC là 420k. Khi budget tăng và CAC vượt 420k, dừng scale."),
    b("ltv24", "h3", "Fix 2: Tăng LTV song song với scale"),
    b("ltv25", "normal", "Giảm phụ thuộc vào new customer acquisition bằng cách tăng repeat purchase. Email/Zalo OA follow-up, loyalty program, upsell/cross-sell. Tăng LTV 20% cho phép CAC cao hơn 20% - mở rộng room scale đáng kể."),
    b("ltv26", "h3", "Fix 3: Segment audience theo LTV dự báo"),
    b("ltv27", "normal", "Không phải mọi khách hàng đều có LTV như nhau. Khách từ channel organic, referral thường LTV cao hơn khách từ paid ads 1.5-2x. Đầu tư ads vào lookalike của high-LTV customer thay vì toàn bộ audience."),
    b("ltv28", "h2", "Bài kiểm tra nhanh cho gian hàng của bạn"),
    b("ltv29", "normal", "1. Tỷ lệ khách mua lần 2 trong 60 ngày là bao nhiêu? Nếu dưới 15% - retention là vấn đề cần fix trước khi scale."),
    b("ltv30", "normal", "2. CAC của bạn đang ở đâu so với Gross Profit lần đầu? Nếu CAC > Gross Profit đơn đầu - bạn đang lỗ ngay từ đơn hàng đầu tiên, chỉ có thể recover nếu khách quay lại."),
    b("ltv31", "normal", "3. ROAS target của bạn có tính đến full margin chain không? ROAS 4x với margin 25% nghĩa là sau phí sàn + ads + ship, bạn chỉ còn 0% contribution margin."),
    b("ltv32", "h2", "Kết luận"),
    b("ltv33", "normal", "Scale ads mà không có LTV:CAC > 3:1 là đổ tiền ra cửa sổ nhanh hơn. Trước khi tăng budget, hãy chắc chắn retention engine hoạt động và bạn biết chính xác Break-even CAC của mình."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 3 - Flash sale Shopee có lợi không
══════════════════════════════════════════════════════════ */
const POST_FLASH = {
  _id: "blog-flash-sale-shopee-co-thuc-su-co-loi-khong",
  _type: "post",
  title: "Flash Sale Shopee có thực sự có lợi không? Phân tích chi phí thực tế",
  slug: { _type: "slug", current: "flash-sale-shopee-co-thuc-su-co-loi-khong" },
  publishedAt: "2026-05-14T15:00:00Z",
  category: "shopee",
  tags: ["shopee", "flash sale", "phi san", "ecom", "unit economics", "voucher", "phi hoa hong"],
  excerpt: "Flash sale giúp tăng doanh số nhanh nhưng margin có thể về 0 hoặc âm nếu không tính đúng. Bài này breakdown tất cả chi phí ẩn của flash sale Shopee để bạn quyết định có nên tham gia không.",
  body: [
    b("fs1", "normal", "Flash sale là một trong những công cụ mạnh nhất để tăng visibility và velocity trên Shopee. Nhưng rất nhiều seller tham gia flash sale mà không tính được chi phí thực - và ngạc nhiên khi thấy tháng flash sale nhiều lại là tháng lỗ nhất."),
    b("fs2", "h2", "Các loại chi phí trong flash sale Shopee"),
    b("fs3", "h3", "1. Discount trực tiếp (giảm giá sản phẩm)"),
    b("fs4", "normal", "Flash sale thường yêu cầu giảm tối thiểu 15-30% so với giá gốc. Nếu Gross Margin của bạn là 40%, giảm 25% nghĩa là bạn đã cắt đi hơn nửa Gross Profit trước khi tính bất kỳ chi phí nào khác."),
    b("fs5", "h3", "2. Phí hoa hồng sàn (tăng khi flash sale)"),
    b("fs6", "normal", "Phí hoa hồng Shopee tính trên giá bán sau khi đã giảm, không phải giá gốc. Nhưng một số campaign flash sale lớn (11.11, 12.12) có thể yêu cầu voucher thêm từ seller - đây là chi phí cộng vào."),
    b("fs7", "h3", "3. Phí voucher platform + voucher seller"),
    b("fs8", "normal", "Shopee thường match voucher - nếu seller offer 10% off, Shopee có thể thêm 5-10% nữa. Phần Shopee subsidise thường không phải seller chịu. Nhưng phần Shopee yêu cầu seller co-fund thì phải tính rõ."),
    b("fs9", "h3", "4. Chi phí logistics tăng"),
    b("fs10", "normal", "Flash sale tạo spike đơn hàng - warehouse có thể không kịp pick & pack, cần thuê thêm nhân công tạm thời hoặc trả overtime. Chi phí logistics thực tế trong flash sale thường cao hơn ngày thường 20-40%."),
    b("fs11", "h3", "5. Tỷ lệ hoàn trả tăng sau flash sale"),
    b("fs12", "normal", "Khách mua impulsive trong flash sale hoàn hàng nhiều hơn. Ngành thời trang, phụ kiện có thể thấy tỷ lệ hoàn tăng 30-50% so với baseline sau một flash sale lớn."),
    b("fs13", "h2", "Ví dụ tính chi phí flash sale thực tế"),
    b("fs14", "normal", "Sản phẩm giá gốc 300.000đ, giá vốn 120.000đ (Gross Margin 60%)."),
    b("fs15", "normal", "Flash sale: giảm 25% -> giá bán 225.000đ."),
    b("fs16", "normal", "Net Revenue sau hoàn trả 10%: 225.000 x 0.9 = 202.500đ."),
    b("fs17", "normal", "Phí hoa hồng Non-Mall 10.5% x 202.500 = 21.263đ."),
    b("fs18", "normal", "Chi phí logistics (ship + xử lý): 20.000đ."),
    b("fs19", "normal", "Contribution Margin = 202.500 - 120.000 - 21.263 - 20.000 = 41.237đ (20.4%)."),
    b("fs20", "normal", "Vs ngày thường không flash sale:"),
    b("fs21", "normal", "Net Revenue 300.000 x 0.97 = 291.000đ. Phí 10.5% x 291.000 = 30.555đ. Logistics 18.000đ."),
    b("fs22", "normal", "CM = 291.000 - 120.000 - 30.555 - 18.000 = 122.445đ (42.1%)."),
    b("fs23", "normal", "Flash sale giúp tăng volume nhưng CM giảm từ 122k xuống 41k - giảm 66% trên mỗi đơn. Bạn cần bán 3x đơn hàng để có cùng lợi nhuận tổng."),
    b("fs24", "h2", "Khi nào flash sale thực sự có lợi?"),
    b("fs25", "h3", "1. Clear tồn kho"),
    b("fs26", "normal", "Hàng tồn kho lâu ngày có chi phí cơ hội (tiền vốn bị tied up) và chi phí kho bãi. Flash sale để clear tồn kho là quyết định đúng dù margin thấp - tốt hơn là hàng chết."),
    b("fs27", "h3", "2. Launch sản phẩm mới - tăng review"),
    b("fs28", "normal", "Sản phẩm mới cần velocity để algorithm Shopee rank cao hơn. Chấp nhận lỗ hoặc hòa vốn trong 1-2 tháng đầu để tích lũy review và sales rank. Sau đó recover margin khi đã có momentum."),
    b("fs29", "h3", "3. Tăng LTV bằng first-purchase deal"),
    b("fs30", "normal", "Nếu LTV của khách hàng từ flash sale đủ cao (mua lại nhiều lần), chấp nhận CM thấp hoặc âm ở đơn đầu có thể là chiến lược đúng - giống mô hình 'loss leader'. Nhưng cần có data retention để validate."),
    b("fs31", "h2", "Checklist trước khi đăng ký flash sale"),
    b("fs32", "normal", "- Tính CM tại mức giá flash sale: CM có dương không?"),
    b("fs33", "normal", "- Nếu CM âm: mục tiêu là gì? Clear tồn kho / launch / acquire khách?"),
    b("fs34", "normal", "- Warehouse có handle được volume tăng đột biến không?"),
    b("fs35", "normal", "- Đã tính phí co-fund voucher seller chưa?"),
    b("fs36", "normal", "- Tỷ lệ hoàn trả dự kiến tăng bao nhiêu?"),
    b("fs37", "h2", "Kết luận"),
    b("fs38", "normal", "Flash sale không phải luôn luôn có lợi và không phải luôn luôn có hại. Nó là công cụ chiến lược - chỉ có lợi khi bạn biết rõ mình đang đánh đổi gì. Tính CM trước khi submit, không chạy theo volume thuần."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 4 - MBTI trong công việc marketing
══════════════════════════════════════════════════════════ */
const POST_MBTI = {
  _id: "blog-mbti-trong-cong-viec-marketing-ecom",
  _type: "post",
  title: "MBTI trong công việc Marketing: 4 nhóm tính cách phù hợp với role nào?",
  slug: { _type: "slug", current: "mbti-trong-cong-viec-marketing-ecom" },
  publishedAt: "2026-05-14T16:00:00Z",
  category: "psychology",
  tags: ["mbti", "tính cách", "personality", "career", "marketing", "career path", "intj", "enfp"],
  excerpt: "MBTI không phải chìa khóa vạn năng nhưng hiểu nhóm tính cách giúp bạn chọn đúng role marketing phù hợp. Bài này map 16 kiểu MBTI vào 4 nhóm role thực tế trong ngành ecom & marketing.",
  body: [
    b("mb1", "normal", "Tôi không phải tín đồ MBTI - khoa học về độ tin cậy của nó vẫn còn tranh luận. Nhưng với mục đích self-reflection và career exploration, MBTI là công cụ hữu ích để bạn hiểu mình làm việc tốt nhất trong môi trường nào."),
    b("mb2", "h2", "4 nhóm role marketing theo tính cách"),
    b("mb3", "h3", "Nhóm 1: THE ANALYST - Performance Marketing & Data"),
    b("mb4", "normal", "MBTI phổ biến: INTJ, ISTJ, INTP, ENTJ"),
    b("mb5", "normal", "Đặc điểm chung: thích làm việc với số liệu, tư duy logic, ra quyết định dựa trên evidence, không bị ảnh hưởng bởi cảm xúc khi phân tích."),
    b("mb6", "normal", "Role phù hợp: Performance Marketer, Growth Analyst, Marketing Data Analyst, Ecom Operations."),
    b("mb7", "normal", "Điểm mạnh: optimize campaign liên tục, phát hiện insight từ data mà người khác bỏ qua, ra quyết định scale/pause nhanh và chính xác."),
    b("mb8", "normal", "Cẩn thận: có thể bỏ qua yếu tố creative/emotional trong marketing - cần partner với Communicator hoặc Creator để balance."),
    b("mb9", "h3", "Nhóm 2: THE COMMUNICATOR - Content & Social Media"),
    p("mb10", [
      { text: "MBTI phổ biến: " },
      { text: "ENFJ, ESFJ, ENFP, ESFP", bold: true },
    ]),
    b("mb11", "normal", "Đặc điểm chung: giỏi kết nối cảm xúc, hiểu audience, kể chuyện tốt, thích tương tác và feedback loop."),
    b("mb12", "normal", "Role phù hợp: Content Creator, Social Media Manager, Community Manager, Influencer Marketing."),
    b("mb13", "normal", "Điểm mạnh: tạo content resonates mạnh với audience, build community tốt, nhạy với trend và mood của thị trường."),
    b("mb14", "normal", "Cẩn thận: có thể ưu tiên engagement hơn conversion - cần anchor mọi hoạt động vào business metric thực tế."),
    b("mb15", "h3", "Nhóm 3: THE CREATOR - Brand & Creative"),
    p("mb16", [
      { text: "MBTI phổ biến: " },
      { text: "INFP, ISFP, INFJ, ENTP", bold: true },
    ]),
    b("mb17", "normal", "Đặc điểm chung: tư duy hình ảnh, quan tâm đến ý nghĩa và narrative, thích xây dựng thứ gì đó có chiều sâu, không thích làm việc lặp lại."),
    b("mb18", "normal", "Role phù hợp: Brand Strategist, Creative Director, Visual Designer, Copywriter, UX Writer."),
    b("mb19", "normal", "Điểm mạnh: tạo ra brand positioning sắc nét, viết copy có cảm xúc và thuyết phục, thiết kế visual identity nhất quán."),
    b("mb20", "normal", "Cẩn thận: có thể perfectionist và chậm trong môi trường đòi hỏi execution nhanh như ecom. Cần học 'done is better than perfect' cho một số deliverable."),
    b("mb21", "h3", "Nhóm 4: THE BUILDER - Product & Operations"),
    p("mb22", [
      { text: "MBTI phổ biến: " },
      { text: "ESTJ, ESTP, ISTP, ENTJ", bold: true },
    ]),
    b("mb23", "normal", "Đặc điểm chung: thực dụng, action-oriented, giỏi xử lý nhiều moving parts cùng lúc, thích thấy kết quả tangible."),
    b("mb24", "normal", "Role phù hợp: Ecom Manager, Product Marketing, Go-to-Market, Campaign Manager, Head of Growth."),
    b("mb25", "normal", "Điểm mạnh: execute campaign đúng deadline, coordinate giữa nhiều team, tối ưu process và workflow."),
    b("mb26", "normal", "Cẩn thận: có thể bỏ qua strategic thinking và long-term brand building vì quá focus vào short-term execution."),
    b("mb27", "h2", "MBTI không quyết định số phận career của bạn"),
    b("mb28", "normal", "Nhiều người đọc MBTI rồi tự hạn chế: 'Mình là INFP nên không hợp với Performance Marketing.' Đây là misconception nguy hiểm."),
    b("mb29", "normal", "MBTI mô tả xu hướng tự nhiên, không phải giới hạn. Một INFP với kỷ luật học data và analytical thinking hoàn toàn có thể thành công trong Performance Marketing - thậm chí còn bring góc nhìn creative unique mà pure analyst thiếu."),
    b("mb30", "normal", "Dùng MBTI như la bàn định hướng, không phải như bức tường giới hạn."),
    b("mb31", "h2", "Bài test xác định nhóm của bạn"),
    b("mb32", "normal", "Nếu chưa biết MBTI của mình, làm bài test 70 câu chuẩn quốc tế sẽ giúp bạn xác định 1 trong 16 kiểu tính cách. Từ đó map vào 4 nhóm role trên để có starting point cho career exploration."),
    b("mb33", "h2", "Kết luận"),
    b("mb34", "normal", "Hiểu tính cách giúp bạn chọn môi trường làm việc phù hợp, không phải chọn giới hạn. Điều quan trọng hơn MBTI là bạn có portfolio thực tế, có kỹ năng đo lường được, và có curiosity để liên tục học hỏi."),
  ],
};

/* ══════════════════════════════════════════════════════════
   POST 5 - Làm ecom có cần biết code không
══════════════════════════════════════════════════════════ */
const POST_CODE = {
  _id: "blog-lam-ecom-co-can-biet-code-khong",
  _type: "post",
  title: "Làm Ecom có cần biết code không? Trả lời thẳng cho người mới",
  slug: { _type: "slug", current: "lam-ecom-co-can-biet-code-khong" },
  publishedAt: "2026-05-14T17:00:00Z",
  category: "ecom",
  tags: ["ecom", "career", "fresher", "junior", "shopee", "tiktok", "career path"],
  excerpt: "Câu hỏi nhiều người mới lo lắng khi bắt đầu career trong ecom. Câu trả lời ngắn: không cần biết code, nhưng biết một số kỹ năng kỹ thuật cơ bản sẽ cho bạn lợi thế đáng kể.",
  body: [
    b("ec1", "normal", "Đây là một trong những câu hỏi tôi nhận nhiều nhất: 'Tôi muốn làm ecom/marketing nhưng không biết code, có ổn không?' Câu trả lời thẳng: hoàn toàn ổn. Nhưng câu trả lời đầy đủ thì phức tạp hơn một chút."),
    b("ec2", "h2", "Câu trả lời ngắn"),
    b("ec3", "normal", "90% role trong ecom và marketing không yêu cầu biết code. Seller, performance marketer, content creator, brand manager, ecom ops - không ai trong số này cần viết code mỗi ngày."),
    b("ec4", "h2", "Kỹ năng kỹ thuật nào thực sự hữu ích (không cần code)?"),
    b("ec5", "h3", "1. Excel/Google Sheets - BẮT BUỘC"),
    b("ec6", "normal", "Không phải code, nhưng là kỹ năng kỹ thuật nền tảng. VLOOKUP, INDEX MATCH, SUMIF, pivot table, basic chart - mọi người làm ecom đều cần. Nếu bạn chưa proficient, đây là skill cần fix ngay lập tức."),
    b("ec7", "h3", "2. SQL cơ bản - nên có nếu làm analytics"),
    b("ec8", "normal", "SELECT, WHERE, GROUP BY, JOIN - 4 khái niệm này đủ để query data từ database và tự pull report mà không cần xin dev. Học trong 2-4 tuần. Nếu bạn làm Growth hoặc Analytics, SQL là investment đáng giá nhất."),
    b("ec9", "h3", "3. Google Analytics 4 và Pixel tracking"),
    b("ec10", "normal", "Không cần implement (dev làm), nhưng cần biết đọc report và hiểu attribution model. Đây không phải code - đây là product literacy."),
    b("ec11", "h3", "4. No-code tools (Zapier, Make, Notion, Airtable)"),
    b("ec12", "normal", "Automation đơn giản, workflow building, database management - tất cả không cần code. Người biết dùng tốt no-code tools tăng productivity 30-50% so với người không biết."),
    b("ec13", "h2", "Khi nào biết code thực sự cho bạn lợi thế?"),
    b("ec14", "h3", "Role: Technical Marketing / Marketing Ops"),
    b("ec15", "normal", "Nếu bạn muốn làm Marketing Technology, implement tracking, build automation phức tạp - Python cơ bản và JavaScript cơ bản sẽ mở ra cánh cửa mà 95% marketer không vào được. Đây là role hiếm và lương rất cao."),
    b("ec16", "h3", "Build product của riêng mình"),
    b("ec17", "normal", "Nếu bạn muốn build landing page custom, tool nhỏ, hoặc MVP của một sản phẩm ecom riêng - biết code HTML/CSS cơ bản và JavaScript sẽ tiết kiệm đáng kể chi phí thuê dev cho version đầu."),
    b("ec18", "h3", "Ecom D2C với website riêng (Shopify)"),
    b("ec19", "normal", "Shopify không cần code để vận hành, nhưng biết Liquid template language giúp bạn customize không giới hạn mà không phụ thuộc vào dev. Với D2C brand nghiêm túc, đây là skill đáng đầu tư."),
    b("ec20", "h2", "Lộ trình nếu bạn muốn thêm kỹ năng kỹ thuật (không coding)"),
    b("ec21", "normal", "Tháng 1-2: Master Excel/Sheets - VLOOKUP, pivot table, dashboard cơ bản."),
    b("ec22", "normal", "Tháng 3-4: Google Analytics 4 certification miễn phí + Shopee/TikTok Ads Manager basics."),
    b("ec23", "normal", "Tháng 5-6: SQL cơ bản - học qua Mode Analytics Tutorial hoặc SQLZoo, hoàn toàn miễn phí."),
    b("ec24", "normal", "Tháng 7+: Nếu muốn đi sâu hơn - Python for data analysis (pandas cơ bản) hoặc Shopify Liquid tùy theo hướng career."),
    b("ec25", "h2", "Misconception phổ biến nhất"),
    b("ec26", "normal", "Misconception 1: 'AI sẽ làm thay hết, không cần học gì kỹ thuật.' Sai. AI là tool - người biết dùng AI tốt vẫn cần hiểu underlying logic để prompt và verify kết quả."),
    b("ec27", "normal", "Misconception 2: 'Biết code là lợi thế lớn trong mọi role marketing.' Không chính xác. Trong một số role (content, brand, community) kỹ năng giao tiếp và creative quan trọng hơn code nhiều."),
    b("ec28", "normal", "Misconception 3: 'Học code xong mới apply.' Sai hoàn toàn. Apply ngay với kỹ năng hiện có, học thêm trong quá trình làm việc."),
    b("ec29", "h2", "Kết luận"),
    b("ec30", "normal", "Không cần biết code để làm ecom thành công. Nhưng cần biết Excel tốt, đọc được data, và liên tục học các no-code tool mới. Đó là 'technical literacy' tối thiểu mà mọi người làm ecom nên có - và hoàn toàn có thể học trong 3-6 tháng tự học nghiêm túc."),
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

  const posts = [POST_UE, POST_LTV, POST_FLASH, POST_MBTI, POST_CODE];
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
