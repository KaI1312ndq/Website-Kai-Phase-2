"use client";

import { useState, useEffect, useRef } from "react";
import { CATEGORIES, catColor, catLabel, type Post } from "./PostsClient";
import {
  IcX, IcUpload, IcImage, IcTag, IcPlus, IcCheck, IcAlertCircle, IcExternal,
} from "./Icons";

/**
 * Full post editor - edit EVERYTHING in admin without going to Studio.
 * Body: simple textarea with markdown-like syntax converted to Portable Text.
 */

type Block = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3" | "blockquote";
  markDefs: any[];
  children: { _type: "span"; _key: string; text: string; marks: string[] }[];
};

async function api(url: string, opts?: RequestInit) {
  const r = await fetch(url, { ...opts, headers: { "Content-Type": "application/json", ...(opts?.headers || {}) } });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

function autoSlug(t: string) {
  return t.toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a").replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ìíịỉĩ]/g, "i").replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ùúụủũưừứựửữ]/g, "u").replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/đ/g, "d").replace(/[^a-z0-9\s-]/g, "").trim()
    .replace(/\s+/g, "-").slice(0, 80);
}

function uid() { return Math.random().toString(36).slice(2, 10); }

/** Convert markdown-like text to Portable Text blocks */
function textToBlocks(text: string): Block[] {
  const lines = text.split("\n");
  const blocks: Block[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let style: Block["style"] = "normal";
    let content = trimmed;

    if (trimmed.startsWith("## ")) { style = "h2"; content = trimmed.slice(3); }
    else if (trimmed.startsWith("### ")) { style = "h3"; content = trimmed.slice(4); }
    else if (trimmed.startsWith("> ")) { style = "blockquote"; content = trimmed.slice(2); }

    // Handle bold: **text** -> marks: ["strong"]
    const children: Block["children"] = [];
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    let i = 0;
    for (const part of parts) {
      if (!part) continue;
      if (part.startsWith("**") && part.endsWith("**")) {
        children.push({ _type: "span", _key: uid(), text: part.slice(2, -2), marks: ["strong"] });
      } else {
        children.push({ _type: "span", _key: uid(), text: part, marks: [] });
      }
      i++;
    }
    if (children.length === 0) children.push({ _type: "span", _key: uid(), text: content, marks: [] });

    blocks.push({ _type: "block", _key: uid(), style, markDefs: [], children });
  }
  return blocks;
}

/** Convert Portable Text blocks back to markdown-like text */
function blocksToText(blocks: any[] | undefined | null): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks.map(b => {
    if (b._type !== "block") return "";
    const text = (b.children || []).map((c: any) => {
      const t = c.text || "";
      return c.marks?.includes("strong") ? `**${t}**` : t;
    }).join("");
    if (b.style === "h2") return `## ${text}`;
    if (b.style === "h3") return `### ${text}`;
    if (b.style === "blockquote") return `> ${text}`;
    return text;
  }).join("\n\n");
}

