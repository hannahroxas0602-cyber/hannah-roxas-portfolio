export const servicesIntro = {
  eyebrow: "[02]",
  title: "Services",
};

export type ServiceCategory = {
  slug: string;
  title: string;
  deliverables: string[];
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
  },
  {
    slug: "uiux-design",
    title: "UX/UI Design",
    deliverables: ["Dashboards", "Mobile Apps", "Product Strategy", "Growth Design"],
  },
  {
    slug: "branding",
    title: "Branding",
    deliverables: ["Logo Design", "Packaging", "Brand Assets", "Typography"],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    deliverables: ["Illustrations", "3D Graphics", "Presentations", "Visuals", "Icons"],
  },
];
