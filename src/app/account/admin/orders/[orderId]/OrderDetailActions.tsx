"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  orderId: string;
  orderNumber: string;
  paymentStatus: string;
  deliveryStatus: string;
};

export default function OrderDetailActions({ orderId, orderNumber, paymentStatus, deliveryStatus }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function call(action: string, body: object, confirmText?: string) {
    if (confirmText && !confirm(confirmText)) return;
    setLoading(action);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...body }),
      });
      const json = await res.json();
      if (json.ok) {
        setMsg({ ok: true, text: json.message || "✓ Thành công" });
        router.refresh();
      } else {
        setMsg({ ok: false, text: json.error || "Lỗi" });
      }
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Lỗi mạng" });
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex flex-wrap gap-2">
        <Link
          href={`/shop/order/${orderNumber}`}
          target="_blank"
          className="px-3 py-1.5 rounded-md text-[0.8rem] font-semibold border"
          style={{ borderColor: "var(--st-15)", color: "var(--ink)", background: "var(--st-04)" }}
        >
          Mở trang khách
        </Link>

        {deliveryStatus !== "delivered" && (
          <button
            disabled={loading !== null}
            onClick={() => call("deliver", {}, "Confirm: đánh dấu đã thanh toán + gửi email file cho khách?")}
            className="px-3 py-1.5 rounded-md text-[0.8rem] font-semibold text-white disabled:opacity-50"
            style={{ background: "var(--grad-primary)" }}
          >
            {loading === "deliver" ? "..." : paymentStatus === "paid" ? "Gửi file" : "Đã thanh toán + gửi file"}
          </button>
        )}

        {deliveryStatus === "delivered" && (
          <button
            disabled={loading !== null}
            onClick={() => call("resend", {}, "Resend email file cho khách?")}
            className="px-3 py-1.5 rounded-md text-[0.8rem] font-semibold text-white disabled:opacity-50"
            style={{ background: "var(--grad-primary)" }}
          >
            {loading === "resend" ? "..." : "Resend email"}
          </button>
        )}

        {paymentStatus !== "refunded" && (
          <button
            disabled={loading !== null}
            onClick={() => call("refund", {}, "Xác nhận HOÀN TIỀN đơn này? Action này không hoàn tác - status sẽ chuyển sang 'refunded'.")}
            className="px-3 py-1.5 rounded-md text-[0.8rem] font-semibold disabled:opacity-50"
            style={{ background: "rgba(255,90,114,0.15)", color: "#ff5a72", border: "1px solid rgba(255,90,114,0.3)" }}
          >
            {loading === "refund" ? "..." : "Hoàn tiền"}
          </button>
        )}

        <button
          disabled={loading !== null}
          onClick={() => {
            const text = prompt("Thêm note admin (nhập rỗng để xóa):");
            if (text === null) return;
            call("note", { notes: text });
          }}
          className="px-3 py-1.5 rounded-md text-[0.8rem] font-semibold disabled:opacity-50"
          style={{ background: "var(--st-04)", color: "var(--ink)", border: "1px solid var(--st-12)" }}
        >
          {loading === "note" ? "..." : "Edit notes"}
        </button>
      </div>

      {msg && (
        <div className="text-[0.78rem] font-semibold" style={{ color: msg.ok ? "#5fffaa" : "#ff5a72" }}>
          {msg.text}
        </div>
      )}
    </div>
  );
}
