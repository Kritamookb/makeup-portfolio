import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/content/site";
import type { Lang } from "@/lib/i18n";

export default function Services({ lang }: { lang: Lang }) {
  const copy = {
    eyebrow: { th: "บริการและราคา", en: "Services & pricing" },
    title: { th: "เลือกแพ็กเกจที่ตรงกับงานของคุณ", en: "A package that fits your day" },
    lead: {
      th: "ราคาบอกชัดตั้งแต่ต้น ไม่มีค่าใช้จ่ายแอบแฝง ปรับแพ็กเกจตามจำนวนคนและสถานที่ได้เสมอ",
      en: "Clear pricing from the start, no hidden fees. Every package adapts to your group size and venue.",
    },
    ask: { th: "สอบถามแพ็กเกจนี้", en: "Ask about this package" },
  };

  return (
    <section id="services" className="scroll-mt-24 bg-cream py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow={copy.eyebrow[lang]}
            title={copy.title[lang]}
            lead={copy.lead[lang]}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service, index) => (
            <Reveal key={service.id} delay={index * 60}>
              <article className="group flex h-full flex-col rounded-2xl border border-blush/60 bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-rose/70 hover:shadow-[0_24px_40px_-28px_rgba(61,48,51,0.5)]">
                <h3 className="font-display text-2xl font-normal text-ink">
                  {service.name[lang]}
                </h3>
                <p className="mt-2 text-sm tracking-wide text-clay">{service.price[lang]}</p>

                <p className="mt-4 text-sm leading-relaxed text-muted">{service.desc[lang]}</p>

                <ul className="mt-5 space-y-2 border-t border-blush/50 pt-5">
                  {service.includes.map((item) => (
                    <li key={item.en} className="flex gap-2.5 text-sm text-mauve">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rose" />
                      {item[lang]}
                    </li>
                  ))}
                </ul>

                <a
                  href="#booking"
                  data-service={service.id}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm text-clay transition-colors group-hover:text-ink"
                >
                  {copy.ask[lang]}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
