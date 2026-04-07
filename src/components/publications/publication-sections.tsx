import Image from "next/image";
import type { PublicationSection, SanityImageRef } from "@/lib/publications";
import { urlForImage } from "@/lib/sanity/image";
import { RichText } from "./portable-text";

function resolveImageSrc(image: SanityImageRef): string | null {
  if (image.url) return image.url;
  const built = urlForImage(image);
  if (!built) return null;
  return built.width(1600).fit("max").auto("format").url();
}

const calloutStyles: Record<
  "notice" | "warning" | "info",
  { bg: string; border: string; label: string }
> = {
  notice: {
    bg: "bg-[var(--surface)]",
    border: "border-[var(--accent)]",
    label: "Important Notice",
  },
  warning: {
    bg: "bg-red-50/60",
    border: "border-red-400",
    label: "Warning",
  },
  info: {
    bg: "bg-blue-50/60",
    border: "border-blue-400",
    label: "Information",
  },
};

type Props = {
  sections: PublicationSection[];
};

export function PublicationSections({ sections }: Props) {
  return (
    <div className="publication-body">
      {sections.map((section, index) => {
        switch (section._type) {
          case "sectionHeading": {
            const key = `heading-${index}`;
            if (section.level === 3) {
              return (
                <h3
                  key={key}
                  className="mt-10 text-lg font-semibold text-[var(--foreground)]"
                >
                  {section.number ? (
                    <span className="mr-2 text-[var(--accent)]">
                      {section.number}
                    </span>
                  ) : null}
                  {section.text}
                </h3>
              );
            }
            return (
              <h2
                key={key}
                className="mt-12 font-serif text-3xl font-semibold leading-tight text-[var(--foreground)] md:text-4xl"
              >
                {section.number ? (
                  <span className="mr-3 text-[var(--accent)]">
                    {section.number}
                  </span>
                ) : null}
                {section.text}
              </h2>
            );
          }

          case "sectionParagraph":
            return <RichText key={`paragraph-${index}`} value={section.content} />;

          case "sectionBulletList":
            return (
              <ul
                key={`bullet-${index}`}
                className="mt-5 space-y-3 pl-0 text-[1.02rem] leading-8 text-[var(--muted)]"
              >
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3">
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                    <div className="flex-1">
                      <RichText value={item.content} />
                    </div>
                  </li>
                ))}
              </ul>
            );

          case "sectionNumberedList":
            return (
              <ol
                key={`numbered-${index}`}
                className="mt-5 space-y-5 pl-0 text-[1.02rem] leading-8 text-[var(--muted)]"
              >
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white/70 text-sm font-semibold text-[var(--accent)]">
                      {itemIndex + 1}
                    </span>
                    <div className="flex-1">
                      {item.title ? (
                        <h4 className="font-semibold text-[var(--foreground)]">
                          {item.title}
                        </h4>
                      ) : null}
                      <RichText value={item.content} />
                    </div>
                  </li>
                ))}
              </ol>
            );

          case "sectionBlockquote":
            return (
              <blockquote
                key={`quote-${index}`}
                className="mt-8 border-l-4 border-[var(--accent)] bg-white/60 px-6 py-5 italic text-[var(--foreground)]"
              >
                <RichText value={section.content} />
                {section.attribution ? (
                  <footer className="mt-3 text-xs font-semibold uppercase not-italic tracking-[0.22em] text-[var(--muted-strong)]">
                    — {section.attribution}
                  </footer>
                ) : null}
              </blockquote>
            );

          case "sectionImage": {
            const src = resolveImageSrc(section.image);
            if (!src) return null;
            return (
              <figure key={`image-${index}`} className="mt-8">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--border-soft)]">
                  <Image
                    src={src}
                    alt={section.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover"
                  />
                </div>
                {section.caption ? (
                  <figcaption className="mt-3 text-xs italic text-[var(--muted-strong)]">
                    {section.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          }

          case "sectionCallout": {
            const variant = calloutStyles[section.variant] ?? calloutStyles.info;
            return (
              <aside
                key={`callout-${index}`}
                className={`mt-8 rounded-2xl border-l-4 ${variant.border} ${variant.bg} p-6`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted-strong)]">
                  {section.title ?? variant.label}
                </p>
                <div className="mt-2">
                  <RichText value={section.content} />
                </div>
              </aside>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
