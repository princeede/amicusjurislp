import { defineArrayMember, defineField, defineType } from "sanity";
import { portableTextBlock } from "./portableText";

/**
 * Section object types — the structured building blocks of a publication body.
 *
 * Unlike the previous "blocks" model which was oriented around blog-style
 * tiles (stats, timelines, CTAs), these sections model the grammar of a
 * formal legal document: headings, paragraphs, bullet and numbered lists,
 * blockquotes, images, and callouts.
 */

const sectionHeadingType = defineType({
  name: "sectionHeading",
  title: "Heading",
  type: "object",
  fields: [
    defineField({
      name: "level",
      title: "Heading Level",
      type: "number",
      options: {
        list: [
          { title: "H2 — Section title", value: 2 },
          { title: "H3 — Sub-section title", value: 3 },
        ],
        layout: "radio",
      },
      initialValue: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "number",
      title: "Number",
      type: "string",
      description:
        "Optional numbering prefix (e.g. '1.', '2.', 'A.'). Leave blank for unnumbered headings.",
    }),
  ],
  preview: {
    select: { text: "text", level: "level", number: "number" },
    prepare({ text, level, number }) {
      const prefix = number ? `${number} ` : "";
      return {
        title: `${prefix}${text}`,
        subtitle: `H${level}`,
      };
    },
  },
});

const sectionParagraphType = defineType({
  name: "sectionParagraph",
  title: "Paragraph",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [portableTextBlock],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { content: "content" },
    prepare({ content }) {
      const block = Array.isArray(content) ? content[0] : null;
      const children = block?.children as { text?: string }[] | undefined;
      const text = children?.map((child) => child.text ?? "").join(" ") ?? "";
      return {
        title: text.slice(0, 80) || "(empty paragraph)",
        subtitle: "Paragraph",
      };
    },
  },
});

const sectionBulletListType = defineType({
  name: "sectionBulletList",
  title: "Bullet List",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "bulletItem",
          fields: [
            defineField({
              name: "content",
              title: "Item Content",
              type: "array",
              of: [portableTextBlock],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: { content: "content" },
            prepare({ content }) {
              const block = Array.isArray(content) ? content[0] : null;
              const children = block?.children as { text?: string }[] | undefined;
              const text = children?.map((c) => c.text ?? "").join(" ") ?? "";
              return { title: text.slice(0, 80) || "(empty item)" };
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare({ items }) {
      return {
        title: `Bullet list (${Array.isArray(items) ? items.length : 0} items)`,
      };
    },
  },
});

const sectionNumberedListType = defineType({
  name: "sectionNumberedList",
  title: "Numbered List",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "numberedItem",
          fields: [
            defineField({
              name: "title",
              title: "Item Title (optional)",
              type: "string",
            }),
            defineField({
              name: "content",
              title: "Item Content",
              type: "array",
              of: [portableTextBlock],
              validation: (rule) => rule.required().min(1),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { items: "items" },
    prepare({ items }) {
      return {
        title: `Numbered list (${Array.isArray(items) ? items.length : 0} items)`,
      };
    },
  },
});

const sectionBlockquoteType = defineType({
  name: "sectionBlockquote",
  title: "Blockquote",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Quote Content",
      type: "array",
      of: [portableTextBlock],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "attribution",
      title: "Attribution",
      type: "string",
      description: "Optional attribution line (e.g. 'Oputa JSC').",
    }),
  ],
  preview: {
    select: { attribution: "attribution" },
    prepare({ attribution }) {
      return {
        title: "Blockquote",
        subtitle: attribution ?? undefined,
      };
    },
  },
});

const sectionImageType = defineType({
  name: "sectionImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "caption", media: "image" },
    prepare({ title, media }) {
      return {
        title: title || "Image",
        media,
      };
    },
  },
});

const sectionCalloutType = defineType({
  name: "sectionCallout",
  title: "Callout Box",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Important Notice", value: "notice" },
          { title: "Warning", value: "warning" },
          { title: "Information", value: "info" },
        ],
        layout: "radio",
      },
      initialValue: "info",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title (optional)",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [portableTextBlock],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", variant: "variant" },
    prepare({ title, variant }) {
      return {
        title: title || `${variant ?? "info"} callout`,
        subtitle: "Callout box",
      };
    },
  },
});

export const publicationSectionTypes = [
  sectionHeadingType,
  sectionParagraphType,
  sectionBulletListType,
  sectionNumberedListType,
  sectionBlockquoteType,
  sectionImageType,
  sectionCalloutType,
];

/**
 * Recipient object — used for legal opinions to list formal addressees.
 */
const recipientType = defineType({
  name: "recipient",
  title: "Recipient",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title / Role",
      type: "string",
      description:
        "e.g. 'The Chairman', 'The Honourable Attorney General of the Federation'",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "organisation",
      title: "Organisation",
      type: "string",
      description: "e.g. 'Independent National Electoral Commission (INEC)'",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "organisation" },
  },
});

export const publicationSupportingTypes = [...publicationSectionTypes, recipientType];

