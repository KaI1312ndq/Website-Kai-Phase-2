import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Tên", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Chức vụ", type: "string" }),
    defineField({ name: "company", title: "Công ty", type: "string" }),
    defineField({ name: "avatar", title: "Ảnh đại diện", type: "image", options: { hotspot: true } }),
    defineField({ name: "content", title: "Nội dung nhận xét", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "rating", title: "Rating (1-5)", type: "number", validation: (r) => r.min(1).max(5), initialValue: 5 }),
    defineField({ name: "order", title: "Thứ tự", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "company" } },
});

export const brandType = defineType({
  name: "brand",
  title: "Brands đã làm việc",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Tên brand", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "url", title: "Website", type: "url" }),
    defineField({ name: "order", title: "Thứ tự", type: "number" }),
    defineField({ name: "featured", title: "Hiển thị", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "name", media: "logo" } },
});

export const timelineType = defineType({
  name: "timeline",
  title: "Hành trình / Timeline",
  type: "document",
  fields: [
    defineField({ name: "year", title: "Năm / Khoảng thời gian", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Chức vụ & Công ty", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Mô tả", type: "text", rows: 3 }),
    defineField({ name: "current", title: "Công việc hiện tại", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Thứ tự (1 = mới nhất)", type: "number" }),
  ],
  orderings: [{ title: "Thứ tự", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "year" } },
});

export const settingsType = defineType({
  name: "settings",
  title: "Cài đặt trang",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    defineField({ name: "name", title: "Tên hiển thị", type: "string", initialValue: "Nguyễn Đức Quảng" }),
    defineField({ name: "tagline", title: "Tagline", type: "string", initialValue: "Ecom Growth Expert & Team Builder" }),
    defineField({ name: "heroTitle", title: "Hero Title (3 dòng, dùng | để tách)", type: "string", initialValue: "Build teams.|Scale brands.|Grow smarter." }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text", rows: 2 }),
    defineField({ name: "email", title: "Email", type: "string", initialValue: "qforwork13@gmail.com" }),
    defineField({ name: "zalo", title: "Số Zalo", type: "string", initialValue: "0868464658" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "photo", title: "Ảnh chân dung", type: "image", options: { hotspot: true } }),
    defineField({ name: "cvFile", title: "File CV (PDF)", type: "file" }),
    defineField({ name: "availableForWork", title: "Đang nhận dự án", type: "boolean", initialValue: true }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
