import { projectDescription } from "@/app/data/projects";
import type { CaseStudyTldr } from "@/app/components/caseStudyTypes";

export const continuumHero = {
  title: "Continuum",
  subtitle:
    "A care-centered platform keeping surrogates, parents, and coordinators in sync after pregnancy confirmation.",
  gist: {
    label: "The Gist:",
    text: "Most surrogacy tools manage paperwork. Continuum manages the human experience.",
  },
  date: "Jan 2025 to Nov 2026 · Course research, then independent design",
  myRole:
    "I researched the problem with a class team of 7, focusing on how hospital systems handle surrogacy. I then designed Continuum on my own, as a responsive, clickable prototype with a design system. I translated highly sensitive, multi-stakeholder emotional anxieties into clear, quiet UI patterns that protect trust.",
  // Items with a null value are hidden until filled.
  meta: [
    { label: "COURSE", value: "MGT 120: Managing and Using Information Technology" },
    { label: "ROLE", value: "Researcher (team), then solo product designer" },
    {
      label: "TEAM",
      value: "7 (research) · Solo (design)",
    },
    { label: "SERVICE", value: "UX research, journey mapping, interaction design, design system" },
  ] satisfies { label: string; value: string | null }[],
};

export const tldr: CaseStudyTldr = {
  problem:
    "Surrogacy support fades the moment pregnancy is confirmed, right when emotional labor and uncertainty spike.",
  role: "Researcher on a 7-person class team, then solo product designer and prototype builder.",
  whatIDid:
    "Mapped 9 months of the journey for 3 roles, then designed one first action per role, one shared timeline, and one-tap daily check-ins, as a responsive prototype.",
  result:
    "A clickable prototype and design system for all three roles, ready to test. Not yet tested with users.",
  resultMetric: "{{TODO: metric, e.g. usability test or stakeholder feedback result}}",
};

export const highlightsSection = {
  heading: "Highlights",
  outcomes: [
    "One thing to do first, for every role",
    "One shared timeline, as a line or a calendar, that all three roles see",
    "A one-tap daily check-in and symptom log, with an urgent path to the coordinator",
  ],
  stats: [
    { value: "3", label: "stakeholder groups designed for" },
    { value: "9", label: "months of journey mapped" },
  ],
  callout: "Less chaos, more continuity.",
};

// Three phases of work: team research during the 10-week course, solo design
// after it, and a responsive prototype with a design system in autumn 2026.
export const timelineSection = {
  heading: "Timeline",
  intro: "3 phases: course research, solo design, and a responsive prototype with a design system.",
  items: [
    {
      slug: "timeline-research",
      date: "Jan–Mar 2025",
      title: "Course research · Team of 7",
      body: "Stakeholder interviews, then the hospital systems sub-problem (my focus).",
    },
    {
      slug: "timeline-design",
      date: "Spring 2025",
      title: "Solo design",
      body: "Progressive disclosure, timeline-first communication, a design system draft, and frictionless check-ins.",
    },
    {
      slug: "timeline-prototype",
      date: "Oct to Nov 2026",
      title: "Responsive prototype and design system",
      body: "A clickable prototype across phone, dual-screen, and desktop: one thing to do first for every role, a shared timeline, daily symptom logging, and a coordinator workspace.",
    },
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
      body: "A responsive platform for phone, dual-screen, and desktop that replaces chaos with one shared timeline, a first action for every role, and lightweight daily check-ins.",
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
    "Through our team's stakeholder interviews, we found a major gap: support fades the moment pregnancy is confirmed, exactly when emotional labor and uncertainty spike.",
    "I led the 'Hospital Systems Don't Understand Surrogacy' sub-problem: hospital staff often aren't trained for surrogacy, so surrogates get misrecognized and intended parents miss critical updates and bonding moments.",
    "Families fill the gap with group texts, spreadsheets, and email threads. The answer wasn't a better administration tool. It was a care system that sustained trust over nine months.",
  ],
  image: "/images/continuum/v2/problem.webp",
  imageAlt:
    "Illustrative collage of the problem: a support curve that drops after pregnancy is confirmed, a late-night group text, a messy task spreadsheet, a chain of email subjects, and the research finding about hospital staff",
  imageWidth: 2400,
  imageHeight: 1350,
};

export type DesignDecision = {
  slug: string;
  title: string;
  anxiety: string;
  fix: string;
  tradeoff: string;
  image: string;
  imageAlt: string;
};

