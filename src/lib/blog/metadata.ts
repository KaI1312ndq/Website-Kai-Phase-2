/**
 * Blog metadata map: ID -> { category mới, tags 5-8 }.
 * Áp dụng tại seed-blog-bulk để override category gốc trong content files
 * (vì content files cũ dùng category "performance" / "ecom" - quá broad).
 *
 * Tags: mix 4 axis - Concept, Ngành, Platform, Type.
 */

export type BlogMeta = { category: string; tags: string[] };

export const BLOG_METADATA: Record<string, BlogMeta> = {
  /* ═════════════ NHÓM A - TMĐT 101 (10 bài) ═════════════ */
  "blog-A1-phi-shopee-2026": {
    category: "tmdt-co-ban",
    tags: ["phi-san", "shopee", "tiktok-shop", "hoa-hong", "framework", "2026"],
  },
  "blog-A2-mall-vs-non-mall": {
    category: "tmdt-co-ban",
    tags: ["mall", "non-mall", "shopee", "tiktok-shop", "framework", "decision-tree"],
  },
  "blog-A3-voucher-extra-vs-plus": {
    category: "tmdt-co-ban",
    tags: ["voucher", "freeship", "shopee", "roi", "framework"],
  },
  "blog-A4-sfr-boi-hoan-van-chuyen": {
    category: "tmdt-co-ban",
    tags: ["sfr", "boi-hoan", "shopee", "freeship", "framework", "break-even"],
  },
  "blog-A5-phi-giao-dich-6-percent": {
    category: "tmdt-co-ban",
    tags: ["phi-giao-dich", "shopee", "tiktok-shop", "phi-san", "framework"],
  },
  "blog-A6-dat-sai-nganh-cap-3": {
    category: "tmdt-co-ban",
    tags: ["nganh-cap-3", "hoa-hong", "shopee", "tiktok-shop", "checklist"],
  },
  "blog-A7-shop-moi-tiktok-vs-shopee": {
    category: "tmdt-co-ban",
    tags: ["shop-moi", "tiktok-shop", "shopee", "launch", "decision-tree"],
  },
  "blog-A8-shopee-sls-vs-spx": {
    category: "tmdt-co-ban",
    tags: ["van-chuyen", "spx", "sls", "shopee", "framework"],
  },
  "blog-A9-tiktok-live-commerce-fee": {
    category: "tmdt-co-ban",
    tags: ["live-commerce", "tiktok-shop", "phi-san", "framework", "2026"],
  },
  "blog-A10-cap-nhat-chinh-sach-shopee-tiktok-h1-2026": {
    category: "tmdt-co-ban",
    tags: ["chinh-sach", "shopee", "tiktok-shop", "checklist", "2026"],
  },

  /* ═════════════ NHÓM B - ADS & SCALING (15 bài) ═════════════ */
  "blog-B11-khong-chi-nhin-cpc-5-chi-so-ads-quan-trong-hon": {
    category: "ads-scaling",
    tags: ["cpc", "cpm", "ctr", "cvr", "roas", "framework", "ads-101"],
  },
  "blog-B12-ads-khong-ra-don-checklist-7-buoc": {
    category: "ads-scaling",
    tags: ["ads-troubleshoot", "checklist", "cvr", "creative", "framework"],
  },
  "blog-B13-cung-san-pham-tai-sao-shop-khac-chay-ads-hieu-qua-hon": {
    category: "ads-scaling",
    tags: ["shop-score", "ads-troubleshoot", "competitor", "audience", "framework"],
  },
  "blog-B14-doc-chi-so-ads-khong-mu-du-lieu": {
    category: "ads-scaling",
    tags: ["data", "metric", "framework", "vanity-metric", "actionable"],
  },
  "blog-B15-test-ads-a-b-test-khong-ton-ngan-sach": {
    category: "ads-scaling",
    tags: ["ab-test", "creative", "ngan-sach", "framework", "scaling"],
  },
  "blog-B16-tu-duy-moi-ve-cpm-cao-la-tot": {
    category: "ads-scaling",
    tags: ["cpm", "audience", "creative", "framework", "mindset"],
  },
  "blog-B17-scale-ads-tang-ngan-sach-khong-mat-roas": {
    category: "ads-scaling",
    tags: ["scaling", "roas", "ngan-sach", "framework", "scale"],
  },
  "blog-B18-roas-khong-phan-phoi-target-qua-cao-fix": {
    category: "ads-scaling",
    tags: ["roas", "algorithm", "ads-troubleshoot", "framework", "checklist"],
  },
  "blog-B19-dat-roas-dung-cho-san-pham-moi-30-ngay-dau": {
    category: "ads-scaling",
    tags: ["sku-moi", "launch", "roas", "framework", "30-ngay"],
  },
  "blog-B20-doc-data-ads-khi-chua-co-don-dung-dung-som": {
    category: "ads-scaling",
    tags: ["data", "ads-troubleshoot", "ctr", "ATC", "framework", "launch"],
  },
  "blog-B21-khi-nao-tang-roas-khi-nao-giam": {
    category: "ads-scaling",
    tags: ["roas", "decision-tree", "framework", "scaling", "optimize"],
  },
  "blog-B22-dat-nguong-cpo-theo-bien-loi-nhuan": {
    category: "ads-scaling",
    tags: ["cpo", "contribution-margin", "framework", "unit-economics", "ads-101"],
  },
  "blog-B23-ty-le-bo-gio-atc-cao-khong-ra-don": {
    category: "ads-scaling",
    tags: ["atc", "cvr", "checklist", "checkout", "retargeting"],
  },
  "blog-B24-it-chinh-ads-quy-tac-3-7-3": {
    category: "ads-scaling",
    tags: ["3-7-3", "framework", "algorithm", "mindset", "ads-101"],
  },
  "blog-B25-scale-x3-giam-roas-target-tai-sao-dung": {
    category: "ads-scaling",
    tags: ["scaling", "roas", "profit-max", "framework", "case-study"],
  },

  /* ═════════════ NHÓM C - UNIT ECONOMICS (8 bài) ═════════════ */
  "blog-C26-pl-gian-hang-tmdt-5-tang-chuan": {
    category: "unit-economics",
    tags: ["pl", "contribution-margin", "ebitda", "framework", "template"],
  },
  "blog-C27-contribution-margin-quan-trong-hon-roas": {
    category: "unit-economics",
    tags: ["contribution-margin", "roas", "framework", "case-study", "margin"],
  },
  "blog-C28-ebitda-bao-nhieu-la-khoe-cho-shop-ecom": {
    category: "unit-economics",
    tags: ["ebitda", "benchmark", "growth-stage", "framework", "2026"],
  },
  "blog-C29-dinh-gia-san-pham-de-ads-scale": {
    category: "unit-economics",
    tags: ["pricing", "scaling", "framework", "margin", "5-step"],
  },
  "blog-C30-gross-margin-toi-thieu-de-chay-ads-co-lai": {
    category: "unit-economics",
    tags: ["gross-margin", "ads", "benchmark", "framework", "break-even"],
  },
  "blog-C31-khai-thac-ads-tang-ltv": {
    category: "unit-economics",
    tags: ["ltv", "cac", "retention", "framework", "strategy"],
  },
  "blog-C32-phan-bo-ngan-sach-tranh-cpo-dot-bien": {
    category: "unit-economics",
    tags: ["ngan-sach", "70-20-10", "framework", "cpo", "scaling"],
  },
  "blog-C33-pl-tot-cash-flow-am-tai-sao": {
    category: "unit-economics",
    tags: ["cash-flow", "pl", "ccc", "framework", "checklist"],
  },

  /* ═════════════ NHÓM D - MÙA VỤ & SALE (7 bài) ═════════════ */
  "blog-D34-tam-ly-mua-sam-theo-mua-strategy-ads": {
    category: "mua-vu-sale",
    tags: ["seasonality", "calendar", "framework", "2026", "strategy"],
  },
  "blog-D35-chay-ads-xuyen-tet-khong-lang-phi": {
    category: "mua-vu-sale",
    tags: ["tet", "seasonality", "checklist", "ngan-sach", "framework"],
  },
  "blog-D36-sau-tet-khoi-dong-ads-nhanh": {
    category: "mua-vu-sale",
    tags: ["hau-tet", "seasonality", "framework", "recovery", "4-tuan"],
  },
  "blog-D37-mua-sale-lon-chien-luoc-ads-3-phase": {
    category: "mua-vu-sale",
    tags: ["mega-sale", "11-11", "12-12", "framework", "3-phase"],
  },
  "blog-D38-can-doi-ads-loi-nhuan-mua-sale-lon": {
    category: "mua-vu-sale",
    tags: ["mega-sale", "ebitda", "voucher-cap", "framework", "checklist"],
  },
  "blog-D39-tam-ly-khach-hang-5-trigger-tang-cvr": {
    category: "mua-vu-sale",
    tags: ["psychology", "cvr", "scarcity", "fomo", "social-proof", "framework"],
  },
  "blog-D40-sau-sale-top-5-viec-7-ngay": {
    category: "mua-vu-sale",
    tags: ["post-sale", "retargeting", "checklist", "7-ngay", "framework"],
  },

  /* ═════════════ NHÓM E - TEAM & LEADERSHIP (5 bài) ═════════════ */
  "blog-E41-build-team-ecom-0-12-nguoi-roadmap": {
    category: "team-leadership",
    tags: ["build-team", "hire", "luong-2026", "framework", "roadmap"],
  },
  "blog-E42-5-sai-lam-hire-ads-runner-dau-tien": {
    category: "team-leadership",
    tags: ["hire", "ads-runner", "checklist", "interview", "framework"],
  },
  "blog-E43-live-commerce-tiktok-5-sai-lam-margin-am": {
    category: "team-leadership",
    tags: ["live-commerce", "tiktok-shop", "checklist", "margin", "framework"],
  },
  "blog-E44-outsource-agency-vs-in-house-decision": {
    category: "team-leadership",
    tags: ["agency", "in-house", "decision-tree", "framework", "hybrid"],
  },
  "blog-E45-tu-duy-founder-ecom-2026-gmv-vs-ebitda": {
    category: "team-leadership",
    tags: ["founder", "mindset", "ebitda", "gmv", "framework", "2026"],
  },

  /* ═════════════ NHÓM F - CASE STUDY & DATA (5 bài) ═════════════ */
  "blog-F46-case-study-brand-beauty-0-2-ty-6-thang": {
    category: "case-study-data",
    tags: ["case-study", "beauty", "scaling", "6-thang", "pl", "framework"],
  },
  "blog-F47-mall-vs-non-mall-so-lieu-thuc": {
    category: "case-study-data",
    tags: ["mall", "non-mall", "data", "60-shop", "benchmark", "framework"],
  },
  "blog-F48-top-10-nganh-roas-cao-nhat-2026": {
    category: "case-study-data",
    tags: ["nganh", "roas", "data", "benchmark", "2026", "ranking"],
  },
  "blog-F49-cohort-analysis-track-repeat-buyer": {
    category: "case-study-data",
    tags: ["cohort", "ltv", "repeat-buyer", "framework", "template"],
  },
  "blog-F50-6-metric-ngam-anh-huong-profit": {
    category: "case-study-data",
    tags: ["metric", "tracking", "data", "framework", "advanced"],
  },

  /* ═════════════ PSYCHOLOGY (4 bài) ═════════════ */
  "blog-P1-mbti-16-kieu-tinh-cach": {
    category: "tam-ly-mindset",
    tags: ["mbti", "personality", "psychology", "16-types", "framework"],
  },
  "blog-P2-6-phong-cach-lanh-dao": {
    category: "tam-ly-mindset",
    tags: ["leadership", "phong-cach", "framework", "psychology", "team"],
  },
  "blog-P3-career-path-marketing-2026": {
    category: "tam-ly-mindset",
    tags: ["career", "marketing", "huong-nghiep", "framework", "2026"],
  },
  "blog-P4-hieu-ban-than-de-chon-nghe": {
    category: "tam-ly-mindset",
    tags: ["career", "self-discovery", "huong-nghiep", "framework", "psychology"],
  },

  /* ═════════════ THUẾ & CÔNG CỤ (5 bài) ═════════════ */
  "blog-T1-tncn-2026-huong-dan": {
    category: "thue-cong-cu",
    tags: ["tncn", "thue", "2026", "huong-dan", "framework"],
  },
  "blog-T2-5-bac-vs-7-bac": {
    category: "thue-cong-cu",
    tags: ["tncn", "thue", "5-bac", "7-bac", "framework"],
  },
  "blog-T3-giam-tru-gia-canh": {
    category: "thue-cong-cu",
    tags: ["tncn", "giam-tru", "gia-canh", "framework", "checklist"],
  },
  "blog-T4-luong-khong-dong-thue": {
    category: "thue-cong-cu",
    tags: ["tncn", "luong", "thue", "framework", "case-study"],
  },
  "blog-T5-bhxh-10-5": {
    category: "thue-cong-cu",
    tags: ["bhxh", "thue", "10-5", "framework", "2026"],
  },

  /* ═════════════ QUIZ TIER D - 15 bài (tam-ly-mindset) ═════════════ */
  "blog-Q1-disc-la-gi-test-4-phong-cach": {
    category: "tam-ly-mindset",
    tags: ["disc", "framework", "personality", "team", "career", "tinh-cach"],
  },
  "blog-Q2-disc-trong-tuyen-dung-4-kieu": {
    category: "tam-ly-mindset",
    tags: ["disc", "hire", "hr", "team", "management", "framework"],
  },
  "blog-Q3-disc-trong-tinh-yeu": {
    category: "tam-ly-mindset",
    tags: ["disc", "relationship", "tinh-yeu", "compatibility", "framework"],
  },
  "blog-Q4-eq-la-gi-5-khia-canh": {
    category: "tam-ly-mindset",
    tags: ["eq", "framework", "goleman", "psychology", "career"],
  },
  "blog-Q5-eq-thap-7-dau-hieu": {
    category: "tam-ly-mindset",
    tags: ["eq", "anxiety", "self-development", "30-ngay", "checklist"],
  },
  "blog-Q6-eq-trong-cong-viec-manager": {
    category: "tam-ly-mindset",
    tags: ["eq", "leadership", "manager", "case-study", "data", "career"],
  },
  "blog-Q7-big-five-ocean-test": {
    category: "tam-ly-mindset",
    tags: ["big-five", "ocean", "personality", "framework", "research"],
  },
  "blog-Q8-big-five-career-fit": {
    category: "tam-ly-mindset",
    tags: ["big-five", "career", "huong-nghiep", "mapping", "framework"],
  },
  "blog-Q9-neuroticism-cao": {
    category: "tam-ly-mindset",
    tags: ["neuroticism", "anxiety", "wellness", "90-ngay", "framework"],
  },
  "blog-Q10-enneagram-9-kieu-tinh-cach": {
    category: "tam-ly-mindset",
    tags: ["enneagram", "personality", "framework", "9-type", "psychology"],
  },
  "blog-Q11-enneagram-career": {
    category: "tam-ly-mindset",
    tags: ["enneagram", "career", "huong-nghiep", "9-type", "mapping"],
  },
  "blog-Q12-enneagram-tinh-yeu": {
    category: "tam-ly-mindset",
    tags: ["enneagram", "relationship", "tinh-yeu", "compatibility", "9-type"],
  },
  "blog-Q13-dark-triad-3-trait": {
    category: "tam-ly-mindset",
    tags: ["dark-triad", "psychology", "framework", "research"],
  },
  "blog-Q14-dark-triad-cong-so": {
    category: "tam-ly-mindset",
    tags: ["dark-triad", "workplace", "manipulation", "red-flag", "checklist"],
  },
  "blog-Q15-dark-triad-tinh-yeu": {
    category: "tam-ly-mindset",
    tags: ["dark-triad", "relationship", "red-flag", "abuse", "psychology"],
  },
};

