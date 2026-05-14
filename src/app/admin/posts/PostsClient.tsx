"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";

/* ─── Types ─────────────────────────────────────────────────────────── */
type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  featured: boolean;
  featuredOrder?: number;
  publishedAt: string;
  _updatedAt?: string;
  tags?: string[];
  excerpt?: string;
  readTime?: number;
  hasBody: boolean;
  wordCount?: number;
  coverUrl?: string;
  // Pageview stats (joined from /api/admin/pageviews)
  views?: number;
  viewsWeek?: number;
  viewsToday?: number;
};

type ViewStats = Record<string, { views: number; week: number; today: number }>;
type SortKey = "newest" | "oldest" | "title" | "title_desc" | "updated" | "category" | "views" | "views_week";
type ViewMode = "comfortable" | "compact";

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
  tiktok: "#ff7ad9",
  shopee: "#ff8859",
  ecom: "#4ad6ff",
  career: "#ffd700",
  psychology: "#a78bff",
  "thue-cong-cu": "#ff9f7a",
  mindset: "#a78bff",
  leadership: "#7da9ff",
};

const SORT_LABELS: Record<SortKey, string> = {
  newest: "Mới nhất",
  oldest: "Cũ nhất",
  title: "Tên A-Z",
  title_desc: "Tên Z-A",
  updated: "Sửa gần đây",
  category: "Theo danh mục",
  views: "👁 Lượt xem nhiều",
  views_week: "🔥 Hot tuần này",
};

function catColor(c: string) { return CAT_COLORS[c] || "#888"; }
function catLabel(c: string) { return CATEGORIES[c] || c || "—"; }

/* ─── Health score: how complete is a post ─── */
function getHealth(p: Post): { score: number; missing: string[] } {
  const missing: string[] = [];
  if (!p.coverUrl) missing.push("ảnh bìa");
  if (!p.hasBody) missing.push("nội dung");
  if (!p.excerpt || p.excerpt.length < 30) missing.push("tóm tắt");
  if (!p.tags || p.tags.length < 2) missing.push("tags");
  if (!CATEGORIES[p.category]) missing.push("danh mục đúng");
  const score = Math.max(0, 100 - missing.length * 20);
  return { score, missing };
}

function fmtDate(d?: string) {
  if (!d) return "—";
  const dt = new Date(d);
  return `${String(dt.getDate()).padStart(2,"0")}/${String(dt.getMonth()+1).padStart(2,"0")}/${dt.getFullYear()}`;
}
function fmtRelative(d?: string) {
  if (!d) return "";
  const diff = Date.now() - new Date(d).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "hôm nay";
  if (days === 1) return "hôm qua";
  if (days < 7) return `${days}d trước`;
  if (days < 30) return `${Math.floor(days/7)}w trước`;
  if (days < 365) return `${Math.floor(days/30)} tháng trước`;
  return `${Math.floor(days/365)} năm trước`;
}

async function api(url: string, opts?: RequestInit) {
  const r = await fetch(url, { ...opts, headers: { "Content-Type": "application/json", ...(opts?.headers || {}) } });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

/* ─── Login screen ───────────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState(""); const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setErr("");
    try { await api("/api/admin/auth", { method: "POST", body: JSON.stringify({ password: pw }) }); onLogin(); }
    catch { setErr("Sai mật khẩu"); }
    finally { setLoading(false); }
  }
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#08080f" }}>
      <form onSubmit={submit} style={{ width: 360, padding: "40px 36px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>🔐 Blog Admin</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>Nhập mật khẩu để tiếp tục</div>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} autoFocus placeholder="Admin password"
          style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${err ? "#ff6b6b" : "rgba(255,255,255,0.12)"}`, background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 15, outline: "none" }} />
        {err && <div style={{ color: "#ff6b6b", fontSize: 13 }}>{err}</div>}
        <button type="submit" disabled={loading} style={{ padding: "12px 0", borderRadius: 10, background: "#146ef5", color: "#fff", fontWeight: 600, fontSize: 15, border: "none", cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Đang kiểm tra..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}

/* ─── Cover Image Cell with upload ─────────────────────────────────── */
function CoverCell({ post, onUpdate, size = 56 }: { post: Post; onUpdate: (p: Partial<Post>) => void; size?: number }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) { alert("Chỉ chấp nhận file ảnh"); return; }
    if (file.size > 8 * 1024 * 1024) { alert("Ảnh phải nhỏ hơn 8MB"); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("postId", post._id);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onUpdate({ coverUrl: data.url });
    } catch (err: any) { alert("Lỗi upload: " + err.message); }
    finally { setUploading(false); }
  }

  return (
    <div style={{ position: "relative", width: size, height: Math.round(size * 9/16), borderRadius: 6, overflow: "hidden", background: post.coverUrl ? "transparent" : "rgba(255,255,255,0.05)", border: post.coverUrl ? "none" : "1px dashed rgba(255,255,255,0.15)", cursor: "pointer", flexShrink: 0 }}
      onClick={() => inputRef.current?.click()}
      title="Click để đổi/upload ảnh bìa"
    >
      {post.coverUrl ? (
        <img src={`${post.coverUrl}?w=${size*2}&h=${size}&fit=crop`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 16, opacity: 0.4 }}>📷</div>
      )}
      {uploading && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#5fffaa" }}>...</div>
      )}
      {post.coverUrl && !uploading && (
        <div className="cover-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.15s", fontSize: 11, color: "#fff", fontWeight: 600 }}>
          ↑ Đổi
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
    </div>
  );
}

