"use client";

import { useMemo, useState } from "react";
import { MAX_LEVERAGE, MAX_LTV } from "@/lib/protocol";
import { BrandMark } from "@/components/ui";
import { Meter } from "@/components/dapp/bits";
import { ActionButton } from "@/components/dapp/WalletProvider";

const ASSETS = [
  { brand: "nvidia", symbol: "NVDA", name: "Nvidia", closes: true },
  { brand: "apple", symbol: "AAPL", name: "Apple", closes: true },
  { brand: "microsoft", symbol: "MSFT", name: "Microsoft", closes: true },
  { brand: "amazon", symbol: "AMZN", name: "Amazon", closes: true },
  { brand: "meta", symbol: "META", name: "Meta", closes: true },
  { brand: "google", symbol: "GOOGL", name: "Alphabet", closes: true },
  { brand: "tesla", symbol: "TSLA", name: "Tesla", closes: true },
  { brand: "robinhood", symbol: "HOOD", name: "Robinhood Markets", closes: true },
  { brand: "microstrategy", symbol: "MSTR", name: "Strategy", closes: true },
  { brand: "palantir", symbol: "PLTR", name: "Palantir", closes: true },
  { brand: "coinbase", symbol: "COIN", name: "Coinbase", closes: true },
  { brand: "netflix", symbol: "NFLX", name: "Netflix", closes: true },
  { brand: "amd", symbol: "AMD", name: "AMD", closes: true },
  { brand: "spacex", symbol: "SPACEX", name: "SpaceX", closes: false },
];

