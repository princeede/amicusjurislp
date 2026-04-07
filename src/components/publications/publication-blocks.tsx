import Link from "next/link";
import type { PublicationBlock } from "@/lib/publications";

type PublicationBlocksProps = {
  blocks: PublicationBlock[];
};

export function PublicationBlocks({ blocks }: PublicationBlocksProps) {
  return (
    <div className="publication-blocks">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "richText":
            return (
              <section key={`${block.type}-${index}`} className="publication-block">
                <h2>{block.title}</h2>
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            );
          case "keyPoints":
            return (
              <section
                key={`${block.type}-${index}`}
                className="publication-block rounded-[1.6rem] border border-[var(--border-soft)] bg-white/70 p-6"
              >
                <h2>{block.title}</h2>
                {block.intro ? <p>{block.intro}</p> : null}
                <ul className="publication-list">
                  {block.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </section>
            );
          case "stats":
            return (
              <section key={`${block.type}-${index}`} className="publication-block">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <h2>{block.title}</h2>
                </div>
                <div className="publication-stat-grid">
                  {block.items.map((item) => (
                    <article key={item.label} className="publication-stat-card">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted-strong)]">
                        {item.label}
                      </p>
                      <p className="mt-3 font-serif text-4xl font-semibold text-[var(--foreground)]">
                        {item.value}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                        {item.detail}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            );
          case "timeline":
            return (
              <section key={`${block.type}-${index}`} className="publication-block">
                <h2>{block.title}</h2>
                <div className="publication-timeline">
                  {block.items.map((item) => (
                    <article key={`${item.label}-${item.title}`} className="publication-timeline-item">
                      <p className="publication-step">{item.label}</p>
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--foreground)]">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-base leading-8 text-[var(--muted)]">
                          {item.detail}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          case "quote":
            return (
              <blockquote
                key={`${block.type}-${index}`}
                className="publication-quote"
              >
                <p>{block.quote}</p>
                <footer>{block.attribution}</footer>
              </blockquote>
            );
          case "cta":
            return (
              <section
                key={`${block.type}-${index}`}
                className="publication-cta"
              >
                <div className="space-y-3">
                  <p className="eyebrow">Next Step</p>
                  <h2>{block.title}</h2>
                  <p>{block.body}</p>
                </div>
                <Link href={block.actionHref} className="button-primary">
                  {block.actionLabel}
                </Link>
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
