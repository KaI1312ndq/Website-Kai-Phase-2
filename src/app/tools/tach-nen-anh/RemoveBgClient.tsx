"use client";

import { useEffect, useState, type ComponentType } from "react";

/**
 * Client-only wrapper that lazy-loads RemoveBg via useEffect (not next/dynamic).
 * This guarantees the heavy component (Transformers.js / JSZip / WebGPU) never
 * even gets evaluated during server render of the page.
 */
export default function RemoveBgClient() {
  const [RemoveBg, setRemoveBg] = useState<ComponentType<{}> | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import("./RemoveBg")
      .then((mod) => {
        if (!cancelled) setRemoveBg(() => mod.default);
      })
      .catch((err) => {
        console.error("Failed to load RemoveBg:", err);
        if (!cancelled) setLoadError(true);
      });
    return () => { cancelled = true; };
  }, []);

  if (loadError) {
    return (
      <div className="rounded-2xl p-8 text-center"
        style={{ background: "rgba(255,100,100,0.06)", border: "1px solid rgba(255,100,100,0.25)", color: "#ff8888" }}>
        Lỗi tải công cụ. Vui lòng reload trang.
      </div>
    );
  }

  if (!RemoveBg) {
    return (
      <div className="rounded-2xl p-12 text-center"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="inline-block w-6 h-6 rounded-full border-2 border-white/15 border-t-white/60 animate-spin mb-3" />
        <div className="text-[0.88rem]" style={{ color: "var(--st-55)" }}>
          Đang khởi tạo công cụ tách nền...
        </div>
      </div>
    );
  }

  return <RemoveBg />;
}
