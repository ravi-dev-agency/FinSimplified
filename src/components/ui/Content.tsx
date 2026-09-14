import type { ReactNode } from "react";
import { site } from "@/data/site";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="border-b border-rule">
      <div className="mx-auto max-w-[1080px] px-4 pt-12 pb-10 md:px-6 md:pt-16">
        {eyebrow && (
          <p className="mb-3 text-[0.813rem] tracking-wide text-muted uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="display-sm">{title}</h1>
        {intro && (
          <p className="mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed text-subtle">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}

/** Author, date checked, reading time. The strongest human signal here. */
export function Byline({ updated, minutes }: { updated?: string; minutes: number }) {
  return (
    <p className="mt-2 border-b border-rule pb-4 text-[0.813rem] text-muted">
      <span className="text-ink">{site.author.name}</span>
      {updated && <> · last checked {updated}</>}
      <> · <span className="num">{minutes} min read</span></>
    </p>
  );
}

/** Grey box at the end of every chapter. 20px padding, 4px radius. */
export function KeyTakeaways({ points }: { points: string[] }) {
  return (
    <section className="mt-10 rounded-card border border-rule bg-tint p-5">
      <h2 className="text-[0.938rem]">Key takeaways from this chapter</h2>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.938rem]">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </section>
  );
}

export function Aside({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 border-l-[3px] border-rule pl-4 text-subtle">
      {children}
    </div>
  );
}

export function NotBuiltYet({ what }: { what: string }) {
  return (
    <div className="rounded-card border border-rule bg-tint p-5">
      <p className="font-medium text-ink">{what} isn&apos;t ready yet.</p>
      <p className="mt-1 text-[0.938rem] text-subtle">
        I&apos;d rather publish nothing than publish something I haven&apos;t
        checked.
      </p>
    </div>
  );
}
