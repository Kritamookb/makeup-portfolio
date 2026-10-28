import Image from "next/image";
import Magnetic from "@/components/Magnetic";
import Parallax from "@/components/Parallax";
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
    badge: {
      th: "ช่างแต่งหน้าเจ้าสาว · ภูเก็ต · แต่งถึงที่ · ",
      en: "Bridal makeup · Phuket · On location · ",
    },
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-28">
      {/* พื้นหลังไล่สีนุ่ม ๆ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_75%_10%,var(--color-shell)_0%,var(--color-cream)_60%)]"
      />

      {/* มือถือ: รูปขึ้นก่อน — รูปคือสินค้า ต้องเห็นตั้งแต่จอแรก · จอใหญ่: ข้อความซ้าย รูปขวา */}
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div className="relative z-10">
          <p className="eyebrow intro-fade" style={{ "--i": 0 } as React.CSSProperties}>
            {site.brand.tagline[lang]}
          </p>

          <h1 className="mt-6 font-display text-[2.9rem] leading-[1.02] font-light text-ink sm:text-7xl lg:-mr-24 lg:text-[5.6rem] xl:text-[6.4rem]">
            <span className="rise-wrap">
              <span className="intro-rise" style={{ "--i": 0 } as React.CSSProperties}>
                {copy.headline[lang][0]}
              </span>
            </span>
            <span className="rise-wrap">
              <span className="intro-rise text-clay italic th:not-italic" style={{ "--i": 1 } as React.CSSProperties}>
                {copy.headline[lang][1]}
              </span>
            </span>
          </h1>

          <p
            className="intro-fade mt-8 max-w-lg text-base leading-relaxed text-muted md:text-lg"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {copy.lead[lang]}
          </p>

          <div
            className="intro-fade mt-10 flex flex-wrap items-center gap-x-5 gap-y-4"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <Magnetic>
              <a
                href="#booking"
                className="inline-block rounded-full bg-ink px-8 py-4 text-sm tracking-wide text-cream th:tracking-normal press hover:bg-clay"
              >
                {copy.book[lang]}
              </a>
            </Magnetic>
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 text-sm tracking-wide text-ink th:tracking-normal"
            >
              <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-clay motion-safe:after:transition-transform motion-safe:after:duration-500 group-hover:after:origin-left group-hover:after:scale-x-100">
                {copy.portfolio[lang]}
              </span>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-clay/40 text-clay motion-safe:transition-[translate,background-color] motion-safe:duration-500 group-hover:translate-x-1 group-hover:bg-shell"
              >
                ↓
              </span>
            </a>
          </div>

          <p className="intro-fade mt-6" style={{ "--i": 4 } as React.CSSProperties}>
            <a
              href={primaryChat(lang).href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-mauve underline decoration-blush underline-offset-4 transition-colors hover:text-ink"
            >
              {lang === "th" ? "หรือทักไลน์เลย" : "or message on WhatsApp"}
            </a>
          </p>
        </div>

        <div className="relative order-first mx-auto w-full max-w-md lg:order-none lg:mr-0 lg:max-w-[30rem]">
          <div className="intro-curtain">
            <div className="relative aspect-[1/1.08] overflow-hidden rounded-t-[14rem] sm:aspect-[4/5] rounded-b-3xl outline outline-1 -outline-offset-1 outline-black/10 shadow-[0_40px_80px_-40px_rgba(61,48,51,0.55)]">
              <Parallax range="2.5rem" className="absolute -inset-y-12 inset-x-0">
                <Image
                  src={site.hero.image}
                  alt={
                    lang === "th"
                      ? "ผลงานแต่งหน้าลุคกลามโทนนู้ดโดย Bigjimakeup ภูเก็ต"
                      : "Nude-toned glam makeup by Bigjimakeup, Phuket"
                  }
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="intro-zoom object-cover"
                />
              </Parallax>
            </div>
          </div>

          {/* รูปเล็กซ้อนมุมล่าง — เลื่อนสวนทางกับรูปใหญ่ให้ดูมีมิติ */}
          <Parallax range="-3.5rem" className="absolute -bottom-8 -left-1 w-24 sm:-bottom-10 sm:-left-12 sm:w-40 lg:-left-20 lg:w-44">
            <div
              className="intro-fade aspect-[3/4] overflow-hidden rounded-2xl border-4 border-cream shadow-[0_24px_50px_-24px_rgba(61,48,51,0.6)]"
              style={{ "--i": 5 } as React.CSSProperties}
            >
              <Image
                src={site.hero.inset}
                alt=""
                width={360}
                height={480}
                sizes="11rem"
                className="h-full w-full object-cover"
              />
            </div>
          </Parallax>

          {/* ตราวงกลมหมุนช้า ๆ */}
          <div
            aria-hidden="true"
            className="intro-fade absolute -top-6 -right-1 h-24 w-24 sm:-top-8 sm:-right-8 sm:h-32 sm:w-32"
            style={{ "--i": 6 } as React.CSSProperties}
          >
            <svg viewBox="0 0 100 100" className="h-full w-full motion-safe:animate-[badge-spin_28s_linear_infinite]">
              <defs>
                <path id="hero-badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <circle cx="50" cy="50" r="49" className="fill-cream/85" />
              <text className="fill-clay text-[9px] tracking-[0.16em] uppercase th:text-[10px] th:tracking-normal">
                <textPath href="#hero-badge-circle">{copy.badge[lang]}</textPath>
              </text>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display text-2xl text-rose italic">
              ✦
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
