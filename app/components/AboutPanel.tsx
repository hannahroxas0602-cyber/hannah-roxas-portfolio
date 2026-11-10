"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useAboutPanel } from "@/app/components/AboutPanelContext";
import { aboutIntro, experience } from "@/app/about/data";
import { social } from "@/app/data/social";
import ToolsMarquee from "@/app/components/ToolsMarquee";

const stackPhotos = [
  {
    src: "/images/about/aboutfirst.webp",
    alt: "Hannah Roxas",
    objectPosition: "50% 0%",
    scale: 1.15,
  },
  { src: "/images/about/beach.webp", alt: "Hannah at the beach" },
  { src: "/images/about/cat.webp", alt: "Hannah's cat perched on her laptop" },
  { src: "/images/about/brunch.webp", alt: "Brunch spread with matcha and onigiri" },
];

const STACK_INTERVAL_MS = 1800;

export function PhotoStack() {
  const [index, setIndex] = useState(0);
  const count = stackPhotos.length;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, STACK_INTERVAL_MS);
    return () => clearInterval(id);
  }, [count]);

  return (
    // The flip-through always animates, even with Reduce Motion on: it's a
    // 64px thumbnail, not the large-area movement that setting is meant to
    // stop, and without it the photos just snap from one to the next.
    <MotionConfig reducedMotion="never">
      <div className="relative h-16 w-16 shrink-0">
        {stackPhotos.map((photo, i) => {
          // Distance behind the front card, wrapping around the deck.
          const depth = (i - index + count) % count;
          const isFront = depth === 0;
          const isNext = depth === 1;

          return (
            <motion.div
              key={photo.src}
              className="absolute inset-0 overflow-hidden rounded-xl border-2 border-white shadow-md"
              animate={
                isFront
                  ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, zIndex: count }
                  : isNext
                    ? { x: 7, y: 7, rotate: 8, scale: 0.94, opacity: 1, zIndex: count - 1 }
                    : { x: 7, y: 7, rotate: 8, scale: 0.94, opacity: 0, zIndex: 0 }
              }
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="64px"
                className="object-cover"
                style={{
                  objectPosition: photo.objectPosition ?? "50% 50%",
                  transform: photo.scale ? `scale(${photo.scale})` : undefined,
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </MotionConfig>
  );
}

export default function AboutPanel({ width }: { width: number }) {
  const { isOpen, close } = useAboutPanel();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click without covering the page in a hit-testing layer,
  // so the rest of the page stays scrollable/interactive while the panel is open.
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            style={{ "--panel-width": `${width}px` } as React.CSSProperties}
            className="fixed inset-4 z-[91] flex max-h-[calc(100svh-2rem)] flex-col gap-2 overflow-y-auto overscroll-contain rounded-3xl border border-black/[0.06] bg-panel p-3 shadow-[0_8px_40px_rgba(0,0,0,0.1)] sm:inset-y-0 sm:inset-x-auto sm:right-0 sm:w-[var(--panel-width)] sm:max-w-[92vw] sm:max-h-none sm:gap-3 sm:overflow-visible sm:rounded-none sm:border-0 sm:border-l sm:border-l-black/[0.06] sm:p-5"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close about panel"
              className="absolute top-4 right-4 z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/70 text-lg text-white shadow-md backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-black/85 sm:top-5 sm:right-5"
            >
              ×
            </button>

            {/* Photo + name inline, bio below */}
            <div className="rounded-3xl bg-white ring-1 ring-black/[0.05] p-4 pr-12 sm:p-5">
              <div className="flex items-center gap-5">
                <PhotoStack />
                <p className="font-display text-base font-semibold text-neutral-900">
                  Hannah Roxas
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{aboutIntro.tagline}</p>
            </div>

            {/* Tool marquee — real logos + names via Simple Icons, scrolling in one line */}
            <div className="flex h-16 items-center overflow-hidden rounded-3xl bg-white ring-1 ring-black/[0.05]">
              <ToolsMarquee />
            </div>

            {/* Timeline — one minimal, non-scrolling section with a connecting rail */}
            <div className="rounded-3xl bg-white ring-1 ring-black/[0.05] p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <p className="font-label text-[11px] font-medium tracking-[0.16em] text-neutral-500 uppercase">
                  Experience
                </p>
                <a
                  href={social.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="View resume"
                  className="link-underline inline-flex items-center gap-1 text-xs font-medium text-neutral-500 hover:text-neutral-900"
                >
                  Resume
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-[0.9em] w-[0.9em]"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
              <ol className="relative mt-4">
                <span
                  aria-hidden
                  className="rail-track absolute top-[10px] bottom-[10px] left-[5px] w-[3px] overflow-hidden rounded-full"
                >
                  <span className="absolute inset-0 rounded-full" style={{ background: "#0b0b0d" }} />
                </span>
                {experience.map((entry, i) => (
                  <li
                    key={entry.slug}
                    className="relative flex items-baseline justify-between gap-3 pb-4 pl-7 last:pb-0"
                  >
                    <span
                      aria-hidden
                      className="rail-dot absolute top-[4px] left-0 size-[13px]"
                      data-state={i === 0 ? "active" : "passed"}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm leading-5 font-medium text-neutral-900">
                        {entry.role}
                      </p>
                      <p className="truncate text-xs leading-5 text-neutral-500">{entry.context}</p>
                    </div>
                    <span className="shrink-0 font-label text-xs leading-5 text-neutral-400">
                      {entry.dates}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Contact — pinned to the bottom on desktop's fixed-height sidebar; flows normally on mobile's scrollable stack */}
            <div className="rounded-3xl bg-white ring-1 ring-black/[0.05] p-4 sm:mt-auto sm:p-5">
              <p className="font-label text-[11px] font-medium tracking-[0.16em] text-neutral-500 uppercase">
                Contact
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={`mailto:${social.email}`}
                  data-cursor="Email me"
                  className="link-underline w-fit text-sm font-medium text-neutral-700"
                >
                  {social.email}
                </a>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Connect"
                  className="link-underline w-fit text-sm font-medium text-neutral-700"
                >
                  LinkedIn
                </a>
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="See my code"
                  className="link-underline w-fit text-sm font-medium text-neutral-700"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}
