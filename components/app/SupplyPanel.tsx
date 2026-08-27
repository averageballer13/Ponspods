"use client";

import { useState } from "react";
import { MARKETS } from "@/lib/data";
import { num, usd } from "@/lib/format";
import { ButtonAccent } from "@/components/ui";

export function SupplyPanel() {
  const [marketName, setMarketName] = useState(MARKETS[0].name);
  const [amount, setAmount] = useState("");
  const market = MARKETS.find((m) => m.name === marketName)!;
  const amt = Number(amount) || 0;
  const balance = 25_000;

  return (
    <div className="border-border bg-background-elevated card-shadow rounded-2xl border p-5">
      <h2 className="font-display text-base font-semibold">Supply</h2>
      <p className="text-foreground-subtle mt-1 text-xs">
        Lenders take no directional exposure. They earn the interest borrowers pay to farm.
      </p>

      <label className="text-foreground-subtle mt-5 block text-[11px] tracking-wide uppercase">
        Market
      </label>
      <select
        value={marketName}
        onChange={(e) => setMarketName(e.target.value)}
        className="border-border bg-background focus:border-accent-blue mt-2 w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
      >
        <optgroup label="Metavaults">
          {MARKETS.filter((m) => m.kind === "metavault").map((m) => (
            <option key={m.name} value={m.name}>
              {m.name} — {m.supplyApy.toFixed(1)}%
            </option>
          ))}
        </optgroup>
        <optgroup label="Isolated">
          {MARKETS.filter((m) => m.kind === "isolated").map((m) => (
            <option key={m.name} value={m.name}>
              {m.name} — {m.supplyApy.toFixed(1)}%
            </option>
          ))}
        </optgroup>
      </select>

      <div className="border-border bg-background focus-within:border-accent-blue focus-within:ring-accent-blue/15 mt-4 rounded-2xl border p-4 transition-colors focus-within:ring-4">
        <div className="flex items-center gap-3">
          <input
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="0.00"
            className="tabular text-foreground min-w-0 flex-1 bg-transparent text-2xl font-semibold outline-none"
          />
          <span className="bg-background-elevated-2 text-foreground shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold">
            {market.asset}
          </span>
        </div>
        <div className="text-foreground-subtle mt-2 flex items-center justify-between text-xs">
          <span>
            Balance <span className="tabular">{num(balance, 2)}</span>
          </span>
          <button
            onClick={() => setAmount(String(balance))}
            className="text-accent-blue hover:text-accent-blue-deep font-semibold transition-colors"
          >
            MAX
          </button>
        </div>
      </div>

      <div className="border-border mt-4 space-y-1.5 border-t pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-foreground-muted">Supply APY</span>
          <span className="tabular text-up font-semibold">{market.supplyApy.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground-muted">Utilization</span>
          <span className="tabular font-medium">{market.utilization}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground-muted">Projected yearly</span>
          <span className="tabular text-foreground font-medium">
            {usd((amt * market.supplyApy) / 100, { compact: false })}
          </span>
        </div>
      </div>

      {market.utilization > 95 ? (
        <div className="border-warning/30 bg-warning/8 mt-4 rounded-xl border p-3">
          <p className="text-warning text-xs font-semibold">Utilization above 95%</p>
          <p className="text-foreground-muted mt-1 text-[11px] leading-relaxed">
            Withdrawals may queue until borrowers repay or new supply arrives. The rate curve is
            steep here by design, which pulls supply in fast.
          </p>
        </div>
      ) : null}

      <ButtonAccent className="mt-4 w-full" disabled={!amt}>
        Supply {market.asset}
      </ButtonAccent>
    </div>
  );
}
