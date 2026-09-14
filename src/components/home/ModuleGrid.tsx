import Link from "next/link";
import { chapterAccent, modules } from "@/data/modules";
import { isPublished } from "@/lib/content";

/**
 * Chapter list.
 *
 * The colour runs as a vertical spine down the left of each entry, and the
 * chapter number sits small above the title rather than looming beside it.
 * This is deliberately NOT the horizontal-rule-over-a-big-number pattern
 * that Zerodha Varsity uses — same brightness and density, different
 * structure, so the page reads as its own thing.
 */
export default function ModuleGrid() {
  return (
    <ul className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
      {modules.map((mod) => {
        const live = isPublished(mod.slug);
        const accent = chapterAccent(mod.number);

        const Icon = mod.icon;

        {/* One flex row: icon, then a single text column. The blurb lives in
            that column too, so it aligns to the title rather than to the
            spine. */}
        const body = (
          <div className="flex items-start gap-3.5">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px]"
              style={{
                backgroundColor: `color-mix(in srgb, ${accent} 13%, white)`,
                color: accent,
              }}
            >
              <Icon size={21} strokeWidth={1.9} aria-hidden />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2.5">
                <span
                  className="num text-[0.8125rem] font-bold tracking-wide"
                  style={{ color: accent }}
                >
                  {String(mod.number).padStart(2, "0")}
                </span>
                <span className="num text-[0.8125rem] text-muted">
                  {live ? `${mod.minutes} min read` : "Coming soon"}
                </span>
              </div>

              <h3 className="mt-1 text-[1.25rem] leading-snug font-bold text-display">
                {mod.title}
              </h3>

              <p className="mt-2 text-[0.9375rem] leading-relaxed text-subtle">
                {mod.blurb}
              </p>

              {live && (
                <span className="mt-2.5 inline-block text-[0.9375rem] font-medium text-link">
                  Read chapter →
                </span>
              )}
            </div>
          </div>
        );

        {/* h-full on both the item and its child makes every spine run the
            full height of its grid row, so rows sit on a shared baseline
            however long the blurb runs. */}
        return (
          <li key={mod.slug} className="h-full">
            {live ? (
              <Link
                href={`/learn/${mod.slug}`}
                className="block h-full border-l-[5px] py-1 pl-5 no-underline"
                style={{ borderColor: accent }}
              >
                {body}
              </Link>
            ) : (
              <div
                className="h-full border-l-[5px] py-1 pl-5"
                style={{ borderColor: accent }}
              >
                {body}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * A closing note after the chapter list.
 *
 * Naming unwritten chapters invites the question of when they arrive, and
 * promises a running order that may well change. Saying only that more is
 * coming is honest and keeps the list finite.
 */
export function MoreComing() {
  return (
    <p className="mt-10 border-t border-rule pt-6 text-subtle">
      More chapters are being written. Something valuable is coming soon.
    </p>
  );
}
