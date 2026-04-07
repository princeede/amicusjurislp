import type { Metadata } from "next";
import Link from "next/link";
import { PublicationCard } from "@/components/publications/publication-card";
import {
  formatPublicationDate,
  getFeaturedPublications,
  getPublicationCategories,
  publications,
} from "@/lib/publications";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Explore legal insights, issue briefs, and report-style publications from Amicus Juris LP on governance, policy, regulation, and public-interest matters in Nigeria.",
};

const featuredPublication = getFeaturedPublications(1)[0];
const categories = Object.entries(getPublicationCategories());

export default function PublicationsPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-6 py-12 md:px-10 lg:px-12">
      <section className="publication-hero">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <p className="eyebrow">Publications</p>
            <h1 className="section-title max-w-5xl">
              A publication system for legal insights, flagship reports, and
              rapid-response briefs.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
              Legal opinions, regulatory analysis, and public-interest commentary from the firm&apos;s editorial desk. Each publication offers actionable insight for decision-makers across business, governance, and policy.
            </p>
          </div>

          <div className="grid gap-3 rounded-[1.75rem] border border-[var(--border-soft)] bg-white/78 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--muted-strong)]">
              Formats in use
            </p>
            {["Flagship insight reports", "Legal insights", "Issue briefs"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-4 text-sm leading-7 text-[var(--muted)]"
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {featuredPublication ? (
        <section className="publication-feature">
          <div className="space-y-4">
            <p className="eyebrow">Featured publication</p>
            <div className="publication-meta">
              <span>{featuredPublication.category}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              <span>{featuredPublication.reportLabel}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              <span>{formatPublicationDate(featuredPublication.publishedAt)}</span>
            </div>
            <h2 className="font-serif text-5xl font-semibold leading-[0.95] text-[var(--foreground)] md:text-6xl">
              {featuredPublication.title}
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {featuredPublication.excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
              {featuredPublication.focusAreas.map((area) => (
                <span key={area} className="publication-chip">
                  {area}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <Link
                className="button-primary"
                href={`/publications/${featuredPublication.slug}`}
              >
                Read the full report
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-[1.75rem] border border-[var(--border-soft)] bg-white/74 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--muted-strong)]">
                Designed for
              </p>
              <p className="mt-3 text-base leading-8 text-[var(--muted)]">
                {featuredPublication.audience}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--muted-strong)]">
                Summary
              </p>
              <ul className="publication-list mt-4">
                {featuredPublication.summaryPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="space-y-3">
          <p className="eyebrow">Browse by Category</p>
          <h2 className="section-title max-w-4xl">
            Explore publications across governance, policy, and legal analysis.
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(([category, count]) => (
            <span key={category} className="publication-chip">
              {category} ({count})
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-5">
        {publications.map((publication) => (
          <PublicationCard key={publication.slug} publication={publication} />
        ))}
      </section>

      <section className="grid gap-6 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-8 md:grid-cols-[1fr_auto] md:items-center md:px-10">
        <div className="space-y-3">
          <p className="eyebrow">Stay Informed</p>
          <h2 className="section-title max-w-3xl">
            New publications are added regularly as the firm tracks developments in law, governance, and regulation.
          </h2>
        </div>
        <Link className="button-primary" href="/contact">
          Subscribe to Updates
        </Link>
      </section>
    </main>
  );
}
