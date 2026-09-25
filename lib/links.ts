import { site } from "@/content/site";
import type { Lang } from "@/lib/i18n";

/**
 * ทุกลิงก์ติดต่อจะพ่วง ref=website ไว้ เพื่อให้แยกออกว่างานไหนมาจากเว็บ
 * (จำเป็นตอนสรุปยอดกับผู้ว่าจ้าง)
 */
export const REF = "website";

export const telHref = `tel:+66${site.contact.phone.replace(/^0/, "")}`;

export const lineHref = `${site.contact.lineUrl}${site.contact.lineUrl.includes("?") ? "&" : "?"}ref=${REF}`;

export const instagramHref = `${site.contact.instagramUrl}?ref=${REF}`;

export const facebookHref = `${site.contact.facebookUrl}?ref=${REF}`;

export function mailtoHref(lang: Lang, body?: string) {
  const subject =
    lang === "th" ? "สอบถามคิวแต่งหน้า (จากเว็บไซต์)" : "Makeup booking enquiry (from website)";
  const query = new URLSearchParams({ subject, ...(body ? { body } : {}) });
  return `mailto:${site.contact.email}?${query.toString()}`;
}
