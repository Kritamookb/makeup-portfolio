"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/content/site";
import type { Lang } from "@/lib/i18n";

const copy = {
  eyebrow: { th: "ผลงาน", en: "Portfolio" },
  title: { th: "ผลงานที่ผ่านมา", en: "Selected work" },
  lead: {
    th: "ลุคเจ้าสาว เพื่อนเจ้าสาว และงานถ่ายแบบ — กดที่รูปเพื่อดูขนาดเต็ม",
    en: "Brides, bridesmaids and editorial looks — tap any image to enlarge.",
  },
  close: { th: "ปิด", en: "Close" },
  prev: { th: "รูปก่อนหน้า", en: "Previous image" },
  next: { th: "รูปถัดไป", en: "Next image" },
  more: { th: "ดูผลงานทั้งหมดบนอินสตาแกรม", en: "See more work on Instagram" },
};

export default function Gallery({ lang }: { lang: Lang }) {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = active !== null;

  const photos = site.gallery.filter((photo) => filter === "all" || photo.category === filter);
  // หมวดที่ยังไม่มีรูปไม่ต้องโชว์ปุ่ม กดแล้วจะเจอหน้าว่าง
  const filters = site.galleryFilters.filter(
    (item) => item.id === "all" || site.gallery.some((photo) => photo.category === item.id),
  );

  const step = useCallback(
    (delta: number) => {
      setActive((current) => {
        if (current === null) return current;
        return (current + delta + photos.length) % photos.length;
      });
    },
    [photos.length],
  );

  useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "Tab") keepFocusInside(event);
    };

    // กด Tab แล้ววนอยู่ในหน้าต่างรูป ไม่หลุดไปโดนปุ่มด้านหลัง
    const keepFocusInside = (event: KeyboardEvent) => {
      const buttons = dialogRef.current?.querySelectorAll<HTMLElement>("button");
      if (!buttons?.length) return;
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, step]);

  // เปิดแล้วย้ายโฟกัสเข้าหน้าต่าง ปิดแล้วคืนโฟกัสให้รูปที่กดเปิด
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => opener?.focus();
  }, [isOpen]);

  return (
    <section id="portfolio" className="scroll-mt-24 bg-cream py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow={copy.eyebrow[lang]}
            title={copy.title[lang]}
            lead={copy.lead[lang]}
          />
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setFilter(item.id);
                setActive(null);
              }}
              aria-pressed={filter === item.id}
              className={`rounded-full px-5 py-2 text-sm transition-colors ${
                filter === item.id
                  ? "bg-ink text-cream"
                  : "border border-blush text-mauve hover:border-rose hover:text-ink"
              }`}
            >
              {item.label[lang]}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <Reveal key={photo.src} delay={(index % 4) * 60}>
              <button
                type="button"
                onClick={() => setActive(index)}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-xl bg-shell"
              >
                <Image
                  src={photo.src}
                  alt={photo.caption[lang]}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-ink/0 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-left text-xs leading-snug text-cream">
                    {photo.caption[lang]}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center">
          <a
            href={`${site.contact.instagramUrl}?ref=website`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-clay underline decoration-blush underline-offset-4 transition-colors hover:text-ink"
          >
            {copy.more[lang]} · @{site.contact.instagram}
          </a>
        </p>
      </div>

      {active !== null ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={photos[active].caption[lang]}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setActive(null)}
            aria-label={copy.close[lang]}
            className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-xl text-cream transition-colors hover:bg-cream/10"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            aria-label={copy.prev[lang]}
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream/10 md:left-8"
          >
            ‹
          </button>

          <figure
            className="max-h-full w-full max-w-md"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <Image
                src={photos[active].src}
                alt={photos[active].caption[lang]}
                fill
                sizes="(max-width: 768px) 92vw, 28rem"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-cream/80">
              {photos[active].caption[lang]}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            aria-label={copy.next[lang]}
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:bg-cream/10 md:right-8"
          >
            ›
          </button>
        </div>
      ) : null}
    </section>
  );
}
