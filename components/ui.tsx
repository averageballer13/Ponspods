import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { BRANDS } from "@/lib/brands";

/* ------------------------------------------------------------------ */
/* Brand marks                                                         */
/* ------------------------------------------------------------------ */

export function BrandMark({
  brand,
  size = 28,
  mono = false,
}: {
  brand: string;
  size?: number;
  mono?: boolean;
}) {
  const b = BRANDS[brand];
  if (!b) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={mono ? "currentColor" : b.hex}
      role="img"
      aria-label={b.title}
      className="shrink-0"
    >
      <title>{b.title}</title>
      <path d={b.d} />
    </svg>
  );
}

/** Brand mark on the dark round chip used across the site. */
export function BrandChip({ brand, size = 64 }: { brand: string; size?: number }) {
  return (
    <span
      className="bg-deep border-line-soft flex items-center justify-center rounded-full border"
      style={{ width: size, height: size }}
    >
      <BrandMark brand={brand} size={size * 0.5} />
    </span>
  );
}

/** Overlapping cluster of marks, used for basket pods. */
export function BrandCluster({ brands, size = 44 }: { brands: string[]; size?: number }) {
  return (
    <span className="flex items-center">
      {brands.map((b, i) => (
        <span
          key={b}
          className="bg-deep border-line-soft flex items-center justify-center rounded-full border"
          style={{
            width: size,
            height: size,
            marginLeft: i === 0 ? 0 : -size * 0.32,
            zIndex: brands.length - i,
          }}
        >
          <BrandMark brand={b} size={size * 0.5} />
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Logo                                                                */
/* ------------------------------------------------------------------ */

export function Logo({ size = 34 }: { size?: number }) {
  return (
    <span className="flex items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="pp-logo" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7fe339" />
            <stop offset="1" stopColor="#c5ef40" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="12" fill="url(#pp-logo)" />
        {/* pod shell */}
        <path
          d="M10 24c0-6.6 4.4-11.4 10-11.4S30 17.4 30 24"
          stroke="#0a1407"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        {/* deck */}
        <path d="M7 28h26" stroke="#0a1407" strokeWidth="2.6" strokeLinecap="round" />
        {/* peas */}
        <circle cx="14.4" cy="21.4" r="2" fill="#0a1407" />
        <circle cx="20" cy="20" r="2" fill="#0a1407" />
        <circle cx="25.6" cy="21.4" r="2" fill="#0a1407" />
      </svg>
      <span className="text-[1.35rem] leading-none font-extrabold tracking-[-0.02em] text-white">
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

export function ButtonLime({ href, children, className = "", ...rest }: ButtonProps) {
  const cls = `btn-lime inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base ${className}`;
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

export function ButtonGhost({ href, children, className = "", ...rest }: ButtonProps) {
  const cls = `btn-ghost inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base ${className}`;
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
/* Layout atoms                                                        */
/* ------------------------------------------------------------------ */

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-28 px-5 py-24 sm:px-8 md:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="chip-lime mb-6 inline-block px-3.5 py-2 text-xs font-extrabold tracking-[0.16em] uppercase">
      {children}
    </p>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`card-shell h-full ${className}`}>
      <div className="card-inner p-7 sm:p-9">{children}</div>
    </div>
  );
}
