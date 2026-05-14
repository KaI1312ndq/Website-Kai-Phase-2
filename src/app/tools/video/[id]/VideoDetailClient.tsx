"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FilmIcon,
  DownloadIcon,
  HourglassIcon,
  WarningIcon,
  EditIcon,
  SaveIcon,
  RefreshIcon,
  LightbulbIcon,
} from "@/components/video/PresetIcon";

interface SceneRow {
  id: string;
  scene_idx: number;
  label: string | null;
  status: string;
  output_url: string | null;
  thumbnail_url: string | null;
  script_text: string | null;
  visual_prompt: string | null;
  voiceover_text: string | null;
  is_lipsync: boolean;
  approved_by_user: boolean;
  regen_count: number;
  cost_token: number;
  updated_at: string;
}

// Video row shape - flexible since DB returns many fields
type VideoRow = Record<string, unknown>;

interface Props {
  videoId: string;
  initialVideo: VideoRow;
  initialScenes: SceneRow[];
}

const STATUS_LABEL: Record<string, string> = {
  pending: "Chờ render",
  rendering: "Đang render",
  completed: "Xong",
  approved: "Đã duyệt",
  failed: "Lỗi",
};

const STATUS_COLOR: Record<string, string> = {
  pending:   "rgba(255,255,255,0.6)",
  rendering: "#a855f7",
  completed: "#10b981",
  approved:  "#10b981",
  failed:    "#ef4444",
};

