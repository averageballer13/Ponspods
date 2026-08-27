/**
 * Mock protocol state for the Ponspods interface.
 * Numbers are illustrative — the shapes mirror what an indexer would return.
 */

export type Category = "equity" | "index" | "commodity" | "treasury" | "crypto";
export type Chain = "robinhood" | "ethereum" | "base" | "arbitrum";
export type Session = "open" | "closed" | "premarket" | "afterhours" | "weekend" | "always";

export const CHAINS: { id: Chain; label: string; short: string; tint: string }[] = [
  { id: "robinhood", label: "Robinhood Chain", short: "RHC", tint: "#12b981" },
  { id: "ethereum", label: "Ethereum", short: "ETH", tint: "#6b7fd7" },
  { id: "base", label: "Base", short: "BASE", tint: "#3b76e0" },
  { id: "arbitrum", label: "Arbitrum", short: "ARB", tint: "#2b8fd6" },
];

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "equity", label: "Equities" },
  { id: "index", label: "Index pods" },
  { id: "commodity", label: "Commodities" },
  { id: "treasury", label: "Treasuries" },
  { id: "crypto", label: "Crypto" },
];

export type Pod = {
  slug: string;
  ticker: string;
  name: string;
  underlying: string;
  underlyingName: string;
  category: Category;
  chain: Chain;
  paired: string;
  /** Volatility farming APY — fee income to LPs, unlevered. */
  vfApy: number;
  /** Leveraged volatility farming APY, net of borrow cost. */
  lvfApy: number;
  tvl: number;
  volume24h: number;
  fees24h: number;
  cbr: number;
  cbr30d: number;
  wrapFee: number;
  unwrapFee: number;
  buyFee: number;
  sellFee: number;
  borrowApr: number;
  utilization: number;
  maxLeverage: number;
  selfLending: boolean;
  pairingAsset: boolean;
  session: Session;
  /** Extra AMM fee applied while the underlying market is closed. */
  gapPremium: number;
  realizedVol: number;
  nextCatalyst: {
    label: string;
    date: string;
    kind: "earnings" | "macro" | "expiry" | "rebalance" | "unlock";
  } | null;
  holders: number;
  burned: number;
  constituents?: { symbol: string; weight: number }[];
  blurb: string;
};

