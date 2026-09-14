export type Tool = {
  slug: string;
  title: string;
  question: string;
  ready: boolean;
};

/** `ready` flips to true as each calculator ships. */
export const tools: Tool[] = [
  {
    slug: "sip",
    title: "SIP calculator",
    question: "What could my monthly investment grow into?",
    ready: true,
  },
  {
    slug: "emergency-fund",
    title: "Emergency fund",
    question: "How much should I keep aside for a bad month?",
    ready: true,
  },
  {
    slug: "swp",
    title: "SWP calculator",
    question: "How long will my corpus last if I withdraw every month?",
    ready: true,
  },
  {
    slug: "budget",
    title: "Budget calculator",
    question: "Where is my salary actually going?",
    ready: true,
  },
  {
    slug: "compound-interest",
    title: "Compound interest",
    question: "What does my money become if I leave it alone?",
    ready: false,
  },
  {
    slug: "emi",
    title: "EMI calculator",
    question: "What will this loan cost me every month?",
    ready: false,
  },
  {
    slug: "credit-card",
    title: "Credit card payoff",
    question: "How long will it take to clear my card?",
    ready: false,
  },
  {
    slug: "retirement",
    title: "Retirement calculator",
    question: "How much will I need when I stop working?",
    ready: false,
  },
];
