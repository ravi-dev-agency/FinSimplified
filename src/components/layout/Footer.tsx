import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { mainNav } from "@/data/nav";
import { site } from "@/data/site";

const legal = [
  { label: "Disclaimer", href: "/legal/disclaimer" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "About", href: "/about" },
];

/**
 * Three columns on desktop, stacked on mobile: who wrote this, where to go,
 * and the legal pages. The regulatory line sits alone under a rule, because
 * on a finance site it is the part that must not read as small print buried
 * among links.
 */
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-rule bg-tint">
      <div className="mx-auto max-w-[1080px] px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 text-display">
              <Logo size={24} />
              <span className="text-[1.0625rem] font-extrabold tracking-[-0.015em]">
                {site.name}
              </span>
            </p>
            <p className="mt-2 text-[0.95rem] text-subtle">{site.tagline}</p>
            <p className="mt-4 max-w-[42ch] text-[0.92rem] leading-relaxed text-subtle">
              Written by {site.author.name}. {site.author.line}
            </p>
          </div>

          <nav aria-label="Sections">
            <h2 className="text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase">
              Explore
            </h2>
            <ul className="mt-2 text-[0.95rem]">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-block py-1.5">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="About and legal">
            <h2 className="text-[0.8125rem] font-semibold tracking-[0.08em] text-muted uppercase">
              Site
            </h2>
            <ul className="mt-2 text-[0.95rem]">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-block py-1.5">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-rule pt-6">
          <p className="max-w-[760px] text-[0.85rem] leading-relaxed text-muted">
            <strong className="font-semibold text-subtle">
              Financial education, not financial advice.
            </strong>{" "}
            Not a SEBI-registered investment adviser. Nothing here is sold, and
            no product is recommended. Calculator results are illustrative
            estimates based on the assumptions you enter. Investments carry
            risk, and past performance does not guarantee future results.
          </p>
          <p className="mt-4 text-[0.85rem] text-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
