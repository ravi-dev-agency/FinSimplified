import { LibraryBig, Sunset, type LucideIcon } from "lucide-react";

export type SeriesMeta = {
  slug: string;
  title: string;
  blurb: string;
  /** Article slugs, in reading order. */
  parts: string[];
  /** Total episodes planned, if the series has a fixed length. */
  planned?: number;
  icon: LucideIcon;
};

/**
 * Collections of posts meant to be read in order, like a playlist.
 *
 * Learn is the syllabus, Articles is the weekly notebook, Series is a
 * longer thread followed over many posts.
 */
export const series: SeriesMeta[] = [
  {
    slug: "books",
    title: "Books",
    blurb:
      "Money books, one at a time — what each one says and what it means for your money in India.",
    parts: ["rich-dad-poor-dad"],
    icon: LibraryBig,
  },
  {
    slug: "retire-early",
    title: "Planning to Retire Early",
    blurb:
      "A step-by-step plan for financial independence and early retirement (FIRE) — from your first investment to the day work becomes a choice.",
    parts: ["retire-early-where-you-stand"],
    planned: 7,
    icon: Sunset,
  },
];

/** Series reuse the chapter accent cycle, numbered by position in the list. */
export function seriesAccent(index: number): string {
  return `var(--color-ch-${(index % 12) + 1})`;
}

/** "1 article", "7 episodes · Being written", "3 of 7 episodes". */
export function seriesProgress(s: SeriesMeta, published: number): string {
  if (s.planned) {
    return published === 0
      ? `${s.planned} episodes · Being written`
      : `${published} of ${s.planned} episodes`;
  }
  if (published === 0) return "Being written";
  return `${published} ${published === 1 ? "article" : "articles"}`;
}
