"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

const IDLE_DELAY_MS = 120;
export const CURSOR_COLOR = "#E85FE0";

export default function CustomCursor() {
  const [label, setLabel] = useState<string | null>(null);
  const [isMoving, setIsMoving] = useState(false);
  // Start as "touch" (renders nothing) on both server and client's first paint,
  // so hydration matches. The real pointer type is only known after mount.
  const [isTouch, setIsTouch] = useState(true);
  const [cursorColor, setCursorColor] = useState(CURSOR_COLOR);

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

      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);

      const inverted = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor-invert]",
      );
      setCursorColor(inverted ? "#000000" : CURSOR_COLOR);
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
          initial={{ width: 8, height: 8, paddingInline: 0 }}
          animate={{ width: "auto", height: 32, paddingInline: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center rounded-full"
          style={{ backgroundColor: CURSOR_COLOR }}
        >
          <motion.span
            initial={{ opacity: 0, color: "#000000" }}
            animate={{ opacity: 1, color: "#ffffff" }}
            transition={{ opacity: { delay: 0.05 }, color: { duration: 0.3, delay: 0.1 } }}
            className="text-xs font-medium whitespace-nowrap"
          >
            {label}
          </motion.span>
        </motion.div>
      ) : isMoving ? (
        <div
          style={{
            width: 40,
            height: 32,
            transform: "rotate(-18deg)",
            backgroundColor: cursorColor,
            WebkitMaskImage: "url(/images/moving.png)",
            maskImage: "url(/images/moving.png)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      ) : (
        <div
          style={{
            width: 27,
            height: 21,
            backgroundColor: cursorColor,
            WebkitMaskImage: "url(/images/not_moving.png)",
            maskImage: "url(/images/not_moving.png)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      )}
    </motion.div>
  );
}
