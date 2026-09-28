import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/content/site";
import type { Lang } from "@/lib/i18n";

export default function Testimonials({ lang }: { lang: Lang }) {
  const copy = {
    eyebrow: { th: "รีวิวจากลูกค้า", en: "Kind words" },
    title: { th: "เสียงจากเจ้าสาวและลูกค้า", en: "From brides and clients" },
  };

  return (
    <section id="reviews" className="scroll-mt-24 bg-cream py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {site.testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 70}>
              <figure className="flex h-full flex-col rounded-2xl border border-blush/60 bg-white/70 p-7">
                <p
                  role="img"
                  aria-label={lang === "th" ? "5 จาก 5 ดาว" : "5 out of 5 stars"}
                  className="text-sm tracking-[0.3em] text-gold"
                >
                  ★★★★★
                </p>
                <blockquote className="mt-4 grow text-sm leading-relaxed text-mauve">
                  “{item.quote[lang]}”
                </blockquote>
                <figcaption className="mt-6 border-t border-blush/50 pt-4">
                  <span className="block font-display text-lg text-ink">{item.name}</span>
                  <span className="text-xs text-muted">{item.role[lang]}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
