/**
 * Cross-platform event tracking - gửi tới GA4 (gtag) + Vercel Analytics + Hotjar.
 * Skip im lặng nếu trên server hoặc tracker chưa load.
 */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    hj?: (...args: any[]) => void;
    va?: (event: string, props?: Record<string, any>) => void;
  }
}

export function trackEvent(name: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;

  // Google Analytics 4
  try {
    window.gtag?.("event", name, params);
  } catch {}

  // Vercel Analytics (custom events)
  try {
    window.va?.("event", { name, ...params });
  } catch {}

  // Hotjar (custom event tags)
  try {
    window.hj?.("event", name);
  } catch {}
}
