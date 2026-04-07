import Link from "next/link";
import {
  documentTypeLabel,
  formatPublicationDate,
  type Publication,
} from "@/lib/publications";

type PublicationCardProps = {
  publication: Publication;
};

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <article className="publication-card">
      <div className="publication-meta">
        <span>{publication.category?.title ?? "Uncategorised"}</span>
        <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
        <span>{documentTypeLabel(publication.documentType)}</span>
        <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
        <span>{formatPublicationDate(publication.publishedAt)}</span>
        {publication.readingTime ? (
          <>
            <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
            <span>{publication.readingTime}</span>
          </>
        ) : null}
      </div>

      <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-[var(--foreground)]">
        {publication.title}
      </h2>

      {publication.matterSubheading ? (
        <p className="mt-3 font-serif text-lg italic text-[var(--muted-strong)]">
          {publication.matterSubheading}
        </p>
      ) : null}

      <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--muted)]">
        {publication.excerpt}
      </p>

      {publication.focusAreas.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {publication.focusAreas.map((area) => (
            <span key={area} className="publication-chip">
              {area}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 border-t border-[var(--border-soft)] pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted-strong)]">
            By
          </p>
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
            {publication.author.name}
            {publication.author.role ? (
              <span className="text-[var(--muted-strong)]"> · {publication.author.role}</span>
            ) : null}
          </p>
        </div>
        <Link className="button-secondary" href={`/publications/${publication.slug}`}>
          Read Publication
        </Link>
      </div>
    </article>
  );
}
