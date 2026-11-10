"use client";

import { motion } from "motion/react";
import { services } from "@/app/services/data";
import { Em } from "@/app/components/Em";
import Melt from "@/app/components/Melt";
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

const SUITS = [
  { s: "♠", c: "text-neutral-950" },
  { s: "♥", c: "text-[#e5484d]" },
  { s: "♦", c: "text-[#e5484d]" },
  { s: "♣", c: "text-neutral-950" },
];
const RANKS = ["J", "Q", "K", "A"]; // a royal straight, each in a different suit
const TILT = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

// A playing card for each discipline: rank and suit in the corners, the title across the middle, one line of
// proof and the deliverables underneath. They sit slightly crooked, like a hand dealt on a table, and straighten
// and lift when you reach for one.
function PlayingCard({ index, title, deliverables, proof }: { index: number; title: string; deliverables: string[]; proof: string }) {
  const su = SUITS[index % 4];
  const corner = (
    <span className={`flex flex-col items-center leading-none font-semibold ${su.c}`}>
      <span className="font-display text-xl">{RANKS[index % 4]}</span>
      <span className="text-lg">{su.s}</span>
    </span>
  );
  return (
    <motion.li
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`${TILT[index % 4]} transition-transform duration-500 hover:z-10 hover:-translate-y-3 hover:rotate-0`}
    >
      <article className="keep-light relative flex min-h-[25rem] flex-col rounded-[1.6rem] bg-white p-5 shadow-[0_26px_50px_-30px_rgba(20,30,50,0.45)] ring-1 ring-black/[0.07]">
        <div className="flex items-start justify-between">
          {corner}
          <span aria-hidden className={`text-4xl opacity-15 ${su.c}`}>{su.s}</span>
        </div>
        <h3 className="font-display mt-6 text-[1.7rem] leading-[1.05] font-semibold tracking-[-0.03em] text-neutral-950">{title}</h3>
        <p className="mt-3 text-[0.92rem] leading-relaxed text-neutral-600">{proof}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {deliverables.map((d) => (
            <li key={d} className="rounded-full bg-panel px-2.5 py-1 text-[11px] font-medium text-neutral-700">
              {d}
            </li>
          ))}
        </ul>
        <span aria-hidden className="mt-4 flex rotate-180 justify-end">{corner}</span>
      </article>
    </motion.li>
  );
}

export default function WhatIDo() {
  return (
    <section id="what-i-do" data-rail="What I do" className="relative border-t border-neutral-200 bg-background pt-16 pb-16 sm:pt-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <p className="font-label text-[11px] tracking-[0.18em] text-neutral-500 uppercase">(04) The hand I&apos;m dealing</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2 className="font-display text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[1.02] font-medium tracking-[-0.035em] text-neutral-950">
            <Melt as="span" className="block" maxBlur={4} slow>
              Four cards, <Em>one</Em> person to play them.
            </Melt>
          </h2>
          <div>
            <p className="max-w-md text-base leading-relaxed text-neutral-600">
              I research it, design it and build it, so nothing gets lost between the mock and the product.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href={social.resume} target="_blank" rel="noopener noreferrer" data-cursor="Resume" className="btn btn-dark">
                See my resume <span aria-hidden>↗</span>
              </a>
              <a href="#works" className="link-underline text-sm font-medium text-neutral-700">Back to the work</a>
            </div>
          </div>
        </div>

        <ul className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((sv, i) => (
            <PlayingCard key={sv.slug} index={i} title={sv.title} deliverables={sv.deliverables} proof={sv.proof[0]} />
          ))}
        </ul>

        <div className="mt-16 grid gap-8 border-t border-neutral-200 pt-8 sm:grid-cols-2">
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
      </div>
    </section>
  );
}
