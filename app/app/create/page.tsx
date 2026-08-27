import type { Metadata } from "next";
import { CreatePodForm } from "@/components/app/CreatePodForm";

export const metadata: Metadata = {
  title: "Create a pod",
  description: "Deploy a permissionless pod around any tokenized asset or basket.",
};

export default function CreatePage() {
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">Deploy a pod</h1>
        <p className="text-foreground-muted mt-2 max-w-2xl text-sm sm:text-base">
          Pick a tokenized asset or build a basket, set the fee schedule, ship it. No whitelist, no
          upfront liquidity, no upgrade key afterwards. Self-lending bootstraps the borrow market in
          the same transaction.
        </p>

        <div className="mt-8">
          <CreatePodForm />
        </div>
      </div>
    </div>
  );
}
