import { Logo } from "@/components/ui";

const LINKS = [
  { label: "dApp", href: "/app" },
  { label: "How it works", href: "/#how" },
  { label: "Why stocks", href: "/#why" },
  { label: "Pods", href: "/#pods" },
  { label: "Robinhood Chain", href: "https://docs.robinhood.com/chain/" },
  { label: "Peapods Finance", href: "https://peapods.finance" },
];

export function Footer() {
  return (
    <footer className="border-line/80 border-t px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Logo />
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="hover:text-mint text-base font-semibold text-white/55 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-white/30">
          Ponspods is a concept project. Nothing here is live and nothing here is investment advice.
          Company names and logos are trademarks of their respective owners, used only to identify
          the underlying company of a tokenized stock.
        </p>
      </div>
    </footer>
  );
}
