import { PODS } from "@/lib/data";
import { pct } from "@/lib/format";

const TAGS = [
  "TOKENIZED EQUITIES",
  "NO EMISSIONS",
  "VOLATILITY IS THE YIELD",
  "BUILT ON ROBINHOOD CHAIN",
  "CBR ONLY GOES UP",
  "PERMISSIONLESS PODS",
];

export function Marquee() {
  const row = [...TAGS, ...TAGS];
  return (
    <div className="border-border bg-background-elevated overflow-hidden border-y py-6">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-10">
            <span className="text-foreground-subtle font-display text-sm font-semibold tracking-[0.22em]">
              {t}
            </span>
            <span className="bg-pod inline-block h-1.5 w-1.5 rounded-full" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Market-data style ticker strip, used under the hero. */
export function PodTicker({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const row = [...PODS, ...PODS];
  return (
    <div
      className={`mask-fade-x overflow-hidden ${
        tone === "dark" ? "border-y border-white/10" : "border-border border-y"
      }`}
    >
      <div className="animate-ticker flex w-max items-center gap-8 py-3 whitespace-nowrap">
        {row.map((p, i) => (
          <span key={`${p.slug}-${i}`} className="flex items-center gap-2.5 px-1">
            <span
              className={`tabular text-[13px] font-semibold ${
                tone === "dark" ? "text-white/85" : "text-foreground"
              }`}
            >
              {p.ticker}
            </span>
            <span
              className={`tabular text-[13px] ${p.lvfApy >= 0 ? "text-up" : "text-down"}`}
              title="LVF APY"
            >
              {pct(p.lvfApy)}
            </span>
            <span className={tone === "dark" ? "text-white/20" : "text-border"}>|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
