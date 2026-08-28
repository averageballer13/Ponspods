import Link from "next/link";
import { PageHead, StatSlot } from "@/components/dapp/bits";
import { PodsExplorer } from "@/components/dapp/PodsExplorer";

export default function PodsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-9 sm:px-8">
      <PageHead
        title="Pods"
        intro="Wrap a tokenized stock, provide the pod-token side only, and let the protocol borrow the rest. Yield comes from fee flow, never from emissions."
        action={
          <Link
            href="/app/create"
            className="border-line hover:border-line-2 inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold text-white transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Deploy a pod
          </Link>
        }
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatSlot label="Total value locked" />
        <StatSlot label="Fees generated" />
        <StatSlot label="Paid to LPs" />
        <StatSlot label="Value burned" />
      </div>

      <div className="mt-8">
        <PodsExplorer />
      </div>
    </div>
  );
}
