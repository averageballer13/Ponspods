import type { Metadata } from "next";
import { PageHead } from "@/components/dapp/bits";
import { CreatePodForm } from "@/components/dapp/CreatePodForm";

export const metadata: Metadata = { title: "Create a pod · Ponspods" };

export default function CreatePage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-9 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <PageHead
          title="Deploy a pod"
          intro="Pick a tokenized asset, set the fee schedule, ship it. No whitelist, no upfront liquidity, no upgrade key afterwards. Self-lending bootstraps the borrow market in the same transaction."
        />
        <div className="mt-8">
          <CreatePodForm />
        </div>
      </div>
    </div>
  );
}
