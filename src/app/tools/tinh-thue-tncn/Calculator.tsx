"use client";
import { useMemo, useState } from "react";
import Icon from "@/components/icons/Icon";
import { compareYears, type TaxBreakdown } from "@/lib/tax/compute";

const fmt = (n: number) => n.toLocaleString("vi-VN");
const fmtAbs = (n: number) => Math.abs(n).toLocaleString("vi-VN");

const PRESETS = [
  { label: "15.000.000", gross: 15_000_000 },
  { label: "25.000.000", gross: 25_000_000 },
  { label: "50.000.000", gross: 50_000_000 },
  { label: "100.000.000", gross: 100_000_000 },
];

export default function Calculator() {
  const [grossInput, setGrossInput] = useState("");
  const [insuranceBaseInput, setInsuranceBaseInput] = useState("");
  const [dependents, setDependents] = useState("0");
  const [hasInsurance, setHasInsurance] = useState(true);

  const gross = useMemo(() => {
    const cleaned = grossInput.replace(/[^\d]/g, "");
    return cleaned ? parseInt(cleaned, 10) : 0;
  }, [grossInput]);

  const insuranceBaseNum = useMemo(() => {
    const cleaned = insuranceBaseInput.replace(/[^\d]/g, "");
    return cleaned ? parseInt(cleaned, 10) : 0;
  }, [insuranceBaseInput]);

  const deps = parseInt(dependents || "0", 10) || 0;

  const result = useMemo(() => {
    if (gross <= 0) return null;
    return compareYears({
      gross,
      insuranceBase: insuranceBaseNum > 0 ? insuranceBaseNum : undefined,
      dependents: deps,
      hasInsurance,
    });
  }, [gross, insuranceBaseNum, deps, hasInsurance]);

  function applyPreset(p: typeof PRESETS[number]) {
    setGrossInput(p.gross.toLocaleString("vi-VN"));
  }

  function onGrossChange(v: string) {
    const cleaned = v.replace(/[^\d]/g, "");
    setGrossInput(cleaned ? parseInt(cleaned, 10).toLocaleString("vi-VN") : "");
  }

  function onInsuranceBaseChange(v: string) {
    const cleaned = v.replace(/[^\d]/g, "");
    setInsuranceBaseInput(cleaned ? parseInt(cleaned, 10).toLocaleString("vi-VN") : "");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 items-start">
      {/* INPUT FORM */}
      <aside className="rounded-2xl p-6 lg:sticky lg:top-24" style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}>
        <div className="section-tag">Nhập thông tin</div>
        <h2 className="text-[1.15rem] font-bold text-white mb-1 mt-2">Lương Gross/tháng</h2>
        <p className="text-[0.82rem] mb-5" style={{ color: "var(--ink-mute)" }}>
          Chỉ cần lương Gross - các trường khác để mặc định cũng được.
        </p>

        <div className="mb-5">
          <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
            Lương Gross VND/tháng <span style={{ color: "#ff5a72" }}>*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={grossInput}
              onChange={(e) => onGrossChange(e.target.value)}
              placeholder="20.000.000"
              className="w-full px-4 py-3.5 rounded-lg outline-none text-[1.05rem] font-semibold tabular-nums"
              style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "white" }}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[0.85rem] font-semibold pointer-events-none" style={{ color: "var(--ink-mute)" }}>
              VND
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p)}
                className="text-[0.78rem] font-semibold px-3 py-1.5 rounded-md transition-all"
                style={{ background: "rgba(20,110,245,0.10)", border: "1px solid rgba(20,110,245,0.25)", color: "#7da9ff" }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
            Số người phụ thuộc <span className="font-normal" style={{ color: "var(--ink-mute)" }}>(con/cha mẹ)</span>
          </label>
          <input
            type="number"
            min="0"
            max="10"
            value={dependents}
            onChange={(e) => setDependents(e.target.value)}
            className="w-full px-4 py-3 rounded-lg outline-none tabular-nums"
            style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "white" }}
          />
          <div className="text-[0.72rem] mt-1" style={{ color: "var(--ink-mute)" }}>
            Mặc định 0. Mỗi người phụ thuộc giảm trừ {deps > 0 ? "6.200.000 (2026)" : "4.400.000 – 6.200.000"} /tháng.
          </div>
        </div>

        <div className="mb-3">
          <label className="flex items-center justify-between gap-3 cursor-pointer p-3 rounded-lg" style={{ background: "var(--st-03)", border: "1px solid var(--line)" }}>
            <div>
              <div className="text-[0.88rem] font-semibold text-white">Đóng bảo hiểm bắt buộc</div>
              <div className="text-[0.72rem] mt-0.5" style={{ color: "var(--ink-mute)" }}>
                BHXH 8% + BHYT 1.5% + BHTN 1% = 10.5%
              </div>
            </div>
            <input
              type="checkbox"
              checked={hasInsurance}
              onChange={(e) => setHasInsurance(e.target.checked)}
              className="w-5 h-5 accent-[#146ef5]"
            />
          </label>
        </div>

        {/* Insurance base salary - optional. Most contracts đóng BH trên mức thấp hơn lương Gross */}
        {hasInsurance && (
          <div className="mb-2">
            <label className="block text-[0.78rem] font-semibold mb-1.5 text-white">
              Lương đóng bảo hiểm <span className="font-normal" style={{ color: "var(--ink-mute)" }}>(nếu khác Gross)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={insuranceBaseInput}
                onChange={(e) => onInsuranceBaseChange(e.target.value)}
                placeholder={gross > 0 ? `Mặc định = ${gross.toLocaleString("vi-VN")} (Gross)` : "VD: 10.000.000"}
                className="w-full px-4 py-3 rounded-lg outline-none tabular-nums"
                style={{ border: "1px solid var(--st-10)", background: "var(--st-03)", color: "white" }}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[0.8rem] font-semibold pointer-events-none" style={{ color: "var(--ink-mute)" }}>
                VND
              </span>
            </div>
            <div className="text-[0.72rem] mt-1.5 leading-snug" style={{ color: "var(--ink-mute)" }}>
              Hầu hết hợp đồng VN đóng BH trên 1 mức cố định (thường mức tối thiểu vùng hoặc thoả thuận) - KHÁC lương Gross. Nhìn bảng lương hằng tháng để biết chính xác. Để trống = đóng full Gross.
            </div>
          </div>
        )}

        <div className="mt-5 text-[0.7rem] leading-relaxed" style={{ color: "var(--ink-mute)" }}>
          💡 Tool áp dụng cho thu nhập từ tiền lương / tiền công của cá nhân cư trú. Cap BHXH + BHYT tại 46.800.000 (20× lương cơ sở 2.340.000). Không áp dụng cho hợp đồng dưới 3 tháng, lao động tự do, freelancer ngoài hệ thống.
        </div>
      </aside>

      {/* RESULT */}
      <div>
        {!result ? (
          <div className="rounded-2xl p-10 text-center" style={{ background: "var(--st-03)", border: "1px dashed var(--line)" }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(20,110,245,0.10)", color: "#7da9ff" }}>
              <Icon name="trending-up" size={24} />
            </div>
            <h2 className="text-[1.1rem] font-bold text-white mb-2">Nhập lương Gross để xem kết quả</h2>
            <p className="text-[0.88rem] max-w-[440px] mx-auto" style={{ color: "var(--ink-soft)" }}>
              Tool sẽ so sánh thuế bạn phải đóng theo luật <strong className="text-white">2025</strong> và <strong className="text-white">2026 mới</strong> - đồng thời tính lương Net thực nhận.
            </p>
          </div>
        ) : (
          <ResultView c={result} hasInsurance={hasInsurance} />
        )}
      </div>
    </div>
  );
}

