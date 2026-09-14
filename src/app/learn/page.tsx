import Link from "next/link";
import type { Metadata } from "next";
import ModuleGrid, { MoreComing } from "@/components/home/ModuleGrid";
import { modules } from "@/data/modules";

export const metadata: Metadata = {
  title: "Modules",
  description:
    "What to do when your salary arrives, in order: fixed bills, savings, an emergency fund, insurance, clearing costly debt, and only then investing.",
};

/**
 * The wealth journey in four stages: see it, plan it, protect it, grow it.
 *
 * It sits above the chapter list because someone starting out needs a
 * sequence more than a menu — fourteen topics are only useful once you know
 * which one is yours this month. Seeing where the money goes comes first:
 * every later stage depends on knowing the real numbers.
 */
const stages = [
  {
    stage: "See it",
    tone: "text-ink",
    steps: [
      {
        n: 1,
        title: "Find out where your salary actually goes",
        line: "One month of statements, sorted into three buckets. You cannot plan what you cannot see — and the leak is rarely where people assume.",
        slug: "budgeting",
      },
    ],
  },
  {
    stage: "Plan it",
    tone: "text-do",
    steps: [
      {
        n: 2,
        title: "Decide the split, and move savings out on payday",
        line: "Bills, savings, spending — in that order, before the month starts. Saving what is left over never works.",
        slug: "budgeting",
      },
    ],
  },
  {
    stage: "Protect it",
    tone: "text-care",
    steps: [
      {
        n: 3,
        title: "Build the emergency fund",
        line: "Three to six months of expenses, reachable the same day. Without it, one bad month goes onto a credit card.",
        slug: "emergency-fund",
      },
      {
        n: 4,
        title: "Insure — health first, then term",
        line: "One hospital bill can undo a decade of saving, and it happens while you are still alive to see it.",
        slug: "health-insurance",
      },
    ],
  },
  {
    stage: "Grow it",
    tone: "text-link",
    steps: [
      {
        n: 5,
        title: "Clear expensive debt",
        line: "Credit cards first. No investment reliably beats 36% a year, so paying it off is the best return available to you.",
        slug: "credit-cards",
      },
      {
        n: 6,
        title: "Invest for the long term",
        line: "Only now. With a cushion underneath and cover in place, this money can be left alone for ten years — which is how it compounds.",
        slug: "how-to-start-investing",
      },
    ],
  },
];

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-[1080px] px-4 pt-12 pb-16 md:px-6 md:pt-16">
      <h1 className="display max-w-[15ch]">From your salary to wealth, in order</h1>
      <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-relaxed text-subtle">
        Building wealth is not one decision — it is six steps, in order. Most
        people attempt the last one first, then discover there was nothing
        underneath it.
      </p>

      <p className="mt-4 max-w-[54ch] text-[1.0625rem] leading-relaxed text-subtle">
        Start wherever you actually are. Each step below opens the chapter
        that covers it.
      </p>

      <div className="mt-12 max-w-[760px]">
        <div>
          {stages.map((group) => (
            <section key={group.stage} className="mt-8 first:mt-0">
              <h2
                className={`text-[0.8125rem] font-bold tracking-wide uppercase ${group.tone}`}
              >
                {group.stage}
              </h2>
              <ol className="mt-2">
                {group.steps.map((step) => (
                  <li key={step.n} className="border-t border-rule last:border-b">
                    {/* The whole row is the target, so the step reads as
                        navigation rather than a preview of one. */}
                    <Link
                      href={`/learn/${step.slug}`}
                      className="group flex gap-4 py-4 no-underline"
                    >
                      <span className="num w-6 shrink-0 pt-0.5 text-[1.0625rem] font-bold text-display">
                        {step.n}
                      </span>
                      <span className="min-w-0">
                        <span className="text-[1.0625rem] font-semibold text-display group-hover:text-link">
                          {step.title}
                          <span
                            aria-hidden
                            className="ml-1.5 inline-block text-link opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            →
                          </span>
                        </span>
                        <span className="mt-1 block text-[0.9375rem] leading-relaxed text-subtle">
                          {step.line}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

      </div>

      <div className="mt-16 border-t border-rule pt-10">
        <h2 className="display-sm">All {modules.length} chapters</h2>
        <p className="mt-2 max-w-[54ch] text-subtle">
          Read them in order if you are starting out, or go straight to the one
          you need. Each is a single page.
        </p>
        <div className="mt-10">
          <ModuleGrid />
          <MoreComing />
        </div>
      </div>
    </div>
  );
}
