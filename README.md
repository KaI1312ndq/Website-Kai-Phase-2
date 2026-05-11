# NĐQ Portfolio — nguyenducquang.website

Personal brand site cho **Nguyễn Đức Quảng** (Ecom Growth Expert · 60+ project Marketing/Ecom).

Site bao gồm: Homepage, Khoá học Ecom Foundation, 3 Tools (Tính phí sàn / ROAS Calculator / P&L Ecom), 4 Quiz (Lãnh đạo / MBTI / Hướng nghiệp / Chỉ số Ads), 4 Pillar hub pages (Ecom / Index / Self-Discovery / Career), Blog 50+ bài với sidebar TOC + comments + RSS, Case Studies, **Shop bán sản phẩm số** (Bank transfer + Resend email auto-delivery + Studio action), Custom 404, SVG icons.

## 📜 Conventions

- **Không emoji trên user-facing UI** — bắt buộc SVG icons (`<Icon name="..." />`). Studio admin OK dùng emoji.
- **Mỗi commit phải update README.md** — reflect changes (routes mới, env mới, schema mới, conventions mới).
- Container widths: Tools 1400px, Blog/Quiz/Shop/Pillar 1100-1300px.
- Dark theme palette: `#5fffaa` correct/green, `#ff5a72` wrong/red, `#ffd479` warn/yellow, `#7da9ff` info/blue.

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | **Next.js 15** (App Router, Server Components, Static + ISR) |
| Styling | **Tailwind CSS 4** + custom CSS vars cho theme dark blue gradient |
| CMS | **Sanity v3** (embedded `/studio` + custom desk structure + custom document actions) |
| Animations | Native CSS + IntersectionObserver (lightweight Reveal) + Framer Motion legacy |
| Forms | **Web3Forms** (contact + course apply) |
| Email | **Resend** (transactional + webhooks for tracking) |
| Payment | **VietQR / Napas247** (Techcombank bank transfer + auto QR generation) |
| Analytics | **Vercel Analytics** + **GA4** custom events |
| Image | **Sanity CDN** + Next.js Image Optimization (AVIF/WebP) |
| Hosting | **Vercel** (auto deploy on push) |
| Domain | Tenten → DNS Vercel → `nguyenducquang.website` (non-www canonical) |
| Search Console | IndexNow API for fast index notification |

---

## 📁 Cấu trúc thư mục

