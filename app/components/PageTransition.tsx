"use client";

import { usePathname } from "next/navigation";
import { ViewTransition, type ReactNode } from "react";

// Keyed on the pathname so each navigation swaps in a new boundary, which is what
// lets enter/exit animations fire. HoleLink tags navigations "hole-in" (into a
// project) or "hole-out" (back up); the iris keyframes live in globals.css.
// Untyped navigations (nav links, browser back/forward) fall through to the
// browser's default quick crossfade.
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <ViewTransition
      key={pathname}
      enter={{ "hole-in": "iris-open", "hole-out": "iris-under", default: "none" }}
      exit={{ "hole-in": "iris-over", "hole-out": "iris-close", default: "none" }}
      default="none"
    >
      <div className="flex min-h-full flex-1 flex-col">{children}</div>
    </ViewTransition>
  );
}
