"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/Logo";
import { mainNav } from "@/data/nav";
import { site } from "@/data/site";

/**
 * Navigation is structure, not prose, so it is set in near-black at 600 —
 * blue would read as body-text links. The active section is marked with a
 * rule beneath it rather than a colour change.
 */
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-4 md:px-6 md:py-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-display no-underline"
        >
          <Logo />
          <span className="text-[1.1875rem] font-extrabold tracking-[-0.015em]">
            FinSimplified
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {mainNav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="relative py-1 text-[0.9375rem] font-semibold text-display no-underline hover:text-link"
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-0 -bottom-px h-[2.5px] rounded-full bg-display" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
