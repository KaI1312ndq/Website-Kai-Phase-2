"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  searchTiktok, searchShopee,
  compute, fmt, PLATFORM_CONFIG,
  SHOPEE_DEFAULT_MALL, SHOPEE_DEFAULT_NONMALL,
  TIKTOK_DEFAULT_STD, TIKTOK_DEFAULT_MALL,
  type ExtraCost, type PlatformKey, type TiktokMatch, type ShopeeMatch,
} from "@/lib/fees/lookup";

// Shopee trái  TikTok phải (per Quảng's request)
const PLATFORMS: PlatformKey[] = ["shopeeNonMall", "shopeeMall", "tiktokNonMall", "tiktokMall"];

const DEFAULT_EXTRAS: ExtraCost[] = [
  { id: "ads", label: "Quảng cáo", mode: "percent", value: 15 },
  { id: "fulfill", label: "Fulfillment", mode: "percent", value: 5 },
  { id: "staff", label: "Nhân sự", mode: "percent", value: 10 },
  { id: "marketing", label: "Marketing khác", mode: "percent", value: 0 },
];

type TtVoucher = "none" | "extra" | "extraPlus";

/* ─── Atoms ─── */

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
        {label}
        {hint && <span className="ml-1.5 font-normal" style={{ color: "var(--st-45)" }}>{hint}</span>}
      </label>
      {children}
    </div>
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
        style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "var(--ink)", fontFamily: "inherit" }}
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.82rem]" style={{ color: "var(--st-50)" }}>{suffix}</span>}
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
        style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "var(--ink)", fontFamily: "inherit" }}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[0.82rem]" style={{ color: "var(--st-50)" }}>%</span>
    </div>
  );
}

function CheckboxRow({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint: string }) {
  return (
    <label className="flex items-center justify-between gap-2 py-2.5 px-3 rounded-lg cursor-pointer transition-all"
      style={{
        background: checked ? "rgba(20,110,245,0.10)" : "var(--st-03)",
        border: `1px solid ${checked ? "rgba(20,110,245,0.45)" : "var(--st-08)"}`,
      }}>
      <div className="flex items-center gap-2.5">
        <span className="relative w-4 h-4 rounded flex-shrink-0 inline-flex items-center justify-center transition-colors"
          style={{ background: checked ? "var(--grad-primary)" : "transparent", border: `1.5px solid ${checked ? "transparent" : "var(--st-25)"}` }}>
          {checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
        </span>
        <div>
          <div className="text-[0.85rem] font-semibold text-white">{label}</div>
          <div className="text-[0.72rem]" style={{ color: "var(--st-50)" }}>{hint}</div>
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
              background: active ? "var(--grad-primary)" : "var(--st-03)",
              border: `1px solid ${active ? "transparent" : "var(--st-10)"}`,
              color: active ? "white" : "var(--st-70)",
              boxShadow: active ? "0 4px 14px rgba(20,110,245,0.35)" : "none",
            }}
          >
            <div>{o.label}</div>
            {o.hint && <div className="text-[0.68rem] font-normal mt-0.5" style={{ color: active ? "var(--st-85)" : "var(--st-40)" }}>{o.hint}</div>}
          </button>
        );
      })}
    </div>
  );
}

function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 md:p-6" style={{ background: "linear-gradient(180deg, var(--dg-50), var(--db-78))", border: "1px solid var(--st-10)" }}>
      <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] mb-4 flex items-center gap-2" style={{ color: accent }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ─── CategorySearch ─── */

type SearchProps<T> = {
  selected: T | null;
  onSelect: (item: T | null) => void;
  search: (q: string) => T[];
  renderPath: (item: T) => string;
  renderRate: (item: T) => React.ReactNode;
  placeholder: string;
};

