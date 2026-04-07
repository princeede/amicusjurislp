import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Portable Text configuration used across publications and author bios.
 *
 * Supports:
 * - Headings (H2, H3)
 * - Blockquote
 * - Bullet and numbered lists
 * - Inline marks: strong, em (italic), underline, link
 * - A custom `latinTerm` mark for legal Latin phrases (rendered italic by default)
 */
export const portableTextBlock = defineArrayMember({
  type: "block",
  title: "Paragraph",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "H2", value: "h2" },
    { title: "H3", value: "h3" },
    { title: "Quote", value: "blockquote" },
  ],
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Numbered", value: "number" },
  ],
  marks: {
    decorators: [
      { title: "Strong", value: "strong" },
      { title: "Emphasis", value: "em" },
      { title: "Underline", value: "underline" },
    ],
    annotations: [
      defineField({
        name: "link",
        type: "object",
        title: "Link",
        fields: [
          defineField({
            name: "href",
            type: "url",
            title: "URL",
            validation: (rule) =>
              rule.uri({
                scheme: ["http", "https", "mailto", "tel"],
              }),
          }),
          defineField({
            name: "openInNewTab",
            type: "boolean",
            title: "Open in new tab",
            initialValue: true,
          }),
        ],
      }),
      defineField({
        name: "latinTerm",
        type: "object",
        title: "Latin Term",
        description:
          "Marks a legal Latin phrase (e.g. status quo ante, pro bono). Rendered in italics.",
        fields: [
          defineField({
            name: "note",
            type: "string",
            title: "Optional translation / note",
          }),
        ],
      }),
    ],
  },
});

/**
 * A dedicated type for long-form rich text fields (publication body paragraphs,
 * important notices, author biographies, etc).
 */
export const richTextType = defineType({
  name: "richText",
  title: "Rich Text",
  type: "array",
  of: [portableTextBlock],
});