export const PODS: Pod[] = [
  {
    slug: "pgme",
    ticker: "pGME",
    name: "GameStop Memestock Pod",
    underlying: "GMEx",
    underlyingName: "GameStop Stock Token",
    category: "equity",
    chain: "robinhood",
    paired: "USDG",
    vfApy: 41.8,
    lvfApy: 118.4,
    tvl: 8_420_000,
    volume24h: 26_600_000,
    fees24h: 61_400,
    cbr: 1.184,
    cbr30d: 4.1,
    wrapFee: 0.25,
    unwrapFee: 0.5,
    buyFee: 0.6,
    sellFee: 0.9,
    borrowApr: 9.4,
    utilization: 94,
    maxLeverage: 5,
    selfLending: true,
    pairingAsset: false,
    session: "closed",
    gapPremium: 0.35,
    realizedVol: 96,
    nextCatalyst: { label: "Q3 earnings", date: "2026-09-09", kind: "earnings" },
    holders: 4128,
    burned: 214_882,
    blurb:
      "The highest realized volatility in the tokenized equity market. Every retail impulse, every halt, every weekend gap is fee flow for the pod.",
  },
  {
    slug: "pnvda",
    ticker: "pNVDA",
    name: "Nvidia Volatility Pod",
    underlying: "NVDAx",
    underlyingName: "Nvidia Stock Token",
    category: "equity",
    chain: "robinhood",
    paired: "USDG",
    vfApy: 18.6,
    lvfApy: 52.3,
    tvl: 14_900_000,
    volume24h: 14_020_000,
    fees24h: 38_900,
    cbr: 1.092,
    cbr30d: 2.4,
    wrapFee: 0.2,
    unwrapFee: 0.4,
    buyFee: 0.45,
    sellFee: 0.6,
    borrowApr: 7.8,
    utilization: 88,
    maxLeverage: 6,
    selfLending: true,
    pairingAsset: false,
    session: "closed",
    gapPremium: 0.25,
    realizedVol: 52,
    nextCatalyst: { label: "Q3 FY27 earnings", date: "2026-08-27", kind: "earnings" },
    holders: 6912,
    burned: 88_140,
    blurb:
      "The deepest RWA pod on the chain. Semis volatility, priced 24/7 against a market that shuts at four.",
  },
  {
    slug: "pmag7",
    ticker: "pMAG7",
    name: "Magnificent 7 Index Pod",
    underlying: "MAG7",
    underlyingName: "Ponspods MAG7 Basket",
    category: "index",
    chain: "robinhood",
    paired: "USDG",
    vfApy: 12.4,
    lvfApy: 34.7,
    tvl: 11_300_000,
    volume24h: 5_940_000,
    fees24h: 17_600,
    cbr: 1.071,
    cbr30d: 1.9,
    wrapFee: 0.2,
    unwrapFee: 0.35,
    buyFee: 0.35,
    sellFee: 0.45,
    borrowApr: 6.9,
    utilization: 81,
    maxLeverage: 6,
    selfLending: true,
    pairingAsset: true,
    session: "closed",
    gapPremium: 0.2,
    realizedVol: 31,
    nextCatalyst: { label: "Quarterly rebalance", date: "2026-09-19", kind: "rebalance" },
    holders: 9840,
    burned: 132_050,
    constituents: [
      { symbol: "NVDAx", weight: 21 },
      { symbol: "AAPLx", weight: 17 },
      { symbol: "MSFTx", weight: 17 },
      { symbol: "GOOGLx", weight: 13 },
      { symbol: "AMZNx", weight: 13 },
      { symbol: "METAx", weight: 10 },
      { symbol: "TSLAx", weight: 9 },
    ],
    blurb:
      "An index whose expense ratio is negative. Rebalance arbitrage and wrap flow burn pMAG7 supply, so the basket per share only ever grows.",
  },
  {
    slug: "phood",
    ticker: "pHOOD",
    name: "Robinhood Markets Pod",
    underlying: "HOODx",
    underlyingName: "Robinhood Markets Stock Token",
    category: "equity",
    chain: "robinhood",
    paired: "USDG",
    vfApy: 22.1,
    lvfApy: 61.9,
    tvl: 6_100_000,
    volume24h: 4_380_000,
    fees24h: 14_200,
    cbr: 1.114,
    cbr30d: 3.0,
    wrapFee: 0.25,
    unwrapFee: 0.5,
    buyFee: 0.5,
    sellFee: 0.7,
    borrowApr: 8.2,
    utilization: 91,
    maxLeverage: 5,
    selfLending: true,
    pairingAsset: false,
    session: "closed",
    gapPremium: 0.3,
    realizedVol: 58,
    nextCatalyst: { label: "Q2 earnings", date: "2026-09-02", kind: "earnings" },
    holders: 3315,
    burned: 41_920,
    blurb:
      "The equity of the chain it settles on, farmed on that same chain. Reflexive by construction.",
  },
  {
    slug: "pspacex",
    ticker: "pSPACEX",
    name: "SpaceX Pre-IPO Pod",
    underlying: "SPACEXx",
    underlyingName: "SpaceX Stock Token",
    category: "equity",
    chain: "robinhood",
    paired: "USDG",
    vfApy: 34.5,
    lvfApy: 89.2,
    tvl: 4_260_000,
    volume24h: 6_400_000,
    fees24h: 26_800,
    cbr: 1.156,
    cbr30d: 5.2,
    wrapFee: 0.3,
    unwrapFee: 0.6,
    buyFee: 0.7,
    sellFee: 1.0,
    borrowApr: 11.2,
    utilization: 97,
    maxLeverage: 4,
    selfLending: true,
    pairingAsset: false,
    session: "always",
    gapPremium: 0,
    realizedVol: 74,
    nextCatalyst: { label: "Funding round mark", date: "2026-10-15", kind: "unlock" },
    holders: 2870,
    burned: 33_410,
    blurb:
      "No closing bell, no reference price, pure on-chain discovery. The widest and most persistent arbitrage band of any pod.",
  },
  {
    slug: "pmeme",
    ticker: "pMEME",
    name: "Memestock Index Pod",
    underlying: "MEME7",
    underlyingName: "Ponspods Memestock Basket",
    category: "index",
    chain: "robinhood",
    paired: "USDG",
    vfApy: 47.9,
    lvfApy: 132.6,
    tvl: 3_180_000,
    volume24h: 9_100_000,
    fees24h: 41_300,
    cbr: 1.243,
    cbr30d: 7.4,
    wrapFee: 0.35,
    unwrapFee: 0.7,
    buyFee: 0.8,
    sellFee: 1.2,
    borrowApr: 13.6,
    utilization: 99,
    maxLeverage: 3,
    selfLending: true,
    pairingAsset: false,
    session: "closed",
    gapPremium: 0.45,
    realizedVol: 118,
    nextCatalyst: { label: "Monthly opex", date: "2026-09-18", kind: "expiry" },
    holders: 5602,
    burned: 96_770,
    constituents: [
      { symbol: "GMEx", weight: 30 },
      { symbol: "AMCx", weight: 18 },
      { symbol: "BBBYx", weight: 12 },
      { symbol: "HOODx", weight: 15 },
      { symbol: "DJTx", weight: 13 },
      { symbol: "MSTRx", weight: 12 },
    ],
    blurb:
      "The most volatile basket that has ever existed on-chain, and therefore the richest fee surface Ponspods can offer.",
  },
  {
    slug: "paapl",
    ticker: "pAAPL",
    name: "Apple Volatility Pod",
    underlying: "AAPLx",
    underlyingName: "Apple Stock Token",
    category: "equity",
    chain: "robinhood",
    paired: "USDG",
    vfApy: 9.8,
    lvfApy: 26.4,
    tvl: 7_740_000,
    volume24h: 2_960_000,
    fees24h: 8_100,
    cbr: 1.048,
    cbr30d: 1.3,
    wrapFee: 0.15,
    unwrapFee: 0.3,
    buyFee: 0.3,
    sellFee: 0.4,
    borrowApr: 6.2,
    utilization: 76,
    maxLeverage: 7,
    selfLending: false,
    pairingAsset: false,
    session: "closed",
    gapPremium: 0.15,
    realizedVol: 24,
    nextCatalyst: { label: "Product event", date: "2026-09-10", kind: "macro" },
    holders: 5120,
    burned: 29_640,
    blurb:
      "Low realized volatility, very deep liquidity. The conservative end of the curve — a savings account that happens to hold Apple.",
  },
  {
    slug: "ptbill",
    ticker: "pTBILL",
    name: "T-Bill Carry Pod",
    underlying: "USTBx",
    underlyingName: "Tokenized 3M T-Bill",
    category: "treasury",
    chain: "robinhood",
    paired: "USDG",
    vfApy: 2.1,
    lvfApy: 11.8,
    tvl: 19_400_000,
    volume24h: 1_240_000,
    fees24h: 3_300,
    cbr: 1.019,
    cbr30d: 0.4,
    wrapFee: 0.05,
    unwrapFee: 0.1,
    buyFee: 0.08,
    sellFee: 0.1,
    borrowApr: 4.6,
    utilization: 68,
    maxLeverage: 10,
    selfLending: false,
    pairingAsset: true,
    session: "always",
    gapPremium: 0,
    realizedVol: 3,
    nextCatalyst: { label: "FOMC decision", date: "2026-09-16", kind: "macro" },
    holders: 1980,
    burned: 12_140,
    blurb:
      "Base rate plus wrap flow. The underlying already yields, so CBR growth stacks directly on top of coupon accrual.",
  },
  {
    slug: "pxau",
    ticker: "pXAU",
    name: "Tokenized Gold Pod",
    underlying: "XAUx",
    underlyingName: "Tokenized Gold",
    category: "commodity",
    chain: "robinhood",
    paired: "USDG",
    vfApy: 7.4,
    lvfApy: 21.6,
    tvl: 5_520_000,
    volume24h: 2_140_000,
    fees24h: 6_400,
    cbr: 1.038,
    cbr30d: 1.1,
    wrapFee: 0.15,
    unwrapFee: 0.3,
    buyFee: 0.25,
    sellFee: 0.35,
    borrowApr: 5.8,
    utilization: 72,
    maxLeverage: 8,
    selfLending: false,
    pairingAsset: false,
    session: "always",
    gapPremium: 0.05,
    realizedVol: 16,
    nextCatalyst: { label: "CPI print", date: "2026-09-11", kind: "macro" },
    holders: 2410,
    burned: 18_020,
    blurb:
      "A twenty-three hour metal against a 24/7 stablecoin. Small, relentless arbitrage that never stops paying.",
  },
  {
    slug: "ppons",
    ticker: "pPONS",
    name: "PONS Governance Pod",
    underlying: "PONS",
    underlyingName: "Pons",
    category: "crypto",
    chain: "robinhood",
    paired: "USDG",
    vfApy: 28.4,
    lvfApy: 76.5,
    tvl: 9_050_000,
    volume24h: 7_820_000,
    fees24h: 29_100,
    cbr: 1.201,
    cbr30d: 4.8,
    wrapFee: 0.25,
    unwrapFee: 0.5,
    buyFee: 0.5,
    sellFee: 0.75,
    borrowApr: 9.9,
    utilization: 93,
    maxLeverage: 5,
    selfLending: true,
    pairingAsset: true,
    session: "always",
    gapPremium: 0,
    realizedVol: 88,
    nextCatalyst: { label: "vlPODS epoch 14", date: "2026-09-04", kind: "unlock" },
    holders: 12_640,
    burned: 402_310,
    blurb:
      "The reflexive core. Protocol revenue buys PONS, the pod burns pPONS, CBR climbs for everyone still wrapped.",
  },
  {
    slug: "ptsla",
    ticker: "pTSLA",
    name: "Tesla Volatility Pod",
    underlying: "TSLAx",
    underlyingName: "Tesla Stock Token",
    category: "equity",
    chain: "robinhood",
    paired: "USDG",
    vfApy: 25.7,
    lvfApy: 71.2,
    tvl: 6_880_000,
    volume24h: 8_240_000,
    fees24h: 24_600,
    cbr: 1.128,
    cbr30d: 3.4,
    wrapFee: 0.25,
    unwrapFee: 0.5,
    buyFee: 0.5,
    sellFee: 0.7,
    borrowApr: 8.6,
    utilization: 90,
    maxLeverage: 5,
    selfLending: true,
    pairingAsset: false,
    session: "closed",
    gapPremium: 0.3,
    realizedVol: 62,
    nextCatalyst: { label: "Delivery numbers", date: "2026-10-02", kind: "earnings" },
    holders: 7440,
    burned: 61_330,
    blurb:
      "Deliveries, robotaxi headlines and a permanently opinionated shareholder base. Structurally elevated realized volatility.",
  },
  {
    slug: "psemi",
    ticker: "pSEMI",
    name: "Semiconductor Index Pod",
    underlying: "SEMI5",
    underlyingName: "Ponspods Semis Basket",
    category: "index",
    chain: "robinhood",
    paired: "USDG",
    vfApy: 16.9,
    lvfApy: 44.1,
    tvl: 4_910_000,
    volume24h: 3_120_000,
    fees24h: 10_400,
    cbr: 1.083,
    cbr30d: 2.2,
    wrapFee: 0.2,
    unwrapFee: 0.4,
    buyFee: 0.4,
    sellFee: 0.5,
    borrowApr: 7.4,
    utilization: 84,
    maxLeverage: 6,
    selfLending: true,
    pairingAsset: false,
    session: "closed",
    gapPremium: 0.22,
    realizedVol: 44,
    nextCatalyst: { label: "TSM monthly sales", date: "2026-09-10", kind: "macro" },
    holders: 3060,
    burned: 22_880,
    constituents: [
      { symbol: "NVDAx", weight: 30 },
      { symbol: "AMDx", weight: 22 },
      { symbol: "TSMx", weight: 20 },
      { symbol: "AVGOx", weight: 16 },
      { symbol: "MUx", weight: 12 },
    ],
    blurb:
      "The dispersion trade, tokenized. Constituents move against each other all day and the basket harvests every rebalance.",
  },
];

