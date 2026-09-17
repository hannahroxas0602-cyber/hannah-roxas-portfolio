import type { TimelineBand, TimelineTask } from "@/app/components/caseStudyTypes";

export const learvoHero = {
  title: "Learvo: Onboarding & In-App UX Overhaul",
  subtitle:
    "Redesigning how new users activate and how returning users study, across onboarding, navigation, and quiz review.",
  gist: {
    label: "The Gist:",
    text: "New users landed on an empty dashboard with nothing to do, and returning users hit inconsistent nav, unclear quiz status, and a broken Pomodoro timer. I redesigned the first session and the daily-use experience end to end.",
  },
  date: "[DATES] (Product Design Internship)",
  meta: [
    { label: "ROLE", value: "Product Design Intern" },
    { label: "TEAM", value: "Learvo" },
    { label: "SCOPE", value: "Onboarding Flow, Activation Nudges, Navigation, Quiz Review UX" },
  ],
  image: "/images/learvo/hero.png",
  imageAlt: "Learvo onboarding and in-app redesign overview",
  imageWidth: 1600,
  imageHeight: 1000,
  isPlaceholder: true,
};

export const highlightsSection = {
  heading: "Highlights",
  // No mockup image yet — add one back once a real screenshot exists.
  outcomes: [
    "Replaced a cold, empty first-session dashboard with a guided upload → goal → customize → generate flow",
    "Built a decaying activation checklist that nudges the 4 core actions without nagging long-term users",
    "Shipped a consistent top nav with real avatars and a working Pomodoro timer across 5 core pages",
    "Merged two competing quiz-review tabs into one sorted list with honest, data-backed status and stats",
  ],
  stats: [
    { value: "4", label: "shipped feature areas" },
    { value: "5", label: "core pages unified under one nav system" },
  ],
  callout: "From a cold dashboard to a guided first session — and a consistent one after that.",
};

export const timelineSection = {
  heading: "Timeline",
  totalWeeks: 12,
  bands: [
    { label: "Onboarding Quiz Flow", colorClass: "bg-neutral-900", startWeek: 0, endWeek: 4 },
    { label: "Onboarding Checklist", colorClass: "bg-neutral-700", startWeek: 3, endWeek: 6 },
    { label: "Top Nav", colorClass: "bg-neutral-600", startWeek: 5, endWeek: 9 },
    { label: "Quiz Card Reorg", colorClass: "bg-neutral-500", startWeek: 8, endWeek: 12 },
  ] satisfies TimelineBand[],
  tasks: [
    {
      title: "Guided upload → goal → customize → generate flow",
      band: "Onboarding Quiz Flow",
      startWeek: 0,
      endWeek: 3,
      row: 0,
      colorClass: "bg-neutral-200",
    },
    {
      title: "Generation progress, stall warning, retry handling",
      band: "Onboarding Quiz Flow",
      startWeek: 2,
      endWeek: 4,
      row: 1,
      colorClass: "bg-neutral-100",
    },
    {
      title: "4-task checklist with visit-based decay logic",
      band: "Onboarding Checklist",
      startWeek: 3,
      endWeek: 5,
      row: 0,
      colorClass: "bg-neutral-200",
    },
    {
      title: "Cross-page completion tracking + tablet nav variant",
      band: "Onboarding Checklist",
      startWeek: 4.5,
      endWeek: 6,
      row: 1,
      colorClass: "bg-neutral-100",
    },
    {
      title: "TopNav rollout across 5 pages + real avatars",
      band: "Top Nav",
      startWeek: 5,
      endWeek: 7.5,
      row: 0,
      colorClass: "bg-neutral-200",
    },
    {
      title: "Pomodoro rework + mobile drawer reorganization",
      band: "Top Nav",
      startWeek: 7,
      endWeek: 9,
      row: 1,
      colorClass: "bg-neutral-100",
    },
    {
      title: "Merge Past Quizzes + In Progress into one list",
      band: "Quiz Card Reorg",
      startWeek: 8,
      endWeek: 10,
      row: 0,
      colorClass: "bg-neutral-200",
    },
    {
      title: "Tier badges, contrast fix, unified buttons, stat banner",
      band: "Quiz Card Reorg",
      startWeek: 9.5,
      endWeek: 12,
      row: 1,
      colorClass: "bg-neutral-100",
    },
  ] satisfies TimelineTask[],
};

