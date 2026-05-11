# NĐQ Portfolio — nguyenducquang.website

Personal brand site cho **Nguyễn Đức Quảng** (Ecom Growth Expert · 60+ project Marketing/Ecom).

**Phạm vi:** Homepage, Khoá học Ecom Foundation, 4 Tools (Phí sàn / ROAS / P&L / Thuế TNCN), **10 Quiz chia 4 nhóm** (Tính cách / Leadership / Hướng nghiệp / Kiến thức), 4 Pillar hub pages, **Blog 74 bài** (TMĐT 101 + Ads scaling + Unit Economics + Mùa vụ + Team + Case Study + Psychology + Tax + Quiz support) với TOC sidebar + comments + RSS + tag cloud + newsletter signup, Case Studies, **Shop** bán sản phẩm số (VietQR + Resend auto-delivery), Custom 404, SVG icons.

---

## 📜 Conventions

- **Không emoji trên user-facing UI** — bắt buộc SVG icons (`<Icon name="..." />`). Studio admin OK dùng emoji.
- **Không dùng em-dash `—` hoặc Unicode arrow `→`** trên site — feel AI-generated. Dùng `-` và `->`.
- **Mỗi commit update README.md** — reflect changes (routes/env/schema/conventions mới).
- Container widths: Tools 1400px, Blog/Quiz/Shop/Pillar 1100-1300px.
- Dark theme palette: `#5fffaa` green, `#ff5a72` red, `#ffd479` yellow, `#7da9ff` blue, `#a78bff` purple.

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | **Next.js 15** (App Router, Server Components, Static + ISR) |
| Styling | **Tailwind CSS 4** + custom CSS vars dark blue gradient |
| CMS | **Sanity v3** embedded `/studio` |
| Auth | **Clerk** (Email + Google) |
| Forms | **Web3Forms** (contact + course apply) |
| Email | **Resend** (transactional + webhooks) + **Newsletter subscribers** |
| Payment | **VietQR / Napas247** (Techcombank auto-gen QR) |
| Analytics | **Vercel Analytics** + **GA4** custom events |
| Image | **Sanity CDN** + Unsplash inline + dynamic `/api/blog-cover` (Satori) |
| Hosting | **Vercel** (auto deploy on push) |
| Domain | `nguyenducquang.website` (non-www canonical) |

---

## 📁 Cấu trúc thư mục

