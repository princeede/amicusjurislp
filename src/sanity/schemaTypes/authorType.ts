import { defineArrayMember, defineField, defineType } from "sanity";
import { portableTextBlock } from "./portableText";

/**
 * Author document.
 *
 * A single document type that powers BOTH:
 * - The partners/lawyers listing on the About page
 * - The author attribution + signature block on publications
 *
 * Each partner is one author document. The signature-related fields
 * (signatureImage, sealImage, nbaScn) are only used when the author signs
 * a formal legal opinion.
 */
export const authorType = defineType({
  name: "author",
  title: "Author / Partner",
  type: "document",
  groups: [
    { name: "profile", title: "Profile", default: true },
    { name: "bio", title: "Biography" },
    { name: "signature", title: "Signature & Credentials" },
    { name: "social", title: "Social" },
  ],
  fields: [
    // --- Profile ---
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      description: "e.g. Olanrewaju Sulaiman Lawal, Esq.",
      group: "profile",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      group: "profile",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "e.g. 'Senior / Managing Partner', 'Co-Founder / Partner'.",
      group: "profile",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first on the About page.",
      initialValue: 100,
      group: "profile",
    }),
    defineField({
      name: "portrait",
      title: "Portrait Photo",
      type: "image",
      options: { hotspot: true },
      description: "Professional headshot. Shown on the About page.",
      group: "profile",
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
        }),
      ],
    }),

    // --- Biography ---
    defineField({
      name: "shortBio",
      title: "Short Bio",
      type: "text",
      rows: 4,
      description: "One-paragraph summary shown on the About page card.",
      group: "bio",
      validation: (rule) => rule.required().max(600),
    }),
    defineField({
      name: "fullBio",
      title: "Full Biography",
      type: "array",
      of: [portableTextBlock],
      description: "Long-form biography. Supports rich text, lists, links.",
      group: "bio",
    }),
    defineField({
      name: "expertise",
      title: "Practice Areas",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Practice area tags shown as chips on the partner card.",
      options: { layout: "tags" },
      group: "bio",
    }),

    // --- Signature & Credentials (for legal-opinion authorship) ---
    defineField({
      name: "credentials",
      title: "Credentials Line",
      type: "string",
      description:
        "Exact text shown under the name in a signed document, e.g. 'LL.M. (Nottingham Law School, UK), Esq.'",
      group: "signature",
    }),
    defineField({
      name: "forFirm",
      title: "For: Firm Label",
      type: "string",
      description: "e.g. 'Amicus-Juris LP'. Shown in the signature block.",
      initialValue: "Amicus-Juris LP",
      group: "signature",
    }),
    defineField({
      name: "signatureImage",
      title: "Signature Image",
      type: "image",
      description:
        "Transparent-background PNG of the handwritten signature. Used in the downloadable PDF brochure.",
      group: "signature",
    }),
    defineField({
      name: "sealImage",
      title: "NBA Seal Image",
      type: "image",
      description:
        "Nigerian Bar Association seal image. Used in the downloadable PDF brochure.",
      group: "signature",
    }),
    defineField({
      name: "nbaScn",
      title: "NBA SCN Number",
      type: "string",
      description: "e.g. SCN119947",
      group: "signature",
    }),
    defineField({
      name: "nbaValidUntil",
      title: "NBA Seal Valid Until",
      type: "date",
      group: "signature",
    }),

    // --- Social ---
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "social",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "twitter",
      title: "X (Twitter) URL",
      type: "url",
      group: "social",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "portrait",
    },
  },
});
