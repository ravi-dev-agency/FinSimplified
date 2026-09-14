# FinSimplified

Money is complicated. Understanding it doesn't have to be.

An India-focused personal finance education and planning site.

## Running it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Style — deliberately plain

This is styled like a textbook, not like a product. The choices are on purpose:

- **One typeface.** Source Serif 4, everywhere. Two fashionable faces paired
  tastefully is what makes a site look machine-generated.
- **No cards, no icons, no tinted callout boxes.** Hairline rules and
  numbered lists instead.
- **Visible table borders**, striped rows, right-aligned numbers.
- **Numbered sections** inside chapters (2.1, 2.2, 2.3) and `Fig 2.1` captions.
- **Key takeaways** at the end of every chapter, as plain dashes.
- **A byline** with a real name and a "last checked" date on every chapter.
- Body text 17px at 1.72 line height. Denser than a marketing site.

## Structure — flat, two levels

```
/learn                    numbered chapter index
/learn/emergency-fund     the chapter itself
/learn/sip
```

## Writing a chapter

1. Add an entry to `src/data/modules.ts` — slug, number, title, blurb, minutes, updated date
2. Create `content/modules/<slug>.md`

Write plain markdown. Use `## 2.1 – Heading` for numbered sections. A `>`
blockquote becomes an author aside. Tables render with full borders.

End the file with:

```markdown
## Key takeaways

- First point
- Second point
```

That section is lifted out automatically and rendered in its own block at the
bottom of the page.

Set your name in `src/data/site.ts` and put a photo at `public/author.jpg`.

## What makes it read as human

The design can only get you so far. What actually works:

- Odd numbers from real budgets — ₹27,400, not ₹30,000
- Named places — "1BHK in Madhapur", not "a city"
- Stated opinions, marked as opinions — "where I disagree with standard advice"
- Real screenshots with marks drawn on them, captioned `Fig 2.1`
- A "last checked" date that you actually keep current
- First person. Say "I" when it is your experience.

`content/modules/emergency-fund.md` is written this way as a worked example.
Replace the story and the numbers with your own — they must be true.

## Tests

```bash
npm run test
```

`src/lib/calculators/sip.test.ts` covers the standard case, a single
instalment, a 0% rate, negative and zero inputs, a negative return, and a
600-month horizon. Reference case: ₹5,000 × 15 years at 12% = ₹25,22,880.

## Design

The full specification — colour, type, spacing, components — is in
[DESIGN.md](./DESIGN.md). It is implemented in `src/app/globals.css`.

Short version: Inter only, white background, one blue (`#1F5FA0`) for links,
four greys for text, 1px `#E3E6E9` borders, 4px radius, 4px spacing scale,
720px reading column. No shadows, no gradients.

## Structure — flat, two levels

```
/learn                    numbered chapter index
/learn/emergency-fund     the chapter itself
/learn/sip
```

## Writing a chapter

1. Add an entry to `src/data/modules.ts` — slug, number, title, blurb, minutes, updated date
2. Create `content/modules/<slug>.md`

Write plain markdown. Use `## 2.1 – Heading` for numbered sections. A `>`
blockquote becomes an author aside. Tables render with full borders.

End the file with:

```markdown
## Key takeaways

- First point
- Second point
```

That section is lifted out automatically and rendered in its own block at the
bottom of the page.

Set your name in `src/data/site.ts` and put a photo at `public/author.jpg`.

## What makes it read as human

The design can only get you so far. What actually works:

- Odd numbers from real budgets — ₹27,400, not ₹30,000
- Named places — "1BHK in Madhapur", not "a city"
- Stated opinions, marked as opinions — "where I disagree with standard advice"
- Real screenshots with marks drawn on them, captioned `Fig 2.1`
- A "last checked" date that you actually keep current
- First person. Say "I" when it is your experience.

`content/modules/emergency-fund.md` is written this way as a worked example.
Replace the story and the numbers with your own — they must be true.

## Tests

```bash
npm run test
```

`src/lib/calculators/sip.test.ts` covers the standard case, a single
instalment, a 0% rate, negative and zero inputs, a negative return, and a
600-month horizon. Reference case: ₹5,000 × 15 years at 12% = ₹25,22,880.

## Colour — the whole palette

Thirteen values. Every one has exactly one job. If a colour is needed that is
not on this list, the answer is no. This is the rule that keeps the site
consistent as it grows.

