import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { BRANDS } from "@/lib/brands";

/* ------------------------------------------------------------------ */
/* Logo                                                                */
/* ------------------------------------------------------------------ */

/** The pod on its own — 380x172 in the source art. */
export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <Image
      src="/logo-mark.png"
      alt=""
      width={Math.round(size * (380 / 172))}
      height={size}
      priority
      style={{ height: size, width: "auto" }}
    />
  );
}

/** Full lockup, pod plus wordmark — 1710x276 in the source art. */
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <Image
      src="/logo-lockup.png"
      alt="Ponspods"
      width={Math.round(size * (1710 / 276))}
      height={size}
      priority
      style={{ height: size, width: "auto" }}
    />
  );
}

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

export function BrandChip({ brand, size = 56 }: { brand: string; size?: number }) {
  return (
    <span
      className="border-line flex items-center justify-center rounded-xl border bg-[#070f05]"
      style={{ width: size, height: size }}
    >
      <BrandMark brand={brand} size={size * 0.5} />
    </span>
  );
}

export function BrandCluster({ brands, size = 40 }: { brands: string[]; size?: number }) {
  return (
    <span className="flex items-center">
      {brands.map((b, i) => (
        <span
          key={b}
          className="border-line flex items-center justify-center rounded-xl border bg-[#070f05]"
          style={{
            width: size,
            height: size,
            marginLeft: i === 0 ? 0 : -size * 0.3,
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
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

type ButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function ButtonLight({ href, children, className = "", ...rest }: ButtonProps) {
  const cls = `btn-light inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base ${className}`;
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
  const cls = `btn-outline inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base ${className}`;
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

/** The recurring "open the dapp" call to action. */
export function OpenDappButton({
  className = "",
  label = "Open dApp",
  size = "lg",
}: {
  className?: string;
  label?: string;
  size?: "sm" | "lg";
}) {
  const pad = size === "sm" ? "px-5 py-2.5 text-sm" : "px-7 py-3.5 text-base";
  return (
    <Link href="/app" className={`btn-light group inline-flex items-center gap-2.5 ${pad} ${className}`}>
      {label}
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#040703] transition-transform duration-300 group-hover:translate-x-0.5">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
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
    <p className="chip mb-6 inline-block px-3.5 py-2 text-xs font-extrabold tracking-[0.16em] uppercase">
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

/** A metric with no value yet. The protocol is not live. */
export function Pending({ className = "" }: { className?: string }) {
  return (
    <span className={`text-sage/50 tnum ${className}`} title="Not live yet">
      —
    </span>
  );
}
