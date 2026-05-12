import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theme Preview · Dark / Light Mock",
  robots: { index: false, follow: false },
};

/**
 * Mock page side-by-side light + dark variants để demo light theme proposal.
 * Sẽ remove sau khi finalize design.
 */

const DARK = {
  bgPage: "#050a1c",
  bgCard: "var(--db-85)",
  bgCardGrad: "linear-gradient(180deg, var(--dg-50), var(--db-85))",
  bgSurface: "var(--st-04)",
  bgSurfaceHover: "var(--st-08)",
  textPrimary: "#ffffff",
  textMuted: "var(--st-65)",
  textDim: "var(--st-45)",
  border: "var(--st-10)",
  borderSubtle: "var(--st-06)",
  accent: "#146ef5",
  accentSoft: "#7da9ff",
  gradPrimary: "linear-gradient(135deg, #4ad6ff, #146ef5, #7a3dff)",
  gradText: "linear-gradient(135deg, #4ad6ff, #146ef5)",
  shadow: "0 12px 32px rgba(5,10,31,0.55)",
  successBg: "rgba(95,255,170,0.13)",
  successText: "#5fffaa",
  warnBg: "rgba(255,212,121,0.13)",
  warnText: "#ffd479",
  blob1: "radial-gradient(circle, rgba(74,214,255,0.18), transparent 70%)",
  blob2: "radial-gradient(circle, rgba(122,61,255,0.16), transparent 70%)",
};

const LIGHT = {
  bgPage: "#f5f9ff",
  bgCard: "#ffffff",
  bgCardGrad: "linear-gradient(180deg, #ffffff, #f0f7ff)",
  bgSurface: "#eef4ff",
  bgSurfaceHover: "#e2ecff",
  textPrimary: "#0f1b3d",
  textMuted: "#5b6a92",
  textDim: "#94a3c4",
  border: "rgba(15,27,61,0.10)",
  borderSubtle: "rgba(15,27,61,0.05)",
  accent: "#0ea5e9",
  accentSoft: "#0284c7",
  gradPrimary: "linear-gradient(135deg, #38bdf8, #0ea5e9, #6366f1)",
  gradText: "linear-gradient(135deg, #0ea5e9, #2563eb)",
  shadow: "0 12px 32px rgba(14,165,233,0.12)",
  successBg: "#dcfce7",
  successText: "#15803d",
  warnBg: "#fef3c7",
  warnText: "#b45309",
  blob1: "radial-gradient(circle, rgba(56,189,248,0.30), transparent 70%)",
  blob2: "radial-gradient(circle, rgba(99,102,241,0.22), transparent 70%)",
};

type Theme = typeof DARK;

