/**
 * Pillar pages = trang "siêu hub" cho 4 chủ đề lớn nhất site.
 * Mỗi pillar gom nhiều bài blog cùng chủ đề → backbone SEO + UX discovery.
 */

import type { IconName } from "@/components/icons/Icon";

export type Pillar = {
  slug: string; // URL path
  title: string;
  shortTitle: string;
  tagline: string;
  intro: string[]; // 2-3 paragraphs
  /** Categories trong Sanity post schema để pull bài về */
  categories: string[];
  iconName: IconName;
  color: string;
  /** Topic clusters — manually curated headings + matching tags */
  clusters: Array<{
    title: string;
    description: string;
    /** Match bài blog có tag chứa trong array này */
    tagKeywords: string[];
  }>;
  /** Tool slugs liên quan */
  tools: string[];
  /** Quiz slug nổi bật */
  quizSlug?: string;
  /** FAQ tự định nghĩa (riêng pillar, không lấy từ blog) */
  faqs: Array<{ q: string; a: string }>;
  /** Meta SEO */
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
};

export const PILLARS: Pillar[] = [
  {
    slug: "ecom",
    title: "Ecommerce — Hướng dẫn toàn diện cho seller TMĐT Việt Nam 2026",
    shortTitle: "Ecom",
    tagline: "TikTok Shop · Shopee · Marketplace operations · 2026",
    intro: [
      "Ngành Ecommerce Việt Nam đang ở giai đoạn vàng nhưng cũng cạnh tranh khốc liệt nhất. TikTok Shop GMV đạt 4.4B USD năm 2025, Shopee dominant với 70% share. Phí sàn liên tục tăng, buyer ngày càng deal-driven, margin shop ngày càng mỏng.",
      "Pillar này tổng hợp toàn bộ kiến thức thực chiến từ kinh nghiệm 60+ project Ecom — từ cấu trúc phí sàn 2026, Mall vs Non-Mall, voucher mix, đến vận hành gian hàng và build P&L 5 tầng đúng chuẩn.",
      "Phù hợp cho: seller mới khởi nghiệp 0-12 tháng, ecom manager đang scale brand, founder muốn hiểu sâu unit economics gian hàng.",
    ],
    categories: ["ecom", "tiktok", "shopee"],
    iconName: "layers",
    color: "#4ad6ff",
    clusters: [
      {
        title: "Phí sàn TikTok Shop & Shopee 2026",
        description: "Tất cả phí seller phải biết — hoa hồng theo ngành, phí giao dịch 6%, voucher extra, SFR.",
        tagKeywords: ["phí", "fee", "hoa hồng", "voucher", "sfr"],
      },
      {
        title: "Mall vs Non-Mall — Quyết định upgrade",
        description: "Khi nào nên upgrade Mall, chi phí trade-off, ROI thực từ 60+ project.",
        tagKeywords: ["mall", "non-mall", "upgrade"],
      },
      {
        title: "P&L gian hàng & Unit Economics",
        description: "Build P&L 5 tầng: Net Revenue → Gross → Contribution Margin → Marketing Profit → EBITDA.",
        tagKeywords: ["p&l", "pl", "ebitda", "margin", "lợi nhuận", "unit economics"],
      },
      {
        title: "Live Commerce & Marketplace Ops",
        description: "Live commerce TikTok, vận hành gian hàng, fulfillment, voucher game.",
        tagKeywords: ["live", "livestream", "fulfillment", "operations", "ops"],
      },
    ],
    tools: ["tinh-phi-san", "pnl-ecom"],
    quizSlug: "huong-nghiep-marketing",
    faqs: [
      {
        q: "Seller mới nên bắt đầu TikTok Shop hay Shopee trước?",
        a: "Tuỳ ngành. Beauty/Fashion/F&B nên TikTok trước (content viral mạnh). Electronics/Home & Living nên Shopee trước (buyer search-driven). Vốn dưới 100tr nên focus 1 platform 6 tháng đầu thay vì dàn trải.",
      },
      {
        q: "Phí Mall và Non-Mall chênh bao nhiêu? Khi nào nên upgrade?",
        a: "Mall thêm 3-5% phí so với Non-Mall. Nên upgrade khi: GMV > 200tr/tháng, gross margin > 45%, ngành cần trust signal mạnh (Beauty, Mother & Baby, Electronics). Đọc bài Mall vs Non-Mall để có decision tree đầy đủ.",
      },
      {
        q: "Contribution Margin (CM) khoẻ là bao nhiêu?",
        a: "Beauty 25-35%, Fashion 15-25%, F&B 10-15%, Electronics 8-15%. Dưới ngưỡng này = scale ads sẽ scale lỗ. Luôn fix cost structure trước khi tăng ngân sách marketing.",
      },
      {
        q: "Tool tính phí sàn dùng thế nào?",
        a: "Vào /tools/tinh-phi-san — chọn ngành cấp 3 → so sánh đồng thời 4 platform (TikTok Mall/Non-Mall, Shopee Mall/Non-Mall) → ra số phí + lợi nhuận thực mỗi đơn. Miễn phí, không cần đăng ký.",
      },
      {
        q: "EBITDA bao nhiêu là khoẻ cho shop ecom?",
        a: "Stage Launch (0-6 tháng): 0-5%. Scale (6-18 tháng): 8-15%. Mature (18+ tháng): 15-25%. Premium niche: 25-35%. Dùng tool /tools/pnl-ecom để check stage hiện tại của shop.",
      },
    ],
    seoTitle: "Ecommerce 2026 — Hướng dẫn toàn diện seller TMĐT Việt Nam",
    seoDescription: "Tổng hợp đầy đủ về phí sàn TikTok Shop & Shopee 2026, P&L gian hàng, Mall vs Non-Mall, voucher, live commerce — từ kinh nghiệm 60+ project Ecom.",
    keywords: [
      "ecommerce vietnam", "tiktok shop", "shopee", "phí sàn 2026",
      "p&l gian hàng", "mall vs non-mall", "voucher tiktok", "live commerce",
    ],
  },

  {
    slug: "index",
    title: "Marketing Index — Benchmarks & Performance Data 2026",
    shortTitle: "Index",
    tagline: "ROAS · CPA · CPM · Industry benchmarks · Data-driven marketing",
    intro: [
      "Marketing không có số liệu = đoán mò. Nhưng số liệu chất lượng cho thị trường Việt Nam 2026 lại cực hiếm — phần lớn benchmarks online là từ US/EU không áp dụng được.",
      "Pillar này tổng hợp benchmarks performance marketing thực từ 60+ project Ecom Việt Nam: ROAS theo ngành, CPA target, CPM trung bình, conversion rate, repeat rate. Mỗi số đều có context: industry, platform, growth stage.",
      "Phù hợp cho: performance marketer cần argue KPI với sếp/client, founder build P&L có data backing, agency lên proposal với benchmark thực.",
    ],
    categories: ["performance"],
    iconName: "trending-up",
    color: "#7da9ff",
    clusters: [
      {
        title: "ROAS Benchmarks theo ngành",
        description: "Break-even ROAS, target ROAS, ROAS Beauty/Fashion/F&B/Electronics — số thực từ 60+ project.",
        tagKeywords: ["roas", "break-even", "target", "benchmark"],
      },
      {
        title: "CPA / CPM / CTR Benchmarks",
        description: "Chỉ số ads thực tế VN 2026 — đọc data, không đoán.",
        tagKeywords: ["cpa", "cpm", "ctr", "cpc", "cost per"],
      },
      {
        title: "Funnel Metrics & Conversion",
        description: "Buyer drop-off ở đâu — ATC rate, checkout rate, repeat purchase, cohort analysis.",
        tagKeywords: ["funnel", "conversion", "atc", "repeat", "cohort", "ltv"],
      },
      {
        title: "Optimization Playbooks",
        description: "Khi nào tăng/giảm ROAS, scale campaign, fix ads không ra đơn.",
        tagKeywords: ["optimize", "scale", "fix", "campaign", "ads"],
      },
    ],
    tools: ["roas-calculator", "pnl-ecom"],
    quizSlug: "huong-nghiep-marketing",
    faqs: [
      {
        q: "Break-even ROAS là gì? Cách tính?",
        a: "Break-even ROAS = mức ROAS tối thiểu để shop không lỗ. Công thức: 1 ÷ (Gross Margin% − Phí sàn% − Ops%). Ví dụ Beauty GM 60%, phí sàn 18.5%, ops 8% → break-even ROAS = 1/33.5% ≈ 3x. Dưới 3x = lỗ.",
      },
      {
        q: "ROAS bao nhiêu là 'tốt' cho shop TMĐT?",
        a: "Tuỳ ngành: Beauty 8-12x, Fashion 10-15x, F&B 12-18x, Electronics 30-50x. Lưu ý: ROAS cao chưa chắc lãi nhiều — phải nhìn Profit/đơn tuyệt đối + Contribution Margin.",
      },
      {
        q: "Tại sao ROAS cao nhưng vẫn lỗ?",
        a: "Vì ROAS chỉ tính ads spend, không tính giá vốn + phí sàn + ops. Sản phẩm gross margin 25%, phí sàn 18%, ops 8% → margin còn -1%. Ads vô cực cũng lỗ. Phải fix gross margin trước.",
      },
      {
        q: "Khi nào nên giảm ROAS target để scale?",
        a: "Khi business cần scale gấp (mùa sale, launch product), khi ngân sách dư cuối tháng, khi cạnh tranh tăng đột biến. Logic: doanh thu tuyệt đối quan trọng hơn ROAS %. ROAS 5x × 300tr revenue có thể lãi nhiều hơn ROAS 8x × 100tr.",
      },
      {
        q: "Tool tính ROAS dùng thế nào?",
        a: "Vào /tools/roas-calculator — nhập giá vốn, phí sàn, ops, target margin → ra Break-even ROAS + Target ROAS + bảng 13 kịch bản profit/đơn. Miễn phí.",
      },
    ],
    seoTitle: "Marketing Index 2026 — ROAS, CPA, Benchmarks Performance VN",
    seoDescription: "Benchmarks performance marketing thực Việt Nam 2026: ROAS theo ngành, CPA target, CPM trung bình từ 60+ project. Data-driven marketing decisions.",
    keywords: [
      "roas benchmark", "cpa marketing", "performance marketing vietnam",
      "marketing benchmark 2026", "tính roas", "ads ecom",
    ],
  },

  {
    slug: "self-discovery",
    title: "Self-Discovery — Hiểu bản thân để phát triển sự nghiệp",
    shortTitle: "Self-Discovery",
    tagline: "MBTI · Phong cách lãnh đạo · Personality · Mindset",
    intro: [
      "Bạn không thể phát triển sự nghiệp nếu không hiểu mình. Câu hỏi 'tôi giỏi cái gì, làm gì hợp?' nếu không trả lời được, mọi quyết định nghề nghiệp đều là đoán mò.",
      "Pillar này tổng hợp các framework hiểu bản thân được dùng rộng rãi nhất thế giới: MBTI 16 kiểu tính cách, 6 phong cách lãnh đạo Goleman + Lewin, Big Five, IKIGAI, Career archetypes.",
      "Phù hợp cho: sinh viên năm 3-4 đang phân vân chọn nghề, người mới đi làm 1-2 năm muốn pivot, manager muốn hiểu cách lãnh đạo team hiệu quả.",
    ],
    categories: ["psychology", "mindset", "leadership"],
    iconName: "brain",
    color: "#a78bff",
    clusters: [
      {
        title: "MBTI 16 kiểu tính cách",
        description: "Mỗi kiểu có career path + điểm mạnh + điểm yếu — INTJ, ENFP, INFJ và 13 kiểu khác.",
        tagKeywords: ["mbti", "tính cách", "personality", "intj", "enfp", "infj"],
      },
      {
        title: "Phong cách lãnh đạo",
        description: "6 phong cách Goleman + Lewin — Độc đoán, Dân chủ, Tự do, Chuyển đổi, Giao dịch, Phục vụ.",
        tagKeywords: ["lãnh đạo", "leader", "leadership", "phong cách"],
      },
      {
        title: "Mindset & Self-improvement",
        description: "Tư duy founder, growth mindset, fixed mindset, productivity systems.",
        tagKeywords: ["mindset", "tư duy", "founder", "growth", "productivity"],
      },
      {
        title: "Hiểu bản thân chọn nghề",
        description: "Big Five, Holland Code, IKIGAI — frameworks hiểu mình toàn diện hơn MBTI.",
        tagKeywords: ["big five", "holland", "ikigai", "framework", "tự khám phá"],
      },
    ],
    tools: [],
    quizSlug: "mbti",
    faqs: [
      {
        q: "MBTI có khoa học không? Có nên dùng không?",
        a: "MBTI không phải standard khoa học hàn lâm như Big Five — kết quả có thể thay đổi theo mood. Tuy nhiên nó vẫn cực hữu ích vì: (1) framework đơn giản dễ học, (2) common language với đồng nghiệp, (3) self-awareness tốt. Nên dùng MBTI như starting point, kết hợp với Big Five để có bức tranh đầy đủ.",
      },
      {
        q: "Có 16 kiểu MBTI nào hợp ngành Marketing/Ecom?",
        a: "Không kiểu nào 'không hợp'. Mỗi kiểu có role phù hợp: ENTJ → CMO/Director, INTJ → Strategy/Performance Manager, ENFP → Content Creator/Brand, INFJ → Brand Manager giá trị, ESTJ → E-commerce Manager, ISTP → Performance Specialist sâu. Quan trọng là pick role match xu hướng tự nhiên.",
      },
      {
        q: "Có 6 phong cách lãnh đạo, nên dùng phong cách nào?",
        a: "Linh hoạt theo bối cảnh: Khủng hoảng → Độc đoán. Cần sáng tạo → Dân chủ. Cần kỷ luật → Giao dịch. Cần thay đổi lớn → Chuyển đổi. Phát triển bền vững → Phục vụ. Đội trưởng thành → Tự do. Nhà lãnh đạo giỏi không gắn với 1 phong cách.",
      },
      {
        q: "Test MBTI miễn phí ở đâu chuẩn quốc tế?",
        a: "Vào /quiz/mbti — bài test 70 câu chuẩn quốc tế, miễn phí, có phân tích 4 chiều E/I, S/N, T/F, J/P theo % cụ thể + mô tả kiểu phù hợp với ngành Marketing/Ecom Việt Nam. Cần email/SĐT để nhận kết quả chi tiết.",
      },
      {
        q: "Sinh viên năm cuối nên làm test nào trước?",
        a: "Khuyến nghị 4 tuần: Tuần 1 làm MBTI (hiểu xu hướng tự nhiên). Tuần 2 làm RIASEC/Holland (hiểu interest career). Tuần 3 làm Big Five (validate khoa học). Tuần 4 vẽ IKIGAI để tìm sweet spot career path.",
      },
    ],
    seoTitle: "Self-Discovery — MBTI, Phong cách lãnh đạo, Hiểu bản thân 2026",
    seoDescription: "Hướng dẫn hiểu bản thân để phát triển sự nghiệp: MBTI 16 kiểu, 6 phong cách lãnh đạo, Big Five, IKIGAI. Frameworks cho sinh viên + manager.",
    keywords: [
      "mbti", "self-discovery", "phong cách lãnh đạo", "hiểu bản thân",
      "personality test", "mindset", "leadership style",
    ],
  },

  {
    slug: "career",
    title: "Career — Lộ trình + Lương + Skills Marketing/Ecom Việt Nam 2026",
    shortTitle: "Career",
    tagline: "Career path · Salary · Skills · Sinh viên đến Manager",
    intro: [
      "Thị trường Digital Marketing Việt Nam tăng trưởng +37% YoY về số job posting (LinkedIn 2025). Lương Senior 25-40M, Manager 35-55M, Head/Director 55-90M. Nhưng phân hoá mạnh — người giỏi 3+ platform + data có premium +35-50% so với baseline.",
      "Pillar này là kim chỉ nam career trong ngành: 5 archetype career (Creator/Analyst/Communicator/Builder/Operator), lộ trình lương L0-L5, skills cần học từ Junior → Senior → Manager, model 4 công ty (Enabler/Agency/Brand/MNC).",
      "Phù hợp cho: sinh viên năm 3-4 chọn nghề, new joiner 0-2 năm pivot career, mid-level marketer plan 5-năm, founder hire team.",
    ],
    categories: ["career"],
    iconName: "briefcase",
    color: "#5fffaa",
    clusters: [
      {
        title: "5 Archetype Career Marketing/Ecom",
        description: "Creator / Analyst / Communicator / Builder / Operator — bạn thuộc kiểu nào?",
        tagKeywords: ["archetype", "career", "creator", "analyst", "communicator", "builder", "operator"],
      },
      {
        title: "Salary Benchmark VN 2026",
        description: "Lương thực Junior → Manager → Director, breakdown 4 model công ty (Enabler/Agency/Brand/MNC).",
        tagKeywords: ["salary", "lương", "benchmark", "income", "thu nhập"],
      },
      {
        title: "Skills Roadmap Junior → Senior",
        description: "110 skill marketing + 10 cluster CORE/IMPORTANT/SUPPORT — pick gì học khi 0-3 năm.",
        tagKeywords: ["skill", "roadmap", "junior", "senior", "kỹ năng"],
      },
      {
        title: "Hiring & Team Building",
        description: "Build team Marketing 0→12 người, sai lầm hire Ads runner, agency vs in-house.",
        tagKeywords: ["hire", "team", "build team", "agency", "in-house"],
      },
    ],
    tools: [],
    quizSlug: "huong-nghiep-marketing",
    faqs: [
      {
        q: "Mới ra trường nên vào Brand In-house hay Agency/Enabler?",
        a: "Agency/Enabler 2-3 năm đầu → tốc độ học gấp 3-5x do volume client + chaos. Brand In-house ổn định nhưng nhịp chậm — phù hợp 5+ năm khi đã có specialty sâu. MNC nên đợi 5+ năm khi đã có english + data skills.",
      },
      {
        q: "Lương Performance Marketing VN 2026 trung bình bao nhiêu?",
        a: "Junior (1-3y) 11-18M total income, Executive (3-5y) 18-28M, Senior 25-40M, Manager 35-55M, Head 55-90M. Premium combo: 1 platform = baseline | + Data = +20-30% | Full-stack = +35-50% | + AI = +50-80%.",
      },
      {
        q: "Sinh viên nên học skill nào trước để vào ngành?",
        a: "Pick 1 specialty deep dive 12-18 tháng đầu: Performance (TikTok HOẶC Shopee Ads) + Excel + GA4 cơ bản. Sau đó expand sang cluster thứ 2 (Data analytics, Content, hoặc Marketplace ops) → Full-stack premium +35%.",
      },
      {
        q: "Nên vào Performance Marketing hay Brand?",
        a: "Tuỳ tính cách + market 2026: Performance lương cao hơn (cần data + analytical), Brand stable hơn (cần creative + storytelling). Test /quiz/huong-nghiep-marketing để biết archetype của mình.",
      },
      {
        q: "Hire Ads runner đầu tiên cần lưu ý gì?",
        a: "5 sai lầm phổ biến: (1) Tin CV ROAS đẹp không context, (2) Không test ngân sách thực 1-2 tuần, (3) Lương cố định cao thay vì base + bonus, (4) Không trial period, (5) Không hỏi về unit economics chỉ hỏi ROAS.",
      },
    ],
    seoTitle: "Career Marketing/Ecom VN 2026 — Lộ trình + Lương + Skills",
    seoDescription: "Career path Marketing/Ecom Việt Nam 2026: 5 archetype, lương Junior 11M → Director 90M, 110 skills framework, hire team. Salary Benchmark UpBase Research.",
    keywords: [
      "career marketing", "lương marketing 2026", "career path ecom",
      "salary benchmark vietnam", "skill marketing", "junior senior manager",
    ],
  },
];

export function getPillar(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}
