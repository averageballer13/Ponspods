import type { Metadata } from "next";
import { AppShell } from "@/components/dapp/AppShell";
import { DappBackground } from "@/components/visual/DappBackground";

export const metadata: Metadata = {
  title: "dApp · Ponspods",
  description: "Browse pods, size a position and deploy your own.",
};

export default function AppLayout({ children }: LayoutProps<"/app">) {
  return (
    <>
      <DappBackground />
      <AppShell>{children}</AppShell>
    </>
  );
}
