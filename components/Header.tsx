"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { primaryChat } from "@/lib/links";
import { jumpToTop } from "@/lib/motion";
import { other, type Lang } from "@/lib/i18n";

const NAV = [
  { href: "#services", label: { th: "บริการ", en: "Services" } },
  { href: "#portfolio", label: { th: "ผลงาน", en: "Portfolio" } },
  { href: "#about", label: { th: "เกี่ยวกับช่าง", en: "About" } },
  { href: "#reviews", label: { th: "รีวิว", en: "Reviews" } },
  { href: "#faq", label: { th: "คำถามที่พบบ่อย", en: "FAQ" } },
] as const;

export default function Header({ lang }: { lang: Lang }) {
  const [scrolled, setScrolled] = useState(false);
  // เลื่อนลงซ่อนแถบ เลื่อนขึ้นโผล่กลับ — รูปได้พื้นที่เต็มจอตอนดูผลงาน
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 480);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,translate] duration-500 ease-[var(--ease-silk)] ${
        hidden && !open ? "motion-safe:-translate-y-full" : ""
      } ${
        scrolled || open
          ? "bg-cream/90 shadow-[0_1px_0_rgba(184,124,115,0.18)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href={`/${lang}`} className="group flex flex-col leading-none">
          <span className="font-display text-2xl text-ink md:text-[1.7rem]">
            {site.brand.logo.lead}
            <span className="font-light text-clay">{site.brand.logo.trail}</span>
          </span>
          <span className="mt-1 text-[0.6rem] tracking-[0.25em] text-clay uppercase">
            Phuket
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={lang === "th" ? "เมนูหลัก" : "Main"}>
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm text-mauve transition-colors hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-rose motion-safe:after:transition-[width] hover:after:w-full"
            >
              {item.label[lang]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href={`/${other(lang)}`}
            scroll={false}
            onClick={jumpToTop}
            hrefLang={other(lang)}
            lang={other(lang)}
            className="rounded-full border border-blush px-3 py-1.5 text-xs tracking-wider text-mauve th:tracking-normal press hover:border-rose hover:text-ink"
            aria-label={lang === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
          >
            {lang === "th" ? "EN" : "ไทย"}
          </Link>

          <a
            href="#booking"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-sm text-cream press hover:bg-clay sm:inline-block"
          >
            {lang === "th" ? "จองคิว" : "Book now"}
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blush text-ink press lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={lang === "th" ? "เมนู" : "Menu"}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-px w-full bg-current motion-safe:transition-[top,rotate] ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current motion-safe:transition-[top,rotate] ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-blush/50 bg-cream/95 backdrop-blur-md lg:hidden"
      >
        <nav className="container-x flex flex-col py-4" aria-label={lang === "th" ? "เมนูมือถือ" : "Mobile menu"}>
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-blush/40 py-3 text-base text-mauve last:border-0"
            >
              {item.label[lang]}
            </a>
          ))}
          <div className="mt-4 flex gap-3">
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-ink px-5 py-3 text-center text-sm text-cream press"
            >
              {lang === "th" ? "จองคิว" : "Book now"}
            </a>
            <a
              href={primaryChat(lang).href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full border border-clay px-5 py-3 text-center text-sm text-clay press"
            >
              {primaryChat(lang).label}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
