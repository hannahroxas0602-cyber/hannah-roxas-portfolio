export const learvoHero = {
  title: "Learvo",
  subtitle:
    "The only product designer at an ed-tech startup turning student notes into quizzes, flashcards, summaries, and mnemonics.",
  gist: {
    label: "The Gist:",
    text: "New users landed on an empty dashboard. Returning users hit an inconsistent nav and a quiz screen with no real signal. I redesigned both and shipped the code myself.",
  },
  date: "Oct 2025 to Present (Sep 2026) · Product Design Intern",
  meta: [
    { label: "ROLE", value: "Product Design Intern (design + frontend implementation)" },
    { label: "TEAM", value: "Learvo, solo designer shipping directly into a live codebase" },
    { label: "SCOPE", value: "Landing page, onboarding activation, navigation system, quiz review UX" },
  ],
  image: "/images/learvo/learvo_hero.png",
  imageAlt: "Learvo's redesigned landing page, showing the hero section with Lenny, the doodle system, and a live quiz preview",
  imageWidth: 2880,
  imageHeight: 1544,
  isPlaceholder: false,
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
  callout: "Judgment calls, not just visual polish. Every section leads with the decision, not the checklist.",
};

export const timelineSection = {
  heading: "Timeline",
  items: [
    {
      slug: "timeline-lenny",
      date: "Oct 2025",
      title: "Lenny, the Mascot",
      body: "Designed Lenny, Learvo's mascot, starting with sketches and landing on the final character design used across the product.",
    },
    {
      slug: "timeline-doodles",
      date: "Dec 2025, ongoing",
      title: "Doodle System",
      body: "Started designing Learvo's hand-drawn doodle system, extended over time into preset profile avatars and more illustration touchpoints.",
    },
    {
      slug: "timeline-landing-page",
      date: "June 2026",
      title: "Landing Page Redesign",
      body: "Redesigned the marketing landing page to reinforce Learvo's brand identity at the first touchpoint a new user sees.",
    },
    {
      slug: "timeline-checklist",
      date: "July 2026",
      title: "Onboarding Checklist",
      body: "Designed a persistent, decaying activation nudge for the 4 core actions, built to fade out for users who've already activated.",
    },
    {
      slug: "timeline-top-nav",
      date: "Aug 2026",
      title: "Top Nav",
      body: "Redesigned navigation across 5 core pages and shipped it through a long-diverged branch alongside other in-flight features.",
    },
    {
      slug: "timeline-quiz-flow",
      date: "Sep 2026",
      title: "Onboarding Quiz Flow",
      body: "Shipped the guided upload, goal, customize, generate flow, replacing the empty first-session dashboard.",
    },
  ],
};

