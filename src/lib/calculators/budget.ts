/**
 * Budget split — the three-bucket method from chapter 1.
 *
 * FORMULA
 * -------
 *   left     = takeHome − (fixed + living + free)
 *   share%   = bucket ÷ takeHome × 100
 *
 * There is no interest or growth here. It is arithmetic on one month, and
 * its only job is to show the gap between what people think they save and
 * what is actually left.
 *
 * ASSUMPTIONS — state these to the user, never hide them
 * -----------------------------------------------------
 * 1. One ordinary month. A month with a wedding or a flight is not typical.
 * 2. Take-home pay, after tax and deductions — not CTC.
 * 3. Money "left" is not the same as money saved. It is only saved once it
 *    leaves the account, which is why the chapter argues for paying yourself
 *    first.
 *
 * Guidance percentages are a common rule of thumb, not a regulation.
 */

export type BudgetInput = {
  takeHome: number;
  fixed: number;
  living: number;
  free: number;
};

export type BudgetBucket = {
  name: string;
  amount: number;
  percent: number;
  /** A loose guideline for this bucket, used only to explain the number. */
  guide: string;
};

export type BudgetResult = {
  spent: number;
  left: number;
  leftPercent: number;
  /** True when spending exceeds income — worth saying plainly. */
  overspent: boolean;
  buckets: BudgetBucket[];
};

function share(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return (part / whole) * 100;
}

export function calculateBudget({
  takeHome,
  fixed,
  living,
  free,
}: BudgetInput): BudgetResult {
  const spent = fixed + living + free;
  const left = takeHome - spent;

  return {
    spent,
    left,
    leftPercent: share(left, takeHome),
    overspent: left < 0,
    buckets: [
      {
        name: "Fixed",
        amount: fixed,
        percent: share(fixed, takeHome),
        guide: "Rent, EMIs, premiums. Hard to change this month.",
      },
      {
        name: "Living",
        amount: living,
        percent: share(living, takeHome),
        guide: "Groceries, bills, transport. Changes slowly, with effort.",
      },
      {
        name: "Free",
        amount: free,
        percent: share(free, takeHome),
        guide: "Eating out, shopping, subscriptions. Changes this month.",
      },
    ],
  };
}
