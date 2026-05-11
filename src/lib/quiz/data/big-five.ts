import type { QuizQuestion, QuizArchetype } from "../types";

/**
 * Big Five / OCEAN - 50 câu Likert (1-5 scale)
 * 5 dimension, mỗi dim 10 câu (5 positive + 5 reverse-scored)
 *
 * Code dimension:
 *   "O" - Openness (Cởi mở)
 *   "C" - Conscientiousness (Có trách nhiệm)
 *   "E" - Extraversion (Hướng ngoại)
 *   "A" - Agreeableness (Dễ chịu)
 *   "N" - Neuroticism (Bất ổn cảm xúc)
 *
 * Scoring format: ["DIM:DIRECTION"] vd ["O:+"] = score thuận, ["O:-"] = reverse-score
 * Likert 1-5: 5 lựa chọn cho mỗi câu
 */

const LIKERT = (positive: boolean, dim: string) => [
  { key: "1", text: "Rất không đồng ý", scores: [`${dim}:${positive ? "+1" : "-1"}`] },
  { key: "2", text: "Không đồng ý", scores: [`${dim}:${positive ? "+2" : "-2"}`] },
  { key: "3", text: "Trung lập", scores: [`${dim}:${positive ? "+3" : "-3"}`] },
  { key: "4", text: "Đồng ý", scores: [`${dim}:${positive ? "+4" : "-4"}`] },
  { key: "5", text: "Rất đồng ý", scores: [`${dim}:${positive ? "+5" : "-5"}`] },
];

