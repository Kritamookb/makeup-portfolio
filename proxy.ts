import { NextResponse, type NextRequest } from "next/server";

/**
 * หน้า / พาไป /th แบบถาวร (308) เสมอ
 * เดิมเลือกภาษาจาก Accept-Language ด้วย 307 — Google จึงถือว่า / เป็นตัวหลัก แล้วไม่ index /th
 * ("Duplicate, Google chose different canonical") นักท่องเที่ยวเห็นแถบ LanguageHint ชวนไป /en แทน
 */
export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL("/th", request.url), 308);
}

export const config = { matcher: "/" };
