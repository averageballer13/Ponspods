import type { Metadata } from "next";
import { MARKETS } from "@/lib/pods";
import { Pending } from "@/components/ui";
import { PageHead, StatSlot } from "@/components/dapp/bits";

export const metadata: Metadata = { title: "Lending · Ponspods" };

export default function LendingPage() {
  const metavaults = MARKETS.filter((m) => m.kind === "metavault");
  const isolated = MARKETS.filter((m) => m.kind === "isolated");

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-9 sm:px-8">
      <PageHead
        title="Lending"
        intro="Borrowers here are not taking a directional bet — they are liquidity providers who need the second side of a pair. Supplying USDG funds that leverage and earns the interest they pay."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatSlot label="Total supplied" />
        <StatSlot label="Total borrowed" />
        <StatSlot label="Average utilization" />
        <StatSlot label="Best supply APY" />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-extrabold">Metavaults</h2>
        <p className="mt-1.5 text-sm text-white/45">
          One deposit, allocated across whitelisted pods by governance.
        </p>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {metavaults.map((m) => (
            <div key={m.slug} className="card-shell">
              <div className="card-inner p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xl font-extrabold">{m.name}</p>
                    <p className="mt-1 text-xs font-semibold text-white/40">
                      Denominated in {m.asset} · Robinhood Chain
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sage/55 text-[10px] font-bold tracking-wide uppercase">
                      Supply APY
                    </p>
                    <p className="mt-1 text-2xl font-extrabold">
                      <Pending />
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/55">{m.blurb}</p>

                <div className="border-line/70 mt-5 grid grid-cols-3 gap-4 border-t pt-4">
                  {["Supplied", "Borrowed", "Utilization"].map((l) => (
                    <div key={l}>
                      <p className="text-sage/50 text-[10px] font-bold tracking-wide uppercase">
                        {l}
                      </p>
                      <p className="mt-1 font-extrabold">
                        <Pending />
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {m.pods.map((p) => (
                    <span
                      key={p}
                      className="border-line rounded-full border bg-[#070f05] px-2.5 py-1 text-[11px] font-bold text-white/55"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <button
                  disabled
                  className="mt-6 w-full cursor-not-allowed rounded-full bg-white/10 px-4 py-3 text-sm font-extrabold text-white/40"
                >
                  Opens at launch
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-extrabold">Isolated pod markets</h2>
        <p className="mt-1.5 text-sm text-white/45">
          Direct exposure to a single pod. Higher rate, no diversification, no curator.
        </p>

        <div className="card-shell mt-5">
          <div className="card-inner overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-line/70 text-sage/60 border-b text-left text-[11px] font-bold tracking-[0.1em] uppercase">
                  <th className="px-6 py-4">Market</th>
                  <th className="px-4 py-4">Asset</th>
                  <th className="px-4 py-4">Supply APY</th>
                  <th className="px-4 py-4">Borrow APR</th>
                  <th className="px-4 py-4">Supplied</th>
                  <th className="px-6 py-4">Utilization</th>
                </tr>
              </thead>
              <tbody>
                {isolated.map((m) => (
                  <tr key={m.slug} className="border-line/50 border-b last:border-b-0">
                    <td className="px-6 py-4 font-extrabold">{m.name}</td>
                    <td className="px-4 py-4 text-white/60">{m.asset}</td>
                    <td className="px-4 py-4">
                      <Pending />
                    </td>
                    <td className="px-4 py-4">
                      <Pending />
                    </td>
                    <td className="px-4 py-4">
                      <Pending />
                    </td>
                    <td className="px-6 py-4">
                      <Pending />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-line dot-field mt-6 rounded-2xl border border-dashed p-6">
          <p className="font-extrabold">Why these will open at full utilization</p>
          <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-white/55">
            A pod bootstraps its own market with self-lending: the first borrower flash-borrows the
            paired asset, supplies it, then borrows it back against their own LP — all in one
            transaction. That prints full utilization as a signal, Proof of Demand, telling lenders
            that borrow demand exists here before any outside capital shows up. Rates stay high until
            supply catches up.
          </p>
        </div>
      </section>
    </div>
  );
}
