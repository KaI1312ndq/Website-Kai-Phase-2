import type { QuizConfig, QuizQuestion, QuizArchetype, MultiScoreResult } from "./types";
import { LEADERSHIP_QUESTIONS, LEADERSHIP_STYLES } from "./data/leadership";
import { MBTI_TYPES } from "./data/mbti-types";
import { MBTI_QUESTIONS as MBTI_QS_DATA } from "./data/mbti-questions";
import { CAREER_QUESTIONS, CAREER_ARCHETYPES } from "./data/career";
import { AD_METRICS_QUESTIONS } from "./data/ad-metrics";
import { IQ_QUESTIONS } from "./data/iq";
import { CONTENT_FRAMEWORK_QUESTIONS } from "./data/content-frameworks";
import { DISC_QUESTIONS, DISC_ARCHETYPES } from "./data/disc";
import { EQ_QUESTIONS, EQ_ARCHETYPES } from "./data/eq";
import { BIG_FIVE_QUESTIONS, BIG_FIVE_ARCHETYPES } from "./data/big-five";
import { ENNEAGRAM_QUESTIONS, ENNEAGRAM_ARCHETYPES } from "./data/enneagram";
import { DARK_TRIAD_QUESTIONS, DARK_TRIAD_ARCHETYPES } from "./data/dark-triad";
import type { KnowledgeQuestion } from "./types";

