"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CVPurchaseActions({
  purchaseId,
  userId,
  status,
}: {
  purchaseId: string;
  userId: string;
  status: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function call(action: "confirm" | "cancel") {
    const labelMap = {
      confirm: `Confirm payment + GRANT PRO cho user ${userId.slice(-8)}?`,
      cancel: "Cancel purchase này? (không hoàn tác)",
    };
    if (!window.confirm(labelMap[action])) return;
    setLoading(action);
    setMsg(null);
    try {
      if (action === "confirm") {
        const res = await fetch("/api/cv/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "confirm", purchaseId }),
        });
        const json = await res.json();
        if (json.ok) {
          setMsg("✓ Granted Pro");
          router.refresh();
        } else {
          setMsg(`✗ ${json.error || "Lỗi"}`);
        }
      } else {
        // Cancel: direct update via admin endpoint - reuse confirm with payload
        const res = await fetch("/api/cv/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "cancel", purchaseId }),
        });
        const json = await res.json();
        if (json.ok) {
          setMsg("Cancelled");
          router.refresh();
        } else {
          setMsg(`✗ ${json.error || "Lỗi"}`);
        }
      }
    } catch (e) {
      setMsg(`✗ ${e instanceof Error ? e.message : "Lỗi"}`);
    } finally {
      setLoading(null);
    }
  }

  if (status === "paid") {
    return <span className="text-[0.72rem]" style={{ color: "var(--ink-faint)" }}>Đã grant Pro</span>;
  }
  if (status === "cancelled") {
    return <span className="text-[0.72rem]" style={{ color: "var(--ink-faint)" }}>Đã huỷ</span>;
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        disabled={loading !== null}
        onClick={() => call("confirm")}
        className="text-[0.74rem] font-semibold px-2 py-1 rounded text-white disabled:opacity-50 whitespace-nowrap"
        style={{ background: "var(--grad-primary)" }}
      >
        {loading === "confirm" ? "..." : "Confirm + Grant Pro"}
      </button>
      <button
        disabled={loading !== null}
        onClick={() => call("cancel")}
        className="text-[0.72rem] font-semibold px-2 py-1 rounded disabled:opacity-50 whitespace-nowrap"
        style={{ background: "rgba(255,90,114,0.12)", color: "#ff5a72", border: "1px solid rgba(255,90,114,0.25)" }}
      >
        {loading === "cancel" ? "..." : "Cancel"}
      </button>
      {msg && <span className="text-[0.7rem] mt-0.5" style={{ color: msg.startsWith("✓") ? "#5fffaa" : "#ff5a72" }}>{msg}</span>}
    </div>
  );
}
