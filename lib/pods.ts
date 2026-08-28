/** The launch line-up. Deliberately free of figures — nothing is live yet. */

export type Pod = {
  slug: string;
  ticker: string;
  company: string;
  /** Keys into BRANDS in lib/brands.ts */
  brands: string[];
  /** One line: what this pod is actually farming. */
  line: string;
  tag: string;
};

export const PODS: Pod[] = [
  {
    slug: "nvda",
    ticker: "pNVDA",
    company: "Nvidia",
    brands: ["nvidia"],
    tag: "Earnings",
    line: "The most watched earnings date on earth. The whole market repositions around it, twice a year, on a published schedule.",
  },
  {
    slug: "tsla",
    ticker: "pTSLA",
    company: "Tesla",
    brands: ["tesla"],
    tag: "High beta",
    line: "Delivery numbers, headlines, and a shareholder base that never agrees on anything. It moves, constantly.",
  },
  {
    slug: "mstr",
    ticker: "pMSTR",
    company: "Strategy",
    brands: ["microstrategy"],
    tag: "Retail favourite",
    line: "A stock that trades like a coin, on a market that closes like a stock. The widest swings in the line-up.",
  },
  {
    slug: "hood",
    ticker: "pHOOD",
    company: "Robinhood Markets",
    brands: ["robinhood"],
    tag: "Home chain",
    line: "The company behind the chain everything here settles on. Farmed on its own rails.",
  },
  {
    slug: "spacex",
    ticker: "pSPACEX",
    company: "SpaceX",
    brands: ["spacex"],
    tag: "Never closes",
    line: "No opening bell, no closing bell, no official price. Pure on-chain discovery, around the clock.",
  },
  {
    slug: "mag7",
    ticker: "pMAG7",
    company: "The Magnificent Seven",
    brands: ["apple", "microsoft", "nvidia", "amazon", "meta", "google", "tesla"],
    tag: "Basket",
    line: "Seven stocks in one wrapper. An index fund where the fees make your share bigger instead of smaller.",
  },
];

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
