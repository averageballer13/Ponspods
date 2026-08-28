/**
 * Protocol constants and the maths that follows from them.
 *
 * Nothing here is market data. These are design parameters and the formulas
 * they imply, so the calculators in the dApp give real answers even though the
 * protocol is not live and every metric reads as pending.
 */

/** A full-range LP is self-collateralising; the floor sits at 5/6. */
export const MAX_LTV = 0.8333;

/** L_max = 1 / (1 - MAX_LTV). */
export const MAX_LEVERAGE = 6;

/** Every pod mints its first pTKN one-for-one. CBR only climbs from there. */
export const LAUNCH_CBR = 1;

export type LeverageMath = {
  position: number;
  debt: number;
  ltv: number;
  health: number;
  /** Fraction the pod token can fall before the position is liquidated. */
  liquidationDrop: number;
};

export function leverageMath(deposit: number, leverage: number): LeverageMath {
  const position = deposit * leverage;
  const debt = deposit * (leverage - 1);
  const ltv = leverage > 1 ? (leverage - 1) / leverage : 0;
  const health = ltv > 0 ? MAX_LTV / ltv : Infinity;
  // Full-range LP value scales with the square root of price, so a drop of x
  // scales collateral by sqrt(1 - x).
  const liquidationDrop = ltv > 0 ? Math.max(0, 1 - Math.pow(ltv / MAX_LTV, 2)) : 1;
  return { position, debt, ltv, health, liquidationDrop };
}

/** TKN in, pTKN out. */
export function wrapOutput(amount: number, wrapFee: number, cbr = LAUNCH_CBR) {
  return (amount * (1 - wrapFee)) / cbr;
}

/** pTKN in, TKN out. */
export function unwrapOutput(amount: number, unwrapFee: number, cbr = LAUNCH_CBR) {
  return amount * cbr * (1 - unwrapFee);
}

export function formatAmount(n: number, decimals = 4) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
