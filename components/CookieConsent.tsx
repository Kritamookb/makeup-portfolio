"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useSyncExternalStore } from "react";
import {
  clearAnalyticsCookies,
  readConsent,
  reopenConsent,
  subscribeConsent,
  writeConsent,
} from "@/lib/consent";
import type { Lang } from "@/lib/i18n";

const copy = {
  label: { th: "การใช้คุกกี้", en: "Cookie preferences" },
  body: {
    th: "เว็บนี้ใช้คุกกี้ของ Google Analytics เพื่อนับจำนวนผู้เข้าชมและดูว่าหน้าไหนมีประโยชน์ ไม่มีคุกกี้โฆษณา เปลี่ยนใจได้ทุกเมื่อที่ท้ายหน้าครับ",
    en: "This site uses Google Analytics cookies to count visits and see which pages help. No advertising cookies. You can change your mind any time at the bottom of the page.",
  },
  accept: { th: "ยอมรับ", en: "Accept" },
  decline: { th: "ไม่ยอมรับ", en: "Decline" },
  settings: { th: "ตั้งค่าคุกกี้", en: "Cookie settings" },
};

// ตอน render บน server ยังไม่รู้ว่าผู้ใช้เลือกอะไรไว้ — ซ่อนแถบไว้ก่อน ไม่ให้กระพริบใส่คนที่เลือกแล้ว
const unknownOnServer = () => undefined;

/**
 * โหลด GA หลังผู้ใช้กดยอมรับเท่านั้น (PDPA) — ก่อนหน้านั้น window.gtag ไม่มี
 * track() ใน lib/track.ts เลยเงียบไปเองโดยไม่ต้องเช็กอะไรเพิ่ม
 */
export default function CookieConsent({ lang, gaId }: { lang: Lang; gaId?: string }) {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, unknownOnServer);

  if (!gaId) return null;
  if (consent === "granted") return <GoogleAnalytics gaId={gaId} />;
  if (consent !== null) return null;

  const decline = () => {
    // เคยยอมรับแล้วมาเปลี่ยนใจ — GA โหลดค้างอยู่ในหน้า ต้องลบคุกกี้แล้วโหลดหน้าใหม่ให้หลุดจริง
    const loaded = typeof window.gtag === "function";
    writeConsent("denied");
    if (loaded) {
      // ปิด GA ก่อนลบ ไม่งั้นตอนออกจากหน้ามันเขียน _ga_XXXX กลับมาใหม่
      (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = true;
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearAnalyticsCookies();
      location.reload();
    }
  };

  return (
    <div
      role="region"
      aria-label={copy.label[lang]}
      className="fixed inset-x-3 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] z-50 rounded-2xl border border-blush bg-cream/95 p-5 shadow-[0_24px_40px_-24px_rgba(61,48,51,0.45)] backdrop-blur-md md:inset-x-auto md:bottom-6 md:left-6 md:max-w-sm"
    >
      <p className="text-sm leading-relaxed text-mauve">{copy.body[lang]}</p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => writeConsent("granted")}
          className="flex-1 rounded-full bg-ink px-5 py-2.5 text-sm text-cream press hover:bg-clay"
        >
          {copy.accept[lang]}
        </button>
        <button
          type="button"
          onClick={decline}
          className="flex-1 rounded-full border border-clay/50 px-5 py-2.5 text-sm text-clay press hover:border-clay hover:bg-shell"
        >
          {copy.decline[lang]}
        </button>
      </div>
    </div>
  );
}

/** ปุ่มใน footer ให้กลับมาเลือกใหม่ได้ — PDPA ให้ถอนความยินยอมได้ง่ายเท่ากับตอนให้ */
export function CookieSettingsButton({ lang }: { lang: Lang }) {
  return (
    <button
      type="button"
      onClick={reopenConsent}
      className="underline decoration-blush underline-offset-4 hover:text-ink"
    >
      {copy.settings[lang]}
    </button>
  );
}
