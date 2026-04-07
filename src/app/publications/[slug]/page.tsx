import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/publications/portable-text";
import { PublicationSections } from "@/components/publications/publication-sections";
import {
  documentTypeLabel,
  formatPublicationDate,
  type Publication,
} from "@/lib/publications";
import {
  getPublicationBySlug,
  getPublicationSlugs,
} from "@/lib/sanity/publications";
import { urlForImage } from "@/lib/sanity/image";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getPublicationSlugs();
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

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

function resolvePortraitSrc(
  portrait: Publication["author"]["portrait"],
): string | null {
  if (!portrait) return null;
  if (portrait.url) return portrait.url;
  const built = urlForImage(portrait);
  if (!built) return null;
  return built.width(256).height(256).fit("crop").auto("format").url();
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  const isLegalOpinion = publication.documentType === "legal-opinion";
  const portraitSrc = resolvePortraitSrc(publication.author.portrait);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-12 md:px-10 lg:px-12">
      <article className="publication-article">
        {/* Header */}
        <header className="space-y-6">
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

          <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-[var(--foreground)] md:text-6xl">
            {publication.title}
          </h1>

          {publication.matterSubheading ? (
            <p className="font-serif text-xl italic text-[var(--muted-strong)] md:text-2xl">
              {publication.matterSubheading}
            </p>
          ) : null}

          <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">
            {publication.excerpt}
          </p>

          {publication.focusAreas.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {publication.focusAreas.map((area) => (
                <span key={area} className="publication-chip">
                  {area}
                </span>
              ))}
            </div>
          ) : null}

          {/* Author byline */}
          <div className="flex items-center gap-4 border-t border-[var(--border-soft)] pt-6">
            {portraitSrc ? (
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[var(--border-soft)] bg-[var(--surface)]">
                <Image
                  src={portraitSrc}
                  alt={publication.author.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">
                {publication.author.name}
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                {publication.author.role}
              </p>
            </div>
          </div>
        </header>

        {/* Legal opinion: recipients + matter + notice */}
        {isLegalOpinion ? (
          <section className="mt-10 space-y-8 border-t border-[var(--border-soft)] pt-10">
            <p className="text-sm text-[var(--muted-strong)]">
              {formatPublicationDate(publication.publishedAt)}
            </p>

            {publication.recipients && publication.recipients.length > 0 ? (
              <div>
                <p className="font-serif text-lg font-semibold text-[var(--foreground)] underline underline-offset-4">
                  Parties Directly Involved
                </p>
                <ul className="mt-4 space-y-2 text-base leading-7 text-[var(--muted)]">
                  {publication.recipients.map((recipient, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--foreground)]" />
                      <span>
                        {recipient.title}
                        {recipient.organisation ? `, ${recipient.organisation}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {publication.salutation ? (
              <p className="text-base text-[var(--foreground)]">
                {publication.salutation}
              </p>
            ) : null}

            {publication.matterHeading ? (
              <div className="space-y-1">
                <p className="font-serif text-lg font-semibold text-[var(--foreground)] underline underline-offset-4">
                  Matter: {publication.matterHeading}
                </p>
                {publication.matterSubheading ? (
                  <p className="font-serif text-lg font-semibold text-[var(--foreground)] underline underline-offset-4">
                    {publication.matterSubheading}
                  </p>
                ) : null}
              </div>
            ) : null}

            {publication.importantNotice && publication.importantNotice.length > 0 ? (
              <aside className="rounded-2xl border-l-4 border-[var(--accent)] bg-[var(--surface)] p-6">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted-strong)]">
                  Important Notice
                </p>
                <div className="mt-3">
                  <RichText value={publication.importantNotice} />
                </div>
              </aside>
            ) : null}
          </section>
        ) : null}

        {/* Body */}
        <div className="mt-10 border-t border-[var(--border-soft)] pt-10">
          <PublicationSections sections={publication.sections} />
        </div>

        {/* Signature block (legal opinions) */}
        {isLegalOpinion ? (
          <footer className="mt-12 border-t border-[var(--border-soft)] pt-10">
            <div className="max-w-md space-y-3">
              <p className="text-base text-[var(--muted)]">Signed,</p>
              <p className="font-serif text-xl font-semibold text-[var(--foreground)]">
                {publication.author.name}
                {publication.author.credentials ? (
                  <span className="font-normal italic text-[var(--muted)]">
                    , {publication.author.credentials}
                  </span>
                ) : null}
              </p>
              {publication.author.forFirm ? (
                <p className="text-sm italic text-[var(--muted)]">
                  For: {publication.author.forFirm}
                </p>
              ) : null}
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted-strong)]">
                {publication.author.role}
              </p>

              {publication.serialNumber || publication.signedAt ? (
                <p className="pt-6 text-xs text-[var(--muted-strong)]">
                  {publication.signedAt
                    ? `Digitally signed on ${formatPublicationDate(publication.signedAt)}`
                    : null}
                  {publication.serialNumber ? (
                    <>
                      {" · "}
                      <span className="font-mono">{publication.serialNumber}</span>
                    </>
                  ) : null}
                </p>
              ) : null}
            </div>
          </footer>
        ) : null}

        {/* Summary points sidebar-style card (all doc types) */}
        {publication.summaryPoints && publication.summaryPoints.length > 0 ? (
          <section className="mt-12 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-8 md:px-10">
            <p className="eyebrow">Key Takeaways</p>
            <ul className="mt-4 space-y-3 text-base leading-7 text-[var(--muted)]">
              {publication.summaryPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>

      <section className="grid gap-5 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="space-y-2">
          <p className="eyebrow">Continue Reading</p>
          <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
            Explore more legal insights, reports, and commentary from the firm&apos;s
            editorial desk.
          </p>
        </div>
        <Link href="/publications" className="button-primary">
          All Publications
        </Link>
      </section>
    </main>
  );
}
