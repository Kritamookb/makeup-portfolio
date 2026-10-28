import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/content/site";
import type { Lang } from "@/lib/i18n";

export default function Faq({ lang }: { lang: Lang }) {
  const copy = {
    eyebrow: { th: "คำถามที่พบบ่อย", en: "FAQ" },
    title: { th: "เรื่องที่ลูกค้าถามบ่อย", en: "Questions we hear often" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faq.map((item) => ({
      "@type": "Question",
      name: item.q[lang],
      acceptedAnswer: { "@type": "Answer", text: item.a[lang] },
    })),
  };

  return (
    <section id="faq" className="scroll-mt-24 bg-shell/50 py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <SectionHeading index="08" align="left" eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} />
          </Reveal>
        </div>

        <div className="divide-y divide-blush/70 border-y border-blush/70">
          {site.faq.map((item, index) => (
            <Reveal key={item.q.en} variant="slide" delay={index * 70}>
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-baseline gap-5 text-ink marker:hidden">
                  <span aria-hidden="true" className="font-display text-sm text-rose italic">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="grow font-display text-xl transition-colors group-hover:text-clay md:text-2xl">
                    {item.q[lang]}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blush text-lg leading-none text-rose motion-safe:transition-[rotate,background-color] motion-safe:duration-500 group-open:rotate-45 group-open:bg-shell"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 pr-12 pl-9 text-sm leading-relaxed text-muted">{item.a[lang]}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
