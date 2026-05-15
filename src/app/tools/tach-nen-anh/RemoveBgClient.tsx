"use client";

import dynamic from "next/dynamic";

/**
 * Client-only wrapper for RemoveBg.
 * Required because RemoveBg uses browser-only APIs (WebGPU, canvas, JSZip,
 * @huggingface/transformers) that fail during SSR/SSG.
 *
 * Next.js 15 App Router only allows `dynamic({ ssr: false })` from a client
 * component, so this thin wrapper exists to host that call.
 */
const RemoveBg = dynamic(() => import("./RemoveBg"), {
  ssr: false,
  loading: () => (
    <div
      className="rounded-2xl p-12 text-center"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="inline-block w-6 h-6 rounded-full border-2 border-white/15 border-t-white/60 animate-spin mb-3" />
      <div className="text-[0.88rem]" style={{ color: "var(--st-55)" }}>
        Đang khởi tạo công cụ tách nền...
      </div>
    </div>
  ),
});

export default function RemoveBgClient() {
  return <RemoveBg />;
}
