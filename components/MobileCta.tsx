import { lineHref, telHref } from "@/lib/links";
import type { Lang } from "@/lib/i18n";

/** แถบติดต่อค้างล่างจอบนมือถือ — จุดที่ปิดการขายได้มากที่สุด */
export default function MobileCta({ lang }: { lang: Lang }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-blush bg-cream/95 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-3 divide-x divide-blush/70 text-center text-xs">
        <a href={telHref} className="py-3.5 text-mauve">
          {lang === "th" ? "โทร" : "Call"}
        </a>
        <a href={lineHref} target="_blank" rel="noopener noreferrer" className="py-3.5 text-mauve">
          LINE
        </a>
        <a href="#booking" className="bg-ink py-3.5 font-medium text-cream">
          {lang === "th" ? "จองคิว" : "Book"}
        </a>
      </div>
    </div>
  );
}
