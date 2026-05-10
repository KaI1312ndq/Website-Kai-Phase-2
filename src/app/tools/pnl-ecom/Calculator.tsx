"use client";
import { useMemo, useState } from "react";
import { computePnL, fmtVND, fmtPct, type PnLInput } from "@/lib/pnl/compute";

const PLATFORM_PRESETS = [
  { label: "TikTok Non-Mall", pct: 18.5, perOrder: 3000, hint: "12.5% HH + 6% GD" },
  { label: "TikTok Mall", pct: 21.5, perOrder: 3000, hint: "15.5% HH + 6% GD" },
  { label: "Shopee Non-Mall", pct: 18.0, perOrder: 0, hint: "12% HH + 6% GD" },
  { label: "Shopee Mall", pct: 21.0, perOrder: 0, hint: "15% HH + 6% GD" },
];

const SCENARIO_PRESETS: Array<{ label: string; values: Partial<PnLInput> }> = [
  {
    label: "Beauty Non-Mall · 1.000 đơn",
    values: { orders: 1000, aov: 280000, returnRatePct: 5, cogs: 95000, platformFeePct: 18.5, voucherSellerPct: 3, perOrderProcessingFee: 3000, shippingPerOrder: 0, adsMonthly: 35000000, staffMonthly: 25000000, warehouseMonthly: 8000000, marketingOtherMonthly: 10000000, otherMonthly: 3000000 },
  },
  {
    label: "Fashion Non-Mall · 2.000 đơn",
    values: { orders: 2000, aov: 220000, returnRatePct: 12, cogs: 75000, platformFeePct: 18.5, voucherSellerPct: 5, perOrderProcessingFee: 3000, shippingPerOrder: 8000, adsMonthly: 60000000, staffMonthly: 35000000, warehouseMonthly: 12000000, marketingOtherMonthly: 15000000, otherMonthly: 5000000 },
  },
  {
    label: "F&B Mall · 1.500 đơn",
    values: { orders: 1500, aov: 180000, returnRatePct: 3, cogs: 105000, platformFeePct: 21.0, voucherSellerPct: 4, perOrderProcessingFee: 0, shippingPerOrder: 0, adsMonthly: 28000000, staffMonthly: 22000000, warehouseMonthly: 15000000, marketingOtherMonthly: 8000000, otherMonthly: 4000000 },
  },
];

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

function VNDInput({ value, onChange, placeholder }: { value: number; onChange: (v: number) => void; placeholder?: string }) {
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
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.82rem]" style={{ color: "rgba(255,255,255,0.5)" }}>₫</span>
    </div>
  );
}

function NumInput({ value, onChange, suffix }: { value: number; onChange: (v: number) => void; suffix?: string }) {
  return (
    <div className="relative">
      <input
        type="number"
        value={value === 0 ? "" : value}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          onChange(isNaN(v) ? 0 : v);
        }}
        className="w-full px-4 py-2.5 pr-9 rounded-lg text-[0.95rem] outline-none transition-all"
        style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "white", fontFamily: "inherit" }}
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.82rem]" style={{ color: "rgba(255,255,255,0.5)" }}>{suffix}</span>}
    </div>
  );
}

function PctInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return <NumInput value={value} onChange={(v) => onChange(Math.max(0, Math.min(100, v)))} suffix="%" />;
}

