export const learvoHero = {
  title: "Learvo",
  subtitle:
    "Designing for college students turning their own notes into quizzes, flashcards, summaries, and mnemonics, as the only product designer on an ed-tech startup's team.",
  gist: {
    label: "The Gist:",
    text: "New users landed on an empty dashboard with nothing to do. Returning users hit an inconsistent nav and a quiz review screen with no real signal in it. I redesigned both, then shipped the code myself.",
  },
  date: "Oct 2025 to Present (Sep 2026) · Product Design Intern",
  meta: [
    { label: "ROLE", value: "Product Design Intern (design + frontend implementation)" },
    { label: "TEAM", value: "Learvo, solo designer shipping directly into a live codebase" },
    { label: "SCOPE", value: "Landing page, onboarding activation, navigation system, quiz review UX" },
  ],
  image: "/images/learvo_hero.png",
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
      title: "Onboarding Quiz Flow & Quiz Card Reorganization",
      body: "Shipped the guided upload, goal, customize, generate flow, and separately merged two competing quiz-review tabs into one honest, data-backed list.",
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
      body: "As the only designer on the team, I didn't just design these flows, I shipped the code myself, which meant every design decision also had to survive contact with a real, actively changing codebase. That also meant learning to move at startup speed: getting comfortable with Git and opening pull requests across both frontend and backend, and working directly with engineers instead of handing off static designs, to keep up with a fast-moving, ship-often environment.",
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
      slug: "landing-page",
      title: "Landing Page Redesign",
      problem:
        "The old landing page tested badly on both ends. Qualitatively, it read as a generic, gradient-heavy \"startup website\" with no real color or brand identity: no mascot, no doodles, nothing that spoke to college students specifically. Quantitatively, analytics showed a high percentage of visitors never scrolled through the full page, so the product's actual value never reached them.",
      decision:
        "Learvo's users are college students deciding, in seconds, whether a study tool is worth their time, usually while stressed, procrastinating, or between classes. I led with speed and effort reduction over a feature list. The core promise is turning whatever notes you already have into a quiz, flashcard deck, summary, or mnemonic set almost instantly, and the whole page was restructured around getting a scrolling, skeptical student to that promise instead of past it.",
      supportingPoints: [
        {
          label: "Color and brand identity replaced generic gradients:",
          body: "Rebuilt the page around Learvo's green and blue palette, Lenny, and the doodle system so it reads as a product for college students, not an interchangeable SaaS template.",
        },
        {
          label: "Copy rewritten around a real student pain point:",
          body: "Reframed messaging around not spending money and not losing study time, instead of generic productivity language that could apply to any audience.",
        },
        {
          label: "Structured navigation instead of a hope-they-scroll page:",
          body: "Added a hero CTA into the product-value section, a second CTA down to the FAQ, and a sticky top nav with its own CTA, so a user can reach value or answers from anywhere on the page without scrolling back to the top.",
        },
      ],
      impact:
        "Turned a page that lost most visitors before they saw what Learvo does into one built around getting a busy, skeptical student to the value proposition as fast as possible. Before and after scroll and engagement data to follow.",
      image: "/images/learvo_hero.png",
      imageAlt: "Learvo's redesigned landing page, showing the hero section with Lenny, the doodle system, and a live quiz preview",
      imageWidth: 2880,
      imageHeight: 1544,
      isPlaceholder: false,
    },
    {
      slug: "onboarding-checklist",
      title: "Onboarding Checklist",
      problem:
        "Separate from the quiz flow, users needed a persistent nudge to actually complete the 4 core actions (upload notes, take a quiz, make a flashcard deck, generate an AI summary) rather than a one-time push at signup.",
      decision:
        "A checklist that never goes away is a nag, not a nudge. I designed decay into it on purpose. It's visible for a user's first 4 visits, then disappears for good on visit 5, whether or not they finished it. Growth wanted persistence. I traded some short-term completion pressure for not annoying the users who've already moved past onboarding.",
      supportingPoints: [
        {
          label: "Two dismiss states, not one:",
          body: "The X button dismisses for the current session only and returns next session. It's only gone for good after visit 5, so an accidental close doesn't cost a user the nudge entirely.",
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
        "An activation nudge that's designed to lose the argument with itself over time, built to drive early engagement without becoming permanent nagware.",
      image: "/images/learvo/onboarding-checklist.png",
      imageAlt: "Learvo onboarding checklist mockup",
      imageWidth: 1600,
      imageHeight: 1000,
      isPlaceholder: true,
    },
    {
      slug: "top-nav",
      title: "Top Nav",
      image: "/images/learvo/top-nav-avatars.png",
      imageAlt: "Five custom hand-drawn preset avatar options for Learvo profiles",
      imageWidth: 2160,
      imageHeight: 480,
      isPlaceholder: false,
      problem:
        "The old nav had no page identity (no titles), the profile used emoji placeholders instead of real avatars, the Pomodoro timer had input and reset bugs, and mobile lacked a sensible place for the timer, feedback, and profile actions.",
      decision:
        "This wasn't just a nav redesign, it was a scope call under pressure. The branch had diverged 121 commits from main by the time it was ready, with other teams shipping global search, an ambassador program, and a quiz tutorial in that same window. I rebased and resolved every conflict by hand rather than asking for a freeze, because blocking three other in-flight features to land one nav redesign wasn't a fair trade.",
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
          body: "Feedback icon replaces the timer in the top bar on mobile. The timer moves to a bottom drawer, and the profile modal becomes a keyboard-aware bottom drawer instead of a cramped popover.",
        },
      ],
      impact:
        "A consistent nav system that shipped without blocking or regressing three other features landing in the same window. As much an integration problem as a design one.",
    },
    {
      slug: "onboarding-quiz-flow",
      title: "Onboarding Quiz Flow",
      problem:
        "New users signing up via Google or Apple landed cold on an empty dashboard with nothing to do. Referral tracking was also getting killed mid-flight because signup redirected immediately instead of waiting for it to settle.",
      decision:
        "The easy fix here would have been a fake progress bar that just counts up to 100%. I designed against that. The generation screen shows the real backend phase the request is in, and if nothing moves for 25 seconds, it says so instead of letting the user stare at a stalled number wondering if it's broken.",
      supportingPoints: [
        {
          label: "Guided first session:",
          body: "Upload, then goal selection, then quiz/summary/flashcard customization, then generation, replacing the bare dashboard new users used to land on.",
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
        "Turned a cold, empty dashboard into a guided activation flow that tells the truth about what's happening in the backend. The strongest activation story here, even without funnel numbers yet.",
      image: "/images/learvo/onboarding-quiz-flow.png",
      imageAlt: "Learvo guided onboarding quiz flow mockup",
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
};

export const brandIdentitySection = {
  heading: "Brand Identity",
  problem:
    "Learvo's green and blue palette already existed, but it wasn't showing up consistently at the moments that actually form a first impression. The landing page and onboarding felt disconnected from the rest of the product, so the colors weren't doing the job of making Learvo recognizable.",
  decision:
    "Rather than introduce a new palette, I reinforced the existing one at the touchpoints that matter most for recognition (landing page, onboarding quiz, onboarding checklist) and designed a mascot and doodle system to carry that identity through, instead of treating brand as a logo-only concern.",
  liveLink: {
    label: "View the live landing page",
    href: "https://learvo.com/",
  },
  elements: [
    {
      slug: "mascot",
      title: "Lenny, the Study Buddy",
      body: "Lenny is a sprout, a deliberate choice to connote ever-growing progress and tie the mascot directly to the learning theme instead of picking a character with no conceptual link to studying. Lenny carries a motivational-but-calm personality, deliberately not the high-pressure, guilt-driven energy of a Duolingo-style mascot, and shows up on the landing page and throughout onboarding (quiz flow and checklist) as the friendly, reassuring presence at the moments new users are most likely to bounce. Below are the two final renders used across the product.",
      image: "/images/learvo/mascot-lenny.png",
      imageAlt: "Lenny, the Learvo mascot, shown in two final poses",
      imageWidth: 1396,
      imageHeight: 1060,
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
      body: "A playful, friendly hand-drawn doodle style used across the same first-impression touchpoints as Lenny, plus a set of preset doodle avatars for profile customization, extending the same warmth into a functional UI element instead of confining it to marketing surfaces.",
      image: "/images/learvo/doodle-system.png",
      imageAlt: "A selection of Learvo's hand-drawn doodle illustrations",
      imageWidth: 1100,
      imageHeight: 1100,
      isPlaceholder: false,
    },
    {
      slug: "color-palette",
      title: "Color Palette Reinforcement",
      body: "Learvo's green and blue were already the brand's colors. The work was making sure they actually read as Learvo's colors by applying them consistently across landing and onboarding, rather than letting those first-impression surfaces drift from the rest of the product.",
      image: "/images/learvo/color-palette.png",
      imageAlt: "Learvo color system: ink, primary green, primary blue, and the ambient hero gradient with hex codes",
      imageWidth: 1600,
      imageHeight: 950,
      isPlaceholder: false,
    },
  ] satisfies BrandElement[],
  impact:
    "A consistent visual identity at the exact moments a new user forms their first impression of Learvo, turning an already-correct palette into one that's actually recognizable.",
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
