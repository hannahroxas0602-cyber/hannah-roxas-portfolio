"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

// A timeline's list with a glass line down it that fills with a gradient as you scroll
// through, the same language as the page's scroll rail. The dots are drawn by the
// caller (.rail-dot in globals.css).
export default function ScrollFillList({
  children,
  className = "",
  trackClassName = "top-3 bottom-3 left-[3px] sm:left-[calc(7.5rem-2.5px)]",
}: {
  children: ReactNode;
  className?: string;
  /** Where the line sits; the default suits the dated milestone rows. */
  trackClassName?: string;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  return (
    <ol ref={ref} className={`relative ${className}`}>
      <span
        aria-hidden
        className={`rail-track absolute w-[5px] overflow-hidden rounded-full ${trackClassName}`}
      >
        <motion.span
          className="absolute inset-0 origin-top rounded-full"
          style={{
            scaleY: fill,
            background: "#0b0b0d",
          }}
        />
      </span>
      {children}
    </ol>
  );
}
