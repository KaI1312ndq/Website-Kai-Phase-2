"use client";
import { useMemo, useState } from "react";
import {
  tiktokGroups, tiktokLevel1, tiktokLevel2, tiktokLevel3, tiktokRate,
  shopeeLevel1, shopeeLevel2, shopeeLevel3, shopeeMallRate, shopeeNonMallRate,
  compute, fmt, PLATFORM_CONFIG, type ExtraCost, type PlatformKey,
} from "@/lib/fees/lookup";

// Shopee trái → TikTok phải (per Quảng's request)
const PLATFORMS: PlatformKey[] = ["shopeeNonMall", "shopeeMall", "tiktokNonMall", "tiktokMall"];

const DEFAULT_EXTRAS: ExtraCost[] = [
  { id: "ads", label: "Quảng cáo", mode: "percent", value: 15 },
  { id: "marketing", label: "Marketing khác", mode: "percent", value: 5 },
  { id: "fulfill", label: "Fulfillment", mode: "percent", value: 2 },
  { id: "staff", label: "Nhân sự", mode: "percent", value: 1 },
];

type TtVoucher = "none" | "extra" | "extraPlus";

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
        opacity: disabled ? 0.45 : 1,
      }}
    >
      <option value="" style={{ background: "#08102b" }}>{placeholder ?? "— chọn —"}</option>
      {options.map((o) => (
        <option key={o} value={o} style={{ background: "#08102b" }}>{o}</option>
      ))}
    </select>
  );
}

function NumberInput({ value, onChange, suffix, placeholder }: { value: number; onChange: (v: number) => void; suffix?: string; placeholder?: string }) {
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
        style={{
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(255,255,255,0.03)",
          color: "white",
          fontFamily: "inherit",
        }}
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.82rem]" style={{ color: "rgba(255,255,255,0.5)" }}>{suffix}</span>}
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
        step="0.5"
        className="w-full px-4 py-2.5 pr-9 rounded-lg text-[0.95rem] outline-none transition-all"
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

function CheckboxRow({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint: string }) {
  return (
    <label className="flex items-center justify-between gap-2 py-2.5 px-3 rounded-lg cursor-pointer transition-all"
      style={{
        background: checked ? "rgba(20,110,245,0.10)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${checked ? "rgba(20,110,245,0.45)" : "rgba(255,255,255,0.08)"}`,
      }}>
      <div className="flex items-center gap-2.5">
        <span className="relative w-4 h-4 rounded flex-shrink-0 inline-flex items-center justify-center transition-colors"
          style={{
            background: checked ? "var(--grad-primary)" : "transparent",
            border: `1.5px solid ${checked ? "transparent" : "rgba(255,255,255,0.25)"}`,
          }}>
          {checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
        </span>
        <div>
          <div className="text-[0.85rem] font-semibold text-white">{label}</div>
          <div className="text-[0.72rem]" style={{ color: "rgba(255,255,255,0.5)" }}>{hint}</div>
        </div>
      </div>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
    </label>
  );
}

function SegmentedControl<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string; hint?: string }[] }) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className="px-3 py-2.5 rounded-lg text-[0.82rem] font-semibold transition-all text-center"
            style={{
              background: active ? "var(--grad-primary)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${active ? "transparent" : "rgba(255,255,255,0.10)"}`,
              color: active ? "white" : "rgba(255,255,255,0.7)",
              boxShadow: active ? "0 4px 14px rgba(20,110,245,0.35)" : "none",
            }}
          >
            <div>{o.label}</div>
            {o.hint && <div className="text-[0.68rem] font-normal mt-0.5" style={{ color: active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)" }}>{o.hint}</div>}
          </button>
        );
      })}
    </div>
  );
}

function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 md:p-6" style={{ background: "linear-gradient(180deg, rgba(20,40,90,0.40), rgba(8,16,43,0.75))", border: "1px solid rgba(255,255,255,0.10)" }}>
      <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-4 flex items-center gap-2" style={{ color: accent }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ─── Component ─── */

