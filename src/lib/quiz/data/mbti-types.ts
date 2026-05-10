import type { QuizArchetype } from "../types";

/**
 * 16 MBTI types — Vietnamese descriptions.
 * Color theme: 4 groups (Analyst purple, Diplomat green, Sentinel blue, Explorer orange).
 */

export const MBTI_TYPES: QuizArchetype[] = [
  // ─────── ANALYSTS (Nhà Phân tích) ───────
  {
    id: "INTJ",
    name: "INTJ — Nhà Khoa Học",
    tagline: "Chiến lược · Độc lập · Tầm nhìn dài hạn",
    color: "#a78bff",
    description: [
      "INTJ là tuýp người chiến lược gia, có khả năng nhìn xa trông rộng và thiết kế các hệ thống phức tạp trong đầu. Bạn thích làm việc một mình, suy nghĩ sâu sắc và không ngại thách thức quan điểm số đông nếu bạn tin có lý do tốt hơn.",
      "Với bạn, hiệu quả và logic quan trọng hơn cảm xúc xã hội. Bạn dễ bị nhầm là lạnh lùng, nhưng thực ra bạn cực kỳ tận tâm với một số ít người và mục tiêu mà bạn coi là quan trọng.",
    ],
    strengths: ["Tư duy chiến lược dài hạn", "Tự lập, quyết đoán", "Khả năng phân tích sâu", "Cam kết cao với mục tiêu"],
    weaknesses: ["Có thể quá lạnh lùng / khó gần", "Thiếu kiên nhẫn với inefficiency", "Khó chấp nhận ý kiến trái chiều", "Bỏ qua nhu cầu cảm xúc người khác"],
    context: ["Khoa học, R&D, kỹ thuật", "Chiến lược doanh nghiệp", "Đầu tư tài chính, phân tích", "Lãnh đạo công nghệ"],
    advice: ["Học cách thể hiện cảm xúc với người thân", "Lắng nghe trước khi phản biện", "Linh hoạt khi context thay đổi"],
  },
  {
    id: "INTP",
    name: "INTP — Nhà Tư Duy",
    tagline: "Lý thuyết · Tò mò · Phát minh",
    color: "#a78bff",
    description: [
      "INTP là tuýp triết gia, thích khám phá ý tưởng mới và đặt câu hỏi 'tại sao' với mọi thứ. Bạn có khả năng phân tích logic xuất chúng và thường tìm ra giải pháp khác biệt cho vấn đề khó.",
      "Bạn yêu freedom và không thích quy tắc cứng nhắc. Có thể hơi khó tổ chức cuộc sống thường nhật vì đầu óc luôn bay bổng với những ý tưởng lớn.",
    ],
    strengths: ["Tư duy logic, sáng tạo", "Khả năng học nhanh", "Linh hoạt, không định kiến", "Giải quyết vấn đề độc đáo"],
    weaknesses: ["Có thể procrastinate, khó deadline", "Bỏ qua chi tiết nhỏ", "Khó xử lý cảm xúc / xung đột", "Quá lý thuyết, ít thực thi"],
    context: ["Nghiên cứu khoa học, học thuật", "Lập trình, hệ thống", "Triết học, nghiên cứu xã hội", "Tư vấn chiến lược"],
    advice: ["Đặt deadline cứng cho bản thân", "Học kỹ năng giao tiếp cảm xúc", "Đôi khi 'good enough' đủ rồi"],
  },
  {
    id: "ENTJ",
    name: "ENTJ — Nhà Lãnh Đạo",
    tagline: "Quyết đoán · Tổ chức · Định hướng kết quả",
    color: "#a78bff",
    description: [
      "ENTJ là natural leader — bạn nhìn thấy mục tiêu và biết cách build hệ thống để đạt được nó. Quyết đoán, tự tin, không ngại đối mặt với thử thách lớn.",
      "Bạn vận hành ở tốc độ cao, đòi hỏi kết quả cụ thể và không có nhiều kiên nhẫn với những người 'lề mề'. Trong môi trường phù hợp, bạn dẫn dắt cả tổ chức tăng trưởng vượt bậc.",
    ],
    strengths: ["Lãnh đạo tự nhiên, quyết đoán", "Strategic thinking + execution", "Tự tin trước áp lực", "Năng lượng cao, drive mạnh"],
    weaknesses: ["Có thể lấn át, dominating", "Thiếu nhạy cảm với cảm xúc", "Quá focus vào kết quả, bỏ qua quá trình", "Cứng nhắc khi cần linh hoạt"],
    context: ["CEO, founder, lãnh đạo cấp cao", "Tư vấn chiến lược, M&A", "Luật sư, tranh tụng", "Quản lý dự án quy mô lớn"],
    advice: ["Lắng nghe trước khi quyết định", "Ghi nhận đóng góp của team", "Cân bằng work-life cho bản thân"],
  },
  {
    id: "ENTP",
    name: "ENTP — Nhà Phát Minh",
    tagline: "Tranh luận · Sáng tạo · Đa tài",
    color: "#a78bff",
    description: [
      "ENTP là tuýp visionary entrepreneur — đầu óc luôn xoay quanh những ý tưởng mới, có khả năng kết nối các điểm tưởng chừng không liên quan. Bạn thích tranh luận, thử thách giả định và tìm cách 'phá vỡ' rồi xây lại.",
      "Bạn năng lượng cao, đa tài, nhưng đôi khi khó tập trung vào một thứ đủ lâu để hoàn thành. Là người khởi xướng tuyệt vời, cần đối tác giỏi thực thi.",
    ],
    strengths: ["Sáng tạo, ideation mạnh", "Tranh luận sắc bén", "Năng lượng và charisma cao", "Khả năng pivot nhanh"],
    weaknesses: ["Khó hoàn thành dự án dài", "Có thể argumentative", "Dễ bored với routine", "Bỏ qua chi tiết và cảm xúc"],
    context: ["Entrepreneur, startup founder", "Marketing, branding sáng tạo", "Tranh luận, luật, debate", "Innovation, product design"],
    advice: ["Đối tác với người giỏi execution", "Học chú ý chi tiết khi cần", "Cân bằng giữa tranh luận và lắng nghe"],
  },

  // ─────── DIPLOMATS (Nhà Ngoại giao) ───────
  {
    id: "INFJ",
    name: "INFJ — Người Cố Vấn",
    tagline: "Sâu sắc · Thấu cảm · Lý tưởng",
    color: "#5fffaa",
    description: [
      "INFJ là tuýp hiếm nhất (~1.5% dân số) — bạn kết hợp trực giác sâu sắc với lý tưởng cao và mong muốn giúp đỡ người khác. Bạn nhìn thấu suy nghĩ và cảm xúc của người đối diện một cách tự nhiên.",
      "Bạn thường có 1-2 mục đích lớn trong đời và sẵn sàng hy sinh nhiều thứ để theo đuổi. Cẩn trọng với burnout vì bạn dễ overgive cho người khác.",
    ],
    strengths: ["Trực giác về con người sâu sắc", "Cam kết với lý tưởng", "Lắng nghe và empathy mạnh", "Khả năng truyền cảm hứng"],
    weaknesses: ["Dễ burnout do overgive", "Cầu toàn quá mức", "Khó nói không, sợ làm tổn thương", "Có thể quá lý tưởng, ít thực tế"],
    context: ["Tham vấn tâm lý, mentor", "Viết lách, sáng tác", "Phi lợi nhuận, hoạt động xã hội", "Giáo dục, đào tạo"],
    advice: ["Học cách nói không và đặt boundaries", "Nghỉ ngơi recharge định kỳ", "Đôi khi 'good' đủ rồi, không cần 'perfect'"],
  },
  {
    id: "INFP",
    name: "INFP — Người Lý Tưởng Hoá",
    tagline: "Sáng tạo · Chân thành · Giá trị nội tâm",
    color: "#5fffaa",
    description: [
      "INFP sống với giá trị cốt lõi sâu sắc — bạn tin vào sự chân thành, sáng tạo và làm điều đúng đắn. Có thế giới nội tâm phong phú, thường thể hiện qua nghệ thuật, viết lách hoặc các hoạt động ý nghĩa.",
      "Bạn nhạy cảm cao với sự bất công và cảm xúc của người khác. Mặc dù trông có vẻ nhẹ nhàng, bạn rất kiên định khi liên quan đến giá trị bạn tin tưởng.",
    ],
    strengths: ["Sáng tạo, có thế giới nội tâm phong phú", "Chân thành, sống đúng giá trị", "Empathy mạnh", "Kiên định với điều quan trọng"],
    weaknesses: ["Quá idealistic, khó thực thi", "Dễ tổn thương khi bị chỉ trích", "Avoid xung đột", "Khó tổ chức công việc thường nhật"],
    context: ["Viết lách, văn học, nghệ thuật", "Tham vấn, coaching", "Marketing thương hiệu giá trị", "Phi lợi nhuận, giáo dục"],
    advice: ["Set deadline và hệ thống cho công việc", "Học cách đối mặt với phê bình", "Cân bằng giữa lý tưởng và thực tế"],
  },
  {
    id: "ENFJ",
    name: "ENFJ — Người Truyền Cảm Hứng",
    tagline: "Truyền lửa · Kết nối · Mentor",
    color: "#5fffaa",
    description: [
      "ENFJ là natural mentor và people leader — bạn có khả năng đặc biệt trong việc nhìn thấy tiềm năng người khác và giúp họ phát triển. Charisma cao, biết cách kết nối tập thể quanh mục tiêu chung.",
      "Bạn quan tâm sâu sắc đến người khác và thường đặt nhu cầu của họ trước nhu cầu của mình. Cẩn trọng để không quên chăm sóc bản thân.",
    ],
    strengths: ["Khả năng truyền cảm hứng cao", "Empathy + leadership combo", "Kết nối tập thể tự nhiên", "Phát triển con người tốt"],
    weaknesses: ["Quá focus vào người khác, bỏ quên bản thân", "Có thể people-pleaser", "Khó đối mặt xung đột", "Đôi khi quá lý tưởng"],
    context: ["Quản lý nhân sự, HR", "Diễn thuyết, đào tạo", "Lãnh đạo phi lợi nhuận", "Mentor, coach"],
    advice: ["Đặt boundaries với người khác", "Chăm sóc bản thân định kỳ", "Học đối mặt xung đột thay vì né"],
  },
  {
    id: "ENFP",
    name: "ENFP — Người Truyền Lửa",
    tagline: "Nhiệt huyết · Sáng tạo · Tự do",
    color: "#5fffaa",
    description: [
      "ENFP năng lượng tỏa ra rạng rỡ — bạn yêu cuộc sống, yêu con người, yêu khám phá. Có khả năng kết nối với mọi người dễ dàng và tạo cảm hứng cho cả phòng khi bước vào.",
      "Bạn theo đuổi đam mê và ý nghĩa hơn là tiền bạc. Đa tài, nhưng đôi khi khó focus vào một hướng đủ lâu vì có quá nhiều ý tưởng hấp dẫn.",
    ],
    strengths: ["Nhiệt huyết, lan toả năng lượng", "Sáng tạo và kết nối ý tưởng", "People skills xuất sắc", "Linh hoạt, thích nghi nhanh"],
    weaknesses: ["Khó tập trung vào một thứ lâu", "Dễ overcommit, tốn năng lượng", "Tránh detail và admin work", "Mood swings cao"],
    context: ["Marketing, advertising, sáng tạo", "Khởi nghiệp, entrepreneur", "Đào tạo, public speaker", "Du lịch, journalism"],
    advice: ["Học prioritize, nói không với quá nhiều ý tưởng", "Hệ thống hoá routine cơ bản", "Đối tác với người giỏi execution"],
  },

  // ─────── SENTINELS (Người Bảo Vệ) ───────
  {
    id: "ISTJ",
    name: "ISTJ — Người Trách Nhiệm",
    tagline: "Đáng tin · Có hệ thống · Trung thành",
    color: "#7da9ff",
    description: [
      "ISTJ là backbone của mọi tổ chức — bạn đáng tin cậy, có trách nhiệm và làm việc theo hệ thống. Khi bạn nhận một nhiệm vụ, người khác yên tâm rằng nó sẽ được hoàn thành đúng hạn, đúng chuẩn.",
      "Bạn coi trọng truyền thống, kỷ luật và làm theo cách đã được kiểm chứng. Trong môi trường ổn định, bạn xuất sắc; trong chaos thì hơi vất vả.",
    ],
    strengths: ["Đáng tin cậy, làm đúng cam kết", "Tổ chức có hệ thống", "Detail-oriented, ít sai sót", "Trung thành, kiên định"],
    weaknesses: ["Khó thích ứng thay đổi nhanh", "Có thể cứng nhắc với rules", "Ít thể hiện cảm xúc", "Bỏ qua bức tranh lớn vì chi tiết"],
    context: ["Kế toán, kiểm toán, tài chính", "Vận hành, logistics", "Pháp luật, công chứng", "Quản lý dự án, project ops"],
    advice: ["Học mở lòng với cách làm mới", "Thể hiện cảm xúc với người thân", "Đôi khi step back nhìn bức tranh lớn"],
  },
  {
    id: "ISFJ",
    name: "ISFJ — Người Bảo Vệ",
    tagline: "Tận tâm · Chu đáo · Phục vụ",
    color: "#7da9ff",
    description: [
      "ISFJ là người chăm sóc tận tâm — bạn thầm lặng quan sát, ghi nhớ chi tiết về người khác và làm những điều nhỏ để cuộc sống của họ tốt hơn. Trung thành, khiêm tốn, không cần được chú ý.",
      "Bạn có trí nhớ tuyệt vời về sự kiện và cảm xúc, là người mà bạn bè và gia đình luôn dựa vào. Đôi khi bạn quá hy sinh và quên chăm sóc bản thân.",
    ],
    strengths: ["Tận tâm, chăm sóc người khác", "Detail và memory tốt", "Trung thành, đáng tin", "Khiêm tốn, không tranh giành"],
    weaknesses: ["Quá hy sinh, dễ burnout", "Khó nói không", "Không thoải mái với sự thay đổi", "Tránh xung đột, dồn nén cảm xúc"],
    context: ["Y tá, chăm sóc sức khoẻ", "Giáo viên, mầm non", "Nhân sự, HR", "Quản lý gia đình, hành chính"],
    advice: ["Học nói không và đặt boundaries", "Thể hiện nhu cầu của bản thân", "Mở lòng với thay đổi"],
  },
  {
    id: "ESTJ",
    name: "ESTJ — Người Quản Trị",
    tagline: "Tổ chức · Quyết đoán · Hiệu quả",
    color: "#7da9ff",
    description: [
      "ESTJ là natural manager — bạn biết cách tổ chức người và việc để mọi thứ chạy đúng kế hoạch. Quyết đoán, có nguyên tắc, và không ngại đối đầu khi cần.",
      "Bạn vận hành dựa trên facts và experience, ít chấp nhận lý thuyết suông. Trong môi trường có cấu trúc và mục tiêu rõ, bạn xuất sắc; trong chaos sáng tạo thì hơi vất.",
    ],
    strengths: ["Tổ chức và lãnh đạo tự nhiên", "Quyết đoán, hiệu quả", "Trách nhiệm cao", "Dependable, đáng tin"],
    weaknesses: ["Có thể cứng nhắc, áp đặt", "Ít cởi mở với ý tưởng mới", "Bỏ qua cảm xúc của người khác", "Khó delegate vì cầu toàn"],
    context: ["Quản lý vận hành", "Quân đội, công an, công chức", "Tài chính, ngân hàng", "Bất động sản, sales B2B"],
    advice: ["Linh hoạt với ý tưởng khác biệt", "Ghi nhận cảm xúc của người khác", "Học delegate và tin tưởng team"],
  },
  {
    id: "ESFJ",
    name: "ESFJ — Người Hỗ Trợ",
    tagline: "Hài hoà · Nhiệt tình · Quan tâm",
    color: "#7da9ff",
    description: [
      "ESFJ là người gắn kết cộng đồng — bạn quan tâm chân thành đến mọi người, biết cách tổ chức sự kiện, và làm cho người khác cảm thấy được chăm sóc. Là 'mom/dad' của cả group.",
      "Bạn coi trọng harmony và tránh xung đột. Cảm thấy hài lòng nhất khi giúp người khác và được người khác ghi nhận. Nhạy cảm với phê bình.",
    ],
    strengths: ["Kỹ năng xã hội xuất sắc", "Quan tâm chân thành", "Tổ chức sự kiện và hợp tác", "Trung thành, hỗ trợ"],
    weaknesses: ["Cần sự công nhận từ người khác", "Tránh xung đột bằng mọi giá", "Khó nói không", "Có thể gossip / drama"],
    context: ["Y tế, chăm sóc khách hàng", "Giáo viên, đào tạo", "Event, hospitality", "Sales B2C, F&B"],
    advice: ["Học self-validation, không cần người khác phê duyệt", "Đối mặt xung đột khi cần", "Đặt boundaries"],
  },

  // ─────── EXPLORERS (Nhà Thám Hiểm) ───────
  {
    id: "ISTP",
    name: "ISTP — Nhà Thực Hành",
    tagline: "Thực tế · Linh hoạt · Hành động",
    color: "#ffd479",
    description: [
      "ISTP là tuýp 'người làm' bẩm sinh — bạn học bằng cách thực hành, không phải lý thuyết. Bình tĩnh trong khủng hoảng, giải quyết vấn đề thực tế hiệu quả.",
      "Bạn yêu freedom, không thích bị bó buộc bởi quy tắc cứng nhắc. Khá kín đáo và độc lập, nhưng khi cần là người đáng tin cậy nhất.",
    ],
    strengths: ["Thực hành, tay nghề cao", "Bình tĩnh trong khủng hoảng", "Linh hoạt, thích nghi nhanh", "Logic + thực tế"],
    weaknesses: ["Khó cam kết dài hạn", "Ít thể hiện cảm xúc", "Có thể impulsive", "Bored với routine"],
    context: ["Kỹ thuật, cơ khí, IT", "Cứu hộ, quân đội", "Y tế khẩn cấp, surgery", "Athlete, photographer"],
    advice: ["Học giao tiếp cảm xúc với người thân", "Cam kết dài hạn cho mục tiêu lớn", "Cân nhắc trước khi hành động impulsive"],
  },
  {
    id: "ISFP",
    name: "ISFP — Nhà Nghệ Sĩ",
    tagline: "Tinh tế · Cảm xúc · Sáng tạo",
    color: "#ffd479",
    description: [
      "ISFP có thế giới nội tâm phong phú và một mắt thẩm mỹ rất tinh tế. Bạn thường biểu đạt qua nghệ thuật, âm nhạc, thiết kế hoặc chỉ đơn giản là cách bạn sống.",
      "Bạn sống trong hiện tại, theo đuổi cái đẹp và ý nghĩa cá nhân. Khá kín đáo nhưng có cảm xúc sâu sắc và lòng nhân ái lớn.",
    ],
    strengths: ["Sáng tạo và thẩm mỹ tinh tế", "Empathy sâu sắc", "Linh hoạt, không bị áp đặt", "Sống chân thật với bản thân"],
    weaknesses: ["Tránh xung đột", "Khó plan dài hạn", "Dễ tổn thương bởi phê bình", "Có thể thiếu quyết đoán"],
    context: ["Nghệ thuật, thiết kế, photography", "Stylist, makeup artist", "Music, performing arts", "Veterinarian, chăm sóc động vật"],
    advice: ["Plan tài chính dài hạn cho freedom nghệ sĩ", "Học đối mặt phê bình", "Thể hiện ý kiến rõ ràng hơn"],
  },
  {
    id: "ESTP",
    name: "ESTP — Người Hành Động",
    tagline: "Năng động · Thực dụng · Adventure",
    color: "#ffd479",
    description: [
      "ESTP là tuýp 'live in the moment' — năng lượng cao, thực dụng, không sợ rủi ro. Bạn phát huy tốt nhất trong môi trường action và áp lực, nơi quyết định nhanh quan trọng hơn lý thuyết.",
      "Bạn có khả năng đọc tình huống và người tốt, là negotiator giỏi. Đôi khi quá impulsive và bored với plan dài hạn.",
    ],
    strengths: ["Quyết đoán dưới áp lực", "Negotiate, sales tự nhiên", "Practical, hands-on", "Năng lượng và charisma cao"],
    weaknesses: ["Impulsive, thiếu kế hoạch dài hạn", "Bored với routine và lý thuyết", "Có thể risk-taking quá mức", "Ít kiên nhẫn"],
    context: ["Kinh doanh, sales", "Sport, athlete, coach", "Khởi nghiệp action", "Cứu hộ, paramedic"],
    advice: ["Build plan dài hạn cho mục tiêu", "Cân nhắc consequence trước khi hành động", "Học kiên nhẫn với người chậm hơn"],
  },
  {
    id: "ESFP",
    name: "ESFP — Người Trình Diễn",
    tagline: "Vui vẻ · Tỏa sáng · Spontaneous",
    color: "#ffd479",
    description: [
      "ESFP là natural entertainer — bạn yêu cuộc sống, yêu people, biết cách làm cho mọi không gian trở nên vui vẻ. Spontaneous, hào phóng, sống với passion.",
      "Bạn học tốt nhất qua trải nghiệm thực tế, không phải sách vở. Có thể hơi né tránh việc khó hoặc plan dài hạn vì 'cuộc đời ngắn lắm, sống cho hôm nay'.",
    ],
    strengths: ["Charisma, kỹ năng xã hội", "Lan toả năng lượng tích cực", "Practical, sensory awareness", "Linh hoạt, thích nghi nhanh"],
    weaknesses: ["Tránh việc khó, lý thuyết", "Dễ chi tiêu hoặc impulsive", "Khó plan dài hạn", "Cần được công nhận"],
    context: ["Performing, entertainment", "Sales B2C, F&B, hospitality", "Event, marketing trải nghiệm", "Du lịch, fitness, wellness"],
    advice: ["Plan tài chính cho tương lai", "Học làm việc khó dù không vui", "Tạo routine cơ bản để có structure"],
  },
];