export default function ThemePreviewPage() {
  return (
    <div className="min-h-screen" style={{ background: "#1a1d2e", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
        <header style={{ marginBottom: "1.5rem", color: "white" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.25rem" }}>Theme Preview · Dark vs Light Proposal</h1>
          <p style={{ fontSize: "0.85rem", opacity: 0.6 }}>
            So sánh cả 2 mode trên cùng component. Cuộn xuống xem các block: Hero, Stat cards, Blog card, Form, Admin sidebar, Table, Badges.
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>
          <ThemeColumn theme={DARK} label="Dark (hiện tại)" />
          <ThemeColumn theme={LIGHT} label="Light (đề xuất)" />
        </div>

        <footer style={{ marginTop: "2rem", color: "white", opacity: 0.6, fontSize: "0.78rem", textAlign: "center" }}>
          Mock này dùng inline style cho demo. Khi finalize sẽ migrate sang CSS variables để toggle real-time qua data-theme attribute.
        </footer>
      </div>
    </div>
  );
}

function ThemeColumn({ theme: t, label }: { theme: Theme; label: string }) {
  return (
    <div
      style={{
        background: t.bgPage,
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        boxShadow: t.shadow,
      }}
    >
      {/* Header bar */}
      <div
        style={{
          padding: "0.75rem 1.25rem",
          background: t.bgCard,
          borderBottom: `1px solid ${t.border}`,
          color: t.textPrimary,
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          position: "relative",
          zIndex: 2,
        }}
      >
        {label}
      </div>

      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: "300px", height: "300px", background: t.blob1, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "260px", height: "260px", background: t.blob2, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, padding: "1.5rem 1.25rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

        {/* HERO */}
        <Section title="Hero" t={t}>
          <div style={{ padding: "1.5rem 1.25rem" }}>
            <div style={{ display: "inline-block", padding: "0.3rem 0.7rem", borderRadius: "999px", background: t.bgSurface, color: t.accent, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Digital Marketing Manager
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, lineHeight: 1.15, color: t.textPrimary, marginBottom: "0.5rem" }}>
              Tăng trưởng đa kênh{" "}
              <span style={{ background: t.gradText, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                quy mô 50-70 tỷ
              </span>
            </h2>
            <p style={{ fontSize: "0.82rem", color: t.textMuted, lineHeight: 1.6, marginBottom: "1rem" }}>
              60+ dự án trên TikTok Shop, Shopee, Meta, Google. Coaching cho 200+ marketer trẻ.
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button style={{ padding: "0.55rem 1rem", borderRadius: "8px", background: t.gradPrimary, color: "#fff", fontSize: "0.82rem", fontWeight: 600, border: "none", cursor: "pointer" }}>
                Đặt lịch tư vấn
              </button>
              <button style={{ padding: "0.55rem 1rem", borderRadius: "8px", background: t.bgSurface, color: t.textPrimary, fontSize: "0.82rem", fontWeight: 600, border: `1px solid ${t.border}`, cursor: "pointer" }}>
                Xem case study
              </button>
            </div>
          </div>
        </Section>

        {/* STATS */}
        <Section title="Stat cards" t={t}>
          <div style={{ padding: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
            {[
              ["Doanh thu", "70 tỷ", "/ tháng"],
              ["Dự án", "60+", "đã chạy"],
              ["Học viên", "200+", "đã coach"],
            ].map(([label, value, sub]) => (
              <div key={label} style={{ padding: "0.85rem", borderRadius: "10px", background: t.bgCardGrad, border: `1px solid ${t.border}` }}>
                <div style={{ fontSize: "0.65rem", color: t.textMuted, marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: t.textPrimary, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: "0.66rem", color: t.textDim, marginTop: "0.15rem" }}>{sub}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* BLOG CARD */}
        <Section title="Blog card" t={t}>
          <div style={{ padding: "1rem" }}>
            <article style={{ borderRadius: "12px", overflow: "hidden", background: t.bgCard, border: `1px solid ${t.border}` }}>
              <div style={{ height: "120px", background: t.gradPrimary, position: "relative" }}>
                <div style={{ position: "absolute", top: "0.5rem", left: "0.5rem", padding: "0.2rem 0.5rem", borderRadius: "6px", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: "0.65rem", fontWeight: 600 }}>
                  Ads scaling
                </div>
              </div>
              <div style={{ padding: "0.85rem" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: t.textPrimary, marginBottom: "0.35rem", lineHeight: 1.3 }}>
                  Scaling Meta Ads từ 100M lên 1 tỷ trong 30 ngày
                </h3>
                <p style={{ fontSize: "0.75rem", color: t.textMuted, lineHeight: 1.5, marginBottom: "0.5rem" }}>
                  Framework 5-bước scale ngân sách không vỡ ROAS, đã áp dụng cho 3 brand thời trang.
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: t.textDim }}>
                  <span>10 phút đọc</span>
                  <span>12/05/2026</span>
                </div>
              </div>
            </article>
          </div>
        </Section>

        {/* FORM */}
        <Section title="Form" t={t}>
          <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", color: t.textMuted, marginBottom: "0.3rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Họ và tên</label>
              <div style={{ padding: "0.55rem 0.75rem", borderRadius: "8px", background: t.bgSurface, border: `1px solid ${t.border}`, color: t.textPrimary, fontSize: "0.85rem" }}>Nguyễn Đức Quảng</div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", color: t.textMuted, marginBottom: "0.3rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Email</label>
              <div style={{ padding: "0.55rem 0.75rem", borderRadius: "8px", background: t.bgSurface, border: `1px solid ${t.accent}`, color: t.textPrimary, fontSize: "0.85rem", boxShadow: `0 0 0 3px ${t.accent}22` }}>qforwork13@gmail.com</div>
            </div>
            <button style={{ padding: "0.65rem 1rem", borderRadius: "8px", background: t.gradPrimary, color: "#fff", fontSize: "0.85rem", fontWeight: 700, border: "none", cursor: "pointer", marginTop: "0.25rem" }}>
              Gửi đăng ký
            </button>
          </div>
        </Section>

        {/* ADMIN SIDEBAR + TABLE */}
        <Section title="Admin dashboard" t={t}>
          <div style={{ padding: "1rem", display: "grid", gridTemplateColumns: "140px 1fr", gap: "0.75rem" }}>
            {/* Mini sidebar */}
            <div style={{ background: t.bgCard, borderRadius: "10px", border: `1px solid ${t.borderSubtle}`, padding: "0.75rem 0.5rem" }}>
              <div style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: t.textDim, fontWeight: 700, padding: "0 0.5rem", marginBottom: "0.5rem" }}>BÁN HÀNG</div>
              {["Đơn hàng", "Vouchers"].map((item, i) => (
                <div key={item} style={{
                  padding: "0.4rem 0.5rem 0.4rem 0.6rem", borderRadius: "6px", fontSize: "0.75rem",
                  color: i === 0 ? t.textPrimary : t.textMuted,
                  background: i === 0 ? `${t.accent}1a` : "transparent",
                  fontWeight: i === 0 ? 600 : 500, position: "relative",
                }}>
                  {i === 0 && <span style={{ position: "absolute", left: 0, top: "0.4rem", bottom: "0.4rem", width: "3px", borderRadius: "2px", background: t.gradPrimary }} />}
                  {item}
                </div>
              ))}
            </div>
            {/* Mini table */}
            <div style={{ background: t.bgCard, borderRadius: "10px", border: `1px solid ${t.borderSubtle}`, overflow: "hidden" }}>
              <div style={{ padding: "0.5rem 0.75rem", background: t.bgSurface, fontSize: "0.6rem", color: t.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", display: "grid", gridTemplateColumns: "1fr 1fr 0.7fr", gap: "0.4rem", fontWeight: 700 }}>
                <span>Đơn</span><span>Tổng</span><span>Trạng thái</span>
              </div>
              {[
                ["NDQ-001", "299k", "paid"],
                ["NDQ-002", "499k", "pending"],
                ["NDQ-003", "199k", "paid"],
              ].map(([id, total, status], i) => (
                <div key={id} style={{ padding: "0.45rem 0.75rem", display: "grid", gridTemplateColumns: "1fr 1fr 0.7fr", gap: "0.4rem", fontSize: "0.75rem", color: t.textPrimary, borderTop: i > 0 ? `1px solid ${t.borderSubtle}` : "none", alignItems: "center" }}>
                  <span style={{ fontFamily: "ui-monospace, monospace", color: t.accentSoft }}>{id}</span>
                  <span style={{ fontWeight: 600 }}>{total}</span>
                  <Badge label={status} bg={status === "paid" ? t.successBg : t.warnBg} color={status === "paid" ? t.successText : t.warnText} />
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* BADGES */}
        <Section title="Badges & tags" t={t}>
          <div style={{ padding: "1rem", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            <Badge label="Đã thanh toán" bg={t.successBg} color={t.successText} />
            <Badge label="Chờ gửi file" bg={t.warnBg} color={t.warnText} />
            <Badge label="Trending" bg={`${t.accent}22`} color={t.accent} />
            <Badge label="Free" bg={t.bgSurface} color={t.textMuted} />
            <Badge label="New" bg={t.gradPrimary} color="#fff" />
          </div>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, t, children }: { title: string; t: Theme; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.16em", color: t.textDim, fontWeight: 700, marginBottom: "0.4rem", paddingLeft: "0.25rem" }}>{title}</div>
      <div style={{ borderRadius: "14px", background: t.bgCard, border: `1px solid ${t.border}`, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

function Badge({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span style={{ padding: "0.2rem 0.55rem", borderRadius: "6px", background: bg, color, fontSize: "0.68rem", fontWeight: 700, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}
