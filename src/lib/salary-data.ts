/**
 * Salary database VN 2026 - programmatic SEO data.
 * 20 roles trong Marketing / Ecom / Tech để generate trang /luong/[slug].
 *
 * Số liệu reference từ:
 * - VietnamWorks Salary Report 2025
 * - JobsGO data
 * - LinkedIn salary insights
 * - Survey alumni Quảng
 *
 * Data này feed cả /luong/[slug] (programmatic SEO) + /resources Salary Benchmark file.
 */

export type SalaryLevel = "intern" | "fresher" | "junior" | "mid" | "senior" | "manager" | "director";

export const LEVEL_LABELS: Record<SalaryLevel, string> = {
  intern: "Intern",
  fresher: "Fresher (0-1 năm)",
  junior: "Junior (1-2 năm)",
  mid: "Mid-level (2-4 năm)",
  senior: "Senior (4-6 năm)",
  manager: "Manager (6-9 năm)",
  director: "Director (9+ năm)",
};

export type SalaryCategory = "marketing" | "ecommerce" | "performance" | "content" | "data" | "product" | "sales" | "leadership";

export const CATEGORY_LABELS: Record<SalaryCategory, string> = {
  marketing: "Marketing",
  ecommerce: "Ecommerce",
  performance: "Performance Marketing",
  content: "Content & Brand",
  data: "Data & Analytics",
  product: "Product",
  sales: "Sales",
  leadership: "Leadership",
};

export type SalaryRole = {
  slug: string;
  name: string;
  shortName: string;          // for breadcrumb
  category: SalaryCategory;
  description: string;        // hero subtitle
  longDescription: string;    // intro paragraph (SEO body)
  ranges: Partial<Record<SalaryLevel, [number, number]>>; // triệu VNĐ/tháng [min, max]
  topCompanies: Array<{ name: string; salary: string; note?: string }>;
  skills: Array<{ name: string; importance: "must" | "nice"; relatedQuiz?: string }>;
  responsibilities: string[];  // 4-6 bullet points
  careerPath: Array<{ stage: string; years: string; salary: string }>;
  faq: Array<{ q: string; a: string }>;
  relatedSlugs: string[];      // 3-5 related roles
  trending?: "up" | "stable" | "down";
  keywords: string[];          // SEO keywords
};

