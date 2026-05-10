import type { QuizConfig, QuizQuestion, QuizArchetype } from "./types";
import { LEADERSHIP_QUESTIONS, LEADERSHIP_STYLES } from "./data/leadership";
import { MBTI_TYPES } from "./data/mbti-types";
import { MBTI_QUESTIONS as MBTI_QS_DATA } from "./data/mbti-questions";

export const QUIZZES: QuizConfig[] = [
  {
    slug: "phong-cach-lanh-dao",
    name: "Test Phong Cách Lãnh Đạo",
    shortDescription: "15 câu — biết bạn lãnh đạo theo phong cách nào trong 6 phong cách lãnh đạo kinh điển.",
    longDescription: "Bạn là kiểu lãnh đạo Độc đoán, Dân chủ, Tự do, Chuyển đổi, Giao dịch, hay Phục vụ? Bài test 15 câu dựa trên framework Goleman + Lewin giúp bạn hiểu phong cách tự nhiên của mình và cách phát triển nó hiệu quả.",
    estimatedMinutes: 5,
    questionCount: LEADERSHIP_QUESTIONS.length,
    color: "#7da9ff",
    emoji: "🎯",
    gateResult: false,
    scoringType: "leadership",
  },
  {
    slug: "mbti",
    name: "Test Tính Cách MBTI 16 Kiểu",
    shortDescription: "70 câu chuẩn quốc tế — xác định 1 trong 16 kiểu tính cách MBTI của bạn.",
    longDescription: "MBTI là bài test tính cách phổ biến nhất thế giới, dựa trên 4 cặp đối lập: Hướng ngoại/Hướng nội, Giác quan/Trực giác, Lý trí/Cảm xúc, Nguyên tắc/Linh hoạt. Bài test 70 câu giúp bạn hiểu sâu hơn về bản thân, công việc phù hợp, và cách tương tác với người khác.",
    estimatedMinutes: 15,
    questionCount: 70,
    color: "#a78bff",
    emoji: "🧠",
    gateResult: true,
    scoringType: "mbti",
  },
];

export function getQuiz(slug: string): QuizConfig | undefined {
  return QUIZZES.find((q) => q.slug === slug);
}

export function getQuizQuestions(slug: string): QuizQuestion[] {
  if (slug === "phong-cach-lanh-dao") return LEADERSHIP_QUESTIONS;
  if (slug === "mbti") return MBTI_QS_DATA;
  return [];
}

export function getQuizArchetypes(slug: string): QuizArchetype[] {
  if (slug === "phong-cach-lanh-dao") return LEADERSHIP_STYLES;
  if (slug === "mbti") return MBTI_TYPES;
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

// Re-export so seed can use them
export { MBTI_TYPES, LEADERSHIP_STYLES };
