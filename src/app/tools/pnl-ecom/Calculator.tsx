"use client";
import { useMemo, useState } from "react";
import { computePnL, computeNetRevenue, fmtVND, fmtVNDCompact, fmtPct, type PnLInput } from "@/lib/pnl/compute";

const PLATFORM_PRESETS = [
  { label: "TikTok Non-Mall", commission: 12.5, transaction: 6, processing: 3000, hint: "HH 12.5% · GD 6% · CSHT 3.000đ" },
  { label: "TikTok Mall", commission: 15.5, transaction: 6, processing: 3000, hint: "HH 15.5% · GD 6% · CSHT 3.000đ" },
  { label: "Shopee Non-Mall", commission: 12, transaction: 6, processing: 3000, hint: "HH 12% · GD 6% · CSHT 3.000đ" },
  { label: "Shopee Mall", commission: 15, transaction: 6, processing: 3000, hint: "HH 15% · GD 6% · CSHT 3.000đ" },
];

type FixedCostMode = "vnd" | "pct";

type State = PnLInput & {
  // store mode + raw value for fixed costs to support % toggle
  adsValue: number; adsMode: FixedCostMode;
  staffValue: number; staffMode: FixedCostMode;
  warehouseValue: number; warehouseMode: FixedCostMode;
  marketingOtherValue: number; marketingOtherMode: FixedCostMode;
  otherValue: number; otherMode: FixedCostMode;
};

const SCENARIOS: Array<{ label: string; platformIdx: number; values: Partial<State> }> = [
  {
    label: "Beauty Non-Mall · 1.000 đơn",
    platformIdx: 0,
    values: {
      orders: 1000, aov: 280000, returnRatePct: 5, cogs: 95000,
      voucherSellerPct: 3, buyerShippingPerOrder: 25000,
      adsValue: 35000000, adsMode: "vnd",
      staffValue: 25000000, staffMode: "vnd",
      warehouseValue: 8000000, warehouseMode: "vnd",
      marketingOtherValue: 10000000, marketingOtherMode: "vnd",
      otherValue: 3000000, otherMode: "vnd",
    },
  },
  {
    label: "Fashion Non-Mall · 2.000 đơn",
    platformIdx: 0,
    values: {
      orders: 2000, aov: 220000, returnRatePct: 12, cogs: 75000,
      voucherSellerPct: 5, buyerShippingPerOrder: 22000,
      adsValue: 60000000, adsMode: "vnd",
      staffValue: 35000000, staffMode: "vnd",
      warehouseValue: 12000000, warehouseMode: "vnd",
      marketingOtherValue: 15000000, marketingOtherMode: "vnd",
      otherValue: 5000000, otherMode: "vnd",
    },
  },
  {
    label: "F&B Mall · 1.500 đơn",
    platformIdx: 1,
    values: {
      orders: 1500, aov: 180000, returnRatePct: 3, cogs: 105000,
      voucherSellerPct: 4, buyerShippingPerOrder: 18000,
      adsValue: 28000000, adsMode: "vnd",
      staffValue: 22000000, staffMode: "vnd",
      warehouseValue: 15000000, warehouseMode: "vnd",
      marketingOtherValue: 8000000, marketingOtherMode: "vnd",
      otherValue: 4000000, otherMode: "vnd",
    },
  },
];

const INITIAL_PLATFORM = 0;

function makeInitial(scenarioIdx: number): State {
  const s = SCENARIOS[scenarioIdx];
  const p = PLATFORM_PRESETS[s.platformIdx];
  return {
    orders: 0, aov: 0, returnRatePct: 0, cogs: 0,
    commissionPct: p.commission, transactionPct: p.transaction,
    voucherSellerPct: 0, perOrderProcessingFee: p.processing, buyerShippingPerOrder: 0,
    adsMonthly: 0, staffMonthly: 0, warehouseMonthly: 0, marketingOtherMonthly: 0, otherMonthly: 0,
    adsValue: 0, adsMode: "vnd",
    staffValue: 0, staffMode: "vnd",
    warehouseValue: 0, warehouseMode: "vnd",
    marketingOtherValue: 0, marketingOtherMode: "vnd",
    otherValue: 0, otherMode: "vnd",
    ...s.values,
  } as State;
}

/* ─── Atoms ─── */
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <label className="block mb-1.5">
        <span className="block text-[0.78rem] font-semibold text-white">{label}</span>
        {hint && <span className="block text-[0.72rem] mt-0.5" style={{ color: "rgba(255,255,255,0.42)" }}>{hint}</span>}
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