export const QUIZZES: QuizConfig[] = [
  {
    slug: "phong-cach-lanh-dao",
    name: "Test Phong Cách Lãnh Đạo",
    shortDescription: "15 câu - biết bạn lãnh đạo theo phong cách nào trong 6 phong cách lãnh đạo kinh điển.",
    longDescription: "Bạn là kiểu lãnh đạo Độc đoán, Dân chủ, Tự do, Chuyển đổi, Giao dịch, hay Phục vụ? Bài test 15 câu dựa trên framework Goleman + Lewin giúp bạn hiểu phong cách tự nhiên của mình và cách phát triển nó hiệu quả.",
    estimatedMinutes: 5,
    questionCount: LEADERSHIP_QUESTIONS.length,
    color: "#7da9ff",
    iconName: "target",
    gateResult: false,
    scoringType: "leadership",
    quizCategory: "leadership",
  },
  {
    slug: "mbti",
    name: "Test Tính Cách MBTI 16 Kiểu",
    shortDescription: "70 câu chuẩn quốc tế - xác định 1 trong 16 kiểu tính cách MBTI của bạn.",
    longDescription: "MBTI là bài test tính cách phổ biến nhất thế giới, dựa trên 4 cặp đối lập: Hướng ngoại/Hướng nội, Giác quan/Trực giác, Lý trí/Cảm xúc, Nguyên tắc/Linh hoạt. Bài test 70 câu giúp bạn hiểu sâu hơn về bản thân, công việc phù hợp, và cách tương tác với người khác.",
    estimatedMinutes: 15,
    questionCount: 70,
    color: "#a78bff",
    iconName: "brain",
    gateResult: true,
    scoringType: "mbti",
    quizCategory: "ban-than",
  },
  {
    slug: "huong-nghiep-marketing",
    name: "Test Hướng Nghiệp Marketing & Ecom",
    shortDescription: "12 câu - xác định bạn phù hợp role nào trong ngành Marketing/Ecom: Creator, Analyst, Communicator, Builder, hay Operator.",
    longDescription: "Bạn đang phân vân giữa Performance Marketing, Brand, Content, Sales, hay Product? Bài test này dựa trên 5 archetype career trong ngành Marketing/Ecom, giúp bạn xác định role phù hợp với tính cách + skills của mình. Có gợi ý lương VN, kỹ năng cần học, và lộ trình 3 bước.",
    estimatedMinutes: 5,
    questionCount: 12,
    color: "#5fffaa",
    iconName: "rocket",
    gateResult: true,
    scoringType: "career",
    quizCategory: "huong-nghiep",
  },
  {
    slug: "test-iq",
    name: "Test IQ - Chỉ số thông minh tổng hợp",
    shortDescription: "30 câu · 5 nhóm Matrix/Spatial/Verbal/Math/Logic · ~25 phút · cần email · 30s/câu",
    longDescription: "Bài test IQ tổng hợp 30 câu chia 5 nhóm: 12 câu ma trận hình ảnh (Raven-style), 8 câu không gian (xoay/lật/khối hình), 5 câu ngôn ngữ (tương quan/đồng nghĩa), 3 câu số học, 2 câu logic. Điểm IQ chuẩn quốc tế (mean=100, SD=15) chia 6 mức từ 70-85 (Khám phá) đến 130+ (Tài năng). Lưu ý: test online KHÔNG thay thế WAIS-IV/Raven chuẩn lâm sàng - chỉ là tham khảo. Khuyến nghị làm trên màn hình desktop để xem matrix rõ.",
    estimatedMinutes: 25,
    questionCount: 30,
    color: "#a78bff",
    iconName: "brain",
    gateResult: true,
    scoringType: "knowledge",
    format: "knowledge",
    secondsPerQuestion: 30,
    quizCategory: "kien-thuc",
  },
  {
    slug: "chi-so-quang-cao",
    name: "Test Kiến Thức Chỉ Số Quảng Cáo",
    shortDescription: "30 câu - kiểm tra kiến thức về metrics digital ads: ROAS, CPC, CPM, CTR, CIR, AOV, RPR, Funnel...",
    longDescription: "Bạn nắm vững các chỉ số quảng cáo digital? 30 câu trắc nghiệm - mỗi câu 30 giây - kiểm tra kiến thức về Ad Spend, GMV, ROAS, CPC, CPM, CTR, Add to Cart Rate, CIR, ROI, AOV, CPA, Purchase Rate, RPR và benchmark thực tế VN. Có giải thích từng câu sau khi chọn. Cuối bài có tier Vàng/Bạc/Đồng tuỳ điểm.",
    estimatedMinutes: 15,
    questionCount: 30,
    color: "#22d3ee",
    iconName: "trending-up",
    gateResult: false,
    scoringType: "knowledge",
    format: "knowledge",
    secondsPerQuestion: 30,
    quizCategory: "kien-thuc",
  },
  {
    slug: "content-frameworks",
    name: "Test Kiến Thức Content Frameworks",
    shortDescription: "30 câu - AIDA, PAS, FAB, BAB, hook 3s TikTok, Cialdini, StoryBrand, JTBD, headline, CTA...",
    longDescription: "Bạn nắm vững các framework copywriting + content marketing chưa? 30 câu trắc nghiệm - mỗi câu 30 giây - kiểm tra kiến thức về AIDA, PAS, FAB, BAB, Pattern Interrupt, Open Loop, Cialdini's 6 nguyên tắc, USP, Social Proof, Scarcity, Risk Reversal, StoryBrand SB7, Hero's Journey, Pixar Story Spine, TOFU/MOFU/BOFU, Pillar-Cluster, JTBD, headline 4Us, email subject line, CTA, distribution. Có giải thích từng câu sau khi chọn. Cuối bài có tier Vàng/Bạc/Đồng tuỳ điểm.",
    estimatedMinutes: 15,
    questionCount: 30,
    color: "#a78bff",
    iconName: "book-open",
    gateResult: false,
    scoringType: "knowledge",
    format: "knowledge",
    secondsPerQuestion: 30,
    quizCategory: "kien-thuc",
  },
  {
    slug: "test-disc",
    name: "Test DISC - Phong cách hành xử",
    shortDescription: "24 câu - bạn là kiểu Quyết đoán (D), Ảnh hưởng (I), Ổn định (S), hay Chính xác (C)?",
    longDescription: "DISC là framework đo phong cách hành vi được dùng phổ biến trong tuyển dụng + training tại các công ty lớn. 4 phong cách D-I-S-C, mỗi cái có điểm mạnh + bối cảnh phù hợp riêng. Test 24 câu giúp bạn hiểu phong cách tự nhiên + cách làm việc với 3 phong cách còn lại.",
    estimatedMinutes: 6,
    questionCount: 24,
    color: "#ff6b6b",
    iconName: "target",
    gateResult: true,
    scoringType: "disc",
    quizCategory: "leadership",
  },
  {
    slug: "test-eq",
    name: "Test EQ - Trí tuệ cảm xúc",
    shortDescription: "35 câu tình huống - đo EQ theo 5 chiều của Goleman: Tự nhận thức, Tự kiểm soát, Động lực, Đồng cảm, Kỹ năng xã hội.",
    longDescription: "Trí tuệ cảm xúc (EQ) quan trọng hơn IQ trong predict career success + relationship. Test 35 câu tình huống chuẩn theo framework Daniel Goleman (1995) đo 5 khía cạnh EQ + tổng điểm 0-160. Có gợi ý cải thiện cụ thể theo điểm yếu của bạn.",
    estimatedMinutes: 10,
    questionCount: 35,
    color: "#5fffaa",
    iconName: "brain",
    gateResult: true,
    scoringType: "eq",
    quizCategory: "ban-than",
    showDimensions: true,
    dimensionLabels: {
      SA: "Tự nhận thức",
      SR: "Tự kiểm soát",
      MO: "Động lực",
      EM: "Đồng cảm",
      SS: "Kỹ năng xã hội",
    },
  },
  {
    slug: "test-big-five",
    name: "Test Big Five (OCEAN) - 5 chiều tính cách",
    shortDescription: "50 câu Likert - đo 5 chiều khoa học nhất về tính cách: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.",
    longDescription: "Big Five (OCEAN) là mô hình tính cách được khoa học công nhận nhất - chuẩn được nghiên cứu hơn 70 năm. Khác MBTI (16 type rời rạc), Big Five đo bạn theo 5 thang đo %. Test 50 câu chuẩn IPIP (Goldberg, 1992) + chống response bias bằng reverse-scored items.",
    estimatedMinutes: 12,
    questionCount: 50,
    color: "#a78bff",
    iconName: "brain",
    gateResult: true,
    scoringType: "big-five",
    quizCategory: "ban-than",
    likertScale: true,
    showDimensions: true,
    dimensionLabels: {
      O: "Openness (Cởi mở)",
      C: "Conscientiousness (Có trách nhiệm)",
      E: "Extraversion (Hướng ngoại)",
      A: "Agreeableness (Dễ chịu)",
      N: "Neuroticism (Bất ổn cảm xúc)",
    },
  },
  {
    slug: "test-enneagram",
    name: "Test Enneagram - 9 kiểu tính cách",
    shortDescription: "45 câu A/B - xác định 1 trong 9 kiểu Enneagram với wing + arrow (integration & disintegration).",
    longDescription: "Enneagram chia con người thành 9 kiểu cơ bản dựa trên động lực sâu (core fear + core desire), không chỉ hành vi bề ngoài như MBTI. Test 45 câu forced-choice xác định kiểu dominant + wing (5w4, 6w7...). Có thêm arrow của integration (khi healthy) và disintegration (khi stress).",
    estimatedMinutes: 10,
    questionCount: 45,
    color: "#ff8aff",
    iconName: "target",
    gateResult: true,
    scoringType: "enneagram",
    quizCategory: "ban-than",
  },
  {
    slug: "test-dark-triad",
    name: "Test Dark Triad - 3 đặc điểm 'bóng tối'",
    shortDescription: "27 câu SD3 - đo 3 trait: Mưu mẹo (Machiavelli), Ái kỷ (Narcissism), Vô cảm (Psychopathy nhẹ). Test giải trí, KHÔNG chẩn đoán.",
    longDescription: "Dark Triad là 3 trait tính cách 'bóng tối' được nghiên cứu trong tâm lý học. Test này giúp bạn hiểu mình có 'dark side' nào ở mức bao nhiêu - vì AI CŨNG CÓ 1 chút. Tone: giải trí + tò mò, KHÔNG để chẩn đoán bệnh. Nếu lo lắng về sức khoẻ tâm thần, hãy tìm tư vấn chuyên môn.",
    estimatedMinutes: 5,
    questionCount: 27,
    color: "#ff6b6b",
    iconName: "brain",
    gateResult: true,
    scoringType: "dark-triad",
    quizCategory: "ban-than",
    likertScale: true,
    showDimensions: true,
    dimensionLabels: {
      MA: "Mưu mẹo (Machiavelli)",
      NA: "Ái kỷ (Narcissism)",
      PS: "Vô cảm (Psychopathy)",
    },
  },
];