```
.
├── README.md                            # File này
├── middleware.ts                        # Clerk middleware (auth routes)
├── sanity.config.ts                     # Sanity Studio config
│
├── sanity/schemas/                      # 13 document types
│   ├── post.ts                          # Blog (title, body, tags, viewCount, externalImage, tableBlock)
│   ├── caseStudy.ts
│   ├── comment.ts
│   ├── quizLead.ts
│   ├── product.ts + productReview.ts
│   ├── order.ts + voucher.ts + userCart.ts
│   ├── newsletterSubscriber.ts          # NEW - email signup
│   └── others.ts                        # Settings, Brand, Testimonial, Timeline
│
└── src/
    ├── app/                             # Next.js App Router
    │   ├── layout.tsx                   # Root (Navbar, Footer, fonts, GA4)
    │   ├── page.tsx + HomeClient.tsx    # Homepage
    │   ├── sitemap.ts                   # Auto sitemap (posts + categories + quiz + tools)
    │   │
    │   ├── ecom-foundation/             # Khoá học landing
    │   ├── courses/ + resources/        # Khoá học hub + Tài nguyên hub
    │   │
    │   ├── tools/
    │   │   ├── tinh-phi-san/            # Tool tính phí Shopee/TikTok
    │   │   ├── roas-calculator/         # Break-even ROAS calc
    │   │   ├── pnl-ecom/                # P&L 5 tầng + in PDF
    │   │   └── tinh-thue-tncn/          # Thuế TNCN 2026 (5 bậc + so sánh 2025)
    │   │
    │   ├── quiz/
    │   │   ├── page.tsx                 # /quiz - 4 sections grouped + quick-jump chips
    │   │   ├── [slug]/page.tsx          # Quiz runner page
    │   │   ├── [slug]/result/[type]/    # SEO landing per archetype
    │   │   └── category/[slug]/         # NEW - 4 category landing pages
    │   │
    │   ├── blog/
    │   │   ├── page.tsx                 # List + filter + tag cloud + featured
    │   │   ├── [slug]/page.tsx          # Detail (TOC + comments + share + newsletter CTA)
    │   │   └── feed.xml/                # RSS feed
    │   │
    │   ├── case-study/[slug]/
    │   ├── shop/                        # Shop + cart + checkout + order tracking
    │   ├── account/ + sign-in/ + sign-up/
    │   ├── studio/[[...tool]]/          # Embedded Sanity Studio
    │   │
    │   └── api/                         # 20+ API routes
    │       ├── contact, course-apply
    │       ├── comments, blog-engagement (views/likes)
    │       ├── quiz-leads, newsletter    # Lead capture
    │       ├── orders/, cart, vouchers/
    │       ├── webhooks/resend           # Email event tracking
    │       ├── notify-google             # IndexNow Bing/Yandex
    │       ├── blog-cover                # Dynamic OG image (Satori, category-based palettes)
    │       └── seed-*                    # Seed blog/products/sanity (auth: SEED_SECRET)
    │
    ├── components/
    │   ├── Navbar.tsx                   # Header với 4 dropdown menus
    │   ├── Footer.tsx
    │   ├── icons/Icon.tsx               # 30+ SVG icons
    │   │
    │   ├── blog/
    │   │   ├── BlogSidebar.tsx + BlogTOC.tsx + Pagination.tsx
    │   │   ├── BlogFilterBar.tsx + TagCloud.tsx
    │   │   ├── PortableTextWithIds.tsx  # Render Sanity body (H2 anchor + link mark + table + image)
    │   │   ├── ShareButtons.tsx + ReadingProgress.tsx
    │   │   ├── EngagementBar.tsx + ViewTracker.tsx
    │   │   ├── CommentSection.tsx + AuthorBio.tsx
    │   │   └── NewsletterCTA.tsx        # NEW - subscribe form cuối bài
    │   │
    │   └── quiz/
    │       ├── QuizRunner.tsx           # Stateful (intro/running/gate/result), localStorage resume
    │       ├── QuizResult.tsx           # Archetype + dimension bars (multi-score) + wing
    │       ├── KnowledgeQuizRunner.tsx + KnowledgeQuizResult.tsx
    │       └── LeadCaptureGate.tsx      # Email/phone form trước khi xem result
    │
    └── lib/
        ├── queries.ts                   # Sanity GROQ queries
        │
        ├── blog/
        │   ├── markdown.ts              # MD-lite → Portable Text (inline links + bold + tables + images)
        │   ├── headings.ts + faq-extractor.ts
        │   ├── internal-links.ts        # Auto-suggest tool/quiz/course by category + tag
        │   ├── metadata.ts              # 74 blog ID → {category, tags} map + PILLAR_BLOG_IDS
        │   ├── auto-image.ts            # Inject Unsplash inline cho post thiếu image
        │   ├── cover-url.ts             # Fallback từ Sanity cover sang dynamic /api/blog-cover
        │   ├── group-a-content.ts       # 10 bài TMĐT 101
        │   ├── batch-2-3-content.ts     # 20 bài Ads + Team + Mùa vụ (Batch 2+3)
        │   ├── batch-4-content.ts       # 20 bài Unit Economics + Case Study (Batch 4)
        │   ├── quiz-tier-d-content.ts   # 15 bài support 5 quiz Tier D
        │   ├── psychology-content.ts    # 4 bài MBTI/Leadership cũ
        │   ├── tncn-cluster.ts          # 5 bài thuế TNCN
        │   └── groups-bcdef-drafts.ts   # 40 outline drafts (legacy, đã override bởi Batch 2-3-4)
        │
        ├── quiz/
        │   ├── types.ts                 # QuizConfig, QuizQuestion, QuizArchetype, MultiScoreResult
        │   ├── compute.ts               # QUIZZES registry + QUIZ_CATEGORIES + scoring helpers
        │   └── data/                    # 11 quiz data files (5 cũ + 5 mới + 1 knowledge)
        │       ├── leadership.ts (15Q) + mbti-questions.ts (70Q) + career.ts (12Q)
        │       ├── ad-metrics.ts (30Q) + content-frameworks.ts (30Q)
        │       └── disc.ts (24Q) + eq.ts (35Q) + big-five.ts (50Q)
        │           + enneagram.ts (45Q) + dark-triad.ts (27Q)
        │
        ├── fees/                        # TikTok 2039 rows, Shopee 1346/1348 rows
        ├── pnl/compute.ts               # P&L 5-tier formula
        ├── roas/compute.ts              # ROAS break-even
        ├── tax/compute.ts               # TNCN 2026 5-tier
        └── pillars/config.ts            # 4 pillar hub pages
```

