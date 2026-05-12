"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderActions({
  orderId,
  paymentStatus,
  deliveryStatus,
}: {
  orderId: string;
  paymentStatus: string;
  deliveryStatus: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function deliver() {
    if (!confirm("Confirm: đánh dấu đã thanh toán + gửi email file cho khách?")) return;
    setLoading(true);
    setMsg(null);
    try {
      const r = await fetch("/api/orders/deliver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const json = await r.json();
      if (json.ok) {
        setMsg("✓ Đã gửi");
        router.refresh();
      } else {
        setMsg(`✗ ${json.error || "Lỗi"}`);
      }
    } catch (e) {
      setMsg(`✗ ${e instanceof Error ? e.message : "Lỗi"}`);
    } finally {
      setLoading(false);
    }
  }

  if (deliveryStatus === "delivered") {
    return <span className="text-[0.72rem]" style={{ color: "var(--ink-mute)" }}>Đã gửi ✓</span>;
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={deliver}
        disabled={loading}
        className="text-[0.72rem] font-semibold px-2 py-1 rounded disabled:opacity-50"
        style={{ background: "var(--grad-primary)", color: "white" }}
      >
        {loading ? "..." : paymentStatus === "paid" ? "Gửi file" : "Đã thanh toán + gửi"}
      </button>
      {msg && <span className="text-[0.7rem]" style={{ color: msg.startsWith("✓") ? "#5fffaa" : "#ff5a72" }}>{msg}</span>}
    </div>
  );
}
