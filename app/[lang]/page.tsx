import { notFound } from "next/navigation";
import About from "@/components/About";
import BeforeAfter from "@/components/BeforeAfter";
import Booking from "@/components/Booking";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import MobileCta from "@/components/MobileCta";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Story from "@/components/Story";
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
        <Marquee lang={lang} />
        <Services lang={lang} />
        <Gallery lang={lang} />
        <BeforeAfter lang={lang} />
        <Story lang={lang} />
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
