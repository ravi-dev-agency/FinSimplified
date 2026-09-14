import type { Metadata } from "next";
import { NotBuiltYet, PageHeader } from "@/components/ui/Content";

export const metadata: Metadata = {
  title: "Financial health check — FinSimplified",
  description:
    "Answer a few simple questions and get a clear picture of where your finances stand.",
};

const areas = [
  "Emergency fund",
  "Debt",
  "Insurance",
  "Investments",
  "Savings rate",
  "Retirement",
];

export default function HealthCheckPage() {
  return (
    <>
      <PageHeader
        eyebrow="Health check"
        title="Where do your finances actually stand?"
        intro="A few simple questions about your income, savings, debt and cover. No signup, and nothing is stored."
      />

      <section className="mx-auto max-w-[720px] px-4 py-10 md:px-8 md:py-14">
        <NotBuiltYet what="The health check" />

        <h2 className="mt-10 text-lg">What it will look at</h2>
        <ul className="mt-4">
          {areas.map((area) => (
            <li
              key={area}
              className="border-t border-rule py-2 text-[0.95rem] text-ink last:border-b"
            >
              {area}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          The report will be educational. It will point out areas worth
          attention and explain why, using transparent rules you can read. It
          will not recommend specific products or funds.
        </p>
      </section>
    </>
  );
}
