import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/Content";
import { legalDocs } from "@/data/legal";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ doc: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>;
}): Promise<Metadata> {
  const { doc: slug } = await params;
  const doc = legalDocs.find((d) => d.slug === slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.intro,
    alternates: { canonical: `/legal/${doc.slug}` },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ doc: string }>;
}) {
  const { doc: slug } = await params;
  const doc = legalDocs.find((d) => d.slug === slug);
  if (!doc) notFound();

  return (
    <>
      <PageHeader eyebrow="Legal" title={doc.title} intro={doc.intro} />
      <section className="mx-auto max-w-[720px] px-4 py-10 md:px-8 md:py-14">
        {doc.sections.map((section) => (
          <div key={section.heading} className="mt-8 first:mt-0">
            <h2 className="text-lg">{section.heading}</h2>
            {section.body.map((para, i) => (
              <p key={i} className="mt-3">
                {para}
              </p>
            ))}
          </div>
        ))}
        <p className="mt-10 text-xs leading-relaxed text-muted">
          This wording is a starting point, not legal advice. Have it reviewed
          before publishing.
        </p>
      </section>
    </>
  );
}
