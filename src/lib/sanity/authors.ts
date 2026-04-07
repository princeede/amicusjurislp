import type { Author } from "@/lib/publications";
import { fallbackAuthors } from "@/lib/fallback-publications";
import { sanityClient } from "./client";
import { isSanityConfigured } from "./env";
import { authorBySlugQuery, authorsQuery } from "./queries";

/**
 * Coerce null array fields into empty arrays so that the rendering
 * components can iterate without null checks.
 */
function normalizeAuthor(author: Author): Author {
  return {
    ...author,
    expertise: author.expertise ?? [],
  };
}

export async function getAuthors(): Promise<Author[]> {
  if (!isSanityConfigured || !sanityClient) {
    return fallbackAuthors;
  }

  try {
    const authors = await sanityClient.fetch<Author[]>(
      authorsQuery,
      {},
      { next: { revalidate: 300, tags: ["author"] } },
    );
    if (!authors?.length) return fallbackAuthors;
    return authors.map(normalizeAuthor);
  } catch (error) {
    console.error("Failed to fetch authors from Sanity:", error);
    return fallbackAuthors;
  }
}

export async function getAuthorBySlug(
  slug: string,
): Promise<Author | undefined> {
  if (!isSanityConfigured || !sanityClient) {
    return fallbackAuthors.find((author) => author.slug === slug);
  }

  try {
    const author = await sanityClient.fetch<Author | null>(
      authorBySlugQuery,
      { slug },
      { next: { revalidate: 300, tags: ["author", `author:${slug}`] } },
    );
    return author
      ? normalizeAuthor(author)
      : fallbackAuthors.find((a) => a.slug === slug);
  } catch {
    return fallbackAuthors.find((author) => author.slug === slug);
  }
}
