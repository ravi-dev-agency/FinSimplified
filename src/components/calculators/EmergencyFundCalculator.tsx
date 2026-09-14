"use client";

import { useMemo, useState } from "react";
import { calculateEmergencyFund } from "@/lib/calculators/emergency-fund";
import { formatRupees } from "@/lib/format";
import Field from "./Field";

export default function EmergencyFundCalculator() {
  const [essentials, setEssentials] = useState(32789);
  const [months, setMonths] = useState(6);
  const [saved, setSaved] = useState(0);
  const [monthlySaving, setMonthlySaving] = useState(8000);

  const result = useMemo(
    () =>
      calculateEmergencyFund({
        monthlyEssentials: essentials,
        months,
        alreadySaved: saved,
        monthlySaving,
      }),
    [essentials, months, saved, monthlySaving],
  );

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <Field
          label="My essential expenses each month"
          value={essentials}
          display={formatRupees(essentials)}
          prefix="₹"
          min={5000}
          max={200000}
          step={500}
          onChange={setEssentials}
        />
        <Field
          label="Months of cover I want"
          value={months}
          display={`${months} months`}
          suffix="months"
          min={1}
          max={12}
          step={1}
          onChange={setMonths}
        />
        <Field
          label="Already set aside"
          value={saved}
          display={formatRupees(saved)}
          prefix="₹"
          min={0}
          max={1000000}
          step={5000}
          onChange={setSaved}
        />
        <Field
          label="I can save each month"
          value={monthlySaving}
          display={formatRupees(monthlySaving)}
          prefix="₹"
          min={0}
          max={100000}
          step={500}
          onChange={setMonthlySaving}
        />
        <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">
          Essentials means what you cannot skip in a bad month — rent, food,
          EMIs, premiums, transport. Not your whole salary. Using salary gives a
          number so large that most people give up before starting.
        </p>
      </div>

      <div>
        <p className="text-[0.95rem] text-subtle">Your target</p>
        <p className="num text-[34px] leading-tight font-semibold text-ink">
          {formatRupees(result.target)}
        </p>

        <table className="mt-4 w-full border-collapse text-[0.94rem]">
          <tbody>
            <tr>
              <td className="border border-rule px-2.5 py-1.5">
                Already saved
              </td>
              <td className="num border border-rule px-2.5 py-1.5 text-right">
                {formatRupees(saved)}
              </td>
            </tr>
            <tr className="bg-stripe">
              <td className="border border-rule px-2.5 py-1.5">
                That covers you for
              </td>
              <td className="num border border-rule px-2.5 py-1.5 text-right">
                {result.coverNow.toFixed(1)} months
              </td>
            </tr>
            <tr>
              <td className="border border-rule px-2.5 py-1.5 font-semibold text-ink">
                Still needed
              </td>
              <td className="num border border-rule px-2.5 py-1.5 text-right font-semibold text-ink">
                {formatRupees(result.stillNeeded)}
              </td>
            </tr>
          </tbody>
        </table>

        <p className="mt-4 text-[0.95rem]">
          {result.done ? (
            <>You are there. Leave it alone and refill it after any use.</>
          ) : result.monthsToGo === null ? (
            <>
              Set a monthly amount above to see how long this takes. Any amount
              beats none.
            </>
          ) : (
            <>
              At {formatRupees(monthlySaving)} a month, you reach it in{" "}
              <strong className="text-ink">
                {result.monthsToGo} months
              </strong>
              .
            </>
          )}
        </p>

        <table className="mt-5 w-full border-collapse text-[0.9rem]">
          <caption className="mb-1 text-left text-[0.85rem] text-muted">
            Table 1 — what each month of cover is worth
          </caption>
          <thead>
            <tr>
              <th className="border border-rule bg-stripe px-2.5 py-1.5 text-left">
                Months covered
              </th>
              <th className="border border-rule bg-stripe px-2.5 py-1.5 text-right">
                You need
              </th>
            </tr>
          </thead>
          <tbody>
            {result.milestones.map((m) => (
              <tr key={m.months} className="even:bg-[#fafafa]">
                <td className="num border border-rule px-2.5 py-1.5">
                  {m.months}
                </td>
                <td className="num border border-rule px-2.5 py-1.5 text-right">
                  {formatRupees(m.saved)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">
          One month saved already protects you from most small emergencies. The
          fund does its job long before it is finished.
        </p>

        <div className="mt-5 border-t border-rule pt-3 text-[0.92rem] leading-relaxed">
          <p className="font-semibold text-ink">What to do with this</p>
          {result.done ? (
            <p className="mt-1">
              You are there. Keep it in a separate savings account or a liquid
              fund — not the account your salary lands in — and refill it after
              any use.
            </p>
          ) : result.coverNow < 1 ? (
            <p className="mt-1">
              Aim for one month first, not six. One month is the difference
              between a bad week and borrowing, and it is close enough to reach
              that people actually get there.
            </p>
          ) : (
            <p className="mt-1">
              You already cover {result.coverNow.toFixed(1)} months. Keep the
              same amount going out on payday and do not treat this as spare
              money.
            </p>
          )}
          {monthlySaving === 0 && (
            <p className="mt-2">
              Set a monthly amount above, even a small one. ₹2,000 a month
              reaches one month of cover in about{" "}
              {essentials > 0 ? Math.ceil(essentials / 2000) : 0} months.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
