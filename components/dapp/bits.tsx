import type { ReactNode } from "react";
import { Pending } from "@/components/ui";

export function PageHead({
  title,
  intro,
  action,
}: {
  title: string;
  intro: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{title}</h1>
        <p className="mt-3 text-base leading-relaxed text-white/45">{intro}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/** A metric slot that is empty until the protocol is live. */
export function StatSlot({ label, note }: { label: string; note?: string }) {
  return (
    <div className="card-shell">
      <div className="card-inner px-5 py-4">
        <p className="text-sage/60 text-[11px] font-bold tracking-[0.14em] uppercase">{label}</p>
        <p className="mt-2 text-2xl font-extrabold">
          <Pending />
        </p>
        <p className="text-sage/40 mt-1 text-[11px]">{note ?? "live at launch"}</p>
      </div>
    </div>
  );
}

export function Row({
  label,
  value,
  tone = "plain",
}: {
  label: string;
  value: ReactNode;
  tone?: "plain" | "good" | "warn";
}) {
  const cls =
    tone === "good" ? "text-lime" : tone === "warn" ? "text-[#e0a23b]" : "text-white/85";
  return (
    <div className="flex items-center justify-between py-2 text-sm">
      <span className="text-white/40">{label}</span>
      <span className={`tnum font-bold ${cls}`}>{value}</span>
    </div>
  );
}

export function Meter({
  value,
  tone = "lime",
}: {
  value: number;
  tone?: "lime" | "warn" | "light";
}) {
  const bg = tone === "warn" ? "#e0a23b" : tone === "light" ? "#ffffff" : "#7fe339";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#0a1607]">
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: bg }}
      />
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="border-line dot-field rounded-2xl border border-dashed px-8 py-20 text-center">
      <p className="text-xl font-extrabold">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/40">{body}</p>
      {action ? <div className="mt-7 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function AmountField({
  value,
  onChange,
  symbol,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  symbol: string;
  label: string;
}) {
  return (
    <div className="border-line focus-within:border-line-2 rounded-2xl border bg-[#070f05] p-4 transition-colors">
      <p className="text-sage/60 mb-2 text-[11px] font-bold tracking-[0.12em] uppercase">{label}</p>
      <div className="flex items-center gap-3">
        <input
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
          placeholder="0.00"
          className="tnum min-w-0 flex-1 bg-transparent text-2xl font-extrabold text-white outline-none placeholder:text-white/20"
        />
        <span className="border-line shrink-0 rounded-full border px-3 py-1.5 text-sm font-bold text-white">
          {symbol}
        </span>
      </div>
      <p className="text-sage/40 mt-2 text-[11px]">
        Wallet balance <Pending /> — connect once pods are live
      </p>
    </div>
  );
}