/**
 * The main Publication document type.
 *
 * Supports multiple document types:
 * - legal-opinion: formal letter-style document with recipients, matter line,
 *   important notice, numbered sections, and a signature block
 * - commentary: short op-ed-style commentary on a legal or policy issue
 * - report: long-form flagship insight report
 * - brief: rapid-response issue brief
 *
 * Legal-opinion-specific fields are grouped together and only meaningful for
 * that document type.
 */
export const publicationType = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  groups: [
    { name: "core", title: "Core", default: true },
    { name: "body", title: "Body" },
    { name: "legalOpinion", title: "Legal Opinion Fields" },
    { name: "meta", title: "Metadata & SEO" },
  ],
  fields: [
    // --- Core ---
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The main title of the publication.",
      group: "core",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      group: "core",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "documentType",
      title: "Document Type",
      type: "string",
      options: {
        list: [
          { title: "Legal Opinion (formal letter format)", value: "legal-opinion" },
          { title: "Commentary", value: "commentary" },
          { title: "Insight Report", value: "report" },
          { title: "Issue Brief", value: "brief" },
        ],
        layout: "radio",
      },
      initialValue: "commentary",
      description:
        "Drives which web layout and PDF brochure template is used. Legal opinions render with letterhead, recipients, salutation, and a signature block.",
      group: "core",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      description: "Primary author. Their signature block is used on legal opinions.",
      group: "core",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coAuthors",
      title: "Co-Authors",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "author" }] })],
      group: "core",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "core",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "focusAreas",
      title: "Focus Areas",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description: "Searchable tags (e.g. 'Governance', 'Elections').",
      group: "core",
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "core",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time",
      type: "string",
      description: "e.g. '6 min read'",
      group: "core",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      group: "core",
    }),

    // --- Meta / SEO ---
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on listing pages and cards.",
      group: "meta",
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      description: "Optional hero image shown on the publication detail page.",
      group: "meta",
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt Text" }),
      ],
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      group: "meta",
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "shareMessage",
      title: "Share Message",
      type: "text",
      rows: 2,
      description: "Suggested message when sharing to social media.",
      group: "meta",
    }),
    defineField({
      name: "summaryPoints",
      title: "Key Takeaways",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Short bullet summary shown in the sidebar.",
      group: "meta",
    }),

    // --- Legal Opinion specific ---
    defineField({
      name: "matterHeading",
      title: "Matter Heading",
      type: "string",
      description:
        "The bold 'Matter:' label line, e.g. 'Letter of Public Interest'. Legal opinions only.",
      group: "legalOpinion",
      hidden: ({ document }) => document?.documentType !== "legal-opinion",
    }),
    defineField({
      name: "matterSubheading",
      title: "Matter Subheading",
      type: "string",
      description:
        "Optional second line, e.g. 'INEC and the ADC Leadership Crisis: Status Quo or Status Confusion?'",
      group: "legalOpinion",
      hidden: ({ document }) => document?.documentType !== "legal-opinion",
    }),
    defineField({
      name: "recipients",
      title: "Parties Directly Involved",
      type: "array",
      of: [defineArrayMember({ type: "recipient" })],
      description: "Formal addressees of the legal opinion.",
      group: "legalOpinion",
      hidden: ({ document }) => document?.documentType !== "legal-opinion",
    }),
    defineField({
      name: "salutation",
      title: "Salutation",
      type: "string",
      description: "e.g. 'Dear Sirs,'",
      initialValue: "Dear Sirs,",
      group: "legalOpinion",
      hidden: ({ document }) => document?.documentType !== "legal-opinion",
    }),
    defineField({
      name: "importantNotice",
      title: "Important Notice",
      type: "array",
      of: [portableTextBlock],
      description:
        "Disclaimer block shown in a highlighted box. Supports rich text.",
      group: "legalOpinion",
      hidden: ({ document }) => document?.documentType !== "legal-opinion",
    }),
    defineField({
      name: "signedAt",
      title: "Signed At",
      type: "datetime",
      description: "Timestamp embedded in the verification line of the PDF.",
      group: "legalOpinion",
      hidden: ({ document }) => document?.documentType !== "legal-opinion",
    }),
    defineField({
      name: "serialNumber",
      title: "Serial Number",
      type: "string",
      description:
        "Unique verification serial shown on the PDF footer (e.g. SN-260403101222-5808). Generate once and leave.",
      group: "legalOpinion",
      hidden: ({ document }) => document?.documentType !== "legal-opinion",
    }),

    // --- Body ---
    defineField({
      name: "sections",
      title: "Body Sections",
      type: "array",
      of: publicationSectionTypes.map((typeDef) =>
        defineArrayMember({ type: typeDef.name }),
      ),
      description:
        "Ordered list of content sections. Mix headings, paragraphs, lists, blockquotes, images, and callouts.",
      group: "body",
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  orderings: [
    {
      title: "Published (newest first)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      documentType: "documentType",
      authorName: "author.name",
      media: "coverImage",
    },
    prepare({ title, documentType, authorName, media }) {
      const typeLabel =
        documentType === "legal-opinion"
          ? "Legal Opinion"
          : documentType === "report"
            ? "Report"
            : documentType === "brief"
              ? "Brief"
              : "Commentary";
      return {
        title,
        subtitle: authorName ? `${typeLabel} · ${authorName}` : typeLabel,
        media,
      };
    },
  },
});
