"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Eyebrow, Meter } from "@/components/ui";

/* ---------------------------------------------------------------- */
/* Visuals                                                           */
/* ---------------------------------------------------------------- */

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="border-border bg-background-elevated card-shadow-lg h-full rounded-3xl border p-6 sm:p-8">
      {children}
    </div>
  );
}

function WrapVisual() {
  return (
    <Panel>
      <p className="text-foreground-subtle text-[11px] font-semibold tracking-[0.16em] uppercase">
        Wrap
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="border-border bg-background flex-1 rounded-2xl border p-4">
          <p className="text-foreground-subtle text-[11px]">You deposit</p>
          <p className="tabular text-foreground mt-1 text-lg font-semibold">1,000 NVDAx</p>
          <p className="text-foreground-subtle mt-1 text-[11px]">Nvidia Stock Token</p>
        </div>
        <div className="accent-gradient animate-pulse-glow flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="#fff"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="border-accent-blue/30 bg-accent-blue-soft/50 flex-1 rounded-2xl border p-4">
          <p className="text-accent-blue-deep text-[11px]">You receive</p>
          <p className="tabular text-foreground mt-1 text-lg font-semibold">915.75 pNVDA</p>
          <p className="text-foreground-subtle mt-1 text-[11px]">at CBR 1.092, minus 0.20% wrap fee</p>
        </div>
      </div>

      <div className="border-border mt-6 rounded-2xl border border-dashed p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-foreground-muted">Collateral Backing Ratio</span>
          <span className="tabular text-pod-deep font-semibold">1.092 → only up</span>
        </div>
        <div className="mt-3 flex items-end gap-1">
          {[38, 42, 47, 49, 55, 58, 63, 66, 72, 74, 81, 88].map((h, i) => (
            <span
              key={i}
              className="pod-gradient flex-1 rounded-t-sm"
              style={{ height: `${h * 0.55}px`, opacity: 0.35 + i * 0.055 }}
            />
          ))}
        </div>
        <p className="text-foreground-subtle mt-3 text-[11px] leading-relaxed">
          Fees burn pNVDA while the NVDAx reserve stays intact, so every remaining pNVDA redeems
          for more of the underlying than the day before.
        </p>
      </div>
    </Panel>
  );
}