---

## 🌐 Routes Map (full)

### Public pages
| Route | Type | Description |
|---|---|---|
| `/` | Static | Homepage (Hero + 11 sections + 85 brands marquee) |
| `/ecom-foundation` | Static | Khoá học landing |
| `/courses`, `/resources` | Static | Hub khoá học + tài nguyên |
| **`/tools`** + 4 tool pages | Static | Phí sàn, ROAS, P&L, TNCN 2026 |
| **`/quiz`** | Static | Hub với 4 section grouped + quick-jump |
| **`/quiz/category/[slug]`** | Static (4 pages) | Landing 4 nhóm: ban-than, leadership, huong-nghiep, kien-thuc |
| `/quiz/[slug]` | Static (10 quiz) | Quiz runner |
| `/quiz/[slug]/result/[type]` | Static | SEO landing per archetype (40+ pages) |
| **4 Pillar hub** (`/ecom`, `/index`, `/self-discovery`, `/career`) | ISR 1h | Auto pull cluster bài blog |
| **`/blog`** | Dynamic | List + featured + filter (category + tag) + pagination + tag cloud |
| **`/blog/[slug]`** | ISR 60s | Detail với TOC sidebar + comments + share + newsletter signup |
| `/blog/feed.xml` | Cached 1h | RSS feed |
| `/case-study/[slug]` | ISR 60s | Case study detail |
| `/shop` + `/shop/[slug]` | ISR | Shop + product detail (gallery + reviews) |
| `/shop/order/[orderNumber]` | Dynamic | Order status + VietQR + auto-poll |
| `/shop/download/[token]` | Dynamic | File download (verify token + expiry 30d) |
| `/account`, `/account/orders`, `/account/profile` | Dynamic | Clerk-protected user dashboard |
| `/sign-in`, `/sign-up` | Dynamic | Clerk auth pages |
| `/studio/[[...tool]]` | Dynamic | Sanity Studio embedded |

