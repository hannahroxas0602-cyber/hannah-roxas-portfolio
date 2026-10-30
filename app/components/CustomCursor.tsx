"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { backdropLuminanceAt, colorFor, monoFor } from "@/app/components/cursorBackdrop";
import HoverKey from "@/app/components/HoverKey";

const IDLE_DELAY_MS = 120;

// Experiment: three cursor looks to compare. Switch with ?cursor=pink|mono|invert
// (remembered for the tab). "pink" is the brand cursor; "mono" is black on light
// and white on dark; "invert" is a live difference blend that flips whatever is
// under it. Remove the losers once one is chosen.
type CursorMode = "pink" | "mono" | "invert";
const MODE_KEY = "cursor-mode";

function readMode(): CursorMode {
  try {
    const q = new URLSearchParams(window.location.search).get("cursor");
    if (q === "pink" || q === "mono" || q === "invert") sessionStorage.setItem(MODE_KEY, q);
    const m = sessionStorage.getItem(MODE_KEY);
    return m === "mono" || m === "invert" ? m : "pink";
  } catch {
    return "pink";
  }
}
// The site accent (see --accent in globals.css; keep in sync). A literal, not
// the CSS variable, so motion can animate it. The bunny itself shifts to a
// brighter pink over dark backgrounds (cursorBackdrop.ts); labels, badges and
// text always use this one.
export const CURSOR_COLOR = "#3EC3FF"; // the hover label, bubbles (black text on it, 10:1)
export const CURSOR_MARK = "#2FA0F0"; // the key: a deeper, saturated blue
export const CURSOR_INK = "#2B5560"; // dark slate, for colored text on white

export default function CustomCursor() {
  const [label, setLabel] = useState<string | null>(null);
  const [isMoving, setIsMoving] = useState(false);
  // Start as "touch" (renders nothing) on both server and client's first paint,
  // so hydration matches. The real pointer type is only known after mount.
  const [isTouch, setIsTouch] = useState(true);
  const [cursorColor, setCursorColor] = useState(CURSOR_COLOR);
  const [mode, setMode] = useState<CursorMode>("pink");
  const modeRef = useRef<CursorMode>("pink");

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
    modeRef.current = readMode();
    setMode(modeRef.current);

    // The backdrop is read at most once per frame, however fast the mouse moves.
    let frame = 0;
    let pointer: { target: Element | null; x: number; y: number } | null = null;
    const updateColor = () => {
      frame = 0;
      if (!pointer) return;
      const inverted = (pointer.target as HTMLElement | null)?.closest("[data-cursor-invert]");
      if (inverted) return setCursorColor("#000000");
      const l = backdropLuminanceAt(pointer.x, pointer.y);
      const m = modeRef.current;
      setCursorColor(m === "invert" ? "#FFFFFF" : m === "mono" ? monoFor(l) : colorFor(l));
    };

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      setIsMoving(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIsMoving(false), IDLE_DELAY_MS);

      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);

      pointer = { target: e.target as Element | null, x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(updateColor);
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frame) cancelAnimationFrame(frame);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [x, y]);

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        // A soft shadow (not an outline) keeps the bunny crisp on white; on dark backgrounds
        // it simply disappears.
        filter: "drop-shadow(0 1px 1.5px rgba(25,60,72,0.5)) drop-shadow(0 0 0.5px rgba(25,60,72,0.4))",
        // The invert look: a white bunny blended with "difference", so it shows as
        // the opposite of whatever is behind it. The label pill is never blended.
        mixBlendMode: mode === "invert" && !label ? "difference" : "normal",
      }}
    >
      {label ? (
        <motion.div
          initial={{ width: 8, height: 8, paddingInline: 0 }}
          animate={{ width: "auto", height: 32, paddingInline: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative flex items-center justify-center rounded-full"
          style={{ backgroundColor: mode === "pink" ? CURSOR_COLOR : "#111111" }}
        >
          {/* A key floats just above every hover label, in the label's color. */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.3, ease: "easeOut" }}
            className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2"
          >
            <HoverKey
              color={mode === "pink" ? CURSOR_MARK : "#111111"}
              className="hover-key"
            />
          </motion.span>
          <motion.span
            initial={{ opacity: 0, color: "#000000" }}
            animate={{ opacity: 1, color: mode === "pink" ? "#000000" : "#ffffff" }}
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
