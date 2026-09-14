import {
  Banknote, CandlestickChart, ChartPie, Compass, CreditCard, Gauge, HeartPulse,
  PiggyBank, Receipt, Repeat, Rocket, Scale, ShieldHalf, TrendingUp, Umbrella,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type ModuleMeta = {
  slug: string;
  /** Chapter number shown in the index and at the top of the page. */
  number: number;
  title: string;
  blurb: string;
  minutes: number;
  /** Date you last checked the facts on this page. */
  updated: string;
  icon: LucideIcon;
};

/**
 * One flat list of chapters, in the order money actually moves: see where
 * the salary goes, build a cushion, insure against what would wipe it out,
 * clear expensive borrowing — and only then invest. The order is itself a
 * piece of advice, so it should not be shuffled casually.
 *
 * No categories, no sub-chapters.
 *
 * To add a chapter:
 *   1. add an entry here
 *   2. create content/modules/<slug>.md
 *
 * A chapter with no markdown file shows as "Coming soon", never a dead link.
 */
export const modules: ModuleMeta[] = [
  // ---- See where the money actually goes ----
  { slug: "budgeting", number: 1, title: "Where your salary actually goes", blurb: "Three buckets, twenty minutes with your bank statement, and the one change that makes saving actually happen.", minutes: 9, updated: "13 September 2026", icon: Wallet },
  { slug: "emergency-fund", number: 2, title: "The emergency fund", blurb: "The money that stops one bad month turning into one bad year — how much, where to keep it, and why it comes before investing.", minutes: 10, updated: "13 September 2026", icon: ShieldHalf },

  // ---- Cover what would wipe everything out ----
  { slug: "term-insurance", number: 3, title: "Term insurance", blurb: "What it is, how much cover you need, every option on the buying page, and the mistakes that cost families everything.", minutes: 18, updated: "12 September 2026", icon: Umbrella },
  { slug: "health-insurance", number: 4, title: "Health insurance", blurb: "What the words in the policy actually mean, and the four clauses that decide how much you really get paid.", minutes: 25, updated: "13 September 2026", icon: HeartPulse },

  // ---- Grow what is left, once the base is in place ----
  { slug: "how-to-start-investing", number: 5, title: "Investment options", blurb: "Why inflation makes investing necessary, what to have in place first, every category from risk-free to equity, and why most people still end up with less than the fund they owned.", minutes: 22, updated: "13 September 2026", icon: Rocket },
  { slug: "stock-market", number: 6, title: "The stock market", blurb: "Why companies sell shares instead of borrowing, what P/E and every other number actually means, and the three ways to invest: direct shares, mutual funds and ETFs.", minutes: 23, updated: "13 September 2026", icon: CandlestickChart },
  { slug: "mutual-funds", number: 7, title: "Mutual funds", blurb: "What they are, all 37 SEBI categories, and a method to choose one yourself.", minutes: 18, updated: "13 September 2026", icon: ChartPie },
  { slug: "etfs", number: 8, title: "ETFs", blurb: "What they are, why invest, index fund vs ETF, and how to read NAV, tracking error, volume and every other number.", minutes: 22, updated: "13 September 2026", icon: TrendingUp },
  { slug: "sip", number: 9, title: "SIP", blurb: "Why most people quit within a few years, and how not to — the goal that keeps you going, what to have in place before you start, and what to do when the market falls.", minutes: 18, updated: "13 September 2026", icon: Repeat },
  { slug: "sip-strategy", number: 10, title: "SIP strategy", blurb: "A full portfolio written out — every asset class, its role, and what it might become. Plus how to split by age and risk, step up with your salary, and rebalance.", minutes: 20, updated: "13 September 2026", icon: Scale },

  // ---- Borrowing, which quietly undoes the rest ----
  { slug: "credit-score", number: 11, title: "Credit score", blurb: "What the number means, the five things that move it, how long recovery really takes, and why one percentage point can cost you lakhs.", minutes: 14, updated: "13 September 2026", icon: Gauge },
  { slug: "credit-cards", number: 12, title: "Credit cards", blurb: "How to get 45 days of genuinely free credit, how to choose your first card, what to do when things go wrong, and where that free loan turns into 42% a year.", minutes: 22, updated: "13 September 2026", icon: CreditCard },

  // ---- Coming soon ----
  { slug: "personal-finance", number: 13, title: "Personal finance", blurb: "Putting the whole picture together — goals, priorities, and the order decisions belong in.", minutes: 0, updated: "", icon: Compass },
  { slug: "income-tax-basics", number: 14, title: "Income tax and you", blurb: "Slabs, TDS, capital gains and the deductions people miss, for anyone who finds tax confusing.", minutes: 0, updated: "", icon: Receipt },
  { slug: "retirement-planning", number: 15, title: "Retirement planning", blurb: "Inflation, corpus, and why starting at 25 beats starting at 40.", minutes: 0, updated: "", icon: PiggyBank },
];

export function findModule(slug: string) {
  return modules.find((m) => m.slug === slug);
}

/**
 * The chapter's accent colour, derived from its number so a new chapter
 * never needs a colour picked by hand. Twelve hues cycle; with 14 chapters
 * the repeat lands far enough apart to stay distinguishable.
 *
 * Used only for the rule above a title and the chapter number itself.
 */
export function chapterAccent(number: number): string {
  return `var(--color-ch-${((number - 1) % 12) + 1})`;
}

/** Previous and next chapter, for the footer navigation. */
export function chapterNeighbours(slug: string) {
  const i = modules.findIndex((m) => m.slug === slug);
  return {
    prev: i > 0 ? modules[i - 1] : null,
    next: i >= 0 && i < modules.length - 1 ? modules[i + 1] : null,
  };
}