export const roleAndImpact = {
  heading: "My Role & Impact",
  columns: [
    {
      label: "Problem",
      body: "New users signed up and landed on an empty dashboard with nothing to do, and referral tracking broke mid-flight because signup redirected before it could settle. Returning users hit an inconsistent nav, an implicit and sometimes inaccessible quiz status system, and a broken Pomodoro timer.",
    },
    {
      label: "Solution",
      body: "A guided first-session flow backed by real generation state, an activation nudge with built-in decay, one consistent top nav across the app, and a quiz review system that replaced encouragement copy and fake streaks with real, data-backed status.",
    },
    {
      label: "Impact",
      body: "As the only designer, I shipped the code myself, so every decision had to survive a real, changing codebase. I learned Git and opened pull requests across frontend and backend, working directly with engineers instead of handing off static designs.",
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
  video?: { src: string; width: number; height: number };
  slides?: { src: string; alt: string; width: number; height: number }[];
  isHidden?: boolean;
};

export const featuresSection = {
  heading: "What I Shipped",
  categories: [
    {
      slug: "landing-page",
      title: "Landing Page Redesign",
      problem:
        "The old page read as a generic, gradient-heavy \"startup website\" with no color, mascot, or brand identity. Analytics showed most visitors never scrolled past the fold, so the product's value never reached them.",
      decision:
        "College students decide in seconds whether a study tool is worth their time, usually while stressed or between classes. I led with speed over a feature list and restructured the page around one promise: turn your notes into a quiz or flashcard deck almost instantly.",
      supportingPoints: [
        {
          label: "Brand identity replaced generic gradients:",
          body: "Rebuilt the page around Learvo's palette, Lenny, and the doodle system so it reads as built for college students, not a generic SaaS template.",
        },
        {
          label: "Copy rewritten around a real pain point:",
          body: "Reframed messaging around not spending money and not losing study time, instead of generic productivity language.",
        },
        {
          label: "Structured navigation, not a hope-they-scroll page:",
          body: "Added a hero CTA to the value section, a second CTA to the FAQ, and a sticky nav CTA, so value is reachable from anywhere on the page.",
        },
      ],
      impact:
        "Rebuilt the page around getting a busy, skeptical student to the value proposition fast. Before/after scroll and engagement data to follow.",
      image: "/images/learvo/learvo_hero.png",
      imageAlt: "Learvo's redesigned landing page, showing the hero section with Lenny, the doodle system, and a live quiz preview",
      imageWidth: 2880,
      imageHeight: 1544,
      isPlaceholder: false,
      video: {
        src: "/images/learvo/landing-page-demo.mp4",
        width: 1196,
        height: 720,
      },
    },
    {
      slug: "onboarding-checklist",
      title: "Onboarding Checklist",
      problem:
        "Users needed a persistent nudge to complete 4 core actions (upload, quiz, flashcards, summary), not just a one-time push at signup.",
      decision:
        "A checklist that never goes away is a nag, not a nudge. I built in decay on purpose: visible for a user's first 4 visits, gone for good on visit 5. Growth wanted persistence; I traded some completion pressure for not annoying users who'd already moved on.",
      supportingPoints: [
        {
          label: "Two dismiss states, not one:",
          body: "The X dismisses for the current session and returns next time. It's only gone for good after visit 5, so an accidental close doesn't cost the nudge entirely.",
        },
        {
          label: "Cross-page completion tracking:",
          body: "Progress persists across pages via a shared store, instead of resetting per page.",
        },
        {
          label: "Collapsed variant for tablet:",
          body: "A waving-hand icon with a notification badge keeps the nudge alive on smaller viewports without eating layout space.",
        },
      ],
      impact:
        "An activation nudge built to lose the argument with itself over time, driving early engagement without becoming permanent nagware.",
      image: "/images/learvo/onboarding-checklist-1.png",
      imageAlt: "Learvo onboarding checklist card showing 4 core actions",
      imageWidth: 1006,
      imageHeight: 1226,
      isPlaceholder: false,
      slides: [
        { src: "/images/learvo/onboarding-checklist-1.png", alt: "Onboarding checklist, 2 of 4 complete", width: 1006, height: 1226 },
        { src: "/images/learvo/onboarding-checklist-2.png", alt: "Onboarding checklist collapsed variant", width: 1256, height: 1216 },
        { src: "/images/learvo/onboarding-checklist-3.png", alt: "Onboarding checklist tablet layout", width: 1870, height: 1366 },
      ],
    },
    {
      slug: "top-nav",
      title: "Top Nav",
      image: "/images/learvo/top-nav-avatars.png",
      imageAlt: "Five custom hand-drawn preset avatar options for Learvo profiles",
      imageWidth: 2160,
      imageHeight: 480,
      isPlaceholder: false,
      video: {
        src: "/images/learvo/top-nav-demo.mp4",
        width: 1196,
        height: 720,
      },
      slides: [
        { src: "/images/learvo/top-nav-still-1.png", alt: "Learvo feedback modal", width: 2832, height: 1372 },
        { src: "/images/learvo/top-nav-still-2.png", alt: "Learvo profile modal with avatar picker", width: 2830, height: 1362 },
        { src: "/images/learvo/top-nav-still-3.png", alt: "Learvo mobile navigation drawer", width: 988, height: 1368 },
        { src: "/images/learvo/top-nav-avatars.png", alt: "Five custom hand-drawn preset avatar options", width: 2160, height: 480 },
      ],
      problem:
        "The old nav had no page identity, emoji placeholders instead of real avatars, a buggy Pomodoro timer, and no sensible mobile layout for timer, feedback, and profile actions.",
      decision:
        "This was a scope call under pressure, not just a nav redesign. The branch had diverged 121 commits from main while other teams shipped global search, an ambassador program, and a quiz tutorial in the same window. I rebased by hand rather than ask for a freeze, since blocking three features to land one redesign wasn't a fair trade.",
      supportingPoints: [
        {
          label: "One nav system, 5 pages:",
          body: "Flashcards, Library, Quizzes, Summaries, and Generator each get a page title and a per-page action slot instead of a generic shared header.",
        },
        {
          label: "Real avatars, not emoji:",
          body: "Preset avatars plus custom upload replaced emoji placeholders in the profile.",
        },
        {
          label: "Mobile got its own layout, not a squeeze:",
          body: "A feedback icon replaces the timer in the mobile top bar; the timer moves to a bottom drawer, and profile becomes a keyboard-aware drawer instead of a cramped popover.",
        },
      ],
      impact:
        "A consistent nav that shipped without blocking or regressing three other features landing in the same window, as much an integration problem as a design one.",
    },
    {
      slug: "onboarding-quiz-flow",
      title: "Onboarding Quiz Flow",
      problem:
        "New users landed cold on an empty dashboard after signup. Referral tracking also broke mid-flight because signup redirected before it could settle.",
      decision:
        "The easy fix was a fake progress bar counting to 100%. I designed against that: the generation screen shows the real backend phase, and if nothing moves for 25 seconds, it says so instead of leaving the user guessing.",
      supportingPoints: [
        {
          label: "Guided first session:",
          body: "Upload, goal selection, customization, then generation, replacing the bare dashboard new users used to land on.",
        },
        {
          label: "Failure handling that doesn't dead-end:",
          body: "Generation failures surface a \"Try again\" button and auto-redirect instead of an error banner with no way forward.",
        },
        {
          label: "Fixed the state underneath the UI:",
          body: "Gated the quiz behind actual fresh signup (was firing on stale sessions), routed OAuth signups into onboarding, and scoped state per-user so it can't leak on a shared browser.",
        },
      ],
      impact:
        "Turned a cold, empty dashboard into a guided activation flow that tells the truth about the backend, the strongest activation story here even without funnel numbers yet.",
      image: "/images/learvo/onboarding-slide-1.png",
      imageAlt: "Learvo guided onboarding quiz flow mockup",
      imageWidth: 1024,
      imageHeight: 492,
      isPlaceholder: false,
      video: {
        src: "/images/learvo/onboarding-flow-demo.mp4",
        width: 1228,
        height: 720,
      },
      slides: [
        { src: "/images/learvo/onboarding-slide-1.png", alt: "Onboarding step 1: import study materials", width: 1024, height: 492 },
        { src: "/images/learvo/onboarding-slide-2.png", alt: "Onboarding step 2: choose a learning goal", width: 1023, height: 494 },
        { src: "/images/learvo/onboarding-slide-3.png", alt: "Onboarding step 3: customize study tools", width: 1024, height: 492 },
        { src: "/images/learvo/onboarding-slide-4.png", alt: "Onboarding step 4: customize quiz settings", width: 1024, height: 510 },
        { src: "/images/learvo/onboarding-slide-5.jpg", alt: "Onboarding step 5: choose a summary type", width: 2468, height: 1294 },
        { src: "/images/learvo/onboarding-slide-6.png", alt: "Onboarding step 6: generation complete", width: 1024, height: 545 },
      ],
    },
    {
      slug: "quiz-card-reorg",
      title: "Quiz Card Reorganization",
      isHidden: true,
      problem:
        "\"Past Quizzes\" and \"In Progress\" lived in separate tabs, cards used encouragement copy that didn't scale, tier status was implicit in whichever tab you were looking at, and CTA colors and button styles were inconsistent.",
      decision:
        "The existing banner had a \"weekly streak\" stat. It looked great, and it was fake. There was no real activity-tracking behind it. I cut it rather than ship a number that would mislead users about their own behavior, and replaced it with two stats computed from data that actually exists: quizzes this week, questions answered overall.",
      supportingPoints: [
        {
          label: "One list instead of two tabs:",
          body: "Merged Past Quizzes and In Progress into a single recency-sorted list. Each card carries its own tier badge (Mastered / Still Learning / Needs Work / In Progress) instead of relying on which tab you're in to know your status.",
        },
        {
          label: "Fixed a real accessibility defect:",
          body: "Found and fixed a contrast failure, white text on a pastel fill, by standardizing on dark text across the cards.",
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

export type BrandElement = {
  slug: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  isPlaceholder: boolean;
  isHidden?: boolean;
};

export const brandIdentitySection = {
  heading: "Brand Identity",
  problem:
    "Learvo's green and blue palette already existed, but wasn't showing up consistently where it mattered most: the landing page and onboarding felt disconnected from the rest of the product.",
  decision:
    "Rather than introduce a new palette, I reinforced the existing one at the highest-visibility touchpoints and designed a mascot and doodle system to carry that identity through, instead of treating brand as a logo-only concern.",
  liveLink: {
    label: "View the live landing page",
    href: "https://learvo.com/",
  },
  elements: [
    {
      slug: "mascot",
      title: "Lenny, the Study Buddy",
      body: "Lenny is a sprout, tying the mascot directly to the learning theme of ever-growing progress. The personality is motivational but calm, deliberately not the high-pressure energy of a Duolingo-style mascot, showing up at the exact moments new users are most likely to bounce.",
      image: "/images/learvo/mascot-lenny.png",
      imageAlt: "Lenny, the Learvo mascot, shown in two final poses",
      imageWidth: 1745,
      imageHeight: 1325,
      isPlaceholder: false,
    },
    {
      slug: "mascot-process",
      title: "Early Sketches",
      body: "Lenny went through several rounds of exploration: proportions, expression, and how much personality the glasses and posture should carry, before landing on the final sprout design used across the product today.",
      image: "/images/learvo/mascot-sketches.png",
      imageAlt: "Lenny mascot design sketch sheets showing early exploration",
      imageWidth: 1737,
      imageHeight: 840,
      isPlaceholder: false,
    },
    {
      slug: "doodles",
      title: "Doodle System",
      body: "A playful, hand-drawn doodle style used across the same first-impression touchpoints as Lenny, plus preset doodle avatars for profile customization, extending that warmth into a functional UI element.",
      image: "/images/learvo/doodle-system.png",
      imageAlt: "A selection of Learvo's hand-drawn doodle illustrations",
      imageWidth: 1100,
      imageHeight: 1100,
      isPlaceholder: false,
    },
    {
      slug: "color-palette",
      title: "Color Palette Reinforcement",
      isHidden: true,
      body: "Learvo's green and blue were already the brand's colors. The work was making sure they actually read as Learvo's colors by applying them consistently across landing and onboarding, rather than letting those first-impression surfaces drift from the rest of the product.",
      image: "/images/learvo/color-palette.png",
      imageAlt: "Learvo color system: ink, primary green, primary blue, and the ambient hero gradient with hex codes",
      imageWidth: 1600,
      imageHeight: 950,
      isPlaceholder: false,
    },
  ] satisfies BrandElement[],
  impact:
    "A consistent visual identity at the exact moments a new user forms their first impression, turning an already-correct palette into one that's actually recognizable.",
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