function FarmVisual() {
  const flows = [
    { label: "Wrap fee", v: "0.20%", w: 24 },
    { label: "Unwrap fee", v: "0.40%", w: 42 },
    { label: "AMM buy", v: "0.45%", w: 58 },
    { label: "AMM sell", v: "0.60%", w: 74 },
    { label: "Gap premium", v: "+0.25%", w: 36 },
  ];
  return (
    <Panel>
      <p className="text-foreground-subtle text-[11px] font-semibold tracking-[0.16em] uppercase">
        Farm
      </p>
      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="font-display text-foreground text-lg font-semibold">pNVDA / USDG</p>
          <p className="text-foreground-subtle text-[11px]">Full range, x·y=k</p>
        </div>
        <span className="bg-pod-soft text-pod-deep rounded-full px-3 py-1 text-xs font-semibold">
          18.6% VF APY
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {flows.map((f, i) => (
          <div key={f.label}>
            <div className="flex justify-between text-[11px]">
              <span className="text-foreground-muted">{f.label}</span>
              <span className="tabular text-foreground-subtle">{f.v}</span>
            </div>
            <div className="bg-background-elevated-2 mt-1.5 h-2 overflow-hidden rounded-full">
              <div
                className="animate-indeterminate h-full w-1/3 rounded-full"
                style={{
                  background: i === 4 ? "linear-gradient(90deg,#e0a23b,#d97706)" : "linear-gradient(90deg,#3b76e0,#12b981)",
                  animationDelay: `${i * 220}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-foreground-subtle mt-6 text-[11px] leading-relaxed">
        Every trader who closes the gap between NVDAx on Nasdaq and pNVDA in the pool pays the pod
        to do it. That payment is the yield. Nothing is minted.
      </p>
    </Panel>
  );
}

function LeverVisual() {
  return (
    <Panel>
      <p className="text-foreground-subtle text-[11px] font-semibold tracking-[0.16em] uppercase">
        Lever
      </p>
      <div className="mt-6 space-y-2.5">
        {[
          { n: "1", t: "You deposit pNVDA only", s: "$10,000 — one-sided, no USDG needed" },
          { n: "2", t: "Protocol borrows USDG", s: "from the isolated market at 8.4% APR" },
          { n: "3", t: "Full-range LP is minted", s: "pNVDA + USDG, equal value both sides" },
          { n: "4", t: "LP is locked as collateral", s: "self-collateralised at 200%" },
        ].map((s, i) => (
          <div
            key={s.n}
            className="border-border bg-background flex items-start gap-3 rounded-xl border p-3"
            style={{ marginLeft: `${i * 10}px` }}
          >
            <span className="accent-gradient flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white">
              {s.n}
            </span>
            <div>
              <p className="text-foreground text-sm font-medium">{s.t}</p>
              <p className="text-foreground-subtle text-[11px]">{s.s}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-border mt-6 rounded-2xl border p-4">
        <div className="flex justify-between text-xs">
          <span className="text-foreground-muted">Loan-to-value</span>
          <span className="tabular text-foreground font-semibold">62.4% / 83.33% max</span>
        </div>
        <Meter value={75} tone="accent" className="mt-2.5" />
        <div className="text-foreground-subtle mt-3 flex justify-between text-[11px]">
          <span>3.4× effective leverage</span>
          <span className="text-warning font-medium">liquidation −38%</span>
        </div>
      </div>
    </Panel>
  );
}

function ScheduleVisual() {
  const days = [
    { d: "Mon", h: 44, tag: "gap close" },
    { d: "Tue", h: 26 },
    { d: "Wed", h: 92, tag: "NVDA earnings" },
    { d: "Thu", h: 48 },
    { d: "Fri", h: 74, tag: "opex" },
    { d: "Sat", h: 18 },
    { d: "Sun", h: 22, tag: "gap opens" },
  ];
  return (
    <Panel>
      <p className="text-foreground-subtle text-[11px] font-semibold tracking-[0.16em] uppercase">
        Schedule
      </p>
      <p className="font-display text-foreground mt-4 text-lg font-semibold">
        Expected fee flow, next 7 days
      </p>
      <div className="mt-6 flex h-40 items-end gap-2">
        {days.map((day, i) => (
          <div key={day.d} className="flex flex-1 flex-col items-center gap-2">
            <div className="relative flex w-full flex-1 items-end">
              <div
                className={`w-full rounded-t-md ${day.tag ? "duo-gradient" : "bg-border"}`}
                style={{ height: `${day.h}%`, animation: `rise-up .8s cubic-bezier(.22,1,.36,1) ${i * 90}ms both` }}
              />
            </div>
            <span className="text-foreground-subtle text-[10px]">{day.d}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-1.5">
        {days
          .filter((d) => d.tag)
          .map((d) => (
            <div key={d.d} className="flex items-center gap-2 text-[11px]">
              <span className="bg-accent-blue h-1.5 w-1.5 rounded-full" />
              <span className="text-foreground-muted">
                {d.d} — {d.tag}
              </span>
            </div>
          ))}
      </div>
      <p className="text-foreground-subtle mt-4 text-[11px] leading-relaxed">
        No other DeFi protocol can publish this chart in advance. Ponspods can, because the
        volatility it farms is produced by a market with a printed calendar.
      </p>
    </Panel>
  );
}

/* ---------------------------------------------------------------- */

const STEPS = [
  {
    n: "01",
    title: "Wrap the asset",
    body: "Deposit a tokenized stock, basket or treasury into its Pod and receive pTKN. The Pod holds the underlying, mints a synthetic claim on it, and charges a small fee on the way in and on the way out.",
    visual: <WrapVisual />,
  },
  {
    n: "02",
    title: "Farm the volatility",
    body: "Pair pTKN against USDG in the Pod's full-range pool. Every wrap, unwrap and arbitrage trade pays a fee, and part of that fee burns pTKN supply so the backing ratio ratchets up for everyone who stays wrapped.",
    visual: <FarmVisual />,
  },
  {
    n: "03",
    title: "Lever the fee flow",
    body: "Deposit only the pTKN side. The protocol borrows USDG against it, builds the LP for you and locks it as its own collateral. You get amplified exposure to fee income while keeping full exposure to the asset you started with.",
    visual: <LeverVisual />,
  },
  {
    n: "04",
    title: "Trade the calendar",
    body: "Earnings, CPI, FOMC, options expiry, index rebalances, and every weekend gap between the closing bell and the Monday open. Position into scheduled volatility before it prints instead of chasing it afterwards.",
    visual: <ScheduleVisual />,
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = refs.current.indexOf(visible.target as HTMLDivElement);
          if (idx >= 0) setActive(idx);
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.4, 1] },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="how" className="bg-background-elevated-2/60 relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-[clamp(1.8rem,1.2vh+2.1vw,3.1rem)] leading-[105%] font-semibold">
            Four moves, from a share of Nvidia to a levered claim on its volatility.
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Steps */}
          <div>
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="border-border border-t py-10 first:border-t-0 first:pt-0 lg:py-14"
              >
                <div className="flex items-start gap-5">
                  <span
                    className={`tabular mt-1 text-sm font-semibold transition-colors duration-500 ${
                      active === i ? "text-accent-blue" : "text-foreground-subtle"
                    }`}
                  >
                    {s.n}
                  </span>
                  <div className="flex-1">
                    <h3
                      className={`text-2xl font-semibold transition-colors duration-500 sm:text-3xl ${
                        active === i ? "text-foreground" : "text-foreground-muted"
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p className="text-foreground-muted mt-3 text-sm leading-relaxed sm:text-base">
                      {s.body}
                    </p>
                    <div className="bg-border mt-6 h-px w-full overflow-hidden rounded-full">
                      <span
                        className="duo-gradient block h-full transition-[width] duration-700 ease-out"
                        style={{ width: active === i ? "100%" : "0%" }}
                      />
                    </div>
                    <div className="mt-6 lg:hidden">{s.visual}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky visual */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative min-h-[520px]">
                {STEPS.map((s, i) => (
                  <div
                    key={s.n}
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      opacity: active === i ? 1 : 0,
                      transform: active === i ? "translateY(0) scale(1)" : "translateY(14px) scale(0.985)",
                      pointerEvents: active === i ? "auto" : "none",
                    }}
                    aria-hidden={active !== i}
                  >
                    {s.visual}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
