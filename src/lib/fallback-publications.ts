import { teamMembers } from "@/lib/site-data";
import type { Author } from "@/lib/publications";

/**
 * Static fallback authors used when Sanity is not configured or returns
 * no author documents. Once partners are added in Studio + published, this
 * data is no longer shown to users.
 *
 * Publications no longer have a static fallback — the publications system
 * is fully Sanity-driven and shows an empty state until content is created.
 */

export const fallbackAuthors: Author[] = teamMembers.map((member, index) => ({
  slug: member.slug,
  name: member.name,
  role: member.role,
  order: index,
  portrait: member.image ? { url: member.image, alt: member.name } : null,
  shortBio: member.bio[0] ?? "",
  expertise: member.expertise,
  linkedin: member.socials?.linkedin,
  twitter: member.socials?.twitter,
  credentials:
    member.slug === "olanrewaju-sulaiman-lawal"
      ? "LL.M. (Nottingham Law School, UK), Esq."
      : undefined,
  forFirm: "Amicus-Juris LP",
}));
