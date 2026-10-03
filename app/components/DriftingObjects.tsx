"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { driftObjects, type DriftObject } from "@/app/data/drift";

// Content never gets wider than this (the homepage projects section, including
// its 2.5rem side padding), so the objects float in the space outside it. Only
// shown from 1440px up, where that margin is wide enough to keep them clear.
const CONTENT_MAX_WIDTH = "80rem";
const CONTENT_PADDING = "2.5rem";
// Free space between the viewport edge and the content.
const MARGIN = `((100% - ${CONTENT_MAX_WIDTH}) / 2 + ${CONTENT_PADDING})`;

function Drifter({
  item,
  scrollY,
}: {
  item: DriftObject;
  scrollY: MotionValue<number>;
}) {
  const y = useTransform(scrollY, (v) => v * item.speed);
  const rotate = useTransform(
    scrollY,
    (v) => item.rotate + (v / 1000) * item.spin,
  );
  // Centered in the free space of its margin.
  const inset = `calc(${MARGIN} / 2 - ${item.size / 2}px)`;

  return (
    <motion.div
      className="absolute"
      style={{
        top: item.top,
        [item.side]: inset,
        width: item.size,
        y,
        rotate,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt=""
        width={item.size}
        loading="lazy"
        decoding="async"
        className="h-auto w-full"
      />
    </motion.div>
  );
}

// Decorative objects that drift past in the page margins at different
// parallax speeds as you scroll. Configure them in app/data/drift.ts.
// Hidden below 1440px and for visitors who prefer reduced motion.
export default function DriftingObjects() {
  const { scrollY } = useScroll();

  return (
    <div
      aria-hidden
      // motion-reduce:!hidden rather than returning null: the server can't know the
      // visitor's motion preference, so rendering nothing on the client only
      // would be a hydration mismatch.
      className="pointer-events-none absolute inset-0 hidden overflow-hidden min-[1440px]:block motion-reduce:!hidden"
    >
      {driftObjects.map((item) => (
        <Drifter key={item.src + item.top} item={item} scrollY={scrollY} />
      ))}
    </div>
  );
}
