"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PRICING_MATRIX,
  TIER_DESCRIPTIONS,
  TIER_LABELS,
  getVideoTokenCost,
} from "@/lib/video/pricing";
import {
  FPT_VOICES,
  VIDEO_PRESETS,
  SHOT_SIZES,
  CAMERA_ANGLES,
  CAMERA_MOTIONS,
  LIGHTINGS,
  MC_EMOTIONS,
  MC_CHARACTERS,
  WARDROBES,
} from "@/lib/video/voices";
import type { VideoTier, VideoDuration } from "@/lib/video/types";

const DURATIONS: VideoDuration[] = [15, 20, 25, 30];
const TIERS: VideoTier[] = ["eco", "standard", "pro"];

interface Props {
  tokenBalance: number;
}

export default function CreateVideoClient({ tokenBalance }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: preset + tier + duration
  const [presetId, setPresetId] = useState<string>("cartoon_3d_character");
  const [tier, setTier] = useState<VideoTier>("standard");
  const [duration, setDuration] = useState<VideoDuration>(20);

  // Step 2: product info (mandatory) + optional ecom
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [cta, setCta] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [priceVnd, setPriceVnd] = useState("");
  const [promo, setPromo] = useState("");
  const [socialProof, setSocialProof] = useState("");
  const [autoCaption, setAutoCaption] = useState(true);

  // Advanced overrides (Step 3 toggle)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const preset = useMemo(() => VIDEO_PRESETS.find((p) => p.id === presetId) ?? VIDEO_PRESETS[0], [presetId]);
  const [shotSize, setShotSize] = useState(preset.defaults.shotSize);
  const [cameraAngle, setCameraAngle] = useState(preset.defaults.cameraAngle);
  const [cameraMotion, setCameraMotion] = useState(preset.defaults.cameraMotion);
  const [lighting, setLighting] = useState(preset.defaults.lighting);
  const [mcEmotion, setMcEmotion] = useState(preset.defaults.mcEmotion);
  const [voiceId, setVoiceId] = useState(preset.defaults.voiceId);
  const [mcCharacter, setMcCharacter] = useState(preset.defaults.mcCharacter);
  const [wardrobe, setWardrobe] = useState(preset.defaults.wardrobe);

  // Sync advanced fields when preset changes
  function selectPreset(id: string) {
    setPresetId(id);
    const p = VIDEO_PRESETS.find((x) => x.id === id);
    if (p) {
      setShotSize(p.defaults.shotSize);
      setCameraAngle(p.defaults.cameraAngle);
      setCameraMotion(p.defaults.cameraMotion);
      setLighting(p.defaults.lighting);
      setMcEmotion(p.defaults.mcEmotion);
      setVoiceId(p.defaults.voiceId);
      setMcCharacter(p.defaults.mcCharacter);
      setWardrobe(p.defaults.wardrobe);
    }
  }

  const tokenCost = useMemo(() => getVideoTokenCost(tier, duration) ?? 0, [tier, duration]);
  const tokenValid = tokenCost > 0;
  const enoughTokens = tokenBalance >= tokenCost;
  const canNext1 = tokenValid && presetId.length > 0;
  const canNext2 = productName.trim().length >= 3 && productDescription.trim().length >= 10;
  const canSubmit = canNext1 && canNext2 && enoughTokens;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const priceNum = Number(priceVnd.replace(/[^\d]/g, ""));
      const res = await fetch("/api/video/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier,
          duration,
          preset_id: presetId,
          auto_caption: autoCaption,
          input: {
            preset_id: presetId,
            platform: "tiktok",
            product_name: productName.trim(),
            product_description: productDescription.trim(),
            cta: cta.trim() || undefined,
            target_audience: targetAudience.trim() || undefined,
            price_vnd: priceNum > 0 ? priceNum : undefined,
            promo: promo.trim() || undefined,
            social_proof: socialProof.trim() || undefined,
            shot_size: shotSize,
            camera_angle: cameraAngle,
            camera_motion: cameraMotion,
            lighting,
            mc_emotion: mcEmotion,
            voice_id: voiceId,
            mc_character: mcCharacter,
            wardrobe,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Có lỗi xảy ra");
        return;
      }
      router.push(`/tools/video/${data.video_id}`);
    } catch (e) {
      setError(String(e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Format banner */}
      <div className="rounded-xl border-2 px-4 py-3 flex items-center gap-3" style={{ background: "rgba(168,85,247,0.06)", borderColor: "rgba(168,85,247,0.25)" }}>
        <div className="w-9 h-12 rounded-md border-2 flex items-center justify-center text-xs font-bold" style={{ borderColor: "var(--accent)", color: "var(--accent)" }}>
          9:16
        </div>
        <div>
          <div className="font-semibold text-white text-sm">Video dọc cho TikTok / Shopee Video / Reels</div>
          <div className="text-xs" style={{ color: "var(--ink-soft)" }}>Render 6 cảnh - preview & sửa từng cảnh trước khi compose final</div>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2 mb-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 h-1 rounded transition-colors"
               style={{ background: s <= step ? "var(--accent)" : "rgba(255,255,255,0.10)" }} />
        ))}
      </div>
      <div className="text-sm" style={{ color: "var(--ink-soft)" }}>
        Bước {step}/3 ·{" "}
        {step === 1 ? "Chọn loại video + tier + thời lượng"
         : step === 2 ? "Thông tin sản phẩm"
         : "Xác nhận"}
      </div>

      {/* ============ STEP 1: Preset gallery + Tier + Duration ============ */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-3 font-semibold text-white">
              Chọn loại video
            </label>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {VIDEO_PRESETS.map((p) => {
                const isActive = presetId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => selectPreset(p.id)}
                    className="p-4 text-left rounded-xl border-2 transition-all"
                    style={{
                      borderColor: isActive ? "#a855f7" : "rgba(255,255,255,0.12)",
                      background: isActive ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.04)",
                      boxShadow: isActive ? "0 0 0 4px rgba(168,85,247,0.18)" : "none",
                    }}
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl">{p.emoji}</span>
                      <span className="font-semibold text-white text-sm leading-tight">{p.label}</span>
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                      {p.useCase}
                    </div>
                    {p.needsLipSync && (
                      <div className="text-[10px] mt-2 inline-block px-2 py-0.5 rounded" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24" }}>
                        Lip sync · regen +2 token
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-3 font-semibold text-white">Tier chất lượng</label>
            <div className="grid sm:grid-cols-3 gap-3">
              {TIERS.map((t) => {
                const isActive = tier === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTier(t)}
                    className="p-4 text-left rounded-xl border-2 transition-all"
                    style={{
                      borderColor: isActive ? "#a855f7" : "rgba(255,255,255,0.12)",
                      background: isActive ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.04)",
                      boxShadow: isActive ? "0 0 0 4px rgba(168,85,247,0.18)" : "none",
                    }}
                  >
                    <div className="font-semibold text-white text-base">{TIER_LABELS[t]}</div>
                    <div className="text-xs mt-1.5 leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                      {TIER_DESCRIPTIONS[t]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-3 font-semibold text-white">Thời lượng</label>
            <div className="grid grid-cols-4 gap-2">
              {DURATIONS.map((d) => {
                const cost = PRICING_MATRIX[tier]?.[d];
                const disabled = !cost;
                const isActive = duration === d && !disabled;
                return (
                  <button
                    key={d}
                    type="button"
                    disabled={disabled}
                    onClick={() => setDuration(d)}
                    className="p-3 text-center rounded-xl border-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      borderColor: isActive ? "#a855f7" : "rgba(255,255,255,0.12)",
                      background: isActive ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.04)",
                      boxShadow: isActive ? "0 0 0 4px rgba(168,85,247,0.18)" : "none",
                    }}
                  >
                    <div className="text-lg font-bold text-white">{d}s</div>
                    <div className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>
                      {cost ? `${cost} token` : "-"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl p-4 flex justify-between items-center border-2" style={{ background: "rgba(168,85,247,0.06)", borderColor: "rgba(168,85,247,0.2)" }}>
            <div>
              <span style={{ color: "var(--ink-soft)" }}>Chi phí ban đầu:</span>
              <div className="text-xs mt-0.5" style={{ color: "var(--ink-mute)" }}>
                Bao gồm 6 cảnh. Sửa từng cảnh sau: {preset.needsLipSync ? "6/10" : "4/8"} token (Std/Pro).
              </div>
            </div>
            <span className="font-bold grad-text text-xl">
              {tokenCost > 0 ? `${tokenCost} token` : "-"}
            </span>
          </div>

          <div className="flex justify-end">
            <button type="button" disabled={!canNext1} onClick={() => setStep(2)} className="btn btn-primary disabled:opacity-50">
              Tiếp tục →
            </button>
          </div>
        </div>
      )}

      {/* ============ STEP 2: Product + Optional ecom + Advanced ============ */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="space-y-4 rounded-2xl border-2 p-6" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
            <h3 className="t-h4 text-white">Thông tin bắt buộc</h3>

            <div>
              <label className="block text-sm mb-1 font-semibold text-white">Tên sản phẩm *</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="VD: Kem dưỡng da Lavela"
                className="input-dark w-full"
                maxLength={80}
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold text-white">USP / Benefit chính *</label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="VD: Thảo dược thiên nhiên, không paraben, giảm 80% mụn sau 2 tuần."
                rows={3}
                className="input-dark w-full"
                maxLength={400}
              />
              <div className="text-xs mt-1" style={{ color: "var(--ink-mute)" }}>
                {productDescription.length}/400. Càng cụ thể, AI viết hook càng mạnh.
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold text-white">Call-to-action</label>
              <input
                type="text"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                placeholder="VD: Đặt mua tại Shopee - giảm 30%"
                className="input-dark w-full"
                maxLength={100}
              />
            </div>
          </div>

          {/* Optional ecom */}
          <details className="rounded-2xl border-2" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
            <summary className="px-6 py-4 cursor-pointer font-semibold text-white flex items-center justify-between">
              <span>Khuyến mãi & social proof (tuỳ chọn - tăng quality script)</span>
              <span className="text-xs" style={{ color: "var(--ink-mute)" }}>+ Mở rộng</span>
            </summary>
            <div className="px-6 pb-6 space-y-4">
              <div>
                <label className="block text-sm mb-1 font-semibold text-white">Khách hàng mục tiêu</label>
                <input type="text" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="VD: Phụ nữ 25-35, da dầu mụn" className="input-dark w-full" maxLength={120} />
              </div>
              <div>
                <label className="block text-sm mb-1 font-semibold text-white">Giá (VNĐ)</label>
                <input type="text" inputMode="numeric"
                  value={priceVnd ? Number(priceVnd.replace(/[^\d]/g, "")).toLocaleString("vi-VN") : ""}
                  onChange={(e) => setPriceVnd(e.target.value)} placeholder="299.000" className="input-dark w-full" maxLength={20} />
              </div>
              <div>
                <label className="block text-sm mb-1 font-semibold text-white">Khuyến mãi</label>
                <input type="text" value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Giảm 30%, freeship, flash sale 12.12..." className="input-dark w-full" maxLength={120} />
              </div>
              <div>
                <label className="block text-sm mb-1 font-semibold text-white">Social proof</label>
                <input type="text" value={socialProof} onChange={(e) => setSocialProof(e.target.value)} placeholder="10K+ đã mua, rating 4.9..." className="input-dark w-full" maxLength={120} />
              </div>
            </div>
          </details>

          {/* Advanced mode toggle */}
          <details className="rounded-2xl border-2" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }} open={showAdvanced} onToggle={(e) => setShowAdvanced((e.target as HTMLDetailsElement).open)}>
            <summary className="px-6 py-4 cursor-pointer font-semibold text-white flex items-center justify-between">
              <span>⚙️ Advanced - tinh chỉnh visual (9 chiều brief)</span>
              <span className="text-xs" style={{ color: "var(--ink-mute)" }}>
                {showAdvanced ? "Thu gọn" : "Mở (smart default theo preset)"}
              </span>
            </summary>
            <div className="px-6 pb-6 space-y-5">
              <AdvancedPicker label="Cỡ cảnh" options={SHOT_SIZES} value={shotSize} onChange={(v) => setShotSize(v as typeof shotSize)} />
              <AdvancedPicker label="Góc máy" options={CAMERA_ANGLES} value={cameraAngle} onChange={(v) => setCameraAngle(v as typeof cameraAngle)} />
              <AdvancedPicker label="Chuyển động camera" options={CAMERA_MOTIONS} value={cameraMotion} onChange={(v) => setCameraMotion(v as typeof cameraMotion)} />
              <AdvancedPicker label="Ánh sáng" options={LIGHTINGS} value={lighting} onChange={(v) => setLighting(v as typeof lighting)} />
              <AdvancedPicker label="Cảm xúc MC" options={MC_EMOTIONS} value={mcEmotion} onChange={(v) => setMcEmotion(v as typeof mcEmotion)} />
              <AdvancedPicker label="Nhân vật MC" options={MC_CHARACTERS} value={mcCharacter} onChange={(v) => setMcCharacter(v as typeof mcCharacter)} />
              <AdvancedPicker label="Trang phục" options={WARDROBES} value={wardrobe} onChange={(v) => setWardrobe(v as typeof wardrobe)} />
              <div>
                <label className="block text-sm mb-2 font-semibold text-white">Giọng đọc</label>
                <select value={voiceId} onChange={(e) => setVoiceId(e.target.value)} className="input-dark w-full">
                  {FPT_VOICES.map((v) => (
                    <option key={v.id} value={v.id}>{v.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </details>

          {/* Auto-caption toggle */}
          <label className="rounded-xl border-2 p-4 flex items-center justify-between cursor-pointer" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
            <div>
              <div className="font-semibold text-white">Auto-caption (sub khớp lời)</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>
                Tự sinh sub tiếng Việt khớp giọng - miễn phí (Whisper local)
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoCaption}
              onChange={(e) => setAutoCaption(e.target.checked)}
              className="w-5 h-5 accent-purple-500"
            />
          </label>

          <div className="flex justify-between pt-2">
            <button type="button" onClick={() => setStep(1)} className="btn btn-ghost">← Quay lại</button>
            <button type="button" disabled={!canNext2} onClick={() => setStep(3)} className="btn btn-primary disabled:opacity-50">
              Tiếp tục →
            </button>
          </div>
        </div>
      )}

      {/* ============ STEP 3: Confirm ============ */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="rounded-2xl border-2 p-6 space-y-3" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
            <Row label="Loại video" value={`${preset.emoji} ${preset.label}`} />
            <Row label="Tier" value={`${TIER_LABELS[tier]} (${duration}s)`} />
            <Row label="Chi phí" value={`${tokenCost} token (6 cảnh)`} highlight />
            <Row label="Sản phẩm" value={productName} />
            <Row label="USP" value={productDescription} />
            {cta && <Row label="CTA" value={cta} />}
            {targetAudience && <Row label="Khách hàng" value={targetAudience} />}
            {priceVnd && <Row label="Giá" value={`${Number(priceVnd.replace(/[^\d]/g, "")).toLocaleString("vi-VN")}đ`} />}
            {promo && <Row label="Khuyến mãi" value={promo} />}
            {socialProof && <Row label="Social proof" value={socialProof} />}
            <Row label="Auto-caption" value={autoCaption ? "Bật (sub khớp lời)" : "Tắt"} />
            {showAdvanced && (
              <>
                <Row label="Cỡ cảnh" value={SHOT_SIZES.find((x) => x.id === shotSize)?.label ?? ""} />
                <Row label="Góc máy" value={CAMERA_ANGLES.find((x) => x.id === cameraAngle)?.label ?? ""} />
                <Row label="Lighting" value={LIGHTINGS.find((x) => x.id === lighting)?.label ?? ""} />
                <Row label="MC" value={MC_CHARACTERS.find((x) => x.id === mcCharacter)?.label ?? ""} />
              </>
            )}
            <Row label="Giọng đọc" value={FPT_VOICES.find((v) => v.id === voiceId)?.label ?? ""} />
          </div>

          {!enoughTokens && (
            <div className="rounded-xl border-2 p-4" style={{ background: "rgba(239, 68, 68, 0.08)", borderColor: "rgba(239, 68, 68, 0.3)" }}>
              <div className="font-semibold text-red-400">Không đủ token</div>
              <p className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>
                Bạn cần {tokenCost} token nhưng đang có {tokenBalance}.{" "}
                <Link href="/tools/video/topup" className="underline">Nạp thêm →</Link>
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-xl border-2 p-4 text-sm" style={{ background: "rgba(239, 68, 68, 0.08)", borderColor: "rgba(239, 68, 68, 0.3)", color: "#ef4444" }}>
              {error}
            </div>
          )}

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep(2)} className="btn btn-ghost">← Quay lại</button>
            <button type="button" disabled={!canSubmit || submitting} onClick={handleSubmit} className="btn btn-primary disabled:opacity-50">
              {submitting ? "Đang tạo..." : `Trừ ${tokenCost} token + tạo 6 cảnh →`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AdvancedPicker({ label, options, value, onChange }: {
  label: string;
  options: { id: string; label: string; desc?: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm mb-2 font-semibold text-white">{label}</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((o) => {
          const isActive = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              className="p-2 text-left rounded-lg border-2 transition-all text-xs"
              style={{
                borderColor: isActive ? "#a855f7" : "rgba(255,255,255,0.10)",
                background: isActive ? "rgba(168,85,247,0.10)" : "transparent",
                color: isActive ? "#fff" : "var(--ink-soft)",
              }}
            >
              <div className="font-semibold">{o.label}</div>
              {o.desc && <div className="mt-0.5 text-[10px]" style={{ color: "var(--ink-mute)" }}>{o.desc}</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between gap-3 items-baseline border-b pb-2 last:border-b-0 last:pb-0" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <span className="text-sm flex-shrink-0" style={{ color: "var(--ink-soft)" }}>{label}</span>
      <span className={`text-right text-sm ${highlight ? "grad-text font-bold" : "text-white"}`}>{value}</span>
    </div>
  );
}
