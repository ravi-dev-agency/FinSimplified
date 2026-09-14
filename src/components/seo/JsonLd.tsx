import { site } from "@/data/site";

/**
 * Structured data, so search engines can tell a chapter from a landing page.
 *
 * Rendered as a plain script tag rather than through next/script: this must
 * be in the initial HTML for a crawler to see it, and it carries no runtime
 * behaviour that would justify deferring it.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** An educational chapter or a weekly post. */
export function articleSchema({
  title,
  description,
  path,
  published,
  modified,
}: {
  title: string;
  description: string;
  path: string;
  published?: string;
  modified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${site.url}${path}`,
    mainEntityOfPage: `${site.url}${path}`,
    author: { "@type": "Person", name: site.author.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
    inLanguage: "en-IN",
    isAccessibleForFree: true,
  };
}

/** Used once, on the homepage. */
export function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.tagline,
    inLanguage: "en-IN",
    publisher: { "@type": "Person", name: site.author.name },
  };
}
