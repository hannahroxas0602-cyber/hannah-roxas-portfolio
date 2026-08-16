export const dearBelovedHero = {
  title: "Dear Beloved",
  narrative:
    "It might be a bit overwhelming to know where to start one's mental health journey. So why don't we start step by step, by looking at when we even made our first steps: when we were a child? To connect with people's inner child, this interactive package designed as a dollhouse has hidden letters to reflect on their younger self.",
  date: "2022",
  meta: [
    { label: "COURSE", value: "DES 001: Introduction to Design" },
    { label: "ROLE", value: "Designer" },
    { label: "SERVICE", value: "Product design" },
  ],
};

export const gallery = {
  imageAlt: "Photo of the Dear Beloved interactive dollhouse project",
  imageWidth: 1650,
  imageHeight: 1275,
  images: Array.from({ length: 32 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `/images/dear-beloved/gallery/photo-${n}.jpg`;
  }),
};

export const highlights = {
  heading: "Highlights",
  imageAlt: "Highlight photo of the Dear Beloved interactive dollhouse project",
  imageWidth: 1650,
  imageHeight: 1275,
  numbers: [12, 19, 20, 25, 26, 28, 29, 30, 31],
  images: [12, 19, 20, 25, 26, 28, 29, 30, 31].map((n) => {
    const padded = String(n).padStart(2, "0");
    return `/images/dear-beloved/gallery/photo-${padded}.jpg`;
  }),
};

export const nextProject = {
  label: "Keep Wandering",
  title: "Boiler Room Tokyo CD",
  description:
    "A fun passion project I made for my interest in the ever-evolving art of techno music and Boiler Room culture.",
  href: "/boiler-room-cd",
  image: "/images/dear-beloved/boiler-room-cd-next.png",
  imageAlt: "Boiler Room CD cover and packaging design concept",
  imageWidth: 1376,
  imageHeight: 768,
};
