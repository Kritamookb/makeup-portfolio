"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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

const WIDE = "(min-width: 768px)";

function subscribeWide(callback: () => void) {
  const query = window.matchMedia(WIDE);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

/** รายการบริการแบบเมนูร้าน — จอที่มีเมาส์จะมีรูปลอยตามเคอร์เซอร์ตอนชี้แต่ละแถว */
export default function Services({ lang }: { lang: Lang }) {
  const [hovered, setHovered] = useState<number | null>(null);
  // มือถือเปิดได้ทีละแถว — แถวแรกเปิดไว้ให้เห็นว่ากดขยายได้ · จอใหญ่เปิดหมดเสมอ (ดู md:contents ด้านล่าง)
  const [openRow, setOpenRow] = useState<number | null>(0);
  // ฝั่งเซิร์ฟเวอร์ถือว่าเป็นมือถือ (มีปุ่ม) — จอใหญ่ CSS แสดงทุกแถวอยู่แล้ว เลยไม่กระพริบ
  const wide = useSyncExternalStore(subscribeWide, () => window.matchMedia(WIDE).matches, () => false);
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
                className="service-row group relative py-6 md:py-10"
              >
                {/* พื้นหลังไล่ขึ้นจากล่างตอนชี้ */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[-1.25rem] inset-y-0 -z-10 origin-bottom scale-y-0 rounded-lg bg-shell/70 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[var(--ease-silk)] group-hover:scale-y-100"
                />

                <span className="font-display text-lg text-rose italic [grid-area:num]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="font-display text-[1.7rem] leading-tight font-light text-ink [grid-area:name] motion-safe:transition-[translate] motion-safe:duration-500 motion-safe:ease-[var(--ease-silk)] md:text-[2.6rem] md:group-hover:translate-x-3">
                  {wide ? (
                    service.name[lang]
                  ) : (
                    // มือถือ: แตะทั้งแถวเพื่อเปิด/ปิด (after: ขยายพื้นที่กดให้เต็มแถว)
                    <button
                      type="button"
                      onClick={() => setOpenRow(openRow === index ? null : index)}
                      aria-expanded={openRow === index}
                      aria-controls={`service-${service.id}`}
                      className="text-left after:absolute after:inset-0"
                    >
                      {service.name[lang]}
                    </button>
                  )}
                </h3>

                <p className="mt-1 font-display text-xl text-clay [grid-area:price] md:mt-0 md:justify-self-end md:text-right md:text-2xl">
                  {service.price[lang]}
                </p>

                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 items-center justify-center self-center rounded-full border border-blush text-lg text-rose [grid-area:icon] motion-safe:transition-[rotate,background-color] motion-safe:duration-500 md:hidden ${
                    openRow === index ? "rotate-45 bg-shell" : ""
                  }`}
                >
                  +
                </span>

                {/* มือถือ: กล่องเดียวที่ซ่อน/เปิด · จอใหญ่: display:contents ให้ลูกแต่ละชิ้นไปลงช่องของตัวเองในกริด */}
                <div
                  id={`service-${service.id}`}
                  className={`[grid-area:body] md:contents ${
                    openRow === index ? "block motion-safe:animate-[intro-fade_0.6s_var(--ease-silk)_both]" : "hidden"
                  }`}
                >
                  <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-xl md:hidden">
                    <Image src={service.image} alt="" fill sizes="90vw" className="object-cover" />
                  </div>

                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:mt-0 md:[grid-area:desc]">
                    {service.desc[lang]}
                  </p>

                  <ul className="mt-4 space-y-2 md:mt-0 md:[grid-area:inc]">
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
                    className="relative z-10 mt-5 inline-flex items-center gap-1.5 text-sm text-clay transition-colors hover:text-ink group-hover:text-ink md:mt-0 md:justify-self-end md:text-mauve md:[grid-area:ask]"
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
