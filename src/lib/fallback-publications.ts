import type { PortableTextBlock } from "@portabletext/react";
import { teamMembers } from "@/lib/site-data";
import type {
  Author,
  Category,
  Publication,
  PublicationSection,
} from "@/lib/publications";

/**
 * Static fallback data used when Sanity is not configured or returns empty.
 * Once partners are added in Studio + the first publication is authored,
 * this data is no longer shown to users.
 *
 * Structured to match the new schema so the website and renderers work
 * identically regardless of data source.
 */

// ---------- Fallback authors (derived from static team members) ----------

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

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
  // Placeholder credentials for the managing partner so the INEC fallback
  // sample can render its signature block.
  credentials:
    member.slug === "olanrewaju-sulaiman-lawal"
      ? "LL.M. (Nottingham Law School, UK), Esq."
      : undefined,
  forFirm: "Amicus-Juris LP",
}));

// ---------- Fallback categories ----------

export const fallbackCategories: Category[] = [
  { slug: "governance", title: "Governance", order: 1 },
  { slug: "public-interest", title: "Public Interest", order: 2 },
  { slug: "policy", title: "Policy", order: 3 },
];

// ---------- Helper: build a simple PortableText paragraph ----------

function para(text: string, marks?: { italic?: string[] }): PortableTextBlock {
  // Tiny helper that turns plain text into a Portable Text block and
  // italicises listed substrings. Not exhaustive — just enough for the
  // fallback sample to render with a few Latin terms styled.
  const italics = marks?.italic ?? [];

  if (italics.length === 0) {
    return {
      _type: "block",
      style: "normal",
      children: [{ _type: "span", text, marks: [] }],
      markDefs: [],
    } as unknown as PortableTextBlock;
  }

  type Span = { _type: "span"; text: string; marks: string[] };
  const children: Span[] = [];
  let cursor = 0;
  const lowerText = text.toLowerCase();

  while (cursor < text.length) {
    let nextIndex = -1;
    let matchedTerm = "";
    for (const term of italics) {
      const found = lowerText.indexOf(term.toLowerCase(), cursor);
      if (found !== -1 && (nextIndex === -1 || found < nextIndex)) {
        nextIndex = found;
        matchedTerm = text.slice(found, found + term.length);
      }
    }
    if (nextIndex === -1) {
      children.push({ _type: "span", text: text.slice(cursor), marks: [] });
      break;
    }
    if (nextIndex > cursor) {
      children.push({ _type: "span", text: text.slice(cursor, nextIndex), marks: [] });
    }
    children.push({ _type: "span", text: matchedTerm, marks: ["em"] });
    cursor = nextIndex + matchedTerm.length;
  }

  return {
    _type: "block",
    style: "normal",
    children,
    markDefs: [],
  } as unknown as PortableTextBlock;
}

// ---------- Fallback: INEC legal opinion sample ----------

