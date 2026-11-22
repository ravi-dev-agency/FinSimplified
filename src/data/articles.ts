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
    slug: "retire-early-where-you-stand",
    title: "Before you invest a rupee, find out where you stand",
    blurb:
      "Episode 1 of Planning to Retire Early. A twenty-minute money audit, what inflation does to money that sits still, why an FD may not keep up after tax, and the four safety nets that come before your first SIP.",
    minutes: 13,
    published: "22 November 2026",
    source: "Planning to Retire Early",
    cover: "/diagrams/cover-retire-early.svg",
  },
  {
    slug: "rich-dad-poor-dad",
    title: "Earning more won't make you rich. This book explains why.",
    blurb:
      "Most people finish the book and change nothing. Here is the whole thing as five steps, on a real ₹58,400 salary — and the four traps that use its language to take your money.",
    minutes: 22,
    published: "4 October 2026",
    source: "Rich Dad Poor Dad",
    cover: "/diagrams/cover-rich-dad.svg",
  },
  {
    slug: "sudden-money",
    title: "He won ₹5 crore. Five years later, it was gone.",
    blurb:
      "He earned ₹6,000 a month and had a sensible plan for the money. He lost most of it anyway — and what he says now about why is worth more than the money was.",
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
