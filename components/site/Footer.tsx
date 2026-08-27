import Link from "next/link";
import { Logo } from "@/components/ui";

const COLUMNS = [
  {
    title: "Protocol",
    links: [
      { label: "Pods", href: "/app" },
      { label: "Lending", href: "/app/lending" },
      { label: "Swap", href: "/app/swap" },
      { label: "Portfolio", href: "/app/portfolio" },
      { label: "Create a pod", href: "/app/create" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "The RWA thesis", href: "/#thesis" },
      { label: "How it works", href: "/#how" },
      { label: "Volatility calendar", href: "/#calendar" },
      { label: "FAQ", href: "/#faq" },
      { label: "Documentation", href: "/#faq" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { label: "Robinhood Chain", href: "https://docs.robinhood.com/chain/" },
      { label: "Pons", href: "https://ponsnft.xyz" },
      { label: "Peapods Finance", href: "https://peapods.finance" },
      { label: "USDG", href: "https://global-dollar.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-border bg-background-elevated border-t">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="text-foreground-muted mt-4 max-w-xs text-sm leading-relaxed">
              Pods for real-world assets. Volatility farming, leveraged volatility farming and
              self-lending markets on Robinhood Chain.
            </p>
            <div className="mt-6 flex gap-2">
              {["X", "TG", "GH", "DL"].map((s) => (
                <span
                  key={s}
                  className="border-border text-foreground-subtle hover:border-accent-blue hover:text-accent-blue flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border text-[11px] font-semibold transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-foreground text-sm font-semibold">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-foreground-muted hover:text-accent-blue text-sm transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border text-foreground-subtle mt-14 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>Ponspods — concept design. Not a live protocol, not investment advice.</p>
          <p>
            Mechanics adapted from Peapods Finance. Visual language adapted from Pons. Illustrative
            figures only.
          </p>
        </div>
      </div>
    </footer>
  );
}