### API endpoints (20+)
| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/contact` | POST | rate-limit | Contact form |
| `/api/course-apply` | POST | rate-limit | Course apply |
| `/api/comments` | POST | rate-limit | Blog comment (auto-approve) |
| `/api/blog-engagement` | POST | per-IP debounce | View/Like/Bookmark |
| `/api/quiz-leads` | POST | rate-limit | Quiz lead capture |
| `/api/newsletter` | POST | none | **NEW** Email subscribe → Sanity newsletterSubscriber |
| `/api/orders/*` | POST | rate-limit | Order create + deliver |
| `/api/cart` | GET/POST | Clerk session | Cross-device cart sync |
| `/api/vouchers/validate` | POST | rate-limit | Voucher validate preview |
| `/api/webhooks/resend` | POST | Svix signature | Email events tracking |
| `/api/notify-google` | POST | SEED_SECRET | IndexNow Bing/Yandex |
| `/api/blog-cover` | GET | none | **NEW** Dynamic OG (Satori, category palette) |
| `/api/seed-blog-bulk?secret=...` | GET | SEED_SECRET | Seed 74 blog posts (idempotent) |

---

## 📚 Content Inventory

### Blog: 74 bài chia 8 categories

| Category | Số bài | Nội dung |
|---|---|---|
| `tmdt-co-ban` | 10 | TMĐT 101: phí sàn, Mall, voucher, SLS, chính sách 2026 |
| `ads-scaling` | 15 | Performance ads: CPC/CPM/CPO, A/B test, scale, ROAS target |
| `unit-economics` | 8 | P&L 5 tầng, CM, EBITDA, LTV/CAC, gross margin |
| `mua-vu-sale` | 7 | Seasonality: Tết, mega sale 11.11, post-sale, psychology trigger |
| `team-leadership` | 5 | Build team, hire ads runner, outsource, founder mindset |
| `case-study-data` | 5 | Case study Beauty 0-2 tỷ, Mall data 60+ shop, top 10 ngành |
| `tam-ly-mindset` | 19 | Psychology cluster (4) + Quiz Tier D support (15: DISC/EQ/Big Five/Enneagram/Dark Triad) |
| `thue-cong-cu` | 5 | Thuế TNCN 2026: hướng dẫn, 5 bậc vs 7 bậc, giảm trừ, BHXH |

**Pillar articles** (sitemap priority 0.9): 10 bài top traffic - P&L 5 tầng, CM > ROAS, EBITDA, Mall data, Top 10 ngành ROAS, Case study Beauty, Founder mindset, TNCN 2026...

### Quiz: 10 bài chia 4 nhóm

| Nhóm | Số bài | Quiz |
|---|---|---|
| **Test bản thân** | 5 | MBTI (70Q), Big Five OCEAN (50Q), Enneagram (45Q + wing), EQ Goleman (35Q + 5 dim), Dark Triad (27Q SD3) |
| **Test Leadership** | 2 | Phong cách lãnh đạo Goleman (15Q + 6 phong cách), DISC (24Q + 4 archetype) |
| **Test hướng nghiệp** | 1 | Marketing & Ecom (12Q + 5 archetype với lương VN) |
| **Test kiến thức** | 2 | Chỉ số quảng cáo (30Q timer 30s), Content frameworks (30Q timer 30s) |

### Tools: 4 calculators

1. **`/tools/tinh-phi-san`** - Phí Shopee/TikTok Mall vs Non-Mall, search ngành, 2039+1348 rows fee data
2. **`/tools/roas-calculator`** - Break-even ROAS từ CM% + profit target
3. **`/tools/pnl-ecom`** - P&L 5 tầng Net Revenue → EBITDA + in PDF
4. **`/tools/tinh-thue-tncn`** - Thuế TNCN 2026 5 bậc + side-by-side với luật 2025

---

## 🔧 Setup local

```bash
git clone <repo>
cd Website-Kai-Phase-2-main
npm install
cp .env.example .env.local   # fill in các giá trị
npm run dev                   # http://localhost:3000
```

### Environment variables (`.env.local`)

```bash
# === Sanity (required) ===
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=sk...

# === Site ===
NEXT_PUBLIC_SITE_URL=https://nguyenducquang.website

# === Auth (Clerk) ===
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# === Forms ===
NEXT_PUBLIC_WEB3FORMS_KEY=xxx

# === Email ===
RESEND_API_KEY=re_xxxxx
RESEND_WEBHOOK_SECRET=whsec_xxxxx

# === Analytics ===
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# === SEO ===
INDEXNOW_KEY=04b89f6c-...

# === Admin / Seed ===
SEED_SECRET=kai-seed-2026
```

### Common commands
```bash
npm run dev                # Dev server
npm run build              # Production build
npx tsc --noEmit           # Type-check
curl "$SITE_URL/api/seed-blog-bulk?secret=$SEED_SECRET&force=1"   # Re-seed 74 blog
```

---

## 📝 Content Workflow

### Blog post mới (via code)
1. Add post object vào file phù hợp trong `src/lib/blog/` (group-a-content / batch-2-3-content / batch-4-content / quiz-tier-d-content / psychology-content / tncn-cluster)
2. Add entry vào `src/lib/blog/metadata.ts` với category + tags
3. Commit + push → Vercel deploy
4. Curl seed: `curl "/api/seed-blog-bulk?secret=$SEED_SECRET&force=1"`
5. Sanity sẽ overwrite doc với content mới

### Quiz mới
1. Create `src/lib/quiz/data/quiz-name.ts` với QUESTIONS + ARCHETYPES
2. Add scoring function vào `src/lib/quiz/compute.ts`
3. Add entry vào `QUIZZES` array + `getQuizQuestions/getQuizArchetypes` switch
4. Add benefit text vào `QUIZ_BENEFITS` trong `QuizRunner.tsx`
5. Add navbar entry trong `src/components/Navbar.tsx`
6. (Optional) Add metadata entry trong blog support if writing companion blog

### Comments / Quiz Leads / Newsletter
- Vào `/studio` → docs auto-approve cho comments + leads + newsletter subscribers
- Filter theo type / date / source

---

## 🎨 Design System

### Colors (CSS vars trong `globals.css`)
```css
--wf-blue-400: #7da9ff;
--grad-primary: linear-gradient(135deg, #146ef5 → #7a3dff);
--ink-soft: rgba(255,255,255,0.85);
--ink-mute: rgba(255,255,255,0.55);
--line: rgba(255,255,255,0.08);
```

### Typography
- Headings: **Plus Jakarta Sans** (700-800 weight)
- Body: **Be Vietnam Pro** (400-500 weight)

### Conventions
- Cards: `glass` class (rounded-2xl + bg rgba 0.025 + border line)
- Buttons: `btn btn-primary` (gradient + shadow)
- Section tags: `section-tag` (uppercase pill above heading)
- Icons: SVG via `<Icon name="..." />` only
- **NO emoji** trên user-facing UI (Studio admin OK)
- **NO em-dash `—` hoặc arrow `→`** (use `-` và `->`)

### Container widths
- Tools: `max-w-[1400px]`
- Blog/Quiz/Pillar: `max-w-[1300px]`
- Course: `max-w-[1400px]`

---

## 🔍 SEO Architecture

### Schema.org per page type
- Homepage: Person + WebSite + ProfessionalService
- Course landing: Course + Person
- Tool: WebApplication + HowTo + FAQPage + BreadcrumbList
- Blog list: Blog + BreadcrumbList
- Blog post: Article + BreadcrumbList + **FAQPage** (auto from "## FAQ" section)
- Quiz list: ItemList
- **Quiz category landing**: ItemList + BreadcrumbList (NEW)
- Quiz: Quiz + BreadcrumbList
- Quiz result: Article + BreadcrumbList

### OG images
- Homepage, course, tools: static gradient với title
- Blog post: Sanity cover OR dynamic `/api/blog-cover` (Satori, 8 category palettes)
- Quiz result: dynamic per archetype (color + tagline + 3 strengths)

### Sitemap (`/sitemap.xml`)
Auto-generated:
- Static pages: homepage, ecom-foundation, courses, resources, tools, blog hub, quiz hub, shop
- **4 quiz category landing pages** (priority 0.85, weekly)
- 10 quiz pages (priority 0.78, monthly)
- 40+ quiz result archetype pages (priority 0.70, monthly)
- **4 pillar hub pages** (priority 0.92, weekly)
- **10 pillar blog articles** (priority 0.90, weekly)
- 64 non-pillar blog posts (priority 0.60, monthly)
- All case studies + tools (priority 0.85-0.92)

ISR refresh: hourly.

### RSS
- `/blog/feed.xml` - top 50 posts
- Linked in `<head>` via `metadata.alternates`

### Internal linking strategy
- `src/lib/blog/internal-links.ts` auto-suggest tool/quiz/course by category + tag match
- Each blog post ends với "Đọc tiếp" linking 3-5 related posts + 1-2 tools
- Pillar hub pages auto-pull cluster posts
- Quiz category landing → other categories cross-link

---

## 📊 Analytics events (GA4 + Vercel)

- `contact_form_submitted`
- `apply_form_submitted`
- `quiz_started`, `quiz_completed`, `quiz_lead_captured`, `quiz_resumed`
- `newsletter_subscribed` (planned)
- Blog: `view`, `like`, `share`, `comment_posted`

---

## 🚀 Deployment

Auto-deploy via **Vercel** on push to `main`. Branch deploys cho mọi other branch.

**Build output**:
- Static: ~95% routes
- ISR: blog/case-study detail (60s), sitemap (3600s)
- Dynamic: API routes, Sanity studio, OG image generators

**Post-deploy checklist**:
1. Curl seed nếu có blog/quiz changes: `/api/seed-blog-bulk?secret=...&force=1`
2. (Optional) IndexNow ping: `/api/notify-google?secret=...&url=...`
3. Verify sitemap.xml + robots.txt
4. Check Vercel logs cho deploy errors

---

## 🔐 Security

- Comments: rate-limited 5/min per IP, max 3000 chars
- Quiz leads + newsletter: rate-limited 10/min per IP
- Blog engagement: view debounced 10min per IP per post
- Seed routes: protected by `SEED_SECRET` env
- Studio auth: Sanity project login
- User auth: **Clerk** (Email + Google) — middleware `./middleware.ts`, ClerkProvider in root layout
- Auth routes: `/sign-in`, `/sign-up`, `/account/*` (protected via server-side `auth()`)
- Resend webhook: Svix signature verification
- No client secrets trong repo - all in `.env.local` / Vercel env

---

## 🗺 Roadmap

### Done (May 2026 session)
- [x] **TNCN 2026 calculator** + 5 bài SEO cluster + dynamic OG
- [x] **Wave 1 blog infra**: tables + externalImage + dynamic `/api/blog-cover` Satori
- [x] **Em-dash + Unicode arrow sweep** toàn bộ 114 files (.ts + .tsx)
- [x] **Blog hero 3 equal cards** với excerpt
- [x] **Batch 2 + 3**: 20 bài blog full content (ads scaling + team + mùa vụ)
- [x] **Batch 4**: 20 bài blog full content (unit economics + case study)
- [x] **Blog SEO restructure**: 8 categories mới + tags populated 5-8/bài + tag cloud widget + newsletter signup
- [x] **Inline markdown links** parser fix + auto-inject Unsplash images cho 19 bài thiếu
- [x] **Category cover variety**: 8 palette riêng cho `/api/blog-cover` (cam-đỏ/xanh-tím/xanh-lá/vàng/hồng-tím/xanh-đậm/tím/đỏ)
- [x] **Quiz Tier D**: 5 test mới (DISC + EQ + Big Five + Enneagram + Dark Triad) - 181 câu hỏi
- [x] **15 bài blog support** quiz Tier D (~25k từ)
- [x] **Quiz restructure**: 4 categories grouped + Navbar dropdown + 4 landing pages + SEO

### Previous achievements
- [x] Homepage + Course landing + 4 Tools
- [x] 4 Pillar hub pages backbone SEO
- [x] 5 quiz cũ (Leadership + MBTI + Career + 2 knowledge)
- [x] **Shop** bank transfer VietQR + Resend auto-delivery + Studio action
- [x] **Auth Clerk** (Email + Google) + `/account/*` dashboard
- [x] **Cart system** localStorage + Sanity sync cho signed-in user
- [x] **Voucher system** 100% auto-marked paid
- [x] Sanity Studio custom desk structure + document actions
- [x] SVG icon system (no emoji)
- [x] IndexNow API Bing/Yandex
- [x] Custom 404 với popular links + pillar pills
- [x] Lightweight Reveal (saved ~25KB bundle)
- [x] Resend webhook email event tracking
- [x] Quiz event tracking GA4

### Up next
- [ ] Newsletter automation (Resend nurture sequence sau subscribe)
- [ ] Category landing pages cho 8 blog categories (giống quiz)
- [ ] **Lương Gross/Net VN 2026** tool (highest search volume potential)
- [ ] **Chi phí mở shop TMĐT** calculator (lead magnet cho khoá Ecom Foundation)
- [ ] **Tool xếp hạng ngành ROAS** interactive (reuse F48 data)
- [ ] So sánh phí logistics (SPX vs J&T vs GHN vs GHTK)
- [ ] AI Copy Generator (Anthropic API premium feature)
- [ ] Multi-language EN cho top 10 bài traffic
- [ ] Sentry error tracking

### Maybe
- [ ] Custom Admin Panel (alternative Sanity Studio nếu speed issue)
- [ ] A/B testing setup (Vercel)
- [ ] Bookmark page `/bookmarks`

---

## 🐛 Common Issues

**Vercel build fails với "Sanity not configured"**: Check `NEXT_PUBLIC_SANITY_PROJECT_ID` không phải "placeholder".

**Sanity Studio chậm**: Sanity bundle 1.4MB. Mitigations: custom desk structure + group fields thành tabs.

**Sitemap không có post mới**: ISR 1h. Force redeploy hoặc đợi.

**Comments không hiện**: Check `approved=true` trong Sanity. (Auto-approve nhưng có thể fail rate-limit)

**Blog category filter trống sau seed**: ISR cache 60s. Đợi hoặc query trực tiếp `/blog?category=X`.

**Inline links `[text](/url)` render raw**: Đã fix trong markdown.ts parser (commit 736ab89). Re-seed cần thiết để re-parse body.

**Dynamic OG image trắng**: Satori không support inline-flex hoặc filter:blur. Check `/api/blog-cover` route render.

---

## 📊 Production Stats (May 12, 2026)

| Metric | Value |
|---|---|
| **Blog posts** | 74 (10 A + 20 Batch 2-3 + 20 Batch 4 + 15 Quiz Tier D + 4 Psychology + 5 TNCN) |
| **Quiz tools** | 10 (chia 4 nhóm) |
| **Calculator tools** | 4 |
| **Pillar hub pages** | 4 |
| **Shop products** | 3 |
| **Categories blog** | 8 (mới) + legacy values |
| **Blog tags** | 100+ unique tags |
| **Pillar SEO articles** | 10 (priority 0.9 trong sitemap) |
| **Quiz category landing** | 4 (priority 0.85) |
| **Sanity schemas** | 13 documents |
| **Total commits session này** | ~30 commits |

---

## 👤 Author

**Nguyễn Đức Quảng** (Kai)
- Email: qforwork13@gmail.com
- LinkedIn: [duc-quang-nguyen-b7495223a](https://www.linkedin.com/in/duc-quang-nguyen-b7495223a/)
- Zalo: 0868464658

Built with [Claude Code](https://claude.com/claude-code).
