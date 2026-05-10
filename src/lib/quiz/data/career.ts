import type { QuizArchetype, QuizQuestion } from "../types";

/**
 * Test Hướng Nghiệp Marketing & Ecom
 * Mapping: A=creator, B=analyst, C=communicator, D=builder, E=operator
 */

export const CAREER_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Khi xem 1 quảng cáo TikTok đang viral, điều đầu tiên bạn nghĩ là?",
    options: [
      { key: "A", text: "\"Hook đó kéo cảm xúc hay quá — concept rất sáng tạo\"", scores: ["creator"] },
      { key: "B", text: "\"Họ chạy ROAS bao nhiêu? CPM nhiêu mà reach mạnh thế?\"", scores: ["analyst"] },
      { key: "C", text: "\"Khúc nào audience react nhiều nhất? Comment đang nói gì?\"", scores: ["communicator"] },
      { key: "D", text: "\"Mình build cái tương tự được không? Cần gì để launch?\"", scores: ["builder"] },
      { key: "E", text: "\"Bao nhiêu người chạy ads này? Dòng tiền + fulfillment ra sao?\"", scores: ["operator"] },
    ],
  },
  {
    id: 2,
    text: "Trong dự án nhóm, bạn thường:",
    options: [
      { key: "A", text: "Đề xuất ý tưởng + làm hình ảnh / video / content", scores: ["creator"] },
      { key: "B", text: "Phân tích data, làm spreadsheet, đo hiệu quả", scores: ["analyst"] },
      { key: "C", text: "Trao đổi, kết nối các bên, present kết quả", scores: ["communicator"] },
      { key: "D", text: "Đứng ra organize, lead chung, đảm bảo deliver", scores: ["builder"] },
      { key: "E", text: "Lo phần execution chi tiết, theo dõi tiến độ", scores: ["operator"] },
    ],
  },
  {
    id: 3,
    text: "Cuối tuần rảnh, bạn có xu hướng làm gì?",
    options: [
      { key: "A", text: "Vẽ, viết, làm video, design Pinterest board", scores: ["creator"] },
      { key: "B", text: "Đọc data report, học công cụ analytics mới", scores: ["analyst"] },
      { key: "C", text: "Đi cà phê với bạn bè, networking event", scores: ["communicator"] },
      { key: "D", text: "Brainstorm side project, học kỹ năng đa lĩnh vực", scores: ["builder"] },
      { key: "E", text: "Sắp xếp lại Notion, todo list, plan tuần tới", scores: ["operator"] },
    ],
  },
  {
    id: 4,
    text: "Câu nào mô tả bạn đúng nhất?",
    options: [
      { key: "A", text: "\"Mọi thứ phải đẹp và có cảm xúc, dù là 1 cái email\"", scores: ["creator"] },
      { key: "B", text: "\"Cho tôi xem data, tôi sẽ tìm ra pattern\"", scores: ["analyst"] },
      { key: "C", text: "\"Tôi nhớ tên + insight cá nhân của 200+ người\"", scores: ["communicator"] },
      { key: "D", text: "\"Cho tôi 3 tháng và tôi sẽ build cái mới hoàn toàn\"", scores: ["builder"] },
      { key: "E", text: "\"Hệ thống tốt > người tài. Quy trình quan trọng nhất.\"", scores: ["operator"] },
    ],
  },
  {
    id: 5,
    text: "Khi shop bạn launch sản phẩm mới flop, bạn sẽ:",
    options: [
      { key: "A", text: "Quay lại cải thiện storytelling + visual của sản phẩm", scores: ["creator"] },
      { key: "B", text: "Pull data: traffic, CVR, where buyer drop off, fix funnel", scores: ["analyst"] },
      { key: "C", text: "Hỏi feedback từ buyer, KOC, partner để hiểu vì sao", scores: ["communicator"] },
      { key: "D", text: "Review toàn bộ go-to-market, pivot strategy nếu cần", scores: ["builder"] },
      { key: "E", text: "Audit từng bước process: listing, ads setup, fulfillment", scores: ["operator"] },
    ],
  },
  {
    id: 6,
    text: "Lương cao nhưng buồn chán vs lương trung bình nhưng được làm passion?",
    options: [
      { key: "A", text: "Passion mới quan trọng — không có cảm hứng sao sống nổi", scores: ["creator"] },
      { key: "B", text: "Tuỳ data: việc nào ROI dài hạn cao hơn, nếu chưa rõ thì pick lương cao", scores: ["analyst"] },
      { key: "C", text: "Xem ai sếp + đồng đội — môi trường người mới quan trọng", scores: ["communicator"] },
      { key: "D", text: "Cả 2 đều không hấp dẫn — tôi sẽ tự build cái của mình", scores: ["builder"] },
      { key: "E", text: "Lương cao + ổn định = an toàn để execute kế hoạch dài hạn", scores: ["operator"] },
    ],
  },
  {
    id: 7,
    text: "Idol nghề nghiệp của bạn là kiểu người nào?",
    options: [
      { key: "A", text: "Director sáng tạo có signature riêng (Wes Anderson, Saatchi)", scores: ["creator"] },
      { key: "B", text: "Growth hacker có case study viral (Sean Ellis, Brian Balfour)", scores: ["analyst"] },
      { key: "C", text: "Người connector giỏi (Reid Hoffman, networker xịn)", scores: ["communicator"] },
      { key: "D", text: "Founder build từ 0 (Steve Jobs, Elon Musk, Naval)", scores: ["builder"] },
      { key: "E", text: "COO/Operator silent giúp công ty scale (Tim Cook, Sheryl Sandberg)", scores: ["operator"] },
    ],
  },
  {
    id: 8,
    text: "Bạn ghét nhất task nào?",
    options: [
      { key: "A", text: "Làm spreadsheet 8h liên tục, không sáng tạo gì", scores: ["creator"] },
      { key: "B", text: "Quyết định không có data, chỉ dựa cảm tính", scores: ["analyst"] },
      { key: "C", text: "Ngồi 1 mình code/làm việc 8h không tương tác", scores: ["communicator"] },
      { key: "D", text: "Làm task nhỏ, lặp lại, không thấy được bức tranh lớn", scores: ["builder"] },
      { key: "E", text: "Chaos không có hệ thống, mỗi ngày 1 quy trình khác", scores: ["operator"] },
    ],
  },
  {
    id: 9,
    text: "Khi học kỹ năng mới, bạn thường:",
    options: [
      { key: "A", text: "Tìm reference đẹp, copy-deconstruct cách họ làm", scores: ["creator"] },
      { key: "B", text: "Đọc lý thuyết, framework, hiểu trước khi practice", scores: ["analyst"] },
      { key: "C", text: "Hỏi mentor / cộng đồng, học qua trò chuyện", scores: ["communicator"] },
      { key: "D", text: "Apply ngay vào project thực, học bằng cách build", scores: ["builder"] },
      { key: "E", text: "Tạo checklist các bước, theo từng module có hệ thống", scores: ["operator"] },
    ],
  },
  {
    id: 10,
    text: "5 năm sau, bạn muốn đang làm gì?",
    options: [
      { key: "A", text: "Sản xuất content/sản phẩm sáng tạo có dấu ấn cá nhân", scores: ["creator"] },
      { key: "B", text: "Tối ưu hệ thống, cracking growth puzzles cho brand lớn", scores: ["analyst"] },
      { key: "C", text: "Build cộng đồng / lead team people, network rộng", scores: ["communicator"] },
      { key: "D", text: "Có business riêng, đang scale lên 7-8 con số", scores: ["builder"] },
      { key: "E", text: "Vận hành cỗ máy chuẩn cho tổ chức lớn, không bug", scores: ["operator"] },
    ],
  },
  {
    id: 11,
    text: "Khi ngân sách marketing 100tr cho tháng này, bạn ưu tiên gì đầu tiên?",
    options: [
      { key: "A", text: "Đầu tư content + video xịn (đẹp, kể chuyện, viral potential)", scores: ["creator"] },
      { key: "B", text: "Test 5-10 ad sets nhỏ → scale cái winner theo data", scores: ["analyst"] },
      { key: "C", text: "Hire KOL / KOC + influencer để có social proof", scores: ["communicator"] },
      { key: "D", text: "Mix nhiều kênh: ads + content + community + sale event", scores: ["builder"] },
      { key: "E", text: "Tối ưu landing page + fulfillment trước, ads sau", scores: ["operator"] },
    ],
  },
  {
    id: 12,
    text: "Câu nào đúng nhất với bạn?",
    options: [
      { key: "A", text: "Tôi cần thấy ý nghĩa và thẩm mỹ trong việc tôi làm", scores: ["creator"] },
      { key: "B", text: "Tôi cần con số đo lường được sự tiến bộ", scores: ["analyst"] },
      { key: "C", text: "Tôi cần con người + kết nối để không cô đơn", scores: ["communicator"] },
      { key: "D", text: "Tôi cần freedom + không gian để build cái lớn", scores: ["builder"] },
      { key: "E", text: "Tôi cần hệ thống ổn định để work-life cân bằng", scores: ["operator"] },
    ],
  },
];

