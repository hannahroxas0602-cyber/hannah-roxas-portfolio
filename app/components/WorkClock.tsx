"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import HoleLink from "@/app/components/HoleLink";
import { HALL_GRAY } from "@/app/components/hallColor";

// The hero's clock, built to match the hand-drawn collage-clock reference: a thin circle with the 24
// numbers of the day in big plain black just inside it, and plain photographs of my work (no borders, no
// shadows, no tilt) of different sizes, some inside the circle and some straddling it or hanging off the
// left and the bottom. It tells the real time where I am (Los
// Angeles), with black hands in the manner of clock-shop hands: a long needle with a spade and a jewel
// hole, and a counterweight disc on a short tail. Hover a photograph and the hands swing to point at it;
// click it to go in. It's also the way down: as you scroll, the hands spin (time flying), the photographs
// scatter outward, and the pivot where the hands meet swells into the hole you fall through.
const LA = "America/Los_Angeles";

// Positions are in units of the circle's radius R, from its centre; `w` is the photo's width in R and
// `ar` its width / height. The ring is 80% of the box wide, so R is 40% of the box. Learvo is the biggest,
// then Continuum and Good Friends, and three of the graphic design posters.
type Pic = { href: string; title: string; src: string; x: number; y: number; w: number; ar: number; zoom?: number; pos?: string };
const PICS: Pic[] = [
  { href: "/learvo", title: "Learvo", src: "/images/learvo_thumb5.png", x: -1.077, y: 0.3, w: 1.025, ar: 1.5 },
  { href: "/continuum", title: "Continuum: Surrogacy Platform", src: "/images/projects/continuum-thumb.webp", x: -0.861, y: -0.955, w: 0.72, ar: 1.5 },
  { href: "/goodfriends", title: "Good Friends Poke", src: "/images/projects/good-friends-poke.png", x: 0.886, y: 0.779, w: 0.607, ar: 1.16, zoom: 1.4, pos: "52% 58%" },
  { href: "/graphic-design", title: "I finished a family size hot cheeto bag", src: "/images/graphic-design/cheetoes.poster.jpg", x: -0.843, y: 0.986, w: 0.6, ar: 1.405 },
  { href: "/boiler-room-cd", title: "Boiler Room Tokyo CD", src: "/images/graphic-design/boiler-room-cd.png", x: -1.521, y: -0.314, w: 0.564, ar: 1.54 },
  { href: "/graphic-design", title: "ASAP", src: "/images/graphic-design/experimental-05.jpg", x: -0.221, y: 1.094, w: 0.4, ar: 0.7725 },
];
const pct = (r: number) => (50 + r * 40).toFixed(3);

// The angle (clockwise from straight up) from the centre to a photograph, so the hands can point at it.
const angleTo = (p: Pic) => ((Math.atan2(p.x, -p.y) * 180) / Math.PI + 360) % 360;

function laTime() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: LA, hour12: false, hour: "numeric", minute: "numeric", second: "numeric" }).formatToParts(new Date());
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return { h: get("hour") % 24, m: get("minute"), s: get("second") };
}

// The hands, drawn pointing straight up from (0, 0): a long tapering needle, a spade with a jewel hole, a
// thin shaft, and a counterweight disc on a short tail.
function MinuteHand() {
  return (
    <g fill="#1b1519" fillRule="evenodd">
      <path d="M0 -97L1.7 -73C5.2 -67 6.2 -59 3.6 -51L2.4 -45L1.9 -8L-1.9 -8L-2.4 -45L-3.6 -51C-6.2 -59 -5.2 -67 -1.7 -73ZM0 -60.2a2 2 0 1 0 .01 0z" />
      <path d="M-1.2 -8h2.4V8h-2.4z" />
      <circle cx="0" cy="12.5" r="5.2" />
    </g>
  );
}
function HourHand() {
  return (
    <g fill="#1b1519" fillRule="evenodd">
      <path d="M0 -62L2.2 -45C7.2 -41 8.2 -32 5 -25L3.2 -20L2.6 -8L-2.6 -8L-3.2 -20L-5 -25C-8.2 -32 -7.2 -41 -2.2 -45ZM0 -33.5a2.4 2.4 0 1 0 .01 0z" />
      <path d="M-1.4 -8h2.8V7h-2.8z" />
      <circle cx="0" cy="11.5" r="5.6" />
    </g>
  );
}

