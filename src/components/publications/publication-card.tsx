import Link from "next/link";
import type { Publication } from "@/lib/publications";
import { formatPublicationDate } from "@/lib/publications";

type PublicationCardProps = {
  publication: Publication;
};

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <article className="publication-card">
      <div className="publication-meta">
        <span>{publication.category}</span>
        <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
        <span>{publication.reportLabel}</span>
        <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
        <span>{formatPublicationDate(publication.publishedAt)}</span>
        <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
        <span>{publication.readingTime}</span>
      </div>
      <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-[var(--foreground)]">
        {publication.title}
      </h2>
      <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--muted)]">
        {publication.excerpt}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {publication.focusAreas.map((area) => (
          <span key={area} className="publication-chip">
            {area}
          </span>
        ))}
      </div>

      <div className="mt-8 grid gap-4 border-t border-[var(--border-soft)] pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted-strong)]">
            Best for
          </p>
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
            {publication.audience}
          </p>
        </div>
        <Link className="button-secondary" href={`/publications/${publication.slug}`}>
          Open Publication
        </Link>
      </div>
    </article>
  );
}
