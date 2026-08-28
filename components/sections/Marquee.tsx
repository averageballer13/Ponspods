import { BrandMark } from "@/components/ui";
import { TICKER_BRANDS } from "@/lib/pods";

export function Marquee() {
  const row = [...TICKER_BRANDS, ...TICKER_BRANDS];
  return (
    <div className="border-line/70 mask-fade-x overflow-hidden border-y py-8">
      <div className="animate-marquee flex w-max items-center gap-14">
        {row.map((b, i) => (
          <span key={`${b}-${i}`} className="opacity-70">
            <BrandMark brand={b} size={34} />
          </span>
        ))}
      </div>
    </div>
  );
}
