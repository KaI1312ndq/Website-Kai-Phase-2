export const COURSE = {
  name: "Foundation Ecommerce",
  tagline: "Tư duy thật, Thực chiến thật.",
  cohort: {
    label: "Khoá 1",
    startsAt: "Dự kiến T7/2026",
    capacity: 7,
    location: "Khu Thanh Xuân, Hà Nội (chốt sau khi đủ học viên)",
  },
  format: {
    sessions: 12,
    perWeek: 2,
    weeks: 6,
    hoursPerSession: "2–3h",
    mode: "100% Offline",
  },
  trainer: {
    name: "Nguyễn Đức Quảng",
    role: "Trainer · Digital Marketing Manager",
  },
} as const;

export type Module = "M1" | "M2" | "M3" | "M4" | "M5" | "Final";

export const MODULES: Record<Module, { name: string; color: string }> = {
  M1: { name: "Tư duy thị trường", color: "#4ad6ff" },
  M2: { name: "Chiến lược SP", color: "#7da9ff" },
  M3: { name: "Vận hành sàn", color: "#a78bff" },
  M4: { name: "Performance", color: "#ed52cb" },
  M5: { name: "Data & Plan", color: "#ffae13" },
  Final: { name: "Capstone", color: "#5fffaa" },
};

export const SESSIONS: {
  no: number;
  week: string;
  module: Module;
  title: string;
  bullets: string[];
  isPresentation?: boolean;
}[] = [
  {
    no: 1,
    week: "Tuần 1 · Buổi 1",
    module: "M1",
    title: "Tư duy thương mại + Sharing kinh nghiệm + Lộ trình hành trình",
    bullets: [
      "Tư duy về thương mại và TMĐT trong thị trường Việt Nam hiện nay",
      "Sharing kinh nghiệm 5+ năm thực chiến cả Agency lẫn Client",
      "Lộ trình hành trình từ Junior → DM Manager — bài học rút ra",
      "Cách định hình tư duy đúng từ đầu cho người mới",
    ],
  },
  {
    no: 2,
    week: "Tuần 1 · Buổi 2",
    module: "M1",
    title: "Chiến lược kinh doanh đa sàn",
    bullets: [
      "Thị phần & cơ cấu doanh thu các sàn TMĐT VN/SEA",
      "So sánh đặc thù TikTok Shop · Shopee · Lazada · Website · Direct",
      "Hành vi shopper từng kênh + customer journey omni",
      "Cách chọn kênh ưu tiên cho từng giai đoạn brand",
    ],
    isPresentation: true,
  },
  {
    no: 3,
    week: "Tuần 2 · Buổi 1",
    module: "M2",
    title: "Chiến lược SP, phân tích đối thủ, định vị, USP, SWOT, thị trường",
    bullets: [
      "Phương pháp phân tích thị trường và đối thủ",
      "Cách build USP cho sản phẩm mới + định vị brand",
      "SWOT thực dụng — không phải template trên slide",
      "Case study định vị thực tế từ brand đã làm",
    ],
  },
  {
    no: 4,
    week: "Tuần 2 · Buổi 2",
    module: "M3",
    title: "Setup gian hàng A→Z",
    bullets: [
      "Logo · Banner · Decor — chuẩn về visual identity trên sàn",
      "Cấu trúc danh mục sản phẩm tối ưu cho conversion",
      "Policy gian hàng: vận chuyển, đổi trả, bảo hành",
      "Setup gian hàng từ 0 trên TikTok Shop và Shopee",
    ],
  },
  {
    no: 5,
    week: "Tuần 3 · Buổi 1",
    module: "M3",
    title: "Tư duy giá · Tồn kho · Điểm gian hàng",
    bullets: [
      "Tư duy về phí sàn — bóc tách từng loại phí, cost thực sự là gì",
      "Các mức giá: gốc, sale, A+, voucher · cách setup giá đúng nhịp sàn",
      "Forecast tồn kho + tiêu chuẩn vận chuyển của sàn (SLA)",
      "Yếu tố ảnh hưởng điểm gian hàng — Mall vs non-Mall",
      "Tiêu chuẩn vận hành để giữ điểm gian hàng > 4.8",
    ],
    isPresentation: true,
  },
  {
    no: 6,
    week: "Tuần 3 · Buổi 2",
    module: "M4",
    title: "Traffic + thuật toán TikTok Shop & Shopee",
    bullets: [
      "Các nguồn traffic của 1 gian hàng: organic, ads, KOC, live",
      "Thuật toán phân phối TikTok Shop · Shopee Discovery",
      "Yếu tố ảnh hưởng tới traffic — đào sâu logic",
      "Cách tăng traffic cho gian hàng giai đoạn 0→1",
    ],
  },
  {
    no: 7,
    week: "Tuần 4 · Buổi 1",
    module: "M4",
    title: "Bộ chỉ số Marketing + logic sử dụng chỉ số",
    bullets: [
      "Bản đồ chỉ số — chỉ số nào key, chỉ số nào supporting",
      "Logic đọc chỉ số: tìm vấn đề từ chỉ số nào trước",
      "Cách test chỉ số — A/B mindset thực tế",
      "Đào sâu: từ 1 chỉ số bất thường ra được giải pháp",
    ],
  },
  {
    no: 8,
    week: "Tuần 4 · Buổi 2",
    module: "M4",
    title: "Setup TikTok Ads + Shopee Ads + KOC/KOL chọn lọc",
    bullets: [
      "TikTok Ads: VSA · LSA · Live Ads — chọn loại nào khi nào",
      "Shopee Ads: Search · Discovery · Affiliate — combo tối ưu",
      "Pixel · Conversion tracking · Integrity",
      "KOC/KOL: chọn lọc, brief, đo hiệu quả thực tế",
    ],
    isPresentation: true,
  },
  {
    no: 9,
    week: "Tuần 5 · Buổi 1",
    module: "M4",
    title: "Facebook Ads + bán hàng qua Website + Direct Sale",
    bullets: [
      "Facebook Ads cho Ecom: CPAS · Catalogue · Lead Gen",
      "Bán hàng qua Website: stack tối thiểu, conversion funnel",
      "Direct Sale + chatbot — mô hình + cách triển khai",
      "Khi nào nên đầu tư Web/Direct vs sàn",
    ],
  },
  {
    no: 10,
    week: "Tuần 5 · Buổi 2",
    module: "M5",
    title: "Lập plan tháng/quý + IMC plan thực chiến",
    bullets: [
      "Cấu trúc 1 plan tháng/quý cho gian hàng — template chuẩn",
      "Cách lên IMC plan kết hợp performance + branding",
      "Phân bổ ngân sách theo mục tiêu growth",
      "Kết nối plan với KPI và checkpoint",
    ],
  },
  {
    no: 11,
    week: "Tuần 6 · Buổi 1",
    module: "Final",
    title: "Plan 1 năm + P&L cho 1 brand thật",
    bullets: [
      "Mỗi học viên trình bày Plan 1 năm cho brand mình chọn",
      "P&L chi tiết: doanh thu mục tiêu, chi phí, profit",
      "Trainer + lớp phản biện 1-1, đưa feedback cụ thể",
      "Đây là sản phẩm cuối — dùng để pitch khi xin việc",
    ],
    isPresentation: true,
  },
  {
    no: 12,
    week: "Tuần 6 · Buổi 2",
    module: "M5",
    title: "Phân tích data → giải pháp + P&L gian hàng",
    bullets: [
      "Cách đọc data gian hàng theo nhịp ngày · tuần · tháng",
      "Từ vấn đề data → đưa giải pháp triển khai cụ thể",
      "P&L gian hàng nâng cao — biên lợi nhuận theo SKU",
      "Chuẩn bị tư duy cho 3 tháng mentoring sau khoá",
    ],
  },
];

