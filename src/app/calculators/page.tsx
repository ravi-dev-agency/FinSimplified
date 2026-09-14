import Link from "next/link";
import type { Metadata } from "next";
import { tools } from "@/data/tools";

export const metadata: Metadata = {
  title: "Calculators",
  description:
    "Free financial calculators for India. Each one shows the formula it used and what it leaves out.",
};

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-8 md:px-6">
      <h1 className="text-[26px] md:text-[30px]">Calculators</h1>
      <p className="mt-2 text-subtle">
        Each calculator shows its formula and lists what it leaves out. No
        result here is a promise.
      </p>

      <ul className="mt-6">
        {tools.map((tool) => (
          <li
            key={tool.slug}
            className="border-t border-rule py-3.5 last:border-b"
          >
            {tool.ready ? (
              <Link
                href={`/calculators/${tool.slug}`}
                className="text-[1.02rem] font-semibold"
              >
                {tool.title}
              </Link>
            ) : (
              <span className="text-[1.02rem] font-semibold text-muted">
                {tool.title}
              </span>
            )}
            <p className="mt-0.5 text-[0.94rem] text-subtle">
              {tool.question}
            </p>
            {!tool.ready && (
              <p className="mt-0.5 text-[0.85rem] text-muted">
                Being built. It goes up once the maths is tested.
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
