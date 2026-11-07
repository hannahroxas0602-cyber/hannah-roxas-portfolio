"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import GooCluster from "@/app/components/GooCluster";
import { social } from "@/app/data/social";

// Two columns: the statement on the left, a glass status card on the right. On load
// everything rises in one after another, the way the mobile menu's links do: the eyebrow,
// then the statement word by word, then the two lines of the card. Reduce Motion keeps
// only the fades (MotionConfig in AppShell). The resume lives in the nav, so no buttons.
const EASE = [0.22, 1, 0.36, 1] as const;

const stack = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const word = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
};

// Each word is its own animated piece, so the statement builds left to right.
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i, all) => (
        <motion.span key={i} variants={word} className="inline-block">
          {w}
          {i < all.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </>
  );
}

// Three levels: a small label in the site blue, the line that matters
// (bold, near-black), and a quieter detail line under it.
function Line({ label, children }: { label: string; children: ReactNode }) {
  return (
    <motion.div variants={rise}>
      <dt className="text-[clamp(11px,2.5cqw,13px)] font-semibold tracking-wide text-accent-ink">{label}</dt>
      <dd className="mt-1.5">{children}</dd>
    </motion.div>
  );
}

const primary =
  "block text-[clamp(14px,3.7cqw,17px)] leading-tight font-semibold tracking-[-0.01em] text-[#1b1519]";
const detail = "mt-1.5 block text-[clamp(11.5px,2.7cqw,13px)] leading-snug text-neutral-600";

// The status lines as a small bubble map: "Currently" is the big bubble, "Open to" a
// smaller one that grows out of it, and a few plain satellites. Positions are percents of
// the map's width, so it scales as one piece.
const SATS = [
  { l: 64, t: 18, d: 8, tone: "sgray" },
  { l: 23, t: 66, d: 7, tone: "slilac" },
];

export default function Hero() {
  return (
    <section
      data-rail="Intro"
      className="mx-auto max-w-7xl px-6 pt-6 pb-2 sm:px-10 sm:pt-10 lg:pt-12 lg:pb-4"
    >
      <motion.div
        variants={stack}
        initial="hidden"
        animate="show"
        className="grid gap-x-16 gap-y-10 lg:grid-cols-[1.5fr_1fr] lg:items-center"
      >
        <div>
          <motion.p
            variants={rise}
            className="welcome text-[0.95rem] text-neutral-600 italic sm:text-lg"
          >
            Welcome to the rabbit hole
          </motion.p>

          <motion.h1
            variants={stack}
            className="welcome mt-4 text-[clamp(1.75rem,3.1vw,2.7rem)] leading-[1.06] tracking-[-0.025em] text-neutral-950"
          >
            <motion.a
              variants={word}
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="View LinkedIn"
              className="link-underline inline-block"
            >
              Hannah Roxas
            </motion.a>{" "}
            <Words text="designs it, then" />{" "}
            <em>
              <Words text="ships it to production," />
            </em>{" "}
            <Words text="front end and back." />
          </motion.h1>
        </div>

        <GooCluster className="mx-auto my-2 w-full max-w-[19rem] sm:max-w-[22rem] lg:mr-0 lg:translate-y-3">
          <motion.dl
            variants={stack}
            className="relative [container-type:inline-size] [aspect-ratio:100/86]"
          >
            <div
              data-goo="cursorA"
              data-goo-shape="circle"
              className="absolute top-[3.5%] left-[2%] flex aspect-square w-[62%] flex-col items-center justify-center p-[7cqw] text-center"
            >
              <Line label="Currently">
                <span className={primary}>Product designer @ Learvo</span>
                <span className={detail}>4 features shipped to a live product, front end and API.</span>
              </Line>
            </div>
            <div
              data-goo="cursorB"
              data-goo-shape="circle"
              className="absolute top-[48%] left-[54%] flex aspect-square w-[46%] flex-col items-center justify-center p-[3cqw] text-center"
            >
              <Line label="Open to">
                <span className={`${primary} whitespace-nowrap text-[clamp(12.5px,3.2cqw,15px)]`}>
                  Product Designer /<br />Design Engineer
                </span>
                <span className={detail}>roles</span>
              </Line>
            </div>
            {/* Two small discs beside the cluster: static, flat, in the cursor's palette minus its
                dark core, with the same rim as the bubbles, so they echo the cursor without
                being mistaken for it. */}
            <span aria-hidden className="status-disc absolute aspect-square w-[6.5%]" style={{ left: "92%", top: "40%" }} />
            <span aria-hidden className="status-disc absolute aspect-square w-[5%]" style={{ left: "3%", top: "76%" }} />
            {SATS.map((sat, i) => (
              <span
                key={i}
                aria-hidden
                data-goo={sat.tone}
                data-goo-shape="circle"
                className="absolute aspect-square"
                style={{ left: `${sat.l}%`, top: `${sat.t / 0.86}%`, width: `${sat.d}%` }}
              />
            ))}
          </motion.dl>
        </GooCluster>
      </motion.div>
    </section>
  );
}
