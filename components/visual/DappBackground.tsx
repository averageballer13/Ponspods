/**
 * dApp backdrop: the landscape poster, held still and darkened, with a few
 * cloud bands drifting right to left at mismatched speeds so the loop never
 * lines up. Kept deliberately faint — it should register as texture, not as a
 * picture competing with the interface.
 */

const CLOUD_BANDS = [
  { top: "2%", h: "26%", dur: 240, delay: 0, opacity: 0.1, blur: 2, scale: 1 },
  { top: "10%", h: "22%", dur: 350, delay: -130, opacity: 0.07, blur: 5, scale: 1.25 },
  { top: "0%", h: "34%", dur: 470, delay: -290, opacity: 0.05, blur: 9, scale: 1.6 },
];

export function DappBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* the poster */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/dapp-bg.webp)" }}
      />

      {/* cloud bands drifting right to left */}
      {CLOUD_BANDS.map((c, i) => (
        <div
          key={i}
          className="absolute inset-x-0"
          style={{ top: c.top, height: c.h, opacity: c.opacity }}
        >
          <div
            className="h-full w-[200%]"
            style={{
              backgroundImage: "url(/dapp-clouds.webp)",
              backgroundSize: `${50 * c.scale}% 100%`,
              backgroundRepeat: "repeat-x",
              filter: `blur(${c.blur}px)`,
              animation: `cloud-pan ${c.dur}s linear infinite`,
              animationDelay: `${c.delay}s`,
            }}
          />
        </div>
      ))}

      {/* darkening pass so the interface always has contrast, kept light enough
          that the landscape still reads through it */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,7,3,0.62) 0%, rgba(4,7,3,0.72) 42%, rgba(4,7,3,0.86) 100%)",
        }}
      />

      {/* the dot screen, matching the poster texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(4,7,3,0.55) 0.9px, transparent 1.15px)",
          backgroundSize: "4px 4px",
        }}
      />
    </div>
  );
}
