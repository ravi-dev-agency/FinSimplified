import Link from "next/link";
import type { Metadata } from "next";
import { series, seriesAccent, seriesProgress } from "@/data/series";
import { isArticlePublished } from "@/lib/content";

export const metadata: Metadata = {
  title: "Series",
  description: "Posts that build on each other, read in order.",
};

export default function SeriesPage() {
  return (
    <div className="mx-auto max-w-[1080px] px-4 pt-12 pb-16 md:px-6 md:pt-16">
      <h1 className="display">Series</h1>

      <p className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-subtle">
        Posts that build on each other, read in order.
      </p>

      {series.length === 0 ? (
        <div className="mt-10 max-w-[760px] rounded-card border border-rule bg-tint p-6 md:p-8">
          <p className="text-[1.0625rem] font-bold text-display">
            The first series is on its way.
          </p>
          <p className="mt-4 text-[0.9375rem]">
            <Link href="/articles" className="font-medium">
              Read the latest articles →
            </Link>
          </p>
        </div>
      ) : (
        <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {series.map((s, i) => {
            const count = s.parts.filter(isArticlePublished).length;
            const accent = seriesAccent(i);
            const Icon = s.icon;
            return (
              <li key={s.slug} className="h-full">
                <Link
                  href={`/series/${s.slug}`}
                  className="block h-full border-l-[5px] py-1 pl-5 no-underline"
                  style={{ borderColor: accent }}
                >
                  <div className="flex h-full items-stretch gap-3.5">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-[6px]"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${accent} 13%, white)`,
                        color: accent,
                      }}
                    >
                      <Icon size={21} strokeWidth={1.9} aria-hidden />
                    </span>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-baseline gap-2.5">
                        <span
                          className="num text-[0.8125rem] font-bold tracking-wide"
                          style={{ color: accent }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="num text-[0.8125rem] text-muted">
                          {seriesProgress(s, count)}
                        </span>
                      </div>

                      <h2 className="mt-1 text-[1.25rem] leading-snug font-bold text-display">
                        {s.title}
                      </h2>

                      <p className="mt-2 grow text-[0.9375rem] leading-relaxed text-subtle">
                        {s.blurb}
                      </p>

                      <span className="mt-3 inline-block text-[0.9375rem] font-medium text-link">
                        View series →
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
