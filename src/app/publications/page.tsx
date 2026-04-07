import type { Metadata } from "next";
import Link from "next/link";
import { PublicationCard } from "@/components/publications/publication-card";
import {
  documentTypeLabel,
  formatPublicationDate,
  getPublicationCategories,
} from "@/lib/publications";
import { getPublications } from "@/lib/sanity/publications";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Explore legal insights, issue briefs, and report-style publications from Amicus Juris LP on governance, policy, regulation, and public-interest matters in Nigeria.",
};

export default async function PublicationsPage() {
  const publications = await getPublications();
  const featuredPublication = publications.find((publication) => publication.featured);
  const categories = Object.entries(getPublicationCategories(publications));

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
              <span>{featuredPublication.category?.title ?? "Uncategorised"}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              <span>{documentTypeLabel(featuredPublication.documentType)}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              <span>{formatPublicationDate(featuredPublication.publishedAt)}</span>
            </div>
            <h2 className="font-serif text-5xl font-semibold leading-[0.95] text-[var(--foreground)] md:text-6xl">
              {featuredPublication.title}
            </h2>
            {featuredPublication.matterSubheading ? (
              <p className="font-serif text-xl italic text-[var(--muted-strong)]">
                {featuredPublication.matterSubheading}
              </p>
            ) : null}
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
                Read the full publication
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-[1.75rem] border border-[var(--border-soft)] bg-white/74 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--muted-strong)]">
                By
              </p>
              <p className="mt-3 text-base leading-8 text-[var(--muted)]">
                {featuredPublication.author.name}
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                {featuredPublication.author.role}
              </p>
            </div>
            {featuredPublication.summaryPoints &&
            featuredPublication.summaryPoints.length > 0 ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--muted-strong)]">
                  Key Takeaways
                </p>
                <ul className="publication-list mt-4">
                  {featuredPublication.summaryPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {publications.length > 0 ? (
        <>
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
        </>
      ) : (
        <section className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-16 text-center md:px-10">
          <p className="eyebrow">Coming Soon</p>
          <h2 className="section-title mt-4 max-w-2xl mx-auto">
            New publications from the firm will appear here shortly.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base leading-7 text-[var(--muted)]">
            The firm is preparing its first wave of legal opinions, commentaries,
            and reports. Check back soon, or get in touch to discuss a matter directly.
          </p>
          <div className="mt-8 flex justify-center">
            <Link className="button-primary" href="/contact">
              Contact the Firm
            </Link>
          </div>
        </section>
      )}

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