export function getPod(slug: string) {
  return PODS.find((p) => p.slug === slug);
}

export const PROTOCOL_STATS = {
  tvl: 101_660_000,
  pods: 143,
  fees: 18_420_000,
  yield: 11_940_000,
  burned: 1_173_240,
  burnedTokens: 862_419,
  lenders: 4_812,
  positions: 9_337,
};

export type Market = {
  asset: string;
  name: string;
  supplied: number;
  borrowed: number;
  supplyApy: number;
  borrowApr: number;
  utilization: number;
  chain: Chain;
  kind: "metavault" | "isolated";
  strategyFor?: string;
  allocations?: { pod: string; share: number }[];
};

export const MARKETS: Market[] = [
  {
    asset: "USDG",
    name: "USDG Prime Metavault",
    supplied: 42_800_000,
    borrowed: 38_100_000,
    supplyApy: 9.2,
    borrowApr: 10.4,
    utilization: 89,
    chain: "robinhood",
    kind: "metavault",
    allocations: [
      { pod: "pNVDA", share: 26 },
      { pod: "pMAG7", share: 21 },
      { pod: "pGME", share: 17 },
      { pod: "pTSLA", share: 14 },
      { pod: "pHOOD", share: 12 },
      { pod: "pSEMI", share: 10 },
    ],
  },
  {
    asset: "USDG",
    name: "Memestock High-Beta Metavault",
    supplied: 9_640_000,
    borrowed: 9_310_000,
    supplyApy: 17.8,
    borrowApr: 19.6,
    utilization: 97,
    chain: "robinhood",
    kind: "metavault",
    allocations: [
      { pod: "pMEME", share: 44 },
      { pod: "pGME", share: 33 },
      { pod: "pSPACEX", share: 23 },
    ],
  },
  {
    asset: "USDG",
    name: "Treasury Conservative Metavault",
    supplied: 21_200_000,
    borrowed: 13_800_000,
    supplyApy: 6.1,
    borrowApr: 8.2,
    utilization: 65,
    chain: "robinhood",
    kind: "metavault",
    allocations: [
      { pod: "pTBILL", share: 52 },
      { pod: "pAAPL", share: 26 },
      { pod: "pXAU", share: 22 },
    ],
  },
  {
    asset: "USDG",
    name: "pGME isolated market",
    supplied: 3_940_000,
    borrowed: 3_700_000,
    supplyApy: 12.8,
    borrowApr: 14.1,
    utilization: 94,
    chain: "robinhood",
    kind: "isolated",
    strategyFor: "pGME",
  },
  {
    asset: "USDG",
    name: "pNVDA isolated market",
    supplied: 8_120_000,
    borrowed: 7_140_000,
    supplyApy: 7.1,
    borrowApr: 8.4,
    utilization: 88,
    chain: "robinhood",
    kind: "isolated",
    strategyFor: "pNVDA",
  },
  {
    asset: "USDG",
    name: "pSPACEX isolated market",
    supplied: 2_180_000,
    borrowed: 2_110_000,
    supplyApy: 14.4,
    borrowApr: 16.0,
    utilization: 97,
    chain: "robinhood",
    kind: "isolated",
    strategyFor: "pSPACEX",
  },
  {
    asset: "USDG",
    name: "pMEME isolated market",
    supplied: 1_620_000,
    borrowed: 1_600_000,
    supplyApy: 18.9,
    borrowApr: 20.4,
    utilization: 99,
    chain: "robinhood",
    kind: "isolated",
    strategyFor: "pMEME",
  },
  {
    asset: "PONS",
    name: "pPONS isolated market",
    supplied: 4_460_000,
    borrowed: 4_140_000,
    supplyApy: 9.6,
    borrowApr: 11.1,
    utilization: 93,
    chain: "robinhood",
    kind: "isolated",
    strategyFor: "pPONS",
  },
];

