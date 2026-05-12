"use client";
import { useEffect, useState } from "react";

/**
 * Engagement bar: Like + Bookmark + Comment count + View count.
 * - Like: anonymous, persisted in localStorage; backend stores total counter.
 * - Bookmark: localStorage-only (per-device).
 */

const LIKE_KEY = (id: string) => `blog:liked:${id}`;
const BOOKMARK_KEY = (id: string) => `blog:bookmarked:${id}`;

function readBool(key: string): boolean {
  if (typeof window === "undefined") return false;
  try { return window.localStorage.getItem(key) === "1"; } catch { return false; }
}
function writeBool(key: string, val: boolean) {
  try { window.localStorage.setItem(key, val ? "1" : "0"); } catch {}
}

export default function EngagementBar({
  postId,
  initialLikes,
  initialViews,
  commentCount,
}: {
  postId: string;
  initialLikes: number;
  initialViews: number;
  commentCount: number;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setLiked(readBool(LIKE_KEY(postId)));
    setBookmarked(readBool(BOOKMARK_KEY(postId)));
  }, [postId]);

  async function toggleLike() {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikes((l) => l + (nextLiked ? 1 : -1));
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);
    writeBool(LIKE_KEY(postId), nextLiked);
    try {
      await fetch("/api/blog-engagement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, action: nextLiked ? "like" : "unlike" }),
        keepalive: true,
      });
    } catch {
      // Revert on error
      setLiked(!nextLiked);
      setLikes((l) => l + (nextLiked ? -1 : 1));
      writeBool(LIKE_KEY(postId), !nextLiked);
    }
  }

  function toggleBookmark() {
    const next = !bookmarked;
    setBookmarked(next);
    writeBool(BOOKMARK_KEY(postId), next);
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Like */}
      <button
        onClick={toggleLike}
        aria-label={liked ? "Bỏ thích" : "Thích bài viết"}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-[0.85rem] font-semibold transition-all"
        style={{
          background: liked ? "rgba(255,90,114,0.15)" : "var(--st-04)",
          border: `1px solid ${liked ? "rgba(255,90,114,0.4)" : "var(--st-10)"}`,
          color: liked ? "#ff5a72" : "var(--st-85)",
          transform: animating ? "scale(1.08)" : "scale(1)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span>{likes > 0 ? likes : "Thích"}</span>
      </button>

      {/* Bookmark */}
      <button
        onClick={toggleBookmark}
        aria-label={bookmarked ? "Bỏ lưu" : "Lưu để đọc sau"}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-[0.85rem] font-semibold transition-all"
        style={{
          background: bookmarked ? "rgba(255,212,121,0.15)" : "var(--st-04)",
          border: `1px solid ${bookmarked ? "rgba(255,212,121,0.4)" : "var(--st-10)"}`,
          color: bookmarked ? "#ffd479" : "var(--st-85)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        <span className="hidden sm:inline">{bookmarked ? "Đã lưu" : "Lưu"}</span>
      </button>

      {/* Comment jump */}
      <a
        href="#comments"
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-[0.85rem] font-semibold transition-all"
        style={{ background: "var(--st-04)", border: "1px solid var(--st-10)", color: "var(--st-85)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span>{commentCount > 0 ? commentCount : "Bình luận"}</span>
      </a>

      {/* View count display */}
      <div
        className="inline-flex items-center gap-2 px-3.5 py-2 ml-auto text-[0.82rem]"
        style={{ color: "var(--st-50)" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
        </svg>
        <span>{(initialViews || 0).toLocaleString("vi-VN")} lượt xem</span>
      </div>
    </div>
  );
}
