"use client";

import type { QuizVisual, ShapeSpec } from "@/lib/quiz/types";
import { ShapeCell } from "./ShapeSVG";

/**
 * Render visual question component cho matrix/spatial IQ.
 * Cell size adaptive theo type:
 *   - matrix: 9 cells trong grid 3x3, cell ~96px
 *   - spatial: 1 cell lớn cho source + 4 options
 */
export function VisualQuestion({ visual, color }: { visual: QuizVisual; color: string }) {
  if (visual.type === "matrix") {
    return <MatrixGrid grid={visual.grid} color={color} />;
  }
  return <SpatialDisplay source={visual.source} transform={visual.transform} color={color} />;
}

function MatrixGrid({ grid, color }: { grid: (ShapeSpec | null)[]; color: string }) {
  // 9 cells; last (index 8) is "?"
  return (
    <div className="mb-6 inline-block rounded-xl p-3 md:p-4" style={{ background: "var(--st-04)", border: "1px solid var(--st-10)" }}>
      <div
        className="grid grid-cols-3 gap-2 md:gap-3"
        style={{ color }}
      >
        {grid.map((cell, i) => {
          const isUnknown = i === 8 && cell === null;
          return (
            <div
              key={i}
              className="flex items-center justify-center rounded-lg"
              style={{
                background: isUnknown ? "var(--st-06)" : "var(--bg-base)",
                border: `1px solid ${isUnknown ? "var(--wf-blue)" : "var(--st-08)"}`,
                width: "min(96px, 22vw)",
                height: "min(96px, 22vw)",
                color,
              }}
            >
              {isUnknown ? (
                <span className="text-[2rem] font-bold" style={{ color: "var(--wf-blue)" }}>?</span>
              ) : (
                <ShapeCell spec={cell} sizePx={88} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpatialDisplay({ source, transform, color }: { source: ShapeSpec; transform: string; color: string }) {
  return (
    <div className="mb-6 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className="text-[0.72rem] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--ink-mute)" }}>
          Hình gốc
        </div>
        <div
          className="flex items-center justify-center rounded-xl p-3"
          style={{
            background: "var(--st-04)",
            border: "2px solid var(--st-12)",
            width: "min(160px, 35vw)",
            height: "min(160px, 35vw)",
            color,
          }}
        >
          <ShapeCell spec={source} sizePx={120} />
        </div>
      </div>
      <div className="text-[0.88rem] font-medium px-3 py-1.5 rounded-md" style={{ background: "var(--st-04)", color: "var(--ink-soft)" }}>
        {transform} →  ?
      </div>
    </div>
  );
}

/** Render 1 option as shape (cho IQ test) thay vì text. */
export function ShapeOption({ spec, color }: { spec: ShapeSpec; color: string }) {
  return (
    <div className="flex items-center justify-center" style={{ color, width: 64, height: 64 }}>
      <ShapeCell spec={spec} sizePx={60} />
    </div>
  );
}
