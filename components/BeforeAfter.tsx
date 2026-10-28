"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/content/site";
import { motionOk } from "@/lib/motion";
import type { Lang } from "@/lib/i18n";

const copy = {
  eyebrow: { th: "ก่อน / หลัง", en: "Before / after" },
  title: { th: "ความต่างอยู่ที่ผิว", en: "The difference is in the skin" },
  lead: {
    th: "ลากเส้นกลางรูปเพื่อเทียบ — ผิวยังเป็นผิว แค่ดูพักผ่อนเต็มที่ และพร้อมสำหรับกล้องทั้งวัน",
    en: "Drag the line to compare. Skin still looks like skin — just rested, even, and ready for the camera all day.",
  },
  before: { th: "ก่อน", en: "Before" },
  after: { th: "หลัง", en: "After" },
  slider: { th: "เลื่อนเพื่อเทียบก่อนและหลังแต่งหน้า", en: "Slide to compare before and after makeup" },
  choose: { th: "เลือกลุค", en: "Choose a look" },
};

export default function BeforeAfter({ lang }: { lang: Lang }) {
  const [pair, setPair] = useState(0);
  const [pos, setPos] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);
  const startX = useRef(0);

  // เลื่อนมาถึงครั้งแรก เส้นจะส่ายให้ดูหนึ่งรอบ บอกว่าลากได้ — ถ้าผู้ใช้แตะก่อนก็หยุดทันที
  useEffect(() => {
    const node = frameRef.current;
    if (!node || !motionOk()) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 2200;
        const tick = (now: number) => {
          if (touched.current) return;
          const t = Math.min(1, (now - start) / duration);
          // ไป 28% → 72% → กลับ 50% ด้วยคลื่น sin ที่ค่อย ๆ หยุด
          setPos(50 - Math.sin(t * Math.PI * 2) * 22 * (1 - t * 0.4));
          if (t < 1) frame = requestAnimationFrame(tick);
          else setPos(50);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const moveTo = (clientX: number) => {
    const box = frameRef.current?.getBoundingClientRect();
    if (!box) return;
    setPos(Math.max(0, Math.min(100, ((clientX - box.left) / box.width) * 100)));
  };

  const current = site.beforeAfter[pair];

  return (
    <section className="overflow-hidden bg-shell/50 py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionHeading
              index="03"
              align="left"
              eyebrow={copy.eyebrow[lang]}
              title={copy.title[lang]}
              lead={copy.lead[lang]}
            />
          </Reveal>

          <Reveal delay={150} className="mt-10">
            <p className="text-xs tracking-[0.2em] text-mauve uppercase th:tracking-normal">{copy.choose[lang]}</p>
            <div className="mt-4 flex gap-3">
              {site.beforeAfter.map((item, index) => (
                <button
                  key={item.after}
                  type="button"
                  onClick={() => {
                    setPair(index);
                    setPos(50);
                  }}
                  aria-pressed={pair === index}
                  aria-label={item.label[lang]}
                  className={`relative h-20 w-16 overflow-hidden rounded-lg outline-2 outline-offset-2 press transition-[outline-color,opacity] ${
                    pair === index ? "outline outline-clay" : "opacity-60 outline-transparent hover:opacity-100"
                  }`}
                >
                  <Image src={item.after} alt="" fill sizes="4rem" className="object-cover" />
                </button>
              ))}
            </div>
            <p className="mt-4 font-display text-xl text-ink italic th:not-italic">{current.label[lang]}</p>
          </Reveal>
        </div>

        <Reveal variant="wipe" className="mx-auto w-full max-w-md lg:max-w-none">
          <div
            ref={frameRef}
            className="relative aspect-[4/5] cursor-ew-resize touch-pan-y overflow-hidden rounded-3xl outline outline-1 -outline-offset-1 outline-black/10 select-none shadow-[0_40px_80px_-40px_rgba(61,48,51,0.55)]"
            onPointerDown={(event) => {
              touched.current = true;
              startX.current = event.clientX;
              // นิ้ว: รอให้ลากแนวนอนก่อน ไม่งั้นแค่เริ่มปัดเลื่อนหน้าผ่านรูป เส้นก็กระโดดตามนิ้ว
              if (event.pointerType !== "touch") {
                dragging.current = true;
                event.currentTarget.setPointerCapture(event.pointerId);
                moveTo(event.clientX);
              }
            }}
            onPointerMove={(event) => {
              if (!dragging.current && event.pointerType === "touch" && event.buttons) {
                if (Math.abs(event.clientX - startX.current) < 8) return;
                dragging.current = true;
              }
              if (dragging.current) moveTo(event.clientX);
            }}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            <Image
              key={current.after}
              src={current.after}
              alt={`${copy.after[lang]} · ${current.label[lang]}`}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
              draggable={false}
            />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <Image
                key={current.before}
                src={current.before}
                alt={`${copy.before[lang]} · ${current.label[lang]}`}
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
                draggable={false}
              />
            </div>

            <span className="absolute top-5 left-5 rounded-full bg-ink/55 px-3 py-1 text-xs tracking-[0.2em] text-cream uppercase backdrop-blur-sm th:tracking-normal">
              {copy.before[lang]}
            </span>
            <span className="absolute top-5 right-5 rounded-full bg-cream/80 px-3 py-1 text-xs tracking-[0.2em] text-ink uppercase backdrop-blur-sm th:tracking-normal">
              {copy.after[lang]}
            </span>

            {/* ช่องเลื่อนจริงสำหรับคีย์บอร์ดและโปรแกรมอ่านหน้าจอ — ซ่อนไว้ ใช้เส้นด้านล่างแทนสายตา */}
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={Math.round(pos)}
              onChange={(event) => {
                touched.current = true;
                setPos(Number(event.target.value));
              }}
              aria-label={copy.slider[lang]}
              className="peer sr-only"
            />

            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-px bg-cream" style={{ left: `${pos}%` }}>
              <span className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-full border border-cream/80 bg-cream/30 text-cream shadow-lg backdrop-blur-md">
                <span className="text-sm">‹</span>
                <span className="text-sm">›</span>
              </span>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-3xl ring-clay ring-inset peer-focus-visible:ring-4"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
