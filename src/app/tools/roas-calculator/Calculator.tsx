"use client";
import { useMemo, useState } from "react";
import { computeROAS, fmtVND, fmtPct, type ROASInput } from "@/lib/roas/compute";

/* ─── Platform presets ─── */
const PRESETS = [
  { label: "TikTok Non-Mall", pct: 18.5, hint: "12.5% HH + 6% GD" },
  { label: "TikTok Mall", pct: 21.5, hint: "15.5% HH + 6% GD" },
  { label: "Shopee Non-Mall", pct: 18.0, hint: "12% HH + 6% GD" },
  { label: "Shopee Mall", pct: 21.0, hint: "15% HH + 6% GD" },
];

/* ─── Atoms ─── */
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
        {label}
        {hint && <span className="ml-1.5 font-normal" style={{ color: "rgba(255,255,255,0.45)" }}>{hint}</span>}
      </label>
      {children}
    </div>
  );
}

function NumberInput({
  value, onChange, suffix, placeholder,
}: {
  value: number; onChange: (v: number) => void; suffix?: string; placeholder?: string;
}) {
  return (
    <div className="relative">
      <input
        type="text"
        inputMode="numeric"
        value={value === 0 ? "" : value.toLocaleString("vi-VN")}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^\d]/g, "");
          onChange(raw === "" ? 0 : parseInt(raw, 10));
        }}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 pr-9 rounded-lg text-[0.95rem] outline-none transition-all"
        style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "white", fontFamily: "inherit" }}
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.82rem]" style={{ color: "rgba(255,255,255,0.5)" }}>{suffix}</span>}
    </div>
  );
}

function PercentInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="relative">
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          onChange(isNaN(v) ? 0 : Math.max(0, Math.min(100, v)));
        }}
        step="0.5"
        className="w-full px-4 py-2.5 pr-9 rounded-lg text-[0.95rem] outline-none transition-all"
        style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "white", fontFamily: "inherit" }}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.82rem]" style={{ color: "rgba(255,255,255,0.5)" }}>%</span>
    </div>
  );
}

function ROASCard({
  label, value, sub, color, isError,
}: {
  label: string; value: string | null; sub?: string; color: string; isError?: boolean;
}) {
  return (
    <div
      className="glass p-6 flex flex-col gap-2"
      style={{ borderColor: isError ? "rgba(255,90,114,0.3)" : undefined }}
    >
      <div className="text-[0.7rem] font-bold uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.5)" }}>
        {label}
      </div>
      {value ? (
        <div className="text-[2.8rem] font-extrabold leading-none tracking-tight" style={{ color }}>
          {value}
        </div>
      ) : (
        <div className="text-[1.2rem] font-semibold" style={{ color: "#ff5a72" }}>Không khả thi</div>
      )}
      {sub && (
        <div className="text-[0.8rem] leading-snug mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{sub}</div>
      )}
    </div>
  );
}

