import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  // hreflang ระหว่าง /th กับ /en (และ x-default) ให้ตรงกับ <link rel="alternate"> ในหน้า
  const languages = {
    th: `${site.seo.url}/th`,
    en: `${site.seo.url}/en`,
    "x-default": site.seo.url,
  };

  return locales.map((lang) => ({
    url: `${site.seo.url}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "th" ? 1 : 0.9,
    alternates: { languages },
  }));
}
