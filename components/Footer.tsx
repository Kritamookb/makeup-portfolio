import { site } from "@/content/site";
import { facebookHref, instagramHref, lineHref, mailtoHref, telHref } from "@/lib/links";
import type { Lang } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-blush/60 bg-shell/70 pt-14 pb-28 md:pb-14">
      <div className="container-x grid gap-10 md:grid-cols-3">
        <div>
          <span className="font-display text-2xl tracking-[0.3em] text-ink">{site.brand.name}</span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {site.brand.tagline[lang]} · {site.contact.area[lang]}
          </p>
        </div>

        <div>
          <p className="eyebrow">{lang === "th" ? "ติดต่อ" : "Contact"}</p>
          <ul className="mt-4 space-y-2 text-sm text-mauve">
            <li>
              <a className="hover:text-ink" href={telHref}>
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="hover:text-ink" href={mailtoHref(lang)}>
                {site.contact.email}
              </a>
            </li>
            <li>{site.contact.hours[lang]}</li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">{lang === "th" ? "ติดตาม" : "Follow"}</p>
          <ul className="mt-4 space-y-2 text-sm text-mauve">
            <li>
              <a className="hover:text-ink" href={instagramHref} target="_blank" rel="noopener noreferrer">
                Instagram · @{site.contact.instagram}
              </a>
            </li>
            <li>
              <a className="hover:text-ink" href={facebookHref} target="_blank" rel="noopener noreferrer">
                Facebook · {site.contact.facebook}
              </a>
            </li>
            <li>
              <a className="hover:text-ink" href={lineHref} target="_blank" rel="noopener noreferrer">
                LINE · @{site.contact.lineId}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-12 border-t border-blush/60 pt-6 text-xs text-muted">
        © {year} {site.brand.full[lang]}
      </div>
    </footer>
  );
}
