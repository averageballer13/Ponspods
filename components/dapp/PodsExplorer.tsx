"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PODS, type Category } from "@/lib/pods";
import { BrandChip, BrandCluster, Pending } from "@/components/ui";

const FILTERS: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All pods" },
  { id: "equity", label: "Equities" },
  { id: "index", label: "Baskets" },
];

export function PodsExplorer() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const [view, setView] = useState<"grid" | "table">("grid");

  const pods = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PODS.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (!needle) return true;
      return `${p.ticker} ${p.company} ${p.paired} ${p.tag}`.toLowerCase().includes(needle);
    });
  }, [q, cat]);

  return (
    <div>
      <div className="card-shell">
        <div className="card-inner p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <svg
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-white/30"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="7" cy="7" r="4.6" stroke="currentColor" strokeWidth="1.7" />
                <path d="M10.6 10.6L14 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by pod, company or paired asset"
                className="border-line focus:border-line-2 w-full rounded-full border bg-[#070f05] py-3 pr-4 pl-11 text-sm text-white outline-none transition-colors placeholder:text-white/25"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="border-line flex rounded-full border p-1">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setCat(f.id)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                      cat === f.id ? "bg-white text-[#040703]" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="border-line flex rounded-full border p-1">
                <button
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={`rounded-full px-2.5 py-1.5 transition-colors ${
                    view === "grid" ? "bg-white text-[#040703]" : "text-white/40"
                  }`}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                    <rect x="0" y="0" width="6" height="6" rx="1.5" />
                    <rect x="8" y="0" width="6" height="6" rx="1.5" />
                    <rect x="0" y="8" width="6" height="6" rx="1.5" />
                    <rect x="8" y="8" width="6" height="6" rx="1.5" />
                  </svg>
                </button>
                <button
                  onClick={() => setView("table")}
                  aria-label="Table view"
                  className={`rounded-full px-2.5 py-1.5 transition-colors ${
                    view === "table" ? "bg-white text-[#040703]" : "text-white/40"
                  }`}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                    <rect x="0" y="1" width="14" height="2.6" rx="1.3" />
                    <rect x="0" y="5.7" width="14" height="2.6" rx="1.3" />
                    <rect x="0" y="10.4" width="14" height="2.6" rx="1.3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {pods.length === 0 ? (
        <div className="border-line mt-6 rounded-2xl border border-dashed px-8 py-20 text-center text-sm text-white/40">
          No pod matches that search.
        </div>
      ) : view === "grid" ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pods.map((pod) => (
            <Link key={pod.slug} href={`/app/pod/${pod.slug}`} className="card-shell block">
              <div className="card-inner flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  {pod.brands.length > 1 ? (
                    <BrandCluster brands={pod.brands.slice(0, 4)} size={38} />
                  ) : (
                    <BrandChip brand={pod.brands[0]} size={54} />
                  )}
                  <span className="chip px-2.5 py-1.5 text-[10px] font-extrabold tracking-[0.12em] uppercase">
                    {pod.tag}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.02em]">{pod.ticker}</h3>
                <p className="mt-1 text-sm font-semibold text-white/40">{pod.company}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-white/55">{pod.line}</p>

                <div className="border-line/70 mt-6 grid grid-cols-3 gap-3 border-t pt-4">
                  {["LVF APY", "Pod TVL", "CBR"].map((l) => (
                    <div key={l}>
                      <p className="text-sage/50 text-[10px] font-bold tracking-wide uppercase">{l}</p>
                      <p className="mt-1 text-base font-extrabold">
                        <Pending />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card-shell mt-6">
          <div className="card-inner overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="border-line/70 text-sage/60 border-b text-left text-[11px] font-bold tracking-[0.1em] uppercase">
                  <th className="px-6 py-4">Pod</th>
                  <th className="px-4 py-4">Pair</th>
                  <th className="px-4 py-4">Session</th>
                  <th className="px-4 py-4">LVF APY</th>
                  <th className="px-4 py-4">Pod TVL</th>
                  <th className="px-4 py-4">CBR</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody>
                {pods.map((pod) => (
                  <tr
                    key={pod.slug}
                    className="border-line/50 border-b transition-colors last:border-b-0 hover:bg-[#12290d]/50"
                  >
                    <td className="px-6 py-4">
                      <Link href={`/app/pod/${pod.slug}`} className="flex items-center gap-3">
                        {pod.brands.length > 1 ? (
                          <BrandCluster brands={pod.brands.slice(0, 3)} size={30} />
                        ) : (
                          <BrandChip brand={pod.brands[0]} size={36} />
                        )}
                        <span>
                          <span className="block font-extrabold">{pod.ticker}</span>
                          <span className="block text-xs text-white/40">{pod.company}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-white/60">{pod.paired}</td>
                    <td className="px-4 py-4 text-white/60">
                      {pod.session === "always" ? "24/7" : "Market hours"}
                    </td>
                    <td className="px-4 py-4">
                      <Pending />
                    </td>
                    <td className="px-4 py-4">
                      <Pending />
                    </td>
                    <td className="px-4 py-4">
                      <Pending />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/app/pod/${pod.slug}`}
                        className="btn-light inline-block px-4 py-1.5 text-xs"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
