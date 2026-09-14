import { describe, expect, it } from "vitest";
import { calculateSwp } from "./swp";

describe("calculateSwp", () => {
  it("with no growth, the corpus simply divides by the withdrawal", () => {
    const r = calculateSwp({
      corpus: 1200000,
      monthlyWithdrawal: 10000,
      annualReturnPercent: 0,
    });
    expect(r.months).toBe(120);
    expect(r.years).toBe(10);
    expect(r.remainingMonths).toBe(0);
  });

  it("growth makes the corpus last longer than the plain division", () => {
    const withGrowth = calculateSwp({
      corpus: 1200000,
      monthlyWithdrawal: 10000,
      annualReturnPercent: 8,
    });
    expect(withGrowth.months).toBeGreaterThan(120);
  });

  it("reports lasting indefinitely when growth covers the withdrawal", () => {
    // ₹1 crore at 12% earns ₹1,00,000 a month; withdrawing ₹50,000 never depletes it.
    const r = calculateSwp({
      corpus: 10000000,
      monthlyWithdrawal: 50000,
      annualReturnPercent: 12,
    });
    expect(r.lastsForever).toBe(true);
    expect(r.months).toBe(Infinity);
  });

  it("treats growth exactly equal to the withdrawal as lasting indefinitely", () => {
    // ₹12,00,000 at 12% earns exactly ₹12,000 in the first month.
    const r = calculateSwp({
      corpus: 1200000,
      monthlyWithdrawal: 12000,
      annualReturnPercent: 12,
    });
    expect(r.lastsForever).toBe(true);
  });

  it("depletes when the withdrawal is a rupee above the growth", () => {
    const r = calculateSwp({
      corpus: 1200000,
      monthlyWithdrawal: 12001,
      annualReturnPercent: 12,
    });
    expect(r.lastsForever).toBe(false);
    expect(r.months).toBeGreaterThan(0);
  });

  it("never withdraws more than the balance holds in the final month", () => {
    const r = calculateSwp({
      corpus: 25000,
      monthlyWithdrawal: 10000,
      annualReturnPercent: 0,
    });
    expect(r.months).toBe(3);
    expect(r.totalWithdrawn).toBeCloseTo(25000, 6);
  });

  it("returns an empty result for zero or negative inputs", () => {
    expect(calculateSwp({ corpus: 0, monthlyWithdrawal: 10000, annualReturnPercent: 8 }).months).toBe(0);
    expect(calculateSwp({ corpus: 100000, monthlyWithdrawal: 0, annualReturnPercent: 8 }).months).toBe(0);
    expect(calculateSwp({ corpus: -5, monthlyWithdrawal: 10000, annualReturnPercent: 8 }).months).toBe(0);
  });

  it("splits the answer into years and leftover months", () => {
    const r = calculateSwp({
      corpus: 140000,
      monthlyWithdrawal: 10000,
      annualReturnPercent: 0,
    });
    expect(r.months).toBe(14);
    expect(r.years).toBe(1);
    expect(r.remainingMonths).toBe(2);
  });

  it("reports what the corpus earns in a month", () => {
    const r = calculateSwp({
      corpus: 24400000,
      monthlyWithdrawal: 40000,
      annualReturnPercent: 8,
    });
    // ₹2.44 crore at 8% earns ₹1,62,667 a month, far above the ₹40,000 taken out.
    expect(Math.round(r.monthlyGrowth)).toBe(162667);
    expect(r.lastsForever).toBe(true);
  });

  it("reports the largest withdrawal growth alone can fund", () => {
    const r = calculateSwp({
      corpus: 6000000,
      monthlyWithdrawal: 10000,
      annualReturnPercent: 8,
    });
    expect(Math.round(r.sustainableWithdrawal)).toBe(40000);
  });

  it("gives a monthly growth figure even when the corpus depletes", () => {
    const r = calculateSwp({
      corpus: 1200000,
      monthlyWithdrawal: 20000,
      annualReturnPercent: 6,
    });
    expect(r.lastsForever).toBe(false);
    expect(Math.round(r.monthlyGrowth)).toBe(6000);
  });

  it("records the balance at the end of each completed year", () => {
    const r = calculateSwp({
      corpus: 1200000,
      monthlyWithdrawal: 10000,
      annualReturnPercent: 0,
    });
    expect(r.yearly[0].year).toBe(1);
    expect(r.yearly[0].balance).toBeCloseTo(1080000, 6);
  });
});
