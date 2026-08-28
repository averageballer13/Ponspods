"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo, OpenDappButton } from "@/components/ui";

const NAV = [
  { label: "How it works", href: "#how" },
  { label: "Why stocks", href: "#why" },
  { label: "Pods", href: "#pods" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-line/80 border-b bg-[#040703]/85 backdrop-blur-xl" : ""
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Ponspods home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="hover:text-mint text-base font-semibold text-white/60 transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <OpenDappButton size="sm" className="hidden sm:inline-flex" />
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="border-line-2 flex h-11 w-11 items-center justify-center rounded-full border text-white md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d={open ? "M4 4l10 10M14 4L4 14" : "M2 5h14M2 9h14M2 13h14"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-line mx-5 mb-3 rounded-2xl border bg-[#070f05]/97 p-3 backdrop-blur-xl md:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3.5 text-base font-semibold text-white/80 hover:bg-[#12290d]"
            >
              {n.label}
            </a>
          ))}
          <Link
            href="/app"
            onClick={() => setOpen(false)}
            className="btn-light mt-2 block px-4 py-3.5 text-center text-base"
          >
            Open dApp
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
