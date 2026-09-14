import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd, { articleSchema } from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Byline, KeyTakeaways } from "@/components/ui/Content";
import { markdownComponents, remarkAlignFigures, remarkCollapseQuestions } from "@/components/ui/markdown";
import { chapterAccent, chapterNeighbours, findModule } from "@/data/modules";
import { getModuleBody, getTakeaways, publishedSlugs } from "@/lib/content";

export function generateStaticParams() {
  return publishedSlugs().map((slug) => ({ module: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module: slug } = await params;
  const mod = findModule(slug);
  if (!mod) return {};
  return {
    title: mod.title,
    description: mod.blurb,
    alternates: { canonical: `/learn/${mod.slug}` },
    openGraph: {
      type: "article",
      title: mod.title,
      description: mod.blurb,
      url: `/learn/${mod.slug}`,
    },
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: slug } = await params;
  const mod = findModule(slug);
  const raw = getModuleBody(slug);
  if (!mod || !raw) notFound();

  const { body, takeaways } = getTakeaways(raw);
  const { prev, next } = chapterNeighbours(slug);

  return (
    <div className="mx-auto max-w-[760px] px-4 py-8 md:px-6">
      <JsonLd
        data={articleSchema({
          title: mod.title,
          description: mod.blurb,
          path: `/learn/${mod.slug}`,
          modified: mod.updated || undefined,
        })}
      />
      <p className="text-[0.813rem] text-muted">
        <Link href="/learn">Modules</Link>
        <span className="px-1.5" aria-hidden>
          ›
        </span>
        <span>{mod.title}</span>
      </p>

      {/* The accent runs as a spine down the left of the title block,
          matching the chapter list. The number is set small in the
          accent colour rather than large beside a horizontal rule. */}
      <div
        className="mt-5 border-l-[5px] pl-5"
        style={{ borderColor: chapterAccent(mod.number) }}
      >
        <p
          className="num text-[0.8125rem] font-bold tracking-wide"
          style={{ color: chapterAccent(mod.number) }}
        >
          CHAPTER {String(mod.number).padStart(2, "0")}
        </p>
        <h1 className="display-sm mt-1.5">{mod.title}</h1>
        <Byline updated={mod.updated} minutes={mod.minutes} />
      </div>

      <article className="chapter mt-8">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkCollapseQuestions, remarkAlignFigures]}
          components={markdownComponents}
        >
          {body}
        </ReactMarkdown>
      </article>

      {takeaways.length > 0 && <KeyTakeaways points={takeaways} />}

      <p className="mt-10 border-t border-rule pt-4 text-[0.813rem] leading-relaxed text-muted">
        This chapter is financial education, not financial advice. Rules in
        India change; the date above is when I last checked the facts on this
        page. If you find something wrong, tell me and I will fix it.
      </p>

      <nav className="mt-8 flex flex-col gap-2 border-t border-rule pt-4 text-[0.938rem] sm:flex-row sm:justify-between">
        {prev ? (
          <Link href={`/learn/${prev.slug}`}>‹ {prev.title}</Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/learn/${next.slug}`} className="sm:text-right">
            {next.title} ›
          </Link>
        )}
      </nav>
    </div>
  );
}
