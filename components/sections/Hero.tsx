import { BrandMark, ButtonGhost, ButtonLime } from "@/components/ui";
import { TICKER_BRANDS } from "@/lib/pods";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-36 pb-20 sm:px-8 md:pt-48 md:pb-28">
      {/* soft lime glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(127,227,57,0.16) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="chip-lime mb-8 inline-block px-4 py-2.5 text-xs font-extrabold tracking-[0.16em] uppercase">
          Volatility farming for tokenized stocks
        </p>

        <h1 className="text-[clamp(2.6rem,7vw,5.2rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
          Wall Street makes the volatility.
          <br />
          <span className="text-lime-gradient">You get paid for it.</span>
        </h1>

        <p className="mx-auto mt-9 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl">
          Put a tokenized stock in a Pod. Every trade that keeps its price in line pays a fee, and
          that fee goes to you. Nothing is printed. The market simply does what it already does.
        </p>

        <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLime>Coming soon</ButtonLime>
          <ButtonGhost href="#how">See how it works</ButtonGhost>
        </div>
      </div>

      <div className="relative mx-auto mt-20 max-w-4xl">
        <p className="mb-7 text-center text-xs font-bold tracking-[0.2em] text-white/35 uppercase">
          Launching with
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {TICKER_BRANDS.slice(0, 9).map((b) => (
            <span
              key={b}
              className="bg-deep border-line-soft hover:border-lime/60 flex h-16 w-16 items-center justify-center rounded-2xl border transition-colors duration-300 sm:h-20 sm:w-20"
            >
              <BrandMark brand={b} size={32} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