function CategorySearch<T>({ selected, onSelect, search, renderPath, renderRate, placeholder }: SearchProps<T>) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => (q.trim().length >= 1 ? search(q) : []), [q, search]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => { setHi(0); }, [q]);

  const pick = (item: T) => {
    onSelect(item);
    setQ("");
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHi((h) => Math.min(h + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); }
    if (e.key === "Enter") { e.preventDefault(); pick(results[hi]); }
    if (e.key === "Escape") { setOpen(false); }
  };

  if (selected) {
    return (
      <div ref={ref} className="rounded-lg p-3 flex items-center gap-3" style={{ background: "rgba(20,110,245,0.06)", border: "1px solid rgba(20,110,245,0.28)" }}>
        <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: "var(--grad-primary)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--st-50)" }}>Đã chọn</div>
          <div className="text-[0.85rem] font-semibold text-white truncate">{renderPath(selected)}</div>
          <div className="text-[0.78rem] mt-0.5">{renderRate(selected)}</div>
        </div>
        <button onClick={() => onSelect(null)} aria-label="Đổi ngành"
          className="text-[0.75rem] font-semibold px-2.5 py-1.5 rounded-md transition-colors hover:bg-white/10"
          style={{ color: "var(--st-70)", border: "1px solid var(--st-12)" }}>
          Đổi
        </button>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--st-40)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder={placeholder}
          className="w-full pl-9 pr-3 py-2.5 rounded-lg text-[0.92rem] outline-none transition-all"
          style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "var(--ink)", fontFamily: "inherit" }}
        />
      </div>

      {open && q.trim().length >= 1 && (
        <div className="absolute z-30 mt-1.5 w-full rounded-lg overflow-hidden"
          style={{ background: "var(--db-95)", border: "1px solid var(--st-12)", boxShadow: "0 16px 40px rgba(5,10,31,0.6)" }}>
          {results.length === 0 ? (
            <div className="px-3 py-4 text-[0.85rem] text-center" style={{ color: "var(--st-50)" }}>
              Không tìm thấy ngành phù hợp
            </div>
          ) : (
            <div className="max-h-72 overflow-y-auto">
              {results.map((r, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setHi(i)}
                  onClick={() => pick(r)}
                  className="w-full text-left px-3 py-2.5 transition-colors"
                  style={{ background: hi === i ? "rgba(20,110,245,0.12)" : "transparent", borderBottom: i < results.length - 1 ? "1px solid var(--st-04)" : "none" }}
                >
                  <div className="text-[0.85rem] text-white">{renderPath(r)}</div>
                  <div className="text-[0.72rem] mt-0.5">{renderRate(r)}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
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

  // Selections
  const [spSelection, setSpSelection] = useState<ShopeeMatch | null>(null);
  const [ttSelection, setTtSelection] = useState<TiktokMatch | null>(null);

  // Shopee opt-ins
  const [spVoucherExtra, setSpVoucherExtra] = useState(false);
  const [spPiShip, setSpPiShip] = useState(false);
  // Duy trì hiển thị (DVHT) - Shopee từ 29/05/2026: tự nạp tiền ads từ doanh thu mỗi đơn.
  // ON mặc định, rate mặc định 1% (tiêu chuẩn), seller có thể chỉnh 1-50% (linh hoạt).
  const [spDuyTri, setSpDuyTri] = useState(true);
  const [spDuyTriRate, setSpDuyTriRate] = useState(1);
  // TikTok opt-ins
  const [ttVoucher, setTtVoucher] = useState<TtVoucher>("none");
  const [ttSfr, setTtSfr] = useState(false);

  // Extras
  const [extras, setExtras] = useState<ExtraCost[]>(DEFAULT_EXTRAS);

  /* Compute 4 platforms */
  const results = useMemo(() => PLATFORMS.map((p) => {
    const cfg = PLATFORM_CONFIG[p];
    let commission = 0;
    if (p === "tiktokNonMall") commission = ttSelection?.std ?? TIKTOK_DEFAULT_STD;
    if (p === "tiktokMall") commission = ttSelection?.mall ?? TIKTOK_DEFAULT_MALL;
    if (p === "shopeeNonMall") commission = spSelection?.nonMallRate ?? SHOPEE_DEFAULT_NONMALL;
    if (p === "shopeeMall") commission = spSelection?.mallRate ?? SHOPEE_DEFAULT_MALL;

    const isTt = p === "tiktokNonMall" || p === "tiktokMall";
    const isSp = p === "shopeeNonMall" || p === "shopeeMall";

    const ve = isTt && ttVoucher === "extra" ? cfg.voucherExtraOptions
      : isSp && spVoucherExtra ? cfg.voucherExtraOptions
      : undefined;
    const vep = isTt && ttVoucher === "extraPlus" ? (cfg as any).voucherExtraPlusOptions : undefined;
    const ps = isSp && spPiShip ? (cfg as any).piShip : undefined;
    const sfr = isTt && ttSfr ? (cfg as any).sfr : undefined;
    // DVHT chỉ áp dụng cho Shopee (Non-Mall + Mall) khi seller bật
    const dvht = isSp && spDuyTri ? spDuyTriRate : undefined;

    return {
      platform: p,
      config: cfg,
      commission,
      result: compute({
        price, cogs, sellerVoucherPct: sellerVoucher, shippingBuyer,
        commissionRate: commission, txnRate: cfg.txnRate, perOrderFee: cfg.perOrderFee,
        voucherExtra: ve as any, voucherExtraPlus: vep as any, piShip: ps as any, sfr: sfr as any,
        duyTriHienThiRate: dvht,
        extraCosts: extras,
      }),
    };
  }), [price, cogs, sellerVoucher, shippingBuyer, ttSelection, spSelection, ttVoucher, ttSfr, spVoucherExtra, spPiShip, spDuyTri, spDuyTriRate, extras]);

  const bestIdx = useMemo(() => {
    let best = 0, max = -Infinity;
    results.forEach((r, i) => { if (r.result.profit > max) { max = r.result.profit; best = i; } });
    return best;
  }, [results]);

  const cogsWarn = cogs >= price && price > 0;

  const updateExtra = (id: string, patch: Partial<ExtraCost>) => setExtras((arr) => arr.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const addExtra = () => setExtras((arr) => [...arr, { id: `c-${Date.now()}`, label: "Chi phí mới", mode: "percent", value: 0 }]);
  const removeExtra = (id: string) => setExtras((arr) => arr.filter((c) => c.id !== id));

  return (
    <div className="space-y-5 md:space-y-6">
      {/* ════ Sản phẩm ════ */}
      <Section title="Sản phẩm · 1 đơn hàng" accent="#7da9ff">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Field label="Giá bán" hint="(VNĐ)">
            <NumberInput value={price} onChange={setPrice} suffix="đ" placeholder="500.000" />
          </Field>
          <Field label="Giá vốn - COGS" hint="(VNĐ)">
            <NumberInput value={cogs} onChange={setCogs} suffix="đ" placeholder="200.000" />
            {cogsWarn && <div className="text-[0.7rem] mt-1" style={{ color: "#ff5a72" }}>⚠ COGS ≥ giá bán</div>}
          </Field>
          <Field label="Voucher seller" hint="(% giá bán)">
            <PercentInput value={sellerVoucher} onChange={setSellerVoucher} />
          </Field>
          <Field label="Phí ship buyer trả" hint="(VNĐ)">
            <NumberInput value={shippingBuyer} onChange={setShippingBuyer} suffix="đ" placeholder="25.000" />
          </Field>
        </div>
        <div className="text-[0.78rem] mt-4 leading-[1.6] rounded-lg p-3" style={{ background: "rgba(20,110,245,0.06)", border: "1px solid rgba(20,110,245,0.18)", color: "var(--st-70)" }}>
          <strong className="text-white">Phí giao dịch (6%)</strong> tính theo CT chính thức:{" "}
          <code style={{ color: "#9bb6ff" }}>(Giá bán + Ship buyer trả − Voucher seller) × 6%</code>
        </div>
      </Section>

      {/* ════ Shopee + TikTok ════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        {/* Shopee - LEFT */}
        <Section title="Shopee" accent="#EE4D2D">
          <div className="space-y-4">
            <div>
              <div className="flex items-start gap-2 mb-2.5 px-3 py-2 rounded-lg text-[0.78rem] leading-[1.5]"
                style={{ background: "rgba(238,77,45,0.08)", border: "1px solid rgba(238,77,45,0.25)", color: "var(--st-70)" }}>
                <span className="text-[0.9rem] flex-shrink-0 mt-0.5">⚠</span>
                <span>
                  <strong className="text-white">Chọn ngành hàng trước</strong> để tính phí chính xác.
                  Nếu để trống, tool dùng mức mặc định{" "}
                  <strong style={{ color: "#EE4D2D" }}>Non-Mall {SHOPEE_DEFAULT_NONMALL}% · Mall {SHOPEE_DEFAULT_MALL}%</strong>{" "}
                  - cao hơn nhiều ngành thực tế.
                </span>
              </div>
              <label className="block text-[0.78rem] font-semibold mb-2 text-white">
                Tìm ngành hàng
                <span className="ml-1.5 font-normal text-[0.7rem]" style={{ color: "#5fffaa" }}>Cập nhật 29/05/2026</span>
              </label>
              <CategorySearch<ShopeeMatch>
                selected={spSelection}
                onSelect={setSpSelection}
                search={(q) => searchShopee(q, 30)}
                renderPath={(r) => r.path}
                renderRate={(r) => (
                  <span style={{ color: "var(--st-60)" }}>
                    Non-Mall <span className="grad-text font-semibold">{r.nonMallRate}%</span>
                    <span className="mx-1.5" style={{ color: "var(--st-30)" }}>·</span>
                    Mall <span className="grad-text font-semibold">{r.mallRate}%</span>
                  </span>
                )}
                placeholder="Tìm: áo, sữa rửa mặt, búp bê, máy lọc..."
              />
            </div>

            <div>
              <label className="block text-[0.78rem] font-semibold mb-2 text-white">Phí option <span className="font-normal" style={{ color: "var(--st-45)" }}>- đăng ký</span></label>
              <div className="space-y-2">
                <CheckboxRow checked={spVoucherExtra} onChange={setSpVoucherExtra} label="Voucher Extra" hint="5,5% · cap 50.000đ" />
                <CheckboxRow checked={spPiShip} onChange={setSpPiShip} label="Pi Ship" hint="2.700đ/đơn" />
              </div>
            </div>

            {/* DVHT - Duy trì hiển thị (Shopee, từ 29/05/2026) */}
            <div className="rounded-lg p-3" style={{ background: "rgba(238,77,45,0.06)", border: "1px solid rgba(238,77,45,0.22)" }}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="text-[0.82rem] font-semibold text-white flex items-center gap-1.5">
                    Duy trì hiển thị (DVHT)
                    <span className="text-[0.62rem] font-bold px-1.5 py-0.5 rounded" style={{ background: "#EE4D2D", color: "#fff" }}>29/05</span>
                  </div>
                  <div className="text-[0.7rem] mt-0.5" style={{ color: "var(--st-55)" }}>
                    Tự nạp ads từ doanh thu mỗi đơn - chuẩn 1%, linh hoạt 1-50%
                  </div>
                </div>
                <button
                  onClick={() => setSpDuyTri(v => !v)}
                  className="flex-shrink-0 relative w-9 h-5 rounded-full transition-colors"
                  style={{ background: spDuyTri ? "#EE4D2D" : "rgba(255,255,255,0.15)" }}
                  aria-label="Toggle DVHT"
                >
                  <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: spDuyTri ? "calc(100% - 18px)" : "2px" }} />
                </button>
              </div>
              {spDuyTri && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[0.72rem]" style={{ color: "var(--st-60)" }}>Tỷ lệ áp dụng:</span>
                  <div className="flex items-center gap-1 flex-1">
                    <input
                      type="range" min={1} max={50} step={1}
                      value={spDuyTriRate}
                      onChange={e => setSpDuyTriRate(parseInt(e.target.value) || 1)}
                      className="flex-1 h-1 rounded-full appearance-none"
                      style={{ background: `linear-gradient(to right, #EE4D2D 0%, #EE4D2D ${(spDuyTriRate-1)/49*100}%, rgba(255,255,255,0.1) ${(spDuyTriRate-1)/49*100}%, rgba(255,255,255,0.1) 100%)`, accentColor: "#EE4D2D" }}
                    />
                    <input
                      type="number" min={1} max={50}
                      value={spDuyTriRate}
                      onChange={e => {
                        const v = parseInt(e.target.value) || 1;
                        setSpDuyTriRate(Math.max(1, Math.min(50, v)));
                      }}
                      className="w-12 text-center text-[0.78rem] font-bold rounded py-0.5"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(238,77,45,0.3)", color: "#EE4D2D" }}
                    />
                    <span className="text-[0.72rem] font-semibold" style={{ color: "#EE4D2D" }}>%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* TikTok - RIGHT */}
        <Section title="TikTok Shop" accent="#ff3358">
          <div className="space-y-4">
            <div>
              <div className="flex items-start gap-2 mb-2.5 px-3 py-2 rounded-lg text-[0.78rem] leading-[1.5]"
                style={{ background: "rgba(255,51,88,0.08)", border: "1px solid rgba(255,51,88,0.25)", color: "var(--st-70)" }}>
                <span className="text-[0.9rem] flex-shrink-0 mt-0.5">⚠</span>
                <span>
                  <strong className="text-white">Chọn ngành hàng trước</strong> để phí hoa hồng chính xác.
                  Nếu để trống, tool dùng mặc định{" "}
                  <strong style={{ color: "#ff3358" }}>Non-Mall {TIKTOK_DEFAULT_STD}% · Mall {TIKTOK_DEFAULT_MALL}%</strong>.
                </span>
              </div>
              <label className="block text-[0.78rem] font-semibold mb-2 text-white">
                Tìm ngành hàng
                <span className="ml-1.5 font-normal text-[0.7rem]" style={{ color: "#5fffaa" }}>Cập nhật 09/05/2026</span>
              </label>
              <CategorySearch<TiktokMatch>
                selected={ttSelection}
                onSelect={setTtSelection}
                search={(q) => searchTiktok(q, 30)}
                renderPath={(r) => r.path}
                renderRate={(r) => (
                  <span style={{ color: "var(--st-60)" }}>
                    Non-Mall <span className="grad-text font-semibold">{r.std}%</span>
                    <span className="mx-1.5" style={{ color: "var(--st-30)" }}>·</span>
                    Mall <span className="grad-text font-semibold">{r.mall}%</span>
                  </span>
                )}
                placeholder="Tìm: áo, sữa rửa mặt, búp bê, máy lọc..."
              />
            </div>

            <div>
              <label className="block text-[0.78rem] font-semibold mb-2 text-white">Voucher Extra <span className="font-normal" style={{ color: "var(--st-45)" }}>- chọn 1</span></label>
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
              <label className="block text-[0.78rem] font-semibold mb-2 text-white">Phí option khác <span className="font-normal" style={{ color: "var(--st-45)" }}>- đăng ký</span></label>
              <CheckboxRow checked={ttSfr} onChange={setTtSfr} label="SFR - Bồi hoàn vận chuyển" hint="1.620đ/đơn" />
            </div>
          </div>
        </Section>
      </div>

      {/* ════ Chi phí khác ════ */}
      <Section title="Chi phí khác · trên 1 đơn" accent="#a78bff">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {extras.map((c) => (
            <div key={c.id} className="rounded-lg p-3 group" style={{ background: "var(--st-03)", border: "1px solid var(--st-08)" }}>
              <div className="flex items-center gap-2 mb-2">
                <input
                  value={c.label}
                  onChange={(e) => updateExtra(c.id, { label: e.target.value })}
                  className="flex-1 bg-transparent border-none outline-none text-[0.85rem] text-white font-medium"
                />
                <button onClick={() => removeExtra(c.id)} aria-label="Xoá" className="opacity-30 group-hover:opacity-100 transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--st-60)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex rounded-md overflow-hidden flex-shrink-0" style={{ background: "var(--st-04)", border: "1px solid var(--st-08)" }}>
                  <button onClick={() => updateExtra(c.id, { mode: "percent" })} className="px-2.5 py-1 text-[0.72rem] font-bold transition-colors"
                    style={{ background: c.mode === "percent" ? "var(--grad-primary)" : "transparent", color: c.mode === "percent" ? "white" : "var(--st-55)" }}>%</button>
                  <button onClick={() => updateExtra(c.id, { mode: "flat" })} className="px-2.5 py-1 text-[0.72rem] font-bold transition-colors"
                    style={{ background: c.mode === "flat" ? "var(--grad-primary)" : "transparent", color: c.mode === "flat" ? "white" : "var(--st-55)" }}>đ</button>
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
                  style={{ background: "var(--st-03)", border: "1px solid var(--st-08)", color: "var(--ink)" }}
                />
              </div>
            </div>
          ))}
          <button onClick={addExtra} className="rounded-lg p-3 text-[0.85rem] font-semibold transition-colors flex items-center justify-center gap-2"
            style={{ background: "var(--st-03)", border: "1px dashed var(--st-10)", color: "var(--st-60)", minHeight: "78px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Thêm chi phí
          </button>
        </div>
      </Section>

      {/* ════════════════ OUTPUT ════════════════ */}
      <div className="pt-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div>
            <h2 className="text-[1.6rem] md:text-[2rem] font-bold tracking-tight text-white">
              So sánh <span className="grad-text">4 phương án</span>
            </h2>
            <p className="text-[0.85rem] mt-1" style={{ color: "var(--st-55)" }}>Lợi nhuận và chi phí trên 1 đơn hàng</p>
          </div>
          <div className="text-[0.78rem]" style={{ color: "var(--st-50)" }}>Card <span style={{ color: "#5fffaa", fontWeight: 700 }}>Best</span> = lợi nhuận cao nhất</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {results.map((r, i) => {
            const isBest = i === bestIdx;
            const isProfitable = r.result.profit > 0;
            const isTt = r.platform === "tiktokNonMall" || r.platform === "tiktokMall";
            const isMall = r.platform === "shopeeMall" || r.platform === "tiktokMall";

            return (
              <div key={r.platform} className="rounded-2xl relative overflow-hidden flex flex-col"
                style={{
                  background: isBest
                    ? "linear-gradient(160deg, rgba(0,215,34,0.10) 0%, rgba(20,110,245,0.10) 60%, var(--db-85) 100%)"
                    : "linear-gradient(180deg, var(--dg-50), var(--db-78))",
                  border: isBest ? "1px solid rgba(0,215,34,0.40)" : "1px solid var(--st-10)",
                  boxShadow: isBest ? "0 28px 70px rgba(0,215,34,0.20), 0 0 0 1px rgba(0,215,34,0.20) inset" : "0 18px 44px rgba(5,10,31,0.45)",
                }}>
                {isBest && <div className="absolute top-0 right-0 w-44 h-44 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,215,34,0.30), transparent 70%)", filter: "blur(24px)" }} />}
                <div className="h-1 w-full" style={{ background: r.config.accent }} />

                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <div className="relative flex items-start justify-between mb-6">
                    <div>
                      <div className="text-[0.62rem] font-bold uppercase tracking-[0.16em] mb-1" style={{ color: "var(--st-50)" }}>{isTt ? "TikTok Shop" : "Shopee"}</div>
                      <div className="text-[1.2rem] font-bold text-white tracking-tight">{isMall ? "Mall" : "Non-Mall"}</div>
                    </div>
                    {isBest && <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-md" style={{ background: "rgba(0,215,34,0.20)", color: "#5fffaa", border: "1px solid rgba(0,215,34,0.45)" }}>Best</span>}
                  </div>

                  <div className="relative mb-5 pb-5 border-b" style={{ borderColor: "var(--st-10)" }}>
                    <div className="text-[0.65rem] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: "var(--st-45)" }}>Lợi nhuận / đơn</div>
                    <div className="text-[2.4rem] md:text-[2.6rem] font-bold tracking-tight leading-none" style={{ color: isProfitable ? "#5fffaa" : "#ff5a72" }}>
                      {isProfitable ? "" : "-"}{fmt(Math.abs(r.result.profit))}
                      <span className="text-[1rem] font-normal ml-1.5" style={{ color: "var(--st-55)" }}>đ</span>
                    </div>
                    <div className="mt-2.5 flex items-center gap-3 flex-wrap text-[0.85rem]">
                      <span style={{ color: "var(--st-55)" }}>Margin</span>
                      <span className="font-bold text-[1rem]" style={{ color: isProfitable ? "#5fffaa" : "#ff5a72" }}>{r.result.marginPct.toFixed(1)}%</span>
                      {!isProfitable && <span className="text-[0.7rem] inline-block rounded-md px-2 py-0.5" style={{ background: "rgba(255,90,114,0.10)", border: "1px solid rgba(255,90,114,0.25)", color: "#ffa3b1" }}>⚠ Đang lỗ</span>}
                      {isProfitable && r.result.marginPct < 10 && <span className="text-[0.7rem] inline-block rounded-md px-2 py-0.5" style={{ background: "rgba(255,174,19,0.10)", border: "1px solid rgba(255,174,19,0.25)", color: "#ffd479" }}>Margin thấp</span>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-[0.65rem] font-bold uppercase tracking-[0.18em] mb-2.5" style={{ color: "var(--st-50)" }}>Doanh thu</div>
                    <div className="space-y-1.5 text-[0.85rem]">
                      <Row label="Giá bán" val={r.result.revenueGross} />
                      <Row label="Voucher seller" val={-r.result.sellerVoucher} muted />
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t" style={{ borderColor: "var(--st-06)" }}>
                      <span className="text-[0.85rem] font-bold text-white">Doanh thu thực</span>
                      <span className="text-[1.05rem] font-bold text-white">{fmt(r.result.netRevenue)}đ</span>
                    </div>
                  </div>

                  <div className="mb-4 pt-4 border-t" style={{ borderColor: "var(--st-10)" }}>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="text-[0.65rem] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--st-50)" }}>
                        Phí sàn · {pct(r.result.totalPlatformFee, price)}
                      </div>
                      <div className="text-[0.95rem] font-bold" style={{ color: "#ff8da3" }}>-{fmt(r.result.totalPlatformFee)}đ</div>
                    </div>
                    <div className="space-y-1.5 text-[0.82rem]">
                      <Row label={`Hoa hồng ${r.commission}%`} val={-r.result.commission} muted pct={pct(r.result.commission, price)} />
                      <Row label={`Giao dịch ${r.config.txnRate}%`} val={-r.result.txn} muted hint={`base ${fmt(r.result.txnBase)}đ`} pct={pct(r.result.txn, price)} />
                      <Row label={isTt ? "Phí xử lý đơn" : "Phí cơ sở hạ tầng"} val={-r.result.perOrder} muted pct={pct(r.result.perOrder, price)} />
                      {r.result.voucherExtra > 0 && <Row label="Voucher Extra" val={-r.result.voucherExtra} muted pct={pct(r.result.voucherExtra, price)} />}
                      {r.result.voucherExtraPlus > 0 && <Row label="Voucher Extra+" val={-r.result.voucherExtraPlus} muted pct={pct(r.result.voucherExtraPlus, price)} />}
                      {r.result.duyTriHienThi > 0 && <Row label={`Duy trì hiển thị · ${spDuyTriRate}%`} val={-r.result.duyTriHienThi} muted pct={pct(r.result.duyTriHienThi, price)} />}
                      {r.result.sfr > 0 && <Row label="SFR" val={-r.result.sfr} muted pct={pct(r.result.sfr, price)} />}
                      {r.result.piShip > 0 && <Row label="Pi Ship" val={-r.result.piShip} muted pct={pct(r.result.piShip, price)} />}
                    </div>
                  </div>

                  <div className="mb-4 pt-4 border-t" style={{ borderColor: "var(--st-10)" }}>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="text-[0.65rem] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--st-50)" }}>
                        Chi phí khác · {pct(r.result.totalExtras, price)}
                      </div>
                      <div className="text-[0.95rem] font-bold" style={{ color: "#ff8da3" }}>-{fmt(r.result.totalExtras)}đ</div>
                    </div>
                    <div className="space-y-1.5 text-[0.82rem]">
                      {r.result.extras.map((e, j) => <Row key={j} label={e.label} val={-e.amount} muted pct={pct(e.amount, price)} />)}
                    </div>
                  </div>

                  <div className="pt-4 border-t" style={{ borderColor: "var(--st-10)" }}>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="text-[0.65rem] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--st-50)" }}>
                        Vốn · {pct(r.result.cogs, price)}
                      </div>
                      <div className="text-[0.95rem] font-bold" style={{ color: "#ff8da3" }}>-{fmt(r.result.cogs)}đ</div>
                    </div>
                    <div className="space-y-1.5 text-[0.82rem]">
                      <Row label="COGS" val={-r.result.cogs} muted pct={pct(r.result.cogs, price)} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lưu ý - đẩy xuống dưới */}
      <div className="rounded-xl p-4 text-[0.82rem] leading-[1.65]" style={{ background: "var(--st-03)", border: "1px solid var(--st-06)", color: "var(--st-60)" }}>
        <strong className="text-white">Lưu ý quan trọng:</strong> Tất cả phí đã bao gồm thuế GTGT, tính cho <strong className="text-white">1 đơn hàng</strong>.
        Phí TikTok Shop áp dụng từ 09/05/2026, Shopee từ 08/05/2026 (Mall từ 29/05/2026).{" "}
        <strong className="text-white">Default rate khi chưa chọn ngành:</strong>{" "}
        TikTok {TIKTOK_DEFAULT_STD}% / {TIKTOK_DEFAULT_MALL}% · Shopee {SHOPEE_DEFAULT_NONMALL}% / {SHOPEE_DEFAULT_MALL}%.{" "}
        Phí hoa hồng dao động 7-21% tuỳ ngành - <span style={{ color: "#ffd479" }}>luôn chọn ngành hàng để kết quả chính xác nhất.</span>
        <div className="mt-2 pt-2" style={{ borderTop: "1px solid var(--st-06)" }}>
          <strong className="text-white">Duy trì hiển thị (DVHT) - Shopee từ 29/05/2026:</strong> Cơ chế tự động trích tiền từ doanh thu mỗi đơn để nạp cho Dịch vụ Hiển thị quảng cáo, giúp duy trì lưu lượng truy cập gian hàng.
          Mức <span style={{ color: "#EE4D2D" }}>tiêu chuẩn 1%</span> áp dụng mặc định cho mọi đơn hàng "Đã giao". Người Bán có thể chỉnh từ 1% - 50% tuỳ nhu cầu nạp ads. Tỷ lệ này áp cho cả Mall và Non-Mall.
        </div>
      </div>
    </div>
  );
}

function pct(part: number, total: number) {
  if (!total || total <= 0) return "0%";
  return `${((part / total) * 100).toFixed(1)}%`;
}

function Row({ label, val, muted, bold, hint, pct: pctVal }: { label: string; val: number; muted?: boolean; bold?: boolean; hint?: string; pct?: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span style={{ color: muted ? "var(--st-60)" : "var(--st-85)" }}>
        {label}
        {hint && <span className="ml-1 text-[0.7rem]" style={{ color: "var(--st-35)" }}>· {hint}</span>}
      </span>
      <span className="flex items-baseline gap-1.5">
        {pctVal && <span className="text-[0.68rem]" style={{ color: "var(--st-40)" }}>{pctVal}</span>}
        <span className={bold ? "font-bold text-white" : ""} style={{ color: muted && !bold ? "var(--st-78)" : undefined }}>
          {val < 0 ? "-" : ""}{fmt(Math.abs(val))}đ
        </span>
      </span>
    </div>
  );
}
