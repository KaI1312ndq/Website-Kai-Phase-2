import type { QuizQuestion, QuizArchetype } from "../types";

/**
 * Dark Triad - 27 câu Likert (1-5)
 * 3 dimension, mỗi dim 9 câu (SD3 standard)
 *
 * Code dimension:
 *   "MA" - Machiavellianism (Mưu mẹo, thao túng)
 *   "NA" - Narcissism (Ái kỷ, đề cao bản thân)
 *   "PS" - Psychopathy (Vô cảm, liều lĩnh, thiếu hối hận)
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
  // === MACHIAVELLIANISM (MA) - Mưu mẹo, thao túng ===
  { id: 1, text: "Đôi khi tôi nói dối nhỏ để đạt được điều mình muốn.", options: LIKERT_POS("MA") },
  { id: 2, text: "Muốn thành công thì phải biết tính toán và đôi khi phải dùng mưu mẹo.", options: LIKERT_POS("MA") },
  { id: 3, text: "Khi đàm phán, tôi không tiết lộ hết thông tin mình có.", options: LIKERT_POS("MA") },
  { id: 4, text: "Nịnh nọt đúng lúc là cách hiệu quả để tiến thân.", options: LIKERT_POS("MA") },
  { id: 5, text: "Có những lúc kết quả quan trọng hơn cách làm, miễn là đạt được mục tiêu.", options: LIKERT_POS("MA") },
  { id: 6, text: "Tôi thường quan sát kỹ và chờ đúng thời điểm mới ra quyết định.", options: LIKERT_POS("MA") },
  { id: 7, text: "Tôi nắm bí mật của một số người và giữ riêng - có thể dùng khi cần.", options: LIKERT_POS("MA") },
  { id: 8, text: "Tôi luôn thẳng thắn, không bao giờ thao túng người khác kể cả khi có lợi cho mình.", options: LIKERT_REV("MA") },
  { id: 9, text: "Theo tôi, mặc định nên tin tưởng người khác trước, đừng nghi ngờ.", options: LIKERT_REV("MA") },

  // === NARCISSISM (NA) - Ái kỷ, đề cao bản thân ===
  { id: 10, text: "Tôi xứng đáng được chú ý nhiều hơn người bình thường.", options: LIKERT_POS("NA") },
  { id: 11, text: "Tôi cảm thấy mình đặc biệt và khác biệt so với đám đông.", options: LIKERT_POS("NA") },
  { id: 12, text: "Tôi thích trở thành tâm điểm chú ý trong các tình huống.", options: LIKERT_POS("NA") },
  { id: 13, text: "Tôi đòi hỏi được tôn trọng đúng mức với những gì mình xứng đáng.", options: LIKERT_POS("NA") },
  { id: 14, text: "Tôi biết mình giỏi hơn mức trung bình ở nhiều lĩnh vực.", options: LIKERT_POS("NA") },
  { id: 15, text: "Tôi thích cảm giác được người khác ghen tị.", options: LIKERT_POS("NA") },
  { id: 16, text: "Tôi kỳ vọng được ưu ái đặc biệt trong nhiều tình huống.", options: LIKERT_POS("NA") },
  { id: 17, text: "Tôi khiêm tốn khi nói về thành tích của bản thân.", options: LIKERT_REV("NA") },
  { id: 18, text: "Tôi không cần ai khen mới thấy tự tin về bản thân.", options: LIKERT_REV("NA") },

  // === PSYCHOPATHY (PS) - Vô cảm, liều lĩnh, thiếu hối hận ===
  { id: 19, text: "Tôi ít khi hối hận về những hành động của mình.", options: LIKERT_POS("PS") },
  { id: 20, text: "Tôi sẵn sàng liều dù người khác đã cảnh báo.", options: LIKERT_POS("PS") },
  { id: 21, text: "Tôi có thể làm điều nguy hiểm chỉ vì cảm giác mạnh.", options: LIKERT_POS("PS") },
  { id: 22, text: "Tôi nói thẳng điều mình muốn, không bận tâm hậu quả.", options: LIKERT_POS("PS") },
  { id: 23, text: "Tôi ít đồng cảm với người đang gặp khó khăn.", options: LIKERT_POS("PS") },
  { id: 24, text: "Trả thù là chấp nhận được nếu đối phương đáng bị như vậy.", options: LIKERT_POS("PS") },
  { id: 25, text: "Tôi luôn cố tránh các tình huống nguy hiểm.", options: LIKERT_REV("PS") },
  { id: 26, text: "Tôi cảm thấy day dứt khi vô tình làm tổn thương người khác.", options: LIKERT_REV("PS") },
  { id: 27, text: "Tôi tin luật pháp phải được tuân thủ nghiêm túc.", options: LIKERT_REV("PS") },
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
    tagline: "Phía sáng - cao về đạo đức, đồng cảm, chính trực",
    color: "#5fffaa",
    description: [
      "Bạn thuộc nhóm 'Bright Triad' - phía đối lập của Dark Triad. Bạn có sự chính trực cao, đồng cảm tự nhiên, ít thao túng. Trong xã hội ngày càng hoài nghi, bạn là người thật thà - hiếm và đáng quý.",
      "ĐIỂM MẠNH: Bạn xây được mối quan hệ sâu và bền. Bạn ngủ ngon với lương tâm rõ ràng. Đồng nghiệp và bạn bè tin tưởng bạn.",
      "ĐIỀU CẦN LƯU Ý: Trong môi trường cạnh tranh khốc liệt (chính trị nội bộ, kinh doanh máu lửa), bạn dễ bị lợi dụng. Tử tế không có nghĩa là dễ bị bắt nạt - bạn vẫn cần ranh giới và khả năng đọc người.",
      "DISCLAIMER: Đây là test giải trí dựa trên nghiên cứu tâm lý. KHÔNG phải chẩn đoán sức khoẻ tâm thần.",
    ],
    strengths: ["Tin cậy + chính trực", "Đồng cảm thật", "Mối quan hệ sâu", "Lương tâm trong sạch", "Truyền cảm hứng"],
    weaknesses: ["Có thể bị thao túng", "Khó chơi chính trị văn phòng", "Khó dứt khoát khi cần cứng rắn"],
    context: ["Trị liệu / Coaching", "Giáo dục", "Tổ chức phi lợi nhuận", "Xây cộng đồng", "Quan hệ dài hạn"],
    advice: [
      "Học cách nhận ra người thao túng - đó là tự bảo vệ",
      "Tập nói 'không' mạnh hơn - tử tế khác với dễ bị lấn lướt",
      "Chọn môi trường và người xung quanh có giá trị tương tự",
    ],
  },
  {
    id: "balanced",
    name: "Balanced (31-50%)",
    tagline: "Cân bằng - ai cũng có chút 'mặt tối'",
    color: "#7da9ff",
    description: [
      "Bạn ở mức 'cân bằng' - có một chút mưu mẹo, một chút tự cao, một chút liều lĩnh, nhưng đều ở mức bình thường của một người trưởng thành. Đây là MỨC BÌNH THƯỜNG.",
      "Mỗi tính cách 'tối' đều có lý do tồn tại: Mưu mẹo giúp điều hướng các tình huống xã hội phức tạp. Ái kỷ giúp tự quảng bá khi cần. Liều lĩnh giúp đổi mới và bứt phá.",
      "ĐIỂM MẠNH: Bạn có thể cứng rắn khi cần, vẫn giữ đạo đức khi không cần phải tranh giành.",
      "DISCLAIMER: Đây là test giải trí dựa trên nghiên cứu tâm lý. KHÔNG phải chẩn đoán sức khoẻ tâm thần.",
    ],
    strengths: ["Linh hoạt", "Dám quyết đoán khi cần", "Thực tế về con người", "Biết tự quảng bá đúng lúc", "Kiên cường"],
    weaknesses: ["Có thể trượt sang phía tối nếu môi trường độc hại", "Cần tự đánh giá định kỳ"],
    context: ["Hầu hết các vai trò chuyên môn", "Sales", "Marketing", "Đàm phán"],
    advice: [
      "Định kỳ tự hỏi: 'mình đang cư xử kiểu tối vì cần hay vì thói quen?'",
      "Xây vòng tròn người thân tin cậy - những người dám nói thật với bạn",
      "Tránh ở quá lâu trong môi trường độc hại - nó sẽ khuếch đại mặt tối",
    ],
  },
  {
    id: "tilted",
    name: "Tilted Dark (51-70%)",
    tagline: "Có tính cách nổi trội - cần suy ngẫm",
    color: "#ffd479",
    description: [
      "Bạn có ít nhất 1 tính cách 'tối' ở mức cao. Điều này không có nghĩa bạn 'xấu' - rất nhiều CEO, chính trị gia, người nổi tiếng có chỉ số dark cao và vẫn thành công. NHƯNG luôn có cái giá phải trả.",
      "Cái giá thường gặp: quan hệ khó đi sâu và bền, người khác kém tin tưởng bạn, mâu thuẫn nội tâm ('mình là người tốt hay xấu?'), khó kết nối ở mức cảm xúc sâu.",
      "Đây là thời điểm tốt để suy ngẫm: tính cách nào nổi trội? Nó giúp bạn ở đâu? Nó làm bạn khổ ở đâu? Bạn có muốn thay đổi không?",
      "DISCLAIMER: Đây là test giải trí. NẾU bạn lo lắng về xu hướng (ví dụ làm tổn thương người khác lặp đi lặp lại), hãy tìm tư vấn chuyên môn.",
    ],
    strengths: ["Đạt mục tiêu nhanh khi tham vọng cao", "Khó bị thao túng", "Độc lập", "Tư duy chiến lược"],
    weaknesses: ["Quan hệ khó bền", "Mâu thuẫn nội tâm", "Người khác khó tin tưởng", "Cô đơn khi lên cao"],
    context: ["Ngành cạnh tranh cao", "Sales high-stakes", "Vị trí lãnh đạo"],
    advice: [
      "Xác định tính cách nào cao nhất - tập trung làm việc với nó",
      "Trị liệu hoặc executive coaching giúp nhìn rõ hơn",
      "Xây 1 mối quan hệ 'kiểm chứng thực tế' - người sẽ nói thật với bạn",
      "Đọc về Bright Triad - học các kỹ năng về chính trực",
    ],
  },
  {
    id: "dark",
    name: "Pronounced Dark (71-100%)",
    tagline: "Cao bất thường - rất cần suy ngẫm",
    color: "#ff6b6b",
    description: [
      "Bạn có điểm cao ở 1 hoặc nhiều tính cách 'tối' - mức này cao hơn 70% người làm test. Việc bạn đọc kết quả một cách trung thực đã là bước dũng cảm - đây KHÔNG phải để dán nhãn bạn là người 'xấu'.",
      "Tính cách 'tối' cao thường đi cùng trí thông minh cao, sự lôi cuốn và tham vọng - đó là lý do nhiều người 'thành công' có điểm cao. Nhưng cái giá thường ẩn: đổ vỡ quan hệ, hoang tưởng, nghiện ngập, mất ý nghĩa cuộc sống.",
      "GỢI Ý QUAN TRỌNG: Nếu bạn thấy đúng với pattern (hay làm tổn thương người khác, thao túng, không thấy day dứt), hãy cân nhắc tìm tư vấn tâm lý. Test này không thay thế được đánh giá chuyên môn.",
      "DISCLAIMER: Đây là test giải trí dựa trên nghiên cứu tâm lý. KHÔNG phải chẩn đoán sức khoẻ tâm thần. Nếu bạn lo lắng, hãy tìm tư vấn chuyên môn.",
    ],
    strengths: ["Tư duy chiến lược sắc bén", "Không sợ hãi", "Ra quyết định nhanh", "Lôi cuốn", "Đạt mục tiêu trong nghịch cảnh"],
    weaknesses: ["Quan hệ rất khó bền", "Nguy cơ hoang tưởng + cô lập", "Nguy cơ nghiện ngập", "Trống rỗng nội tâm", "Khó kết nối cảm xúc"],
    context: ["Lãnh đạo trong áp lực cao", "Đàm phán cực đoan", "Quản lý khủng hoảng"],
    advice: [
      "QUAN TRỌNG: Cân nhắc trị liệu / tư vấn - không phải vì bạn 'có vấn đề', mà vì giá trị của sự thấu hiểu bản thân",
      "Tìm 1 người bạn có thể tâm sự thật - chỉ 1 người cũng đủ",
      "Đọc 'The Charisma Myth' (Olivia Fox) và 'Why Does He Do That?' (Bancroft) để hiểu mình hơn",
      "Tránh môi trường khuếch đại mặt tối (công nghệ kiểu cutthroat, chính trị) nếu có thể",
      "Nếu mới làm tổn thương ai - hãy chịu trách nhiệm và sửa chữa",
      "Tính cách tối là HÀNH VI, không phải BẢN CHẤT - có thể thay đổi được",
    ],
  },
];
