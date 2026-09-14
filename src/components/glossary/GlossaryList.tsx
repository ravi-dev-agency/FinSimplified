"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { glossary } from "@/data/glossary";

export default function GlossaryList() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return glossary;
    return glossary.filter(
      (t) =>
        t.term.toLowerCase().includes(q) || t.short.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div>
      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a term, or what it means"
          aria-label="Search glossary"
          className="w-full border border-rule bg-page py-2 pr-3 pl-9 text-[0.98rem] text-ink placeholder:text-muted focus:border-rule-strong focus:outline-none"
        />
      </div>

      {glossary.length === 0 ? (
        <p className="mt-8 text-sm text-subtle">
          The glossary is being written. Terms will appear here as the chapters
          that use them are published.
        </p>
      ) : results.length === 0 ? (
        <p className="mt-8 text-sm text-subtle">
          Nothing matches &ldquo;{query}&rdquo; yet. Tell us and we&apos;ll add it.
        </p>
      ) : (
        <dl className="mt-6 border-t border-rule">
          {results.map((t) => (
            <div key={t.term} className="border-b border-rule py-4">
              <dt className="font-heading text-[15px] font-medium text-ink">
                {t.term}
              </dt>
              <dd className="mt-1 text-[15px] leading-relaxed text-body">
                {t.short}
                {t.example && (
                  <span className="mt-1 block text-sm text-subtle">
                    {t.example}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
