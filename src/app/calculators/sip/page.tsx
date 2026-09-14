import Link from "next/link";
import type { Metadata } from "next";
import SipCalculator from "@/components/calculators/SipCalculator";

export const metadata: Metadata = {
  title: "SIP calculator — FinSimplified",
  description:
    "See what a monthly SIP could grow into, with the formula and every assumption shown. An educational estimate, not a promise of returns.",
};

export default function SipPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-8 md:px-6">
      <h1 className="text-[26px] md:text-[30px]">SIP calculator</h1>
      <p className="mt-2 text-subtle">
        Move the sliders. Everything below is an estimate built on the
        assumptions you choose.
      </p>

      <div className="mt-7">
        <SipCalculator />
      </div>

      <div className="chapter mt-10 border-t border-rule pt-2">
        <h2>Why this number?</h2>
        <p>
          Each monthly instalment is invested and then grows for the rest of the
          period. The instalment you pay in year one has far longer to grow than
          the one you pay in the final year. That is why the total is much
          larger than the sum of what you put in.
        </p>

        <h2>The formula</h2>
        <p className="num">
          FV = P × [ ((1 + i)<sup>n</sup> − 1) ÷ i ] × (1 + i)
        </p>
        <p>
          P is the monthly amount. i is the monthly rate, which is the annual
          rate divided by 12. n is the number of months. The final term assumes
          each instalment is paid at the start of the month.
        </p>

        <h2>What this does not include</h2>
        <ul>
          <li>
            Real returns are not steady. This assumes the same return every
            single month, which never happens.
          </li>
          <li>
            Expense ratio, exit load and capital gains tax are not deducted.
            Your actual result will be lower.
          </li>
          <li>
            Inflation is not applied. ₹25 lakh in 15 years will buy less than
            ₹25 lakh buys today.
          </li>
          <li>It assumes you never miss or change an instalment.</li>
        </ul>
      </div>

      <p className="mt-8 border-t border-rule pt-4 text-[0.85rem] leading-relaxed text-muted">
        For education only. Not investment advice, and not a prediction. Mutual
        fund investments are subject to market risks. Past performance does not
        guarantee future results.
      </p>

      <p className="mt-4 text-[0.95rem]">
        New to this? Read <Link href="/learn/sip">chapter 5, on SIPs</Link>.
      </p>
    </div>
  );
}
