import { site } from "@/content/site";
import type { Lang } from "@/lib/i18n";

/** แถบชื่อบริการวิ่งช้า ๆ ใต้ hero — ชุดที่สองซ่อนจากโปรแกรมอ่านหน้าจอ (ซ้ำไว้ให้วิ่งต่อเนื่องเท่านั้น) */
export default function Marquee({ lang }: { lang: Lang }) {
  const words = [...site.services.map((service) => service.name[lang]), lang === "th" ? "ภูเก็ต" : "Phuket"];

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {words.map((word) => (
        <li key={word} className="flex items-center">
          <span className="px-6 font-display text-3xl font-light text-ink italic md:px-10 th:not-italic md:text-5xl">{word}</span>
          <span aria-hidden="true" className="text-lg text-rose">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-blush/70 bg-shell/60 py-6 md:py-8">
      <div className="marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
