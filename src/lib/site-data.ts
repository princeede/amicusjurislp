export type PracticeArea = {
  title: string;
  summary: string;
  matters: string[];
};

export const brandName = "Amicus Juris LP";
export const domainName = "amicusjurislp.com";

export const siteNavigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/publications", label: "Publications" },
  { href: "/contact", label: "Contact" },
];

export const firmDescriptionShort =
  "Amicus Juris LP is a Nigerian partnership of Barristers and Solicitors serving clients across litigation, advisory, regulatory, and emerging legal sectors.";

export const firmDescriptionLong = [
  "Welcome to Amicus Juris LP, a distinguished partnership of Barristers and Solicitors operating at the intersection of legal excellence and unwavering commitment. With a legacy rooted in Nigeria's legal landscape, the firm has developed a reputation for reliability, strategic thinking, and innovative problem-solving.",
  "The team brings together national and international legal expertise to tackle a broad range of legal issues spanning civil and criminal litigation, commercial advisory, regulatory interpretation, and emerging practice areas. Its work has served national corporations, multinational organizations, financial institutions, service sector companies, and participants in the Nigerian oil and gas industry.",
  "Amicus Juris LP approaches legal work as bespoke problem-solving. The firm's emphasis on timely research, context-aware advice, and practical business judgment shapes counsel that is tailored to each client's objectives and commercial realities.",
];

export const practiceAreas: PracticeArea[] = [
  {
    title: "Litigation and Dispute Resolution",
    summary:
      "Representation and strategic guidance across civil and criminal litigation, supported by forensic insight and disciplined case preparation.",
    matters: [
      "Civil litigation",
      "Criminal litigation and defense strategy",
      "Forensic and litigation support",
    ],
  },
  {
    title: "Corporate, Commercial, and Contract Advisory",
    summary:
      "Commercially grounded legal support for contracts, transactions, corporate structuring, compliance, and day-to-day business decisions.",
    matters: [
      "Corporate law and commercial law",
      "Contract drafting, review, and negotiation",
      "Contract compliance services",
    ],
  },
  {
    title: "Energy, Oil and Gas, and Regulatory Sectors",
    summary:
      "Cross-sector legal advisory for regulated and emerging industries, with strong awareness of operational and compliance realities.",
    matters: [
      "Energy law",
      "Oil and gas law",
      "Administrative and regulatory law",
    ],
  },
  {
    title: "Public Law, Property, and Private Client Matters",
    summary:
      "Guidance across constitutional, administrative, property, family, equity, trust, and tort matters, shaped by practical legal judgment.",
    matters: [
      "Constitutional law and administrative law",
      "Property law and tort law",
      "Family law, equity, and trust",
    ],
  },
  {
    title: "Specialized and Emerging Practice Areas",
    summary:
      "Forward-looking support in sectors where legal, institutional, and technological changes create new demands for sound counsel.",
    matters: [
      "Medical law and health law-related issues",
      "Education law and technology law",
      "Immigration law in Nigeria and the UK",
    ],
  },
];

export const fullPracticeAreaList = [
  "Civil Litigation",
  "Criminal Litigation",
  "Employment Law",
  "Contract Law",
  "Corporate Law",
  "Commercial Law",
  "Constitutional Law",
  "Administrative Law",
  "Family Law",
  "Criminal Law",
  "Principles of Equity and Trust",
  "Property Law",
  "Tort Law",
  "Medical Law",
  "Energy Law",
  "Oil and Gas Law",
  "Education Law",
  "Technology Law",
  "Immigration Law [Nigeria and UK]",
  "Contract Compliance Services",
  "Forensic and Litigation Support",
];

export const firmHighlights = [
  "Distinguished partnership of Barristers and Solicitors with a legacy rooted in Nigeria's legal landscape.",
  "Broad practice coverage across litigation, commercial advisory, public law, and emerging sectors.",
  "National and international legal perspective informed by multi-jurisdictional experience and rigorous research.",
];

export const firmValues = [
  "Enthusiasm",
  "Commitment",
  "Diligence",
  "Relationship management",
  "Integrity",
  "Professionalism",
  "Team work",
  "Accountability",
  "Excellence",
];

