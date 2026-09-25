export const locales = ["th", "en"] as const;
export type Lang = (typeof locales)[number];

/** ข้อความสองภาษา — ใช้กับทุก string ที่โชว์บนหน้าเว็บ */
export type L = { th: string; en: string };

export function t(value: L, lang: Lang): string {
  return value[lang];
}

export function isLang(value: string): value is Lang {
  return (locales as readonly string[]).includes(value);
}

export const other = (lang: Lang): Lang => (lang === "th" ? "en" : "th");
