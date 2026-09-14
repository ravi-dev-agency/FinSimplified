/**
 * Emergency fund target — chapter 2.
 *
 * FORMULA
 * -------
 *   target        = monthlyEssentials × months
 *   stillNeeded   = max(0, target − alreadySaved)
 *   monthsToGo    = ceil(stillNeeded ÷ monthlySaving)
 *   coverNow      = alreadySaved ÷ monthlyEssentials
 *
 * ASSUMPTIONS — state these to the user, never hide them
 * -----------------------------------------------------
 * 1. Essentials means what you cannot skip in a bad month — rent, food,
 *    EMIs, premiums, transport. Not your whole salary. Using salary produces
 *    a number so large people give up.
 * 2. The fund earns nothing here. A savings account roughly matches or
 *    trails inflation, so ignoring growth keeps the estimate honest.
 * 3. Progress assumes you save the same amount every month without dipping
 *    into it.
 *
 * How many months to keep is a judgement, not a formula. The guidance below
 * is the common range, and the chapter explains when to sit at each end.
 */

export type EmergencyFundInput = {
  monthlyEssentials: number;
  months: number;
  alreadySaved: number;
  monthlySaving: number;
};

export type EmergencyFundMilestone = {
  months: number;
  saved: number;
  covers: number;
};

export type EmergencyFundResult = {
  target: number;
  stillNeeded: number;
  /** Months of essentials the current balance already covers. */
  coverNow: number;
  /** Null when nothing more is needed, or when saving nothing each month. */
  monthsToGo: number | null;
  done: boolean;
  milestones: EmergencyFundMilestone[];
};

export function calculateEmergencyFund({
  monthlyEssentials,
  months,
  alreadySaved,
  monthlySaving,
}: EmergencyFundInput): EmergencyFundResult {
  const target = Math.max(0, monthlyEssentials * months);
  const stillNeeded = Math.max(0, target - alreadySaved);
  const done = stillNeeded === 0;

  const monthsToGo =
    done || monthlySaving <= 0 ? null : Math.ceil(stillNeeded / monthlySaving);

  // Show the journey in whole months of cover — one month saved is already
  // useful, and seeing that is what stops people giving up early.
  const milestones: EmergencyFundMilestone[] = [];
  if (monthlyEssentials > 0) {
    for (let m = 1; m <= months; m++) {
      const saved = monthlyEssentials * m;
      milestones.push({ months: m, saved, covers: m });
    }
  }

  return {
    target,
    stillNeeded,
    coverNow: monthlyEssentials > 0 ? alreadySaved / monthlyEssentials : 0,
    monthsToGo,
    done,
    milestones,
  };
}
