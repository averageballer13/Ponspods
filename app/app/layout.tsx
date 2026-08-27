import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader } from "@/components/app/AppHeader";

export const metadata: Metadata = {
  title: "App",
  description: "Browse pods, farm volatility and manage leveraged positions.",
};

export default function AppLayout({ children }: LayoutProps<"/app">) {
  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader />
      <main className="flex-1">{children}</main>
      <footer className="border-border text-foreground-subtle border-t px-4 py-6 text-xs sm:px-6">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>Ponspods — concept interface. All figures are illustrative.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-accent-blue transition-colors">
              Home
            </Link>
            <Link href="/#faq" className="hover:text-accent-blue transition-colors">
              Docs
            </Link>
            <Link href="/#calendar" className="hover:text-accent-blue transition-colors">
              Volatility calendar
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
