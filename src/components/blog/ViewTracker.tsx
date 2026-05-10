"use client";
import { useEffect } from "react";

/** Fires once per page mount — increments viewCount via API (server-side dedupes per IP). */
export default function ViewTracker({ postId }: { postId: string }) {
  useEffect(() => {
    if (!postId) return;
    // Defer 1.5s to ensure user actually stays on page (not bounce within 1s)
    const timer = setTimeout(() => {
      fetch("/api/blog-engagement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, action: "view" }),
        keepalive: true,
      }).catch(() => {});
    }, 1500);
    return () => clearTimeout(timer);
  }, [postId]);
  return null;
}
