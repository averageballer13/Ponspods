import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/site/Reveal";

const LOOP = [
  {
    n: "01",
    t: "Wall Street moves",
    d: "Earnings, macro prints, opex, the closing bell. Volatility is manufactured off-chain, for free.",
  },
  {
    n: "02",
    t: "Arbitrage pays the pod",
    d: "Someone has to realign pTKN with NAV. Every realignment routes through the pod and pays wrap, unwrap and AMM fees.",
  },
  {
    n: "03",
    t: "LPs get paid, supply burns",
    d: "Fees split between LP rewards, pTKN burns and protocol revenue. Burns push CBR up permanently.",
  },
  {
    n: "04",
    t: "Deeper pods, tighter arb",
    d: "Higher yield draws liquidity, deeper pools make arbitrage cheaper, so arbitrage happens more often.",
  },
  {
    n: "05",
    t: "Revenue buys PONS",
    d: "Protocol revenue is used to buy PONS and fund vlPODS, whose holders direct metavault liquidity back into the best pods.",
  },
];

export function Flywheel() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <Eyebrow>The flywheel</Eyebrow>
          <h2 className="text-[clamp(1.8rem,1.2vh+2.1vw,3.1rem)] leading-[105%] font-semibold">
            Nothing in this loop requires a single new token to be printed.
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="grid gap-4 lg:grid-cols-5">
            {LOOP.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="border-border bg-background-elevated card-shadow hover:border-accent-blue/45 relative h-full rounded-2xl border p-5 transition-[transform,border-color] duration-300 hover:-translate-y-1">
                  <span className="tabular text-accent-blue text-xs font-semibold">{s.n}</span>
                  <p className="font-display text-foreground mt-2.5 font-semibold">{s.t}</p>
                  <p className="text-foreground-muted mt-2 text-sm leading-relaxed">{s.d}</p>
                  {i < LOOP.length - 1 ? (
                    <span
                      className="text-border absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 lg:block"
                      aria-hidden="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={420}>
            <div className="mt-4 hidden lg:block">
              <svg viewBox="0 0 1200 60" className="w-full" aria-hidden="true">
                <defs>
                  <marker id="loopArrow" markerWidth="9" markerHeight="9" refX="4" refY="4.5" orient="auto">
                    <path d="M0,0 L9,4.5 L0,9 Z" fill="#12b981" />
                  </marker>
                  <linearGradient id="loopGrad" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stopColor="#3b76e0" />
                    <stop offset="100%" stopColor="#12b981" />
                  </linearGradient>
                </defs>
                <path
                  d="M1080,4 C1080,44 1080,52 1000,52 L200,52 C120,52 120,44 120,14"
                  fill="none"
                  stroke="url(#loopGrad)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  markerEnd="url(#loopArrow)"
                />
                <text x="600" y="46" textAnchor="middle" fontSize="12" fill="#44607f">
                  more liquidity, more pods, more arbitrage — the loop closes on itself
                </text>
              </svg>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            {
              t: "PODS",
              s: "Fee token",
              d: "Fixed supply, no emissions. Protocol revenue buys it from the market and routes it to the treasury and to burns.",
            },
            {
              t: "vlPODS",
              s: "Governance",
              d: "Lock PODS to vote on pod whitelisting, metavault allocation and fee splits. Locked voters take a cut of protocol revenue in USDG.",
            },
            {
              t: "pPODS",
              s: "The pod of the pod",
              d: "The governance token wrapped into its own pod. Revenue burns pPODS, so CBR rises for everyone who never unwrapped.",
            },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 90}>
              <div className="deep-surface relative h-full overflow-hidden rounded-2xl p-6">
                <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="relative">
                  <p className="font-display text-xl font-semibold text-white">{c.t}</p>
                  <p className="mt-1 text-xs text-white/50">{c.s}</p>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">{c.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
