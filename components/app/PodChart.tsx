import { series, toPath } from "@/lib/format";

/** Area chart used for CBR / APY history on the pod page. */
export function PodChart({
  seed,
  label,
  value,
  delta,
  drift = 0.8,
  vol = 0.9,
  height = 220,
}: {
  seed: string;
  label: string;
  value: string;
  delta: string;
  drift?: number;
  vol?: number;
  height?: number;
}) {
  const W = 720;
  const H = height;
  const values = series(seed, 90, drift, vol);
  const d = toPath(values, W, H - 30, 6);
  const id = `chart-${seed.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <div className="border-border bg-background-elevated card-shadow rounded-2xl border p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-foreground-subtle text-[11px] font-medium tracking-[0.12em] uppercase">
            {label}
          </p>
          <p className="tabular text-foreground mt-1.5 text-2xl font-semibold">{value}</p>
        </div>
        <span className="bg-pod-soft text-pod-deep rounded-full px-3 py-1 text-xs font-semibold">
          {delta}
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b76e0" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#12b981" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b76e0" />
            <stop offset="100%" stopColor="#12b981" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1="0"
            y1={(H - 30) * f}
            x2={W}
            y2={(H - 30) * f}
            stroke="#bdd5ee"
            strokeWidth="1"
            strokeDasharray="4 6"
            opacity="0.6"
          />
        ))}
        <path d={`${d} L${W - 6},${H - 30} L6,${H - 30} Z`} fill={`url(#${id})`} />
        <path
          d={d}
          fill="none"
          stroke={`url(#${id}-line)`}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="text-foreground-subtle -mt-4 flex justify-between text-[11px]">
        <span>90d ago</span>
        <span>60d</span>
        <span>30d</span>
        <span>today</span>
      </div>
    </div>
  );
}
