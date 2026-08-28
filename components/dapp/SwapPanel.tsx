"use client";

import { useState } from "react";
import { PODS } from "@/lib/pods";
import { Pending } from "@/components/ui";
import { AmountField, Row } from "@/components/dapp/bits";

const INPUTS = ["USDG", "USDC", "ETH", "PODS"];
type Destination = "wrap" | "lp" | "lvf";

const DEST: { id: Destination; label: string }[] = [
  { id: "wrap", label: "Hold pod token" },
  { id: "lp", label: "Provide liquidity" },
  { id: "lvf", label: "Leveraged position" },
];

export function SwapPanel() {
  const [from, setFrom] = useState("USDG");
  const [slug, setSlug] = useState(PODS[0].slug);
  const [dest, setDest] = useState<Destination>("lvf");
  const [amount, setAmount] = useState("");

  const pod = PODS.find((p) => p.slug === slug)!;

  const route = [
    from,
    `${pod.company} token`,
    pod.ticker,
    ...(dest !== "wrap" ? [`${pod.ticker} / ${pod.paired} LP`] : []),
    ...(dest === "lvf" ? ["LVF vault"] : []),
  ];

  return (
    <div className="card-shell">
      <div className="card-inner p-5">
        <AmountField value={amount} onChange={setAmount} symbol={from} label="You pay" />

        <div className="flex justify-center py-2">
          <span className="border-line flex h-10 w-10 items-center justify-center rounded-full border bg-[#070f05]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 3v10M4 9l4 4 4-4"
                stroke="#7fe339"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <div className="border-line rounded-2xl border bg-[#070f05] p-4">
          <p className="text-sage/60 mb-2 text-[11px] font-bold tracking-[0.12em] uppercase">
            You receive
          </p>
          <div className="flex items-center gap-3">
            <span className="min-w-0 flex-1 truncate text-2xl font-extrabold">
              <Pending />
            </span>
            <select
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="border-line shrink-0 rounded-full border bg-[#0d1e0a] px-3 py-1.5 text-sm font-bold text-white outline-none"
            >
              {PODS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.ticker}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-1.5 rounded-full bg-[#070f05] p-1">
          {DEST.map((d) => (
            <button
              key={d.id}
              onClick={() => setDest(d.id)}
              className={`rounded-full px-2 py-2.5 text-[11px] font-bold transition-colors ${
                dest === d.id ? "app-nav-active" : "text-white/50 hover:text-white"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="mt-5">
          <p className="text-sage/60 text-[11px] font-bold tracking-[0.12em] uppercase">Route</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            {route.map((r, i) => (
              <span key={r} className="flex items-center gap-1.5">
                <span className="border-line rounded-full border bg-[#070f05] px-2.5 py-1 text-[11px] font-semibold text-white/65">
                  {r}
                </span>
                {i < route.length - 1 ? (
                  <span className="text-lime/60 text-[11px]">→</span>
                ) : null}
              </span>
            ))}
          </div>
        </div>

        <div className="border-line/70 mt-5 border-t pt-3">
          <Row label="Input source" value={from} />
          <Row label="Price impact" value={<Pending />} />
          <Row label="Resulting APY" value={<Pending />} />
        </div>

        <div className="mt-4 flex gap-2">
          {INPUTS.map((i) => (
            <button
              key={i}
              onClick={() => setFrom(i)}
              className={`flex-1 rounded-full px-2 py-2 text-xs font-bold transition-colors ${
                from === i
                  ? "app-nav-active"
                  : "border-line border text-white/50 hover:text-white"
              }`}
            >
              {i}
            </button>
          ))}
        </div>

        <button
          disabled
          className="mt-4 w-full cursor-not-allowed rounded-full bg-white/10 px-4 py-3 text-sm font-extrabold text-white/40"
        >
          Routing opens at launch
        </button>
      </div>
    </div>
  );
}
