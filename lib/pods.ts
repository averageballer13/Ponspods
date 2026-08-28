/** The launch line-up. Deliberately free of figures — nothing is live yet. */

export type Category = "equity" | "index";
export type Session = "market-hours" | "always";

export type Pod = {
  slug: string;
  ticker: string;
  company: string;
  /** Keys into BRANDS in lib/brands.ts */
  brands: string[];
  /** One line: what this pod is actually farming. */
  line: string;
  tag: string;
  category: Category;
  /** What the pod token is paired against in its pool. */
  paired: string;
  session: Session;
  /** Longer copy for the pod page. */
  detail: string;
  constituents?: string[];
};

export const PODS: Pod[] = [
  {
    slug: "nvda",
    ticker: "pNVDA",
    company: "Nvidia",
    brands: ["nvidia"],
    tag: "Earnings",
    category: "equity",
    paired: "USDG",
    session: "market-hours",
    line: "The most watched earnings date on earth. The whole market repositions around it, on a published schedule.",
    detail:
      "Nvidia is the deepest, most traded name in the tokenized equity market, and its calendar is the single most anticipated event in global equities. Every repositioning ahead of results, and every correction after them, has to move through the pod.",
  },
  {
    slug: "tsla",
    ticker: "pTSLA",
    company: "Tesla",
    brands: ["tesla"],
    tag: "High beta",
    category: "equity",
    paired: "USDG",
    session: "market-hours",
    line: "Delivery numbers, headlines, and a shareholder base that never agrees on anything. It moves, constantly.",
    detail:
      "Structurally elevated realized volatility with no single dominant catalyst. Tesla generates a steady stream of corrections rather than a few large ones, which suits a pod that earns per trade rather than per move.",
  },
  {
    slug: "mstr",
    ticker: "pMSTR",
    company: "Strategy",
    brands: ["microstrategy"],
    tag: "Retail favourite",
    category: "equity",
    paired: "USDG",
    session: "market-hours",
    line: "A stock that trades like a coin, on a market that closes like a stock. The widest swings in the line-up.",
    detail:
      "Crypto-correlated during the week, frozen at the weekend. Bitcoin keeps moving while the reference price cannot, so the gap between Friday close and Monday open is wider here than anywhere else in the line-up.",
  },
  {
    slug: "hood",
    ticker: "pHOOD",
    company: "Robinhood Markets",
    brands: ["robinhood"],
    tag: "Home chain",
    category: "equity",
    paired: "USDG",
    session: "market-hours",
    line: "The company behind the chain everything here settles on. Farmed on its own rails.",
    detail:
      "The equity of the venue itself. Volume on the chain and volume in this pod feed each other, which makes it the most reflexive position available.",
  },
  {
    slug: "spacex",
    ticker: "pSPACEX",
    company: "SpaceX",
    brands: ["spacex"],
    tag: "Never closes",
    category: "equity",
    paired: "USDG",
    session: "always",
    line: "No opening bell, no closing bell, no official price. Pure on-chain discovery, around the clock.",
    detail:
      "There is no exchange to arbitrage against, so the pool is the price. That removes the weekend gap entirely and replaces it with a permanently wider spread — a different shape of the same trade.",
  },
  {
    slug: "mag7",
    ticker: "pMAG7",
    company: "The Magnificent Seven",
    brands: ["apple", "microsoft", "nvidia", "amazon", "meta", "google", "tesla"],
    tag: "Basket",
    category: "index",
    paired: "USDG",
    session: "market-hours",
    line: "Seven stocks in one wrapper. An index fund where the fees make your share bigger instead of smaller.",
    detail:
      "A basket pod behaves like an index fund with the sign of the expense ratio flipped. Rebalancing flow is itself a fee event, so the thing that costs money in a traditional ETF is the thing that pays here.",
    constituents: ["apple", "microsoft", "nvidia", "amazon", "meta", "google", "tesla"],
  },
];

export function getPod(slug: string) {
  return PODS.find((p) => p.slug === slug);
}

/** Logos shown in the hero strip and the marquee. */
export const TICKER_BRANDS = [
  "nvidia",
  "apple",
  "tesla",
  "amazon",
  "microsoft",
  "meta",
  "google",
  "robinhood",
  "spacex",
  "netflix",
  "coinbase",
  "amd",
  "palantir",
  "microstrategy",
];

/** Lending venues planned at launch. */
export const MARKETS = [
  {
    slug: "usdg-prime",
    name: "USDG Prime",
    kind: "metavault" as const,
    asset: "USDG",
    blurb:
      "One deposit spread across the whitelisted equity pods. Curated by governance, rebalanced as pods come online.",
    pods: ["pNVDA", "pMAG7", "pTSLA", "pHOOD"],
  },
  {
    slug: "usdg-highbeta",
    name: "USDG High Beta",
    kind: "metavault" as const,
    asset: "USDG",
    blurb:
      "The volatile end of the line-up. Higher rate, thinner cover, no diversification to hide behind.",
    pods: ["pMSTR", "pSPACEX"],
  },
  ...["nvda", "tsla", "mstr", "hood", "spacex", "mag7"].map((s) => ({
    slug: `iso-${s}`,
    name: `p${s.toUpperCase()} isolated`,
    kind: "isolated" as const,
    asset: "USDG",
    blurb: "Direct exposure to a single pod. No curator, no diversification.",
    pods: [`p${s.toUpperCase()}`],
  })),
];
