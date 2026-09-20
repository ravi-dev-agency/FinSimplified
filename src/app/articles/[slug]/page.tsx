import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd, { articleSchema } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents, remarkAlignFigures } from "@/components/ui/markdown";
import { articles } from "@/data/articles";
import { site } from "@/data/site";
import { getArticleBody, publishedArticleSlugs } from "@/lib/content";

export function generateStaticParams() {
  return publishedArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.blurb,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.blurb,
      url: `/articles/${article.slug}`,
      ...(article.cover ? { images: [article.cover] } : {}),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  const raw = getArticleBody(slug);
  if (!article || !raw) notFound();

  return (
    <div className="mx-auto max-w-[720px] px-4 py-8 md:px-6">
      <JsonLd
        data={articleSchema({
          title: article.title,
          description: article.blurb,
          path: `/articles/${article.slug}`,
          published: article.published || undefined,
        })}
      />
      <p className="text-[0.813rem] text-muted">
        <Link href="/articles">Articles</Link>
        <span className="px-1.5" aria-hidden>
          ›
        </span>
        <span>{article.title}</span>
      </p>

      <div className="mt-5">
        <p className="num text-[0.8125rem] text-muted">
          {article.published}
          {article.source && <> · {article.source}</>}
        </p>
        <h1 className="display-sm mt-1.5">{article.title}</h1>
        <p className="mt-2 border-b border-rule pb-4 text-[0.813rem] text-muted">
          <span className="text-ink">{site.author.name}</span>
          <> · </>
          <span className="num">{article.minutes} min read</span>
        </p>
      </div>

      <article className="chapter mt-6">
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkAlignFigures]} components={markdownComponents}>
          {raw}
        </ReactMarkdown>
      </article>

      <p className="mt-8 border-t border-rule pt-4 text-[0.813rem] leading-relaxed text-muted">
        This is financial education, not financial advice. Rules in India
        change; the date above is when this was written. If you find something
        wrong, tell me and I will fix it.
      </p>
    </div>
  );
}