export type QuizCategoryKey = "ban-than" | "leadership" | "huong-nghiep" | "kien-thuc";

export type QuizCategory = {
  slug: QuizCategoryKey;
  label: string;
  shortDescription: string;
  longDescription: string;
  seoTitle: string;
  seoDescription: string;
  color: string;
  iconName: string;
};

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    slug: "ban-than",
    label: "Test bản thân",
    shortDescription: "Khám phá tính cách - MBTI, Big Five, Enneagram, EQ, Dark Triad",
    longDescription: "Bộ test tính cách + EQ giúp bạn hiểu sâu bản thân: MBTI 16 kiểu, Big Five (OCEAN) khoa học, Enneagram 9 type, EQ 5 chiều Goleman, Dark Triad 3 trait. Free 100%, kết quả ngay.",
    seoTitle: "Test tính cách miễn phí - MBTI, Big Five, Enneagram, EQ, Dark Triad",
    seoDescription: "5 test tính cách hot nhất 2026 tiếng Việt: MBTI 16 kiểu, Big Five (OCEAN) khoa học, Enneagram 9 type, EQ Goleman 5 chiều, Dark Triad. Free + kết quả chi tiết.",
    color: "#a78bff",
    iconName: "brain",
  },
  {
    slug: "leadership",
    label: "Test Leadership",
    shortDescription: "Phong cách lãnh đạo + hành vi công sở - 6 phong cách + DISC",
    longDescription: "Test phong cách lãnh đạo + DISC giúp bạn hiểu cách lead team + hành xử nơi công sở. Áp dụng cho HR, manager, founder, team lead. Có gợi ý career path + management style.",
    seoTitle: "Test Leadership - 6 phong cách lãnh đạo + DISC tiếng Việt",
    seoDescription: "Test phong cách lãnh đạo Goleman 6 phong cách + DISC 4 trait hành vi công sở. Cho HR, manager, founder, team lead. Free 100% + career fit.",
    color: "#7da9ff",
    iconName: "target",
  },
  {
    slug: "huong-nghiep",
    label: "Test hướng nghiệp",
    shortDescription: "Career path - Marketing & Ecom archetype + role phù hợp",
    longDescription: "Test hướng nghiệp dành cho người mới + chuyển ngành. Identify archetype career trong Marketing & Ecom - Creator, Analyst, Communicator, Builder, Operator. Có range lương VN + lộ trình junior → senior.",
    seoTitle: "Test hướng nghiệp Marketing & Ecom - 5 archetype career VN",
    seoDescription: "Test hướng nghiệp ngành Marketing & Ecom 2026: 5 archetype Creator/Analyst/Communicator/Builder/Operator. Có lương VN + skills cần học + lộ trình.",
    color: "#5fffaa",
    iconName: "rocket",
  },
  {
    slug: "kien-thuc",
    label: "Test kiến thức",
    shortDescription: "Knowledge quiz - Chỉ số quảng cáo, Content frameworks",
    longDescription: "Test kiến thức chuyên môn cho Marketer + Ecom seller: chỉ số quảng cáo (ROAS, CPC, CPM, CIR), content frameworks (AIDA, PAS, Cialdini, StoryBrand). Có timer + giải thích sau mỗi câu.",
    seoTitle: "Test kiến thức Marketing - ROAS, CPC, AIDA, Cialdini, StoryBrand",
    seoDescription: "Test kiến thức Marketing & Ads cho seller TMĐT: 30 câu chỉ số quảng cáo (ROAS, CPM, CPC, CIR) + 30 câu content frameworks (AIDA, Cialdini, StoryBrand). Có timer.",
    color: "#ffd479",
    iconName: "book-open",
  },
];

