import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/site/Reveal";

const PRICE =
  "M0,172 L30,168 L60,175 L90,170 L130,158 L170,150 L210,139 L250,143 L290,121 L330,113 L370,125 L410,110 L450,117 L470,119 L488,170 L510,166 L540,173 L570,164 L600,170 L630,166";

const GAP_AREA =
  "M90,170 L130,158 L170,150 L210,139 L250,143 L290,121 L330,113 L370,125 L410,110 L450,117 L470,119 L470,170 Z";

function GapChart() {
  return (
    <svg viewBox="0 0 640 300" className="w-full" role="img" aria-label="Session gap diagram">
      <defs>
        <linearGradient id="gapfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b76e0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#12b981" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="pricestroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b76e0" />
          <stop offset="100%" stopColor="#12b981" />
        </linearGradient>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#3b76e0" />
        </marker>
      </defs>

      {/* session backgrounds */}
      <rect x="0" y="40" width="90" height="200" fill="#12b981" opacity="0.07" />
      <rect x="90" y="40" width="380" height="200" fill="#0f2036" opacity="0.045" />
      <rect x="470" y="40" width="170" height="200" fill="#12b981" opacity="0.07" />

      {/* session labels */}
      <text x="45" y="30" textAnchor="middle" fontSize="10" fill="#7089a6" letterSpacing="1.4">
        OPEN
      </text>
      <text x="280" y="30" textAnchor="middle" fontSize="10" fill="#7089a6" letterSpacing="1.4">
        MARKET CLOSED — NAV FROZEN
      </text>
      <text x="555" y="30" textAnchor="middle" fontSize="10" fill="#7089a6" letterSpacing="1.4">
        OPEN
      </text>

      {/* gap area */}
      <path d={GAP_AREA} fill="url(#gapfill)" />

      {/* NAV reference */}
      <line x1="0" y1="170" x2="640" y2="170" stroke="#7089a6" strokeWidth="1.4" strokeDasharray="5 5" />
      <text x="8" y="186" fontSize="10.5" fill="#44607f">
        Nasdaq reference price
      </text>

      {/* on-chain price */}
      <path d={PRICE} fill="none" stroke="url(#pricestroke)" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" />

      {/* markers */}
      <line x1="90" y1="40" x2="90" y2="240" stroke="#bdd5ee" strokeWidth="1" />
      <line x1="470" y1="40" x2="470" y2="240" stroke="#bdd5ee" strokeWidth="1" />
      <text x="94" y="255" fontSize="10.5" fill="#44607f">
        Fri 16:00
      </text>
      <text x="466" y="255" fontSize="10.5" fill="#44607f" textAnchor="end">
        Mon 09:30
      </text>

      {/* drift callout */}
      <text x="280" y="96" textAnchor="middle" fontSize="11.5" fill="#3b76e0" fontWeight="600">
        on-chain price drifts freely
      </text>

      {/* corrective arb arrow */}
      <line x1="479" y1="124" x2="479" y2="160" stroke="#3b76e0" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="492" y="146" fontSize="11.5" fill="#0f2036" fontWeight="600">
        corrective arbitrage
      </text>
      <text x="492" y="161" fontSize="10.5" fill="#44607f">
        = pod fees, every Monday
      </text>

      {/* fee ticks */}
      {[130, 210, 290, 370, 450].map((x, i) => (
        <circle key={x} cx={x} cy={[158, 139, 121, 125, 117][i]} r="3.4" fill="#12b981" stroke="#fff" strokeWidth="1.6" />
      ))}
      <text x="8" y="284" fontSize="10.5" fill="#7089a6">
        Each dot: an arbitrageur paying the AMM fee plus the closed-session gap premium
      </text>
    </svg>
  );
}

const CARDS = [
  {
    title: "The weekend gap",
    stat: "104× / year",
    body: "The closing bell freezes the reference price for 65 hours while the token keeps trading. Monday reopens with a correction that has to route through the pod.",
  },
  {
    title: "The earnings gap",
    stat: "+320% vol",
    body: "Results land after the close. By the time the market reopens, the pod has already priced the move twice and charged for both.",
  },
  {
    title: "The gap premium",
    stat: "+0.05–0.45%",
    body: "Ponspods widens the AMM fee automatically while the underlying market is closed, so LPs are paid for stale-price risk rather than picked off by it.",
  },
];

export function GapEngine() {
  return (
    <section className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <Reveal>
            <Eyebrow>The signature mechanic</Eyebrow>
            <h2 className="text-[clamp(1.8rem,1.2vh+2.1vw,3.1rem)] leading-[105%] font-semibold">
              Farm the gap.
            </h2>
            <p className="text-foreground-muted mt-5 text-base leading-relaxed sm:text-lg">
              A tokenized stock trades 24/7. The company it represents does not. Between Friday
              close and Monday open there are sixty-five hours where the on-chain price wanders and
              the reference price cannot move — and every hour of that wandering has to be paid back
              through the pod at the open.
            </p>
            <p className="text-foreground mt-4 text-base leading-relaxed font-medium">
              This is a fee source that no crypto-native pod can ever have, because crypto never
              closes.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="border-border bg-background-elevated card-shadow-lg rounded-3xl border p-5 sm:p-7">
              <GapChart />
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <div className="border-border bg-background-elevated card-shadow hover:border-accent-blue/45 h-full rounded-2xl border p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1">
                <p className="tabular text-duo-gradient text-2xl font-semibold">{c.stat}</p>
                <p className="font-display text-foreground mt-3 font-semibold">{c.title}</p>
                <p className="text-foreground-muted mt-2 text-sm leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
