"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import CyclingImage from "@/app/components/CyclingImage";
import HoleLink from "@/app/components/HoleLink";
import ThemeToggle from "@/app/components/ThemeToggle";
import { graphicReel, projects } from "@/app/data/projects";
import { social } from "@/app/data/social";
import { openAboutOnPlainClick, useAboutPanel } from "@/app/components/AboutPanelContext";

// The desktop nav: a floating pill (Home, Work, About, Resume) and a round dark-mode button. "Work" opens a
// panel on hover or focus: a featured project on the left (a picture, what it did, its field and year) and,
// on the right, every project with a thumbnail, its one-line field and year; hover a row and the featured
// card follows. The footer of the panel counts them and links to the full pages.
const glass = "border border-black/[0.06] bg-white/85 shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl backdrop-saturate-150";
const item = "relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-neutral-900";

export default function DesktopNav() {
  const pathname = usePathname();
  const { open: openAbout } = useAboutPanel();
  const base = projects.filter((p) => !p.hideFromHome);
  // the posters-and-motion set leads the graphic work
  const gi = base.findIndex((p) => p.category === "Graphic Design");
  const list = gi < 0 ? [...base, graphicReel] : [...base.slice(0, gi), graphicReel, ...base.slice(gi)];
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(0);
  const [hot, setHot] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 140);
  };
  const featured = list[focus] ?? list[0];
  const uiux = list.filter((p) => p.category === "UIUX").length;

  return (
    <div className="pointer-events-none relative hidden items-start gap-2 md:flex">
      <div className="relative" onMouseLeave={hide} onMouseEnter={show}>
      <nav aria-label="Main" onMouseLeave={() => setHot(null)} className={`pointer-events-auto flex items-center gap-1 rounded-full p-1.5 ${glass}`}>
        <Link href="/" onMouseEnter={() => setHot("home")} className={`${item} ${pathname === "/" ? "after:absolute after:bottom-1 after:left-1/2 after:h-[3px] after:w-[3px] after:-translate-x-1/2 after:rounded-full after:bg-neutral-950" : ""}`}>
          {hot === "home" && <motion.span layoutId="navhot" transition={{ type: "spring", stiffness: 500, damping: 36 }} className="absolute inset-0 rounded-full bg-black/[0.07]" />}
          <span className="relative z-10">Home</span>
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          onClick={() => setOpen((v) => !v)}
          onFocus={show}
          onMouseEnter={() => setHot("work")}
          className={item}
        >
          {hot === "work" && <motion.span layoutId="navhot" transition={{ type: "spring", stiffness: 500, damping: 36 }} className="absolute inset-0 rounded-full bg-black/[0.07]" />}
          <span className="relative z-10">Work</span>
          <svg viewBox="0 0 12 12" className={`relative z-10 size-2.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden>
            <path d="M2.5 4.5L6 8l3.5-3.5" />
          </svg>
        </button>

        <Link href="/about" onClick={(e) => openAboutOnPlainClick(e, openAbout)} onMouseEnter={() => setHot("about")} className={item}>
          {hot === "about" && <motion.span layoutId="navhot" transition={{ type: "spring", stiffness: 500, damping: 36 }} className="absolute inset-0 rounded-full bg-black/[0.07]" />}
          <span className="relative z-10">About</span>
        </Link>

        <a href={social.resume} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHot(null)} className="btn btn-dark ml-1 !px-4 !py-2">
          Resume
        </a>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-auto absolute top-full right-0 mt-2 w-[min(54rem,calc(100vw-3rem))] origin-top-right rounded-[1.6rem] p-2.5 ${glass} !bg-white/95`}
          >
            <div className="grid grid-cols-[1fr_1.1fr] gap-2.5">
              <HoleLink href={featured.href} onClick={() => setOpen(false)} className="group block rounded-[1.2rem] bg-panel p-2.5">
                <CyclingImage key={featured.slug} project={featured} playing={open} className="aspect-[16/10] rounded-xl" />
                <p className="mt-3 px-1 text-[0.95rem] leading-snug font-medium text-neutral-950">{featured.outcome ?? featured.description}</p>
                <p className="mt-2 flex justify-between px-1 pb-1 text-[13px] text-neutral-500">
                  <span>{featured.tags.join(" · ")}</span>
                  <span className="tabular-nums">{featured.year?.match(/\d{4}/)?.[0]}</span>
                </p>
              </HoleLink>

              <div className="px-2 pt-1">
                <p className="font-label text-[11px] tracking-[0.16em] text-neutral-500 uppercase">Case studies &amp; graphic work</p>
                <ul className="mt-2.5 space-y-0.5">
                  {list.map((p, i) => (
                    <li key={p.slug}>
                      <HoleLink href={p.href} onClick={() => setOpen(false)} onMouseEnter={() => setFocus(i)} onFocus={() => setFocus(i)} className={`flex items-center gap-3 rounded-xl p-1.5 transition-colors ${i === focus ? "bg-panel" : ""}`}>
                        <span className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-panel-2 ring-1 ring-black/[0.05]">
                          <Image src={p.image} alt="" width={96} height={96} className="size-full object-cover" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-[0.95rem] font-medium text-neutral-950">{p.title.split(":")[0]}</span>
                          <span className="block truncate text-[13px] text-neutral-500">{p.tags[0]} · {p.year?.match(/\d{4}/)?.[0]}</span>
                        </span>
                      </HoleLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between border-t border-black/[0.06] px-3 pt-3 pb-1.5">
              <span className="font-label text-[12px] text-neutral-500">{uiux} case studies · {list.length - uiux} graphic</span>
              <span className="flex items-center gap-5 text-sm font-medium text-neutral-950">
                <HoleLink href="/graphic-design" onClick={() => setOpen(false)} className="link-underline">Graphics</HoleLink>
                <HoleLink href="/uiux" onClick={() => setOpen(false)} className="link-underline">UI/UX</HoleLink>
                <HoleLink href="/#works" onClick={() => setOpen(false)} className="inline-flex items-center gap-2">
                  Browse all works <span aria-hidden>→</span>
                </HoleLink>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
      <ThemeToggle />
    </div>
  );
}
