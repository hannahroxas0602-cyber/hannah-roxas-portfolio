export const boilerRoomHero = {
  title: "Boiler Room Tokyo CD",
  narrative:
    "A fun passion project I made for my interest in the ever ivolving art of techno music and Boiler Room Culture.",
  date: "2022",
  meta: [
    { label: "COURSE", value: "DES 001: Introduction to Design" },
    { label: "ROLE", value: "Designer" },
    { label: "SERVICE", value: "Product design" },
  ],
};

export type GalleryImage = {
  slug: string;
  label: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export const gallery: GalleryImage[] = [
  {
    slug: "front",
    label: "Front",
    image: "/images/boiler-room-cd/front.png",
    imageAlt: "Boiler Room Tokyo CD front cover design",
    imageWidth: 3500,
    imageHeight: 2877,
  },
  {
    slug: "retro",
    label: "Retro",
    image: "/images/boiler-room-cd/retro.png",
    imageAlt: "Boiler Room Tokyo CD retro-style back cover design",
    imageWidth: 3500,
    imageHeight: 2811,
  },
  {
    slug: "open-cover-minibook",
    label: "Open cover + minibook",
    image: "/images/boiler-room-cd/open-cover-minibook.png",
    imageAlt: "Boiler Room Tokyo CD case opened to reveal the minibook insert",
    imageWidth: 3500,
    imageHeight: 3500,
  },
  {
    slug: "mini-poster",
    label: "Mini poster",
    image: "/images/boiler-room-cd/mini-poster.png",
    imageAlt: "Boiler Room Tokyo CD mini poster insert",
    imageWidth: 3500,
    imageHeight: 2744,
  },
];

export const nextProject = {
  label: "Keep Wandering",
  title: "Typography Dictionary",
  description:
    "The world of typography for designers comes with having to understand its own jargon.",
  href: "/typography-dictionary",
  image: "/images/graphic-design/typography-dictionary-card.png",
  imageAlt: "Typography Dictionary guide spread showing custom typefaces and posters",
  imageWidth: 1376,
  imageHeight: 768,
};
