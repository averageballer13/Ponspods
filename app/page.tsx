import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Marquee } from "@/components/site/Marquee";
import { Hero } from "@/components/landing/Hero";
import { Thesis } from "@/components/landing/Thesis";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { GapEngine } from "@/components/landing/GapEngine";
import { PodsShowcase } from "@/components/landing/PodsShowcase";
import { VolatilityCalendar } from "@/components/landing/Calendar";
import { Flywheel } from "@/components/landing/Flywheel";
import { Faq } from "@/components/landing/Faq";
import { Cta } from "@/components/landing/Cta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Thesis />
        <HowItWorks />
        <GapEngine />
        <PodsShowcase />
        <VolatilityCalendar />
        <Flywheel />
        <Marquee />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