export default function PnLCalculator() {
  const [input, setInput] = useState<PnLInput>(SCENARIO_PRESETS[0].values as PnLInput);
  const [activePlatform, setActivePlatform] = useState<number | null>(0);

  const set = <K extends keyof PnLInput>(k: K, v: PnLInput[K]) => setInput((s) => ({ ...s, [k]: v }));

  const result = useMemo(() => computePnL(input), [input]);

  function applyPlatform(idx: number) {
    setActivePlatform(idx);
    setInput((s) => ({ ...s, platformFeePct: PLATFORM_PRESETS[idx].pct, perOrderProcessingFee: PLATFORM_PRESETS[idx].perOrder }));
  }

  function applyScenario(idx: number) {
    setInput(SCENARIO_PRESETS[idx].values as PnLInput);
    const platIdx = PLATFORM_PRESETS.findIndex((p) => p.pct === SCENARIO_PRESETS[idx].values.platformFeePct);
    setActivePlatform(platIdx >= 0 ? platIdx : null);
  }

  const profitColor = result.operatingProfit > 0 ? "#5fffaa" : result.operatingProfit === 0 ? "#ffd479" : "#ff5a72";
  const margin = result.operatingMarginPct;
  const marginLabel = margin >= 15 ? "Khoẻ" : margin >= 5 ? "Mỏng" : margin >= 0 ? "Hoà vốn" : "Lỗ";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-8 items-start">
      {/* ── Input Panel ── */}
      <div className="glass p-7 flex flex-col gap-6 print:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] grad-text">Thông số đầu vào</div>
        </div>

        {/* Scenario picker */}
        <div>
          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>Kịch bản mẫu</div>
          <div className="grid grid-cols-1 gap-1.5">
            {SCENARIO_PRESETS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => applyScenario(i)}
                className="px-3 py-2 rounded-lg text-[0.78rem] font-semibold text-left transition-all"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Volume */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Số đơn / tháng" hint="đã loại huỷ trước giao">
            <NumInput value={input.orders} onChange={(v) => set("orders", v)} />
          </Field>
          <Field label="AOV" hint="giá trị TB/đơn">
            <VNDInput value={input.aov} onChange={(v) => set("aov", v)} />
          </Field>
        </div>

        <Field label="Tỷ lệ hoàn hàng" hint="đã giao nhưng buyer hoàn">
          <PctInput value={input.returnRatePct} onChange={(v) => set("returnRatePct", v)} />
        </Field>

        <Field label="COGS / đơn" hint="xuất xưởng + bao bì + ship về kho">
          <VNDInput value={input.cogs} onChange={(v) => set("cogs", v)} />
        </Field>

        {/* Platform */}
        <div>
          <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">Phí sàn</label>
          <div className="grid grid-cols-2 gap-1.5 mb-2.5">
            {PLATFORM_PRESETS.map((p, i) => (
              <button
                key={p.label}
                onClick={() => applyPlatform(i)}
                className="px-3 py-2 rounded-lg text-[0.72rem] font-semibold text-left transition-all"
                style={{
                  background: activePlatform === i ? "rgba(20,110,245,0.18)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${activePlatform === i ? "rgba(20,110,245,0.5)" : "rgba(255,255,255,0.08)"}`,
                  color: activePlatform === i ? "white" : "rgba(255,255,255,0.65)",
                }}
              >
                <div>{p.label}</div>
                <div className="text-[0.66rem] font-normal mt-0.5" style={{ color: activePlatform === i ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)" }}>{p.hint}</div>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tổng phí %">
              <PctInput value={input.platformFeePct} onChange={(v) => { setActivePlatform(null); set("platformFeePct", v); }} />
            </Field>
            <Field label="Phí xử lý/đơn">
              <VNDInput value={input.perOrderProcessingFee} onChange={(v) => set("perOrderProcessingFee", v)} />
            </Field>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Voucher seller">
            <PctInput value={input.voucherSellerPct} onChange={(v) => set("voucherSellerPct", v)} />
          </Field>
          <Field label="Ship seller chịu/đơn">
            <VNDInput value={input.shippingPerOrder} onChange={(v) => set("shippingPerOrder", v)} />
          </Field>
        </div>

        <div className="pt-4 border-t" style={{ borderColor: "var(--line)" }}>
          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>Chi phí cố định / tháng</div>
          <div className="flex flex-col gap-3">
            <Field label="Ads spend"><VNDInput value={input.adsMonthly} onChange={(v) => set("adsMonthly", v)} /></Field>
            <Field label="Nhân sự"><VNDInput value={input.staffMonthly} onChange={(v) => set("staffMonthly", v)} /></Field>
            <Field label="Kho + logistics cố định"><VNDInput value={input.warehouseMonthly} onChange={(v) => set("warehouseMonthly", v)} /></Field>
            <Field label="Marketing khác (KOC, content)"><VNDInput value={input.marketingOtherMonthly} onChange={(v) => set("marketingOtherMonthly", v)} /></Field>
            <Field label="Chi khác"><VNDInput value={input.otherMonthly} onChange={(v) => set("otherMonthly", v)} /></Field>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="flex flex-col gap-6">
        {/* Headline metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass p-5">
            <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Net Revenue</div>
            <div className="text-[1.4rem] md:text-[1.6rem] font-extrabold leading-none text-white">{fmtVND(result.netRevenue)}<span className="text-[0.85rem] ml-1 font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>₫</span></div>
          </div>
          <div className="glass p-5">
            <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Gross Margin</div>
            <div className="text-[1.4rem] md:text-[1.6rem] font-extrabold leading-none" style={{ color: result.grossMarginPct >= 40 ? "#5fffaa" : result.grossMarginPct >= 20 ? "#ffd479" : "#ff5a72" }}>{fmtPct(result.grossMarginPct)}</div>
          </div>
          <div className="glass p-5">
            <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Contribution</div>
            <div className="text-[1.4rem] md:text-[1.6rem] font-extrabold leading-none" style={{ color: result.contributionMarginPct >= 20 ? "#5fffaa" : result.contributionMarginPct >= 5 ? "#ffd479" : "#ff5a72" }}>{fmtPct(result.contributionMarginPct)}</div>
          </div>
          <div className="glass p-5" style={{ borderColor: result.operatingProfit < 0 ? "rgba(255,90,114,0.35)" : undefined }}>
            <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>EBITDA · {marginLabel}</div>
            <div className="text-[1.4rem] md:text-[1.6rem] font-extrabold leading-none" style={{ color: profitColor }}>{fmtPct(margin)}</div>
          </div>
        </div>

        {/* P&L Statement */}
        <div className="glass overflow-hidden" id="pnl-statement">
          <div className="px-6 py-4 border-b flex items-center justify-between flex-wrap gap-3" style={{ borderColor: "var(--line)" }}>
            <div>
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.5)" }}>Báo cáo P&L · 1 tháng</div>
              <div className="text-[1rem] font-semibold text-white mt-0.5">Gian hàng TMĐT — {result.grossRevenue > 0 ? `${Math.round(input.orders).toLocaleString("vi-VN")} đơn` : "—"}</div>
            </div>
            <button
              onClick={() => window.print()}
              className="text-[0.78rem] font-semibold px-4 py-2 rounded-lg transition-all hover:bg-white/10 print:hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "white" }}
            >
              ⎙ In / Xuất PDF
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[0.9rem]">
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                  <th className="text-left px-5 py-3 font-semibold w-[55%]" style={{ color: "rgba(255,255,255,0.6)" }}>Hạng mục</th>
                  <th className="text-right px-5 py-3 font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>VND</th>
                  <th className="text-right px-5 py-3 font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>% Net</th>
                </tr>
              </thead>
              <tbody>
                {result.lines.map((l, i) => {
                  const isPositive = l.amount >= 0;
                  const rowBg = l.isFinal ? (l.amount >= 0 ? "rgba(95,255,170,0.06)" : "rgba(255,90,114,0.06)") : l.isSubtotal ? "rgba(255,255,255,0.03)" : "transparent";
                  const labelColor = l.isFinal ? "#fff" : l.isSubtotal ? "#fff" : "rgba(255,255,255,0.85)";
                  const amountColor = l.isFinal ? (l.amount >= 0 ? "#5fffaa" : "#ff5a72") : l.isSubtotal ? "#fff" : isPositive ? "rgba(255,255,255,0.9)" : "rgba(255,180,180,0.85)";
                  return (
                    <tr key={i} style={{ borderTop: "1px solid var(--line)", background: rowBg }}>
                      <td className="px-5 py-3" style={{ color: labelColor }}>
                        <div className={l.isFinal || l.isSubtotal ? "font-bold" : "font-medium"}>{l.label}</div>
                        {l.hint && <div className="text-[0.74rem] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{l.hint}</div>}
                      </td>
                      <td className="px-5 py-3 text-right font-mono" style={{ color: amountColor, fontWeight: l.isFinal || l.isSubtotal ? 700 : 500 }}>
                        {fmtVND(l.amount)}
                      </td>
                      <td className="px-5 py-3 text-right font-mono" style={{ color: amountColor, fontWeight: l.isFinal || l.isSubtotal ? 700 : 500 }}>
                        {fmtPct(l.pctOfNet)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Unit economics */}
        {input.orders > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)" }}>
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.13em] mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>Profit/đơn</div>
              <div className="text-[1.05rem] font-bold" style={{ color: profitColor }}>{fmtVND(result.profitPerOrder)}<span className="text-[0.78rem] ml-1 font-medium opacity-60">₫</span></div>
            </div>
            <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)" }}>
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.13em] mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>CPA (ads/đơn)</div>
              <div className="text-[1.05rem] font-bold text-white">{fmtVND(result.cpa)}<span className="text-[0.78rem] ml-1 font-medium opacity-60">₫</span></div>
            </div>
            <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)" }}>
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.13em] mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>ROAS</div>
              <div className="text-[1.05rem] font-bold text-white">{result.roas > 0 ? `${result.roas.toFixed(1)}x` : "—"}</div>
            </div>
            <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)" }}>
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.13em] mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>Tổng phí sàn %</div>
              <div className="text-[1.05rem] font-bold text-white">{fmtPct(result.netRevenue > 0 ? (result.platformFeesTotal / result.netRevenue) * 100 : 0)}</div>
            </div>
          </div>
        )}

        {/* Diagnosis */}
        {input.orders > 0 && (
          <div className="rounded-xl px-5 py-4 text-[0.88rem] leading-[1.7]" style={{ background: result.operatingProfit < 0 ? "rgba(255,90,114,0.08)" : result.operatingMarginPct < 5 ? "rgba(255,212,121,0.08)" : "rgba(95,255,170,0.07)", border: `1px solid ${result.operatingProfit < 0 ? "rgba(255,90,114,0.25)" : result.operatingMarginPct < 5 ? "rgba(255,212,121,0.25)" : "rgba(95,255,170,0.25)"}`, color: "rgba(255,255,255,0.78)" }}>
            <strong className="text-white">Chẩn đoán nhanh: </strong>
            {result.operatingProfit < 0 ? (
              <>Đang lỗ {fmtVND(Math.abs(result.operatingProfit))}đ/tháng. Vấn đề lớn nhất thường là: gross margin {fmtPct(result.grossMarginPct)} {result.grossMarginPct < 35 ? "quá mỏng — cần giảm COGS hoặc tăng AOV" : "ổn — vấn đề ở chi phí cố định hoặc ads quá lớn so với volume"}.</>
            ) : result.operatingMarginPct < 5 ? (
              <>Margin {fmtPct(margin)} đang mỏng. Buffer thấp khi sàn tăng phí. Hướng cải thiện: tăng AOV bằng bundle, tối ưu ads để giảm CPA, hoặc giãn chi phí cố định.</>
            ) : result.operatingMarginPct >= 15 ? (
              <>EBITDA {fmtPct(margin)} là vùng healthy. Nên tái đầu tư phần lớn lợi nhuận vào ads + content để scale nhanh trước khi đối thủ bắt kịp.</>
            ) : (
              <>Margin {fmtPct(margin)} ở mức an toàn nhưng chưa khoẻ. Push tăng AOV (bundle, upsell) hoặc tối ưu CPA để đẩy lên 15%+ làm buffer.</>
            )}
          </div>
        )}
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body { background: white !important; color: black !important; }
          nav, footer, .blob, .grid-pattern { display: none !important; }
          #pnl-statement { background: white !important; border: 1px solid #ddd !important; }
          #pnl-statement * { color: black !important; }
          #pnl-statement th, #pnl-statement td { border-color: #ddd !important; }
        }
      `}</style>
    </div>
  );
}
