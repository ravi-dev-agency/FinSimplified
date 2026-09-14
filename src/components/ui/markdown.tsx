import type { ReactNode } from "react";
import type { Components } from "react-markdown";

/**
 * Advice callouts, written as plain markdown so the author never touches HTML.
 *
 * A blockquote whose first bolded words are Do this / Careful / Do not becomes
 * the matching semantic callout from DESIGN.md. Any other blockquote stays an
 * ordinary author aside.
 *
 *   > **Do this first.** Build one month of expenses before you invest.
 *   > **Careful.** Anything with a lock-in is not an emergency fund.
 *   > **Do not** keep it in the account your salary lands in.
 */
const CALLOUTS = [
  { test: /^(do this|do it|start here)/i, className: "callout callout-do" },
  { test: /^(careful|caution|watch out)/i, className: "callout callout-care" },
  { test: /^(do not|don't|never)/i, className: "callout callout-dont" },
] as const;

/** The callout marker is the bold run at the very start of the quote. */
function leadingLabel(node: ReactNode): string {
  // Children include whitespace text nodes; the paragraph is the first element.
  const first = Array.isArray(node)
    ? node.find((child) => child && typeof child === "object")
    : node;
  if (!first || typeof first !== "object" || !("props" in first)) return "";

  const para = first.props as { children?: ReactNode };
  const firstChild = Array.isArray(para.children)
    ? para.children[0]
    : para.children;

  if (
    !firstChild ||
    typeof firstChild !== "object" ||
    !("props" in firstChild) ||
    (firstChild as { type?: unknown }).type !== "strong"
  ) {
    return "";
  }

  const strong = (firstChild as { props: { children?: ReactNode } }).props;
  return typeof strong.children === "string" ? strong.children : "";
}

export const markdownComponents: Components = {
  blockquote({ children }) {
    const label = leadingLabel(children);
    const match = CALLOUTS.find((c) => c.test.test(label.trim()));
    if (!match) return <blockquote>{children}</blockquote>;
    return <div className={match.className}>{children}</div>;
  },
};

/**
 * Collapsible questions.
 *
 * A level-four heading (`#### Can I change my nominee later?`) becomes a
 * `<details>` block holding everything up to the next heading. Thirty open
 * answers is a wall of text; thirty closed ones is a list you can scan.
 *
 * This runs as a remark plugin — it rewrites the markdown tree before render,
 * which is the only layer where the heading and the blocks that follow it are
 * still siblings we can group. Doing it on rendered React elements does not
 * work: by then react-markdown has already emitted a flat element list.
 *
 * Native <details> rather than React state: no JavaScript, the keyboard and
 * screen readers handle it for free, and find-in-page still reaches closed
 * text in browsers that support hidden-content search.
 *
 * The author writes only markdown:
 *
 *   ### The basic doubts        <- ordinary sub-heading, stays visible
 *   #### Will they reject me?   <- becomes a collapsible question
 *   Usually not. Most companies…
 */
type MdNode = {
  type: string;
  depth?: number;
  children?: MdNode[];
  data?: Record<string, unknown>;
  [key: string]: unknown;
};

export function remarkCollapseQuestions() {
  return (tree: MdNode) => {
    const src = tree.children ?? [];
    const out: MdNode[] = [];
    let i = 0;

    while (i < src.length) {
      const node = src[i];

      if (node.type === "heading" && node.depth === 4) {
        const body: MdNode[] = [];
        i++;
        // Everything up to the next heading of any level is this answer.
        while (i < src.length && src[i].type !== "heading") {
          body.push(src[i]);
          i++;
        }

        out.push({
          type: "details",
          data: { hName: "details", hProperties: { className: "qa" } },
          children: [
            {
              type: "summary",
              data: { hName: "summary" },
              children: node.children ?? [],
            },
            {
              type: "answer",
              data: { hName: "div", hProperties: { className: "qa-body" } },
              children: body,
            },
          ],
        });
        continue;
      }

      out.push(node);
      i++;
    }

    tree.children = out;
  };
}

/**
 * Right-aligns columns of figures.
 *
 * Tables here mix money with prose, and a column of rupee amounts only reads
 * as a column when the digits line up. The decision has to be per column, not
 * per cell: "About ₹16,000" sits above "About ₹76,000", and aligning one but
 * not the other is worse than aligning neither. So a column goes right when
 * most of its body cells are figures, carrying the odd worded one with it.
 *
 * This runs on the markdown tree because that is where a table's rows are still
 * siblings we can read across — the same reason the accordion plugin does.
 * GFM tables already carry an `align` array, so we only set it.
 */
const FIGURE = /^[^A-Za-z]*\d[\d₹%.,\-–—/ ]*$/;

function textOf(node: MdNode): string {
  if (typeof node.value === "string") return node.value;
  return (node.children ?? []).map(textOf).join("");
}

export function remarkAlignFigures() {
  return (tree: { children: MdNode[] }) => {
    const visit = (node: MdNode) => {
      if (node.type === "table") {
        const rows = node.children ?? [];
        const body = rows.slice(1);
        const columns = Math.max(...rows.map((r) => (r.children ?? []).length), 0);

        node.align = Array.from({ length: columns }, (_, col) => {
          const cells = body
            .map((row) => (row.children ?? [])[col])
            .filter(Boolean)
            .map((cell) => textOf(cell).trim())
            .filter((text) => text.length > 0);

          if (cells.length === 0) return null;
          const figures = cells.filter((text) => FIGURE.test(text)).length;
          return figures > cells.length / 2 ? "right" : null;
        });
        return;
      }
      (node.children ?? []).forEach(visit);
    };

    tree.children.forEach(visit);
  };
}
