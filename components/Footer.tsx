import CurrentYear from "@/components/CurrentYear";
import { site } from "@/content/site";
import {
  facebookHref,
  instagramHref,
  lineDisplay,
  lineHref,
  mailtoHref,
  telHref,
  whatsappHref,
} from "@/lib/links";
import type { Lang } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-blush/60 bg-shell/70 pt-14 pb-[calc(7rem+env(safe-area-inset-bottom))] md:pb-14">
      <div className="container-x grid gap-10 md:grid-cols-3">
        <div>
          <span className="font-display text-[1.7rem] text-ink">
            {site.brand.logo.lead}
            <span className="font-light text-clay">{site.brand.logo.trail}</span>
          </span>
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
                LINE · {lineDisplay}
              </a>
            </li>
            <li>
              <a className="hover:text-ink" href={whatsappHref(lang)} target="_blank" rel="noopener noreferrer">
                WhatsApp · {site.contact.whatsappDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-12 border-t border-blush/60 pt-6 text-xs text-muted">
        © <CurrentYear initial={new Date().getFullYear()} /> {site.brand.full[lang]}
      </div>
    </footer>
  );
}
