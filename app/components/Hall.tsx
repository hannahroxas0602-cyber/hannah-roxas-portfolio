"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import HoleLink from "@/app/components/HoleLink";
import DemoVideo from "@/app/components/DemoVideo";
import Melt from "@/app/components/Melt";
import { Em } from "@/app/components/Em";
import { HALL_GRAY } from "@/app/components/hallColor";
import { GateLeaf, INK, OrnateKey } from "@/app/components/Gates";
import { projects, type Project } from "@/app/data/projects";
import { filled } from "@/app/data/placeholder";

// The hall of gates. You land in the gray and every project is behind its own wrought-iron gate (a
// different design each): you read the project's title first, then see its gate, closed over the work in
// a frosted-glass frame. As a gate scrolls into view an ornate key rises to the lock and turns, and the
// two leaves swing wide and lie flat to either side, like shutters, so the work is on show without
// anyone having to hover for it (a recruiter skimming shouldn't have to find the key). Going through a
// gate is the page transition (a hole opens from it). Pairs with HoleHero, which ends in this same
// gray. The ironwork itself is drawn in Gates.tsx.
type Tab = { key: Project["category"]; label: string };
const TABS: Tab[] = [
  { key: "UIUX", label: "UI/UX" },
  { key: "Graphic Design", label: "Graphics" },
];
const SLIDE_INTERVAL_MS = 1200;
const isTouchScreen = () => window.matchMedia("(hover: none)").matches;

