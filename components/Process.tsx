import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/content/site";
import type { Lang } from "@/lib/i18n";

export default function Process({ lang }: { lang: Lang }) {
  const copy = {
    eyebrow: { th: "ขั้นตอนการจอง", en: "How it works" },
    title: { th: "จองง่าย ๆ สี่ขั้นตอน", en: "Four simple steps" },
  };

  return (
    <section className="bg-shell/50 py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading index="06" eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} />
        </Reveal>

        {/* เส้นเวลา — เส้นลากผ่านทีละขั้น แล้วจุดของแต่ละขั้นค่อย ๆ เติมสี */}
        <Reveal variant="none" className="relative mt-20">
          <span
            aria-hidden="true"
            className="draw absolute top-5 right-0 left-0 hidden h-px bg-rose/60 [transition-duration:2.2s] lg:block"
          />
          <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {site.process.map((item, index) => (
              <li key={item.step} className="relative">
                <span aria-hidden="true" className="relative z-10 flex h-10 items-center">
                  <span className="block h-3 w-3 rounded-full border border-rose bg-cream" />
                  <span
                    className="pop absolute left-0 block h-3 w-3 rounded-full bg-clay"
                    style={{ transitionDelay: `${700 + index * 500}ms` }}
                  />
                </span>
                <span className="mt-4 block font-display text-5xl font-light text-rose/80 italic">{item.step}</span>
                <span className="rise-wrap mt-3">
                  <span className="rise" style={{ "--i": index * 3 + 4 } as React.CSSProperties}>
                    <h3 className="font-display text-2xl text-ink">{item.title[lang]}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc[lang]}</p>
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
