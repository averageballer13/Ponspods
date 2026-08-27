"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/ui";
import { CHAINS } from "@/lib/data";

const NAV = [
  { label: "Pods", href: "/app" },
  { label: "Lending", href: "/app/lending" },
  { label: "Swap", href: "/app/swap" },
  { label: "Portfolio", href: "/app/portfolio" },
  { label: "Create", href: "/app/create" },
] as const;

export function AppHeader() {
  const pathname = usePathname();
  const [connected, setConnected] = useState(false);
  const [chain, setChain] = useState(CHAINS[0].id);
  const [open, setOpen] = useState(false);

  return (
    <header className="border-border bg-background/85 sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="border-border hidden items-center gap-1 rounded-full border bg-white/70 p-1 md:flex">
            {NAV.map((n) => {
              const active = n.href === "/app" ? pathname === "/app" : pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-foreground text-background"
                      : "text-foreground-muted hover:text-foreground hover:bg-background-elevated-2"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="border-border hidden items-center gap-0.5 rounded-full border bg-white/70 p-1 sm:flex">
            {CHAINS.map((c) => (
              <button
                key={c.id}
                onClick={() => setChain(c.id)}
                title={c.label}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  chain === c.id ? "text-white" : "text-foreground-subtle hover:text-foreground"
                }`}
                style={chain === c.id ? { background: c.tint } : undefined}
              >
                {c.short}
              </button>
            ))}
          </div>

          <button
            onClick={() => setConnected((v) => !v)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-transform duration-200 hover:scale-[1.03] ${
              connected
                ? "border-border text-foreground border bg-white"
                : "bg-accent-blue text-white"
            }`}
          >
            {connected ? (
              <>
                <span className="bg-pod h-1.5 w-1.5 rounded-full" />
                <span className="tabular">0x7a4f…c19b</span>
              </>
            ) : (
              "Connect"
            )}
          </button>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="border-border text-foreground flex h-9 w-9 items-center justify-center rounded-full border md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d={open ? "M3 3l10 10M13 3L3 13" : "M2 4h12M2 8h12M2 12h12"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-border grid grid-cols-2 gap-1 border-t p-3 md:hidden">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-foreground-muted hover:bg-background-elevated-2 rounded-xl px-4 py-2.5 text-sm font-medium"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
