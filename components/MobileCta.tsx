import { primaryChat, telHref } from "@/lib/links";
import type { Lang } from "@/lib/i18n";

/** แถบติดต่อค้างล่างจอบนมือถือ — จุดที่ปิดการขายได้มากที่สุด */
export default function MobileCta({ lang }: { lang: Lang }) {
  return (
    <div data-location="mobile-bar" className="fixed inset-x-0 bottom-0 z-40 border-t pb-[env(safe-area-inset-bottom)] border-blush bg-cream/95 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-3 divide-x divide-blush/70 text-center text-xs">
        <a href={telHref} className="py-3.5 text-mauve">
          {lang === "th" ? "โทร" : "Call"}
        </a>
        <a href={primaryChat(lang).href} target="_blank" rel="noopener noreferrer" className="py-3.5 text-mauve">
          {primaryChat(lang).label}
        </a>
        <a href="#booking" className="bg-ink py-3.5 font-medium text-cream">
          {lang === "th" ? "จองคิว" : "Book"}
        </a>
      </div>
    </div>
  );
}
