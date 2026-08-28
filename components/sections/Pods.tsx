import { BrandChip, BrandCluster, Eyebrow, Section } from "@/components/ui";
import { PODS } from "@/lib/pods";

export function Pods() {
  return (
    <Section id="pods">
      <div className="max-w-3xl">
        <Eyebrow>The line-up</Eyebrow>
        <h2 className="text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.06] font-extrabold tracking-[-0.03em]">
          Same machine, one per stock.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-white/60">
          Pick the volatility you actually want to be paid for. More Pods can be deployed by anyone,
          on any tokenized asset, without asking us.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PODS.map((pod) => (
          <div key={pod.slug} className="card-shell">
            <div className="card-inner flex h-full flex-col p-8">
              <div className="flex items-center justify-between gap-4">
                {pod.brands.length > 1 ? (
                  <BrandCluster brands={pod.brands.slice(0, 4)} size={40} />
                ) : (
                  <BrandChip brand={pod.brands[0]} size={60} />
                )}
                <span className="chip-lime px-3 py-1.5 text-[11px] font-extrabold tracking-[0.12em] uppercase">
                  {pod.tag}
                </span>
              </div>

              <h3 className="mt-7 text-3xl font-extrabold tracking-[-0.02em]">{pod.ticker}</h3>
              <p className="mt-1.5 text-base font-semibold text-white/45">{pod.company}</p>
              <p className="mt-5 text-base leading-relaxed text-white/60">{pod.line}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
