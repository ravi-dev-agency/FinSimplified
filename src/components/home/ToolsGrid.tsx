import Link from "next/link";
import { tools } from "@/data/tools";

export default function ToolsList() {
  return (
    <ul>
      {tools.map((tool) => (
        <li
          key={tool.slug}
          className="flex flex-wrap items-baseline gap-x-3 border-t border-rule py-2.5 last:border-b"
        >
          {tool.ready ? (
            <Link href={`/calculators/${tool.slug}`} className="text-[0.98rem]">
              {tool.title}
            </Link>
          ) : (
            <span className="text-[0.98rem] text-muted">{tool.title}</span>
          )}
          <span className="flex-1 text-[0.9rem] text-subtle">
            {tool.question}
          </span>
          {!tool.ready && (
            <span className="text-[0.85rem] text-muted">being built</span>
          )}
        </li>
      ))}
    </ul>
  );
}