export type CalendarEvent = {
  date: string;
  day: string;
  label: string;
  pods: string[];
  kind: "earnings" | "macro" | "expiry" | "rebalance" | "close";
  expectedVolLift: number;
};

export const CALENDAR: CalendarEvent[] = [
  {
    date: "Aug 27",
    day: "Thu",
    label: "Nvidia Q3 FY27 earnings",
    pods: ["pNVDA", "pSEMI", "pMAG7"],
    kind: "earnings",
    expectedVolLift: 240,
  },
  {
    date: "Aug 29",
    day: "Sat",
    label: "Weekend close, gap window opens",
    pods: ["all equity pods"],
    kind: "close",
    expectedVolLift: 65,
  },
  {
    date: "Sep 02",
    day: "Wed",
    label: "Robinhood Markets Q2 earnings",
    pods: ["pHOOD", "pMEME"],
    kind: "earnings",
    expectedVolLift: 180,
  },
  {
    date: "Sep 09",
    day: "Wed",
    label: "GameStop Q3 earnings",
    pods: ["pGME", "pMEME"],
    kind: "earnings",
    expectedVolLift: 320,
  },
  {
    date: "Sep 11",
    day: "Fri",
    label: "US CPI print",
    pods: ["pXAU", "pTBILL", "pMAG7"],
    kind: "macro",
    expectedVolLift: 90,
  },
  {
    date: "Sep 16",
    day: "Wed",
    label: "FOMC rate decision",
    pods: ["all pods"],
    kind: "macro",
    expectedVolLift: 140,
  },
  {
    date: "Sep 18",
    day: "Fri",
    label: "Monthly options expiry",
    pods: ["pMEME", "pGME", "pTSLA"],
    kind: "expiry",
    expectedVolLift: 210,
  },
  {
    date: "Sep 19",
    day: "Sat",
    label: "Index quarterly rebalance",
    pods: ["pMAG7", "pSEMI"],
    kind: "rebalance",
    expectedVolLift: 160,
  },
];

