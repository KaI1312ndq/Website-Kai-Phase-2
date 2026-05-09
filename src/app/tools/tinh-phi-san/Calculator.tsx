"use client";
import { useMemo, useState } from "react";
import {
  tiktokGroups, tiktokLevel1, tiktokLevel2, tiktokLevel3, tiktokRate,
  shopeeLevel1, shopeeLevel2, shopeeLevel3, shopeeMallRate, shopeeNonMallRate,
  compute, fmt, PLATFORM_CONFIG, type ExtraCost, type PlatformKey,
} from "@/lib/fees/lookup";

const PLATFORMS: PlatformKey[] = ["tiktokNonMall", "tiktokMall", "shopeeNonMall", "shopeeMall"];

const DEFAULT_EXTRAS: ExtraCost[] = [
  { id: "ads", label: "Chi phí quảng cáo", mode: "percent", value: 15 },
  { id: "marketing", label: "Marketing khác", mode: "percent", value: 5 },
  { id: "fulfill", label: "Fulfillment", mode: "flat", value: 10000 },
  { id: "staff", label: "Nhân sự", mode: "flat", value: 5000 },
];

function Select({ value, onChange, options, placeholder, disabled }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string; disabled?: boolean }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full px-3 py-2.5 rounded-lg text-[0.92rem] outline-none transition-all"
      style={{
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.03)",
        color: "white",
        fontFamily: "inherit",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <option value="" style={{ background: "#08102b" }}>{placeholder ?? "— chọn —"}</option>
      {options.map((o) => (
        <option key={o} value={o} style={{ background: "#08102b" }}>{o}</option>
      ))}
    </select>
  );
}

function NumberInput({ value, onChange, suffix, placeholder }: { value: number | ""; onChange: (v: number) => void; suffix?: string; placeholder?: string }) {
  return (
    <div className="relative">
      <input
        type="text"
        inputMode="numeric"
        value={value === "" ? "" : value.toLocaleString("vi-VN")}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^\d]/g, "");
          onChange(raw === "" ? 0 : parseInt(raw, 10));
        }}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg text-[0.95rem] outline-none transition-all"
        style={{
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.03)",
          color: "white",
          fontFamily: "inherit",
        }}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.82rem]" style={{ color: "rgba(255,255,255,0.5)" }}>{suffix}</span>
      )}
    </div>
  );
}

function PercentInput({ value, onChange, max = 100 }: { value: number; onChange: (v: number) => void; max?: number }) {
  return (
    <div className="relative">
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          onChange(isNaN(v) ? 0 : Math.max(0, Math.min(max, v)));
        }}
        step="0.1"
        className="w-full px-4 py-2.5 rounded-lg text-[0.95rem] outline-none transition-all"
        style={{
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.03)",
          color: "white",
          fontFamily: "inherit",
        }}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.82rem]" style={{ color: "rgba(255,255,255,0.5)" }}>%</span>
    </div>
  );
}