| Token | Hex | Used for |
|---|---|---|
| `ink` | `#1A1A1A` | Headings, key numbers, table totals |
| `body` | `#2B2B2B` | All paragraph text |
| `subtle` | `#555555` | Intros, blurbs, asides |
| `muted` | `#7A7A7A` | Dates, captions, "being written" |
| `page` | `#FFFFFF` | Default background |
| `tint` | `#F7F7F7` | Masthead, footer, table headers |
| `stripe` | `#FAFAFA` | Alternate table rows only |
| `rule` | `#DDDDDD` | Every border and divider |
| `rule-strong` | `#333333` | Aside bar, key-takeaways rule |
| `link` | `#1A6EA8` | Links only — never a background |
| `link-hover` | `#12557F` | Hover and visited |
| `do` / `do-bg` | `#1B6B3A` / `#EDF5EF` | Correct action, health check "good" |
| `care` / `care-bg` | `#B3541E` / `#FDF3EC` | Caution, common mistakes |
| `dont` / `dont-bg` | `#B3261E` / `#FCEDEC` | Serious errors, rejected claims |

**The rules**

1. The three semantic colours carry meaning. Never use them for emphasis or decoration.
2. Blue is for links and nothing else. No blue headings, no blue buttons.
3. Diagrams use ink, rule, link and the semantic colours. No other colour enters an SVG.
4. Emphasis is done with weight and size, not colour.

Old articles used green-on-warm-paper, indigo, and a third scheme. When they
are converted into chapters they map onto this palette and those schemes go
away.

## Structure — flat, two levels

```
/learn                    numbered chapter index
/learn/emergency-fund     the chapter itself
/learn/sip
```

## Writing a chapter

1. Add an entry to `src/data/modules.ts` — slug, number, title, blurb, minutes, updated date
2. Create `content/modules/<slug>.md`

Write plain markdown. Use `## 2.1 – Heading` for numbered sections. A `>`
blockquote becomes an author aside. Tables render with full borders.

End the file with:

```markdown
## Key takeaways

- First point
- Second point
```

That section is lifted out automatically and rendered in its own block at the
bottom of the page.

Set your name in `src/data/site.ts` and put a photo at `public/author.jpg`.

## What makes it read as human

The design can only get you so far. What actually works:

- Odd numbers from real budgets — ₹27,400, not ₹30,000
- Named places — "1BHK in Madhapur", not "a city"
- Stated opinions, marked as opinions — "where I disagree with standard advice"
- Real screenshots with marks drawn on them, captioned `Fig 2.1`
- A "last checked" date that you actually keep current
- First person. Say "I" when it is your experience.

`content/modules/emergency-fund.md` is written this way as a worked example.
Replace the story and the numbers with your own — they must be true.

## Tests

```bash
npm run test
```

`src/lib/calculators/sip.test.ts` covers the standard case, a single
instalment, a 0% rate, negative and zero inputs, a negative return, and a
600-month horizon. Reference case: ₹5,000 × 15 years at 12% = ₹25,22,880.

## Design tokens

| Role | Token | Value |
|---|---|---|
| Primary — buttons, links, charts | `primary` | `#5B4BE0` |
| Primary hover | `primary-dark` | `#4A3DBF` |
| Secondary data — growth figures | `primary-soft` | `#8B72E8` |
| Headings | `ink` | `#241F5C` |
| Body text | `body` | `#4A4568` |
| Supporting text | `subtle` | `#797496` |
| Captions, disclaimers | `muted` | `#918BB0` |
| Soft background | `primary-tint` | `#F3F2FE` |
| Page background | `page` | `#F8F7FE` |
| Card border | `line` | `#E6E4F5` |
| Health check only | `good` / `warn` / `risk` | `#1B8A4B` / `#A06600` / `#C6362F` |

Green, amber and red appear **only** in the Financial Health Check, where
they carry meaning. They are never used for branding.

All rupee figures use the `.num` class for `tabular-nums`, so digits line up
in columns.

## Structure

```
src/
├── app/                routes (App Router)
├── components/
│   ├── layout/         Header, MobileNav, Footer
│   ├── ui/             Button, Section
│   └── home/           homepage sections
├── data/               nav, categories, tools
└── lib/                (next) calculator maths — pure, tested functions
```

Rule: `src/lib/calculators/` will hold pure maths functions with no React
inside, each with its own test file. UI components only call them. A wrong
formula must never be able to hide inside a component.

## Responsive behaviour

Designed at 375px first.

- Mobile: single column, bottom navigation bar, `pb-20` on `main` to clear it
- `sm:` 2-column grids
- `lg:` 4-column category grid, 3-column tools grid
- `md:` and up: top navigation replaces the bottom bar

## Next steps

1. SIP calculator with tested formulas
2. One full article, end to end, to test the writing
3. Learn section index and category pages
4. Financial Health Check

## Content and safety rules

- Never write "guaranteed returns", "best fund", or "you should buy"
- Every calculator result carries its assumptions visibly
- Verify Indian tax, insurance and regulatory details before publishing
