"use client";
import { useState } from "react";

type Comment = {
  _id: string;
  authorName: string;
  content: string;
  createdAt: string;
  parentId?: string;
};

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
  } catch {
    return iso;
  }
}

function avatarInitial(name: string): string {
  return name.trim().split(/\s+/).map((s) => s[0]).slice(-2).join("").toUpperCase() || "?";
}

export default function CommentSection({
  postId,
  initialComments,
}: {
  postId: string;
  initialComments: Comment[];
}) {
  const [comments] = useState<Comment[]>(initialComments);
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Tree structure: top-level + replies grouped by parentId
  const topLevel = comments.filter((c) => !c.parentId);
  const repliesByParent = new Map<string, Comment[]>();
  for (const c of comments) {
    if (c.parentId) {
      const arr = repliesByParent.get(c.parentId) || [];
      arr.push(c);
      repliesByParent.set(c.parentId, arr);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!authorName.trim() || !content.trim()) {
      setError("Vui lòng nhập tên và nội dung bình luận.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          authorName,
          authorEmail: authorEmail || undefined,
          content,
          parentId: replyTo?.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Có lỗi khi gửi bình luận. Vui lòng thử lại.");
      } else {
        setSuccess(data.message || "Bình luận đã gửi, đợi duyệt.");
        setAuthorName("");
        setAuthorEmail("");
        setContent("");
        setReplyTo(null);
      }
    } catch (e) {
      setError("Có lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="comments" className="mt-16 pt-12 border-t" style={{ borderColor: "var(--line)" }}>
      <h2 className="text-[1.5rem] font-bold tracking-tight text-white mb-2">
        {comments.length === 0 ? "Bình luận" : `${comments.length} bình luận`}
      </h2>
      <p className="text-[0.88rem] mb-8" style={{ color: "var(--ink-mute)" }}>
        Chia sẻ ý kiến của bạn — bình luận sẽ hiện sau khi duyệt.
      </p>

      {/* Comment list */}
      {comments.length > 0 && (
        <div className="flex flex-col gap-6 mb-12">
          {topLevel.map((c) => {
            const replies = repliesByParent.get(c._id) || [];
            return (
              <div key={c._id} className="flex flex-col gap-4">
                <CommentCard comment={c} onReply={setReplyTo} />
                {replies.length > 0 && (
                  <div className="ml-8 md:ml-12 flex flex-col gap-4 pl-5 border-l-2" style={{ borderColor: "rgba(20,110,245,0.25)" }}>
                    {replies.map((r) => (
                      <CommentCard key={r._id} comment={r} onReply={setReplyTo} isReply />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Comment form */}
      <div className="rounded-2xl p-6 md:p-7" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--line)" }}>
        <h3 className="text-[1.05rem] font-bold text-white mb-1">
          {replyTo ? `Trả lời ${replyTo.name}` : "Để lại bình luận"}
        </h3>
        {replyTo && (
          <button onClick={() => setReplyTo(null)} className="text-[0.78rem] mb-3" style={{ color: "#7da9ff" }}>
            Huỷ trả lời, viết bình luận mới ↓
          </button>
        )}
        <p className="text-[0.78rem] mb-5" style={{ color: "var(--ink-mute)" }}>
          Email không bắt buộc, không hiện công khai. Bình luận cần được duyệt trước khi hiển thị.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
              Bình luận <span style={{ color: "#ff5a72" }}>*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              maxLength={3000}
              required
              placeholder="Chia sẻ suy nghĩ của bạn..."
              className="w-full px-4 py-2.5 rounded-lg text-[0.95rem] outline-none transition-all resize-y"
              style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "white", fontFamily: "inherit", minHeight: 120 }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
                Tên <span style={{ color: "#ff5a72" }}>*</span>
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                maxLength={80}
                required
                className="w-full px-4 py-2.5 rounded-lg text-[0.95rem] outline-none transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "white", fontFamily: "inherit" }}
              />
            </div>
            <div>
              <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
                Email <span className="font-normal" style={{ color: "rgba(255,255,255,0.45)" }}>(không bắt buộc)</span>
              </label>
              <input
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg text-[0.95rem] outline-none transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "white", fontFamily: "inherit" }}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-lg px-4 py-2.5 text-[0.85rem]" style={{ background: "rgba(255,90,114,0.10)", border: "1px solid rgba(255,90,114,0.3)", color: "#ff5a72" }}>
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg px-4 py-2.5 text-[0.85rem]" style={{ background: "rgba(95,255,170,0.08)", border: "1px solid rgba(95,255,170,0.3)", color: "#5fffaa" }}>
              {success}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
              style={{ opacity: submitting ? 0.6 : 1 }}
            >
              {submitting ? "Đang gửi..." : "Gửi bình luận"} {!submitting && <span className="arrow">→</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CommentCard({
  comment,
  onReply,
  isReply,
}: {
  comment: Comment;
  onReply: (target: { id: string; name: string }) => void;
  isReply?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white text-[0.8rem]" style={{ background: "var(--grad-primary)" }}>
        {avatarInitial(comment.authorName)}
      </div>
      <div className="flex-1 min-w-0 rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)" }}>
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <span className="text-[0.88rem] font-bold text-white">{comment.authorName}</span>
          <span className="text-[0.72rem]" style={{ color: "var(--ink-mute)" }}>
            · {formatDate(comment.createdAt)}
          </span>
        </div>
        <div className="text-[0.92rem] leading-[1.65] whitespace-pre-wrap" style={{ color: "var(--ink-soft)" }}>
          {comment.content}
        </div>
        {!isReply && (
          <button
            onClick={() => {
              onReply({ id: comment._id, name: comment.authorName });
              setTimeout(() => {
                document.getElementById("comments")?.scrollIntoView({ behavior: "smooth", block: "end" });
              }, 50);
            }}
            className="mt-2 text-[0.78rem] font-semibold transition-colors"
            style={{ color: "#7da9ff" }}
          >
            ↶ Trả lời
          </button>
        )}
      </div>
    </div>
  );
}