export const BIG_FIVE_QUESTIONS: QuizQuestion[] = [
  // === OPENNESS (O) - 10 câu ===
  { id: 1, text: "Tôi thích thử món ăn mới và trải nghiệm khác thường.", options: LIKERT(true, "O") },
  { id: 2, text: "Tôi có nhiều idea sáng tạo trong đầu mỗi ngày.", options: LIKERT(true, "O") },
  { id: 3, text: "Tôi thích các cuộc trò chuyện về triết học, nghệ thuật, ý tưởng abstract.", options: LIKERT(true, "O") },
  { id: 4, text: "Tôi tò mò về cách thế giới hoạt động.", options: LIKERT(true, "O") },
  { id: 5, text: "Tôi thích đi du lịch đến nơi khác văn hoá hoàn toàn.", options: LIKERT(true, "O") },
  { id: 6, text: "Tôi thích thường lệ + không cần thay đổi.", options: LIKERT(false, "O") },
  { id: 7, text: "Tôi tránh các loại sách / phim 'khó hiểu'.", options: LIKERT(false, "O") },
  { id: 8, text: "Tôi nghĩ truyền thống nên được giữ nguyên, không nên thay đổi.", options: LIKERT(false, "O") },
  { id: 9, text: "Tôi thấy nghệ thuật abstract là 'phí thời gian'.", options: LIKERT(false, "O") },
  { id: 10, text: "Tôi không thích quá nhiều lựa chọn - đơn giản tốt hơn.", options: LIKERT(false, "O") },

  // === CONSCIENTIOUSNESS (C) - 10 câu ===
  { id: 11, text: "Tôi luôn hoàn thành deadline đúng hạn, không cần ai nhắc.", options: LIKERT(true, "C") },
  { id: 12, text: "Bàn làm việc + email của tôi được tổ chức gọn gàng.", options: LIKERT(true, "C") },
  { id: 13, text: "Khi cam kết gì, tôi follow-through 100%.", options: LIKERT(true, "C") },
  { id: 14, text: "Tôi có thói quen daily routine và stick với nó.", options: LIKERT(true, "C") },
  { id: 15, text: "Tôi plan kế hoạch tuần / tháng cẩn thận.", options: LIKERT(true, "C") },
  { id: 16, text: "Tôi hay procrastinate đến phút cuối.", options: LIKERT(false, "C") },
  { id: 17, text: "Tôi để đồ lộn xộn xung quanh không bận tâm.", options: LIKERT(false, "C") },
  { id: 18, text: "Tôi quên những việc tôi đã nói sẽ làm.", options: LIKERT(false, "C") },
  { id: 19, text: "Tôi làm việc tốt nhất khi không có kế hoạch cứng.", options: LIKERT(false, "C") },
  { id: 20, text: "Tôi dễ bị distract bởi việc khác lúc đang làm 1 việc.", options: LIKERT(false, "C") },

  // === EXTRAVERSION (E) - 10 câu ===
  { id: 21, text: "Tôi cảm thấy nạp năng lượng khi ở giữa đám đông.", options: LIKERT(true, "E") },
  { id: 22, text: "Tôi dễ bắt chuyện với người lạ.", options: LIKERT(true, "E") },
  { id: 23, text: "Tôi thường là người 'life of the party'.", options: LIKERT(true, "E") },
  { id: 24, text: "Tôi thích nói nhiều hơn nghe.", options: LIKERT(true, "E") },
  { id: 25, text: "Tôi cảm thấy buồn khi ở một mình quá lâu.", options: LIKERT(true, "E") },
  { id: 26, text: "Tôi cần thời gian 1 mình để hồi phục năng lượng.", options: LIKERT(false, "E") },
  { id: 27, text: "Tôi prefer cuộc trò chuyện sâu 1-on-1 hơn party.", options: LIKERT(false, "E") },
  { id: 28, text: "Tôi tránh các sự kiện xã hội khi có thể.", options: LIKERT(false, "E") },
  { id: 29, text: "Tôi suy nghĩ kỹ trước khi nói.", options: LIKERT(false, "E") },
  { id: 30, text: "Tôi cần thời gian warm-up để mở lòng với người mới.", options: LIKERT(false, "E") },

  // === AGREEABLENESS (A) - 10 câu ===
  { id: 31, text: "Tôi tin rằng mọi người về bản chất là tốt.", options: LIKERT(true, "A") },
  { id: 32, text: "Tôi sẵn sàng giúp đỡ người khác, dù không quen biết.", options: LIKERT(true, "A") },
  { id: 33, text: "Tôi tránh confrontation khi có thể.", options: LIKERT(true, "A") },
  { id: 34, text: "Tôi quan tâm cảm xúc người khác hơn cảm xúc của mình.", options: LIKERT(true, "A") },
  { id: 35, text: "Tôi forgive lỗi của người khác nhanh chóng.", options: LIKERT(true, "A") },
  { id: 36, text: "Tôi nghi ngờ động cơ của người khác.", options: LIKERT(false, "A") },
  { id: 37, text: "Tôi competitive - đặt lợi ích bản thân lên đầu.", options: LIKERT(false, "A") },
  { id: 38, text: "Tôi thẳng thắn dù người khác có thể buồn.", options: LIKERT(false, "A") },
  { id: 39, text: "Tôi giữ grudge với người đã làm tôi tổn thương.", options: LIKERT(false, "A") },
  { id: 40, text: "Tôi nghĩ 'người tốt' thường thua trong thế giới thật.", options: LIKERT(false, "A") },

  // === NEUROTICISM (N) - 10 câu ===
  { id: 41, text: "Tôi thường lo lắng về những việc nhỏ.", options: LIKERT(true, "N") },
  { id: 42, text: "Tôi hay rumination - suy nghĩ vòng vòng về cùng 1 vấn đề.", options: LIKERT(true, "N") },
  { id: 43, text: "Tôi dễ bị overwhelm bởi áp lực.", options: LIKERT(true, "N") },
  { id: 44, text: "Tôi có những đêm mất ngủ vì stress.", options: LIKERT(true, "N") },
  { id: 45, text: "Cảm xúc của tôi thay đổi nhanh trong ngày.", options: LIKERT(true, "N") },
  { id: 46, text: "Tôi calm dưới áp lực.", options: LIKERT(false, "N") },
  { id: 47, text: "Tôi ít khi cảm thấy buồn không rõ lý do.", options: LIKERT(false, "N") },
  { id: 48, text: "Tôi tự tin về quyết định của mình.", options: LIKERT(false, "N") },
  { id: 49, text: "Tôi recover nhanh sau setback.", options: LIKERT(false, "N") },
  { id: 50, text: "Tôi có cảm xúc ổn định, không lên xuống nhiều.", options: LIKERT(false, "N") },
];

