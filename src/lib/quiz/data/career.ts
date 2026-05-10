import type { QuizArchetype, QuizQuestion } from "../types";

/**
 * Test Hướng Nghiệp Marketing & Ecom — phiên bản 2026
 * Dành cho sinh viên năm cuối + new joiner 0-2 năm kinh nghiệm.
 *
 * Career path data từ Salary Benchmark Digital Marketing 2026 (UpBase research):
 *   L0 Newbie ~7M | L1 Fresher 9-12M | L2 Junior 11-18M | L3 Executive 13-28M
 *   L4 Pro/Manager 15-55M | L5 Head/Director 18-90M
 *   Skill premium: Performance + Data combo +20-30%, Full-stack +35-50%, Senior + AI +50-80%
 *
 * Mapping: A=creator, B=analyst, C=communicator, D=builder, E=operator
 */

export const CAREER_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Khi xem 1 video TikTok đang viral của brand đối thủ, điều đầu tiên bạn nghĩ là?",
    options: [
      { key: "A", text: "Hook + visual + storytelling — concept hay quá, lưu lại để tham khảo", scores: ["creator"] },
      { key: "B", text: "Họ chạy ROAS bao nhiêu? CPM/CTR thế nào mà reach mạnh?", scores: ["analyst"] },
      { key: "C", text: "Khúc nào audience react/comment nhiều nhất? Họ đang bàn về gì?", scores: ["communicator"] },
      { key: "D", text: "Funnel của họ thế nào? Mình build cái tương tự được không?", scores: ["builder"] },
      { key: "E", text: "Listing + fulfillment + giá có chuẩn không? Họ scale ổn không?", scores: ["operator"] },
    ],
  },
  {
    id: 2,
    text: "Bạn được giao đề bài: brand mới, ngân sách 50tr/tháng, sản phẩm Skincare 350k. KPI: GMV 250tr/tháng. Bạn focus đầu tiên vào?",
    options: [
      { key: "A", text: "Brief content team build 5-10 video angle khác nhau, test creative", scores: ["creator"] },
      { key: "B", text: "Setup tracking đúng (GA4 + Pixel), benchmark CPA + ROAS target trước", scores: ["analyst"] },
      { key: "C", text: "Mời 3-5 KOC review thật, build social proof mạnh ngay từ tuần 1", scores: ["communicator"] },
      { key: "D", text: "Lập kế hoạch 90 ngày: M1 launch, M2 scale, M3 retain — phân bổ cụ thể", scores: ["builder"] },
      { key: "E", text: "Tối ưu listing + voucher mix + đảm bảo đủ stock + fulfillment SLA", scores: ["operator"] },
    ],
  },
  {
    id: 3,
    text: "Bạn thoải mái làm việc với công cụ nào nhất?",
    options: [
      { key: "A", text: "CapCut, Canva, Figma, Adobe Premiere — design + edit", scores: ["creator"] },
      { key: "B", text: "GA4, Looker Studio, Excel pivot, SQL cơ bản — phân tích data", scores: ["analyst"] },
      { key: "C", text: "Slack, Notion, gặp người, gọi điện, manage relationships", scores: ["communicator"] },
      { key: "D", text: "Notion, miro, frameworks — plan + lead cross-functional", scores: ["builder"] },
      { key: "E", text: "Seller Center (Shopee/TikTok), Excel logistics, dashboard ops", scores: ["operator"] },
    ],
  },
  {
    id: 4,
    text: "Khi shop bạn launch sản phẩm mới flop trong 2 tuần, bạn debug đầu tiên ở:",
    options: [
      { key: "A", text: "Creative — hình ảnh sản phẩm, video angle, caption — đủ cảm xúc chưa?", scores: ["creator"] },
      { key: "B", text: "Data funnel — pull report: traffic → ATC → CVR drop ở đâu?", scores: ["analyst"] },
      { key: "C", text: "Buyer feedback — chat 10 buyer thật, đọc comment, hỏi tại sao", scores: ["communicator"] },
      { key: "D", text: "Strategy — go-to-market sai từ đâu? Pivot toàn bộ approach", scores: ["builder"] },
      { key: "E", text: "Operations — listing chuẩn chưa, voucher + ship + stock có vấn đề?", scores: ["operator"] },
    ],
  },
  {
    id: 5,
    text: "Khi đọc job description, bạn excited nhất với role nào?",
    options: [
      { key: "A", text: "Content Creator/Producer · TikTok Live Host · Brand Designer · Creative Strategist", scores: ["creator"] },
      { key: "B", text: "Performance Marketing Specialist · Growth Analyst · Marketing Data Analyst · CRO", scores: ["analyst"] },
      { key: "C", text: "Account Manager · Influencer Marketing · Partnership · Community Manager", scores: ["communicator"] },
      { key: "D", text: "Marketing Lead · Brand Manager · Growth PM · Founder cho dự án nhỏ", scores: ["builder"] },
      { key: "E", text: "Ecommerce Operator · Trade Marketing · Marketing PM · Marketplace Specialist", scores: ["operator"] },
    ],
  },
  {
    id: 6,
    text: "Bạn ghét nhất khi phải làm:",
    options: [
      { key: "A", text: "Làm spreadsheet 8h liên tục, không có không gian sáng tạo", scores: ["creator"] },
      { key: "B", text: "Quyết định không có data, chỉ dựa cảm tính của sếp", scores: ["analyst"] },
      { key: "C", text: "Ngồi 1 mình code/làm việc 8h không tương tác với ai", scores: ["communicator"] },
      { key: "D", text: "Làm task nhỏ lặp lại, không thấy được bức tranh lớn business", scores: ["builder"] },
      { key: "E", text: "Chaos không quy trình — mỗi ngày 1 cách làm khác", scores: ["operator"] },
    ],
  },
  {
    id: 7,
    text: "Lương cao nhưng buồn chán vs lương vừa nhưng được làm passion?",
    options: [
      { key: "A", text: "Passion mới quan trọng — không có cảm hứng sao sống nổi", scores: ["creator"] },
      { key: "B", text: "Tuỳ data: việc nào ROI dài hạn (skill + lương trong 5 năm) cao hơn", scores: ["analyst"] },
      { key: "C", text: "Sếp + đồng đội tốt là trên hết — môi trường người mới quan trọng", scores: ["communicator"] },
      { key: "D", text: "Cả 2 đều không hấp dẫn — tôi sẽ tự build cái của mình", scores: ["builder"] },
      { key: "E", text: "Lương cao + ổn định = an toàn để execute kế hoạch dài hạn", scores: ["operator"] },
    ],
  },
  {
    id: 8,
    text: "Bạn sẵn sàng học sâu skill nào trong 6 tháng tới?",
    options: [
      { key: "A", text: "Premiere/Final Cut + storytelling + creative strategy + Figma", scores: ["creator"] },
      { key: "B", text: "SQL + GA4 advanced + A/B testing + Looker Studio dashboard", scores: ["analyst"] },
      { key: "C", text: "Negotiation + public speaking + KOC management + email outreach", scores: ["communicator"] },
      { key: "D", text: "P&L modeling + go-to-market + project management + leadership", scores: ["builder"] },
      { key: "E", text: "Shopee/TikTok ops sâu + supply chain + automation + voucher game", scores: ["operator"] },
    ],
  },
  {
    id: 9,
    text: "Năm 2026, ngành Digital Marketing tăng trưởng mạnh. Bạn thấy mình đang ở đâu?",
    options: [
      { key: "A", text: "Build content mạnh — TikTok video viral đang là vũ khí số 1", scores: ["creator"] },
      { key: "B", text: "Performance + Data combo có premium +30-50% lương — tôi sẽ ở đây", scores: ["analyst"] },
      { key: "C", text: "Influencer/KOC marketing đang bùng nổ — relationships là lợi thế", scores: ["communicator"] },
      { key: "D", text: "Founder mindset — tôi muốn build brand riêng hoặc lead business", scores: ["builder"] },
      { key: "E", text: "Ecom enabler/agency đang scale — vận hành tốt là khan hiếm", scores: ["operator"] },
    ],
  },
  {
    id: 10,
    text: "5 năm sau, KPI thành công cá nhân với bạn là gì?",
    options: [
      { key: "A", text: "Có signature work — clip/sản phẩm/case study mang dấu ấn riêng", scores: ["creator"] },
      { key: "B", text: "Là người 'cracked the code' — fix được growth problems brand lớn không tự fix được", scores: ["analyst"] },
      { key: "C", text: "Network 500+ người chất + quản lý team people — lead by relationship", scores: ["communicator"] },
      { key: "D", text: "Có business riêng đạt 7-8 con số GMV/tháng hoặc làm CMO startup", scores: ["builder"] },
      { key: "E", text: "Operator silent giúp brand scale 10x — ít nói, kết quả lên tiếng", scores: ["operator"] },
    ],
  },
  {
    id: 11,
    text: "Khi tham gia 1 dự án nhóm (đi học hoặc đi làm), bạn thường:",
    options: [
      { key: "A", text: "Đề xuất ý tưởng concept, làm slide đẹp, thiết kế deliverable", scores: ["creator"] },
      { key: "B", text: "Làm research, phân tích, build framework / model", scores: ["analyst"] },
      { key: "C", text: "Negotiate với stakeholder, present, kết nối các bên", scores: ["communicator"] },
      { key: "D", text: "Lead chung, đảm bảo deliver đúng thời hạn, chia việc cho team", scores: ["builder"] },
      { key: "E", text: "Lo phần execution chi tiết, theo dõi tiến độ, đảm bảo không miss", scores: ["operator"] },
    ],
  },
  {
    id: 12,
    text: "Trong 1 ngày làm việc lý tưởng, bạn dành nhiều thời gian nhất cho:",
    options: [
      { key: "A", text: "Tạo ra cái mới — viết, làm video, design, brainstorm concept", scores: ["creator"] },
      { key: "B", text: "Đọc data, optimize campaign, A/B test, build dashboard", scores: ["analyst"] },
      { key: "C", text: "Họp với team/đối tác, gặp KOC, networking event, build relationships", scores: ["communicator"] },
      { key: "D", text: "Plan strategy, decide priority, lead team meeting, problem-solve", scores: ["builder"] },
      { key: "E", text: "Tối ưu process, theo dõi metric ops, đảm bảo cỗ máy chạy mượt", scores: ["operator"] },
    ],
  },
];

