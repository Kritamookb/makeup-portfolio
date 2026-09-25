"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { lineHref } from "@/lib/links";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-cream/90 shadow-[0_1px_0_rgba(184,124,115,0.18)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href={`/${lang}`} className="group flex flex-col leading-none">
          <span className="font-display text-xl tracking-[0.3em] text-ink md:text-2xl">
            {site.brand.name}
          </span>
          <span className="mt-1 text-[0.6rem] tracking-[0.2em] text-clay uppercase">
            Makeup Artist
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm text-mauve transition-colors hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-rose after:transition-all hover:after:w-full"
            >
              {item.label[lang]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href={`/${other(lang)}`}
            className="rounded-full border border-blush px-3 py-1.5 text-xs tracking-wider text-mauve transition-colors hover:border-rose hover:text-ink"
            aria-label={lang === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
          >
            {lang === "th" ? "EN" : "ไทย"}
          </Link>

          <a
            href="#booking"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-sm text-cream transition-colors hover:bg-clay sm:inline-block"
          >
            {lang === "th" ? "จองคิว" : "Book now"}
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-blush text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={lang === "th" ? "เมนู" : "Menu"}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all ${
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
        <nav className="container-x flex flex-col py-4" aria-label="Mobile">
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
              className="flex-1 rounded-full bg-ink px-5 py-3 text-center text-sm text-cream"
            >
              {lang === "th" ? "จองคิว" : "Book now"}
            </a>
            <a
              href={lineHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full border border-clay px-5 py-3 text-center text-sm text-clay"
            >
              LINE
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
