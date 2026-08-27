import Link from "next/link";
import { CALENDAR, PROTOCOL_STATS } from "@/lib/data";
import { usd } from "@/lib/format";
import { StatTile } from "@/components/ui";
import { PodsExplorer } from "@/components/app/PodsExplorer";

export default function AppHome() {
  const next = CALENDAR[0];

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">Farm scheduled volatility</h1>
          <p className="text-foreground-muted mt-2 max-w-2xl text-sm sm:text-base">
            Wrap a tokenized asset into its pod, provide the pTKN side only, and let the protocol
            borrow the rest. Yield comes from fee flow, never from emissions.
          </p>
        </div>
        <Link
          href="/app/create"
          className="border-border text-foreground hover:border-accent-blue hover:text-accent-blue inline-flex shrink-0 items-center gap-2 self-start rounded-full border bg-white px-4 py-2.5 text-sm font-medium transition-colors lg:self-auto"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Deploy a new pod
        </Link>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Total value locked" value={usd(PROTOCOL_STATS.tvl)} sub={`${PROTOCOL_STATS.pods} pods`} />
        <StatTile label="Fees generated" value={usd(PROTOCOL_STATS.fees)} sub="all time" />
        <StatTile
          label="Paid to LPs"
          value={usd(PROTOCOL_STATS.yield)}
          sub={`${PROTOCOL_STATS.positions.toLocaleString("en-US")} open positions`}
        />
        <StatTile
          label="Value burned"
          value={usd(PROTOCOL_STATS.burned)}
          sub={`${PROTOCOL_STATS.burnedTokens.toLocaleString("en-US")} pTKN removed`}
        />
      </div>

      <div className="border-accent-blue/25 bg-accent-blue-soft/40 mt-4 flex flex-col gap-3 rounded-2xl border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-accent-blue animate-glow-breathe flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <p className="text-foreground text-sm font-semibold">
              Next scheduled volatility event · {next.date}
            </p>
            <p className="text-foreground-muted text-xs">
              {next.label} — modelled +{next.expectedVolLift}% realized vol across {next.pods.join(", ")}
            </p>
          </div>
        </div>
        <Link
          href="/#calendar"
          className="text-accent-blue-deep hover:text-accent-blue shrink-0 text-xs font-semibold transition-colors"
        >
          View full calendar →
        </Link>
      </div>

      <div className="mt-8">
        <PodsExplorer />
      </div>
    </div>
  );
}