const inecSections: PublicationSection[] = [
  { _type: "sectionHeading", level: 2, text: "Introduction" },
  {
    _type: "sectionParagraph",
    content: [
      para(
        "Some legal expressions are as seemingly simple yet practically complex as status quo ante. The ongoing leadership dispute within the African Democratic Congress (ADC) highlights the challenges of interpreting judicial orders in politically sensitive contexts. At Amicus-Juris LP, we consider it necessary, in the public interest, to provide a reasoned analysis that considers all sides before drawing conclusions.",
        { italic: ["status quo ante", "Amicus-Juris LP"] },
      ),
    ],
  },
  { _type: "sectionHeading", level: 2, text: "Background" },
  {
    _type: "sectionParagraph",
    content: [
      para(
        "Following the popular political realignments of opposition ahead of the 2027 elections, key figures including David Mark and Rauf Aregbesola became associated with the ADC, leading to a leadership transition. This transition has been challenged by a faction led by Bala Gombe, who disputes the validity of his alleged resignation, claiming it was forged or obtained under duress.",
      ),
      para(
        "The Court of Appeal, hearing the matter in interim, directed that parties should maintain status quo ante pending the determination of the substantive suit. INEC subsequently decided not to recognise any faction and removed the existing leadership from its records.",
        { italic: ["status quo ante"] },
      ),
    ],
  },
  { _type: "sectionHeading", level: 2, text: "Legal Analysis" },
  {
    _type: "sectionHeading",
    level: 3,
    number: "1.",
    text: "INEC's Position and Caution",
  },
  {
    _type: "sectionParagraph",
    content: [
      para(
        "From one perspective, INEC's approach is understandable. By declining to recognise either faction, it could be argued that the Commission seeks to avoid conferring legitimacy on a leadership that may ultimately be invalidated by the courts. This reflects an attempt to maintain institutional neutrality and prevent potential prejudice to the judicial process. In politically charged disputes, cautious action can be justified to ensure impartiality.",
      ),
    ],
  },
  {
    _type: "sectionHeading",
    level: 3,
    number: "2.",
    text: "Status Quo Ante: Preserving or Reverting?",
  },
  {
    _type: "sectionParagraph",
    content: [
      para(
        "Further to the above, the phrase status quo ante bellum generally means restoring the situation as it existed before the disputed act occurred, rather than necessarily preserving the most recent state of affairs. The key legal question is: What is the relevant 'status quo ante' in the circumstance of this case?",
        { italic: ["status quo ante bellum", "status quo ante"] },
      ),
      para(
        "If the dispute centers on the validity of Bala Gombe's resignation, therefore it could be argued that the status quo ante is likely the position before that resignation, which implies that Bala Gombe remained Deputy Chairman and the succession process had not yet produced the new leadership. Conversely, if the focus is on preserving the most recent functioning leadership, one could argue that the leadership structure including David Mark had already crystallised and was being acted upon, making it the operative status quo.",
        { italic: ["status quo ante", "status quo"] },
      ),
      para(
        'Law as Oputa JSC eruditely said "is not one-way traffic". Both interpretations have merit. Reverting to the position before the resignation aligns strictly with the classical meaning of status quo ante bellum. Preserving the existing, operational leadership reflects a practical approach to stability and administrative continuity.',
        { italic: ["status quo ante bellum"] },
      ),
    ],
  },
  {
    _type: "sectionHeading",
    level: 3,
    number: "3.",
    text: "Risk of Overreach",
  },
  {
    _type: "sectionParagraph",
    content: [
      para(
        "Notwithstanding the above, it is significant to note that the Court of Appeal did not expressly direct the derecognition of any leadership. In other words, in the circumstance of this case, it is safer to argue that INEC's decision to withdraw recognition from all factions may therefore extend beyond the precise terms of the order. While well-intentioned, the action may be perceived as exceeding judicial directives and risk undermining confidence in the institution and the electoral process.",
      ),
    ],
  },
  {
    _type: "sectionHeading",
    level: 3,
    number: "4.",
    text: "Public Interest Implications",
  },
  {
    _type: "sectionParagraph",
    content: [
      para(
        'We are of this opinion that this issue is not merely theoretical. The credibility of Independent National Electoral Commission (INEC) is central to public trust in democratic governance. Ambiguous or legally questionable interpretations of court orders, especially in politically sensitive contexts, can erode public confidence. This is an outcome that must be carefully avoided, particularly as the nation approaches another election cycle in 2027.',
      ),
    ],
  },
  { _type: "sectionHeading", level: 2, text: "Conclusion" },
  {
    _type: "sectionParagraph",
    content: [
      para(
        "The ADC leadership dispute illustrates the tension between strict legal interpretation and practical administrative considerations. On one hand, the classical meaning of status quo ante bellum suggests reverting to the leadership structure before Bala Gombe's alleged resignation. On the other hand, a more pragmatic reading favors preserving the last operational and recognised leadership, which had already taken effect prior to the litigation. Our submission is that INEC's approach, while cautious, arguably leans toward over-compliance, potentially creating a vacuum rather than preserving stability.",
        { italic: ["status quo ante bellum"] },
      ),
    ],
  },
  { _type: "sectionHeading", level: 2, text: "Our Recommendations" },
  {
    _type: "sectionBulletList",
    items: [
      {
        content: [
          para(
            "INEC should review its position in line with a clear, legally sound understanding of status quo ante.",
            { italic: ["status quo ante"] },
          ),
        ],
      },
      {
        content: [para("All parties should allow the courts to resolve the matter promptly.")],
      },
      {
        content: [
          para(
            "Judicial orders affecting political institutions must be interpreted and implemented with precision to preserve both stability and public confidence.",
          ),
        ],
      },
    ],
  },
];

const inecImportantNotice: PortableTextBlock[] = [
  para(
    "This letter contains our legal opinion, issued in the public interest as part of our pro bono contribution at Amicus-Juris LP. It is also aimed at educating the public on a matter that directly affects confidence in Nigeria's public institutions, in this instance, the electoral institution. In other words, this opinion is provided by Amicus-Juris LP for public information and educational purposes only. It is not legal advice for any individual or organization. The firm accepts no responsibility for actions taken based on this article.",
    { italic: ["pro bono", "Amicus-Juris LP"] },
  ),
];

export const fallbackPublications: Publication[] = [
  {
    slug: "inec-adc-leadership-status-quo",
    title:
      "INEC and the ADC Leadership Crisis: Status Quo or Status Confusion?",
    documentType: "legal-opinion",
    author: fallbackAuthors.find((a) => a.slug === "olanrewaju-sulaiman-lawal") ?? fallbackAuthors[0],
    category: fallbackCategories[1],
    focusAreas: ["Governance", "Electoral Law", "Public Interest"],
    publishedAt: "2026-04-03",
    readingTime: "8 min read",
    featured: true,
    excerpt:
      "A pro bono legal opinion on INEC's decision to withdraw recognition from all ADC factions — examining status quo ante, judicial restraint, and the implications for public confidence ahead of the 2027 election cycle.",
    seoDescription:
      "Amicus-Juris LP's public interest legal opinion on INEC, the ADC leadership crisis, and the proper interpretation of status quo ante.",
    shareMessage:
      "New public interest legal opinion from Amicus-Juris LP on INEC and the ADC leadership crisis.",
    summaryPoints: [
      "INEC's cautious stance is understandable but risks exceeding the Court of Appeal's actual directive.",
      "The meaning of status quo ante depends on what disputed act the court is preserving.",
      "Over-compliance may create a leadership vacuum, not administrative stability.",
      "Public confidence in electoral institutions is too important to leave ambiguous.",
    ],
    matterHeading: "Letter of Public Interest",
    matterSubheading:
      "INEC and the ADC Leadership Crisis: Status Quo or Status Confusion?",
    recipients: [
      { title: "The Chairman", organisation: "Independent National Electoral Commission (INEC)" },
      { title: "The Honourable Attorney General of the Federation / Minister of Justice" },
      { title: "The National Chairman", organisation: "African Democratic Congress (ADC)" },
    ],
    salutation: "Dear Sirs,",
    importantNotice: inecImportantNotice,
    signedAt: "2026-04-03T10:12:00Z",
    serialNumber: "SN-260403101222-5808",
    sections: inecSections,
  },
];

export function getFallbackPublicationBySlug(slug: string): Publication | undefined {
  return fallbackPublications.find((publication) => publication.slug === slug);
}
