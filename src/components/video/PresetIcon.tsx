// SVG icons cho 10 video preset gallery.
// Style: line icon stroke-1.5, dùng currentColor để adapt theo active/inactive state.

interface IconProps {
  size?: number;
  className?: string;
}

const baseProps = (size: number = 28, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
});

export function MicrophoneIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <rect x="9" y="3" width="6" height="10" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" />
    </svg>
  );
}

export function MountainIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M2 19l6-10 4 6 3-4 7 8z" />
      <circle cx="17" cy="5" r="2" />
    </svg>
  );
}

export function PencilIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z" />
    </svg>
  );
}

export function NewspaperIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M4 4h13a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2z" />
      <path d="M8 8h7M8 12h7M8 16h4" />
    </svg>
  );
}

export function LeafIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M11 20A7 7 0 0 1 4 13c0-4 3-7 7-7s7 3 7 7c0 4-3 7-7 7z" />
      <path d="M11 13l5-5" />
    </svg>
  );
}

export function LiveIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="9" />
      <path d="M5.5 5.5l1.5 1.5M17 17l1.5 1.5M5.5 18.5L7 17M17 7l1.5-1.5" />
    </svg>
  );
}

export function CartoonIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <circle cx="12" cy="10" r="6" />
      <circle cx="9.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
      <path d="M9 13s1 2 3 2 3-2 3-2" />
      <path d="M10 16l-1 5M14 16l1 5" />
    </svg>
  );
}

export function LipstickIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M8 21h8" />
      <rect x="8" y="11" width="8" height="10" rx="1" />
      <path d="M10 11V7l2-3 2 3v4" />
    </svg>
  );
}

export function StethoscopeIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M5 3v6a4 4 0 0 0 8 0V3" />
      <path d="M9 13v3a4 4 0 0 0 8 0v-3" />
      <circle cx="17" cy="10" r="2" />
    </svg>
  );
}

export function HeartIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

// Mapping preset_id → icon component
export const PRESET_ICON_MAP: Record<string, (props: IconProps) => React.JSX.Element> = {
  mc_talking_head:         MicrophoneIcon,
  reels_storytelling:      MountainIcon,
  animation_explainer:     PencilIcon,
  news_compilation:        NewspaperIcon,
  asmr_product:            LeafIcon,
  fake_livestream:         LiveIcon,
  cartoon_3d_character:    CartoonIcon,
  real_beauty_model:       LipstickIcon,
  real_expert_testimonial: StethoscopeIcon,
  emotional_lifestyle_ad:  HeartIcon,
};

export function PresetIcon({ presetId, size, className }: { presetId: string } & IconProps) {
  const Icon = PRESET_ICON_MAP[presetId] ?? CartoonIcon;
  return <Icon size={size} className={className} />;
}