/** Pillar articles - sitemap priority cao + thường top traffic */
export const PILLAR_BLOG_IDS = new Set<string>([
  "blog-A1-phi-shopee-2026",
  "blog-A2-mall-vs-non-mall",
  "blog-C26-pl-gian-hang-tmdt-5-tang-chuan",
  "blog-C27-contribution-margin-quan-trong-hon-roas",
  "blog-C28-ebitda-bao-nhieu-la-khoe-cho-shop-ecom",
  "blog-F47-mall-vs-non-mall-so-lieu-thuc",
  "blog-F48-top-10-nganh-roas-cao-nhat-2026",
  "blog-F46-case-study-brand-beauty-0-2-ty-6-thang",
  "blog-E45-tu-duy-founder-ecom-2026-gmv-vs-ebitda",
  "blog-T1-tncn-2026-huong-dan",
]);

/** Slug -> ID lookup cho sitemap (Sanity post.slug.current -> blog-XYZ ID) */
export function findMetaBySlug(slug: string): BlogMeta | undefined {
  for (const [id, meta] of Object.entries(BLOG_METADATA)) {
    if (id.includes(slug)) return meta;
  }
  return undefined;
}

/** Slug -> ID lookup cho pillar check */
export function isPillarSlug(slug: string): boolean {
  for (const id of PILLAR_BLOG_IDS) {
    if (id.includes(slug)) return true;
  }
  return false;
}
