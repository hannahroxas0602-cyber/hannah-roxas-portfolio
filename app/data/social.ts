export const social = {
  linkedin: "https://www.linkedin.com/in/hannah-roxas-1440ba299/",
  github: "https://github.com/hannahroxas0602-cyber",
  email: "hannahroxas0602@gmail.com",
  resume: "/resume.pdf",
};

type NavLink =
  | { label: string; href: string; kind: "internal" }
  | { label: string; href: string; kind: "external" }
  | { label: string; href: string; kind: "about" };

export const navLinks: NavLink[] = [
  { label: "UI/UX", href: "/uiux", kind: "internal" },
  { label: "Graphics", href: "/graphic-design", kind: "internal" },
  { label: "About", href: "/about", kind: "about" },
  { label: "Resume", href: social.resume, kind: "external" },
];
