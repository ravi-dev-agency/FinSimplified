import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { series, seriesAccent, seriesProgress } from "@/data/series";
import { articles } from "@/data/articles";
import { isArticlePublished } from "@/lib/content";
import ArticleListItem from "@/components/articles/ArticleListItem";

export function generateStaticParams() {
  return series.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = series.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: `${s.title} series`,
    description: s.blurb,
    alternates: { canonical: `/series/${s.slug}` },
  };
}

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = series.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const s = series[index];
  const accent = seriesAccent(index);
  const Icon = s.icon;

  const parts = s.parts
    .filter(isArticlePublished)
    .map((p) => articles.find((a) => a.slug === p))
    .filter((a) => a !== undefined);

  return (
    <div className="mx-auto max-w-[1080px] px-4 pt-12 pb-16 md:px-6 md:pt-16">
      <p className="text-[0.9375rem]">
        <Link href="/series" className="font-medium">
          ← All series
        </Link>
      </p>

      <div className="mt-8 flex items-center gap-3.5">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px]"
          style={{
            backgroundColor: `color-mix(in srgb, ${accent} 13%, white)`,
            color: accent,
          }}
        >
          <Icon size={21} strokeWidth={1.9} aria-hidden />
        </span>
        <p className="num text-[0.8125rem] text-muted">
          <span className="font-bold tracking-wide" style={{ color: accent }}>
            Series
          </span>{" "}
          · {seriesProgress(s, parts.length)}
        </p>
      </div>

      <h1 className="display mt-4">{s.title}</h1>

      <p className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-subtle">
        {s.blurb}
      </p>

      {parts.length === 0 ? (
        <div className="mt-10 max-w-[760px] rounded-card border border-rule bg-tint p-6 md:p-8">
          <p className="text-[1.0625rem] font-bold text-display">
            The first post in this series is being written.
          </p>
        </div>
      ) : (
        <ul className="mt-12 max-w-[760px]">
          {parts.map((article) => (
            <ArticleListItem key={article.slug} article={article} />
          ))}
        </ul>
      )}
    </div>
  );
}
