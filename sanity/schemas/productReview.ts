import { defineField, defineType } from "sanity";

export const productReviewType = defineType({
  name: "productReview",
  title: "⭐ Đánh giá sản phẩm",
  type: "document",
  fields: [
    defineField({
      name: "product",
      title: "Sản phẩm",
      type: "reference",
      to: [{ type: "product" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "reviewerName",
      title: "Tên khách",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "reviewerRole",
      title: "Vai trò / Công ty (optional)",
      type: "string",
      description: "Vd: 'Marketing Manager — Brand X', 'Sinh viên năm 4 — ĐH Kinh tế'",
    }),
    defineField({
      name: "reviewerAvatar",
      title: "Avatar (optional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "rating",
      title: "Số sao (1-5)",
      type: "number",
      validation: (r) => r.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "content",
      title: "Nội dung đánh giá",
      type: "text",
      rows: 4,
      validation: (r) => r.required().min(20).max(800),
    }),
    defineField({
      name: "verified",
      title: "Khách hàng đã mua (verified)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Featured (hiện đầu)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "date",
      title: "Ngày đánh giá",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    { title: "Featured đầu", name: "featured", by: [{ field: "featured", direction: "desc" }, { field: "date", direction: "desc" }] },
    { title: "Mới nhất", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "reviewerName", rating: "rating", content: "content", verified: "verified" },
    prepare({ title, rating, content, verified }) {
      const stars = "★".repeat(rating || 0) + "☆".repeat(5 - (rating || 0));
      return {
        title: `${verified ? "✓ " : ""}${title} ${stars}`,
        subtitle: typeof content === "string" ? content.slice(0, 80) : "",
      };
    },
  },
});
