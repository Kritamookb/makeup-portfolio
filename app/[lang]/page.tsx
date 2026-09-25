import { notFound } from "next/navigation";
import About from "@/components/About";
import Booking from "@/components/Booking";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MobileCta from "@/components/MobileCta";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import { isLang } from "@/lib/i18n";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <Services lang={lang} />
        <Gallery lang={lang} />
        <About lang={lang} />
        <Process lang={lang} />
        <Testimonials lang={lang} />
        <Faq lang={lang} />
        <Booking lang={lang} />
      </main>
      <Footer lang={lang} />
      <MobileCta lang={lang} />
    </>
  );
}
