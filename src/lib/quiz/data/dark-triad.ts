import type { QuizQuestion, QuizArchetype } from "../types";

/**
 * Dark Triad - 27 câu Likert (1-5)
 * 3 dimension, mỗi dim 9 câu (SD3 standard)
 *
 * Code dimension:
 *   "MA" - Machiavellianism (Mưu mẹo)
 *   "NA" - Narcissism (Ái kỷ)
 *   "PS" - Psychopathy (Vô cảm nhẹ)
 *
 * Tone: GIẢI TRÍ, không chẩn đoán. Disclaimer prominent.
 */

const LIKERT_POS = (dim: string) => [
  { key: "1", text: "Rất không đồng ý", scores: [`${dim}:+1`] },
  { key: "2", text: "Không đồng ý", scores: [`${dim}:+2`] },
  { key: "3", text: "Trung lập", scores: [`${dim}:+3`] },
  { key: "4", text: "Đồng ý", scores: [`${dim}:+4`] },
  { key: "5", text: "Rất đồng ý", scores: [`${dim}:+5`] },
];

const LIKERT_REV = (dim: string) => [
  { key: "1", text: "Rất không đồng ý", scores: [`${dim}:-1`] },
  { key: "2", text: "Không đồng ý", scores: [`${dim}:-2`] },
  { key: "3", text: "Trung lập", scores: [`${dim}:-3`] },
  { key: "4", text: "Đồng ý", scores: [`${dim}:-4`] },
  { key: "5", text: "Rất đồng ý", scores: [`${dim}:-5`] },
];

export const DARK_TRIAD_QUESTIONS: QuizQuestion[] = [
  // === MACHIAVELLIANISM (MA) - 9 câu ===
  { id: 1, text: "Đôi khi tôi nói dối nhỏ để đạt được điều mình muốn.", options: LIKERT_POS("MA") },
  { id: 2, text: "Tôi tin rằng 'muốn thành công phải biết chơi game'.", options: LIKERT_POS("MA") },
  { id: 3, text: "Tôi không show hết toàn bộ thông tin với người mà tôi đang đàm phán.", options: LIKERT_POS("MA") },
  { id: 4, text: "Tôi nghĩ flattery (nịnh) là cách hữu hiệu để get ahead.", options: LIKERT_POS("MA") },
  { id: 5, text: "Tôi tin rằng 'chấm dứt biện minh cho phương tiện' khi cần.", options: LIKERT_POS("MA") },
  { id: 6, text: "Tôi quan sát + chờ đợi đúng moment để take action.", options: LIKERT_POS("MA") },
  { id: 7, text: "Tôi biết secrets của người khác và tôi keep chúng (có thể dùng later).", options: LIKERT_POS("MA") },
  { id: 8, text: "Tôi luôn honest, không bao giờ manipulate cho dù có lợi cá nhân.", options: LIKERT_REV("MA") },
  { id: 9, text: "Tôi tin rằng người khác nên được trust by default.", options: LIKERT_REV("MA") },

  // === NARCISSISM (NA) - 9 câu ===
  { id: 10, text: "Tôi xứng đáng được mọi người chú ý hơn người khác.", options: LIKERT_POS("NA") },
  { id: 11, text: "Tôi cảm thấy mình đặc biệt và khác biệt với đám đông.", options: LIKERT_POS("NA") },
  { id: 12, text: "Tôi thích là center of attention.", options: LIKERT_POS("NA") },
  { id: 13, text: "Tôi insist được respect when tôi xứng đáng.", options: LIKERT_POS("NA") },
  { id: 14, text: "Tôi biết tôi giỏi hơn trung bình ở nhiều lĩnh vực.", options: LIKERT_POS("NA") },
  { id: 15, text: "Tôi thích được envied (ghen tị) bởi người khác.", options: LIKERT_POS("NA") },
  { id: 16, text: "Tôi expect favor đặc biệt khi cần.", options: LIKERT_POS("NA") },
  { id: 17, text: "Tôi modest về thành tích của mình.", options: LIKERT_REV("NA") },
  { id: 18, text: "Tôi không cần được praise để cảm thấy good về bản thân.", options: LIKERT_REV("NA") },

  // === PSYCHOPATHY (PS) - 9 câu ===
  { id: 19, text: "Tôi ít khi hối hận về những hành động của mình.", options: LIKERT_POS("PS") },
  { id: 20, text: "Tôi take risk dù người khác warning.", options: LIKERT_POS("PS") },
  { id: 21, text: "Tôi sẽ làm điều dangerous cho thrill.", options: LIKERT_POS("PS") },
  { id: 22, text: "Tôi say what I want, không quan tâm consequences.", options: LIKERT_POS("PS") },
  { id: 23, text: "Tôi cảm thấy ít empathy với người gặp khó khăn.", options: LIKERT_POS("PS") },
  { id: 24, text: "Trả thù là OK nếu họ deserve.", options: LIKERT_POS("PS") },
  { id: 25, text: "Tôi tránh dangerous situations.", options: LIKERT_REV("PS") },
  { id: 26, text: "Tôi feel guilty khi tôi hurt người khác.", options: LIKERT_REV("PS") },
  { id: 27, text: "Tôi tin rằng law nên được follow strict.", options: LIKERT_REV("PS") },
];

