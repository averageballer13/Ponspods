import Link from "next/link";
import type { Pod } from "@/lib/data";
import { CHAINS } from "@/lib/data";
import { usd } from "@/lib/format";
import { ApyText, Badge, Sparkline } from "@/components/ui";

const CATEGORY_LABEL: Record<Pod["category"], string> = {
  equity: "Equity",
  index: "Index",
  commodity: "Commodity",
  treasury: "Treasury",
  crypto: "Crypto",
};

export function PodAvatar({ pod, size = 40 }: { pod: Pod; size?: number }) {
  const letters = pod.underlying.replace(/x$/, "").slice(0, 2).toUpperCase();
  return (
    <span
      className="font-display flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background:
          pod.category === "index"
            ? "linear-gradient(135deg,#7c5cff,#3b76e0)"
            : pod.category === "treasury"
              ? "linear-gradient(135deg,#12b981,#0b8f63)"
              : pod.category === "commodity"
                ? "linear-gradient(135deg,#e0a23b,#d97706)"
                : pod.category === "crypto"
                  ? "linear-gradient(135deg,#0f2036,#3b76e0)"
                  : "linear-gradient(135deg,#3b76e0,#12b981)",
      }}
    >
      {letters}
    </span>
  );
}

export function SessionDot({ session }: { session: Pod["session"] }) {
  const map = {
    open: { c: "#12b981", t: "Market open" },
    closed: { c: "#e0a23b", t: "Market closed · gap premium live" },
    premarket: { c: "#3b76e0", t: "Pre-market" },
    afterhours: { c: "#3b76e0", t: "After hours" },
    weekend: { c: "#e0a23b", t: "Weekend · gap premium live" },
    always: { c: "#12b981", t: "Trades 24/7" },
  } as const;
  const s = map[session];
  return (
    <span className="text-foreground-subtle inline-flex items-center gap-1.5 text-[11px]">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: s.c, boxShadow: `0 0 0 3px ${s.c}22` }}
      />
      {s.t}
    </span>
  );
}

export function PodCard({ pod }: { pod: Pod }) {
  const chain = CHAINS.find((c) => c.id === pod.chain)!;
  return (
    <div className="border-border bg-background-elevated card-shadow hover:border-accent-blue/45 group relative flex h-full flex-col rounded-2xl border p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(10,30,60,0.5)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <PodAvatar pod={pod} />
          <div className="min-w-0">
            <p className="font-display text-foreground truncate font-semibold">{pod.ticker}</p>
            <p className="text-foreground-subtle truncate text-xs">{pod.underlyingName}</p>
          </div>
        </div>
        <span
          className="mt-1 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ background: `${chain.tint}18`, color: chain.tint }}
        >
          {chain.short}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge>{CATEGORY_LABEL[pod.category]}</Badge>
        {pod.selfLending ? <Badge tone="accent">Self-lending</Badge> : null}
        {pod.pairingAsset ? <Badge tone="pod">Pairing asset</Badge> : null}
        {pod.gapPremium > 0 && pod.session === "closed" ? (
          <Badge tone="warn">Gap +{pod.gapPremium.toFixed(2)}%</Badge>
        ) : null}
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-foreground-subtle text-[11px] font-medium tracking-[0.1em] uppercase">
            LVF APY
          </p>
          <ApyText value={pod.lvfApy} className="text-3xl" />
          <p className="text-foreground-subtle mt-1 text-[11px]">
            {pod.vfApy.toFixed(1)}% unlevered · {pod.maxLeverage}× max
          </p>
        </div>
        <Sparkline seed={pod.slug} positive={pod.lvfApy >= 0} width={104} height={38} />
      </div>

      <div className="border-border mt-5 grid grid-cols-3 gap-2 border-t pt-4">
        <div>
          <p className="text-foreground-subtle text-[10px] tracking-wide uppercase">Pod TVL</p>
          <p className="tabular text-foreground mt-0.5 text-sm font-semibold">{usd(pod.tvl)}</p>
        </div>
        <div>
          <p className="text-foreground-subtle text-[10px] tracking-wide uppercase">24h vol</p>
          <p className="tabular text-foreground mt-0.5 text-sm font-semibold">{usd(pod.volume24h)}</p>
        </div>
        <div>
          <p className="text-foreground-subtle text-[10px] tracking-wide uppercase">CBR</p>
          <p className="tabular text-pod-deep mt-0.5 text-sm font-semibold">
            {pod.cbr.toFixed(3)}
            <span className="text-foreground-subtle ml-1 text-[10px] font-normal">
              +{pod.cbr30d}%
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <SessionDot session={pod.session} />
        {pod.nextCatalyst ? (
          <span className="text-foreground-subtle text-[11px]">
            {pod.nextCatalyst.label} · {pod.nextCatalyst.date.slice(5)}
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex gap-2">
        <Link
          href={`/app/pod/${pod.slug}`}
          className="border-border text-foreground-muted hover:border-accent-blue hover:text-accent-blue flex-1 rounded-full border px-3 py-2 text-center text-xs font-medium transition-colors"
        >
          View pod
        </Link>
        <Link
          href={`/app/pod/${pod.slug}#lvf`}
          className="bg-foreground text-background hover:bg-accent-blue flex-1 rounded-full px-3 py-2 text-center text-xs font-semibold transition-colors"
        >
          Open position
        </Link>
      </div>
    </div>
  );
}
