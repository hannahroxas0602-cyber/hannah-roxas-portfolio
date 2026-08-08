export const graphicDesignHero = {
  eyebrow: "Rabbit Hole:",
  category: "Brand & visual systems",
  intro: "You entered deeper in the rabbit hole…",
};

export type GalleryProjectCard = {
  slug: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export const galleryProjects: GalleryProjectCard[] = [
  {
    slug: "dear-beloved",
    title: "Dear Beloved",
    description:
      "A playful, interactive dollhouse designed to help users reconnect with their inner child and reflect on early memories.",
    href: "/dear-beloved",
    image: "/images/graphic-design/dear-beloved-card.png",
    imageAlt: "Dear Beloved brand and illustration artwork",
    imageWidth: 1021,
    imageHeight: 538,
  },
  {
    slug: "boiler-room-cd",
    title: "Boiler Room Tokyo CD",
    description:
      "A fun passion project I made for my interest in the ever ivolving art of techno music and Boiler Room Culture.",
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
    href: "/typography-dictionary",
    image: "/images/graphic-design/typography-dictionary-card.png",
    imageAlt: "Typography Dictionary guide spread showing custom typefaces and posters",
    imageWidth: 1376,
    imageHeight: 768,
  },
];

export type EditedVideo = {
  slug: string;
  title: string;
  src: string;
};

export const editedVideos: EditedVideo[] = [
  {
    slug: "edited-video-01",
    title: "Edited video 1",
    src: "/images/graphic-design/edited-video-01.mp4",
  },
  {
    slug: "edited-video-02",
    title: "Edited video 2",
    src: "/images/graphic-design/edited-video-02.mp4",
  },
  {
    slug: "edited-video-03",
    title: "Edited video 3",
    src: "/images/graphic-design/edited-video-03.mp4",
  },
  {
    slug: "edited-video-04",
    title: "Edited video 4",
    src: "/images/graphic-design/edited-video-04.mp4",
  },
];

export type ExperimentalImage = {
  slug: string;
  alt: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
};

export const experimentalImages: ExperimentalImage[] = [
  {
    slug: "experimental-01",
    alt: "Experimental graphic design piece 1",
    image: "/images/graphic-design/experimental-01.jpg",
    imageWidth: 2550,
    imageHeight: 3300,
  },
  {
    slug: "experimental-02",
    alt: "Experimental graphic design piece 2",
    image: "/images/graphic-design/experimental-02.jpg",
    imageWidth: 2550,
    imageHeight: 3300,
  },
  {
    slug: "experimental-03",
    alt: "Experimental graphic design piece 3",
    image: "/images/graphic-design/experimental-03.jpg",
    imageWidth: 2550,
    imageHeight: 3300,
  },
  {
    slug: "experimental-04",
    alt: "Experimental graphic design piece 4",
    image: "/images/graphic-design/experimental-04.jpg",
    imageWidth: 2550,
    imageHeight: 3300,
  },
  {
    slug: "experimental-05",
    alt: "Experimental graphic design piece 5",
    image: "/images/graphic-design/experimental-05.jpg",
    imageWidth: 2550,
    imageHeight: 3300,
  },
  {
    slug: "experimental-06",
    alt: "Experimental animated graphic design piece 6",
    image: "/images/graphic-design/experimental-06.gif",
    imageWidth: 1800,
    imageHeight: 2400,
  },
  {
    slug: "experimental-07",
    alt: "Experimental graphic design piece 7",
    image: "/images/graphic-design/experimental-07.jpg",
    imageWidth: 2550,
    imageHeight: 3300,
  },
  {
    slug: "experimental-08",
    alt: "Experimental graphic design piece 8",
    image: "/images/graphic-design/experimental-08.jpg",
    imageWidth: 2550,
    imageHeight: 3300,
  },
  {
    slug: "experimental-09",
    alt: "Experimental graphic design piece 9",
    image: "/images/graphic-design/experimental-09.jpg",
    imageWidth: 2550,
    imageHeight: 3300,
  },
  {
    slug: "experimental-10",
    alt: "Experimental graphic design piece 10",
    image: "/images/graphic-design/experimental-10.jpg",
    imageWidth: 2550,
    imageHeight: 3300,
  },
  {
    slug: "experimental-11",
    alt: "Experimental graphic design piece 11",
    image: "/images/graphic-design/experimental-11.jpg",
    imageWidth: 2550,
    imageHeight: 3300,
  },
  {
    slug: "experimental-12",
    alt: "Experimental graphic design piece 12",
    image: "/images/graphic-design/experimental-12.jpg",
    imageWidth: 2550,
    imageHeight: 3300,
  },
];