function ResultView({ c, hasInsurance }: { c: ReturnType<typeof compareYears>; hasInsurance: boolean }) {
  const { y2025, y2026, taxDelta, annualTaxDelta, annualNetDelta } = c;
  const isBetter = taxDelta > 0;

  return (
    <div className="flex flex-col gap-5">
      {/* DELTA HERO */}
      <div
        className="rounded-2xl p-6 md:p-7"
        style={{
          background: isBetter
            ? "linear-gradient(135deg, rgba(95,255,170,0.10) 0%, rgba(20,110,245,0.10) 100%)"
            : "var(--st-03)",
          border: `1px solid ${isBetter ? "rgba(95,255,170,0.35)" : "var(--line)"}`,
        }}
      >
        <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: isBetter ? "#5fffaa" : "var(--ink-mute)" }}>
          <Icon name="sparkles" size={13} />
          So sánh 2026 vs 2025
        </div>
        {isBetter ? (
          <>
            <h2 className="text-[1.6rem] md:text-[2rem] font-extrabold text-white leading-tight mb-3">
              Bạn tiết kiệm <span style={{ color: "#5fffaa" }}>{fmt(annualTaxDelta)}đ/năm</span>
            </h2>
            <p className="text-[0.95rem] leading-[1.6]" style={{ color: "var(--ink-soft)" }}>
              Theo luật mới 2026 (Nghị quyết 110/2025/UBTVQH15), bạn đóng thuế ít hơn <strong style={{ color: "#5fffaa" }}>{fmt(taxDelta)}đ/tháng</strong> so với luật 2025. Lương Net tăng tương đương - tổng cộng <strong className="text-white">+{fmt(annualNetDelta)}đ/năm</strong>.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-[1.4rem] md:text-[1.7rem] font-extrabold text-white leading-tight mb-2">
              Thuế 2026 và 2025 bằng nhau với mức lương này
            </h2>
            <p className="text-[0.95rem] leading-[1.6]" style={{ color: "var(--ink-soft)" }}>
              Lương Gross của bạn chưa vượt mức giảm trừ gia cảnh  không phải đóng thuế cả 2 năm.
            </p>
          </>
        )}
      </div>

      {/* SIDE-BY-SIDE BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <YearCard label="Luật 2025 (cũ)" data={y2025} accent="#ffd479" subtle hasInsurance={hasInsurance} />
        <YearCard label="Luật 2026 (mới)" data={y2026} accent="#5fffaa" hasInsurance={hasInsurance} highlight />
      </div>

      {/* BRACKET BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BracketTable label="2025 · 7 bậc" data={y2025} accent="#ffd479" subtle />
        <BracketTable label="2026 · 5 bậc" data={y2026} accent="#5fffaa" />
      </div>

      {/* DISCLAIMER */}
      <div className="rounded-xl p-4 text-[0.78rem] leading-relaxed" style={{ background: "rgba(255,212,121,0.05)", border: "1px solid rgba(255,212,121,0.22)", color: "var(--st-85)" }}>
        <strong style={{ color: "#ffd479" }}>Lưu ý:</strong> Tool tính theo Nghị quyết 110/2025/UBTVQH15 (hiệu lực từ 1/1/2026) cho thu nhập từ <strong>tiền lương cá nhân cư trú</strong>. Chưa bao gồm thưởng Tết (tính riêng theo tháng), thu nhập từ kinh doanh/đầu tư/chuyển nhượng. Tham khảo cơ quan thuế cho trường hợp đặc thù.
      </div>
    </div>
  );
}

