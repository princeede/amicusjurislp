import type { PortableTextBlock } from "@portabletext/react";

// ----------------------------------------------------------------------------
// Author / Partner
// ----------------------------------------------------------------------------

export type SanityImageRef = {
  _type?: "image";
  asset?: { _ref?: string; _type?: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  // When serialised from the static fallback we use a plain URL string instead
  url?: string;
  alt?: string;
};

export type Author = {
  _id?: string;
  slug: string;
  name: string;
  role: string;
  order?: number;

  portrait?: SanityImageRef | null;

  shortBio: string;
  fullBio?: PortableTextBlock[];
  expertise: string[];

  // Signature block (legal opinions)
  credentials?: string;
  forFirm?: string;
  signatureImage?: SanityImageRef | null;
  sealImage?: SanityImageRef | null;
  nbaScn?: string;
  nbaValidUntil?: string;

  // Social
  email?: string;
  linkedin?: string;
  twitter?: string;
};

// ----------------------------------------------------------------------------
// Category
// ----------------------------------------------------------------------------

export type Category = {
  _id?: string;
  slug: string;
  title: string;
  description?: string;
  order?: number;
};

// ----------------------------------------------------------------------------
// Publication sections (the building blocks of the body)
// ----------------------------------------------------------------------------

export type SectionHeading = {
  _type: "sectionHeading";
  level: 2 | 3;
  text: string;
  number?: string;
};

export type SectionParagraph = {
  _type: "sectionParagraph";
  content: PortableTextBlock[];
};

export type SectionBulletList = {
  _type: "sectionBulletList";
  items: { content: PortableTextBlock[] }[];
};

export type SectionNumberedList = {
  _type: "sectionNumberedList";
  items: {
    title?: string;
    content: PortableTextBlock[];
  }[];
};

export type SectionBlockquote = {
  _type: "sectionBlockquote";
  content: PortableTextBlock[];
  attribution?: string;
};

export type SectionImage = {
  _type: "sectionImage";
  image: SanityImageRef;
  alt: string;
  caption?: string;
};

export type SectionCallout = {
  _type: "sectionCallout";
  variant: "notice" | "warning" | "info";
  title?: string;
  content: PortableTextBlock[];
};

export type PublicationSection =
  | SectionHeading
  | SectionParagraph
  | SectionBulletList
  | SectionNumberedList
  | SectionBlockquote
  | SectionImage
  | SectionCallout;

// ----------------------------------------------------------------------------
// Publication
// ----------------------------------------------------------------------------

export type PublicationDocumentType =
  | "legal-opinion"
  | "commentary"
  | "report"
  | "brief";

export type Recipient = {
  title: string;
  organisation?: string;
};

export type Publication = {
  _id?: string;
  slug: string;
  title: string;
  documentType: PublicationDocumentType;

  author: Author;
  coAuthors?: Author[];
  category: Category;
  focusAreas: string[];

  publishedAt: string; // ISO date
  readingTime?: string;
  featured?: boolean;

  excerpt: string;
  coverImage?: SanityImageRef | null;
  seoDescription: string;
  shareMessage?: string;
  summaryPoints?: string[];

  // Legal opinion specific
  matterHeading?: string;
  matterSubheading?: string;
  recipients?: Recipient[];
  salutation?: string;
  importantNotice?: PortableTextBlock[];
  signedAt?: string;
  serialNumber?: string;

  // Body
  sections: PublicationSection[];
};

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

export function formatPublicationDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function documentTypeLabel(type: PublicationDocumentType): string {
  switch (type) {
    case "legal-opinion":
      return "Public Interest Legal Opinion";
    case "report":
      return "Insight Report";
    case "brief":
      return "Issue Brief";
    case "commentary":
    default:
      return "Legal Commentary";
  }
}

export function getPublicationCategories(entries: Publication[]): Record<string, number> {
  return entries.reduce<Record<string, number>>((categories, publication) => {
    const key = publication.category?.title ?? "Uncategorised";
    categories[key] = (categories[key] ?? 0) + 1;
    return categories;
  }, {});
}
