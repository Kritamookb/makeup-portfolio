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
    <section id="faq" className="scroll-mt-24 bg-shell/50 py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} />
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-blush/70 border-y border-blush/70">
          {site.faq.map((item, index) => (
            <Reveal key={item.q.en} delay={index * 50}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base text-ink marker:hidden">
                  {item.q[lang]}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl leading-none text-rose transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-8 text-sm leading-relaxed text-muted">{item.a[lang]}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
