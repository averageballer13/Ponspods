import Link from "next/link";
import { notFound } from "next/navigation";
import { PODS, getPod } from "@/lib/pods";
import { MAX_LEVERAGE, MAX_LTV } from "@/lib/protocol";
import { BrandChip, BrandCluster, BrandMark, Pending } from "@/components/ui";
import { PodPanel } from "@/components/dapp/PodPanel";

export function generateStaticParams() {
  return PODS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/app/pod/[slug]">) {
  const { slug } = await params;
  const pod = getPod(slug);
  return { title: pod ? `${pod.ticker} · Ponspods` : "Pod · Ponspods" };
}

const METRICS = [
  "LVF APY",
  "VF APY",
  "Pod TVL",
  "24h volume",
  "24h fees",
  "CBR",
  "Borrow APR",
  "Utilization",
];

export default async function PodPage({ params }: PageProps<"/app/pod/[slug]">) {
  const { slug } = await params;
  const pod = getPod(slug);
  if (!pod) notFound();

  const earns = [
    {
      t: "Reference-price arbitrage",
      d: `Every time ${pod.company} moves against the pool, someone realigns it and pays the AMM fee to do so. More movement, more realignments.`,
    },
    {
      t: "Wrap and unwrap flow",
      d: "Entering and leaving the pod is never free. Those fees stay in the pod, and part of them burns pod tokens for everyone who stays.",
    },
    pod.session === "always"
      ? {
          t: "Continuous discovery",
          d: "No closing bell means the pool is the primary price, so the arbitrage band stays wide and persistent instead of snapping shut each morning.",
        }
      : {
          t: "Session gaps",
          d: `While ${pod.company} is closed the pool drifts freely, and the correction at the open is a single large trade routed through the pod.`,
        },
    {
      t: "Leverage demand",
      d: "Borrowers pay interest to farm this pod with leverage. That interest goes to lenders and to the protocol.",
    },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-9 sm:px-8">
      <Link
        href="/app"
        className="hover:text-mint inline-flex items-center gap-2 text-sm font-semibold text-white/45 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M13 8H3M7 4L3 8l4 4"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        All pods
      </Link>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          {pod.brands.length > 1 ? (
            <BrandCluster brands={pod.brands.slice(0, 4)} size={48} />
          ) : (
            <BrandChip brand={pod.brands[0]} size={72} />
          )}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                {pod.ticker}
              </h1>
              <span className="chip px-3 py-1.5 text-[11px] font-extrabold tracking-[0.1em] uppercase">
                {pod.tag}
              </span>
            </div>
            <p className="mt-2 text-sm text-white/50">
              Wraps {pod.company} · paired against {pod.paired} ·{" "}
              {pod.session === "always" ? "trades 24/7" : "follows market hours"}
            </p>
          </div>
        </div>
        <span className="border-line inline-flex shrink-0 items-center gap-2.5 self-start rounded-full border px-4 py-2.5 text-xs font-bold text-white/60 lg:self-auto">
          <span className="animate-breathe h-1.5 w-1.5 rounded-full bg-[#e0a23b]" />
          Not deployed yet
        </span>
      </div>

      <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/60">{pod.detail}</p>

      {/* Metric strip — every slot pending until launch */}
      <div className="card-shell mt-8">
        <div className="card-inner grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8">
          {METRICS.map((label, i) => (
            <div
              key={label}
              className={`border-line/60 px-5 py-4 ${
                i % 2 === 0 ? "border-r" : ""
              } sm:border-r xl:border-r`}
            >
              <p className="text-sage/55 text-[10px] font-bold tracking-[0.12em] whitespace-nowrap uppercase">
                {label}
              </p>
              <p className="mt-1.5 text-lg font-extrabold">
                <Pending />
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {/* Parameters */}
          <div className="card-shell">
            <div className="card-inner p-6 sm:p-7">
              <h2 className="text-lg font-extrabold">Pod parameters</h2>
              <p className="mt-1.5 text-sm text-white/45">
                Fees are chosen by whoever deploys the pod and can never be changed afterwards. The
                risk limits below are protocol-wide constants.
              </p>
              <div className="mt-5 grid gap-x-10 gap-y-1 sm:grid-cols-2">
                {[
                  ["Wrap fee", <Pending key="a" />],
                  ["Unwrap fee", <Pending key="b" />],
                  ["AMM buy fee", <Pending key="c" />],
                  ["AMM sell fee", <Pending key="d" />],
                  ["Liquidation LTV", `${(MAX_LTV * 100).toFixed(2)}%`],
                  ["Leverage ceiling", `${MAX_LEVERAGE}×`],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="border-line/50 flex items-center justify-between border-b py-2.5 text-sm last:border-b-0"
                  >
                    <span className="text-white/50">{label}</span>
                    <span className="tnum font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Basket composition */}
          {pod.constituents ? (
            <div className="card-shell">
              <div className="card-inner p-6 sm:p-7">
                <h2 className="text-lg font-extrabold">Basket composition</h2>
                <p className="mt-1.5 text-sm text-white/45">
                  Weights are set at deployment and rebalanced on a published schedule. Each
                  rebalance is itself a fee event.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {pod.constituents.map((b) => (
                    <span
                      key={b}
                      className="border-line flex items-center gap-2.5 rounded-xl border bg-[#070f05] px-3.5 py-2.5"
                    >
                      <BrandMark brand={b} size={20} />
                      <Pending className="text-sm" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {/* How it earns */}
          <div className="card-shell">
            <div className="card-inner p-6 sm:p-7">
              <h2 className="text-lg font-extrabold">Where this pod earns</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {earns.map((x) => (
                  <div key={x.t} className="border-line rounded-xl border bg-[#070f05] p-4">
                    <p className="text-mint text-sm font-bold">{x.t}</p>
                    <p className="mt-2 text-xs leading-relaxed text-white/50">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk */}
          <div className="rounded-2xl border border-[#e0a23b]/30 bg-[#e0a23b]/8 p-6 sm:p-7">
            <h2 className="text-lg font-extrabold text-[#e0a23b]">Risk</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/60">
              <li>
                Leveraged positions are liquidated above {(MAX_LTV * 100).toFixed(2)}% LTV. The
                collateral is a full-range LP, so its value falls with the square root of price —
                that softens the fall, it does not remove it.
              </li>
              {pod.session === "market-hours" ? (
                <li>
                  Session gaps cut both ways. A large adverse move while {pod.company} is closed can
                  push a healthy position through its threshold before anyone can react.
                </li>
              ) : (
                <li>
                  With no reference exchange, the pool is the only price. Thin liquidity moves it
                  further and faster than a listed name.
                </li>
              )}
              <li>
                Tokenized equities carry issuer and transfer-restriction risk that a purely on-chain
                asset does not. A pod cannot redeem what the issuer will not honour.
              </li>
              <li>Pods are immutable. Fee parameters cannot be changed after deployment.</li>
            </ul>
          </div>
        </div>

        <div>
          <div className="lg:sticky lg:top-24">
            <PodPanel pod={pod} />
          </div>
        </div>
      </div>
    </div>
  );
}
