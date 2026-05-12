"use client";

import { useState } from "react";

export default function UpgradeClient({ userEmail, orderRef }: { userEmail: string; orderRef: string }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleConfirm() {
    if (!window.confirm("Bạn đã chuyển khoản 49.000đ với đúng nội dung CK chưa?")) return;
    setLoading(true);
    setMsg(null);
    try {
      const r = await fetch("/api/cv/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentRef: orderRef }),
      });
      const json = await r.json();
      if (json.ok) {
        setMsg({ ok: true, text: `✓ Đã tạo đơn ${json.purchaseId.slice(0, 8)}. Admin sẽ confirm trong 1-24h. Email confirm sẽ gửi tới ${userEmail || "email của bạn"}.` });
      } else {
        setMsg({ ok: false, text: json.error || "Lỗi" });
      }
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Lỗi mạng" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={handleConfirm} disabled={loading} className="btn btn-primary w-full justify-center disabled:opacity-50">
        {loading ? "Đang gửi..." : "✓ Xác nhận đã chuyển khoản"}
      </button>
      {msg && (
        <div className="text-[0.85rem] mt-3 p-3 rounded-lg" style={{
          background: msg.ok ? "rgba(95,255,170,0.10)" : "rgba(255,90,114,0.10)",
          color: msg.ok ? "#5fffaa" : "#ff5a72",
          border: `1px solid ${msg.ok ? "rgba(95,255,170,0.25)" : "rgba(255,90,114,0.25)"}`,
        }}>
          {msg.text}
        </div>
      )}
    </>
  );
}
