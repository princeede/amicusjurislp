import type { Publication } from "@/lib/publications";
import {
  fallbackPublications,
  getFallbackPublicationBySlug,
} from "@/lib/fallback-publications";
import { sanityClient } from "./client";
import { isSanityConfigured } from "./env";
import {
  publicationBySlugQuery,
  publicationSlugsQuery,
  publicationsQuery,
} from "./queries";

function sortPublications(entries: Publication[]): Publication[] {
  return [...entries].sort((left, right) =>
    right.publishedAt.localeCompare(left.publishedAt),
  );
}

/**
 * Filter out Sanity documents that don't satisfy the new schema contract.
 * This protects the site when the dataset still holds documents from an
 * earlier schema version (e.g. string-typed authors that no longer
 * dereference into full author objects).
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
 * Fetch all publications from Sanity, falling back to the static sample data
 * if Sanity is not configured, unreachable, or returns an empty dataset.
 */
export async function getPublications(): Promise<Publication[]> {
  if (!isSanityConfigured || !sanityClient) {
    return fallbackPublications;
  }

  try {
    const entries = await sanityClient.fetch<(Publication | null)[]>(
      publicationsQuery,
      {},
      { next: { revalidate: 60, tags: ["publication"] } },
    );
    const valid = (entries ?? []).filter(isValidPublication);
    if (!valid.length) return fallbackPublications;
    return sortPublications(valid);
  } catch (error) {
    console.error("Failed to fetch publications from Sanity:", error);
    return fallbackPublications;
  }
}

export async function getPublicationBySlug(
  slug: string,
): Promise<Publication | undefined> {
  if (!isSanityConfigured || !sanityClient) {
    return getFallbackPublicationBySlug(slug);
  }

  try {
    const entry = await sanityClient.fetch<Publication | null>(
      publicationBySlugQuery,
      { slug },
      { next: { revalidate: 60, tags: ["publication", `publication:${slug}`] } },
    );
    if (isValidPublication(entry)) return entry;
    return getFallbackPublicationBySlug(slug);
  } catch (error) {
    console.error(`Failed to fetch publication '${slug}' from Sanity:`, error);
    return getFallbackPublicationBySlug(slug);
  }
}

export async function getPublicationSlugs(): Promise<{ slug: string }[]> {
  // Use the full-publication fetcher so that only schema-valid documents
  // contribute slugs. This prevents generateStaticParams from emitting
  // paths that would then crash at render time.
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