export function getQuizCategory(slug: string): QuizCategory | undefined {
  return QUIZ_CATEGORIES.find((c) => c.slug === slug);
}

export function getQuizzesByCategory(categorySlug: string): QuizConfig[] {
  return QUIZZES.filter((q) => q.quizCategory === categorySlug);
}

export function getQuiz(slug: string): QuizConfig | undefined {
  return QUIZZES.find((q) => q.slug === slug);
}

export function getQuizQuestions(slug: string): QuizQuestion[] {
  if (slug === "phong-cach-lanh-dao") return LEADERSHIP_QUESTIONS;
  if (slug === "mbti") return MBTI_QS_DATA;
  if (slug === "huong-nghiep-marketing") return CAREER_QUESTIONS;
  if (slug === "test-disc") return DISC_QUESTIONS;
  if (slug === "test-eq") return EQ_QUESTIONS;
  if (slug === "test-big-five") return BIG_FIVE_QUESTIONS;
  if (slug === "test-enneagram") return ENNEAGRAM_QUESTIONS;
  if (slug === "test-dark-triad") return DARK_TRIAD_QUESTIONS;
  return [];
}

export function getQuizArchetypes(slug: string): QuizArchetype[] {
  if (slug === "phong-cach-lanh-dao") return LEADERSHIP_STYLES;
  if (slug === "mbti") return MBTI_TYPES;
  if (slug === "huong-nghiep-marketing") return CAREER_ARCHETYPES;
  if (slug === "test-disc") return DISC_ARCHETYPES;
  if (slug === "test-eq") return EQ_ARCHETYPES;
  if (slug === "test-big-five") return BIG_FIVE_ARCHETYPES;
  if (slug === "test-enneagram") return ENNEAGRAM_ARCHETYPES;
  if (slug === "test-dark-triad") return DARK_TRIAD_ARCHETYPES;
  return [];
}