export const CAREER_ARCHETYPES: QuizArchetype[] = [
  /* ───────── CREATOR ───────── */
  {
    id: "creator",
    name: "The Creator — Content & Creative",
    tagline: "Storytelling · Creative Commerce · Viral",
    color: "#ff6b9d",
    description: [
      "Bạn là người tạo ra content và visual mà brand sống được. Trong khi mọi người tranh luận chiến lược, bạn ngồi quay video, viết caption, design banner — và chính những deliverable này là cái buyer thấy + quyết định mua.",
      "Theo Salary Benchmark 2026, Content & Creative là 1 trong những skill cluster có demand cao nhất ngành Digital Marketing VN — đặc biệt Creative Commerce (TikTok content + livestream) đang được trả premium 15-25% so với content truyền thống.",
      "Bạn phù hợp nhất với role có Output đo lường được (CTR creative, view-through rate, share rate) chứ không phải role thuần admin. Quan trọng: phải combine creative + data thì mới scale lương lên L3 trở lên.",
    ],
    strengths: [
      "Tư duy concept + storytelling — output content có cảm xúc",
      "Thẩm mỹ + visual sense — recognize ngay creative tốt vs xấu",
      "Nắm bắt trend, văn hoá, audio TikTok nhanh",
      "Giải quyết bài toán 'làm sao để buyer dừng scroll'",
    ],
    weaknesses: [
      "Bỏ qua data/measurement → khó argue ROI với sếp",
      "Đôi khi quá perfectionist, deadline trễ",
      "Khó scale 1 mình — depend vào cảm hứng cá nhân",
      "Pivot chậm khi creative không hiệu quả",
    ],
    context: [
      "Lộ trình lương VN 2026 (Salary Benchmark UpBase):",
      "L0-L1 Fresher (0-1.5y): Junior Creator/Editor — 7-12M total income",
      "L2 Junior (1.5-3y): Content Specialist/Producer — 11-18M",
      "L3 Executive (3-5y): Senior Content/Creative Strategist — 18-28M",
      "L4 Manager (4-6y): Creative Lead/Producer Lead — 25-40M",
      "L5 Head (6+y): Creative Director/Head of Content — 40-70M",
      "Premium: combine với Data analytics → +20-30% lương cùng level",
    ],
    advice: [
      "Học 5 chỉ số creative quan trọng: View-through rate, CTR, share rate, CVR-by-creative, hold time",
      "Build portfolio Notion/Behance — 10 case study với before/after metric",
      "Mỗi tháng học 1 tool: AI image, AI video (Runway, Pika), CapCut Pro",
      "Combine creative + ads để hiểu 'creative này có scale được không?' → L3 path",
      "Đặt deadline cứng và 'good enough ship' — tránh perfectionist trap",
    ],
  },

  /* ───────── ANALYST ───────── */
  {
    id: "analyst",
    name: "The Analyst — Performance & Data",
    tagline: "Data-driven · Optimization · ROAS",
    color: "#4ad6ff",
    description: [
      "Bạn nhìn marketing như puzzle — và data là manh mối. Trong khi người khác đoán 'ad set này không tốt', bạn pull báo cáo và thấy chính xác: CPM cao do audience trùng, CTR thấp ở 2 angle, CVR drop ở landing — và biết phải fix gì.",
      "Đây là career path có lương cao nhất hiện tại trong Digital Marketing VN. Salary Benchmark 2026: combo Performance + Data có premium +20-30% so với chỉ 1 platform. Combo Performance + Data + Marketplace ('Full-stack Ecom Marketer') premium +35-50%. Nếu thêm AI/automation, L4-L5 lương 50-90M không phải chuyện lạ.",
      "Bạn cực phù hợp Ecom Enabler/Performance Agency — nơi commission theo NMV cho phép upside cao hơn brand in-house.",
    ],
    strengths: [
      "Phân tích data, tìm pattern, tư duy logic structured",
      "Không bias cảm tính khi quyết định — argue được với sếp bằng số",
      "Optimize liên tục, đo từng improvement nhỏ",
      "Build dashboard, system, framework có thể chuyển giao",
    ],
    weaknesses: [
      "Có thể paralyze khi thiếu data đủ",
      "Khó truyền insight cho người không hiểu data",
      "Đôi khi quá focus numbers, miss cảm xúc buyer",
      "Cần thời gian decision, không phù hợp tình huống gấp",
    ],
    context: [
      "Lộ trình lương VN 2026 (Salary Benchmark UpBase):",
      "L0-L1 Fresher (0-1.5y): Ads Junior — 7-12M total income",
      "L2 Junior (1.5-3y): Performance Specialist (1 platform) — 11-18M",
      "L3 Executive (3-5y): Senior Performance/Growth Analyst — 18-28M (★ vùng cạnh tranh)",
      "L4 Manager (4-6y): Performance Lead/Growth Manager — 25-40M",
      "L5 Head (6+y): Head of Growth/Director — 40-90M",
      "Skill combo premium: 1 platform = baseline | 3 platform + data + AI = +50-80%",
    ],
    advice: [
      "Master 1 platform sâu trước (TikTok Ads HOẶC Shopee Ads HOẶC Meta) — đừng dàn trải",
      "Học SQL + GA4 advanced + Looker Studio cùng lúc với platform → premium +25%",
      "Build 3 case study có số: 'Tôi tăng ROAS từ X→Y trong Z ngày bằng cách...'",
      "Sau 2 năm 1 platform → expand sang platform thứ 2, rồi data analytics → Full-stack",
      "Đối với Ecom Enabler, đảm bảo P4 (commission NMV) tối thiểu 15-20% total income",
    ],
  },

  /* ───────── COMMUNICATOR ───────── */
  {
    id: "communicator",
    name: "The Communicator — Account & Influencer",
    tagline: "People · Negotiation · Influence",
    color: "#5fffaa",
    description: [
      "Bạn nhớ tên + insight cá nhân của 200+ người — và những mối quan hệ đó là superpower của bạn. Trong Marketing/Ecom, bạn xây cộng đồng, deal partnership với KOC/KOL/agency, và biến từng đối tác thành champion của brand.",
      "Theo Salary Benchmark 2026, role Account Management/Client Servicing/Partnership có lương ổn định ở L1-L3 (10-28M) và scale rất tốt khi lên L4-L5 với commission. Đặc biệt Influencer/KOC Marketing — ngành đang growth nhanh nhất theo TikTok Shop GMV +37% YoY 2025.",
      "Bạn có lợi thế lớn ở Agency và Brand In-house lead level. Ít phù hợp Ecom Enabler thuần về data.",
    ],
    strengths: [
      "Networking + people skills xuất sắc, đọc cảm xúc nhanh",
      "Đàm phán, persuasion, sales chốt deal",
      "Build cộng đồng, gắn kết stakeholder từ nhiều phía",
      "Empathy cao — biết KOC/buyer cần gì trước khi họ nói",
    ],
    weaknesses: [
      "Có thể ít focus execution chi tiết",
      "Tránh xung đột hoặc quyết định cứng",
      "Phụ thuộc input từ người khác để decide",
      "Khó làm việc 1 mình kéo dài — cần social interaction",
    ],
    context: [
      "Lộ trình lương VN 2026 (Salary Benchmark UpBase):",
      "L0-L1 Fresher (0-1.5y): Junior Account/AE — 7-12M (+commission)",
      "L2 Junior (1.5-3y): Account Manager/Influencer Specialist — 11-20M",
      "L3 Executive (3-5y): Senior AM/Partnership Manager — 18-30M (commission upside cao)",
      "L4 Manager (4-6y): Group Account Director/Head of Influencer — 30-50M",
      "L5 Head (6+y): Client Service Director/CCO — 50-90M",
      "Lưu ý: lương total income phụ thuộc commission — biến động 25-45%",
    ],
    advice: [
      "Build CRM cá nhân — track 200+ contacts với insight cá nhân (Notion/Airtable)",
      "Mỗi tuần: 3 catch-up calls + 1 networking event + 5 personalized DM",
      "Học data basics (GA4, ROAS) để decisions có grounding với client",
      "Học framework negotiation (BATNA, ZOPA) — đàm phán có structure, không cảm tính",
      "Cộng tác với 1 operator/analyst để follow-through: bạn deal, họ execute",
    ],
  },

  /* ───────── BUILDER ───────── */
  {
    id: "builder",
    name: "The Builder — Founder & Lead",
    tagline: "T-shaped · Strategy · Ownership",
    color: "#a78bff",
    description: [
      "Bạn không thích bị bó buộc — cần freedom + không gian để build cái lớn. Bạn đa tài (T-shaped): biết một chút về mọi thứ — content, ads, ops, sales — đủ để stitch lại thành business chạy được.",
      "Đây là career path khó nhất nhưng upside cao nhất. Salary Benchmark 2026: Marketing Lead/Brand Manager L4 đạt 25-40M base, Head of Growth L5 đạt 40-90M. Founder thì không có trần — nhưng cũng không có sàn 0-2 năm đầu.",
      "Bạn phù hợp Ecom Enabler scale nhỏ-vừa (UpBase model có commission NMV upside cao), MNC nếu muốn ổn định, hoặc tự khởi nghiệp. KHÔNG phù hợp role thuần executor 0-2 năm đầu — bạn sẽ chán.",
    ],
    strengths: [
      "Đa năng, T-shaped skills — học nhanh mọi thứ",
      "Tự chủ, decision nhanh, ownership cao",
      "Founder mindset — nhìn bức tranh lớn, từ business model đến execution",
      "Pivot linh hoạt khi market thay đổi",
    ],
    weaknesses: [
      "Có thể bỏ dở khi tìm thấy ý tưởng mới hấp dẫn hơn",
      "Khó delegate, ôm việc quá nhiều",
      "Bored với routine và process detail",
      "Burnout vì làm quá nhiều thứ một lúc",
    ],
    context: [
      "Lộ trình lương VN 2026 (Salary Benchmark UpBase):",
      "L1-L2 (0-3y): Marketing Coordinator/Specialist — 9-18M (xây foundation)",
      "L3 Executive (3-5y): Senior Marketing/Growth PM — 18-28M",
      "L4 Manager (4-6y): Marketing Lead/Brand Manager — 25-40M",
      "L5 Head (6+y): Head of Marketing/CMO — 40-90M (MNC + equity)",
      "Founder: 0-3 năm có thể dưới 10M, sau đó upside cực lớn nếu thành công",
      "Recommend: 2-3 năm specialist sâu (Performance hoặc Brand) trước khi lên Manager",
    ],
    advice: [
      "0-2 năm đầu: pick 1 specialty deep dive (Performance/Brand/Product) trước khi 'build'",
      "Hire/đối tác với 1 operator + 1 analyst để execute — bạn không thể làm 1 mình tất cả",
      "Build P&L modeling, go-to-market framework, strategic planning — skills khác Specialist",
      "Đầu tư mạnh cho 1 vertical (ngành) thay vì spread mỏng nhiều ngành",
      "Học kỷ luật focus 1 thứ trong 90 ngày trước khi pivot — tránh shiny object syndrome",
    ],
  },

  /* ───────── OPERATOR ───────── */
  {
    id: "operator",
    name: "The Operator — Marketplace Ops",
    tagline: "System · Process · Execution",
    color: "#ffd479",
    description: [
      "Bạn tin rằng 'hệ thống tốt > người tài'. Trong khi mọi người chạy theo creative + growth hack, bạn thầm lặng build các SOP, dashboard, quy trình giúp business chạy được lên 10x mà không sập.",
      "Theo Salary Benchmark 2026, Marketplace & E-commerce Operations là role 'âm thầm hot' — TikTok Shop GMV +37% YoY 2025 → demand operator scale tăng đột biến. Nhiều brand sẵn sàng trả 18-25M cho Senior Operator có 3+ năm Shopee/TikTok Shop kinh nghiệm.",
      "Bạn phù hợp Brand In-house (ổn định), Ecom Enabler (commission tốt), MNC (lương cao). Ít phù hợp role thuần Performance Marketing — bạn sẽ thấy thiếu structure.",
    ],
    strengths: [
      "Có hệ thống, methodical, ít miss detail",
      "Đáng tin cậy, làm đúng cam kết, dependable",
      "Build SOPs + processes vận hành tốt, scale được",
      "Ổn định trong áp lực + chaos — biết cách lập lại trật tự",
    ],
    weaknesses: [
      "Khó với chaos hoặc thay đổi nhanh không có plan",
      "Có thể quá rigid với rules và quy trình",
      "Thiếu sáng tạo / risk-taking",
      "Khó nhìn bức tranh lớn lúc đầu, focus quá nhiều vào detail",
    ],
    context: [
      "Lộ trình lương VN 2026 (Salary Benchmark UpBase):",
      "L0-L1 Fresher (0-1.5y): Junior Ecom Ops/PM — 7-12M",
      "L2 Junior (1.5-3y): Marketplace Specialist (Shopee/TikTok Shop) — 11-18M",
      "L3 Executive (3-5y): Senior Ecom Operator/Trade Marketing — 18-28M",
      "L4 Manager (4-6y): Ecom Manager/Ops Lead — 25-40M",
      "L5 Head (6+y): Head of E-commerce/E-commerce Director — 40-70M",
      "Premium: combine với Performance/Data → 'Full-stack Ecom Marketer' +35-50%",
    ],
    advice: [
      "Specialize 1 platform sâu (Shopee HOẶC TikTok Shop) trong 12-18 tháng đầu",
      "Master 10 skill ops cốt lõi: listing SEO, voucher, promotion, fulfillment, dashboard, analytics platform",
      "Build SOPs cho từng task — show được portfolio process khi phỏng vấn",
      "Sau 2-3 năm specialist → expand sang Performance (chạy ads cho gian hàng mình ops) → Full-stack",
      "Học nhìn bức tranh lớn — strategy, không chỉ execution. Đọc P&L gian hàng định kỳ",
    ],
  },
];
