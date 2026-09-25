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
    <section className="bg-shell/50 py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} />
        </Reveal>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {site.process.map((item, index) => (
            <Reveal key={item.step} delay={index * 70}>
              <li className="relative h-full border-t border-blush pt-6">
                <span className="font-display text-4xl font-light text-rose/70">{item.step}</span>
                <h3 className="mt-3 font-display text-xl text-ink">{item.title[lang]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc[lang]}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
