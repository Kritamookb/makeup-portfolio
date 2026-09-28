import { site } from "@/content/site";
import type { Lang } from "@/lib/i18n";

/**
 * ทุกลิงก์ติดต่อจะพ่วง ref=website ไว้ เพื่อให้แยกออกว่างานไหนมาจากเว็บ
 * (จำเป็นตอนสรุปยอดกับผู้ว่าจ้าง)
 */
export const REF = "website";

/** เบอร์แบบสากล (+66) — ใช้ทั้งลิงก์โทรและข้อมูลที่ส่งให้ Google */
export const phoneIntl = `+66${site.contact.phone.replace(/^0/, "")}`;

/**
 * wa.me ใช้เบอร์สากลไม่มี + · WhatsApp พ่วง ref ไม่ได้ เลยพิมพ์ข้อความที่มี "(จากเว็บไซต์)" ไว้ให้แทน
 * ฟอร์มจองส่งข้อความจองเต็ม ๆ มาเอง
 */
export function whatsappHref(lang: Lang, text?: string) {
  const greeting =
    lang === "th"
      ? "สวัสดีครับ สนใจสอบถามคิวแต่งหน้า (จากเว็บไซต์)"
      : "Hi! I'd like to ask about makeup booking (from website)";
  const number = `66${site.contact.whatsapp.replace(/^0/, "")}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text ?? greeting)}`;
}

export const telHref = `tel:${phoneIntl}`;

export const lineHref = `${site.contact.lineUrl}${site.contact.lineUrl.includes("?") ? "&" : "?"}ref=${REF}`;

/** เปิดแชท LINE OA พร้อมข้อความที่พิมพ์ไว้ให้ — ใช้ได้เฉพาะ OA (ไม่ใช่ LINE ส่วนตัว) */
export function lineOaMessageHref(oaId: string, text: string) {
  return `https://line.me/R/oaMessage/${encodeURIComponent(oaId)}/?${encodeURIComponent(text)}`;
}

/** ID ที่โชว์บนเว็บ — OA มี @ อยู่ใน Basic ID แล้ว ส่วน LINE ส่วนตัวไม่มี @ (ใส่แล้วลูกค้าค้นไม่เจอ) */
export const lineDisplay = site.contact.lineOaId ?? site.contact.lineId;

/** แชทหลักของแต่ละหน้า — คนไทยใช้ LINE นักท่องเที่ยวใช้ WhatsApp */
export function primaryChat(lang: Lang) {
  return lang === "th"
    ? { href: lineHref, label: "LINE" }
    : { href: whatsappHref(lang), label: "WhatsApp" };
}

export const instagramHref = `${site.contact.instagramUrl}?ref=${REF}`;

export const facebookHref = `${site.contact.facebookUrl}?ref=${REF}`;

export function mailtoHref(lang: Lang, body?: string) {
  const subject =
    lang === "th" ? "สอบถามคิวแต่งหน้า (จากเว็บไซต์)" : "Makeup booking enquiry (from website)";
  const query = new URLSearchParams({ subject, ...(body ? { body } : {}) });
  return `mailto:${site.contact.email}?${query.toString()}`;
}
