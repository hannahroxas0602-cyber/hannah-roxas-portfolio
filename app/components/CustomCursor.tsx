"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

const IDLE_DELAY_MS = 120;

// The site accent (see --accent in globals.css; keep in sync). A literal, not the CSS
// variable, so inline styles can use it. Black text on it is 10:1.
export const CURSOR_COLOR = "#8EC9FF";

// One cursor for the whole site: a gradient sphere (dark core, rose halo, blue-gray
// falloff). It swells a little while moving, grows into a soft ring over links and
// buttons, and turns into a frosted-glass pill carrying the label over anything with a
// data-cursor attribute.
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
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      {label ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="flex h-10 items-center gap-2 rounded-full border border-white/80 bg-white/60 pr-4 pl-2 shadow-[0_6px_24px_rgba(120,140,170,0.3)] backdrop-blur-md backdrop-saturate-150"
        >
          <span className="orb-cursor-core h-6 w-6 flex-none rounded-full" />
          <span className="text-xs font-medium whitespace-nowrap text-neutral-900">{label}</span>
        </motion.div>
      ) : (
        <motion.span
          className="orb-cursor-core block h-7 w-7 rounded-full"
          animate={{ scale: interactive ? 1.9 : isMoving ? 1.18 : 1, opacity: interactive ? 0.85 : 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.55), 0 4px 16px rgba(170,120,150,0.3)" }}
        />
      )}
    </motion.div>
  );
}
