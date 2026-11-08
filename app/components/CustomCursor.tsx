"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

const IDLE_DELAY_MS = 120;

// The site accent (see --accent in globals.css; keep in sync). A literal, not the CSS
// variable, so inline styles can use it. Black text on it is 10:1.
export const CURSOR_COLOR = "#8EC9FF";

// One cursor for the whole site: a spade (one of the Queen's card soldiers), in one colour, no outline.
// It's white with a difference blend, so it shows as the opposite of whatever is under it: dark on the
// page, light on the hall, on photographs, anywhere. It swells a little while moving, grows over links and buttons, and
// turns into a frosted-glass pill carrying the label over anything with a data-cursor attribute.
// A spade, after the card suit: a pointed top, two round lobes, a flared stem. No stroke.
function Spade({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} aria-hidden>
      <path
        d="M50 3C50 3 10 36 10 64C10 83 25 92 38 86C42 84 45 82 47 79C47 94 42 108 31 117H69C58 108 53 94 53 79C55 82 58 84 62 86C75 92 90 83 90 64C90 36 50 3 50 3z"
        fill="#fff"
      />
    </svg>
  );
}

export default function CustomCursor() {
  const [label, setLabel] = useState<string | null>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [interactive, setInteractive] = useState(false);
  // Start as "touch" (renders nothing) on both server and client's first paint,
  // so hydration matches. The real pointer type is only known after mount.
  const [isTouch, setIsTouch] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 40, stiffness: 700, mass: 0.4 });
  const springY = useSpring(y, { damping: 40, stiffness: 700, mass: 0.4 });

  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // Intentional: isTouch must start as `true` on both server and client to
    // avoid a hydration mismatch, then be corrected here once we're in the
    // browser and can read the real pointer type.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(coarse);
    if (coarse) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      setIsMoving(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIsMoving(false), IDLE_DELAY_MS);

      const el = e.target as HTMLElement | null;
      setLabel(el?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? null);
      setInteractive(!!el?.closest("a,button,[role=button]"));
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [x, y]);

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] flex items-center justify-center"
      // The blend has to sit on this outermost fixed layer to see the page behind it. The label pill is
      // left unblended.
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", mixBlendMode: label ? "normal" : "difference" }}
    >
      {label ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="flex h-10 items-center gap-2 rounded-full border border-white/80 bg-white/60 pr-4 pl-2 shadow-[0_6px_24px_rgba(120,140,170,0.3)] backdrop-blur-md backdrop-saturate-150"
        >
          <Spade className="h-5 w-4 flex-none [filter:invert(1)]" />
          <span className="text-xs font-medium whitespace-nowrap text-neutral-900">{label}</span>
        </motion.div>
      ) : (
        <motion.span
          className="block h-[1.35rem] w-[1.12rem]"
          animate={{ scale: interactive ? 1.7 : isMoving ? 1.18 : 1, opacity: interactive ? 0.85 : 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
        >
          <Spade className="size-full" />
        </motion.span>
      )}
    </motion.div>
  );
}
