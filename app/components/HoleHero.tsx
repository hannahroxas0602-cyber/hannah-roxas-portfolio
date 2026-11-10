"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Melt from "@/app/components/Melt";
import InlineShot from "@/app/components/InlineShot";
import Stopwatch from "@/app/components/Stopwatch";
import CountUp from "@/app/components/CountUp";
import { Em } from "@/app/components/Em";
import { useLanded } from "@/app/components/landing";
import { social } from "@/app/data/social";

// The first screen. It has one job: in a few seconds, say who I am, what I do and that I'm hiring-ready,
// and put the work in reach. So: a plain statement of the role, one line of what I've made, two actions
// (the work, the resume), and three numbers as proof. The clock is the one piece of play: my work as its
// hours, telling the time where I am, photographs you can pick up and move. It's the picture on the right,
// not the whole page. Sizes key off the stage's own width (container queries), so the layout holds when the
// About panel opens and narrows the page.
const EASE = [0.22, 1, 0.36, 1] as const;

const PROOF = [
  { value: "72%", label: "mobile click rate on the Learvo landing page I shipped" },
  { value: "4", label: "features shipped at Learvo, front end and back end" },
  { value: "10", label: "exhibitions I ran PR and marketing for at UC Davis" },
];

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-neutral-600">
      <Stopwatch ticking className="size-4 text-neutral-950" />
      LA / Bay Area
      <span aria-hidden className="text-neutral-300">·</span>
      <span className="tabular-nums">{time ?? "       "}</span>
    </span>
  );
}

// The hare from my cursor, mid-leap, sitting in the headline. It hops when you hover.
function Hare() {
  const mask = "url(/images/moving.png) center / contain no-repeat";
  return (
    <motion.span aria-hidden whileHover={{ x: 18, y: -10, rotate: -8 }} transition={{ type: "spring", stiffness: 260, damping: 12 }} className="inline-block h-[0.62em] w-[0.78em] cursor-pointer align-[-0.02em] bg-neutral-950" style={{ WebkitMask: mask, mask }} />
  );
}

const rise = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay: 0.1 + i * 0.09 },
});

export default function HoleHero() {
  const landed = useLanded();
  const hidden = { initial: { opacity: 0 }, animate: { opacity: 0 } };

  return (
    <section id="info" data-rail="Intro" className="@container relative overflow-hidden">
      <div className="relative mx-auto flex max-w-7xl flex-col px-6 pt-24 pb-12 sm:px-10 @3xl:min-h-[calc(100svh-1rem)] @3xl:justify-center @3xl:pt-12 @3xl:pb-28">
        <motion.div {...(landed ? rise(0) : hidden)} className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 py-1 pr-3 pl-2.5 text-[12px] font-medium text-neutral-800">
            <span aria-hidden className="size-2 rounded-full bg-[#3ec3ff] shadow-[0_0_0_3px_rgba(62,195,255,0.25)]" />
            Open to full-time roles
          </span>
          <LocalTime />
        </motion.div>

        <Melt as="div" mode="load" start={landed} maxBlur={3.4} duration={1.9} delay={0.1} className="mt-7">
          <h1 className="font-display text-[clamp(2.2rem,6cqw,5.4rem)] leading-[0.96] font-medium tracking-[-0.05em] text-neutral-950">
            Curiouser and <Em>curiouser</Em>: <Hare />
            <br />
            a product <InlineShot /> designer
            <br />
            who ships the code.
          </h1>
        </Melt>

        <div className="mt-10 grid gap-8 @3xl:grid-cols-[1.1fr_1fr] @3xl:items-end @3xl:gap-16">
          <div>
            <motion.p {...(landed ? rise(2) : hidden)} className="max-w-[34rem] text-base leading-relaxed text-neutral-600 sm:text-lg">
              Hello, I&apos;m{" "}
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="View LinkedIn" className="link-underline font-medium text-neutral-950">
                Hannah Roxas
              </a>
              . I follow the white rabbit from research to shipped code. Most recently: Learvo, an AI study tool, and Continuum, a care platform for surrogacy.
            </motion.p>
            <motion.div {...(landed ? rise(3) : hidden)} className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#works" data-cursor="See the work" className="btn btn-dark group !pr-3">
                Follow the white rabbit
                <span className="flex size-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0.5">
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
                    <path d="M8 3v10M3.5 8.5L8 13l4.5-4.5" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <a href={social.resume} target="_blank" rel="noopener noreferrer" data-cursor="Resume" className="btn btn-ghost">
                Resume
              </a>
            </motion.div>
          </div>

          <motion.dl {...(landed ? rise(4) : hidden)} className="grid grid-cols-3 gap-5 border-t border-neutral-200 pt-6">
            {PROOF.map((p) => (
              <div key={p.value + p.label}>
                <dt className="font-display text-3xl font-medium tracking-[-0.03em] text-neutral-950 sm:text-4xl">
                  <CountUp value={p.value} />
                </dt>
                <dd className="mt-1 text-[12px] leading-snug text-neutral-500">{p.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
