import { PODS, PROTOCOL_STATS } from "@/lib/data";
import { usd } from "@/lib/format";
import { ButtonArrow, ButtonGlass, Sparkline, StatTile } from "@/components/ui";
import { RevealWords } from "@/components/site/Reveal";
import { PodTicker } from "@/components/site/Marquee";

function HeroCard({ slug, className, delay }: { slug: string; className: string; delay: string }) {
  const pod = PODS.find((p) => p.slug === slug)!;
  return (
    <div className={`animate-card-float absolute ${className}`} style={{ animationDelay: delay }}>
      <div className="card-shadow-lg w-52 rounded-2xl bg-white/95 p-4 ring-4 ring-white/25 backdrop-blur-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-display text-foreground text-sm font-semibold">{pod.ticker}</p>
            <p className="text-foreground-subtle mt-0.5 text-[11px]">{pod.underlying}</p>
          </div>
          <span className="bg-pod-soft text-pod-deep rounded-full px-2 py-0.5 text-[10px] font-semibold">
            LVF
          </span>
        </div>
        <p className="tabular text-up mt-3 text-2xl font-semibold">{pod.lvfApy.toFixed(1)}%</p>
        <div className="mt-1">
          <Sparkline seed={pod.slug} positive width={176} height={30} />
        </div>
        <div className="text-foreground-subtle mt-2 flex justify-between text-[11px]">
          <span>TVL</span>
          <span className="tabular text-foreground-muted">{usd(pod.tvl)}</span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="deep-surface relative min-h-svh overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(70% 45% at 50% 0%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 45%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Floating pod cards */}
      <div className="pointer-events-none absolute inset-0 z-[6] hidden lg:block" aria-hidden="true">
        <HeroCard slug="pnvda" className="top-[16%] left-[3%]" delay="0s" />
        <HeroCard slug="pgme" className="top-[52%] left-[7%]" delay="-2.6s" />
        <HeroCard slug="pmag7" className="top-[19%] right-[3%]" delay="-1.3s" />
        <HeroCard slug="pspacex" className="top-[56%] right-[6%]" delay="-3.9s" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-4 pt-32 pb-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="animate-word-reveal mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
            <span className="bg-pod animate-glow-breathe h-1.5 w-1.5 rounded-full" />
            Built on Robinhood Chain · 143 pods live
          </span>

          <h1 className="text-[clamp(2.1rem,3.1vh+1.9vw,4.4rem)] leading-[102%] font-semibold tracking-[-0.035em] text-white">
            <RevealWords text={"Volatility is a commodity."} delay={80} />
            <br />
            <span className="text-duo-gradient">
              <RevealWords text={"Wall Street makes it for free."} delay={420} />
            </span>
          </h1>

          <p
            className="animate-word-reveal mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
            style={{ animationDelay: "900ms" }}
          >
            Ponspods wraps tokenized stocks into Pods, then charges a toll on every arbitrage the
            real market forces through them. Earnings, opex, the Monday gap — scheduled volatility,
            harvested as real yield. No emissions, ever.
          </p>

          <div
            className="animate-word-reveal mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "1050ms" }}
          >
            <ButtonArrow href="/app">Open the app</ButtonArrow>
            <ButtonGlass href="#how">See how it works</ButtonGlass>
          </div>
        </div>

        <div
          className="animate-word-reveal mx-auto mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          style={{ animationDelay: "1200ms" }}
        >
          <StatTile tone="light" label="Total value locked" value={usd(PROTOCOL_STATS.tvl)} />
          <StatTile tone="light" label="Fees generated" value={usd(PROTOCOL_STATS.fees)} />
          <StatTile tone="light" label="Paid to LPs" value={usd(PROTOCOL_STATS.yield)} />
          <StatTile
            tone="light"
            label="Value burned"
            value={usd(PROTOCOL_STATS.burned)}
            sub={`${PROTOCOL_STATS.burnedTokens.toLocaleString("en-US")} pTKN`}
          />
        </div>

        <div className="mt-12 flex justify-center">
          <span className="animate-scroll-down flex flex-col items-center gap-1.5 text-white/50">
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 3v10M4 9l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <PodTicker tone="dark" />
      </div>
    </section>
  );
}
