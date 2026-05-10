import { defineField, defineType } from "sanity";

export const commentType = defineType({
  name: "comment",
  title: "Bình luận",
  type: "document",
  fields: [
    defineField({
      name: "post",
      title: "Bài viết",
      type: "reference",
      to: [{ type: "post" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "authorName",
      title: "Tên người bình luận",
      type: "string",
      validation: (r) => r.required().min(1).max(80),
    }),
    defineField({
      name: "authorEmail",
      title: "Email (riêng tư, không hiện public)",
      type: "string",
      hidden: false,
    }),
    defineField({
      name: "content",
      title: "Nội dung bình luận",
      type: "text",
      rows: 4,
      validation: (r) => r.required().min(1).max(3000),
    }),
    defineField({
      name: "approved",
      title: "Đã duyệt (hiện public)",
      type: "boolean",
      initialValue: false,
      description: "Tick vào đây sau khi đọc nội dung — comment sẽ hiện trên blog.",
    }),
    defineField({
      name: "parent",
      title: "Trả lời comment khác (optional)",
      type: "reference",
      to: [{ type: "comment" }],
    }),
    defineField({
      name: "createdAt",
      title: "Thời gian gửi",
      type: "datetime",
      readOnly: true,
    }),
  ],
  orderings: [{ title: "Mới nhất", name: "createdAtDesc", by: [{ field: "createdAt", direction: "desc" }] }],
  preview: {
    select: { title: "authorName", subtitle: "content", approved: "approved" },
    prepare({ title, subtitle, approved }) {
      return {
        title: `${approved ? "✅" : "⏳"} ${title}`,
        subtitle: typeof subtitle === "string" ? subtitle.slice(0, 80) : "",
      };
    },
  },
});
