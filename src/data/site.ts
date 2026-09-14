/** One place for the human details. Change these to your own. */
export const site = {
  name: "FinSimplified",
  /**
   * Canonical origin, no trailing slash. Search engines and social cards
   * need absolute URLs, so this has to be right before you go live.
   * Set NEXT_PUBLIC_SITE_URL in production to override.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://finsimplified.in",
  tagline: "Money is complicated. Understanding it doesn't have to be.",
  author: {
    /** Shown on every chapter byline. */
    name: "Ravi",
    /** Put a real photo at public/author.jpg. Leave null until you have one. */
    photo: null as string | null,
    line: "I write everything on this site myself. I am not a registered adviser — I am someone who learned this the expensive way and writes it down.",
  },
};
