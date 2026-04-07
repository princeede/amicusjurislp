import type { Metadata } from "next";
import Image from "next/image";
import {
  brandName,
  firmDescriptionLong,
  firmMission,
  firmValues,
  firmVision,
} from "@/lib/site-data";
import type { Author } from "@/lib/publications";
import { getAuthors } from "@/lib/sanity/authors";
import { urlForImage } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Amicus Juris LP, a partnership of Barristers and Solicitors in Nigeria with broad litigation, advisory, and regulatory capability.",
};

function resolvePortrait(author: Author): string | null {
  const portrait = author.portrait;
  if (!portrait) return null;
  if (portrait.url) return portrait.url;
  const built = urlForImage(portrait);
  if (!built) return null;
  return built.width(800).height(1000).fit("crop").auto("format").url();
}

export default async function AboutPage() {
  const authors = await getAuthors();
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 py-12 md:px-10 lg:px-12">
      <section className="grid gap-8 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-10 md:px-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-5">
          <p className="eyebrow">About The Firm</p>
          <h1 className="section-title">
            {brandName} is a distinguished partnership of Barristers and Solicitors in Nigeria.
          </h1>
        </div>
        <div className="space-y-5 text-base leading-8 text-[var(--muted)]">
          {firmDescriptionLong.slice(0, 2).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <article className="card">
          <p className="eyebrow">Vision</p>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            {firmVision}
          </p>
        </article>
        <article className="card">
          <p className="eyebrow">Mission</p>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            {firmMission}
          </p>
        </article>
      </section>

      <section className="card space-y-5">
        <p className="eyebrow">Values</p>
        <h2 className="section-title max-w-3xl">
          Values that shape the firm&apos;s professional culture.
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {firmValues.map((value) => (
            <div
              key={value}
              className="flex items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-white/70 px-5 py-4 text-base leading-7 text-[var(--foreground)]"
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
              {value}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <p className="eyebrow">Our People</p>
          <h2 className="section-title max-w-3xl">
            Meet the partners and lawyers leading the firm.
          </h2>
          <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
            The firm is led by experienced partners with multi-jurisdictional expertise and a record of delivering practical, business-aware legal counsel.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => {
            const portraitSrc = resolvePortrait(author);
            return (
              <article
                key={author.slug}
                className="card flex flex-col gap-5 !p-0 overflow-hidden"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--surface)]">
                  {portraitSrc ? (
                    <Image
                      src={portraitSrc}
                      alt={`Portrait of ${author.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--foreground)]/85 via-[var(--foreground)]/40 to-transparent p-6">
                    <h3 className="font-serif text-2xl font-semibold leading-tight text-white">
                      {author.name}
                    </h3>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-soft)]">
                      {author.role}
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 px-6 pb-6">
                  <p className="text-sm leading-7 text-[var(--muted)]">
                    {author.shortBio}
                  </p>
                  {author.expertise.length > 0 ? (
                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                      {author.expertise.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[var(--border-soft)] bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted-strong)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {(author.linkedin || author.twitter) ? (
                    <div className="flex items-center gap-3 border-t border-[var(--border-soft)] pt-4">
                      {author.linkedin && (
                        <a
                          href={author.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${author.name} on LinkedIn`}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white/70 text-[var(--muted-strong)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                      {author.twitter && (
                        <a
                          href={author.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${author.name} on X`}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white/70 text-[var(--muted-strong)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
