import type { Metadata } from "next";
import { PageHead } from "@/components/dapp/bits";
import { SwapPanel } from "@/components/dapp/SwapPanel";

export const metadata: Metadata = { title: "Swap · Ponspods" };

const STEPS = [
  "Swaps your input asset for the pod's underlying stock token on the deepest route available.",
  "Wraps it into the pod token at the current backing ratio.",
  "Optionally pairs it against USDG and mints the full-range LP.",
  "Optionally borrows the second side and locks the LP as its own collateral.",
];

export default function SwapPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-9 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <PageHead
          title="Zap"
          intro="One transaction from whatever you hold to wherever you want to be: wrapped, providing liquidity, or levered. The router handles the swap, the wrap and the borrow."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-start">
          <SwapPanel />

          <div className="space-y-5">
            <div className="card-shell">
              <div className="card-inner p-6 sm:p-7">
                <h2 className="text-lg font-extrabold">What the router does</h2>
                <ol className="mt-5 space-y-4">
                  {STEPS.map((s, i) => (
                    <li key={s} className="flex gap-3.5">
                      <span className="border-line/80 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-[#070f05] text-[11px] font-extrabold text-white">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-white/55">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="border-line dot-field rounded-2xl border border-dashed p-6">
              <p className="font-extrabold">A note on slippage</p>
              <p className="mt-2.5 text-sm leading-relaxed text-white/55">
                Pod pools are full-range and shallow relative to the exchange behind them. A large
                zap while the market is closed is the most expensive thing you can do here — the
                wider closed-session fee applies to you too.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
