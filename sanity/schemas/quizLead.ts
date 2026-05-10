import { defineField, defineType } from "sanity";

export const quizLeadType = defineType({
  name: "quizLead",
  title: "Quiz Lead",
  type: "document",
  fields: [
    defineField({ name: "quizSlug", title: "Quiz", type: "string", validation: (r) => r.required() }),
    defineField({ name: "quizName", title: "Quiz Name", type: "string" }),
    defineField({ name: "resultType", title: "Result type / archetype", type: "string" }),
    defineField({ name: "name", title: "Tên", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Số điện thoại", type: "string" }),
    defineField({ name: "scoresJson", title: "Scores JSON", type: "text", rows: 3 }),
    defineField({ name: "createdAt", title: "Thời gian", type: "datetime", readOnly: true }),
    defineField({ name: "ipHash", title: "IP hash", type: "string", readOnly: true }),
  ],
  orderings: [{ title: "Mới nhất", name: "createdAtDesc", by: [{ field: "createdAt", direction: "desc" }] }],
  preview: {
    select: { title: "name", subtitle: "resultType", quiz: "quizSlug", date: "createdAt" },
    prepare({ title, subtitle, quiz, date }) {
      const d = date ? new Date(date).toLocaleDateString("vi-VN") : "";
      return {
        title: `${title || "(không tên)"} → ${subtitle || ""}`,
        subtitle: `${quiz} · ${d}`,
      };
    },
  },
});
