"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { services } from "@/app/services/data";
import { Em } from "@/app/components/Em";
import Melt from "@/app/components/Melt";
import { LOGO_BLUE, PRIM } from "@/app/components/hallColor";
import { social } from "@/app/data/social";

// "What I do", set as an editorial spread: the hall's gray ends in a rounded white sheet that rides up over
// it (a row of small diamonds marks the edge), and on the sheet a sticky statement on the left with the four
// disciplines listed on the right: number, title, one line of proof, and the deliverables as plain text.
// Hairlines draw themselves across as each row arrives. Quiet, with one clear action.
const SKILLS = [
  {
    label: "Hard skills",
    items: ["Product design", "UX research", "Design systems", "Prototyping", "Front end (React, Next.js, TypeScript)", "Framer", "Motion", "Branding"],
  },
  {
    label: "Soft skills",
    items: ["Curiosity", "Clear communication", "Cross-functional collaboration", "Ownership", "Taking feedback", "Storytelling"],
  },
];

function Row({ index, title, deliverables, proof }: { index: number; title: string; deliverables: string[]; proof: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "start 62%"] });
  const line = useSpring(scrollYProgress, { stiffness: 220, damping: 36, mass: 0.3 });

  return (
    <li ref={ref} className="group relative">
      <motion.span aria-hidden style={{ scaleX: line }} className="absolute top-0 left-0 h-px w-full origin-left bg-neutral-900" />
      <div className="grid gap-x-8 gap-y-2 py-4 sm:grid-cols-[3rem_1fr] sm:py-5">
        <span className="font-label pt-2 text-xs text-neutral-400 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <div className="transition-transform duration-500 group-hover:translate-x-2">
          <h3 className="font-display text-[clamp(1.35rem,2.4vw,1.8rem)] leading-tight font-semibold tracking-[-0.02em] text-neutral-950">{title}</h3>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-neutral-600">{proof}</p>
          <p className="font-label mt-2 text-[10.5px] font-medium tracking-wider text-neutral-500 uppercase">{deliverables.join("  ·  ")}</p>
        </div>
      </div>
    </li>
  );
}

export default function WhatIDo() {
  return (
    <section id="what-i-do" data-rail="What I do" className="relative z-10 -mt-12 rounded-t-[2.5rem] bg-white px-5 pt-12 pb-12 shadow-[0_-24px_60px_-30px_rgba(0,0,0,0.35)] sm:px-10 sm:pt-16">
      {/* a row of diamonds along the edge of the sheet */}
      <div aria-hidden className="absolute top-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className="block size-2" style={{ clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)", backgroundColor: i % 2 ? PRIM : LOGO_BLUE }} />
        ))}
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-label text-xs font-semibold tracking-widest text-neutral-500 uppercase">What I do</p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-neutral-950">
            <Melt as="span" className="block" maxBlur={4} slow>
              From the question to the <Em>shipped</Em> thing.
            </Melt>
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-neutral-600">
            I research it, design it, and build it, so nothing gets lost between the mock and the product.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={social.resume}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Resume"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              See my resume <span aria-hidden>↗</span>
            </a>
            <a href="#works" className="link-underline text-sm font-medium text-neutral-700">
              Back to the work
            </a>
          </div>
        </div>

        <ul className="border-b border-neutral-900">
          {services.map((s, i) => (
            <Row key={s.slug} index={i} title={s.title} deliverables={s.deliverables} proof={s.proof[0]} />
          ))}
        </ul>
      </div>

      {/* Skills, plainly: what I can do with my hands, and how I work with other people. */}
      <div className="mx-auto mt-10 grid max-w-6xl gap-8 border-t border-neutral-200 pt-8 sm:grid-cols-2">
        {SKILLS.map((group) => (
          <div key={group.label}>
            <h3 className="font-label text-xs font-semibold tracking-widest text-neutral-500 uppercase">{group.label}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-neutral-800">
              {group.items.map((item, i) => (
                <span key={item}>
                  {item}
                  {i < group.items.length - 1 && <span aria-hidden className="mx-2 text-neutral-300">/</span>}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
