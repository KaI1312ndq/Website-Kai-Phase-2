import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "ndq-portfolio",
  title: "NĐQ Portfolio CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Nội dung")
          .items([
            // ─── BLOG (most-edited) ───────────────────
            S.listItem()
              .title("📝 Blog / Insights")
              .id("posts-root")
              .child(
                S.list()
                  .title("Blog / Insights")
                  .items([
                    S.listItem()
                      .title("⭐ Bài Featured")
                      .child(
                        S.documentList()
                          .title("Bài Featured")
                          .filter(`_type == "post" && featured == true`)
                          .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
                      ),
                    S.listItem()
                      .title("🆕 Mới nhất")
                      .child(
                        S.documentList()
                          .title("Mới nhất")
                          .filter(`_type == "post"`)
                          .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
                      ),
                    S.divider(),
                    // Each category has its own list — fast filter
                    ...[
                      { value: "tiktok", title: "TikTok Shop" },
                      { value: "shopee", title: "Shopee" },
                      { value: "ecom", title: "Ecommerce" },
                      { value: "performance", title: "Performance" },
                      { value: "leadership", title: "Leadership" },
                      { value: "mindset", title: "Mindset" },
                    ].map((cat) =>
                      S.listItem()
                        .title(`📂 ${cat.title}`)
                        .id(`posts-${cat.value}`)
                        .child(
                          S.documentList()
                            .title(`Posts: ${cat.title}`)
                            .filter(`_type == "post" && category == $cat`)
                            .params({ cat: cat.value })
                            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
                        )
                    ),
                    S.divider(),
                    S.listItem()
                      .title("📚 Tất cả bài viết")
                      .child(
                        S.documentList()
                          .title("Tất cả bài viết")
                          .filter(`_type == "post"`)
                          .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
                      ),
                  ])
              ),

            // ─── SHOP ──────────────────────────────────
            S.listItem()
              .title("🛍️ Shop")
              .id("shop-root")
              .child(
                S.list()
                  .title("Shop")
                  .items([
                    S.listItem()
                      .title("📦 Tất cả Sản phẩm")
                      .child(
                        S.documentList()
                          .title("Sản phẩm")
                          .filter(`_type == "product"`)
                          .defaultOrdering([{ field: "order", direction: "asc" }])
                      ),
                    S.divider(),
                    S.listItem()
                      .title("⏳ Đơn chờ thanh toán")
                      .child(
                        S.documentList()
                          .title("Đơn chờ thanh toán")
                          .filter(`_type == "order" && paymentStatus == "pending"`)
                          .defaultOrdering([{ field: "createdAt", direction: "desc" }])
                      ),
                    S.listItem()
                      .title("💰 Đơn đã trả tiền — chưa gửi file")
                      .child(
                        S.documentList()
                          .title("Cần gửi file")
                          .filter(`_type == "order" && paymentStatus == "paid" && deliveryStatus != "delivered"`)
                          .defaultOrdering([{ field: "paidAt", direction: "desc" }])
                      ),
                    S.listItem()
                      .title("✓ Đơn hoàn tất")
                      .child(
                        S.documentList()
                          .title("Đơn đã giao")
                          .filter(`_type == "order" && deliveryStatus == "delivered"`)
                          .defaultOrdering([{ field: "deliveredAt", direction: "desc" }])
                      ),
                    S.listItem()
                      .title("📋 Tất cả đơn (mới nhất)")
                      .child(
                        S.documentList()
                          .title("Tất cả đơn")
                          .filter(`_type == "order"`)
                          .defaultOrdering([{ field: "createdAt", direction: "desc" }])
                      ),
                  ])
              ),

            // ─── QUIZ LEADS ────────────────────────────
            S.listItem()
              .title("🧠 Quiz Leads")
              .id("quiz-leads-root")
              .child(
                S.list()
                  .title("Quiz Leads")
                  .items([
                    S.listItem()
                      .title("🆕 Mới nhất (tất cả)")
                      .child(
                        S.documentList()
                          .title("Tất cả Quiz Leads")
                          .filter(`_type == "quizLead"`)
                          .defaultOrdering([{ field: "createdAt", direction: "desc" }])
                      ),
                    S.listItem()
                      .title("🧠 MBTI")
                      .child(
                        S.documentList()
                          .title("MBTI Leads")
                          .filter(`_type == "quizLead" && quizSlug == "mbti"`)
                          .defaultOrdering([{ field: "createdAt", direction: "desc" }])
                      ),
                    S.listItem()
                      .title("🎯 Phong cách lãnh đạo")
                      .child(
                        S.documentList()
                          .title("Leadership Leads")
                          .filter(`_type == "quizLead" && quizSlug == "phong-cach-lanh-dao"`)
                          .defaultOrdering([{ field: "createdAt", direction: "desc" }])
                      ),
                  ])
              ),

            // ─── COMMENTS (moderation) ─────────────────
            S.listItem()
              .title("💬 Bình luận")
              .id("comments-root")
              .child(
                S.list()
                  .title("Bình luận")
                  .items([
                    S.listItem()
                      .title("🆕 Mới nhất (xoá nếu spam)")
                      .child(
                        S.documentList()
                          .title("Tất cả bình luận")
                          .filter(`_type == "comment"`)
                          .defaultOrdering([{ field: "createdAt", direction: "desc" }])
                      ),
                  ])
              ),

            S.divider(),

            // ─── OTHERS (less-edited) ──────────────────
            S.documentTypeListItem("caseStudy").title("📊 Case Studies"),
            S.documentTypeListItem("brand").title("🏢 Brands"),
            S.documentTypeListItem("testimonial").title("⭐ Testimonials"),
            S.documentTypeListItem("timeline").title("🗓️ Timeline"),

            S.divider(),

            // ─── SETTINGS (singleton) ───────────────────
            S.listItem()
              .title("⚙️ Cài đặt trang")
              .id("settings")
              .child(S.document().schemaType("settings").documentId("settings")),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
