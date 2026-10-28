"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { jumpToTop } from "@/lib/motion";

/**
 * หน้า / พาไป /th เสมอ (redirect ถาวร ให้ Google index /th ได้) — นักท่องเที่ยวที่เบราว์เซอร์ไม่ใช่ภาษาไทย
 * เลยเห็นแถบเล็กๆ ชวนไปหน้าอังกฤษแทนการ redirect อัตโนมัติ ปิดแล้วจำไว้ในเครื่อง
 */
const KEY = "lang-hint-dismissed";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function shouldShow() {
  try {
    if (localStorage.getItem(KEY)) return false;
  } catch {
    // localStorage ใช้ไม่ได้ (private mode) — ยังโชว์ได้ แค่จะจำการปิดไม่ได้
  }
  const first = (navigator.languages?.[0] || navigator.language || "").toLowerCase();
  return first !== "" && !first.startsWith("th");
}

function dismiss() {
  try {
    localStorage.setItem(KEY, "1");
  } catch {}
  listeners.forEach((listener) => listener());
}

// บน server ไม่รู้ภาษาเบราว์เซอร์ — ไม่ render ไว้ก่อน ไม่ให้กระพริบใส่คนไทย
const hiddenOnServer = () => false;

export default function LanguageHint() {
  const show = useSyncExternalStore(subscribe, shouldShow, hiddenOnServer);
  if (!show) return null;

  return (
    <div
      lang="en"
      role="region"
      aria-label="Language"
      className="absolute inset-x-0 top-16 z-40 flex items-center gap-3 border-b border-blush bg-shell/95 py-1 pr-1 pl-5 backdrop-blur-md md:fixed md:inset-x-3 md:top-[calc(5rem+0.75rem)] md:mx-auto md:max-w-md md:rounded-full md:border md:bg-cream/95 md:py-1.5 md:pr-1.5 md:shadow-[0_16px_32px_-20px_rgba(61,48,51,0.45)]"
    >
      <p className="flex-1 text-xs text-mauve md:text-sm">This page is in Thai.</p>
      <Link
        href="/en"
        scroll={false}
        hrefLang="en"
        onClick={() => {
          dismiss();
          jumpToTop();
        }}
        className="rounded-full bg-ink px-3.5 py-1.5 text-xs whitespace-nowrap text-cream press hover:bg-clay md:px-4 md:py-2.5 md:text-sm"
      >
        View in English →
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg text-mauve press hover:bg-shell"
      >
        ×
      </button>
    </div>
  );
}
