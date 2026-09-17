"use client";

import { useEffect } from "react";

/**
 * Next.js App Router's built-in hash scroll can land in the wrong spot when
 * content above the target (e.g. hero images) is still loading and shifts
 * layout height after the initial scroll fires. This re-scrolls to the hash
 * target once on mount, then again after a short delay to correct for any
 * late layout shift.
 */
export function useScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const scrollToTarget = () => {
      const el = document.getElementById(hash.slice(1));
      el?.scrollIntoView({ block: "start" });
    };

    scrollToTarget();
    const timeout = setTimeout(scrollToTarget, 400);
    return () => clearTimeout(timeout);
  }, []);
}
