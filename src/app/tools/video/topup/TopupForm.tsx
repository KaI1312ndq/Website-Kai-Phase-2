"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BONUS_TIERS, MIN_TOPUP_VND, MAX_TOPUP_VND, computeTokensForTopup } from "@/lib/video/pricing";

const QUICK_AMOUNTS = [100_000, 500_000, 1_000_000, 5_000_000];

export default function TopupForm() {
  const router = useRouter();
  const [amountStr, setAmountStr] = useState("100000");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amount = useMemo(() => {
    const n = Number(amountStr.replace(/[^\d]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }, [amountStr]);

  const preview = useMemo(() => computeTokensForTopup(amount), [amount]);

  const valid = amount >= MIN_TOPUP_VND && amount <= MAX_TOPUP_VND;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/video/topup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount_vnd: amount }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Có lỗi xảy ra");
        return;
      }
      router.push(`/tools/video/topup/${data.payment_id}`);
    } catch (err) {
      setError(String(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-glass p-6 space-y-6">
      {/* Amount input */}
      <div>
        <label className="block text-sm mb-2 font-semibold text-white">Số tiền muốn nạp (VNĐ)</label>
        <input
          type="text"
          inputMode="numeric"
          value={Number(amountStr.replace(/[^\d]/g, "") || 0).toLocaleString("vi-VN")}
          onChange={(e) => setAmountStr(e.target.value)}
          className="input-dark w-full text-2xl font-bold"
          placeholder="100.000"
        />
        <div className="flex gap-2 mt-3 flex-wrap">
          {QUICK_AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAmountStr(String(a))}
              className="px-3 py-1.5 rounded text-sm border transition-colors"
              style={{
                borderColor: amount === a ? "var(--accent)" : "var(--st-15)",
                color: amount === a ? "var(--accent)" : "var(--ink-soft)",
                background: amount === a ? "var(--st-08)" : "transparent",
              }}
            >
              {(a / 1000).toLocaleString("vi-VN")}k
            </button>
          ))}
        </div>
        <div className="text-xs mt-2" style={{ color: "var(--ink-mute)" }}>
          Min {MIN_TOPUP_VND.toLocaleString("vi-VN")}đ · Max {MAX_TOPUP_VND.toLocaleString("vi-VN")}đ
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-lg p-5" style={{ background: "var(--st-05)" }}>
        <div className="flex justify-between items-center mb-2">
          <span style={{ color: "var(--ink-soft)" }}>Token cơ bản</span>
          <span className="font-semibold text-white">{preview.baseTokens.toLocaleString("vi-VN")} token</span>
        </div>
        {preview.bonusTokens > 0 && (
          <div className="flex justify-between items-center mb-2">
            <span className="grad-text font-semibold">Bonus +{preview.bonusPercent}%</span>
            <span className="grad-text font-semibold">+{preview.bonusTokens.toLocaleString("vi-VN")} token</span>
          </div>
        )}
        <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: "var(--st-15)" }}>
          <span className="text-white font-semibold">Bạn nhận được</span>
          <span className="t-h3 grad-text font-bold">{preview.totalTokens.toLocaleString("vi-VN")} token</span>
        </div>
      </div>

      {/* Bonus tier hint */}
      <div className="text-sm" style={{ color: "var(--ink-soft)" }}>
        💡 Mẹo nạp nhiều bonus cao: {BONUS_TIERS.slice(0, 3).map((t) =>
          `${(t.minVnd / 1000_000).toFixed(t.minVnd >= 1_000_000 ? 0 : 1)}M +${t.bonusPercent}%`
        ).join(" · ")}
      </div>

      {error && (
        <div className="rounded-lg p-3 text-sm" style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!valid || submitting}
        className="btn btn-primary w-full text-[1.05rem] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Đang tạo mã QR..." : `Nạp ${amount.toLocaleString("vi-VN")}đ → ${preview.totalTokens} token`}
      </button>
    </form>
  );
}
