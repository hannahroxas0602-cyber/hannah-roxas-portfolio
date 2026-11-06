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

export const tldr: CaseStudyTldr = {
  problem:
    "Surrogacy support fades the moment pregnancy is confirmed, right when emotional labor and uncertainty spike.",
  role: "Researcher on a 7-person class team, then solo product designer after the course.",
  whatIDid:
    "Mapped 9 months of the journey across 3 stakeholder groups, then designed one shared timeline, progressive disclosure, and one-tap emotional check-ins.",
  result:
    "Course concept: role-based dashboards for intended parents, surrogates, and coordinators, all built on one shared timeline.",
  resultMetric: "{{TODO: metric, e.g. usability test or stakeholder feedback result}}",
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


// Two phases: team research during the 10-week course, then solo design
// afterward. The design phase has no stated week count, so the axis shows
// dates instead of week numbers.
// One row per phase, from the phases and tasks the course timeline already had.
export const timelineSection = {
  heading: "Timeline",
  intro: "3 phases: course research and design in 2025, then a redesign in autumn 2026.",
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
      slug: "timeline-redesign",
      date: "Oct to Nov 2026",
      title: "Redesign and clickable prototype",
      body: "Rebuilt as a responsive prototype: one thing to do first for every role, a shared timeline, daily symptom logging, and a coordinator workspace.",
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
    "I led the 'Hospital Systems Don't Understand Surrogacy' sub-problem: hospital staff often aren't trained for surrogacy, so surrogates get misrecognized and intended parents miss critical updates and bonding moments.",
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
  heading: "Design System: Designing for Emotional Safety (course version)",
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

export type RedesignShot = { slug: string; image: string; alt: string; title: string; body: string; why: string };

// The autumn 2026 redesign. Every claim here is about the prototype itself;
// nothing has been tested with real users, so none of it is stated as a result.
export const redesignSection = {
  heading: "The Redesign: One Thing To Do First",
  kicker: "Autumn 2026",
  intro:
    "After the course I rebuilt Continuum as a responsive, clickable prototype and questioned what each person should see first. The visual direction also changed: the warm green palette gave way to a calm neutral base with a small set of gradient widgets reserved for what matters most.",
  heroImage: "/images/continuum/redesign/hero.webp",
  heroAlt: "Continuum redesign: the surrogate and intended-parent phone screens next to the care coordinator's case view",
  heroWidth: 2400,
  heroHeight: 1350,
  shots: [
    {
      slug: "coordinator-first",
      image: "/images/continuum/redesign/coordinator-case.webp",
      alt: "Care coordinator workspace with a gradient 'Do this first' card for an urgent symptom, a waiting-on list with nudge buttons, and a case list sorted by urgency",
      title: "A coordinator opens on one action, not a dashboard",
      body: "The first draft showed coordinators everything at once. The redesign opens each case on a single 'Do this first' card, then who they are waiting on, then what is next. Everything else sits behind four tabs.",
      why: "Coordinators rarely feel finished, so the screen leads with the one thing that matters and gives the rest a place to wait.",
    },
    {
      slug: "daily-check-in",
      image: "/images/continuum/redesign/surrogate-checkin.webp",
      alt: "Three phone screens: the surrogate's Today page with a focal check-in card, the symptom sheet with tap-to-set severity chips, and the urgent-sign alert with call buttons",
      title: "Daily check-in and symptoms, built for one hand",
      body: "The check-in is the focal card until it is done, then the symptom log takes over. 'Nothing today' is one tap, 'Same as yesterday' is another, and severity is tap-to-cycle with a voice note for the rest.",
      why: "Logging has to cost almost nothing, or people stop. Urgent signs break the pattern on purpose: they show who to call straight away.",
    },
    {
      slug: "urgent-path",
      image: "/images/continuum/redesign/urgent-to-coordinator.webp",
      alt: "A phone showing an urgent-sign alert next to the coordinator's case view where that case has jumped to the top with a call as the first action",
      title: "Urgent signs reach the coordinator right away",
      body: "When a surrogate logs an urgent sign, her case jumps to the top of the coordinator's list with 'Call now' as the first action. The symptom list and call guidance are a draft for the prototype and would need clinical review.",
      why: "The riskiest moment should not wait for the next check-in or depend on someone reading a feed.",
    },
    {
      slug: "shared-timeline",
      image: "/images/continuum/redesign/timeline.webp",
      alt: "Three phone screens: a connected-line timeline for the surrogate, the same steps as a month calendar, and the intended parents' timeline",
      title: "One timeline, as a line or a calendar",
      body: "Surrogates, intended parents and coordinators see the same steps, drawn as a connected line or a month calendar. Any step opens what it is, why it matters, what to prepare, documents, and a place to ask a question.",
      why: "People should not have to ask where things stand, and nobody should see a different version of the plan.",
    },
    {
      slug: "coordinator-tools",
      image: "/images/continuum/redesign/coordinator-board.webp",
      alt: "Coordinator journey board with four stage columns, a three-dots menu on each card, and a nudge button on a card waiting on someone else",
      title: "A board with a nudge for whoever is holding things up",
      body: "Cases sit in four stages. Drag a card to move it, or use the three-dots menu, which works with a keyboard and on touch. Cards waiting on someone get a prewritten, editable 'give them a nudge'.",
      why: "Chasing people is a big part of coordination, and it should take one tap, not a blank message.",
    },
    {
      slug: "calendar-messages",
      image: "/images/continuum/redesign/calendar-messages.webp",
      alt: "The coordinator's calendar with a week agenda and month grid, layered over the message inbox",
      title: "Calendar and messages in one consistent layout",
      body: "A week agenda with a month grid, and an inbox on the same conversation layout every role uses, with tap-to-see contact details plus call and email.",
      why: "One layout for conversations means no one has to relearn the screen depending on who they are.",
    },
    {
      slug: "find-coordinator",
      image: "/images/continuum/redesign/find-coordinator.webp",
      alt: "Find your care coordinator: a filterable list of coordinators each with a green certified-through-a-licensed-agency tag, next to a profile screen showing contact information",
      title: "Trust before the journey starts",
      body: "Surrogates and intended parents can browse coordinators, filter by language and openings, and request a short intro call. A green tag marks coordinators certified through a licensed agency, and independent ones are labelled plainly.",
      why: "Choosing who will coordinate your pregnancy is a trust decision. The agencies and people shown are fictional, and a real product would verify each licence.",
    },
  ] satisfies RedesignShot[],
  caveats: [
    "This is a clickable prototype with fictional people, agencies and data.",
    "It has not been tested with real users, and I do not claim outcomes from it.",
    "The clinical content (symptom list, call-now guidance, hard-news script) is an unreviewed draft.",
  ],
  // Optional. Hidden until you deploy the prototype and add the link.
  prototypeUrl: null as string | null,
  prototypeLabel: "Try the prototype",
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