export default function VideoDetailClient({ videoId, initialVideo, initialScenes }: Props) {
  const router = useRouter();
  const [video, setVideo] = useState<VideoRow>(initialVideo);
  const [scenes, setScenes] = useState<SceneRow[]>(initialScenes);
  const [editingScene, setEditingScene] = useState<SceneRow | null>(null);
  const [composing, setComposing] = useState(false);
  const [composeError, setComposeError] = useState<string | null>(null);

  // Poll every 3s if any scene not yet completed
  useEffect(() => {
    const anyPending = scenes.some((s) => s.status === "pending" || s.status === "rendering");
    if (!anyPending && video.compose_status !== "ready" && video.compose_status !== "composing") return;

    let cancelled = false;
    const tick = async () => {
      try {
        const res = await fetch(`/api/video/${videoId}/status`, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        setVideo(data);
        if (Array.isArray(data.scenes)) setScenes(data.scenes);
      } catch { /* ignore */ }
    };

    const interval = setInterval(tick, 3000);
    tick();
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [videoId, scenes, video.compose_status]);

  const allReady = scenes.length > 0 && scenes.every((s) => s.status === "completed" || s.status === "approved");
  const composed = video.status === "completed" && Boolean(video.output_url);

  async function handleCompose() {
    if (!allReady || composing) return;
    setComposing(true);
    setComposeError(null);
    try {
      const res = await fetch(`/api/video/${videoId}/compose`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setComposeError(data.error ?? "Compose failed");
        return;
      }
      // Reload to get updated video state
      router.refresh();
      const status = await fetch(`/api/video/${videoId}/status`, { cache: "no-store" });
      if (status.ok) {
        const d = await status.json();
        setVideo(d);
        if (Array.isArray(d.scenes)) setScenes(d.scenes);
      }
    } catch (e) {
      setComposeError(String(e));
    } finally {
      setComposing(false);
    }
  }

  return (
    <div className="space-y-6 mt-4">
      {/* Final video preview if composed */}
      {composed && (
        <section>
          <h3 className="t-h4 text-white mb-3 flex items-center gap-2">
            <FilmIcon size={20} className="text-purple-400" /> Video hoàn chỉnh
          </h3>
          <div className="rounded-2xl border-2 overflow-hidden flex justify-center" style={{ background: "#000", borderColor: "rgba(168,85,247,0.4)" }}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={video.output_url as string}
              poster={(video.thumbnail_url as string) ?? undefined}
              controls
              playsInline
              className="bg-black"
              style={{ aspectRatio: "9 / 16", maxHeight: "70vh", objectFit: "contain" }}
            />
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            <a href={video.output_url as string} download className="btn btn-primary inline-flex items-center gap-2">
              <DownloadIcon size={16} /> Tải MP4
            </a>
            <a href={video.output_url as string} target="_blank" rel="noopener" className="btn btn-ghost">Mở tab mới</a>
          </div>
        </section>
      )}

      {/* Scene grid */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="t-h4 text-white">{composed ? "Các cảnh đã dùng" : "Các cảnh đang render"}</h3>
          <span className="text-sm" style={{ color: "var(--ink-soft)" }}>
            {scenes.filter((s) => s.status === "completed" || s.status === "approved").length}/{scenes.length} sẵn sàng
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenes.map((s) => (
            <SceneCard
              key={s.id}
              scene={s}
              videoTier={(video.tier as string) ?? "standard"}
              onOpenEdit={() => setEditingScene(s)}
              onUpdate={(updated) => setScenes((prev) => prev.map((x) => (x.id === updated.id ? updated : x)))}
            />
          ))}
        </div>
      </section>

      {/* Compose button */}
      {!composed && (
        <section className="rounded-2xl border-2 p-5 flex flex-wrap items-center justify-between gap-4" style={{
          background: allReady ? "rgba(168,85,247,0.06)" : "rgba(255,255,255,0.04)",
          borderColor: allReady ? "rgba(168,85,247,0.3)" : "rgba(255,255,255,0.10)",
        }}>
          <div>
            <div className="font-semibold text-white">Ghép thành video cuối</div>
            <div className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>
              {allReady
                ? `Tất cả ${scenes.length} cảnh sẵn sàng. Compose miễn phí - không tốn token.`
                : "Đợi tất cả cảnh xong, hoặc bấm 'Sửa' để chỉnh cảnh chưa ưng."}
            </div>
          </div>
          <button
            type="button"
            disabled={!allReady || composing}
            onClick={handleCompose}
            className="btn btn-primary disabled:opacity-50"
          >
            {composing ? "Đang ghép..." : "Compose final →"}
          </button>
        </section>
      )}
      {composeError && (
        <div className="rounded-xl border-2 p-3 text-sm" style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.3)", color: "#ef4444" }}>
          {composeError}
        </div>
      )}

      {/* Edit modal */}
      {editingScene && (
        <SceneEditModal
          videoId={videoId}
          scene={editingScene}
          tier={(video.tier as string) ?? "standard"}
          onClose={() => setEditingScene(null)}
          onUpdated={(updated) => {
            setScenes((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
            setEditingScene(null);
          }}
        />
      )}
    </div>
  );
}

function SceneCard({ scene, videoTier, onOpenEdit, onUpdate }: {
  scene: SceneRow;
  videoTier: string;
  onOpenEdit: () => void;
  onUpdate: (s: SceneRow) => void;
}) {
  const isReady = scene.status === "completed" || scene.status === "approved";
  const isRendering = scene.status === "rendering" || scene.status === "pending";
  const statusColor = STATUS_COLOR[scene.status] ?? STATUS_COLOR.pending;

  async function handleApprove() {
    if (!isReady) return;
    const res = await fetch(`/api/video/${scene.id /* video id needed actually */}`, { method: "POST" });
    // We need video id - use parent context. Simpler: pass via prop. For now just refetch.
    if (res.ok) {
      onUpdate({ ...scene, approved_by_user: true, status: "approved" });
    }
  }
  // Note: approval API needs videoId not sceneId - simpler to just toggle locally + use button "Sửa"
  void handleApprove;

  return (
    <div className="rounded-2xl border-2 p-3 flex flex-col" style={{
      background: "rgba(255,255,255,0.04)",
      borderColor: scene.approved_by_user ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.10)",
    }}>
      {/* Thumbnail */}
      <div className="rounded-lg overflow-hidden mb-3 flex items-center justify-center" style={{
        background: "#000",
        aspectRatio: "9 / 16",
        maxHeight: "320px",
      }}>
        {isReady && scene.output_url ? (
          /* eslint-disable-next-line jsx-a11y/media-has-caption */
          <video
            src={scene.output_url}
            poster={scene.thumbnail_url ?? undefined}
            controls
            playsInline
            className="w-full h-full"
            style={{ objectFit: "cover" }}
          />
        ) : isRendering ? (
          <div className="text-center p-4" style={{ color: "var(--ink-mute)" }}>
            <div className="mb-2 animate-pulse flex justify-center"><HourglassIcon size={28} /></div>
            <div className="text-xs">{STATUS_LABEL[scene.status]}...</div>
          </div>
        ) : (
          <div className="text-center p-4" style={{ color: "#ef4444" }}>
            <div className="mb-2 flex justify-center"><WarningIcon size={28} /></div>
            <div className="text-xs">{STATUS_LABEL[scene.status]}</div>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-semibold text-white text-sm">
          Cảnh {scene.scene_idx + 1}: {scene.label}
        </span>
        <span className="text-xs font-semibold" style={{ color: statusColor }}>
          {STATUS_LABEL[scene.status] ?? scene.status}
        </span>
      </div>

      {/* Script preview */}
      {scene.script_text && (
        <p className="text-xs leading-relaxed mb-3 line-clamp-3" style={{ color: "var(--ink-soft)" }}>
          {scene.script_text}
        </p>
      )}

      {/* Actions */}
      <div className="mt-auto flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={onOpenEdit}
          disabled={isRendering}
          className="text-xs px-3 py-1.5 rounded-lg border-2 disabled:opacity-50 inline-flex items-center gap-1.5"
          style={{ borderColor: "rgba(255,255,255,0.15)", color: "var(--ink-soft)" }}
        >
          <EditIcon size={12} /> Sửa cảnh
        </button>
        {scene.regen_count > 0 && (
          <span className="text-[10px] self-center" style={{ color: "var(--ink-mute)" }}>
            Đã regen {scene.regen_count}x
          </span>
        )}
      </div>
    </div>
  );
}

function SceneEditModal({ videoId, scene, tier, onClose, onUpdated }: {
  videoId: string;
  scene: SceneRow;
  tier: string;
  onClose: () => void;
  onUpdated: (s: SceneRow) => void;
}) {
  const [script, setScript] = useState(scene.script_text ?? "");
  const [visual, setVisual] = useState(scene.visual_prompt ?? "");
  const [voice, setVoice] = useState(scene.voiceover_text ?? "");
  const [saving, setSaving] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const regenCost = (() => {
    if (tier === "pro") return scene.is_lipsync ? 10 : 8;
    return scene.is_lipsync ? 6 : 4;
  })();

  async function saveScriptOnly() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/video/${videoId}/scene/${scene.scene_idx}/script`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script_text: script,
          visual_prompt: visual,
          voiceover_text: voice,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Lưu thất bại");
        return;
      }
      onUpdated({
        ...scene,
        script_text: script,
        visual_prompt: visual,
        voiceover_text: voice,
      });
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  }

  async function regenScene() {
    if (!confirm(`Render lại cảnh này sẽ tốn ${regenCost} token. Tiếp tục?`)) return;
    setRegenerating(true);
    setError(null);
    try {
      const res = await fetch(`/api/video/${videoId}/scene/${scene.scene_idx}/regen`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script_text: script,
          visual_prompt: visual,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Regen thất bại");
        return;
      }
      onUpdated({
        ...scene,
        status: "rendering",
        approved_by_user: false,
        regen_count: scene.regen_count + 1,
        cost_token: scene.cost_token + regenCost,
        script_text: script,
        visual_prompt: visual,
        output_url: null,
        thumbnail_url: null,
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      setError(String(e));
    } finally {
      setRegenerating(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }} onClick={onClose}>
      <div className="rounded-2xl border-2 max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
           style={{ background: "#0a0a14", borderColor: "rgba(168,85,247,0.4)" }}
           onClick={(e) => e.stopPropagation()}>
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="t-h3 text-white">
            Cảnh {scene.scene_idx + 1}: {scene.label}
          </h3>
          <button type="button" onClick={onClose} className="text-2xl leading-none" style={{ color: "var(--ink-soft)" }}>×</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 font-semibold text-white">Lời thoại (script)</label>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              rows={3}
              className="input-dark w-full text-sm"
              maxLength={500}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-semibold text-white">Visual / prompt hình ảnh</label>
            <textarea
              value={visual}
              onChange={(e) => setVisual(e.target.value)}
              rows={3}
              className="input-dark w-full text-sm"
              maxLength={500}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-semibold text-white">Voiceover (text đọc TTS)</label>
            <textarea
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              rows={2}
              className="input-dark w-full text-sm"
              maxLength={500}
            />
          </div>

          {error && (
            <div className="rounded-xl border-2 p-3 text-sm" style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.3)", color: "#ef4444" }}>
              {error}
            </div>
          )}

          <div className="text-xs p-3 rounded-lg flex items-start gap-2" style={{ background: "rgba(255,255,255,0.04)", color: "var(--ink-soft)" }}>
            <LightbulbIcon size={16} className="flex-shrink-0 mt-0.5" />
            <div>
              <strong>Lưu chữ</strong> (chỉ sửa text): <strong className="text-white">miễn phí</strong>.<br/>
              <strong>Render lại cảnh</strong> (visual + voice mới): <strong className="grad-text">{regenCost} token</strong>
              {scene.is_lipsync && " (cảnh lip-sync nên cao hơn)"}.
            </div>
          </div>

          <div className="flex justify-between gap-2 flex-wrap">
            <button type="button" onClick={onClose} className="btn btn-ghost">Đóng</button>
            <div className="flex gap-2 flex-wrap">
              <button type="button" onClick={saveScriptOnly} disabled={saving} className="btn btn-ghost disabled:opacity-50 inline-flex items-center gap-2">
                <SaveIcon size={14} /> {saving ? "Đang lưu..." : "Lưu chữ (free)"}
              </button>
              <button type="button" onClick={regenScene} disabled={regenerating} className="btn btn-primary disabled:opacity-50 inline-flex items-center gap-2">
                <RefreshIcon size={14} /> {regenerating ? "Đang gửi render..." : `Render lại (${regenCost} token)`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