export const decisionsSection = {
  heading: "3 Critical Design Decisions (And the Tradeoffs)",
  intro: "Instead of showing every screen, here are the strategic decisions that shaped the product:",
  researchLinkLabel: "View full research",
  researchLinkHref: "/continuum-research-notes",
  decisions: [
    {
      slug: "one-thing-first",
      title: "1. One Thing To Do First (Every Role)",
      anxiety:
        "Parents faced long legal checklists, coordinators faced a wall of cases, and surrogates faced a screen of options.",
      fix: "Each role opens on one focal action: the next legal step, the coordinator's 'Do this first' card, the daily check-in. Everything else waits behind a tab.",
      tradeoff: "People lose the big picture at a glance, but gain daily calm and a clear place to start.",
      image: "/images/continuum/v2/decision-first.webp",
      imageAlt:
        "The coordinator's desktop view with a gradient 'Do this first' card next to the surrogate's phone, where the daily check-in is the focal card",
    },
    {
      slug: "shared-timeline",
      title: "2. One Shared Timeline (Communication)",
      anxiety:
        "Group chats created pressure for instant replies, and different people held different versions of the plan.",
      fix: "One timeline, drawn as a connected line or a calendar, that all three roles see. Any step opens what it is, why it matters, what to prepare, documents, and a place to ask.",
      tradeoff: "Conversation moves out of the chat, which feels slower, but it removes the urgency of an always-on group thread.",
      image: "/images/continuum/v2/decision-timeline.webp",
      imageAlt:
        "The shared timeline as a connected line on desktop, and the same steps as a month calendar on a phone",
    },
    {
      slug: "frictionless-checkins",
      title: "3. Frictionless Check-ins, With One Exception",
      anxiety: 'Surrogates wanted support but hated feeling monitored or given "homework."',
      fix: "One tap for mood, one tap for 'Nothing today', tap-to-set symptoms with a voice note. Urgent signs are the exception: they show who to call and alert the coordinator at once.",
      tradeoff:
        "I gave up granular health data in exchange for real participation. The symptom list and call guidance are a draft that needs clinical review.",
      image: "/images/continuum/v2/decision-checkin.webp",
      imageAlt:
        "The surrogate's urgent-sign alert on a phone next to the coordinator's desktop view, where that case has jumped to the top with a call as the first action",
    },
  ] satisfies DesignDecision[],
};

export type Stakeholder = {
  slug: string;
  name: string;
  coreNeed: string;
  features: string[];
  image: string;
  imageAlt: string;
};

export const stakeholdersSection = {
  heading: "Designing for Multiple Stakeholders",
  stakeholders: [
    {
      slug: "intended-parents",
      name: "Intended Parents",
      coreNeed: "Reassurance & Clarity",
      features: [
        "One next step, with why it matters and when it is due",
        "The same full timeline the surrogate sees, as a line or calendar",
        "Documents, signatures, and the hospital handoff card in one place",
      ],
      image: "/images/continuum/v2/stakeholder-parents.webp",
      imageAlt: "The intended parents' home on desktop and phone: the one next step, a shared timeline, and how Maya is",
    },
    {
      slug: "surrogates",
      name: "Surrogates",
      coreNeed: "Autonomy & Care",
      features: [
        "A one-tap mood check-in and a quick daily symptom log",
        "Consent-based visibility: she chooses who sees what, with a live preview",
        "A birth-day flow that tells everyone she names in one tap",
      ],
      image: "/images/continuum/v2/stakeholder-surrogates.webp",
      imageAlt: "The surrogate's Today page on desktop and phone with the focal check-in card",
    },
    {
      slug: "care-coordinators",
      name: "Care Coordinators",
      coreNeed: "Risk Detection & Focus",
      features: [
        "A 'Do this first' card for each case, sorted by urgency",
        "Board, calendar, and messages, with a one-tap nudge for whoever is holding things up",
        "A certified-coordinator tag so families know who they are working with",
      ],
      image: "/images/continuum/v2/stakeholder-coordinators.webp",
      imageAlt: "The coordinator's case view on desktop and the case list on phone",
    },
  ] satisfies Stakeholder[],
};

export const designSystemSection = {
  heading: "Design System: Designing for Emotional Safety",
  intro: "To lower cognitive load during high-stress moments, the system favors calm and restraint:",
  principles: [
    {
      title: "A calm neutral base, gradient only for what matters most,",
      body: "so the one important thing is the one thing that stands out. Each palette means one thing.",
    },
    {
      title: "Colour never works alone:",
      body: "every colour meaning has a label or an icon, and text on gradients is white and checked for contrast.",
    },
    {
      title: "Large type, large targets, and display settings",
      body: "for larger text, reduced motion and transparency, and higher contrast.",
    },
  ],
  images: [
    {
      src: "/images/continuum/v2/design-system-bento.webp",
      alt: "Design system overview: the logo, warm real photography, the Geist type specimen, the gradient widget palette, and the one-tap mood list",
    },
    {
      src: "/images/continuum/v2/components-bento.webp",
      alt: "Components: buttons, tags and the certified-coordinator tag, gradient widgets, switches, symptom chips, timeline states, and colour meaning",
    },
  ],
  imageWidth: 2400,
  imageHeight: 1350,
};

// Shown once, under the hero. Nothing in this case study is a tested result.
export const prototypeNote = {
  text: "A clickable prototype with fictional people, agencies, and data. Not yet tested with users, and the clinical content (symptom list, call-now guidance) is an unreviewed draft.",
  // Optional. Hidden until you deploy the prototype and add the link.
  url: null as string | null,
  label: "Try the prototype",
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
    {
      title: "Get clinical and accessibility review",
      body: "of the symptom list and call guidance, and run a screen-reader and keyboard-only pass.",
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
