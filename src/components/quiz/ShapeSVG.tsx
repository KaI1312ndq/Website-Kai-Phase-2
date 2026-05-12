import type { ShapeSpec } from "@/lib/quiz/types";

/** Render 1 shape instance trong SVG viewBox 100x100 (center-aligned). */
function PrimitiveShape({ shape, size = "md", rotation = 0, fill = "solid", color }: ShapeSpec) {
  const s = size === "sm" ? 16 : size === "lg" ? 32 : 24;  // half-extent
  const c = color || "currentColor";
  const strokeW = 2.5;
  const fillProp = fill === "solid" ? c : "none";
  const strokeProp = fill === "solid" ? "none" : c;
  const dashArr = fill === "dotted" ? "3 3" : undefined;

  const t = `translate(50 50) rotate(${rotation}) translate(-50 -50)`;

  switch (shape) {
    case "circle":
      return <circle cx={50} cy={50} r={s} fill={fillProp} stroke={strokeProp} strokeWidth={strokeW} strokeDasharray={dashArr} />;
    case "square":
      return <rect x={50 - s} y={50 - s} width={s * 2} height={s * 2} fill={fillProp} stroke={strokeProp} strokeWidth={strokeW} strokeDasharray={dashArr} transform={t} />;
    case "triangle":
      return <polygon points={`50,${50 - s} ${50 - s},${50 + s * 0.85} ${50 + s},${50 + s * 0.85}`} fill={fillProp} stroke={strokeProp} strokeWidth={strokeW} strokeDasharray={dashArr} transform={t} />;
    case "diamond":
      return <polygon points={`50,${50 - s} ${50 + s},50 50,${50 + s} ${50 - s},50`} fill={fillProp} stroke={strokeProp} strokeWidth={strokeW} strokeDasharray={dashArr} transform={t} />;
    case "star": {
      const pts: string[] = [];
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? s : s * 0.45;
        const ang = (i * Math.PI) / 5 - Math.PI / 2;
        pts.push(`${50 + r * Math.cos(ang)},${50 + r * Math.sin(ang)}`);
      }
      return <polygon points={pts.join(" ")} fill={fillProp} stroke={strokeProp} strokeWidth={strokeW} strokeDasharray={dashArr} transform={t} />;
    }
    case "hex": {
      const pts: string[] = [];
      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI) / 3 - Math.PI / 2;
        pts.push(`${50 + s * Math.cos(ang)},${50 + s * Math.sin(ang)}`);
      }
      return <polygon points={pts.join(" ")} fill={fillProp} stroke={strokeProp} strokeWidth={strokeW} strokeDasharray={dashArr} transform={t} />;
    }
    case "plus": {
      const w = s * 0.45;
      return (
        <path
          d={`M${50 - w},${50 - s} h${w * 2} v${s - w} h${s - w} v${w * 2} h${-(s - w)} v${s - w} h${-(w * 2)} v${-(s - w)} h${-(s - w)} v${-(w * 2)} h${s - w} z`}
          fill={fillProp}
          stroke={strokeProp}
          strokeWidth={strokeW}
          strokeDasharray={dashArr}
          transform={t}
        />
      );
    }
    case "arrow":
      return (
        <g transform={t}>
          <line x1={50 - s} y1={50} x2={50 + s} y2={50} stroke={c} strokeWidth={strokeW * 1.6} strokeLinecap="round" />
          <polyline points={`${50 + s * 0.4},${50 - s * 0.6} ${50 + s},50 ${50 + s * 0.4},${50 + s * 0.6}`} fill="none" stroke={c} strokeWidth={strokeW * 1.6} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "L":
      return (
        <path
          d={`M${50 - s},${50 - s} h${s * 0.6} v${s * 1.4} h${s * 1.4} v${s * 0.6} h${-s * 2} z`}
          fill={fillProp}
          stroke={strokeProp}
          strokeWidth={strokeW}
          strokeDasharray={dashArr}
          transform={t}
        />
      );
    case "T":
      return (
        <path
          d={`M${50 - s},${50 - s} h${s * 2} v${s * 0.6} h${-s * 0.7} v${s * 1.4} h${-s * 0.6} v${-s * 1.4} h${-s * 0.7} z`}
          fill={fillProp}
          stroke={strokeProp}
          strokeWidth={strokeW}
          strokeDasharray={dashArr}
          transform={t}
        />
      );
    case "empty":
      return null;
  }
}

/** Render 1 cell: hỗ trợ count 1-4 (layout grid bên trong cell). */
export function ShapeCell({ spec, sizePx = 96 }: { spec: ShapeSpec | null; sizePx?: number }) {
  if (!spec || spec.shape === "empty") {
    return <div style={{ width: sizePx, height: sizePx }} />;
  }
  const count = Math.max(1, Math.min(4, spec.count ?? 1));

  // Single shape - center
  if (count === 1) {
    return (
      <svg width={sizePx} height={sizePx} viewBox="0 0 100 100" style={{ display: "block" }}>
        <PrimitiveShape {...spec} />
      </svg>
    );
  }

  // Multiple - position in mini-grid
  const positions: Array<{ x: number; y: number }> =
    count === 2
      ? [
          { x: 30, y: 50 },
          { x: 70, y: 50 },
        ]
      : count === 3
        ? [
            { x: 50, y: 25 },
            { x: 28, y: 70 },
            { x: 72, y: 70 },
          ]
        : [
            { x: 30, y: 30 },
            { x: 70, y: 30 },
            { x: 30, y: 70 },
            { x: 70, y: 70 },
          ];

  // Smaller size when multiple
  const sub: ShapeSpec = { ...spec, size: count >= 3 ? "sm" : "md", count: 1 };

  return (
    <svg width={sizePx} height={sizePx} viewBox="0 0 100 100" style={{ display: "block" }}>
      {positions.map((p, i) => (
        <g key={i} transform={`translate(${p.x - 50} ${p.y - 50})`}>
          <PrimitiveShape {...sub} />
        </g>
      ))}
    </svg>
  );
}
