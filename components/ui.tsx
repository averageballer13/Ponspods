import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { series, toPath } from "@/lib/format";

/* ------------------------------------------------------------------ */
/* Logo                                                                */
/* ------------------------------------------------------------------ */

export function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const fg = tone === "light" ? "#ffffff" : "#0f2036";
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="pp-mark" x1="2" y1="4" x2="30" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b76e0" />
            <stop offset="1" stopColor="#12b981" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#pp-mark)" />
        {/* pod shell */}
        <path
          d="M8.5 19.5c0-5.2 3.4-9 7.5-9s7.5 3.8 7.5 9"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.95"
        />
        {/* bridge deck */}
        <path d="M6 22.5h20" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.95" />
        {/* peas */}
        <circle cx="11.6" cy="17.4" r="1.6" fill="#fff" />
        <circle cx="16" cy="16.2" r="1.6" fill="#fff" />
        <circle cx="20.4" cy="17.4" r="1.6" fill="#fff" />
      </svg>
      <span
        className="font-display text-[1.06rem] font-semibold tracking-[-0.035em]"
        style={{ color: fg }}
      >
        Ponspods
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

type ButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

/** Pons-style primary: inverted fill with an accent-gradient halo on hover. */
export function ButtonPrimary({ href, children, className = "", ...rest }: ButtonProps) {
  const inner = (
    <>
      <span
        className="accent-gradient absolute -inset-0.5 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden="true"
      />
      <span className="bg-foreground text-background group-hover:bg-background group-hover:text-foreground relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200">
        {children}
      </span>
    </>
  );
  const cls = `group relative inline-flex rounded-full ${className}`;
  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}

/** Hero CTA: pill with a glowing circle that rotates 45deg on hover. */
export function ButtonArrow({
  href,
  children,
  className = "",
  tone = "light",
  ...rest
}: ButtonProps & { tone?: "light" | "accent" }) {
  const base =
    tone === "light"
      ? "bg-white text-[#0f2036]"
      : "bg-accent-blue text-white";
  const inner = (
    <>
      {children}
      <span
        className="animate-pulse-glow flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:rotate-45"
        aria-hidden="true"
        style={{ background: tone === "light" ? "#3b76e0" : "#0f2036" }}
      >
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path
            d="M5 13L13 5M13 5H6M13 5V12"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );
  const cls = `group inline-flex items-center gap-3 rounded-full py-2 pr-2 pl-7 text-base font-semibold transition-transform duration-300 hover:scale-[1.03] ${base} ${className}`;
  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}

/** Glass outline pill, for use over dark imagery. */
export function ButtonGlass({ href, children, className = "", ...rest }: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/15 px-7 py-3.5 text-base font-medium text-white backdrop-blur-md transition-colors hover:bg-white/25 ${className}`;
  return href ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

/** Solid accent action used inside the app. */
export function ButtonAccent({ href, children, className = "", ...rest }: ButtonProps) {
  const cls = `bg-accent-blue inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50 ${className}`;
  return href ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export function ButtonOutline({ href, children, className = "", ...rest }: ButtonProps) {
  const cls = `border-border text-foreground hover:border-accent-blue hover:text-accent-blue inline-flex items-center justify-center gap-2 rounded-full border bg-white px-4 py-2.5 text-sm font-medium transition-colors ${className}`;
  return href ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Atoms                                                               */
/* ------------------------------------------------------------------ */

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={`mb-4 text-xs font-semibold tracking-[0.18em] uppercase ${
        tone === "light" ? "text-white/60" : "text-foreground-subtle"
      }`}
    >
      {children}
    </p>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "pod" | "warn" | "down" | "ghost";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-background-elevated-2 text-foreground-muted border-border",
    accent: "bg-accent-blue-soft text-accent-blue-deep border-accent-blue/25",
    pod: "bg-pod-soft text-pod-deep border-pod/25",
    warn: "bg-amber-50 text-warning border-warning/25",
    down: "bg-red-50 text-down border-down/25",
    ghost: "bg-white/10 text-white/80 border-white/20",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] leading-none font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`border-border bg-background-elevated card-shadow rounded-2xl border ${
        hover
          ? "hover:border-accent-blue/45 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(10,30,60,0.5)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function StatTile({
  label,
  value,
  sub,
  tone = "dark",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={`rounded-2xl border px-5 py-4 ${
        tone === "light"
          ? "border-white/15 bg-white/[0.06] backdrop-blur-md"
          : "border-border bg-background-elevated"
      }`}
    >
      <p
        className={`text-[11px] font-medium tracking-[0.12em] uppercase ${
          tone === "light" ? "text-white/55" : "text-foreground-subtle"
        }`}
      >
        {label}
      </p>
      <p
        className={`tabular mt-2 text-2xl font-semibold ${
          tone === "light" ? "text-white" : "text-foreground"
        }`}
      >
        {value}
      </p>
      {sub ? (
        <p className={`mt-1 text-xs ${tone === "light" ? "text-white/45" : "text-foreground-subtle"}`}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}

export function Sparkline({
  seed,
  positive = true,
  width = 120,
  height = 34,
  drift,
  vol = 1,
}: {
  seed: string;
  positive?: boolean;
  width?: number;
  height?: number;
  drift?: number;
  vol?: number;
}) {
  const values = series(seed, 40, drift ?? (positive ? 0.75 : -0.65), vol);
  const d = toPath(values, width, height);
  const stroke = positive ? "#12b981" : "#e5484d";
  const id = `spark-${seed.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${width - 2},${height} L2,${height} Z`} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Meter({
  value,
  tone = "accent",
  className = "",
}: {
  value: number;
  tone?: "accent" | "pod" | "warn" | "down";
  className?: string;
}) {
  const tones = {
    accent: "bg-accent-blue",
    pod: "bg-pod",
    warn: "bg-warning",
    down: "bg-down",
  } as const;
  return (
    <div className={`bg-background-elevated-2 h-1.5 w-full overflow-hidden rounded-full ${className}`}>
      <div
        className={`h-full rounded-full transition-[width] duration-700 ${tones[tone]}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function ApyText({ value, className = "" }: { value: number; className?: string }) {
  const up = value >= 0;
  return (
    <span className={`tabular font-semibold ${up ? "text-up" : "text-down"} ${className}`}>
      {up ? "" : "-"}
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}
