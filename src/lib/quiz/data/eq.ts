import type { QuizQuestion, QuizArchetype } from "../types";

/**
 * EQ Test - 35 câu tình huống, mỗi câu 4 lựa chọn với điểm khác nhau (1-5)
 * Scoring: tổng điểm 5 dimension - mỗi dim 7 câu, max 35/dim, normalize về 100%
 * Total EQ score: tổng × normalize → 0-160 scale (Goleman)
 *
 * Code dimension trong scores[]:
 *   "SA" - Self-Awareness (Tự nhận thức)
 *   "SR" - Self-Regulation (Tự kiểm soát)
 *   "MO" - Motivation (Động lực)
 *   "EM" - Empathy (Đồng cảm)
 *   "SS" - Social Skills (Kỹ năng xã hội)
 *
 * Format scores: ["DIM:POINTS"] vd ["SA:4"] = +4 điểm cho Self-Awareness
 */

export const EQ_QUESTIONS: QuizQuestion[] = [
  // === SELF-AWARENESS (SA) - 7 câu ===
  { id: 1, text: "Khi đồng nghiệp chỉ trích bạn, phản ứng đầu tiên là:", options: [
    { key: "A", text: "Lập tức bào chữa, giải thích", scores: ["SA:1"] },
    { key: "B", text: "Tức giận nhưng cố nén lại", scores: ["SA:2"] },
    { key: "C", text: "Dừng lại 1 giây, nhận ra mình đang phản ứng", scores: ["SA:4"] },
    { key: "D", text: "Cảm ơn họ vì đã chia sẻ, hỏi để hiểu thêm", scores: ["SA:5"] },
  ]},
  { id: 2, text: "Khi cảm thấy buồn không rõ lý do, bạn:", options: [
    { key: "A", text: "Cố ignore, làm việc khác cho qua", scores: ["SA:1"] },
    { key: "B", text: "Hỏi bạn bè để được an ủi", scores: ["SA:2"] },
    { key: "C", text: "Dành thời gian ngồi yên, tự hỏi 'tôi đang feel gì?'", scores: ["SA:4"] },
    { key: "D", text: "Viết journal trace nguyên nhân cụ thể", scores: ["SA:5"] },
  ]},
  { id: 3, text: "Khi nhận lương cao hơn kỳ vọng, bạn:", options: [
    { key: "A", text: "Vui và đi tiêu xài liền", scores: ["SA:1"] },
    { key: "B", text: "Vui nhưng không biết nên feel gì sau đó", scores: ["SA:2"] },
    { key: "C", text: "Nhận ra sự vui + 1 chút áp lực vì kỳ vọng cao hơn", scores: ["SA:4"] },
    { key: "D", text: "Hiểu cả 3 cảm xúc: vui, áp lực, biết ơn - và plan", scores: ["SA:5"] },
  ]},
  { id: 4, text: "Trong buổi pitch quan trọng, tay bạn run:", options: [
    { key: "A", text: "Ignore, hy vọng nó qua", scores: ["SA:1"] },
    { key: "B", text: "Khó chịu, hỏi 'tại sao mình hồi hộp'", scores: ["SA:2"] },
    { key: "C", text: "Nhận ra đây là phản ứng stress + nó OK", scores: ["SA:4"] },
    { key: "D", text: "Hiểu signal của body, dùng kỹ thuật thở để reset", scores: ["SA:5"] },
  ]},
  { id: 5, text: "Khi feedback của sếp khác kỳ vọng của bạn:", options: [
    { key: "A", text: "Cảm thấy mất công sức, chán nản", scores: ["SA:1"] },
    { key: "B", text: "Buồn nhưng cố giữ professional", scores: ["SA:2"] },
    { key: "C", text: "Tách 'cảm xúc của tôi' khỏi 'feedback objective'", scores: ["SA:4"] },
    { key: "D", text: "Dùng feedback làm input, không lấy personal", scores: ["SA:5"] },
  ]},
  { id: 6, text: "Bạn biết mình đang stress khi:", options: [
    { key: "A", text: "Ai đó nói cho biết bạn đang nóng tính", scores: ["SA:1"] },
    { key: "B", text: "Cuối ngày cảm thấy kiệt sức không rõ vì sao", scores: ["SA:2"] },
    { key: "C", text: "Nhận thấy mình hay irritable + sleep kém vài ngày", scores: ["SA:4"] },
    { key: "D", text: "Có early warning system - body signals tôi nhận ra ngay", scores: ["SA:5"] },
  ]},
  { id: 7, text: "Điểm yếu lớn nhất của bạn là:", options: [
    { key: "A", text: "Tôi không có điểm yếu nào đáng kể", scores: ["SA:1"] },
    { key: "B", text: "Cầu toàn - tôi quá tốt với việc đó", scores: ["SA:2"] },
    { key: "C", text: "Tôi biết 2-3 điểm yếu cụ thể của mình", scores: ["SA:4"] },
    { key: "D", text: "Tôi biết điểm yếu, biết bối cảnh chúng trigger, và đang work on", scores: ["SA:5"] },
  ]},

  // === SELF-REGULATION (SR) - 7 câu ===
  { id: 8, text: "Bạn nhận email tone hung hăng từ khách hàng. Phản ứng:", options: [
    { key: "A", text: "Reply ngay với tone tương tự", scores: ["SR:1"] },
    { key: "B", text: "Bực mình nhưng reply professional", scores: ["SR:3"] },
    { key: "C", text: "Đợi 30 phút bình tĩnh rồi mới reply", scores: ["SR:4"] },
    { key: "D", text: "Note lại cảm xúc, reply hôm sau với strategy", scores: ["SR:5"] },
  ]},
  { id: 9, text: "Bạn vừa thua deal lớn. Trong 24h tới bạn:", options: [
    { key: "A", text: "Buồn + complain, ít làm việc", scores: ["SR:1"] },
    { key: "B", text: "Cố tiếp tục làm việc nhưng không tập trung", scores: ["SR:2"] },
    { key: "C", text: "Để cảm xúc qua 1-2 tiếng rồi back to work", scores: ["SR:4"] },
    { key: "D", text: "Học bài học ngay, xem fail là data, không personal", scores: ["SR:5"] },
  ]},
  { id: 10, text: "Sếp giao việc giờ chót cuối tuần. Bạn:", options: [
    { key: "A", text: "Bực + complain với đồng nghiệp", scores: ["SR:1"] },
    { key: "B", text: "Im lặng làm nhưng tâm trạng tệ", scores: ["SR:2"] },
    { key: "C", text: "Hỏi rõ priority + delegate phần khác trong tuần", scores: ["SR:4"] },
    { key: "D", text: "Vẫn calm, ưu tiên việc - bàn timeline lại sau", scores: ["SR:5"] },
  ]},
  { id: 11, text: "Khi muốn skip gym/ăn healthy vì lười:", options: [
    { key: "A", text: "Bỏ luôn, đỗ lỗi 'hôm nay mệt'", scores: ["SR:1"] },
    { key: "B", text: "Mất 30 phút thuyết phục bản thân", scores: ["SR:2"] },
    { key: "C", text: "Nhắc 'mình đã set rule, làm ngắn cũng được'", scores: ["SR:4"] },
    { key: "D", text: "Auto-mode - không phải tranh luận với bản thân nữa", scores: ["SR:5"] },
  ]},
  { id: 12, text: "Bạn nhận tin xấu (gia đình, sức khoẻ). Trước meeting 30 phút:", options: [
    { key: "A", text: "Hoãn meeting, không thể tập trung", scores: ["SR:1"] },
    { key: "B", text: "Vào meeting nhưng absent-minded", scores: ["SR:2"] },
    { key: "C", text: "Hít thở, compartmentalize, vào meeting bình thường", scores: ["SR:4"] },
    { key: "D", text: "Acknowledge feeling, deal với nó sau meeting đầy đủ", scores: ["SR:5"] },
  ]},
  { id: 13, text: "Khi đồng nghiệp 'take credit' cho idea của bạn:", options: [
    { key: "A", text: "Lập tức call out trước mọi người", scores: ["SR:1"] },
    { key: "B", text: "Bực mình + nói xấu họ với người khác", scores: ["SR:2"] },
    { key: "C", text: "Im lặng lúc đó, talk 1-on-1 sau", scores: ["SR:4"] },
    { key: "D", text: "Plan dài hạn: document idea + share với manager", scores: ["SR:5"] },
  ]},
  { id: 14, text: "Trong tranh luận căng thẳng, bạn:", options: [
    { key: "A", text: "Hay cắt lời, raise voice", scores: ["SR:1"] },
    { key: "B", text: "Im lặng + ấm ức bên trong", scores: ["SR:2"] },
    { key: "C", text: "Lắng nghe đến hết, reply sau khi suy nghĩ", scores: ["SR:4"] },
    { key: "D", text: "Tách emotion khỏi argument, focus content", scores: ["SR:5"] },
  ]},

  // === MOTIVATION (MO) - 7 câu ===
  { id: 15, text: "Khi gặp thất bại lớn trong dự án:", options: [
    { key: "A", text: "Mất động lực 1-2 tuần", scores: ["MO:1"] },
    { key: "B", text: "Cố gắng tiếp nhưng không thoải mái", scores: ["MO:2"] },
    { key: "C", text: "Phân tích bài học, tiếp tục với hướng mới", scores: ["MO:4"] },
    { key: "D", text: "Xem thất bại là data, không phải định nghĩa bản thân", scores: ["MO:5"] },
  ]},
  { id: 16, text: "Mục tiêu lớn của bạn năm nay:", options: [
    { key: "A", text: "Tôi chưa rõ ràng, để xem", scores: ["MO:1"] },
    { key: "B", text: "Có vài ý tưởng nhưng chưa commit", scores: ["MO:2"] },
    { key: "C", text: "Có 2-3 mục tiêu cụ thể, đang track", scores: ["MO:4"] },
    { key: "D", text: "Mục tiêu rõ + roadmap quarter + leading indicator", scores: ["MO:5"] },
  ]},
  { id: 17, text: "Khi không ai supervise, bạn làm việc:", options: [
    { key: "A", text: "Chậm lại, dễ procrastinate", scores: ["MO:1"] },
    { key: "B", text: "Vẫn làm nhưng hiệu suất kém hơn", scores: ["MO:2"] },
    { key: "C", text: "Như thường - kỷ luật cá nhân tốt", scores: ["MO:4"] },
    { key: "D", text: "Tốt hơn vì không bị interrupt", scores: ["MO:5"] },
  ]},
  { id: 18, text: "Tại sao bạn đi làm mỗi ngày:", options: [
    { key: "A", text: "Vì cần tiền sống", scores: ["MO:1"] },
    { key: "B", text: "Vì habit + đỡ chán", scores: ["MO:2"] },
    { key: "C", text: "Vì career path tôi đang build", scores: ["MO:4"] },
    { key: "D", text: "Vì mission + impact + sự phát triển bản thân", scores: ["MO:5"] },
  ]},
  { id: 19, text: "Khi promotion bị bỏ qua, bạn:", options: [
    { key: "A", text: "Mất hứng làm việc, plan nghỉ", scores: ["MO:1"] },
    { key: "B", text: "Buồn + làm việc cầm chừng vài tháng", scores: ["MO:2"] },
    { key: "C", text: "Hỏi feedback cụ thể, plan cải thiện", scores: ["MO:4"] },
    { key: "D", text: "Đánh giá lại path - stay với plan B clear", scores: ["MO:5"] },
  ]},
  { id: 20, text: "Kỹ năng mới bạn đang học:", options: [
    { key: "A", text: "Tôi không học gì đặc biệt", scores: ["MO:1"] },
    { key: "B", text: "Đọc rải rác, không có routine", scores: ["MO:2"] },
    { key: "C", text: "Tôi có 1 kỹ năng + practice hàng tuần", scores: ["MO:4"] },
    { key: "D", text: "Tôi có learning system + đo progress hàng tháng", scores: ["MO:5"] },
  ]},
  { id: 21, text: "Khi công việc trở nên dễ + nhàm:", options: [
    { key: "A", text: "Tôi enjoy việc dễ, không cần thay đổi", scores: ["MO:1"] },
    { key: "B", text: "Hơi chán nhưng vẫn ổn", scores: ["MO:2"] },
    { key: "C", text: "Tìm thử thách mới trong cùng job", scores: ["MO:4"] },
    { key: "D", text: "Tự đề xuất scope rộng hơn hoặc move on", scores: ["MO:5"] },
  ]},

  // === EMPATHY (EM) - 7 câu ===
  { id: 22, text: "Đồng nghiệp stress nhưng nói 'Em ổn':", options: [
    { key: "A", text: "Tin lời họ, không hỏi thêm", scores: ["EM:1"] },
    { key: "B", text: "Hỏi 1-2 câu xã giao", scores: ["EM:2"] },
    { key: "C", text: "Cảm có vấn đề, tạo không gian để họ chia sẻ", scores: ["EM:4"] },
    { key: "D", text: "Đọc tình huống + đề xuất hỗ trợ cụ thể", scores: ["EM:5"] },
  ]},
  { id: 23, text: "Trong cuộc họp, ai đó đột nhiên im lặng:", options: [
    { key: "A", text: "Không để ý, continue meeting", scores: ["EM:1"] },
    { key: "B", text: "Để ý nhưng không hành động", scores: ["EM:2"] },
    { key: "C", text: "Hỏi 'X nghĩ thế nào về việc này?'", scores: ["EM:4"] },
    { key: "D", text: "Hỏi sau meeting 1-on-1 - không khiến họ ngại", scores: ["EM:5"] },
  ]},
  { id: 24, text: "Khi friend kể chuyện buồn:", options: [
    { key: "A", text: "Đưa giải pháp ngay - 'em nên làm X'", scores: ["EM:1"] },
    { key: "B", text: "Nghe + comfort bằng câu chung chung", scores: ["EM:2"] },
    { key: "C", text: "Lắng nghe + reflect lại cảm xúc của họ", scores: ["EM:4"] },
    { key: "D", text: "Hỏi 'Bạn cần solution hay cần được nghe?'", scores: ["EM:5"] },
  ]},
  { id: 25, text: "Khi gặp người mới + khác văn hoá:", options: [
    { key: "A", text: "Awkward, không biết nói gì", scores: ["EM:1"] },
    { key: "B", text: "Trò chuyện superficial", scores: ["EM:2"] },
    { key: "C", text: "Hỏi về background của họ với genuine curiosity", scores: ["EM:4"] },
    { key: "D", text: "Đọc cues + adjust communication style theo họ", scores: ["EM:5"] },
  ]},
  { id: 26, text: "Manager fire 1 đồng nghiệp. Bạn nghĩ:", options: [
    { key: "A", text: "Họ thiếu khả năng, đáng đời", scores: ["EM:1"] },
    { key: "B", text: "Buồn thay nhưng không nói gì", scores: ["EM:2"] },
    { key: "C", text: "Hiểu cả perspective manager + người bị fire", scores: ["EM:4"] },
    { key: "D", text: "Reach out, hỗ trợ practical (job referral, support)", scores: ["EM:5"] },
  ]},
  { id: 27, text: "Khách hàng phàn nàn unfair với bạn:", options: [
    { key: "A", text: "Defensive, không nhận", scores: ["EM:1"] },
    { key: "B", text: "Apologize formally + ignore content", scores: ["EM:2"] },
    { key: "C", text: "Tìm hiểu lý do bên dưới (unmet need)", scores: ["EM:4"] },
    { key: "D", text: "Address cả practical + emotional concern họ có", scores: ["EM:5"] },
  ]},
  { id: 28, text: "Bạn dễ hiểu cảm xúc người khác qua:", options: [
    { key: "A", text: "Họ nói cho tôi biết trực tiếp", scores: ["EM:1"] },
    { key: "B", text: "Words + tone of voice", scores: ["EM:2"] },
    { key: "C", text: "Body language + sự thay đổi nhỏ trong behavior", scores: ["EM:4"] },
    { key: "D", text: "Micro-expressions + context + history", scores: ["EM:5"] },
  ]},

  // === SOCIAL SKILLS (SS) - 7 câu ===
  { id: 29, text: "Trong cuộc họp có 2 phe đối lập, bạn:", options: [
    { key: "A", text: "Né tránh, không lên tiếng", scores: ["SS:1"] },
    { key: "B", text: "Chọn 1 phe và bảo vệ", scores: ["SS:2"] },
    { key: "C", text: "Tìm common ground giữa 2 bên", scores: ["SS:4"] },
    { key: "D", text: "Facilitate thảo luận, để team đến giải pháp", scores: ["SS:5"] },
  ]},
  { id: 30, text: "Khi pitch ý tưởng với stakeholder skeptical:", options: [
    { key: "A", text: "Show data hi vọng họ tự convince", scores: ["SS:1"] },
    { key: "B", text: "Pitch theo script chuẩn", scores: ["SS:2"] },
    { key: "C", text: "Adapt theo concern của họ trong real-time", scores: ["SS:4"] },
    { key: "D", text: "Prep buổi 1-on-1 trước, address concern, sau đó pitch group", scores: ["SS:5"] },
  ]},
  { id: 31, text: "Networking event với 100+ người:", options: [
    { key: "A", text: "Awkward, tôi muốn về sớm", scores: ["SS:1"] },
    { key: "B", text: "Trò chuyện với 1-2 người tôi quen", scores: ["SS:2"] },
    { key: "C", text: "Có plan + mục tiêu cụ thể (gặp 3 người mới)", scores: ["SS:4"] },
    { key: "D", text: "Connect 5-10 người + follow-up trong tuần", scores: ["SS:5"] },
  ]},
  { id: 32, text: "Team mới + chưa biết ai:", options: [
    { key: "A", text: "Đợi người khác approach trước", scores: ["SS:1"] },
    { key: "B", text: "Giới thiệu mình + hỏi tên người khác", scores: ["SS:2"] },
    { key: "C", text: "Chủ động 1-on-1 với mỗi thành viên trong 2 tuần", scores: ["SS:4"] },
    { key: "D", text: "Map team dynamics + position mình strategic", scores: ["SS:5"] },
  ]},
  { id: 33, text: "Khi cần thuyết phục ai đó:", options: [
    { key: "A", text: "Cứng nhắc với lý lẽ của mình", scores: ["SS:1"] },
    { key: "B", text: "Repeat point cho đến khi họ đồng ý", scores: ["SS:2"] },
    { key: "C", text: "Hiểu motivation của họ, frame theo cách họ care", scores: ["SS:4"] },
    { key: "D", text: "Build trust trước, sau đó họ sẽ nghe ý kiến", scores: ["SS:5"] },
  ]},
  { id: 34, text: "Khi cần feedback critical cho người khác:", options: [
    { key: "A", text: "Tránh, để người khác làm", scores: ["SS:1"] },
    { key: "B", text: "Nói thẳng, không quan tâm cách họ feel", scores: ["SS:2"] },
    { key: "C", text: "Sandwich method: khen - critique - khen", scores: ["SS:4"] },
    { key: "D", text: "1-on-1, focus behavior + impact + offer support", scores: ["SS:5"] },
  ]},
  { id: 35, text: "Trong cuộc xung đột team:", options: [
    { key: "A", text: "Né tránh, đợi nó tự qua", scores: ["SS:1"] },
    { key: "B", text: "Chọn phe và bảo vệ", scores: ["SS:2"] },
    { key: "C", text: "Mediate 2 bên, tìm common ground", scores: ["SS:4"] },
    { key: "D", text: "Address root cause + thiết lập framework tránh tái diễn", scores: ["SS:5"] },
  ]},
];