export const FIT_FOR = [
  "Sinh viên muốn vào ngành TMĐT",
  "Người mới đi làm chuyển sang Ecom",
  "Marketer trẻ đang làm sàn, muốn nâng tư duy",
  "Có laptop riêng, biết Excel cơ bản",
  "Mong muốn làm Ecom thật, không học cho biết",
  "Sắp xếp được lịch 2 buổi/tuần × 6 tuần",
];

export const NOT_FIT_FOR = [
  "Đã có hơn 3 năm Ecom expertise — quá cơ bản",
  "Học để \"biết thêm\" mà không thực hành",
  "Không cam kết được lịch học",
  "Cần khoá dạy tool lẻ thay vì tư duy",
  "Tìm short-cut, hack, mánh khoé ngắn hạn",
];

export const OUTCOMES = [
  {
    title: "Hiểu tư duy kinh doanh sàn TMĐT",
    sub: "Đọc thị trường, hành vi shopper, công thức từng sàn",
  },
  {
    title: "Tự lập được Plan 1 năm",
    sub: "Cho TikTok Shop + Shopee, kèm P&L chi tiết",
  },
  {
    title: "Đọc và đánh giá performance",
    sub: "Phân tích data → đưa được giải pháp cơ bản",
  },
  {
    title: "Setup + vận hành full module",
    sub: "Một gian hàng từ 0 đến chạy ổn định",
  },
  {
    title: "Bonus: tư duy career",
    sub: "Apply công việc, phát triển sự nghiệp, làm việc đúng",
  },
  {
    title: "Network học viên vĩnh viễn",
    sub: "Zalo group hỗ trợ + connect các khoá sau",
  },
];

