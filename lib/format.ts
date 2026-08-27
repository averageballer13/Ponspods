export function usd(n: number, opts: { compact?: boolean; decimals?: number } = {}) {
  const { compact = true, decimals } = opts;
  if (compact && Math.abs(n) >= 1000) {
    const units = [
      { v: 1e12, s: "T" },
      { v: 1e9, s: "B" },
      { v: 1e6, s: "M" },
      { v: 1e3, s: "K" },
    ];
    for (const u of units) {
      if (Math.abs(n) >= u.v) {
        const val = n / u.v;
        return `$${val.toFixed(val >= 100 ? 0 : val >= 10 ? 1 : 2)}${u.s}`;
      }
    }
  }
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: decimals ?? 2,
    maximumFractionDigits: decimals ?? 2,
  })}`;
}

export function pct(n: number, decimals = 1) {
  return `${n > 0 ? "" : ""}${n.toFixed(decimals)}%`;
}

export function signedPct(n: number, decimals = 2) {
  return `${n >= 0 ? "+" : ""}${n.toFixed(decimals)}%`;
}

export function num(n: number, decimals = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Deterministic PRNG so server and client render identical sparklines. */
export function seeded(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

/** Random-walk series with a drift, deterministic per seed. */
export function series(seed: string, points = 48, drift = 0.4, vol = 1) {
  const rnd = seeded(seed);
  const out: number[] = [];
  let v = 100;
  for (let i = 0; i < points; i++) {
    v += (rnd() - 0.5) * 6 * vol + drift * 0.25;
    out.push(Math.max(4, v));
  }
  return out;
}

export function toPath(values: number[], w: number, h: number, pad = 2) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * (w - pad * 2) + pad;
      const y = h - pad - ((v - min) / span) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}
