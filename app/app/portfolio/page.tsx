import Link from "next/link";
import type { Metadata } from "next";
import { PageHead, StatSlot, EmptyState } from "@/components/dapp/bits";

export const metadata: Metadata = { title: "Portfolio · Ponspods" };

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-9 sm:px-8">
      <PageHead
        title="Portfolio"
        intro="Your wrapped balances, leveraged positions and lending supply, once there is something to hold."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatSlot label="Net value" note="connect a wallet" />
        <StatSlot label="Unrealised PnL" note="connect a wallet" />
        <StatSlot label="Blended APY" note="connect a wallet" />
        <StatSlot label="Positions at risk" note="connect a wallet" />
      </div>

      <div className="mt-8">
        <EmptyState
          title="No positions yet"
          body="No pod has been deployed, so there is nothing to hold, lend or lever. Have a look at the line-up in the meantime — the leverage calculator on each pod page already works."
          action={
            <Link href="/app" className="btn-light px-6 py-3 text-sm">
              Browse the pods
            </Link>
          }
        />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {[
          {
            t: "Claimable LP rewards",
            d: "Fees accrue to your position and compound on their own. Claiming is what stops the compounding, not what starts it.",
          },
          {
            t: "Backing ratio gain",
            d: "Value that arrives by your share growing rather than by a reward landing in your wallet. Never claimed, because it was never separate.",
          },
          {
            t: "Governance revenue",
            d: "Lock the governance token to direct where lending liquidity goes, and take a share of protocol revenue in USDG.",
          },
        ].map((c) => (
          <div key={c.t} className="card-shell">
            <div className="card-inner p-6">
              <p className="text-sage/55 text-[10px] font-bold tracking-[0.14em] uppercase">
                {c.t}
              </p>
              <p className="mt-3 text-2xl font-extrabold text-white/25">—</p>
              <p className="mt-3 text-xs leading-relaxed text-white/45">{c.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
