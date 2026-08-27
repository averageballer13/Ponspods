"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonPrimary, Logo } from "@/components/ui";

const NAV = [
  { label: "Why RWAs", href: "/#thesis" },
  { label: "How it works", href: "/#how" },
  { label: "Pods", href: "/#pods" },
  { label: "Calendar", href: "/#calendar" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-5 z-50 md:top-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className={`flex items-center rounded-full py-1.5 transition-all duration-300 ${
            scrolled ? "bg-white/85 px-3 backdrop-blur-md" : "px-0"
          }`}
        >
          <Logo tone={scrolled ? "dark" : "light"} />
        </Link>

        <nav
          className={`hidden items-center gap-1 rounded-full p-1 transition-colors duration-300 md:flex ${
            scrolled ? "border-border border bg-white/85 backdrop-blur-md" : "bg-black/25 backdrop-blur-sm"
          }`}
        >
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                scrolled
                  ? "text-foreground-muted hover:text-foreground hover:bg-background-elevated-2"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#pods"
            className={`hidden rounded-full px-4 py-1.5 text-sm font-medium transition-colors lg:inline-flex ${
              scrolled
                ? "border-border text-foreground-muted hover:text-foreground border bg-white/85 backdrop-blur-md"
                : "bg-black/25 text-white/80 backdrop-blur-sm hover:bg-black/45 hover:text-white"
            }`}
          >
            $PODS
          </a>
          <ButtonPrimary href="/app" className="hidden sm:inline-flex">
            Launch App
          </ButtonPrimary>
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors md:hidden ${
              scrolled ? "border-border text-foreground border bg-white/85" : "bg-black/25 text-white"
            }`}
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
        <div className="border-border card-shadow mx-4 mt-3 rounded-2xl border bg-white/95 p-2 backdrop-blur-xl md:hidden">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-foreground-muted hover:bg-background-elevated-2 block rounded-xl px-4 py-2.5 text-sm font-medium"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/app"
            onClick={() => setOpen(false)}
            className="bg-foreground text-background mt-1 block rounded-xl px-4 py-2.5 text-center text-sm font-semibold"
          >
            Launch App
          </Link>
        </div>
      ) : null}
    </header>
  );
}
