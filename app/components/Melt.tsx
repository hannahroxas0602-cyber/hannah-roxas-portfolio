"use client";

import { animate, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, type MotionValue } from "motion/react";
import { useEffect, useId, useRef, type ElementType, type ReactNode } from "react";

// Blob to text (and blob to image), after bleibtgleich.dev: the children are run through a
// goo filter (a blur, then a hard alpha threshold) whose blur is driven from "melted" down
// to nothing, so letters start as soft ink blobs and settle into crisp type. On an image it
// reads as the picture melting into focus. Three ways to drive it:
//   scroll: tied to the element's position as it rises into view (reversible, headings)
//   view:   plays once, when it first scrolls into view (images)
//   load:   plays once on mount, after `delay` (the hero headline)
// The filter is removed once it is crisp, so nothing stays filtered. Reduce Motion skips it.
export default function Melt({
  as = "span",
  children,
  className = "",
  maxBlur = 3.2,
  mode = "scroll",
  duration = 1.2,
  delay = 0,
  start = true,
  driver,
  slow = false,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Blur (px) when fully melted: about 3 for headline type (thin serif strokes vanish above ~4), 10-16 for a photo. */
  maxBlur?: number;
  mode?: "scroll" | "view" | "load";
  duration?: number;
  delay?: number;
  /** load mode only: hold the melt until this is true (the loader sets it when you land). */
  start?: boolean;
  /** Drive the melt from a 0..1 value (1 = crisp) instead of scroll position or time. For text inside a
   * sticky stage, whose own position never changes. */
  driver?: MotionValue<number>;
  /** scroll mode: stretch the melt over a longer stretch of scrolling (titles that should linger). */
  slow?: boolean;
}) {
  const Tag = as;
  const uid = useId().replace(/:/g, "");
  const ref = useRef<HTMLElement>(null);
  const blur = useRef<SVGFEGaussianBlurElement>(null);
  const matrix = useRef<SVGFEColorMatrixElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: slow ? ["start 98%", "start 44%"] : ["start 96%", "start 60%"] });
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });

  // melt: 1 is fully melted, 0 is crisp.
  const apply = (melt: number) => {
    const el = ref.current;
    if (!el) return;
    if (melt <= 0.002) {
      el.style.filter = "none";
      return;
    }
    el.style.filter = `url(#${uid})`;
    blur.current?.setAttribute("stdDeviation", (maxBlur * melt).toFixed(2));
    matrix.current?.setAttribute(
      "values",
      `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${(1 + 19 * melt).toFixed(2)} ${(-4 * melt).toFixed(2)}`,
    );
  };

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!reduce && mode === "scroll" && !driver) apply(1 - Math.min(1, Math.max(0, p)));
  });
  const noop = useMotionValue(1);
  useMotionValueEvent(driver ?? noop, "change", (v) => {
    if (!reduce && driver) apply(1 - Math.min(1, Math.max(0, v)));
  });

  // Set the starting state, then once layout has settled for scroll mode.
  useEffect(() => {
    if (reduce) return;
    if (driver) {
      apply(1 - driver.get());
      return;
    }
    if (mode === "scroll") {
      apply(1 - scrollYProgress.get());
      const id = requestAnimationFrame(() => apply(1 - scrollYProgress.get()));
      return () => cancelAnimationFrame(id);
    }
    apply(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, mode]);

  useEffect(() => {
    if (reduce || mode === "scroll" || driver) return;
    if (mode === "view" && !inView) return;
    if (mode === "load" && !start) return;
    const controls = animate(1, 0, {
      duration,
      delay,
      // Ease-in-out, so the blobby middle lasts long enough to be seen.
      ease: [0.5, 0, 0.35, 1],
      onUpdate: apply,
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, mode, duration, delay, start]);

  return (
    <>
      <svg aria-hidden width="0" height="0" className="absolute" focusable="false">
        <filter id={uid} x="-20%" y="-60%" width="140%" height="220%" colorInterpolationFilters="sRGB">
          <feGaussianBlur ref={blur} in="SourceGraphic" stdDeviation={maxBlur} result="b" />
          <feColorMatrix ref={matrix} in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -4" />
        </filter>
      </svg>
      <Tag ref={ref} className={className} style={{ display: as === "span" && !/\b(block|flex|grid|inline)/.test(className) ? "inline-block" : undefined }}>
        {children}
      </Tag>
    </>
  );
}
