"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORIES, CHAINS, PODS, type Category } from "@/lib/data";
import { usd } from "@/lib/format";
import { ApyText, Meter, Sparkline } from "@/components/ui";
import { PodAvatar, PodCard, SessionDot } from "@/components/app/PodCard";

type Sort = "lvf" | "vf" | "tvl" | "volume" | "cbr";

const SORTS: { id: Sort; label: string }[] = [
  { id: "lvf", label: "LVF APY" },
  { id: "vf", label: "VF APY" },
  { id: "tvl", label: "Pod TVL" },
  { id: "volume", label: "24h volume" },
  { id: "cbr", label: "CBR growth" },
];

export function PodsExplorer() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const [chain, setChain] = useState<string>("robinhood");
  const [sort, setSort] = useState<Sort>("lvf");
  const [view, setView] = useState<"grid" | "table">("grid");
  const [gapOnly, setGapOnly] = useState(false);

  const pods = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PODS.filter((p) => {
      if (chain !== "all" && p.chain !== chain) return false;
      if (cat !== "all" && p.category !== cat) return false;
      if (gapOnly && !(p.gapPremium > 0 && p.session === "closed")) return false;
      if (!needle) return true;
      return [p.ticker, p.name, p.underlying, p.underlyingName, p.paired]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    }).sort((a, b) => {
      switch (sort) {
        case "vf":
          return b.vfApy - a.vfApy;
        case "tvl":
          return b.tvl - a.tvl;
        case "volume":
          return b.volume24h - a.volume24h;
        case "cbr":
          return b.cbr30d - a.cbr30d;
        default:
          return b.lvfApy - a.lvfApy;
      }
    });
  }, [q, cat, chain, sort, gapOnly]);

  return (
    <div>
      {/* Controls */}
      <div className="border-border bg-background-elevated card-shadow rounded-2xl border p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <svg
              className="text-foreground-subtle pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2"
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10.6 10.6L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Pod ticker, pod name, wrapped asset or paired asset"
              className="border-border bg-background focus:border-accent-blue focus:ring-accent-blue/15 w-full rounded-full border py-2.5 pr-4 pl-10 text-sm outline-none transition-colors focus:ring-4"
            />
          </div>

          <div className="border-border flex items-center gap-0.5 rounded-full border p-1">
            <button
              onClick={() => setChain("all")}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                chain === "all" ? "bg-foreground text-background" : "text-foreground-subtle hover:text-foreground"
              }`}
            >
              ALL
            </button>
            {CHAINS.map((c) => (
              <button
                key={c.id}
                onClick={() => setChain(c.id)}
                title={c.label}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                  chain === c.id ? "text-white" : "text-foreground-subtle hover:text-foreground"
                }`}
                style={chain === c.id ? { background: c.tint } : undefined}
              >
                {c.short}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-foreground-subtle text-[11px] font-medium tracking-wide uppercase">
              Sort
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="border-border bg-background focus:border-accent-blue rounded-full border px-3 py-2 text-sm outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>

            <div className="border-border flex rounded-full border p-1">
              <button
                onClick={() => setView("grid")}
                aria-label="Grid view"
                className={`rounded-full px-2.5 py-1.5 transition-colors ${
                  view === "grid" ? "bg-foreground text-background" : "text-foreground-subtle"
                }`}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                  <rect x="0" y="0" width="6" height="6" rx="1.4" />
                  <rect x="8" y="0" width="6" height="6" rx="1.4" />
                  <rect x="0" y="8" width="6" height="6" rx="1.4" />
                  <rect x="8" y="8" width="6" height="6" rx="1.4" />
                </svg>
              </button>
              <button
                onClick={() => setView("table")}
                aria-label="Table view"
                className={`rounded-full px-2.5 py-1.5 transition-colors ${
                  view === "table" ? "bg-foreground text-background" : "text-foreground-subtle"
                }`}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                  <rect x="0" y="1" width="14" height="2.6" rx="1.2" />
                  <rect x="0" y="5.7" width="14" height="2.6" rx="1.2" />
                  <rect x="0" y="10.4" width="14" height="2.6" rx="1.2" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="border-border mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
          <button
            onClick={() => setCat("all")}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              cat === "all"
                ? "bg-accent-blue-soft text-accent-blue-deep"
                : "text-foreground-muted hover:bg-background-elevated-2"
            }`}
          >
            All pods
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                cat === c.id
                  ? "bg-accent-blue-soft text-accent-blue-deep"
                  : "text-foreground-muted hover:bg-background-elevated-2"
              }`}
            >
              {c.label}
            </button>
          ))}
          <span className="bg-border mx-1 hidden h-4 w-px sm:block" />
          <button
            onClick={() => setGapOnly((v) => !v)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              gapOnly ? "bg-warning/15 text-warning" : "text-foreground-muted hover:bg-background-elevated-2"
            }`}
          >
            <span className="bg-warning h-1.5 w-1.5 rounded-full" />
            Gap premium live
          </button>
          <span className="text-foreground-subtle ml-auto text-xs">
            {pods.length} pod{pods.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {/* Results */}
      {pods.length === 0 ? (
        <div className="border-border text-foreground-subtle mt-6 rounded-2xl border border-dashed p-16 text-center text-sm">
          No pod matches those filters.
        </div>
      ) : view === "grid" ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {pods.map((p) => (
            <PodCard key={p.slug} pod={p} />
          ))}
        </div>
      ) : (
        <div className="border-border bg-background-elevated card-shadow mt-6 overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[1080px] text-sm">
            <thead>
              <tr className="border-border text-foreground-subtle border-b text-left text-[11px] tracking-[0.1em] uppercase">
                <th className="px-5 py-3 font-semibold">Pod</th>
                <th className="px-3 py-3 font-semibold">LVF APY</th>
                <th className="px-3 py-3 font-semibold">VF APY</th>
                <th className="px-3 py-3 font-semibold">TVL</th>
                <th className="px-3 py-3 font-semibold">24h vol</th>
                <th className="px-3 py-3 font-semibold">24h fees</th>
                <th className="px-3 py-3 font-semibold">CBR</th>
                <th className="px-3 py-3 font-semibold">Borrow</th>
                <th className="px-3 py-3 font-semibold">Util.</th>
                <th className="px-3 py-3 font-semibold">Session</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {pods.map((p) => (
                <tr
                  key={p.slug}
                  className="border-border hover:bg-background-elevated-2/60 border-b transition-colors last:border-b-0"
                >
                  <td className="px-5 py-3.5">
                    <Link href={`/app/pod/${p.slug}`} className="flex items-center gap-3">
                      <PodAvatar pod={p} size={32} />
                      <span>
                        <span className="font-display text-foreground block font-semibold">
                          {p.ticker}
                        </span>
                        <span className="text-foreground-subtle block text-xs">
                          {p.underlying} / {p.paired}
                        </span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2">
                      <ApyText value={p.lvfApy} />
                      <Sparkline seed={p.slug} positive={p.lvfApy >= 0} width={54} height={20} />
                    </div>
                  </td>
                  <td className="tabular text-foreground-muted px-3 py-3.5">{p.vfApy.toFixed(1)}%</td>
                  <td className="tabular text-foreground px-3 py-3.5 font-medium">{usd(p.tvl)}</td>
                  <td className="tabular text-foreground-muted px-3 py-3.5">{usd(p.volume24h)}</td>
                  <td className="tabular text-foreground-muted px-3 py-3.5">{usd(p.fees24h)}</td>
                  <td className="tabular text-pod-deep px-3 py-3.5 font-medium">
                    {p.cbr.toFixed(3)}
                    <span className="text-foreground-subtle ml-1 text-[11px]">+{p.cbr30d}%</span>
                  </td>
                  <td className="tabular text-foreground-muted px-3 py-3.5">{p.borrowApr.toFixed(1)}%</td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2">
                      <Meter
                        value={p.utilization}
                        tone={p.utilization > 95 ? "warn" : "accent"}
                        className="w-14"
                      />
                      <span className="tabular text-foreground-subtle text-xs">{p.utilization}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <SessionDot session={p.session} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/app/pod/${p.slug}#lvf`}
                      className="bg-foreground text-background hover:bg-accent-blue inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
