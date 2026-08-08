export const dearBelovedHero = {
  title: "Dear Beloved",
  narrative:
    "It might be a bit overwhelming to know where to start one's mental health journey. So why don't we start by step by step and start by looking at when we even made our first steps; when we were a child? To connect with people's inner child, this interactive package designed as a doll house has hidden letters to refelct on thier yonger self.",
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

export const nextProject = {
  label: "Keep Wandering",
  title: "Boiler Room Tokyo CD",
  description:
    "A fun passion project I made for my interest in the ever ivolving art of techno music and Boiler Room Culture.",
  href: "/boiler-room-cd",
  image: "/images/dear-beloved/boiler-room-cd-next.png",
  imageAlt: "Boiler Room CD cover and packaging design concept",
  imageWidth: 1376,
  imageHeight: 768,
};
