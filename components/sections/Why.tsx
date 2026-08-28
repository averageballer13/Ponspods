import { Eyebrow, Section } from "@/components/ui";

const PRICE =
  "M0,150 L40,146 L80,154 L120,150 L170,132 L215,122 L260,104 L305,112 L350,86 L395,78 L440,96 L485,74 L520,80 L545,150 L580,144 L620,152 L660,146 L700,150";

const AREA =
  "M120,150 L170,132 L215,122 L260,104 L305,112 L350,86 L395,78 L440,96 L485,74 L520,80 L520,150 Z";

function GapChart() {
  return (
    <svg viewBox="0 0 700 220" className="w-full" role="img" aria-label="Weekend price gap">
      <defs>
        <linearGradient id="gapArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fe339" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#7fe339" stopOpacity="0.02" />
        </linearGradient>
        <marker id="snapArrow" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 Z" fill="#c5ef40" />
        </marker>
      </defs>

      {/* session bands */}
      <rect x="0" y="30" width="120" height="150" fill="#7fe339" opacity="0.07" rx="4" />
      <rect x="120" y="30" width="400" height="150" fill="#ffffff" opacity="0.035" rx="4" />
      <rect x="520" y="30" width="180" height="150" fill="#7fe339" opacity="0.07" rx="4" />

      <text x="60" y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#cef2cb">
        OPEN
      </text>
      <text x="320" y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#bababa">
        CLOSED
      </text>
      <text x="610" y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill="#cef2cb">
        OPEN
      </text>

      {/* the drift area */}
      <path d={AREA} fill="url(#gapArea)" />

      {/* frozen official price */}
      <line x1="0" y1="150" x2="700" y2="150" stroke="#bababa" strokeWidth="2" strokeDasharray="7 7" />
      <text x="6" y="172" fontSize="14" fill="#bababa">
        official price, frozen
      </text>

      {/* on-chain price */}
      <path d={PRICE} fill="none" stroke="#7fe339" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
      <text x="300" y="58" textAnchor="middle" fontSize="15" fontWeight="700" fill="#7fe339">
        the token keeps trading
      </text>

      {/* the snap back */}
      <line x1="534" y1="88" x2="534" y2="138" stroke="#c5ef40" strokeWidth="3" markerEnd="url(#snapArrow)" />
      <text x="552" y="118" fontSize="15" fontWeight="700" fill="#ffffff">
        it all snaps back
      </text>
      <text x="552" y="138" fontSize="14" fill="#cef2cb">
        through your Pod
      </text>

      {/* session dividers */}
      <line x1="120" y1="30" x2="120" y2="180" stroke="#4a7a3b" strokeWidth="1.5" />
      <line x1="520" y1="30" x2="520" y2="180" stroke="#4a7a3b" strokeWidth="1.5" />
      <text x="126" y="200" fontSize="14" fill="#ffffff">
        Friday close
      </text>
      <text x="514" y="200" fontSize="14" fill="#ffffff" textAnchor="end">
        Monday open
      </text>
    </svg>
  );
}

function CalendarArt() {
  return (
    <div className="flex gap-2.5">
      {[
        { d: "M", on: false },
        { d: "T", on: false },
        { d: "W", on: true },
        { d: "T", on: false },
        { d: "F", on: true },
      ].map((x, i) => (
        <span
          key={i}
          className={`flex h-14 w-14 items-center justify-center rounded-xl text-lg font-extrabold ${
            x.on ? "bg-lime text-black" : "bg-deep border-line-soft border text-white/35"
          }`}
        >
          {x.d}
        </span>
      ))}
    </div>
  );
}

function ArbArt() {
  return (
    <div className="flex items-center gap-5">
      <span className="bg-deep border-line-soft flex flex-col items-center rounded-xl border px-5 py-3">
        <span className="text-xs font-bold text-white/40">POD</span>
        <span className="mt-1 h-1.5 w-14 rounded-full bg-white/25" />
      </span>
      <svg width="46" height="20" viewBox="0 0 46 20" fill="none" aria-hidden="true">
        <path
          d="M2 10h38M34 4l7 6-7 6"
          stroke="#7fe339"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="border-lime/60 bg-lime/10 flex flex-col items-center rounded-xl px-5 py-3">
        <span className="text-lime text-xs font-bold">MARKET</span>
        <span className="bg-lime mt-1 h-1.5 w-14 rounded-full" />
      </span>
    </div>
  );
}

export function Why() {
  return (
    <Section id="why">
      <div className="max-w-3xl">
        <Eyebrow>Why stocks, not coins</Eyebrow>
        <h2 className="text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.06] font-extrabold tracking-[-0.03em]">
          Crypto moves when it feels like it. Stocks move on a timetable.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-white/60">
          Same engine, better fuel. That is the whole idea.
        </p>
      </div>

      {/* Feature: the weekend gap */}
      <div className="card-shell mt-16">
        <div className="card-inner p-7 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <h3 className="text-[clamp(1.7rem,2.6vw,2.4rem)] leading-[1.1] font-extrabold tracking-[-0.02em]">
                The exchange closes.
                <br />
                <span className="text-lime">Your Pod does not.</span>
              </h3>
              <p className="mt-6 text-lg leading-relaxed text-white/65">
                On Friday the stock market shuts and the official price stops moving. The token keeps
                trading all weekend and drifts away from it.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white/65">
                On Monday everything has to be put back in line — and that correction has to pass
                through your Pod, paying a fee on the way. Every single week.
              </p>
            </div>
            <div className="card-flat border-line-soft/60 border p-5 sm:p-7">
              <GapChart />
            </div>
          </div>
        </div>
      </div>

      {/* Two supporting blocks */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card-shell">
          <div className="card-inner p-8 sm:p-10">
            <div className="border-line-soft/70 flex h-32 items-center justify-center rounded-xl border border-dashed">
              <CalendarArt />
            </div>
            <h3 className="mt-8 text-3xl font-extrabold tracking-[-0.02em]">
              You know the dates in advance
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
              Earnings, rate decisions, expiry days. The whole calendar is published months ahead, so
              you can be in position before the market moves. Nothing in crypto tells you that.
            </p>
          </div>
        </div>

        <div className="card-shell">
          <div className="card-inner p-8 sm:p-10">
            <div className="border-line-soft/70 flex h-32 items-center justify-center rounded-xl border border-dashed">
              <ArbArt />
            </div>
            <h3 className="mt-8 text-3xl font-extrabold tracking-[-0.02em]">
              The correction always happens
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
              A real stock has a real price on a real exchange. If the Pod drifts, there is free money
              sitting there, and someone always takes it. To take it, they pay your fee. With a
              memecoin, nobody is obliged to show up.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
