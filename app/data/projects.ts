export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  external?: boolean;
};

export const projects: Project[] = [
  {
    slug: "continuum",
    title: "Continuum: Surrogacy Platform",
    description:
      "A care-centered platform keeping surrogates, parents, and coordinators in sync after pregnancy confirmation.",
    tags: ["UX/UI", "Product Strategy"],
    href: "/continuum/continuum",
    image: "/images/projects/continuum.png",
    imageAlt: "Continuum surrogacy platform interface showing coordination dashboard",
    imageWidth: 1264,
    imageHeight: 848,
  },
  {
    slug: "good-friends-poke",
    title: "Good Friends Poke",
    description:
      "Redesigning the fast-casual dining experience to eliminate customer friction and peak-hour staff burnout.",
    tags: ["UX/UI", "Service Design"],
    href: "/page/good",
    image: "/images/projects/good-friends-poke.png",
    imageAlt: "Good Friends Poke fast-casual dining experience redesign",
    imageWidth: 2446,
    imageHeight: 1376,
  },
  {
    slug: "dear-beloved",
    title: "Dear Beloved",
    description:
      "A playful, interactive dollhouse designed to help users reconnect with their inner child and reflect on early memories.",
    tags: ["Interaction Design", "Illustration", "Graphic Design"],
    href: "/dear-beloved",
    image: "/images/projects/dear-beloved.png",
    imageAlt: "Dear Beloved interactive dollhouse project artwork",
    imageWidth: 620,
    imageHeight: 539,
  },
  {
    slug: "boiler-room-cd",
    title: "Boiler Room Tokyo CD",
    description:
      "A fun passion project I made for my interest in the ever ivolving art of techno music and Boiler Room Culture.",
    tags: ["Graphic Design", "Branding"],
    href: "/boiler-room-cd",
    image: "/images/graphic-design/boiler-room-cd.png",
    imageAlt: "Boiler Room CD cover and packaging design concept",
    imageWidth: 1033,
    imageHeight: 677,
  },
  {
    slug: "typography-dictionary",
    title: "Typography Dictionary",
    description:
      "A guide to key typography terms, illustrated with examples from past projects like custom typefaces and posters.",
    tags: ["Graphic Design", "Typography"],
    href: "/typography-dictionary",
    image: "/images/projects/typography-dictionary.png",
    imageAlt: "Typography Dictionary guide spread showing custom typefaces and posters",
    imageWidth: 1376,
    imageHeight: 768,
  },
];
