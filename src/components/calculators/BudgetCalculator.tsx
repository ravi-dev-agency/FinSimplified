"use client";

import { useMemo, useState } from "react";
import { calculateBudget } from "@/lib/calculators/budget";
import { formatRupees } from "@/lib/format";
import Field from "./Field";

export default function BudgetCalculator() {
  const [takeHome, setTakeHome] = useState(58000);
  const [fixed, setFixed] = useState(22000);
  const [living, setLiving] = useState(10700);
  const [free, setFree] = useState(18400);

  const result = useMemo(
    () => calculateBudget({ takeHome, fixed, living, free }),
    [takeHome, fixed, living, free],
  );

  const freeShare =
    result.buckets.find((b) => b.name === "Free")?.percent ?? 0;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <Field
          label="I take home each month"
          value={takeHome}
          display={formatRupees(takeHome)}
          prefix="₹"
          min={5000}
          max={300000}
          step={1000}
          onChange={setTakeHome}
        />
        <Field
          label="Fixed — rent, EMIs, premiums"
          value={fixed}
          display={formatRupees(fixed)}
          prefix="₹"
          min={0}
          max={150000}
          step={500}
          onChange={setFixed}
        />
        <Field
          label="Living — groceries, bills, transport"
          value={living}
          display={formatRupees(living)}
          prefix="₹"
          min={0}
          max={100000}
          step={500}
          onChange={setLiving}
        />
        <Field
          label="Free — eating out, shopping, subscriptions"
          value={free}
          display={formatRupees(free)}
          prefix="₹"
          min={0}
          max={100000}
          step={500}
          onChange={setFree}
        />
        <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">
          Use one ordinary month, and take the numbers from your bank and card
          statements rather than memory. The gap between the two is the whole
          point of the exercise.
        </p>
      </div>

      <div>
        <p className="text-[0.95rem] text-subtle">
          {result.overspent ? "You are short by" : "Left at the end of the month"}
        </p>
        <p className="num text-[34px] leading-tight font-semibold text-ink">
          {formatRupees(Math.abs(result.left))}
        </p>
        <p className="mt-1 text-[0.9rem] text-muted">
          {result.overspent
            ? "You are spending more than you earn. The Free bucket is the one that can change this month."
            : `That is ${result.leftPercent.toFixed(0)}% of your take-home.`}
        </p>

        <table className="mt-4 w-full border-collapse text-[0.94rem]">
          <thead>
            <tr>
              <th className="border border-rule bg-stripe px-2.5 py-1.5 text-left">
                Bucket
              </th>
              <th className="border border-rule bg-stripe px-2.5 py-1.5 text-right">
                Amount
              </th>
              <th className="border border-rule bg-stripe px-2.5 py-1.5 text-right">
                Share
              </th>
            </tr>
          </thead>
          <tbody>
            {result.buckets.map((b) => (
              <tr key={b.name} className="even:bg-stripe">
                <td className="border border-rule px-2.5 py-1.5">{b.name}</td>
                <td className="num border border-rule px-2.5 py-1.5 text-right">
                  {formatRupees(b.amount)}
                </td>
                <td className="num border border-rule px-2.5 py-1.5 text-right">
                  {b.percent.toFixed(0)}%
                </td>
              </tr>
            ))}
            <tr>
              <td className="border border-rule px-2.5 py-1.5 font-semibold text-ink">
                Total spent
              </td>
              <td className="num border border-rule px-2.5 py-1.5 text-right font-semibold text-ink">
                {formatRupees(result.spent)}
              </td>
              <td className="num border border-rule px-2.5 py-1.5 text-right font-semibold text-ink">
                {takeHome > 0
                  ? ((result.spent / takeHome) * 100).toFixed(0)
                  : 0}
                %
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-5 border-t border-rule pt-3 text-[0.92rem] leading-relaxed">
          <p className="font-semibold text-ink">What to do with this</p>
          {result.overspent ? (
            <p className="mt-1">
              Spending exceeds income, so something has to change this month.
              The Free bucket is the only one that moves quickly — start there,
              and check no EMI is quietly funding ordinary spending.
            </p>
          ) : result.left <= 0 ? (
            <p className="mt-1">
              Nothing is left over. That is common and fixable, and the Free
              bucket is where the room usually is.
            </p>
          ) : (
            <p className="mt-1">
              Move {formatRupees(Math.round(result.left / 500) * 500)} out on
              payday, before you spend it. Money left at the end of the month
              is not saved — it is only saved once it has left the account.
            </p>
          )}
          {freeShare > 30 && !result.overspent && (
            <p className="mt-2">
              Your Free bucket is {freeShare.toFixed(0)}% of take-home. There
              is no correct number, but this is the bucket that can change
              today if you want the figure above to be larger.
            </p>
          )}
        </div>

        <dl className="mt-5 text-[0.9rem]">
          {result.buckets.map((b) => (
            <div key={b.name} className="border-t border-rule py-2">
              <dt className="font-semibold text-ink">{b.name}</dt>
              <dd className="text-muted">{b.guide}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
