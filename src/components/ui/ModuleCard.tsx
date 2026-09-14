import Link from "next/link";
import type { ModuleMeta } from "@/data/modules";

/**
 * The module card. 20px padding, 4px radius, 1px rule border.
 * The icon block is the only place --color-icon-bg is used.
 */
export default function ModuleCard({
  module: mod,
  live,
}: {
  module: ModuleMeta;
  live: boolean;
}) {
  const Icon = mod.icon;

  const inner = (
    <>
      <div className="mb-3 flex h-13 items-center justify-center bg-icon-bg py-4">
        <Icon size={24} className={live ? "text-link" : "text-muted"} aria-hidden />
      </div>
      <p className="text-[1.125rem] font-semibold text-ink">
        {mod.number}. {mod.title}
      </p>
      <p className="mt-1.5 text-[0.906rem] leading-snug text-subtle">
        {mod.blurb}
      </p>
      <p className="num mt-3 border-t border-rule pt-3 text-[0.813rem] text-muted">
        {live ? `${mod.minutes} min read` : "Coming soon"}
      </p>
    </>
  );

  const base = "block h-full rounded-card border border-rule bg-page p-5";

  return live ? (
    <Link href={`/learn/${mod.slug}`} className={`${base} hover:border-link`}>
      {inner}
    </Link>
  ) : (
    <div className={`${base} opacity-70`}>{inner}</div>
  );
}
