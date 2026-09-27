// Objects that drift past in the page margins as you fall. To swap in your own
// illustrations: drop the files into /public/images/drift/ and point `src` at
// them. PNG, SVG, or WebP all work.
//
// side    which margin the object floats in
// top     where it starts, as a percentage of the page's height
// size    width in px (height follows the image's own proportions)
// speed   parallax: extra px moved per px scrolled. Negative floats up past you
//         faster than the page; positive lags behind. Keep within about ±0.4.
// rotate  starting angle in degrees
// spin    degrees turned per 1,000 px scrolled (negative spins the other way)
export type DriftObject = {
  src: string;
  side: "left" | "right";
  top: string;
  size: number;
  speed: number;
  rotate: number;
  spin: number;
};

// prettier-ignore
export const driftObjects: DriftObject[] = [
  { src: "/images/drift/placeholder-1.svg", side: "left",  top: "9%",  size: 44, speed: -0.3,  rotate: -12, spin: 40 },
  { src: "/images/drift/placeholder-2.svg", side: "right", top: "18%", size: 36, speed: -0.15, rotate: 8,   spin: -30 },
  { src: "/images/drift/placeholder-3.svg", side: "left",  top: "36%", size: 32, speed: -0.2,  rotate: 20,  spin: 25 },
  { src: "/images/drift/placeholder-4.svg", side: "right", top: "48%", size: 48, speed: -0.35, rotate: -6,  spin: -45 },
  { src: "/images/drift/placeholder-5.svg", side: "left",  top: "66%", size: 40, speed: -0.1,  rotate: 14,  spin: 35 },
  { src: "/images/drift/placeholder-6.svg", side: "right", top: "78%", size: 34, speed: -0.25, rotate: -18, spin: -25 },
];