export const firmVision =
  "To be one of Africa's leading legal services firms.";

export const firmMission =
  "To be a world class legal and consulting practice providing a platform for motivated, specialized, and committed professionals meeting clients' needs and contributing to public good.";

export const valueProposition = [
  "Insight into business, dispute, and regulatory issues in Nigeria.",
  "Experience serving corporations, financial institutions, investors, and oil and gas participants.",
  "Efficient, tailored, and budget-conscious legal support.",
];

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
  bio: string[];
  expertise: string[];
};

export const teamMembers: TeamMember[] = [
  {
    slug: "olanrewaju-sulaiman-lawal",
    name: "Olanrewaju Sulaiman Lawal, Esq.",
    role: "Senior / Managing Partner",
    image: "/team/olanrewaju-sulaiman-lawal.jpg",
    bio: [
      "Mr. Olanrewaju Sulaiman Lawal is a graduate of Ahmadu Bello University, Zaria and the Senior/Managing Partner of Amicus-Juris LP. Widely admired for his dynamism and ability to solve complex issues with good-humoured candour, he is a seasoned legal practitioner with over 7 years of post-call experience.",
      "In Nigeria, Olanrewaju practices as a Barrister and Solicitor, leveraging his comprehensive understanding of the legal landscape. He also serves as a registered foreign lawyer in England and Wales, expanding his international legal expertise.",
      "His educational background is highlighted by a Master's Degree in Health Law and Ethics from Nottingham Law School in England and additional professional courses from Harvard Law School. Olanrewaju maintains active memberships in numerous international and national legal organizations.",
    ],
    expertise: [
      "Commercial Litigation (Civil & Criminal)",
      "Election Petitions",
      "Arbitration, Negotiation & Mediation",
      "Public Interest Litigation",
      "Mergers & Acquisitions",
      "Corporate Finance",
      "Banking & Finance",
      "Capital Markets",
      "Real Estate & Infrastructure",
    ],
  },
  {
    slug: "olaniyonu-yusuph",
    name: "Olaniyonu Yusuph, Esq.",
    role: "Co-Founder / Partner",
    image: "/team/olaniyonu-yusuph.svg",
    bio: [
      "Yusuph Olaniyonu spent 22 years as a print journalist reporting politics for some of the most influential news magazines and newspapers in Nigeria between 1989 and 2011, covering Nigeria's military rule, transition to democracy, and democratic era.",
      "He holds post-graduate degrees in law and communication studies. He was called to the Nigerian Bar in 2006 after earning a Bachelor of Laws Degree from Lagos State University, and obtained an LL.M from the University of Lagos in 2010. He is a Barrister and Advocate of the Supreme Court of Nigeria.",
      "In 2011, he moved into government as head of the information machinery for Ogun State, later serving as media adviser to Dr. Abubakar Bukola Saraki during and after his tenure as President of the Senate. He combines deep legal expertise with strategic communications and policy advisory.",
    ],
    expertise: [
      "Commercial Litigation (Civil & Criminal)",
      "Election Petitions",
      "Arbitration & Mediation",
      "Public Interest Litigation",
      "Mergers & Acquisitions",
      "Corporate Finance",
      "Agri-Business",
      "Banking & Finance",
      "Probate & Administration of Estates",
    ],
  },
  {
    slug: "sulaeman-abiodun-ibrahim",
    name: "Sulaeman Abiodun Ibrahim, Esq.",
    role: "Senior Partner / Head of Chambers",
    image: "/team/sulaeman-abiodun-ibrahim.svg",
    bio: [
      "Sulaeman is a highly regarded commercial lawyer with more than 6 years' experience advising on global compliance programs that improve risk management and reduce violations, while building systems to detect anti-corruption and compliance failures.",
      "As a partner in the firm, he has managed complex cross-border public and private leveraged acquisition and infrastructure financings, leading combined loan and high-yield bond financing structures. His experience covers public interest programmes & policy, institutional & regulatory compliance, reform and government relations.",
      "He previously worked as a Solicitor with Ntephe Smith & Wills in Port Harcourt and served as Counsel and Head of Chambers at Murtala Abdul-Rasheed SAN & Co. in Kaduna, where he led litigation strategy on numerous proceedings, including pre-election and election matters before the Federal High Courts and Election Petition Tribunals.",
    ],
    expertise: [
      "Dispute Resolution & Litigation",
      "Alternative Dispute Resolution",
      "Public Finance Management",
      "Public Private Partnerships",
      "Energy & Natural Resources",
      "Trade & Investments",
      "Corporate Governance",
      "Debt Recovery & Insolvency",
      "Regulation & Compliance",
    ],
  },
  {
    slug: "abubakar-musa-khalifa",
    name: "Abubakar Musa Khalifa, Esq.",
    role: "Partner",
    image: "/team/abubakar-musa-khalifa.svg",
    bio: [
      "Khalifa is a graduate of Ahmadu Bello University, Zaria and serves as a litigation partner in the firm. He has substantial experience in election litigation, commercial litigation, and project disputes.",
      "Having worked with clients across government, financial institutions, and private companies, his capability spans commercial and contractual disputes, court proceedings, adjudication, expert determination, negotiation, and mediation. He has managed briefs ranging from alternative dispute resolution and litigation management to trial.",
      "Abubakar has successfully assisted clients with the resolution of commercial disputes, particularly those resulting from public contracts and complex judicial reviews involving consultation processes. He is a Chartered Arbitrator and a member of the Nigerian Bar Association.",
    ],
    expertise: [
      "Commercial Litigation (Civil & Criminal)",
      "Election Petitions",
      "Arbitration & Mediation",
      "Public Interest Litigation",
      "Mergers & Acquisitions",
      "Corporate Finance",
      "Banking & Finance",
      "Capital Markets",
      "Real Estate & Infrastructure",
    ],
  },
  {
    slug: "mariam-badmus",
    name: "Mariam Badmus, Esq.",
    role: "Associate",
    image: "/team/mariam-badmus.svg",
    bio: [
      "Mariam Badmus is a distinguished Associate at Amicus-Juris LP, bringing a wealth of expertise across law and finance. She holds an LLM in International Business and Finance from the University of Aberdeen, Scotland, a Barrister-at-Law qualification from the Nigerian Law School, and an LLB from the University of Dundee, Scotland.",
      "Her proficiency extends across International Business and Finance, Corporate Law, Tax Law, and Insolvency Law. Beyond her legal acumen, she holds certifications in Google Data Analysis, Bloomberg Market Concepts, and Financial Modeling Foundations, with strong skills in Excel and statistical data analysis.",
      "Mariam's fluency in programming languages such as Python and R, alongside her command of Tableau, positions her as a dynamic legal professional able to harness data-driven insights to bolster legal strategies. Her commitment to client success is evident in her meticulous approach to tracking, planning, and forecasting.",
    ],
    expertise: [
      "International Business & Finance",
      "Corporate Law",
      "Tax Law",
      "Insolvency Law",
      "Mergers & Acquisitions",
      "Capital Markets",
      "Banking & Finance",
      "Financial Analysis",
      "Data-Driven Legal Strategy",
    ],
  },
];

export const contactDetails = {
  email: "info@amicusjurislp.com",
  phones: [
    "+234 810 804 7574",
    "+234 803 421 2805",
    "+234 813 950 0624",
    "+234 810 577 4332",
    "+44 7570 140 531",
  ],
  phone: "+234 810 804 7574",
  address: "Suite 15, Augustus Aihkomou Street, Utako, Abuja",
  location: "Nigeria",
  website: domainName,
  coverage: "Advisory and representation across Nigeria, with international legal perspective.",
  offices: [
    {
      name: "Abuja (Head Office)",
      address: "Suite 15, Augustus Aihkomou Street, Utako, Abuja",
    },
    {
      name: "Osun State",
      address: "No. 51, Kola Balogun Area, Old Ikirun Road, Osogbo, Osun State",
    },
    {
      name: "Ogun State",
      address: "Penpusing Media Press Centre Premises, Oke-Ilewo, Abeokuta",
    },
  ],
};
