import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import Link from "next/link";

/**
 * Custom serialisers for Portable Text in publications.
 *
 * - em/strong/underline marks render as native HTML
 * - `latinTerm` annotation mark renders in italics with an optional title attr
 * - `link` annotation renders as Next.js <Link> for internal URLs,
 *   <a target="_blank" rel="noopener"> for external
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-[1.02rem] leading-8 text-[var(--muted)] first:mt-0">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 font-serif text-2xl font-semibold leading-tight text-[var(--foreground)] md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-lg font-semibold text-[var(--foreground)]">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-[var(--accent)] bg-white/60 px-5 py-4 text-base italic leading-7 text-[var(--foreground)]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[var(--foreground)]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    latinTerm: ({ children, value }) => (
      <em
        className="italic"
        title={(value as { note?: string } | undefined)?.note}
      >
        {children}
      </em>
    ),
    link: ({ value, children }) => {
      const href = (value as { href?: string } | undefined)?.href ?? "#";
      const openInNewTab =
        (value as { openInNewTab?: boolean } | undefined)?.openInNewTab ?? true;
      const isExternal = /^https?:\/\//.test(href);

      if (isExternal) {
        return (
          <a
            href={href}
            target={openInNewTab ? "_blank" : undefined}
            rel={openInNewTab ? "noopener noreferrer" : undefined}
            className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--foreground)]"
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          className="text-[var(--accent)] underline underline-offset-2 hover:text-[var(--foreground)]"
        >
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 space-y-2 pl-5 text-[1.02rem] leading-8 text-[var(--muted)] marker:text-[var(--accent)]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-[1.02rem] leading-8 text-[var(--muted)] marker:text-[var(--accent)]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
};

type RichTextProps = {
  value: PortableTextBlock[] | undefined;
  className?: string;
};

export function RichText({ value, className }: RichTextProps) {
  if (!value || value.length === 0) return null;
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
