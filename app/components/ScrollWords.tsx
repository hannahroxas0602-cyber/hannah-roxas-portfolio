"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

// A line of text that lights up word by word as you scroll it into the middle of the screen,
// after sebg.ch: the words start faint and settle to full strength, so you read at the pace you
// scroll. For the short lines that open a section.
function Word({ word, i, n, progress }: { word: string; i: number; n: number; progress: MotionValue<number> }) {
  const start = i / n;
  const opacity = useTransform(progress, [start, Math.min(1, start + 1.6 / n)], [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}

export default function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 55%"] });
  // Through a spring so the progress stays on the JavaScript path (see HoleHero.tsx).
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.25 });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden>
        {words.map((w, i) => (
          <Word key={i} word={w} i={i} n={words.length} progress={progress} />
        ))}
      </span>
    </p>
  );
}
