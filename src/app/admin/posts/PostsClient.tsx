"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";

/* ─── Types ─────────────────────────────────────────────────────────── */
type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  featured: boolean;
  featuredOrder?: number;
  publishedAt: string;
  tags?: string[];
  excerpt?: string;
  readTime?: number;
  hasBody: boolean;
  hasCover: boolean;
};

/* ─── Constants ─────────────────────────────────────────────────────── */
const CATEGORIES: Record<string, string> = {
  "unit-economics": "Unit Economics",
  performance: "Performance Marketing",
  tiktok: "TikTok Shop",
  shopee: "Shopee",
  ecom: "Ecommerce",
  career: "Hướng nghiệp",
  psychology: "Tâm lý & Mindset",
  "thue-cong-cu": "Thuế & Công cụ",
  mindset: "Mindset",
  leadership: "Leadership",
};

const CAT_COLORS: Record<string, string> = {
  "unit-economics": "#5fffaa",
  performance: "#7da9ff",
  tiktok: "#f0f",
  shopee: "#EE4D2D",
  ecom: "#4ad6ff",
  career: "#ffd700",
  psychology: "#a78bff",
  "thue-cong-cu": "#ff9f7a",
  mindset: "#a78bff",
  leadership: "#7da9ff",
};

function catColor(cat: string) { return CAT_COLORS[cat] || "#888"; }
function catLabel(cat: string) { return CATEGORIES[cat] || cat || "—"; }

