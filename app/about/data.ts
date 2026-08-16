export const aboutIntro = {
  eyebrow: "[01]",
  title: "About",
};

export const process = {
  summary:
    "Research first, then design, refine, and handoff. Every project starts with user interviews and stakeholder mapping to find the real problem before any screens get drawn, moves into iterative prototyping in Figma, and ends with a clean, documented handoff so engineering can build without guesswork.",
  steps: ["Research", "Design", "Refine", "Handoff"],
};

export const availability = {
  summary:
    "Open to full-time roles as a product designer, UX/UI designer, or graphic designer, as well as freelance and contract branding work. Currently splitting time between LA and the Bay Area, and open to relocating.",
};

export type ExperienceEntry = {
  slug: string;
  role: string;
  context: string;
  dates: string;
};

export const experience: ExperienceEntry[] = [
  {
    slug: "learvo",
    role: "Product Designer & Content Strategist",
    context: "Learvo (EdTech SaaS Startup)",
    dates: "2025-Present",
  },
  {
    slug: "continuum",
    role: "UX Researcher, Continuum: Surrogacy Care Experience",
    context: "Mgt 120: Managing and Using Information Technology",
    dates: "2025",
  },
  {
    slug: "uc-davis-gallery",
    role: "Director of Public Relations and Marketing",
    context: "Student-Run Basement Gallery at UC Davis",
    dates: "2024-2025",
  },
  {
    slug: "il-team-studio",
    role: "Design Intern",
    context: "IL TEAM STUDIO ARK S.L.",
    dates: "2024",
  },
];
