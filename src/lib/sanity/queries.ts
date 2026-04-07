import { groq } from "next-sanity";

// ----------------------------------------------------------------------------
// Reusable projections
// ----------------------------------------------------------------------------

const authorProjection = `
  _id,
  "slug": slug.current,
  name,
  role,
  order,
  portrait { ..., "alt": coalesce(alt, "") },
  shortBio,
  fullBio,
  expertise,
  credentials,
  forFirm,
  signatureImage,
  sealImage,
  nbaScn,
  nbaValidUntil,
  email,
  linkedin,
  twitter
`;

const categoryProjection = `
  _id,
  "slug": slug.current,
  title,
  description,
  order
`;

/**
 * Sections are projected as-is. The _type discriminator is preserved so the
 * renderer can switch on it. Portable text blocks inside sections pass through
 * with full fidelity (marks, lists, link annotations, latinTerm marks).
 */
const sectionsProjection = `
  sections[]{
    ...,
    _type == "sectionImage" => {
      _type,
      image,
      alt,
      caption
    }
  }
`;

const publicationProjection = `
  _id,
  "slug": slug.current,
  title,
  documentType,
  author->{ ${authorProjection} },
  coAuthors[]->{ ${authorProjection} },
  category->{ ${categoryProjection} },
  focusAreas,
  publishedAt,
  readingTime,
  featured,
  excerpt,
  coverImage { ..., "alt": coalesce(alt, "") },
  seoDescription,
  shareMessage,
  summaryPoints,
  matterHeading,
  matterSubheading,
  recipients,
  salutation,
  importantNotice,
  signedAt,
  serialNumber,
  ${sectionsProjection}
`;

// ----------------------------------------------------------------------------
// Publication queries
// ----------------------------------------------------------------------------

export const publicationsQuery = groq`
  *[_type == "publication" && defined(slug.current)] | order(publishedAt desc) {
    ${publicationProjection}
  }
`;

export const publicationSlugsQuery = groq`
  *[_type == "publication" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const publicationBySlugQuery = groq`
  *[_type == "publication" && slug.current == $slug][0]{
    ${publicationProjection}
  }
`;

// ----------------------------------------------------------------------------
// Author queries
// ----------------------------------------------------------------------------

export const authorsQuery = groq`
  *[_type == "author"] | order(order asc, name asc) {
    ${authorProjection}
  }
`;

export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0]{
    ${authorProjection}
  }
`;