function YearCard({ label, data, accent, hasInsurance, subtle, highlight }: { label: string; data: TaxBreakdown; accent: string; hasInsurance: boolean; subtle?: boolean; highlight?: boolean }) {
  const netPct = data.gross > 0 ? Math.round((data.net / data.gross) * 100) : 0;
  return (
    <div
      className="rounded-2xl p-5 md:p-6"
      style={{
        background: highlight ? `${accent}08` : "var(--st-03)",
        border: `1px solid ${highlight ? accent + "55" : "var(--line)"}`,
        boxShadow: highlight ? `0 8px 28px ${accent}18` : "none",
        opacity: subtle ? 0.92 : 1,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-[0.72rem] font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>{label}</div>
        <span className="text-[0.7rem] font-bold px-2 py-0.5 rounded" style={{ background: `${accent}18`, color: accent }}>{netPct}% Net</span>
      </div>

      <Row label="Lương Gross" value={data.gross} bold />
      {hasInsurance && <Row label="− Bảo hiểm (10.5%)" value={data.insurance} negative />}
      <Row label="− Giảm trừ bản thân" value={data.deductionPersonal} negative subtle />
      {data.deductionDependents > 0 && (
        <Row label={`− Giảm trừ phụ thuộc`} value={data.deductionDependents} negative subtle />
      )}
      <Divider />
      <Row label="Thu nhập tính thuế" value={data.taxableIncome} subtle />
      <Row label="Tổng thuế TNCN" value={data.totalTax} negative highlight color="#ff5a72" />
      <Divider />
      <Row label="Lương Net thực nhận" value={data.net} big color={accent} />
    </div>
  );
}

function BracketTable({ label, data, accent, subtle }: { label: string; data: TaxBreakdown; accent: string; subtle?: boolean }) {
  if (data.brackets.length === 0) {
    return (
      <div className="rounded-2xl p-5" style={{ background: "var(--st-03)", border: "1px solid var(--line)", opacity: subtle ? 0.85 : 1 }}>
        <div className="text-[0.72rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: accent }}>{label}</div>
        <p className="text-[0.85rem]" style={{ color: "var(--ink-soft)" }}>Không phải đóng thuế ở mức lương này.</p>
      </div>
    );
  }
  return (
    <div className="rounded-2xl p-5" style={{ background: "var(--st-03)", border: "1px solid var(--line)", opacity: subtle ? 0.92 : 1 }}>
      <div className="text-[0.72rem] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: accent }}>{label}</div>
      <div className="flex flex-col gap-2">
        {data.brackets.map((b, i) => (
          <div key={i} className="flex items-center justify-between text-[0.85rem]">
            <span className="flex items-center gap-2" style={{ color: "var(--st-85)" }}>
              <span className="text-[0.65rem] font-bold px-1.5 py-0.5 rounded tabular-nums" style={{ background: `${accent}20`, color: accent }}>
                {Math.round(b.rate * 100)}%
              </span>
              <span>{b.rangeLabel}</span>
            </span>
            <span className="font-semibold tabular-nums text-white">{fmt(Math.round(b.tax))}đ</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value, bold, big, negative, subtle, highlight, color }: { label: string; value: number; bold?: boolean; big?: boolean; negative?: boolean; subtle?: boolean; highlight?: boolean; color?: string }) {
  return (
    <div className={`flex items-baseline justify-between ${big ? "py-1" : "py-0.5"}`}>
      <span className={`${big ? "text-[0.92rem] font-semibold" : "text-[0.82rem]"}`} style={{ color: subtle ? "var(--ink-mute)" : "var(--st-85)" }}>
        {label}
      </span>
      <span
        className={`tabular-nums ${big ? "text-[1.25rem] font-extrabold" : bold ? "text-[0.9rem] font-bold" : "text-[0.86rem] font-semibold"}`}
        style={{ color: color || (negative ? (highlight ? "#ff5a72" : "var(--st-70)") : "white") }}
      >
        {negative && value !== 0 ? "−" : ""}{fmtAbs(value)}đ
      </span>
    </div>
  );
}

function Divider() {
  return <div className="my-2 h-px" style={{ background: "var(--st-06)" }} />;
}
