export const goodHero = {
  title: "Good Friends",
  subtitle:
    "Redesigning the fast-casual dining experience to eliminate customer friction and peak-hour staff burnout.",
  gist: {
    label: "The Gist:",
    text: "Good Friends makes great poke, but their physical layout & text-heavy menus left first-time customers frozen at the door, constantly repeating instructions.",
  },
  date: "Jan 2025 (Course Project)",
  meta: [
    { label: "COURSE", value: "MGT 140-Marketing for Tech-Based Enterprise" },
    { label: "ROLE", value: "Designer and Researcher" },
    { label: "SERVICE", value: "Service Design, UX Strategy, Physical Wayfinding, Branding-in-Use" },
  ],
  image: "/images/good-friends/hero.png",
  imageAlt: "Good Friends Poke branding and service design overview",
  imageWidth: 1086,
  imageHeight: 1246,
};

import type { TimelineBand, TimelineTask } from "@/app/components/caseStudyTypes";

export const highlightsSection = {
  heading: "Highlights",
  mockup: {
    image: "/images/good-friends/design-goal.png",
    imageAlt: "Good Friends Poke design goal mockup",
    imageWidth: 9388,
    imageHeight: 11623,
    tabTitle: "Good Friends: Design Goal",
    url: "goodfriendspoke.com/order",
  },
  outcomes: [
    "Step-by-step visual menu with clear portion and price breakdowns",
    "Automated table assignment removes manual register bottlenecks",
    "Loyalty program turns first-time visits into repeat traffic",
  ],
  stats: [
    { value: "4", label: "design solution categories shipped" },
    { value: "32", label: "in-store research photos analyzed" },
  ],
  callout: "Less hesitation, more confidence at the door.",
};

export const timelineSection = {
  heading: "Timeline",
  totalWeeks: 10,
  bands: [
    { label: "Research", colorClass: "bg-neutral-900", startWeek: 0, endWeek: 2.5 },
    { label: "Design", colorClass: "bg-neutral-500", startWeek: 2.5, endWeek: 7.5 },
    { label: "Refine", colorClass: "bg-neutral-400", startWeek: 7.5, endWeek: 8.75 },
    { label: "Handoff", colorClass: "bg-neutral-300", startWeek: 8.75, endWeek: 10 },
  ] satisfies TimelineBand[],
  tasks: [
    {
      title: "In-store observation & interviews",
      band: "Research",
      startWeek: 0,
      endWeek: 2.5,
      row: 0,
      colorClass: "bg-neutral-200",
    },
    {
      title: "Design goal & wayfinding concepts",
      band: "Design",
      startWeek: 2.5,
      endWeek: 5,
      row: 1,
      colorClass: "bg-neutral-200",
    },
    {
      title: "Price transparency & menu flow",
      band: "Design",
      startWeek: 3.125,
      endWeek: 6.875,
      row: 0,
      colorClass: "bg-neutral-100",
    },
    {
      title: "Customer service & engagement systems",
      band: "Design",
      startWeek: 4.375,
      endWeek: 7.5,
      row: 2,
      colorClass: "bg-neutral-200",
    },
    {
      title: "Tangible touchpoints & packaging",
      band: "Refine",
      startWeek: 6.875,
      endWeek: 8.75,
      row: 1,
      colorClass: "bg-neutral-100",
    },
    {
      title: "Handoff",
      band: "Handoff",
      startWeek: 8.75,
      endWeek: 10,
      row: 0,
      colorClass: "bg-neutral-200",
    },
  ] satisfies TimelineTask[],
};

export const roleAndImpact = {
  heading: "My Role & Impact",
  columns: [
    {
      label: "Problem",
      body: "The restaurant's physical and digital touchpoints were built for regulars, not newcomers. Text-heavy menus, missing directional cues, and a manual table assignment process created severe bottlenecks during peak lunch rushes.",
    },
    {
      label: "Solution",
      body: "A cohesive service design system pairing clear in-store wayfinding with a step-by-step digital ordering menu, automated table routing, and an integrated loyalty flow.",
    },
    {
      label: "Impact",
      body: "Redesigned the entire customer journey to turn physical friction into smooth, intuitive brand interactions that free up staff to focus on food quality.",
    },
  ],
};

export const problemSection = {
  heading: "The Problem",
  flow: "[Entry: Complete Hesitation] ➔ [Menu: Text-Heavy Overload] ➔ [Register: Manual Bottlenecks]",
  paragraphs: [
    "Through in-store observation and flow mapping, I uncovered a clear pattern: First-timers froze upon walking in. They didn't know where to stand, how to build their bowl, or what they were paying for. Staff spent their energy acting as traffic cops rather than hosts.",
    "We needed to shift from an organic, chaotic layout to confidence by design.",
  ],
  insights: {
    howWeGotInsights:
      "Mapped in-store foot traffic, interviewed customers, and audited competing fast-casual spots.",
    items: [
      {
        label: "The Friction:",
        body: "First-time customers hesitated at the door, overwhelmed by text-heavy menus and zero signage.",
      },
      {
        label: "The Staff Pain:",
        body: "Crew members lacked the tools to manage peak-hour crowd congestion.",
      },
      {
        label: "The Reality:",
        body: "Repeat customers adapted, but new guests left stressed.",
      },
    ],
    deliverables:
      "View full research (Includes interview transcripts, journey maps, and competitive analysis).",
  },
};

export const researchGallery = {
  heading: "Research (In a Nutshell)",
  imageAlt: "In-store research photo documenting the Good Friends Poke customer experience",
  imageWidth: 1920,
  imageHeight: 1080,
  images: Array.from({ length: 32 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `/images/good-friends/research/photo-${n}.jpg`;
  }),
};

