import Link from "next/link";
import {
  firmHighlights,
  firmMission,
  firmVision,
  practiceAreas,
  valueProposition,
} from "@/lib/site-data";
import {
  documentTypeLabel,
  formatPublicationDate,
} from "@/lib/publications";
import {
  getFeaturedPublications,
  getPublications,
} from "@/lib/sanity/publications";

export default async function Home() {
  const allPublications = await getPublications();
  const featuredPublications = getFeaturedPublications(allPublications, 2);
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-24 px-6 py-10 md:px-10 lg:px-12">
      <section className="hero-shell overflow-hidden rounded-[2rem] border border-white/50 px-6 py-10 shadow-[0_30px_80px_rgba(18,29,33,0.16)] md:px-10 md:py-14">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-[var(--border-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted-strong)]">
            Business, Litigation, Regulatory, and Emerging Sector Lawyers in Nigeria
          </div>
          <div className="space-y-6">
            <h1 className="max-w-5xl font-serif text-5xl leading-[0.95] font-semibold text-[var(--foreground)] md:text-7xl">
              Clear, strategic legal counsel in Nigeria.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[var(--muted)] md:text-xl">
              Barristers and Solicitors advising on litigation, business law, regulation, and emerging sectors.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link className="button-primary" href="/contact">
              Contact the Firm
            </Link>
            <Link className="button-secondary" href="/publications">
              Read Publications
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {firmHighlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl border border-[var(--border-soft)] bg-white/80 px-4 py-4 text-sm leading-7 text-[var(--muted)]"
              >
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {[
          {
            title: "Vision",
            text: firmVision,
          },
          {
            title: "Mission",
            text: firmMission,
          },
          {
            title: "Pledge",
            text: "Creative solutions delivered on time and on budget.",
          },
        ].map((item) => (
          <article key={item.title} className="card">
            <p className="eyebrow">{item.title}</p>
            <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
              {item.text}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <p className="eyebrow">Why The Firm Matters</p>
          <h2 className="section-title">
            Legal work grounded in business reality, regulatory awareness, and disciplined execution.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            {
              title: "National and international perspective",
              text: "Advice informed by Nigerian practice and international legal exposure.",
            },
            {
              title: "Broad sector reach",
              text: "Experience across corporations, financial institutions, service businesses, and oil and gas participants.",
            },
            {
              title: "Research-led advice",
              text: "Research-driven counsel that is timely, relevant, and tailored.",
            },
            {
              title: "Commercial pragmatism",
              text: "Practical solutions with efficient turnaround and budget awareness.",
            },
          ].map((item) => (
            <article key={item.title} className="card">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-8 md:grid-cols-[0.85fr_1.15fr] md:px-10">
        <div className="space-y-3">
          <p className="eyebrow">Value Proposition</p>
          <h2 className="section-title">What clients should expect from the firm&apos;s work.</h2>
        </div>
        <div className="grid gap-4">
          {valueProposition.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[var(--border-soft)] bg-white/80 px-5 py-5 text-base leading-7 text-[var(--muted)]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="eyebrow">Practice Areas</p>
            <h2 className="section-title max-w-4xl">
              Legal services spanning litigation, advisory, public law, and emerging sectors.
            </h2>
          </div>
          <Link
            href="/practice-areas"
            className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)] transition hover:text-[var(--foreground)]"
          >
            Explore all areas
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {practiceAreas.map((area) => (
            <article key={area.title} className="card">
              <h3 className="text-2xl font-semibold text-[var(--foreground)]">
                {area.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                {area.summary}
              </p>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-[var(--muted-strong)]">
                {area.matters.map((matter) => (
                  <li key={matter} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                    <span>{matter}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="eyebrow">Recent Publications</p>
            <h2 className="section-title max-w-3xl">
              A credible platform for legal opinions, public-interest commentary, and regulatory analysis.
            </h2>
          </div>
          <Link
            href="/publications"
            className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)] transition hover:text-[var(--foreground)]"
          >
            See all writing
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {featuredPublications.map((publication) => (
            <article key={publication.slug} className="card">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted-strong)]">
                <span>{publication.category?.title ?? "Uncategorised"}</span>
                <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                <span>{documentTypeLabel(publication.documentType)}</span>
                <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                <span>{formatPublicationDate(publication.publishedAt)}</span>
              </div>
              <h3 className="mt-5 font-serif text-3xl font-semibold leading-tight text-[var(--foreground)]">
                {publication.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[var(--muted)]">
                {publication.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {publication.focusAreas.map((area) => (
                  <span key={area} className="publication-chip">
                    {area}
                  </span>
                ))}
              </div>
              <Link
                className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)] transition hover:text-[var(--foreground)]"
                href={`/publications/${publication.slug}`}
              >
                Read publication
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
