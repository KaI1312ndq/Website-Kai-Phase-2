# NĐQ Portfolio — Next.js + Sanity + Vercel

Personal portfolio & mentoring landing page for Nguyễn Đức Quảng.

## Stack
- **Next.js 14** (App Router)
- **Sanity v3** (CMS)
- **Tailwind CSS** (Styling)
- **Vercel** (Hosting)
- **Resend** (Email — optional)

---

## 🚀 Setup Guide (30 phút)

### Bước 1 — Clone & Install
```bash
git clone https://github.com/kai1312ndq/Website-C-nh-n.git
cd Website-C-nh-n
npm install
```

### Bước 2 — Tạo Sanity Project
1. Vào https://sanity.io/manage
2. Tạo project mới → tên: **ndq-portfolio**
3. Dataset: **production**
4. Copy **Project ID**

### Bước 3 — Tạo file .env.local
```bash
cp .env.example .env.local
```
Điền vào:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123def   # Project ID từ bước 2
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
```

### Bước 4 — Chạy local
```bash
npm run dev
```
- Website: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

### Bước 5 — Deploy lên Vercel
1. Push code lên GitHub
2. Vào https://vercel.com → Import repo
3. Add Environment Variables (copy từ .env.local)
4. Deploy!

### Bước 6 — Config Sanity CORS
Vào https://sanity.io/manage → API → CORS origins
Thêm: `https://your-site.vercel.app`

---

## 📝 Quản lý nội dung qua CMS

Vào `/studio` để:

| Section | Schema |
|---------|--------|
| Blog posts | `post` |
| Case Studies | `caseStudy` |
| Testimonials | `testimonial` |
| Brands | `brand` |
| Timeline | `timeline` |
| Site Settings | `settings` |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Homepage
│   ├── blog/
│   │   ├── page.tsx      # Blog listing
│   │   └── [slug]/       # Blog detail
│   ├── studio/           # Sanity Studio
│   ├── api/contact/      # Contact form API
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── RevealWrapper.tsx
└── lib/
    └── queries.ts        # All GROQ queries

sanity/
├── schemas/
│   ├── post.ts
│   ├── caseStudy.ts
│   └── others.ts
└── lib/
    ├── client.ts
    └── image.ts
```

---

## 🔮 Roadmap tính năng tương lai

- [ ] Newsletter subscription (Resend)
- [ ] Contact form với email notification
- [ ] Google Analytics 4
- [ ] Dark mode toggle
- [ ] CV download page
- [ ] Đa ngôn ngữ VI/EN
- [ ] Case study detail pages
- [ ] Project showcase với filter