/* ─── Helpers ───────────────────────────────────────────────────────── */
async function apiFetch(url: string, opts?: RequestInit) {
  const r = await fetch(url, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts?.headers || {}) },
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr("");
    try {
      await apiFetch("/api/admin/auth", { method: "POST", body: JSON.stringify({ password: pw }) });
      onLogin();
    } catch { setErr("Sai mật khẩu"); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#08080f" }}>
      <form onSubmit={submit} style={{ width: 360, padding: "40px 36px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 4 }}>🔐 Blog Admin</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>Nhập mật khẩu để tiếp tục</div>
        <input
          type="password" value={pw} onChange={e => setPw(e.target.value)}
          placeholder="Admin password"
          autoFocus
          style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${err ? "#ff6b6b" : "rgba(255,255,255,0.12)"}`, background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 15, outline: "none" }}
        />
        {err && <div style={{ color: "#ff6b6b", fontSize: 13 }}>{err}</div>}
        <button type="submit" disabled={loading} style={{ padding: "12px 0", borderRadius: 10, background: "#146ef5", color: "#fff", fontWeight: 600, fontSize: 15, border: "none", cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Đang kiểm tra..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}

function StatChip({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div style={{ padding: "8px 16px", borderRadius: 24, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 8, alignItems: "center" }}>
      <span style={{ fontSize: 20, fontWeight: 700, color: color || "#fff" }}>{value}</span>
      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function CategoryBadge({ cat, onClick }: { cat: string; onClick?: () => void }) {
  const color = catColor(cat);
  return (
    <span
      onClick={onClick}
      style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: `${color}18`, color, border: `1px solid ${color}40`, cursor: onClick ? "pointer" : "default", whiteSpace: "nowrap", userSelect: "none" }}
    >
      {catLabel(cat)}
    </span>
  );
}

function CategoryDropdown({ current, onSelect, onClose }: { current: string; onSelect: (c: string) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={ref} style={{ position: "absolute", zIndex: 100, top: "100%", left: 0, marginTop: 4, background: "#181828", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: 6, minWidth: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
      {Object.entries(CATEGORIES).map(([key, label]) => (
        <div key={key} onClick={() => onSelect(key)} style={{ padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, color: key === current ? catColor(key) : "rgba(255,255,255,0.8)", background: key === current ? `${catColor(key)}15` : "transparent", display: "flex", alignItems: "center", gap: 8 }}
          onMouseEnter={e => (e.currentTarget.style.background = `${catColor(key)}15`)}
          onMouseLeave={e => (e.currentTarget.style.background = key === current ? `${catColor(key)}15` : "transparent")}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: catColor(key), flexShrink: 0 }} />
          {label}
          {key === current && <span style={{ marginLeft: "auto", fontSize: 10 }}>✓</span>}
        </div>
      ))}
    </div>
  );
}

function NewPostModal({ onClose, onCreated }: { onClose: () => void; onCreated: (post: Post) => void }) {
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", category: "ecom", tags: "", featured: false });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function autoSlug(title: string) {
    return title.toLowerCase()
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a").replace(/[èéẹẻẽêềếệểễ]/g, "e")
      .replace(/[ìíịỉĩ]/g, "i").replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
      .replace(/[ùúụủũưừứựửữ]/g, "u").replace(/[ỳýỵỷỹ]/g, "y")
      .replace(/đ/g, "d").replace(/[^a-z0-9\s-]/g, "").trim()
      .replace(/\s+/g, "-").slice(0, 80);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { setErr("Cần có tiêu đề"); return; }
    setLoading(true); setErr("");
    try {
      const slug = form.slug || autoSlug(form.title);
      const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);
      const data = await apiFetch("/api/admin/posts", { method: "POST", body: JSON.stringify({ ...form, slug, tags }) });
      onCreated({ _id: data.id, title: form.title, slug: { current: slug }, category: form.category, featured: form.featured, publishedAt: new Date().toISOString(), tags, hasBody: false, hasCover: false });
      onClose();
    } catch (e: any) { setErr(e.message); }
    finally { setLoading(false); }
  }

  const label = { color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 4 };
  const input = { padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" as const };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => e.target === e.currentTarget && onClose()}>
      <form onSubmit={submit} style={{ width: "100%", maxWidth: 640, background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.1)", borderBottom: "none", borderRadius: "20px 20px 0 0", padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>+ Bài viết mới</span>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 22, cursor: "pointer", padding: 4 }}>×</button>
        </div>

        <div>
          <div style={label}>Tiêu đề *</div>
          <input style={input} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: autoSlug(e.target.value) }))} placeholder="Tiêu đề bài viết..." autoFocus />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <div style={label}>Slug (URL)</div>
            <input style={input} value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="tu-dong-tao-tu-tieu-de" />
          </div>
          <div>
            <div style={label}>Danh mục</div>
            <select style={{ ...input, cursor: "pointer" }} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>

        <div>
          <div style={label}>Tóm tắt</div>
          <textarea style={{ ...input, resize: "vertical", minHeight: 72 }} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="1-2 câu mô tả ngắn hiển thị trên danh sách..." />
        </div>

        <div>
          <div style={label}>Tags (cách nhau bằng dấu phẩy)</div>
          <input style={input} value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="shopee, phi san, unit economics" />
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} style={{ width: 16, height: 16 }} />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>Đánh dấu là bài nổi bật</span>
        </label>

        {err && <div style={{ color: "#ff6b6b", fontSize: 13 }}>{err}</div>}

        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <button type="submit" disabled={loading} style={{ flex: 1, padding: "12px 0", borderRadius: 10, background: "#146ef5", color: "#fff", fontWeight: 600, fontSize: 15, border: "none", cursor: loading ? "wait" : "pointer" }}>
            {loading ? "Đang tạo..." : "Tạo bài viết"}
          </button>
          <button type="button" onClick={onClose} style={{ padding: "12px 20px", borderRadius: 10, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", fontWeight: 600, fontSize: 15, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function PostsClient({ authed }: { authed: boolean }) {
  const [isAuthed, setIsAuthed] = useState(authed);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [mutating, setMutating] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [bulkCat, setBulkCat] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const lastSelected = useRef<string | null>(null);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2800);
  }

  async function loadPosts() {
    setLoading(true);
    try {
      const data = await apiFetch("/api/admin/posts");
      setPosts(data);
    } catch { showToast("Lỗi tải danh sách", false); }
    finally { setLoading(false); }
  }

  useEffect(() => { if (isAuthed) loadPosts(); }, [isAuthed]);

  // ── Filtered list ──
  const filtered = useMemo(() => {
    let list = posts;
    if (filterCat !== "all") list = list.filter(p => p.category === filterCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || (p.excerpt || "").toLowerCase().includes(q) || (p.tags || []).some(t => t.toLowerCase().includes(q)));
    }
    return list;
  }, [posts, filterCat, search]);

  // ── Category counts ──
  const catCounts = useMemo(() => {
    const m: Record<string, number> = {};
    posts.forEach(p => { m[p.category] = (m[p.category] || 0) + 1; });
    return m;
  }, [posts]);

  // ── Selection ──
  function toggleSelect(id: string, e: React.MouseEvent) {
    if (e.shiftKey && lastSelected.current) {
      const ids = filtered.map(p => p._id);
      const a = ids.indexOf(lastSelected.current);
      const b = ids.indexOf(id);
      const range = ids.slice(Math.min(a, b), Math.max(a, b) + 1);
      setSelected(prev => { const next = new Set(prev); range.forEach(i => next.add(i)); return next; });
    } else {
      setSelected(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
    }
    lastSelected.current = id;
  }
  function toggleSelectAll() {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(p => p._id)));
  }

  // ── Mutations ──
  async function patchPost(id: string, patch: object) {
    setMutating(prev => new Set(prev).add(id));
    try {
      await apiFetch("/api/admin/posts", { method: "PATCH", body: JSON.stringify({ id, patch }) });
      setPosts(prev => prev.map(p => p._id === id ? { ...p, ...patch } : p));
    } catch { showToast("Lỗi cập nhật", false); }
    finally { setMutating(prev => { const n = new Set(prev); n.delete(id); return n; }); }
  }

  async function toggleFeatured(post: Post) {
    await patchPost(post._id, { featured: !post.featured });
    showToast(post.featured ? "Đã bỏ nổi bật" : "Đã đánh dấu nổi bật ⭐");
  }

  async function changeCategory(id: string, cat: string) {
    setEditingCatId(null);
    await patchPost(id, { category: cat });
    showToast("Đã đổi danh mục");
  }

  async function bulkChangeCategory() {
    if (!bulkCat || selected.size === 0) return;
    const ids = Array.from(selected);
    try {
      await apiFetch("/api/admin/posts", { method: "PATCH", body: JSON.stringify({ ids, patch: { category: bulkCat } }) });
      setPosts(prev => prev.map(p => ids.includes(p._id) ? { ...p, category: bulkCat } : p));
      showToast(`Đã đổi ${ids.length} bài sang ${catLabel(bulkCat)}`);
      setSelected(new Set());
    } catch { showToast("Lỗi cập nhật", false); }
  }

  async function bulkToggleFeatured(val: boolean) {
    const ids = Array.from(selected);
    try {
      await apiFetch("/api/admin/posts", { method: "PATCH", body: JSON.stringify({ ids, patch: { featured: val } }) });
      setPosts(prev => prev.map(p => ids.includes(p._id) ? { ...p, featured: val } : p));
      showToast(`${val ? "Đã đánh dấu nổi bật" : "Đã bỏ nổi bật"} ${ids.length} bài`);
      setSelected(new Set());
    } catch { showToast("Lỗi cập nhật", false); }
  }

  async function deletePost(id: string) {
    try {
      await apiFetch("/api/admin/posts", { method: "DELETE", body: JSON.stringify({ id }) });
      setPosts(prev => prev.filter(p => p._id !== id));
      showToast("Đã xoá bài");
    } catch { showToast("Lỗi xoá", false); }
    setDeleteConfirm(null);
  }

  async function bulkDelete() {
    const ids = Array.from(selected);
    try {
      await apiFetch("/api/admin/posts", { method: "DELETE", body: JSON.stringify({ ids }) });
      setPosts(prev => prev.filter(p => !ids.includes(p._id)));
      showToast(`Đã xoá ${ids.length} bài`);
      setSelected(new Set());
    } catch { showToast("Lỗi xoá", false); }
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthed(false);
  }

  if (!isAuthed) return <LoginScreen onLogin={() => setIsAuthed(true)} />;

  const featuredCount = posts.filter(p => p.featured).length;
  const selectedArr = Array.from(selected);

  // date formatter
  function fmtDate(d: string) {
    const dt = new Date(d);
    return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
  }

  /* ── Styles ── */
  const s = {
    wrap: { minHeight: "100vh", background: "#08080f", color: "#fff", fontFamily: "'Inter', -apple-system, sans-serif", fontSize: 14 } as React.CSSProperties,
    header: { display: "flex", alignItems: "center", gap: 16, padding: "18px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.4)", position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)" } as React.CSSProperties,
    table: { width: "100%", borderCollapse: "collapse" as const },
    th: { padding: "10px 14px", textAlign: "left" as const, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.1em", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" },
    td: { padding: "11px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)", verticalAlign: "middle" as const },
  };

  return (
    <div style={s.wrap}>
      {/* Header */}
      <div style={s.header}>
        <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>✍️ Blog Admin</span>
        <div style={{ flex: 1, maxWidth: 340, position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>🔍</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Tìm kiếm tiêu đề, tag..."
            style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => setShowNewPost(true)} style={{ padding: "8px 18px", borderRadius: 10, background: "#146ef5", color: "#fff", fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            + Bài viết mới
          </button>
          <button onClick={loadPosts} style={{ padding: "8px 12px", borderRadius: 10, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontSize: 16 }} title="Làm mới">⟳</button>
          <button onClick={logout} style={{ padding: "8px 14px", borderRadius: 10, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", fontSize: 13 }}>Đăng xuất</button>
        </div>
      </div>

      <div style={{ padding: "20px 24px", maxWidth: 1400, margin: "0 auto" }}>
        {/* Stats */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          <StatChip label="bài viết" value={posts.length} color="#5fffaa" />
          <StatChip label="nổi bật" value={featuredCount} color="#ffd700" />
          <StatChip label="danh mục" value={Object.keys(catCounts).length} color="#7da9ff" />
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {[["all", "Tất cả", posts.length], ...Object.entries(catCounts).sort((a,b)=>b[1]-a[1]).map(([k,v])=>[k, catLabel(k), v])].map(([key, label, count]) => (
            <button key={String(key)} onClick={() => setFilterCat(String(key))}
              style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${filterCat === key ? (key === "all" ? "#146ef5" : catColor(String(key))) : "rgba(255,255,255,0.1)"}`, background: filterCat === key ? (key === "all" ? "rgba(20,110,245,0.18)" : `${catColor(String(key))}18`) : "transparent", color: filterCat === key ? (key === "all" ? "#7da9ff" : catColor(String(key))) : "rgba(255,255,255,0.5)", transition: "all 0.15s" }}>
              {String(label)} <span style={{ opacity: 0.6 }}>({count})</span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: 60, textAlign: "center", color: "rgba(255,255,255,0.3)" }}>Đang tải...</div>
          ) : (
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={{ ...s.th, width: 42 }}>
                    <input type="checkbox" checked={selected.size > 0 && selected.size === filtered.length} ref={el => el && (el.indeterminate = selected.size > 0 && selected.size < filtered.length)} onChange={toggleSelectAll} style={{ cursor: "pointer" }} />
                  </th>
                  <th style={{ ...s.th, width: 36 }}>⭐</th>
                  <th style={s.th}>Tiêu đề</th>
                  <th style={{ ...s.th, width: 160 }}>Danh mục</th>
                  <th style={{ ...s.th, width: 90 }}>Ngày</th>
                  <th style={{ ...s.th, width: 80 }}>Trạng thái</th>
                  <th style={{ ...s.th, width: 90 }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={7} style={{ ...s.td, textAlign: "center", padding: 48, color: "rgba(255,255,255,0.3)" }}>Không tìm thấy bài nào</td></tr>
                )}
                {filtered.map(post => {
                  const isSelected = selected.has(post._id);
                  const isMutating = mutating.has(post._id);
                  return (
                    <tr key={post._id}
                      style={{ background: isSelected ? "rgba(20,110,245,0.08)" : "transparent", transition: "background 0.1s" }}
                      onMouseEnter={e => !isSelected && (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
                      onMouseLeave={e => !isSelected && (e.currentTarget.style.background = "transparent")}
                    >
                      {/* Checkbox */}
                      <td style={s.td}>
                        <input type="checkbox" checked={isSelected} onChange={() => {}} onClick={e => toggleSelect(post._id, e as any)} style={{ cursor: "pointer" }} />
                      </td>
                      {/* Featured star */}
                      <td style={s.td}>
                        <button onClick={() => !isMutating && toggleFeatured(post)} disabled={isMutating}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, opacity: isMutating ? 0.4 : 1, transition: "transform 0.1s", padding: 0 }}
                          title={post.featured ? "Bỏ nổi bật" : "Đánh dấu nổi bật"}
                        >
                          {post.featured ? "⭐" : "☆"}
                        </button>
                      </td>
                      {/* Title */}
                      <td style={s.td}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                          <a href={`/studio/intent/edit/id=${post._id}`} target="_blank"
                            style={{ color: "#fff", textDecoration: "none", fontWeight: 500, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 420, display: "block" }}
                            title={post.title}
                          >
                            {post.title}
                          </a>
                          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <a href={`/blog/${post.slug?.current}`} target="_blank" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>
                              /{post.slug?.current}
                            </a>
                            {!post.hasBody && <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 4, background: "rgba(255,150,0,0.15)", color: "#ffaa44", border: "1px solid rgba(255,150,0,0.3)" }}>Chưa có nội dung</span>}
                            {!post.hasCover && <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 4, background: "rgba(100,100,255,0.12)", color: "#8899ff", border: "1px solid rgba(100,100,255,0.25)" }}>Chưa có ảnh</span>}
                          </div>
                        </div>
                      </td>
                      {/* Category - inline edit */}
                      <td style={{ ...s.td, position: "relative" }}>
                        <div style={{ position: "relative", display: "inline-block" }}>
                          <CategoryBadge cat={post.category} onClick={() => setEditingCatId(editingCatId === post._id ? null : post._id)} />
                          {editingCatId === post._id && (
                            <CategoryDropdown current={post.category} onSelect={cat => changeCategory(post._id, cat)} onClose={() => setEditingCatId(null)} />
                          )}
                        </div>
                      </td>
                      {/* Date */}
                      <td style={{ ...s.td, color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
                        {fmtDate(post.publishedAt)}
                      </td>
                      {/* Status */}
                      <td style={s.td}>
                        <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "rgba(95,255,170,0.12)", color: "#5fffaa", border: "1px solid rgba(95,255,170,0.25)" }}>Published</span>
                      </td>
                      {/* Actions */}
                      <td style={s.td}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <a href={`/studio/intent/edit/id=${post._id}`} target="_blank"
                            style={{ padding: "5px 10px", borderRadius: 7, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none", fontSize: 12, fontWeight: 500 }}>
                            Sửa
                          </a>
                          <button onClick={() => setDeleteConfirm(post._id)}
                            style={{ padding: "5px 10px", borderRadius: 7, background: "rgba(255,60,60,0.1)", color: "#ff6b6b", border: "1px solid rgba(255,60,60,0.2)", cursor: "pointer", fontSize: 12, fontWeight: 500 }}>
                            Xoá
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer count */}
        <div style={{ padding: "12px 4px", color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
          Hiển thị {filtered.length} / {posts.length} bài viết
          {search && ` · Tìm: "${search}"`}
        </div>
      </div>

      {/* ── Bulk action bar ── */}
      {selected.size > 0 && (
        <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: "#181828", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: "12px 20px", display: "flex", gap: 12, alignItems: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.6)", zIndex: 100, whiteSpace: "nowrap" }}>
          <span style={{ color: "#7da9ff", fontWeight: 600, fontSize: 14, marginRight: 4 }}>
            {selected.size} bài đã chọn
          </span>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)" }} />
          {/* Bulk category */}
          <select value={bulkCat} onChange={e => setBulkCat(e.target.value)} style={{ padding: "7px 10px", borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: 13, cursor: "pointer", outline: "none" }}>
            <option value="">Đổi danh mục...</option>
            {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <button onClick={bulkChangeCategory} disabled={!bulkCat} style={{ padding: "7px 14px", borderRadius: 8, background: bulkCat ? "#146ef5" : "rgba(255,255,255,0.06)", color: bulkCat ? "#fff" : "rgba(255,255,255,0.3)", border: "none", cursor: bulkCat ? "pointer" : "not-allowed", fontWeight: 600, fontSize: 13 }}>
            Áp dụng
          </button>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)" }} />
          <button onClick={() => bulkToggleFeatured(true)} style={{ padding: "7px 12px", borderRadius: 8, background: "rgba(255,215,0,0.12)", color: "#ffd700", border: "1px solid rgba(255,215,0,0.25)", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            ⭐ Nổi bật
          </button>
          <button onClick={() => bulkToggleFeatured(false)} style={{ padding: "7px 12px", borderRadius: 8, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontSize: 13 }}>
            Bỏ nổi bật
          </button>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)" }} />
          <button onClick={bulkDelete} style={{ padding: "7px 12px", borderRadius: 8, background: "rgba(255,60,60,0.12)", color: "#ff6b6b", border: "1px solid rgba(255,60,60,0.25)", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            🗑 Xoá {selected.size} bài
          </button>
          <button onClick={() => setSelected(new Set())} style={{ padding: "7px 10px", borderRadius: 8, background: "none", color: "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", fontSize: 16, lineHeight: 1 }}>×</button>
        </div>
      )}

      {/* ── Delete confirm ── */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setDeleteConfirm(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 28, maxWidth: 380, width: "90%" }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Xác nhận xoá?</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 20 }}>
              Bài "{posts.find(p => p._id === deleteConfirm)?.title}" sẽ bị xoá khỏi Sanity. Không thể khôi phục.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => deletePost(deleteConfirm)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: "#dc2626", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}>Xoá luôn</button>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: "rgba(255,255,255,0.07)", color: "#fff", fontWeight: 600, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>Huỷ</button>
            </div>
          </div>
        </div>
      )}

      {/* ── New post modal ── */}
      {showNewPost && (
        <NewPostModal
          onClose={() => setShowNewPost(false)}
          onCreated={post => { setPosts(prev => [post, ...prev]); showToast("Đã tạo bài viết! Vào Studio để thêm nội dung.", true); }}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, padding: "12px 20px", borderRadius: 12, background: toast.ok ? "rgba(95,255,170,0.15)" : "rgba(255,100,100,0.15)", border: `1px solid ${toast.ok ? "rgba(95,255,170,0.35)" : "rgba(255,100,100,0.35)"}`, color: toast.ok ? "#5fffaa" : "#ff8888", fontWeight: 600, fontSize: 14, zIndex: 300, backdropFilter: "blur(8px)", boxShadow: "0 4px 20px rgba(0,0,0,0.4)", animation: "fadeIn 0.2s ease" }}>
          {toast.msg}
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
        select option { background: #181828; color: #fff; }
        input[type=checkbox] { accent-color: #146ef5; }
      `}</style>
    </div>
  );
}
