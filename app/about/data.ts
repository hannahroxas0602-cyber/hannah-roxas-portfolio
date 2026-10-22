export const aboutIntro = {
  eyebrow: "[01]",
  title: "About",
  tagline:
    "A curious, detail-obsessed designer who treats every project like a rabbit hole worth falling into.",
  // Shown on /about once filled.
  bio: "{{TODO: 2–3 sentence bio in your own words: background, what you're drawn to, what you want next}}",
};

export const process = {
  summary:
    "Research first, then design, refine, and handoff. Every project starts with user interviews and stakeholder mapping to find the real problem before any screens get drawn, moves into iterative prototyping in Figma, and ends with a clean, documented handoff so engineering can build without guesswork.",
  steps: ["Research", "Design", "Refine", "Handoff"],
};

export const availability = {
  summary:
    "Open to full-time Product Designer / Design Engineer roles. Currently splitting time between LA and the Bay Area, and open to relocating.",
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
    role: "Product Designer (Intern) · Sole designer",
    context: "Learvo (EdTech SaaS Startup)",
    dates: "Oct 2025 – Present",
  },
  {
    slug: "continuum",
    role: "UX Researcher (MGT 120), then independent Product Designer",
    context: "Continuum: Surrogacy Care Experience",
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
