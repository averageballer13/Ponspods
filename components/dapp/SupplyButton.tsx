"use client";

import { useState } from "react";
import { ActionButton } from "@/components/dapp/WalletProvider";

export function SupplyButton({ market, asset }: { market: string; asset: string }) {
  const [amount, setAmount] = useState("");

  return (
    <div className="border-line/70 mt-5 border-t pt-5">
      <div className="border-line focus-within:border-line-2 flex items-center gap-3 rounded-xl border bg-[#070f05] px-4 py-3 transition-colors">
        <input
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
          placeholder="0.00"
          aria-label={`Amount to supply to ${market}`}
          className="tnum min-w-0 flex-1 bg-transparent text-lg font-extrabold text-white outline-none placeholder:text-white/20"
        />
        <span className="border-line shrink-0 rounded-full border px-2.5 py-1 text-xs font-bold text-white/70">
          {asset}
        </span>
      </div>
      <ActionButton
        className="mt-3"
        disabled={!amount}
        tx={{
          title: `Supply ${asset} to ${market}`,
          rows: [
            ["Amount", `${amount || "0"} ${asset}`],
            ["Market", market],
          ],
        }}
      >
        Supply {asset}
      </ActionButton>
    </div>
  );
}
