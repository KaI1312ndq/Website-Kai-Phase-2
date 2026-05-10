export type QuizOption = {
  /** A, B, C, D, E, F */
  key: string;
  text: string;
  /** Mapping ID(s) — for leadership: 1 archetype; for MBTI: 1 dimension letter */
  scores: string[];
};

export type QuizQuestion = {
  id: number;
  text: string;
  options: QuizOption[];
};

export type QuizArchetype = {
  /** ID matches scoring keys */
  id: string;
  /** Display name */
  name: string;
  /** Short tagline / subtitle */
  tagline: string;
  /** Color accent (hex) */
  color: string;
  /** Long description — paragraphs */
  description: string[];
  /** Strengths (bullet list) */
  strengths: string[];
  /** Weaknesses */
  weaknesses: string[];
  /** Best context (when this style works) */
  context: string[];
  /** Advice for balance */
  advice?: string[];
};

export type QuizConfig = {
  slug: string;
  name: string;
  /** Short summary shown on landing */
  shortDescription: string;
  /** Long landing description */
  longDescription: string;
  /** Estimated time */
  estimatedMinutes: number;
  /** Number of questions */
  questionCount: number;
  /** Color theme */
  color: string;
  /** Icon name from src/components/icons/Icon.tsx */
  iconName: string;
  /** Whether result requires lead capture (email/phone) */
  gateResult: boolean;
  /** Internal: type for scoring */
  scoringType: "leadership" | "mbti" | "career" | "knowledge";
  /** Format: 'personality' (archetype) hoặc 'knowledge' (right/wrong with timer) */
  format?: "personality" | "knowledge";
  /** Knowledge quiz: giây mỗi câu (default 30) */
  secondsPerQuestion?: number;
};

/** Knowledge quiz question — single correct answer + explanation */
export type KnowledgeQuestion = {
  id: number;
  q: string;
  opts: string[];
  /** Index 0..3 of correct answer */
  ans: number;
  explain: string;
};