type Mode = "single" | "basket";

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
      <p className="text-sm font-bold text-white">{label}</p>
      {hint ? <p className="mt-1 text-xs leading-relaxed text-white/40">{hint}</p> : null}
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function CreatePodForm() {
  const [mode, setMode] = useState<Mode>("single");
  const [picked, setPicked] = useState<string[]>(["NVDA"]);
  const [weights, setWeights] = useState<Record<string, number>>({ NVDA: 1 });
  const [customTicker, setCustomTicker] = useState("");
  const [rebalance, setRebalance] = useState("Quarterly");

  const [wrapFee, setWrapFee] = useState(0.25);
  const [unwrapFee, setUnwrapFee] = useState(0.5);
  const [ammFee, setAmmFee] = useState(0.5);
  const [gapPremium, setGapPremium] = useState(0.25);
  const [burnShare, setBurnShare] = useState(25);
  const [selfLend, setSelfLend] = useState(true);

  const assets = picked
    .map((s) => ASSETS.find((a) => a.symbol === s)!)
    .filter(Boolean);

  const totalWeight = picked.reduce((sum, s) => sum + (weights[s] ?? 1), 0) || 1;
  const normalized = useMemo(
    () =>
      picked.map((s) => ({
        symbol: s,
        brand: ASSETS.find((a) => a.symbol === s)!.brand,
        pct: ((weights[s] ?? 1) / totalWeight) * 100,
      })),
    [picked, weights, totalWeight],
  );

  /** A basket follows market hours if any constituent does. */
  const closes = assets.some((a) => a.closes);

  const ticker =
    mode === "single"
      ? picked[0]
        ? `p${picked[0]}`
        : "pTKN"
      : customTicker.trim()
        ? `p${customTicker.trim().toUpperCase().replace(/^P/, "")}`
        : `pBASKET${picked.length || ""}`;

  const lpShare = 100 - burnShare - 15;
  const totalFee = ammFee + (closes ? gapPremium : 0);

  function toggle(symbol: string) {
    if (mode === "single") {
      setPicked([symbol]);
      return;
    }
    // Pure updater: weights default to 1 when read, so nothing to seed here.
    setPicked((prev) => {
      if (prev.includes(symbol)) {
        const next = prev.filter((s) => s !== symbol);
        return next.length ? next : prev;
      }
      return prev.length >= 10 ? prev : [...prev, symbol];
    });
  }

  function switchMode(next: Mode) {
    setMode(next);
    if (next === "single" && picked.length > 1) {
      setPicked([picked[0]]);
      setWeights({ [picked[0]]: 1 });
    }
  }

  const PALETTE = ["#ffffff", "#7fe339", "#dcecd4", "#4a7a3b", "#9db894", "#2c5c22"];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
      <div className="card-shell">
        <div className="card-inner space-y-8 p-6 sm:p-8">
          <Field
            label="What goes in the Pod"
            hint="A Pod can wrap a single asset or a whole basket into one token. A basket behaves like an index fund whose fees shrink the supply instead of charging you a management fee."
          >
            <div className="flex gap-2">
              {(
                [
                  ["single", "Single asset"],
                  ["basket", "Basket"],
                ] as [Mode, string][]
              ).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => switchMode(id)}
                  className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                    mode === id
                      ? "app-nav-active"
                      : "border-line border text-white/45 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </Field>

          <Field
            label={mode === "single" ? "Underlying asset" : `Constituents — ${picked.length} selected`}
            hint={
              mode === "single"
                ? "Any tokenized asset with a freely transferable ERC-20."
                : "Pick up to ten. Weights are set below and normalised to 100%."
            }
          >
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">
              {ASSETS.map((a) => {
                const on = picked.includes(a.symbol);
                return (
                  <button
                    key={a.symbol}
                    onClick={() => toggle(a.symbol)}
                    title={a.name}
                    className={`relative flex flex-col items-center gap-2 rounded-xl border px-2 py-3.5 transition-colors ${
                      on
                        ? "border-lime/60 bg-lime/10"
                        : "border-line bg-[#070f05] hover:border-[#2c5c22]"
                    }`}
                  >
                    {on && mode === "basket" ? (
                      <span className="bg-lime absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full">
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path
                            d="M2.5 6.3l2.4 2.4L9.5 4"
                            stroke="#040703"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    ) : null}
                    <BrandMark brand={a.brand} size={22} />
                    <span className="text-[10px] font-bold text-white/70">{a.symbol}</span>
                  </button>
                );
              })}
            </div>
          </Field>

          {mode === "basket" ? (
            <>
              <Field label="Weights" hint="Drag to set relative size. The Pod normalises them to 100%.">
                <div className="space-y-3.5">
                  {normalized.map((c) => (
                    <div key={c.symbol} className="flex items-center gap-4">
                      <span className="flex w-24 shrink-0 items-center gap-2">
                        <BrandMark brand={c.brand} size={16} />
                        <span className="text-xs font-bold text-white/70">{c.symbol}</span>
                      </span>
                      <input
                        type="range"
                        min={0.2}
                        max={5}
                        step={0.1}
                        value={weights[c.symbol] ?? 1}
                        onChange={(e) =>
                          setWeights((w) => ({ ...w, [c.symbol]: Number(e.target.value) }))
                        }
                        className="accent-lime flex-1"
                      />
                      <span className="tnum w-12 shrink-0 text-right text-xs font-extrabold">
                        {c.pct.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </Field>

              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="Basket name" hint="Prefixed with p automatically.">
                  <input
                    value={customTicker}
                    onChange={(e) => setCustomTicker(e.target.value.slice(0, 12))}
                    placeholder="MAG7"
                    className="border-line focus:border-line-2 w-full rounded-xl border bg-[#070f05] px-4 py-2.5 text-sm font-bold text-white outline-none transition-colors placeholder:text-white/20"
                  />
                </Field>
                <Field label="Rebalance" hint="Each rebalance is itself a fee event for the Pod.">
                  <div className="flex gap-2">
                    {["Monthly", "Quarterly", "Never"].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRebalance(r)}
                        className={`rounded-full px-3.5 py-2 text-xs font-bold transition-colors ${
                          rebalance === r
                            ? "app-nav-active"
                            : "border-line border text-white/45 hover:text-white"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            </>
          ) : null}

          <Field
            label="Paired asset"
            hint="One shared stablecoin keeps every Pod inside the same deep lending market."
          >
            <div className="flex gap-2">
              {["USDG", "PODS", "pTBILL"].map((p) => (
                <button
                  key={p}
                  className={`rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                    p === "USDG"
                      ? "app-nav-active"
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
                className="accent-lime w-full"
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
                className="accent-lime w-full"
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
                className="accent-lime w-full"
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
                className="accent-lime w-full"
              />
            </Field>
          </div>

          <div
            className={`rounded-xl border p-5 transition-colors ${
              closes ? "border-[#e0a23b]/30 bg-[#e0a23b]/8" : "border-line bg-[#070f05] opacity-60"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold">
                  Closed-session gap premium
                  {closes ? null : (
                    <span className="ml-2 text-xs font-normal text-white/40">
                      (nothing in this Pod closes)
                    </span>
                  )}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/50">
                  Extra AMM fee applied while the underlying market is shut, so liquidity providers
                  are paid for holding against a frozen reference price rather than being picked off
                  by it.
                </p>
              </div>
              <span className="tnum shrink-0 text-sm font-extrabold">+{gapPremium.toFixed(2)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={0.6}
              step={0.05}
              value={gapPremium}
              disabled={!closes}
              onChange={(e) => setGapPremium(Number(e.target.value))}
              className="accent-lime mt-4 w-full disabled:opacity-30"
            />
          </div>

          <Field
            label="Revenue split"
            hint="Liquidity providers, pod-token burns, and a fixed protocol share."
          >
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
                The market opens at full utilisation as Proof of Demand, which is the signal that
                pulls real lenders in.
              </span>
            </span>
          </label>
        </div>
      </div>

      <div className="lg:sticky lg:top-24">
        <div className="card-shell">
          <div className="card-inner p-6">
            <p className="text-sage/55 text-[10px] font-bold tracking-[0.14em] uppercase">Preview</p>

            <div className="mt-5 flex items-center gap-4">
              {picked.length > 1 ? (
                <span className="flex items-center">
                  {normalized.slice(0, 4).map((c, i) => (
                    <span
                      key={c.symbol}
                      className="border-line flex h-11 w-11 items-center justify-center rounded-xl border bg-[#070f05]"
                      style={{ marginLeft: i === 0 ? 0 : -14, zIndex: 4 - i }}
                    >
                      <BrandMark brand={c.brand} size={19} />
                    </span>
                  ))}
                </span>
              ) : (
                <span className="border-line flex h-14 w-14 items-center justify-center rounded-xl border bg-[#070f05]">
                  {assets[0] ? <BrandMark brand={assets[0].brand} size={26} /> : null}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate text-xl font-extrabold">{ticker}</p>
                <p className="truncate text-xs font-semibold text-white/40">
                  {picked.length > 1 ? `${picked.length} assets` : (assets[0]?.name ?? "—")}
                </p>
              </div>
            </div>

            {picked.length > 1 ? (
              <div className="mt-5">
                <div className="flex h-2.5 overflow-hidden rounded-full">
                  {normalized.map((c, i) => (
                    <span
                      key={c.symbol}
                      style={{ width: `${c.pct}%`, background: PALETTE[i % PALETTE.length] }}
                    />
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[10px] font-semibold text-white/45">
                  {normalized.map((c, i) => (
                    <span key={c.symbol} className="flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: PALETTE[i % PALETTE.length] }}
                      />
                      {c.symbol} {c.pct.toFixed(0)}%
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="border-line/70 mt-6 space-y-2.5 border-t pt-5 text-sm">
              {[
                ["Pair", `${ticker} / USDG`],
                ["Wrap / unwrap", `${wrapFee.toFixed(2)}% / ${unwrapFee.toFixed(2)}%`],
                [
                  "AMM fee",
                  closes
                    ? `${ammFee.toFixed(2)}% (+${gapPremium.toFixed(2)}% closed)`
                    : `${ammFee.toFixed(2)}%`,
                ],
                ["Round-trip cost", `${(totalFee + unwrapFee).toFixed(2)}%`],
                ...(picked.length > 1 ? [["Rebalance", rebalance]] : []),
                ["Liquidation LTV", `${(MAX_LTV * 100).toFixed(2)}%`],
                ["Leverage ceiling", `${MAX_LEVERAGE}×`],
                ["Self-lending", selfLend ? "On" : "Off"],
              ].map(([l, v]) => (
                <div key={l} className="flex items-center justify-between gap-3">
                  <span className="shrink-0 text-white/45">{l}</span>
                  <span className="tnum truncate font-bold">{v}</span>
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
                too wide and nobody corrects the Pod; too tight and each correction pays little. It
                is the single most important number here.
              </p>
            </div>

            <ActionButton
              className="mt-6"
              tx={{
                title: `Deploy ${ticker}`,
                rows: [
                  ["Underlying", picked.length > 1 ? `${picked.length} assets` : picked[0]],
                  ["Pair", `${ticker} / USDG`],
                  ["Wrap / unwrap", `${wrapFee.toFixed(2)}% / ${unwrapFee.toFixed(2)}%`],
                  ["AMM fee", `${ammFee.toFixed(2)}%`],
                  ["Burn share", `${burnShare}%`],
                  ["Self-lending", selfLend ? "On" : "Off"],
                ],
                note: "Pod parameters are immutable once deployed.",
              }}
            >
              Deploy pod
            </ActionButton>
            <p className="mt-3 text-center text-[11px] text-white/35">
              Immutable once deployed. Fees can never be changed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