/**
 * Dark Triad "archetype" - 4 levels theo overall darkness score
 * Mỗi dim 0-100% sau normalize.
 *   Light (0-30% avg): Bright Triad / Healthy
 *   Balanced (31-50%): Normal
 *   Tilted (51-70%): Có 1 trait nổi
 *   Dark (71-100%): Pronounced - reflect cần thiết
 */
export const DARK_TRIAD_ARCHETYPES: QuizArchetype[] = [
  {
    id: "light",
    name: "Bright Triad (0-30%)",
    tagline: "Phía sáng - cao đạo đức, empathy, integrity",
    color: "#5fffaa",
    description: [
      "Bạn thuộc nhóm 'Bright Triad' - đối lập với Dark Triad. Bạn có integrity cao, empathy tự nhiên, ít manipulation. Trong xã hội cynical, bạn là người 'real'.",
      "ĐIỀU TỐT: Bạn build deep + lasting relationship. Bạn không sleep với conscience disturbed.",
      "ĐIỀU CẦN AWARE: Trong môi trường competitive (politics, cutthroat business), bạn có thể bị take advantage. Bright không có nghĩa naive - bạn cần boundary + đọc người.",
      "DISCLAIMER: Đây là test giải trí dựa trên nghiên cứu tâm lý. KHÔNG phải chẩn đoán sức khoẻ tâm thần.",
    ],
    strengths: ["Trust + integrity", "Empathy thật", "Deep relationship", "Sleep tốt", "Inspire người khác"],
    weaknesses: ["Có thể bị manipulated", "Khó play office politics", "Internal conflict khi cần ruthless"],
    context: ["Therapy / Coaching", "Education", "Nonprofit", "Community building", "Long-term partnership"],
    advice: [
      "Learn to read manipulator - protective awareness",
      "Strength your 'no' - kindness ≠ doormat",
      "Surround yourself với người có values tương tự",
    ],
  },
  {
    id: "balanced",
    name: "Balanced (31-50%)",
    tagline: "Cân bằng - ai cũng có chút 'dark side'",
    color: "#7da9ff",
    description: [
      "Bạn ở mức 'balanced' - bạn có 1 chút mưu mẹo + tự cao + risk-taking, nhưng ở mức bình thường của người trưởng thành. Đây là NORMAL.",
      "Mỗi trait dark có lý do tồn tại trong evolution: Mưu mẹo giúp navigate social. Ái kỷ giúp self-promote khi cần. Risk-taking giúp innovation.",
      "ĐIỀU TỐT: Bạn có thể chơi cứng khi cần, vẫn ethic khi không cần.",
      "DISCLAIMER: Đây là test giải trí dựa trên nghiên cứu tâm lý. KHÔNG phải chẩn đoán sức khoẻ tâm thần.",
    ],
    strengths: ["Adaptable", "Có thể assertive khi cần", "Realistic về people", "Self-promote khi cần", "Resilient"],
    weaknesses: ["Có thể slip vào dark nếu môi trường toxic", "Cần self-check periodically"],
    context: ["Most professional roles", "Sales", "Marketing", "Negotiation"],
    advice: [
      "Periodic self-check: 'tôi đang act dark vì cần hay vì habit?'",
      "Build trusted feedback circle - người dám tell bạn truth",
      "Avoid toxic environment lâu - sẽ amplify dark traits",
    ],
  },
  {
    id: "tilted",
    name: "Tilted Dark (51-70%)",
    tagline: "Có trait nổi - cần reflection",
    color: "#ffd479",
    description: [
      "Bạn có ít nhất 1 trait dark ở mức cao. Đây không có nghĩa bạn 'xấu' - rất nhiều CEO, politician, performer có trait dark cao và thành công. NHƯNG có cost.",
      "Cost thường thấy: relationship khó deep + bền, trust với người khác kém, internal conflict ('tôi tốt hay xấu?'), khó connect ở level emotional.",
      "Đây là moment good để reflect: trait dark nào của bạn cao? Nó help bạn ở đâu? Nó hurt bạn ở đâu? Bạn có muốn change không?",
      "DISCLAIMER: Đây là test giải trí. NẾU bạn lo lắng về tính cách (vd hurt người khác lặp đi lặp lại), hãy tìm tư vấn chuyên môn.",
    ],
    strengths: ["Achieve fast khi ambition cao", "Khó manipulate", "Independent", "Strategic thinking"],
    weaknesses: ["Relationship khó bền", "Internal conflict", "Trust deficit từ người khác", "Lonely khi lên cao"],
    context: ["Highly competitive industries", "Sales high-stakes", "Leadership positions"],
    advice: [
      "Identify trait nào cao nhất - work specifically vào nó",
      "Therapy hoặc executive coaching giúp clarity",
      "Build 1 'reality check' relationship - người sẽ tell bạn truth",
      "Read về Bright Triad - learn integrity skills",
    ],
  },
  {
    id: "dark",
    name: "Pronounced Dark (71-100%)",
    tagline: "Cao bất thường - reflect cần thiết",
    color: "#ff6b6b",
    description: [
      "Bạn scored cao ở 1 hoặc nhiều trait dark - level này cao hơn 70% người làm test. Đây KHÔNG phải để gắn nhãn bạn 'xấu' - bạn đang đọc results với honest, đó là step dũng cảm.",
      "Trait dark cao có thể đi với high intelligence, charisma, ambition - đó là lý do nhiều người 'thành công' có scores cao. Nhưng cost thường ẩn: relationship breakdown, paranoia, addiction, mất ý nghĩa.",
      "GỢI Ý QUAN TRỌNG: Nếu bạn relate với pattern (hurt người khác, manipulate, không feel guilt), consider tìm tư vấn psychologist. Test này không thay được professional assessment.",
      "DISCLAIMER: Đây là test giải trí dựa trên nghiên cứu tâm lý. KHÔNG phải chẩn đoán sức khoẻ tâm thần. Nếu bạn lo lắng, hãy tìm tư vấn chuyên môn.",
    ],
    strengths: ["Strategic intelligence", "Fearless", "Decision-making fast", "Charismatic", "Achieve trong adversity"],
    weaknesses: ["Relationship rất khó bền", "Paranoia + isolation risk", "Addiction risk", "Existential emptiness", "Khó connect emotion"],
    context: ["High-stakes leadership", "Negotiation extreme", "Crisis management"],
    advice: [
      "QUAN TRỌNG: Consider therapy / counseling - không phải vì bạn 'điên', mà vì insight value",
      "Find 1 person bạn có thể be vulnerable - chỉ 1 cũng được",
      "Read 'The Charisma Myth' (Olivia Fox) + 'Why Does He Do That?' (Bancroft) cho self-awareness",
      "Avoid environment amplify dark (cutthroat tech, politics) nếu có thể",
      "Nếu hurt ai recently, take responsibility + repair",
      "Dark traits là behaviors, KHÔNG phải identity - có thể change",
    ],
  },
];
