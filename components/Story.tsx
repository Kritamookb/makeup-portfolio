"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";
import { onScrollFrame } from "@/lib/motion";
import type { Lang } from "@/lib/i18n";

const copy = {
  eyebrow: { th: "เรื่องเล่าจากวันงาน", en: "A wedding, hour by hour" },
  hint: { th: "เลื่อนต่อเพื่อดูทั้งวัน", en: "Keep scrolling through the day" },
};

/**
 * จอใหญ่: ส่วนนี้ถูกตรึงไว้ แล้วรูปเลื่อนไปทางซ้ายตามการเลื่อนหน้า
 * มือถือ/ลดการเคลื่อนไหว: ปัดข้างธรรมดา (ดู .story-* ใน globals.css)
 */
export default function Story({ lang }: { lang: Lang }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const pinned = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let distance = 0;

    // ความสูงที่ต้องเลื่อน = ระยะที่รูปต้องวิ่งไปทางซ้าย + หนึ่งจอ
    const measure = () => {
      if (!pinned.matches) {
        section.style.removeProperty("--pin-height");
        track.style.transform = "";
        distance = 0;
        return;
      }
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.setProperty("--pin-height", `${distance + window.innerHeight}px`);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    pinned.addEventListener("change", measure);

    const stop = onScrollFrame(() => {
      if (!distance) return;
      const box = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -box.top / (box.height - window.innerHeight)));
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    });

    return () => {
      stop();
      observer.disconnect();
      pinned.removeEventListener("change", measure);
    };
  }, []);

  return (
    <section ref={sectionRef} aria-label={site.story.title[lang]} className="story-pin relative bg-ink text-cream">
      <div className="story-sticky py-20 lg:py-0">
        <div ref={trackRef} className="story-track flex w-full gap-6 px-[max(1.25rem,calc((100vw-78rem)/2+1.25rem))] lg:w-max lg:gap-10">
          <Reveal className="flex w-[78vw] shrink-0 flex-col justify-center sm:w-[22rem] lg:w-[26rem]">
            <p className="eyebrow flex items-center gap-3 text-rose">
              <span className="font-display text-base tracking-normal italic">04</span>
              <span aria-hidden="true" className="draw block h-px w-8 bg-rose/60" />
              {copy.eyebrow[lang]}
            </p>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] font-light md:text-6xl">
              <span className="rise-wrap">
                <span className="rise">{site.story.title[lang]}</span>
              </span>
            </h2>
            <p className="mt-8 hidden items-center gap-3 text-sm text-cream/60 lg:flex">
              {copy.hint[lang]}
              <span aria-hidden="true" className="motion-safe:animate-[intro-fade_1.6s_ease-in-out_infinite_alternate]">
                →
              </span>
            </p>
          </Reveal>

          {site.story.frames.map((frame, index) => (
            <figure
              key={frame.src}
              className={`w-[70vw] shrink-0 sm:w-[20rem] lg:w-[24rem] ${index % 2 ? "lg:mt-24" : "lg:-mt-10"}`}
            >
              <div className="group sheen relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={frame.src}
                  alt={frame.caption[lang]}
                  fill
                  sizes="(max-width: 1024px) 70vw, 24rem"
                  className="object-cover motion-safe:transition-[scale] motion-safe:duration-[1.2s] motion-safe:group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-5 flex items-baseline gap-4">
                <span className="font-display text-4xl font-light text-rose italic">{frame.time}</span>
                <span className="text-sm text-cream/75">{frame.caption[lang]}</span>
              </figcaption>
            </figure>
          ))}
          {/* ช่องว่างท้ายแถว ให้รูปสุดท้ายไม่ชิดขอบจอ */}
          <span aria-hidden="true" className="w-1 shrink-0 lg:w-[10vw]" />
        </div>

        <div aria-hidden="true" className="container-x mt-10 hidden lg:block">
          <span className="block h-px w-full bg-cream/15">
            <span ref={barRef} className="block h-full origin-left scale-x-0 bg-rose" />
          </span>
        </div>
      </div>
    </section>
  );
}
