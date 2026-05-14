/**
 * SVG Icons cho admin panel.
 * Rule: chỉ dùng SVG, KHÔNG emoji.
 */

type IconProps = { size?: number; color?: string; strokeWidth?: number; className?: string };

const D = ({ size = 16, color = "currentColor", strokeWidth = 2, children, ...p }: IconProps & { children: React.ReactNode }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...p}>{children}</svg>
);

export const IcSearch = (p: IconProps) => <D {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></D>;
export const IcFilter = (p: IconProps) => <D {...p}><path d="M3 6h18M6 12h12M10 18h4" /></D>;
export const IcSort = (p: IconProps) => <D {...p}><path d="M3 6h18M6 12h12M9 18h6" /></D>;
export const IcSortDown = (p: IconProps) => <D {...p}><path d="M11 5h10M11 9h7M11 13h4M3 17l3 3 3-3M6 20V4" /></D>;
export const IcPlus = (p: IconProps) => <D {...p}><path d="M12 5v14M5 12h14" /></D>;
export const IcX = (p: IconProps) => <D {...p}><path d="M18 6 6 18M6 6l12 12" /></D>;
export const IcRefresh = (p: IconProps) => <D {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></D>;
export const IcDownload = (p: IconProps) => <D {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></D>;
export const IcLogout = (p: IconProps) => <D {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></D>;
export const IcStar = (p: IconProps & { filled?: boolean }) => (
  <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill={p.filled ? p.color || "#ffd700" : "none"} stroke={p.color || "currentColor"} strokeWidth={p.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
export const IcImage = (p: IconProps) => <D {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></D>;
export const IcUpload = (p: IconProps) => <D {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></D>;
export const IcTrash = (p: IconProps) => <D {...p}><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" /></D>;
export const IcCopy = (p: IconProps) => <D {...p}><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></D>;
export const IcEdit = (p: IconProps) => <D {...p}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></D>;
export const IcExternal = (p: IconProps) => <D {...p}><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></D>;
export const IcEye = (p: IconProps) => <D {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></D>;
export const IcFire = (p: IconProps) => <D {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></D>;
export const IcTag = (p: IconProps) => <D {...p}><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" /><path d="M7 7h.01" /></D>;
export const IcGrip = (p: IconProps) => <D {...p}><circle cx="9" cy="5" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="19" r="1" /><circle cx="15" cy="5" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="19" r="1" /></D>;
export const IcCheck = (p: IconProps) => <D {...p}><polyline points="20 6 9 17 4 12" /></D>;
export const IcRows = (p: IconProps) => <D {...p}><rect x="3" y="3" width="18" height="6" rx="1" /><rect x="3" y="15" width="18" height="6" rx="1" /></D>;
export const IcLayoutList = (p: IconProps) => <D {...p}><rect x="3" y="4" width="6" height="6" rx="1" /><rect x="3" y="14" width="6" height="6" rx="1" /><line x1="13" x2="21" y1="6" y2="6" /><line x1="13" x2="21" y1="9" y2="9" /><line x1="13" x2="21" y1="16" y2="16" /><line x1="13" x2="21" y1="19" y2="19" /></D>;
export const IcBook = (p: IconProps) => <D {...p}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /></D>;
export const IcCamera = (p: IconProps) => <D {...p}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" /><circle cx="12" cy="13" r="3" /></D>;
export const IcFileEdit = (p: IconProps) => <D {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" /><path d="M18.4 2.6a2.121 2.121 0 1 1 3 3L16 11l-4 1 1-4 5.4-5.4Z" /></D>;
export const IcPencil = (p: IconProps) => <D {...p}><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497Z" /><path d="m15 5 4 4" /></D>;
export const IcAlertCircle = (p: IconProps) => <D {...p}><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></D>;
export const IcChevronDown = (p: IconProps) => <D {...p}><path d="m6 9 6 6 6-6" /></D>;
export const IcSettings = (p: IconProps) => <D {...p}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></D>;
export const IcArrowReorder = (p: IconProps) => <D {...p}><path d="m21 16-4 4-4-4" /><path d="M17 20V4" /><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /></D>;
export const IcPen = (p: IconProps) => <D {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" /></D>;
export const IcSparkles = (p: IconProps) => <D {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /><circle cx="12" cy="12" r="3" /></D>;
