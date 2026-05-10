import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "🛍️ Sản phẩm bán",
  type: "document",
  groups: [
    { name: "main", title: "📝 Thông tin chính", default: true },
    { name: "files", title: "📦 Files" },
    { name: "marketing", title: "🎨 Marketing" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Tên sản phẩm",
      type: "string",
      group: "main",
      validation: (r) => r.required().min(3).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "main",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Mô tả ngắn (1-2 câu)",
      type: "text",
      rows: 2,
      group: "main",
    }),
    defineField({
      name: "longDescription",
      title: "Mô tả dài (200-500 từ)",
      type: "array",
      group: "main",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "bullets",
      title: "Bullets — 'Trong này có gì'",
      type: "array",
      group: "main",
      of: [{ type: "string" }],
      description: "Mỗi dòng 1 highlight, vd: '12 tab Excel theo dõi P&L tháng', 'Auto-format VND đẹp'...",
    }),
    defineField({
      name: "price",
      title: "Giá (VND)",
      type: "number",
      group: "main",
      initialValue: 99000,
      validation: (r) => r.required().min(1000),
    }),
    defineField({
      name: "order",
      title: "Thứ tự hiển thị",
      type: "number",
      group: "main",
      initialValue: 0,
      description: "Số nhỏ hiện trước",
    }),
    defineField({
      name: "active",
      title: "Đang bán",
      type: "boolean",
      group: "main",
      initialValue: true,
    }),

    // Files
    defineField({
      name: "masterFile",
      title: "File chính (gửi sau khi khách thanh toán)",
      type: "file",
      group: "files",
      description: "PDF / Excel / ZIP — file user nhận được sau khi mua.",
    }),
    defineField({
      name: "previewFile",
      title: "File preview (1-2 trang đầu, có watermark)",
      type: "file",
      group: "files",
      description: "Optional. Cho khách xem trước.",
    }),

    // Marketing
    defineField({
      name: "coverImage",
      title: "Ảnh bìa chính",
      type: "image",
      group: "marketing",
      options: { hotspot: true },
    }),
    defineField({
      name: "mockupImages",
      title: "Mockup screenshots (3-5 ảnh)",
      type: "array",
      group: "marketing",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "category",
      title: "Loại sản phẩm",
      type: "string",
      group: "marketing",
      options: {
        list: [
          { title: "Excel Template", value: "excel" },
          { title: "PDF Report", value: "pdf" },
          { title: "Document Templates", value: "templates" },
          { title: "Bundle / Combo", value: "bundle" },
        ],
      },
    }),
  ],
  orderings: [
    { title: "Thứ tự hiển thị", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Tên A→Z", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", media: "coverImage", price: "price", active: "active" },
    prepare({ title, media, price, active }) {
      return {
        title: `${active ? "" : "[INACTIVE] "}${title || "(không tên)"}`,
        subtitle: typeof price === "number" ? `${price.toLocaleString("vi-VN")}đ` : "",
        media,
      };
    },
  },
});