/* ─── Category dropdown ─────────────────────────────────────────────── */
function CategoryDropdown({ current, onSelect, onClose }: { current: string; onSelect: (c: string) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [onClose]);
  return (
    <div ref={ref} style={{ position: "absolute", zIndex: 100, top: "100%", left: 0, marginTop: 4, background: "#181828", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: 6, minWidth: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
      {Object.entries(CATEGORIES).map(([key, label]) => (
        <div key={key} onClick={() => onSelect(key)}
          style={{ padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, color: key === current ? catColor(key) : "rgba(255,255,255,0.8)", background: key === current ? `${catColor(key)}15` : "transparent", display: "flex", alignItems: "center", gap: 8 }}
          onMouseEnter={e => (e.currentTarget.style.background = `${catColor(key)}15`)}
          onMouseLeave={e => (e.currentTarget.style.background = key === current ? `${catColor(key)}15` : "transparent")}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: catColor(key) }} />
          {label}{key === current && <span style={{ marginLeft: "auto", fontSize: 10 }}>✓</span>}
        </div>
      ))}
    </div>
  );
}

/* ─── Generic dropdown ─────────────────────────────────────────────── */
function Popover({ children, onClose, style }: { children: React.ReactNode; onClose: () => void; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function h(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); }
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [onClose]);
  return <div ref={ref} style={{ position: "absolute", zIndex: 100, background: "#181828", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: 8, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", ...style }}>{children}</div>;
}

/* ─── New post modal ────────────────────────────────────────────────── */
function NewPostModal({ onClose, onCreated }: { onClose: () => void; onCreated: (p: Post) => void }) {
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", category: "ecom", tags: "", featured: false });
  const [loading, setLoading] = useState(false); const [err, setErr] = useState("");

  function autoSlug(t: string) {
    return t.toLowerCase()
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
      const data = await api("/api/admin/posts", { method: "POST", body: JSON.stringify({ ...form, slug, tags }) });
      onCreated({ _id: data.id, title: form.title, slug: { current: slug }, category: form.category, featured: form.featured, publishedAt: new Date().toISOString(), tags, excerpt: form.excerpt, hasBody: false });
      onClose();
    } catch (e: any) { setErr(e.message); }
    finally { setLoading(false); }
  }

  const lbl: React.CSSProperties = { color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 };
  const inp: React.CSSProperties = { padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={e => e.target === e.currentTarget && onClose()}>
      <form onSubmit={submit} style={{ width: "100%", maxWidth: 640, background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.1)", borderBottom: "none", borderRadius: "20px 20px 0 0", padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>+ Bài viết mới</span>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 22, cursor: "pointer" }}>×</button>
        </div>
        <div><div style={lbl}>Tiêu đề *</div>
          <input style={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: autoSlug(e.target.value) }))} placeholder="Tiêu đề bài viết..." autoFocus /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><div style={lbl}>Slug</div><input style={inp} value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} /></div>
          <div><div style={lbl}>Danh mục</div>
            <select style={{ ...inp, cursor: "pointer" }} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select></div>
        </div>
        <div><div style={lbl}>Tóm tắt</div>
          <textarea style={{ ...inp, resize: "vertical", minHeight: 72 }} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="1-2 câu mô tả ngắn..." /></div>
        <div><div style={lbl}>Tags (phẩy ngăn cách)</div>
          <input style={inp} value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="shopee, phi san, unit economics" /></div>
        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>Đánh dấu nổi bật</span>
        </label>
        {err && <div style={{ color: "#ff6b6b", fontSize: 13 }}>{err}</div>}
        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" disabled={loading} style={{ flex: 1, padding: "12px 0", borderRadius: 10, background: "#146ef5", color: "#fff", fontWeight: 600, fontSize: 15, border: "none", cursor: loading ? "wait" : "pointer" }}>
            {loading ? "Đang tạo..." : "Tạo bài viết"}
          </button>
          <button type="button" onClick={onClose} style={{ padding: "12px 20px", borderRadius: 10, background: "rgba(255,255,255,0.07)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontWeight: 600 }}>Huỷ</button>
        </div>
      </form>
    </div>
  );
}

/* ─── Excerpt edit popover ─────────────────────────────────────────── */
function ExcerptEditor({ post, onSave, onClose }: { post: Post; onSave: (val: string) => void; onClose: () => void }) {
  const [val, setVal] = useState(post.excerpt || "");
  return (
    <Popover onClose={onClose} style={{ top: "100%", left: 0, marginTop: 4, width: 380 }}>
      <textarea value={val} onChange={e => setVal(e.target.value)} autoFocus rows={4}
        style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 13, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }}
        placeholder="Tóm tắt 1-2 câu..." />
      <div style={{ display: "flex", gap: 6, marginTop: 8, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginRight: "auto" }}>{val.length} ký tự (lý tưởng 120-180)</span>
        <button onClick={onClose} style={{ padding: "5px 10px", borderRadius: 6, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontSize: 12 }}>Huỷ</button>
        <button onClick={() => { onSave(val); onClose(); }} style={{ padding: "5px 12px", borderRadius: 6, background: "#146ef5", color: "#fff", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Lưu</button>
      </div>
    </Popover>
  );
}