export function getArchetype(slug: string, id: string): QuizArchetype | undefined {
  return getQuizArchetypes(slug).find((a) => a.id === id);
}

/**
 * Compute leadership result: count occurrences per archetype, return top one.
 * answers: { questionId: optionKey ('A','B',...) }
 */
export function computeLeadershipResult(answers: Record<number, string>): {
  topId: string;
  scores: Record<string, number>;
  ranked: Array<{ id: string; score: number }>;
} {
  const scores: Record<string, number> = {};
  for (const q of LEADERSHIP_QUESTIONS) {
    const optKey = answers[q.id];
    if (!optKey) continue;
    const opt = q.options.find((o) => o.key === optKey);
    if (!opt) continue;
    for (const s of opt.scores) scores[s] = (scores[s] || 0) + 1;
  }
  const ranked = Object.entries(scores)
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score);
  const topId = ranked[0]?.id || "democratic";
  return { topId, scores, ranked };
}

/**
 * Compute MBTI: tally letters E/I/S/N/T/F/J/P, derive 4-letter type.
 */
export function computeMBTIResult(answers: Record<number, string>): {
  type: string;
  scores: Record<string, number>;
  dichotomies: Array<{ a: string; b: string; aScore: number; bScore: number; aPct: number }>;
} {
  const scores: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  for (const q of MBTI_QS_DATA) {
    const optKey = answers[q.id];
    if (!optKey) continue;
    const opt = q.options.find((o) => o.key === optKey);
    if (!opt) continue;
    for (const s of opt.scores) {
      if (s in scores) scores[s] += 1;
    }
  }

  const pickHigher = (a: string, b: string) => (scores[a] >= scores[b] ? a : b);
  const type = `${pickHigher("E", "I")}${pickHigher("S", "N")}${pickHigher("T", "F")}${pickHigher("J", "P")}`;

  const dichotomies = [
    { a: "E", b: "I" },
    { a: "S", b: "N" },
    { a: "T", b: "F" },
    { a: "J", b: "P" },
  ].map(({ a, b }) => {
    const aScore = scores[a];
    const bScore = scores[b];
    const total = aScore + bScore;
    const aPct = total > 0 ? (aScore / total) * 100 : 50;
    return { a, b, aScore, bScore, aPct };
  });

  return { type, scores, dichotomies };
}

/**
 * Compute career result: count occurrences per archetype, return top one.
 */