```
.
├── README.md                          # File này
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── sanity.config.ts                   # Sanity Studio config (desk structure)
│
├── public/                            # Static assets (favicon, OG fallback)
│
├── sanity/
│   ├── lib/
│   │   ├── client.ts                  # Sanity read client (CDN)
│   │   └── image.ts                   # urlFor() image builder
│   └── schemas/                       # Document types
│       ├── index.ts                   # Schema registry
│       ├── post.ts                    # Blog posts (title, body, tags, viewCount...)
│       ├── caseStudy.ts               # Portfolio case studies
│       ├── comment.ts                 # Blog comments (auto-approved)
│       ├── quizLead.ts                # Quiz leads (name, email, phone, result)
│       └── others.ts                  # Settings, Brand, Testimonial, Timeline
│
└── src/
    ├── app/                           # Next.js App Router
    │   ├── layout.tsx                 # Root layout (Navbar, Footer, fonts, GA4, Pixel)
    │   ├── page.tsx                   # Homepage (server) → HomeClient.tsx (client)
    │   ├── HomeClient.tsx
    │   ├── opengraph-image.tsx        # Default OG
    │   ├── globals.css                # Theme, prose, utilities
    │   ├── sitemap.ts                 # Auto sitemap (posts + case studies + quiz results)
    │   ├── robots.ts
    │   │
    │   ├── ecom-foundation/           # Khoá học landing
    │   │   ├── page.tsx
    │   │   ├── Calculator.tsx         # Inline tool trong landing
    │   │   └── opengraph-image.tsx
    │   │
    │   ├── tools/
    │   │   ├── page.tsx               # /tools — tool grid
    │   │   ├── tinh-phi-san/          # Tool tính phí sàn TikTok & Shopee
    │   │   ├── roas-calculator/       # ROAS break-even calculator
    │   │   └── pnl-ecom/              # P&L 5 tầng Net Revenue → EBITDA
    │   │
    │   ├── quiz/
    │   │   ├── page.tsx               # /quiz — quiz grid
    │   │   └── [slug]/
    │   │       ├── page.tsx           # Quiz runner page
    │   │       └── result/
    │   │           └── [type]/
    │   │               ├── page.tsx           # SEO landing per archetype (27 pages)
    │   │               └── opengraph-image.tsx# Dynamic OG per type
    │   │
    │   ├── blog/
    │   │   ├── page.tsx               # /blog — list + featured + filter + pagination
    │   │   ├── [slug]/page.tsx        # Blog detail (TOC sidebar + comments)
    │   │   └── feed.xml/route.ts      # RSS feed
    │   │
    │   ├── case-study/
    │   │   └── [slug]/page.tsx        # Case study detail
    │   │
    │   ├── studio/
    │   │   └── [[...tool]]/page.tsx   # Embedded Sanity Studio at /studio
    │   │
    │   └── api/
    │       ├── contact/route.ts             # Contact form (Web3Forms proxy)
    │       ├── course-apply/route.ts        # Course apply form
    │       ├── comments/route.ts            # POST blog comment (auto-approved)
    │       ├── blog-engagement/route.ts     # View/Like/Unlike (debounce per IP)
    │       ├── quiz-leads/route.ts          # POST quiz lead (gated MBTI/Career)
    │       ├── seed-blog/route.ts           # (legacy) seed 2 initial blog posts
    │       ├── seed-blog-bulk/route.ts      # Seed all 54 blog posts (Group A + B-F + Psychology)
    │       ├── seed-sanity/route.ts         # Seed initial Sanity data (brands, testimonials)
    │       └── diagnostic/route.ts          # Health check Resend/Web3Forms
    │
    ├── components/
    │   ├── Navbar.tsx                       # Header với dropdown Tools + Test
    │   ├── Footer.tsx
    │   ├── ContactForm.tsx
    │   ├── ApplyForm.tsx
    │   ├── BrandsCarousel.tsx               # 5-row marquee 85 brands
    │   ├── CohortStatus.tsx                 # Apply status block
    │   ├── LeadPopup.tsx                    # Exit-intent popup
    │   ├── Reveal.tsx                       # Scroll-triggered animation wrapper
    │   ├── PageTransition.tsx               # Top loader + fade-in route change
    │   ├── GradientBlobs.tsx                # Decorative blobs
    │   ├── Analytics.tsx                    # GA4 + custom events
    │   │
    │   ├── icons/
    │   │   └── Icon.tsx                     # 27 SVG icons (Lucide-style)
    │   │
    │   ├── blog/
    │   │   ├── BlogSidebar.tsx              # Sticky right sidebar (TOC + Tools + Course + Most Read)
    │   │   ├── BlogTOC.tsx                  # Auto TOC with scroll-spy
    │   │   ├── BlogFilterBar.tsx            # Search input + category chips
    │   │   ├── Pagination.tsx               # Page numbers with ellipsis
    │   │   ├── PortableTextWithIds.tsx      # PortableText with H2/H3 anchor IDs
    │   │   ├── ShareButtons.tsx             # FB / X / Zalo / Copy
    │   │   ├── ReadingProgress.tsx          # Sticky top progress bar
    │   │   ├── EngagementBar.tsx            # Like + Bookmark + Comment count + Views
    │   │   ├── ViewTracker.tsx              # Auto-increment view count
    │   │   ├── AuthorBio.tsx                # Author card cuối bài
    │   │   └── CommentSection.tsx           # Comments list + form (auto-approve)
    │   │
    │   └── quiz/
    │       ├── QuizRunner.tsx               # Stateful runner (intro/running/gate/result)
    │       ├── QuizResult.tsx               # Result display
    │       └── LeadCaptureGate.tsx          # Email/phone form before result
    │
    └── lib/
        ├── queries.ts                       # All Sanity GROQ queries
        │
        ├── blog/
        │   ├── markdown.ts                  # MD-lite → Sanity Portable Text
        │   ├── headings.ts                  # Extract H2/H3 + Vietnamese-aware slugify
        │   ├── group-a-content.ts           # 10 fully-written posts (TikTok/Shopee 2026)
        │   ├── groups-bcdef-drafts.ts       # 40 draft posts (outline only)
        │   └── psychology-content.ts        # 4 Psychology/Career posts (MBTI, Leadership)
        │
        ├── quiz/
        │   ├── types.ts                     # TS types (QuizConfig, QuizQuestion, QuizArchetype)
        │   ├── compute.ts                   # Quiz registry + scoring logic
        │   └── data/
        │       ├── leadership.ts            # 15 Q + 6 styles (Goleman + Lewin)
        │       ├── mbti-questions.ts        # 70 Q (auto-mapped position → dimension)
        │       ├── mbti-types.ts            # 16 types descriptions
        │       └── career.ts                # 12 Q + 5 archetypes (with real VN salary)
        │
        ├── fees/                            # JSON data: TikTok 2039 rows, Shopee 1346/1348
        ├── pnl/compute.ts                   # P&L 5-tier formula
        └── roas/compute.ts                  # ROAS break-even formula
```

