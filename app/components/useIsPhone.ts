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
