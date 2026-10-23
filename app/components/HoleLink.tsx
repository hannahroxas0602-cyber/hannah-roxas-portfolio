"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { markHoleNavigation } from "@/app/components/irisFallback";
import { startTitleMorph } from "@/app/components/titleMorph";

type HoleLinkProps = Omit<ComponentProps<typeof Link>, "transitionTypes"> & {
  // "in" falls into a project (the page drops away into the click point and the
  // project's title carries over); "out" climbs back up (the page lifts away).
  direction?: "in" | "out";
};

// Records where the click happened so the iris opens from (or closes into) that
// point. Keyboard activation has no pointer position, so it uses the link's center.
function setIrisOrigin(e: MouseEvent<HTMLAnchorElement>) {
  let x = e.clientX;
  let y = e.clientY;
  if (e.detail === 0) {
    const rect = e.currentTarget.getBoundingClientRect();
    x = rect.left + rect.width / 2;
    y = rect.top + rect.height / 2;
  }
  const root = document.documentElement.style;
  root.setProperty("--iris-x", `${x}px`);
  root.setProperty("--iris-y", `${y}px`);
  // The page being left is snapshotted at its full height, so a point on it is
  // measured from the top of the page, not the viewport.
  root.setProperty("--iris-page-y", `${y + window.scrollY}px`);
  root.setProperty("--viewport-center-page-y", `${window.scrollY + window.innerHeight / 2}px`);
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
        markHoleNavigation();
        if (direction === "in") startTitleMorph(e.currentTarget);
      }}
    />
  );
}
