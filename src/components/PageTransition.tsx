"use client";
import { usePathname } from "next/navigation";

/**
 * Subtle fade-in wrapper that re-keys on pathname change.
 * CSS keyframe (defined in globals.css) runs each time  perceived "page transition".
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-fade-in">
      {children}
    </div>
  );
}
