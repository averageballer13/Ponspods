import { ButtonOutline, OpenDappButton } from "@/components/ui";

export function Cta() {
  return (
    <section className="px-5 pt-8 pb-28 sm:px-8">
      <div className="card-shell mx-auto max-w-6xl">
        <div className="card-inner relative overflow-hidden px-6 py-20 text-center sm:px-12 md:py-28">
          <div
            className="dot-field pointer-events-none absolute inset-0 opacity-60"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(55% 60% at 50% 100%, rgba(127,227,57,0.16) 0%, rgba(0,0,0,0) 70%)",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-[clamp(2rem,4.8vw,3.6rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
              The market opens again tomorrow.
              <br />
              <span className="text-mint">Someone is getting paid for it.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/60">
              Ponspods launches on Robinhood Chain. Have a look around before the first Pods go live.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <OpenDappButton />
              <ButtonOutline href="#how">Read the basics</ButtonOutline>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
