import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { isArticlePublished } from "@/lib/content";

export const metadata: Metadata = {
  title: "Articles — FinSimplified",
  description:
    "One idea a week from the books, podcasts and talks I learn from — written in plain language, with what it actually means for your money.",
};

export default function ArticlesPage() {
  const live = articles.filter((a) => isArticlePublished(a.slug));

  return (
    <div className="mx-auto max-w-[1080px] px-4 pt-12 pb-16 md:px-6 md:pt-16">
      <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase">
        A new post every week
      </p>

      <h1 className="display mt-3">What I learned this week</h1>

      <p className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-subtle">
        One idea a week from the books, podcasts and talks I learn from —
        written plainly, with what it actually means for your money.
      </p>

      <p className="mt-4 max-w-[56ch] text-[1.0625rem] leading-relaxed text-subtle">
        Writing it down is how I make sure I have understood it. Reading it is
        how you get the useful part without the ten hours.
      </p>

      {live.length === 0 ? (
        <div className="mt-10 max-w-[760px] rounded-card border border-rule bg-tint p-6 md:p-8">
          <p className="text-[1.0625rem] font-bold text-display">
            The first post is being written.
          </p>
          <p className="mt-2 max-w-[56ch] leading-relaxed text-subtle">
            Nothing is published here yet — the first one goes out shortly, and
            then one most weeks after that.
          </p>
          <p className="mt-4 text-[0.9375rem]">
            <Link href="/learn" className="font-medium">
              Start with the chapters →
            </Link>
          </p>
          <p className="mt-1.5 text-[0.9rem] text-muted">
            Fifteen of them, in the order money actually moves.
          </p>
        </div>
      ) : (
        <ul className="mt-12 max-w-[760px]">
          {live.map((article) => (
            <li key={article.slug} className="border-t border-rule py-7">
              <Link
                href={`/articles/${article.slug}`}
                className="grid gap-5 no-underline sm:grid-cols-[200px_1fr]"
              >
                {article.cover ? (
                  <img
                    src={article.cover}
                    alt=""
                    className="w-full rounded-card border border-rule bg-tint"
                  />
                ) : (
                  <div className="hidden sm:block" />
                )}
                <div>
                  <p className="num text-[0.8125rem] text-muted">
                    {article.published}
                    {article.source && <> · {article.source}</>}
                  </p>
                  <h2 className="mt-1.5 text-[1.25rem] leading-snug font-bold text-display">
                    {article.title}
                  </h2>
                  <p className="mt-2 leading-relaxed text-subtle">
                    {article.blurb}
                  </p>
                  <p className="num mt-3 text-[0.8125rem] text-muted">
                    {article.minutes} min read
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
