import { defineField, defineType } from "sanity";

export const newsletterSubscriberType = defineType({
  name: "newsletterSubscriber",
  title: "Newsletter Subscribers",
  type: "document",
  fields: [
    defineField({ name: "email", title: "Email", type: "string", validation: (r) => r.required().email() }),
    defineField({ name: "source", title: "Nguồn (slug bài viết / page)", type: "string" }),
    defineField({ name: "subscribedAt", title: "Ngày đăng ký", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "unsubscribed", title: "Đã huỷ", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "email", subtitle: "source", date: "subscribedAt" },
    prepare({ title, subtitle, date }) {
      const d = date ? new Date(date).toLocaleDateString("vi-VN") : "";
      return { title: title || "(no email)", subtitle: `${d}${subtitle ? ` · ${subtitle}` : ""}` };
    },
  },
  orderings: [
    { title: "Mới nhất", name: "subscribedDesc", by: [{ field: "subscribedAt", direction: "desc" }] },
  ],
});