export type Position = {
  pod: string;
  ticker: string;
  kind: "wrapped" | "lvf" | "lend";
  size: number;
  pnl: number;
  pnlPct: number;
  apy: number;
  leverage?: number;
  health?: number;
  liqDistance?: number;
};

export const POSITIONS: Position[] = [
  {
    pod: "pnvda",
    ticker: "pNVDA",
    kind: "lvf",
    size: 24_800,
    pnl: 3_140,
    pnlPct: 14.5,
    apy: 52.3,
    leverage: 3.4,
    health: 1.18,
    liqDistance: 28,
  },
  {
    pod: "pgme",
    ticker: "pGME",
    kind: "lvf",
    size: 11_200,
    pnl: 2_960,
    pnlPct: 35.9,
    apy: 118.4,
    leverage: 4.1,
    health: 1.10,
    liqDistance: 18,
  },
  { pod: "pmag7", ticker: "pMAG7", kind: "wrapped", size: 42_600, pnl: 1_810, pnlPct: 4.4, apy: 12.4 },
  { pod: "ptbill", ticker: "pTBILL", kind: "wrapped", size: 60_000, pnl: 640, pnlPct: 1.1, apy: 2.1 },
  {
    pod: "usdg-prime",
    ticker: "USDG Prime",
    kind: "lend",
    size: 85_000,
    pnl: 3_920,
    pnlPct: 4.8,
    apy: 9.2,
  },
];

