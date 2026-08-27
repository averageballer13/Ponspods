import Link from "next/link";
import type { Metadata } from "next";
import { POSITIONS, PODS } from "@/lib/data";
import { signedPct, usd } from "@/lib/format";
import { ApyText, Badge, Meter, Sparkline, StatTile } from "@/components/ui";
import { PodAvatar } from "@/components/app/PodCard";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Your wrapped balances, leveraged positions and lending supply.",
};

const KIND_LABEL = {
  wrapped: { label: "Wrapped", tone: "neutral" as const },
  lvf: { label: "Leveraged", tone: "accent" as const },
  lend: { label: "Lending", tone: "pod" as const },
};

export default function PortfolioPage() {
  const total = POSITIONS.reduce((a, p) => a + p.size, 0);
  const pnl = POSITIONS.reduce((a, p) => a + p.pnl, 0);
  const weightedApy =
    POSITIONS.reduce((a, p) => a + p.apy * p.size, 0) / POSITIONS.reduce((a, p) => a + p.size, 0);
  const atRisk = POSITIONS.filter((p) => p.health && p.health < 1.35);

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">Portfolio</h1>
          <p className="text-foreground-muted mt-2 text-sm">
            Demo wallet <span className="tabular">0x7a4f…c19b</span> · Robinhood Chain
          </p>
        </div>
        <Link
          href="/app"
          className="bg-foreground text-background hover:bg-accent-blue rounded-full px-4 py-2.5 text-sm font-semibold transition-colors"
        >
          Open a new position
        </Link>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Net value" value={usd(total)} sub={`${POSITIONS.length} positions`} />
        <StatTile label="Unrealised PnL" value={usd(pnl)} sub={signedPct((pnl / total) * 100)} />
        <StatTile label="Blended APY" value={`${weightedApy.toFixed(1)}%`} sub="fee income only" />
        <StatTile
          label="Positions at risk"
          value={String(atRisk.length)}
          sub={atRisk.length ? atRisk.map((p) => p.ticker).join(", ") : "all healthy"}
        />
      </div>

      {atRisk.length ? (
        <div className="border-warning/30 bg-warning/8 mt-4 flex flex-col gap-2 rounded-2xl border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-warning text-sm font-semibold">
              {atRisk[0].ticker} health is {atRisk[0].health?.toFixed(2)}
            </p>
            <p className="text-foreground-muted mt-0.5 text-xs">
              The underlying market is closed. A gap down at the open could push this position
              through its liquidation threshold before you can react.
            </p>
          </div>
          <Link
            href={`/app/pod/${atRisk[0].pod}#lvf`}
            className="text-warning shrink-0 text-xs font-semibold underline underline-offset-4"
          >
            Reduce leverage →
          </Link>
        </div>
      ) : null}

      <div className="border-border bg-background-elevated card-shadow mt-8 overflow-x-auto rounded-2xl border">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-border text-foreground-subtle border-b text-left text-[11px] tracking-[0.1em] uppercase">
              <th className="px-5 py-3 font-semibold">Position</th>
              <th className="px-3 py-3 font-semibold">Type</th>
              <th className="px-3 py-3 font-semibold">Size</th>
              <th className="px-3 py-3 font-semibold">PnL</th>
              <th className="px-3 py-3 font-semibold">APY</th>
              <th className="px-3 py-3 font-semibold">Leverage</th>
              <th className="px-3 py-3 font-semibold">Health</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {POSITIONS.map((p) => {
              const pod = PODS.find((x) => x.slug === p.pod);
              const kind = KIND_LABEL[p.kind];
              return (
                <tr
                  key={`${p.pod}-${p.kind}`}
                  className="border-border hover:bg-background-elevated-2/60 border-b transition-colors last:border-b-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {pod ? (
                        <PodAvatar pod={pod} size={32} />
                      ) : (
                        <span className="pod-gradient flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white">
                          U
                        </span>
                      )}
                      <div>
                        <p className="font-display text-foreground font-semibold">{p.ticker}</p>
                        <p className="text-foreground-subtle text-xs">
                          {pod ? pod.underlyingName : "USDG Prime Metavault"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <Badge tone={kind.tone}>{kind.label}</Badge>
                  </td>
                  <td className="tabular text-foreground px-3 py-4 font-medium">
                    {usd(p.size, { compact: false, decimals: 0 })}
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`tabular font-semibold ${p.pnl >= 0 ? "text-up" : "text-down"}`}>
                        {p.pnl >= 0 ? "+" : "−"}
                        {usd(Math.abs(p.pnl), { compact: false, decimals: 0 })}
                      </span>
                      <Sparkline seed={`${p.pod}-pnl`} positive={p.pnl >= 0} width={48} height={18} />
                    </div>
                    <span className="text-foreground-subtle text-xs">{signedPct(p.pnlPct, 1)}</span>
                  </td>
                  <td className="px-3 py-4">
                    <ApyText value={p.apy} />
                  </td>
                  <td className="tabular text-foreground-muted px-3 py-4">
                    {p.leverage ? `${p.leverage.toFixed(1)}×` : "—"}
                  </td>
                  <td className="px-3 py-4">
                    {p.health ? (
                      <div className="flex items-center gap-2">
                        <Meter
                          value={Math.min(100, (p.health / 2) * 100)}
                          tone={p.health < 1.35 ? "warn" : "pod"}
                          className="w-14"
                        />
                        <span
                          className={`tabular text-xs font-semibold ${
                            p.health < 1.35 ? "text-warning" : "text-pod-deep"
                          }`}
                        >
                          {p.health.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-foreground-subtle text-xs">n/a</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={pod ? `/app/pod/${p.pod}` : "/app/lending"}
                      className="border-border text-foreground-muted hover:border-accent-blue hover:text-accent-blue rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div className="border-border bg-background-elevated card-shadow rounded-2xl border p-5">
          <p className="text-foreground-subtle text-[11px] tracking-wide uppercase">
            Claimable LP rewards
          </p>
          <p className="tabular text-foreground mt-2 text-2xl font-semibold">$1,284.40</p>
          <p className="text-foreground-subtle mt-1 text-xs">Auto-compounding, claim to stop it</p>
          <button className="bg-foreground text-background hover:bg-accent-blue mt-4 w-full rounded-full px-4 py-2 text-sm font-semibold transition-colors">
            Claim
          </button>
        </div>
        <div className="border-border bg-background-elevated card-shadow rounded-2xl border p-5">
          <p className="text-foreground-subtle text-[11px] tracking-wide uppercase">
            CBR gain since entry
          </p>
          <p className="tabular text-pod-deep mt-2 text-2xl font-semibold">+$3,061.18</p>
          <p className="text-foreground-subtle mt-1 text-xs">
            Value accrued purely from pTKN burns, never claimed, never taxed as a reward
          </p>
        </div>
        <div className="border-border bg-background-elevated card-shadow rounded-2xl border p-5">
          <p className="text-foreground-subtle text-[11px] tracking-wide uppercase">
            vlPODS revenue share
          </p>
          <p className="tabular text-foreground mt-2 text-2xl font-semibold">$412.90</p>
          <p className="text-foreground-subtle mt-1 text-xs">Paid in USDG, epoch 13</p>
          <button className="border-border text-foreground hover:border-accent-blue hover:text-accent-blue mt-4 w-full rounded-full border px-4 py-2 text-sm font-medium transition-colors">
            Lock more PODS
          </button>
        </div>
      </div>
    </div>
  );
}
