import Link from "next/link";
import type { Metadata } from "next";
import SwpCalculator from "@/components/calculators/SwpCalculator";

export const metadata: Metadata = {
  title: "SWP calculator",
  description:
    "See how long a corpus lasts when you withdraw a fixed amount every month. The formula and every assumption are shown.",
};

export default function SwpPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-8 md:px-6">
      <h1 className="text-[26px] md:text-[30px]">SWP calculator</h1>
      <p className="mt-2 text-subtle">
        A systematic withdrawal plan takes a fixed amount out every month. This
        shows how long the money holds.
      </p>

      <div className="mt-7">
        <SwpCalculator />
      </div>

      <div className="chapter mt-10 border-t border-rule pt-2">
        <h2>Why it can last indefinitely</h2>
        <p>
          If the growth each month is at least as large as the withdrawal, the
          balance never falls. Taking 6% a year out of something growing 10% a
          year is sustainable on paper. The catch is that returns are not
          delivered evenly, and this calculator assumes they are.
        </p>

        <h2>The formula</h2>
        <p className="num">
          balance = balance × (1 + i) − withdrawal, repeated monthly
        </p>
        <p>
          i is the monthly rate, which is the annual rate divided by 12. Growth
          is applied before the withdrawal, because your units stay invested
          until you redeem them.
        </p>

        <h2>What this does not include</h2>
        <ul>
          <li>
            <strong>Sequence of returns.</strong> A fall in the first few years
            does far more damage than the same fall later, because you are
            selling units while they are cheap. A steady average hides this
            entirely.
          </li>
          <li>
            Inflation. A withdrawal that is comfortable today buys noticeably
            less in fifteen years, so a fixed amount quietly shrinks in real
            terms.
          </li>
          <li>
            Exit load, expense ratio and capital gains tax on each redemption.
            Your usable income will be lower than shown.
          </li>
        </ul>
      </div>

      <p className="mt-8 border-t border-rule pt-4 text-[0.85rem] leading-relaxed text-muted">
        For education only. Not investment advice, and not a prediction. Mutual
        fund investments are subject to market risks. Past performance does not
        guarantee future results.
      </p>

      <p className="mt-4 text-[0.95rem]">
        New to this? Read{" "}
        <Link href="/learn/mutual-funds">chapter 7, on mutual funds</Link>.
      </p>
    </div>
  );
}
