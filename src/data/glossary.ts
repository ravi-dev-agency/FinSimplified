export type Term = {
  term: string;
  short: string;
  example?: string;
};

/**
 * Short beginner definitions. One idea each, plain English, ₹ examples.
 *
 * Add terms as the chapters that use them are written, so every definition
 * has somewhere it is actually needed.
 *
 *   { term: "SIP", short: "…", example: "…" },
 */
export const glossary: Term[] = [];
