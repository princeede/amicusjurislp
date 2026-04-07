import type { Publication } from "@/lib/publications";
import { sanityClient } from "./client";
import { isSanityConfigured } from "./env";
import {
  publicationBySlugQuery,
  publicationsQuery,
} from "./queries";

function sortPublications(entries: Publication[]): Publication[] {
  return [...entries].sort((left, right) =>
    right.publishedAt.localeCompare(left.publishedAt),
  );
}

/**
 * Reject Sanity documents that don't satisfy the new schema contract.
 * Protects the site when the dataset still holds documents from an earlier
 * schema version (e.g. string-typed authors that no longer dereference
 * into full author objects).
 */
function isValidPublication(entry: Publication | null | undefined): entry is Publication {
  if (!entry) return false;
  if (!entry.slug) return false;
  if (!entry.author || typeof entry.author !== "object" || !entry.author.name) {
    return false;
  }
  if (!Array.isArray(entry.sections)) return false;
  return true;
}

/**
 * Coerce null array fields into empty arrays so the rendering layer can
 * safely iterate. Sanity returns null for unset arrays.
 */
function normalizePublication(entry: Publication): Publication {
  return {
    ...entry,
    focusAreas: entry.focusAreas ?? [],
    summaryPoints: entry.summaryPoints ?? [],
    sections: entry.sections ?? [],
    recipients: entry.recipients ?? undefined,
    author: {
      ...entry.author,
      expertise: entry.author?.expertise ?? [],
    },
    coAuthors: entry.coAuthors?.map((author) => ({
      ...author,
      expertise: author.expertise ?? [],
    })),
  };
}

/**
 * Fetch all publications from Sanity. Returns an empty array if Sanity is
 * not configured, unreachable, or has no valid documents.
 */
export async function getPublications(): Promise<Publication[]> {
  if (!isSanityConfigured || !sanityClient) {
    return [];
  }

  try {
    const entries = await sanityClient.fetch<(Publication | null)[]>(
      publicationsQuery,
      {},
      { next: { revalidate: 60, tags: ["publication"] } },
    );
    const valid = (entries ?? []).filter(isValidPublication).map(normalizePublication);
    return sortPublications(valid);
  } catch (error) {
    console.error("Failed to fetch publications from Sanity:", error);
    return [];
  }
}

export async function getPublicationBySlug(
  slug: string,
): Promise<Publication | undefined> {
  if (!isSanityConfigured || !sanityClient) {
    return undefined;
  }

  try {
    const entry = await sanityClient.fetch<Publication | null>(
      publicationBySlugQuery,
      { slug },
      { next: { revalidate: 60, tags: ["publication", `publication:${slug}`] } },
    );
    if (isValidPublication(entry)) return normalizePublication(entry);
    return undefined;
  } catch (error) {
    console.error(`Failed to fetch publication '${slug}' from Sanity:`, error);
    return undefined;
  }
}

export async function getPublicationSlugs(): Promise<{ slug: string }[]> {
  // Use the full-publication fetcher so that only schema-valid documents
  // contribute slugs. This prevents generateStaticParams from emitting
  // paths that would crash at render time.
  const publications = await getPublications();
  return publications.map((publication) => ({ slug: publication.slug }));
}

export function getFeaturedPublications(
  entries: Publication[],
  limit?: number,
): Publication[] {
  const featured = entries.filter((publication) => publication.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}
