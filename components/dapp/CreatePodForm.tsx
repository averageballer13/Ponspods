"use client";

import { useState } from "react";
import { BRANDS } from "@/lib/brands";
import { MAX_LEVERAGE, MAX_LTV } from "@/lib/protocol";
import { BrandMark } from "@/components/ui";
import { Meter } from "@/components/dapp/bits";

const ASSETS = [
  { brand: "nvidia", symbol: "NVDA", name: "Nvidia", closes: true },
  { brand: "apple", symbol: "AAPL", name: "Apple", closes: true },
  { brand: "tesla", symbol: "TSLA", name: "Tesla", closes: true },
  { brand: "robinhood", symbol: "HOOD", name: "Robinhood Markets", closes: true },
  { brand: "microstrategy", symbol: "MSTR", name: "Strategy", closes: true },
  { brand: "palantir", symbol: "PLTR", name: "Palantir", closes: true },
  { brand: "coinbase", symbol: "COIN", name: "Coinbase", closes: true },
  { brand: "netflix", symbol: "NFLX", name: "Netflix", closes: true },
  { brand: "amd", symbol: "AMD", name: "AMD", closes: true },
  { brand: "spacex", symbol: "SPACEX", name: "SpaceX", closes: false },
];

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-bold text-white">{label}</p>
      {hint ? <p className="mt-1 text-xs leading-relaxed text-white/40">{hint}</p> : null}
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function CreatePodForm() {
  const [asset, setAsset] = useState(ASSETS[0].symbol);
  const [wrapFee, setWrapFee] = useState(0.25);
  const [unwrapFee, setUnwrapFee] = useState(0.5);
  const [ammFee, setAmmFee] = useState(0.5);
  const [gapPremium, setGapPremium] = useState(0.25);
  const [burnShare, setBurnShare] = useState(25);
  const [selfLend, setSelfLend] = useState(true);

  const selected = ASSETS.find((a) => a.symbol === asset)!;
  const ticker = `p${selected.symbol}`;
  const lpShare = 100 - burnShare - 15;
  const totalFee = ammFee + (selected.closes ? gapPremium : 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
      <div className="card-shell">
        <div className="card-inner space-y-8 p-6 sm:p-8">
          <Field
            label="Underlying asset"
            hint="Any tokenized asset with a free-floating ERC-20. Equities, baskets, treasuries or crypto."
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {ASSETS.map((a) => (
                <button
                  key={a.symbol}
                  onClick={() => setAsset(a.symbol)}
                  className={`flex flex-col items-center gap-2 rounded-xl border px-2 py-3.5 transition-colors ${
                    asset === a.symbol
                      ? "border-lime/60 bg-lime/10"
                      : "border-line bg-[#070f05] hover:border-[#2c5c22]"
                  }`}
                >
                  <BrandMark brand={a.brand} size={22} />
                  <span className="text-[11px] font-bold text-white/70">{a.symbol}</span>
                </button>
              ))}
            </div>
          </Field>

          <Field
            label="Paired asset"
            hint="One shared stablecoin keeps every pod inside the same deep lending market."
          >
            <div className="flex gap-2">
              {["USDG", "PODS", "pTBILL"].map((p) => (
                <button
                  key={p}
                  className={`rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                    p === "USDG"
                      ? "bg-white text-[#040703]"
                      : "border-line border text-white/45 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </Field>

          <div className="grid gap-8 sm:grid-cols-2">
            <Field label={`Wrap fee — ${wrapFee.toFixed(2)}%`}>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={wrapFee}
                onChange={(e) => setWrapFee(Number(e.target.value))}
                className="w-full accent-white"
              />
            </Field>
            <Field label={`Unwrap fee — ${unwrapFee.toFixed(2)}%`}>
              <input
                type="range"
                min={0}
                max={2}
                step={0.05}
                value={unwrapFee}
                onChange={(e) => setUnwrapFee(Number(e.target.value))}
                className="w-full accent-white"
              />
            </Field>
            <Field label={`AMM fee — ${ammFee.toFixed(2)}%`}>
              <input
                type="range"
                min={0.05}
                max={1.5}
                step={0.05}
                value={ammFee}
                onChange={(e) => setAmmFee(Number(e.target.value))}
                className="w-full accent-white"
              />
            </Field>
            <Field label={`Burn share — ${burnShare}%`}>
              <input
                type="range"
                min={0}
                max={60}
                step={5}
                value={burnShare}
                onChange={(e) => setBurnShare(Number(e.target.value))}
                className="w-full accent-white"
              />
            </Field>
          </div>

          <div
            className={`rounded-xl border p-5 transition-colors ${
              selected.closes
                ? "border-[#e0a23b]/30 bg-[#e0a23b]/8"
                : "border-line bg-[#070f05] opacity-60"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold">
                  Closed-session gap premium
                  {selected.closes ? null : (
                    <span className="ml-2 text-xs font-normal text-white/40">
                      ({selected.name} trades 24/7)
                    </span>
                  )}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/50">
                  Extra AMM fee applied automatically whenever the underlying market is closed, so
                  liquidity providers are paid for holding a position against a frozen reference
                  price instead of being picked off by it.
                </p>
              </div>
              <span className="tnum shrink-0 text-sm font-extrabold">
                +{gapPremium.toFixed(2)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={0.6}
              step={0.05}
              value={gapPremium}
              disabled={!selected.closes}
              onChange={(e) => setGapPremium(Number(e.target.value))}
              className="mt-4 w-full accent-white disabled:opacity-30"
            />
          </div>

          <Field label="Revenue split" hint="Liquidity providers, pod-token burns, and a fixed protocol share.">
            <div className="flex h-3 overflow-hidden rounded-full">
              <span style={{ width: `${lpShare}%`, background: "#ffffff" }} />
              <span style={{ width: `${burnShare}%`, background: "#7fe339" }} />
              <span style={{ width: "15%", background: "#2c5c22" }} />
            </div>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-[11px] font-semibold text-white/50">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white" />
                {lpShare}% LP rewards
              </span>
              <span className="flex items-center gap-2">
                <span className="bg-lime h-2 w-2 rounded-full" />
                {burnShare}% burn
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#2c5c22]" />
                15% protocol
              </span>
            </div>
          </Field>

          <label className="border-line flex cursor-pointer items-start gap-3.5 rounded-xl border bg-[#070f05] p-5">
            <input
              type="checkbox"
              checked={selfLend}
              onChange={(e) => setSelfLend(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-white"
            />
            <span>
              <span className="block text-sm font-bold">Bootstrap with self-lending</span>
              <span className="mt-1.5 block text-xs leading-relaxed text-white/50">
                Flash-borrow the paired asset, supply it, then borrow it back against your own LP.
                The market opens at full utilization as Proof of Demand, which is the signal that
                pulls real lenders in.
              </span>
            </span>
          </label>
        </div>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="card-shell">
          <div className="card-inner p-6">
            <p className="text-sage/55 text-[10px] font-bold tracking-[0.14em] uppercase">
              Preview
            </p>

            <div className="mt-5 flex items-center gap-4">
              <span className="border-line flex h-14 w-14 items-center justify-center rounded-xl border bg-[#070f05]">
                <BrandMark brand={selected.brand} size={26} />
              </span>
              <div>
                <p className="text-xl font-extrabold">{ticker}</p>
                <p className="text-xs font-semibold text-white/40">
                  {BRANDS[selected.brand]?.title ?? selected.name}
                </p>
              </div>
            </div>

            <div className="border-line/70 mt-6 space-y-2.5 border-t pt-5 text-sm">
              {[
                ["Pair", `${ticker} / USDG`],
                ["Wrap / unwrap", `${wrapFee.toFixed(2)}% / ${unwrapFee.toFixed(2)}%`],
                [
                  "AMM fee",
                  selected.closes
                    ? `${ammFee.toFixed(2)}% (+${gapPremium.toFixed(2)}% closed)`
                    : `${ammFee.toFixed(2)}%`,
                ],
                ["Round-trip cost", `${(totalFee + unwrapFee).toFixed(2)}%`],
                ["Liquidation LTV", `${(MAX_LTV * 100).toFixed(2)}%`],
                ["Leverage ceiling", `${MAX_LEVERAGE}×`],
                ["Self-lending", selfLend ? "On" : "Off"],
              ].map(([l, v]) => (
                <div key={l} className="flex items-center justify-between">
                  <span className="text-white/45">{l}</span>
                  <span className="tnum font-bold">{v}</span>
                </div>
              ))}
            </div>

            <div className="border-line/70 mt-5 border-t pt-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/45">No-arb band</span>
                <span className="tnum font-extrabold">±{totalFee.toFixed(2)}%</span>
              </div>
              <div className="mt-2.5">
                <Meter value={(totalFee / 2) * 100} tone={totalFee > 1.2 ? "warn" : "lime"} />
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-white/45">
                Arbitrage only fires once the pool drifts further than the round-trip fee. Set this
                too wide and nobody corrects the pod; too tight and each correction pays little. It
                is the single most important number here.
              </p>
            </div>

            <button
              disabled
              className="mt-6 w-full cursor-not-allowed rounded-full bg-white/10 px-4 py-3 text-sm font-extrabold text-white/40"
            >
              Deployment opens at launch
            </button>
            <p className="mt-3 text-center text-[11px] text-white/35">
              Immutable once deployed. Fees can never be changed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
