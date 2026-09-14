import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { legalDocs } from "@/data/legal";
import { modules } from "@/data/modules";
import { site } from "@/data/site";
import { tools } from "@/data/tools";
import { isArticlePublished, isPublished } from "@/lib/content";

/**
 * Only list pages that actually have content. A chapter marked "coming
 * soon" has no page behind it, and submitting URLs that 404 wastes crawl
 * budget and looks like a broken site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = ["", "/learn", "/articles", "/calculators", "/about"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const chapters = modules
    .filter((m) => isPublished(m.slug))
    .map((m) => ({
      url: `${site.url}/learn/${m.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  const posts = articles
    .filter((a) => isArticlePublished(a.slug))
    .map((a) => ({
      url: `${site.url}/articles/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const calculators = tools
    .filter((t) => t.ready)
    .map((t) => ({
      url: `${site.url}/calculators/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const legal = legalDocs.map((d) => ({
    url: `${site.url}/legal/${d.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...staticPages, ...chapters, ...posts, ...calculators, ...legal];
}
