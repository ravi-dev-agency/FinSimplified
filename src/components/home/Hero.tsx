import Image from "next/image";
import Link from "next/link";
import { modules } from "@/data/modules";
import { tools } from "@/data/tools";
import { isPublished } from "@/lib/content";

/**
 * Masthead.
 *
 * First person, because a named human writing from experience is the whole
 * premise — and the thing a generated site cannot fake.
 *
 * The full story of why I write this lives on /about. A visitor who has been
 * here four seconds needs to know what the site is, what is in it, and where
 * to start; the biography can wait until they care.
 *
 * Counts are computed, so the promise on the front page can never drift from
 * what has actually been written.
 */
export default function Hero() {
  const chapters = modules.filter((m) => isPublished(m.slug)).length;
  const calculators = tools.filter((t) => t.ready).length;

  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-[1080px] px-4 pt-12 pb-14 md:px-6 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_340px]">
          <div>
            <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase">
              Hi, I am Ravi
            </p>

            <h1 className="display mt-3 max-w-[14ch]">Finance, made simple</h1>

            <p className="mt-5 max-w-[52ch] text-[1.125rem] leading-relaxed text-subtle">
              What I have learned about money over the years, shared here to
              help you get better with your finances and go further in your
              financial journey.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/learn"
                className="rounded-[4px] bg-display px-5 py-3 text-[0.9375rem] font-semibold text-white no-underline hover:opacity-90"
              >
                Start reading →
              </Link>
              <Link
                href="/calculators"
                className="rounded-[4px] border border-rule px-5 py-3 text-[0.9375rem] font-semibold text-display no-underline hover:border-display"
              >
                Run the numbers
              </Link>
            </div>

            <p className="mt-5 text-[0.9375rem] text-muted">
              {chapters} chapters · {calculators} calculators · free, no signup,
              nothing sold
            </p>
          </div>

          <Image
            src="/diagrams/hero-growth.svg"
            alt="Coin stacks rising from a single rupee to a tall column, with a growth curve above them"
            width={340}
            height={218}
            priority
            className="hidden w-full max-w-[340px] md:block"
          />
        </div>
      </div>
    </section>
  );
}