export default function WorkClock({ progress: p }: { progress: MotionValue<number> }) {
  const [t, setT] = useState<{ h: number; m: number; s: number } | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  // The photographs can be dragged (mouse only) to try out an arrangement; a drag never counts as a click.
  const [canDrag, setCanDrag] = useState(false);
  const dragged = useRef(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanDrag(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    const tick = () => setT(laTime());
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  // Before the real time is known (and on the server) the hands rest at a quarter past six in the evening.
  const hourAngle = t ? ((t.h + t.m / 60) / 24) * 360 : 250;
  const minuteAngle = t ? (t.m + t.s / 60) * 6 : 90;
  const secondDelay = t ? -t.s : 0;
  const hH = hover !== null ? angleTo(PICS[hover]) : hourAngle;
  const hM = hover !== null ? angleTo(PICS[hover]) : minuteAngle;

  // The fall: the hands spin, the photographs scatter, the pivot swells into the hole (and the hole is gray).
  const spin = useTransform(p, [0, 0.55], [0, 900]);
  const spinSlow = useTransform(spin, (v) => v / 12);
  const handsOpacity = useTransform(p, [0.12, 0.4], [1, 0]);
  const ringOpacity = useTransform(p, [0.05, 0.4], [1, 0]);
  const picsScale = useTransform(p, [0, 0.55], [1, 2.6]);
  const picsOpacity = useTransform(p, [0.08, 0.45], [1, 0]);
  const coreScale = useTransform(p, [0, 0.38, 0.88], [1, 5, 150]);
  const coreColor = useTransform(p, [0.3, 0.8], ["#1b1519", HALL_GRAY]);

  return (
    <div className="work-clock absolute inset-0">
      {/* the circle, and the doodles in its gaps */}
      <motion.div style={{ opacity: ringOpacity }} className="absolute inset-0">
        <span className="absolute inset-[10%] rounded-full border border-[#1b1519]/80" />
      </motion.div>

      {/* the work: plain photographs, some inside the circle and some across it */}
      <motion.div style={{ scale: picsScale, opacity: picsOpacity }} className="absolute inset-0">
        {PICS.map((pic, i) => (
          <motion.div
            key={i}
            drag={canDrag}
            dragMomentum={false}
            dragElastic={0}
            onDragStart={() => {
              dragged.current = true;
            }}
            onDragEnd={() => setTimeout(() => (dragged.current = false), 0)}
            whileDrag={{ zIndex: 30, cursor: "grabbing" }}
            className="absolute cursor-grab"
            style={{
              translate: "-50% -50%",
              left: `${pct(pic.x)}%`,
              top: `${pct(pic.y)}%`,
              width: `${(pic.w * 40).toFixed(3)}%`,
              aspectRatio: String(pic.ar),
            }}
          >
            <HoleLink
              href={pic.href}
              data-cursor={pic.title}
              aria-label={pic.title}
              draggable={false}
              onClickCapture={(e) => {
                if (dragged.current) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="work-thumb block size-full overflow-hidden bg-white"
            >
              <Image src={pic.src} alt="" width={800} height={Math.round(800 / pic.ar)} sizes="200px" draggable={false} className="pointer-events-none size-full object-cover" style={pic.zoom ? { transform: `scale(${pic.zoom})`, objectPosition: pic.pos } : undefined} />
            </HoleLink>
          </motion.div>
        ))}
      </motion.div>

      {/* the numbers of the day, over the photographs, as in the reference */}
      <motion.div style={{ opacity: ringOpacity }} className="pointer-events-none absolute inset-0">
        {Array.from({ length: 24 }, (_, i) => {
          const n = i + 1;
          const a = ((n / 24) * 360 - 90) * (Math.PI / 180);
          const r = 0.9;
          return (
            <span
              key={n}
              className="absolute text-[clamp(0.7rem,5.4cqw,1.6rem)] leading-none font-normal text-[#1b1519] tabular-nums"
              style={{
                left: `${pct(r * Math.cos(a))}%`,
                top: `${pct(r * Math.sin(a))}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {n}
            </span>
          );
        })}
      </motion.div>

      {/* the hands (they spin as you fall) */}
      <motion.svg viewBox="0 0 200 200" style={{ opacity: handsOpacity }} className="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden>
        <motion.g style={{ rotate: spinSlow, transformOrigin: "100px 100px", transformBox: "view-box" }}>
          <g className="hand" style={{ transform: `rotate(${hH}deg)` }}>
            <g transform="translate(100 100) scale(0.62)"><HourHand /></g>
          </g>
        </motion.g>
        <motion.g style={{ rotate: spin, transformOrigin: "100px 100px", transformBox: "view-box" }}>
          <g className="hand" style={{ transform: `rotate(${hM}deg)` }}>
            <g transform="translate(100 100) scale(0.74)"><MinuteHand /></g>
          </g>
        </motion.g>
        <g className="second-hand" style={{ animationDelay: `${secondDelay}s` }}>
          <path d="M100 118V26" stroke="#1b1519" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M97.4 112h5.2" stroke="#1b1519" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </motion.svg>

      {/* the pivot, where the hands meet: it becomes the hole */}
      <motion.span
        aria-hidden
        style={{ scale: coreScale, backgroundColor: coreColor }}
        className="absolute top-1/2 left-1/2 size-[3.4%] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
    </div>
  );
}