/**
 * Big Five "archetype" theo 32 kết hợp High/Low - quá nhiều.
 * Đơn giản hoá: 5 archetype theo dominant dimension cao nhất.
 * Result page sẽ render full 5-dimension chart - archetype chỉ là tagline.
 */
export const BIG_FIVE_ARCHETYPES: QuizArchetype[] = [
  {
    id: "O",
    name: "The Explorer (Cao Openness)",
    tagline: "Người khám phá - sáng tạo + cởi mở với cái mới",
    color: "#a78bff",
    description: [
      "Bạn có chiều Openness (Cởi mở) cao nhất. Bạn yêu thử cái mới, nhạy với idea abstract, có gu thẩm mỹ. Bạn không thoải mái với routine cứng + truyền thống cũ.",
      "Sức mạnh: tư duy sáng tạo, problem solving không gò bó, đa văn hoá. Bạn thường là người đề xuất hướng mới, mở rộng paradigm cho team.",
      "Cảnh báo: có thể bỏ qua chi tiết + struggle với thực thi lâu dài. Pair với Conscientiousness cao để cover gap.",
    ],
    strengths: [
      "Sáng tạo + innovation",
      "Adaptable - học cái mới nhanh",
      "Multidisciplinary - kết nối ngành khác nhau",
      "Open mind - ít bias",
      "Curious - drive lifelong learning",
    ],
    weaknesses: [
      "Khó focus deep vào 1 việc lâu",
      "Bored nhanh khi việc trở nên routine",
      "Có thể impractical - idea > execution",
      "Đôi khi quá abstract cho stakeholder pragmatic",
    ],
    context: ["Creative roles", "R&D", "Strategy", "Founder", "Designer"],
    advice: [
      "Pair với Conscientious partner để execute idea",
      "Set 'finish' rule - 80% xong là ship, không tìm idea tốt hơn nữa",
      "Time-box exploration - sau 1 quý, commit + ship",
    ],
  },
  {
    id: "C",
    name: "The Achiever (Cao Conscientiousness)",
    tagline: "Người thành đạt - kỷ luật + có hệ thống",
    color: "#5fffaa",
    description: [
      "Bạn có chiều Conscientiousness (Có trách nhiệm) cao nhất. Bạn có discipline, follow-through cam kết, organized. Trong nhiều nghiên cứu, đây là chiều quan trọng NHẤT để predict career success.",
      "Sức mạnh: bạn ship được việc trong khi người khác chỉ nói. Bạn build system, không depend vào 'cảm hứng'. Bạn reliable - team trust bạn cho việc quan trọng.",
      "Cảnh báo: có thể workaholic + perfectionist. Cần balance với rest + flexibility để tránh burnout.",
    ],
    strengths: [
      "Reliable + đáng tin tuyệt đối",
      "Goal-oriented + hit target consistently",
      "Self-discipline - không cần ai supervise",
      "Long-term thinking",
      "Tổ chức công việc + cuộc sống tốt",
    ],
    weaknesses: [
      "Khó adapt khi plan phải đổi đột ngột",
      "Có thể quá strict với bản thân + người khác",
      "Perfectionism - ship muộn",
      "Workaholic risk",
    ],
    context: ["Management", "Operations", "Finance", "Project Management", "Senior IC roles"],
    advice: [
      "Set 'good enough' threshold - 80% là acceptable",
      "Schedule rest như schedule meeting - non-negotiable",
      "Practice flexibility - 1 ngày/tuần không plan",
    ],
  },
  {
    id: "E",
    name: "The Connector (Cao Extraversion)",
    tagline: "Người kết nối - năng động + truyền cảm hứng",
    color: "#ffd479",
    description: [
      "Bạn có chiều Extraversion (Hướng ngoại) cao nhất. Bạn nạp năng lượng từ tương tác xã hội, dễ bắt chuyện, là 'life of the room'.",
      "Sức mạnh: network rộng + sâu, pitching tự nhiên, lead team bằng năng lượng tích cực. Bạn thrive trong môi trường nhiều người + cường độ cao.",
      "Cảnh báo: cần solo time để self-reflect. Có thể overlook người introverted trong team.",
    ],
    strengths: [
      "Network mạnh",
      "Pitching + sales tự nhiên",
      "Lead team bằng energy",
      "Bounce back fast từ setback",
      "Thrive in chaos / high-energy environment",
    ],
    weaknesses: [
      "Khó deep work một mình",
      "Có thể talk over người khác",
      "Cần validation từ social interaction",
      "Risk overcommit vì 'yes' theo cảm xúc",
    ],
    context: ["Sales", "Marketing", "Public relations", "Business Development", "Event/Community"],
    advice: [
      "Schedule deep work time - protect calendar",
      "Practice active listening 70/30 (listen 70%)",
      "Để introverted teammate có space để contribute",
    ],
  },
  {
    id: "A",
    name: "The Harmonizer (Cao Agreeableness)",
    tagline: "Người hoà giải - empathy + cooperation",
    color: "#7da9ff",
    description: [
      "Bạn có chiều Agreeableness (Dễ chịu) cao nhất. Bạn empathetic, cooperative, ưu tiên harmony của team hơn personal gain.",
      "Sức mạnh: builder relationships, conflict mediator, trust với stakeholder. Bạn glue của team - keeping people working together.",
      "Cảnh báo: có thể bị take advantage. Khó nói 'không'. Cần boundary để không burnout.",
    ],
    strengths: [
      "Empathy cao",
      "Conflict resolution",
      "Long-term relationship",
      "Trustworthy - người chia sẻ vấn đề",
      "Team player",
    ],
    weaknesses: [
      "Khó nói 'không'",
      "Có thể bị manipulate",
      "Suppress own need cho harmony",
      "Avoid difficult conversation",
    ],
    context: ["HR", "Customer success", "Counseling-adjacent", "Account management", "Team coordinator"],
    advice: [
      "Practice nói 'không' không guilty",
      "Set time-box cho care - không phải 24/7",
      "Khi conflict cần address, schedule formally - tránh né tránh",
    ],
  },
  {
    id: "N",
    name: "The Sensitive (Cao Neuroticism)",
    tagline: "Người nhạy cảm - cảm xúc sâu, cần boundary",
    color: "#ff8a8a",
    description: [
      "Bạn có chiều Neuroticism (Bất ổn cảm xúc) cao nhất. Bạn nhạy với stress, hay lo, cảm xúc thay đổi nhanh. ĐÂY KHÔNG PHẢI BUG - đây là feature của neural system.",
      "Sức mạnh: bạn nhạy với danger signal, attention to detail, deep emotion (advantage cho creative + therapy work). Nhiều artist, writer, scientist có N cao.",
      "Cảnh báo: stress management cực kỳ quan trọng. Cần boundary mạnh + practice (therapy, meditation, journaling) để không spiral.",
    ],
    strengths: [
      "Nhạy với detail + emotion",
      "Deep thinker",
      "Cảnh giác với risk",
      "Creative output cao (emotion -> art)",
      "Empathetic - hiểu pain của người khác",
    ],
    weaknesses: [
      "Anxiety + rumination",
      "Stress affect performance",
      "Sleep issue",
      "Có thể spiral với feedback negative",
      "Khó scale leadership role mà không support",
    ],
    context: ["Creative", "Therapy", "Research", "Detailed analytical work", "Writing/Journalism"],
    advice: [
      "QUAN TRỌNG: nếu N > 80%, consider therapy hoặc CBT short program",
      "Daily meditation 10 phút (Headspace/Calm)",
      "Limit caffeine + alcohol - amplify N",
      "Sleep hygiene: 7-9h, consistent time",
      "Journal cảm xúc - giảm rumination",
      "Build support network strong",
    ],
  },
];
