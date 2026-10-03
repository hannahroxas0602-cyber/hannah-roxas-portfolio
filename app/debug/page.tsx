"use client";

import { useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", onChange);
  window.addEventListener("resize", onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener("resize", onChange);
  };
}

// A string snapshot, so React can compare it between renders.
function readBrowser() {
  const mq = (q: string) => (window.matchMedia(q).matches ? "YES" : "no");
  return JSON.stringify([
    ["Browser asks for reduced motion", mq(REDUCED_MOTION)],
    [
      "View Transitions (circle page transition)",
      "startViewTransition" in document ? "supported" : "NOT supported",
    ],
    [
      "View transition classes",
      CSS.supports("view-transition-class: a") ? "supported" : "NOT supported",
    ],
    ["Touch screen (no hover)", mq("(hover: none)")],
    ["Screen width", `${window.innerWidth}px`],
    ["Browser", navigator.userAgent],
  ]);
}

// Diagnostic page: shows what this browser reports for the settings the site's
// animations depend on. Not linked from anywhere; open /debug directly.
export default function DebugPage() {
  const snapshot = useSyncExternalStore(subscribe, readBrowser, () => "[]");
  const rows = JSON.parse(snapshot) as [string, string][];

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <meta name="robots" content="noindex" />
      <title>Diagnostics | Hannah Roxas</title>
      <h1 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900">
        Diagnostics
      </h1>
      <p className="mt-2 text-sm text-neutral-500">What this browser reports right now.</p>
      <dl className="mt-8 space-y-5">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-medium tracking-wide text-neutral-400 uppercase">{label}</dt>
            <dd className="mt-1 text-base break-words text-neutral-900">{value}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
