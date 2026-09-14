import Link from "next/link";
import type { Metadata } from "next";
import EmergencyFundCalculator from "@/components/calculators/EmergencyFundCalculator";

export const metadata: Metadata = {
  title: "Emergency fund calculator",
  description:
    "Work out how much to keep aside for a bad month, and how long it takes to get there. The formula and every assumption are shown.",
};

export default function EmergencyFundPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-8 md:px-6">
      <h1 className="text-[26px] md:text-[30px]">Emergency fund calculator</h1>
      <p className="mt-2 text-subtle">
        How much you need for a bad month, and how long it takes to save it.
      </p>

      <div className="mt-7">
        <EmergencyFundCalculator />
      </div>

      <div className="chapter mt-10 border-t border-rule pt-2">
        <h2>Essentials, not salary</h2>
        <p>
          Many people are told to keep six months of salary. That is the wrong
          number and it frightens beginners away. You need six months of the
          things you cannot skip — rent, food, EMIs, premiums, transport. The
          eating out and the shopping stop on their own in a real problem.
        </p>

        <h2>The formula</h2>
        <p className="num">target = monthly essentials × months of cover</p>
        <p className="num">
          months to go = (target − already saved) ÷ monthly saving
        </p>
        <p>
          The months remaining are rounded up, because a part month of saving
          does not get you there.
        </p>

        <h2>What this does not include</h2>
        <ul>
          <li>
            No growth is assumed. The money belongs somewhere safe and
            reachable, where it roughly keeps pace with inflation at best.
          </li>
          <li>
            It assumes you save the same amount every month and never dip into
            the fund while building it.
          </li>
          <li>
            How many months to keep is a judgement, not a formula. One earner
            supporting a family needs more than two earners with no
            dependants.
          </li>
        </ul>
      </div>

      <p className="mt-8 border-t border-rule pt-4 text-[0.85rem] leading-relaxed text-muted">
        For education only. Not financial advice.
      </p>

      <p className="mt-4 text-[0.95rem]">
        New to this? Read{" "}
        <Link href="/learn/emergency-fund">chapter 2, on the emergency fund</Link>
        .
      </p>
    </div>
  );
}
