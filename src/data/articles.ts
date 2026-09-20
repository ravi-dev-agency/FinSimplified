export type ArticleMeta = {
  slug: string;
  title: string;
  blurb: string;
  minutes: number;
  /** Date published, e.g. "8 March 2026". Empty until it goes out. */
  published: string;
  /** Where the idea came from — a book, a rule change, a reader question. */
  source?: string;
  /** Shown on the article list and at the top of the post. */
  cover?: string;
};

/**
 * Weekly posts: something worth keeping from a book, a rule change that
 * matters, or a topic too small for its own chapter.
 *
 * Chapters are the syllabus and change rarely. Articles are the notebook and
 * are dated. To publish: add an entry here, create
 * content/articles/<slug>.md. An entry with no markdown file shows as
 * scheduled rather than a dead link, exactly like chapters.
 */
export const articles: ArticleMeta[] = [
  {
    slug: "sudden-money",
    title: "694 years of salary, in one evening",
    blurb:
      "He earned ₹6,000 a month, won ₹5 crore on KBC, and had a sensible plan for it. He lost most of it anyway — and what he says now about why is worth more than the money was.",
    minutes: 11,
    published: "20 September 2026",
    source: "Sudden money",
    cover: "/diagrams/cover-sudden-money.svg",
  },
  {
    slug: "compounding",
    title: "One paisa became ₹1.07 crore in 31 days",
    blurb:
      "On day 29 it was still losing. That is the thing nobody tells you about compounding — and it explains Warren Buffett better than any number about his returns does.",
    minutes: 9,
    published: "14 September 2026",
    source: "Compounding",
    cover: "/diagrams/cover-compounding.svg",
  },
];
