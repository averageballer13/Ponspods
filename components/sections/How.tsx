import { BrandMark, Eyebrow, Section } from "@/components/ui";

function WrapArt() {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="bg-[#070f05] border-line flex h-16 w-16 items-center justify-center rounded-2xl border">
        <BrandMark brand="nvidia" size={30} />
      </span>
      <svg width="26" height="18" viewBox="0 0 26 18" fill="none" aria-hidden="true">
        <path
          d="M2 9h20M17 3l6 6-6 6"
          stroke="#7fe339"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="border-lime/60 bg-lime/10 flex h-16 w-16 items-center justify-center rounded-2xl border">
        <span className="text-lime text-sm font-extrabold">pNVDA</span>
      </span>
    </div>
  );
}

function FarmArt() {
  return (
    <div className="flex items-center justify-center gap-3">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="animate-breathe bg-lime block rounded-full"
          style={{
            width: 12,
            height: 12 + i * 12,
            animationDelay: `${i * 420}ms`,
          }}
        />
      ))}
      <svg width="26" height="18" viewBox="0 0 26 18" fill="none" aria-hidden="true">
        <path
          d="M2 9h20M17 3l6 6-6 6"
          stroke="#7fe339"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="border-lime/60 bg-lime/10 flex h-14 w-14 items-center justify-center rounded-full border">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
            stroke="#7fe339"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

function GrowArt() {
  return (
    <div className="flex items-end justify-center gap-2.5">
      {[26, 34, 44, 56, 70, 86].map((h, i) => (
        <span
          key={h}
          className="w-7 rounded-t-md"
          style={{
            height: h,
            background: "linear-gradient(162.53deg,#7fe339 2.81%,#c5ef40)",
            opacity: 0.35 + i * 0.13,
          }}
        />
      ))}
    </div>
  );
}

const STEPS = [
  {
    n: "01",
    title: "Wrap",
    body: "Drop a tokenized stock into its Pod and get a wrapped version back. You still hold the stock — it is just in a container that can charge for entry and exit.",
    art: <WrapArt />,
  },
  {
    n: "02",
    title: "Farm",
    body: "Everyone who enters, leaves or trades that wrapped token pays a small fee to the Pod. Provide liquidity and those fees are yours. The busier the stock, the more there is.",
    art: <FarmArt />,
  },
  {
    n: "03",
    title: "Grow",
    body: "Part of every fee permanently destroys wrapped tokens, while the stocks behind them stay put. Fewer tokens, same pile. Each one is worth more than it was. It never goes backwards.",
    art: <GrowArt />,
  },
];

export function How() {
  return (
    <Section id="how">
      <div className="max-w-3xl">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.06] font-extrabold tracking-[-0.03em]">
          Three steps. That is the whole product.
        </h2>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.n} className="card-shell">
            <div className="card-inner flex h-full flex-col p-8 sm:p-9">
              <div className="border-line/70 flex h-36 items-center justify-center rounded-xl border border-dashed">
                {s.art}
              </div>
              <p className="text-lime mt-8 text-sm font-extrabold tracking-[0.18em]">{s.n}</p>
              <h3 className="mt-3 text-3xl font-extrabold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-white/60">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
