import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[720px] px-4 py-20 text-center md:px-8">
      <h1 className="text-2xl">That page isn&apos;t here</h1>
      <p className="mt-3 text-body">
        It may not be written yet. Most of this site is still being built.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Link href="/learn" className="text-sm text-link hover:text-link-hover">
          Browse the lessons
        </Link>
        <Link href="/calculators" className="text-sm text-link hover:text-link-hover">
          See the calculators
        </Link>
      </div>
    </section>
  );
}
