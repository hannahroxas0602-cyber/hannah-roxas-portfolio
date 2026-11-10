"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import HoleLink from "@/app/components/HoleLink";
import { graphicReel, projects } from "@/app/data/projects";
import { social } from "@/app/data/social";
import { openAboutOnPlainClick, useAboutPanel } from "@/app/components/AboutPanelContext";

// The phone menu: a frosted sheet that drops under the buttons. Home, Work (it unfolds into the projects, each
// with its thumbnail, field and year, graphic work included), About and Resume: plain words, large, with a
// hairline between. Tap outside to close. It sits over the page rather than replacing it.
const row = "flex w-full items-center justify-between px-5 py-4 text-left font-display text-[1.35rem] font-medium tracking-[-0.02em] text-neutral-950";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [work, setWork] = useState(false);
  const { open: openAbout } = useAboutPanel();
  const base = projects.filter((p) => !p.hideFromHome);
  // the posters-and-motion set leads the graphic work
  const gi = base.findIndex((p) => p.category === "Graphic Design");
  const list = gi < 0 ? [...base, graphicReel] : [...base.slice(0, gi), graphicReel, ...base.slice(gi)];
  const year = (y?: string) => y?.match(/\d{4}/)?.[0] ?? "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="pointer-events-auto fixed inset-0 bg-background/60 backdrop-blur-[6px] md:hidden"
        >
          <motion.div
            initial={{ y: -14, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-3 top-[4.6rem] max-h-[calc(100svh-6rem)] overflow-y-auto overscroll-contain rounded-[1.6rem] bg-white/90 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.06] backdrop-blur-2xl"
          >
            <ul className="divide-y divide-black/[0.06]">
              <li>
                <Link href="/" onClick={onClose} className={row}>
                  Home
                </Link>
              </li>
              <li>
                <button type="button" aria-expanded={work} onClick={() => setWork((v) => !v)} className={row}>
                  Work
                  <svg viewBox="0 0 12 12" className={`size-3.5 transition-transform duration-300 ${work ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden>
                    <path d="M2.5 4.5L6 8l3.5-3.5" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {work && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <ul className="px-3 pb-3">
                        {list.map((p, i) => (
                          <motion.li key={p.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i + 0.08 }}>
                            <HoleLink href={p.href} onClick={onClose} className="flex items-center gap-3.5 rounded-2xl p-2 active:bg-black/[0.05]">
                              <span className="relative h-12 w-[4.25rem] shrink-0 overflow-hidden rounded-xl bg-panel-2 ring-1 ring-black/[0.05]">
                                <Image src={p.image} alt="" width={160} height={110} className="size-full object-cover" />
                              </span>
                              <span className="min-w-0">
                                <span className="block truncate text-[1.02rem] font-medium text-neutral-950">{p.title.split(":")[0]}</span>
                                <span className="block truncate text-[13px] text-neutral-500">
                                  {p.tags[0]} · {year(p.year)}
                                </span>
                              </span>
                            </HoleLink>
                          </motion.li>
                        ))}
                        <li className="flex gap-5 px-2 pt-2 pb-1 text-sm font-medium text-neutral-950">
                          <HoleLink href="/uiux" onClick={onClose} className="link-underline">UI/UX</HoleLink>
                          <HoleLink href="/graphic-design" onClick={onClose} className="link-underline">Graphic design</HoleLink>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={(e) => {
                    onClose();
                    openAboutOnPlainClick(e, openAbout);
                  }}
                  className={row}
                >
                  About
                </Link>
              </li>
              <li>
                <a href={social.resume} target="_blank" rel="noopener noreferrer" onClick={onClose} className={row}>
                  Resume <span aria-hidden className="text-lg">↗</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
