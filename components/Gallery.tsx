"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/content/site";
import { motionOk } from "@/lib/motion";
import type { Lang } from "@/lib/i18n";

/** ชื่อ view-transition ที่ใช้ร่วมกันระหว่างรูปย่อกับรูปใน lightbox — ต้องมีได้ทีละหนึ่งชิ้นบนหน้า */
const PHOTO_TRANSITION = "gallery-photo";

const SHAPE = {
  tall: "aspect-[4/5]",
  square: "aspect-square",
  wide: "aspect-[3/2]",
} as const;

/** เปลี่ยน state ภายใน View Transition ถ้าเบราว์เซอร์รองรับ — ไม่รองรับก็เปลี่ยนทันที */
function transition(update: () => void) {
  if (!document.startViewTransition || !motionOk()) {
    update();
    return null;
  }
  return document.startViewTransition(() => flushSync(update));
}

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
  const thumbs = useRef(new Map<string, HTMLElement>());
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

  // รูปย่อขยายเป็นรูปใหญ่ — ย้ายชื่อ transition จากรูปย่อไปที่ lightbox ระหว่างเปลี่ยน
  const open = (index: number) => {
    const thumb = thumbs.current.get(photos[index].src);
    if (thumb) thumb.style.viewTransitionName = PHOTO_TRANSITION;
    transition(() => {
      if (thumb) thumb.style.viewTransitionName = "";
      setActive(index);
    });
  };

  const close = useCallback(() => {
    const thumb = active === null ? undefined : thumbs.current.get(photos[active].src);
    const running = transition(() => {
      setActive(null);
      if (thumb) thumb.style.viewTransitionName = PHOTO_TRANSITION;
    });
    const clear = () => {
      if (thumb) thumb.style.viewTransitionName = "";
    };
    if (running) running.finished.finally(clear);
    else clear();
  }, [active, photos]);

  const changeFilter = (id: string) => {
    if (id === filter) return;
    transition(() => {
      setFilter(id);
      setActive(null);
    });
  };

  useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
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
  }, [active, step, close]);

  // เปิดแล้วย้ายโฟกัสเข้าหน้าต่าง ปิดแล้วคืนโฟกัสให้รูปที่กดเปิด
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => opener?.focus();
  }, [isOpen]);

  return (
    <section id="portfolio" className="scroll-mt-24 bg-cream pt-6 pb-24 md:pt-10 md:pb-32">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              index="02"
              align="left"
              eyebrow={copy.eyebrow[lang]}
              title={copy.title[lang]}
              lead={copy.lead[lang]}
            />
          </Reveal>

          <div className="flex flex-wrap gap-x-6 gap-y-3" role="group" aria-label={copy.eyebrow[lang]}>
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => changeFilter(item.id)}
                aria-pressed={filter === item.id}
                className={`relative py-1 font-display text-xl italic transition-colors th:not-italic after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-clay motion-safe:after:transition-transform motion-safe:after:duration-500 ${
                  filter === item.id
                    ? "text-ink after:scale-x-100"
                    : "text-muted after:scale-x-0 hover:text-ink"
                }`}
              >
                {item.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* กริดแบบนิตยสาร — คอลัมน์สูงไม่เท่ากัน แต่ละรูปขนาดตาม shape ใน content/site.ts */}
        <div className="mt-14 columns-2 gap-3 sm:gap-5 lg:columns-3 [&>*]:mb-3 sm:[&>*]:mb-5">
          {photos.map((photo, index) => (
            <Reveal key={photo.src} variant="wipe" delay={(index % 3) * 90} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => open(index)}
                ref={(node) => {
                  if (node) thumbs.current.set(photo.src, node);
                  else thumbs.current.delete(photo.src);
                }}
                className={`group sheen relative block w-full overflow-hidden rounded-xl bg-shell outline outline-1 -outline-offset-1 outline-black/10 press ${SHAPE[photo.shape]}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.caption[lang]}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover motion-safe:transition-[scale] motion-safe:duration-[1.2s] motion-safe:ease-[var(--ease-silk)] motion-safe:group-hover:scale-[1.06]"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/75 to-transparent p-4 pt-12 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="translate-y-2 text-left text-sm leading-snug text-cream motion-safe:transition-[translate] motion-safe:duration-500 group-hover:translate-y-0">
                    {photo.caption[lang]}
                  </span>
                  <span aria-hidden="true" className="font-display text-sm text-cream/70 italic">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <p className="mt-12 text-center">
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
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
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
            className={`max-h-full w-full ${photos[active].shape === "wide" ? "max-w-3xl" : "max-w-md"}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className={`relative w-full overflow-hidden rounded-2xl outline outline-1 -outline-offset-1 outline-white/10 ${SHAPE[photos[active].shape]}`}
              style={{ viewTransitionName: PHOTO_TRANSITION }}
            >
              <Image
                key={photos[active].src}
                src={photos[active].src}
                alt={photos[active].caption[lang]}
                fill
                sizes="(max-width: 768px) 92vw, 36rem"
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
