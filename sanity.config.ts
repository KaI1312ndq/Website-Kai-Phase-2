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
            S.listItem()
              .title("⚙️ Cài đặt trang")
              .id("settings")
              .child(S.document().schemaType("settings").documentId("settings")),
            S.divider(),
            S.documentTypeListItem("post").title("📝 Blog / Insights"),
            S.documentTypeListItem("caseStudy").title("📊 Case Studies"),
            S.documentTypeListItem("brand").title("🏢 Brands"),
            S.documentTypeListItem("testimonial").title("💬 Testimonials"),
            S.documentTypeListItem("timeline").title("🗓️ Timeline"),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
