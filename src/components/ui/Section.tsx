import type { ReactNode } from "react";

/** Section rhythm: 48 between major sections, 8 under a heading. */
export default function Section({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1080px] px-4 pt-8 pb-0 last:pb-12 md:px-6 md:pt-12">
      {title && <h2 className="text-[1.125rem]">{title}</h2>}
      {subtitle && (
        <p className="mt-2 max-w-[720px] text-[0.938rem] text-subtle">
          {subtitle}
        </p>
      )}
      <div className={title ? "mt-6" : ""}>{children}</div>
    </section>
  );
}