/**
 * EQ "archetype" = 4 levels theo total score
 * Total max = 5 dim × 35 = 175 → normalize × (160/175) = ~0-160
 * Thresholds (Goleman scale):
 *   0-60: Low EQ
 *   61-100: Average
 *   101-130: High
 *   131-160: Exceptional
 */
export const EQ_ARCHETYPES: QuizArchetype[] = [
  {
    id: "exceptional",
    name: "EQ Xuất sắc (131-160)",
    tagline: "Trí tuệ cảm xúc top 10% - leader nguồn cảm hứng",
    color: "#5fffaa",
    description: [
      "Bạn thuộc top 10% người có EQ rất cao. Bạn hiểu sâu cảm xúc bản thân, kiểm soát phản ứng tốt, và đặc biệt nhạy với cảm xúc của người khác. Người tự nhiên muốn theo bạn vì cảm giác được hiểu + được respected.",
      "Sức mạnh lớn nhất của bạn: bạn không chỉ react với cảm xúc, bạn USE chúng làm input cho quyết định. Khi sếp giận, bạn không panic - bạn đọc được lý do đằng sau và respond appropriately. Khi team căng thẳng, bạn là người làm dịu - không phải bằng cách deny vấn đề, mà bằng cách acknowledge + address.",
      "Điểm cần cẩn thận: EQ cao không tự động = leader giỏi. Bạn cần technical skill + business acumen để leverage EQ. Đồng thời, EQ cao có thể trigger 'caregiver burnout' nếu bạn quá tập trung emotion của người khác mà bỏ qua mình.",
    ],
    strengths: [
      "Đọc room cực giỏi - biết khi nào nói, khi nào im",
      "Conflict resolution top-tier",
      "Coach + mentor tự nhiên",
      "Influence không cần authority - team tự nguyện theo",
      "Resilient với stress + setback",
    ],
    weaknesses: [
      "Có thể overthink emotion của người khác",
      "Risk caregiver burnout",
      "Sometimes bị thấy 'too soft' bởi trait D",
      "Khó đưa ra hard decision khi nó hurts feelings",
    ],
    context: [
      "Senior leadership / Executive coach",
      "HR / People management",
      "Sales enterprise / Relationship-based",
      "Therapy / Counseling adjacent",
      "Cross-cultural / Global team leadership",
    ],
    advice: [
      "Set boundary - bạn không phải responsible cho all emotion",
      "Practice 'caring without carrying'",
      "Pair với analytical mind để balance decision",
      "Đo impact của EQ bằng kết quả, không chỉ feel",
    ],
  },
  {
    id: "high",
    name: "EQ Cao (101-130)",
    tagline: "Trí tuệ cảm xúc tốt - có thể coach team hiệu quả",
    color: "#7da9ff",
    description: [
      "EQ của bạn ở mức cao - bạn hiểu cảm xúc bản thân + người khác tốt hơn 70% người. Bạn rarely react impulsively, có thể coach junior, và là người team tin tưởng để chia sẻ.",
      "Còn space để phát triển: trong tình huống cực căng thẳng hoặc khi liên quan đến cá nhân (vd: bị criticize trực tiếp), bạn có thể vẫn react emotionally. Đây không phải là vấn đề - đây là next level.",
      "Path tiến lên Exceptional: practice deeper self-awareness (journal, meditation, therapy), advanced communication frameworks (NVC - Nonviolent Communication, Difficult Conversations methodology).",
    ],
    strengths: [
      "Bình tĩnh trong crisis",
      "Đọc team mood tốt",
      "Feedback constructive, không brutal",
      "Self-aware về điểm yếu",
      "Resilient với rejection",
    ],
    weaknesses: [
      "Vẫn có lúc react impulsively",
      "Khó nhất khi conflict liên quan đến mình",
      "Có thể overlook own emotion vì care người khác",
    ],
    context: [
      "Manager mid-level",
      "Customer success / Account management",
      "Mentoring junior",
      "Cross-functional collaboration",
    ],
    advice: [
      "Journal hằng tuần - track pattern cảm xúc",
      "Học framework NVC (Nonviolent Communication)",
      "Tìm coach hoặc therapy ngắn hạn để nâng lên top tier",
      "Practice difficult conversation với prep + role-play",
    ],
  },
  {
    id: "average",
    name: "EQ Trung bình (61-100)",
    tagline: "Có nền tảng - cần phát triển có hệ thống",
    color: "#ffd479",
    description: [
      "EQ của bạn ở mức trung bình - bạn handle được tình huống thường ngày OK, nhưng trong tình huống căng thẳng hoặc khi cần lead người khác, có thể bạn vẫn struggle.",
      "Đây không phải điểm xấu - đa số người ở mức này. Tin tốt: EQ có thể luyện được, khác IQ. Mỗi 1 điểm % EQ tăng = tác động trực tiếp đến career + relationship.",
      "Khu vực cần focus: dựa vào breakdown 5 chiều phía trên, tìm 2 dimension thấp nhất + practice trong 30 ngày. Vd nếu Self-Regulation thấp, mỗi ngày 1 lần delay reply 5 phút khi cảm thấy trigger.",
    ],
    strengths: [
      "Cooperative + dễ hợp tác",
      "Phản ứng OK trong tình huống bình thường",
      "Có khả năng học hỏi + cải thiện",
    ],
    weaknesses: [
      "Stress làm performance giảm",
      "Hay react cảm xúc thay vì respond strategic",
      "Khó coach người khác về emotion",
      "Empathy có nhưng chưa proactive",
    ],
    context: [
      "Individual contributor roles",
      "Junior - mid level positions",
      "Practical/Technical roles ít stakeholder",
    ],
    advice: [
      "Bắt đầu journal 5 phút mỗi ngày - track cảm xúc",
      "Practice 'pause-then-respond' - 3 giây trước khi reply email gây trigger",
      "Đọc 1 trong 3 sách: EQ 2.0 (Bradberry), Difficult Conversations (Stone), Nonviolent Communication (Rosenberg)",
      "Tìm mentor có EQ cao để observe",
      "Làm lại test sau 90 ngày - đo progress",
    ],
  },
  {
    id: "low",
    name: "EQ Thấp (0-60)",
    tagline: "Còn nhiều room để phát triển - không phải vấn đề",
    color: "#ff8a8a",
    description: [
      "EQ của bạn hiện ở mức thấp. ĐỪNG hiểu nhầm: đây không phải là 'bạn xấu' hay 'bạn thiếu trí tuệ'. Nhiều người có IQ rất cao nhưng EQ thấp - và đó chính là lý do họ stuck ở mid-career.",
      "Tin tốt: EQ là kỹ năng có thể luyện 100%, khác với IQ. Trong 6-12 tháng commit, bạn có thể nâng EQ lên mức Average hoặc High. Đây là 1 trong những investment cá nhân ROI cao nhất.",
      "Khả năng bạn đang gặp: hay tức giận khi bị criticize, khó hiểu why người khác feel thế nào đó, conflict trong team hoặc relationship dồn lên. Đây là pattern - không phải số phận.",
    ],
    strengths: [
      "Logical / Direct - không bullshit",
      "Có thể có kỹ năng technical mạnh",
      "Không bị manipulate bởi cảm xúc người khác",
    ],
    weaknesses: [
      "Conflict trong relationship + công việc",
      "Khó coach + influence",
      "Stress + burnout cao",
      "Khó leadership role",
      "Promote chậm vì 'không phải team player'",
    ],
    context: [
      "Individual contributor highly technical",
      "Solo work / Freelance",
      "Backend / Research roles ít stakeholder",
    ],
    advice: [
      "Đọc EQ 2.0 (Travis Bradberry) - quick win practical",
      "Tìm therapist hoặc coach EQ specialist (3-6 tháng)",
      "Practice 1 kỹ thuật/tuần: pause-respond, active listening, naming emotion",
      "Asks trusted friend feedback: 'When do you feel I don't listen?'",
      "Track 30 ngày: ghi 1 emotion/ngày + trigger + reaction. Pattern sẽ emerge",
      "ĐỪNG self-blame - bạn ở đây vì honest assessment, đó là step 1 dũng cảm rồi",
    ],
  },
];
