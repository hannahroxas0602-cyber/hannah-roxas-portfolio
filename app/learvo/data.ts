export const learvoHero = {
  title: "Learvo",
  subtitle:
    "Designing the first session and the daily study loop for an AI study-tool startup — as the only product designer on the team.",
  gist: {
    label: "The Gist:",
    text: "New users landed on an empty dashboard with nothing to do. Returning users hit an inconsistent nav and a quiz review screen with no real signal in it. I redesigned both, then shipped the code myself.",
  },
  date: "Oct 2025 — Present · Product Design Intern",
  meta: [
    { label: "ROLE", value: "Product Design Intern (design + frontend implementation)" },
    { label: "TEAM", value: "Learvo — solo designer, shipping directly into a live codebase" },
    { label: "SCOPE", value: "Onboarding activation, navigation system, quiz review UX" },
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
    "Replaced a cold, empty first session with a guided flow tied to real backend generation state",
    "Designed an activation nudge that decays on its own instead of nagging long-term users forever",
    "Shipped one consistent nav system across 5 pages while merging through 121 diverged commits",
    "Cut a fake \"streak\" feature rather than ship engagement numbers with nothing real behind them",
  ],
  stats: [
    { value: "4", label: "features designed and shipped solo" },
    { value: "5", label: "core pages unified under one nav system" },
  ],
  callout: "Judgment calls, not just visual polish — every section leads with the decision, not the checklist.",
};

export const timelineSection = {
  heading: "Timeline",
  items: [
    {
      date: "Oct 2025",
      title: "Onboarding Quiz Flow",
      body: "Designed and shipped the guided upload → goal → customize → generate flow, replacing the empty first-session dashboard.",
    },
    {
      date: "Nov 2025",
      title: "Onboarding Checklist",
      body: "Designed a persistent, decaying activation nudge for the 4 core actions, built to fade out for users who've already activated.",
    },
    {
      date: "Dec 2025 — Jan 2026",
      title: "Top Nav",
      body: "Redesigned navigation across 5 core pages and shipped it through a long-diverged branch alongside other in-flight features.",
    },
    {
      date: "Feb 2026",
      title: "Quiz Card Reorganization",
      body: "Merged two competing quiz-review tabs into one honest, data-backed list and fixed a real accessibility defect along the way.",
    },
    {
      date: "Now",
      title: "Ongoing",
      body: "Still with Learvo, continuing to design and ship across the product.",
    },
  ],
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
      body: "A guided first-session flow backed by real generation state, an activation nudge with built-in decay, one consistent top nav across the app, and a quiz review system that replaced encouragement copy and fake streaks with real, data-backed status.",
    },
    {
      label: "Impact",
      body: "As the only designer on the team, I didn't just design these flows — I shipped the code myself, which meant every design decision also had to survive contact with a real, actively-changing codebase.",
    },
  ],
};

export type FeatureCategory = {
  slug: string;
  title: string;
  problem: string;
  decision: string;
  supportingPoints: { label: string; body: string }[];
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
      decision:
        "The easy fix here would have been a fake progress bar that just counts up to 100%. I designed against that — the generation screen shows the real backend phase the request is in, and if nothing moves for 25 seconds, it says so instead of letting the user stare at a stalled number wondering if it's broken.",
      supportingPoints: [
        {
          label: "Guided first session:",
          body: "Upload → goal selection → quiz/summary/flashcard customization → generation, replacing the bare dashboard new users used to land on.",
        },
        {
          label: "Failure handling that doesn't dead-end:",
          body: "Generation failures surface a \"Try again\" button and toast/auto-redirect instead of an error banner with no way forward.",
        },
        {
          label: "Fixed the state underneath the UI:",
          body: "Gated the quiz behind actual fresh signup (was firing on stale sessions), routed OAuth signups into onboarding with test coverage, and scoped onboarding state per-user so it can't leak across accounts on a shared browser.",
        },
      ],
      impact:
        "Turned a cold, empty dashboard into a guided activation flow that tells the truth about what's happening in the backend — the strongest activation story here, even without funnel numbers yet.",
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
      decision:
        "A checklist that never goes away is a nag, not a nudge. I designed decay into it on purpose: it's visible for a user's first 4 visits, then disappears for good on visit 5 — whether or not they finished it. Growth wanted persistence; I traded some short-term completion pressure for not annoying the users who've already moved past onboarding.",
      supportingPoints: [
        {
          label: "Two dismiss states, not one:",
          body: "The X button dismisses for the current session only and returns next session — it's only gone for good after visit 5, so an accidental close doesn't cost a user the nudge entirely.",
        },
        {
          label: "Cross-page completion tracking:",
          body: "Progress persists as users move between pages via a shared onboardingCelebration util and store, instead of resetting per page.",
        },
        {
          label: "Collapsed variant for tablet:",
          body: "A waving-hand icon with a notification badge, so the nudge survives on smaller viewports without eating layout space.",
        },
      ],
      impact:
        "An activation nudge that's designed to lose the argument with itself over time — built to drive early engagement without becoming permanent nagware.",
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
      decision:
        "This wasn't just a nav redesign — it was a scope call under pressure. The branch had diverged 121 commits from main by the time it was ready, with other teams shipping global search, an ambassador program, and a quiz tutorial in that same window. I rebased and resolved every conflict by hand rather than asking for a freeze, because blocking three other in-flight features to land one nav redesign wasn't a fair trade.",
      supportingPoints: [
        {
          label: "One nav system, 5 pages:",
          body: "Flashcards, Library, Quizzes, Summaries, and Generator each get a page title and a per-page action slot (e.g. \"Create Quiz\", \"New Deck\") instead of a generic shared header.",
        },
        {
          label: "Real avatars, not emoji:",
          body: "Preset avatars plus custom upload replaced emoji placeholders in the profile.",
        },
        {
          label: "Mobile got its own layout, not a squeeze:",
          body: "Feedback icon replaces the timer in the top bar on mobile; the timer moves to a bottom drawer, and the profile modal becomes a keyboard-aware bottom drawer instead of a cramped popover.",
        },
      ],
      impact:
        "A consistent nav system that shipped without blocking or regressing three other features landing in the same window — an integration problem as much as a design one.",
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
      decision:
        "The existing banner had a \"weekly streak\" stat. It looked great and it was fake — there was no real activity-tracking behind it. I cut it rather than ship a number that would mislead users about their own behavior, and replaced it with two stats computed from data that actually exists: quizzes this week, questions answered overall.",
      supportingPoints: [
        {
          label: "One list instead of two tabs:",
          body: "Merged Past Quizzes and In Progress into a single recency-sorted list; each card carries its own tier badge (Mastered / Still Learning / Needs Work / In Progress) instead of relying on which tab you're in to know your status.",
        },
        {
          label: "Fixed a real accessibility defect:",
          body: "Found and fixed a contrast failure — white text on a pastel fill — by standardizing on dark text across the cards.",
        },
        {
          label: "One button system instead of two:",
          body: "Merged competing outline (\"Results\") and frosted (\"Retake\") button styles into a single pill-button family used consistently across cards.",
        },
      ],
      impact:
        "The clearest judgment call in this work: catching an accessibility bug most people would ship past, and turning down a good-looking fake metric in favor of a smaller, honest one.",
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
      body: "Test the visit-5 cutoff against a longer or engagement-based threshold to confirm it's not hiding the nudge too early for slower-activating users.",
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
