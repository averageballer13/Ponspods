"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Logo } from "@/components/ui";
import { SocialLinks } from "@/components/site/SocialLinks";
import { ConnectButton, WalletProvider } from "@/components/dapp/WalletProvider";

const NAV = [
  { label: "Pods", href: "/app", icon: "grid" },
  { label: "Lending", href: "/app/lending", icon: "layers" },
  { label: "Swap", href: "/app/swap", icon: "swap" },
  { label: "Portfolio", href: "/app/portfolio", icon: "wallet" },
  { label: "Create", href: "/app/create", icon: "plus" },
] as const;

const ICONS: Record<string, string> = {
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17l9 5 9-5",
  swap: "M4 8h13M14 5l3 3-3 3M20 16H7M10 13l-3 3 3 3",
  wallet: "M3 7h15a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7zM3 7a3 3 0 0 1 3-3h9M17 13h.01",
  plus: "M12 5v14M5 12h14",
};

function NavIcon({ name }: { name: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={ICONS[name]}
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);

  const isActive = (href: string) =>
    href === "/app" ? pathname === "/app" : pathname.startsWith(href);

  return (
    <WalletProvider>
      <div className="app-scope flex min-h-svh flex-col">
      <header className="border-line/70 sticky top-0 z-50 border-b bg-[#040703]/55 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-7">
            <Link href="/" aria-label="Back to the site">
              <Logo size={24} />
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isActive(n.href)
                      ? "app-nav-active"
                      : "hover:text-lime text-white/45 hover:bg-[#12290d]/60"
                  }`}
                >
                  <NavIcon name={n.icon} />
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="border-line/70 hidden items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold text-white/40 lg:inline-flex">
              <span className="bg-lime/70 h-1.5 w-1.5 rounded-full" />
              Robinhood Chain
            </span>
            <ConnectButton />
            <button
              aria-label="Menu"
              onClick={() => setMenu((v) => !v)}
              className="border-line flex h-10 w-10 items-center justify-center rounded-full border text-white md:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path
                  d={menu ? "M4 4l10 10M14 4L4 14" : "M2 5h14M2 9h14M2 13h14"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {menu ? (
          <nav className="border-line/70 grid grid-cols-2 gap-1.5 border-t p-3 md:hidden">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMenu(false)}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${
                  isActive(n.href) ? "app-nav-active" : "hover:text-lime text-white/55"
                }`}
              >
                <NavIcon name={n.icon} />
                {n.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-line/70 border-t px-5 py-6 sm:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>Ponspods — pre-launch preview. Not live, not investment advice.</p>
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-mint transition-colors">
              Site
            </Link>
            <Link href="/#how" className="hover:text-mint transition-colors">
              How it works
            </Link>
            <SocialLinks className="ml-1" />
          </div>
        </div>
      </footer>
      </div>
    </WalletProvider>
  );
}
