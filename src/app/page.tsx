import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import JsonLd, { siteSchema } from "@/components/seo/JsonLd";
import ModuleGrid, { MoreComing } from "@/components/home/ModuleGrid";
import ToolsList from "@/components/home/ToolsGrid";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={siteSchema()} />
      <Hero />

      <section className="mx-auto max-w-[1080px] px-4 pb-16 md:px-6">
        <h2 className="display-sm">Chapters</h2>
        <p className="mt-2 max-w-[52ch] text-subtle">
          Read them in order if you are starting out, or go straight to what
          you need. Each one is a single page.
        </p>
        <div className="mt-10">
          <ModuleGrid />
          <MoreComing />
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto max-w-[1080px] px-4 py-14 md:px-6">
          <h2 className="display-sm">Calculators</h2>
          <p className="mt-2 max-w-[52ch] text-subtle">
            Each one shows the formula it used, and what it leaves out.
          </p>
          <div className="mt-8">
            <ToolsList />
          </div>
        </div>
      </section>
    </>
  );
}
