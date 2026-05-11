import { defineField, defineType } from "sanity";

export const voucherType = defineType({
  name: "voucher",
  title: "🎟 Voucher / Mã giảm giá",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Mã voucher",
      type: "string",
      description: "Khách hàng nhập mã này khi checkout. Không phân biệt hoa thường. Vd: WELCOME10, BANBE100, TET2026.",
      validation: (r) => r.required().min(3).max(40).regex(/^[A-Za-z0-9_-]+$/, { name: "alphanumeric" }),
    }),
    defineField({
      name: "displayName",
      title: "Tên hiển thị (optional)",
      type: "string",
      description: "Vd: 'Giảm 50% mừng Tết'. Để trống sẽ dùng mã code.",
    }),
    defineField({
      name: "description",
      title: "Mô tả ngắn",
      type: "text",
      rows: 2,
      description: "Hiển thị trên trang sản phẩm (nếu voucher công khai).",
    }),
    defineField({
      name: "type",
      title: "Loại giảm giá",
      type: "string",
      options: {
        list: [
          { title: "Phần trăm (%)", value: "percent" },
          { title: "Số tiền cố định (VND)", value: "fixed" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
      initialValue: "percent",
    }),
    defineField({
      name: "value",
      title: "Giá trị giảm",
      type: "number",
      description:
        "Nếu loại = Phần trăm: nhập 0–100 (vd 100 = MIỄN PHÍ, không cần chuyển khoản). Nếu loại = Số tiền: nhập VND (vd 50000 = giảm 50k).",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "visibility",
      title: "Hiển thị",
      type: "string",
      options: {
        list: [
          { title: "Công khai — hiện trên trang sản phẩm để khách thấy + click", value: "public" },
          { title: "Ẩn — chỉ áp dụng được khi nhập đúng mã ở checkout", value: "hidden" },
        ],
        layout: "radio",
      },
      initialValue: "hidden",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "active",
      title: "Đang hoạt động",
      type: "boolean",
      initialValue: true,
      description: "Tắt = không ai áp dụng được.",
    }),
    defineField({
      name: "expiresAt",
      title: "Hết hạn lúc",
      type: "datetime",
      description: "Để trống = không hết hạn.",
    }),
    defineField({
      name: "maxUses",
      title: "Số lần dùng tối đa (tổng)",
      type: "number",
      description: "Để trống = không giới hạn. Vd 100 = chỉ 100 đơn đầu tiên áp dụng được.",
    }),
    defineField({
      name: "usedCount",
      title: "Đã dùng (auto-tăng)",
      type: "number",
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: "minOrderValue",
      title: "Đơn tối thiểu (VND)",
      type: "number",
      description: "Áp dụng khi tổng đơn ≥ số này. Để trống = không yêu cầu.",
    }),
    defineField({
      name: "internalNote",
      title: "Ghi chú nội bộ",
      type: "text",
      rows: 2,
      description: "Vd: 'Gửi cho a Hùng để mua P&L', 'Voucher 50% sale Tết'.",
    }),
    defineField({
      name: "createdAt",
      title: "Tạo lúc",
      type: "datetime",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    { title: "Mới nhất", name: "createdAtDesc", by: [{ field: "createdAt", direction: "desc" }] },
    { title: "Mã (A-Z)", name: "codeAsc", by: [{ field: "code", direction: "asc" }] },
  ],
  preview: {
    select: {
      code: "code",
      type: "type",
      value: "value",
      visibility: "visibility",
      active: "active",
      usedCount: "usedCount",
      maxUses: "maxUses",
      expiresAt: "expiresAt",
    },
    prepare({ code, type, value, visibility, active, usedCount, maxUses, expiresAt }) {
      const v = type === "percent" ? `${value}%` : `${(value || 0).toLocaleString("vi-VN")}đ`;
      const expired = expiresAt && new Date(expiresAt).getTime() < Date.now();
      const status = expired ? "⌛" : !active ? "✗" : visibility === "public" ? "🌐" : "🔒";
      const free = type === "percent" && value === 100 ? " · FREE" : "";
      const usage = typeof maxUses === "number" ? ` · ${usedCount || 0}/${maxUses}` : "";
      return {
        title: `${status} ${code} — giảm ${v}${free}`,
        subtitle: `${visibility === "public" ? "Công khai" : "Ẩn"}${usage}`,
      };
    },
  },
});
