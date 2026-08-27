import { PODS } from "@/lib/data";
import { ButtonArrow, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/site/Reveal";
import { PodCard } from "@/components/app/PodCard";

export function PodsShowcase() {
  const featured = ["pgme", "pnvda", "pmag7", "pspacex", "pmeme", "ptbill"];
  const pods = featured.map((s) => PODS.find((p) => p.slug === s)!);

  return (
    <section id="pods" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Live pods</Eyebrow>
            <h2 className="text-[clamp(1.8rem,1.2vh+2.1vw,3.1rem)] leading-[105%] font-semibold">
              From a 3-month T-Bill to the most volatile basket on earth.
            </h2>
            <p className="text-foreground-muted mt-5 text-base leading-relaxed">
              Every pod is the same machine with a different fuel. Pick the volatility you actually
              want to be paid for.
            </p>
          </div>
          <ButtonArrow href="/app" tone="accent" className="shrink-0">
            Browse all 143 pods
          </ButtonArrow>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pods.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <PodCard pod={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
