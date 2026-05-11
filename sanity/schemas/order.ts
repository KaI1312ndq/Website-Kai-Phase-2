import { defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "📦 Đơn hàng",
  type: "document",
  fields: [
    defineField({
      name: "orderNumber",
      title: "Mã đơn (auto-gen)",
      type: "string",
      readOnly: true,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "customer",
      title: "Khách hàng",
      type: "object",
      fields: [
        { name: "name", title: "Tên", type: "string", validation: (r) => r.required() },
        { name: "email", title: "Email", type: "string", validation: (r) => r.required() },
        { name: "phone", title: "SĐT", type: "string" },
      ],
    }),
    defineField({
      name: "items",
      title: "Items đã mua",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "product", type: "reference", to: [{ type: "product" }] },
            { name: "title", type: "string" },
            { name: "price", type: "number" },
          ],
          preview: {
            select: { title: "title", price: "price" },
            prepare({ title, price }) {
              return {
                title: title || "(SP)",
                subtitle: typeof price === "number" ? `${price.toLocaleString("vi-VN")}đ` : "",
              };
            },
          },
        },
      ],
      readOnly: true,
    }),
    defineField({
      name: "subtotal",
      title: "Tổng tiền (chưa giảm)",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "discount",
      title: "Giảm giá combo",
      type: "number",
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: "total",
      title: "Tổng phải trả",
      type: "number",
      readOnly: true,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "paymentStatus",
      title: "Trạng thái thanh toán",
      type: "string",
      options: {
        list: [
          { title: "⏳ Chờ thanh toán", value: "pending" },
          { title: "✓ Đã thanh toán", value: "paid" },
          { title: "✗ Huỷ", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "deliveryStatus",
      title: "Trạng thái giao file",
      type: "string",
      options: {
        list: [
          { title: "⏳ Chưa giao", value: "pending" },
          { title: "✓ Đã gửi email", value: "delivered" },
          { title: "✗ Lỗi gửi", value: "failed" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "downloadToken",
      title: "Download token",
      type: "string",
      readOnly: true,
      description: "Token để tải file. Auto-gen.",
    }),
    defineField({
      name: "downloadExpiresAt",
      title: "Token hết hạn",
      type: "datetime",
      readOnly: true,
      description: "Mặc định 30 ngày kể từ ngày giao file.",
    }),
    defineField({
      name: "createdAt",
      title: "Tạo lúc",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "paidAt",
      title: "Thanh toán lúc",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "deliveredAt",
      title: "Giao file lúc",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "notes",
      title: "Ghi chú",
      type: "text",
      rows: 3,
      description: "Ghi chú từ Quảng (vd lý do huỷ, refund, etc.)",
    }),
    // Resend email tracking
    defineField({
      name: "resendEmailId",
      title: "Resend Email ID",
      type: "string",
      readOnly: true,
      description: "ID của email Resend trả về sau khi gửi",
    }),
    defineField({
      name: "emailDelivered",
      title: "Email đã đến hộp thư",
      type: "boolean",
      readOnly: true,
      initialValue: false,
    }),
    defineField({
      name: "emailOpened",
      title: "Khách đã mở email",
      type: "boolean",
      readOnly: true,
      initialValue: false,
    }),
    defineField({
      name: "emailOpenedAt",
      title: "Mở email lúc",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "emailClicked",
      title: "Khách đã click link tải",
      type: "boolean",
      readOnly: true,
      initialValue: false,
    }),
    defineField({
      name: "emailClickedAt",
      title: "Click link lúc",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "emailBounced",
      title: "Email bounce (sai email)",
      type: "boolean",
      readOnly: true,
      initialValue: false,
    }),
  ],
  orderings: [
    { title: "Mới nhất", name: "createdAtDesc", by: [{ field: "createdAt", direction: "desc" }] },
  ],
  preview: {
    select: {
      title: "customer.name",
      orderNumber: "orderNumber",
      total: "total",
      paymentStatus: "paymentStatus",
      deliveryStatus: "deliveryStatus",
      createdAt: "createdAt",
    },
    prepare({ title, orderNumber, total, paymentStatus, deliveryStatus, createdAt }) {
      const status =
        paymentStatus === "paid" && deliveryStatus === "delivered"
          ? "✓"
          : paymentStatus === "paid"
            ? "💰"
            : paymentStatus === "cancelled"
              ? "✗"
              : "⏳";
      const date = createdAt ? new Date(createdAt).toLocaleDateString("vi-VN") : "";
      return {
        title: `${status} ${orderNumber || "?"} — ${title || "(no name)"}`,
        subtitle: `${typeof total === "number" ? total.toLocaleString("vi-VN") : "?"}đ · ${date}`,
      };
    },
  },
});