export const FAQ = [
  {
    q: "Where does the yield come from if there are no emissions?",
    a: "From fees, and only fees. Every wrap, unwrap, buy and sell inside a pod pays the pod. Tokenized equities are arbitraged against a real reference price all day long, so that flow is not speculative — it is the mechanical consequence of the underlying market moving. Ponspods sits on the other side of it.",
  },
  {
    q: "Why are real-world assets better collateral for this than crypto?",
    a: "Three reasons. They mean-revert to a published NAV, so the arbitrage always closes. Their volatility is scheduled — earnings, CPI, FOMC, opex — so yield is forecastable instead of random. And many of them already carry native yield, coupons or dividend equivalents, that accrues to the pod reserve on top of fee income.",
  },
  {
    q: "What is CBR and why does it only go up?",
    a: "Collateral Backing Ratio is the amount of underlying held by the pod divided by the pTKN supply. Part of every fee burns pTKN while the reserve stays intact, so the ratio ratchets upward. Holding a pod token is holding a claim that grows against itself.",
  },
  {
    q: "What happens when the stock market is closed?",
    a: "That is the best part of the week. The token keeps trading while the reference price is frozen, the pool drifts, and the Monday open triggers a large corrective arbitrage. Ponspods widens the AMM fee during closed sessions — the gap premium — so LPs are paid for carrying stale-price risk instead of being picked off by it.",
  },
  {
    q: "Is an LVF position leveraged exposure to the stock?",
    a: "No. It is leveraged exposure to the fee flow of a pod, not a directional bet. You deposit one side, the protocol borrows the other, and the pair sits in a full-range LP. You keep exposure to the underlying and to CBR growth, and you take liquidation risk if the pod token falls far enough.",
  },
  {
    q: "Who can create a pod?",
    a: "Anyone. Pods are permissionless and immutable once deployed — pick a tokenized asset or a basket, set the fee schedule and the revenue split, ship it. Self-lending bootstraps the borrow market in the same transaction, so a new pod needs no outside liquidity to start.",
  },
];
