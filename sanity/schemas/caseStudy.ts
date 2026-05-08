import { defineField, defineType } from "sanity";

export const caseStudyType = defineType({
  name: "caseStudy",
  title: "Case Studies",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tên dự án / Tiêu đề", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "brand", title: "Tên thương hiệu (hoặc ngành hàng)", type: "string" }),
    defineField({ name: "coverImage", title: "Ảnh bìa", type: "image", options: { hotspot: true } }),
    defineField({ name: "platforms", title: "Nền tảng", type: "array", of: [{ type: "string" }],
      options: { list: ["TikTok Shop", "Shopee", "Meta Ads", "Google Ads", "Website"] }
    }),
    defineField({ name: "category", title: "Mảng", type: "string",
      options: { list: [
        { title: "Performance Marketing", value: "performance" },
        { title: "Team Building", value: "team" },
        { title: "Ecom Strategy", value: "strategy" },
      ]}
    }),
    defineField({ name: "role", title: "Vai trò của tôi", type: "string" }),
    defineField({ name: "headline", title: "Kết quả nổi bật (số lớn)", type: "string" }),
    defineField({ name: "headlineLabel", title: "Nhãn kết quả", type: "string" }),
    defineField({ name: "description", title: "Mô tả ngắn", type: "text", rows: 3 }),
    defineField({ name: "award", title: "Giải thưởng (nếu có)", type: "string" }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Thứ tự hiển thị", type: "number" }),
    defineField({ name: "featured", title: "Nổi bật", type: "boolean", initialValue: false }),
    defineField({
      name: "body", title: "Chi tiết case study",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
  orderings: [{ title: "Thứ tự", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "brand", media: "coverImage" } },
});