---

## 🌐 Routes & Page Map

### Public pages
| Route | Type | Description |
|---|---|---|
| `/` | Static | Homepage (Hero + 11 sections + brands) |
| `/ecom-foundation` | Static | Khoá học landing với apply form |
| `/tools` | Static | Tool grid |
| `/tools/tinh-phi-san` | Static | Tool tính phí Mall vs Non-Mall |
| `/tools/roas-calculator` | Static | Break-even ROAS calc |
| `/tools/pnl-ecom` | Static | P&L 5-tier với in PDF |
| `/quiz` | Static | Quiz grid |
| `/quiz/phong-cach-lanh-dao` | Static | Test 6 phong cách (15 Q personality) |
| `/quiz/mbti` | Static | Test MBTI 16 kiểu (70 Q, gated email/SĐT) |
| `/quiz/huong-nghiep-marketing` | Static | Test career Marketing (12 Q, gated) |
| `/quiz/chi-so-quang-cao` | Static | Test kiến thức Chỉ số Ads (30 Q, timer 30s, knowledge format) |
| `/quiz/[slug]/result/[type]` | Static (27 pages) | SEO landing cho từng archetype |
| `/ecom`, `/index`, `/self-discovery`, `/career` | Static, ISR 1h | 4 Pillar hub pages — auto pull cluster bài blog |
| `/shop` | ISR 60s | Shop landing — list products + checkout cart |
| `/shop/[slug]` | SSG (per product) | Product detail (gallery + reviews + USP + buy) |
| `/shop/order/[orderNumber]` | Dynamic | Order status với VietQR + auto-poll 15s |
| `/shop/download/[token]` | Dynamic | File download landing (verify token + expiry 30d) |
| `/blog` | Dynamic (?page,?category,?q,?tag) | Blog list with filter + pagination + featured |
| `/blog/[slug]` | ISR 60s | Blog detail với sidebar TOC + comments + share |
| `/blog/feed.xml` | Cached 1h | RSS feed |
| `/case-study/[slug]` | ISR 60s | Case study detail |
| `/studio/[[...tool]]` | Dynamic | Sanity Studio admin |
| `/not-found` | Static | Custom 404 với popular links + pillar pills |

