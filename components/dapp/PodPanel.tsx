"use client";

import { useMemo, useState } from "react";
import type { Pod } from "@/lib/pods";
import { LAUNCH_CBR, MAX_LEVERAGE, MAX_LTV, formatAmount, leverageMath } from "@/lib/protocol";
import { Pending } from "@/components/ui";
import { AmountField, Meter, Row } from "@/components/dapp/bits";

type Tab = "leverage" | "wrap";

export function PodPanel({ pod }: { pod: Pod }) {
  const [tab, setTab] = useState<Tab>("leverage");
  const [amount, setAmount] = useState("");
  const [leverage, setLeverage] = useState(3);

  const amt = Number(amount) || 0;
  const m = useMemo(() => leverageMath(amt, leverage), [amt, leverage]);
  const risky = m.ltv > 0.72;

  return (
    <div className="card-shell">
      <div className="card-inner p-5">
        <div className="flex rounded-full bg-[#070f05] p-1">
          {(
            [
              ["leverage", "Leverage"],
              ["wrap", "Wrap"],
            ] as [Tab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => {
                setTab(id);
                setAmount("");
              }}
              className={`flex-1 rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                tab === id ? "bg-white text-[#040703]" : "text-white/50 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "leverage" ? (
          <div className="mt-5">
            <AmountField
              value={amount}
              onChange={setAmount}
              symbol={pod.ticker}
              label={`Deposit — the protocol borrows the ${pod.paired} side`}
            />

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Leverage</span>
                <span className="tnum font-extrabold">{leverage.toFixed(1)}×</span>
              </div>
              <input
                type="range"
                min={1}
                max={MAX_LEVERAGE}
                step={0.1}
                value={leverage}
                onChange={(e) => setLeverage(Number(e.target.value))}
                className="mt-3 w-full accent-white"
              />
              <div className="text-sage/40 mt-1 flex justify-between text-[10px] font-semibold">
                <span>1×</span>
                <span>{MAX_LEVERAGE}× ceiling</span>
              </div>
            </div>

            <div className="border-line/70 mt-5 border-t pt-3">
              <Row
                label="LP position size"
                value={amt ? `${formatAmount(m.position, 2)} ${pod.ticker}` : "—"}
              />
              <Row
                label={`Borrowed ${pod.paired}`}
                value={amt ? formatAmount(m.debt, 2) : "—"}
              />
              <Row label="Borrow APR" value={<Pending />} />
              <Row label="Net LVF APY" value={<Pending />} />
            </div>

            <div className="border-line mt-4 rounded-xl border p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/50">Loan to value</span>
                <span className="tnum font-extrabold">
                  {(m.ltv * 100).toFixed(1)}% / {(MAX_LTV * 100).toFixed(2)}%
                </span>
              </div>
              <div className="mt-2.5">
                <Meter value={(m.ltv / MAX_LTV) * 100} tone={risky ? "warn" : "lime"} />
              </div>
              <div className="mt-3 flex justify-between text-[11px]">
                <span className="text-white/45">
                  Health{" "}
                  <span className={`tnum font-extrabold ${risky ? "text-[#e0a23b]" : "text-lime"}`}>
                    {Number.isFinite(m.health) ? m.health.toFixed(2) : "∞"}
                  </span>
                </span>
                <span className="text-white/45">
                  Liquidated at{" "}
                  <span className="tnum font-extrabold text-[#e5484d]">
                    −{(m.liquidationDrop * 100).toFixed(0)}%
                  </span>
                </span>
              </div>
            </div>

            {pod.session === "market-hours" ? (
              <div className="mt-3 rounded-xl border border-[#e0a23b]/30 bg-[#e0a23b]/8 p-3.5">
                <p className="text-[11px] leading-relaxed text-white/60">
                  <span className="font-bold text-[#e0a23b]">Weekend risk.</span> A position opened
                  before the close cannot be managed until the market reopens. Size the drop above
                  for the gap, not for the session.
                </p>
              </div>
            ) : null}

            <button
              disabled
              className="mt-4 w-full cursor-not-allowed rounded-full bg-white/10 px-4 py-3 text-sm font-extrabold text-white/40"
            >
              Pod not deployed yet
            </button>
            <p className="text-sage/40 mt-3 text-center text-[11px]">
              The numbers above are protocol maths, not market data.
            </p>
          </div>
        ) : (
          <div className="mt-5">
            <AmountField
              value={amount}
              onChange={setAmount}
              symbol={pod.company}
              label={`Deposit ${pod.company} stock token`}
            />
            <div className="border-line/70 mt-5 border-t pt-3">
              <Row label="Wrap fee" value={<Pending />} />
              <Row
                label="Collateral backing ratio"
                value={`${LAUNCH_CBR.toFixed(4)} at launch`}
              />
              <Row
                label={`You receive`}
                value={amt ? `${formatAmount(amt / LAUNCH_CBR)} ${pod.ticker}` : "—"}
                tone="good"
              />
            </div>
            <p className="text-sage/50 mt-4 text-[11px] leading-relaxed">
              Every pod mints one-for-one on day one. From there the ratio only climbs, as fees burn
              pod tokens while the stocks behind them stay put — so wrapping later mints you fewer
              tokens, each worth more.
            </p>
            <button
              disabled
              className="mt-4 w-full cursor-not-allowed rounded-full bg-white/10 px-4 py-3 text-sm font-extrabold text-white/40"
            >
              Pod not deployed yet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
