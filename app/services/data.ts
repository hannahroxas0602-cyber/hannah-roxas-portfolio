export const servicesIntro = {
  eyebrow: "[02]",
  title: "What I Do",
};

export type ServiceCategory = {
  slug: string;
  title: string;
  deliverables: string[];
  tools: string[];
  /** First entry is the collapsed one-line teaser; all entries show when expanded. */
  proof: string[];
};

export const services: ServiceCategory[] = [
  {
    slug: "web-design",
    title: "Web Design",
    deliverables: [
      "Websites",
      "Landing Pages",
      "Front End",
      "Framer Development",
      "Animation",
    ],
    tools: ["Figma", "Framer", "Webflow", "React", "Next.js", "TypeScript", "Tailwind", "Git"],
    proof: ["Shipped onboarding flows and web surfaces for a 0→1 EdTech platform."],
  },
  {
    slug: "uiux-design",
    title: "UX/UI Design",
    deliverables: ["Dashboards", "Mobile Apps", "Product Strategy", "Growth Design"],
    tools: [
      "Figma",
      "Figma AI",
      "Notion",
      "Linear",
      "Cursor",
      "Claude Code",
      "GitHub",
      "PostHog",
      "Microsoft Clarity",
      "Vercel",
    ],
    proof: [
      "Built tokenized design systems for seamless developer handoff.",
      "Designed growth experiments using product analytics and user feedback.",
    ],
  },
  {
    slug: "branding",
    title: "Branding",
    deliverables: ["Logo Design", "Packaging", "Brand Assets", "Typography"],
    tools: ["Illustrator", "Photoshop", "Figma"],
    proof: ["Designed Lenny, Learvo's mascot, and its hand-drawn doodle system."],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    deliverables: ["Illustrations", "3D Graphics", "Presentations", "Visuals", "Icons"],
    tools: ["Illustrator", "Photoshop", "After Effects"],
    proof: ["Led cross-channel campaigns across 10 exhibitions at UC Davis."],
  },
];
