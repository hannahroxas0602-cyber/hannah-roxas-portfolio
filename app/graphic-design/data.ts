export const graphicDesignHero = {
  eyebrow: "Rabbit Hole:",
  category: "Brand & visual systems",
  intro: "Brand identity, illustration, and motion design.",
  subcopy:
    "Illustrator, Photoshop, and After Effects: identity systems, packaging, and motion pieces from concept to final export.",
};

export type EditedVideo = {
  slug: string;
  title: string;
  src: string;
  width: number;
  height: number;
  hasAudio?: boolean;
};

export const editedVideos: EditedVideo[] = [
  {
    slug: "edited-video-01",
    title: "Edited video 1",
    src: "/images/graphic-design/edited-video-01.mp4",
    width: 728,
    height: 1080,
  },
  {
    slug: "cheetoes",
    title: "Cheetoes",
    src: "/images/graphic-design/cheetoes.mov",
    width: 1518,
    height: 1080,
    hasAudio: false,
  },
  {
    slug: "edited-video-03",
    title: "Edited video 3",
    src: "/images/graphic-design/edited-video-03.mp4",
    width: 720,
    height: 720,
  },
  {
    slug: "edited-video-04",
    title: "Edited video 4",
    src: "/images/graphic-design/edited-video-04.mp4",
    width: 16,
    height: 9,
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