export function computeCareerResult(answers: Record<number, string>): {
  topId: string;
  scores: Record<string, number>;
  ranked: Array<{ id: string; score: number }>;
} {
  const scores: Record<string, number> = {};
  for (const q of CAREER_QUESTIONS) {
    const optKey = answers[q.id];
    if (!optKey) continue;
    const opt = q.options.find((o) => o.key === optKey);
    if (!opt) continue;
    for (const s of opt.scores) scores[s] = (scores[s] || 0) + 1;
  }
  const ranked = Object.entries(scores)
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score);
  const topId = ranked[0]?.id || "builder";
  return { topId, scores, ranked };
}

/**
 * Get knowledge quiz questions by slug.
 */
export function getKnowledgeQuestions(slug: string): KnowledgeQuestion[] {
  if (slug === "test-iq") return IQ_QUESTIONS;
  if (slug === "chi-so-quang-cao") return AD_METRICS_QUESTIONS;
  if (slug === "content-frameworks") return CONTENT_FRAMEWORK_QUESTIONS;
  return [];
}

/**
 * Compute DISC: count D/I/S/C, return dominant trait as topId.
 */
export function computeDiscResult(answers: Record<number, string>): {
  topId: string;
  scores: Record<string, number>;
  ranked: Array<{ id: string; score: number }>;
} {
  const scores: Record<string, number> = { D: 0, I: 0, S: 0, C: 0 };
  for (const q of DISC_QUESTIONS) {
    const optKey = answers[q.id];
    if (!optKey) continue;
    const opt = q.options.find((o) => o.key === optKey);
    if (!opt) continue;
    for (const s of opt.scores) scores[s] = (scores[s] || 0) + 1;
  }
  const ranked = Object.entries(scores)
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score);
  return { topId: ranked[0]?.id || "D", scores, ranked };
}

/** Parse "DIM:POINTS" format - return [dim, points] */
function parseScoreCode(code: string): [string, number] | null {
  const m = code.match(/^([A-Z]+):([+-]?\d+)$/);
  if (!m) return null;
  return [m[1], parseInt(m[2], 10)];
}

/**
 * Compute EQ: 5 dimension scores, total 0-160 (Goleman scale).
 * Returns archetype level (exceptional/high/average/low) as topId.
 */
export function computeEqResult(answers: Record<number, string>): {
  topId: string;
  dimensions: Record<string, number>;
  totalScore: number;
  totalPct: number;
} {
  // Each dim has 7 questions, max score per Q = 5, so max per dim = 35
  const rawScores: Record<string, number> = { SA: 0, SR: 0, MO: 0, EM: 0, SS: 0 };
  for (const q of EQ_QUESTIONS) {
    const optKey = answers[q.id];
    if (!optKey) continue;
    const opt = q.options.find((o) => o.key === optKey);
    if (!opt) continue;
    for (const s of opt.scores) {
      const parsed = parseScoreCode(s);
      if (parsed && parsed[0] in rawScores) {
        rawScores[parsed[0]] += parsed[1];
      }
    }
  }
  // Normalize each dim to 0-100%
  const dimensions: Record<string, number> = {};
  for (const dim of ["SA", "SR", "MO", "EM", "SS"]) {
    dimensions[dim] = Math.round((rawScores[dim] / 35) * 100);
  }
  // Total: sum of raw scores (max 175), scale to 0-160
  const rawTotal = Object.values(rawScores).reduce((a, b) => a + b, 0);
  const totalScore = Math.round((rawTotal / 175) * 160);
  const totalPct = Math.round((rawTotal / 175) * 100);

  let topId = "low";
  if (totalScore >= 131) topId = "exceptional";
  else if (totalScore >= 101) topId = "high";
  else if (totalScore >= 61) topId = "average";

  return { topId, dimensions, totalScore, totalPct };
}

/**
 * Compute Big Five (OCEAN): 5 dimensions with reverse scoring support.
 * Returns dominant dimension as topId.
 */