export const designGoal = {
  heading: "Design Goal",
  items: [
    "Simplify ordering process to reduce wait-time confusion",
    "Improve signage and layout to make navigation intuitive",
    "Use visual storytelling to communicate the brand's warmth",
    "Support staff efficiency through automated systems",
  ],
  image: "/images/good-friends/design-goal.png",
  imageAlt: "Design goal overview mockup for the Good Friends Poke redesign",
  imageWidth: 9388,
  imageHeight: 11623,
};

export type DesignSolutionCategory = {
  slug: string;
  title: string;
  items: { label: string; body: string }[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export const designSolutions = {
  heading: "Design Solutions",
  categories: [
    {
      slug: "price-transparency",
      title: "Price Transparency",
      items: [
        {
          label: "Interactive Digital Menu:",
          body: "Step-by-step guide with icons and photos for toppings and pricing",
        },
        {
          label: "Portion Visualization:",
          body: "Small, medium, large illustrations for serving sizes",
        },
        {
          label: "Pricing Breakdown:",
          body: 'Clear "What’s Included" section per item',
        },
      ],
      image: "/images/good-friends/price-transparency.png",
      imageAlt: "Price transparency menu mockup showing itemized pricing breakdown",
      imageWidth: 1782,
      imageHeight: 1154,
    },
    {
      slug: "product-quality",
      title: "Product Quality",
      items: [
        {
          label: "Behind-the-Scenes Content:",
          body: "Short videos showcasing food prep and sourcing",
        },
        {
          label: "Customer Testimonials:",
          body: "Highlight reviews from loyal customers",
        },
        {
          label: "Satisfaction Guarantee:",
          body: '"Report an Issue" button in digital receipts',
        },
      ],
      image: "/images/good-friends/product-quality.png",
      imageAlt: "Product quality mockup showing behind-the-scenes content and testimonials",
      imageWidth: 2036,
      imageHeight: 988,
    },
    {
      slug: "customer-service",
      title: "Customer Service",
      items: [
        {
          label: "Pre-Order System:",
          body: "Streamlined mobile ordering to reduce peak-time congestion",
        },
        {
          label: "Table Number Assignment:",
          body: "Automated table assignments visible to staff and customers",
        },
        {
          label: "Feedback Loop:",
          body: "Short satisfaction surveys with loyalty points rewards",
        },
      ],
      image: "/images/good-friends/customer-service.png",
      imageAlt: "Customer service mockup showing pre-order system and table assignment",
      imageWidth: 2028,
      imageHeight: 960,
    },
    {
      slug: "engagement",
      title: "Engagement",
      items: [
        {
          label: "Loyalty Program:",
          body: "Gamified points system for purchases, referrals, and survey participation; rewards include discounts and merch",
        },
        {
          label: "Seasonal Promotions:",
          body: "Limited-time bowls and toppings promoted through in-store and digital channels",
        },
        {
          label: "Community Events:",
          body: "Pop-ups at local markets with samples, games, and coupons to strengthen brand presence",
        },
      ],
      image: "/images/good-friends/engagement.png",
      imageAlt: "Engagement mockup showing loyalty program and community events",
      imageWidth: 1752,
      imageHeight: 1124,
    },
  ] satisfies DesignSolutionCategory[],
};

export const designDecisions = {
  heading: "Design Decisions & Interactions",
  needs: [
    {
      label: "Customers (Need: Clarity & Calm):",
      body: "Served by step-by-step visual menu flows, clear portion illustrations, and automated table assignments.",
    },
    {
      label: "Staff (Need: Efficiency & Flow):",
      body: "Served by a pre-order mobile queue and automated ticket routing that completely remove register bottlenecks.",
    },
  ],
  bridgeIntro:
    "A great digital interface is useless if the physical space contradicts it. The updated system bridges both:",
  touchpointsHeading: "Tangible Touchpoints",
  touchpoints: [
    {
      label: "Portion Guides:",
      body: "Clean illustrations showing exact bowl volumes to set real expectations.",
    },
    {
      label: "Sourcing Loops:",
      body: "Short, warm video loops near the line showcasing daily ingredient prep.",
    },
    {
      label: "Wayfinding & Packaging:",
      body: "Bold pickup zone banners and cohesive, eco-friendly packaging that guide the eye.",
    },
  ],
  images: [
    {
      src: "/images/good-friends/design-decisions-1.png",
      alt: "Physical wayfinding and packaging design for Good Friends Poke",
      width: 1920,
      height: 1080,
    },
    {
      src: "/images/good-friends/design-decisions-2.png",
      alt: "In-store digital and physical touchpoint bridge mockup",
      width: 1834,
      height: 756,
    },
  ],
};

export const nextStepsSection = {
  heading: "What I'd Do Next",
  items: [
    {
      title: "A/B Test the Kiosk Layout:",
      body: "Compare order completion speeds of a text-heavy menu layout versus our highly-visual, icon-led setup.",
    },
    {
      title: "Track Store Analytics:",
      body: "Measure order-to-table turnaround times during peak 12:00 PM to 1:30 PM lunch rushes to prove the operational ROI.",
    },
  ],
};

export const nextProject = {
  label: "Keep Wandering",
  title: "Continuum",
  description:
    "A care-centered platform keeping surrogates, parents, and coordinators in sync after pregnancy confirmation.",
  href: "/continuum",
  image: "/images/projects/continuum.png",
  imageAlt: "Continuum surrogacy platform interface showing coordination dashboard",
  imageWidth: 1264,
  imageHeight: 848,
};
