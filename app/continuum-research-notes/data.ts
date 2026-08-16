export const notesHero = {
  breadcrumb: ["Continuum®", "Main Case Study", "Process", "Outcomes"],
  headline:
    "Designing a care-centered platform to sustain trust, clarity, and emotional support throughout the surrogacy journey.",
  date: "Jan 27, 2025",
  meta: [
    { label: "COURSE", value: "MGT 120: Managing and Using Information Technology" },
    { label: "ROLE", value: "Designer and PM" },
    { label: "SERVICE", value: "UX Research, Product Design, Systems Thinking, Sensitive Domains" },
  ],
};

export const intro = {
  heading: "How Might We Center Surrogates in a System That Often Treats Them as a Vessel?",
  paragraphs: [
    "This project began with a prompt: pick a business problem in the world and reimagine it. After long discussions, my team landed on something complex, emotional, and often hidden, California's surrogacy process. Through months of interviews, journey mapping, and stakeholder analysis, we uncovered one striking truth: once pregnancy is confirmed, surrogate health, especially emotional and legal wellbeing is often sidelined.",
    "While our group focused on presenting systemic policy improvements, I took the research further. I independently designed a digital platform focused on health readiness, something that didn't yet exist in this space. The result is a collaborative care portal that centers continuous care visibility, proactive health flagging, and centralized communication between surrogates, clinics, and intended parents.",
  ],
};

export const surrogacyOverview = {
  heading: "What Is Surrogacy?",
  intro:
    "Surrogacy is an arrangement where a person, known as the surrogate, carries a pregnancy for a couple or individual who will become the child's legal parent(s) after birth.",
  facts: [
    { label: "Gestational Surrogacy", body: "(via IVF) is the most common form" },
    { label: "$22.4B", body: "global surrogacy industry" },
    { label: "0 Federal Standards", body: ", 50 unique state laws" },
    { label: "0.24%", body: "of all U.S. births (but growing at 24.6% annually)" },
  ],
  image: "/images/continnum-notes/surrogacy-stats.png",
  imageAlt: "Surrogacy industry statistics diagram",
  imageWidth: 2200,
  imageHeight: 1462,
};

export const stakeholderMap = {
  heading: "Who Holds the Power in Surrogacy?",
  intro:
    "We interviewed surrogates, intended parents (IPs), and agency reps, mapping out the web of influence that surrounds a single surrogacy journey.",
  stakeholders: [
    { label: "Intended Parents (IPs):", body: "Those who will legally parent the child" },
    { label: "Surrogates:", body: "The gestational carriers" },
    { label: "Agencies:", body: 'Often act as a "one-stop shop"' },
    { label: "Private Arrangements:", body: "IPs manage all steps independently" },
    {
      label: "Hospitals:",
      body: "Treat surrogate pregnancies like any other, missing key emotional and legal nuances",
    },
  ],
};

export type ProblemSection = {
  slug: string;
  number: string;
  title: string;
  painPoints: string[];
  interventions: { label: string; body: string }[];
  storyNote: string;
  gallery: {
    imageAlt: string;
    images: string[];
  };
};

export const problemsHeading = {
  heading: "The Hidden Frictions in Surrogacy",
  intro:
    "Our interviews revealed four recurring issues disrupting the surrogacy experience. Each subproblem became a doorway into deeper emotional and systemic design gaps.",
};

