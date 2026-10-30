/**
 * Lộ trình đào tạo chi tiết Ecom Foundation - render tại /ecom-foundation/lo-trinh.
 * Bổ sung cho SESSIONS trong course-data.ts (cùng số buổi `no`): mục tiêu, pre-read,
 * workshop, bài tập, checkpoint, skill matrix, cách đánh giá và 3 tháng mentoring.
 */

export type PhaseKey = "P0" | "P1" | "P2" | "P3" | "P4";

export const PHASES: {
  key: PhaseKey;
  name: string;
  time: string;
  goal: string;
  output: string;
  color: string;
  sessions?: number[];
}[] = [
  {
    key: "P0",
    name: "Onboarding",
    time: "Tuần 0 · 7 ngày trước khai giảng",
    goal: "Đo baseline, chọn brand đồng hành, setup công cụ",
    output: "Profile học viên + skill baseline",
    color: "#4ad6ff",
  },
  {
    key: "P1",
    name: "Foundation",
    time: "Tuần 1-2 · Buổi 1-4",
    goal: "Tư duy thị trường, chọn kênh, định vị sản phẩm, setup gian hàng",
    output: "Checkpoint 1 - Brand Brief 1 trang",
    color: "#7da9ff",
    sessions: [1, 2, 3, 4],
  },
  {
    key: "P2",
    name: "Operation",
    time: "Tuần 3-4 · Buổi 5-8",
    goal: "Giá, phí sàn, traffic, bộ chỉ số, cấu trúc ads",
    output: "Checkpoint 2 - Pricing Sheet + Ads Plan 30 ngày",
    color: "#a78bff",
    sessions: [5, 6, 7, 8],
  },
  {
    key: "P3",
    name: "Growth & Plan",
    time: "Tuần 5-6 · Buổi 9-12",
    goal: "Đa kênh, plan tháng/quý, P&L, đọc data ra giải pháp",
    output: "Capstone - Plan 1 năm + P&L",
    color: "#ffae13",
    sessions: [9, 10, 11, 12],
  },
  {
    key: "P4",
    name: "Mentoring",
    time: "Tháng 1-3 sau khoá",
    goal: "Biến capstone thành portfolio, apply việc, chạy case thật",
    output: "Skill review lần 2 + career plan 12 tháng",
    color: "#5fffaa",
  },
];

export const ONBOARDING_TASKS = [
  { title: "Quick meet 15 phút", desc: "Align mục tiêu cá nhân, lịch học, cam kết 2 buổi/tuần." },
  { title: "Baseline test", desc: "Làm quiz Chỉ số quảng cáo (30 câu) - lưu điểm để so sánh cuối khoá.", href: "/quiz/chi-so-quang-cao" },
  { title: "Chọn brand đồng hành", desc: "1 brand/ngành thật bạn sẽ phân tích xuyên suốt 12 buổi và dùng cho capstone." },
  { title: "Setup công cụ", desc: "Google Sheet, tài khoản seller TikTok Shop / Shopee (xem giao diện), app TikTok + Shopee trên điện thoại." },
  { title: "Tự chấm skill matrix", desc: "Tự đánh giá 6 năng lực theo thang S0-S4. Trainer review lại sau buổi 1." },
];

export type SessionPlan = {
  no: number;
  phase: PhaseKey;
  objective: string;
  preRead: { label: string; href: string }[];
  workshop: string;
  homework: string;
  tool?: { label: string; href: string };
};

