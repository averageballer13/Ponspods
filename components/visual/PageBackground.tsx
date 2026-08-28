/**
 * Fixed page backdrop: a deep green horizon with clouds drifting on a slow
 * wind, the whole thing pushed through a dot-matrix screen so it reads like
 * the poster — and like the pixel blocks in the logo.
 */

const CLOUDS = [
  { top: "6%", w: 640, h: 150, dur: 190, delay: -40, min: 0.1, max: 0.2, blur: 46 },
  { top: "14%", w: 900, h: 200, dur: 260, delay: -150, min: 0.07, max: 0.15, blur: 62 },
  { top: "26%", w: 520, h: 130, dur: 220, delay: -95, min: 0.09, max: 0.18, blur: 40 },
  { top: "38%", w: 1100, h: 230, dur: 320, delay: -210, min: 0.05, max: 0.11, blur: 78 },
];

export function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* sky to land */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #071105 0%, #0a1a08 26%, #0d2409 48%, #091805 72%, #040703 100%)",
        }}
      />

      {/* horizon haze */}
      <div
        className="absolute inset-x-0"
        style={{
          top: "34%",
          height: "34%",
          background:
            "radial-gradient(120% 100% at 50% 0%, rgba(157,184,148,0.16) 0%, rgba(4,7,3,0) 70%)",
        }}
      />

      {/* drifting clouds */}
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="absolute left-0"
          style={{
            top: c.top,
            width: c.w,
            height: c.h,
            animation: `cloud-wind ${c.dur}s linear infinite`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <div
            className="h-full w-full"
            style={
              {
                background:
                  "radial-gradient(50% 50% at 30% 55%, rgba(220,236,212,0.9) 0%, rgba(220,236,212,0) 70%), radial-gradient(45% 55% at 62% 42%, rgba(220,236,212,0.75) 0%, rgba(220,236,212,0) 72%), radial-gradient(38% 46% at 82% 60%, rgba(220,236,212,0.6) 0%, rgba(220,236,212,0) 74%)",
                filter: `blur(${c.blur}px)`,
                animation: `cloud-swell ${c.dur / 3}s ease-in-out infinite`,
                "--cloud-min": c.min,
                "--cloud-max": c.max,
              } as React.CSSProperties
            }
          />
        </div>
      ))}

      {/* rolling hills */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        style={{ height: "52%" }}
      >
        <path
          d="M0,214 C170,168 300,206 468,190 C640,174 742,120 918,142 C1090,164 1246,214 1440,186 L1440,420 L0,420 Z"
          fill="#0c2109"
          opacity="0.9"
        />
        <path
          d="M0,276 C190,238 330,282 512,268 C700,254 812,214 990,240 C1160,264 1300,300 1440,278 L1440,420 L0,420 Z"
          fill="#091905"
        />
        <path
          d="M0,340 C220,312 380,348 580,338 C790,328 900,300 1080,320 C1240,338 1340,362 1440,350 L1440,420 L0,420 Z"
          fill="#050d03"
        />
      </svg>

      {/* faint furrow lines on the near hill */}
      <div
        className="pixel-grid absolute inset-x-0 bottom-0 opacity-40"
        style={{ height: "22%" }}
      />

      {/* the screen: everything above is broken into dots */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(4,7,3,0.78) 0.9px, transparent 1.15px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* vignette so content always sits on something dark enough to read on */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(105% 78% at 50% 34%, rgba(4,7,3,0.18) 0%, rgba(4,7,3,0.74) 62%, rgba(4,7,3,0.94) 100%)",
        }}
      />
    </div>
  );
}
