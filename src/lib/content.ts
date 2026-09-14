import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "modules");
const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

/** You write plain markdown. Nothing here touches React. */
export function getModuleBody(slug: string): string | null {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

export function isPublished(slug: string): boolean {
  return fs.existsSync(path.join(CONTENT_DIR, `${slug}.md`));
}

export function publishedSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Articles follow the same markdown-on-disk rule as chapters. */
export function getArticleBody(slug: string): string | null {
  const file = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

export function isArticlePublished(slug: string): boolean {
  return fs.existsSync(path.join(ARTICLES_DIR, `${slug}.md`));
}

export function publishedArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/**
 * Chapters end with a "## Key takeaways" heading followed by a list.
 * We lift that out of the markdown so it renders in its own block at the
 * bottom of the page, the way a textbook does.
 */
export function getTakeaways(raw: string): {
  body: string;
  takeaways: string[];
} {
  const marker = /\n##\s+Key takeaways\s*\n/i;
  const match = raw.match(marker);
  if (!match || match.index === undefined) {
    return { body: raw, takeaways: [] };
  }

  const body = raw.slice(0, match.index);
  const tail = raw.slice(match.index + match[0].length);

  const takeaways = tail
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-") || line.startsWith("*"))
    .map((line) => line.replace(/^[-*]\s*/, ""));

  return { body, takeaways };
}
