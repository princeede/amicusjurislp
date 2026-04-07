import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityDataset, sanityProjectId } from "./env";

// Minimal structural type for a Sanity image source — anything with an
// `asset` reference will work. Avoids importing deep package internals.
type SanityImageSource = {
  _type?: string;
  asset?: { _ref?: string; _type?: string } | null;
} & Record<string, unknown>;

// A single image URL builder instance scoped to our project + dataset.
// Safe to import anywhere because it only needs projectId/dataset.
const builder =
  sanityProjectId && sanityDataset
    ? createImageUrlBuilder({
        projectId: sanityProjectId,
        dataset: sanityDataset,
      })
    : null;

/**
 * Build a responsive image URL for a Sanity image reference.
 * Returns null if Sanity isn't configured or the source is missing.
 */
export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!source || !builder) return null;
  return builder.image(source);
}
