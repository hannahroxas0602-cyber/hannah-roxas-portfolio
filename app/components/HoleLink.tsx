"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { markHoleNavigation } from "@/app/components/irisFallback";
import { startTitleMorph } from "@/app/components/titleMorph";

type HoleLinkProps = Omit<ComponentProps<typeof Link>, "transitionTypes"> & {
  // "in" opens into a project (a circle grows from the tapped card and the
  // project's title carries over); "out" climbs back up (the page closes into
  // the tapped link).
  direction?: "in" | "out";
};

// The iris opens from (or closes into) the tapped link itself: its center, and,
// going in, starting at roughly its size, so the card reads as opening up into
// the page. Mouse, touch, and keyboard all land on the same origin.
const MIN_START_RADIUS = 24;
const MAX_START_RADIUS = 200;
// Matches --iris-feather in globals.css, so the soft edge clears the corners.
const FEATHER = 28;

function setIrisOrigin(e: MouseEvent<HTMLAnchorElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const r0 = Math.min(
    MAX_START_RADIUS,
    Math.max(MIN_START_RADIUS, Math.min(rect.width, rect.height) / 2),
  );
  // Fully open is exactly the distance to the farthest screen corner. A fixed
  // oversized radius would spend part of the animation growing off-screen.
  const r1 =
    Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + FEATHER;
  const root = document.documentElement.style;
  root.setProperty("--iris-x", `${x}px`);
  root.setProperty("--iris-y", `${y}px`);
  root.setProperty("--iris-r0", `${r0}px`);
  root.setProperty("--iris-r1", `${r1}px`);
  // The page being left is snapshotted at its full height, so a point on it is
  // measured from the top of the page, not the viewport.
  root.setProperty("--iris-page-y", `${y + window.scrollY}px`);
}

export default function HoleLink({ direction = "in", onClick, ...props }: HoleLinkProps) {
  return (
    <Link
      {...props}
      transitionTypes={[direction === "in" ? "hole-in" : "hole-out"]}
      onClick={(e) => {
        onClick?.(e);
        // A handler can cancel the navigation (a tap that only previews a card).
        if (e.defaultPrevented) return;
        setIrisOrigin(e);
        markHoleNavigation(direction);
        if (direction === "in") startTitleMorph(e.currentTarget);
      }}
    />
  );
}