// Demo SVG illustration for MC character (Advanced mode)
export function CharacterPortrait({ characterId, size = 56 }: { characterId: string; size?: number }) {
  // Stylized circle portrait per character type
  const config: Record<string, { bg: string; accent: string; hair: string; label: string }> = {
    mc_f_01:     { bg: "#fce7f3", accent: "#ec4899", hair: "#1f2937", label: "F1" },
    mc_f_02:     { bg: "#dbeafe", accent: "#3b82f6", hair: "#7c2d12", label: "F2" },
    mc_m_01:     { bg: "#e0e7ff", accent: "#6366f1", hair: "#1f2937", label: "M1" },
    mc_m_02:     { bg: "#dcfce7", accent: "#10b981", hair: "#374151", label: "M2" },
    cartoon_3d:  { bg: "#fef3c7", accent: "#f59e0b", hair: "#a855f7", label: "3D" },
    real_model:  { bg: "#fdf2f8", accent: "#db2777", hair: "#1f2937", label: "RM" },
    real_expert: { bg: "#dbeafe", accent: "#0891b2", hair: "#1f2937", label: "MD" },
  };
  const c = config[characterId] ?? config.mc_f_01;
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="28" fill={c.bg} />
      {/* hair */}
      <ellipse cx="28" cy="22" rx="14" ry="10" fill={c.hair} />
      {/* face */}
      <ellipse cx="28" cy="26" rx="10" ry="11" fill="#fde7d0" />
      {/* shoulders */}
      <rect x="14" y="40" width="28" height="16" rx="4" fill={c.accent} />
      {/* eyes */}
      <circle cx="24" cy="26" r="1.3" fill="#1f2937" />
      <circle cx="32" cy="26" r="1.3" fill="#1f2937" />
      {/* mouth */}
      <path d="M25 31 Q28 33 31 31" stroke="#1f2937" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Demo SVG illustration for wardrobe
export function WardrobeIcon({ wardrobeId, size = 40 }: { wardrobeId: string; size?: number }) {
  const colors: Record<string, { primary: string; secondary: string; type: "vest" | "shirt" | "casual" | "doctor" | "ao_dai" }> = {
    vest:         { primary: "#1e3a8a", secondary: "#ffffff", type: "vest" },
    blouse_white: { primary: "#ffffff", secondary: "#e5e7eb", type: "shirt" },
    tshirt:       { primary: "#10b981", secondary: "#065f46", type: "casual" },
    ao_dai:       { primary: "#dc2626", secondary: "#fbbf24", type: "ao_dai" },
    doctor:       { primary: "#ffffff", secondary: "#0891b2", type: "doctor" },
    casual_home:  { primary: "#a78bfa", secondary: "#7c3aed", type: "casual" },
  };
  const c = colors[wardrobeId] ?? colors.tshirt;

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {/* shoulders */}
      <path d="M8 18 L14 12 L26 12 L32 18 L32 36 L8 36 Z" fill={c.primary} stroke="#1f2937" strokeWidth="1" />
      {/* collar/neckline */}
      {c.type === "vest" && (
        <>
          <path d="M14 12 L20 20 L26 12" fill={c.secondary} stroke="#1f2937" strokeWidth="0.8" />
          <path d="M20 20 L20 36" stroke="#1f2937" strokeWidth="0.8" />
        </>
      )}
      {c.type === "shirt" && (
        <path d="M14 12 L20 18 L26 12" fill={c.secondary} stroke="#1f2937" strokeWidth="0.8" />
      )}
      {c.type === "doctor" && (
        <>
          <path d="M14 12 L20 18 L26 12" fill={c.secondary} stroke="#1f2937" strokeWidth="0.8" />
          <circle cx="14" cy="22" r="1" fill={c.secondary} />
        </>
      )}
      {c.type === "ao_dai" && (
        <>
          <path d="M14 12 L20 16 L26 12" fill={c.secondary} />
          <path d="M20 16 L20 36" stroke={c.secondary} strokeWidth="2" />
        </>
      )}
      {c.type === "casual" && (
        <ellipse cx="20" cy="14" rx="4" ry="1.5" fill={c.secondary} />
      )}
    </svg>
  );
}

export function PlayIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// === Generic UI icons (line style) ===
export function CheckIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export function WarningIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M12 2l11 19H1z" />
      <line x1="12" y1="10" x2="12" y2="14" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function HourglassIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M6 3h12M6 21h12" />
      <path d="M6 3v3l6 6-6 6v3M18 3v3l-6 6 6 6v3" />
    </svg>
  );
}

export function DownloadIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export function EditIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z" />
    </svg>
  );
}

export function SaveIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

export function RefreshIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

export function FilmIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 8h4M2 12h4M2 16h4M18 8h4M18 12h4M18 16h4M10 4v16M14 4v16" />
    </svg>
  );
}

export function SettingsIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function LightbulbIcon({ size, className }: IconProps) {
  return (
    <svg {...baseProps(size, className)}>
      <path d="M9 18h6M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7L9 17h6l1-2.3A7 7 0 0 0 12 2z" />
    </svg>
  );
}