function NumInput({ value, onChange, suffix, step }: { value: number; onChange: (v: number) => void; suffix?: string; step?: string }) {
  return (
    <div className="relative">
      <input
        type="number"
        value={value === 0 ? "" : value}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          onChange(isNaN(v) ? 0 : v);
        }}
        step={step || "1"}
        className="w-full px-4 py-2.5 pr-9 rounded-lg text-[0.95rem] outline-none transition-all"
        style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)", color: "white", fontFamily: "inherit" }}
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.82rem]" style={{ color: "rgba(255,255,255,0.5)" }}>{suffix}</span>}
    </div>
  );
}

function PctInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return <NumInput value={value} onChange={(v) => onChange(Math.max(0, Math.min(100, v)))} suffix="%" step="0.5" />;
}

/** Fixed cost field that supports VND / % toggle. % is computed against netRevenue. */
function ToggledCost({
  label, mode, value, onChange, onModeChange, baseRevenue,
}: {
  label: string;
  mode: FixedCostMode;
  value: number;
  onChange: (v: number) => void;
  onModeChange: (m: FixedCostMode) => void;
  baseRevenue: number;
}) {
  const computed = mode === "pct" ? (baseRevenue * value) / 100 : value;
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between mb-1.5 gap-2">
        <span className="block text-[0.78rem] font-semibold text-white truncate">{label}</span>
        <div className="flex items-center rounded-md p-0.5 flex-shrink-0" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {(["vnd", "pct"] as FixedCostMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onModeChange(m)}
              className="px-2 py-0.5 rounded text-[0.68rem] font-bold transition-all"
              style={{
                background: mode === m ? "rgba(20,110,245,0.5)" : "transparent",
                color: mode === m ? "white" : "rgba(255,255,255,0.5)",
              }}
            >{m === "vnd" ? "₫" : "%"}</button>
          ))}
        </div>
      </div>
      {mode === "vnd" ? (
        <VNDInput value={value} onChange={onChange} />
      ) : (
        <>
          <PctInput value={value} onChange={onChange} />
          <div className="text-[0.7rem] mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            ≈ {fmtVND(computed)}₫ / tháng
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Main ─── */
export default function PnLCalculator() {
  const [state, setState] = useState<State>(makeInitial(0));
  const [activePlatform, setActivePlatform] = useState<number | null>(SCENARIOS[0].platformIdx);
  const [activeScenario, setActiveScenario] = useState<number | null>(0);

  const set = <K extends keyof State>(k: K, v: State[K]) => setState((s) => ({ ...s, [k]: v }));

  // Compute net revenue for % toggle base
  const netRevenue = useMemo(() => computeNetRevenue(state.orders, state.aov, state.returnRatePct), [state.orders, state.aov, state.returnRatePct]);

  // Resolve fixed costs from mode/value
  const resolvedInput: PnLInput = useMemo(() => {
    const r = (mode: FixedCostMode, v: number) => mode === "pct" ? (netRevenue * v) / 100 : v;
    return {
      orders: state.orders, aov: state.aov, returnRatePct: state.returnRatePct,
      cogs: state.cogs,
      commissionPct: state.commissionPct,
      transactionPct: state.transactionPct,
      voucherSellerPct: state.voucherSellerPct,
      perOrderProcessingFee: state.perOrderProcessingFee,
      buyerShippingPerOrder: state.buyerShippingPerOrder,
      adsMonthly: r(state.adsMode, state.adsValue),
      staffMonthly: r(state.staffMode, state.staffValue),
      warehouseMonthly: r(state.warehouseMode, state.warehouseValue),
      marketingOtherMonthly: r(state.marketingOtherMode, state.marketingOtherValue),
      otherMonthly: r(state.otherMode, state.otherValue),
    };
  }, [state, netRevenue]);

  const result = useMemo(() => computePnL(resolvedInput), [resolvedInput]);

  function applyPlatform(idx: number) {
    const p = PLATFORM_PRESETS[idx];
    setActivePlatform(idx);
    setState((s) => ({ ...s, commissionPct: p.commission, transactionPct: p.transaction, perOrderProcessingFee: p.processing }));
  }

  function applyScenario(idx: number) {
    const s = SCENARIOS[idx];
    const p = PLATFORM_PRESETS[s.platformIdx];
    setActiveScenario(idx);
    setActivePlatform(s.platformIdx);
    setState((prev) => ({
      ...prev,
      commissionPct: p.commission, transactionPct: p.transaction, perOrderProcessingFee: p.processing,
      ...s.values,
    } as State));
  }

  const profitColor = result.operatingProfit > 0 ? "#5fffaa" : result.operatingProfit === 0 ? "#ffd479" : "#ff5a72";
  const margin = result.operatingMarginPct;
  const marginLabel = margin >= 15 ? "Khoẻ" : margin >= 5 ? "Mỏng" : margin >= 0 ? "Hoà vốn" : "Lỗ";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-8 items-start">
      {/* ── Input Panel ── */}
      <div className="glass p-7 flex flex-col gap-6 print:hidden">
        <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] grad-text">Thông số đầu vào</div>

        {/* Scenarios */}
        <div>
          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>Kịch bản mẫu</div>
          <div className="flex flex-col gap-1.5">
            {SCENARIOS.map((sc, i) => {
              const active = activeScenario === i;
              return (
                <button
                  key={sc.label}
                  onClick={() => applyScenario(i)}
                  className="px-3 py-2 rounded-lg text-[0.78rem] font-semibold text-left transition-all flex items-center justify-between gap-2"
                  style={{
                    background: active ? "rgba(20,110,245,0.18)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${active ? "rgba(20,110,245,0.55)" : "rgba(255,255,255,0.08)"}`,
                    color: active ? "white" : "rgba(255,255,255,0.7)",
                  }}
                >
                  <span>{sc.label}</span>
                  {active && <span className="text-[0.68rem] font-bold" style={{ color: "#7da9ff" }}>✓ Đã chọn</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Volume */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Số đơn / tháng" hint="đã loại huỷ trước giao">
            <NumInput value={state.orders} onChange={(v) => { setActiveScenario(null); set("orders", v); }} />
          </Field>
          <Field label="AOV" hint="giá trị TB / đơn">
            <VNDInput value={state.aov} onChange={(v) => { setActiveScenario(null); set("aov", v); }} />
          </Field>
        </div>

        <Field label="Tỷ lệ hoàn hàng" hint="đã giao nhưng buyer hoàn">
          <PctInput value={state.returnRatePct} onChange={(v) => { setActiveScenario(null); set("returnRatePct", v); }} />
        </Field>

        <Field label="COGS / đơn" hint="xuất xưởng + bao bì + ship về kho">
          <VNDInput value={state.cogs} onChange={(v) => { setActiveScenario(null); set("cogs", v); }} />
        </Field>

        {/* Platform */}
        <div>
          <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">Phí sàn - chọn platform</label>
          <div className="grid grid-cols-2 gap-1.5 mb-2.5">
            {PLATFORM_PRESETS.map((p, i) => {
              const active = activePlatform === i;
              return (
                <button
                  key={p.label}
                  onClick={() => applyPlatform(i)}
                  className="px-3 py-2 rounded-lg text-[0.72rem] font-semibold text-left transition-all"
                  style={{
                    background: active ? "rgba(20,110,245,0.18)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${active ? "rgba(20,110,245,0.55)" : "rgba(255,255,255,0.08)"}`,
                    color: active ? "white" : "rgba(255,255,255,0.65)",
                  }}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span>{p.label}</span>
                    {active && <span style={{ color: "#7da9ff" }}>✓</span>}
                  </div>
                  <div className="text-[0.66rem] font-normal mt-0.5" style={{ color: active ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)" }}>{p.hint}</div>
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            <Field label="Hoa hồng">
              <PctInput value={state.commissionPct} onChange={(v) => { setActivePlatform(null); set("commissionPct", v); }} />
            </Field>
            <Field label="Phí GD">
              <PctInput value={state.transactionPct} onChange={(v) => { setActivePlatform(null); set("transactionPct", v); }} />
            </Field>
            <Field label="Phí CSHT/đơn">
              <VNDInput value={state.perOrderProcessingFee} onChange={(v) => { setActivePlatform(null); set("perOrderProcessingFee", v); }} />
            </Field>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Voucher seller" hint="% chi voucher trên Net Revenue">
            <PctInput value={state.voucherSellerPct} onChange={(v) => { setActiveScenario(null); set("voucherSellerPct", v); }} />
          </Field>
          <Field label="Phí ship buyer trả" hint="TB/đơn - tính phí GD chuẩn">
            <VNDInput value={state.buyerShippingPerOrder} onChange={(v) => { setActiveScenario(null); set("buyerShippingPerOrder", v); }} />
          </Field>
        </div>

        {/* Fixed costs with toggle */}
        <div className="pt-4 border-t" style={{ borderColor: "var(--line)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.55)" }}>
              Chi phí cố định / tháng
            </div>
            <div className="text-[0.66rem]" style={{ color: "rgba(255,255,255,0.4)" }}>nhập ₫ hoặc % Net</div>
          </div>
          <div className="flex flex-col gap-3">
            <ToggledCost label="Ads spend" mode={state.adsMode} value={state.adsValue} baseRevenue={netRevenue}
              onChange={(v) => { setActiveScenario(null); set("adsValue", v); }}
              onModeChange={(m) => { setActiveScenario(null); set("adsMode", m); set("adsValue", 0); }} />
            <ToggledCost label="Nhân sự" mode={state.staffMode} value={state.staffValue} baseRevenue={netRevenue}
              onChange={(v) => { setActiveScenario(null); set("staffValue", v); }}
              onModeChange={(m) => { setActiveScenario(null); set("staffMode", m); set("staffValue", 0); }} />
            <ToggledCost label="Kho + logistics cố định" mode={state.warehouseMode} value={state.warehouseValue} baseRevenue={netRevenue}
              onChange={(v) => { setActiveScenario(null); set("warehouseValue", v); }}
              onModeChange={(m) => { setActiveScenario(null); set("warehouseMode", m); set("warehouseValue", 0); }} />
            <ToggledCost label="Marketing khác (KOC, content)" mode={state.marketingOtherMode} value={state.marketingOtherValue} baseRevenue={netRevenue}
              onChange={(v) => { setActiveScenario(null); set("marketingOtherValue", v); }}
              onModeChange={(m) => { setActiveScenario(null); set("marketingOtherMode", m); set("marketingOtherValue", 0); }} />
            <ToggledCost label="Chi khác" mode={state.otherMode} value={state.otherValue} baseRevenue={netRevenue}
              onChange={(v) => { setActiveScenario(null); set("otherValue", v); }}
              onModeChange={(m) => { setActiveScenario(null); set("otherMode", m); set("otherValue", 0); }} />
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="flex flex-col gap-6">
        {/* Headline metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass p-5 min-w-0">
            <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Net Revenue</div>
            <div className="text-[1.5rem] md:text-[1.7rem] font-extrabold leading-none text-white whitespace-nowrap" title={fmtVND(result.netRevenue) + "đ"}>{fmtVNDCompact(result.netRevenue)}<span className="text-[0.78rem] ml-1 font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>₫</span></div>
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
              <div className="text-[1rem] font-semibold text-white mt-0.5">Gian hàng TMĐT - {result.grossRevenue > 0 ? `${Math.round(state.orders).toLocaleString("vi-VN")} đơn` : "-"}</div>
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
        {state.orders > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl p-4 min-w-0" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)" }}>
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.13em] mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>Profit/đơn</div>
              <div className="text-[1.05rem] font-bold whitespace-nowrap" style={{ color: profitColor }} title={fmtVND(result.profitPerOrder) + "đ"}>{fmtVNDCompact(result.profitPerOrder)}<span className="text-[0.72rem] ml-1 font-medium opacity-60">₫</span></div>
            </div>
            <div className="rounded-xl p-4 min-w-0" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)" }}>
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.13em] mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>CPA (ads/đơn)</div>
              <div className="text-[1.05rem] font-bold text-white whitespace-nowrap" title={fmtVND(result.cpa) + "đ"}>{fmtVNDCompact(result.cpa)}<span className="text-[0.72rem] ml-1 font-medium opacity-60">₫</span></div>
            </div>
            <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)" }}>
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.13em] mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>ROAS</div>
              <div className="text-[1.05rem] font-bold text-white">{result.roas > 0 ? `${result.roas.toFixed(1)}x` : "-"}</div>
            </div>
            <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)" }}>
              <div className="text-[0.7rem] font-bold uppercase tracking-[0.13em] mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>Tổng phí sàn %</div>
              <div className="text-[1.05rem] font-bold text-white">{fmtPct(result.netRevenue > 0 ? (result.platformFeesTotal / result.netRevenue) * 100 : 0)}</div>
            </div>
          </div>
        )}

        {/* Diagnosis */}
        {state.orders > 0 && (
          <div className="rounded-xl px-5 py-4 text-[0.88rem] leading-[1.7]" style={{ background: result.operatingProfit < 0 ? "rgba(255,90,114,0.08)" : result.operatingMarginPct < 5 ? "rgba(255,212,121,0.08)" : "rgba(95,255,170,0.07)", border: `1px solid ${result.operatingProfit < 0 ? "rgba(255,90,114,0.25)" : result.operatingMarginPct < 5 ? "rgba(255,212,121,0.25)" : "rgba(95,255,170,0.25)"}`, color: "rgba(255,255,255,0.78)" }}>
            <strong className="text-white">Chẩn đoán nhanh: </strong>
            {result.operatingProfit < 0 ? (
              <>Đang lỗ {fmtVND(Math.abs(result.operatingProfit))}đ/tháng. Vấn đề lớn nhất thường là: gross margin {fmtPct(result.grossMarginPct)} {result.grossMarginPct < 35 ? "quá mỏng - cần giảm COGS hoặc tăng AOV" : "ổn - vấn đề ở chi phí cố định hoặc ads quá lớn so với volume"}.</>
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
