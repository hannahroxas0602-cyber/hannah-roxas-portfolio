// Fallback for browsers without the View Transitions API (iOS 17 and earlier,
// older Firefox). There the browser can't snapshot the old page, so instead the
// incoming page itself opens in a circle from the tap point.
//
// HoleLink records that a "hole" navigation just started; the next page to
// mount picks it up and plays the reveal. Entries expire so an unrelated later
// navigation never inherits one.
const EXPIRES_MS = 4000;

let pending: { at: number } | null = null;

export function supportsViewTransitions() {
  return typeof document !== "undefined" && "startViewTransition" in document;
}

export function markHoleNavigation() {
  pending = { at: Date.now() };
}

export function takeHoleNavigation() {
  const nav = pending;
  pending = null;
  return nav !== null && Date.now() - nav.at < EXPIRES_MS;
}
