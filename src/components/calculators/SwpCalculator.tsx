"use client";

import { useMemo, useState } from "react";
import { calculateSwp } from "@/lib/calculators/swp";
import { formatRupees } from "@/lib/format";
import Field from "./Field";

export default function SwpCalculator() {
  const [corpus, setCorpus] = useState(5000000);
  const [withdrawal, setWithdrawal] = useState(40000);
  const [rate, setRate] = useState(8);

  const result = useMemo(
    () =>
      calculateSwp({
        corpus,
        monthlyWithdrawal: withdrawal,
        annualReturnPercent: rate,
      }),
    [corpus, withdrawal, rate],
  );

  const lasts = result.lastsForever
    ? "Indefinitely"
    : result.remainingMonths === 0
      ? `${result.years} years`
      : `${result.years} years, ${result.remainingMonths} months`;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <Field
          label="My corpus"
          value={corpus}
          display={formatRupees(corpus)}
          prefix="₹"
          min={100000}
          max={30000000}
          step={50000}
          onChange={setCorpus}
        />
        <Field
          label="I withdraw every month"
          value={withdrawal}
          display={formatRupees(withdrawal)}
          prefix="₹"
          min={1000}
          max={300000}
          step={1000}
          onChange={setWithdrawal}
        />
        <Field
          label="Assuming this return a year"
          value={rate}
          display={`${rate}%`}
          suffix="%"
          min={0}
          max={15}
          step={0.5}
          onChange={setRate}
        />
        <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">
          Set the return lower than you hope. A withdrawal plan is far more
          sensitive to a bad first few years than a growing investment is, and
          this calculator assumes a steady return it cannot promise.
        </p>
      </div>

      <div>
        <p className="text-[0.95rem] text-subtle">Your money lasts</p>
        <p className="num text-[34px] leading-tight font-semibold text-ink">
          {lasts}
        </p>

        {result.lastsForever ? (
          <>
            <p className="mt-1 text-[0.9rem] text-muted">
              Your withdrawal is smaller than the growth, so the balance never
              falls — and keeps rising.
            </p>
            <table className="mt-4 w-full border-collapse text-[0.94rem]">
              <tbody>
                <tr>
                  <td className="border border-rule px-2.5 py-1.5">
                    Corpus earns each month
                  </td>
                  <td className="num border border-rule px-2.5 py-1.5 text-right">
                    {formatRupees(result.monthlyGrowth)}
                  </td>
                </tr>
                <tr className="bg-stripe">
                  <td className="border border-rule px-2.5 py-1.5">
                    You take out
                  </td>
                  <td className="num border border-rule px-2.5 py-1.5 text-right">
                    {formatRupees(withdrawal)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-rule px-2.5 py-1.5 font-semibold text-ink">
                    Left to compound
                  </td>
                  <td className="num border border-rule px-2.5 py-1.5 text-right font-semibold text-ink">
                    {formatRupees(result.monthlyGrowth - withdrawal)}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 text-[0.95rem] leading-relaxed">
              You could withdraw up to{" "}
              <strong className="num text-ink">
                {formatRupees(result.sustainableWithdrawal)}
              </strong>{" "}
              a month before the corpus starts shrinking.
            </p>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">
              This assumes a steady {rate}% every year, which no investment
              delivers. A few bad years early on would break it, so treat this
              as a ceiling rather than a plan.
            </p>
          </>
        ) : (
          <table className="mt-4 w-full border-collapse text-[0.94rem]">
            <tbody>
              <tr>
                <td className="border border-rule px-2.5 py-1.5">
                  Total withdrawn
                </td>
                <td className="num border border-rule px-2.5 py-1.5 text-right">
                  {formatRupees(result.totalWithdrawn)}
                </td>
              </tr>
              <tr className="bg-stripe">
                <td className="border border-rule px-2.5 py-1.5">
                  You started with
                </td>
                <td className="num border border-rule px-2.5 py-1.5 text-right">
                  {formatRupees(corpus)}
                </td>
              </tr>
              <tr>
                <td className="border border-rule px-2.5 py-1.5 font-semibold text-ink">
                  Growth paid for
                </td>
                <td className="num border border-rule px-2.5 py-1.5 text-right font-semibold text-ink">
                  {formatRupees(Math.max(0, result.totalWithdrawn - corpus))}
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {result.yearly.length > 0 && (
          <table className="mt-5 w-full border-collapse text-[0.9rem]">
            <caption className="mb-1 text-left text-[0.85rem] text-muted">
              Table 1 — balance at the end of every third year
            </caption>
            <thead>
              <tr>
                <th className="border border-rule bg-stripe px-2.5 py-1.5 text-left">
                  Year
                </th>
                <th className="border border-rule bg-stripe px-2.5 py-1.5 text-right">
                  Withdrawn
                </th>
                <th className="border border-rule bg-stripe px-2.5 py-1.5 text-right">
                  Left
                </th>
              </tr>
            </thead>
            <tbody>
              {result.yearly
                .filter(
                  (row, i) =>
                    row.year % 3 === 0 || i === result.yearly.length - 1,
                )
                .map((row) => (
                  <tr key={row.year} className="even:bg-[#fafafa]">
                    <td className="num border border-rule px-2.5 py-1.5">
                      {row.year}
                    </td>
                    <td className="num border border-rule px-2.5 py-1.5 text-right">
                      {formatRupees(row.withdrawn)}
                    </td>
                    <td className="num border border-rule px-2.5 py-1.5 text-right">
                      {formatRupees(row.balance)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
