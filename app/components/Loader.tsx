"use client";

import { animate, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FALLING } from "@/app/components/WonderGlyphs";
import { HALL_GRAY, LOGO_BLUE as BLUE } from "@/app/components/hallColor";
import { markLanded } from "@/app/components/landing";

// The opening: you fall. Alice, on the way down, wonders "how many miles I've fallen by this
// time", and guesses four thousand. So the loader is a descent: the screen is the inside of the
// hole, a miles counter climbs to 4,000 while the things she passed (a pocket watch, a key, a
// teacup, a card, a door) drift upward, then "Thump." and the hole closes over the page.
// Home only, once per session (a returning visitor in the same tab goes straight in), skippable,
// and skipped entirely under Reduce Motion. The head script in layout.tsx hides it pre-hydration
// for repeat visits so it never flashes.
const SEEN_KEY = "hannah-fell";
const TOTAL_MILES = 4000;
const FALL_SECONDS = 3.4;
const DIAMONDS = 12;

// Fixed positions and speeds, so server and client markup match.
const OBJECTS = FALLING.map((Glyph, i) => ({
  Glyph,
  left: 6 + ((i * 37) % 86),
  size: 26 + ((i * 11) % 22),
  duration: 3.4 + ((i * 7) % 5) * 0.5,
  delay: -((i * 0.55) % 3),
  rotate: (i % 2 ? 1 : -1) * (20 + i * 12),
}));

export default function Loader() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"fall" | "thump" | "leave" | "gone">("fall");
  const [miles, setMiles] = useState(0);
  const finished = useRef(false);
  // Decided once. React runs effects twice in development, and the second run would otherwise
  // see the flag the first run just wrote and skip the fall.
  const seenBefore = useRef<boolean | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      markLanded();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("gone");
      return;
    }
    if (seenBefore.current === null) {
      try {
        seenBefore.current = !!sessionStorage.getItem(SEEN_KEY) && !/[?&]fall\b/.test(window.location.search);
      } catch {
        seenBefore.current = false;
      }
    }
    const seen = seenBefore.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      markLanded();
      setPhase("gone");
      return;
    }
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    let timers: ReturnType<typeof setTimeout>[] = [];
    const leave = () => {
      if (finished.current) return;
      finished.current = true;
      setPhase("leave");
      markLanded();
      html.style.overflow = prevOverflow;
      timers.push(setTimeout(() => setPhase("gone"), 950));
    };
    (window as unknown as { __skipFall?: () => void }).__skipFall = leave;

    const controls = animate(0, TOTAL_MILES, {
      duration: FALL_SECONDS,
      ease: [0.5, 0, 0.75, 0.6],
      onUpdate: (v) => setMiles(Math.round(v)),
      onComplete: () => {
        setPhase("thump");
        timers.push(setTimeout(leave, 700));
      },
    });
    return () => {
      controls.stop();
      timers.forEach(clearTimeout);
      timers = [];
      html.style.overflow = prevOverflow;
    };
  }, [pathname]);

  if (pathname !== "/" || phase === "gone") return null;

  return (
    <motion.div
      aria-hidden={phase === "leave"}
      role="status"
      aria-label="Loading: falling down the rabbit hole"
      className="fall-loader fixed inset-0 z-[200] overflow-hidden bg-white text-neutral-800"
      initial={false}
            animate={
        phase === "leave"
          ? { clipPath: "circle(0% at 50% 50%)" }
          : phase === "thump"
            ? { clipPath: "circle(150% at 50% 50%)", y: [0, 7, -3, 0] }
            : { clipPath: "circle(150% at 50% 50%)" }
      }
      transition={
        phase === "leave"
          ? { duration: 0.85, ease: [0.7, 0, 0.2, 1] }
          : { duration: 0.35, ease: "easeOut" }
      }
    >
      {/* The walls of the hole: thin gray rings that rush outward, so the centre feels like it recedes. */}
      <div className="absolute inset-0 grid place-items-center">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="fall-ring absolute rounded-full border border-[#868a8c]/50"
            style={{ width: "30vmin", height: "30vmin", animationDelay: `${-i * 0.55}s` }}
          />
        ))}
      </div>

      {/* The things she passed, drifting upward past you. */}
      {OBJECTS.map(({ Glyph, left, size, duration, delay, rotate }, i) => (
        <span
          key={i}
          className="fall-object absolute bottom-0"
          style={{
            left: `${left}%`,
            width: size * 1.5,
            height: size * 1.5,
            color: i % 2 ? HALL_GRAY : BLUE,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            ["--spin" as string]: `${rotate}deg`,
          }}
        >
          <Glyph className="size-full" />
        </span>
      ))}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="welcome text-3xl text-neutral-900 italic sm:text-5xl">
          {phase === "thump" || phase === "leave" ? "Thump." : "Down, down, down…"}
        </p>
      </div>

      {/* A row of diamonds fills in, blue and yellow in a checker, as the miles go by. */}
      <div aria-hidden className="absolute bottom-20 left-1/2 flex -translate-x-1/2 gap-2">
        {Array.from({ length: DIAMONDS }, (_, i) => {
          const on = miles / TOTAL_MILES > i / DIAMONDS;
          return (
            <span
              key={i}
              className="block size-4 transition-all duration-300"
              style={{
                clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
                backgroundColor: i % 2 ? HALL_GRAY : BLUE,
                opacity: on ? 1 : 0.15,
                transform: on ? "scale(1)" : "scale(0.6)",
              }}
            />
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => (window as unknown as { __skipFall?: () => void }).__skipFall?.()}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-neutral-300 bg-white/70 px-4 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:border-neutral-500 hover:text-neutral-900"
      >
        Skip the fall
      </button>
    </motion.div>
  );
}
