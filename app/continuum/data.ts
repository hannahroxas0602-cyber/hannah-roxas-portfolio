import { projectDescription } from "@/app/data/projects";

export const continuumHero = {
  title: "Continuum",
  subtitle:
    "A care-centered platform keeping surrogates, parents, and coordinators in sync after pregnancy confirmation.",
  gist: {
    label: "The Gist:",
    text: "Most surrogacy tools manage paperwork. Continuum manages the human experience.",
  },
  date: "Jan 2025 · Course research, independent design",
  myRole:
    "I researched this with a class team of 7, focusing on how hospital systems handle surrogacy, then independently designed Continuum after the course, building on that research. Translated highly sensitive, multi-stakeholder emotional anxieties into clear, quiet UI patterns that protect user trust.",
  // Items with a null value are hidden until filled.
  meta: [
    { label: "COURSE", value: "MGT 120: Managing and Using Information Technology" },
    { label: "ROLE", value: "Researcher (team), then solo Product Designer" },
    {
      label: "TEAM",
      value: "7 (research) · Solo (design)",
    },
    { label: "SERVICE", value: "UX Research, Journey Mapping, Interaction Design, Design Systems" },
  ] satisfies { label: string; value: string | null }[],
};

export const highlightsSection = {
  heading: "Highlights",
  outcomes: [
    "Single shared timeline for parents, surrogates, and coordinators",
    "Progressive disclosure model: only the next task is ever shown",
    "One-tap, emoji-based emotional check-ins for surrogates",
  ],
  stats: [
    { value: "3", label: "stakeholder groups designed for" },
    { value: "9", label: "months of journey mapped" },
  ],
  callout: "Less chaos, more continuity.",
};

import type {
  TimelineAxisLabel,
  TimelineBand,
  TimelineTask,
} from "@/app/components/caseStudyTypes";

// Two phases: team research during the 10-week course, then solo design
// afterward. The design phase has no stated week count, so the axis shows
// dates instead of week numbers.
export const timelineSection = {
  heading: "Timeline",
  totalWeeks: 14,
  axisLabels: [
    { atWeek: 0, label: "Jan 2025" },
    { atWeek: 14, label: "Apr 2025" },
  ] satisfies TimelineAxisLabel[],
  bands: [
    {
      label: "Course research · Jan–Mar 2025 · Team of 7",
      colorClass: "bg-neutral-900",
      startWeek: 0,
      endWeek: 10,
    },
    {
      label: "Independent design · Spring 2025",
      colorClass: "bg-neutral-600",
      startWeek: 10,
      endWeek: 14,
    },
  ] satisfies TimelineBand[],
  tasks: [
    {
      title: "Stakeholder interviews",
      band: "Course research · Jan–Mar 2025 · Team of 7",
      startWeek: 0,
      endWeek: 10,
      row: 0,
      colorClass: "bg-neutral-200",
    },
    {
      title: "Hospital systems sub-problem (my focus)",
      band: "Course research · Jan–Mar 2025 · Team of 7",
      startWeek: 0,
      endWeek: 10,
      row: 1,
      colorClass: "bg-neutral-200",
    },
    {
      title: "Progressive disclosure",
      band: "Independent design · Spring 2025",
      startWeek: 10,
      endWeek: 14,
      row: 0,
      colorClass: "bg-neutral-100",
      labelAlign: "end",
    },
    {
      title: "Timeline-first communication",
      band: "Independent design · Spring 2025",
      startWeek: 10,
      endWeek: 14,
      row: 1,
      colorClass: "bg-neutral-100",
      labelAlign: "end",
    },
    {
      title: "Design system draft",
      band: "Independent design · Spring 2025",
      startWeek: 10,
      endWeek: 14,
      row: 2,
      colorClass: "bg-neutral-100",
      labelAlign: "end",
    },
    {
      title: "Frictionless check-ins",
      band: "Independent design · Spring 2025",
      startWeek: 10,
      endWeek: 14,
      row: 3,
      colorClass: "bg-neutral-100",
      labelAlign: "end",
    },
  ] satisfies TimelineTask[],
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
      label: "Intended Impact",
      body: "Designed to cut down the anxious, off-channel messages coordinators receive, by making a shared timeline the default place families check for updates, so they get answers without having to ask.",
    },
  ] satisfies { label: string; body: string | null }[],
};


export const problemSection = {
  heading: "The Problem",
  flow: "[Onboarding: High Support] ---> [Confirmation] ---> [The Drop-Off: Chaos & Isolation]",
  paragraphs: [
    "Through our team's stakeholder interviews, we found a major gap: Support fades the moment pregnancy is confirmed exactly when emotional labor and uncertainty spike.",
    "The sub-problem I led, Hospital Systems Don't Understand Surrogacy, found that hospital staff often aren't trained to support surrogacy, so surrogates are misrecognized and intended parents miss critical updates and bonding moments.",
    "The answer wasn't a better administration tool. It was a care system that sustained trust over nine months.",
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
  researchLinkHref: "/continuum-research-notes",
  decisions: [
    {
      slug: "progressive-disclosure",
      title: "1. Progressive Disclosure (Legal Tasks)",
      anxiety: "Parents were overwhelmed by massive, complex legal checklists.",
      fix: "I show only the immediate next task; future steps are hidden.",
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
      tradeoff: "I gave up more granular health data in exchange for authentic participation.",
    },
  ] satisfies DesignDecision[],
};

export type Stakeholder = {
  slug: string;
  name: string;
  coreNeed: string;
  features: string[];
  demoVideo?: string;
  demoVideoAlt?: string;
};

export const stakeholdersSection = {
  heading: "Designing for Multiple Stakeholders",
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
      demoVideo: "/images/continuum/intended-parent-dashboard-demo.mp4",
      demoVideoAlt: "Walkthrough of the Continuum Intended Parent dashboard",
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
      demoVideo: "/images/continuum/surrogate-dashboard-demo.mp4",
      demoVideoAlt: "Walkthrough of the Continuum Surrogate dashboard",
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
      demoVideo: "/images/continuum/care-coordinator-dashboard-demo.mp4",
      demoVideoAlt: "Walkthrough of the Continuum Care Coordinator dashboard",
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
  image: "/images/continuum/design-system-moodboard.mp4",
  imageAlt: "Continuum design system moodboard showing UI components, icons, buttons, and color palette",
  imageWidth: 908,
  imageHeight: 902,
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
};

export const nextProject = {
  label: "Keep wandering",
  title: "Good Friends Poke",
  description: projectDescription("good-friends-poke"),
  href: "/goodfriends",
  image: "/images/projects/good-friends-poke.png",
  imageAlt: "Good Friends Poke fast-casual dining experience redesign",
  imageWidth: 2446,
  imageHeight: 1376,
};