/* ─── Main component ─── */
export default function ROASCalculator() {
  const [price, setPrice] = useState(300000);
  const [cogs, setCogs] = useState(120000);
  const [platformFeePct, setPlatformFeePct] = useState(18.5);
  const [operatingPct, setOperatingPct] = useState(8.0);
  const [targetMarginPct, setTargetMarginPct] = useState(15);
  const [activePreset, setActivePreset] = useState<number | null>(0);

  const result = useMemo(() => {
    const input: ROASInput = { price, cogs, platformFeePct, operatingPct, targetMarginPct };
    return computeROAS(input);
  }, [price, cogs, platformFeePct, operatingPct, targetMarginPct]);

  function applyPreset(idx: number) {
    setActivePreset(idx);
    setPlatformFeePct(PRESETS[idx].pct);
  }

  function handlePlatformFeeChange(v: number) {
    setActivePreset(null);
    setPlatformFeePct(v);
  }

  const cogsShare = price > 0 ? (Math.min(cogs, price) / price) * 100 : 0;
  const feeShare = platformFeePct;
  const opsShare = operatingPct;
  const adsShare = result.targetROAS ? 100 / result.targetROAS : 0;
  const profitShare = Math.max(0, 100 - cogsShare - feeShare - opsShare - adsShare);

  const breakdownBars = [
    { label: "Giá vốn", pct: cogsShare, color: "#6b7aff" },
    { label: "Phí sàn", pct: feeShare, color: "#ff6b9d" },
    { label: "Vận hành", pct: opsShare, color: "#ffd479" },
    { label: "Ads (target)", pct: adsShare, color: "#ff9f46" },
    { label: "Lợi nhuận", pct: profitShare, color: "#5fffaa" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start">
      {/* ── Input Panel ── */}
      <div className="glass p-7 flex flex-col gap-6">
        <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] grad-text">Thông số đầu vào</div>

        <Field label="Giá bán" hint="đã có VAT, giá buyer thanh toán">
          <NumberInput value={price} onChange={setPrice} suffix="₫" placeholder="0" />
        </Field>

        <Field label="Giá vốn (COGS)" hint="xuất xưởng + bao bì + vận chuyển về kho">
          <NumberInput value={cogs} onChange={setCogs} suffix="₫" placeholder="0" />
          {price > 0 && (
            <div className="mt-1.5 text-[0.78rem]" style={{ color: "rgba(255,255,255,0.5)" }}>
              Gross margin: <span className="font-semibold" style={{ color: result.grossMarginPct >= 40 ? "#5fffaa" : result.grossMarginPct >= 20 ? "#ffd479" : "#ff5a72" }}>
                {fmtPct(result.grossMarginPct)}
              </span>
            </div>
          )}
        </Field>

        {/* Platform fee */}
        <div>
          <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
            Phí sàn tổng <span className="font-normal ml-1" style={{ color: "rgba(255,255,255,0.45)" }}>(hoa hồng + giao dịch)</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5 mb-2.5">
            {PRESETS.map((p, i) => (
              <button
                key={p.label}
                onClick={() => applyPreset(i)}
                className="px-3 py-2 rounded-lg text-[0.72rem] font-semibold text-left transition-all"
                style={{
                  background: activePreset === i ? "rgba(20,110,245,0.18)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${activePreset === i ? "rgba(20,110,245,0.5)" : "rgba(255,255,255,0.08)"}`,
                  color: activePreset === i ? "white" : "rgba(255,255,255,0.65)",
                }}
              >
                <div>{p.label}</div>
                <div className="text-[0.66rem] font-normal mt-0.5" style={{ color: activePreset === i ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)" }}>{p.hint}</div>
              </button>
            ))}
          </div>
          <PercentInput value={platformFeePct} onChange={handlePlatformFeeChange} />
          <div className="mt-1.5 text-[0.75rem]" style={{ color: "rgba(255,255,255,0.4)" }}>
            Hoặc nhập tay - lấy số chính xác từ{" "}
            <a href="/tools/tinh-phi-san" className="underline" style={{ color: "#7da9ff" }}>Tool tính phí sàn </a>
          </div>
        </div>

        <Field label="Chi phí vận hành" hint="fulfillment, nhân sự, marketing khác (không tính ads)">
          <PercentInput value={operatingPct} onChange={setOperatingPct} />
          <div className="mt-1.5 text-[0.75rem]" style={{ color: "rgba(255,255,255,0.4)" }}>
            Thường 5–15% (logistics 3–8% + nhân sự 2–10%)
          </div>
        </Field>

        <Field label="Target margin" hint="% lợi nhuận muốn đạt sau mọi chi phí">
          <PercentInput value={targetMarginPct} onChange={setTargetMarginPct} />
        </Field>
      </div>

      {/* ── Results Panel ── */}
      <div className="flex flex-col gap-6">
        {/* Main ROAS cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <ROASCard
            label="Break-even ROAS"
            value={result.breakEvenROAS ? result.breakEvenROAS.toFixed(1) + "x" : null}
            sub={result.breakEvenROAS
              ? `Dưới ${result.breakEvenROAS.toFixed(1)}x là đang lỗ. Ads spend = ${result.breakEvenROAS ? fmtVND(price / result.breakEvenROAS) : "-"}₫/đơn`
              : "Gross margin quá thấp so với phí sàn + vận hành"}
            color="#4ad6ff"
          />
          <ROASCard
            label={`Target ROAS (margin ${targetMarginPct}%)`}
            value={result.targetROAS ? result.targetROAS.toFixed(1) + "x" : null}
            sub={result.targetROAS
              ? `Cần đạt ${result.targetROAS.toFixed(1)}x để lãi ${targetMarginPct}%. Ads = ${fmtVND(price / result.targetROAS)}₫/đơn`
              : "Margin target không thể đạt được với cost structure hiện tại"}
            color="#5fffaa"
            isError={!result.isTargetViable}
          />
        </div>

        {/* Gross margin warning */}
        {!result.isViable && (
          <div className="rounded-xl px-5 py-4 text-[0.9rem]" style={{ background: "rgba(255,90,114,0.10)", border: "1px solid rgba(255,90,114,0.3)", color: "#ff5a72" }}>
            ⚠️ Gross margin ({fmtPct(result.grossMarginPct)}) thấp hơn phí sàn + vận hành ({fmtPct(platformFeePct + operatingPct)}). Không thể có lãi dù ROAS vô cực. Cần giảm COGS hoặc tăng giá bán.
          </div>
        )}

        {/* Revenue breakdown bar */}
        {result.isViable && result.targetROAS && (
          <div className="glass p-6">
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              Phân bổ doanh thu - tại target ROAS {result.targetROAS.toFixed(1)}x
            </div>
            <div className="flex h-8 rounded-lg overflow-hidden mb-4">
              {breakdownBars.map((b) =>
                b.pct > 0.5 ? (
                  <div
                    key={b.label}
                    style={{ width: `${b.pct}%`, background: b.color, minWidth: "2px" }}
                    title={`${b.label}: ${fmtPct(b.pct)}`}
                  />
                ) : null
              )}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {breakdownBars.map((b) => (
                <div key={b.label} className="flex items-center gap-1.5 text-[0.78rem]">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: b.color }} />
                  <span style={{ color: "rgba(255,255,255,0.65)" }}>{b.label}</span>
                  <span className="font-semibold text-white">{fmtPct(b.pct)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profit scenario table */}
        <div className="glass overflow-hidden">
          <div className="px-6 py-4 border-b" style={{ borderColor: "var(--line)" }}>
            <div className="text-[0.7rem] font-bold uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.5)" }}>
              Bảng kịch bản ROAS - lợi nhuận/đơn theo ROAS
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.85rem]">
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>ROAS</th>
                  <th className="text-right px-4 py-3 font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Ads/đơn</th>
                  <th className="text-right px-4 py-3 font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Lợi nhuận/đơn</th>
                  <th className="text-right px-4 py-3 font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Margin</th>
                  <th className="px-4 py-3 font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {result.table.map((row) => {
                  const statusColor =
                    row.status === "loss" ? "#ff5a72"
                    : row.status === "thin" ? "#ffd479"
                    : "#5fffaa";
                  const statusLabel =
                    row.status === "loss" ? "Lỗ"
                    : row.status === "thin" ? "Chưa đủ"
                    : "Đạt target";
                  const isBreakEven = result.breakEvenROAS && Math.abs(row.roas - result.breakEvenROAS) < 0.5 && row.roas >= (result.breakEvenROAS - 0.5);
                  const isTarget = result.targetROAS && Math.abs(row.roas - result.targetROAS) < 0.5 && row.roas >= (result.targetROAS - 0.5);

                  return (
                    <tr
                      key={row.roas}
                      style={{
                        borderTop: "1px solid var(--line)",
                        background:
                          isTarget ? "rgba(95,255,170,0.05)"
                          : isBreakEven ? "rgba(74,214,255,0.05)"
                          : "transparent",
                      }}
                    >
                      <td className="px-4 py-3 font-bold text-white">{row.roas}x</td>
                      <td className="px-4 py-3 text-right" style={{ color: "rgba(255,255,255,0.65)" }}>
                        {fmtVND(row.adSpendPerOrder)}₫
                      </td>
                      <td className="px-4 py-3 text-right font-semibold" style={{ color: statusColor }}>
                        {row.profitPerOrder >= 0 ? "" : "-"}{fmtVND(Math.abs(row.profitPerOrder))}₫
                      </td>
                      <td className="px-4 py-3 text-right font-semibold" style={{ color: statusColor }}>
                        {row.marginPct.toFixed(1)}%
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex items-center gap-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-md"
                          style={{
                            background: row.status === "loss" ? "rgba(255,90,114,0.12)" : row.status === "thin" ? "rgba(255,212,121,0.12)" : "rgba(95,255,170,0.12)",
                            color: statusColor,
                            border: `1px solid ${row.status === "loss" ? "rgba(255,90,114,0.3)" : row.status === "thin" ? "rgba(255,212,121,0.3)" : "rgba(95,255,170,0.3)"}`,
                          }}
                        >
                          {statusLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formula note */}
        <div className="rounded-xl px-5 py-4 text-[0.82rem] leading-[1.7]" style={{ background: "rgba(20,110,245,0.06)", border: "1px solid rgba(20,110,245,0.20)", color: "rgba(255,255,255,0.65)" }}>
          <strong className="text-white">Công thức:</strong>{" "}
          Break-even ROAS = 1 ÷ (Gross margin − Phí sàn% − Ops%) ·{" "}
          Ads/đơn = Giá bán ÷ ROAS · Phí sàn trong tool là tổng <em>(hoa hồng + giao dịch)</em>.{" "}
          Lấy số chính xác từ{" "}
          <a href="/tools/tinh-phi-san" className="underline" style={{ color: "#7da9ff" }}>Tool tính phí sàn</a>.
        </div>
      </div>
    </div>
  );
}
