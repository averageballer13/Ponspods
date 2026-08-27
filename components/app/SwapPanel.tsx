"use client";

import { useState } from "react";
import { PODS } from "@/lib/data";
import { num } from "@/lib/format";
import { ButtonAccent } from "@/components/ui";

const INPUTS = ["USDG", "PONS", "USDC", "ETH"];
type Destination = "wrap" | "lp" | "lvf";

const DEST_LABEL: Record<Destination, string> = {
  wrap: "Hold pTKN",
  lp: "Provide liquidity",
  lvf: "Leveraged position",
};

export function SwapPanel() {
  const [from, setFrom] = useState("USDG");
  const [slug, setSlug] = useState(PODS[1].slug);
  const [dest, setDest] = useState<Destination>("lvf");
  const [amount, setAmount] = useState("");

  const pod = PODS.find((p) => p.slug === slug)!;
  const amt = Number(amount) || 0;
  const price = 118.4;
  const out = (amt / price) * (1 - pod.wrapFee / 100) / pod.cbr;
  const apy = dest === "lvf" ? pod.lvfApy : dest === "lp" ? pod.vfApy : pod.cbr30d * 12;

  const route = [
    from,
    pod.underlying,
    pod.ticker,
    ...(dest !== "wrap" ? [`${pod.ticker}/${pod.paired} LP`] : []),
    ...(dest === "lvf" ? ["LVF vault"] : []),
  ];

  return (
    <div className="border-border bg-background-elevated card-shadow rounded-2xl border p-5">
      <div className="border-border bg-background rounded-2xl border p-4">
        <div className="text-foreground-subtle mb-2 flex justify-between text-[11px] tracking-wide uppercase">
          <span>You pay</span>
          <span>Balance 25,000.00</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="0.00"
            className="tabular text-foreground min-w-0 flex-1 bg-transparent text-2xl font-semibold outline-none"
          />
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border-border bg-background-elevated-2 text-foreground shrink-0 rounded-full border px-3 py-1.5 text-sm font-semibold outline-none"
          >
            {INPUTS.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative flex justify-center py-1">
        <span className="border-border bg-background-elevated text-accent-blue z-10 flex h-9 w-9 items-center justify-center rounded-full border">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 3v10M4 9l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className="border-accent-blue/25 bg-accent-blue-soft/30 rounded-2xl border p-4">
        <div className="text-foreground-subtle mb-2 flex justify-between text-[11px] tracking-wide uppercase">
          <span>You receive</span>
          <span>{DEST_LABEL[dest]}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="tabular text-foreground min-w-0 flex-1 truncate text-2xl font-semibold">
            {amt ? num(out, 4) : "0.00"}
          </span>
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="border-border shrink-0 rounded-full border bg-white px-3 py-1.5 text-sm font-semibold outline-none"
          >
            {PODS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.ticker}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-background-elevated-2 mt-4 flex rounded-full p-1">
        {(Object.keys(DEST_LABEL) as Destination[]).map((d) => (
          <button
            key={d}
            onClick={() => setDest(d)}
            className={`flex-1 rounded-full px-2 py-2 text-xs font-semibold transition-all duration-200 ${
              dest === d ? "bg-foreground text-background" : "text-foreground-muted hover:text-foreground"
            }`}
          >
            {DEST_LABEL[d]}
          </button>
        ))}
      </div>

      <div className="border-border mt-4 border-t pt-4">
        <p className="text-foreground-subtle text-[11px] tracking-wide uppercase">Route</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {route.map((r, i) => (
            <span key={r} className="flex items-center gap-1.5">
              <span className="bg-background-elevated-2 text-foreground-muted rounded-full px-2.5 py-1 text-[11px] font-medium">
                {r}
              </span>
              {i < route.length - 1 ? (
                <span className="text-foreground-subtle text-[11px]">→</span>
              ) : null}
            </span>
          ))}
        </div>
      </div>

      <div className="border-border mt-4 space-y-1.5 border-t pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-foreground-muted">Resulting APY</span>
          <span className="tabular text-up font-semibold">{apy.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground-muted">Wrap fee</span>
          <span className="tabular font-medium">{pod.wrapFee}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground-muted">Price impact</span>
          <span className="tabular text-warning font-medium">
            {amt > 10000 ? "1.24%" : amt > 0 ? "0.18%" : "—"}
          </span>
        </div>
      </div>

      <ButtonAccent className="mt-4 w-full" disabled={!amt}>
        Zap into {pod.ticker}
      </ButtonAccent>
    </div>
  );
}
