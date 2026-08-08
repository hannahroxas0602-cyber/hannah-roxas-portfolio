export const continuumHero = {
  title: "Continuum",
  subtitle:
    "A care-centered platform keeping surrogates, parents, and coordinators in sync after pregnancy confirmation.",
  gist: {
    label: "The Gist:",
    text: "Most surrogacy tools manage paperwork. Continuum manages the human experience.",
  },
  date: "Jan 2025 (Course Project)",
  meta: [
    { label: "COURSE", value: "MGT 120: Managing and Using Information Technology" },
    { label: "ROLE", value: "MGT 140- Marketing for Tech-Based Enterprise" },
    { label: "SERVICE", value: "UX Research, Journey Mapping, Interaction Design, Design Systems" },
  ],
};

export const roleAndImpact = {
  heading: "My Role & Impact",
  columns: [
    {
      label: "Problem",
      body: "Once a surrogacy pregnancy is confirmed, agencies drop their high-touch support. Families are left to navigate complex medical, legal, and emotional milestones using messy spreadsheets and chaotic group texts.",
    },
    {
      label: "Solution",
      body: "A shared mobile and web platform that replaces chaos with a unified, stress-free timeline, proactive coordinator tools, and lightweight wellness tracking.",
    },
    {
      label: "Impact",
      body: "Translated highly sensitive, multi-stakeholder emotional anxieties into clear, quiet UI patterns that protect user trust.",
    },
  ],
};

export const problemSection = {
  heading: "The Problem",
  flow: "[Onboarding: High Support] ---> [Confirmation] ---> [The Drop-Off: Chaos & Isolation]",
  paragraphs: [
    "Through stakeholder interviews, I discovered a major gap: Support fades the moment pregnancy is confirmed exactly when emotional labor and uncertainty spike.",
    "We didn't need to build a better administration tool. We needed to build a care system that sustained trust over nine months.",
  ],
  image: "/images/continuum/problem-flow.mp4",
  imageAlt: "Animated diagram showing the onboarding, confirmation, and support drop-off flow",
  imageWidth: 2098,
  imageHeight: 1120,
};

export type DesignDecision = {
  slug: string;
  title: string;
  anxiety: string;
  fix: string;
  tradeoff: string;
};

export const decisionsSection = {
  heading: "3 Critical Design Decisions (And the Tradeoffs)",
  intro: "Instead of showing every wireframe, here are the strategic decisions that shaped the product:",
  researchLinkLabel: "View full research",
  researchLinkHref: "/continnum-notes",
  decisions: [
    {
      slug: "progressive-disclosure",
      title: "1. Progressive Disclosure (Legal Tasks)",
      anxiety: "Parents were overwhelmed by massive, complex legal checklists.",
      fix: "We only display the immediate next task; future steps are hidden.",
      tradeoff: 'Parents lose the "big picture" view, but gain daily peace of mind.',
    },
    {
      slug: "timeline-default",
      title: "2. Timeline Default (Communication)",
      anxiety: "Group chats created pressure for instant replies, spiking stress.",
      fix: "Made an auto-updating shared timeline the default homepage.",
      tradeoff: "Communication is slower, but it eliminates conversational urgency.",
    },
    {
      slug: "frictionless-checkins",
      title: "3. Frictionless Check-ins (Surrogate Care)",
      anxiety: 'Surrogates wanted support but hated feeling monitored or given "homework."',
      fix: "One-tap, emoji-based mood checks with optional short notes.",
      tradeoff: "We collect less granular health data, but gain authentic participation.",
    },
  ] satisfies DesignDecision[],
};

export type Stakeholder = {
  slug: string;
  name: string;
  coreNeed: string;
  features: string[];
};

export const stakeholdersSection = {
  heading: "Designing for Multiple Stakeholders",
  image: "/images/continuum/three-users.png",
  imageAlt: "Illustration representing the three core Continuum user groups",
  imageWidth: 1536,
  imageHeight: 1024,
  stakeholders: [
    {
      slug: "intended-parents",
      name: "Intended Parents",
      coreNeed: "Reassurance & Clarity",
      features: [
        "Shared access to timelines, calendars, and documents",
        "Guided prompts to ask the right questions at the right time",
        "Reduced need for constant messaging",
      ],
    },
    {
      slug: "surrogates",
      name: "Surrogates",
      coreNeed: "Autonomy & Care",
      features: [
        "Emotional check-ins and wellbeing signals",
        "Clear expectations and consent-based visibility",
        "Reduced feeling of being monitored",
      ],
    },
    {
      slug: "care-coordinators",
      name: "Care Coordinators",
      coreNeed: "Risk Detection",
      features: [
        "Live case dashboard with alerts",
        "Tools to track readiness, alignment, and blockers",
        "Centralized communication loops",
      ],
    },
  ] satisfies Stakeholder[],
};

export const designSystemSection = {
  heading: "Design System: Designing for Emotional Safety",
  intro:
    "To lower cognitive load during high-stress medical moments, the visual system prioritizes calm:",
  principles: [
    {
      title: "Warm, non-clinical tones",
      body: "to avoid looking like a sterile medical portal or tracker.",
    },
    {
      title: "Mobile-first layouts",
      body: "optimized for quick, one-handed use in waiting rooms.",
    },
    {
      title: "Large, readable typography",
      body: "and soft microcopy that feels supportive, not authoritative.",
    },
  ],
  image: "/images/continuum/design-system.mp4",
  imageAlt: "Animated walkthrough of the Continuum visual design system",
  imageWidth: 1852,
  imageHeight: 898,
};

export const nextStepsSection = {
  heading: "What I'd Do Next",
  items: [
    {
      title: "Pilot with a clinic",
      body: "to test how the emotional check-ins hold up over months of real-world use.",
    },
    {
      title: "Measure success",
      body: "by tracking if the platform reduces the volume of anxious, off-channel messages sent to coordinators.",
    },
  ],
  image: "/images/continuum/next-steps.mp4",
  imageAlt: "Animated concept exploration for future Continuum features",
  imageWidth: 908,
  imageHeight: 902,
};

export const nextProject = {
  label: "Keep wandering",
  title: "Good Friends Poke",
  description:
    "Redesigning the fast-casual dining experience to eliminate customer friction and peak-hour staff burnout.",
  href: "/page/good",
  image: "/images/projects/good-friends-poke.png",
  imageAlt: "Good Friends Poke fast-casual dining experience redesign",
  imageWidth: 2446,
  imageHeight: 1376,
};
