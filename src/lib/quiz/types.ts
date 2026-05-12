export type QuizOption = {
  /** A, B, C, D, E, F */
  key: string;
  text: string;
  /** Mapping ID(s) - for leadership: 1 archetype; for MBTI: 1 dimension letter */
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
  /** Long description - paragraphs */
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
  scoringType:
    | "leadership"
    | "mbti"
    | "career"
    | "knowledge"
    | "disc"
    | "eq"
    | "big-five"
    | "enneagram"
    | "dark-triad";
  /** Format: 'personality' (archetype) hoặc 'knowledge' (right/wrong with timer) */
  format?: "personality" | "knowledge";
  /** Knowledge quiz: giây mỗi câu (default 30) */
  secondsPerQuestion?: number;
  /** Top-level category để group quiz trên /quiz + Navbar */
  quizCategory?: "ban-than" | "leadership" | "huong-nghiep" | "kien-thuc";
  /** Show dimension scores chart on result page (multi-score quizzes EQ/BigFive/DarkTriad) */
  showDimensions?: boolean;
  /** Dimension labels for chart - key match với scoring code */
  dimensionLabels?: Record<string, string>;
  /** Likert format 1-5 scale thay vì A/B/C/D options */
  likertScale?: boolean;
};

/** Multi-score result - EQ, Big Five, Dark Triad. Mỗi dimension 0-100% */
export type MultiScoreResult = {
  dimensions: Record<string, number>;
  total?: number;
  level?: string;
  dominant?: string;
};

/** Visual shape spec cho IQ test (matrix / spatial rotation) */
export type ShapeSpec = {
  shape: "circle" | "square" | "triangle" | "diamond" | "star" | "hex" | "plus" | "arrow" | "L" | "T" | "empty";
  count?: number;        // 1-4 instances trong cell, mặc định 1
  size?: "sm" | "md" | "lg";  // mặc định md
  rotation?: number;     // 0 / 90 / 180 / 270 (deg)
  fill?: "solid" | "outline" | "dotted";  // mặc định solid
  color?: string;        // hex, mặc định currentColor
};

/** Visual data cho IQ matrix/spatial question */
export type QuizVisual =
  | {
      type: "matrix";
      /** 9 cells - cell index 8 = ? (last cell user phải đoán) */
      grid: (ShapeSpec | null)[];
      /** 4-6 shape options */
      options: ShapeSpec[];
    }
  | {
      type: "spatial";
      source: ShapeSpec;
      transform: string;   // mô tả vd "xoay 90° kim đồng hồ"
      options: ShapeSpec[]; // 4 hình variants
    };

/** Knowledge quiz question - single correct answer + explanation */
export type KnowledgeQuestion = {
  id: number;
  q: string;
  opts: string[];
  /** Index 0..N of correct answer */
  ans: number;
  explain: string;
  /** Optional visual cho IQ test matrix/spatial */
  visual?: QuizVisual;
  /** Category cho IQ test: matrix | spatial | verbal | quantitative | logic */
  category?: "matrix" | "spatial" | "verbal" | "quantitative" | "logic";
};