export const SESSION_PLANS: SessionPlan[] = [
  {
    no: 1,
    phase: "P1",
    objective: "Vẽ được bức tranh TMĐT Việt Nam và tự đặt mục tiêu career 12 tháng",
    preRead: [
      { label: "Tư duy founder ecom 2026 - Từ GMV sang EBITDA", href: "/blog/tu-duy-founder-ecom-2026-gmv-vs-ebitda" },
    ],
    workshop: "Mỗi người giới thiệu brand đồng hành + 3 giả thuyết vì sao brand đó bán được / không bán được",
    homework: "Career goal 1 trang: vị trí mong muốn sau 12 tháng, 3 skill gap lớn nhất, kế hoạch lấp gap",
    tool: { label: "Quiz hướng nghiệp Marketing & Ecom", href: "/quiz/huong-nghiep-marketing" },
  },
  {
    no: 2,
    phase: "P1",
    objective: "Chọn được kênh ưu tiên cho brand đồng hành và giải thích bằng data",
    preRead: [
      { label: "Shop mới 2026 - TikTok Shop hay Shopee bắt đầu trước?", href: "/blog/shop-moi-tiktok-vs-shopee-bat-dau-truoc" },
      { label: "Top 10 ngành có ROAS cao nhất 2026", href: "/blog/top-10-nganh-roas-cao-nhat-2026" },
    ],
    workshop: "Vẽ customer journey omni của 1 shopper thật: thấy SP ở đâu, so giá ở đâu, mua ở đâu",
    homework: "Channel Map: so sánh 3 kênh cho brand đồng hành (shopper, traffic, phí, đối thủ) + kênh chọn trước",
  },
  {
    no: 3,
    phase: "P1",
    objective: "Viết được USP và định vị cho 1 SP, có so sánh với 3 đối thủ trực tiếp",
    preRead: [
      { label: "Case study: Brand Beauty 0 -> 2 tỷ GMV/tháng trong 6 tháng", href: "/blog/case-study-brand-beauty-0-2-ty-6-thang" },
    ],
    workshop: "Mổ xẻ 3 gian hàng đối thủ trên sàn: giá, review, listing, voucher, content",
    homework: "Competitor Sheet 3 đối thủ + SWOT + 1 câu USP (dưới 20 chữ)",
  },
  {
    no: 4,
    phase: "P1",
    objective: "Dựng được cấu trúc gian hàng chuẩn conversion trên TikTok Shop và Shopee",
    preRead: [
      { label: "Mall vs Non-Mall - Khi nào nên upgrade?", href: "/blog/mall-vs-non-mall-khi-nao-upgrade" },
      { label: "Cập nhật chính sách Shopee/TikTok 2026", href: "/blog/cap-nhat-chinh-sach-shopee-tiktok-h1-2026" },
    ],
    workshop: "Audit 1 gian hàng thật theo checklist 20 điểm: decor, danh mục, listing, policy",
    homework: "Store Setup Checklist cho brand đồng hành + 3 listing mẫu (title, ảnh, mô tả)",
  },
  {
    no: 5,
    phase: "P2",
    objective: "Tính đúng giá bán, phí sàn và lãi gộp theo từng mức giá",
    preRead: [
      { label: "Phí Shopee 2026 - So sánh chi tiết với TikTok Shop", href: "/blog/phi-shopee-2026-vs-tiktok" },
      { label: "Định giá sản phẩm để ads scale - Công thức 5 bước ngược", href: "/blog/dinh-gia-san-pham-de-ads-scale" },
    ],
    workshop: "Bóc tách phí 1 đơn hàng thật: giá gốc -> voucher -> phí -> tiền về tay",
    homework: "Pricing Sheet: 4 mức giá (gốc, sale, mega sale, voucher) + margin từng mức + forecast tồn kho 1 tháng",
    tool: { label: "Tool tính phí sàn", href: "/tools/tinh-phi-san" },
  },
  {
    no: 6,
    phase: "P2",
    objective: "Giải thích được các nguồn traffic và cách thuật toán phân phối",
    preRead: [
      { label: "TikTok Shop Live Commerce - Phí hoa hồng 2026", href: "/blog/tiktok-shop-live-commerce-phi-hoa-hong" },
      { label: "5 trigger psychology tăng CVR", href: "/blog/tam-ly-khach-hang-5-trigger-tang-cvr" },
    ],
    workshop: "Phân tích traffic mix của 1 shop: organic / ads / KOC / live chiếm bao nhiêu %",
    homework: "Traffic Plan 0->1: 30 ngày đầu cho brand đồng hành, mỗi nguồn traffic 1 hành động cụ thể",
  },
  {
    no: 7,
    phase: "P2",
    objective: "Đọc bộ chỉ số theo đúng thứ tự và tìm ra điểm nghẽn funnel",
    preRead: [
      { label: "Đừng chỉ nhìn CPC - 5 chỉ số ads quan trọng hơn", href: "/blog/khong-chi-nhin-cpc-5-chi-so-ads-quan-trong-hon" },
      { label: "Đọc chỉ số ads để không bị mù dữ liệu", href: "/blog/doc-chi-so-ads-khong-mu-du-lieu" },
    ],
    workshop: "Case data giả lập: CTR tốt, CR thấp - tìm nguyên nhân trong 20 phút theo nhóm",
    homework: "Metric Tree cho brand đồng hành: GMV = Traffic x CR x AOV, mỗi nhánh 2 đòn bẩy",
    tool: { label: "Quiz Chỉ số quảng cáo (làm lại)", href: "/quiz/chi-so-quang-cao" },
  },
  {
    no: 8,
    phase: "P2",
    objective: "Dựng được cấu trúc campaign và ngưỡng ROAS hoà vốn cho SP mới",
    preRead: [
      { label: "Cách đặt ROAS đúng cho sản phẩm mới - 30 ngày đầu", href: "/blog/dat-roas-dung-cho-san-pham-moi-30-ngay-dau" },
      { label: "Ads không ra đơn - Checklist 7 bước", href: "/blog/ads-khong-ra-don-checklist-7-buoc" },
    ],
    workshop: "Lên cấu trúc campaign TikTok + Shopee trên giấy, trainer review live",
    homework: "Ads Plan 30 ngày: campaign structure, budget/ngày, ROAS hoà vốn, rule tắt/scale + brief 1 KOC",
    tool: { label: "Tool ROAS hoà vốn", href: "/tools/roas-calculator" },
  },
  {
    no: 9,
    phase: "P3",
    objective: "Quyết định được khi nào mở thêm Website / Direct và thiết kế funnel tối thiểu",
    preRead: [
      { label: "6 metric ngầm ảnh hưởng lớn đến profit", href: "/blog/6-metric-ngam-anh-huong-profit" },
    ],
    workshop: "Vẽ funnel Facebook Ads -> Website / Inbox -> đơn hàng, tính CPA chấp nhận được",
    homework: "Omni Funnel 1 trang: vai trò từng kênh + KPI chính mỗi kênh",
  },
  {
    no: 10,
    phase: "P3",
    objective: "Lập được plan tháng và IMC plan có ngân sách + KPI + checkpoint",
    preRead: [
      { label: "Mùa sale lớn - Chiến lược ads 3 phase", href: "/blog/mua-sale-lon-chien-luoc-ads-3-phase" },
      { label: "Phân bổ ngân sách - Rule 70-20-10", href: "/blog/phan-bo-ngan-sach-tranh-cpo-dot-bien" },
    ],
    workshop: "Lên plan 1 tháng có mega sale theo template, ghép nhóm 2 người",
    homework: "Monthly Plan + IMC Calendar cho brand đồng hành - bản nháp đầu tiên của capstone",
  },
  {
    no: 11,
    phase: "P3",
    objective: "Trình bày và bảo vệ Plan 1 năm + P&L trước lớp",
    preRead: [
      { label: "P&L gian hàng TMĐT - 5 tầng đúng chuẩn", href: "/blog/pl-gian-hang-tmdt-5-tang-chuan" },
      { label: "Contribution Margin > ROAS", href: "/blog/contribution-margin-quan-trong-hon-roas" },
    ],
    workshop: "Mỗi người 15 phút present + 10 phút phản biện. Lớp chấm chéo theo rubric",
    homework: "Sửa capstone theo feedback - bản final nộp trước buổi 12",
    tool: { label: "Tool P&L Ecom 5 tầng", href: "/tools/pnl-ecom" },
  },
  {
    no: 12,
    phase: "P3",
    objective: "Từ data gian hàng đưa ra được 3 giải pháp ưu tiên có số liệu",
    preRead: [
      { label: "Cohort analysis - Track repeat buyer", href: "/blog/cohort-analysis-track-repeat-buyer" },
    ],
    workshop: "Data drill: dashboard 30 ngày của 1 shop thật (ẩn tên) -> 3 vấn đề -> 3 giải pháp",
    homework: "Làm lại baseline test + tự chấm skill matrix lần 2 + mục tiêu 3 tháng mentoring",
  },
];

