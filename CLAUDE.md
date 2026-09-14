# CLAUDE.md

Context for Claude Code working on this project.

## What this is

FinSimplified — a personal finance education site for beginners in India.
Plain-English chapters on investing, insurance, credit and borrowing, plus
calculators. Free. Nothing is sold. No products are recommended.

The author writes all content personally. The standard for every chapter: a
complete beginner should be able to act on it without further research.

## Stack

- Next.js 15, App Router, TypeScript
- Tailwind CSS v4 — CSS-first config, all tokens live in `src/app/globals.css`
- Content as plain markdown in `content/modules/`, rendered with react-markdown
- Vitest for calculator tests
- No database, no auth, no CMS. Static generation.

## Structure

```
content/modules/<slug>.md     chapter text — plain markdown
public/diagrams/*.svg         hand-authored diagrams
src/app/                      routes
src/components/               UI, grouped by area
src/data/                     modules, tools, glossary, nav, site, legal
src/lib/calculators/          pure maths + tests
src/lib/content.ts            reads markdown from disk
```

Site structure is **flat, two levels**: `/learn` lists modules,
`/learn/<slug>` is the chapter. No categories, no sub-chapters, no sidebar.

## Rules that must not be broken

### 1. Design

`DESIGN.md` is the specification. Do not introduce a colour, font size,
spacing value or radius that is not in it. If something seems to need a new
value, say so rather than adding one quietly.

Short version: Inter only; white background; one blue `#1F5FA0` for links and
module icons; four greys for text; 1px `#E3E6E9` borders; 4px radius; 4px
spacing scale; 720px reading column. No shadows, no gradients.

Green, amber and red are semantic only — correct action, caution, serious
mistake. Never for branding or emphasis.

### 2. Calculator maths

All formulas go in `src/lib/calculators/` as pure functions with no React.
Every one needs a test file covering normal cases and edge cases (zero,
negative, very long horizons).

Before writing a calculator, state the formula and its assumptions in a comment
at the top of the file. The page must show the formula to the reader and list
what it leaves out.

Never let a marketing figure drift from what the tool computes — the homepage
example calls `calculateSip` rather than hardcoding a number.

### 3. Financial safety

Never write "guaranteed returns", "best fund", "you should buy", or name a
specific fund, stock or policy.

Use: example, illustration, assumption, consider, may be suitable depending on
your situation. Always state that past performance does not guarantee future
results.

Verify Indian tax, SEBI and IRDAI rules against current sources before writing
anything factual. Rules change; the "last checked" date on each chapter must be
true.

### 4. Content authenticity

The site must not read as machine-generated. That means:

- First person, real experiences, stated opinions
- Odd numbers from real budgets — `₹27,400`, never `₹30,000`
- Named places — "1BHK in Madhapur", not "a city"
- A byline and a "last checked" date on every chapter

**Do not invent personal stories or fabricate the author's experiences.** The
placeholder story in `content/modules/emergency-fund.md` must be replaced by
the author with something true. Flag it; do not write a replacement.

### 5. Working method

Build one feature at a time. After each: test it, check edge cases, check it on
a 375px screen, check the calculations, check accessibility, explain what
changed.

Never silently change unrelated parts of the app.

## Current state

Built: homepage, `/learn` module index, chapter pages, SIP calculator (tested),
glossary (24 terms, searchable), health check placeholder, about, three legal
pages, 404, mobile bottom nav.

Written: 2 of 15 chapters — `emergency-fund` and `sip`. The rest appear in
listings as "Being written" and are not linked.

Not built: EMI, budget, emergency fund, credit card and retirement
calculators; the Financial Health Check; a comments system; sitemap, robots
and JSON-LD structured data.

Needs attention: legal pages contain draft wording that needs review, and

`src/data/site.ts` has a placeholder author line.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run test     # calculator tests
npm run build    # production build
```

## Adding a chapter

1. Add an entry to `src/data/modules.ts` — slug, number, title, blurb, minutes, updated, icon
2. Create `content/modules/<slug>.md`

Markdown conventions: `##` for sections (numbered like `## 2.1 – Heading`),
tables render with full borders, `>` becomes an author aside, images get an
italic caption below numbered `Fig 2.1`. End the file with:

```markdown
## Key takeaways

- First point
- Second point
```

That block is lifted out automatically and rendered in a grey box at the
bottom of the page.
