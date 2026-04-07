export type PublicationTemplate = "insight" | "report" | "brief";

export type PublicationBlock =
  | {
      type: "richText";
      title: string;
      paragraphs: string[];
    }
  | {
      type: "keyPoints";
      title: string;
      intro?: string;
      points: string[];
    }
  | {
      type: "stats";
      title: string;
      items: {
        label: string;
        value: string;
        detail: string;
      }[];
    }
  | {
      type: "timeline";
      title: string;
      items: {
        label: string;
        title: string;
        detail: string;
      }[];
    }
  | {
      type: "quote";
      quote: string;
      attribution: string;
    }
  | {
      type: "cta";
      title: string;
      body: string;
      actionLabel: string;
      actionHref: string;
    };

export type Publication = {
  slug: string;
  title: string;
  category: string;
  template: PublicationTemplate;
  audience: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  excerpt: string;
  seoDescription: string;
  shareMessage: string;
  featured?: boolean;
  reportLabel: string;
  focusAreas: string[];
  summaryPoints: string[];
  blocks: PublicationBlock[];
};

const publicationEntries: Publication[] = [
  {
    slug: "governance-reform-and-investor-confidence",
    title: "Governance Reform and Investor Confidence in Nigeria",
    category: "Governance",
    template: "report",
    audience: "Boards, investors, and public sector decision-makers",
    author: "Amicus Juris Editorial Desk",
    publishedAt: "2026-03-12",
    readingTime: "6 min read",
    excerpt:
      "A legal report design that frames governance reform as a business-confidence issue, with reusable sections for executive summaries, market signals, and reform priorities.",
    seoDescription:
      "An Amicus Juris LP report on governance reform, legal certainty, and investor confidence in Nigeria.",
    shareMessage:
      "New report from Amicus Juris LP: governance reform, legal certainty, and investor confidence in Nigeria.",
    featured: true,
    reportLabel: "Flagship Insight Report",
    focusAreas: ["Governance", "Regulation", "Investor confidence"],
    summaryPoints: [
      "Strong institutions reduce pricing uncertainty and improve investment planning.",
      "Regulatory inconsistency creates hidden commercial costs that suppress growth.",
      "Governance reform is most persuasive when implementation is durable and legible.",
    ],
    blocks: [
      {
        type: "richText",
        title: "Executive summary",
        paragraphs: [
          "Investor confidence does not grow from optimism alone. It grows when institutions behave predictably, contractual expectations are respected, and public power is exercised within transparent legal boundaries.",
          "For businesses operating in Nigeria, legal certainty is not an abstract constitutional virtue. It is a practical condition for pricing risk, planning capital deployment, and maintaining trust in long-term commitments.",
        ],
      },
      {
        type: "stats",
        title: "Why this format works",
        items: [
          {
            label: "Primary use",
            value: "Board brief",
            detail:
              "A format suited to leadership teams that need a short, persuasive report rather than a long memo.",
          },
          {
            label: "Secondary use",
            value: "Client alert",
            detail:
              "The same layout can be repurposed as a client-facing publication with minimal editing.",
          },
          {
            label: "Publishing value",
            value: "High",
            detail:
              "It creates a premium editorial feel similar to top firm insight pages while remaining easy to maintain.",
          },
        ],
      },
      {
        type: "keyPoints",
        title: "Key legal signals",
        intro:
          "A strong publication template should make the central legal and commercial takeaways immediately visible.",
        points: [
          "Regulatory interpretation that changes abruptly forces defensive restructuring and delays capital deployment.",
          "Reform should be measured not only by the ambition of new rules, but by the coherence of implementation.",
          "Counterparties treat public institutional discipline as a proxy for market seriousness.",
        ],
      },
      {
        type: "quote",
        quote:
          "Governance reform is not separate from economic growth. In many sectors, it is one of its preconditions.",
        attribution: "Amicus Juris LP",
      },
      {
        type: "timeline",
        title: "Suggested report flow",
        items: [
          {
            label: "01",
            title: "Set the commercial context",
            detail:
              "Open with a concise explanation of why the legal issue matters to clients, investors, or regulators.",
          },
          {
            label: "02",
            title: "Surface the risk",
            detail:
              "Show how regulatory inconsistency, delay, or ambiguity creates measurable business friction.",
          },
          {
            label: "03",
            title: "End with action",
            detail:
              "Close with clear reform, compliance, or transaction implications for the intended audience.",
          },
        ],
      },
      {
        type: "cta",
        title: "Need a custom report format?",
        body:
          "This structure can be adapted for client alerts, industry white papers, election law briefings, or sector outlook reports without redesigning the page each time.",
        actionLabel: "Discuss a Custom Publication",
        actionHref: "/contact",
      },
    ],
  },
  {
    slug: "policy-stability-in-emerging-sectors",
    title: "Policy Stability in Emerging Sectors",
    category: "Policy",
    template: "insight",
    audience: "Founders, operators, and in-house counsel",
    author: "Amicus Juris Editorial Desk",
    publishedAt: "2026-02-04",
    readingTime: "5 min read",
    excerpt:
      "A flexible insight format for shorter commentary pieces that still need a premium design system and clear business takeaway.",
    seoDescription:
      "An Amicus Juris LP legal insight on policy stability and regulatory continuity in emerging Nigerian sectors.",
    shareMessage:
      "Amicus Juris LP on policy stability in emerging sectors and why continuity matters for business growth.",
    reportLabel: "Legal Insight",
    focusAreas: ["Emerging sectors", "Policy continuity", "Compliance design"],
    summaryPoints: [
      "Fast-growing sectors still need stable regulatory assumptions to scale confidently.",
      "Continuity improves both compliance discipline and competitive fairness.",
      "Well-designed reform requires transition logic, not abrupt direction changes.",
    ],
    blocks: [
      {
        type: "richText",
        title: "What this format is for",
        paragraphs: [
          "This is the most practical template for ongoing thought leadership. It suits topics that should be published quickly, shared widely, and updated often without the heavier framing of a full report.",
          "For the client, it is also the easiest page type to manage because the structure remains consistent while the content changes from post to post.",
        ],
      },
      {
        type: "keyPoints",
        title: "Core observations",
        points: [
          "Emerging sectors often attract policy attention because they promise jobs, innovation, and new revenue.",
          "Legal and commercial confidence weakens quickly when policy direction changes faster than operators can adapt.",
          "Stable frameworks make compliance easier to internalize and enforcement easier to administer evenly.",
        ],
      },
      {
        type: "quote",
        quote:
          "The next stage of sector growth belongs to frameworks that are reform-minded without being erratic.",
        attribution: "Amicus Juris LP",
      },
      {
        type: "cta",
        title: "Turn commentary into a repeatable series",
        body:
          "The same insight template can power a monthly regulation watch, sector tracker, or partner commentary column with almost no design overhead.",
        actionLabel: "Plan an Editorial Series",
        actionHref: "/contact",
      },
    ],
  },
  {
    slug: "public-institutions-and-commercial-trust",
    title: "Public Institutions and Commercial Trust",
    category: "Politics and Law",
    template: "brief",
    audience: "Executives, policy analysts, and dispute teams",
    author: "Amicus Juris Editorial Desk",
    publishedAt: "2025-11-18",
    readingTime: "7 min read",
    excerpt:
      "A briefing-style publication that works well for rapid response commentary, conference handouts, and issue-specific client notes.",
    seoDescription:
      "Amicus Juris LP reflects on institutional conduct, legal enforcement, and commercial trust in Nigeria.",
    shareMessage:
      "A new Amicus Juris LP publication examines the link between public institutions and commercial trust in Nigeria.",
    reportLabel: "Issue Brief",
    focusAreas: ["Institutional trust", "Disputes", "Public law"],
    summaryPoints: [
      "Commercial trust is shaped by courts, regulators, and enforcement bodies as much as private contracts.",
      "Disputes reveal how institutions function under pressure.",
      "Trust compounds through repeated competent public decision-making.",
    ],
    blocks: [
      {
        type: "richText",
        title: "Briefing note",
        paragraphs: [
          "Businesses sign contracts with private counterparties, but their confidence in those contracts is shaped by public institutions. Courts, regulators, registries, and enforcement bodies all influence whether obligations are treated as meaningful or fragile.",
          "That makes institutional conduct a publication theme worth returning to repeatedly, especially for a firm that wants its editorial platform to signal seriousness, judgment, and public-interest awareness.",
        ],
      },
      {
        type: "timeline",
        title: "Where institutional trust shows up",
        items: [
          {
            label: "A",
            title: "At the point of regulation",
            detail:
              "Businesses watch for clarity, neutrality, and practical guidance from regulators and registries.",
          },
          {
            label: "B",
            title: "At the point of dispute",
            detail:
              "Delay, opacity, and inconsistent process quickly affect the wider business climate, not just the parties before the court.",
          },
          {
            label: "C",
            title: "At the point of enforcement",
            detail:
              "Predictable enforcement strengthens trust in legal obligations and in the market itself.",
          },
        ],
      },
      {
        type: "keyPoints",
        title: "Why this design helps",
        points: [
          "The brief format is compact enough for timely publication but still elevated enough for external distribution.",
          "It gives the client a fast route from idea to publication when a topical issue needs to go live quickly.",
          "It can also be exported into newsletters, PDFs, and presentation decks with minimal restructuring.",
        ],
      },
      {
        type: "cta",
        title: "Use this as a rapid response format",
        body:
          "This page structure is a strong fit for court decisions, regulatory pronouncements, election-related updates, and short public law commentary.",
        actionLabel: "Start a New Brief",
        actionHref: "/contact",
      },
    ],
  },
];

export const publications = publicationEntries.sort((left, right) =>
  right.publishedAt.localeCompare(left.publishedAt),
);

export function formatPublicationDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getPublication(slug: string) {
  return publications.find((publication) => publication.slug === slug);
}

export function getFeaturedPublications(limit?: number) {
  const featuredPublications = publications.filter(
    (publication) => publication.featured,
  );

  return typeof limit === "number"
    ? featuredPublications.slice(0, limit)
    : featuredPublications;
}

export function getPublicationCategories() {
  return publications.reduce<Record<string, number>>((categories, publication) => {
    categories[publication.category] = (categories[publication.category] ?? 0) + 1;
    return categories;
  }, {});
}