export const roleAndImpact = {
  heading: "My Role & Impact",
  columns: [
    {
      label: "Problem",
      body: "New users signed up and landed on an empty dashboard with nothing to do — and referral tracking broke mid-flight because signup redirected before it could settle. Returning users hit an inconsistent nav, an implicit and sometimes inaccessible quiz status system, and a broken Pomodoro timer.",
    },
    {
      label: "Solution",
      body: "A guided first-session flow backed by real generation state, a decaying activation checklist, one consistent top nav across the app, and a quiz review system that replaced encouragement copy and fake streaks with real, data-backed status.",
    },
    {
      label: "Impact",
      body: "Turned a cold first session into a guided activation flow tied to real backend state, and turned daily use into a consistent, accessible experience — while shipping under real integration pressure alongside other concurrently-developed features.",
    },
  ],
};

export type FeatureCategory = {
  slug: string;
  title: string;
  problem: string;
  items: { label: string; body: string }[];
  impact: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  isPlaceholder: boolean;
};

export const featuresSection = {
  heading: "What I Shipped",
  categories: [
    {
      slug: "onboarding-quiz-flow",
      title: "Onboarding Quiz Flow",
      problem:
        "New users signing up via Google or Apple landed cold on an empty dashboard with nothing to do. Referral tracking was also getting killed mid-flight because signup redirected immediately instead of waiting for it to settle.",
      items: [
        {
          label: "Guided first session:",
          body: "Upload → goal selection → quiz/summary/flashcard customization → generation, before the user ever sees a bare dashboard.",
        },
        {
          label: "Full customization step:",
          body: "Quiz and summary length and style controls with benefit-driven copy explaining why each choice matters.",
        },
        {
          label: "Real generation progress:",
          body: "Shows actual backend progress phases instead of a bare percentage, plus a stall warning if there's no movement in 25 seconds.",
        },
        {
          label: "Graceful failure handling:",
          body: "Generation failures get a \"Try again\" button and toast/auto-redirect instead of a dead-end error banner.",
        },
        {
          label: "Backend-adjacent fix:",
          body: "Resolved orphaned QuizAttempt database rows from a speculative attempt-start race — unused attempts are now cancelled via cancelQuizAttempt.",
        },
        {
          label: "Correctness fixes:",
          body: "Gated the quiz behind actual fresh signup, fixed a premature \"celebration\" trigger and tablet overflow, and routed OAuth (Google/Apple) signups on /login into onboarding too, with test coverage.",
        },
        {
          label: "Per-user storage scoping:",
          body: "Onboarding state no longer leaks across accounts on shared browsers.",
        },
      ],
      impact:
        "Turned a cold, empty dashboard into a guided activation flow tied to real backend state — the strongest activation story in this body of work, even without hard funnel numbers yet.",
      image: "/images/learvo/onboarding-quiz-flow.png",
      imageAlt: "Learvo guided onboarding quiz flow mockup",
      imageWidth: 1600,
      imageHeight: 1000,
      isPlaceholder: true,
    },
    {
      slug: "onboarding-checklist",
      title: "Onboarding Checklist",
      problem:
        "Separate from the quiz flow, users needed a persistent nudge to actually complete the 4 core actions — upload notes, take a quiz, make a flashcard deck, generate an AI summary — rather than a one-time push at signup.",
      items: [
        {
          label: "4-task checklist with decay logic:",
          body: "Visible on visits 1–4, auto-hides permanently on visit 5+ so it never becomes a long-term annoyance.",
        },
        {
          label: "Session-only vs. permanent dismiss:",
          body: "The X button dismisses for the current session only and returns next session; it's gone for good after visit 5.",
        },
        {
          label: "Cross-page completion tracking:",
          body: "Built via a shared onboardingCelebration util and onboardingStore so progress persists as users move between pages.",
        },
        {
          label: "Tablet-collapsed variant:",
          body: "A waving-hand icon with a notification badge for smaller viewports.",
        },
        {
          label: "Reliability fixes:",
          body: "Fixed the checklist not showing for new users on reused browsers or failed fetches, added per-user storage scoping, deferred rendering until session settles, added returning-learner tagging, and fixed copy mismatches.",
        },
      ],
      impact:
        "An activation nudge system with built-in decay logic — designed to drive engagement without nagging long-term users.",
      image: "/images/learvo/onboarding-checklist.png",
      imageAlt: "Learvo onboarding checklist mockup",
      imageWidth: 1600,
      imageHeight: 1000,
      isPlaceholder: true,
    },
    {
      slug: "top-nav",
      title: "Top Nav",
      problem:
        "The old nav had no page identity (no titles), the profile used emoji placeholders instead of real avatars, the Pomodoro timer had input and reset bugs, and mobile lacked a sensible place for the timer, feedback, and profile actions.",
      items: [
        {
          label: "New TopNav across 5 pages:",
          body: "Flashcards, Library, Quizzes, Summaries, and Generator each get a page title and a per-page action slot (e.g. \"Create Quiz\", \"New Deck\").",
        },
        {
          label: "Real avatar system:",
          body: "Preset avatars plus custom upload, replacing emoji placeholders.",
        },
        {
          label: "Pomodoro rework:",
          body: "MM:SS digit-mask input, correct preset vs. custom behavior, and a consistent reset-to-zero for custom timers.",
        },
        {
          label: "Mobile-specific reorganization:",
          body: "Feedback icon replaces the timer in the top bar; the timer moves to a bottom drawer. The profile modal becomes a bottom drawer with keyboard-aware padding.",
        },
        {
          label: "Shipped under integration pressure:",
          body: "Rebased across 121 diverged commits and manually resolved conflicts to merge cleanly with concurrently-shipped features (global search, ambassador program, quiz tutorial).",
        },
      ],
      impact:
        "A consistent navigation system shipped without regressing other in-flight features — a real test of merging under integration pressure, not just visual design.",
      image: "/images/learvo/top-nav.png",
      imageAlt: "Learvo top navigation redesign mockup",
      imageWidth: 1600,
      imageHeight: 1000,
      isPlaceholder: true,
    },
    {
      slug: "quiz-card-reorg",
      title: "Quiz Card Reorganization",
      problem:
        "\"Past Quizzes\" and \"In Progress\" lived in separate tabs, cards used encouragement copy that didn't scale, tier status was implicit in whichever tab you were looking at, and CTA colors and button styles were inconsistent.",
      items: [
        {
          label: "One recency-sorted list:",
          body: "Merged Past Quizzes and In Progress into a single list; each card carries its own tier badge (Mastered / Still Learning / Needs Work / In Progress) instead of relying on the tab it's in.",
        },
        {
          label: "Real question-type labels:",
          body: "Replaced encouragement copy under the score with the actual question-type label (e.g. \"MCQ · T/F\"), reusing existing parsing logic for consistency app-wide.",
        },
        {
          label: "Accessibility fix:",
          body: "Fixed a real contrast failure — white text on a pastel fill — by standardizing on dark text.",
        },
        {
          label: "Unified button system:",
          body: "Merged two competing button styles (outline \"Results\" vs. frosted \"Retake\") into one pill-button family.",
        },
        {
          label: "Honest, data-backed banner:",
          body: "Reworked the banner from a Tour/Lenny/Research carousel into two data-driven stat boxes (quizzes this week, questions answered overall) computed from real user data — and deliberately cut a \"weekly streak\" feature that had no real activity-tracking behind it.",
        },
      ],
      impact:
        "The clearest UX judgment story in this work: catching and fixing a real accessibility defect, and choosing to cut a feature rather than fake the data behind it.",
      image: "/images/learvo/quiz-card-reorg.png",
      imageAlt: "Learvo quiz card reorganization mockup",
      imageWidth: 1600,
      imageHeight: 1000,
      isPlaceholder: true,
    },
  ] satisfies FeatureCategory[],
};

export const nextStepsSection = {
  heading: "What I'd Do Next",
  items: [
    {
      title: "Instrument the onboarding funnel:",
      body: "Add step-level analytics to the guided quiz flow to replace the current qualitative impact story with real drop-off and completion numbers.",
    },
    {
      title: "Validate the checklist decay window:",
      body: "A/B test the visit-5 cutoff against a longer or engagement-based threshold to confirm it's not hiding the nudge too early for slower-activating users.",
    },
    {
      title: "Build the streak feature properly:",
      body: "Stand up real activity-tracking infrastructure so the \"weekly streak\" concept cut from the quiz card banner can come back as something honest, not decorative.",
    },
  ],
};

export const nextProject = {
  label: "Keep Wandering",
  title: "Good Friends Poke",
  description:
    "Redesigning the fast-casual dining experience to eliminate customer friction and peak-hour staff burnout.",
  href: "/goodfriends",
  image: "/images/projects/good-friends-poke.png",
  imageAlt: "Good Friends Poke fast-casual dining experience redesign",
  imageWidth: 2446,
  imageHeight: 1376,
};
