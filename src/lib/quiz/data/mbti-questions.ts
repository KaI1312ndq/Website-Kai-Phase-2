import type { QuizQuestion } from "../types";

/**
 * MBTI 70-question test.
 * Mapping based on position-in-row-of-7 (rows of the scoring grid):
 *   pos 1 -> A=E, B=I
 *   pos 2,3 -> A=S, B=N
 *   pos 4,5 -> A=T, B=F
 *   pos 6,7 -> A=J, B=P
 *
 * Each question gets [scoreA, scoreB] derived from this rule.
 */

const POS_TO_SCORES: Array<[string, string]> = [
  ["E", "I"], // pos 1
  ["S", "N"], // pos 2
  ["S", "N"], // pos 3
  ["T", "F"], // pos 4
  ["T", "F"], // pos 5
  ["J", "P"], // pos 6
  ["J", "P"], // pos 7
];

function q(id: number, text: string, a: string, b: string): QuizQuestion {
  // pos = (id-1) mod 7
  const pos = (id - 1) % 7;
  const [scoreA, scoreB] = POS_TO_SCORES[pos];
  return {
    id,
    text,
    options: [
      { key: "A", text: a, scores: [scoreA] },
      { key: "B", text: b, scores: [scoreB] },
    ],
  };
}

export const MBTI_QUESTIONS: QuizQuestion[] = [
  q(1, "Tại một buổi tiệc, bạn sẽ:", "Giao tiếp với nhiều người, kể cả người lạ", "Chỉ giao tiếp với một số ít người mà bạn đã quen"),
  q(2, "Bạn thấy mình là người nghiêng về kiểu nào nhiều hơn?", "Thực tế", "Sáng tạo"),
  q(3, "Bạn nghĩ tình huống nào tồi tệ hơn?", "Đầu óc của bạn cứ \"bay bổng trên mây\"", "Cuộc sống của bạn thật nhàm chán và không bao giờ thay đổi"),
  q(4, "Bạn sẽ bị ấn tượng hơn với:", "Các nguyên tắc", "Những cảm xúc"),
  q(5, "Khi quyết định việc gì đó, bạn thường hay dựa vào:", "Sự thuyết phục", "Sự đồng cảm"),
  q(6, "Bạn thích làm việc theo kiểu nào nhiều hơn?", "Theo đúng thời hạn", "Tùy hứng"),
  q(7, "Bạn có khuynh hướng đưa ra các lựa chọn:", "Rất cẩn thận", "Phần nào theo cảm nhận"),
  q(8, "Tại các bữa tiệc, bạn thường:", "Ở lại tới cùng và cảm thấy càng lúc càng hào hứng", "Ra về sớm vì cảm thấy mệt mỏi dần"),
  q(9, "Kiểu người nào sẽ thu hút bạn hơn?", "Người thực tế và có lý lẽ", "Người giàu trí tưởng tượng"),
  q(10, "Điều nào khiến bạn thấy thích thú hơn?", "Những điều thực tế", "Những ý tưởng khả thi"),
  q(11, "Khi đánh giá hoặc phán xét người khác, bạn thường hay dựa vào điều gì?", "Luật lệ và nguyên tắc", "Hoàn cảnh"),
  q(12, "Khi tiếp cận, tiếp xúc người khác, bạn nghiêng về hướng nào hơn?", "Tiếp cận theo hướng khách quan", "Tiếp cận theo hướng sử dụng trải nghiệm cá nhân"),
  q(13, "Phong cách của bạn nghiêng về hướng nào hơn?", "Đúng giờ, nghiêm túc", "Nhàn nhã, thoải mái"),
  q(14, "Bạn cảm thấy không thoải mái khi có những việc:", "Chưa hoàn thiện", "Đã quá hoàn thiện"),
  q(15, "Trong các mối quan hệ xã hội, bạn thường:", "Luôn nắm bắt kịp thời thông tin về các vấn đề của mọi người", "Thường biết thông tin sau những người khác"),
  q(16, "Với các công việc thông thường, bạn nghiêng về cách:", "Làm theo cách thông thường", "Làm theo cách của riêng mình"),
  q(17, "Các nhà văn nên:", "Viết những gì họ nghĩ và chân thật với những gì mình viết", "Diễn đạt sự việc bằng cách so sánh hay liên tưởng"),
  q(18, "Điều gì lôi cuốn bạn hơn?", "Tính nhất quán của tư duy, suy nghĩ", "Sự hòa hợp trong các mối quan hệ của con người"),
  q(19, "Bạn cảm thấy thoải mái hơn khi đưa ra:", "Những đánh giá, nhận xét một cách logic", "Những đánh giá, nhận xét một cách có ý nghĩa"),
  q(20, "Bạn thích những điều:", "Đã được sắp xếp, quyết định trước", "Chưa xác định, chưa được quyết định"),
  q(21, "Bạn tự thấy mình:", "Nghiêm túc, quyết đoán", "Dễ gần, thoải mái"),
  q(22, "Khi nói chuyện điện thoại, bạn:", "Cứ gọi bình thường", "Chuẩn bị trước những điều sẽ nói"),
  q(23, "Những sự kiện trong thực tế:", "Bản thân nó giải thích cho chính nó", "Nó là bằng chứng giải thích cho các quy tắc, quy luật"),
  q(24, "Những người có tầm nhìn xa / người lo xa:", "Thường gây khó chịu cho người khác", "Khá thú vị"),
  q(25, "Bạn thường là người:", "Cái đầu lạnh", "Trái tim nóng"),
  q(26, "Điều nào thì tồi tệ hơn?", "Không công bằng", "Tàn nhẫn"),
  q(27, "Các sự kiện nên xảy ra theo hướng:", "Được lựa chọn và cân nhắc kỹ lưỡng", "Ngẫu nhiên và tự nhiên"),
  q(28, "Bạn cảm thấy thoải mái hơn khi:", "Đã mua một thứ gì đó", "Đang lựa chọn để mua"),
  q(29, "Trong công ty, bạn là người:", "Khởi xướng các câu chuyện", "Đợi người khác bắt chuyện với mình"),
  q(30, "Đối với những quy ước, quy tắc thông thường trong xã hội, bạn:", "Ít khi nghi ngờ những điều này", "Thường xem xét lại tính đúng đắn của những điều đó"),
  q(31, "Trẻ em thường:", "Chưa cố gắng đủ", "Chưa vui chơi đủ"),
  q(32, "Khi đưa ra các quyết định, bạn sẽ thấy thoải mái hơn với:", "Các tiêu chuẩn", "Cảm xúc, cảm nhận"),
  q(33, "Bạn nghiêng về tính cách nào hơn?", "Cứng rắn", "Nhẹ nhàng"),
  q(34, "Theo bạn, khả năng nào đáng khâm phục hơn?", "Khả năng tổ chức và làm việc có phương pháp", "Khả năng thích ứng và xoay xở trước mọi tình huống"),
  q(35, "Bạn đề cao tố chất nào hơn?", "Sự chắc chắn", "Sự cởi mở"),
  q(36, "Khi phải tương tác với người khác ở các tình huống và vấn đề mới lạ, không thường gặp, bạn thường:", "Thấy phấn chấn và hào hứng", "Cảm thấy mệt mỏi"),
  q(37, "Thường thì bạn là:", "Người thực tế", "Người có khả năng tưởng tượng phong phú"),
  q(38, "Bạn thường có xu hướng:", "Xem người khác có thể làm được việc gì hữu ích", "Xem người khác sẽ nghĩ và cảm nhận như thế nào"),
  q(39, "Bạn cảm thấy thoải mái hơn khi:", "Thảo luận một vấn đề kĩ lưỡng, triệt để", "Đạt được thỏa thuận, sự nhất trí về vấn đề"),
  q(40, "Cái đầu hay trái tim chi phối bạn nhiều hơn?", "Cái đầu", "Trái tim"),
  q(41, "Bạn cảm thấy thoải mái hơn khi làm các công việc theo dạng:", "Được giao trọn gói, làm xong hết rồi bàn giao", "Công việc làm hàng ngày, theo lịch"),
  q(42, "Bạn có xu hướng tìm kiếm những điều:", "Theo trật tự, thứ tự", "Ngẫu nhiên"),
  q(43, "Bạn thích kiểu nào hơn?", "Nhiều bạn bè ở mức độ xã giao", "Một vài người bạn thân"),
  q(44, "Bạn thường dựa vào:", "Sự kiện, thông tin thực tế", "Nguyên lý, nguyên tắc"),
  q(45, "Bạn hứng thú với việc gì hơn?", "Sản xuất và phân phối", "Thiết kế và nghiên cứu"),
  q(46, "Lời khen nào giá trị hơn?", "\"Đó là một người có suy nghĩ rất logic\"", "\"Đó là một người rất tình cảm, tinh tế\""),
  q(47, "Bạn thích mình có tố chất nào hơn?", "Kiên định, vững vàng", "Toàn tâm, cống hiến"),
  q(48, "Bạn thường thích điều nào hơn?", "Một tuyên bố cuối cùng, không thay đổi", "Một tuyên bố dự kiến, ban đầu"),
  q(49, "Bạn thấy thoải mái hơn vào lúc:", "Trước khi đưa ra quyết định", "Sau khi đưa ra quyết định"),
  q(50, "Bạn có thấy mình:", "Dễ dàng bắt chuyện và kéo dài cuộc trò chuyện với người mới gặp", "Khó mà trò chuyện nhiều với những người mới quen"),
  q(51, "Bạn có xu hướng tin tưởng vào:", "Kinh nghiệm của mình", "Linh cảm của mình"),
  q(52, "Bạn cho rằng mình thuộc tuýp người nào hơn?", "Người thực tế", "Người khôn khéo"),
  q(53, "Theo bạn ai là người đáng được khen ngợi hơn?", "Một người giàu lý trí", "Một người giàu cảm xúc"),
  q(54, "Bạn có xu hướng hành xử:", "Công bằng, vô tư", "Thông cảm, đồng cảm"),
  q(55, "Bạn thích:", "Đảm bảo rằng mọi việc được chuẩn bị, thu xếp sẵn sàng", "Để mọi việc diễn ra tự nhiên"),
  q(56, "Trong các mối quan hệ thì mọi việc:", "Có thể thảo luận để giải quyết được", "Diễn ra ngẫu nhiên và tùy theo điều kiện hoàn cảnh"),
  q(57, "Khi chuông điện thoại reo, bạn sẽ:", "Là người đầu tiên nhấc máy", "Hi vọng có người khác sẽ nhấc máy"),
  q(58, "Bạn đánh giá cao điều gì trong mình hơn:", "Nhận thức tốt về các yếu tố thực tế", "Có trí tưởng tượng phong phú, rực rỡ"),
  q(59, "Bạn sẽ chú tâm hơn đến:", "Các nguyên tắc, nguyên lý cơ bản", "Các ngụ ý, hàm ý, ẩn ý"),
  q(60, "Điều gì có vẻ sẽ là một lỗi lớn hơn?", "Quá nồng nhiệt, thiết tha", "Quá khách quan, thờ ơ"),
  q(61, "Về cơ bản, bạn sẽ đánh giá mình là người thế nào?", "Thiết thực, ít bị chi phối bởi tình cảm", "Từ tâm, đa cảm"),
  q(62, "Tình huống nào sẽ lôi cuốn bạn hơn?", "Tình huống rõ ràng, có kế hoạch", "Tình huống không xác định, không có kế hoạch"),
  q(63, "Bạn là người có xu hướng nào hơn?", "Theo thói quen", "Hay thay đổi"),
  q(64, "Bạn có xu hướng nào hơn?", "Là người dễ tiếp cận", "Ở mức độ nào đó là người kín đáo"),
  q(65, "Khi viết, bạn thích:", "Viết theo hướng văn chương hơn", "Viết theo số liệu, dữ liệu hơn"),
  q(66, "Đối với bạn, điều gì khó thực hiện hơn?", "Hiểu và chia sẻ với người khác", "Điều khiển người khác"),
  q(67, "Bạn mong ước mình sẽ có thêm nhiều điều gì?", "Lí trí và khả năng nhận xét rõ ràng", "Tình thương, lòng trắc ẩn sâu sắc"),
  q(68, "Điều gì sẽ là lỗi lớn hơn?", "Hành động bừa bãi, không cân nhắc", "Hành động chỉ trích, phê phán"),
  q(69, "Bạn sẽ thích sự kiện nào hơn?", "Sự kiện có lên kế hoạch trước", "Sự kiện không có kế hoạch trước"),
  q(70, "Bạn thường có hành động:", "Cân nhắc thận trọng", "Tự nhiên, tự phát"),
];
