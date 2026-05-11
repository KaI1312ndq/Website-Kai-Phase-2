import { defineField, defineType } from "sanity";

const CATEGORY_LABELS: Record<string, string> = {
  ecom: "Ecommerce",
  performance: "Performance",
  leadership: "Leadership",
  tiktok: "TikTok Shop",
  shopee: "Shopee",
  mindset: "Mindset",
  psychology: "Tâm lý & Phát triển bản thân",
  career: "Hướng nghiệp",
};

export const postType = defineType({
  name: "post",
  title: "Blog / Insights",
  type: "document",
  // Group fields into tabs for cleaner editor — content tab loads first
  groups: [
    { name: "content", title: "📝 Nội dung", default: true },
    { name: "meta", title: "⚙️ Metadata" },
    { name: "seo", title: "🔍 SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Tiêu đề", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug (URL)", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Tóm tắt ngắn (~2-3 câu)", type: "text", rows: 3, group: "content" }),
    defineField({
      name: "body", title: "Nội dung",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        {
          type: "object",
          name: "externalImage",
          title: "Ảnh URL (Unsplash / external)",
          fields: [
            { name: "url", title: "URL ảnh", type: "url", validation: (r: any) => r.required() },
            { name: "alt", title: "Alt text (SEO)", type: "string", validation: (r: any) => r.required() },
            { name: "caption", title: "Chú thích (optional)", type: "string" },
            { name: "credit", title: "Credit (vd: Photo by X on Unsplash)", type: "string" },
          ],
          preview: {
            select: { url: "url", alt: "alt", caption: "caption" },
            prepare: ({ url, alt, caption }: any) => ({ title: caption || alt || "Ảnh URL", subtitle: url }),
          },
        },
        {
          type: "object",
          name: "tableBlock",
          title: "Bảng dữ liệu",
          fields: [
            { name: "headers", title: "Header (tiêu đề cột)", type: "array", of: [{ type: "string" }] },
            {
              name: "rows",
              title: "Rows (mỗi row là mảng cells)",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "row",
                  fields: [{ name: "cells", title: "Cells", type: "array", of: [{ type: "string" }] }],
                  preview: {
                    select: { cells: "cells" },
                    prepare: ({ cells }: any) => ({ title: Array.isArray(cells) ? cells.join(" · ") : "Row" }),
                  },
                },
              ],
            },
            { name: "caption", title: "Caption (optional)", type: "string" },
          ],
          preview: {
            select: { caption: "caption", rows: "rows" },
            prepare: ({ caption, rows }: any) => ({ title: caption || "Bảng", subtitle: `${Array.isArray(rows) ? rows.length : 0} row` }),
          },
        },
      ],
    }),
    defineField({ name: "coverImage", title: "Ảnh bìa", type: "image", group: "meta", options: { hotspot: true } }),
    defineField({ name: "category", title: "Danh mục", type: "string", group: "meta",
      options: { list: Object.entries(CATEGORY_LABELS).map(([value, title]) => ({ value, title })) }
    }),
    defineField({ name: "readTime", title: "Thời gian đọc (phút)", type: "number", group: "meta" }),
    defineField({ name: "publishedAt", title: "Ngày đăng", type: "datetime", group: "meta", initialValue: () => new Date().toISOString() }),
    defineField({ name: "updatedAt", title: "Lần cập nhật cuối", type: "datetime", group: "meta" }),
    defineField({ name: "featured", title: "Bài viết nổi bật ⭐", type: "boolean", group: "meta", initialValue: false }),
    defineField({ name: "viewCount", title: "Lượt xem", type: "number", group: "meta", initialValue: 0, readOnly: true, description: "Tự động đếm — readonly" }),
    defineField({ name: "likeCount", title: "Lượt thích", type: "number", group: "meta", initialValue: 0, readOnly: true, description: "Tự động đếm — readonly" }),
    defineField({
      name: "tags",
      title: "Tags (long-tail keywords)",
      type: "array",
      group: "meta",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Mỗi tag là 1 từ khoá ngắn, viết thường, không dấu (vd: roas, mall-vs-non-mall).",
    }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string", group: "seo", description: "Để trống sẽ dùng Title bài viết. ~60 ký tự là đẹp." }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 2, group: "seo", description: "Để trống sẽ dùng Tóm tắt. ~155 ký tự là đẹp." }),
  ],
  orderings: [
    { title: "Mới nhất", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Cũ nhất", name: "publishedAtAsc", by: [{ field: "publishedAt", direction: "asc" }] },
    { title: "Tiêu đề A→Z", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", media: "coverImage", category: "category", featured: "featured", publishedAt: "publishedAt" },
    prepare({ title, media, category, featured, publishedAt }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString("vi-VN") : "—";
      const cat = category ? CATEGORY_LABELS[category] || category : "?";
      return {
        title: `${featured ? "⭐ " : ""}${title || "(không tiêu đề)"}`,
        subtitle: `${cat} · ${date}`,
        media,
      };
    },
  },
});
