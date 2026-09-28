import Image from "next/image";
import { site } from "@/content/site";
import { primaryChat } from "@/lib/links";
import type { Lang } from "@/lib/i18n";

export default function Hero({ lang }: { lang: Lang }) {
  const copy = {
    headline: {
      th: ["สวยเป็นตัวเอง", "ในวันที่สำคัญที่สุด"],
      en: ["Effortlessly you,", "on your biggest day"],
    },
    lead: {
      th: "ช่างแต่งหน้าเจ้าสาวและงานอีเวนต์ในภูเก็ต บริการถึงโรงแรม รีสอร์ท และริมหาด แต่งทนตลอดวันในอากาศร้อนชื้น และยังดูเป็นผิวจริงในทุกภาพถ่าย",
      en: "Bridal and event makeup across Phuket — at your hotel, resort or on the beach. Built to hold through the heat, and to still read as your own skin in every photograph.",
    },
    book: { th: "จองคิววันงาน", en: "Book your date" },
    portfolio: { th: "ดูผลงาน", en: "See the portfolio" },
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* พื้นหลังไล่สีนุ่ม ๆ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_75%_10%,var(--color-shell)_0%,var(--color-cream)_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 -z-10 h-72 w-72 rounded-full bg-blush/40 blur-3xl"
      />

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow">{site.brand.tagline[lang]}</p>

          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.08] font-light text-ink sm:text-6xl lg:text-[4.2rem]">
            {copy.headline[lang][0]}
            <span className="block text-clay italic">{copy.headline[lang][1]}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {copy.lead[lang]}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#booking"
              className="rounded-full bg-ink px-7 py-3.5 text-sm tracking-wide text-cream th:tracking-normal transition-colors hover:bg-clay"
            >
              {copy.book[lang]}
            </a>
            <a
              href="#portfolio"
              className="rounded-full border border-clay/50 px-7 py-3.5 text-sm tracking-wide text-clay th:tracking-normal transition-colors hover:border-clay hover:bg-shell"
            >
              {copy.portfolio[lang]}
            </a>
            <a
              href={primaryChat(lang).href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-mauve underline decoration-blush underline-offset-4 transition-colors hover:text-ink"
            >
              {lang === "th" ? "หรือทักไลน์เลย" : "or message on WhatsApp"}
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-blush/60 pt-7">
            {site.stats.map((stat) => (
              <div key={stat.value}>
                <dt className="font-display text-3xl font-light text-clay md:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-muted">{stat.label[lang]}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[14rem] rounded-b-3xl shadow-[0_30px_60px_-30px_rgba(61,48,51,0.45)]">
            <Image
              src="/images/hero-nude-glam.jpg"
              alt={
                lang === "th"
                  ? "ผลงานแต่งหน้าลุคกลามโทนนู้ดโดย Bigjimakeup ภูเก็ต"
                  : "Nude-toned glam makeup by Bigjimakeup, Phuket"
              }
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <span
            aria-hidden="true"
            className="absolute -right-4 -bottom-6 -z-10 h-40 w-40 rounded-full border border-rose/40"
          />
        </div>
      </div>
    </section>
  );
}
