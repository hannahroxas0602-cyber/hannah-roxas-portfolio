"use client";

import { usePathname } from "next/navigation";
import { ViewTransition, useLayoutEffect, useRef, type ReactNode } from "react";
import {
  supportsViewTransitions,
  takeHoleNavigation,
  type HoleDirection,
} from "@/app/components/irisFallback";
import { finishTitleMorph } from "@/app/components/titleMorph";
import { staggerPageIn } from "@/app/components/pageEnter";

// Remounts with every page (it sits inside the keyed boundary below). Where the
// browser has no View Transitions API, it plays the iris on the incoming page
// itself; see irisFallback.ts and `.iris-fallback` in globals.css.
function Page({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // Read once per mount and kept in a ref, so React re-running the effect in
  // development doesn't lose it. `undefined` means not read yet; `null`, that
  // this page didn't arrive through a hole link.
  const holeDirection = useRef<HoleDirection | null | undefined>(undefined);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el) finishTitleMorph(el);
    if (holeDirection.current === undefined) holeDirection.current = takeHoleNavigation();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Into a project, once the circle has opened, the content eases in.
    const stopStagger =
      el && holeDirection.current === "in" && !reduceMotion ? staggerPageIn(el) : undefined;
    if (!el || !holeDirection.current || supportsViewTransitions() || reduceMotion) {
      return stopStagger;
    }

    const root = document.documentElement;
    el.classList.add("iris-fallback");
    root.classList.add("iris-fallback-backdrop");
    const done = () => {
      el.classList.remove("iris-fallback");
      root.classList.remove("iris-fallback-backdrop");
    };
    // Only this element's own iris counts; animations inside the page bubble up too.
    const onEnd = (e: AnimationEvent) => {
      if (e.target === el && e.animationName === "iris-fallback-open") done();
    };
    el.addEventListener("animationend", onEnd);
    // Safety net in case animationend never fires (tab hidden mid-animation).
    const timer = setTimeout(done, 1200);
    return () => {
      stopStagger?.();
      el.removeEventListener("animationend", onEnd);
      clearTimeout(timer);
      done();
    };
  }, []);

  return (
    <div ref={ref} className="flex min-h-full flex-1 flex-col">
      {children}
    </div>
  );
}

// Keyed on the pathname so each navigation swaps in a new boundary, which is what
// lets enter/exit animations fire. HoleLink tags navigations "hole-in" (into a
// project) or "hole-out" (back up); the iris keyframes live in globals.css,
// which swaps them for a short crossfade under Reduce Motion. Untyped
// navigations (nav links, browser back/forward) get the browser's default crossfade.
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <ViewTransition
      key={pathname}
      enter={{ "hole-in": "iris-open", "hole-out": "iris-under", default: "none" }}
      exit={{ "hole-in": "iris-over", "hole-out": "iris-close", default: "none" }}
      default="none"
    >
      <Page>{children}</Page>
    </ViewTransition>
  );
}
