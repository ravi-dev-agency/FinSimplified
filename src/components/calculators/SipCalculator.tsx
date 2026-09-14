"use client";

import { useMemo, useState } from "react";
import { calculateSip } from "@/lib/calculators/sip";
import { formatRupees } from "@/lib/format";
import Field from "./Field";

export default function SipCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(12);

  const result = useMemo(
    () =>
      calculateSip({
        monthlyInvestment: monthly,
        years,
        annualReturnPercent: rate,
      }),
    [monthly, years, rate],
  );

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <Field
          label="I invest every month"
          value={monthly}
          display={formatRupees(monthly)}
          prefix="₹"
          min={500}
          max={100000}
          step={500}
          onChange={setMonthly}
        />
        <Field
          label="For this many years"
          value={years}
          display={`${years} years`}
          suffix="years"
          min={1}
          max={40}
          step={1}
          onChange={setYears}
        />
        <Field
          label="Assuming this return a year"
          value={rate}
          display={`${rate}%`}
          suffix="%"
          min={0}
          max={20}
          step={0.5}
          onChange={setRate}
        />
        <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">
          You choose the return figure. Nobody can tell you what it will
          actually be. Set it lower than you hope, and you will not be
          disappointed.
        </p>
      </div>

      <div>
        <p className="text-[0.95rem] text-subtle">
          After {years} years, this could become
        </p>
        <p className="num text-[34px] leading-tight font-semibold text-ink">
          {formatRupees(result.futureValue)}
        </p>

        <table className="mt-4 w-full border-collapse text-[0.94rem]">
          <tbody>
            <tr>
              <td className="border border-rule px-2.5 py-1.5">You put in</td>
              <td className="num border border-rule px-2.5 py-1.5 text-right">
                {formatRupees(result.invested)}
              </td>
            </tr>
            <tr className="bg-stripe">
              <td className="border border-rule px-2.5 py-1.5">
                Estimated growth
              </td>
              <td className="num border border-rule px-2.5 py-1.5 text-right">
                {formatRupees(result.growth)}
              </td>
            </tr>
            <tr>
              <td className="border border-rule px-2.5 py-1.5 font-semibold text-ink">
                Total
              </td>
              <td className="num border border-rule px-2.5 py-1.5 text-right font-semibold text-ink">
                {formatRupees(result.futureValue)}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="mt-5 w-full border-collapse text-[0.9rem]">
          <caption className="mb-1 text-left text-[0.85rem] text-muted">
            Table 1 — value at the end of every third year
          </caption>
          <thead>
            <tr>
              <th className="border border-rule bg-stripe px-2.5 py-1.5 text-left">
                Year
              </th>
              <th className="border border-rule bg-stripe px-2.5 py-1.5 text-right">
                Invested
              </th>
              <th className="border border-rule bg-stripe px-2.5 py-1.5 text-right">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {result.yearly
              .filter((row) => row.year % 3 === 0 || row.year === years)
              .map((row) => (
                <tr key={row.year} className="even:bg-[#fafafa]">
                  <td className="num border border-rule px-2.5 py-1.5">
                    {row.year}
                  </td>
                  <td className="num border border-rule px-2.5 py-1.5 text-right">
                    {formatRupees(row.invested)}
                  </td>
                  <td className="num border border-rule px-2.5 py-1.5 text-right">
                    {formatRupees(row.value)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
