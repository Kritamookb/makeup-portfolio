import Image from "next/image";
import CountUp from "@/components/CountUp";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";
import type { Lang } from "@/lib/i18n";

export default function About({ lang }: { lang: Lang }) {
  const copy = {
    eyebrow: { th: "เกี่ยวกับช่าง", en: "About the artist" },
  };

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-cream py-24 md:py-36">
      {/* ชื่อตัวใหญ่จาง ๆ ด้านหลัง เลื่อนสวนทางช้า ๆ */}
      <Parallax range="-6rem" className="pointer-events-none absolute inset-x-0 bottom-6 select-none">
        <p
          aria-hidden="true"
          className="text-center font-display text-[28vw] leading-none font-light whitespace-nowrap text-shell italic lg:text-[18rem]"
        >
          {site.brand.logo.lead}
        </p>
      </Parallax>

      <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal variant="wipe" className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[2rem] outline outline-1 -outline-offset-1 outline-black/10 lg:max-w-md">
            <Parallax range="2rem" className="absolute -inset-y-10 inset-x-0">
              <Image
                src={site.about.image}
                alt={site.brand.artist[lang]}
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover"
              />
            </Parallax>
          </div>
        </Reveal>

        <Reveal variant="none" className="order-1 lg:order-2">
          <p className="eyebrow flex items-center gap-3">
            <span className="font-display text-base tracking-normal text-rose italic">05</span>
            <span aria-hidden="true" className="draw block h-px w-8 bg-rose/60" />
            {copy.eyebrow[lang]}
          </p>
          <h2 className="mt-4 font-display text-[2.1rem] leading-[1.1] font-light text-ink sm:text-5xl">
            <span className="rise-wrap">
              <span className="rise">{site.about.heading[lang]}</span>
            </span>
          </h2>

          <div className="mt-8 space-y-4">
            {site.about.body.map((paragraph, index) => (
              <span key={paragraph.en} className="rise-wrap">
                <p className="rise text-base leading-relaxed text-muted" style={{ "--i": index + 2 } as React.CSSProperties}>
                  {paragraph[lang]}
                </p>
              </span>
            ))}
          </div>

          {/* สถิติย้ายมาจาก hero — นับขึ้นตอนเลื่อนถึง */}
          <dl className="mt-10 grid grid-cols-3 gap-6 border-y border-blush py-7">
            {site.stats.map((stat) => (
              <div key={stat.value}>
                <dt className="sr-only">{stat.label[lang]}</dt>
                <dd className="font-display text-4xl font-light text-clay md:text-5xl">
                  <CountUp value={stat.value} />
                </dd>
                <dd aria-hidden="true" className="mt-1 text-xs leading-snug text-muted">
                  {stat.label[lang]}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {site.about.credentials.map((item) => (
              <li key={item.en} className="flex gap-2.5 text-sm text-mauve">
                <span aria-hidden="true" className="mt-1 text-rose">
                  ✦
                </span>
                {item[lang]}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
