"use client";

import { animate, AnimatePresence, motion, useMotionValue, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/app/components/useIsPhone";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { markLanded } from "@/app/components/landing";

// The opening, in the spirit of a counter-led reveal: a large percentage fills the corner while a small black
// rabbit tumbles down the page (Alice's fall, as a silhouette) and a sentence writes itself, line by line:
// "Follow the rabbit. / See where it lands." At a hundred the sheet lifts away and the
// page begins. Home only, once per tab (add ?fall to replay) and skippable. Under Reduce Motion it is a calm version: the
// counter and the sentence fade in and out, with no falling hare and no sliding.
const SEEN_KEY = "hannah-fell";
const SECONDS = 3.8;
const LINES = ["Follow the rabbit.", "See where it lands."];

// The leaping-hare silhouette from the cursor (public/images/moving.png), used as a mask so it takes the text colour.
function Bunny({ className }: { className?: string }) {
  const mask = "url(/images/moving.png) center / contain no-repeat";
  return <span aria-hidden className={`block aspect-[1084/856] bg-current ${className ?? ""}`} style={{ WebkitMask: mask, mask }} />;
}

export default function Loader() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"count" | "leave" | "gone">("count");
  const p = useMotionValue(0); // 0..100
  const [shown, setShown] = useState(0);
  const finished = useRef(false);
  const seenBefore = useRef<boolean | null>(null);
  // Reduce Motion: a calm version (the counter and the sentence, no falling hare, no slide, just fades), not nothing
  const calm = usePrefersReducedMotion();

  // the bunny: it falls from above the top to below the bottom, straight down
  const y = useTransform(p, [0, 100], ["-22vh", "112vh"]);
  // head-first: the hare leaps left, so -90deg points it down; it rocks a little as it falls
  const rot = -90;

  useEffect(() => {
    if (pathname !== "/") {
      markLanded();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("gone");
      return;
    }
    if (seenBefore.current === null) {
      try {
        seenBefore.current = !!sessionStorage.getItem(SEEN_KEY) && !/[?&]fall\b/.test(window.location.search);
      } catch {
        seenBefore.current = false;
      }
    }
    const calmNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seenBefore.current) {
      markLanded();
      setPhase("gone");
      return;
    }
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}

    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    let timer: ReturnType<typeof setTimeout>;
    const leave = () => {
      if (finished.current) return;
      finished.current = true;
      setPhase("leave");
      markLanded();
      html.style.overflow = prev;
      timer = setTimeout(() => setPhase("gone"), 1000);
    };
    (window as unknown as { __skipFall?: () => void }).__skipFall = leave;

    const controls = animate(p, 100, {
      duration: calmNow ? 2.6 : SECONDS,
      ease: [0.55, 0.05, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v)),
      onComplete: () => {
        setShown(100);
        timer = setTimeout(leave, 420);
      },
    });
    return () => {
      controls.stop();
      clearTimeout(timer);
      html.style.overflow = prev;
    };
  }, [pathname, p]);

  if (pathname !== "/" || phase === "gone") return null;

  const stage = shown < 10 ? 0 : shown < 45 ? 1 : 2; // how many lines are showing

  return (
    <motion.div
      role="status"
      aria-label="Loading"
      initial={false}
      animate={calm ? { opacity: phase === "leave" ? 0 : 1 } : { y: phase === "leave" ? "-100%" : 0 }}
      transition={calm ? { duration: 0.6, ease: "easeOut" } : { duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] overflow-hidden bg-[#ffffff] text-[#0b0b0d]"
    >
      <div className="font-label absolute top-5 left-5 text-[11px] tracking-[0.16em] uppercase sm:top-7 sm:left-8">Hannah Roxas</div>
      <div className="font-label absolute top-5 right-5 text-[11px] tracking-[0.16em] uppercase sm:top-7 sm:right-8">Portfolio &apos;26</div>

      {/* a hairline, and the sentence beside it */}
      <div className="absolute top-[18%] left-[8%] h-[38%] w-px bg-[#0b0b0d] sm:left-[16%]" />
      <p className="absolute top-[18%] left-[calc(8%+1rem)] max-w-[16ch] text-[clamp(1.7rem,4.2vw,3.6rem)] leading-[1.04] font-medium tracking-[-0.04em] sm:left-[calc(16%+1.25rem)]">
        <AnimatePresence initial={false}>
          {LINES.slice(0, stage).map((l) => (
            <motion.span key={l} initial={calm ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(6px)" }} animate={calm ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: calm ? 0.4 : 0.55, ease: [0.22, 1, 0.36, 1] }} className="block">
              {l}
            </motion.span>
          ))}
        </AnimatePresence>
      </p>

      {/* the rabbit, falling */}
      {!calm && (
        <motion.div style={{ y, rotate: rot }} className="absolute top-0 left-[66%] w-[clamp(7rem,17vw,16rem)] -translate-x-1/2">
          <Bunny className="w-full" />
        </motion.div>
      )}

      {/* the counter */}
      <p aria-hidden className="absolute bottom-3 left-4 text-[clamp(6.5rem,24vw,22rem)] leading-[0.78] font-semibold tracking-[-0.07em] tabular-nums sm:left-6">
        {shown}%
      </p>

      <button
        type="button"
        onClick={() => (window as unknown as { __skipFall?: () => void }).__skipFall?.()}
        className="font-label absolute right-5 bottom-6 text-[11px] tracking-[0.16em] uppercase underline-offset-4 hover:underline sm:right-8"
      >
        Skip
      </button>
    </motion.div>
  );
}
