"use client";

import { useEffect, useState } from "react";

interface Props {
  videoId: string;
  initialStatus: string;
  initialProgress: number;
  initialMessage: string | null;
  initialOutputUrl: string | null;
  initialThumbnail: string | null;
  initialError: string | null;
  initialScript?: string | null;
  tokenCost: number;
  watermark: boolean;
}

const STATUS_LABEL: Record<string, string> = {
  pending: "Chờ worker pick up...",
  scripting: "AI đang viết kịch bản",
  imaging: "Đang tạo hình ảnh từ prompt",
  animating: "Đang animate clip với Kling 3.0",
  composing: "Đang ghép clip + giọng đọc + music",
  completed: "Hoàn tất",
  failed: "Lỗi - đã refund 100% token",
  refunded: "Đã hoàn token",
  cancelled: "Đã huỷ",
};

const ACTIVE_STATUSES = new Set(["pending", "scripting", "imaging", "animating", "composing"]);

export default function VideoStatusWatcher(props: Props) {
  const [status, setStatus] = useState(props.initialStatus);
  const [progress, setProgress] = useState(props.initialProgress);
  const [message, setMessage] = useState(props.initialMessage);
  const [outputUrl, setOutputUrl] = useState(props.initialOutputUrl);
  const [thumbnail, setThumbnail] = useState(props.initialThumbnail);
  const [error, setError] = useState(props.initialError);
  const [script, setScript] = useState(props.initialScript ?? null);

  useEffect(() => {
    if (!ACTIVE_STATUSES.has(status)) return;

    let cancelled = false;
    const tick = async () => {
      try {
        const res = await fetch(`/api/video/${props.videoId}/status`, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        setStatus(data.status);
        setProgress(data.progress_percent ?? 0);
        setMessage(data.status_message);
        setOutputUrl(data.output_url);
        setThumbnail(data.thumbnail_url);
        setError(data.error_message);
        if (data.script_text) setScript(data.script_text);
      } catch {
        /* ignore */
      }
    };

    const interval = setInterval(tick, 3000);
    tick();
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [props.videoId, status]);

  if (status === "completed" && outputUrl) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border-2 overflow-hidden flex justify-center" style={{ background: "#000", borderColor: "rgba(255,255,255,0.10)" }}>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src={outputUrl}
            poster={thumbnail ?? undefined}
            controls
            playsInline
            className="bg-black"
            style={{ aspectRatio: "9 / 16", maxHeight: "75vh", objectFit: "contain" }}
          />
        </div>
        <div className="text-xs text-center" style={{ color: "var(--ink-mute)" }}>
          Định dạng 9:16 dọc cho TikTok / Reels / Shopee Video
        </div>

        {props.watermark && (
          <div className="card-glass p-3 text-sm" style={{ background: "rgba(251, 191, 36, 0.1)", color: "#fbbf24" }}>
            Video này có watermark vì đang ở chế độ Eco. Upgrade Pro để bỏ watermark.
          </div>
        )}

        <div className="flex gap-3 flex-wrap">
          <a href={outputUrl} download className="btn btn-primary">
            ⬇ Tải MP4
          </a>
          <a href={outputUrl} target="_blank" rel="noopener" className="btn btn-ghost">
            Mở tab mới
          </a>
        </div>

        {script && <ScriptBox script={script} />}
      </div>
    );
  }

  if (status === "failed" || status === "refunded") {
    return (
      <div className="rounded-2xl border-2 p-6" style={{ background: "rgba(239, 68, 68, 0.08)", borderColor: "rgba(239, 68, 68, 0.3)" }}>
        <h3 className="t-h4 text-white mb-2">Render thất bại</h3>
        <p className="text-sm mb-3" style={{ color: "var(--ink-soft)" }}>
          {error ?? message ?? "Worker không hoàn tất sau 3 lần retry."}
        </p>
        <div className="text-sm grad-text font-semibold">
          ✓ Đã hoàn {props.tokenCost} token vào tài khoản của bạn.
        </div>
      </div>
    );
  }

  // Active state - show progress
  return (
    <div className="rounded-2xl border-2 p-6" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-white">{STATUS_LABEL[status] ?? status}</span>
        <span className="grad-text font-bold">{progress}%</span>
      </div>
      <div className="h-2 rounded overflow-hidden" style={{ background: "var(--st-08)" }}>
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #6366f1, #a855f7)",
          }}
        />
      </div>
      {message && (
        <p className="text-sm mt-3" style={{ color: "var(--ink-soft)" }}>
          {message}
        </p>
      )}
      <p className="text-xs mt-3" style={{ color: "var(--ink-mute)" }}>
        Cập nhật mỗi 3 giây. Bạn có thể đóng tab - video vẫn render. Vào Dashboard để xem lại sau.
      </p>

      {script && <div className="mt-4"><ScriptBox script={script} /></div>}
    </div>
  );
}

function ScriptBox({ script }: { script: string }) {
  return (
    <div className="rounded-2xl border-2 p-5" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="t-h4 text-white">Kịch bản AI</h3>
        <span className="text-xs" style={{ color: "var(--ink-mute)" }}>6 cảnh · sẵn sàng feed cho video render</span>
      </div>
      <pre className="text-xs whitespace-pre-wrap font-mono leading-relaxed" style={{ color: "var(--ink-soft)" }}>
        {script}
      </pre>
    </div>
  );
}
