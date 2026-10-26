// Fallback for browsers without the View Transitions API (iOS 17 and earlier,
// older Firefox). There the browser can't snapshot the old page, so instead the
// incoming page itself opens in a circle from the tap point.
//
// HoleLink records that a "hole" navigation just started (and which way: "in"
// to a project, "out" back up); the next page to mount picks it up and plays
// the reveal. Entries expire so an unrelated later navigation never inherits one.
const EXPIRES_MS = 4000;

export type HoleDirection = "in" | "out";

let pending: { at: number; direction: HoleDirection } | null = null;

export function supportsViewTransitions() {
  return typeof document !== "undefined" && "startViewTransition" in document;
}

export function markHoleNavigation(direction: HoleDirection) {
  pending = { at: Date.now(), direction };
}

// The direction of the hole navigation that just happened, or null if the
// page didn't arrive through one.
export function takeHoleNavigation(): HoleDirection | null {
  const nav = pending;
  pending = null;
  return nav !== null && Date.now() - nav.at < EXPIRES_MS ? nav.direction : null;
}