export const SESSION_RHYTHM = [
  {
    label: "Trước buổi",
    time: "20-30 phút",
    items: ["Đọc pre-read (1-2 bài blog)", "Ghi 1 câu hỏi mang vào lớp"],
  },
  {
    label: "Trong buổi",
    time: "2-3 giờ",
    items: ["15' recap + chữa bài tập buổi trước", "90' training + case thật", "45' workshop theo nhóm", "15' quiz cuối buổi"],
  },
  {
    label: "Sau buổi",
    time: "1-2 giờ",
    items: ["Nộp bài tập trong 48h (Google Sheet)", "Trainer feedback trong 72h", "Hỏi đáp trong Zalo group"],
  },
];

export const CHECKPOINTS = [
  {
    no: 1,
    when: "Cuối tuần 2",
    name: "Brand Brief",
    desc: "1 trang: thị trường, 3 đối thủ, USP, kênh ưu tiên, cấu trúc gian hàng.",
    pass: "Có số liệu cho mỗi luận điểm, USP dưới 20 chữ",
  },
  {
    no: 2,
    when: "Cuối tuần 4",
    name: "Pricing + Ads Plan",
    desc: "Pricing Sheet 4 mức giá + Ads Plan 30 ngày với ROAS hoà vốn.",
    pass: "Margin mỗi mức giá dương, ROAS target > ROAS hoà vốn",
  },
  {
    no: 3,
    when: "Tuần 6",
    name: "Capstone",
    desc: "Plan 1 năm + P&L 5 tầng cho brand đồng hành, present 15 phút.",
    pass: "Rubric từ 6/10 trở lên",
  },
];

