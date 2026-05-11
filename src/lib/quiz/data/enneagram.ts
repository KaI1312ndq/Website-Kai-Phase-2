import type { QuizQuestion, QuizArchetype } from "../types";

/**
 * Enneagram 9 Type - 45 câu A/B forced choice
 * Mỗi câu so sánh trait của 2 type khác nhau, scoring +1 cho type chosen
 *
 * Code: "1"-"9" cho 9 type
 */

export const ENNEAGRAM_QUESTIONS: QuizQuestion[] = [
  // Each Q pairs 2 types - 45 questions covers all type combinations meaningful for self-id
  { id: 1, text: "Khi gặp bài toán khó, bạn:", options: [
    { key: "A", text: "Phải làm cho ra kết quả 'đúng' mới chịu dừng", scores: ["1"] },
    { key: "B", text: "Tìm cách tối ưu nhất, hiệu quả nhất", scores: ["3"] },
  ]},
  { id: 2, text: "Trong nhóm bạn thường là người:", options: [
    { key: "A", text: "Lắng nghe và giúp đỡ người khác", scores: ["2"] },
    { key: "B", text: "Tạo không khí vui vẻ, đưa idea mới", scores: ["7"] },
  ]},
  { id: 3, text: "Khi căng thẳng, bạn có xu hướng:", options: [
    { key: "A", text: "Rút lui vào bản thân, ít chia sẻ", scores: ["5"] },
    { key: "B", text: "Hỏi ý kiến nhiều người để chắc chắn", scores: ["6"] },
  ]},
  { id: 4, text: "Cảm xúc bạn ghét nhất là:", options: [
    { key: "A", text: "Bị 'average' - giống mọi người", scores: ["4"] },
    { key: "B", text: "Bị 'yếu' - không kiểm soát được", scores: ["8"] },
  ]},
  { id: 5, text: "Mục tiêu lớn nhất của bạn:", options: [
    { key: "A", text: "Hoà bình, không xung đột", scores: ["9"] },
    { key: "B", text: "Đạt được điều khiến tôi được công nhận", scores: ["3"] },
  ]},
  { id: 6, text: "Khi sai, bạn:", options: [
    { key: "A", text: "Tự critique bản thân khắt khe", scores: ["1"] },
    { key: "B", text: "Cảm thấy bất an, sợ người khác thấy", scores: ["2"] },
  ]},
  { id: 7, text: "Lo lắng lớn nhất của bạn:", options: [
    { key: "A", text: "Không có gì để làm / cuộc sống nhàm chán", scores: ["7"] },
    { key: "B", text: "Bị tổn thương / bị control", scores: ["8"] },
  ]},
  { id: 8, text: "Cách bạn giải quyết vấn đề:", options: [
    { key: "A", text: "Tự research + tự xử lý", scores: ["5"] },
    { key: "B", text: "Đi hỏi nhiều người uy tín, dựa vào opinion", scores: ["6"] },
  ]},
  { id: 9, text: "Bạn ghét bị:", options: [
    { key: "A", text: "Hiểu lầm hoặc xếp chung với người khác", scores: ["4"] },
    { key: "B", text: "Ép buộc làm gì gấp gáp", scores: ["9"] },
  ]},
  { id: 10, text: "Trong relationship, bạn:", options: [
    { key: "A", text: "Hay quan tâm + lo cho partner quá mức", scores: ["2"] },
    { key: "B", text: "Cần personal space và quiet time", scores: ["5"] },
  ]},
  { id: 11, text: "Khi bạn thành công:", options: [
    { key: "A", text: "Vui nhưng tự thấy mình có thể tốt hơn", scores: ["1"] },
    { key: "B", text: "Vui vì được mọi người khen ngợi", scores: ["3"] },
  ]},
  { id: 12, text: "Trong nhóm bạn rất hay:", options: [
    { key: "A", text: "Bị nhận xét 'quá emo' hoặc 'overthink'", scores: ["4"] },
    { key: "B", text: "Tự nguyện làm nhiều, đôi khi quá mức", scores: ["2"] },
  ]},
  { id: 13, text: "Bạn an toàn nhất khi:", options: [
    { key: "A", text: "Có nhiều options + flexibility", scores: ["7"] },
    { key: "B", text: "Có plan rõ + dự phòng B/C/D", scores: ["6"] },
  ]},
  { id: 14, text: "Đối với drama:", options: [
    { key: "A", text: "Tôi tránh - không thích xung đột", scores: ["9"] },
    { key: "B", text: "Tôi đối đầu trực tiếp - không né", scores: ["8"] },
  ]},
  { id: 15, text: "Bạn thường lo nhất về:", options: [
    { key: "A", text: "Có ai đó cần tôi mà tôi không thể giúp", scores: ["2"] },
    { key: "B", text: "Bị criticize hoặc làm sai", scores: ["1"] },
  ]},
  { id: 16, text: "Bạn happy nhất khi:", options: [
    { key: "A", text: "Hoàn thành 1 việc đúng tiêu chuẩn của mình", scores: ["1"] },
    { key: "B", text: "Được công nhận thành tích lớn", scores: ["3"] },
  ]},
  { id: 17, text: "Khi 1 mình:", options: [
    { key: "A", text: "Tôi recharge - thấy thoải mái", scores: ["5"] },
    { key: "B", text: "Tôi cảm thấy không đặc biệt, lạc lõng", scores: ["4"] },
  ]},
  { id: 18, text: "Trong công việc bạn drive bởi:", options: [
    { key: "A", text: "Sự công nhận + ladder up", scores: ["3"] },
    { key: "B", text: "Kiểm soát + bảo vệ team", scores: ["8"] },
  ]},
  { id: 19, text: "Đối với plan tương lai:", options: [
    { key: "A", text: "Tôi luôn có plan B/C nếu plan A fail", scores: ["6"] },
    { key: "B", text: "Tôi prefer flexibility - plan thay đổi mỗi tháng", scores: ["7"] },
  ]},
  { id: 20, text: "Quyết định khó:", options: [
    { key: "A", text: "Tôi hay defer, để người khác quyết", scores: ["9"] },
    { key: "B", text: "Tôi quyết nhanh, dứt khoát", scores: ["8"] },
  ]},
  { id: 21, text: "Khi gặp người mới:", options: [
    { key: "A", text: "Tôi quan sát kỹ trước khi mở lòng", scores: ["5"] },
    { key: "B", text: "Tôi vui vẻ + năng động ngay", scores: ["7"] },
  ]},
  { id: 22, text: "Tôi sợ nhất việc:", options: [
    { key: "A", text: "Bị thấy là 'sai' hoặc 'không có đạo đức'", scores: ["1"] },
    { key: "B", text: "Bị abandoned hoặc không được yêu", scores: ["2"] },
  ]},
  { id: 23, text: "Sức mạnh tôi tự hào nhất:", options: [
    { key: "A", text: "Tôi luôn original, không giống ai", scores: ["4"] },
    { key: "B", text: "Tôi thấy được trends + xu hướng", scores: ["7"] },
  ]},
  { id: 24, text: "Tôi nạp năng lượng bằng:", options: [
    { key: "A", text: "Reading, learning, quiet time", scores: ["5"] },
    { key: "B", text: "Routine yên bình - không gì lớn lao", scores: ["9"] },
  ]},
  { id: 25, text: "Trong conflict, tôi:", options: [
    { key: "A", text: "Đối đầu thẳng để bảo vệ điều mình tin", scores: ["8"] },
    { key: "B", text: "Tìm cách dung hoà, không thắng-thua", scores: ["9"] },
  ]},
  { id: 26, text: "Khi quyết định, tôi dựa nhiều vào:", options: [
    { key: "A", text: "Logic + fact (đôi khi missing emotion)", scores: ["5"] },
    { key: "B", text: "Cảm xúc + intuition", scores: ["4"] },
  ]},
  { id: 27, text: "Đối với routine, tôi:", options: [
    { key: "A", text: "Cần routine để feel safe + productive", scores: ["6"] },
    { key: "B", text: "Routine làm tôi nghẹn - cần spontaneous", scores: ["7"] },
  ]},
  { id: 28, text: "Tôi hay show tình cảm bằng:", options: [
    { key: "A", text: "Hỏi han, giúp đỡ practical", scores: ["2"] },
    { key: "B", text: "Bảo vệ + đứng cùng chống bất công", scores: ["8"] },
  ]},
  { id: 29, text: "Trong cuộc đời tôi sợ:", options: [
    { key: "A", text: "Trở nên ordinary, vô danh", scores: ["3"] },
    { key: "B", text: "Bị insignificant, không có identity riêng", scores: ["4"] },
  ]},
  { id: 30, text: "Tôi hay bị criticize vì:", options: [
    { key: "A", text: "'Quá người lớn' hoặc 'quá nghiêm túc'", scores: ["1"] },
    { key: "B", text: "'Quá ham vui' hoặc 'thiếu focus'", scores: ["7"] },
  ]},
  { id: 31, text: "Khi 1 dự án thành công:", options: [
    { key: "A", text: "Tôi enjoy moment + chia sẻ với mọi người", scores: ["3"] },
    { key: "B", text: "Tôi đã sang plan tiếp theo trong đầu", scores: ["7"] },
  ]},
  { id: 32, text: "Trust với người khác:", options: [
    { key: "A", text: "Tôi nghi ngờ default, cần thời gian build", scores: ["6"] },
    { key: "B", text: "Tôi trust dễ, đôi khi bị burn", scores: ["9"] },
  ]},
  { id: 33, text: "Khi bị reject:", options: [
    { key: "A", text: "Tôi feel rất personal, mất tự tin lâu", scores: ["4"] },
    { key: "B", text: "Tôi tức giận + muốn chứng minh ngược", scores: ["8"] },
  ]},
  { id: 34, text: "Tôi giúp người khác vì:", options: [
    { key: "A", text: "Muốn được love + appreciated", scores: ["2"] },
    { key: "B", text: "Đó là điều đúng để làm", scores: ["1"] },
  ]},
  { id: 35, text: "Trong team meeting:", options: [
    { key: "A", text: "Tôi observe nhiều, contribute khi cần thiết", scores: ["5"] },
    { key: "B", text: "Tôi hay drive discussion, lead direction", scores: ["8"] },
  ]},
  { id: 36, text: "Authority figure (sếp):", options: [
    { key: "A", text: "Tôi tôn trọng + theo hierarchy", scores: ["6"] },
    { key: "B", text: "Tôi challenge nếu thấy không đúng", scores: ["8"] },
  ]},
  { id: 37, text: "Đối với chính bản thân:", options: [
    { key: "A", text: "Tôi tự critique liên tục, ít chịu rest", scores: ["1"] },
    { key: "B", text: "Tôi tự giải thoát, không khắt khe", scores: ["7"] },
  ]},
  { id: 38, text: "Style trang phục:", options: [
    { key: "A", text: "Unique, expressive, hơi nghệ sĩ", scores: ["4"] },
    { key: "B", text: "Professional, success-signaling", scores: ["3"] },
  ]},
  { id: 39, text: "Khi feel mất kiểm soát:", options: [
    { key: "A", text: "Tôi withdraw + research giải pháp 1 mình", scores: ["5"] },
    { key: "B", text: "Tôi reach out + ask multiple advisor", scores: ["6"] },
  ]},
  { id: 40, text: "Câu nói mô tả bạn nhất:", options: [
    { key: "A", text: "'Mọi thứ đều ổn, không cần phức tạp hoá'", scores: ["9"] },
    { key: "B", text: "'Phải có chuẩn mực, phải làm đúng'", scores: ["1"] },
  ]},
  { id: 41, text: "Khi feel bị threat:", options: [
    { key: "A", text: "Tôi tăng intensity + dominant lại", scores: ["8"] },
    { key: "B", text: "Tôi cố làm mọi người happy lại", scores: ["2"] },
  ]},
  { id: 42, text: "Idea lý tưởng cuối tuần:", options: [
    { key: "A", text: "Adventure mới, trip ngắn, thử cái khác", scores: ["7"] },
    { key: "B", text: "Quiet ở nhà, đọc sách, tự reflect", scores: ["5"] },
  ]},
  { id: 43, text: "Đặc điểm bạn ghét nhất ở mình:", options: [
    { key: "A", text: "Tôi đôi khi giả tạo để fit in", scores: ["3"] },
    { key: "B", text: "Tôi quá emo / quá nhạy cảm", scores: ["4"] },
  ]},
  { id: 44, text: "Khi quyết định nghề nghiệp:", options: [
    { key: "A", text: "Tôi chọn an toàn, predictable", scores: ["6"] },
    { key: "B", text: "Tôi chọn flexibility + variety", scores: ["7"] },
  ]},
  { id: 45, text: "Tôi happy nhất khi:", options: [
    { key: "A", text: "Mọi người trong nhóm hoà thuận", scores: ["9"] },
    { key: "B", text: "Tôi được lead + control direction", scores: ["8"] },
  ]},
];

