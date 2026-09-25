type GtagParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: GtagParams) => void;
  }
}

/**
 * ยิง event ไป GA4 — ถ้ายังไม่ได้ตั้ง NEXT_PUBLIC_GA_ID ก็แค่เงียบไป ไม่พัง
 * event ที่ใช้: contact_line / contact_phone / contact_email / booking_submit
 */
export function track(name: string, params?: GtagParams) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}
