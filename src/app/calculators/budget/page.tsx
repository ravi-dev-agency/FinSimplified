import Link from "next/link";
import type { Metadata } from "next";
import BudgetCalculator from "@/components/calculators/BudgetCalculator";

export const metadata: Metadata = {
  title: "Budget calculator — FinSimplified",
  description:
    "Split one month of take-home pay into three buckets and see what is actually left. The formula and every assumption are shown.",
};

export default function BudgetPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-8 md:px-6">
      <h1 className="text-[26px] md:text-[30px]">Budget calculator</h1>
      <p className="mt-2 text-subtle">
        Three buckets, one month. The number at the end is usually smaller than
        people expect.
      </p>

      <div className="mt-7">
        <BudgetCalculator />
      </div>

      <div className="chapter mt-10 border-t border-rule pt-2">
        <h2>Why three buckets?</h2>
        <p>
          Because they answer different questions. Fixed costs cannot change
          this month, whatever you decide. Living costs change slowly and with
          effort. The free bucket can change today — which makes it the only
          one worth arguing about when money is tight.
        </p>

        <h2>The formula</h2>
        <p className="num">left = take-home − (fixed + living + free)</p>
        <p>
          There is no interest or growth here. It is arithmetic on a single
          month, and its only job is to show the gap between what you think you
          save and what is actually left.
        </p>

        <h2>What this does not include</h2>
        <ul>
          <li>
            One month is a sample, not a pattern. A month with a wedding or a
            flight in it is not typical, and neither is an unusually quiet one.
          </li>
          <li>
            Annual costs — insurance premiums, festival spending, school fees —
            do not appear unless you divide them by twelve and add them in.
          </li>
          <li>
            Money left is not money saved. It is only saved once it leaves the
            account, which is why the chapter argues for moving it out on
            payday.
          </li>
        </ul>
      </div>

      <p className="mt-8 border-t border-rule pt-4 text-[0.85rem] leading-relaxed text-muted">
        For education only. Not financial advice.
      </p>

      <p className="mt-4 text-[0.95rem]">
        New to this? Read{" "}
        <Link href="/learn/budgeting">chapter 1, on where your salary goes</Link>
        .
      </p>
    </div>
  );
}
