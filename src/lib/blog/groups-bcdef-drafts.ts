/**
 * Groups B/C/D/E/F - 40 bài drafts.
 * Title + excerpt + outline 5-8 bullet points trong body.
 * Quảng vào /studio mở từng bài và viết nội dung đầy đủ.
 */

export type DraftPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishedAt: string;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  /** Markdown content - outline placeholder */
  content: string;
};

function draft(opts: {
  num: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  group: "B" | "C" | "D" | "E" | "F";
  outline: string[];
  seoTitle?: string;
  seoDescription?: string;
}): DraftPost {
  const date = new Date(2026, 4, 10, 16, opts.num).toISOString();
  const seoTitle = opts.seoTitle || opts.title;
  const seoDescription = opts.seoDescription || opts.excerpt;
  const bullets = opts.outline.map((b) => `• ${b}`).join("\n\n");
  return {
    id: `blog-${opts.group}${opts.num}-${opts.slug}`,
    title: opts.title,
    slug: opts.slug,
    excerpt: opts.excerpt,
    category: opts.category,
    readTime: 6,
    publishedAt: date,
    featured: false,
    seoTitle,
    seoDescription,
    content: `
${opts.excerpt}

## Outline (Quảng viết tiếp)

${bullets}

## Nội dung chi tiết

> Bài đang draft - Quảng sẽ viết hoàn thiện trong /studio. Toàn bộ outline ở trên đã sẵn sàng.

Khi viết nội dung, link tới các tools nội bộ:
• [Tool tính phí sàn](/tools/tinh-phi-san) - số phí chính xác theo ngành
• [ROAS Calculator](/tools/roas-calculator) - break-even và target ROAS
• [Mẫu P&L Ecom](/tools/pnl-ecom) - báo cáo lãi lỗ 5 tầng

Và CTA cuối bài về [Khoá học Ecom Foundation](/ecom-foundation).
`,
  };
}

