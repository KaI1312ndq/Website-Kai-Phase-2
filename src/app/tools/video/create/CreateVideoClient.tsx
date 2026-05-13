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
import { FPT_VOICES, VIDEO_STYLES } from "@/lib/video/voices";
import type { VideoTier, VideoDuration } from "@/lib/video/types";

const DURATIONS: VideoDuration[] = [15, 20, 25, 30];
const TIERS: VideoTier[] = ["eco", "standard", "pro"];

interface Props {
  tokenBalance: number;
}

export default function CreateVideoClient({ tokenBalance }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: tier + duration
  const [tier, setTier] = useState<VideoTier>("standard");
  const [duration, setDuration] = useState<VideoDuration>(20);

  // Step 2: product info
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [cta, setCta] = useState("");

  // Step 3: style + voice
  const [style, setStyle] = useState<typeof VIDEO_STYLES[number]["id"]>("modern");
  const [voiceId, setVoiceId] = useState(FPT_VOICES[0].id);

  const tokenCost = useMemo(() => getVideoTokenCost(tier, duration) ?? 0, [tier, duration]);
  const tokenValid = tokenCost > 0;
  const enoughTokens = tokenBalance >= tokenCost;

  const canNext1 = tokenValid;
  const canNext2 = productName.trim().length >= 3 && productDescription.trim().length >= 10;
  const canSubmit = canNext1 && canNext2 && enoughTokens;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/video/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier,
          duration,
          input: {
            product_name: productName.trim(),
            product_description: productDescription.trim(),
            target_audience: targetAudience.trim() || undefined,
            cta: cta.trim() || undefined,
            style,
            voice_id: voiceId,
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
      {/* Step indicator */}
      <div className="flex gap-2 mb-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className="flex-1 h-1 rounded transition-colors"
            style={{ background: s <= step ? "var(--accent)" : "var(--st-08)" }}
          />
        ))}
      </div>
      <div className="text-sm" style={{ color: "var(--ink-soft)" }}>
        Bước {step}/4 · {step === 1 ? "Chọn gói + thời lượng" : step === 2 ? "Thông tin sản phẩm" : step === 3 ? "Phong cách + giọng đọc" : "Xác nhận"}
      </div>

      {/* STEP 1: Tier + Duration */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-3 font-semibold text-white">Tier video</label>
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
            <span style={{ color: "var(--ink-soft)" }}>Chi phí:</span>
            <span className="font-bold grad-text text-xl">
              {tokenCost > 0 ? `${tokenCost} token (${(tokenCost * 1000).toLocaleString("vi-VN")}đ)` : "-"}
            </span>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              disabled={!canNext1}
              onClick={() => setStep(2)}
              className="btn btn-primary disabled:opacity-50"
            >
              Tiếp tục →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Product info */}
      {step === 2 && (
        <div className="space-y-4 rounded-2xl border-2 p-6" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
          <div>
            <label className="block text-sm mb-1 font-semibold text-white">
              Tên sản phẩm / dịch vụ *
            </label>
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
            <label className="block text-sm mb-1 font-semibold text-white">
              Mô tả ngắn (USP, benefit chính) *
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="VD: Kem dưỡng từ thảo dược thiên nhiên, không paraben, giảm 80% mụn sau 2 tuần."
              rows={3}
              className="input-dark w-full"
              maxLength={400}
            />
            <div className="text-xs mt-1" style={{ color: "var(--ink-mute)" }}>
              {productDescription.length}/400 ký tự. Càng cụ thể, AI viết script càng hay.
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1 font-semibold text-white">
              Khách hàng mục tiêu (tuỳ chọn)
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="VD: Phụ nữ 25-35, văn phòng, da dầu mụn"
              className="input-dark w-full"
              maxLength={120}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-semibold text-white">
              Call-to-action (tuỳ chọn)
            </label>
            <input
              type="text"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              placeholder="VD: Đặt mua tại Shopee - giảm 30% hôm nay"
              className="input-dark w-full"
              maxLength={100}
            />
          </div>

          <div className="flex justify-between pt-2">
            <button type="button" onClick={() => setStep(1)} className="btn btn-ghost">
              ← Quay lại
            </button>
            <button
              type="button"
              disabled={!canNext2}
              onClick={() => setStep(3)}
              className="btn btn-primary disabled:opacity-50"
            >
              Tiếp tục →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Style + Voice */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-3 font-semibold text-white">Phong cách video</label>
            <div className="grid sm:grid-cols-2 gap-3">
              {VIDEO_STYLES.map((s) => {
                const isActive = style === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStyle(s.id)}
                    className="p-4 text-left rounded-xl border-2 transition-all"
                    style={{
                      borderColor: isActive ? "#a855f7" : "rgba(255,255,255,0.12)",
                      background: isActive ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.04)",
                      boxShadow: isActive ? "0 0 0 4px rgba(168,85,247,0.18)" : "none",
                    }}
                  >
                    <div className="font-semibold text-white">{s.label}</div>
                    <div className="text-xs mt-1.5 leading-relaxed" style={{ color: "var(--ink-soft)" }}>{s.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-3 font-semibold text-white">Giọng đọc</label>
            <div className="grid sm:grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-2">
              {FPT_VOICES.map((v) => {
                const isActive = voiceId === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVoiceId(v.id)}
                    className="p-3 text-left rounded-xl border-2 transition-all"
                    style={{
                      borderColor: isActive ? "#a855f7" : "rgba(255,255,255,0.12)",
                      background: isActive ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.04)",
                      boxShadow: isActive ? "0 0 0 4px rgba(168,85,247,0.18)" : "none",
                    }}
                  >
                    <div className="flex justify-between items-baseline">
                      <span className="font-semibold text-white">{v.label}</span>
                      <span className="text-xs" style={{ color: "var(--ink-mute)" }}>
                        {v.region === "north" ? "Bắc" : v.region === "central" ? "Trung" : "Nam"} ·{" "}
                        {v.gender === "female" ? "Nữ" : "Nam"}
                      </span>
                    </div>
                    <div className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>{v.useCase}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep(2)} className="btn btn-ghost">
              ← Quay lại
            </button>
            <button type="button" onClick={() => setStep(4)} className="btn btn-primary">
              Tiếp tục →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Confirm */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="rounded-2xl border-2 p-6 space-y-3" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
            <Row label="Tier" value={`${TIER_LABELS[tier]} (${duration}s)`} />
            <Row label="Chi phí" value={`${tokenCost} token`} highlight />
            <Row label="Sản phẩm" value={productName} />
            <Row label="Mô tả" value={productDescription} />
            {targetAudience && <Row label="Khách hàng" value={targetAudience} />}
            {cta && <Row label="CTA" value={cta} />}
            <Row label="Phong cách" value={VIDEO_STYLES.find((s) => s.id === style)?.label ?? ""} />
            <Row label="Giọng đọc" value={FPT_VOICES.find((v) => v.id === voiceId)?.label ?? ""} />
          </div>

          {!enoughTokens && (
            <div className="card-glass p-4" style={{ background: "rgba(239, 68, 68, 0.1)" }}>
              <div className="font-semibold text-red-400">Không đủ token</div>
              <p className="text-sm mt-1" style={{ color: "var(--ink-soft)" }}>
                Bạn cần {tokenCost} token nhưng đang có {tokenBalance}.{" "}
                <Link href="/tools/video/topup" className="underline">
                  Nạp thêm →
                </Link>
              </p>
            </div>
          )}

          {error && (
            <div className="card-glass p-4 text-sm" style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}>
              {error}
            </div>
          )}

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep(3)} className="btn btn-ghost">
              ← Quay lại
            </button>
            <button
              type="button"
              disabled={!canSubmit || submitting}
              onClick={handleSubmit}
              className="btn btn-primary disabled:opacity-50"
            >
              {submitting ? "Đang tạo..." : `Trừ ${tokenCost} token + tạo video →`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between gap-3 items-baseline border-b pb-2 last:border-b-0 last:pb-0" style={{ borderColor: "var(--st-08)" }}>
      <span className="text-sm flex-shrink-0" style={{ color: "var(--ink-soft)" }}>{label}</span>
      <span className={`text-right text-sm ${highlight ? "grad-text font-bold" : "text-white"}`}>{value}</span>
    </div>
  );
}
