import { CALENDAR } from "@/lib/data";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/site/Reveal";

const KIND_STYLE: Record<string, { label: string; bg: string; fg: string }> = {
  earnings: { label: "Earnings", bg: "#3b76e018", fg: "#2456b8" },
  macro: { label: "Macro", bg: "#7c5cff18", fg: "#5b3fd6" },
  expiry: { label: "Expiry", bg: "#e0a23b22", fg: "#b7770f" },
  rebalance: { label: "Rebalance", bg: "#12b98118", fg: "#0b8f63" },
  close: { label: "Session", bg: "#0f203612", fg: "#44607f" },
};

export function VolatilityCalendar() {
  const max = Math.max(...CALENDAR.map((c) => c.expectedVolLift));

  return (
    <section
      id="calendar"
      className="bg-background-elevated-2/60 relative scroll-mt-24 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <Eyebrow>The volatility calendar</Eyebrow>
          <h2 className="text-[clamp(1.8rem,1.2vh+2.1vw,3.1rem)] leading-[105%] font-semibold">
            The only yield curve in DeFi you can read three weeks ahead.
          </h2>
          <p className="text-foreground-muted mt-5 text-base leading-relaxed sm:text-lg">
            Fee income in a pod is a function of realized volatility in its underlying. For
            tokenized equities that volatility is scheduled by exchanges, regulators and earnings
            departments. So the protocol publishes it.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12">
          <div className="border-border bg-background-elevated card-shadow overflow-hidden rounded-3xl border">
            <div className="border-border text-foreground-subtle grid grid-cols-[70px_1fr_auto] gap-4 border-b px-5 py-3 text-[11px] font-semibold tracking-[0.12em] uppercase sm:grid-cols-[90px_1fr_200px_140px] sm:px-7">
              <span>Date</span>
              <span>Event</span>
              <span className="hidden sm:block">Pods affected</span>
              <span className="text-right">Expected vol lift</span>
            </div>

            {CALENDAR.map((e, i) => {
              const k = KIND_STYLE[e.kind];
              return (
                <div
                  key={`${e.date}-${e.label}`}
                  className="border-border hover:bg-background-elevated-2/70 grid grid-cols-[70px_1fr_auto] items-center gap-4 border-b px-5 py-4 transition-colors last:border-b-0 sm:grid-cols-[90px_1fr_200px_140px] sm:px-7"
                  style={{ animation: `rise-up .7s cubic-bezier(.22,1,.36,1) ${i * 60}ms both` }}
                >
                  <div>
                    <p className="tabular text-foreground text-sm font-semibold">{e.date}</p>
                    <p className="text-foreground-subtle text-[11px]">{e.day}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-foreground truncate text-sm font-medium">{e.label}</p>
                    <span
                      className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{ background: k.bg, color: k.fg }}
                    >
                      {k.label}
                    </span>
                  </div>
                  <div className="hidden flex-wrap gap-1 sm:flex">
                    {e.pods.map((p) => (
                      <span
                        key={p}
                        className="bg-background-elevated-2 text-foreground-muted rounded-full px-2 py-0.5 text-[10px]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    <div className="bg-background-elevated-2 hidden h-1.5 w-16 overflow-hidden rounded-full sm:block">
                      <span
                        className="duo-gradient block h-full rounded-full"
                        style={{ width: `${(e.expectedVolLift / max) * 100}%` }}
                      />
                    </div>
                    <span className="tabular text-foreground text-sm font-semibold">
                      +{e.expectedVolLift}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="text-foreground-subtle mt-5 text-xs">
            Expected vol lift is a modelled uplift in realized volatility versus the trailing 30-day
            baseline for the affected pods. Illustrative figures.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
