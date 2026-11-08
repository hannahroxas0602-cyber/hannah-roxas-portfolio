"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

// The hover on a home-page project preview, after the gradient-orb reference: a pastel
// wash blooms under the pointer, two glass spheres trail it (one tight, one lazy, like
// the merged bubbles in the reference), a ring ripples out from where you entered, and
// a thin frame with small aqua crosses draws itself in. Everything is invisible at rest.
//
// Place inside a positioned, overflow-hidden card that has the `group` class. Shown only
// on devices with a real hover and without a reduced-motion preference (globals.css).
export default function OrbHover() {
  const root = useRef<HTMLSpanElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tightX = useSpring(mx, { stiffness: 380, damping: 30, mass: 0.5 });
  const tightY = useSpring(my, { stiffness: 380, damping: 30, mass: 0.5 });
  const lazyX = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.9 });
  const lazyY = useSpring(my, { stiffness: 90, damping: 18, mass: 0.9 });

  useEffect(() => {
    const card = root.current?.parentElement;
    if (!card) return;
    const place = (e: PointerEvent, jump: boolean) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      mx.set(x);
      my.set(y);
      if (jump) {
        tightX.jump(x);
        tightY.jump(y);
        lazyX.jump(x - 40);
        lazyY.jump(y + 30);
      }
      root.current?.style.setProperty("--ox", `${x}px`);
      root.current?.style.setProperty("--oy", `${y}px`);
    };
    const onMove = (e: PointerEvent) => place(e, false);
    const onEnter = (e: PointerEvent) => place(e, true);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerenter", onEnter);
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerenter", onEnter);
    };
  }, [mx, my, tightX, tightY, lazyX, lazyY]);

  return (
    <span
      ref={root}
      aria-hidden
      className="orb-hover pointer-events-none absolute inset-0 z-[5] overflow-hidden"
    >
      <span className="orb-wash" />

      <span className="orb-frame" />
      <span className="orb-cross" style={{ left: "12%", top: "22%" }} />
      <span className="orb-cross" style={{ left: "88%", top: "78%" }} />
      <span className="orb-cross" style={{ left: "80%", top: "14%" }} />

      <span className="orb-ripple" />
      <span className="orb-ripple orb-ripple-late" />

      <motion.span
        className="orb-sphere orb-sphere-lazy"
        style={{ x: lazyX, y: lazyY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.span
        className="orb-sphere orb-sphere-tight"
        style={{ x: tightX, y: tightY, translateX: "-50%", translateY: "-50%" }}
      />
    </span>
  );
}
