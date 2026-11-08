"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// A number that counts up to its value the first time it scrolls into view. Values like "64%" or
// "121+" keep their prefix and suffix; anything that isn't a number is shown as it is.
export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const match = value.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[2].replace(/,/g, "")) : NaN;
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || reduce || !match || Number.isNaN(target)) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(v),
      onComplete: () => setShown(null),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  if (!match || Number.isNaN(target)) return <span className={className}>{value}</span>;
  const text =
    shown === null
      ? match[2]
      : shown.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {match[1]}
      {text}
      {match[3]}
    </span>
  );
}
