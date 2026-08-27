"use client";

import { useMemo, useState } from "react";
import type { Pod } from "@/lib/data";
import { num, usd } from "@/lib/format";
import { ButtonAccent, Meter } from "@/components/ui";

const MAX_LTV = 0.8333;

type Tab = "wrap" | "unwrap" | "lvf";

function Row({ label, value, tone }: { label: string; value: string; tone?: "up" | "down" | "warn" }) {
  const cls =
    tone === "up"
      ? "text-up"
      : tone === "down"
        ? "text-down"
        : tone === "warn"
          ? "text-warning"
          : "text-foreground";
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-foreground-muted">{label}</span>
      <span className={`tabular font-medium ${cls}`}>{value}</span>
    </div>
  );
}

function AmountInput({
  value,
  onChange,
  symbol,
  balance,
}: {
  value: string;
  onChange: (v: string) => void;
  symbol: string;
  balance: number;
}) {
  return (
    <div className="border-border bg-background focus-within:border-accent-blue focus-within:ring-accent-blue/15 rounded-2xl border p-4 transition-colors focus-within:ring-4">
      <div className="flex items-center gap-3">
        <input
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
          placeholder="0.00"
          className="tabular text-foreground min-w-0 flex-1 bg-transparent text-2xl font-semibold outline-none"
        />
        <span className="bg-background-elevated-2 text-foreground shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold">
          {symbol}
        </span>
      </div>
      <div className="text-foreground-subtle mt-2 flex items-center justify-between text-xs">
        <span>
          Balance <span className="tabular">{num(balance, 2)}</span>
        </span>
        <button
          onClick={() => onChange(String(balance))}
          className="text-accent-blue hover:text-accent-blue-deep font-semibold transition-colors"
        >
          MAX
        </button>
      </div>
    </div>
  );
}

