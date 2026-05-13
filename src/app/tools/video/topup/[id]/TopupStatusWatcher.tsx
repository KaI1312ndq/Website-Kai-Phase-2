"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  paymentId: string;
  initialStatus: string;
  tokensReceived: number;
}

export default function TopupStatusWatcher({ paymentId, initialStatus, tokensReceived }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  // Poll status every 4s until completed/failed/expired (Realtime fallback)
  useEffect(() => {
    if (status === "completed" || status === "failed" || status === "expired" || status === "cancelled") {
      return;
    }

    let cancelled = false;
    const poll = async () => {
      try {
        const res = await fetch(`/api/video/topup/${paymentId}/status`, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        if (data.status && data.status !== status) {
          setStatus(data.status);
        }
      } catch {
        /* ignore */
      }
    };

    const interval = setInterval(poll, 4000);
    poll();
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [paymentId, status]);

  // Auto-redirect to dashboard 3s after success
  useEffect(() => {
    if (status === "completed") {
      setSecondsLeft(3);
      const t = setInterval(() => {
        setSecondsLeft((s) => {
          if (s === null) return null;
          if (s <= 1) {
            clearInterval(t);
            router.push("/tools/video/dashboard");
            return 0;
          }
          return s - 1;
        });
      }, 1000);
      return () => clearInterval(t);
    }
  }, [status, router]);

  if (status === "completed") {
    return (
      <div className="card-glass p-5 mb-6 text-center" style={{ background: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.3)" }}>
        <div className="text-2xl mb-2">✅</div>
        <div className="t-h4 text-white mb-1">Thanh toán thành công!</div>
        <p style={{ color: "var(--ink-soft)" }}>
          {tokensReceived.toLocaleString("vi-VN")} token đã được cộng vào tài khoản.
          {secondsLeft !== null && ` Chuyển về dashboard sau ${secondsLeft}s...`}
        </p>
      </div>
    );
  }

  if (status === "failed" || status === "cancelled") {
    return (
      <div className="card-glass p-5 mb-6 text-center" style={{ background: "rgba(239, 68, 68, 0.1)" }}>
        <div className="t-h4 text-white">Thanh toán không thành công</div>
        <p style={{ color: "var(--ink-soft)" }}>Trạng thái: {status}</p>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="card-glass p-5 mb-6 text-center" style={{ background: "rgba(251, 191, 36, 0.1)" }}>
        <div className="t-h4 text-white">Mã QR đã hết hạn</div>
        <p style={{ color: "var(--ink-soft)" }}>Vui lòng tạo giao dịch mới.</p>
      </div>
    );
  }

  return (
    <div className="card-glass p-4 mb-6 flex items-center gap-3" style={{ background: "var(--st-05)" }}>
      <div className="animate-pulse w-3 h-3 rounded-full" style={{ background: "var(--accent)" }} />
      <span className="text-sm" style={{ color: "var(--ink-soft)" }}>
        Đang chờ thanh toán... Hệ thống tự kiểm tra mỗi 4 giây.
      </span>
    </div>
  );
}
