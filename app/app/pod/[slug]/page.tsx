import Link from "next/link";
import { notFound } from "next/navigation";
import { MARKETS, PODS, getPod } from "@/lib/data";
import { num, usd } from "@/lib/format";
import { ApyText, Badge, Meter } from "@/components/ui";
import { PodAvatar, SessionDot } from "@/components/app/PodCard";
import { PodChart } from "@/components/app/PodChart";
import { PodActions } from "@/components/app/PodActions";

export function generateStaticParams() {
  return PODS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/app/pod/[slug]">) {
  const { slug } = await params;
  const pod = getPod(slug);
  return { title: pod ? `${pod.ticker} · ${pod.name}` : "Pod" };
}

function Metric({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-border border-r px-5 py-4 last:border-r-0">
      <p className="text-foreground-subtle text-[10px] font-medium tracking-[0.12em] whitespace-nowrap uppercase">
        {label}
      </p>
      <div className="mt-1.5 text-lg font-semibold">{children}</div>
    </div>
  );
}

export default async function PodPage({ params }: PageProps<"/app/pod/[slug]">) {
  const { slug } = await params;
  const pod = getPod(slug);
  if (!pod) notFound();

  const market = MARKETS.find((m) => m.strategyFor === pod.ticker);
  const feeRows = [
    { label: `Wrap ${pod.underlying} → ${pod.ticker}`, value: `${pod.wrapFee}%` },
    { label: `Unwrap ${pod.ticker} → ${pod.underlying}`, value: `${pod.unwrapFee}%` },
    { label: "AMM buy", value: `${pod.buyFee}%` },
    { label: "AMM sell", value: `${pod.sellFee}%` },
    {
      label: "Closed-session gap premium",
      value: pod.gapPremium > 0 ? `+${pod.gapPremium.toFixed(2)}%` : "n/a — trades 24/7",
    },
  ];

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6">
      <Link
        href="/app"
        className="text-foreground-subtle hover:text-accent-blue inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M13 8H3M7 4L3 8l4 4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        All pods
      </Link>

      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <PodAvatar pod={pod} size={56} />
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-semibold sm:text-3xl">{pod.ticker}</h1>
              <Badge tone="accent">{pod.underlying} / {pod.paired}</Badge>
              {pod.selfLending ? <Badge tone="pod">Self-lending</Badge> : null}
              {pod.pairingAsset ? <Badge>Pairing asset</Badge> : null}
            </div>
            <p className="text-foreground-muted mt-1.5 text-sm">
              {pod.name} · wraps {pod.underlyingName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <SessionDot session={pod.session} />
          {pod.nextCatalyst ? (
            <Badge tone="warn">
              Next: {pod.nextCatalyst.label} · {pod.nextCatalyst.date.slice(5)}
            </Badge>
          ) : null}
        </div>
      </div>

      <p className="text-foreground-muted mt-5 max-w-3xl text-sm leading-relaxed sm:text-base">
        {pod.blurb}
      </p>

      <div className="border-border bg-background-elevated card-shadow mt-6 grid grid-cols-2 overflow-hidden rounded-2xl border sm:grid-cols-4 xl:grid-cols-8">
        <Metric label="LVF APY">
          <ApyText value={pod.lvfApy} className="text-lg" />
        </Metric>
        <Metric label="VF APY">
          <span className="tabular">{pod.vfApy.toFixed(1)}%</span>
        </Metric>
        <Metric label="Pod TVL">
          <span className="tabular">{usd(pod.tvl)}</span>
        </Metric>
        <Metric label="24h volume">
          <span className="tabular">{usd(pod.volume24h)}</span>
        </Metric>
        <Metric label="24h fees">
          <span className="tabular">{usd(pod.fees24h)}</span>
        </Metric>
        <Metric label="CBR">
          <span className="tabular text-pod-deep">{pod.cbr.toFixed(3)}</span>
        </Metric>
        <Metric label="Borrow APR">
          <span className="tabular">{pod.borrowApr.toFixed(1)}%</span>
        </Metric>
        <Metric label="Realized vol">
          <span className="tabular">{pod.realizedVol}%</span>
        </Metric>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <PodChart
            seed={`${pod.slug}-cbr`}
            label="Collateral backing ratio · 90 days"
            value={pod.cbr.toFixed(4)}
            delta={`+${pod.cbr30d}% / 30d`}
            drift={0.9}
            vol={0.35}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border-border bg-background-elevated card-shadow rounded-2xl border p-5 sm:p-6">
              <h2 className="font-display text-base font-semibold">Fee schedule</h2>
              <p className="text-foreground-subtle mt-1 text-xs">
                Set at deployment, immutable afterwards.
              </p>
              <div className="mt-4 space-y-0">
                {feeRows.map((r) => (
                  <div
                    key={r.label}
                    className="border-border flex items-center justify-between border-b py-2.5 text-sm last:border-b-0"
                  >
                    <span className="text-foreground-muted">{r.label}</span>
                    <span className="tabular text-foreground font-medium">{r.value}</span>
                  </div>
                ))}
              </div>
              <div className="border-border mt-4 border-t pt-4">
                <p className="text-foreground-subtle text-[11px] tracking-wide uppercase">
                  Revenue split
                </p>
                <div className="mt-3 flex h-2.5 overflow-hidden rounded-full">
                  <span className="bg-accent-blue" style={{ width: "60%" }} />
                  <span className="bg-pod" style={{ width: "25%" }} />
                  <span className="bg-violet" style={{ width: "15%" }} />
                </div>
                <div className="text-foreground-muted mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="bg-accent-blue h-2 w-2 rounded-full" />
                    60% LP rewards
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="bg-pod h-2 w-2 rounded-full" />
                    25% pTKN burn
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="bg-violet h-2 w-2 rounded-full" />
                    15% protocol / partner
                  </span>
                </div>
              </div>
            </div>

            <div className="border-border bg-background-elevated card-shadow rounded-2xl border p-5 sm:p-6">
              <h2 className="font-display text-base font-semibold">
                {pod.constituents ? "Basket composition" : "Pod reserve"}
              </h2>
              {pod.constituents ? (
                <>
                  <p className="text-foreground-subtle mt-1 text-xs">
                    Rebalanced quarterly. Rebalance flow is itself a fee event.
                  </p>
                  <div className="mt-4 space-y-3">
                    {pod.constituents.map((c) => (
                      <div key={c.symbol}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground font-medium">{c.symbol}</span>
                          <span className="tabular text-foreground-muted">{c.weight}%</span>
                        </div>
                        <Meter value={c.weight * 3.2} tone="accent" className="mt-1.5" />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-foreground-subtle mt-1 text-xs">
                    Every {pod.ticker} is a claim on the reserve below.
                  </p>
                  <div className="mt-5 space-y-3">
                    <div className="border-border bg-background rounded-xl border p-4">
                      <p className="text-foreground-subtle text-[11px]">Underlying held</p>
                      <p className="tabular text-foreground mt-1 text-xl font-semibold">
                        {num(pod.tvl / 100, 0)} {pod.underlying}
                      </p>
                    </div>
                    <div className="border-border bg-background rounded-xl border p-4">
                      <p className="text-foreground-subtle text-[11px]">{pod.ticker} supply</p>
                      <p className="tabular text-foreground mt-1 text-xl font-semibold">
                        {num(pod.tvl / 100 / pod.cbr, 0)}
                      </p>
                      <p className="text-foreground-subtle mt-1 text-[11px]">
                        {num(pod.burned, 0)} burned to date
                      </p>
                    </div>
                  </div>
                </>
              )}
              <div className="border-border mt-5 border-t pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground-muted">Holders</span>
                  <span className="tabular text-foreground font-medium">
                    {pod.holders.toLocaleString("en-US")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {market ? (
            <div className="border-border bg-background-elevated card-shadow rounded-2xl border p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-base font-semibold">{market.name}</h2>
                  <p className="text-foreground-subtle mt-1 text-xs">
                    Isolated {market.asset} market backing this pod. Lenders here fund the leverage
                    above.
                  </p>
                </div>
                <Link
                  href="/app/lending"
                  className="border-border text-foreground-muted hover:border-accent-blue hover:text-accent-blue rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors"
                >
                  Supply {market.asset}
                </Link>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-foreground-subtle text-[11px]">Supplied</p>
                  <p className="tabular mt-1 font-semibold">{usd(market.supplied)}</p>
                </div>
                <div>
                  <p className="text-foreground-subtle text-[11px]">Borrowed</p>
                  <p className="tabular mt-1 font-semibold">{usd(market.borrowed)}</p>
                </div>
                <div>
                  <p className="text-foreground-subtle text-[11px]">Supply APY</p>
                  <p className="tabular text-up mt-1 font-semibold">{market.supplyApy.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-foreground-subtle text-[11px]">Utilization</p>
                  <p className="tabular mt-1 font-semibold">{market.utilization}%</p>
                </div>
              </div>
              <Meter
                value={market.utilization}
                tone={market.utilization > 95 ? "warn" : "accent"}
                className="mt-4"
              />
            </div>
          ) : null}

          <div className="deep-surface card-shadow-lg relative overflow-hidden rounded-2xl p-6 sm:p-8">
            <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <h2 className="font-display text-lg font-semibold text-white">
                Where this pod actually earns
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    t: "Reference-price arbitrage",
                    d: `Every time ${pod.underlying} moves against the pool, someone realigns it and pays the AMM fee to do so. Higher realized volatility, more realignments.`,
                  },
                  {
                    t: "Wrap and unwrap flow",
                    d: `Entering and leaving the pod is never free. Those fees stay in the pod, and a quarter of them burns ${pod.ticker} supply.`,
                  },
                  {
                    t:
                      pod.session === "always"
                        ? "Continuous price discovery"
                        : "Session gaps",
                    d:
                      pod.session === "always"
                        ? "No closing bell means the pool is the primary price, so the arbitrage band stays wide and persistent."
                        : `While ${pod.underlying} is closed the pod charges an extra ${pod.gapPremium.toFixed(2)}% and collects a large corrective trade at the open.`,
                  },
                  {
                    t: "Leverage demand",
                    d: `Borrowers pay ${pod.borrowApr.toFixed(1)}% APR to farm this pod at up to ${pod.maxLeverage}×. That interest is paid to lenders and to the protocol.`,
                  },
                ].map((x) => (
                  <div key={x.t} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm font-semibold text-white">{x.t}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/65">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-warning/30 bg-warning/8 rounded-2xl border p-5 sm:p-6">
            <h2 className="text-warning font-display text-base font-semibold">Risk</h2>
            <ul className="text-foreground-muted mt-3 space-y-2 text-sm leading-relaxed">
              <li>
                LVF positions are liquidated above 83.33% LTV. Because the collateral is a full-range
                LP, its value falls with the square root of price, which softens but does not remove
                the risk.
              </li>
              <li>
                Session gaps cut both ways. A large adverse move while {pod.underlying} is closed can
                move a healthy position into liquidation before the market reopens.
              </li>
              <li>
                Tokenized equities carry issuer and transfer-restriction risk that a purely on-chain
                asset does not. The pod cannot redeem what the issuer will not honour.
              </li>
              <li>Pods are immutable. Fee parameters cannot be changed after deployment.</li>
            </ul>
          </div>
        </div>

        <div id="lvf" className="scroll-mt-24">
          <div className="lg:sticky lg:top-24">
            <PodActions pod={pod} />
          </div>
        </div>
      </div>
    </div>
  );
}