### API endpoints
| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/contact` | POST | rate-limit | Contact form → Web3Forms |
| `/api/course-apply` | POST | rate-limit | Course apply → Web3Forms + Sanity |
| `/api/comments` | POST | rate-limit | Blog comment (auto-approve) |
| `/api/blog-engagement` | POST | per-IP debounce | View/Like/Bookmark |
| `/api/quiz-leads` | POST | rate-limit | Quiz lead capture (MBTI/Career gated) |
| `/api/orders/create` | POST | rate-limit | Create shop order with products |
| `/api/orders/deliver` | POST | SEED_SECRET OR same-origin | Trigger Resend send file + update status |
| `/api/webhooks/resend` | POST | Svix signature | Resend email events (delivered/opened/clicked/bounced) |
| `/api/notify-google` | POST | SEED_SECRET | IndexNow submit URLs to Bing/Yandex |
| `/api/seed-blog-bulk?secret=...` | GET | SEED_SECRET | Seed 54 blog posts (idempotent) |
| `/api/seed-products?secret=...` | GET | SEED_SECRET | Seed 3 placeholder products |
| `/api/seed-sanity?secret=...` | GET | SEED_SECRET | Seed brands + testimonials |
| `/api/diagnostic` | GET | none | Health check |

---

## 🔧 Setup local

### 1. Clone + install
```bash
git clone <repo-url>
cd Website-Kai-Phase-2-main
npm install
```

### 2. Environment variables (`.env.local`)
```bash
# ── Sanity (required) ──────────────────────────
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=sk...                # For write APIs (comments, quiz-leads, seed, orders)

# ── Site (required) ────────────────────────────
NEXT_PUBLIC_SITE_URL=https://nguyenducquang.website

# ── Forms (required for contact + apply) ───────
NEXT_PUBLIC_WEB3FORMS_KEY=xxx               # https://web3forms.com

# ── Email (required for shop file delivery) ────
RESEND_API_KEY=re_xxxxx                     # https://resend.com — domain verified
RESEND_WEBHOOK_SECRET=whsec_xxxxx           # https://resend.com → Webhooks → Signing Secret

# ── Analytics (optional) ───────────────────────
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# ── SEO / IndexNow (optional but recommended) ──
INDEXNOW_KEY=04b89f6c-...-eb1d8df80bf6      # Match filename in public/<KEY>.txt

# ── Admin / Seed (only for Quảng) ──────────────
SEED_SECRET=any-random-string-you-pick      # Auth seed routes + admin APIs
```

### 3. Run dev
```bash
npm run dev          # http://localhost:3000
npm run build        # Production build
npm run start        # Production preview
```

### 4. Lint + typecheck
```bash
npx tsc --noEmit
```

---

## 📝 Content workflow

### Blog post mới
1. Vào `/studio` → 📝 Blog / Insights → 🆕 Mới nhất → tạo doc mới
2. Editor có 3 tabs: 📝 Nội dung / ⚙️ Metadata / 🔍 SEO
3. Fill title, slug auto-generate, body, category, tags
4. Tick `featured` nếu muốn lên hero
5. `publishedAt` auto = now
6. Click **Publish**

### Bulk seed initial blog
```bash
curl https://nguyenducquang.website/api/seed-blog-bulk?secret=<SEED_SECRET>
# Idempotent — gọi lại không tạo trùng
```

### Comments moderation
- Comment auto-approved (transparency-first)
- Vào `/studio` → 💬 Bình luận → xoá nếu spam

### Quiz Leads
- Vào `/studio` → 🧠 Quiz Leads → filter theo MBTI / Phong cách lãnh đạo / tất cả
- Mỗi record: tên, email, phone, kết quả type, scores JSON

### Shop — quy trình bán sản phẩm số
1. Khách vào `/shop` → chọn 1-3 sản phẩm (combo 99k / 169k / 199k) → checkout
2. Order tạo trong Sanity với `paymentStatus=pending` + VietQR Techcombank auto-gen
3. Khách scan QR Techcombank → chuyển khoản (nội dung CK = orderNumber)
4. Quảng vào `/studio` → 🛍️ Shop → "⏳ Đơn chờ thanh toán" → mở order
5. Click button **"📧 Confirm & Send file"** ở góc dưới phải Studio
6. Action gọi `/api/orders/deliver` → Resend gửi email với link `/shop/download/[token]`
7. Resend webhook update order khi khách mở/click email
8. Khách click link → tải file (verify token + expiry 30 ngày)

### Resend Webhook setup (1 lần)
- [resend.com/webhooks](https://resend.com/webhooks) → Add Endpoint
- URL: `https://nguyenducquang.website/api/webhooks/resend`
- Events: `email.delivered`, `email.opened`, `email.clicked`, `email.bounced`
- Copy Signing Secret (whsec_...) → Vercel env `RESEND_WEBHOOK_SECRET`
- Redeploy

