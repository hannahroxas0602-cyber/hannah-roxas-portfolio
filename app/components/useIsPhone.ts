import { useSyncExternalStore } from "react";

// True on a phone-width screen (under Tailwind's `sm`, 640px). It's false while the page renders on the server, and
// updates when the window is resized or the phone is rotated.
const QUERY = "(max-width: 639px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function useIsPhone() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

// True when the device asks for Reduce Motion. Read the hydration-safe way: false on the server and during the first
// client render, then the real value (unlike motion's useReducedMotion, which can differ on the very first render).
const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const mq = window.matchMedia(RM);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeRM,
    () => window.matchMedia(RM).matches,
    () => false,
  );
}
