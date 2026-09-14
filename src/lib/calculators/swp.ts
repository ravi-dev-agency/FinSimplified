/**
 * SWP (Systematic Withdrawal Plan) — how long a corpus lasts.
 *
 * FORMULA
 * -------
 * Month by month, rather than a closed form, because the balance must never
 * be allowed to go negative and the final month is usually partial:
 *
 *   balance = balance × (1 + i) − withdrawal
 *
 *   i = annualReturnPercent / 100 / 12
 *
 * The first month's growth is applied before the first withdrawal, matching
 * how a fund actually behaves — the units stay invested until you redeem.
 *
 * THE CASE PEOPLE MISS
 * --------------------
 * If monthly growth is at least the withdrawal, the corpus never runs out.
 * That is not a trick: withdrawing 6% a year from something growing 10% a
 * year is sustainable. We report this as `lastsForever` rather than looping
 * to some arbitrary limit and calling it an answer.
 *
 * ASSUMPTIONS — state these to the user, never hide them
 * -----------------------------------------------------
 * 1. A steady return every month. Real markets are not steady, and a fall
 *    early in a withdrawal plan does far more damage than the same fall
 *    later — this calculator cannot show that.
 * 2. The withdrawal never changes. In reality inflation pushes it up.
 * 3. No exit load, no expense ratio, no capital gains tax on redemptions.
 * 4. Withdrawals happen at the end of each month.
 */

/** Beyond this the answer is "indefinitely", not a number of months. */
const MAX_MONTHS = 100 * 12;

export type SwpInput = {
  corpus: number;
  monthlyWithdrawal: number;
  annualReturnPercent: number;
};

export type SwpYearRow = {
  year: number;
  withdrawn: number;
  balance: number;
};

export type SwpResult = {
  /** Whole months the corpus supports. */
  months: number;
  years: number;
  remainingMonths: number;
  totalWithdrawn: number;
  /** Withdrawals are covered by growth alone. */
  lastsForever: boolean;
  /** What the corpus earns in the first month, before any withdrawal. */
  monthlyGrowth: number;
  /** The largest monthly withdrawal growth alone can fund. */
  sustainableWithdrawal: number;
  /** Balance at the end of each year, while money remains. */
  yearly: SwpYearRow[];
};

export function calculateSwp({
  corpus,
  monthlyWithdrawal,
  annualReturnPercent,
}: SwpInput): SwpResult {
  const empty: SwpResult = {
    months: 0,
    years: 0,
    remainingMonths: 0,
    totalWithdrawn: 0,
    lastsForever: false,
    monthlyGrowth: 0,
    sustainableWithdrawal: 0,
    yearly: [],
  };

  if (corpus <= 0 || monthlyWithdrawal <= 0) return empty;

  const i = annualReturnPercent / 100 / 12;
  const monthlyGrowth = corpus * i;

  // Growth covers the withdrawal, so the balance never falls.
  if (monthlyGrowth >= monthlyWithdrawal) {
    return {
      months: Infinity,
      years: Infinity,
      remainingMonths: 0,
      totalWithdrawn: Infinity,
      lastsForever: true,
      monthlyGrowth,
      sustainableWithdrawal: monthlyGrowth,
      yearly: [],
    };
  }

  let balance = corpus;
  let months = 0;
  let totalWithdrawn = 0;
  const yearly: SwpYearRow[] = [];

  while (balance > 0 && months < MAX_MONTHS) {
    balance = balance * (1 + i);
    const taken = Math.min(monthlyWithdrawal, balance);
    balance -= taken;
    totalWithdrawn += taken;
    months++;

    if (months % 12 === 0) {
      yearly.push({
        year: months / 12,
        withdrawn: totalWithdrawn,
        balance,
      });
    }
  }

  return {
    months,
    years: Math.floor(months / 12),
    remainingMonths: months % 12,
    totalWithdrawn,
    lastsForever: false,
    monthlyGrowth,
    sustainableWithdrawal: monthlyGrowth,
    yearly,
  };
}
