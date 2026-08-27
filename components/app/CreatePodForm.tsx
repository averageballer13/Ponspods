"use client";

import { useState } from "react";
import { ButtonAccent, Badge, Meter } from "@/components/ui";

const ASSETS = [
  { symbol: "NVDAx", name: "Nvidia Stock Token", session: "closed" },
  { symbol: "GMEx", name: "GameStop Stock Token", session: "closed" },
  { symbol: "AAPLx", name: "Apple Stock Token", session: "closed" },
  { symbol: "HOODx", name: "Robinhood Markets Stock Token", session: "closed" },
  { symbol: "SPACEXx", name: "SpaceX Stock Token", session: "24/7" },
  { symbol: "XAUx", name: "Tokenized Gold", session: "24/7" },
  { symbol: "USTBx", name: "Tokenized 3M T-Bill", session: "24/7" },
];

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-foreground text-sm font-medium">{label}</label>
      {hint ? <p className="text-foreground-subtle mt-0.5 text-xs">{hint}</p> : null}
      <div className="mt-2">{children}</div>
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
  const [maxLev, setMaxLev] = useState(5);
  const [selfLend, setSelfLend] = useState(true);

  const selected = ASSETS.find((a) => a.symbol === asset)!;
  const ticker = `p${selected.symbol.replace(/x$/, "")}`;
  const lpShare = 100 - burnShare - 15;
  const closesDaily = selected.session === "closed";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
      <div className="border-border bg-background-elevated card-shadow space-y-6 rounded-2xl border p-6">
        <Field label="Underlying asset" hint="Any ERC-20. Tokenized equities, baskets, treasuries or crypto.">
          <select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="border-border bg-background focus:border-accent-blue w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
          >
            {ASSETS.map((a) => (
              <option key={a.symbol} value={a.symbol}>
                {a.symbol} — {a.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Paired asset" hint="USDG keeps every pod inside one shared lending market.">
          <div className="flex gap-2">
            {["USDG", "PONS", "pTBILL"].map((p) => (
              <button
                key={p}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  p === "USDG"
                    ? "bg-accent-blue text-white"
                    : "border-border text-foreground-muted hover:text-foreground border"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label={`Wrap fee — ${wrapFee.toFixed(2)}%`}>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={wrapFee}
              onChange={(e) => setWrapFee(Number(e.target.value))}
              className="accent-accent-blue w-full"
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
              className="accent-accent-blue w-full"
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
              className="accent-accent-blue w-full"
            />
          </Field>
          <Field label={`Max leverage — ${maxLev}×`}>
            <input
              type="range"
              min={2}
              max={10}
              step={1}
              value={maxLev}
              onChange={(e) => setMaxLev(Number(e.target.value))}
              className="accent-accent-blue w-full"
            />
          </Field>
        </div>

        <div
          className={`rounded-xl border p-4 transition-colors ${
            closesDaily ? "border-warning/30 bg-warning/8" : "border-border bg-background"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-foreground text-sm font-medium">
                Closed-session gap premium
                {closesDaily ? null : (
                  <span className="text-foreground-subtle ml-2 text-xs font-normal">
                    (this asset trades 24/7)
                  </span>
                )}
              </p>
              <p className="text-foreground-muted mt-1 text-xs leading-relaxed">
                Extra AMM fee applied automatically whenever the underlying market is closed, so LPs
                are compensated for holding a position against a frozen reference price.
              </p>
            </div>
            <span className="tabular text-foreground shrink-0 text-sm font-semibold">
              +{gapPremium.toFixed(2)}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={0.6}
            step={0.05}
            value={gapPremium}
            disabled={!closesDaily}
            onChange={(e) => setGapPremium(Number(e.target.value))}
            className="accent-accent-blue mt-3 w-full disabled:opacity-40"
          />
        </div>

        <Field label="Revenue split" hint="LP rewards, pTKN burns and a fixed 15% protocol share.">
          <input
            type="range"
            min={0}
            max={60}
            step={5}
            value={burnShare}
            onChange={(e) => setBurnShare(Number(e.target.value))}
            className="accent-accent-blue w-full"
          />
          <div className="mt-3 flex h-2.5 overflow-hidden rounded-full">
            <span className="bg-accent-blue" style={{ width: `${lpShare}%` }} />
            <span className="bg-pod" style={{ width: `${burnShare}%` }} />
            <span className="bg-violet" style={{ width: "15%" }} />
          </div>
          <div className="text-foreground-muted mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-[11px]">
            <span>{lpShare}% LP rewards</span>
            <span>{burnShare}% burn (CBR growth)</span>
            <span>15% protocol</span>
          </div>
        </Field>

        <label className="border-border bg-background flex cursor-pointer items-start gap-3 rounded-xl border p-4">
          <input
            type="checkbox"
            checked={selfLend}
            onChange={(e) => setSelfLend(e.target.checked)}
            className="accent-accent-blue mt-0.5 h-4 w-4"
          />
          <span>
            <span className="text-foreground block text-sm font-medium">
              Bootstrap with self-lending
            </span>
            <span className="text-foreground-muted mt-1 block text-xs leading-relaxed">
              Flash-borrow the paired asset, supply it, borrow it back against your own LP. The
              market opens at 100% utilization as Proof of Demand, which is the signal that pulls
              real lenders in.
            </span>
          </span>
        </label>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="border-border bg-background-elevated card-shadow rounded-2xl border p-5">
          <p className="text-foreground-subtle text-[11px] tracking-wide uppercase">Preview</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="duo-gradient font-display flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white">
              {selected.symbol.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <p className="font-display text-foreground font-semibold">{ticker}</p>
              <p className="text-foreground-subtle text-xs">{selected.name}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            <Badge tone="accent">{ticker} / USDG</Badge>
            {selfLend ? <Badge tone="pod">Self-lending</Badge> : null}
            {closesDaily && gapPremium > 0 ? (
              <Badge tone="warn">Gap +{gapPremium.toFixed(2)}%</Badge>
            ) : null}
          </div>

          <div className="border-border mt-5 space-y-1.5 border-t pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground-muted">Wrap / unwrap</span>
              <span className="tabular font-medium">
                {wrapFee.toFixed(2)}% / {unwrapFee.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted">AMM fee</span>
              <span className="tabular font-medium">
                {ammFee.toFixed(2)}%
                {closesDaily && gapPremium > 0 ? (
                  <span className="text-warning"> +{gapPremium.toFixed(2)}%</span>
                ) : null}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted">Max leverage</span>
              <span className="tabular font-medium">{maxLev}×</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground-muted">Liquidation LTV</span>
              <span className="tabular font-medium">83.33%</span>
            </div>
          </div>

          <div className="border-border mt-4 border-t pt-4">
            <div className="flex justify-between text-xs">
              <span className="text-foreground-muted">Modelled first-month CBR growth</span>
              <span className="tabular text-pod-deep font-semibold">
                +{((wrapFee + unwrapFee + ammFee) * burnShare * 0.06).toFixed(2)}%
              </span>
            </div>
            <Meter value={(wrapFee + unwrapFee + ammFee) * burnShare * 1.4} tone="pod" className="mt-2" />
          </div>

          <ButtonAccent className="mt-5 w-full">Deploy pod</ButtonAccent>
          <p className="text-foreground-subtle mt-3 text-center text-[11px]">
            Immutable once deployed. Fees can never be changed.
          </p>
        </div>
      </div>
    </div>
  );
}
