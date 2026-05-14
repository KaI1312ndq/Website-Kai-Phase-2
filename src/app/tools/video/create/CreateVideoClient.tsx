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
  VIDEO_FLOWS,
  SHOT_SIZES,
  CAMERA_ANGLES,
  CAMERA_MOTIONS,
  LIGHTINGS,
  MC_EMOTIONS,
  MC_CHARACTERS,
  WARDROBES,
  RESOLUTIONS,
} from "@/lib/video/voices";
import type { VideoTier, VideoDuration } from "@/lib/video/types";
import { PresetIcon, CharacterPortrait, WardrobeIcon, PlayIcon } from "@/components/video/PresetIcon";
import ProductImageUpload from "@/components/video/ProductImageUpload";

interface UploadedImage { url: string; path: string; name: string; }

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

  // Flow + product images
  const [flowId, setFlowId] = useState("aida_classic");
  const [customLabels, setCustomLabels] = useState<string[]>(["", "", "", "", "", ""]);
  const [productImages, setProductImages] = useState<UploadedImage[]>([]);

  // Output settings
  const [resolution, setResolution] = useState<"720x1280" | "1080x1920" | "2160x3840">("1080x1920");
  const [hasMusic, setHasMusic] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState<string | null>(null);
  const [customAvatarUploading, setCustomAvatarUploading] = useState(false);

  const flow = useMemo(() => VIDEO_FLOWS.find((f) => f.id === flowId) ?? VIDEO_FLOWS[0], [flowId]);
  const isCustomFlow = flowId === "custom";
  const sceneLabels = isCustomFlow
    ? customLabels.map((l, i) => l.trim() || `Cảnh ${i + 1}`)
    : flow.scenes;

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
          flow_template: flowId,
          custom_scene_labels: isCustomFlow ? customLabels : undefined,
          product_images: productImages,
          output_resolution: resolution,
          has_music: hasMusic,
          custom_avatar_url: customAvatarUrl,
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
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                           style={{
                             background: isActive ? "rgba(168,85,247,0.18)" : "rgba(255,255,255,0.06)",
                             color: isActive ? "#a855f7" : "var(--ink-soft)",
                           }}>
                        <PresetIcon presetId={p.id} size={22} />
                      </div>
                      <span className="font-semibold text-white text-sm leading-tight">{p.label}</span>
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                      {p.useCase}
                    </div>
                    {p.needsLipSync && (
                      <div className="text-[10px] mt-2 inline-block px-2 py-0.5 rounded" style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24" }}>
                        Lip sync · regen +3 token
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

          <div>
            <label className="block text-sm mb-3 font-semibold text-white">Độ phân giải</label>
            <div className="grid sm:grid-cols-3 gap-3">
              {RESOLUTIONS.map((r) => {
                const isActive = resolution === r.id;
                const disabled = r.id === "2160x3840" && tier !== "pro";
                return (
                  <button
                    key={r.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => setResolution(r.id as typeof resolution)}
                    className="p-4 text-left rounded-xl border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      borderColor: isActive ? "#a855f7" : "rgba(255,255,255,0.12)",
                      background: isActive ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.04)",
                      boxShadow: isActive ? "0 0 0 4px rgba(168,85,247,0.18)" : "none",
                    }}
                  >
                    <div className="font-semibold text-white text-sm">{r.label}</div>
                    <div className="text-xs mt-1.5 leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                      {r.desc}
                    </div>
                    {disabled && (
                      <div className="text-[10px] mt-2" style={{ color: "#fbbf24" }}>Chỉ tier Pro</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="rounded-xl border-2 p-4 flex items-center justify-between cursor-pointer" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
            <div>
              <div className="font-semibold text-white">Nhạc nền</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>
                Tự thêm nhạc nền (Pixabay free library). Tắt nếu chỉ cần voiceover + sound effect.
              </div>
            </div>
            <input
              type="checkbox"
              checked={hasMusic}
              onChange={(e) => setHasMusic(e.target.checked)}
              className="w-5 h-5 accent-purple-500"
            />
          </label>

          <div className="rounded-xl p-4 flex justify-between items-center border-2" style={{ background: "rgba(168,85,247,0.06)", borderColor: "rgba(168,85,247,0.2)" }}>
            <div>
              <span style={{ color: "var(--ink-soft)" }}>Chi phí ban đầu:</span>
              <div className="text-xs mt-0.5" style={{ color: "var(--ink-mute)" }}>
                Bao gồm 6 cảnh. Sửa từng cảnh sau: {preset.needsLipSync ? "8/13" : "5/10"} token (Std/Pro).
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

            <div>
              <label className="block text-sm mb-1 font-semibold text-white">
                Ảnh sản phẩm{" "}
                <span className="text-xs font-normal" style={{ color: "var(--ink-mute)" }}>
                  (tuỳ chọn - AI sẽ dùng làm reference render)
                </span>
              </label>
              <ProductImageUpload images={productImages} onChange={setProductImages} maxImages={3} />
            </div>

            {preset.needsLipSync && preset.defaults.mcCharacter !== "cartoon_3d" && (
              <div>
                <label className="block text-sm mb-1 font-semibold text-white">
                  Ảnh chân dung của bạn (tuỳ chọn){" "}
                  <span className="text-xs font-normal" style={{ color: "var(--ink-mute)" }}>
                    AI sẽ dùng mặt bạn làm MC trong video
                  </span>
                </label>
                {customAvatarUrl ? (
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={customAvatarUrl} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2" style={{ borderColor: "rgba(168,85,247,0.4)" }} />
                    <div className="flex-1">
                      <div className="text-sm text-white">Avatar đã upload</div>
                      <button
                        type="button"
                        onClick={() => setCustomAvatarUrl(null)}
                        className="text-xs text-red-400 hover:underline mt-1"
                      >
                        Xoá / đổi ảnh
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    className="block rounded-lg border-2 border-dashed p-4 cursor-pointer text-center transition-colors"
                    style={{
                      borderColor: "rgba(255,255,255,0.20)",
                      background: "rgba(255,255,255,0.03)",
                      color: "var(--ink-soft)",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      disabled={customAvatarUploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setCustomAvatarUploading(true);
                        const fd = new FormData();
                        fd.append("file", file);
                        try {
                          const res = await fetch("/api/video/upload-product-image", { method: "POST", body: fd });
                          const data = await res.json();
                          if (res.ok) setCustomAvatarUrl(data.url);
                        } finally {
                          setCustomAvatarUploading(false);
                          e.target.value = "";
                        }
                      }}
                    />
                    <div className="text-sm">
                      {customAvatarUploading ? "Đang upload..." : "+ Upload ảnh chân dung của bạn"}
                    </div>
                    <div className="text-xs mt-1" style={{ color: "var(--ink-mute)" }}>
                      Ảnh rõ mặt, chính diện, 1 người. Tối đa 5MB.
                    </div>
                  </label>
                )}
              </div>
            )}
          </div>

          {/* Flow picker */}
          <div className="space-y-4 rounded-2xl border-2 p-6" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="t-h4 text-white">Flow video (cách kể chuyện qua 6 cảnh)</h3>
              <span className="text-xs" style={{ color: "var(--ink-mute)" }}>Quyết định AI viết script theo hướng nào</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {VIDEO_FLOWS.map((f) => {
                const isActive = flowId === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFlowId(f.id)}
                    className="p-4 text-left rounded-xl border-2 transition-all"
                    style={{
                      borderColor: isActive ? "#a855f7" : "rgba(255,255,255,0.12)",
                      background: isActive ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.04)",
                      boxShadow: isActive ? "0 0 0 4px rgba(168,85,247,0.18)" : "none",
                    }}
                  >
                    <div className="font-semibold text-white text-sm">{f.label}</div>
                    <div className="text-xs mt-1.5 leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                      {f.desc}
                    </div>
                    <div className="text-[10px] mt-2" style={{ color: "var(--ink-mute)" }}>
                      Vibe: {f.vibe}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Scene labels preview / custom edit */}
            <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="text-xs font-semibold mb-3 text-white">
                Thứ tự 6 cảnh sẽ render:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {sceneLabels.map((label, i) => (
                  <div key={i} className="rounded-lg border p-2" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                    <div className="text-[10px]" style={{ color: "var(--ink-mute)" }}>
                      Cảnh {i + 1}
                    </div>
                    {isCustomFlow ? (
                      <input
                        type="text"
                        value={customLabels[i]}
                        onChange={(e) => {
                          const newLabels = [...customLabels];
                          newLabels[i] = e.target.value;
                          setCustomLabels(newLabels);
                        }}
                        placeholder={`Cảnh ${i + 1}`}
                        className="w-full bg-transparent text-sm text-white border-none outline-none focus:outline-none mt-1"
                        maxLength={30}
                      />
                    ) : (
                      <div className="text-sm text-white font-medium mt-1">{label}</div>
                    )}
                  </div>
                ))}
              </div>
              {isCustomFlow && (
                <p className="text-xs mt-3" style={{ color: "var(--ink-mute)" }}>
                  Đặt tên 6 cảnh theo brand bạn. Để trống sẽ dùng &quot;Cảnh 1&quot;...
                </p>
              )}
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
              <span>Advanced - tinh chỉnh visual (9 chiều brief)</span>
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

              {/* Nhân vật MC - có visual preview */}
              <div>
                <label className="block text-sm mb-2 font-semibold text-white">
                  Nhân vật MC{" "}
                  <span className="text-xs font-normal" style={{ color: "var(--ink-mute)" }}>
                    (hình minh hoạ - thật ở Phase 4)
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {MC_CHARACTERS.map((o) => {
                    const isActive = mcCharacter === o.id;
                    return (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setMcCharacter(o.id as typeof mcCharacter)}
                        className="p-2 rounded-lg border-2 transition-all flex flex-col items-center gap-2"
                        style={{
                          borderColor: isActive ? "#a855f7" : "rgba(255,255,255,0.10)",
                          background: isActive ? "rgba(168,85,247,0.10)" : "transparent",
                        }}
                      >
                        <CharacterPortrait characterId={o.id} size={52} />
                        <div className="text-center">
                          <div className="text-xs font-semibold text-white leading-tight">{o.label.split(" - ")[0]}</div>
                          <div className="text-[10px] mt-0.5" style={{ color: "var(--ink-mute)" }}>{o.label.split(" - ")[1] ?? ""}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trang phục - có visual swatch */}
              <div>
                <label className="block text-sm mb-2 font-semibold text-white">
                  Trang phục{" "}
                  <span className="text-xs font-normal" style={{ color: "var(--ink-mute)" }}>
                    (minh hoạ màu)
                  </span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {WARDROBES.map((o) => {
                    const isActive = wardrobe === o.id;
                    return (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setWardrobe(o.id as typeof wardrobe)}
                        className="p-2 rounded-lg border-2 transition-all flex flex-col items-center gap-1"
                        style={{
                          borderColor: isActive ? "#a855f7" : "rgba(255,255,255,0.10)",
                          background: isActive ? "rgba(168,85,247,0.10)" : "transparent",
                        }}
                      >
                        <div className="w-full aspect-square rounded flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <WardrobeIcon wardrobeId={o.id} size={36} />
                        </div>
                        <div className="text-[10px] text-center text-white font-semibold leading-tight">{o.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Voice - có thông tin chi tiết + preview button placeholder */}
              <div>
                <label className="block text-sm mb-2 font-semibold text-white">Giọng đọc</label>
                <div className="space-y-2">
                  {FPT_VOICES.map((v) => {
                    const isActive = voiceId === v.id;
                    return (
                      <label
                        key={v.id}
                        className="rounded-lg border-2 p-3 flex items-center gap-3 cursor-pointer transition-all"
                        style={{
                          borderColor: isActive ? "#a855f7" : "rgba(255,255,255,0.10)",
                          background: isActive ? "rgba(168,85,247,0.10)" : "rgba(255,255,255,0.03)",
                        }}
                      >
                        <input
                          type="radio"
                          name="voice"
                          checked={isActive}
                          onChange={() => setVoiceId(v.id)}
                          className="w-4 h-4 flex-shrink-0 accent-purple-500"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white text-sm">{v.label}</div>
                          <div className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>
                            <span className="font-medium">{v.vibe}</span> · {v.useCase}
                          </div>
                        </div>
                        <button
                          type="button"
                          disabled
                          title="Sample audio sẽ có ở Phase 4 (tích hợp FPT.AI thật)"
                          className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                          style={{ borderColor: "rgba(255,255,255,0.20)", color: "var(--ink-soft)" }}
                          onClick={(e) => e.preventDefault()}
                        >
                          <PlayIcon size={12} />
                        </button>
                      </label>
                    );
                  })}
                </div>
                <p className="text-[11px] mt-2" style={{ color: "var(--ink-mute)" }}>
                  Nút ▶ nghe thử sẽ hoạt động khi Phase 4 tích hợp FPT.AI TTS thật.
                </p>
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
            <Row label="Loại video" value={preset.label} />
            <Row label="Tier" value={`${TIER_LABELS[tier]} (${duration}s)`} />
            <Row label="Chi phí" value={`${tokenCost} token (6 cảnh)`} highlight />
            <Row label="Flow" value={`${flow.label} - ${sceneLabels.join(" → ")}`} />
            <Row label="Ảnh sản phẩm" value={productImages.length > 0 ? `${productImages.length} ảnh đã upload` : "Không"} />
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
