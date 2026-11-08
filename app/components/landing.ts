"use client";

import { useSyncExternalStore } from "react";

// "Landed" means the opening fall is over (or was skipped), so the page can begin: the
// hero's headline melts in, its pieces rise. The Loader flips it; every other page is landed
// from the start. A tiny external store, so any component can wait for it.
const EVENT = "hannah:landed";

export function markLanded() {
  document.documentElement.dataset.landed = "1";
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

export function useLanded() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.landed === "1",
    () => false,
  );
}
