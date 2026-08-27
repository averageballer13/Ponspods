import type { Metadata } from "next";
import { SwapPanel } from "@/components/app/SwapPanel";

export const metadata: Metadata = {
  title: "Swap",
  description: "Zap any asset straight into a pod, an LP or a leveraged position.",
};

export default function SwapPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">Zap</h1>
        <p className="text-foreground-muted mt-2 max-w-2xl text-sm sm:text-base">
          One transaction from whatever you hold to wherever you want to be: wrapped, providing
          liquidity, or levered. The router handles the swap, the wrap and the borrow.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-start">
          <SwapPanel />

          <div className="space-y-4">
            <div className="border-border bg-background-elevated card-shadow rounded-2xl border p-5 sm:p-6">
              <h2 className="font-display text-base font-semibold">What the router does</h2>
              <ol className="mt-4 space-y-3">
                {[
                  "Swaps your input asset for the pod's underlying on the deepest available route.",
                  "Wraps it into pTKN at the current collateral backing ratio.",
                  "Optionally pairs it against USDG and mints the full-range LP.",
                  "Optionally borrows the second side and locks the LP as its own collateral.",
                ].map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="accent-gradient mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="text-foreground-muted text-sm leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-border bg-background-elevated-2/50 rounded-2xl border border-dashed p-5">
              <p className="text-foreground text-sm font-semibold">A note on slippage</p>
              <p className="text-foreground-muted mt-2 text-sm leading-relaxed">
                Pod pools are full-range and shallow relative to the underlying venue. Large zaps
                during a closed session are the single most expensive thing you can do on this
                interface — the gap premium applies to you too.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
