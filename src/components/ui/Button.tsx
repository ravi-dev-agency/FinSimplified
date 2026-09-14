import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "plain";

const styles: Record<Variant, string> = {
  solid: "bg-ink px-4 py-2 text-white no-underline hover:bg-ink",
  plain: "underline",
};

export default function Button({
  href,
  variant = "solid",
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-block rounded-btn text-[0.95rem] ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