const SALARY_ROLES: SalaryRole[] = [
  // ─── PERFORMANCE MARKETING (3) ───
  {
    slug: "performance-marketer",
    name: "Performance Marketer",
    shortName: "Performance Marketer",
    category: "performance",
    description: "Chạy ads đa nền tảng - TikTok Ads, Facebook Ads, Google Ads. Kéo doanh thu cho brand bằng ROAS rõ ràng.",
    longDescription: "Performance Marketer là role kéo doanh thu trực tiếp bằng paid ads. Khác với Brand Marketer (xây nhận diện), Performance đo bằng ROAS, CPA, CPM cụ thể. Tại Việt Nam 2026, role này hot nhất ngành nhờ bùng nổ TikTok Shop + Shopee Mall. Người làm tốt có thể nhảy từ Junior 12tr lên Senior 35tr trong 3 năm.",
    ranges: {
      intern: [4, 6],
      fresher: [10, 14],
      junior: [14, 20],
      mid: [20, 32],
      senior: [32, 50],
      manager: [50, 80],
      director: [80, 150],
    },
    topCompanies: [
      { name: "UpBase", salary: "15-50tr", note: "Top agency Ecom + TikTok Shop VN" },
      { name: "Tomorrow Marketers", salary: "18-45tr", note: "Brand-led performance" },
      { name: "Coc Coc", salary: "20-40tr", note: "Search + display in-house" },
      { name: "Shopee Vietnam", salary: "22-55tr", note: "Marketplace Performance" },
      { name: "TikTok Vietnam", salary: "30-70tr", note: "ByteDance commerce team" },
    ],
    skills: [
      { name: "TikTok Ads Manager", importance: "must" },
      { name: "Facebook Ads Manager", importance: "must" },
      { name: "Google Ads (Search + Shopping)", importance: "must" },
      { name: "Excel/Sheets pivot + formula", importance: "must" },
      { name: "P&L gian hàng", importance: "must" },
      { name: "Looker Studio", importance: "nice" },
      { name: "GA4 + GTM", importance: "nice" },
      { name: "SQL cơ bản", importance: "nice", relatedQuiz: "huong-nghiep-marketing" },
    ],
    responsibilities: [
      "Setup + chạy campaign trên TikTok Ads, Facebook Ads, Google Ads (đa platform)",
      "Tối ưu ROAS, CPC, CPM theo target từng campaign",
      "A/B test creative + audience + bidding",
      "Build report P&L hàng tuần (Revenue, Spend, COGS, Net Margin)",
      "Coordinate với Content team, KOL/KOC, Operation",
      "Scale campaign winner + kill loser nhanh trong 48h",
    ],
    careerPath: [
      { stage: "Intern → Fresher", years: "0-1 năm", salary: "4-14tr" },
      { stage: "Junior Performance", years: "1-2 năm", salary: "14-20tr" },
      { stage: "Mid-level Performance", years: "2-4 năm", salary: "20-32tr" },
      { stage: "Senior Performance", years: "4-6 năm", salary: "32-50tr" },
      { stage: "Performance Manager", years: "6-9 năm", salary: "50-80tr" },
      { stage: "Head of Performance", years: "9+ năm", salary: "80-150tr" },
    ],
    faq: [
      { q: "Performance Marketer học từ đâu?", a: "Self-learn 70% qua course online (Meta Blueprint, TikTok Academy) + 30% qua làm thực tế. Hoặc apply junior tại agency để có mentor + ngân sách thực." },
      { q: "Cần background gì để vào?", a: "Không cần bằng cấp đặc thù. Cần: Excel/Sheets tốt, hiểu cơ bản P&L, tư duy số. Background Kinh tế/Marketing/Toán là plus." },
      { q: "Tự chạy ads gia đình/shop nhỏ có tính kinh nghiệm không?", a: "Có. Nếu bạn chạy >50tr ngân sách + có data ROAS cụ thể, agency/brand sẽ tính tương đương 6-12 tháng kinh nghiệm." },
      { q: "Performance Marketer khác Digital Marketing như nào?", a: "Digital Marketing rộng (SEO, Content, Email, Social, Ads). Performance Marketer chuyên paid ads + đo bằng ROAS/CPA. Performance = subset của Digital nhưng deep hơn." },
    ],
    relatedSlugs: ["tiktok-shop-specialist", "facebook-ads-specialist", "ecommerce-executive", "growth-marketer"],
    trending: "up",
    keywords: ["lương performance marketer", "lương digital marketing", "lương chạy ads", "performance marketing salary vietnam"],
  },
  {
    slug: "tiktok-shop-specialist",
    name: "TikTok Shop Specialist",
    shortName: "TikTok Specialist",
    category: "ecommerce",
    description: "Chuyên gia vận hành gian hàng TikTok Shop - từ setup, ads, livestream đến content shoppable.",
    longDescription: "TikTok Shop Specialist là role bùng nổ nhất Việt Nam 2024-2026. Job đòi hỏi vừa hiểu TikTok algorithm, vừa làm Ecom (sàn, inventory, voucher). Người làm tốt thường kiếm tăng 50%/năm trong 2 năm đầu nhờ thị trường thiếu hụt nhân sự chuyên sâu.",
    ranges: {
      fresher: [12, 18],
      junior: [18, 26],
      mid: [26, 40],
      senior: [40, 60],
      manager: [60, 100],
    },
    topCompanies: [
      { name: "UpBase", salary: "18-55tr", note: "Top TT Shop agency VN" },
      { name: "Adsplus", salary: "15-40tr" },
      { name: "TikTok Vietnam", salary: "30-70tr", note: "Live commerce team" },
      { name: "AnyMind Group", salary: "25-60tr" },
      { name: "MOG Vietnam", salary: "22-50tr" },
    ],
    skills: [
      { name: "TikTok Ads Manager", importance: "must" },
      { name: "TikTok Shop Seller Center", importance: "must" },
      { name: "Livestream operation", importance: "must" },
      { name: "KOC/KOL booking + management", importance: "must" },
      { name: "Voucher + Affiliate setup", importance: "must" },
      { name: "Content shoppable script", importance: "nice" },
    ],
    responsibilities: [
      "Setup gian hàng TikTok Shop từ 0 đến đạt Mall",
      "Run TikTok Ads (Video Shopping Ads, Live Shopping Ads, Product Shopping Ads)",
      "Quản lý KOC/KOL affiliate (booking, brief, payout)",
      "Lên kế hoạch livestream theo tuần + train host",
      "Tối ưu Voucher + flash sale theo data",
      "Báo cáo GMV, Net Revenue, ROAS hàng tuần",
    ],
    careerPath: [
      { stage: "Fresher", years: "0-1 năm", salary: "12-18tr" },
      { stage: "Junior TikTok Specialist", years: "1-2 năm", salary: "18-26tr" },
      { stage: "Mid TikTok Specialist", years: "2-4 năm", salary: "26-40tr" },
      { stage: "Senior / Lead", years: "4-6 năm", salary: "40-60tr" },
      { stage: "TikTok Manager", years: "6+ năm", salary: "60-100tr" },
    ],
    faq: [
      { q: "Cần kinh nghiệm gì để apply TikTok Shop Specialist?", a: "Tối thiểu 6 tháng tự chạy 1 shop TikTok (cá nhân hoặc gia đình), GMV ≥30tr/tháng. Hoặc 1 năm Ecom executive sàn (Shopee/Lazada) chuyển qua." },
      { q: "TikTok Shop có bão hoà chưa?", a: "Chưa. 2026 thị trường còn growth 30-50% YoY. Nhưng độ khó tăng - phải biết livestream + KOC + ads tích hợp, không còn chạy đơn ads kiểu cũ." },
      { q: "Lương TikTok cao hơn Shopee không?", a: "Có. TikTok Shop trả cao hơn Shopee/Lazada 15-30% vì thiếu nhân sự + GMV cao hơn. Nhưng áp lực cũng cao hơn (algorithm thay đổi liên tục)." },
    ],
    relatedSlugs: ["performance-marketer", "ecommerce-executive", "shopee-specialist", "content-creator"],
    trending: "up",
    keywords: ["lương tiktok shop", "lương tiktok specialist", "tiktok shop salary vn"],
  },
  {
    slug: "facebook-ads-specialist",
    name: "Facebook Ads Specialist",
    shortName: "FB Ads Specialist",
    category: "performance",
    description: "Chuyên ads Meta (Facebook + Instagram) cho ecommerce, lead gen, app install.",
    longDescription: "Facebook Ads Specialist vẫn là role nền tảng dù TikTok đang bùng nổ. Meta Ads chiếm 40-50% ngân sách digital của brands VN. Người làm Facebook Ads tốt biết Conversion API, Advantage+, Aldine + tối ưu pixel - không chỉ click vào Boost Post.",
    ranges: {
      fresher: [9, 14],
      junior: [14, 20],
      mid: [20, 30],
      senior: [30, 45],
      manager: [45, 70],
    },
    topCompanies: [
      { name: "UpBase", salary: "14-45tr" },
      { name: "Tomorrow Marketers", salary: "16-40tr" },
      { name: "PMAX", salary: "18-50tr" },
      { name: "Mediapulse", salary: "15-35tr" },
      { name: "Climax Vietnam", salary: "20-50tr" },
    ],
    skills: [
      { name: "Meta Ads Manager + CAPI", importance: "must" },
      { name: "Pixel + Custom Conversions", importance: "must" },
      { name: "Advantage+ Shopping Campaigns", importance: "must" },
      { name: "Audience build (Lookalike, Custom, Retargeting)", importance: "must" },
      { name: "Creative testing framework", importance: "must" },
      { name: "GA4 attribution modeling", importance: "nice" },
    ],
    responsibilities: [
      "Build + maintain Meta Ads campaign cho ecom + lead gen + app",
      "Setup Pixel + CAPI + Conversions API",
      "A/B test creative (image, video, carousel) + audience",
      "Scale winner campaign từ 5tr/ngày lên 50tr/ngày không vỡ ROAS",
      "Phối hợp với Content team brief creative",
      "Audit + đề xuất Advantage+ campaign khi phù hợp",
    ],
    careerPath: [
      { stage: "Fresher", years: "0-1 năm", salary: "9-14tr" },
      { stage: "Junior", years: "1-2 năm", salary: "14-20tr" },
      { stage: "Mid", years: "2-4 năm", salary: "20-30tr" },
      { stage: "Senior", years: "4-6 năm", salary: "30-45tr" },
      { stage: "Manager", years: "6+ năm", salary: "45-70tr" },
    ],
    faq: [
      { q: "Facebook Ads còn đáng học không khi TikTok lên?", a: "Có. FB Ads vẫn chiếm 40-50% ngân sách digital VN. Brands sẽ luôn cần multi-platform. Học FB → dễ chuyển TikTok hơn ngược lại." },
      { q: "Meta certification có giá trị không?", a: "Có vai trò filter CV nhưng không quyết định lương. Quan trọng hơn là portfolio campaign + ROAS thực tế." },
    ],
    relatedSlugs: ["performance-marketer", "tiktok-shop-specialist", "google-ads-specialist", "growth-marketer"],
    trending: "stable",
    keywords: ["lương facebook ads", "lương meta ads", "lương fb ads specialist"],
  },

  // ─── ECOMMERCE (3) ───
  {
    slug: "ecommerce-executive",
    name: "Ecommerce Executive",
    shortName: "Ecom Executive",
    category: "ecommerce",
    description: "Vận hành gian hàng đa sàn TMĐT - TikTok Shop, Shopee, Lazada, Tiki. Từ setup đến tối ưu ROAS, doanh thu.",
    longDescription: "Ecommerce Executive là entry-level role phổ biến nhất ngành TMĐT VN. Khác Marketing Executive (chỉ làm ads), Ecom Executive làm cả Operation (kho, vận chuyển, voucher) + Ads + KPI doanh thu. Đây là role tốt nhất để hiểu toàn bộ business Ecom trước khi chuyên sâu.",
    ranges: {
      intern: [4, 6],
      fresher: [8, 14],
      junior: [12, 18],
      mid: [18, 28],
      senior: [28, 42],
      manager: [42, 65],
    },
    topCompanies: [
      { name: "UpBase", salary: "10-40tr" },
      { name: "The Bad God", salary: "12-30tr" },
      { name: "OnPoint", salary: "15-45tr" },
      { name: "Xiaomi Vietnam (Bigmi)", salary: "12-35tr" },
      { name: "Shopee", salary: "15-45tr" },
    ],
    skills: [
      { name: "Shopee Seller Center", importance: "must" },
      { name: "TikTok Shop Seller Center", importance: "must" },
      { name: "Lazada + Tiki Seller", importance: "nice" },
      { name: "Excel/Sheets pivot + VLOOKUP", importance: "must" },
      { name: "Hiểu P&L gian hàng (Revenue → Net)", importance: "must" },
      { name: "Voucher + Affiliate setup", importance: "must" },
    ],
    responsibilities: [
      "Setup + maintain gian hàng đa sàn (TikTok Shop, Shopee, Lazada, Tiki)",
      "Theo dõi tồn kho, đặt thêm hàng, sync data sàn",
      "Setup Voucher, Flash Sale, Affiliate hàng tuần",
      "Coordinate với Ads team, Content, Warehouse",
      "Báo cáo Revenue + GMV + Net Margin hàng tuần",
      "Optimize điểm sàn (Mall qualification, ranking)",
    ],
    careerPath: [
      { stage: "Intern → Fresher", years: "0-1 năm", salary: "4-14tr" },
      { stage: "Junior", years: "1-2 năm", salary: "12-18tr" },
      { stage: "Mid", years: "2-4 năm", salary: "18-28tr" },
      { stage: "Senior", years: "4-6 năm", salary: "28-42tr" },
      { stage: "Ecom Manager", years: "6+ năm", salary: "42-65tr" },
    ],
    faq: [
      { q: "Sinh viên năm 3-4 apply Ecom Executive được không?", a: "Hoàn toàn được. Hầu hết Ecom Junior bắt đầu từ Intern năm 3 với mức 4-6tr. Quan trọng nhất là biết Excel + chịu khó học sàn." },
      { q: "Ecom Executive khác Marketing Executive?", a: "Ecom Executive làm cả Operation + Ads + KPI revenue. Marketing Executive thường chỉ làm Ads/Content/Brand, không quản lý gian hàng cụ thể." },
    ],
    relatedSlugs: ["tiktok-shop-specialist", "shopee-specialist", "performance-marketer", "operation-manager"],
    trending: "up",
    keywords: ["lương ecommerce executive", "lương ecom executive", "lương vận hành tmdt"],
  },
  {
    slug: "shopee-specialist",
    name: "Shopee Specialist",
    shortName: "Shopee Specialist",
    category: "ecommerce",
    description: "Chuyên Shopee - từ Mall qualification, ads Shopee Ads, voucher, search rank tới Brand Box.",
    longDescription: "Shopee Specialist tập trung sâu vào platform Shopee - thị trường còn lớn dù TikTok đang lên. Brands lớn vẫn chi 30-50% ngân sách vào Shopee. Người làm Shopee tốt hiểu search algorithm + product tagging + Brand Box advantage.",
    ranges: {
      fresher: [9, 14],
      junior: [14, 20],
      mid: [20, 30],
      senior: [30, 45],
      manager: [45, 70],
    },
    topCompanies: [
      { name: "Shopee Vietnam", salary: "15-50tr", note: "In-house tại marketplace" },
      { name: "OnPoint", salary: "14-40tr" },
      { name: "UpBase", salary: "13-38tr" },
      { name: "Brands trực tiếp (Xiaomi, Anker, etc.)", salary: "15-50tr" },
    ],
    skills: [
      { name: "Shopee Ads Console", importance: "must" },
      { name: "Shopee Seller Center", importance: "must" },
      { name: "Shopee Mall ranking + Brand Box", importance: "must" },
      { name: "Voucher, Coin, Flash Sale", importance: "must" },
      { name: "Shopee Affiliate Marketing", importance: "nice" },
    ],
    responsibilities: [
      "Tối ưu Shopee Ads (Search Ads, Auto Ads, GMV Max)",
      "Setup Voucher đa tầng + Coin Cashback",
      "Optimize sản phẩm cho Shopee Mall ranking",
      "Manage Affiliate KOC/KOL trên Shopee",
      "Báo cáo Revenue + ROAS + Net Margin",
    ],
    careerPath: [
      { stage: "Fresher", years: "0-1 năm", salary: "9-14tr" },
      { stage: "Junior", years: "1-2 năm", salary: "14-20tr" },
      { stage: "Mid", years: "2-4 năm", salary: "20-30tr" },
      { stage: "Senior", years: "4-6 năm", salary: "30-45tr" },
      { stage: "Manager", years: "6+ năm", salary: "45-70tr" },
    ],
    faq: [
      { q: "Shopee vs TikTok Shop nên chuyên cái nào?", a: "Cả 2 đều đáng. Nhưng nếu bắt đầu, Shopee dễ hơn (system stable, ít update đột ngột). TikTok cần thêm livestream + KOC khó hơn." },
    ],
    relatedSlugs: ["tiktok-shop-specialist", "ecommerce-executive", "performance-marketer", "operation-manager"],
    trending: "stable",
    keywords: ["lương shopee specialist", "lương shopee vận hành"],
  },
  {
    slug: "operation-manager",
    name: "Ecommerce Operation Manager",
    shortName: "Ops Manager",
    category: "ecommerce",
    description: "Quản lý vận hành toàn diện - kho, đơn hàng, KPI gian hàng, team, supply chain Ecom.",
    longDescription: "Operation Manager là role middle-management quan trọng, đặc biệt tại brands trả lương cao (50-100tr). Vai trò: build & manage team Ecom, dashboard KPI, optimize supply chain, coordinate cross-function.",
    ranges: {
      mid: [25, 40],
      senior: [40, 60],
      manager: [60, 100],
      director: [100, 180],
    },
    topCompanies: [
      { name: "UpBase", salary: "40-90tr" },
      { name: "Xiaomi Vietnam", salary: "45-100tr" },
      { name: "OnPoint", salary: "50-110tr" },
      { name: "Anker Vietnam", salary: "60-130tr" },
      { name: "Mobile World Group", salary: "50-120tr" },
    ],
    skills: [
      { name: "Excel + Power BI / Looker Studio", importance: "must" },
      { name: "P&L gian hàng + Net Margin analysis", importance: "must" },
      { name: "Team management 5-15 người", importance: "must" },
      { name: "Supply chain + inventory planning", importance: "must" },
      { name: "OKR/KPI framework", importance: "must" },
      { name: "SQL cơ bản", importance: "nice" },
    ],
    responsibilities: [
      "Build team Ecom 5-15 người (Junior + Mid + Specialist)",
      "Setup dashboard KPI realtime (Revenue, Net Margin, AOV, Conversion)",
      "Quản lý supply chain - inventory, vendor, warehouse",
      "Đào tạo + coach junior, mentor career path",
      "Báo cáo CEO/COO hàng tuần",
      "Optimize cost: ads ROAS, fee sàn, shipping, COGS",
    ],
    careerPath: [
      { stage: "Mid Ops", years: "2-4 năm", salary: "25-40tr" },
      { stage: "Senior Ops", years: "4-6 năm", salary: "40-60tr" },
      { stage: "Ops Manager", years: "6-9 năm", salary: "60-100tr" },
      { stage: "Head of Ops / Director", years: "9+ năm", salary: "100-180tr" },
    ],
    faq: [
      { q: "Lên Ops Manager cần background gì?", a: "Thường có 4-6 năm Ecom Specialist/Executive + chứng minh được KPI tăng team. Quan trọng nhất: tư duy P&L + leadership." },
      { q: "Ops Manager vs Marketing Manager khác gì?", a: "Ops Manager focus vào hiệu suất gian hàng + supply chain. Marketing Manager focus vào brand + acquisition. Tại brands lớn, 2 role này phối hợp dưới Director." },
    ],
    relatedSlugs: ["ecommerce-executive", "performance-marketer", "data-analyst", "growth-marketer"],
    trending: "up",
    keywords: ["lương operation manager", "lương ecom manager", "lương quản lý vận hành tmdt"],
  },

  // ─── MARKETING (3) ───
  {
    slug: "marketing-manager",
    name: "Marketing Manager",
    shortName: "Marketing Manager",
    category: "leadership",
    description: "Lead toàn bộ marketing team - performance, content, brand, ngân sách + KPI doanh thu.",
    longDescription: "Marketing Manager là role middle-senior trả lương 40-80tr tại VN 2026. Quản lý team 3-10 người, ngân sách 500tr-5 tỷ/tháng, đối với cả CEO + Sales + Operation. Người làm tốt thường có hybrid background: Performance + Content + Data.",
    ranges: {
      mid: [25, 40],
      senior: [40, 60],
      manager: [55, 90],
      director: [90, 150],
    },
    topCompanies: [
      { name: "UpBase", salary: "50-100tr" },
      { name: "Tomorrow Marketers", salary: "45-90tr" },
      { name: "Climax Vietnam", salary: "55-110tr" },
      { name: "Brands lớn (Coolmate, Routine, ...)", salary: "60-120tr" },
    ],
    skills: [
      { name: "Marketing strategy + funnel design", importance: "must" },
      { name: "Budget allocation + P&L", importance: "must" },
      { name: "Team management 3-10 người", importance: "must" },
      { name: "Multi-channel acquisition", importance: "must" },
      { name: "Analytics + attribution", importance: "must" },
      { name: "Brand building basics", importance: "nice" },
    ],
    responsibilities: [
      "Lên kế hoạch marketing quarter/year + budget",
      "Lead team performance + content + brand",
      "Set + track KPI: CAC, LTV, ROAS, Brand metrics",
      "Coordinate với Sales, Product, CEO",
      "Hire + train marketing team",
      "Optimize ngân sách monthly theo data",
    ],
    careerPath: [
      { stage: "Mid Marketing", years: "2-4 năm", salary: "25-40tr" },
      { stage: "Senior Marketing", years: "4-6 năm", salary: "40-60tr" },
      { stage: "Marketing Manager", years: "6-9 năm", salary: "55-90tr" },
      { stage: "Marketing Director", years: "9+ năm", salary: "90-150tr" },
    ],
    faq: [
      { q: "Marketing Manager cần học MBA không?", a: "Không bắt buộc. Brands VN quan trọng kinh nghiệm thực + portfolio campaign hơn. MBA là plus nếu apply MNC." },
      { q: "Lên Marketing Manager mất bao lâu?", a: "Trung bình 6-9 năm từ fresher. Có thể nhanh hơn (4-5 năm) nếu nhảy job giữa các brands trẻ + chứng minh KPI tăng." },
    ],
    relatedSlugs: ["growth-marketer", "performance-marketer", "brand-manager", "operation-manager"],
    trending: "stable",
    keywords: ["lương marketing manager", "lương marketing manager việt nam"],
  },
  {
    slug: "brand-manager",
    name: "Brand Manager",
    shortName: "Brand Manager",
    category: "marketing",
    description: "Build + maintain brand identity - từ positioning, design system, brand voice tới campaign awareness.",
    longDescription: "Brand Manager khác Performance ở chỗ đo bằng Brand metrics (Aided/Unaided Awareness, NPS, Share of Voice) thay vì ROAS. Hiếm tại Ecom-focused brands VN. Chủ yếu hot tại FMCG, F&B, Tech consumer.",
    ranges: {
      junior: [15, 22],
      mid: [22, 35],
      senior: [35, 55],
      manager: [55, 85],
    },
    topCompanies: [
      { name: "Unilever Vietnam", salary: "35-90tr" },
      { name: "Suntory PepsiCo", salary: "40-100tr" },
      { name: "Masan Consumer", salary: "30-80tr" },
      { name: "Vinamilk", salary: "35-85tr" },
      { name: "Coolmate", salary: "25-60tr" },
    ],
    skills: [
      { name: "Brand positioning + archetype framework", importance: "must" },
      { name: "Creative brief writing", importance: "must" },
      { name: "Campaign 360 management", importance: "must" },
      { name: "Brand tracking research", importance: "must" },
      { name: "Storytelling + content vision", importance: "must" },
    ],
    responsibilities: [
      "Build + maintain brand book (logo, color, typography, voice)",
      "Lead campaign awareness theo quý/năm",
      "Brief agency + production team",
      "Coordinate với Performance để brand campaign convert",
      "Track brand metrics quý: Awareness, NPS, Recall",
    ],
    careerPath: [
      { stage: "Junior Brand", years: "1-2 năm", salary: "15-22tr" },
      { stage: "Mid Brand Executive", years: "2-4 năm", salary: "22-35tr" },
      { stage: "Senior Brand / Assistant Manager", years: "4-6 năm", salary: "35-55tr" },
      { stage: "Brand Manager", years: "6+ năm", salary: "55-85tr" },
    ],
    faq: [
      { q: "Brand vs Performance khác gì?", a: "Brand focus vào long-term awareness + emotion. Performance focus vào short-term conversion + ROAS. Brands lớn cần cả 2, balanced budget." },
    ],
    relatedSlugs: ["marketing-manager", "content-manager", "growth-marketer", "creative-director"],
    trending: "stable",
    keywords: ["lương brand manager", "lương brand manager việt nam"],
  },
  {
    slug: "growth-marketer",
    name: "Growth Marketer",
    shortName: "Growth Marketer",
    category: "marketing",
    description: "Hybrid Performance + Product + Data - tăng trưởng acquisition, activation, retention cùng lúc.",
    longDescription: "Growth Marketer là role hybrid bùng nổ tại startups Tech + D2C brands VN 2026. Khác Performance (chỉ paid ads), Growth làm cả referral, retention, lifecycle email, A/B test product. Hiếm + lương cao.",
    ranges: {
      mid: [22, 35],
      senior: [35, 55],
      manager: [55, 90],
    },
    topCompanies: [
      { name: "VinFast Global", salary: "40-100tr" },
      { name: "VinID", salary: "30-80tr" },
      { name: "Momo", salary: "35-90tr" },
      { name: "Coolmate", salary: "30-75tr" },
      { name: "Beeketing/Topo", salary: "30-80tr" },
    ],
    skills: [
      { name: "AARRR framework", importance: "must" },
      { name: "A/B testing + statistical significance", importance: "must" },
      { name: "SQL + GA4 + Mixpanel", importance: "must" },
      { name: "Performance Marketing core", importance: "must" },
      { name: "Lifecycle email + push", importance: "must" },
      { name: "Cohort analysis + LTV/CAC", importance: "must" },
    ],
    responsibilities: [
      "Build + run growth experiment pipeline (10-20 test/quý)",
      "Optimize funnel: Acquisition → Activation → Retention → Revenue",
      "Setup tracking: GA4, Mixpanel, custom events",
      "Lifecycle email + push + in-app notification",
      "Cohort + LTV/CAC analysis",
    ],
    careerPath: [
      { stage: "Mid Growth", years: "2-4 năm", salary: "22-35tr" },
      { stage: "Senior Growth", years: "4-6 năm", salary: "35-55tr" },
      { stage: "Growth Manager / Head of Growth", years: "6+ năm", salary: "55-90tr" },
    ],
    faq: [
      { q: "Growth Marketer cần biết code không?", a: "Không cần code level dev, nhưng phải biết SQL + cơ bản HTML/CSS để A/B test landing + email. Python pandas là plus." },
    ],
    relatedSlugs: ["performance-marketer", "product-manager", "data-analyst", "marketing-manager"],
    trending: "up",
    keywords: ["lương growth marketer", "lương growth hacker", "growth marketing vietnam"],
  },

  // ─── CONTENT (2) ───
  {
    slug: "content-creator",
    name: "Content Creator (TikTok / Reels)",
    shortName: "Content Creator",
    category: "content",
    description: "Sáng tạo + sản xuất video ngắn cho TikTok, Reels, Shorts - hook 3s + script + edit + thumbnail.",
    longDescription: "Content Creator (in-house) khác KOL tự do ở chỗ làm cho brand cố định + ăn lương. Tại VN 2026, role này thiếu hụt cực mạnh vì TikTok Shop bùng nổ. Người làm tốt biết script + camera + edit CapCut + hiểu algorithm.",
    ranges: {
      fresher: [8, 13],
      junior: [13, 20],
      mid: [20, 30],
      senior: [30, 45],
    },
    topCompanies: [
      { name: "UpBase", salary: "10-35tr" },
      { name: "TikTok Vietnam", salary: "20-50tr" },
      { name: "Coolmate", salary: "15-40tr" },
      { name: "ByteDance MCN partners", salary: "15-45tr" },
    ],
    skills: [
      { name: "Script writing (hook 3s + flow)", importance: "must" },
      { name: "CapCut + Premiere Pro", importance: "must" },
      { name: "Camera + lighting basics", importance: "must" },
      { name: "TikTok algorithm + trend", importance: "must" },
      { name: "Performance/showmanship", importance: "nice" },
    ],
    responsibilities: [
      "Lên ý tưởng + script video theo brief brand",
      "Quay + dựng video 15-60s (TikTok/Reels)",
      "Test hook 3s với 3-5 variants",
      "Track view, engagement, save",
      "Phối hợp với KOC/KOL hoặc tự xuất hiện",
    ],
    careerPath: [
      { stage: "Fresher", years: "0-1 năm", salary: "8-13tr" },
      { stage: "Junior", years: "1-2 năm", salary: "13-20tr" },
      { stage: "Mid", years: "2-4 năm", salary: "20-30tr" },
      { stage: "Senior", years: "4+ năm", salary: "30-45tr" },
    ],
    faq: [
      { q: "Cần học trường lớp gì để làm Content Creator?", a: "Không cần. Quan trọng portfolio + view + engagement của video đã làm. Showcase 5-10 video best là đủ apply." },
      { q: "Lương Content Creator vs KOL tự do?", a: "In-house Creator ổn định 13-30tr/tháng. KOL tự do biến động, top có thể 100-500tr/tháng nhưng rủi ro cao." },
    ],
    relatedSlugs: ["tiktok-shop-specialist", "content-manager", "social-media-specialist"],
    trending: "up",
    keywords: ["lương content creator", "lương tiktok creator", "lương sáng tạo nội dung"],
  },
  {
    slug: "content-manager",
    name: "Content Manager",
    shortName: "Content Manager",
    category: "content",
    description: "Lead content team - chiến lược content, calendar, brief, KPI engagement + conversion.",
    longDescription: "Content Manager khác Content Creator ở chỗ quản lý + strategy thay vì tự làm. Lương cao hơn nhờ quản lý team + KPI cross-platform.",
    ranges: {
      mid: [20, 32],
      senior: [32, 50],
      manager: [50, 80],
    },
    topCompanies: [
      { name: "UpBase", salary: "30-70tr" },
      { name: "Coolmate", salary: "25-65tr" },
      { name: "Routine", salary: "22-55tr" },
      { name: "Anker Vietnam", salary: "35-80tr" },
    ],
    skills: [
      { name: "Content strategy framework (AIDA, PAS, hook 3s)", importance: "must" },
      { name: "Calendar planning + brief writing", importance: "must" },
      { name: "Team management 3-8 người", importance: "must" },
      { name: "SEO + social analytics", importance: "must" },
      { name: "Storytelling + brand voice", importance: "must" },
    ],
    responsibilities: [
      "Lên calendar content tháng/quý cross-platform",
      "Brief team creator/designer/copywriter",
      "Track engagement + conversion theo content",
      "Optimize content theo data weekly",
      "Hire + train team content",
    ],
    careerPath: [
      { stage: "Mid Content Lead", years: "2-4 năm", salary: "20-32tr" },
      { stage: "Senior Content", years: "4-6 năm", salary: "32-50tr" },
      { stage: "Content Manager", years: "6+ năm", salary: "50-80tr" },
    ],
    faq: [
      { q: "Content Manager cần kinh nghiệm tự làm content trước không?", a: "Có. Hầu hết Content Manager đi lên từ Creator/Copywriter 3-5 năm. Khó lead team nếu chưa từng làm hands-on." },
    ],
    relatedSlugs: ["content-creator", "brand-manager", "marketing-manager"],
    trending: "stable",
    keywords: ["lương content manager", "lương quản lý content"],
  },

  // ─── DATA & PRODUCT (3) ───
  {
    slug: "data-analyst",
    name: "Marketing Data Analyst",
    shortName: "Data Analyst",
    category: "data",
    description: "Phân tích data marketing + ecom - SQL, BI dashboard, attribution, cohort analysis.",
    longDescription: "Marketing Data Analyst là role mid-tier ở giao điểm Marketing + Tech. Trả lương cao hơn pure Marketing 20-30%. Người làm cần SQL + Excel power + tư duy business.",
    ranges: {
      fresher: [12, 18],
      junior: [18, 28],
      mid: [28, 45],
      senior: [45, 70],
    },
    topCompanies: [
      { name: "Shopee Vietnam", salary: "25-70tr" },
      { name: "Tiki", salary: "22-55tr" },
      { name: "Lazada", salary: "25-65tr" },
      { name: "TikTok Vietnam", salary: "30-80tr" },
      { name: "VinID", salary: "25-60tr" },
    ],
    skills: [
      { name: "SQL (Postgres, BigQuery)", importance: "must" },
      { name: "Excel/Sheets advanced", importance: "must" },
      { name: "Looker Studio / Power BI / Tableau", importance: "must" },
      { name: "GA4 attribution", importance: "must" },
      { name: "Python pandas (cho heavy data)", importance: "nice" },
      { name: "A/B test statistics", importance: "nice" },
    ],
    responsibilities: [
      "Build + maintain marketing dashboard (Revenue, ROAS, LTV, CAC)",
      "Cohort analysis + retention curve",
      "Attribution modeling (last-click, time-decay, data-driven)",
      "A/B test analysis + statistical significance",
      "Phối hợp Marketing để actionable insight",
    ],
    careerPath: [
      { stage: "Fresher", years: "0-1 năm", salary: "12-18tr" },
      { stage: "Junior", years: "1-2 năm", salary: "18-28tr" },
      { stage: "Mid", years: "2-4 năm", salary: "28-45tr" },
      { stage: "Senior", years: "4-6 năm", salary: "45-70tr" },
    ],
    faq: [
      { q: "Data Analyst Marketing vs Data Analyst Tech?", a: "Marketing DA focus vào growth + acquisition metrics. Tech DA focus vào product + user behavior. Lương tương đương, kỹ năng giao thoa 70%." },
    ],
    relatedSlugs: ["growth-marketer", "product-manager", "performance-marketer"],
    trending: "up",
    keywords: ["lương data analyst marketing", "lương marketing analyst"],
  },
  {
    slug: "product-manager",
    name: "Product Manager (Marketing/Ecom)",
    shortName: "Product Manager",
    category: "product",
    description: "Quản lý product feature - từ research user, define spec, work với dev, ship feature, track KPI.",
    longDescription: "Product Manager (PM) trong Marketing/Ecom là role hot. Hiểu cả business + tech + user. Tại VN 2026, hiếm + lương cao 30-100tr.",
    ranges: {
      junior: [20, 30],
      mid: [30, 50],
      senior: [50, 80],
      manager: [80, 130],
    },
    topCompanies: [
      { name: "Shopee", salary: "35-90tr" },
      { name: "Tiki", salary: "30-75tr" },
      { name: "Lazada", salary: "35-85tr" },
      { name: "Momo", salary: "40-100tr" },
      { name: "VinID", salary: "30-80tr" },
    ],
    skills: [
      { name: "Product spec writing (PRD)", importance: "must" },
      { name: "User research + interview", importance: "must" },
      { name: "Roadmap + prioritization framework (RICE, ICE)", importance: "must" },
      { name: "SQL + data fluency", importance: "must" },
      { name: "Stakeholder management", importance: "must" },
      { name: "Figma / prototype basics", importance: "nice" },
    ],
    responsibilities: [
      "Define product strategy + roadmap",
      "Write PRD + work với designer + dev",
      "User research + interview 5-10/tháng",
      "Track product KPI: adoption, retention, NPS",
      "Coordinate cross-function: Marketing, Sales, Engineering",
    ],
    careerPath: [
      { stage: "Junior PM / APM", years: "1-2 năm", salary: "20-30tr" },
      { stage: "Mid PM", years: "2-4 năm", salary: "30-50tr" },
      { stage: "Senior PM", years: "4-6 năm", salary: "50-80tr" },
      { stage: "Lead PM / Group PM", years: "6+ năm", salary: "80-130tr" },
    ],
    faq: [
      { q: "PM cần biết code không?", a: "Không cần level dev, nhưng phải hiểu cơ bản: SQL, API, technical trade-off. PM giỏi nhất biết debate kỹ thuật với dev." },
    ],
    relatedSlugs: ["growth-marketer", "data-analyst", "marketing-manager"],
    trending: "up",
    keywords: ["lương product manager", "lương pm vietnam"],
  },
  {
    slug: "seo-specialist",
    name: "SEO Specialist",
    shortName: "SEO Specialist",
    category: "marketing",
    description: "Tối ưu organic search - keyword research, on-page, link building, technical SEO + content strategy.",
    longDescription: "SEO Specialist trả lương tăng 30-50% sau 2024 nhờ trend AI search + thiếu nhân sự senior. Người làm tốt biết cả technical (Core Web Vitals, schema) + content (keyword, intent matching).",
    ranges: {
      fresher: [9, 14],
      junior: [14, 22],
      mid: [22, 35],
      senior: [35, 55],
      manager: [55, 85],
    },
    topCompanies: [
      { name: "GTV SEO Agency", salary: "12-40tr" },
      { name: "OnPoint", salary: "15-45tr" },
      { name: "Topica", salary: "18-50tr" },
      { name: "Brands trực tiếp (Tiki, Shopee, ...)", salary: "20-65tr" },
    ],
    skills: [
      { name: "Keyword research (Ahrefs/Semrush/KeywordTool)", importance: "must" },
      { name: "On-page SEO + content brief", importance: "must" },
      { name: "Technical SEO (Core Web Vitals, schema.org)", importance: "must" },
      { name: "Link building outreach", importance: "must" },
      { name: "GA4 + Search Console", importance: "must" },
      { name: "Programmatic SEO", importance: "nice" },
    ],
    responsibilities: [
      "Keyword research + content gap analysis",
      "Write content brief cho copywriter/blog team",
      "Technical audit + fix Core Web Vitals",
      "Build backlinks qua outreach + guest post",
      "Track ranking + organic traffic",
      "Internal linking strategy",
    ],
    careerPath: [
      { stage: "Fresher", years: "0-1 năm", salary: "9-14tr" },
      { stage: "Junior", years: "1-2 năm", salary: "14-22tr" },
      { stage: "Mid", years: "2-4 năm", salary: "22-35tr" },
      { stage: "Senior", years: "4-6 năm", salary: "35-55tr" },
      { stage: "SEO Manager", years: "6+ năm", salary: "55-85tr" },
    ],
    faq: [
      { q: "SEO còn đáng học khi AI search lên?", a: "Có. AI search (ChatGPT, Perplexity) cũng phải scrape web - cần content tối ưu được. Schema.org + structured data + entity SEO trở thành quan trọng hơn." },
    ],
    relatedSlugs: ["content-manager", "growth-marketer", "marketing-manager"],
    trending: "up",
    keywords: ["lương seo specialist", "lương seo việt nam"],
  },

  // ─── SALES & MORE (5) ───
  {
    slug: "sales-b2b",
    name: "B2B Sales Executive",
    shortName: "B2B Sales",
    category: "sales",
    description: "Sales B2B SaaS/Service - prospecting, demo, close deal, account management.",
    longDescription: "B2B Sales VN 2026 trả lương base + commission cao. Người làm tốt tại SaaS có thể 50-100tr/tháng nhờ commission.",
    ranges: {
      fresher: [10, 16],
      junior: [16, 25],
      mid: [25, 40],
      senior: [40, 70],
    },
    topCompanies: [
      { name: "Misa", salary: "15-50tr + comm" },
      { name: "Base.vn", salary: "20-60tr + comm" },
      { name: "Haravan", salary: "18-55tr + comm" },
      { name: "GoSell", salary: "15-45tr + comm" },
    ],
    skills: [
      { name: "Cold outreach (email, Zalo, LinkedIn)", importance: "must" },
      { name: "Product demo presentation", importance: "must" },
      { name: "Objection handling", importance: "must" },
      { name: "CRM (Hubspot, Salesforce)", importance: "must" },
      { name: "Account management", importance: "nice" },
    ],
    responsibilities: [
      "Prospect lead qua cold email/Zalo/LinkedIn",
      "Demo product cho khách hàng",
      "Negotiate + close deal",
      "Maintain pipeline trong CRM",
      "Upsell existing accounts",
    ],
    careerPath: [
      { stage: "Fresher", years: "0-1 năm", salary: "10-16tr + comm" },
      { stage: "Junior", years: "1-2 năm", salary: "16-25tr + comm" },
      { stage: "Mid Account Executive", years: "2-4 năm", salary: "25-40tr + comm" },
      { stage: "Senior / Key Account", years: "4+ năm", salary: "40-70tr + comm" },
    ],
    faq: [
      { q: "Commission B2B Sales thường bao nhiêu?", a: "5-15% deal value. Sales tốt kiếm gấp 1.5-3x base. Top 10% có thể x5-x10 base nhờ deal lớn." },
    ],
    relatedSlugs: ["marketing-manager", "growth-marketer"],
    trending: "stable",
    keywords: ["lương sales b2b", "lương b2b sales việt nam"],
  },
  {
    slug: "social-media-specialist",
    name: "Social Media Specialist",
    shortName: "Social Media",
    category: "content",
    description: "Quản lý social channel - Facebook, Instagram, TikTok organic. Content calendar + community + engagement.",
    longDescription: "Social Media Specialist khác Content Creator ở chỗ làm tất cả platform (organic) + community + crisis. Khác Performance ở chỗ không chạy paid.",
    ranges: {
      fresher: [7, 12],
      junior: [12, 18],
      mid: [18, 28],
      senior: [28, 40],
    },
    topCompanies: [
      { name: "Đa số brands VN", salary: "10-30tr" },
      { name: "Agency social", salary: "8-25tr" },
    ],
    skills: [
      { name: "Content planning cross-platform", importance: "must" },
      { name: "Community management", importance: "must" },
      { name: "Crisis communication", importance: "must" },
      { name: "Canva / Figma basics", importance: "must" },
      { name: "Analytics native (Meta Business, TikTok Studio)", importance: "must" },
    ],
    responsibilities: [
      "Plan + post content cho Facebook, Instagram, TikTok",
      "Reply comments + DM",
      "Community building (group, fanpage)",
      "Track engagement, reach, follower growth",
      "Crisis handling khi có drama",
    ],
    careerPath: [
      { stage: "Fresher", years: "0-1 năm", salary: "7-12tr" },
      { stage: "Junior", years: "1-2 năm", salary: "12-18tr" },
      { stage: "Mid", years: "2-4 năm", salary: "18-28tr" },
      { stage: "Senior / Lead", years: "4+ năm", salary: "28-40tr" },
    ],
    faq: [
      { q: "Lương Social Media thấp hơn Performance?", a: "Có, thường thấp hơn 20-30% vì khó đo ROI trực tiếp. Để tăng lương, hybrid sang Content Manager hoặc Brand Manager." },
    ],
    relatedSlugs: ["content-creator", "content-manager", "brand-manager"],
    trending: "stable",
    keywords: ["lương social media", "lương quản lý fanpage"],
  },
  {
    slug: "google-ads-specialist",
    name: "Google Ads Specialist",
    shortName: "Google Ads",
    category: "performance",
    description: "Chuyên ads Google - Search, Display, Shopping, Performance Max. Cho lead gen + ecom + app.",
    longDescription: "Google Ads vẫn là nền tảng quan trọng cho brands lớn + B2B + lead gen. Lương ổn 12-50tr.",
    ranges: {
      fresher: [9, 14],
      junior: [14, 22],
      mid: [22, 32],
      senior: [32, 50],
    },
    topCompanies: [
      { name: "Google Vietnam", salary: "30-80tr" },
      { name: "PMAX", salary: "15-45tr" },
      { name: "Climax Vietnam", salary: "18-50tr" },
    ],
    skills: [
      { name: "Google Ads (Search, Shopping, Display)", importance: "must" },
      { name: "Performance Max campaign", importance: "must" },
      { name: "Keyword research + match type", importance: "must" },
      { name: "Conversion tracking + GA4", importance: "must" },
      { name: "Merchant Center cho Shopping", importance: "nice" },
    ],
    responsibilities: [
      "Setup + run Search, Shopping, PMax campaign",
      "Keyword research + negative keyword optimization",
      "Conversion tracking setup",
      "Budget allocation theo ROI",
      "A/B test ad copy",
    ],
    careerPath: [
      { stage: "Fresher", years: "0-1 năm", salary: "9-14tr" },
      { stage: "Junior", years: "1-2 năm", salary: "14-22tr" },
      { stage: "Mid", years: "2-4 năm", salary: "22-32tr" },
      { stage: "Senior", years: "4+ năm", salary: "32-50tr" },
    ],
    faq: [
      { q: "Google Ads vs Facebook Ads dễ hơn?", a: "Google Ads bài bản hơn (intent-based). Facebook Ads creative-heavy hơn (interest-based). Cả 2 đều cần học sâu." },
    ],
    relatedSlugs: ["performance-marketer", "facebook-ads-specialist", "seo-specialist"],
    trending: "stable",
    keywords: ["lương google ads", "lương google ads specialist"],
  },
  {
    slug: "affiliate-manager",
    name: "Affiliate / KOC Manager",
    shortName: "Affiliate Manager",
    category: "marketing",
    description: "Quản lý mạng lưới Affiliate + KOC - recruit, brief, payout, optimize ROI từ creator commerce.",
    longDescription: "Role mới nổi 2024-2026 nhờ TikTok Shop Affiliate. Brands tốt có 100-5000 KOC active, người manage được hệ thống lớn lương cao.",
    ranges: {
      junior: [14, 22],
      mid: [22, 35],
      senior: [35, 55],
    },
    topCompanies: [
      { name: "UpBase", salary: "18-50tr" },
      { name: "TikTok Vietnam", salary: "25-60tr" },
      { name: "AnyMind Group", salary: "20-55tr" },
    ],
    skills: [
      { name: "TikTok Shop Affiliate Center", importance: "must" },
      { name: "KOC recruitment + screening", importance: "must" },
      { name: "Commission structure design", importance: "must" },
      { name: "Brief writing + product seeding", importance: "must" },
      { name: "Payout + reporting", importance: "must" },
    ],
    responsibilities: [
      "Recruit + onboard KOC (100-1000+/quý)",
      "Setup commission tier + bonus",
      "Brief + seed sản phẩm cho KOC",
      "Track top performer + payout",
      "Optimize ROI affiliate channel",
    ],
    careerPath: [
      { stage: "Junior", years: "1-2 năm", salary: "14-22tr" },
      { stage: "Mid", years: "2-4 năm", salary: "22-35tr" },
      { stage: "Senior / Lead", years: "4+ năm", salary: "35-55tr" },
    ],
    faq: [
      { q: "Affiliate Manager khác Influencer Marketing như nào?", a: "Influencer Marketing focus vào KOL/celebrity với fee fixed. Affiliate focus vào mạng KOC với commission. 2 mảng đôi khi gộp lại." },
    ],
    relatedSlugs: ["tiktok-shop-specialist", "marketing-manager", "performance-marketer"],
    trending: "up",
    keywords: ["lương affiliate manager", "lương koc manager"],
  },
  {
    slug: "ecommerce-director",
    name: "Ecommerce Director",
    shortName: "Ecom Director",
    category: "leadership",
    description: "Lead toàn bộ Ecom function - strategy, team, P&L, budget. Báo cáo CEO/COO.",
    longDescription: "Ecommerce Director là top role trong ngành VN 2026, lương 100-300tr/tháng tại brands lớn. Cần 8-12 năm kinh nghiệm + chứng minh được scale doanh thu lên 100-1000 tỷ.",
    ranges: {
      manager: [80, 130],
      director: [130, 300],
    },
    topCompanies: [
      { name: "Mobile World Group (Bach Hoa Xanh)", salary: "150-300tr" },
      { name: "Anker Vietnam", salary: "120-250tr" },
      { name: "Xiaomi Vietnam", salary: "150-280tr" },
      { name: "Coolmate", salary: "100-200tr" },
    ],
    skills: [
      { name: "Ecom strategy 3-5 năm", importance: "must" },
      { name: "P&L gian hàng 100+ tỷ", importance: "must" },
      { name: "Team management 30+ người", importance: "must" },
      { name: "C-level stakeholder management", importance: "must" },
      { name: "M&A + partnership", importance: "nice" },
    ],
    responsibilities: [
      "Build + execute Ecom strategy 3-5 năm",
      "Manage P&L 100-1000 tỷ doanh thu",
      "Lead team 30-100 người (cross-function)",
      "Báo cáo CEO + Board hàng tháng",
      "Drive M&A + partnership opportunity",
    ],
    careerPath: [
      { stage: "Ecom Manager", years: "6-9 năm", salary: "80-130tr" },
      { stage: "Ecom Director / VP", years: "9-12 năm", salary: "130-250tr" },
      { stage: "CCO / CEO Ecom", years: "12+ năm", salary: "250-500tr+" },
    ],
    faq: [
      { q: "Ecom Director cần bằng cấp gì?", a: "Không bắt buộc bằng cụ thể nhưng MBA / Top university là plus. Quan trọng nhất: track record scale revenue + team." },
    ],
    relatedSlugs: ["ecommerce-executive", "operation-manager", "marketing-manager"],
    trending: "up",
    keywords: ["lương ecom director", "lương ecommerce director", "lương vp ecom"],
  },
];

export function getAllSalaryRoles(): SalaryRole[] {
  return SALARY_ROLES;
}

export function getSalaryRole(slug: string): SalaryRole | undefined {
  return SALARY_ROLES.find((r) => r.slug === slug);
}

export function getRolesByCategory(cat: SalaryCategory): SalaryRole[] {
  return SALARY_ROLES.filter((r) => r.category === cat);
}

export function getRelatedRoles(slug: string, limit = 4): SalaryRole[] {
  const role = getSalaryRole(slug);
  if (!role) return [];
  return role.relatedSlugs
    .map((s) => getSalaryRole(s))
    .filter((r): r is SalaryRole => Boolean(r))
    .slice(0, limit);
}