export default function Calculator() {
  // Product
  const [price, setPrice] = useState<number>(500000);
  const [cogs, setCogs] = useState<number>(200000);
  const [sellerVoucher, setSellerVoucher] = useState<number>(5);

  // TikTok category
  const [ttGroup, setTtGroup] = useState("");
  const [ttL1, setTtL1] = useState("");
  const [ttL2, setTtL2] = useState("");
  const [ttL3, setTtL3] = useState("");

  // Shopee category
  const [spL1, setSpL1] = useState("");
  const [spL2, setSpL2] = useState("");
  const [spL3, setSpL3] = useState("");

  // Opt-ins
  const [ttVoucherExtra, setTtVoucherExtra] = useState(false);
  const [ttVoucherExtraPlus, setTtVoucherExtraPlus] = useState(false);
  const [spVoucherExtra, setSpVoucherExtra] = useState(false);
  const [spPiShip, setSpPiShip] = useState(false);

  // Extras
  const [extras, setExtras] = useState<ExtraCost[]>(DEFAULT_EXTRAS);

  /* ─── Memoized rate lookup ─── */
  const ttRate = useMemo(() => {
    if (!ttGroup || !ttL1) return null;
    return tiktokRate(ttGroup, ttL1, ttL2, ttL3);
  }, [ttGroup, ttL1, ttL2, ttL3]);

  const spMallRate = useMemo(() => spL1 ? shopeeMallRate(spL1, spL2, spL3) : null, [spL1, spL2, spL3]);
  const spNonMallRate = useMemo(() => spL1 ? shopeeNonMallRate(spL1, spL2, spL3) : null, [spL1, spL2, spL3]);

  /* ─── Compute 4 platforms ─── */
  const results = useMemo(() => {
    const make = (p: PlatformKey) => {
      const cfg = PLATFORM_CONFIG[p];
      let commission = 0;
      if (p === "tiktokNonMall") commission = ttRate?.std ?? 12.5;
      if (p === "tiktokMall") commission = ttRate?.mall ?? 15.5;
      if (p === "shopeeNonMall") commission = spNonMallRate ?? 10.5;
      if (p === "shopeeMall") commission = spMallRate ?? 13.5;

      const ve = (p === "tiktokNonMall" || p === "tiktokMall")
        ? (ttVoucherExtra ? cfg.voucherExtraOptions : undefined)
        : (spVoucherExtra && (p === "shopeeNonMall" || p === "shopeeMall")) ? cfg.voucherExtraOptions : undefined;
      const vep = (p === "tiktokNonMall" || p === "tiktokMall")
        ? (ttVoucherExtraPlus ? cfg.voucherExtraPlusOptions : undefined)
        : undefined;
      const ps = (p === "shopeeNonMall" || p === "shopeeMall")
        ? (spPiShip ? cfg.piShip : undefined)
        : undefined;

      return {
        platform: p,
        config: cfg,
        commission,
        result: compute({
          price,
          cogs,
          sellerVoucherPct: sellerVoucher,
          commissionRate: commission,
          txnRate: cfg.txnRate,
          perOrderFee: cfg.perOrderFee,
          voucherExtra: ve as any,
          voucherExtraPlus: vep as any,
          piShip: ps as any,
          extraCosts: extras,
        }),
      };
    };
    return PLATFORMS.map(make);
  }, [price, cogs, sellerVoucher, ttRate, spMallRate, spNonMallRate, ttVoucherExtra, ttVoucherExtraPlus, spVoucherExtra, spPiShip, extras]);

  // Find best (highest profit)
  const bestIdx = useMemo(() => {
    let best = 0;
    let max = -Infinity;
    results.forEach((r, i) => {
      if (r.result.profit > max) { max = r.result.profit; best = i; }
    });
    return best;
  }, [results]);

  /* ─── Handlers ─── */
  const updateExtra = (id: string, patch: Partial<ExtraCost>) => {
    setExtras((arr) => arr.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };
  const addExtra = () => {
    setExtras((arr) => [...arr, { id: `c-${Date.now()}`, label: "Chi phí mới", mode: "flat", value: 0 }]);
  };
  const removeExtra = (id: string) => {
    setExtras((arr) => arr.filter((c) => c.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 lg:gap-8">
      {/* ───── INPUT ───── */}
      <div className="rounded-2xl p-5 md:p-6 lg:sticky lg:top-24 self-start space-y-6" style={{ background: "linear-gradient(180deg, rgba(20,40,90,0.45), rgba(8,16,43,0.85))", border: "1px solid rgba(255,255,255,0.10)" }}>
        {/* Product */}
        <div>
          <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "#9bb6ff" }}>Sản phẩm</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">Giá bán (VNĐ)</label>
              <NumberInput value={price} onChange={setPrice} suffix="đ" />
            </div>
            <div>
              <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">Giá vốn (COGS)</label>
              <NumberInput value={cogs} onChange={setCogs} suffix="đ" />
            </div>
            <div>
              <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">Voucher seller áp dụng</label>
              <PercentInput value={sellerVoucher} onChange={setSellerVoucher} />
            </div>
          </div>
        </div>

        {/* TikTok category */}
        <div>
          <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3 flex items-center justify-between" style={{ color: "#9bb6ff" }}>
            <span>Ngành hàng — TikTok Shop</span>
            {ttRate && <span className="grad-text font-semibold normal-case tracking-normal text-[0.72rem]">{ttRate.std}% · {ttRate.mall}%</span>}
          </h3>
          <div className="space-y-2">
            <Select value={ttGroup} onChange={(v) => { setTtGroup(v); setTtL1(""); setTtL2(""); setTtL3(""); }} options={tiktokGroups()} placeholder="Nhóm ngành hàng" />
            <Select value={ttL1} onChange={(v) => { setTtL1(v); setTtL2(""); setTtL3(""); }} options={ttGroup ? tiktokLevel1(ttGroup) : []} placeholder="Cấp 1" disabled={!ttGroup} />
            <Select value={ttL2} onChange={(v) => { setTtL2(v); setTtL3(""); }} options={ttL1 ? tiktokLevel2(ttGroup, ttL1) : []} placeholder="Cấp 2" disabled={!ttL1} />
            <Select value={ttL3} onChange={setTtL3} options={ttL2 ? tiktokLevel3(ttGroup, ttL1, ttL2) : []} placeholder="Cấp 3 (tuỳ chọn)" disabled={!ttL2} />
          </div>
        </div>

        {/* Shopee category */}
        <div>
          <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3 flex items-center justify-between" style={{ color: "#9bb6ff" }}>
            <span>Ngành hàng — Shopee</span>
            {spMallRate !== null && spNonMallRate !== null && (
              <span className="grad-text font-semibold normal-case tracking-normal text-[0.72rem]">{spNonMallRate}% · {spMallRate}%</span>
            )}
          </h3>
          <div className="space-y-2">
            <Select value={spL1} onChange={(v) => { setSpL1(v); setSpL2(""); setSpL3(""); }} options={shopeeLevel1()} placeholder="Cấp 1" />
            <Select value={spL2} onChange={(v) => { setSpL2(v); setSpL3(""); }} options={spL1 ? shopeeLevel2(spL1) : []} placeholder="Cấp 2" disabled={!spL1} />
            <Select value={spL3} onChange={setSpL3} options={spL2 ? shopeeLevel3(spL1, spL2) : []} placeholder="Cấp 3 (tuỳ chọn)" disabled={!spL2} />
          </div>
        </div>

        {/* Opt-ins */}
        <div>
          <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "#9bb6ff" }}>Phí option (đăng ký)</h3>
          <div className="space-y-2 text-[0.85rem]">
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>TikTok</div>
            <label className="flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer" style={{ background: ttVoucherExtra ? "rgba(20,110,245,0.10)" : "rgba(255,255,255,0.02)", border: `1px solid ${ttVoucherExtra ? "rgba(20,110,245,0.3)" : "rgba(255,255,255,0.08)"}` }}>
              <span className="text-white">Voucher Extra <span style={{ color: "rgba(255,255,255,0.5)" }}>· 4% (cap 50k)</span></span>
              <input type="checkbox" checked={ttVoucherExtra} onChange={(e) => setTtVoucherExtra(e.target.checked)} className="accent-blue-500" />
            </label>
            <label className="flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer" style={{ background: ttVoucherExtraPlus ? "rgba(122,61,255,0.10)" : "rgba(255,255,255,0.02)", border: `1px solid ${ttVoucherExtraPlus ? "rgba(122,61,255,0.3)" : "rgba(255,255,255,0.08)"}` }}>
              <span className="text-white">Voucher Extra Plus <span style={{ color: "rgba(255,255,255,0.5)" }}>· 5.5% (cap 80k)</span></span>
              <input type="checkbox" checked={ttVoucherExtraPlus} onChange={(e) => setTtVoucherExtraPlus(e.target.checked)} className="accent-purple-500" />
            </label>

            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] mt-3" style={{ color: "rgba(255,255,255,0.45)" }}>Shopee</div>
            <label className="flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer" style={{ background: spVoucherExtra ? "rgba(238,77,45,0.10)" : "rgba(255,255,255,0.02)", border: `1px solid ${spVoucherExtra ? "rgba(238,77,45,0.3)" : "rgba(255,255,255,0.08)"}` }}>
              <span className="text-white">Voucher Extra <span style={{ color: "rgba(255,255,255,0.5)" }}>· 4% (cap 50k)</span></span>
              <input type="checkbox" checked={spVoucherExtra} onChange={(e) => setSpVoucherExtra(e.target.checked)} className="accent-orange-500" />
            </label>
            <label className="flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer" style={{ background: spPiShip ? "rgba(238,77,45,0.10)" : "rgba(255,255,255,0.02)", border: `1px solid ${spPiShip ? "rgba(238,77,45,0.3)" : "rgba(255,255,255,0.08)"}` }}>
              <span className="text-white">Pi Ship <span style={{ color: "rgba(255,255,255,0.5)" }}>· 1.600đ/đơn</span></span>
              <input type="checkbox" checked={spPiShip} onChange={(e) => setSpPiShip(e.target.checked)} className="accent-orange-500" />
            </label>
          </div>
        </div>

        {/* Extras */}
        <div>
          <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: "#9bb6ff" }}>Chi phí khác</h3>
          <div className="space-y-2">
            {extras.map((c) => (
              <div key={c.id} className="rounded-lg p-2.5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    value={c.label}
                    onChange={(e) => updateExtra(c.id, { label: e.target.value })}
                    className="flex-1 bg-transparent border-none outline-none text-[0.85rem] text-white"
                  />
                  <button onClick={() => removeExtra(c.id)} className="text-[0.7rem]" style={{ color: "rgba(255,255,255,0.4)" }}>✕</button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex rounded-md overflow-hidden flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <button
                      onClick={() => updateExtra(c.id, { mode: "percent" })}
                      className="px-2 py-1 text-[0.72rem] font-semibold transition-colors"
                      style={{ background: c.mode === "percent" ? "var(--grad-primary)" : "transparent", color: c.mode === "percent" ? "white" : "rgba(255,255,255,0.6)" }}
                    >%</button>
                    <button
                      onClick={() => updateExtra(c.id, { mode: "flat" })}
                      className="px-2 py-1 text-[0.72rem] font-semibold transition-colors"
                      style={{ background: c.mode === "flat" ? "var(--grad-primary)" : "transparent", color: c.mode === "flat" ? "white" : "rgba(255,255,255,0.6)" }}
                    >đ</button>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={c.mode === "flat" ? c.value.toLocaleString("vi-VN") : c.value}
                    onChange={(e) => {
                      if (c.mode === "flat") {
                        const raw = e.target.value.replace(/[^\d]/g, "");
                        updateExtra(c.id, { value: raw === "" ? 0 : parseInt(raw, 10) });
                      } else {
                        const v = parseFloat(e.target.value);
                        updateExtra(c.id, { value: isNaN(v) ? 0 : v });
                      }
                    }}
                    className="flex-1 px-2.5 py-1 rounded-md text-[0.85rem] outline-none"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }}
                  />
                </div>
              </div>
            ))}
            <button onClick={addExtra} className="w-full py-2 text-[0.82rem] font-semibold rounded-lg transition-colors" style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.65)" }}>
              + Thêm chi phí
            </button>
          </div>
        </div>
      </div>

      {/* ───── OUTPUT ───── */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {results.map((r, i) => {
            const isBest = i === bestIdx;
            const isProfitable = r.result.profit > 0;
            return (
              <div
                key={r.platform}
                className="rounded-2xl p-5 relative overflow-hidden"
                style={{
                  background: isBest ? "linear-gradient(160deg, rgba(0,215,34,0.10) 0%, rgba(20,110,245,0.10) 60%, rgba(8,16,43,0.85) 100%)" : "linear-gradient(180deg, rgba(20,40,90,0.40), rgba(8,16,43,0.75))",
                  border: isBest ? "1px solid rgba(0,215,34,0.3)" : "1px solid rgba(255,255,255,0.10)",
                  boxShadow: isBest ? "0 24px 60px rgba(0,215,34,0.15)" : "0 16px 40px rgba(5,10,31,0.4)",
                }}
              >
                {isBest && (
                  <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,215,34,0.30), transparent 70%)", filter: "blur(20px)" }} />
                )}

                {/* Header */}
                <div className="relative flex items-center justify-between mb-4">
                  <div className="text-[0.8rem] font-bold text-white">{r.config.short}</div>
                  {isBest && (
                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded-md" style={{ background: "rgba(0,215,34,0.18)", color: "#5fffaa", border: "1px solid rgba(0,215,34,0.35)" }}>
                      Best
                    </span>
                  )}
                </div>

                <div className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Hoa hồng nền tảng</div>
                <div className="text-[1.6rem] font-bold tracking-tight grad-text leading-none mb-4">{r.commission.toFixed(2)}%</div>

                {/* Breakdown */}
                <div className="text-[0.78rem] space-y-1.5 mb-4">
                  <Row label="Giá bán" val={r.result.revenueGross} />
                  <Row label="Voucher seller" val={-r.result.sellerVoucher} muted />
                  <Row label="Doanh thu thực" val={r.result.netRevenue} bold />
                </div>

                <div className="text-[0.78rem] space-y-1.5 pb-3 mb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Phí sàn</div>
                  <Row label={`Hoa hồng (${r.commission}%)`} val={-r.result.commission} muted />
                  <Row label={`Giao dịch (${r.config.txnRate}%)`} val={-r.result.txn} muted />
                  <Row label="Xử lý đơn" val={-r.result.perOrder} muted />
                  {r.result.voucherExtra > 0 && <Row label="Voucher Extra" val={-r.result.voucherExtra} muted />}
                  {r.result.voucherExtraPlus > 0 && <Row label="Voucher Extra+" val={-r.result.voucherExtraPlus} muted />}
                  {r.result.piShip > 0 && <Row label="Pi Ship" val={-r.result.piShip} muted />}
                  <Row label="Tổng phí sàn" val={-r.result.totalPlatformFee} bold />
                </div>

                <div className="text-[0.78rem] space-y-1.5 pb-3 mb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Chi phí khác</div>
                  {r.result.extras.map((e, j) => (
                    <Row key={j} label={e.label} val={-e.amount} muted />
                  ))}
                  <Row label="COGS" val={-r.result.cogs} muted />
                </div>

                {/* Profit */}
                <div>
                  <div className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Lợi nhuận</div>
                  <div className="text-[1.5rem] font-bold tracking-tight leading-none" style={{ color: isProfitable ? "#5fffaa" : "#ff5a72" }}>
                    {isProfitable ? "" : "-"}{fmt(Math.abs(r.result.profit))}<span className="text-[0.7rem] font-normal ml-1">đ</span>
                  </div>
                  <div className="text-[0.78rem] mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                    Margin <strong style={{ color: isProfitable ? "#5fffaa" : "#ff5a72" }}>{r.result.marginPct.toFixed(1)}%</strong>
                  </div>
                </div>

                {!isProfitable && (
                  <div className="mt-3 rounded-md px-2.5 py-1.5 text-[0.7rem]" style={{ background: "rgba(255,90,114,0.10)", border: "1px solid rgba(255,90,114,0.25)", color: "#ffa3b1" }}>
                    ⚠️ Đang lỗ — xem lại giá hoặc cost
                  </div>
                )}
                {isProfitable && r.result.marginPct < 10 && (
                  <div className="mt-3 rounded-md px-2.5 py-1.5 text-[0.7rem]" style={{ background: "rgba(255,174,19,0.08)", border: "1px solid rgba(255,174,19,0.22)", color: "#ffd479" }}>
                    Margin thấp (&lt;10%) — cần thêm volume hoặc tối ưu
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="rounded-xl p-4 text-[0.82rem] leading-[1.65]" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}>
          <strong className="text-white">Lưu ý:</strong> Phí trong tool đã bao gồm thuế GTGT (8%). Phí hoa hồng sàn TikTok áp dụng theo bảng từ <strong className="text-white">09/05/2026</strong>, Shopee từ <strong className="text-white">08/05/2026</strong>. Default rate khi không chọn ngành: TikTok 12.5% / 15.5% · Shopee 10.5% / 13.5%.
        </div>
      </div>
    </div>
  );
}

function Row({ label, val, muted, bold }: { label: string; val: number; muted?: boolean; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span style={{ color: muted ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.85)" }}>{label}</span>
      <span className={bold ? "font-semibold text-white" : ""} style={{ color: muted && !bold ? "rgba(255,255,255,0.7)" : undefined }}>
        {val < 0 ? "-" : ""}{fmt(Math.abs(val))}đ
      </span>
    </div>
  );
}