export function PodActions({ pod }: { pod: Pod }) {
  const [tab, setTab] = useState<Tab>("lvf");
  const [amount, setAmount] = useState("");
  const [leverage, setLeverage] = useState(Math.min(3, pod.maxLeverage));

  const amt = Number(amount) || 0;
  const balances = { tkn: 1250, ptkn: 840, usdg: 25_000 };

  const wrapOut = (amt * (1 - pod.wrapFee / 100)) / pod.cbr;
  const unwrapOut = amt * pod.cbr * (1 - pod.unwrapFee / 100);

  const lvf = useMemo(() => {
    const deposit = amt;
    const position = deposit * leverage;
    const debt = deposit * (leverage - 1);
    const ltv = leverage > 1 ? (leverage - 1) / leverage : 0;
    const health = ltv > 0 ? MAX_LTV / ltv : Infinity;
    // Full-range LP value scales with sqrt(price), so a drop of x hits value by sqrt(1-x).
    const liqDrop = ltv > 0 ? Math.max(0, 1 - Math.pow(ltv / MAX_LTV, 2)) : 1;
    const netApy = pod.vfApy * leverage - pod.borrowApr * (leverage - 1);
    const weekly = (position * (netApy / 100)) / 52;
    return { deposit, position, debt, ltv, health, liqDrop, netApy, weekly };
  }, [amt, leverage, pod.vfApy, pod.borrowApr]);

  const risky = lvf.ltv > 0.72;

  return (
    <div className="border-border bg-background-elevated card-shadow rounded-2xl border p-5">
      <div className="bg-background-elevated-2 flex rounded-full p-1">
        {(
          [
            ["lvf", "Leverage"],
            ["wrap", "Wrap"],
            ["unwrap", "Unwrap"],
          ] as [Tab, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => {
              setTab(id);
              setAmount("");
            }}
            className={`flex-1 rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200 ${
              tab === id ? "bg-foreground text-background" : "text-foreground-muted hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "wrap" ? (
        <div className="mt-5">
          <p className="text-foreground-subtle mb-2 text-xs">Deposit {pod.underlying}</p>
          <AmountInput value={amount} onChange={setAmount} symbol={pod.underlying} balance={balances.tkn} />
          <div className="border-border mt-4 border-t pt-3">
            <Row label="Wrap fee" value={`${pod.wrapFee}%`} />
            <Row label="Current CBR" value={pod.cbr.toFixed(4)} />
            <Row label="You receive" value={`${num(wrapOut)} ${pod.ticker}`} tone="up" />
          </div>
          <p className="text-foreground-subtle mt-3 text-[11px] leading-relaxed">
            Wrapping mints fewer pTKN than TKN deposited because each pTKN already redeems for{" "}
            {pod.cbr.toFixed(3)} {pod.underlying}. That ratio only goes up.
          </p>
          <ButtonAccent className="mt-4 w-full" disabled={!amt}>
            Wrap into {pod.ticker}
          </ButtonAccent>
        </div>
      ) : null}

      {tab === "unwrap" ? (
        <div className="mt-5">
          <p className="text-foreground-subtle mb-2 text-xs">Redeem {pod.ticker}</p>
          <AmountInput value={amount} onChange={setAmount} symbol={pod.ticker} balance={balances.ptkn} />
          <div className="border-border mt-4 border-t pt-3">
            <Row label="Unwrap fee" value={`${pod.unwrapFee}%`} tone="warn" />
            <Row label="Current CBR" value={pod.cbr.toFixed(4)} />
            <Row label="You receive" value={`${num(unwrapOut)} ${pod.underlying}`} tone="up" />
          </div>
          <div className="border-border bg-background mt-3 rounded-xl border border-dashed p-3">
            <p className="text-foreground text-xs font-medium">Cooldown available</p>
            <p className="text-foreground-subtle mt-1 text-[11px] leading-relaxed">
              Queue the redemption for 7 days to skip the {pod.unwrapFee}% unwrap fee entirely. Your
              pTKN keeps accruing CBR while it waits.
            </p>
          </div>
          <ButtonAccent className="mt-4 w-full" disabled={!amt}>
            Unwrap to {pod.underlying}
          </ButtonAccent>
        </div>
      ) : null}

      {tab === "lvf" ? (
        <div className="mt-5">
          <p className="text-foreground-subtle mb-2 text-xs">
            Deposit {pod.ticker} — the protocol borrows the {pod.paired} side for you
          </p>
          <AmountInput value={amount} onChange={setAmount} symbol={pod.ticker} balance={balances.ptkn} />

          <div className="mt-5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-foreground-muted">Leverage</span>
              <span className="tabular text-foreground font-semibold">{leverage.toFixed(1)}×</span>
            </div>
            <input
              type="range"
              min={1}
              max={pod.maxLeverage}
              step={0.1}
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="accent-accent-blue mt-3 w-full"
            />
            <div className="text-foreground-subtle mt-1 flex justify-between text-[10px]">
              <span>1×</span>
              <span>{pod.maxLeverage}× max</span>
            </div>
          </div>

          <div className="border-border mt-4 space-y-0.5 border-t pt-3">
            <Row label="LP position size" value={usd(lvf.position, { compact: false })} />
            <Row label={`Borrowed ${pod.paired}`} value={usd(lvf.debt, { compact: false })} />
            <Row label="Borrow APR" value={`${pod.borrowApr.toFixed(1)}%`} tone="warn" />
            <Row
              label="Net LVF APY"
              value={`${lvf.netApy >= 0 ? "" : "-"}${Math.abs(lvf.netApy).toFixed(1)}%`}
              tone={lvf.netApy >= 0 ? "up" : "down"}
            />
            <Row label="Est. weekly fees" value={usd(lvf.weekly, { compact: false })} tone="up" />
          </div>

          <div className="border-border mt-4 rounded-xl border p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-foreground-muted">LTV</span>
              <span className="tabular text-foreground font-semibold">
                {(lvf.ltv * 100).toFixed(1)}% / 83.33%
              </span>
            </div>
            <Meter value={(lvf.ltv / MAX_LTV) * 100} tone={risky ? "warn" : "accent"} className="mt-2" />
            <div className="mt-3 flex justify-between text-[11px]">
              <span className="text-foreground-subtle">
                Health{" "}
                <span className={`tabular font-semibold ${risky ? "text-warning" : "text-pod-deep"}`}>
                  {Number.isFinite(lvf.health) ? lvf.health.toFixed(2) : "∞"}
                </span>
              </span>
              <span className="text-foreground-subtle">
                Liquidation at{" "}
                <span className="tabular text-down font-semibold">
                  −{(lvf.liqDrop * 100).toFixed(0)}%
                </span>
              </span>
            </div>
          </div>

          {pod.session === "closed" && pod.gapPremium > 0 ? (
            <div className="border-warning/30 bg-warning/8 mt-3 rounded-xl border p-3">
              <p className="text-warning text-xs font-semibold">Gap premium is live</p>
              <p className="text-foreground-muted mt-1 text-[11px] leading-relaxed">
                {pod.underlying} is closed, so the pod charges an extra {pod.gapPremium.toFixed(2)}%
                on AMM trades. Fee income is elevated and so is stale-price risk on Monday.
              </p>
            </div>
          ) : null}

          <ButtonAccent className="mt-4 w-full" disabled={!amt}>
            Open {leverage.toFixed(1)}× position
          </ButtonAccent>
          <p className="text-foreground-subtle mt-3 text-center text-[11px]">
            Self-lending bootstraps the {pod.paired} market in the same transaction.
          </p>
        </div>
      ) : null}
    </div>
  );
}
