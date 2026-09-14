import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Content";
import GlossaryList from "@/components/glossary/GlossaryList";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Financial terms explained in one plain sentence each, with Indian rupee examples.",
};

export default function GlossaryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Glossary"
        title="Every term, in one plain sentence."
        intro="If a word on this site confused you, it should be here. If it isn't, that's our mistake."
      />
      <section className="mx-auto max-w-[720px] px-4 py-10 md:px-8 md:py-14">
        <GlossaryList />
      </section>
    </>
  );
}