export const DRAFT_POSTS: DraftPost[] = [
  /* ═════════════ NHÓM B - ADS OPTIMIZATION (15 bài) ═════════════ */
  draft({
    num: 11, group: "B", category: "performance",
    title: "Đừng chỉ nhìn CPC - 5 chỉ số ads quan trọng hơn cần track",
    slug: "khong-chi-nhin-cpc-5-chi-so-ads-quan-trong-hon",
    excerpt: "CPC chỉ là phí 1 click. Cần đọc CPM, CTR, CVR, CPO, ROAS để biết campaign healthy hay không. Hướng dẫn ưu tiên chỉ số khi audit campaign.",
    outline: [
      "CPC là gì và tại sao chỉ nhìn CPC là không đủ",
      "5 chỉ số quan trọng hơn CPC: CPM, CTR, CVR, CPO, ROAS - định nghĩa và công thức",
      "Funnel ads: từ impression -> click -> cart -> purchase, mỗi tầng cần track riêng",
      "CPM cao + CTR thấp = vấn đề ở creative",
      "CTR cao + CVR thấp = vấn đề ở landing/giá",
      "Khung phân tích 4 cấp độ data ads",
      "Ví dụ thực tế: 2 campaign cùng CPC nhưng kết quả ngược chiều",
      "Tool/dashboard nên dùng để track 5 chỉ số này",
    ],
  }),
  draft({
    num: 12, group: "B", category: "performance",
    title: "Ads không ra đơn - Checklist 7 bước chẩn đoán không bỏ sót",
    slug: "ads-khong-ra-don-checklist-7-buoc",
    excerpt: "Roadmap kiểm tra theo thứ tự khi ads chạy mà không có đơn: ngành hàng, target, creative, landing, voucher, traffic source, conversion gap.",
    outline: [
      "Bước 1: Check break-even ROAS có khả thi với cost structure không",
      "Bước 2: Audit creative - CTR có đạt benchmark ngành không",
      "Bước 3: Check listing - hình ảnh, title, description đã optimize chưa",
      "Bước 4: Check landing - review base, voucher hiển thị, giá so với competitor",
      "Bước 5: Check target audience - đúng phân khúc buyer chưa",
      "Bước 6: Check traffic flow - buyer drop ở giai đoạn nào (impression -> click -> ATC -> purchase)",
      "Bước 7: Check external factors - mùa, competitor sale, platform algorithm change",
      "Common mistakes khi chẩn đoán + cách tránh",
    ],
  }),
  draft({
    num: 13, group: "B", category: "performance",
    title: "Tại sao cùng 1 sản phẩm shop khác chạy ads hiệu quả còn bạn thì không?",
    slug: "cung-san-pham-tai-sao-shop-khac-chay-ads-hieu-qua-hon",
    excerpt: "6 yếu tố ngầm tạo ra chênh lệch hiệu quả ads giữa các shop bán cùng sản phẩm: gian hàng score, lịch sử ads, target audience, content, voucher mix, timing.",
    outline: [
      "Yếu tố 1: Shop score / Trust score - tích luỹ qua review, response rate, on-time",
      "Yếu tố 2: Lịch sử ads account - algorithm có 'memory' về chất lượng",
      "Yếu tố 3: Target audience precision - shop khác có data point cao hơn",
      "Yếu tố 4: Content angle - cùng sản phẩm nhưng angle khác = CTR khác",
      "Yếu tố 5: Voucher mix + pricing strategy",
      "Yếu tố 6: Timing campaign + ngày tuần",
      "Cách 'reverse-engineer' competitor: tools và phương pháp",
      "30 ngày plan để 'catch-up' với shop top",
    ],
  }),
  draft({
    num: 14, group: "B", category: "performance",
    title: "Đọc chỉ số ads thế nào để không bị 'mù dữ liệu'?",
    slug: "doc-chi-so-ads-khong-mu-du-lieu",
    excerpt: "Phân biệt vanity metrics và actionable metrics. Khung 4 cấp đọc data ads: Impression -> Engagement -> Conversion -> Profit. Cách trace nguyên nhân ngược.",
    outline: [
      "Vanity metrics vs Actionable metrics - định nghĩa và ví dụ",
      "4 cấp data: Awareness, Engagement, Conversion, Profit",
      "Nguyên tắc 'Top-down then Bottom-up' khi audit",
      "Khi data từ Seller Center khác data từ Ad Manager - xử lý thế nào",
      "Bias phổ biến khi đọc data: confirmation bias, recency bias",
      "Setup dashboard hàng ngày / tuần / tháng",
      "Khi nào trust data, khi nào trust intuition",
      "Case study: từ data 'tốt' phát hiện ra campaign đang lỗ thật",
    ],
  }),
  draft({
    num: 15, group: "B", category: "performance",
    title: "Test ads đúng cách - A/B test mà không tốn ngân sách",
    slug: "test-ads-a-b-test-khong-ton-ngan-sach",
    excerpt: "Cấu trúc A/B test ads: 1 biến tại 1 lúc, ngân sách tối thiểu, ngưỡng impression/CVR đủ kết luận, thời gian test. Khung 5 lần test trong tháng.",
    outline: [
      "Tại sao đa số seller test sai và lãng phí ngân sách",
      "Nguyên tắc 1 biến tại 1 lúc - và những exception",
      "Ngân sách tối thiểu cho 1 test có ý nghĩa thống kê",
      "Ngưỡng impression / click / order để rút kết luận",
      "Time window: 3 ngày, 7 ngày, hay 14 ngày?",
      "Test elements ưu tiên: Hook (1) > Image (2) > Caption (3) > Target (4)",
      "Cách document test result thành knowledge base",
      "Sample test plan 30 ngày cho shop mới",
    ],
  }),
  draft({
    num: 16, group: "B", category: "performance",
    title: "Tư duy mới về CPM - Khi nào CPM cao là tốt?",
    slug: "tu-duy-moi-ve-cpm-cao-la-tot",
    excerpt: "CPM cao thường được hiểu là 'xấu', nhưng thực tế CPM cao có nghĩa target chất lượng hơn. So sánh CPM của campaign awareness vs conversion vs retargeting.",
    outline: [
      "CPM là gì và tại sao thường bị hiểu sai",
      "CPM của 3 loại campaign: Awareness vs Consideration vs Conversion",
      "CPM retargeting cao là dấu hiệu tốt",
      "Khi CPM thấp + CTR thấp = traffic rác",
      "Cách đọc CPM cùng với CVR và Profit/đơn",
      "Benchmark CPM theo ngành 2026",
      "Khi nên chấp nhận CPM cao để target chất lượng",
      "Strategy bidding theo CPM target",
    ],
  }),
  draft({
    num: 17, group: "B", category: "performance",
    title: "Scale ads đúng cách - Tăng ngân sách x2 mà không mất ROAS",
    slug: "scale-ads-tang-ngan-sach-khong-mat-roas",
    excerpt: "4 cách scale an toàn: scale theo campaign -> ad set -> giờ vàng -> audience expansion. Ngưỡng % tăng/lần, thời gian giữa các lần scale.",
    outline: [
      "Tại sao scale ads thường khiến ROAS giảm 30–50%",
      "Nguyên tắc 'Algorithm need time to relearn' khi scale",
      "Phương pháp 1: Scale ngân sách campaign theo % nhỏ (15–25% mỗi lần)",
      "Phương pháp 2: Duplicate winning campaign sang ad set mới",
      "Phương pháp 3: Scale theo giờ vàng (peak hour)",
      "Phương pháp 4: Audience expansion - tương tự audience",
      "Khi nào pull back và giữ vững thay vì scale",
      "Plan scale 90 ngày với checkpoint đánh giá",
    ],
  }),
  draft({
    num: 18, group: "B", category: "performance",
    title: "ROAS không phân phối khi target quá cao - Fix ngay với 4 bước",
    slug: "roas-khong-phan-phoi-target-qua-cao-fix",
    excerpt: "Vấn đề: thuật toán Shopee/TikTok không spend khi ROAS target quá cao so với break-even. 4 bước fix: giảm dần target, thêm signal, refine audience, restart.",
    outline: [
      "Tại sao thuật toán 'không phân phối' khi target không khả thi",
      "Cách check break-even ROAS thực của campaign",
      "Bước 1: Giảm target ROAS xuống 70% break-even để algorithm có data",
      "Bước 2: Thêm conversion signal (mua hàng + ATC)",
      "Bước 3: Refine audience nếu reach quá rộng",
      "Bước 4: Restart campaign với learning data mới",
      "Khi nào pause hoàn toàn và rebuild từ đầu",
      "Avoid lỗi 'over-optimization loop' - sửa liên tục",
    ],
  }),
  draft({
    num: 19, group: "B", category: "performance",
    title: "Cách đặt ROAS đúng cho sản phẩm mới - 30 ngày đầu",
    slug: "dat-roas-dung-cho-san-pham-moi-30-ngay-dau",
    excerpt: "3 phase ROAS target cho SKU mới: Learning (ROAS 2-3x) -> Test (3-5x) -> Scale (target ROAS commercial). Timeline cụ thể và metric checkpoint.",
    outline: [
      "Tại sao đặt ROAS target sản phẩm mới giống cũ là sai lầm",
      "Phase 1 (Day 1-7): Learning - ROAS thấp 2-3x để algorithm thu data",
      "Phase 2 (Day 8-21): Test - tăng dần target lên 3-5x",
      "Phase 3 (Day 22-30): Scale - hit target ROAS commercial",
      "Metric checkpoint mỗi tuần",
      "Khi nào kill SKU early thay vì cố gắng rescue",
      "Ngân sách phân bổ cho 30 ngày test SKU mới",
      "Case study: SKU Beauty từ 0 lên 200 đơn/ngày trong 30 ngày",
    ],
  }),
  draft({
    num: 20, group: "B", category: "performance",
    title: "Đọc dữ liệu ads khi chưa có đơn - Đừng dừng quá sớm",
    slug: "doc-data-ads-khi-chua-co-don-dung-dung-som",
    excerpt: "4 chỉ số phải đạt trước khi kết luận campaign fail: CTR, CPM, view content, ATC. Ngưỡng phải có sau 1.000 reach để biết campaign có potential.",
    outline: [
      "Sai lầm 'dừng ads ngay khi chưa có đơn' và hậu quả",
      "Funnel buyer: từ impression đến mua hàng cần thời gian",
      "Ngưỡng tối thiểu data trước khi kết luận: 1.000 reach + 7 ngày",
      "4 leading indicator: CTR, CPM, View Content rate, ATC rate",
      "Nếu CTR > 1.5% và CPM < benchmark = campaign có potential, đợi tiếp",
      "Nếu CTR < 0.5% sau 1.000 reach = vấn đề thật, cần fix",
      "Cách tăng tốc data collection ban đầu",
      "Pattern: campaign 'chậm bùng' vs campaign 'không có cơ hội'",
    ],
  }),
  draft({
    num: 21, group: "B", category: "performance",
    title: "Khi nào tăng ROAS, khi nào giảm? Decision framework rõ ràng",
    slug: "khi-nao-tang-roas-khi-nao-giam",
    excerpt: "3 trigger tăng ROAS (margin tốt, volume thấp, scale phase) vs 3 trigger giảm (cần scale gấp, sale mùa, ngân sách dư). Decision tree cụ thể.",
    outline: [
      "Tăng vs giảm ROAS target - hiểu lầm phổ biến",
      "Trigger tăng: margin healthy + volume thấp = thắt lại để giữ profit",
      "Trigger tăng: phase optimize sau khi đã scale rộng",
      "Trigger giảm: business cần scale gấp (mùa sale, launch)",
      "Trigger giảm: ngân sách dư cuối tháng",
      "Trigger giảm: cạnh tranh tăng đột biến",
      "Decision tree theo growth stage shop",
      "Avoid 'panic adjust' - set rule và stick",
    ],
  }),
  draft({
    num: 22, group: "B", category: "performance",
    title: "Đặt ngưỡng CPO theo biên lợi nhuận - Công thức tính cụ thể",
    slug: "dat-nguong-cpo-theo-bien-loi-nhuan",
    excerpt: "CPO max = (Giá bán × Contribution Margin %) − Profit target. Ví dụ shop Beauty break-even CPO ở 65k cho sản phẩm 280k. Cách tính cho từng SKU.",
    outline: [
      "CPO là gì và tại sao là chỉ số quan trọng nhất",
      "Công thức CPO break-even từ P&L",
      "Công thức CPO target để đạt margin mong muốn",
      "Ví dụ tính CPO cho 4 ngành: Beauty, Fashion, F&B, Electronics",
      "CPO theo SKU vs CPO trung bình campaign",
      "Khi CPO thực > CPO max = đang lỗ ngầm dù ROAS có vẻ ổn",
      "Set CPO ceiling vào ad manager để auto-pause",
      "Track CPO theo platform, audience, time of day",
    ],
  }),
  draft({
    num: 23, group: "B", category: "performance",
    title: "Tỷ lệ bỏ giỏ (ATC) cao mà không ra đơn - 5 lý do và fix",
    slug: "ty-le-bo-gio-atc-cao-khong-ra-don",
    excerpt: "5 lý do buyer ATC nhưng không checkout: giá hiển thị vs giá thực, phí ship cao, voucher hết hạn, sản phẩm hết size phổ biến, trust signal yếu.",
    outline: [
      "ATC drop-off rate là gì và benchmark theo ngành",
      "Lý do 1: Giá ATC khác giá checkout (voucher hết hạn, phí ship)",
      "Lý do 2: Phí ship hiển thị quá muộn (chỉ thấy ở checkout)",
      "Lý do 3: Sản phẩm hết hàng size/màu phổ biến",
      "Lý do 4: Trust signal yếu (review ít, badge thiếu)",
      "Lý do 5: Buyer 'compare' - đang so với shop khác",
      "Fix từng lý do - checklist 30 phút",
      "Cách thiết lập retargeting ads cho buyer ATC",
    ],
  }),
  draft({
    num: 24, group: "B", category: "performance",
    title: "Ít chỉnh ads vẫn giữ phong độ - Quy tắc 3-7-3 chi tiết",
    slug: "it-chinh-ads-quy-tac-3-7-3",
    excerpt: "Nguyên tắc 3-7-3: 3 ngày đầu để algorithm learning, 7 ngày để stable, sau đó chỉ chỉnh khi có lý do statistical đủ mạnh. Tránh over-tweaking.",
    outline: [
      "Tại sao 'chỉnh nhiều = tốt hơn' là sai lầm",
      "3 ngày đầu: algorithm thu data, đừng đụng",
      "7 ngày tiếp: campaign stable, chỉ adjust micro",
      "Sau 10 ngày: có data đủ để quyết định scale, kill, hay refine",
      "Threshold để chỉnh: chỉ khi data movement > 20% liên tục 3 ngày",
      "Cost của over-tweaking: reset learning, mất ROAS",
      "Routine ads management theo tuần (Mon: Plan, Wed: Adjust, Fri: Review)",
      "Khi nào exception - chỉnh nhanh dù chưa đủ data",
    ],
  }),
  draft({
    num: 25, group: "B", category: "performance",
    title: "Scale ngân sách x3 nhưng giảm ROAS target - Tại sao đây là đúng",
    slug: "scale-x3-giam-roas-target-tai-sao-dung",
    excerpt: "Logic kinh tế: doanh thu tuyệt đối quan trọng hơn ROAS %. Khi nào ROAS thấp + volume cao = lãi nhiều hơn ROAS cao + volume thấp.",
    outline: [
      "ROAS % vs Profit tuyệt đối - chỉ số nào quan trọng hơn?",
      "Công thức: Profit = (CM% − 1/ROAS) × Revenue",
      "Ví dụ: ROAS 8x × 100tr revenue vs ROAS 5x × 300tr revenue",
      "Khi nào ROAS thấp + volume cao là chiến lược tốt",
      "Trade-off: CPO tăng nhưng tổng profit tăng",
      "Risk: scale quá nhanh làm CM giảm",
      "Strategy 'profit maximization' vs 'efficiency maximization'",
      "Khi nào nên switch giữa 2 strategy",
    ],
  }),

  /* ═════════════ NHÓM C - UNIT ECONOMICS & P&L (8 bài) ═════════════ */
  draft({
    num: 26, group: "C", category: "ecom",
    title: "P&L gian hàng TMĐT - 5 tầng đúng chuẩn ecom",
    slug: "pl-gian-hang-tmdt-5-tang-chuan",
    excerpt: "Net Revenue -> Gross Profit -> Contribution Margin -> Marketing Profit -> EBITDA. Mỗi tầng đo gì, ý nghĩa với business, và cách dùng để ra quyết định.",
    outline: [
      "Tại sao P&L 5 tầng quan trọng hơn 'doanh thu trừ chi phí'",
      "Tầng 1 - Net Revenue (sau hoàn hàng)",
      "Tầng 2 - Gross Profit (sau COGS + voucher seller)",
      "Tầng 3 - Contribution Margin (sau phí sàn) ★ quan trọng nhất",
      "Tầng 4 - Marketing Profit (sau ads)",
      "Tầng 5 - EBITDA (sau ops + nhân sự)",
      "Cách dùng từng tầng để ra quyết định cụ thể",
      "Template Excel + link tới /tools/pnl-ecom",
    ],
  }),
  draft({
    num: 27, group: "C", category: "performance",
    title: "Contribution Margin > ROAS - Chỉ số quan trọng nhất với seller TMĐT",
    slug: "contribution-margin-quan-trong-hon-roas",
    excerpt: "Vì sao Contribution Margin (CM) phản ánh sức khoẻ business chính xác hơn ROAS. Cách tính, ngưỡng healthy theo ngành, và case study.",
    outline: [
      "ROAS chỉ đo hiệu quả ads - không tính phí sàn, COGS, ops",
      "Contribution Margin = sau khi trừ tất cả chi phí biến đổi",
      "Công thức CM cho ecom: (Revenue − COGS − Phí sàn − Ship seller − Voucher) / Revenue",
      "Ví dụ: shop ROAS 8x nhưng CM 5% = scale là scale lỗ",
      "Ngưỡng CM healthy: 20% (Beauty), 15% (Fashion), 10% (F&B), 8% (Electronics)",
      "Cách tăng CM mà không tăng giá: bundle, optimize phí sàn, giảm voucher",
      "Track CM theo SKU, theo platform, theo campaign",
      "Case study: shop fix CM từ 8% lên 18% trong 90 ngày",
    ],
  }),
  draft({
    num: 28, group: "C", category: "ecom",
    title: "EBITDA bao nhiêu là khoẻ cho shop ecom 2026?",
    slug: "ebitda-bao-nhieu-la-khoe-cho-shop-ecom",
    excerpt: "Benchmark EBITDA theo growth stage: Launch (0-5%), Scale (8-15%), Mature (15-25%), Premium (25-35%). Cách tính EBITDA chuẩn cho gian hàng TMĐT.",
    outline: [
      "EBITDA là gì và khác Net Profit thế nào",
      "Tại sao EBITDA quan trọng hơn doanh thu và GMV",
      "Stage 1 - Launch (0-6 tháng): EBITDA 0-5%, đầu tư mạnh ads",
      "Stage 2 - Scale (6-18 tháng): EBITDA 8-15%, balance growth + profit",
      "Stage 3 - Mature (18+ tháng): EBITDA 15-25%, optimize",
      "Stage 4 - Premium / Niche: EBITDA 25-35%, brand mạnh",
      "Cách tăng EBITDA: tăng AOV, giảm CPA, tăng repeat rate",
      "EBITDA negative bao lâu là acceptable cho launch phase",
    ],
  }),
  draft({
    num: 29, group: "C", category: "ecom",
    title: "Định giá sản phẩm để ads scale GMV - Công thức 5 bước",
    slug: "dinh-gia-san-pham-de-ads-scale",
    excerpt: "5 bước định giá ngược: chốt target margin -> tính max CPA -> reverse-engineer giá bán -> test elasticity -> adjust. Avoid mistake định giá theo competitor.",
    outline: [
      "Sai lầm phổ biến: định giá theo competitor mà quên unit economics",
      "Bước 1: Chốt target margin (vd 15% EBITDA)",
      "Bước 2: Tính max CPA mà vẫn đạt target margin",
      "Bước 3: Reverse-engineer giá bán từ COGS + max CPA + phí sàn",
      "Bước 4: Test elasticity ở 3 mức giá",
      "Bước 5: Lock giá tối ưu, monitor CVR và profit",
      "Khi nào nên tăng giá thay vì giảm",
      "Pricing psychology: 199k vs 200k, bundle pricing",
    ],
  }),
  draft({
    num: 30, group: "C", category: "ecom",
    title: "Gross Margin bao nhiêu là tối thiểu để chạy ads có lãi?",
    slug: "gross-margin-toi-thieu-de-chay-ads-co-lai",
    excerpt: "Ngưỡng GM tối thiểu = Phí sàn + Ops + 10% buffer = ~37%. Dưới mức này gần như không thể có lãi. Phân tích từng cấu trúc chi phí.",
    outline: [
      "Công thức: GM tối thiểu = Phí sàn% + Ops% + Buffer%",
      "Phí sàn TikTok/Shopee 2026 trung bình: 18-22%",
      "Ops cost trung bình: 8-12%",
      "Buffer cho ads + profit: 10-15%",
      "-> GM tối thiểu cho ecom: 36-42%",
      "Ngành nào dưới ngưỡng này thường khó: Electronics 15-25%, F&B 30-40%",
      "Cách tăng GM: giảm COGS, tăng AOV, premium positioning",
      "Khi GM < 35% - chiến lược không depend ads",
    ],
  }),
  draft({
    num: 31, group: "C", category: "ecom",
    title: "Khai thác ads tăng giá trị vòng đời khách hàng (LTV) - Strategy 2026",
    slug: "khai-thac-ads-tang-ltv",
    excerpt: "Shift mindset từ ROAS per đơn sang LTV per customer. Strategy: bundle, subscription, repeat-targeting. Cách tính LTV chuẩn cho ecom Việt Nam.",
    outline: [
      "ROAS per đơn vs LTV per customer - paradigm shift",
      "Cách tính LTV: AOV × Repeat Rate × Avg Lifespan",
      "Strategy 1: Bundle để tăng AOV ngay đơn đầu",
      "Strategy 2: Subscription / Auto-replenishment",
      "Strategy 3: Email + SMS retargeting buyer cũ",
      "Strategy 4: Loyalty program với tier rewards",
      "Strategy 5: Cross-sell SKU bổ trợ",
      "Calculate CAC max dựa trên LTV thay vì AOV",
    ],
  }),
  draft({
    num: 32, group: "C", category: "performance",
    title: "Phân bổ ngân sách để tránh CPO tăng đột biến - Rule 70-20-10",
    slug: "phan-bo-ngan-sach-tranh-cpo-dot-bien",
    excerpt: "Rule 70-20-10: 70% always-on campaigns, 20% test new, 10% retargeting. Cách rebalance theo tuần và scenario shop khác nhau.",
    outline: [
      "Tại sao tất cả ngân sách vào 1 campaign là risk cao",
      "Rule 70-20-10: structure ngân sách theo mục tiêu",
      "70% Always-on: campaign winning, ổn định, predictable",
      "20% Test: SKU mới, audience mới, creative mới",
      "10% Retargeting: cart abandon, repeat buyer, lookalike",
      "Cách rebalance theo tuần khi data thay đổi",
      "Variation: 60-30-10 cho launch phase, 80-15-5 cho mature",
      "Avoid 'all-in' bias khi 1 campaign đang win",
    ],
  }),
  draft({
    num: 33, group: "C", category: "ecom",
    title: "P&L tốt nhưng cash flow âm - Tại sao và fix thế nào",
    slug: "pl-tot-cash-flow-am-tai-sao",
    excerpt: "Sàn giữ tiền 14-30 ngày, COGS trả trước, hoàn hàng đột biến. Cách tính cash conversion cycle và build buffer cho shop ecom.",
    outline: [
      "P&L (accrual) vs Cash Flow (cash) - khác biệt cốt lõi",
      "Lý do 1: Sàn giữ tiền 14-30 ngày sau giao thành công",
      "Lý do 2: COGS trả supplier trước, doanh thu về sau",
      "Lý do 3: Hoàn hàng spike đột biến (mùa sale)",
      "Lý do 4: Mua nguyên liệu / inventory cho mùa peak",
      "Cash Conversion Cycle: cách tính cho ecom",
      "Build buffer: 2-3 tháng OPEX cash dự phòng",
      "Khi nào dùng working capital loan",
    ],
  }),

  /* ═════════════ NHÓM D - MÙA SALE & TÂM LÝ BUYER (7 bài) ═════════════ */
  draft({
    num: 34, group: "D", category: "performance",
    title: "Tâm lý mua sắm theo mùa - Mỗi quý một strategy ads",
    slug: "tam-ly-mua-sam-theo-mua-strategy-ads",
    excerpt: "Q1 sau Tết sức mua thấp, Q2 mid-year sale, Q3 back-to-school, Q4 mega sale. Ngân sách + creative angle + ROAS target cho từng quý.",
    outline: [
      "Q1 (Jan-Mar): post-Tết, sức mua thấp, cần effort kích cầu",
      "Q2 (Apr-Jun): mid-year sale 6.6, sức mua tăng dần",
      "Q3 (Jul-Sep): back-to-school, ngành Mẹ & Bé bùng nổ",
      "Q4 (Oct-Dec): mega sale 11.11, 12.12, doanh thu peak",
      "Strategy ads từng quý: ngân sách, creative angle, voucher",
      "Calendar marketing 2026 chi tiết",
      "Cash flow planning theo quý",
      "Inventory planning đón đầu mỗi mùa",
    ],
  }),
  draft({
    num: 35, group: "D", category: "performance",
    title: "Chạy ads xuyên Tết thế nào để không lãng phí?",
    slug: "chay-ads-xuyen-tet-khong-lang-phi",
    excerpt: "Lịch ads Tết: 7 ngày trước -> 23-29 (giảm 70%) -> mùng 1-3 (off) -> mùng 4-7 (warm-up) -> sau Tết. Chi tiết từng giai đoạn và ngành ngoại lệ.",
    outline: [
      "Tâm lý buyer mỗi giai đoạn Tết",
      "7 ngày trước Tết (15-22 âm): sức mua peak, push hết",
      "23-29 âm: giảm ngân sách 70%, chỉ giữ retargeting",
      "Mùng 1-3 Tết: off ads hoàn toàn (trừ ngành đặc thù)",
      "Mùng 4-7 Tết: warm-up nhẹ, test sức mua",
      "Sau Tết: ramp up dần đến mid-Feb",
      "Ngành exceptions: ngành quà Tết, ngành đặc sản, ngành thiết yếu",
      "Sai lầm phổ biến: tắt hoàn toàn vs chạy full",
    ],
  }),
  draft({
    num: 36, group: "D", category: "performance",
    title: "Sau Tết - Khởi động ads nhanh và hiệu quả",
    slug: "sau-tet-khoi-dong-ads-nhanh",
    excerpt: "Tránh sai lầm spend full budget tuần đầu. Cách warm-up audience trong 7-10 ngày trước khi scale, và checkpoint metric mỗi tuần.",
    outline: [
      "Tại sao sức mua sau Tết yếu kéo dài 2-4 tuần",
      "Tuần 1 sau Tết: warm-up với 30% ngân sách",
      "Tuần 2: tăng lên 60% nếu CTR và CVR ổn",
      "Tuần 3-4: full budget khi data đã stable",
      "Creative angle sau Tết: 'Khởi đầu năm mới' theme",
      "Voucher mix sau Tết: deeper hơn để kích cầu",
      "Track sức mua qua CTR và CVR",
      "Sai lầm 'spend như mùa peak' và hậu quả",
    ],
  }),
  draft({
    num: 37, group: "D", category: "performance",
    title: "Mùa sale lớn (11.11, 12.12) - Chiến lược ads 3 phase",
    slug: "mua-sale-lon-chien-luoc-ads-3-phase",
    excerpt: "Pre-sale (warm audience + build wishlist), Sale day (push + auto-bid scale), Post-sale (retargeting cart abandon). Timeline + ngân sách per phase.",
    outline: [
      "Phase 1 - Pre-sale (10-14 ngày trước): warm audience, build wishlist",
      "Phase 2 - Sale day (D-day): push aggressive, auto-bid scale",
      "Phase 3 - Post-sale (2-3 ngày sau): retargeting cart abandon, last chance",
      "Ngân sách phân bổ: 30% pre, 50% sale day, 20% post",
      "Voucher strategy theo phase",
      "Inventory prep: 1.5x volume bình thường",
      "Team prep: CSKH, fulfillment, content",
      "Post-mortem: KPI nào đạt, miss, action items cho mùa sau",
    ],
  }),
  draft({
    num: 38, group: "D", category: "ecom",
    title: "Cân đối chi phí ads và lợi nhuận khi sale lớn - Không bị lỗ",
    slug: "can-doi-ads-loi-nhuan-mua-sale-lon",
    excerpt: "Sale lớn = volume tăng nhưng margin/đơn giảm 30-50%. Cách giữ EBITDA dương khi vẫn aggressive ads. P&L scenario mùa sale.",
    outline: [
      "Tại sao margin/đơn giảm trong mùa sale (deeper discount, ads CPM tăng)",
      "Tính EBITDA target cho mùa sale (lower nhưng dương)",
      "CPO ceiling cao hơn 20-30% so với bình thường nhưng vẫn có cap",
      "Voucher: cap discount tối đa 20% giá bán",
      "Ads: tăng ngân sách 2-3x nhưng không vượt CPO ceiling",
      "Inventory: prep 1.5x, dư thừa hơn thiếu",
      "Cash flow: dự phòng 2 tuần delay payment từ sàn",
      "Post-sale review profit: sale có thực sự lãi hay chỉ vanity",
    ],
  }),
  draft({
    num: 39, group: "D", category: "performance",
    title: "Nắm bắt tâm lý khách hàng - 5 trigger psychology tăng CVR",
    slug: "tam-ly-khach-hang-5-trigger-tang-cvr",
    excerpt: "5 trigger psychology: scarcity, social proof, anchor pricing, FOMO, loss aversion. Cách áp dụng vào ads creative + landing page TMĐT.",
    outline: [
      "Trigger 1 - Scarcity: 'Còn 5 sản phẩm', countdown timer",
      "Trigger 2 - Social proof: review, sao đánh giá, số đơn đã bán",
      "Trigger 3 - Anchor pricing: gạch giá cũ, hiển thị %off",
      "Trigger 4 - FOMO: 'Chỉ còn hôm nay', flash sale",
      "Trigger 5 - Loss aversion: 'Bỏ qua sẽ tiếc', warranty + return",
      "Áp dụng vào ads creative: hook, copy, visual",
      "Áp dụng vào landing: vị trí trigger, frequency",
      "Avoid manipulation - trigger ethical vs not",
    ],
  }),
  draft({
    num: 40, group: "D", category: "ecom",
    title: "Sau sale nên làm gì - Top 5 việc trong 7 ngày để tối ưu data",
    slug: "sau-sale-top-5-viec-7-ngay",
    excerpt: "Sau mỗi mùa sale lớn, 7 ngày sau là cửa sổ vàng để: phân tích SKU winner, archive non-performer, retarget abandon, nurture new buyer, reset learning.",
    outline: [
      "Tại sao 7 ngày sau sale là 'cửa sổ vàng' tối ưu",
      "Việc 1: Phân tích top 10 SKU winner - tại sao thắng",
      "Việc 2: Archive bottom 10 SKU non-performer",
      "Việc 3: Retargeting buyer ATC nhưng không mua",
      "Việc 4: Nurture new buyer (welcome email, discount đơn 2)",
      "Việc 5: Reset ads learning, tái allocate budget",
      "Update inventory plan dựa trên winner",
      "Document insights cho mùa sale tiếp theo",
    ],
  }),

  /* ═════════════ NHÓM E - TEAM, LEADERSHIP (5 bài) ═════════════ */
  draft({
    num: 41, group: "E", category: "leadership",
    title: "Build team Ecom 0->12 người - Roadmap 18 tháng từ 60+ project",
    slug: "build-team-ecom-0-12-nguoi-roadmap",
    excerpt: "Hire theo thứ tự đúng: Marketing -> CSKH -> Content -> Ads runner -> Designer -> Data -> Manager. Lương + KPI mỗi role. Avoid hire sai timing.",
    outline: [
      "Lỗi phổ biến: hire designer trước khi có doanh thu",
      "Stage 1 (0-3 tháng, GMV <100tr): Founder + 1 CSKH part-time",
      "Stage 2 (3-6 tháng, GMV 100-300tr): + 1 Content + 1 Ads runner",
      "Stage 3 (6-12 tháng, GMV 300tr-1tỷ): + 1 Designer + 1 CSKH lead",
      "Stage 4 (12-18 tháng, GMV 1-3tỷ): + 1 Data + 1 Operation Manager",
      "Stage 5 (18+ tháng): + Marketing Manager + thêm specialist",
      "Lương benchmark mỗi role 2026 tại HCM/HN",
      "KPI rõ ràng cho từng role",
    ],
  }),
  draft({
    num: 42, group: "E", category: "leadership",
    title: "5 sai lầm khi hire Ads runner đầu tiên - Tránh ngay",
    slug: "5-sai-lam-hire-ads-runner-dau-tien",
    excerpt: "Hire theo CV ROAS đẹp, không hỏi unit economics, không test thực, lương cố định cao, không có trial period. Cách interview và onboard chuẩn.",
    outline: [
      "Sai lầm 1: Tin CV với 'ROAS 15x' mà không context",
      "Sai lầm 2: Không test ngân sách thực 1-2 tuần",
      "Sai lầm 3: Lương cố định cao thay vì base + KPI bonus",
      "Sai lầm 4: Không trial period (probation 2-3 tháng)",
      "Sai lầm 5: Không hỏi về unit economics, chỉ hỏi ROAS",
      "Interview questions chuẩn cho Ads runner",
      "Onboard 30-60-90 ngày checklist",
      "Khi nào nên fire - red flags không thể bỏ qua",
    ],
  }),
  draft({
    num: 43, group: "E", category: "leadership",
    title: "Live commerce TikTok - 5 sai lầm khiến margin âm",
    slug: "live-commerce-tiktok-5-sai-lam-margin-am",
    excerpt: "Live giảm sâu liên tục, không setup voucher đúng, depend 1 host, không phân tích live data, scale quá nhanh. 5 sai lầm phá margin từ kinh nghiệm thực chiến.",
    outline: [
      "Sai lầm 1: Giảm sâu liên tục mỗi live -> buyer đợi giảm thêm",
      "Sai lầm 2: Voucher live không cap, ăn hết margin",
      "Sai lầm 3: Phụ thuộc 1 host duy nhất -> risk khi nghỉ",
      "Sai lầm 4: Không track live data riêng (CPM live, CVR live)",
      "Sai lầm 5: Scale từ 2 live/tuần lên 7 live/tuần quá nhanh",
      "Cost cấu trúc live: ads, affiliate, voucher, content team",
      "Benchmark margin live theo ngành",
      "Roadmap fix khi đang lỗ live",
    ],
  }),
  draft({
    num: 44, group: "E", category: "leadership",
    title: "Khi nào outsource agency, khi nào build in-house? Decision tree",
    slug: "outsource-agency-vs-in-house-decision",
    excerpt: "Decision tree: GMV/tháng, độ phức tạp ngành, tốc độ scale, chất lượng team available. Cost benefit analysis chi tiết.",
    outline: [
      "Outsource vs In-house - pros & cons",
      "Tiêu chí 1: GMV/tháng - dưới 200tr nên outsource",
      "Tiêu chí 2: Độ phức tạp ngành - niche khó hire in-house",
      "Tiêu chí 3: Tốc độ scale - agency scale nhanh hơn",
      "Tiêu chí 4: Chất lượng team market hiện tại",
      "Cost benefit: lương in-house vs fee agency",
      "Hybrid model - phổ biến nhất 2026",
      "Khi nào in-source lại sau khi đã outsource lâu",
    ],
  }),
  draft({
    num: 45, group: "E", category: "mindset",
    title: "Tư duy mới của founder ecom 2026 - Từ GMV -> EBITDA",
    slug: "tu-duy-founder-ecom-2026-gmv-vs-ebitda",
    excerpt: "Shift từ chạy theo GMV (vanity metric) sang track EBITDA + LTV. Lý do GMV không còn là proxy thành công, và case study từ 60+ project.",
    outline: [
      "Tại sao GMV trở thành 'vanity metric' năm 2026",
      "Cost cạnh tranh tăng: phí sàn, ads, ops",
      "Buyer ngày càng deal-driven, repeat rate khó",
      "Shift sang EBITDA + LTV: ý nghĩa thực sự",
      "Case study 1: Shop GMV 5 tỷ/tháng EBITDA -3% - 'thành công ảo'",
      "Case study 2: Shop GMV 800tr/tháng EBITDA 22% - 'thành công thực'",
      "KPI mới founder phải track hàng tuần",
      "Convince stakeholder (investor, partner) về metric mới",
    ],
  }),

  /* ═════════════ NHÓM F - CASE STUDY & DATA (5 bài) ═════════════ */
  draft({
    num: 46, group: "F", category: "ecom",
    title: "Case study: Brand Beauty 0 -> 2 tỷ GMV/tháng trong 6 tháng",
    slug: "case-study-brand-beauty-0-2-ty-6-thang",
    excerpt: "Anonymized real case từ portfolio. P&L tháng 1 vs tháng 6, milestone từng phase, key decisions, mistakes & learnings.",
    outline: [
      "Background brand: ngành Beauty Skincare, 3 SKU launch",
      "Tháng 1: Setup, GMV 80tr, EBITDA -15%",
      "Tháng 2-3: Build content + voucher, GMV 300tr, EBITDA -5%",
      "Tháng 4: Mall upgrade + scale ads, GMV 800tr, EBITDA 5%",
      "Tháng 5: Live commerce launch, GMV 1.4 tỷ, EBITDA 12%",
      "Tháng 6: Diversify SKU, GMV 2 tỷ, EBITDA 17%",
      "3 quyết định critical đúng",
      "2 mistakes lớn - tránh nếu replay",
    ],
  }),
  draft({
    num: 47, group: "F", category: "ecom",
    title: "Mall vs Non-Mall - Số liệu thực từ 60+ project",
    slug: "mall-vs-non-mall-so-lieu-thuc",
    excerpt: "Data thực: ROAS trung bình, CPO, conversion rate, repeat rate giữa Mall và Non-Mall theo từng ngành. Bảng số liệu chưa từng public.",
    outline: [
      "Methodology: data từ 60+ project, 18 tháng (Q1/2024 - H1/2026)",
      "Beauty: Mall ROAS 9.2x vs Non-Mall 6.8x; CVR Mall +35%",
      "Fashion: Mall ROAS 7.5x vs Non-Mall 5.2x; AOV Mall +28%",
      "F&B: Mall ROAS 5.8x vs Non-Mall 5.1x; not big diff",
      "Electronics: Mall ROAS 8x vs Non-Mall 4.5x; CVR Mall +60%",
      "Mother & Baby: Mall ROAS 8.5x vs Non-Mall 6x",
      "Repeat rate: Mall +25% so với Non-Mall trung bình",
      "Conclusion: Mall worth ngành nào, không worth ngành nào",
    ],
  }),
  draft({
    num: 48, group: "F", category: "ecom",
    title: "Top 10 ngành có ROAS cao nhất 2026 - Data từ 60+ shop",
    slug: "top-10-nganh-roas-cao-nhat-2026",
    excerpt: "Ranking ngành theo ROAS organic + paid, kèm gross margin & competitive landscape. Dùng để chọn ngành hoặc expand SKU mới.",
    outline: [
      "Methodology: ROAS thực tế trung bình 6 tháng đầu 2026",
      "1. Beauty Skincare premium - ROAS 12-15x",
      "2. Beauty Makeup - ROAS 9-12x",
      "3. Mother & Baby Cao cấp - ROAS 8-11x",
      "4. Snack 'Wow factor' - ROAS 7-10x",
      "5. Fashion Athleisure - ROAS 7-9x",
      "6. Home & Living minimalist - ROAS 6-8x",
      "7-10. Categorie khác + competitive landscape",
      "Cảnh báo: ROAS cao không = profit cao, vẫn cần check CM",
    ],
  }),
  draft({
    num: 49, group: "F", category: "performance",
    title: "Cohort analysis - Cách track repeat buyer cho client",
    slug: "cohort-analysis-track-repeat-buyer",
    excerpt: "Bảng cohort 12 tháng, công thức tính LTV, cách identify 'golden cohort' để retargeting hiệu quả. Template + ví dụ thực.",
    outline: [
      "Cohort là gì và tại sao quan trọng cho ecom",
      "Setup cohort table: trục x là tháng acquire, trục y là months elapsed",
      "Cách export data từ Shopee / TikTok Seller Center",
      "Tính repeat rate, LTV theo cohort",
      "Identify 'golden cohort' - buyer có LTV cao nhất",
      "Strategy: tăng % buyer mới giống golden cohort",
      "Template Excel cohort analysis",
      "Common pattern: cohort sale-period thường có LTV thấp",
    ],
  }),
  draft({
    num: 50, group: "F", category: "performance",
    title: "6 metric ngầm ít ai track nhưng ảnh hưởng lớn đến profit",
    slug: "6-metric-ngam-anh-huong-profit",
    excerpt: "Ad recall lift, brand search uplift, organic traffic share, repeat purchase rate, refund rate by SKU, ship cost variance. Setup tracking + benchmark.",
    outline: [
      "Metric 1 - Ad Recall Lift: % buyer nhớ thương hiệu sau ads",
      "Metric 2 - Brand Search Uplift: tăng search 'tên brand' organic",
      "Metric 3 - Organic Traffic Share: % buyer không qua ads",
      "Metric 4 - Repeat Purchase Rate by month",
      "Metric 5 - Refund Rate by SKU (top 10 highest)",
      "Metric 6 - Ship Cost Variance giữa các vùng",
      "Setup tracking cho mỗi metric",
      "Benchmark healthy + cách improve",
    ],
  }),
];
