import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog / Insights",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tiêu đề", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug (URL)", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Tóm tắt ngắn", type: "text", rows: 3 }),
    defineField({ name: "coverImage", title: "Ảnh bìa", type: "image", options: { hotspot: true } }),
    defineField({ name: "category", title: "Danh mục", type: "string",
      options: { list: [
        { title: "Ecommerce", value: "ecom" },
        { title: "Performance Marketing", value: "performance" },
        { title: "Leadership", value: "leadership" },
        { title: "TikTok Shop", value: "tiktok" },
        { title: "Shopee", value: "shopee" },
        { title: "Tư duy & Góc nhìn", value: "mindset" },
      ]}
    }),
    defineField({ name: "readTime", title: "Thời gian đọc (phút)", type: "number" }),
    defineField({ name: "publishedAt", title: "Ngày đăng", type: "datetime" }),
    defineField({ name: "featured", title: "Bài viết nổi bật", type: "boolean", initialValue: false }),
    defineField({
      name: "body", title: "Nội dung",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        { type: "code", options: { language: "javascript" } },
      ],
    }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 2 }),
  ],
  orderings: [{ title: "Mới nhất", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", media: "coverImage", subtitle: "publishedAt" } },
});