export default function Calculator() {
  // Product
  const [price, setPrice] = useState<number>(500000);
  const [cogs, setCogs] = useState<number>(200000);
  const [sellerVoucher, setSellerVoucher] = useState<number>(5);
  const [shippingBuyer, setShippingBuyer] = useState<number>(25000);
  const [bankPromo, setBankPromo] = useState<number>(0);

  // Shopee
  const [spL1, setSpL1] = useState("");
  const [spL2, setSpL2] = useState("");
  const [spL3, setSpL3] = useState("");
  const [spVoucherExtra, setSpVoucherExtra] = useState(false);
  const [spPiShip, setSpPiShip] = useState(false);

  // TikTok
  const [ttGroup, setTtGroup] = useState("");
  const [ttL1, setTtL1] = useState("");
  const [ttL2, setTtL2] = useState("");
  const [ttL3, setTtL3] = useState("");
  const [ttVoucher, setTtVoucher] = useState<TtVoucher>("none");
  const [ttSfr, setTtSfr] = useState(false);

  // Extras
  const [extras, setExtras] = useState<ExtraCost[]>(DEFAULT_EXTRAS);

  /* Rates */
  const ttRate = useMemo(() => (ttGroup && ttL1 ? tiktokRate(ttGroup, ttL1, ttL2, ttL3) : null), [ttGroup, ttL1, ttL2, ttL3]);
  const spMallR = useMemo(() => (spL1 ? shopeeMallRate(spL1, spL2, spL3) : null), [spL1, spL2, spL3]);
  const spNonMallR = useMemo(() => (spL1 ? shopeeNonMallRate(spL1, spL2, spL3) : null), [spL1, spL2, spL3]);

  /* Compute 4 platforms */
  const results = useMemo(() => PLATFORMS.map((p) => {
    const cfg = PLATFORM_CONFIG[p];
    let commission = 0;
    if (p === "tiktokNonMall") commission = ttRate?.std ?? 12.5;
    if (p === "tiktokMall") commission = ttRate?.mall ?? 15.5;
    if (p === "shopeeNonMall") commission = spNonMallR ?? 10.5;
    if (p === "shopeeMall") commission = spMallR ?? 13.5;

    const isTt = p === "tiktokNonMall" || p === "tiktokMall";
    const isSp = p === "shopeeNonMall" || p === "shopeeMall";

    const ve = isTt && ttVoucher === "extra" ? cfg.voucherExtraOptions
      : isSp && spVoucherExtra ? cfg.voucherExtraOptions
      : undefined;
    const vep = isTt && ttVoucher === "extraPlus" ? (cfg as any).voucherExtraPlusOptions : undefined;
    const ps = isSp && spPiShip ? (cfg as any).piShip : undefined;
    const sfr = isTt && ttSfr ? (cfg as any).sfr : undefined;

    return {
      platform: p,
      config: cfg,
      commission,
      result: compute({
        price, cogs, sellerVoucherPct: sellerVoucher,
        shippingBuyer, bankPromo,
        commissionRate: commission, txnRate: cfg.txnRate, perOrderFee: cfg.perOrderFee,
        voucherExtra: ve as any, voucherExtraPlus: vep as any, piShip: ps as any, sfr: sfr as any,
        extraCosts: extras,
      }),
    };
  }), [price, cogs, sellerVoucher, shippingBuyer, bankPromo, ttRate, spMallR, spNonMallR, ttVoucher, ttSfr, spVoucherExtra, spPiShip, extras]);

  const bestIdx = useMemo(() => {
    let best = 0, max = -Infinity;
    results.forEach((r, i) => { if (r.result.profit > max) { max = r.result.profit; best = i; } });
    return best;
  }, [results]);

  const cogsWarn = cogs >= price && price > 0;

  /* Extras */
  const updateExtra = (id: string, patch: Partial<ExtraCost>) => setExtras((arr) => arr.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const addExtra = () => setExtras((arr) => [...arr, { id: `c-${Date.now()}`, label: "Chi phí mới", mode: "percent", value: 0 }]);
  const removeExtra = (id: string) => setExtras((arr) => arr.filter((c) => c.id !== id));

  return (
    <div className="space-y-5 md:space-y-6">
      {/* ════════════════ INPUTS ════════════════ */}

      {/* Sản phẩm */}
      <Section title="Sản phẩm · 1 đơn hàng" accent="#7da9ff">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Field label="Giá bán" hint="(VNĐ)">
            <NumberInput value={price} onChange={setPrice} suffix="đ" placeholder="500.000" />
          </Field>
          <Field label="Giá vốn — COGS" hint="(VNĐ)">
            <NumberInput value={cogs} onChange={setCogs} suffix="đ" placeholder="200.000" />
            {cogsWarn && <div className="text-[0.7rem] mt-1" style={{ color: "#ff5a72" }}>⚠ COGS ≥ giá bán</div>}
          </Field>
          <Field label="Voucher seller" hint="(% giá bán)">
            <PercentInput value={sellerVoucher} onChange={setSellerVoucher} />
          </Field>
          <Field label="Phí ship buyer trả" hint="(VNĐ)">
            <NumberInput value={shippingBuyer} onChange={setShippingBuyer} suffix="đ" placeholder="25.000" />
          </Field>
          <Field label="KM ngân hàng" hint="(VNĐ — tuỳ chọn)">
            <NumberInput value={bankPromo} onChange={setBankPromo} suffix="đ" placeholder="0" />
          </Field>
        </div>
        <div className="text-[0.78rem] mt-4 leading-[1.6] rounded-lg p-3" style={{ background: "rgba(20,110,245,0.06)", border: "1px solid rgba(20,110,245,0.18)", color: "rgba(255,255,255,0.7)" }}>
          <strong className="text-white">Phí giao dịch (6%)</strong> tính theo công thức sàn:{" "}
          <code style={{ color: "#9bb6ff" }}>(Giá bán + Ship buyer trả − Voucher seller − KM ngân hàng) × 6%</code>
        </div>
      </Section>

      {/* Shopee + TikTok — Shopee TRÁI, TikTok PHẢI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        {/* Shopee — LEFT */}
        <Section title="Shopee" accent="#EE4D2D">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[0.78rem] font-semibold text-white">Ngành hàng</label>
                {spMallR !== null && spNonMallR !== null && (
                  <span className="text-[0.72rem] font-semibold">
                    <span style={{ color: "rgba(255,255,255,0.6)" }}>Non-Mall </span>
                    <span className="grad-text">{spNonMallR}%</span>
                    <span style={{ color: "rgba(255,255,255,0.45)" }}> · </span>
                    <span style={{ color: "rgba(255,255,255,0.6)" }}>Mall </span>
                    <span className="grad-text">{spMallR}%</span>
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Select value={spL1} onChange={(v) => { setSpL1(v); setSpL2(""); setSpL3(""); }} options={shopeeLevel1()} placeholder="Cấp 1" />
                <Select value={spL2} onChange={(v) => { setSpL2(v); setSpL3(""); }} options={spL1 ? shopeeLevel2(spL1) : []} placeholder="Cấp 2" disabled={!spL1} />
                <Select value={spL3} onChange={setSpL3} options={spL2 ? shopeeLevel3(spL1, spL2) : []} placeholder="Cấp 3" disabled={!spL2} />
              </div>
            </div>

            <div>
              <label className="block text-[0.78rem] font-semibold mb-2 text-white">Phí option <span className="font-normal" style={{ color: "rgba(255,255,255,0.45)" }}>— đăng ký</span></label>
              <div className="space-y-2">
                <CheckboxRow checked={spVoucherExtra} onChange={setSpVoucherExtra} label="Voucher Extra" hint="4% · cap 50.000đ" />
                <CheckboxRow checked={spPiShip} onChange={setSpPiShip} label="Pi Ship" hint="1.600đ/đơn" />
              </div>
            </div>
          </div>
        </Section>

        {/* TikTok — RIGHT */}
        <Section title="TikTok Shop" accent="#ff3358">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[0.78rem] font-semibold text-white">Ngành hàng</label>
                {ttRate && (
                  <span className="text-[0.72rem] font-semibold">
                    <span style={{ color: "rgba(255,255,255,0.6)" }}>Non-Mall </span>
                    <span className="grad-text">{ttRate.std}%</span>
                    <span style={{ color: "rgba(255,255,255,0.45)" }}> · </span>
                    <span style={{ color: "rgba(255,255,255,0.6)" }}>Mall </span>
                    <span className="grad-text">{ttRate.mall}%</span>
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Select value={ttGroup} onChange={(v) => { setTtGroup(v); setTtL1(""); setTtL2(""); setTtL3(""); }} options={tiktokGroups()} placeholder="Nhóm ngành" />
                <Select value={ttL1} onChange={(v) => { setTtL1(v); setTtL2(""); setTtL3(""); }} options={ttGroup ? tiktokLevel1(ttGroup) : []} placeholder="Cấp 1" disabled={!ttGroup} />
                <Select value={ttL2} onChange={(v) => { setTtL2(v); setTtL3(""); }} options={ttL1 ? tiktokLevel2(ttGroup, ttL1) : []} placeholder="Cấp 2" disabled={!ttL1} />
                <Select value={ttL3} onChange={setTtL3} options={ttL2 ? tiktokLevel3(ttGroup, ttL1, ttL2) : []} placeholder="Cấp 3" disabled={!ttL2} />
              </div>
            </div>

            <div>
              <label className="block text-[0.78rem] font-semibold mb-2 text-white">Voucher Extra <span className="font-normal" style={{ color: "rgba(255,255,255,0.45)" }}>— chọn 1</span></label>
              <SegmentedControl
                value={ttVoucher}
                onChange={setTtVoucher}
                options={[
                  { value: "none", label: "Không áp dụng" },
                  { value: "extra", label: "Extra", hint: "4% · cap 50k" },
                  { value: "extraPlus", label: "Extra Plus", hint: "5.5% · cap 80k" },
                ]}
              />
            </div>

            <div>
              <label className="block text-[0.78rem] font-semibold mb-2 text-white">Phí option khác <span className="font-normal" style={{ color: "rgba(255,255,255,0.45)" }}>— đăng ký</span></label>
              <CheckboxRow checked={ttSfr} onChange={setTtSfr} label="SFR — Bồi hoàn vận chuyển" hint="1.620đ/đơn" />
            </div>
          </div>
        </Section>
      </div>

      {/* Chi phí khác */}
      <Section title="Chi phí khác · trên 1 đơn" accent="#a78bff">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {extras.map((c) => (
            <div key={c.id} className="rounded-lg p-3 group" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2 mb-2">
                <input
                  value={c.label}
                  onChange={(e) => updateExtra(c.id, { label: e.target.value })}
                  className="flex-1 bg-transparent border-none outline-none text-[0.85rem] text-white font-medium"
                />
                <button onClick={() => removeExtra(c.id)} aria-label="Xoá" className="opacity-30 group-hover:opacity-100 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex rounded-md overflow-hidden flex-shrink-0" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <button
                    onClick={() => updateExtra(c.id, { mode: "percent" })}
                    className="px-2.5 py-1 text-[0.72rem] font-bold transition-colors"
                    style={{ background: c.mode === "percent" ? "var(--grad-primary)" : "transparent", color: c.mode === "percent" ? "white" : "rgba(255,255,255,0.55)" }}
                  >%</button>
                  <button
                    onClick={() => updateExtra(c.id, { mode: "flat" })}
                    className="px-2.5 py-1 text-[0.72rem] font-bold transition-colors"
                    style={{ background: c.mode === "flat" ? "var(--grad-primary)" : "transparent", color: c.mode === "flat" ? "white" : "rgba(255,255,255,0.55)" }}
                  >đ</button>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  value={c.mode === "flat" ? (c.value === 0 ? "" : c.value.toLocaleString("vi-VN")) : c.value}
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
          <button onClick={addExtra} className="rounded-lg p-3 text-[0.85rem] font-semibold transition-colors flex items-center justify-center gap-2"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.6)", minHeight: "78px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Thêm chi phí
          </button>
        </div>
      </Section>

      {/* Note */}
      <div className="rounded-xl p-4 text-[0.82rem] leading-[1.65]" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}>
        <strong className="text-white">Lưu ý:</strong> Tất cả phí trong tool đã bao gồm thuế GTGT và <strong className="text-white">tính cho 1 đơn hàng</strong>. Phí TikTok Shop áp dụng từ 09/05/2026, Shopee từ 08/05/2026. Default rate khi chưa chọn ngành: TikTok 12.5% / 15.5% · Shopee 10.5% / 13.5%.
      </div>

      {/* ════════════════ OUTPUT — 4 BIG CARDS ════════════════ */}

      <div className="pt-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div>
            <h2 className="text-[1.6rem] md:text-[2rem] font-bold tracking-tight text-white">
              So sánh <span className="grad-text">4 phương án</span>
            </h2>
            <p className="text-[0.85rem] mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>Lợi nhuận và chi phí trên 1 đơn hàng</p>
          </div>
          <div className="text-[0.78rem]" style={{ color: "rgba(255,255,255,0.5)" }}>Card <span style={{ color: "#5fffaa", fontWeight: 700 }}>Best</span> = lợi nhuận cao nhất</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {results.map((r, i) => {
            const isBest = i === bestIdx;
            const isProfitable = r.result.profit > 0;
            const isTt = r.platform === "tiktokNonMall" || r.platform === "tiktokMall";
            const isMall = r.platform === "shopeeMall" || r.platform === "tiktokMall";

            return (
              <div
                key={r.platform}
                className="rounded-2xl relative overflow-hidden flex flex-col"
                style={{
                  background: isBest
                    ? "linear-gradient(160deg, rgba(0,215,34,0.10) 0%, rgba(20,110,245,0.10) 60%, rgba(8,16,43,0.85) 100%)"
                    : "linear-gradient(180deg, rgba(20,40,90,0.42), rgba(8,16,43,0.78))",
                  border: isBest ? "1px solid rgba(0,215,34,0.40)" : "1px solid rgba(255,255,255,0.10)",
                  boxShadow: isBest
                    ? "0 28px 70px rgba(0,215,34,0.20), 0 0 0 1px rgba(0,215,34,0.20) inset"
                    : "0 18px 44px rgba(5,10,31,0.45)",
                }}
              >
                {isBest && (
                  <div className="absolute top-0 right-0 w-44 h-44 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,215,34,0.30), transparent 70%)", filter: "blur(24px)" }} />
                )}

                {/* Header strip — accent color thanh trên cùng */}
                <div className="h-1 w-full" style={{ background: r.config.accent }} />

                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  {/* Title */}
                  <div className="relative flex items-start justify-between mb-6">
                    <div>
                      <div className="text-[0.62rem] font-bold uppercase tracking-[0.16em] mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {isTt ? "TikTok Shop" : "Shopee"}
                      </div>
                      <div className="text-[1.2rem] font-bold text-white tracking-tight">
                        {isMall ? "Mall" : "Non-Mall"}
                      </div>
                    </div>
                    {isBest && (
                      <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-md" style={{ background: "rgba(0,215,34,0.20)", color: "#5fffaa", border: "1px solid rgba(0,215,34,0.45)" }}>
                        Best
                      </span>
                    )}
                  </div>

                  {/* PROFIT — main visual */}
                  <div className="relative mb-5 pb-5 border-b" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
                    <div className="text-[0.65rem] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>Lợi nhuận / đơn</div>
                    <div className="text-[2.4rem] md:text-[2.6rem] font-bold tracking-tight leading-none" style={{ color: isProfitable ? "#5fffaa" : "#ff5a72" }}>
                      {isProfitable ? "" : "-"}{fmt(Math.abs(r.result.profit))}
                      <span className="text-[1rem] font-normal ml-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>đ</span>
                    </div>
                    <div className="mt-2.5 flex items-center gap-3 text-[0.85rem]">
                      <span style={{ color: "rgba(255,255,255,0.55)" }}>Margin</span>
                      <span className="font-bold text-[1rem]" style={{ color: isProfitable ? "#5fffaa" : "#ff5a72" }}>{r.result.marginPct.toFixed(1)}%</span>
                      {!isProfitable && (
                        <span className="text-[0.7rem] inline-block rounded-md px-2 py-0.5" style={{ background: "rgba(255,90,114,0.10)", border: "1px solid rgba(255,90,114,0.25)", color: "#ffa3b1" }}>
                          ⚠ Đang lỗ
                        </span>
                      )}
                      {isProfitable && r.result.marginPct < 10 && (
                        <span className="text-[0.7rem] inline-block rounded-md px-2 py-0.5" style={{ background: "rgba(255,174,19,0.10)", border: "1px solid rgba(255,174,19,0.25)", color: "#ffd479" }}>
                          Margin thấp
                        </span>
                      )}
                    </div>
                  </div>

                  {/* DOANH THU */}
                  <div className="mb-4">
                    <div className="text-[0.65rem] font-bold uppercase tracking-[0.18em] mb-2.5" style={{ color: "rgba(255,255,255,0.5)" }}>Doanh thu</div>
                    <div className="space-y-1.5 text-[0.85rem]">
                      <Row label="Giá bán" val={r.result.revenueGross} />
                      <Row label="Voucher seller" val={-r.result.sellerVoucher} muted />
                      {bankPromo > 0 && <Row label="KM ngân hàng" val={-bankPromo} muted />}
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <span className="text-[0.85rem] font-bold text-white">Doanh thu thực</span>
                      <span className="text-[1.05rem] font-bold text-white">{fmt(r.result.netRevenue)}đ</span>
                    </div>
                  </div>

                  {/* PHÍ SÀN */}
                  <div className="mb-4 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="text-[0.65rem] font-bold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.5)" }}>Phí sàn</div>
                      <div className="text-[0.95rem] font-bold" style={{ color: "#ff8da3" }}>-{fmt(r.result.totalPlatformFee)}đ</div>
                    </div>
                    <div className="space-y-1.5 text-[0.82rem]">
                      <Row label={`Hoa hồng ${r.commission}%`} val={-r.result.commission} muted />
                      <Row label={`Giao dịch ${r.config.txnRate}%`} val={-r.result.txn} muted hint={`base ${fmt(r.result.txnBase)}đ`} />
                      <Row label="Xử lý đơn" val={-r.result.perOrder} muted />
                      {r.result.voucherExtra > 0 && <Row label="Voucher Extra" val={-r.result.voucherExtra} muted />}
                      {r.result.voucherExtraPlus > 0 && <Row label="Voucher Extra+" val={-r.result.voucherExtraPlus} muted />}
                      {r.result.sfr > 0 && <Row label="SFR" val={-r.result.sfr} muted />}
                      {r.result.piShip > 0 && <Row label="Pi Ship" val={-r.result.piShip} muted />}
                    </div>
                  </div>

                  {/* CHI PHÍ KHÁC */}
                  <div className="pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="text-[0.65rem] font-bold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.5)" }}>Chi phí + Vốn</div>
                      <div className="text-[0.95rem] font-bold" style={{ color: "#ff8da3" }}>-{fmt(r.result.totalExtras + r.result.cogs)}đ</div>
                    </div>
                    <div className="space-y-1.5 text-[0.82rem]">
                      {r.result.extras.map((e, j) => (
                        <Row key={j} label={e.label} val={-e.amount} muted />
                      ))}
                      <Row label="COGS" val={-r.result.cogs} muted />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Row({ label, val, muted, bold, hint }: { label: string; val: number; muted?: boolean; bold?: boolean; hint?: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span style={{ color: muted ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.85)" }}>
        {label}
        {hint && <span className="ml-1 text-[0.7rem]" style={{ color: "rgba(255,255,255,0.35)" }}>· {hint}</span>}
      </span>
      <span className={bold ? "font-bold text-white" : ""} style={{ color: muted && !bold ? "rgba(255,255,255,0.78)" : undefined }}>
        {val < 0 ? "-" : ""}{fmt(Math.abs(val))}đ
      </span>
    </div>
  );
}
