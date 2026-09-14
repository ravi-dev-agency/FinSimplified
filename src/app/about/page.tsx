import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Content";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why FinSimplified exists, how it is written, and how it makes money.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Why this site exists"
        intro="Most financial writing in India is either an advertisement or a textbook. This is meant to be neither."
      />

      <section className="mx-auto max-w-[720px] px-4 py-10 md:px-8 md:py-14">
        <h2 className="text-xl">Who writes this</h2>
        <p className="mt-3">{site.author.line}</p>

        <h2 className="mt-8 text-xl">What this site does</h2>
        <p className="mt-3">
          We explain money in plain English, with Indian rupee examples, for
          people who were never taught any of this. Every article assumes you
          are starting from zero, and nothing here assumes you already know what
          a mutual fund is.
        </p>

        <h2 className="mt-8 text-xl">What we don&apos;t do</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>We don&apos;t sell financial products.</li>
          <li>We don&apos;t recommend specific funds, stocks or policies.</li>
          <li>We don&apos;t promise returns, and we never will.</li>
          <li>We are not SEBI-registered investment advisers.</li>
        </ul>

        <h2 className="mt-8 text-xl">How our calculators work</h2>
        <p className="mt-3">
          Every calculator shows the formula it uses and lists what it leaves
          out. The maths lives in tested code, separate from the interface, so a
          wrong formula cannot hide behind a nice-looking result.
        </p>

        <h2 className="mt-8 text-xl">Mistakes</h2>
        <p className="mt-3">
          If you find something wrong, tell us and we will correct it. Financial
          rules in India change, and a page that was accurate last year may not
          be accurate today.
        </p>
      </section>
    </>
  );
}
