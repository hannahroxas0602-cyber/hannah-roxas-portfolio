export const aboutIntro = {
  eyebrow: "[01]",
  title: "About",
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
    role: "UX Researcher - Continuum: Surrogacy Care Experience",
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
