/**
 * SIP (Systematic Investment Plan) future value.
 *
 * FORMULA
 * -------
 *   FV = P × [ ((1 + i)^n − 1) / i ] × (1 + i)
 *
 *   P = amount invested each month
 *   i = monthly rate  = annualRatePercent / 100 / 12
 *   n = number of months = years × 12
 *
 * ASSUMPTIONS — state these to the user, never hide them
 * -----------------------------------------------------
 * 1. The instalment is paid at the START of each month, so each one earns a
 *    full month of growth. That is the trailing × (1 + i) term. This matches
 *    how most Indian SIP calculators work.
 * 2. Returns are assumed to be steady and identical every month. Real markets
 *    are not steady — this is the single biggest simplification here.
 * 3. The instalment never changes. No step-up, no missed months.
 * 4. Growth is compounded monthly.
 * 5. Ignores exit load, expense ratio, and tax on capital gains. Real returns
 *    will be lower.
 *
 * This is an educational estimate, not a projection of what you will receive.
 */

export type SipInput = {
  monthlyInvestment: number;
  years: number;
  annualReturnPercent: number;
};

export type SipYearRow = {
  year: number;
  invested: number;
  value: number;
  growth: number;
};

export type SipResult = {
  invested: number;
  futureValue: number;
  growth: number;
  yearly: SipYearRow[];
};

/** Future value of `months` instalments, contributions at start of month. */
export function sipFutureValue(
  monthlyInvestment: number,
  months: number,
  annualReturnPercent: number,
): number {
  if (monthlyInvestment <= 0 || months <= 0) return 0;

  const i = annualReturnPercent / 100 / 12;

  // A 0% return is a valid input and would divide by zero below.
  if (i === 0) return monthlyInvestment * months;

  return monthlyInvestment * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
}

export function calculateSip({
  monthlyInvestment,
  years,
  annualReturnPercent,
}: SipInput): SipResult {
  const months = Math.round(years * 12);
  const invested = monthlyInvestment * months;
  const futureValue = sipFutureValue(
    monthlyInvestment,
    months,
    annualReturnPercent,
  );

  const yearly: SipYearRow[] = [];
  for (let y = 1; y <= years; y++) {
    const m = y * 12;
    const value = sipFutureValue(monthlyInvestment, m, annualReturnPercent);
    const investedSoFar = monthlyInvestment * m;
    yearly.push({
      year: y,
      invested: investedSoFar,
      value,
      growth: value - investedSoFar,
    });
  }

  return {
    invested,
    futureValue,
    growth: futureValue - invested,
    yearly,
  };
}
