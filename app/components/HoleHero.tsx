"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Melt from "@/app/components/Melt";
import WorkClock from "@/app/components/WorkClock";
import Stopwatch from "@/app/components/Stopwatch";
import { useLanded } from "@/app/components/landing";
import { social } from "@/app/data/social";
import { HALL_GRAY } from "@/app/components/hallColor";

// The top of the hole. A tall section with a sticky stage: at first it's a calm page (who I am,
// and a hole with the things Alice meets circling it), and as you scroll you fall into it. The
// words melt away, the hole's core swells until it fills the screen, and a swirl winds in over it. The stage ends in the hall's gray, and the hall of
// gates begins in the same gray, so there's no seam. Sizes and the two-column layout key off the stage's
// own width (container queries), not the window's, so the hero stays right when the About panel opens
// and narrows the page. The hero is also the page's plain statement
// of what I do, so a ten-second visitor gets the answer before the fall begins.
const EASE = [0.22, 1, 0.36, 1] as const;

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit" }),
      );
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300/80 bg-white/60 py-0.5 pr-2.5 pl-2 text-[11px] font-medium text-neutral-600 backdrop-blur">
      <Stopwatch ticking className="size-4 text-neutral-950" />
      LA / Bay Area
      <span aria-hidden className="text-neutral-300">·</span>
      <span className="tabular-nums">{time ?? "       "}</span>
    </span>
  );
}

const rise = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay: 0.12 + i * 0.09 },
});

export default function HoleHero() {
  const ref = useRef<HTMLElement>(null);
  const landed = useLanded();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Through a spring on purpose: it keeps the progress on the JavaScript path. Driven natively
  // (as Motion does for plain scroll-linked opacity and filter), the sticky stage reads wrong.
  const p = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.25 });

  // The hole draws you in slowly at first (the rings widen, the core grows a little), then the
  // core swells to fill the screen. The words melt away early so Alice's line has room.
  const stageBg = useTransform(p, [0.5, 0.9], ["#ffffff", HALL_GRAY]);
  const textOpacity = useTransform(p, [0.04, 0.3], [1, 0]);
  const textY = useTransform(p, [0, 0.3], [0, -70]);
  const textBlur = useTransform(p, [0, 0.3], ["blur(0px)", "blur(10px)"]);

  return (
    <section ref={ref} id="info" data-rail="The edge" className="relative -mt-12 h-[240svh]">
      <motion.div style={{ backgroundColor: stageBg }} className="@container sticky top-0 h-svh overflow-hidden">
        {/* The clock. It sits to the right on a wide screen and under the words on a phone. Its pivot
            is the hole. */}
        <div className="absolute top-[71%] left-1/2 aspect-square w-[min(66cqw,20rem)] -translate-x-1/2 -translate-y-1/2 @3xl:top-[43%] @3xl:left-[75%] @3xl:w-[min(27cqw,22rem)]">
          <WorkClock progress={p} />
        </div>

        {/* Words: who I am. They melt away as you fall. */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, filter: textBlur }}
          className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-start gap-5 px-6 pt-24 sm:px-10 @3xl:gap-3.5 @3xl:justify-center @3xl:pt-0 @3xl:pb-32 [&>*]:pointer-events-auto"
        >
          <motion.div {...(landed ? rise(0) : { initial: { opacity: 0 }, animate: { opacity: 0 } })}>
            <LocalTime />
          </motion.div>

          <Melt as="div" mode="load" start={landed} maxBlur={3.4} duration={1.9} delay={0.1} className="max-w-[30rem]">
            <h1 className="welcome text-[clamp(1.8rem,3.3cqw,2.15rem)] leading-[1.1] tracking-[-0.02em] text-neutral-950">
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="View LinkedIn"
                className="link-underline"
              >
                Hannah Roxas
              </a>{" "}
              designs it, then <em>ships it to production,</em> front end and back.
            </h1>
          </Melt>

          <motion.p
            {...(landed ? rise(2) : { initial: { opacity: 0 }, animate: { opacity: 0 } })}
            className="max-w-[26rem] text-base leading-relaxed text-neutral-700 @3xl:text-[0.95rem]"
          >
            I follow questions down rabbit holes: research, then interface, then code. Come see what I found at the bottom.
          </motion.p>

          <motion.div
            {...(landed ? rise(3) : { initial: { opacity: 0 }, animate: { opacity: 0 } })}
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <button
              type="button"
              onClick={() =>
                window.scrollTo({ top: (ref.current?.offsetTop ?? 0) + (ref.current?.offsetHeight ?? 0) - window.innerHeight * 0.4, behavior: "smooth" })
              }
              data-cursor="Fall in"
              className="group inline-flex items-center gap-2.5 rounded-full bg-neutral-950 py-1.5 pr-1.5 pl-4 text-[13px] font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Follow me down
              <span className="flex size-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0.5">
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
                  <path d="M8 3v10M3.5 8.5L8 13l4.5-4.5" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <span className="text-xs text-neutral-500">
              <span className="font-medium text-accent-ink">Open to</span> Product Designer / Design Engineer roles
            </span>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