export function computeBigFiveResult(answers: Record<number, string>): {
  topId: string;
  dimensions: Record<string, number>;
} {
  // Each dim has 10 questions (5 positive + 5 reverse), Likert 1-5
  // Positive: directly add; Reverse: 6 - value (so 5 reverse = -1 reverse becomes 5)
  // We use signed score: positive items add as-is, reverse items subtract
  // Final range: each dim raw [-25, +25], shift to [0, 50], scale to [0, 100]
  const rawScores: Record<string, number> = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  for (const q of BIG_FIVE_QUESTIONS) {
    const optKey = answers[q.id];
    if (!optKey) continue;
    const opt = q.options.find((o) => o.key === optKey);
    if (!opt) continue;
    for (const s of opt.scores) {
      const parsed = parseScoreCode(s);
      if (parsed && parsed[0] in rawScores) {
        rawScores[parsed[0]] += parsed[1];
      }
    }
  }
  // Raw range per dim: ~ -25 to +25 (5 reverse items × -5 to 5 positive items × +5)
  // Normalize to 0-100%
  const dimensions: Record<string, number> = {};
  for (const dim of ["O", "C", "E", "A", "N"]) {
    const shifted = rawScores[dim] + 25; // shift to 0-50
    dimensions[dim] = Math.max(0, Math.min(100, Math.round((shifted / 50) * 100)));
  }
  const ranked = Object.entries(dimensions)
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score);
  return { topId: ranked[0]?.id || "O", dimensions };
}

/**
 * Compute Enneagram: 9 types A/B forced choice, return dominant type with wing.
 */
export function computeEnneagramResult(answers: Record<number, string>): {
  topId: string;
  scores: Record<string, number>;
  wing: string | null;
} {
  const scores: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0 };
  for (const q of ENNEAGRAM_QUESTIONS) {
    const optKey = answers[q.id];
    if (!optKey) continue;
    const opt = q.options.find((o) => o.key === optKey);
    if (!opt) continue;
    for (const s of opt.scores) scores[s] = (scores[s] || 0) + 1;
  }
  const ranked = Object.entries(scores)
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score);
  const topId = ranked[0]?.id || "9";
  // Wing: adjacent type (top-1 or top+1) with higher score
  const topNum = parseInt(topId, 10);
  const leftWing = topNum === 1 ? "9" : String(topNum - 1);
  const rightWing = topNum === 9 ? "1" : String(topNum + 1);
  const wing = (scores[leftWing] || 0) >= (scores[rightWing] || 0) ? leftWing : rightWing;
  return { topId, scores, wing };
}

/**
 * Compute Dark Triad: 3 dimensions, return level (light/balanced/tilted/dark) as topId.
 */
export function computeDarkTriadResult(answers: Record<number, string>): {
  topId: string;
  dimensions: Record<string, number>;
  avgPct: number;
} {
  // Each dim has 9 questions, mix of positive + reverse
  const rawScores: Record<string, number> = { MA: 0, NA: 0, PS: 0 };
  for (const q of DARK_TRIAD_QUESTIONS) {
    const optKey = answers[q.id];
    if (!optKey) continue;
    const opt = q.options.find((o) => o.key === optKey);
    if (!opt) continue;
    for (const s of opt.scores) {
      const parsed = parseScoreCode(s);
      if (parsed && parsed[0] in rawScores) {
        rawScores[parsed[0]] += parsed[1];
      }
    }
  }
  // Raw range per dim: roughly -15 to +35 (mix 7 positive × 5 + 2 reverse × -5 = max ~25)
  // Normalize to 0-100% by shift + scale
  const dimensions: Record<string, number> = {};
  for (const dim of ["MA", "NA", "PS"]) {
    const shifted = rawScores[dim] + 15; // shift baseline
    dimensions[dim] = Math.max(0, Math.min(100, Math.round((shifted / 40) * 100)));
  }
  const avgPct = Math.round(
    (dimensions.MA + dimensions.NA + dimensions.PS) / 3
  );
  let topId = "light";
  if (avgPct >= 71) topId = "dark";
  else if (avgPct >= 51) topId = "tilted";
  else if (avgPct >= 31) topId = "balanced";
  return { topId, dimensions, avgPct };
}

// Re-export so seed can use them
export { MBTI_TYPES, LEADERSHIP_STYLES, CAREER_ARCHETYPES, AD_METRICS_QUESTIONS };
export type { MultiScoreResult };
