import { ButtonArrow, ButtonGlass } from "@/components/ui";
import { Reveal } from "@/components/site/Reveal";

export function Cta() {
  return (
    <section className="px-4 pb-24 sm:px-6 md:pb-32">
      <Reveal>
        <div className="deep-surface card-shadow-lg relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-20 text-center sm:px-10 md:py-28">
          <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 100%, rgba(18,185,129,0.22) 0%, rgba(0,0,0,0) 70%)",
            }}
          />
          <div className="relative">
            <span className="animate-glow-breathe mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
              The market opens in 14 hours
            </span>
            <h2 className="mx-auto max-w-3xl text-[clamp(1.9rem,1.4vh+2.3vw,3.5rem)] leading-[104%] font-semibold text-white">
              Somebody is going to get paid for that volatility.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
              Wrap an asset, farm the gap, lever the fee flow. It costs nothing to look at the pods.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonArrow href="/app">Open the app</ButtonArrow>
              <ButtonGlass href="/app/create">Create a pod</ButtonGlass>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
