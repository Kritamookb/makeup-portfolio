"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";
import type { Lang } from "@/lib/i18n";

const copy = {
  eyebrow: { th: "รีวิวจากลูกค้า", en: "Kind words" },
  prev: { th: "รีวิวก่อนหน้า", en: "Previous review" },
  next: { th: "รีวิวถัดไป", en: "Next review" },
  pause: { th: "หยุดเลื่อนอัตโนมัติ", en: "Pause auto-rotation" },
  play: { th: "เลื่อนอัตโนมัติ", en: "Resume auto-rotation" },
  stars: { th: "5 จาก 5 ดาว", en: "5 out of 5 stars" },
};

/**
 * รีวิวทีละอัน ตัวใหญ่แบบคำพูดในนิตยสาร — หยุดเองเมื่อชี้/โฟกัส และมีปุ่มหยุดถาวร (WCAG 2.2.2)
 * จังหวะเปลี่ยนมาจากแถบเวลาเล่นจบ (animationend) — หยุดแถบ = หยุดการเปลี่ยนไปด้วยในตัว
 * โหมดลดการเคลื่อนไหวไม่มีแถบเล่น จึงไม่เปลี่ยนเอง
 */
export default function Testimonials({ lang }: { lang: Lang }) {
  const items = site.testimonials;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  // ผู้ใช้กดเปลี่ยนเอง = ประกาศให้โปรแกรมอ่านหน้าจอ · เปลี่ยนอัตโนมัติ = เงียบ
  const [announce, setAnnounce] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const go = (delta: number) => {
    setAnnounce(true);
    setIndex((current) => (current + delta + items.length) % items.length);
  };

  return (
    <section id="reviews" className="scroll-mt-24 bg-cream py-24 md:py-36">
      <div className="container-x">
        <Reveal variant="none">
          <div
            ref={rootRef}
            className="mx-auto max-w-4xl text-center"
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={() => setHovering(false)}
            onFocus={() => setHovering(true)}
            onBlur={(event) => {
              if (!rootRef.current?.contains(event.relatedTarget as Node)) setHovering(false);
            }}
          >
            <p className="eyebrow flex items-center justify-center gap-3">
              <span className="font-display text-base tracking-normal text-rose italic">07</span>
              <span aria-hidden="true" className="draw block h-px w-8 bg-rose/60" />
              {copy.eyebrow[lang]}
            </p>

            <span aria-hidden="true" className="mt-6 block font-display text-8xl leading-none text-blush italic">
              “
            </span>

            {/* ซ้อนทุกรีวิวไว้ช่องเดียวกัน ความสูงจะเท่ารีวิวที่ยาวที่สุด หน้าไม่กระตุกตอนเปลี่ยน */}
            <div className="-mt-6 grid" aria-live={announce ? "polite" : "off"}>
              {items.map((item, i) => (
                <figure
                  key={item.name}
                  aria-hidden={i !== index}
                  inert={i !== index}
                  className={`col-start-1 row-start-1 transition-[opacity,translate,filter] duration-700 ease-[var(--ease-silk)] ${
                    i === index ? "opacity-100" : "pointer-events-none opacity-0 motion-safe:translate-y-4 motion-safe:blur-sm"
                  }`}
                >
                  <blockquote className="font-display text-2xl leading-snug font-light text-ink sm:text-3xl md:text-[2.5rem] md:leading-[1.25]">
                    {item.quote[lang]}
                  </blockquote>
                  <figcaption className="mt-8">
                    <p role="img" aria-label={copy.stars[lang]} className="text-sm tracking-[0.3em] text-gold">
                      ★★★★★
                    </p>
                    <span className="mt-3 block font-display text-xl text-clay italic th:not-italic">{item.name}</span>
                    <span className="text-xs tracking-wide text-muted th:tracking-normal">{item.role[lang]}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={copy.prev[lang]}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-blush text-mauve press hover:border-rose hover:text-ink"
              >
                ←
              </button>

              <div className="flex items-center gap-2" aria-hidden="true">
                {items.map((item, i) => (
                  <span key={item.name} className="relative block h-px w-10 overflow-hidden bg-blush">
                    <span
                      // แถบเวลานับถอยหลัง — เล่นใหม่ทุกครั้งที่เปลี่ยน (key) และหยุดตอนชี้
                      key={i === index ? `active-${index}` : "idle"}
                      className={`absolute inset-0 origin-left bg-clay ${
                        i < index ? "scale-x-100" : i === index ? "" : "scale-x-0"
                      } ${i === index && playing ? "motion-safe:animate-[progress_7s_linear_both]" : ""} ${
                        i === index && !playing ? "scale-x-100" : ""
                      } motion-reduce:scale-x-100`}
                      style={{ animationPlayState: hovering ? "paused" : "running" }}
                      onAnimationEnd={() => {
                        setAnnounce(false);
                        setIndex((current) => (current + 1) % items.length);
                      }}
                    />
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label={copy.next[lang]}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-blush text-mauve press hover:border-rose hover:text-ink"
              >
                →
              </button>

              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-label={playing ? copy.pause[lang] : copy.play[lang]}
                aria-pressed={!playing}
                className="ml-2 flex h-11 w-11 items-center justify-center rounded-full text-xs text-muted press hover:text-ink motion-reduce:hidden"
              >
                {playing ? "❚❚" : "▶"}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
