# FinSimplified — design specification

Everything below is implemented in `src/app/globals.css`.

The intent: classy and confident, in the spirit of Zerodha Varsity. Large
display type carries the page, one colour per chapter makes a long syllabus
scannable, and the reading column itself stays plain so the content is what
the reader notices.

Revised 12 September 2026. The earlier version of this file forbade all colour
beyond a single blue and set the page title at 24px. That produced a site that
read as dull on first sight, which was the opposite of the intent, so the type
scale and the chapter accents below replace it. The reading column, the tables,
the callouts and the 4px spacing scale are unchanged.

---

## 1. Colour

Every value has exactly one job. If a colour is needed that is not on this
list, the answer is no.

Contrast ratios are measured against white. WCAG AA requires 4.5:1 for normal
text.

### Text

| Token | Hex | Contrast | Used for |
|---|---|---|---|
| `display` | `#1A1D21` | 15.8:1 | Display headings, chapter titles, section headings |
| `ink` | `#2E3338` | 12.0:1 | Headings, table totals, author name |
| `body` | `#44484D` | 9.1:1 | All paragraph text |
| `subtle` | `#5A6066` | 6.6:1 | Blurbs, intros, secondary copy |
| `muted` | `#6B7177` | 4.9:1 | Dates, captions, "being written" |

### Surfaces and lines

| Token | Hex | Used for |
|---|---|---|
| `page` | `#FFFFFF` | Default background |
| `tint` | `#F5F6F7` | Table headers, key-takeaways box |
| `stripe` | `#FAFAFA` | Alternate table rows only |
| `icon-bg` | `#EEF4FA` | Unused — chapter icons derive their tint from the chapter accent |
| `rule` | `#E3E6E9` | Every border and divider, 1px |

### Accent

| Token | Hex | Contrast | Used for |
|---|---|---|---|
| `link` | `#1F5FA0` | 6.6:1 | Links, module icons, active nav |
| `link-hover` | `#16487A` | — | Hover state |

Blue appears on links, module card icons, and the active item in the mobile
nav. Nowhere else. No blue headings, no blue buttons, no blue backgrounds.

### Chapter accents

Twelve hues, one per chapter, cycling by chapter number via
`chapterAccent()` in `src/data/modules.ts`. Declared on `:root` rather than
in `@theme`, because they are referenced through `var()` in inline styles and
Tailwind only emits theme variables it sees used in a class name.

| Token | Hex | | | Token | Hex | |
|---|---|---|---|---|---|---|
| `ch-1` | `#0FA3A3` | teal | | `ch-7` | `#1D8FB0` | cerulean |
| `ch-2` | `#E2683C` | burnt orange | | `ch-8` | `#E0752D` | tangerine |
| `ch-3` | `#4F6FD4` | indigo | | `ch-9` | `#7D5BC4` | purple |
| `ch-4` | `#D4A017` | ochre | | `ch-10` | `#B5442F` | brick |
| `ch-5` | `#6AA84F` | leaf | | `ch-11` | `#2F9E6E` | emerald |
| `ch-6` | `#C2417F` | magenta | | `ch-12` | `#8A6BBF` | lavender |

The sequence opens on teal and alternates warm and cool. Saturated rather
than pastel — see the note on distinctness below.

A chapter accent appears in exactly ONE place: the 5px vertical spine down
the left of a chapter entry, and the small chapter number that sits above the
title. Never on a heading, never on the chapter number, never as a
background behind text, never in the reading column.

**These are deliberately bright.** A 3px decorative bar is not text, so it
carries no contrast minimum. An earlier version darkened every hue to clear
4.5:1 and the result looked tired — saturation is what makes a fourteen-chapter
list feel alive rather than administrative.

**Colour never touches type.** Headings are near-black at every level. This is
the rule that lets the palette be bright without looking like a toy: the colour
labels the chapter, the words stay black and serious.

Rules render at full strength whether or not the chapter is written — colour
identifies a chapter, it is not a reward for being finished. "Being written"
under the title carries that state instead.

### Brand

| Token | Hex | Used for |
|---|---|---|
| `brand` | `#1668CC` | The logo mark, nowhere else |

**The mark** is a rupee sign inside a bookmark. The bookmark says reading, the
rupee says money; together they say what the site is, which a plain rupee badge
does not. The notched silhouette is what makes it recognisable at favicon size
— a rounded square reads as any fintech app. Defined once in
`src/components/layout/Logo.tsx` and mirrored in `src/app/icon.svg`; change
both together.

Deeper and more saturated than `link`, so the mark reads as an identity rather
than a link that lost its underline.

### Semantic — meaning only, never decoration

| Token | Text | Background | Used for |
|---|---|---|---|
| `do` | `#1B6B3A` | `#EDF5EF` | Correct action, health check "good" |
| `care` | `#B3541E` | `#FDF3EC` | Caution, common mistakes |
| `dont` | `#B3261E` | `#FCEDEC` | Serious errors, rejected claims |

These three appear in advice callouts and the Financial Health Check. Never for
emphasis, never for branding.

**Emphasis is done with weight and size, not colour.**

---

## 2. Typography

One typeface: **Inter**, loaded via `next/font`. Weights 400, 500, 600 for the
interface and reading column; 700 and 800 for display type only.

