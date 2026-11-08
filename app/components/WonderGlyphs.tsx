import type { SVGProps } from "react";

// Small line glyphs for the things Alice passes on the way down: the White Rabbit's pocket
// watch, the tiny golden key, a teacup, a playing card, a door. One stroke weight, so they
// read as one set. They take their color from `currentColor`.
const base = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Watch(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <circle cx="16" cy="18" r="9" />
      <path d="M16 18V13M16 18l3.5 2M14 6.5h4M16 6.5V9" />
    </svg>
  );
}
export function Key(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <circle cx="10" cy="11" r="5" />
      <path d="M13.5 14.5L25 26M21 22l3-3M24 25l3-3" />
    </svg>
  );
}
export function Cup(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M6 13h16v4a8 8 0 01-16 0v-4zM22 14h2.5a3 3 0 010 6H21.5M5 27h18" />
      <path d="M11 9c0-1.5 1.5-1.5 1.5-3M16 9c0-1.5 1.5-1.5 1.5-3" />
    </svg>
  );
}
export function HeartCard(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <rect x="7" y="4" width="18" height="24" rx="3" />
      <path d="M16 20.5s-4.5-2.7-4.5-5.7a2.5 2.5 0 014.5-1.4 2.5 2.5 0 014.5 1.4c0 3-4.5 5.7-4.5 5.7z" />
    </svg>
  );
}
export function Door(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M8 28V13a8 8 0 0116 0v15zM5 28h22" />
      <circle cx="20.5" cy="19" r="1" fill="currentColor" />
    </svg>
  );
}
export function Keyhole(p: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...p}>
      <path d="M16 6a5 5 0 00-2 9.6L12 26h8l-2-10.4A5 5 0 0016 6z" />
    </svg>
  );
}

export const FALLING = [Watch, Key, Cup, HeartCard, Door, Watch, Cup, Key];