function GateRow({ project, index, total }: { project: Project; index: number; total: number }) {
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const [activeIndex, setActiveIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasVideo = gallery.some((src) => src.endsWith(".mp4"));
  const stat = (project.impactStats ?? []).find((s) => filled(s.value) && filled(s.label));

  const start = () => {
    if (gallery.length <= 1 || isTouchScreen()) return;
    // Wait for the gate to open before the pictures start to change.
    timer.current = setInterval(() => setActiveIndex((i) => (i + 1) % gallery.length), SLIDE_INTERVAL_MS);
  };
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setActiveIndex(0);
  };
  useEffect(() => () => stop(), []);

  // Videos mount only once the gate is near the viewport.
  const ref = useRef<HTMLAnchorElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasVideo) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasVideo]);

  const sizes = "(min-width: 1024px) 56vw, 90vw";
  // The gate opens by itself once it is mostly in view, and stays open.
  const gateRef = useRef<HTMLDivElement>(null);
  const open = useInView(gateRef, { once: true, amount: 0.55 });

  return (
    <HoleLink
      ref={ref}
      href={project.href}
      data-cursor="Open the gate"
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      className="group block"
    >
      <div className="mx-auto mb-7 flex max-w-[76rem] flex-wrap items-end justify-between gap-x-10 gap-y-3 px-1">
        <div>
          <p className="flex items-center gap-2 text-xs font-medium text-neutral-950/75">
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span aria-hidden>·</span>
            <span>{project.tags.join(" · ")}</span>
          </p>
          <h3 data-vt-title className="link-underline font-display mt-1.5 w-fit text-3xl font-semibold text-neutral-950 sm:text-4xl">
            <Melt as="span" className="block" maxBlur={4} slow>
              {project.title}
            </Melt>
          </h3>
        </div>
        <div className="max-w-md">
          <p className="text-base leading-relaxed text-neutral-950/80">{project.outcome ?? project.description}</p>
          <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-neutral-950 transition-transform duration-300 group-hover:translate-x-1">
            Step through the gate <span aria-hidden>→</span>
          </p>
        </div>
      </div>

      {/* The gate: a frosted-glass frame with the project in it, and two leaves that close over it. */}
      <div ref={gateRef} data-open={open} className="gate relative mx-auto aspect-[100/74] w-full max-w-[76rem] [perspective:1800px] lg:aspect-[100/50]">
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.14),rgba(255,255,255,0.05)_60%,transparent_78%)] blur-2xl"
        />

        {/* The project, in a frosted bezel. */}
        <div className="absolute top-[15.4%] bottom-0 left-[4%] w-[92%] lg:left-[22%] lg:w-[56%]">
          <div className="relative size-full overflow-hidden rounded-[0.5rem]">
            <Melt as="div" mode="view" maxBlur={14} duration={1.4} className="absolute inset-0">
              {hasVideo &&
                near &&
                gallery.map((src, i) =>
                  src.endsWith(".mp4") ? (
                    <DemoVideo
                      key={src}
                      src={src}
                      alt={project.imageAlt}
                      fallbackSrc={project.image}
                      sizes={sizes}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-400 ease-out ${
                        i === activeIndex ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ) : null,
                )}
              <AnimatePresence mode="sync">
                {!gallery[activeIndex].endsWith(".mp4") && (
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={gallery[activeIndex]}
                      alt={project.imageAlt}
                      width={project.imageWidth}
                      height={project.imageHeight}
                      className="h-full w-full object-cover"
                      sizes={sizes}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Melt>
            {stat && (
              <span className="absolute bottom-3 left-3 z-10 flex max-w-[calc(100%-1.5rem)] items-baseline gap-2 rounded-full border border-white/40 bg-white/25 py-1.5 pr-3.5 pl-3 text-white shadow-[0_4px_18px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                <span className="font-display text-sm font-semibold">{stat.value}</span>
                <span className="truncate text-xs text-white/90">{stat.label}</span>
              </span>
            )}
          </div>
        </div>

        {/* The two leaves, hinged on the bezel's outer edges: closed they cover the project (a pane of
            frosted glass in an iron frame); open they lie flat beside it. */}
        {[
          "gate-leaf-l left-[4%] w-[46%] lg:left-[22%] lg:w-[28%]",
          "gate-leaf-r left-[50%] w-[46%] lg:left-1/2 lg:w-[28%]",
        ].map((pos) => (
          <div key={pos} className={`gate-leaf absolute inset-y-0 ${pos}`}>
            <span aria-hidden className="absolute inset-x-[3.3%] top-[15.4%] bottom-0 rounded-[2px] bg-white/[0.14] backdrop-blur-md" />
            <GateLeaf variant={index} className="relative size-full" />
          </div>
        ))}

        {/* The lock, and the key that comes to open it. */}
        <span aria-hidden className="gate-lock absolute top-[58%] left-1/2 size-[3.4%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] bg-white" style={{ borderColor: INK }} />
        <span aria-hidden className="gate-key pointer-events-none absolute top-[56%] left-1/2 w-[10%] sm:w-[7%]">
          <OrnateKey className="w-full drop-shadow-[0_8px_14px_rgba(0,0,0,0.5)]" />
        </span>
      </div>

    </HoleLink>
  );
}

export default function Hall() {
  const [tab, setTab] = useState<Tab["key"]>("UIUX");
  const list = projects
    .filter((p) => p.category === tab && !p.hideFromHome)
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <section id="works" data-rail="The hall" style={{ backgroundColor: HALL_GRAY }} className="relative px-5 pt-16 pb-32 text-neutral-950 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <div>
            <p className="font-label text-xs font-semibold tracking-widest text-neutral-950/70 uppercase">The hall of gates</p>
            <h2 className="mt-3 text-4xl font-semibold text-neutral-950 sm:text-5xl">
              <Melt as="span" className="block" maxBlur={3.6} slow>
                Pick a <Em>gate.</Em>
              </Melt>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-950/75">
              Every gate is a rabbit hole I went down. Watch the key turn; it knows the way.
            </p>
          </div>

        </div>

        {/* Which hall: UI/UX or Graphics. Big, and it stays put under the nav while you scroll the gates. */}
        <div className="sticky top-[5.25rem] z-30 mt-10 flex justify-center">
          <div role="tablist" aria-label="Choose a hall" className="flex gap-1.5 rounded-full border border-white/50 bg-white/30 p-1.5 shadow-[0_14px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            {TABS.map((t) => {
              const on = t.key === tab;
              const count = projects.filter((p) => p.category === t.key && !p.hideFromHome).length;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setTab(t.key)}
                  className={`relative flex items-center gap-2.5 rounded-full px-6 py-2.5 text-base font-medium transition-colors duration-200 sm:px-8 ${
                    on ? "text-neutral-950" : "text-neutral-950/75 hover:text-neutral-950"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="hall-tab"
                      className="absolute inset-0 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{t.label}</span>
                  <span className={`relative rounded-full px-2 py-0.5 text-xs tabular-nums ${on ? "bg-neutral-950/10" : "bg-white/15"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col gap-20 lg:gap-28"
        >
          {list.map((project, i) => (
            <GateRow key={project.slug} project={project} index={i} total={list.length} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