---

## 🎨 Design system

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
- Mono: SF Mono / Menlo

### Components conventions
- Cards: `glass` class (rounded-2xl + bg rgba 0.025 + border line)
- Buttons: `btn btn-primary` (gradient + shadow)
- Section tags: `section-tag` (uppercase pill above heading)
- All icons: SVG via `<Icon name="..." />`. **NO emoji on user-facing UI** (Studio admin OK).

### Container widths
- Tools pages: `max-w-[1400px]` (calc tables cần rộng)
- Blog/Quiz/Result: `max-w-[1300px]` (content reading)
- Course: `max-w-[1400px]`

---

## 🔍 SEO architecture

### Schema.org per page type
- Homepage: Person + WebSite + ProfessionalService
- Course landing: Course + Person
- Tool: WebApplication + HowTo + FAQPage + BreadcrumbList
- Blog list: Blog + BreadcrumbList
- Blog post: Article + BreadcrumbList
- Case study: Article
- Quiz landing: ItemList
- Quiz: Quiz + BreadcrumbList
- Quiz result: Article + BreadcrumbList

### OG images
- Homepage, course, tools: static gradient with title
- Blog post: cover image (Sanity)
- Quiz result: dynamic per archetype (color + tagline + 3 strengths)

### Sitemap (`/sitemap.xml`)
Auto-generated từ:
- 8 static pages (homepage, ecom-foundation, 4 tools, blog, quiz)
- 3 quiz landing + 27 quiz result archetype pages
- Up to 100 blog posts (sorted publishedAt desc)
- All case studies

ISR refresh: hourly (`revalidate = 3600`).

### RSS
- `/blog/feed.xml` — top 50 posts
- Linked in `<head>` via metadata.alternates

---

## 📊 Analytics events

Custom events fired on:
- `contact_form_submitted` — Homepage contact
- `apply_form_submitted` — Course apply
- (planned) `quiz_started`, `quiz_completed`, `lead_captured`

GA4 dashboard: track at gtag.

---

## 🚀 Deployment

Auto-deploy via Vercel on push to `main`. Branch deploys for any other branch.

**Environment vars required on Vercel** (Settings → Environment Variables):
- All from `.env.local` above

**Build output** (run `npm run build`):
- Static: ~95% of routes
- ISR: blog/case-study detail (60s revalidate), sitemap (3600s)
- Dynamic: API routes, sanity studio, OG image generators

---

## 🔐 Security notes

- Comments: rate-limited 5/min per IP, max 3000 chars
- Quiz leads: rate-limited 10/min per IP
- Blog engagement: view debounced 10min per IP per post
- Seed routes: protected by `SEED_SECRET` env
- Studio auth: handled by Sanity project login
- User auth: **Clerk** (Email + Google) — middleware at repo root, ClerkProvider in root layout
- Auth routes: `/sign-in/[[...sign-in]]`, `/sign-up/[[...sign-up]]`, `/account` (protected, server-side `auth()` check)
- Required env: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- Navbar shows `<UserButton />` when signed in, "Đăng nhập" CTA when signed out (via Clerk `<Show when="...">`)
- No client secrets in repo — all in `.env.local` / Vercel env

---

## 🗺 Roadmap (in priority order)

