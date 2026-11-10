"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import HoleLink from "@/app/components/HoleLink";

// A small product photo set inside the headline, like a word: it changes to the next project every few
// seconds and tilts a little on hover. Click goes into that project.
const SLIDES = [
  { href: "/learvo", title: "Learvo", src: "/images/learvo_thumb5.png" },
  { href: "/continuum", title: "Continuum", src: "/images/projects/continuum-thumb.webp" },
  { href: "/goodfriends", title: "Good Friends Poke", src: "/images/projects/good-friends-poke.png" },
];

export default function InlineShot() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 2800);
    return () => clearInterval(id);
  }, []);
  const s = SLIDES[i];
  return (
    <HoleLink href={s.href} aria-label={`Open ${s.title}`} data-cursor={`Open ${s.title}`} className="mx-[0.08em] inline-block h-[0.8em] w-[1.7em] align-[-0.06em]">
      <motion.span whileHover={{ rotate: -4, scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 16 }} className="relative block size-full overflow-hidden rounded-[0.22em] bg-panel-2 shadow-[0_10px_26px_-14px_rgba(0,0,0,0.5)] ring-1 ring-black/10">
        <AnimatePresence mode="sync">
          <motion.span key={s.src} initial={{ opacity: 0, scale: 1.12 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="absolute inset-0">
            <Image src={s.src} alt="" width={400} height={260} className="size-full object-cover" sizes="12rem" />
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </HoleLink>
  );
}
