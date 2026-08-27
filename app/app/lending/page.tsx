import Link from "next/link";
import type { Metadata } from "next";
import { MARKETS } from "@/lib/data";
import { usd } from "@/lib/format";
import { Badge, Meter, StatTile } from "@/components/ui";
import { SupplyPanel } from "@/components/app/SupplyPanel";

export const metadata: Metadata = {
  title: "Lending",
  description: "Supply USDG to metavaults and isolated pod markets.",
};

export default function LendingPage() {
  const metavaults = MARKETS.filter((m) => m.kind === "metavault");
  const isolated = MARKETS.filter((m) => m.kind === "isolated");
  const totalSupplied = MARKETS.reduce((a, m) => a + m.supplied, 0);
  const totalBorrowed = MARKETS.reduce((a, m) => a + m.borrowed, 0);

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold sm:text-4xl">Lend into the leverage</h1>
      <p className="text-foreground-muted mt-2 max-w-3xl text-sm sm:text-base">
        Borrowers in Ponspods are not degens taking a directional bet — they are LPs who need the
        second side of a pair. Supplying {""}
        <span className="text-foreground font-medium">USDG</span> funds that leverage and earns the
        interest they pay.
      </p>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Total supplied" value={usd(totalSupplied)} />
        <StatTile label="Total borrowed" value={usd(totalBorrowed)} />
        <StatTile
          label="Average utilization"
          value={`${Math.round((totalBorrowed / totalSupplied) * 100)}%`}
          sub="across all markets"
        />
        <StatTile label="Best supply APY" value="18.9%" sub="pMEME isolated market" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <section>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold">Metavaults</h2>
                <p className="text-foreground-subtle mt-1 text-sm">
                  One deposit, allocated across whitelisted pods by vlPODS governance.
                </p>
              </div>
              <Badge tone="pod">Curated</Badge>
            </div>

            <div className="mt-5 space-y-4">
              {metavaults.map((m) => (
                <div
                  key={m.name}
                  className="border-border bg-background-elevated card-shadow hover:border-accent-blue/45 rounded-2xl border p-5 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-foreground text-lg font-semibold">{m.name}</p>
                      <p className="text-foreground-subtle mt-1 text-xs">
                        Denominated in {m.asset} · Robinhood Chain
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-foreground-subtle text-[11px] tracking-wide uppercase">
                        Supply APY
                      </p>
                      <p className="tabular text-up text-2xl font-semibold">
                        {m.supplyApy.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div>
                      <p className="text-foreground-subtle text-[11px]">Supplied</p>
                      <p className="tabular mt-1 font-semibold">{usd(m.supplied)}</p>
                    </div>
                    <div>
                      <p className="text-foreground-subtle text-[11px]">Borrowed</p>
                      <p className="tabular mt-1 font-semibold">{usd(m.borrowed)}</p>
                    </div>
                    <div>
                      <p className="text-foreground-subtle text-[11px]">Borrow APR</p>
                      <p className="tabular mt-1 font-semibold">{m.borrowApr.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-foreground-subtle text-[11px]">Utilization</p>
                      <p className="tabular mt-1 font-semibold">{m.utilization}%</p>
                    </div>
                  </div>

                  <Meter
                    value={m.utilization}
                    tone={m.utilization > 95 ? "warn" : "accent"}
                    className="mt-4"
                  />

                  {m.allocations ? (
                    <div className="border-border mt-5 border-t pt-4">
                      <p className="text-foreground-subtle text-[11px] tracking-wide uppercase">
                        Allocation
                      </p>
                      <div className="mt-3 flex h-2.5 overflow-hidden rounded-full">
                        {m.allocations.map((a, i) => (
                          <span
                            key={a.pod}
                            style={{
                              width: `${a.share}%`,
                              background: [
                                "#3b76e0",
                                "#12b981",
                                "#7c5cff",
                                "#e0a23b",
                                "#2456b8",
                                "#0b8f63",
                              ][i % 6],
                            }}
                          />
                        ))}
                      </div>
                      <div className="text-foreground-muted mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px]">
                        {m.allocations.map((a, i) => (
                          <span key={a.pod} className="flex items-center gap-1.5">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{
                                background: [
                                  "#3b76e0",
                                  "#12b981",
                                  "#7c5cff",
                                  "#e0a23b",
                                  "#2456b8",
                                  "#0b8f63",
                                ][i % 6],
                              }}
                            />
                            {a.pod} {a.share}%
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">Isolated pod markets</h2>
            <p className="text-foreground-subtle mt-1 text-sm">
              Direct exposure to one pod. Higher rate, no diversification, no curator.
            </p>

            <div className="border-border bg-background-elevated card-shadow mt-5 overflow-x-auto rounded-2xl border">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="border-border text-foreground-subtle border-b text-left text-[11px] tracking-[0.1em] uppercase">
                    <th className="px-5 py-3 font-semibold">Market</th>
                    <th className="px-3 py-3 font-semibold">Supply APY</th>
                    <th className="px-3 py-3 font-semibold">Borrow APR</th>
                    <th className="px-3 py-3 font-semibold">Supplied</th>
                    <th className="px-3 py-3 font-semibold">Borrowed</th>
                    <th className="px-3 py-3 font-semibold">Utilization</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {isolated.map((m) => (
                    <tr
                      key={m.name}
                      className="border-border hover:bg-background-elevated-2/60 border-b transition-colors last:border-b-0"
                    >
                      <td className="px-5 py-3.5">
                        <p className="text-foreground font-medium">{m.strategyFor}</p>
                        <p className="text-foreground-subtle text-xs">{m.asset} market</p>
                      </td>
                      <td className="tabular text-up px-3 py-3.5 font-semibold">
                        {m.supplyApy.toFixed(1)}%
                      </td>
                      <td className="tabular text-foreground-muted px-3 py-3.5">
                        {m.borrowApr.toFixed(1)}%
                      </td>
                      <td className="tabular px-3 py-3.5">{usd(m.supplied)}</td>
                      <td className="tabular text-foreground-muted px-3 py-3.5">{usd(m.borrowed)}</td>
                      <td className="px-3 py-3.5">
                        <div className="flex items-center gap-2">
                          <Meter
                            value={m.utilization}
                            tone={m.utilization > 95 ? "warn" : "accent"}
                            className="w-16"
                          />
                          <span className="tabular text-foreground-subtle text-xs">
                            {m.utilization}%
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          href={`/app/pod/${(m.strategyFor ?? "").toLowerCase()}`}
                          className="bg-foreground text-background hover:bg-accent-blue inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors"
                        >
                          Supply
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-border bg-background-elevated-2/50 mt-5 rounded-2xl border border-dashed p-5">
              <p className="text-foreground text-sm font-semibold">
                Why utilization sits near 100% here
              </p>
              <p className="text-foreground-muted mt-2 text-sm leading-relaxed">
                A pod bootstraps its own market with self-lending: the first borrower flash-borrows
                the paired asset, supplies it, borrows it back against the LP, and closes the loop in
                one transaction. That prints 100% utilization as a signal — Proof of Demand — telling
                lenders that borrow demand exists here before any outside capital arrives. Rates stay
                high until supply catches up.
              </p>
            </div>
          </section>
        </div>

        <div>
          <div className="lg:sticky lg:top-24">
            <SupplyPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
