import Link from "next/link";
import type { ArticleMeta } from "@/data/articles";

export default function ArticleListItem({ article }: { article: ArticleMeta }) {
  return (
    <li className="border-t border-rule py-7">
      <Link
        href={`/articles/${article.slug}`}
        className="grid gap-5 no-underline sm:grid-cols-[200px_1fr]"
      >
        {article.cover ? (
          <img
            src={article.cover}
            alt=""
            width={400}
            height={300}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-card border border-rule bg-tint"
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
          <p className="mt-2 leading-relaxed text-subtle">{article.blurb}</p>
          <p className="num mt-3 text-[0.8125rem] text-muted">
            {article.minutes} min read
          </p>
        </div>
      </Link>
    </li>
  );
}
