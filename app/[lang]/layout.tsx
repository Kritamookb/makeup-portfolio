import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../globals.css";
import Analytics from "@/components/Analytics";
import { site } from "@/content/site";
import { isLang, locales, type Lang } from "@/lib/i18n";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const notoSerifThai = Noto_Serif_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-serif-thai",
  display: "swap",
});

const plexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex-thai",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const title = site.seo.title[lang];
  const description = site.seo.description[lang];

  return {
    metadataBase: new URL(site.seo.url),
    title,
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: { th: "/th", en: "/en" },
    },
    openGraph: {
      type: "website",
      locale: lang === "th" ? "th_TH" : "en_US",
      url: `${site.seo.url}/${lang}`,
      siteName: site.brand.full[lang],
      title,
      description,
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: site.brand.full[lang] }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/images/og.jpg"] },
  };
}

/** ข้อมูลธุรกิจสำหรับ Google — ช่วยให้ขึ้นผลค้นหาแบบมีดาวและพื้นที่ให้บริการ */
function businessJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: site.brand.full[lang],
    description: site.seo.description[lang],
    url: `${site.seo.url}/${lang}`,
    image: `${site.seo.url}/images/og.jpg`,
    telephone: site.contact.phone,
    email: site.contact.email,
    priceRange: "฿฿฿",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Phuket",
      addressRegion: "Phuket",
      addressCountry: "TH",
    },
    areaServed: ["Phuket", "Phang Nga", "Krabi"],
    sameAs: [site.contact.instagramUrl, site.contact.facebookUrl],
    ...(site.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: site.rating.value,
            reviewCount: site.rating.count,
          },
        }
      : {}),
    makesOffer: site.services.map((service) => ({
      "@type": "Offer",
      name: service.name[lang],
      description: service.desc[lang],
      priceSpecification: {
        "@type": "PriceSpecification",
        ...("fromPrice" in service ? { minPrice: service.amount } : { price: service.amount }),
        priceCurrency: "THB",
      },
    })),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  // path ภาษาที่ไม่รู้จักปล่อยให้ page.tsx เรียก notFound() เอง
  // ถ้า throw ตรงนี้ not-found.tsx ของ segment เดียวกันจะไม่ถูกใช้
  const lang: Lang = isLang(raw) ? raw : "th";

  // ยังไม่ได้ตั้งค่า = ไม่โหลดสคริปต์ GA เลย เว็บก็ยังทำงานปกติ
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang={lang} className={`${cormorant.variable} ${notoSerifThai.variable} ${plexThai.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd(lang)) }}
        />
        {children}
        <Analytics />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