export const ENNEAGRAM_ARCHETYPES: QuizArchetype[] = [
  {
    id: "1",
    name: "Type 1 - The Perfectionist",
    tagline: "Người Cầu toàn - 'Tôi muốn đúng'",
    color: "#7da9ff",
    description: [
      "Bạn là Người Cầu toàn. Driver chính: bạn muốn đúng + tốt + có nguyên tắc. Bạn có internal critic mạnh, luôn tự đánh giá khắt khe và làm việc theo tiêu chuẩn cao.",
      "Core fear: Bị thấy 'sai' hoặc 'không có đạo đức'. Core desire: Sống đúng, có tích đạo đức.",
      "Khi healthy (integration → Type 7): Bạn relax, accept imperfection, enjoy moment. Khi stressed (disintegration → Type 4): Bạn moody, self-critical extreme, withdraw.",
    ],
    strengths: ["Đạo đức cao", "Reliable", "High standards", "Self-discipline", "Improvement-oriented"],
    weaknesses: ["Self-criticism quá mức", "Inflexible", "Judgmental với người khác", "Workaholic", "Khó relax"],
    context: ["Quality assurance", "Editor", "Legal", "Teacher", "Reform leader"],
    advice: [
      "Practice self-compassion - inner critic cần break",
      "Đặt 'good enough' threshold, không phải 'perfect'",
      "Schedule fun + spontaneous - không cần earn",
      "Wing: 1w9 (calmer) hoặc 1w2 (warmer)",
    ],
  },
  {
    id: "2",
    name: "Type 2 - The Helper",
    tagline: "Người Quan tâm - 'Tôi muốn được cần đến'",
    color: "#ff8aff",
    description: [
      "Bạn là Người Quan tâm. Driver: bạn muốn được love + appreciated qua việc giúp đỡ người khác. Bạn intuitive với nhu cầu của người, tự nguyện làm rất nhiều.",
      "Core fear: Bị unwanted, không được yêu. Core desire: Cảm thấy được love + needed.",
      "Khi healthy (→ Type 4): Tự care bản thân, có identity riêng, không phụ thuộc giúp đỡ. Khi stressed (→ Type 8): Tức giận, demanding, manipulative.",
    ],
    strengths: ["Empathy cao", "Caring + supportive", "Anticipate needs", "Build deep relationships", "Generous"],
    weaknesses: ["Suppress own needs", "Resentful khi không được appreciate", "Boundary kém", "Co-dependent risk", "Manipulate qua giúp đỡ"],
    context: ["Nursing", "Counseling", "HR", "Customer success", "Teacher"],
    advice: [
      "Practice nhận help - không chỉ give",
      "Identify own needs trước khi care người khác",
      "Set boundary - say 'no' không guilty",
      "Wing: 2w1 (principled) hoặc 2w3 (ambitious)",
    ],
  },
  {
    id: "3",
    name: "Type 3 - The Achiever",
    tagline: "Người Thành đạt - 'Tôi muốn thành công'",
    color: "#ffd479",
    description: [
      "Bạn là Người Thành đạt. Driver: bạn muốn thành công, được công nhận, được nhìn nhận có giá trị. Bạn adaptable, image-conscious, target-driven.",
      "Core fear: Trở nên worthless. Core desire: Có giá trị + được công nhận.",
      "Khi healthy (→ Type 6): Bạn authentic, làm vì mục đích lớn hơn personal success. Khi stressed (→ Type 9): Burnout, disengaged, mất motivation.",
    ],
    strengths: ["Driven + ambitious", "Adaptable", "Image-aware", "Charismatic", "Goal-oriented"],
    weaknesses: ["Workaholic", "Có thể fake/superficial", "Compete instead of cooperate", "Avoid feeling", "Identity tied to achievement"],
    context: ["Sales", "Marketing", "Founder", "Performer", "Executive"],
    advice: [
      "Practice authentic - vulnerability ok",
      "Đo identity ngoài achievement",
      "Schedule rest - không cần earn",
      "Wing: 3w2 (charmer) hoặc 3w4 (professional)",
    ],
  },
  {
    id: "4",
    name: "Type 4 - The Individualist",
    tagline: "Người Lãng mạn - 'Tôi muốn đặc biệt'",
    color: "#a78bff",
    description: [
      "Bạn là Người Lãng mạn. Driver: bạn muốn unique, expressive, có identity riêng biệt. Bạn deeply emotional, có gu thẩm mỹ, hay melancholic.",
      "Core fear: Bị insignificant, không có identity riêng. Core desire: Identity authentic + unique.",
      "Khi healthy (→ Type 1): Đặt cảm xúc vào purpose, productive output. Khi stressed (→ Type 2): Người chiều, attention-seeking, dependent.",
    ],
    strengths: ["Sáng tạo", "Authentic + deep emotion", "Aesthetic sensibility", "Empathy với suffering", "Self-aware"],
    weaknesses: ["Moody + melancholic", "Self-absorbed", "Envy với người khác", "Dramatic", "Withdraw khi feel misunderstood"],
    context: ["Art / Music", "Writing", "Design", "Therapy", "Fashion"],
    advice: [
      "Practice gratitude - shift khỏi 'something missing' mindset",
      "Daily routine - mood không quyết định",
      "Channel emotion vào creative output",
      "Wing: 4w3 (driven) hoặc 4w5 (cerebral)",
    ],
  },
  {
    id: "5",
    name: "Type 5 - The Investigator",
    tagline: "Người Quan sát - 'Tôi muốn hiểu'",
    color: "#4ad6ff",
    description: [
      "Bạn là Người Quan sát. Driver: bạn muốn hiểu thế giới, tiết kiệm năng lượng, có expertise sâu trong field bạn chọn.",
      "Core fear: Bị overwhelm, vắt kiệt năng lượng. Core desire: Competent + knowledgeable.",
      "Khi healthy (→ Type 8): Confident, take action, share knowledge. Khi stressed (→ Type 7): Distracted, scattered, escape via fantasy.",
    ],
    strengths: ["Deep thinking", "Independent", "Knowledgeable", "Calm under pressure", "Pattern recognition"],
    weaknesses: ["Isolated", "Avoid emotion", "Stingy với time/energy", "Detached", "Khó action sau khi đã hiểu"],
    context: ["Research", "Engineering", "Writing", "Consulting", "Academia"],
    advice: [
      "Practice 'good enough' knowledge - không cần master mọi thứ",
      "Schedule social interaction - rest sau cũng được",
      "Share knowledge - teach để force articulation",
      "Wing: 5w4 (creative) hoặc 5w6 (loyal)",
    ],
  },
  {
    id: "6",
    name: "Type 6 - The Loyalist",
    tagline: "Người Trung thành - 'Tôi muốn an toàn'",
    color: "#5fffaa",
    description: [
      "Bạn là Người Trung thành. Driver: bạn muốn an toàn, predictable, có support system trustworthy. Bạn vigilant với risk, loyal với tribe.",
      "Core fear: Bị abandoned, bị mất support. Core desire: Security + support.",
      "Khi healthy (→ Type 9): Trust intuition, calm, decisive. Khi stressed (→ Type 3): Workaholic to prove worth, image-conscious.",
    ],
    strengths: ["Loyal + dependable", "Vigilant với risk", "Hardworking", "Team player", "Practical"],
    weaknesses: ["Anxiety + worry", "Indecisive", "Khó trust", "Pessimistic", "Authority issue (over-comply hoặc rebel)"],
    context: ["Operations", "Risk management", "Security", "Customer service", "Long-term partnership roles"],
    advice: [
      "Practice trust intuition - thường đúng",
      "Limit news + worst-case planning",
      "Build chosen family / mentor để giảm anxiety",
      "Wing: 6w5 (introvert) hoặc 6w7 (sociable)",
    ],
  },
  {
    id: "7",
    name: "Type 7 - The Enthusiast",
    tagline: "Người Khám phá - 'Tôi muốn vui vẻ'",
    color: "#ff8a4c",
    description: [
      "Bạn là Người Khám phá. Driver: bạn muốn enjoy life, tránh boredom + pain, có nhiều options open. Bạn optimistic, energetic, ham học.",
      "Core fear: Bị trap trong pain, missing out. Core desire: Freedom + happiness.",
      "Khi healthy (→ Type 5): Focus deep, mature, accept pain là part of life. Khi stressed (→ Type 1): Perfectionist + critical về bản thân và người khác.",
    ],
    strengths: ["Optimistic + energetic", "Multitasker", "Quick learner", "Charismatic", "Resilient"],
    weaknesses: ["Avoid pain (khó deep work)", "Scatter focus", "Hedonistic risk", "Khó commit", "Impatient"],
    context: ["Marketing", "Sales", "Event/Entertainment", "Travel", "Startup early-stage"],
    advice: [
      "Practice sit with discomfort - pain là teacher",
      "Commit deep - 1 thing trong 90 ngày trước khi switch",
      "Schedule downtime - boredom is OK",
      "Wing: 7w6 (loyal explorer) hoặc 7w8 (bold)",
    ],
  },
  {
    id: "8",
    name: "Type 8 - The Challenger",
    tagline: "Người Mạnh mẽ - 'Tôi muốn kiểm soát'",
    color: "#ff6b6b",
    description: [
      "Bạn là Người Mạnh mẽ. Driver: bạn muốn kiểm soát môi trường + protect tribe. Bạn assertive, decisive, không sợ confrontation.",
      "Core fear: Bị control bởi người khác, bị harm. Core desire: Self-reliance + protect được người mình care.",
      "Khi healthy (→ Type 2): Use power để protect + uplift người khác. Khi stressed (→ Type 5): Withdraw, paranoid, isolated.",
    ],
    strengths: ["Confident", "Protective", "Decisive", "Strong leader", "Justice-oriented"],
    weaknesses: ["Intimidating", "Khó vulnerability", "Confrontational", "Control issue", "Bury soft emotion"],
    context: ["CEO / Founder", "Sales leader", "Military / Police", "Negotiator", "Activist"],
    advice: [
      "Practice vulnerability - strength không phải absence of feeling",
      "Listen 70% trước khi action",
      "Soften với loved ones - intensity ok ở work, không phải ở nhà",
      "Wing: 8w7 (maverick) hoặc 8w9 (commander)",
    ],
  },
  {
    id: "9",
    name: "Type 9 - The Peacemaker",
    tagline: "Người Hoà bình - 'Tôi muốn yên bình'",
    color: "#a8d8e0",
    description: [
      "Bạn là Người Hoà bình. Driver: bạn muốn harmony, avoid conflict, maintain inner peace. Bạn easy-going, accepting, supportive.",
      "Core fear: Bị conflict, bị loss + separation. Core desire: Inner peace + harmony external.",
      "Khi healthy (→ Type 3): Engaged, productive, có purpose. Khi stressed (→ Type 6): Worried, suspicious, anxious.",
    ],
    strengths: ["Easy-going", "Accepting", "Diplomatic", "Patient", "Stabilizing presence"],
    weaknesses: ["Procrastinate", "Avoid conflict (vấn đề tích tụ)", "Stubborn passively", "Khó self-priority", "Disengage when overwhelmed"],
    context: ["Mediator", "Counselor", "Long-term operator", "Therapist", "Diplomat"],
    advice: [
      "Practice action - small commit + execute trong 24h",
      "Voice needs - 'tôi muốn X' không phải 'cũng được'",
      "Identify priority - không thể keep everyone happy",
      "Wing: 9w8 (assertive) hoặc 9w1 (idealistic)",
    ],
  },
];
