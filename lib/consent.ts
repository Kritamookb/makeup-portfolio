/**
 * ความยินยอมใช้คุกกี้ (PDPA) — เก็บในเบราว์เซอร์ของผู้ใช้เอง
 * ยังไม่ได้เลือก = null → ไม่โหลด GA และโชว์แถบถาม
 */
export type Consent = "granted" | "denied";

const KEY = "cookie-consent";
const EVENT = "cookie-consent-change";

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // โหมดส่วนตัวหรือบล็อก storage — ถือว่ายังไม่ได้เลือก ถามใหม่ทุกครั้ง
    return null;
  }
}

export function writeConsent(value: Consent | null) {
  try {
    if (value) localStorage.setItem(KEY, value);
    else localStorage.removeItem(KEY);
  } catch {
    // เก็บไม่ได้ก็ใช้ค่านี้แค่หน้านี้ไป
  }
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** เปิดแถบถามใหม่ — ใช้กับปุ่ม "ตั้งค่าคุกกี้" ใน footer */
export function reopenConsent() {
  writeConsent(null);
}

/** ลบคุกกี้ของ GA (_ga, _ga_XXXX) ตอนผู้ใช้เปลี่ยนใจไม่ยอมรับ */
export function clearAnalyticsCookies() {
  const host = location.hostname;
  for (const cookie of document.cookie.split("; ")) {
    const name = cookie.split("=")[0];
    if (!name.startsWith("_ga")) continue;
    for (const domain of [host, `.${host}`, `.${host.replace(/^www\./, "")}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    }
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}