export const CAREER_ARCHETYPES: QuizArchetype[] = [
  {
    id: "creator",
    name: "The Creator — Người Sáng Tạo",
    tagline: "Storytelling · Thẩm mỹ · Cảm xúc",
    color: "#ff6b9d",
    description: [
      "Bạn là kiểu người mà mọi thứ phải đẹp và có cảm xúc — dù là 1 cái email, 1 caption hay 1 video. Trong ngành Marketing/Ecom, bạn là 'engine' tạo ra content + visual khiến brand đứng dậy giữa hàng nghìn shop khác.",
      "Bạn thường vừa có gu thẩm mỹ tốt, vừa nắm bắt được trend. Storytelling là vũ khí của bạn — bạn biết cách kéo cảm xúc buyer từ scroll dừng lại đến quyết định mua.",
    ],
    strengths: [
      "Tư duy concept + storytelling mạnh",
      "Thẩm mỹ tinh tế, gu visual cao",
      "Nắm bắt trend, văn hoá nhanh",
      "Tạo ra brand identity có dấu ấn",
    ],
    weaknesses: [
      "Có thể bỏ qua data/measurement",
      "Khó pivot khi creative không hiệu quả",
      "Đôi khi quá perfectionist, deadline trễ",
      "Khó scale vì depend vào cảm hứng",
    ],
    context: [
      "Content Creator / Video Producer",
      "Brand Designer / Art Director",
      "Creative Strategist (Agency / In-house)",
      "TikTok Creator + Brand Owner",
      "Copywriter / Senior Content",
      "Lương VN: 12-30tr (junior-mid), 40-80tr (senior)",
    ],
    advice: [
      "Học 1-2 chỉ số đo lường (CTR, engagement rate)",
      "Build portfolio rõ ràng để show work",
      "Cộng tác với analyst để creative có data backing",
      "Đặt deadline cứng và 'good enough' đủ rồi",
    ],
  },
  {
    id: "analyst",
    name: "The Analyst — Người Phân Tích",
    tagline: "Data · Logic · Optimization",
    color: "#4ad6ff",
    description: [
      "Bạn nhìn marketing như một puzzle — và data là manh mối để giải. Trong khi người khác cãi nhau về 'creative đẹp hay xấu', bạn pull report và thấy ad set nào CPM thấp + CTR cao mà ROAS không tốt → vấn đề ở landing.",
      "Bạn thoải mái với spreadsheet, dashboard, A/B testing. Performance Marketing và Growth là sân chơi của bạn — đo được, optimize được, và không có chỗ cho đoán.",
    ],
    strengths: [
      "Phân tích data, tìm pattern",
      "Tư duy logic, structured",
      "Không bias cảm tính khi quyết định",
      "Optimize liên tục, đo từng improvement",
    ],
    weaknesses: [
      "Có thể paralyze khi thiếu data",
      "Khó truyền insight cho người không hiểu data",
      "Đôi khi quá focus vào numbers, miss cảm xúc buyer",
      "Cần thời gian decision, không phù hợp tình huống gấp",
    ],
    context: [
      "Performance Marketing / Ads Specialist",
      "Growth Hacker / Growth PM",
      "Data Analyst (Marketing)",
      "Conversion Rate Optimization (CRO)",
      "Marketing Operations / Marketing Ops",
      "Lương VN: 15-35tr (junior-mid), 50-100tr+ (senior)",
    ],
    advice: [
      "Học kể chuyện với data (data storytelling)",
      "Build skill SQL, Excel advanced, Python basic",
      "Đôi khi quyết định nhanh, đừng đợi data 'hoàn hảo'",
      "Cộng tác với creator để insight ra creative",
    ],
  },
  {
    id: "communicator",
    name: "The Communicator — Người Kết Nối",
    tagline: "Networking · Empathy · Influence",
    color: "#5fffaa",
    description: [
      "Bạn nhớ tên + insight cá nhân của 200+ người, và những mối quan hệ đó là superpower của bạn. Trong Marketing/Ecom, bạn xây cộng đồng, kết nối brands với KOL/KOC, deal partnership và biến từng đối tác thành champion của brand.",
      "Bạn có empathy cao và influence skills mạnh. Khi mọi người căng thẳng, bạn là người làm dịu; khi cần đàm phán, bạn là người chốt deal.",
    ],
    strengths: [
      "Networking + people skills xuất sắc",
      "Empathy, đọc cảm xúc người khác tốt",
      "Đàm phán, persuasion, sales",
      "Build cộng đồng, gắn kết stakeholder",
    ],
    weaknesses: [
      "Có thể ít focus vào execution chi tiết",
      "Tránh xung đột hoặc quyết định cứng",
      "Phụ thuộc vào input từ người khác",
      "Khó làm việc 1 mình kéo dài",
    ],
    context: [
      "Account Manager / Client Servicing",
      "Influencer / KOC Marketing",
      "Community Manager / Social",
      "PR / Brand Partnerships",
      "Sales B2B / Business Development",
      "Lương VN: 12-30tr (junior-mid), 40-80tr (senior + commission)",
    ],
    advice: [
      "Học data basics để decisions có grounding",
      "Build hệ thống CRM cá nhân để track quan hệ",
      "Học nói không + đối mặt xung đột khi cần",
      "Cộng tác với operator để follow-through",
    ],
  },
  {
    id: "builder",
    name: "The Builder — Người Khởi Tạo",
    tagline: "Đa tài · Tự chủ · Founder mindset",
    color: "#a78bff",
    description: [
      "Bạn không thích bị bó buộc — cần freedom + không gian để build cái lớn. Bạn nhìn thấy gap trong thị trường và muốn tự mình giải quyết, không đợi sếp hay quy trình.",
      "Bạn đa tài (T-shaped): biết một chút về mọi thứ — content, ads, ops, sales — đủ để stitch lại thành business chạy được. Có thể tự mình launch shop, build brand, hoặc lead team đa chức năng.",
    ],
    strengths: [
      "Đa năng, T-shaped skills",
      "Tự chủ, decision nhanh",
      "Founder mindset, nhìn bức tranh lớn",
      "Học nhanh, pivot linh hoạt",
    ],
    weaknesses: [
      "Có thể bỏ dở khi tìm thấy ý tưởng mới hấp dẫn hơn",
      "Khó delegate, ôm việc quá nhiều",
      "Bored với routine và process detail",
      "Burnout vì làm quá nhiều thứ một lúc",
    ],
    context: [
      "Founder / Co-founder Ecom Brand",
      "Marketing Lead / CMO startup",
      "Product Manager (đa lĩnh vực)",
      "Growth Lead / Head of Growth",
      "Head of Brand (small-mid company)",
      "Lương VN: 30-80tr (lead), 100tr+ (founder/equity)",
    ],
    advice: [
      "Hire/đối tác với operator để execute chi tiết",
      "Học kỷ luật focus 1 thứ trước khi pivot",
      "Build hệ thống delegate, không ôm hết",
      "Đầu tư mạnh cho 1 vertical thay vì spread",
    ],
  },
  {
    id: "operator",
    name: "The Operator — Người Vận Hành",
    tagline: "Hệ thống · Tin cậy · Detail",
    color: "#ffd479",
    description: [
      "Bạn tin rằng 'hệ thống tốt > người tài'. Trong khi mọi người chạy theo creative + growth hack, bạn thầm lặng build các SOP, dashboard, quy trình giúp business chạy được lên 10x mà không sập.",
      "Bạn detail-oriented và đáng tin tuyệt đối. Khi có project chaos, bạn là người được giao 'organize lại' và mọi thứ trở nên trật tự.",
    ],
    strengths: [
      "Có hệ thống, methodical",
      "Detail-oriented, ít miss",
      "Đáng tin cậy, làm đúng cam kết",
      "Build SOPs + processes vận hành tốt",
    ],
    weaknesses: [
      "Khó với chaos hoặc thay đổi nhanh",
      "Có thể quá rigid với rules",
      "Thiếu sáng tạo / risk-taking",
      "Khó nhìn bức tranh lớn lúc đầu",
    ],
    context: [
      "Ecommerce Operator (Shopee/TikTok shop)",
      "Project Manager / Marketing PM",
      "Trade Marketing / Channel Marketing",
      "Marketing Operations / RevOps",
      "Customer Success / Account Ops",
      "Lương VN: 15-30tr (junior-mid), 40-70tr (senior + manager)",
    ],
    advice: [
      "Học nhìn bức tranh lớn (strategy, not just execution)",
      "Mở lòng với cách làm mới khi cần",
      "Build mối quan hệ ngoài execution work",
      "Đối tác với creator/builder để có innovation",
    ],
  },
];
