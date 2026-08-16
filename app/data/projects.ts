export type ImpactStat = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category: "UIUX" | "Graphic Design";
  href: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imageAspect?: string;
  external?: boolean;
  year?: string;
  impactStats?: ImpactStat[];
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slug: "continuum",
    title: "Continuum: Surrogacy Platform",
    description:
      "A care-centered platform keeping surrogates, parents, and coordinators in sync after pregnancy confirmation.",
    tags: ["UX/UI", "Product Strategy"],
    category: "UIUX",
    href: "/continuum",
    image: "/images/projects/continuum.png",
    imageAlt: "Continuum surrogacy platform interface showing coordination dashboard",
    imageWidth: 1264,
    imageHeight: 848,
    imageAspect: "3/2",
    year: "2026",
    impactStats: [
      { value: "3", label: "stakeholder groups" },
      { value: "9", label: "months mapped" },
    ],
    gallery: [
      "/images/projects/continuum.png",
      "/images/continuum/problem-flow.mp4",
      "/images/continuum/care-coordinator-dashboard-demo.mp4",
      "/images/continuum/design-system-moodboard.mp4",
    ],
  },
  {
    slug: "good-friends-poke",
    title: "Good Friends Poke",
    description:
      "Redesigning the fast-casual dining experience to eliminate customer friction and peak-hour staff burnout.",
    tags: ["UX/UI", "Service Design"],
    category: "UIUX",
    href: "/goodfriends",
    image: "/images/projects/good-friends-poke.png",
    imageAlt: "Good Friends Poke fast-casual dining experience redesign",
    imageWidth: 2446,
    imageHeight: 1376,
    imageAspect: "16/9",
    year: "2025",
    impactStats: [
      { value: "4", label: "design solution categories shipped" },
      { value: "32", label: "in-store research photos analyzed" },
    ],
    gallery: [
      "/images/projects/good-friends-poke.png",
      "/images/good-friends/hero.png",
      "/images/good-friends/customer-service.png",
      "/images/good-friends/product-quality.png",
    ],
  },
  {
    slug: "dear-beloved",
    title: "Dear Beloved",
    description:
      "A playful, interactive dollhouse designed to help users reconnect with their inner child and reflect on early memories.",
    tags: ["Interaction Design", "Illustration", "Graphic Design"],
    category: "Graphic Design",
    href: "/dear-beloved",
    image: "/images/dear-beloved/gallery/photo-28.jpg",
    imageAlt: "Dear Beloved interactive dollhouse project artwork",
    imageWidth: 1650,
    imageHeight: 1275,
    imageAspect: "4/3",
    year: "2022",
    impactStats: [
      { value: "32", label: "gallery photos documented" },
      { value: "1", label: "hand-built interactive dollhouse" },
    ],
    gallery: [
      "/images/dear-beloved/gallery/photo-28.jpg",
      "/images/dear-beloved/gallery/photo-12.jpg",
      "/images/dear-beloved/gallery/photo-19.jpg",
      "/images/dear-beloved/gallery/photo-20.jpg",
      "/images/dear-beloved/gallery/photo-25.jpg",
      "/images/dear-beloved/gallery/photo-26.jpg",
      "/images/dear-beloved/gallery/photo-29.jpg",
      "/images/dear-beloved/gallery/photo-30.jpg",
      "/images/dear-beloved/gallery/photo-31.jpg",
    ],
  },
  {
    slug: "boiler-room-cd",
    title: "Boiler Room Tokyo CD",
    description:
      "A fun passion project I made for my interest in the ever-evolving art of techno music and Boiler Room culture.",
    tags: ["Graphic Design", "Branding"],
    category: "Graphic Design",
    href: "/boiler-room-cd",
    image: "/images/graphic-design/boiler-room-cd.png",
    imageAlt: "Boiler Room CD cover and packaging design concept",
    imageWidth: 1033,
    imageHeight: 677,
    imageAspect: "3/2",
    year: "2022",
    impactStats: [{ value: "4", label: "printed pieces designed" }],
    gallery: [
      "/images/graphic-design/boiler-room-cd.png",
      "/images/boiler-room-cd/front.png",
      "/images/boiler-room-cd/open-cover-minibook.png",
      "/images/boiler-room-cd/retro.png",
    ],
  },
  {
    slug: "typography-dictionary",
    title: "Typography Dictionary",
    description:
      "A guide to key typography terms, illustrated with examples from past projects like custom typefaces and posters.",
    tags: ["Graphic Design", "Typography"],
    category: "Graphic Design",
    href: "/typography-dictionary",
    image: "/images/projects/typography-dictionary.png",
    imageAlt: "Typography Dictionary guide spread showing custom typefaces and posters",
    imageWidth: 1376,
    imageHeight: 768,
    imageAspect: "16/9",
    year: "2023",
    impactStats: [{ value: "20", label: "type specimens illustrated" }],
    gallery: [
      "/images/typography-dictionary/specimens/specimen-01.png",
      "/images/typography-dictionary/specimens/specimen-09.png",
      "/images/typography-dictionary/specimens/specimen-13.png",
      "/images/typography-dictionary/specimens/specimen-17.png",
    ],
  },
];