export const SKILL_LEVELS = [
  { key: "S0", name: "Chưa biết", desc: "Chưa tiếp xúc" },
  { key: "S1", name: "Hiểu", desc: "Giải thích được khái niệm" },
  { key: "S2", name: "Làm có hướng dẫn", desc: "Làm đúng khi có template / review" },
  { key: "S3", name: "Tự làm", desc: "Làm độc lập, tự sửa lỗi" },
  { key: "S4", name: "Dạy lại", desc: "Hướng dẫn được người khác" },
];

/** target: level cuối khoá, mentor: level mục tiêu sau 3 tháng mentoring (index trong SKILL_LEVELS) */
export const SKILL_MATRIX: { skill: string; s2: string; target: number; mentor: number }[] = [
  { skill: "Tư duy thị trường", s2: "Phân tích được thị trường + chọn kênh có data", target: 2, mentor: 3 },
  { skill: "Sản phẩm & Giá", s2: "Định giá 4 mức, tính đúng phí và margin", target: 2, mentor: 3 },
  { skill: "Vận hành sàn", s2: "Setup gian hàng, giữ chuẩn vận hành", target: 2, mentor: 3 },
  { skill: "Performance Ads", s2: "Dựng campaign, đặt ROAS hoà vốn, rule scale/tắt", target: 2, mentor: 3 },
  { skill: "Data & Chỉ số", s2: "Đọc metric tree, tìm điểm nghẽn funnel", target: 2, mentor: 3 },
  { skill: "Plan & P&L", s2: "Lập plan tháng + P&L 5 tầng theo template", target: 2, mentor: 3 },
];

export const GRADING = [
  { label: "Bài tập 12 buổi", weight: 30, color: "#7da9ff" },
  { label: "Quiz cuối buổi", weight: 10, color: "#4ad6ff" },
  { label: "Checkpoint 1 + 2", weight: 20, color: "#a78bff" },
  { label: "Capstone", weight: 40, color: "#ffae13" },
];

export const GRADUATION = [
  { tier: "Distinction", rule: "Từ 85 điểm", perk: "Ưu tiên giới thiệu cơ hội qua network trainer", color: "#5fffaa" },
  { tier: "Pass", rule: "70-84 điểm", perk: "Chứng nhận hoàn thành + 3 tháng mentoring", color: "#7da9ff" },
  { tier: "Not yet", rule: "Dưới 70 điểm", perk: "Học lại khoá sau miễn phí, giữ mentoring", color: "#ffd479" },
];

export const GRADUATION_RULES = [
  "Tham dự tối thiểu 10/12 buổi",
  "Nộp đủ 12 bài tập (trễ hạn trừ 50% điểm bài đó)",
  "Capstone đạt từ 6/10 điểm rubric",
];

export const CAPSTONE_RUBRIC = [
  { criteria: "Insight thị trường & đối thủ", points: 2 },
  { criteria: "Logic chọn kênh + định vị", points: 2 },
  { criteria: "Plan, ngân sách & KPI", points: 2 },
  { criteria: "P&L đúng công thức, số hợp lý", points: 2 },
  { criteria: "Trình bày & phản biện", points: 2 },
];

export const MENTORING_MONTHS = [
  {
    month: "Tháng 1",
    name: "Portfolio & Apply",
    items: ["Biến capstone thành case portfolio 1 trang", "Review CV + LinkedIn", "Mock interview 1 buổi", "Shortlist 10 vị trí phù hợp"],
    kpi: "Gửi tối thiểu 10 hồ sơ",
  },
  {
    month: "Tháng 2",
    name: "Thực chiến",
    items: ["Làm việc / project thật (job, freelance, shop gia đình)", "Review data hàng tuần với trainer", "Áp dụng metric tree vào số thật"],
    kpi: "1 case có số liệu thật",
  },
  {
    month: "Tháng 3",
    name: "Review & Next step",
    items: ["Chấm lại skill matrix lần 2", "Tổng kết case: vấn đề -> giải pháp -> kết quả", "Career plan 12 tháng tiếp theo"],
    kpi: "Đạt S3 ở tối thiểu 3/6 năng lực",
  },
];
