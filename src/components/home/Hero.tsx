import Image from "next/image";
import Link from "next/link";

/**
 * Masthead.
 *
 * First person, because a named human writing from experience is the whole
 * premise — and the thing a generated site cannot fake. The name is explained
 * here rather than left as a label: "FinSimplified" is a promise about how
 * the writing will treat you, so it earns a line saying so.
 */
export default function Hero() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 pt-12 pb-14 md:px-6 md:pt-16">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_320px]">
        <div>
          <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase">
            Hi, I am Ravi
          </p>

          <h1 className="display mt-3 max-w-[16ch]">
            Finance, made simple
          </h1>

          <p className="mt-6 max-w-[54ch] text-[1.0625rem] leading-relaxed text-subtle">
            That is what <strong className="font-semibold text-ink">FinSimplified</strong>{" "}
            means, and it is the only promise this site makes: money and
            finance explained in plain language, the way I wish someone had
            explained it to me.
          </p>

          <p className="mt-4 max-w-[54ch] text-[1.0625rem] leading-relaxed text-subtle">
            Over the past five years I have read, asked, made mistakes and
            slowly worked this out for myself. I am writing all of it down here
            so you can be better with your own money and get further on your
            wealth journey — without paying for the lessons I paid for.
          </p>

          <p className="mt-4 max-w-[54ch] text-[1.0625rem] leading-relaxed text-subtle">
            No jargon, no signup, no paywall. Nothing is sold here and no
            product is recommended. If it helps you make one better decision,
            this site has done its job.
          </p>

          <p className="mt-7 text-[0.9375rem]">
            <Link href="/learn" className="font-medium">
              Start with the chapters →
            </Link>
          </p>
        </div>

        <Image
          src="/diagrams/hero-jar.svg"
          alt="A savings jar partly filled with coins, with more coins stacked beside it"
          width={320}
          height={260}
          priority
          className="hidden w-full max-w-[320px] md:block"
        />
      </div>
    </section>
  );
}