### Done
- [x] Homepage + Course landing
- [x] 3 Tools (Fee Calc + ROAS + P&L)
- [x] 4 Quizzes (Leadership + MBTI + Career personality + **Chỉ số Ads knowledge** with 30s timer)
- [x] 27 Quiz result SEO pages with dynamic OG image per archetype
- [x] 4 Pillar hub pages (Ecom / Index / Self-Discovery / Career) — backbone SEO
- [x] Blog with sidebar TOC + auto FAQ schema + internal linking + comments + RSS
- [x] 54 blog posts seeded (10 full + 40 drafts + 4 psychology)
- [x] Sanity Studio with custom desk structure + custom document actions
- [x] SVG icon system (no emoji on user UI)
- [x] **Shop** — bank transfer VietQR + auto email delivery (Resend) + Studio "Send file" action
- [x] Product detail pages with gallery + reviews + USP + Schema.org Product
- [x] Resend webhook for email event tracking (delivered/opened/clicked/bounced)
- [x] IndexNow API for fast Bing/Yandex indexing
- [x] Quiz event tracking GA4 (started/completed/lead_captured)
- [x] Lightweight Reveal (native CSS + IntersectionObserver) — saved ~25KB bundle
- [x] Custom 404 page with popular links + pillar pills
- [x] **Auth foundation** — Clerk (Email + Google), sign-in/sign-up pages, `/account` dashboard, Navbar auth state
- [x] **Cart system** — global Context (localStorage-backed), CartButton + badge in Navbar, slide-out CartDrawer, ShopClient refactored to share cart state, signed-in users get name/email/phone auto-prefilled at checkout
- [x] **Cross-device cart sync** — when signed in, cart syncs to Sanity `userCart` doc (debounced POST /api/cart, merge with localStorage on sign-in). Guests keep localStorage-only flow.
- [x] **`/account/orders`** — lists user's orders (matched by clerkUserId OR email — catches guest orders made before sign-in), "Tải lại file" deep-link to existing download token, expired-token notice. Orders placed while signed in auto-attach `clerkUserId`.

### Up next
- [ ] Optional Clerk profile fields: phone + username (for display + contact storage — toggle in Clerk dashboard, code already reads them)
- [ ] `/account/profile` — edit name/phone/avatar (via Clerk `<UserProfile />` embedded)
- [ ] Quiz #5 "Test Content Frameworks" (knowledge format, reuse infra)
- [ ] Tool "Content Cheat Sheet" — interactive framework picker
- [ ] Salary Calculator tool (using UpBase Salary Benchmark 2026)
- [ ] Auto-reply email for quiz leads (Resend nurture sequence)
- [ ] Bookmarks page (`/bookmarks` — localStorage list)
- [ ] AI Copy Generator (Anthropic API, premium feature)
- [ ] Custom Admin Panel (alternative to Sanity Studio if speed becomes issue)

### Maybe
- [ ] Multi-language EN
- [ ] Newsletter (needs Resend or MailerLite)
- [ ] Sentry error tracking
- [ ] A/B testing setup (Vercel)

---

## 🐛 Common issues

**Vercel build fails with "Sanity not configured"**: Check `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, not "placeholder".

**Sanity Studio chậm khi click navigate**: Đây là Sanity behavior — bundle 1.4MB. Mitigations:
- Use custom desk structure (đã làm) → group docs theo category
- Group fields thành tabs (đã làm) → editor load nhanh hơn
- Phương án radical: build custom admin trên Next.js → backlog

**Sitemap không có post mới**: ISR refresh mỗi giờ, hoặc force redeploy.

**Comments không hiện**: Check `approved=true` trong Sanity. (Hiện tại auto-approve, nếu không hiện thì check API logs)

---

## 👤 Author

**Nguyễn Đức Quảng** (Kai)
- Email: qforwork13@gmail.com
- LinkedIn: [duc-quang-nguyen-b7495223a](https://www.linkedin.com/in/duc-quang-nguyen-b7495223a/)
- Zalo: 0868464658

Built with [Claude Code](https://claude.com/claude-code).
