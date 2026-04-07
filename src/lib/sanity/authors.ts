import type { Author } from "@/lib/publications";
import { fallbackAuthors } from "@/lib/fallback-publications";
import { sanityClient } from "./client";
import { isSanityConfigured } from "./env";
import { authorBySlugQuery, authorsQuery } from "./queries";

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
    return authors?.length ? authors : fallbackAuthors;
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
    return author ?? fallbackAuthors.find((a) => a.slug === slug);
  } catch {
    return fallbackAuthors.find((author) => author.slug === slug);
  }
}
