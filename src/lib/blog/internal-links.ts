/**
 * Internal linking matrix — auto-suggest tools/quizzes/case studies
 * relevant to a blog post based on its category + tags.
 *
 * Goals:
 *  - Mỗi blog post tự động có 1-2 tool callouts (CTR cao)
 *  - Mỗi blog post tự động có 1 quiz callout
 *  - SEO: dày internal links → tăng PageRank distribution
 */

export type LinkSuggestion = {
  type: "tool" | "quiz" | "course";
  href: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
};

const TOOLS: Array<LinkSuggestion & { categories: string[]; tagKeywords: string[] }> = [
  {
    type: "tool",
    href: "/tools/tinh-phi-san",
    title: "Tool tính phí sàn TikTok & Shopee 2026",
    description: "Tính chính xác phí Mall vs Non-Mall — preset 4 platform, có search ngành.",
    iconName: "tool",
    color: "#4ad6ff",
    categories: ["tiktok", "shopee", "ecom"],
    tagKeywords: ["phí", "fee", "hoa hồng", "commission", "mall", "shopee", "tiktok"],
  },
  {
    type: "tool",
    href: "/tools/roas-calculator",
    title: "ROAS Calculator — Break-even ROAS",
    description: "Tính ROAS tối thiểu cần đạt để không lỗ + target ROAS theo margin.",
    iconName: "trending-up",
    color: "#7da9ff",
    categories: ["performance", "ecom", "tiktok", "shopee"],
    tagKeywords: ["roas", "ads", "break-even", "performance", "campaign", "scale"],
  },
  {
    type: "tool",
    href: "/tools/pnl-ecom",
    title: "Mẫu P&L Ecom — 5 tầng chuẩn",
    description: "Báo cáo lãi lỗ gian hàng từ Net Revenue → EBITDA, có in PDF.",
    iconName: "layers",
    color: "#a78bff",
    categories: ["ecom", "shopee", "tiktok", "performance"],
    tagKeywords: ["p&l", "pl", "lãi", "lợi nhuận", "profit", "ebitda", "margin", "contribution"],
  },
];

const QUIZZES: Array<LinkSuggestion & { categories: string[]; tagKeywords: string[] }> = [
  {
    type: "quiz",
    href: "/quiz/phong-cach-lanh-dao",
    title: "Test Phong Cách Lãnh Đạo",
    description: "15 câu — biết bạn lãnh đạo theo phong cách nào trong 6 phong cách kinh điển.",
    iconName: "target",
    color: "#7da9ff",
    categories: ["leadership", "mindset", "psychology"],
    tagKeywords: ["lãnh đạo", "leader", "team", "build team", "phong cách"],
  },
  {
    type: "quiz",
    href: "/quiz/mbti",
    title: "Test Tính Cách MBTI 16 Kiểu",
    description: "70 câu chuẩn quốc tế — xác định 1 trong 16 kiểu tính cách MBTI.",
    iconName: "brain",
    color: "#a78bff",
    categories: ["psychology", "mindset", "career"],
    tagKeywords: ["mbti", "tính cách", "personality", "intj", "enfp"],
  },
  {
    type: "quiz",
    href: "/quiz/huong-nghiep-marketing",
    title: "Test Hướng Nghiệp Marketing & Ecom",
    description: "12 câu — bạn thuộc archetype Creator / Analyst / Communicator / Builder / Operator?",
    iconName: "rocket",
    color: "#5fffaa",
    categories: ["career", "performance", "ecom", "mindset"],
    tagKeywords: ["nghề", "career", "lương", "salary", "marketing", "career path", "junior", "fresher"],
  },
];

const COURSE: LinkSuggestion = {
  type: "course",
  href: "/ecom-foundation",
  title: "Khoá Ecom Foundation — 12 buổi",
  description: "Build P&L thực chiến + scale shop từ kinh nghiệm 60+ project Ecom.",
  iconName: "graduation-cap",
  color: "#7da9ff",
};

/**
 * Score relevance: +5 for category match, +2 per tag keyword match.
 * Returns top N suggestions sorted by score desc.
 */
function scoreLink<T extends { categories: string[]; tagKeywords: string[] }>(
  link: T,
  postCategory: string | undefined,
  postTags: string[],
  postTitle: string,
): number {
  let score = 0;
  if (postCategory && link.categories.includes(postCategory)) score += 5;

  const haystack = [
    postTitle.toLowerCase(),
    ...postTags.map((t) => t.toLowerCase()),
  ].join(" ");

  for (const keyword of link.tagKeywords) {
    if (haystack.includes(keyword.toLowerCase())) score += 2;
  }
  return score;
}

export function getRelevantLinks(
  postCategory: string | undefined,
  postTags: string[] = [],
  postTitle: string = "",
): { tools: LinkSuggestion[]; quiz: LinkSuggestion | null; course: LinkSuggestion } {
  const scoredTools = TOOLS
    .map((t) => ({ ...t, _score: scoreLink(t, postCategory, postTags, postTitle) }))
    .sort((a, b) => b._score - a._score);

  const scoredQuizzes = QUIZZES
    .map((q) => ({ ...q, _score: scoreLink(q, postCategory, postTags, postTitle) }))
    .sort((a, b) => b._score - a._score);

  // Take top 2 tools (only if score > 0, fallback to top default)
  const topTools = scoredTools.filter((t) => t._score > 0).slice(0, 2);
  const tools: LinkSuggestion[] = (topTools.length > 0 ? topTools : scoredTools.slice(0, 2)).map(
    ({ _score, categories, tagKeywords, ...rest }) => rest
  );

  // Take top 1 quiz (if score > 0, otherwise null — don't force irrelevant quiz)
  const topQuiz = scoredQuizzes[0]?._score > 0 ? scoredQuizzes[0] : null;
  const quiz = topQuiz
    ? (() => {
        const { _score, categories, tagKeywords, ...rest } = topQuiz;
        return rest;
      })()
    : null;

  return { tools, quiz, course: COURSE };
}
