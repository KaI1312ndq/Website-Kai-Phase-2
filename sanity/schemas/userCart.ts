import { defineField, defineType } from "sanity";

export const userCartType = defineType({
  name: "userCart",
  title: "🛒 Giỏ hàng user (Clerk)",
  type: "document",
  fields: [
    defineField({
      name: "clerkUserId",
      title: "Clerk User ID",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string", title: "Product _id" },
            { name: "slug", type: "string" },
            { name: "title", type: "string" },
            { name: "price", type: "number" },
            { name: "image", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "updatedAt",
      title: "Cập nhật lúc",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: { userId: "clerkUserId", items: "items", updatedAt: "updatedAt" },
    prepare({ userId, items, updatedAt }) {
      const count = Array.isArray(items) ? items.length : 0;
      const date = updatedAt ? new Date(updatedAt).toLocaleString("vi-VN") : "";
      return {
        title: `🛒 ${count} SP — ${userId || "(no user)"}`,
        subtitle: date,
      };
    },
  },
});