export const AFTER_COURSE = [
  {
    title: "3 tháng mentoring 1-1",
    desc: "Tối thiểu 2 tuần/lần, có thể 1 tuần/lần. Online hoặc Offline tuỳ. Scope: career + technical Q&A + CV review + apply công việc.",
  },
  {
    title: "Slide + Template Excel/Sheet",
    desc: "Slide từng buổi gửi sau session. Template plan, P&L, dashboard sẵn sàng dùng cho công việc thực.",
  },
  {
    title: "Zalo group hỗ trợ vĩnh viễn",
    desc: "Cộng tất cả các khoá vào chung 1 group. Hỗ trợ kéo dài, không cắt sau khoá. Network qua các đợt.",
  },
  {
    title: "Network thực chiến",
    desc: "Connect với học viên các khoá sau, các bạn đã đi làm Ecom thực tế. Mentoring và cơ hội cùng nhau lớn lên.",
  },
];

export const FAQS = [
  {
    q: "Khoá này phù hợp với ai?",
    a: "Sinh viên muốn vào ngành TMĐT, người mới đi làm chuyển sang Ecom, marketer trẻ đang làm sàn nhưng muốn nâng tư duy. Đặc biệt phù hợp nếu bạn đang muốn làm thật chứ không phải học cho biết.",
  },
  {
    q: "Khoá này KHÔNG phù hợp với ai?",
    a: "Người đã có hơn 3 năm Ecom expertise — nội dung sẽ quá cơ bản. Người tìm short-cut/mánh khoé. Người không cam kết được lịch 2 buổi/tuần × 6 tuần. Người muốn dạy tool lẻ thay vì tư duy.",
  },
  {
    q: "Có hoàn tiền không nếu nghỉ giữa chừng?",
    a: "Không. Đây là trách nhiệm của người học. Đó cũng là lý do mình có quick meet 15 phút trước khi nhận tiền — để chắc chắn 2 bên cùng phù hợp và cam kết.",
  },
  {
    q: "999.000đ Khoá 1 vs 2.999.000đ Early-bird khác gì?",
    a: "Cùng nội dung. Khoá 1 (999.000đ) là khoá đầu tiên mở bán, mình giảm để testing và build community. Sau đó Early-bird (2.999.000đ) cho khoá tiếp theo, rồi giá chuẩn 4.999.000đ về sau.",
  },
  {
    q: "Học xong có giới thiệu việc làm không?",
    a: "Không cam kết, nhưng 3 tháng mentoring sau khoá sẽ hỗ trợ định hướng career, review CV, và apply công việc. Network của mình ở UpBase + các brand đã làm có thể là cầu nối khi phù hợp.",
  },
  {
    q: "Có quay lại học khoá sau miễn phí không?",
    a: "Có. Học viên khoá cũ có thể tham dự lại bất kỳ buổi nào của khoá sau miễn phí, miễn là còn slot trong phòng học.",
  },
  {
    q: "Lịch học cụ thể thế nào?",
    a: "2 buổi/tuần × 6 tuần. Lịch chốt sau khi đủ 5–7 học viên + quick meet xong, để align với cả nhóm. Mỗi buổi 2–3 tiếng.",
  },
  {
    q: "Địa điểm cụ thể ở đâu?",
    a: "Khu Thanh Xuân, Hà Nội. Chỗ cụ thể chốt sau khi đủ học viên — sẽ chọn không gian thoải mái cho lớp nhỏ 5–7 người.",
  },
];
