import { describe, expect, it } from "vitest";
import { calculateSip, sipFutureValue } from "./sip";

describe("sipFutureValue", () => {
  it("matches the standard SIP result for ₹5,000 / 15 years / 12%", () => {
    const fv = sipFutureValue(5000, 180, 12);
    expect(Math.round(fv)).toBe(2522880);
  });

  it("earns one month of growth on a single instalment", () => {
    // ₹1,000 at the start of a month, 12% a year = 1% for that month
    expect(sipFutureValue(1000, 1, 12)).toBeCloseTo(1010, 6);
  });

  it("returns exactly the invested amount when the rate is 0%", () => {
    expect(sipFutureValue(5000, 120, 0)).toBe(600000);
  });

  it("returns 0 for zero or negative inputs", () => {
    expect(sipFutureValue(0, 120, 12)).toBe(0);
    expect(sipFutureValue(5000, 0, 12)).toBe(0);
    expect(sipFutureValue(-5000, 120, 12)).toBe(0);
  });

  it("grows when the term grows", () => {
    const short = sipFutureValue(5000, 60, 12);
    const long = sipFutureValue(5000, 120, 12);
    expect(long).toBeGreaterThan(short * 2); // compounding, not just doubling
  });

  it("handles a negative return without breaking", () => {
    const fv = sipFutureValue(5000, 12, -6);
    expect(fv).toBeLessThan(60000);
    expect(Number.isFinite(fv)).toBe(true);
  });

  it("stays finite for a very long horizon", () => {
    expect(Number.isFinite(sipFutureValue(5000, 600, 12))).toBe(true);
  });
});

describe("calculateSip", () => {
  const result = calculateSip({
    monthlyInvestment: 5000,
    years: 15,
    annualReturnPercent: 12,
  });

  it("reports the amount actually invested", () => {
    expect(result.invested).toBe(900000);
  });

  it("splits value into invested plus growth", () => {
    expect(result.invested + result.growth).toBeCloseTo(result.futureValue, 6);
  });

  it("returns one row per year", () => {
    expect(result.yearly).toHaveLength(15);
    expect(result.yearly[14].year).toBe(15);
  });

  it("ends the yearly table at the final value", () => {
    expect(result.yearly[14].value).toBeCloseTo(result.futureValue, 6);
  });

  it("never lets value fall below invested at a positive rate", () => {
    for (const row of result.yearly) {
      expect(row.value).toBeGreaterThanOrEqual(row.invested);
    }
  });
});
