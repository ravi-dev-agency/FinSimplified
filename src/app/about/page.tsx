import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Content";

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
        <p className="mt-3">
          I am Ravi. I write every word on this site myself. I am not a
          registered adviser — I am someone who learned this the expensive way
          and writes it down.
        </p>
        <p className="mt-3">
          Over the past five years I have read, asked, made mistakes and slowly
          worked this out for myself. I am writing all of it down here so you
          can be better with your own money and get further on your wealth
          journey — without paying for the lessons I paid for.
        </p>

        <h2 className="mt-8 text-xl">What FinSimplified means</h2>
        <p className="mt-3">
          Finance, made simple. That is the only promise this site makes: money
          explained in plain language, the way I wish someone had explained it
          to me.
        </p>
        <p className="mt-3">
          Every chapter assumes you are starting from zero, uses Indian rupee
          examples, and never assumes you already know what a mutual fund is.
          No jargon, no signup, no paywall. Nothing is sold here and no product
          is recommended.
        </p>
        <p className="mt-3">
          If it helps you make one better decision about your own money, this
          site has done its job.
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
