import { NextResponse, type NextRequest } from "next/server";

/**
 * หน้า / เลือกภาษาให้จาก Accept-Language ของเบราว์เซอร์
 * ภาษาที่ผู้ใช้ตั้งไว้อันดับแรกเป็นไทย → /th · ภาษาอื่นทั้งหมด (นักท่องเที่ยว) → /en
 * ไม่มี header เลย (เช่นบอท) → /th ซึ่งเป็นตลาดหลัก
 */
export function proxy(request: NextRequest) {
  const lang = preferredLang(request.headers.get("accept-language"));
  const response = NextResponse.redirect(new URL(`/${lang}`, request.url));
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = { matcher: "/" };

function preferredLang(header: string | null): "th" | "en" {
  if (!header) return "th";

  // "th-TH,th;q=0.9,en;q=0.8" → เอาภาษาที่ q สูงสุด
  const top = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q === undefined ? 1 : Number(q) || 0 };
    })
    .filter((item) => item.tag && item.tag !== "*")
    .sort((a, b) => b.q - a.q)[0];

  if (!top) return "th";
  return top.tag.startsWith("th") ? "th" : "en";
}
