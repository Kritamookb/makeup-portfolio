"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/content/site";
import { finePointer, motionOk } from "@/lib/motion";
import type { Lang } from "@/lib/i18n";

const copy = {
  eyebrow: { th: "บริการและราคา", en: "Services & pricing" },
  title: { th: "เลือกแพ็กเกจที่ตรงกับงานของคุณ", en: "A package that fits your day" },
  lead: {
    th: "ราคาบอกชัดตั้งแต่ต้น ไม่มีค่าใช้จ่ายแอบแฝง ปรับแพ็กเกจตามจำนวนคนและสถานที่ได้เสมอ",
    en: "Clear pricing from the start, no hidden fees. Every package adapts to your group size and venue.",
  },
  ask: { th: "สอบถามแพ็กเกจนี้", en: "Ask about this package" },
};

/** รายการบริการแบบเมนูร้าน — จอที่มีเมาส์จะมีรูปลอยตามเคอร์เซอร์ตอนชี้แต่ละแถว */
export default function Services({ lang }: { lang: Lang }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  // รูปลอยไล่ตามเมาส์แบบหน่วง ๆ (lerp) ไม่กระตุกตามทุกพิกเซล
  useEffect(() => {
    const list = listRef.current;
    const float = floatRef.current;
    if (!list || !float || !finePointer() || !motionOk()) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const tick = () => {
      x += (targetX - x) * 0.14;
      y += (targetY - y) * 0.14;
      float.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${(targetX - x) * 0.03}deg)`;
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.5 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (event: PointerEvent) => {
      const box = list.getBoundingClientRect();
      targetX = event.clientX - box.left;
      targetY = event.clientY - box.top;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    list.addEventListener("pointermove", onMove);
    return () => {
      list.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="services" className="scroll-mt-24 bg-cream py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            index="01"
            align="left"
            eyebrow={copy.eyebrow[lang]}
            title={copy.title[lang]}
            lead={copy.lead[lang]}
          />
        </Reveal>

        <div ref={listRef} className="relative mt-16" onPointerLeave={() => setHovered(null)}>
        <ol className="border-t border-blush">
          {site.services.map((service, index) => (
            <Reveal
              key={service.id}
              as="li"
              variant="slide"
              delay={index * 80}
              className="border-b border-blush"
            >
              <article
                onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(index)}
                className="group relative grid gap-x-8 gap-y-4 py-8 md:grid-cols-[3rem_1.3fr_1fr_auto] md:items-baseline md:py-10"
              >
                {/* พื้นหลังไล่ขึ้นจากล่างตอนชี้ */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[-1.25rem] inset-y-0 -z-10 origin-bottom scale-y-0 rounded-lg bg-shell/70 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[var(--ease-silk)] group-hover:scale-y-100"
                />

                <span className="font-display text-lg text-rose italic">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="font-display text-3xl font-light text-ink motion-safe:transition-[translate] motion-safe:duration-500 motion-safe:ease-[var(--ease-silk)] md:text-[2.6rem] md:group-hover:translate-x-3">
                    {service.name[lang]}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{service.desc[lang]}</p>
                </div>

                <ul className="space-y-2">
                  {service.includes.map((item) => (
                    <li key={item.en} className="flex gap-2.5 text-sm text-mauve">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rose" />
                      {item[lang]}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-baseline justify-between gap-4 md:flex-col md:items-end md:text-right">
                  <p className="font-display text-2xl text-clay">{service.price[lang]}</p>
                  <a
                    href="#booking"
                    data-service={service.id}
                    className="inline-flex items-center gap-1.5 text-sm text-mauve transition-colors hover:text-ink group-hover:text-ink"
                  >
                    {copy.ask[lang]}
                    {/* ทุกแถวใช้ข้อความลิงก์เดียวกัน — บอกชื่อแพ็กเกจให้โปรแกรมอ่านหน้าจอแยกออก */}
                    <span className="sr-only">: {service.name[lang]}</span>
                    <span aria-hidden="true" className="motion-safe:transition-[translate] motion-safe:group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>

          {/* รูปที่ลอยตามเมาส์ — แสดงเฉพาะจอที่มีเมาส์ */}
          <div
            ref={floatRef}
            aria-hidden="true"
            className={`pointer-events-none absolute top-0 left-0 z-20 hidden h-72 w-56 [@media(hover:hover)_and_(pointer:fine)]:lg:block ${
              hovered === null ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300`}
          >
            <div
              className={`relative h-full w-full overflow-hidden rounded-2xl shadow-[0_30px_60px_-25px_rgba(61,48,51,0.6)] transition-[scale] duration-500 ease-[var(--ease-silk)] ${
                hovered === null ? "scale-75" : "scale-100"
              }`}
            >
              {site.services.map((service, index) => (
                <Image
                  key={service.id}
                  src={service.image}
                  alt=""
                  fill
                  sizes="14rem"
                  className={`object-cover transition-[opacity,scale] duration-500 ease-[var(--ease-silk)] ${
                    hovered === index ? "scale-100 opacity-100" : "scale-110 opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
