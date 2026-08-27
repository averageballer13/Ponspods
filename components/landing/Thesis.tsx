import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/site/Reveal";

const OLD = [
  "Volatility shows up at random, so the APY on the card is a backward-looking guess.",
  "There is no reference price. The pool is the price, so arbitrage is discretionary and can simply not happen.",
  "The asset under the pod produces nothing on its own — fees are the only source of return.",
  "Every long-tail pod needs its own paired asset, which fragments lending into dozens of shallow markets.",
  "Volatility and drawdown are the same event: the week you earn the most is the week your collateral is worth the least.",
];

const NEW = [
  "Volatility is on a published calendar: earnings, CPI, FOMC, opex, index rebalances. Yield becomes forecastable.",
  "A tokenized stock has a NAV. Arbitrage against it is forced, mechanical and closes every time — that is the fee flow.",
  "The underlying already yields. Coupons and dividend equivalents accrue to the pod reserve on top of trading fees.",
  "One pairing asset, USDG, so every pod borrows from the same deep market instead of bootstrapping its own.",
  "The market closes. The token does not. Every session gap is a fee event that crypto-native pods structurally cannot have.",
];

function Check() {
  return (
    <span className="bg-pod-soft text-pod-deep mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M2.5 6.3l2.4 2.4L9.5 4"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Cross() {
  return (
    <span className="bg-background-elevated-2 text-foreground-subtle mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M3 3l6 6M9 3l-6 6"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function Thesis() {
  return (
    <section id="thesis" className="relative scroll-mt-24 py-24 md:py-32">
      <div
        className="grid-lines-light pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <Eyebrow>The limit of volatility farming</Eyebrow>
          <h2 className="text-[clamp(1.8rem,1.2vh+2.1vw,3.1rem)] leading-[105%] font-semibold">
            Crypto volatility is free money that arrives whenever it feels like it.
          </h2>
          <p className="text-foreground-muted mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
            Peapods proved the core idea: you can pay liquidity providers out of real fee flow
            instead of an emissions schedule, and let a wrapper token ratchet upward forever. The
            weakness was never the machine. It was the fuel. Crypto volatility is unscheduled,
            unbounded and perfectly correlated with everyone getting liquidated at once.
          </p>
          <p className="text-foreground mt-4 max-w-2xl text-base leading-relaxed font-medium sm:text-lg">
            Tokenized equities are a different fuel entirely. They are the only assets on-chain
            whose volatility is manufactured off-chain, on a schedule, by someone else.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal delay={80}>
            <div className="border-border bg-background-elevated h-full rounded-3xl border p-7 sm:p-9">
              <p className="text-foreground-subtle text-[11px] font-semibold tracking-[0.18em] uppercase">
                Crypto-native pods
              </p>
              <p className="font-display text-foreground-muted mt-3 text-xl font-semibold">
                Yield you can only measure after the fact
              </p>
              <ul className="mt-7 space-y-4">
                {OLD.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Cross />
                    <span className="text-foreground-muted text-sm leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="relative h-full rounded-3xl p-[1.5px]">
              <div
                className="absolute inset-0 rounded-3xl opacity-90"
                style={{ background: "linear-gradient(140deg,#3b76e0,#12b981)" }}
                aria-hidden="true"
              />
              <div className="bg-background-elevated relative h-full rounded-[calc(1.5rem-1px)] p-7 sm:p-9">
                <p className="text-accent-blue text-[11px] font-semibold tracking-[0.18em] uppercase">
                  The Ponspods way
                </p>
                <p className="font-display text-foreground mt-3 text-xl font-semibold">
                  Yield you can put in a calendar invite
                </p>
                <ul className="mt-7 space-y-4">
                  {NEW.map((t) => (
                    <li key={t} className="flex gap-3">
                      <Check />
                      <span className="text-foreground text-sm leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className="deep-surface card-shadow-lg relative mt-6 overflow-hidden rounded-3xl px-7 py-8 sm:px-10 sm:py-10">
            <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <p className="font-display max-w-2xl text-lg leading-snug font-semibold text-white sm:text-2xl">
                Peapods built the engine. Real-world assets are the only fuel that comes with a
                delivery schedule.
              </p>
              <div className="flex shrink-0 gap-8">
                <div>
                  <p className="tabular text-2xl font-semibold text-white sm:text-3xl">252</p>
                  <p className="mt-1 text-xs text-white/55">scheduled vol events / year</p>
                </div>
                <div>
                  <p className="tabular text-2xl font-semibold text-white sm:text-3xl">104</p>
                  <p className="mt-1 text-xs text-white/55">weekend gaps / year</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