export default function PostEditor({ post, isNew, onClose, onSaved }: {
  post: Post | null;
  isNew: boolean;
  onClose: () => void;
  onSaved: (updated: Post) => void;
}) {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug?.current || "");
  const [category, setCategory] = useState(post?.category || "ecom");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [tagsStr, setTagsStr] = useState((post?.tags || []).join(", "));
  const [featured, setFeatured] = useState(post?.featured || false);
  const [coverUrl, setCoverUrl] = useState(post?.coverUrl || "");
  const [bodyText, setBodyText] = useState("");
  const [bodyLoaded, setBodyLoaded] = useState(isNew);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [uploading, setUploading] = useState(false);
  const [autoSlugged, setAutoSlugged] = useState(isNew);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  // Fetch full body when editing existing post
  useEffect(() => {
    if (isNew || !post) return;
    (async () => {
      try {
        const data = await api(`/api/admin/posts/${post._id}`);
        setBodyText(blocksToText(data.body));
        setBodyLoaded(true);
      } catch {
        setErr("Không tải được nội dung bài");
        setBodyLoaded(true);
      }
    })();
  }, [isNew, post]);

  // Auto-update slug when title changes (only if user hasn't manually edited it)
  function handleTitleChange(v: string) {
    setTitle(v);
    if (autoSlugged || !slug) setSlug(autoSlug(v));
  }

  async function handleCoverUpload(file: File) {
    if (!file.type.startsWith("image/")) { setErr("Chỉ chấp nhận file ảnh"); return; }
    if (file.size > 8 * 1024 * 1024) { setErr("Ảnh phải nhỏ hơn 8MB"); return; }
    setUploading(true); setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      if (post?._id) fd.append("postId", post._id);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCoverUrl(data.url);
    } catch (e: any) { setErr("Lỗi upload: " + e.message); }
    finally { setUploading(false); }
  }

  async function save() {
    if (!title.trim()) { setErr("Cần có tiêu đề"); return; }
    setSaving(true); setErr("");

    const tags = tagsStr.split(",").map(t => t.trim().toLowerCase()).filter(Boolean);
    const blocks = textToBlocks(bodyText);

    try {
      if (isNew) {
        // Create new post
        const data = await api("/api/admin/posts", {
          method: "POST",
          body: JSON.stringify({
            title: title.trim(), slug: slug || autoSlug(title),
            excerpt: excerpt.trim(), category, tags, featured,
          }),
        });
        // Patch body separately if any content
        if (blocks.length > 0) {
          await api("/api/admin/posts", {
            method: "PATCH",
            body: JSON.stringify({ id: data.id, patch: { body: blocks } }),
          });
        }
        onSaved({
          _id: data.id,
          title: title.trim(),
          slug: { current: slug || autoSlug(title) },
          category, featured, tags,
          excerpt: excerpt.trim(),
          publishedAt: new Date().toISOString(),
          hasBody: blocks.length > 0,
          wordCount: bodyText.split(/\s+/).filter(Boolean).length,
          coverUrl,
        });
      } else if (post) {
        // Update existing
        const patch: any = {
          title: title.trim(),
          slug: { _type: "slug", current: slug || autoSlug(title) },
          excerpt: excerpt.trim(),
          category, tags, featured,
          body: blocks,
        };
        await api("/api/admin/posts", { method: "PATCH", body: JSON.stringify({ id: post._id, patch }) });
        onSaved({
          ...post,
          title: title.trim(),
          slug: { current: slug || autoSlug(title) },
          category, featured, tags,
          excerpt: excerpt.trim(),
          hasBody: blocks.length > 0,
          wordCount: bodyText.split(/\s+/).filter(Boolean).length,
          coverUrl,
        });
      }
    } catch (e: any) { setErr(e.message || "Lỗi lưu"); }
    finally { setSaving(false); }
  }

  // Esc to close
  useEffect(() => {
    function h(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "s") { e.preventDefault(); save(); }
    }
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  });

  const lbl: React.CSSProperties = { fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 };
  const inp: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 9, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };

  const wordCount = bodyText.split(/\s+/).filter(Boolean).length;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", justifyContent: "flex-end", animation: "fadeIn 0.15s ease" }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ width: "100%", maxWidth: 920, height: "100vh", background: "#0c0c14", borderLeft: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", animation: "slideIn 0.2s ease" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.4)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", borderRadius: 8, padding: "6px 8px", cursor: "pointer", display: "flex" }}>
              <IcX size={14} />
            </button>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{isNew ? "Tạo bài mới" : "Sửa bài"}</div>
              {!isNew && post && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{post._id}</div>}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {!isNew && post?.slug?.current && (
              <a href={`/blog/${post.slug.current}`} target="_blank"
                style={{ padding: "7px 12px", borderRadius: 8, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none", fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}>
                <IcExternal size={12} /> Xem live
              </a>
            )}
            <button onClick={save} disabled={saving || !bodyLoaded}
              style={{ padding: "8px 18px", borderRadius: 9, background: saving ? "rgba(20,110,245,0.4)" : "linear-gradient(135deg,#146ef5,#7a3dff)", color: "#fff", fontWeight: 700, fontSize: 13, border: "none", cursor: saving ? "wait" : "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <IcCheck size={14} /> {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 60px" }}>
          {err && (
            <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(255,100,100,0.12)", border: "1px solid rgba(255,100,100,0.3)", color: "#ff8888", fontSize: 13, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <IcAlertCircle size={14} /> {err}
            </div>
          )}

          {/* Cover image */}
          <div style={{ marginBottom: 20 }}>
            <div style={lbl}>Ảnh bìa</div>
            <div
              onClick={() => coverInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); }}
              onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleCoverUpload(f); }}
              style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", background: coverUrl ? "transparent" : "rgba(255,255,255,0.04)", border: coverUrl ? "1px solid rgba(255,255,255,0.1)" : "2px dashed rgba(255,255,255,0.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {coverUrl ? (
                <>
                  <img src={`${coverUrl}?w=1280&h=720&fit=crop`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div className="cover-edit-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#fff", opacity: 0, transition: "opacity 0.15s" }}>
                    <IcUpload size={16} /> Click hoặc kéo ảnh mới vào đây
                  </div>
                </>
              ) : (
                <div style={{ color: "rgba(255,255,255,0.4)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <IcImage size={32} />
                  <div style={{ fontSize: 13 }}>Click hoặc kéo thả ảnh vào đây</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>JPG/PNG/WebP - tối đa 8MB</div>
                </div>
              )}
              {uploading && (
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", color: "#5fffaa", fontSize: 13, fontWeight: 600 }}>
                  Đang upload...
                </div>
              )}
            </div>
            <input ref={coverInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => e.target.files?.[0] && handleCoverUpload(e.target.files[0])} />
          </div>

          {/* Title */}
          <div style={{ marginBottom: 16 }}>
            <div style={lbl}>Tiêu đề *</div>
            <input value={title} onChange={e => handleTitleChange(e.target.value)} autoFocus={isNew}
              placeholder="Tiêu đề bài viết..."
              style={{ ...inp, fontSize: 18, fontWeight: 600 }} />
          </div>

          {/* Slug + Category */}
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, marginBottom: 16 }}>
            <div>
              <div style={lbl}>Slug (URL) <span style={{ textTransform: "none", color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>· /blog/{slug || autoSlug(title) || "..."}</span></div>
              <input value={slug} onChange={e => { setSlug(e.target.value); setAutoSlugged(false); }}
                placeholder="tu-dong-tao-tu-tieu-de" style={inp} />
            </div>
            <div>
              <div style={lbl}>Danh mục</div>
              <select value={category} onChange={e => setCategory(e.target.value)} style={{ ...inp, cursor: "pointer" }}>
                {Object.entries(CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div style={{ marginBottom: 16 }}>
            <div style={lbl}>Tóm tắt <span style={{ textTransform: "none", color: excerpt.length >= 120 && excerpt.length <= 180 ? "#5fffaa" : "rgba(255,255,255,0.35)", fontWeight: 400 }}>· {excerpt.length} ký tự (lý tưởng 120-180)</span></div>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3}
              placeholder="1-2 câu mô tả ngắn hiển thị trên list bài + Google search..."
              style={{ ...inp, resize: "vertical", minHeight: 70 }} />
          </div>

          {/* Tags */}
          <div style={{ marginBottom: 16 }}>
            <div style={lbl}>Tags <span style={{ textTransform: "none", color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>· phẩy ngăn cách</span></div>
            <input value={tagsStr} onChange={e => setTagsStr(e.target.value)}
              placeholder="shopee, phi san, unit economics"
              style={inp} />
            {tagsStr && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                {tagsStr.split(",").map(t => t.trim()).filter(Boolean).map((t, i) => (
                  <span key={i} style={{ padding: "2px 9px", borderRadius: 10, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                    <IcTag size={10} /> {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Featured */}
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 20, padding: "10px 14px", borderRadius: 10, background: featured ? "rgba(255,215,0,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${featured ? "rgba(255,215,0,0.3)" : "rgba(255,255,255,0.08)"}` }}>
            <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} />
            <div>
              <div style={{ color: featured ? "#ffd700" : "#fff", fontSize: 14, fontWeight: 600 }}>Bài nổi bật</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>Hiển thị ở phần "Featured Posts" trên trang blog</div>
            </div>
          </label>

          {/* Body content */}
          <div>
            <div style={{ ...lbl, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Nội dung bài viết</span>
              <span style={{ textTransform: "none", fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>{wordCount.toLocaleString()} từ · {bodyText.length.toLocaleString()} ký tự</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px", marginBottom: 8, fontSize: 11.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              <strong style={{ color: "rgba(255,255,255,0.75)" }}>Cú pháp đơn giản:</strong> mỗi đoạn cách nhau bằng dòng trống ·
              <code style={{ background: "rgba(255,255,255,0.07)", padding: "1px 6px", borderRadius: 3, margin: "0 4px" }}>## tiêu đề</code> = H2 ·
              <code style={{ background: "rgba(255,255,255,0.07)", padding: "1px 6px", borderRadius: 3, margin: "0 4px" }}>### tiêu đề</code> = H3 ·
              <code style={{ background: "rgba(255,255,255,0.07)", padding: "1px 6px", borderRadius: 3, margin: "0 4px" }}>{`> trích dẫn`}</code> = blockquote ·
              <code style={{ background: "rgba(255,255,255,0.07)", padding: "1px 6px", borderRadius: 3, margin: "0 4px" }}>**bold**</code> = in đậm
            </div>
            {!bodyLoaded ? (
              <div style={{ padding: 40, textAlign: "center", color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.03)", borderRadius: 10 }}>Đang tải nội dung...</div>
            ) : (
              <textarea ref={bodyRef} value={bodyText} onChange={e => setBodyText(e.target.value)}
                placeholder={`## Mở đầu\n\nĐoạn văn bình thường ở đây.\n\n## Phần chính\n\nThêm **chữ in đậm** vào đây.\n\n> Đây là một câu blockquote nổi bật.\n\n### Tiêu đề phụ\n\nNội dung tiếp theo...`}
                rows={24}
                style={{ ...inp, fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13.5, lineHeight: 1.7, resize: "vertical", minHeight: 380 }} />
            )}
          </div>
        </div>

        {/* Footer hint */}
        <div style={{ padding: "10px 24px", borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.4)", fontSize: 11, color: "rgba(255,255,255,0.4)", display: "flex", justifyContent: "space-between" }}>
          <span>Esc đóng · Ctrl+S lưu</span>
          <span>{isNew ? "Bài mới sẽ được publish ngay sau khi lưu" : `Cập nhật: ${post?._updatedAt ? new Date(post._updatedAt).toLocaleString("vi-VN") : "—"}`}</span>
        </div>
      </div>

      <style>{`
        @keyframes slideIn { from { transform: translateX(40px); opacity: 0 } to { transform: none; opacity: 1 } }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .cover-edit-overlay:hover, [class*="cover-edit-overlay"]:hover { opacity: 1 !important; }
        .cover-edit-overlay { pointer-events: none; }
        div:hover > .cover-edit-overlay { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
