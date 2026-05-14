"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Track pageview every time pathname changes - first-party, sent to /api/track-pageview.
export default function PageviewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    // Skip admin + studio routes
    if (pathname.startsWith("/account/admin") || pathname.startsWith("/admin") || pathname.startsWith("/studio")) return;

    let sessionId = "";
    try {
      sessionId = sessionStorage.getItem("ndq_sid") || "";
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem("ndq_sid", sessionId);
      }
    } catch {}

    const body = JSON.stringify({
      path: pathname,
      referrer: document.referrer || null,
      sessionId,
    });

    // Use sendBeacon nếu có (không block navigation)
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/track-pageview", blob);
    } else {
      fetch("/api/track-pageview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
