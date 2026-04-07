import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicationBlocks } from "@/components/publications/publication-blocks";
import {
  formatPublicationDate,
  getPublication,
  publications,
} from "@/lib/publications";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return publications.map((publication) => ({
    slug: publication.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = getPublication(slug);

  if (!publication) {
    return {
      title: "Publication Not Found",
    };
  }

  return {
    title: publication.title,
    description: publication.seoDescription,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const publication = getPublication(slug);

  if (!publication) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 md:px-10 lg:px-12">
      <article className="publication-article">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-6">
            <div className="publication-meta">
              <span>{publication.category}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              <span>{publication.reportLabel}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              <span>{formatPublicationDate(publication.publishedAt)}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              <span>{publication.readingTime}</span>
            </div>
            <h1 className="font-serif text-5xl font-semibold leading-[0.94] text-[var(--foreground)] md:text-7xl">
              {publication.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {publication.excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
              {publication.focusAreas.map((area) => (
                <span key={area} className="publication-chip">
                  {area}
                </span>
              ))}
            </div>
          </div>

          <aside className="publication-sidebar">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted-strong)]">
                  Audience
                </p>
                <p className="mt-3 text-base leading-7 text-[var(--muted)]">
                  {publication.audience}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted-strong)]">
                  By
                </p>
                <p className="mt-3 text-base leading-7 text-[var(--muted)]">
                  {publication.author}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted-strong)]">
                  Key takeaways
                </p>
                <ul className="publication-list mt-4">
                  {publication.summaryPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <PublicationBlocks blocks={publication.blocks} />
      </article>

      <section className="grid gap-5 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="space-y-2">
          <p className="eyebrow">Continue Reading</p>
          <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
            Explore more legal insights, reports, and commentary from the firm&apos;s editorial desk.
          </p>
        </div>
        <Link href="/publications" className="button-primary">
          All Publications
        </Link>
      </section>
    </main>
  );
}
