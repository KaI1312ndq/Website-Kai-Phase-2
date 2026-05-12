/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import type { CVData, CVTemplate } from "./types";

// Register Vietnamese-friendly font (Inter / system)
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7SUc.ttf", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.ttf", fontWeight: 700 },
  ],
});

const COLORS = {
  ats: { accent: "#1f2937", muted: "#4b5563", bg: "#ffffff", divider: "#e5e7eb" },
  visual: { accent: "#1d4ed8", muted: "#475569", bg: "#ffffff", divider: "#dbeafe" },
  hybrid: { accent: "#0f172a", muted: "#475569", bg: "#ffffff", divider: "#cbd5e1" },
};

const sharedStyles = StyleSheet.create({
  page: { padding: 32, fontFamily: "Inter", fontSize: 10, color: "#111827", backgroundColor: "#ffffff" },
  watermark: {
    position: "absolute",
    bottom: 10,
    left: 32,
    right: 32,
    textAlign: "center",
    fontSize: 7.5,
    color: "#9ca3af",
  },
  name: { fontSize: 22, fontWeight: 700, marginBottom: 2 },
  tagline: { fontSize: 11, marginBottom: 8 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, fontSize: 9, marginBottom: 12 },
  sectionTitle: { fontSize: 11, fontWeight: 700, marginTop: 12, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 },
  expRole: { fontSize: 11, fontWeight: 600 },
  expCompany: { fontSize: 10, marginBottom: 1 },
  expDate: { fontSize: 9, color: "#6b7280" },
  bullet: { flexDirection: "row", marginTop: 2 },
  bulletDot: { width: 8, fontSize: 10 },
  bulletText: { flex: 1, fontSize: 10, lineHeight: 1.4 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  skillPill: { fontSize: 9, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3, marginRight: 3, marginBottom: 3 },
});

function fmtDate(d: string) {
  if (!d) return "";
  if (d.toLowerCase() === "present") return "Hiện tại";
  return d;
}

function ContactLine({ data, color }: { data: CVData; color: string }) {
  const p = data.personal;
  const items = [p.email, p.phone, p.location, p.linkedinUrl, p.portfolioUrl].filter(Boolean);
  return (
    <View style={sharedStyles.contactRow}>
      {items.map((it, i) => (
        <Text key={i} style={{ color }}>
          {i > 0 ? "·  " : ""}{it}
        </Text>
      ))}
    </View>
  );
}

function ExperienceBlock({ data, color }: { data: CVData; color: string }) {
  if (!data.experience?.length) return null;
  return (
    <View>
      <Text style={[sharedStyles.sectionTitle, { color }]}>Kinh nghiệm</Text>
      {data.experience.map((e) => (
        <View key={e.id} style={{ marginBottom: 8 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={sharedStyles.expRole}>{e.role}</Text>
            <Text style={sharedStyles.expDate}>{fmtDate(e.startDate)} - {fmtDate(e.endDate)}</Text>
          </View>
          <Text style={[sharedStyles.expCompany, { color }]}>{e.company}{e.location ? ` · ${e.location}` : ""}</Text>
          {e.bullets.map((b, j) => (
            <View key={j} style={sharedStyles.bullet}>
              <Text style={sharedStyles.bulletDot}>•</Text>
              <Text style={sharedStyles.bulletText}>{b}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function EducationBlock({ data, color }: { data: CVData; color: string }) {
  if (!data.education?.length) return null;
  return (
    <View>
      <Text style={[sharedStyles.sectionTitle, { color }]}>Học vấn</Text>
      {data.education.map((e) => (
        <View key={e.id} style={{ marginBottom: 5 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 10, fontWeight: 600 }}>{e.degree}{e.field ? ` - ${e.field}` : ""}</Text>
            <Text style={sharedStyles.expDate}>{fmtDate(e.startDate)} - {fmtDate(e.endDate)}</Text>
          </View>
          <Text style={{ fontSize: 10, color }}>{e.school}{e.gpa ? ` · GPA ${e.gpa}` : ""}</Text>
          {e.activities && <Text style={{ fontSize: 9, color: "#6b7280", marginTop: 1 }}>{e.activities}</Text>}
        </View>
      ))}
    </View>
  );
}

function SkillsBlock({ data, color, divider }: { data: CVData; color: string; divider: string }) {
  const hasAny = data.skills.hard.length || data.skills.soft.length || data.skills.languages.length;
  if (!hasAny) return null;
  return (
    <View>
      <Text style={[sharedStyles.sectionTitle, { color }]}>Kỹ năng</Text>
      {data.skills.hard.length > 0 && (
        <View style={{ marginBottom: 4 }}>
          <Text style={{ fontSize: 9, fontWeight: 600, marginBottom: 2 }}>Hard skills</Text>
          <View style={sharedStyles.skillsRow}>
            {data.skills.hard.map((s, i) => (
              <Text key={i} style={[sharedStyles.skillPill, { backgroundColor: divider }]}>{s}</Text>
            ))}
          </View>
        </View>
      )}
      {data.skills.soft.length > 0 && (
        <View style={{ marginBottom: 4 }}>
          <Text style={{ fontSize: 9, fontWeight: 600, marginBottom: 2 }}>Soft skills</Text>
          <Text style={{ fontSize: 10 }}>{data.skills.soft.join(", ")}</Text>
        </View>
      )}
      {data.skills.languages.length > 0 && (
        <View>
          <Text style={{ fontSize: 9, fontWeight: 600, marginBottom: 2 }}>Ngôn ngữ</Text>
          <Text style={{ fontSize: 10 }}>
            {data.skills.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
          </Text>
        </View>
      )}
    </View>
  );
}

function ProjectsBlock({ data, color }: { data: CVData; color: string }) {
  if (!data.projects?.length) return null;
  return (
    <View>
      <Text style={[sharedStyles.sectionTitle, { color }]}>Projects</Text>
      {data.projects.map((p) => (
        <View key={p.id} style={{ marginBottom: 4 }}>
          <Text style={{ fontSize: 10, fontWeight: 600 }}>{p.name}{p.tech ? ` · ${p.tech}` : ""}</Text>
          <Text style={{ fontSize: 10, lineHeight: 1.4 }}>{p.description}</Text>
          {p.url && <Link src={p.url}><Text style={{ fontSize: 9, color }}>{p.url}</Text></Link>}
        </View>
      ))}
    </View>
  );
}

function CertificationsBlock({ data, color }: { data: CVData; color: string }) {
  if (!data.certifications?.length) return null;
  return (
    <View>
      <Text style={[sharedStyles.sectionTitle, { color }]}>Chứng chỉ</Text>
      {data.certifications.map((c) => (
        <View key={c.id} style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
          <Text style={{ fontSize: 10 }}>{c.name}<Text style={{ color }}> · {c.issuer}</Text></Text>
          <Text style={sharedStyles.expDate}>{c.date}</Text>
        </View>
      ))}
    </View>
  );
}

export function CVDocument({ data, template, watermark }: { data: CVData; template: CVTemplate; watermark?: boolean }) {
  const c = COLORS[template];
  const p = data.personal;

  if (template === "visual") {
    return (
      <Document>
        <Page size="A4" style={sharedStyles.page}>
          <View style={{ backgroundColor: c.accent, padding: 18, marginHorizontal: -32, marginTop: -32, marginBottom: 14 }}>
            <Text style={[sharedStyles.name, { color: "#ffffff" }]}>{p.fullName || "Họ tên"}</Text>
            {p.tagline && <Text style={[sharedStyles.tagline, { color: "#dbeafe" }]}>{p.tagline}</Text>}
          </View>
          <ContactLine data={data} color={c.muted} />
          {data.summary && <Text style={{ fontSize: 10, lineHeight: 1.5, marginBottom: 8 }}>{data.summary}</Text>}
          <ExperienceBlock data={data} color={c.accent} />
          <EducationBlock data={data} color={c.accent} />
          <SkillsBlock data={data} color={c.accent} divider={c.divider} />
          <ProjectsBlock data={data} color={c.accent} />
          <CertificationsBlock data={data} color={c.accent} />
          {watermark && (
            <Text style={sharedStyles.watermark} fixed>
              CV miễn phí · Made with nguyenducquang.website/tools/cv-builder
            </Text>
          )}
        </Page>
      </Document>
    );
  }

  // ATS + Hybrid: plain layout
  return (
    <Document>
      <Page size="A4" style={sharedStyles.page}>
        <View style={{ marginBottom: 8 }}>
          <Text style={[sharedStyles.name, { color: c.accent }]}>{p.fullName || "Họ tên"}</Text>
          {p.tagline && <Text style={[sharedStyles.tagline, { color: c.muted }]}>{p.tagline}</Text>}
        </View>
        <ContactLine data={data} color={c.muted} />
        {template === "hybrid" && <View style={{ borderBottomWidth: 1, borderBottomColor: c.divider, marginBottom: 4 }} />}
        {data.summary && <Text style={{ fontSize: 10, lineHeight: 1.5, marginBottom: 6 }}>{data.summary}</Text>}
        <ExperienceBlock data={data} color={c.accent} />
        <EducationBlock data={data} color={c.accent} />
        <SkillsBlock data={data} color={c.accent} divider={c.divider} />
        <ProjectsBlock data={data} color={c.accent} />
        <CertificationsBlock data={data} color={c.accent} />
        {watermark && (
          <Text style={sharedStyles.watermark} fixed>
            CV miễn phí · Made with nguyenducquang.website/tools/cv-builder
          </Text>
        )}
      </Page>
    </Document>
  );
}
