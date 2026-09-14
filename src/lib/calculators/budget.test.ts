import { describe, expect, it } from "vitest";
import { calculateBudget } from "./budget";

// Ramu's month from chapter 1, grouped into the three buckets.
const ramu = { takeHome: 58000, fixed: 22050, living: 10739, free: 18407 };

describe("calculateBudget", () => {
  it("matches Ramu's month from chapter 1", () => {
    const r = calculateBudget(ramu);
    expect(r.spent).toBe(51196);
    expect(r.left).toBe(6804);
    expect(r.overspent).toBe(false);
  });

  it("gives each bucket its share of take-home", () => {
    const r = calculateBudget(ramu);
    const free = r.buckets.find((b) => b.name === "Free");
    expect(free?.percent).toBeCloseTo((18407 / 58000) * 100, 6);
  });

  it("bucket percentages plus what is left account for everything", () => {
    const r = calculateBudget(ramu);
    const total = r.buckets.reduce((a, b) => a + b.percent, 0) + r.leftPercent;
    expect(total).toBeCloseTo(100, 6);
  });

  it("flags overspending rather than hiding a negative", () => {
    const r = calculateBudget({
      takeHome: 30000,
      fixed: 20000,
      living: 9000,
      free: 6000,
    });
    expect(r.left).toBe(-5000);
    expect(r.overspent).toBe(true);
  });

  it("handles a zero income without dividing by zero", () => {
    const r = calculateBudget({
      takeHome: 0,
      fixed: 0,
      living: 0,
      free: 0,
    });
    expect(r.leftPercent).toBe(0);
    expect(r.buckets.every((b) => b.percent === 0)).toBe(true);
  });

  it("treats spending everything as nothing left", () => {
    const r = calculateBudget({
      takeHome: 40000,
      fixed: 20000,
      living: 12000,
      free: 8000,
    });
    expect(r.left).toBe(0);
    expect(r.overspent).toBe(false);
  });
});
