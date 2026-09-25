import Image from "next/image";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";
import type { Lang } from "@/lib/i18n";

export default function About({ lang }: { lang: Lang }) {
  const copy = {
    eyebrow: { th: "เกี่ยวกับช่าง", en: "About the artist" },
  };

  return (
    <section id="about" className="scroll-mt-24 bg-shell/50 py-20 md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-sm lg:max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_28px_50px_-30px_rgba(61,48,51,0.5)]">
              <Image
                src={site.about.image}
                alt={site.brand.artist[lang]}
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover"
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute -top-5 -left-5 -z-10 h-32 w-32 rounded-full bg-blush/50"
            />
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={80}>
          <p className="eyebrow">{copy.eyebrow[lang]}</p>
          <h2 className="mt-3 font-display text-3xl leading-tight font-light text-ink sm:text-4xl">
            {site.about.heading[lang]}
          </h2>
          <span aria-hidden="true" className="mt-5 block h-px w-16 bg-rose/60" />

          <div className="mt-6 space-y-4">
            {site.about.body.map((paragraph) => (
              <p key={paragraph.en} className="text-base leading-relaxed text-muted">
                {paragraph[lang]}
              </p>
            ))}
          </div>

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