/* ─── Title inline edit ─────────────────────────────────────────────── */
function TitleEditor({ post, onSave, onClose }: { post: Post; onSave: (val: string) => void; onClose: () => void }) {
  const [val, setVal] = useState(post.title);
  useEffect(() => {
    function h(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSave(val.trim()); onClose(); }
    }
    document.addEventListener("keydown", h); return () => document.removeEventListener("keydown", h);
  }, [val, onClose, onSave]);
  return (
    <input value={val} onChange={e => setVal(e.target.value)} autoFocus onBlur={() => { if (val.trim() && val.trim() !== post.title) onSave(val.trim()); onClose(); }}
      style={{ width: "100%", padding: "4px 8px", borderRadius: 6, border: "1px solid #146ef5", background: "rgba(20,110,245,0.1)", color: "#fff", fontSize: 14, fontWeight: 500, outline: "none" }} />
  );
}

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function PostsClient({ authed }: { authed: boolean }) {
  const [isAuthed, setIsAuthed] = useState(authed);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [mutating, setMutating] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Search & filter & sort
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all"); // all | featured | needs-cover | needs-body | needs-excerpt | needs-tags
  const [filterDate, setFilterDate] = useState<string>("all"); // all | today | week | month
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("comfortable");

  // UI state
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editingExcerptId, setEditingExcerptId] = useState<string | null>(null);
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [bulkCat, setBulkCat] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  const lastSelected = useRef<string | null>(null);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2800);
  }

  async function loadPosts() {
    setLoading(true);
    try {
      const [postsData, viewsData] = await Promise.all([
        api("/api/admin/posts"),
        api("/api/admin/pageviews").catch(() => ({} as ViewStats)),
      ]);
      const v = viewsData as ViewStats;
      const merged: Post[] = (postsData as Post[]).map(p => {
        const stat = v[p.slug?.current];
        return { ...p, views: stat?.views || 0, viewsWeek: stat?.week || 0, viewsToday: stat?.today || 0 };
      });
      setPosts(merged);
    } catch { showToast("Lỗi tải", false); }
    finally { setLoading(false); }
  }
  useEffect(() => { if (isAuthed) loadPosts(); }, [isAuthed]);

  // Drag-to-reorder featured posts
  const [reorderMode, setReorderMode] = useState(false);
  const dragId = useRef<string | null>(null);
  const dragOverId = useRef<string | null>(null);

  // Bulk add tag
  const [bulkTagInput, setBulkTagInput] = useState("");
  const [showBulkTag, setShowBulkTag] = useState(false);

  // ─── Keyboard shortcuts ───
  useEffect(() => {
    if (!isAuthed) return;
    function h(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      const inField = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); searchRef.current?.focus(); }
      if (e.key === "Escape" && !inField) { setSelected(new Set()); setShowFilters(false); setShowSort(false); }
      if ((e.metaKey || e.ctrlKey) && e.key === "n") { e.preventDefault(); setShowNewPost(true); }
    }
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isAuthed]);

  // ─── Derived data ───
  const filtered = useMemo(() => {
    let list = posts.slice();
    if (filterCat.length > 0) list = list.filter(p => filterCat.includes(p.category));
    if (filterStatus !== "all") {
      list = list.filter(p => {
        if (filterStatus === "featured") return p.featured;
        if (filterStatus === "not-featured") return !p.featured;
        if (filterStatus === "needs-cover") return !p.coverUrl;
        if (filterStatus === "needs-body") return !p.hasBody;
        if (filterStatus === "needs-excerpt") return !p.excerpt || p.excerpt.length < 30;
        if (filterStatus === "needs-tags") return !p.tags || p.tags.length < 2;
        return true;
      });
    }
    if (filterDate !== "all") {
      const now = Date.now();
      const limits: Record<string, number> = { today: 86400000, week: 7 * 86400000, month: 30 * 86400000 };
      const lim = limits[filterDate];
      if (lim) list = list.filter(p => now - new Date(p.publishedAt).getTime() < lim);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt || "").toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q)) ||
        p.slug?.current?.toLowerCase().includes(q)
      );
    }
    // Reorder mode: show only featured, ordered by featuredOrder
    if (reorderMode) {
      list = list.filter(p => p.featured);
      list.sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999));
      return list;
    }
    // Normal sort
    list.sort((a, b) => {
      switch (sortBy) {
        case "newest": return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "oldest": return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case "title": return a.title.localeCompare(b.title);
        case "title_desc": return b.title.localeCompare(a.title);
        case "updated": return new Date(b._updatedAt || b.publishedAt).getTime() - new Date(a._updatedAt || a.publishedAt).getTime();
        case "category": return a.category.localeCompare(b.category) || new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "views": return (b.views || 0) - (a.views || 0);
        case "views_week": return (b.viewsWeek || 0) - (a.viewsWeek || 0);
      }
    });
    return list;
  }, [posts, filterCat, filterStatus, filterDate, search, sortBy, reorderMode]);

  const catCounts = useMemo(() => {
    const m: Record<string, number> = {};
    posts.forEach(p => { m[p.category] = (m[p.category] || 0) + 1; });
    return m;
  }, [posts]);

  const stats = useMemo(() => ({
    total: posts.length,
    featured: posts.filter(p => p.featured).length,
    needsCover: posts.filter(p => !p.coverUrl).length,
    needsBody: posts.filter(p => !p.hasBody).length,
  }), [posts]);

  const activeFilterCount = (filterCat.length > 0 ? 1 : 0) + (filterStatus !== "all" ? 1 : 0) + (filterDate !== "all" ? 1 : 0);

  // ─── Mutations ───
  async function patchPost(id: string, patch: object) {
    setMutating(prev => new Set(prev).add(id));
    try {
      await api("/api/admin/posts", { method: "PATCH", body: JSON.stringify({ id, patch }) });
      setPosts(prev => prev.map(p => p._id === id ? { ...p, ...patch } : p));
    } catch { showToast("Lỗi cập nhật", false); }
    finally { setMutating(prev => { const n = new Set(prev); n.delete(id); return n; }); }
  }

  async function toggleFeatured(post: Post) {
    await patchPost(post._id, { featured: !post.featured });
    showToast(post.featured ? "Đã bỏ nổi bật" : "Đã đánh dấu nổi bật ⭐");
  }
  async function changeCategory(id: string, cat: string) { setEditingCatId(null); await patchPost(id, { category: cat }); showToast("Đã đổi danh mục"); }

  async function bulkPatch(patch: object, msg: string) {
    const ids = Array.from(selected); if (ids.length === 0) return;
    try {
      await api("/api/admin/posts", { method: "PATCH", body: JSON.stringify({ ids, patch }) });
      setPosts(prev => prev.map(p => ids.includes(p._id) ? { ...p, ...patch } : p));
      showToast(msg); setSelected(new Set());
    } catch { showToast("Lỗi cập nhật", false); }
  }

  async function deletePost(id: string) {
    try {
      await api("/api/admin/posts", { method: "DELETE", body: JSON.stringify({ id }) });
      setPosts(prev => prev.filter(p => p._id !== id));
      showToast("Đã xoá bài");
    } catch { showToast("Lỗi xoá", false); }
    setDeleteConfirm(null);
  }
  async function bulkDelete() {
    const ids = Array.from(selected); if (!confirm(`Xoá ${ids.length} bài? Không thể hoàn tác.`)) return;
    try {
      await api("/api/admin/posts", { method: "DELETE", body: JSON.stringify({ ids }) });
      setPosts(prev => prev.filter(p => !ids.includes(p._id)));
      showToast(`Đã xoá ${ids.length} bài`); setSelected(new Set());
    } catch { showToast("Lỗi xoá", false); }
  }

  async function duplicatePost(id: string) {
    try {
      const data = await api("/api/admin/posts", { method: "POST", body: JSON.stringify({ action: "duplicate", sourceId: id }) });
      showToast("Đã nhân bản bài viết");
      await loadPosts();
    } catch { showToast("Lỗi nhân bản", false); }
  }

  function exportCSV() {
    const rows = [["Title", "Slug", "Category", "Featured", "Tags", "Published", "Word Count"]];
    filtered.forEach(p => rows.push([
      `"${p.title.replace(/"/g, '""')}"`,
      p.slug?.current || "",
      catLabel(p.category),
      p.featured ? "Yes" : "No",
      `"${(p.tags || []).join(", ")}"`,
      fmtDate(p.publishedAt),
      String(p.wordCount || 0),
    ]));
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `blog-posts-${Date.now()}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
    showToast("Đã xuất CSV");
  }

  async function logout() { await fetch("/api/admin/auth", { method: "DELETE" }); setIsAuthed(false); }

  // ─── Drag to reorder featured ───
  async function handleDrop(targetId: string) {
    const srcId = dragId.current;
    dragId.current = null; dragOverId.current = null;
    if (!srcId || srcId === targetId) return;

    const featuredList = posts.filter(p => p.featured).sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999));
    const srcIdx = featuredList.findIndex(p => p._id === srcId);
    const tgtIdx = featuredList.findIndex(p => p._id === targetId);
    if (srcIdx < 0 || tgtIdx < 0) return;

    const reordered = [...featuredList];
    const [moved] = reordered.splice(srcIdx, 1);
    reordered.splice(tgtIdx, 0, moved);

    // Update featuredOrder in batches: 1, 2, 3, ...
    const updates = reordered.map((p, i) => ({ id: p._id, order: i + 1 }));
    setPosts(prev => prev.map(p => {
      const u = updates.find(x => x.id === p._id);
      return u ? { ...p, featuredOrder: u.order } : p;
    }));

    try {
      await Promise.all(updates.map(u =>
        api("/api/admin/posts", { method: "PATCH", body: JSON.stringify({ id: u.id, patch: { featuredOrder: u.order } }) })
      ));
      showToast(`Đã sắp xếp lại ${updates.length} bài nổi bật`);
    } catch { showToast("Lỗi cập nhật thứ tự", false); }
  }

  // ─── Bulk add tag (append to existing) ───
  async function bulkAddTag(tag: string) {
    const trimmed = tag.trim().toLowerCase();
    if (!trimmed) return;
    const ids = Array.from(selected);
    try {
      // Patch each post with merged tags (Sanity has no array-append-unique in single op, so do per-doc)
      await Promise.all(ids.map(async id => {
        const post = posts.find(p => p._id === id);
        if (!post) return;
        const existing = post.tags || [];
        if (existing.includes(trimmed)) return;
        const newTags = [...existing, trimmed];
        await api("/api/admin/posts", { method: "PATCH", body: JSON.stringify({ id, patch: { tags: newTags } }) });
      }));
      setPosts(prev => prev.map(p => ids.includes(p._id) && !(p.tags || []).includes(trimmed) ? { ...p, tags: [...(p.tags || []), trimmed] } : p));
      showToast(`Đã thêm tag "${trimmed}" vào ${ids.length} bài`);
      setBulkTagInput(""); setShowBulkTag(false); setSelected(new Set());
    } catch { showToast("Lỗi thêm tag", false); }
  }

  // Selection
  function toggleSelect(id: string, e: React.MouseEvent) {
    if (e.shiftKey && lastSelected.current) {
      const ids = filtered.map(p => p._id);
      const a = ids.indexOf(lastSelected.current); const b = ids.indexOf(id);
      const range = ids.slice(Math.min(a, b), Math.max(a, b) + 1);
      setSelected(prev => { const n = new Set(prev); range.forEach(i => n.add(i)); return n; });
    } else {
      setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
    }
    lastSelected.current = id;
  }
  function toggleSelectAll() { selected.size === filtered.length ? setSelected(new Set()) : setSelected(new Set(filtered.map(p => p._id))); }

  if (!isAuthed) return <LoginScreen onLogin={() => setIsAuthed(true)} />;

  const rowH = viewMode === "compact" ? 44 : 64;

  /* ── Styles ── */
  const s = {
    wrap: { minHeight: "100vh", background: "#08080f", color: "#fff", fontFamily: "'Inter', -apple-system, sans-serif", fontSize: 14 } as React.CSSProperties,
    header: { display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.5)", position: "sticky" as const, top: 0, zIndex: 50, backdropFilter: "blur(12px)" },
    th: { padding: "10px 14px", textAlign: "left" as const, fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.1em", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" },
    td: { padding: viewMode === "compact" ? "6px 14px" : "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)", verticalAlign: "middle" as const },
    btn: { padding: "7px 12px", borderRadius: 9, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 } as React.CSSProperties,
  };

  return (
    <div style={s.wrap}>
      {/* ─── Header ─── */}
      <div style={s.header}>
        <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em" }}>✍️ Blog Admin</span>

        <div style={{ flex: 1, maxWidth: 360, position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>🔍</span>
          <input ref={searchRef} value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm... (Ctrl+K)"
            style={{ width: "100%", padding: "8px 36px 8px 34px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: 4, width: 20, height: 20, fontSize: 11, cursor: "pointer" }}>×</button>}
        </div>

        {/* Filters button */}
        <div style={{ position: "relative" }}>
          <button onClick={() => { setShowFilters(v => !v); setShowSort(false); }} style={{ ...s.btn, background: activeFilterCount > 0 ? "rgba(20,110,245,0.18)" : "rgba(255,255,255,0.06)", borderColor: activeFilterCount > 0 ? "rgba(20,110,245,0.4)" : "rgba(255,255,255,0.1)", color: activeFilterCount > 0 ? "#7da9ff" : "rgba(255,255,255,0.75)" }}>
            <span>⚙️</span> Lọc {activeFilterCount > 0 && <span style={{ marginLeft: 4, background: "#146ef5", color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 700 }}>{activeFilterCount}</span>}
          </button>
          {showFilters && (
            <Popover onClose={() => setShowFilters(false)} style={{ top: "100%", right: 0, marginTop: 6, width: 320, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Trạng thái</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                {[["all","Tất cả"],["featured","⭐ Nổi bật"],["not-featured","Không nổi bật"],["needs-cover","Thiếu ảnh"],["needs-body","Thiếu nội dung"],["needs-excerpt","Thiếu tóm tắt"],["needs-tags","Thiếu tags"]].map(([k,l]) => (
                  <button key={k} onClick={() => setFilterStatus(k)} style={{ padding: "5px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${filterStatus === k ? "#146ef5" : "rgba(255,255,255,0.1)"}`, background: filterStatus === k ? "rgba(20,110,245,0.2)" : "rgba(255,255,255,0.04)", color: filterStatus === k ? "#7da9ff" : "rgba(255,255,255,0.65)" }}>{l}</button>
                ))}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Ngày đăng</div>
              <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                {[["all","Tất cả"],["today","Hôm nay"],["week","7 ngày"],["month","30 ngày"]].map(([k,l]) => (
                  <button key={k} onClick={() => setFilterDate(k)} style={{ flex: 1, padding: "5px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1px solid ${filterDate === k ? "#146ef5" : "rgba(255,255,255,0.1)"}`, background: filterDate === k ? "rgba(20,110,245,0.2)" : "rgba(255,255,255,0.04)", color: filterDate === k ? "#7da9ff" : "rgba(255,255,255,0.65)" }}>{l}</button>
                ))}
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Danh mục</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {Object.entries(CATEGORIES).map(([k, l]) => {
                  const on = filterCat.includes(k);
                  return (
                    <button key={k} onClick={() => setFilterCat(prev => on ? prev.filter(c => c !== k) : [...prev, k])}
                      style={{ padding: "4px 9px", borderRadius: 12, fontSize: 11, fontWeight: 600, cursor: "pointer", border: `1px solid ${on ? catColor(k) : "rgba(255,255,255,0.1)"}`, background: on ? `${catColor(k)}20` : "rgba(255,255,255,0.04)", color: on ? catColor(k) : "rgba(255,255,255,0.55)" }}>
                      {l}
                    </button>
                  );
                })}
              </div>
              {activeFilterCount > 0 && (
                <button onClick={() => { setFilterCat([]); setFilterStatus("all"); setFilterDate("all"); }} style={{ marginTop: 14, width: "100%", padding: "6px 0", borderRadius: 8, background: "rgba(255,100,100,0.1)", border: "1px solid rgba(255,100,100,0.25)", color: "#ff8888", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  Xoá tất cả bộ lọc
                </button>
              )}
            </Popover>
          )}
        </div>

        {/* Sort button */}
        <div style={{ position: "relative" }}>
          <button onClick={() => { setShowSort(v => !v); setShowFilters(false); }} style={s.btn}>
            <span>↕</span> {SORT_LABELS[sortBy]}
          </button>
          {showSort && (
            <Popover onClose={() => setShowSort(false)} style={{ top: "100%", right: 0, marginTop: 6, minWidth: 180 }}>
              {Object.entries(SORT_LABELS).map(([k, l]) => (
                <div key={k} onClick={() => { setSortBy(k as SortKey); setShowSort(false); }}
                  style={{ padding: "8px 12px", borderRadius: 8, fontSize: 13, cursor: "pointer", color: sortBy === k ? "#7da9ff" : "rgba(255,255,255,0.8)", background: sortBy === k ? "rgba(20,110,245,0.12)" : "transparent" }}
                  onMouseEnter={e => sortBy !== k && (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                  onMouseLeave={e => sortBy !== k && (e.currentTarget.style.background = "transparent")}>
                  {l}{sortBy === k && <span style={{ float: "right" }}>✓</span>}
                </div>
              ))}
            </Popover>
          )}
        </div>

        {/* Reorder featured mode */}
        <button onClick={() => setReorderMode(v => !v)} title="Kéo thả để sắp xếp thứ tự bài nổi bật"
          style={{ ...s.btn, background: reorderMode ? "rgba(255,215,0,0.18)" : "rgba(255,255,255,0.06)", borderColor: reorderMode ? "rgba(255,215,0,0.4)" : "rgba(255,255,255,0.1)", color: reorderMode ? "#ffd700" : "rgba(255,255,255,0.75)" }}>
          {reorderMode ? "✓ Xong sắp xếp" : "🔀 Sắp xếp Featured"}
        </button>

        {/* View mode */}
        <button onClick={() => setViewMode(v => v === "compact" ? "comfortable" : "compact")} title={viewMode === "compact" ? "Chế độ rộng" : "Chế độ gọn"} style={{ ...s.btn, padding: "7px 10px" }}>
          {viewMode === "compact" ? "☰" : "≡"}
        </button>

        <button onClick={exportCSV} title="Xuất CSV" style={{ ...s.btn, padding: "7px 10px" }}>📥</button>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={() => setShowNewPost(true)} style={{ padding: "8px 18px", borderRadius: 10, background: "linear-gradient(135deg,#146ef5,#7a3dff)", color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>+ Bài mới</button>
          <button onClick={loadPosts} title="Làm mới" style={{ ...s.btn, padding: "7px 10px" }}>⟳</button>
          <button onClick={logout} style={{ padding: "7px 12px", borderRadius: 9, background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", fontSize: 12 }}>Đăng xuất</button>
        </div>
      </div>

      <div style={{ padding: "18px 24px", maxWidth: 1500, margin: "0 auto" }}>
        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 10, marginBottom: 18 }}>
          {[
            { label: "Tổng bài viết", value: stats.total, color: "#5fffaa", icon: "📚" },
            { label: "Bài nổi bật", value: stats.featured, color: "#ffd700", icon: "⭐" },
            { label: "Thiếu ảnh bìa", value: stats.needsCover, color: "#ff9f7a", icon: "📷", action: () => { setFilterStatus("needs-cover"); setShowFilters(false); } },
            { label: "Thiếu nội dung", value: stats.needsBody, color: "#ff6b6b", icon: "📝", action: () => { setFilterStatus("needs-body"); setShowFilters(false); } },
          ].map(s => (
            <div key={s.label} onClick={s.action} style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", cursor: s.action ? "pointer" : "default", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 12 }}
              onMouseEnter={e => s.action && (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
              onMouseLeave={e => s.action && (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {filterStatus !== "all" && (
              <span style={{ padding: "4px 10px", borderRadius: 14, background: "rgba(20,110,245,0.15)", border: "1px solid rgba(20,110,245,0.35)", fontSize: 12, color: "#7da9ff", display: "flex", alignItems: "center", gap: 4 }}>
                {filterStatus === "needs-cover" && "Thiếu ảnh"}{filterStatus === "needs-body" && "Thiếu nội dung"}{filterStatus === "featured" && "⭐ Nổi bật"}{filterStatus === "not-featured" && "Không nổi bật"}{filterStatus === "needs-excerpt" && "Thiếu tóm tắt"}{filterStatus === "needs-tags" && "Thiếu tags"}
                <button onClick={() => setFilterStatus("all")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: 14, padding: 0, marginLeft: 2 }}>×</button>
              </span>
            )}
            {filterDate !== "all" && (
              <span style={{ padding: "4px 10px", borderRadius: 14, background: "rgba(95,255,170,0.12)", border: "1px solid rgba(95,255,170,0.3)", fontSize: 12, color: "#5fffaa", display: "flex", alignItems: "center", gap: 4 }}>
                {filterDate === "today" && "Hôm nay"}{filterDate === "week" && "7 ngày"}{filterDate === "month" && "30 ngày"}
                <button onClick={() => setFilterDate("all")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: 14, marginLeft: 2 }}>×</button>
              </span>
            )}
            {filterCat.map(c => (
              <span key={c} style={{ padding: "4px 10px", borderRadius: 14, background: `${catColor(c)}18`, border: `1px solid ${catColor(c)}40`, fontSize: 12, color: catColor(c), display: "flex", alignItems: "center", gap: 4 }}>
                {catLabel(c)}
                <button onClick={() => setFilterCat(prev => prev.filter(x => x !== c))} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: 14 }}>×</button>
              </span>
            ))}
          </div>
        )}

        {/* Table */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: 60, textAlign: "center", color: "rgba(255,255,255,0.3)" }}>Đang tải...</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {reorderMode && <th style={{ ...s.th, width: 32 }}>≡</th>}
                  {!reorderMode && (
                    <th style={{ ...s.th, width: 40 }}>
                      <input type="checkbox" checked={selected.size > 0 && selected.size === filtered.length}
                        ref={el => el && (el.indeterminate = selected.size > 0 && selected.size < filtered.length)}
                        onChange={toggleSelectAll} style={{ cursor: "pointer" }} />
                    </th>
                  )}
                  <th style={{ ...s.th, width: 32 }}>⭐</th>
                  {viewMode === "comfortable" && <th style={{ ...s.th, width: 76 }}>Ảnh</th>}
                  <th style={s.th}>Tiêu đề</th>
                  <th style={{ ...s.th, width: 160 }}>Danh mục</th>
                  {viewMode === "comfortable" && <th style={{ ...s.th, width: 120 }}>Tags</th>}
                  <th style={{ ...s.th, width: 90, textAlign: "right" as const }}>👁 Views</th>
                  <th style={{ ...s.th, width: 100 }}>Ngày</th>
                  <th style={{ ...s.th, width: 70 }}>Health</th>
                  <th style={{ ...s.th, width: 120 }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={10} style={{ ...s.td, textAlign: "center", padding: 48, color: "rgba(255,255,255,0.3)" }}>
                    {reorderMode ? "Chưa có bài nào được đánh dấu nổi bật" : `Không tìm thấy bài nào${search ? ` cho "${search}"` : ""}`}
                  </td></tr>
                )}
                {filtered.map((post, idx) => {
                  const isSel = selected.has(post._id);
                  const isMut = mutating.has(post._id);
                  const health = getHealth(post);
                  return (
                    <tr key={post._id}
                      draggable={reorderMode}
                      onDragStart={() => { if (reorderMode) dragId.current = post._id; }}
                      onDragOver={e => { if (reorderMode) { e.preventDefault(); dragOverId.current = post._id; } }}
                      onDrop={() => { if (reorderMode) handleDrop(post._id); }}
                      style={{ background: isSel ? "rgba(20,110,245,0.08)" : "transparent", transition: "background 0.1s", height: rowH, cursor: reorderMode ? "grab" : "default" }}
                      onMouseEnter={e => !isSel && (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
                      onMouseLeave={e => !isSel && (e.currentTarget.style.background = "transparent")}>
                      {reorderMode ? (
                        <td style={{ ...s.td, color: "#ffd700", fontWeight: 700, fontSize: 14 }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                            <span style={{ opacity: 0.5, cursor: "grab" }}>⋮⋮</span>
                            <span style={{ fontSize: 11, padding: "2px 6px", borderRadius: 4, background: "rgba(255,215,0,0.12)" }}>{idx + 1}</span>
                          </span>
                        </td>
                      ) : (
                        <td style={s.td}>
                          <input type="checkbox" checked={isSel} onChange={() => {}} onClick={e => toggleSelect(post._id, e as any)} style={{ cursor: "pointer" }} />
                        </td>
                      )}
                      <td style={s.td}>
                        <button onClick={() => !isMut && toggleFeatured(post)} disabled={isMut}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 17, opacity: isMut ? 0.4 : 1, padding: 0 }}>
                          {post.featured ? "⭐" : "☆"}
                        </button>
                      </td>
                      {viewMode === "comfortable" && (
                        <td style={s.td}>
                          <CoverCell post={post} onUpdate={patch => setPosts(prev => prev.map(p => p._id === post._id ? { ...p, ...patch } : p))} />
                        </td>
                      )}
                      <td style={s.td}>
                        {editingTitleId === post._id ? (
                          <TitleEditor post={post} onSave={v => patchPost(post._id, { title: v })} onClose={() => setEditingTitleId(null)} />
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 480 }}>
                            <div onDoubleClick={() => setEditingTitleId(post._id)} title="Double click để sửa"
                              style={{ color: "#fff", fontWeight: 500, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor: "text" }}>
                              {post.title}
                            </div>
                            <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                              <a href={`/blog/${post.slug?.current}`} target="_blank" style={{ color: "inherit", textDecoration: "none" }} title="Xem trên blog">↗ /{post.slug?.current}</a>
                              {post.wordCount ? <span>· {post.wordCount.toLocaleString()} từ</span> : null}
                              {viewMode === "comfortable" && (
                                <span style={{ position: "relative" }}>
                                  · <button onClick={() => setEditingExcerptId(post._id)} style={{ background: "none", border: "none", color: post.excerpt ? "rgba(255,255,255,0.5)" : "#ffaa44", cursor: "pointer", fontSize: 11, padding: 0, textDecoration: "underline dotted", textUnderlineOffset: 2 }}>
                                    {post.excerpt ? "tóm tắt" : "+ tóm tắt"}
                                  </button>
                                  {editingExcerptId === post._id && (
                                    <ExcerptEditor post={post} onSave={v => patchPost(post._id, { excerpt: v })} onClose={() => setEditingExcerptId(null)} />
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </td>
                      <td style={{ ...s.td, position: "relative" }}>
                        <div style={{ position: "relative", display: "inline-block" }}>
                          <span onClick={() => setEditingCatId(editingCatId === post._id ? null : post._id)}
                            style={{ padding: "3px 10px", borderRadius: 14, fontSize: 11, fontWeight: 600, background: `${catColor(post.category)}18`, color: catColor(post.category), border: `1px solid ${catColor(post.category)}40`, cursor: "pointer", whiteSpace: "nowrap", userSelect: "none" }}>
                            {catLabel(post.category)}
                          </span>
                          {editingCatId === post._id && (
                            <CategoryDropdown current={post.category} onSelect={c => changeCategory(post._id, c)} onClose={() => setEditingCatId(null)} />
                          )}
                        </div>
                      </td>
                      {viewMode === "comfortable" && (
                        <td style={{ ...s.td, fontSize: 11 }}>
                          {(post.tags || []).slice(0, 3).map(t => (
                            <span key={t} style={{ display: "inline-block", padding: "1px 7px", borderRadius: 8, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)", marginRight: 3, marginBottom: 2 }}>{t}</span>
                          ))}
                          {(post.tags || []).length > 3 && <span style={{ color: "rgba(255,255,255,0.35)" }}>+{post.tags!.length - 3}</span>}
                        </td>
                      )}
                      <td style={{ ...s.td, textAlign: "right" as const, fontSize: 13, fontVariantNumeric: "tabular-nums" }}>
                        {post.views ? (
                          <div title={`Hôm nay: ${post.viewsToday || 0} · Tuần này: ${post.viewsWeek || 0} · 90 ngày: ${post.views}`}>
                            <div style={{ color: "#fff", fontWeight: 600 }}>{post.views.toLocaleString()}</div>
                            {(post.viewsWeek || 0) > 0 && <div style={{ fontSize: 10, color: "#5fffaa" }}>+{post.viewsWeek}/tuần</div>}
                          </div>
                        ) : (
                          <span style={{ color: "rgba(255,255,255,0.2)" }}>—</span>
                        )}
                      </td>
                      <td style={{ ...s.td, color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
                        <div>{fmtDate(post.publishedAt)}</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{fmtRelative(post.publishedAt)}</div>
                      </td>
                      <td style={s.td}>
                        <div title={health.missing.length ? `Thiếu: ${health.missing.join(", ")}` : "Đầy đủ"} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 32, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                            <div style={{ width: `${health.score}%`, height: "100%", background: health.score === 100 ? "#5fffaa" : health.score >= 60 ? "#ffd700" : "#ff6b6b", transition: "width 0.3s" }} />
                          </div>
                          <span style={{ fontSize: 10, color: health.score === 100 ? "#5fffaa" : health.score >= 60 ? "#ffd700" : "#ff6b6b", fontWeight: 600 }}>{health.score}</span>
                        </div>
                      </td>
                      <td style={s.td}>
                        <div style={{ display: "flex", gap: 4 }}>
                          <a href={`/studio/intent/edit/id=${post._id}`} target="_blank" title="Sửa trong Studio"
                            style={{ padding: "5px 8px", borderRadius: 6, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", fontSize: 11, fontWeight: 500 }}>Studio</a>
                          <button onClick={() => duplicatePost(post._id)} title="Nhân bản"
                            style={{ padding: "5px 8px", borderRadius: 6, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", fontSize: 11 }}>⎘</button>
                          <button onClick={() => setDeleteConfirm(post._id)} title="Xoá"
                            style={{ padding: "5px 8px", borderRadius: 6, background: "rgba(255,60,60,0.08)", color: "#ff7878", border: "1px solid rgba(255,60,60,0.18)", cursor: "pointer", fontSize: 11 }}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ padding: "12px 4px", color: "rgba(255,255,255,0.3)", fontSize: 12, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span>Hiển thị {filtered.length} / {posts.length} bài viết{reorderMode && " · Đang ở chế độ sắp xếp"}</span>
          <span style={{ fontSize: 11 }}>
            {reorderMode
              ? "💡 Kéo thả các hàng để sắp xếp lại thứ tự bài nổi bật"
              : "💡 Ctrl+K tìm · Ctrl+N tạo bài · Shift+click chọn range · Esc bỏ chọn · Double-click tiêu đề để sửa"}
          </span>
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: "#181828", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: "10px 18px", display: "flex", gap: 10, alignItems: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.6)", zIndex: 100, whiteSpace: "nowrap" }}>
          <span style={{ color: "#7da9ff", fontWeight: 700, fontSize: 14 }}>{selected.size} đã chọn</span>
          <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.15)" }} />
          <select value={bulkCat} onChange={e => setBulkCat(e.target.value)} style={{ padding: "6px 10px", borderRadius: 7, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: 12, cursor: "pointer", outline: "none" }}>
            <option value="">Đổi danh mục...</option>
            {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <button onClick={() => bulkCat && bulkPatch({ category: bulkCat }, `Đã đổi ${selected.size} bài`).then(() => setBulkCat(""))} disabled={!bulkCat}
            style={{ padding: "6px 12px", borderRadius: 7, background: bulkCat ? "#146ef5" : "rgba(255,255,255,0.06)", color: bulkCat ? "#fff" : "rgba(255,255,255,0.3)", border: "none", cursor: bulkCat ? "pointer" : "not-allowed", fontWeight: 600, fontSize: 12 }}>Áp dụng</button>
          <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.15)" }} />
          <button onClick={() => bulkPatch({ featured: true }, `Đã đánh dấu ${selected.size} bài`)} style={{ padding: "6px 10px", borderRadius: 7, background: "rgba(255,215,0,0.12)", color: "#ffd700", border: "1px solid rgba(255,215,0,0.25)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>⭐</button>
          <button onClick={() => bulkPatch({ featured: false }, `Đã bỏ nổi bật ${selected.size} bài`)} style={{ padding: "6px 10px", borderRadius: 7, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", fontSize: 12 }}>☆</button>
          <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.15)" }} />
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowBulkTag(v => !v)} style={{ padding: "6px 10px", borderRadius: 7, background: "rgba(95,255,170,0.1)", color: "#5fffaa", border: "1px solid rgba(95,255,170,0.25)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>🏷 Thêm tag</button>
            {showBulkTag && (
              <Popover onClose={() => setShowBulkTag(false)} style={{ bottom: "100%", right: 0, marginBottom: 6, width: 240, padding: 10 }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Tag sẽ được thêm vào tất cả {selected.size} bài đã chọn (bỏ qua bài đã có tag này)</div>
                <input value={bulkTagInput} onChange={e => setBulkTagInput(e.target.value)} autoFocus placeholder="nhập tên tag..."
                  onKeyDown={e => e.key === "Enter" && bulkAddTag(bulkTagInput)}
                  style={{ width: "100%", padding: "7px 10px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box", marginBottom: 8 }} />
                <button onClick={() => bulkAddTag(bulkTagInput)} disabled={!bulkTagInput.trim()}
                  style={{ width: "100%", padding: "7px 0", borderRadius: 7, background: bulkTagInput.trim() ? "#146ef5" : "rgba(255,255,255,0.05)", color: bulkTagInput.trim() ? "#fff" : "rgba(255,255,255,0.3)", border: "none", cursor: bulkTagInput.trim() ? "pointer" : "not-allowed", fontWeight: 600, fontSize: 13 }}>
                  Thêm tag vào {selected.size} bài
                </button>
              </Popover>
            )}
          </div>
          <button onClick={bulkDelete} style={{ padding: "6px 10px", borderRadius: 7, background: "rgba(255,60,60,0.12)", color: "#ff6b6b", border: "1px solid rgba(255,60,60,0.25)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>🗑 Xoá</button>
          <button onClick={() => setSelected(new Set())} style={{ padding: "6px 8px", background: "none", color: "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", fontSize: 16 }}>×</button>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setDeleteConfirm(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 28, maxWidth: 400, width: "90%" }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Xác nhận xoá?</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 20 }}>
              "{posts.find(p => p._id === deleteConfirm)?.title}" sẽ bị xoá vĩnh viễn khỏi Sanity.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => deletePost(deleteConfirm)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: "#dc2626", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}>Xoá luôn</button>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: "rgba(255,255,255,0.07)", color: "#fff", fontWeight: 600, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}>Huỷ</button>
            </div>
          </div>
        </div>
      )}

      {showNewPost && (
        <NewPostModal onClose={() => setShowNewPost(false)} onCreated={p => { setPosts(prev => [p, ...prev]); showToast("Đã tạo bài viết. Vào Studio để thêm nội dung."); }} />
      )}

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
        .cover-overlay:hover, [class*="CoverCell"]:hover .cover-overlay { opacity: 1 !important; }
        tr:hover .cover-overlay { opacity: 1; }
      `}</style>
    </div>
  );
}
