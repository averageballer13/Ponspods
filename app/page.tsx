import { PageBackground } from "@/components/visual/PageBackground";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { How } from "@/components/sections/How";
import { Why } from "@/components/sections/Why";
import { Pods } from "@/components/sections/Pods";
import { Marquee } from "@/components/sections/Marquee";
import { Cta } from "@/components/sections/Cta";

export default function Home() {
  return (
    <>
      <PageBackground />
      <Header />
      <main>
        <Hero />
        <How />
        <Why />
        <Pods />
        <Marquee />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