export const problems: ProblemSection[] = [
  {
    slug: "matching",
    number: "01",
    title: "Matching Is Treated Like Logistics, Not Compatibility",
    painPoints: [
      "Psychological screenings are surface-level",
      "Agencies don't facilitate tough value-based conversations",
      "Matches happen quickly without clarity on topics like abortion or contact post-birth",
    ],
    interventions: [
      {
        label: "A staged compatibility system",
        body: "pre-match, pre-contract, and mid-pregnancy",
      },
      {
        label: "Facilitated interviews",
        body: "on abortion, VBAC, selective reduction, post-birth contact",
      },
    ],
    storyNote:
      "Addresses stories like Clementine's, who felt blindsided by a termination and Danielle's hesitation with donor gametes",
    gallery: {
      imageAlt: "Research photo documenting surrogate-parent matching interviews",
      images: Array.from({ length: 7 }, (_, i) => {
        const n = String(i + 1).padStart(2, "0");
        return `/images/continnum-notes/problem-01/photo-${n}.jpg`;
      }),
    },
  },
  {
    slug: "emotional-readiness",
    number: "02",
    title: "Emotional Readiness Is Assumed, Not Built",
    painPoints: [
      "First-time surrogates are emotionally unprepared",
      "Legal counsel is optional and often biased toward IPs",
      "Agencies disappear after contracts are signed",
    ],
    interventions: [
      {
        label: "Mandatory orientation",
        body: "for surrogates and IPs, including third-party advocacy",
      },
      {
        label: "Informed consent sessions",
        body: "on sensitive topics like embryo use or delivery type",
      },
      {
        label: "Required independent legal counsel",
        body: "for surrogates to preserve autonomy",
      },
    ],
    storyNote:
      "This addressed Danielle's need to pause and reflect during the process and Clementine's isolation during her hospital stay.",
    gallery: {
      imageAlt: "Research photo documenting emotional-readiness interviews",
      images: Array.from({ length: 8 }, (_, i) => {
        const n = String(i + 1).padStart(2, "0");
        return `/images/continnum-notes/problem-02/photo-${n}.jpg`;
      }),
    },
  },
  {
    slug: "private-surrogacy",
    number: "03",
    title: "Private Surrogacy Lacks Protection Infrastructure",
    painPoints: [
      "No third-party advocate in private arrangements",
      "Mismatched expectations between IPs and surrogates",
      "IPs hold power over contracts, decisions, and hospital presence",
    ],
    interventions: [
      {
        label: "Social workers from nonprofit surrogacy orgs",
        body: "to mediate contract discussions",
      },
      {
        label: "Built-in grief counselors",
        body: "at hospitals to provide support after birth",
      },
    ],
    storyNote:
      'These interventions respond to trauma stories like Clementine\'s after a D&E procedure and Francesca\'s belief that "no one wants to be the bad guy."',
    gallery: {
      imageAlt: "Research photo documenting private-arrangement surrogacy interviews",
      images: Array.from({ length: 17 }, (_, i) => {
        const n = String(i + 1).padStart(2, "0");
        return `/images/continnum-notes/problem-03/photo-${n}.jpg`;
      }),
    },
  },
  {
    slug: "hospital-systems",
    number: "04",
    title: "Hospital Systems Don't Understand Surrogacy",
    painPoints: [
      "Staff aren't trained to support surrogacy",
      "Surrogates are misrecognized or misunderstood",
      "IPs often miss out on critical updates or bonding moments",
    ],
    interventions: [
      {
        label: "Surrogacy-specific hospital training",
        body: "embedded into SOPs",
      },
      {
        label: "Cross-departmental medical records",
        body: "for clarity on parent roles and discharge needs",
      },
    ],
    storyNote:
      'Suzie\'s frustration over not being given a post-birth room, and Clementine\'s feeling of being "harassed" by uninformed hospital staff, highlighted these urgent gaps.',
    gallery: {
      imageAlt: "Research photo documenting hospital-systems interviews",
      images: Array.from({ length: 13 }, (_, i) => {
        const n = String(i + 1).padStart(2, "0");
        return `/images/continnum-notes/problem-04/photo-${n}.jpg`;
      }),
    },
  },
];

export const platformConcept = {
  heading: "A Digital Care Platform Built on Emotional and Systemic Insight",
  intro:
    "From this research, I designed a digital platform concept that would center the surrogate's emotional and physical health, not as an afterthought, but as a foundation.",
  capabilitiesLabel: "Key Capabilities:",
  capabilities: [
    {
      label: "Care Visibility Timeline",
      body: "with health check-ins and psychosocial flags",
    },
    {
      label: "Proactive Conflict Prevention Tools",
      body: "for IP/surrogate alignment",
    },
    {
      label: "Centralized Communication",
      body: "between all stakeholders, including clinics and legal",
    },
  ],
};

export const closingReflection = {
  heading: "Why This Work Matters",
  paragraphs: [
    "Surrogacy is deeply emotional, legally complex, and often handled like a contract, not a care journey. This project taught me how to listen between the lines of interviews, map power and pain, and design systems that treat people like people, not roles.",
    "My independent research extended the project's original goal and led to a concept that blends care, coordination, and cultural sensitivity, shaping a more transparent, empowering surrogacy experience for all.",
  ],
};

export const closingCta = {
  heading: "View the full Continuum case study.",
  subtext: "Head back for project context & outcomes.",
  buttonLabel: "Back to Case Study",
  href: "/continuum",
};
