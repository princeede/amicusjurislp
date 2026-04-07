import type { Metadata } from "next";
import { fullPracticeAreaList, practiceAreas } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Explore the practice areas of Amicus Juris LP across litigation, commercial law, public law, energy, technology, immigration, and related sectors in Nigeria.",
};

export default function PracticeAreasPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-12 md:px-10 lg:px-12">
      <section className="space-y-5">
        <p className="eyebrow">Practice Areas</p>
        <h1 className="section-title max-w-4xl">
          Legal services spanning core practice areas and emerging sectors.
        </h1>
        <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
          Broad capability across litigation, advisory, public law, sector regulation, and specialized legal support.
        </p>
      </section>

      <section className="grid gap-6">
        {practiceAreas.map((area) => (
          <article
            key={area.title}
            className="card grid gap-6 lg:grid-cols-[1fr_0.8fr]"
          >
            <div>
              <h2 className="font-serif text-4xl font-semibold text-[var(--foreground)]">
                {area.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">
                {area.summary}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-white/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted-strong)]">
                Representative Coverage
              </p>
              <ul className="mt-4 space-y-3 text-base leading-7 text-[var(--muted)]">
                {area.matters.map((matter) => (
                  <li key={matter} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                    <span>{matter}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="card space-y-5">
        <p className="eyebrow">Full Practice List</p>
        <h2 className="section-title max-w-3xl">
          Additional service areas include:
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fullPracticeAreaList.map((area) => (
            <div
              key={area}
              className="rounded-2xl border border-[var(--border-soft)] bg-white/70 px-4 py-4 text-base leading-7 text-[var(--muted)]"
            >
              {area}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
