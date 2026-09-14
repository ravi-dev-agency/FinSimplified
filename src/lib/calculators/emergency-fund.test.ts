import { describe, expect, it } from "vitest";
import { calculateEmergencyFund } from "./emergency-fund";

// Ramu from chapter 2: ₹32,789 of essentials, aiming at six months.
const ramu = {
  monthlyEssentials: 32789,
  months: 6,
  alreadySaved: 0,
  monthlySaving: 8000,
};

describe("calculateEmergencyFund", () => {
  it("matches Ramu's target from chapter 2", () => {
    const r = calculateEmergencyFund(ramu);
    expect(r.target).toBe(196734);
    expect(r.stillNeeded).toBe(196734);
  });

  it("rounds the months remaining up, because a part month is not enough", () => {
    const r = calculateEmergencyFund(ramu);
    // 196734 / 8000 = 24.59 -> 25 months
    expect(r.monthsToGo).toBe(25);
  });

  it("counts what is already saved as months of cover", () => {
    const r = calculateEmergencyFund({ ...ramu, alreadySaved: 65578 });
    expect(r.coverNow).toBeCloseTo(2, 6);
    expect(r.stillNeeded).toBe(196734 - 65578);
  });

  it("reports done when the target is already met", () => {
    const r = calculateEmergencyFund({ ...ramu, alreadySaved: 200000 });
    expect(r.done).toBe(true);
    expect(r.stillNeeded).toBe(0);
    expect(r.monthsToGo).toBe(null);
  });

  it("never reports a negative shortfall when oversaved", () => {
    const r = calculateEmergencyFund({ ...ramu, alreadySaved: 500000 });
    expect(r.stillNeeded).toBe(0);
  });

  it("returns null months when nothing is being saved each month", () => {
    const r = calculateEmergencyFund({ ...ramu, monthlySaving: 0 });
    expect(r.monthsToGo).toBe(null);
  });

  it("handles zero essentials without dividing by zero", () => {
    const r = calculateEmergencyFund({ ...ramu, monthlyEssentials: 0 });
    expect(r.target).toBe(0);
    expect(r.coverNow).toBe(0);
    expect(r.milestones).toEqual([]);
  });

  it("lists one milestone per month of the target", () => {
    const r = calculateEmergencyFund(ramu);
    expect(r.milestones).toHaveLength(6);
    expect(r.milestones[5].saved).toBe(196734);
  });
});
