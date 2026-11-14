"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { services } from "@/app/services/data";
import { Em } from "@/app/components/Em";
import Melt from "@/app/components/Melt";
import { social } from "@/app/data/social";
import { useIsPhone } from "@/app/components/useIsPhone";

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
  { s: "♣", c: "text-neutral-950" },
  { s: "♦", c: "text-[#e5484d]" },
];
const RANKS = ["J", "Q", "K", "A"]; // a royal straight, each in a different suit
const TILT = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

type CardData = { index: number; title: string; deliverables: string[]; proof: string };

// The face of a playing card: rank and suit in the corners, the title across the middle, one line of proof and
// the deliverables underneath.
function CardFace({ index, title, deliverables, proof, className = "" }: CardData & { className?: string }) {
  const su = SUITS[index % 4];
  const corner = (
    <span className={`flex flex-col items-center leading-none font-semibold ${su.c}`}>
      <span className="font-display text-xl">{RANKS[index % 4]}</span>
      <span className="text-lg">{su.s}</span>
    </span>
  );
  return (
    <article className={`keep-light relative flex min-h-[25rem] flex-col rounded-[1.6rem] bg-white p-5 shadow-[0_26px_50px_-30px_rgba(20,30,50,0.45)] ring-1 ring-black/[0.07] ${className}`}>
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
  );
}

// Tablet and up: the four cards sit slightly crooked, like a hand dealt on a table, and straighten and lift when
// you reach for one.
function PlayingCard(card: CardData) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: card.index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`${TILT[card.index % 4]} transition-transform duration-500 hover:z-10 hover:-translate-y-3 hover:rotate-0`}
    >
      <CardFace {...card} />
    </motion.li>
  );
}

// Phones: the cards are a deck, like flashcards. Swipe the top card away (either way) and it goes to the back of the
// deck; the next one is already waiting underneath. The arrows do the same for anyone who'd rather tap.
function CardDeck({ cards }: { cards: CardData[] }) {
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const x = useMotionValue(0);
  const tilt = useTransform(x, [-220, 0, 220], [-9, 0, 9]);
  const busy = useRef(false);

  const next = (dir: 1 | -1) => {
    if (busy.current) return;
    busy.current = true;
    animate(x, dir * 520, { duration: 0.24, ease: "easeIn" }).then(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      x.set(0);
      busy.current = false;
    });
  };
  const back = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);

  return (
    <div className="mt-10 sm:hidden">
      <div className="relative mx-auto h-[26.5rem] w-full max-w-[21rem]">
        {[...order].reverse().map((idx) => {
          const pos = order.indexOf(idx);
          const top = pos === 0;
          return (
            <motion.div
              key={idx}
              aria-hidden={!top}
              className="absolute inset-0"
              style={top ? { x, rotate: tilt, zIndex: 10 } : { zIndex: 10 - pos }}
              animate={{ scale: 1 - pos * 0.05, y: pos * 14, opacity: pos > 2 ? 0 : 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              drag={top ? "x" : false}
              dragMomentum={false}
              dragElastic={0.9}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 600) next(info.offset.x > 0 ? 1 : -1);
                else animate(x, 0, { type: "spring", stiffness: 300, damping: 28 });
              }}
            >
              <CardFace {...cards[idx]} className="h-full" />
            </motion.div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-center gap-5 text-neutral-950">
        <button type="button" onClick={back} aria-label="Previous card" className="grid size-11 place-items-center rounded-full bg-white ring-1 ring-black/10 active:scale-90">←</button>
        <span className="font-label min-w-[6.5rem] text-center text-[11px] tracking-[0.16em] text-neutral-500 uppercase">
          {order[0] + 1} of {cards.length} · swipe
        </span>
        <button type="button" onClick={() => next(-1)} aria-label="Next card" className="grid size-11 place-items-center rounded-full bg-white ring-1 ring-black/10 active:scale-90">→</button>
      </div>
    </div>
  );
}

export default function WhatIDo() {
  const phone = useIsPhone();
  const cards: CardData[] = services.slice(0, 4).map((sv, i) => ({ index: i, title: sv.title, deliverables: sv.deliverables, proof: sv.proof[0] }));
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

        {phone ? (
          <CardDeck cards={cards} />
        ) : (
          <ul className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
              <PlayingCard key={c.index} {...c} />
            ))}
          </ul>
        )}

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