| Element | Size | Line height | Weight |
|---|---|---|---|
| Display (`.display`) | clamp 40–64px | 1.05 | 800, -3.2% tracking |
| Display small (`.display-sm`) | clamp 26–34px | 1.15 | 700, -2.2% tracking |
| Chapter section (h2 in `.chapter`) | 21px | 1.3 | 700 |
| Chapter sub-section (h3) | 17px | 1.3 | 600 |
| Sub-heading (h3) | 16px | 1.3 | 600 |
| Body (interface) | 16px | 1.7 | 400 |
| Body (reading column) | 17px | 1.75 | 400 |
| Card blurb, table | 14.5px | 1.5 | 400 |
| Caption, meta, date | 13px | 1.6 | 400 |

All rupee figures use `.num` for `tabular-nums`, so digits line up in columns.

Body at 16px, not 15px. Beginners read long chapters on cheap phones.

Display type is for mastheads and page titles only. It never enters the
reading column, which stays at 16px/1.75 — the size is what makes the site
feel confident on first sight, and what would make a chapter unreadable if it
leaked into the body.

---

## 3. Spacing

Everything is a multiple of 4. Each size has a fixed job.

| Value | Where |
|---|---|
| 6 | Between list items |
| 8 | Table cell vertical padding, heading to its text |
| 12 | Table cell horizontal padding |
| 16 | Between paragraphs, page gutter on mobile, callout padding |
| 20 | Inside module cards and the takeaways box |
| 24 | Page gutter on desktop, above h3, above figures |
| 32 | Above h2, above the takeaways box |
| 48 | Between major page sections |

**The rule that keeps it tidy:** space above a heading is always larger than
space below it. This attaches a heading to its own text instead of letting it
float between two paragraphs.

---

## 4. Widths

| Context | Max width |
|---|---|
| Reading column (chapter body) | 720px |
| Page container (index, cards) | 1080px |

720px keeps lines near 75 characters. Wider and the eye loses the line when it
wraps.

---

## 5. Borders and radius

- Every border: **1px solid `rule`**
- Every radius: **4px**

Four pixels is nearly invisible, which is the point. Twelve-pixel rounding is
the current app look and dates quickly.

No shadows. No gradients. No transitions except link colour.

---

## 6. Components

**Chapter entry** — no card border. A 5px accent spine runs down the left with
20px of padding beside it. Inside: a 44px rounded square holding the chapter
icon, tinted with the chapter's own accent — icon at full accent colour on a
13% wash of the same hue, mixed with `color-mix()` so the tint is derived from
the accent rather than being a second palette to maintain. Beside it, a
zero-padded number (`01`, `02`) in the accent colour, the reading time or
"Being written" in `muted`, and the title at 20px/700 in `display`. Blurb in
`subtle` below the whole block. Unwritten chapters are not links. Two columns,
not three.

### On distinctness

Zerodha Varsity is the structural reference for this site, and an earlier
revision followed it too closely — a horizontal accent rule above a large
black number, three columns, the same green/blue/yellow/pink sequence. Side by
side it read as a copy, which is a problem for a site whose whole premise is
that a real person writes it.

The deliberate departures, all of which must be preserved:

- The accent is a **vertical spine**, not a horizontal rule
- The chapter number is **small and coloured**, not large and black
- Each chapter carries a **tinted icon** in its own accent
- **Two columns**, not three
- **Saturated** hues, not pastels, in a sequence that opens on teal

Keep the qualities — large display type, real colour, no grey boxes — without
the same layout.

**Chapter page** — breadcrumb, h1, byline rule, body at 720px, takeaways box,
disclaimer, previous/next.

**Byline** — author name in `ink`, "last checked" date and reading time in
`muted`, 13px, with a 1px rule beneath.

**Key takeaways** — `tint` background, 1px rule border, 4px radius, 20px
padding, bulleted list. Last thing before the disclaimer.

**Tables** — 1px rule borders, `tint` header row, `stripe` on even rows, 8/12
cell padding, last column right-aligned with tabular numbers. Caption below in
`muted`, numbered "Table 2.1".

**Figures** — an image alone on a line is centred in the reading column, with
an italic caption beneath it in `muted`, numbered "Fig 1.1". No border: a
drawing on white needs no box, and the old border made every diagram look like
a screenshot. The reading column itself is centred on the page, not pinned
left.

**Advice callouts** — `do` / `care` / `dont`. Semantic background, 12/16
padding, coloured bold label, no border.

**Collapsible questions** — a `####` heading in markdown becomes a native
`<details>` row: 1px rules above and below, the question at 17px/600 in
`display`, a CSS chevron on the right that flips when open, and the question
turning `link` blue while open. Native `<details>` rather than React state, so
it needs no JavaScript and the keyboard and screen readers handle it for free.
Used for FAQ sections, where thirty open answers would be a wall of text.

---

## 7. Rules for diagrams

SVG diagrams use only: `ink` for text, `rule` for lines and boxes, `link` for
the one element being highlighted, and the semantic colours where meaning
requires it. No other colour enters an SVG.

Diagram text is real SVG text, never outlines, so it stays searchable and
readable by screen readers.

---

## 8. Accessibility

- All text meets WCAG AA against its background
- `:focus-visible` shows a 2px `link` outline
- Tap targets on mobile are at least 44px tall
- Every image has alt text describing what it teaches, not what it looks like
- `prefers-reduced-motion` is respected
