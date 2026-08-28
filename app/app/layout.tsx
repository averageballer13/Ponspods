import type { Metadata } from "next";
import { AppShell } from "@/components/dapp/AppShell";

export const metadata: Metadata = {
  title: "dApp · Ponspods",
  description: "Browse pods, size a position and deploy your own. Pre-launch preview.",
};

export default function AppLayout({ children }: LayoutProps<"/app">) {
  return <AppShell>{children}</AppShell>;
}
