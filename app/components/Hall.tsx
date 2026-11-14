"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, AnimatePresence, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import HoleLink from "@/app/components/HoleLink";
import DemoVideo from "@/app/components/DemoVideo";
import Melt from "@/app/components/Melt";
import { Em } from "@/app/components/Em";
import Gate from "@/app/components/Gate";
import CyclingImage from "@/app/components/CyclingImage";
import FitMedia from "@/app/components/FitMedia";
import { useIsPhone } from "@/app/components/useIsPhone";
import { graphicReel, projects, type Project } from "@/app/data/projects";
import { filled } from "@/app/data/placeholder";

// Selected work. Each project is a card with its preview laid on a light panel, and a frosted-glass sleeve
// pulled up over the lower half of it (the gate, simplified: a pane of glass in front of the work). The
// top of the work shows through clear; as the card scrolls into view the sleeve slides away and the whole
// preview is there, so nobody has to hover to see the work. The title comes first, the outcome under it.
// Previews are shown whole (never cropped at the sides) on the same panel size, so every project is the
// same size on the page whatever its pictures' proportions.
type Tab = { key: Project["category"]; label: string };
const TABS: Tab[] = [
  { key: "UIUX", label: "UI/UX" },
  { key: "Graphic Design", label: "Graphics" },
];
const SLIDE_INTERVAL_MS = 1300;
const isTouchScreen = () => window.matchMedia("(hover: none)").matches;

function Card({ project, index, total }: { project: Project; index: number; total: number }) {
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const [activeIndex, setActiveIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasVideo = gallery.some((src) => src.endsWith(".mp4"));
  const stat = (project.impactStats ?? []).find((s) => filled(s.value) && filled(s.label));

  const start = () => {
    if (gallery.length <= 1 || isTouchScreen()) return;
    timer.current = setInterval(() => setActiveIndex((i) => (i + 1) % gallery.length), SLIDE_INTERVAL_MS);
  };
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setActiveIndex(0);
  };
  useEffect(() => () => stop(), []);

  // The sleeve slides away once the card is mostly in view (or at once, on hover), and stays away.
  const panelRef = useRef<HTMLDivElement>(null);
  const seen = useInView(panelRef, { once: true, amount: 0.7 });
  const [hovered, setHovered] = useState(false);
  const open = seen || hovered;

  // Videos mount only once the card is near the viewport.
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = panelRef.current;
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

  const sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw";
  const current = gallery[activeIndex];

  return (
    <HoleLink
      href={project.href}
      data-cursor="Open case study"
      onMouseEnter={() => {
        setHovered(true);
        start();
      }}
      onMouseLeave={stop}
      onFocus={() => {
        setHovered(true);
        start();
      }}
      onBlur={stop}
      className={`group block ${index === 1 ? "lg:mt-14" : ""}`}
    >
      <div
        ref={panelRef}
        className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-panel ring-1 ring-black/[0.05] transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-30px_rgba(20,30,50,0.35)]"
      >
        {/* the preview, whole */}
        <div className="absolute inset-0">
          <div className="relative size-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
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
              {!current.endsWith(".mp4") && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current}
                    alt={project.imageAlt}
                    width={project.imageWidth}
                    height={project.imageHeight}
                    className="h-full w-full object-cover"
                    sizes={sizes}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* the frosted sleeve: covers the lower half of the work, then slides down and away */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-[40%] bottom-3 hidden rounded-2xl border border-white/80 bg-white/40 shadow-[0_10px_30px_-12px_rgba(20,30,50,0.25)] backdrop-blur-xl backdrop-saturate-150 sm:block transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:inset-x-4 sm:bottom-4"
          style={{ transform: open ? "translateY(115%)" : "translateY(0)", transitionDelay: open && !hovered ? "0.35s" : "0s" }}
        />

        {stat && (
          <span
            className={`absolute bottom-3.5 left-3.5 z-10 flex max-w-[calc(100%-1.75rem)] items-baseline gap-2 rounded-full bg-white/85 py-1.5 pr-3.5 pl-3 text-neutral-900 shadow-sm ring-1 ring-black/5 backdrop-blur transition-opacity duration-700 ${
              open ? "opacity-100 delay-700" : "opacity-0 max-sm:opacity-100"
            }`}
          >
            <span className="font-display text-sm font-semibold">{stat.value}</span>
            <span className="truncate text-xs text-neutral-600">{stat.label}</span>
          </span>
        )}
      </div>

      <div className="mt-4 px-1">
        <p className="flex items-center gap-2 text-xs font-medium text-neutral-500">
          <span className="tabular-nums text-neutral-700">{project.year ?? `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}</span>
          <span aria-hidden>·</span>
          <span className="truncate">{project.tags.join(" · ")}</span>
        </p>
        <h3 data-vt-title className="font-display mt-1.5 text-2xl font-semibold tracking-[-0.02em] text-neutral-950">
          <Melt as="span" className="block" maxBlur={4} slow>
            {project.title}
          </Melt>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[0.95rem] leading-relaxed text-neutral-600">{project.outcome ?? project.description}</p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-950">
          <span className="link-underline">{project.href === "/graphic-design" ? "See all graphic work" : "View case study"}</span>
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </p>
      </div>
    </HoleLink>
  );
}

// The pinned version: one stage stays on screen while you scroll, and the gates do the work. For each project
// the gates swing open on its work, hold (its pictures change while they're open), then close and open on the
// next. The whole list is always visible on the left (a skim sees every title at once), the active one is
// lit, and each title jumps to its own spot. The UI/UX / Graphic design switch is a big bar across the top
// of the stage so it can't be missed. Under Reduce Motion this becomes the plain card grid.
type View = "showcase" | "grid" | "list";
const VIEWS: { key: View; label: string }[] = [
  { key: "showcase", label: "Showcase" },
  { key: "grid", label: "Grid" },
  { key: "list", label: "List" },
];

// The two switches, always together: which collection (set in large type, so it can't be missed) and how to
// look at it (Showcase, the gates; Grid; List).
function Controls({ tab, setTab, view, setView }: { tab: Tab["key"]; setTab: (t: Tab["key"]) => void; view: View; setView: (v: View) => void }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-neutral-300/70 pb-3">
      <div role="tablist" aria-label="Choose a collection" className="flex items-baseline gap-2 sm:gap-5">
        {TABS.map((t, k) => {
          const on = t.key === tab;
          const count = projects.filter((p) => p.category === t.key && !p.hideFromHome).length + (t.key === "Graphic Design" ? 1 : 0);
          return (
            <span key={t.key} className="flex items-baseline gap-2 sm:gap-5">
              {k > 0 && <span aria-hidden className="font-display text-2xl text-neutral-300 sm:text-3xl">/</span>}
              <button
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setTab(t.key)}
                className={`relative pb-1 font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-none font-medium tracking-[-0.035em] transition-colors duration-300 ${on ? "text-neutral-950" : "text-neutral-400 hover:text-neutral-700"}`}
              >
                {t.key === "UIUX" ? "UI/UX" : "Graphic design"}
                <sup className="font-label ml-1 align-super text-[11px] font-normal tracking-normal">{String(count).padStart(2, "0")}</sup>
                {on && <motion.span layoutId="coll-underline" className="absolute inset-x-0 -bottom-[13px] h-[2px] bg-neutral-950" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
              </button>
            </span>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <span className="font-label hidden text-[11px] tracking-[0.16em] text-neutral-500 uppercase sm:block">View as</span>
        <div role="group" aria-label="How to view" className="flex gap-1 rounded-full bg-neutral-200/70 p-1 ring-1 ring-black/[0.04]">
          {VIEWS.map((v) => (
            <button key={v.key} type="button" aria-pressed={view === v.key} onClick={() => setView(v.key)} className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${view === v.key ? "text-white" : "text-neutral-700 hover:text-neutral-950"}`}>
              {view === v.key && <motion.span layoutId="view-pill" className="absolute inset-0 rounded-full bg-neutral-950" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
              <span className="relative">{v.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// On a phone the showcase is a row of cards you swipe through (the pinned stage is taller than a phone screen).
// One card at a time snaps into place with the next one peeking in; the picture on the card in front cycles.
function MobileShowcase({ list, controls }: { list: Project[]; controls: React.ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const step = () => {
    const first = scroller.current?.children[0] as HTMLElement | undefined;
    return first ? first.offsetWidth + 16 : 1;
  };
  const onScroll = () => {
    const el = scroller.current;
    if (el) setActive(Math.min(list.length - 1, Math.max(0, Math.round(el.scrollLeft / step()))));
  };
  const jump = (i: number) => scroller.current?.scrollTo({ left: i * step(), behavior: "smooth" });

  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="mt-8">{controls}</div>
      <div ref={scroller} onScroll={onScroll} className="-mx-6 mt-6 flex snap-x snap-mandatory scroll-pl-6 gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {list.map((project, i) => {
          const stat = (project.impactStats ?? []).find((s) => filled(s.value) && filled(s.label));
          const graphic = project.href === "/graphic-design";
          return (
            <article key={project.slug} className="w-[86%] shrink-0 snap-start">
              <HoleLink href={project.href} data-cursor="Open case study" className="block">
                <CyclingImage project={project} playing={i === active} interval={1900} className="aspect-[5/4] rounded-[1.4rem] ring-1 ring-black/[0.05]" />
              </HoleLink>
              <p className="font-label mt-4 text-[11px] tracking-wide text-neutral-500 uppercase">
                <span className="text-neutral-900">{project.year}</span> · {project.tags.join(" · ")}
              </p>
              <h3 className="font-display mt-1.5 text-[1.9rem] leading-[1.05] font-semibold tracking-[-0.035em] text-neutral-950">{project.title.split(":")[0]}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-neutral-600">{project.outcome ?? project.description}</p>
              {stat && (
                <p className="mt-3 inline-flex max-w-full items-baseline gap-2 rounded-full bg-white py-1.5 pr-3.5 pl-3 text-neutral-900 ring-1 ring-black/[0.06]">
                  <span className="font-display text-sm font-semibold">{stat.value}</span>
                  <span className="truncate text-xs text-neutral-600">{stat.label}</span>
                </p>
              )}
              <div className="mt-4">
                <HoleLink href={project.href} data-cursor="Open case study" className="btn btn-dark">
                  {graphic ? "See all graphic work" : "View case study"} <span aria-hidden>→</span>
                </HoleLink>
              </div>
            </article>
          );
        })}
        <div aria-hidden className="w-2 shrink-0" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5" role="group" aria-label="Choose a project">
          {list.map((p, i) => (
            <button key={p.slug} type="button" aria-label={`Show ${p.title.split(":")[0]}`} aria-current={i === active} onClick={() => jump(i)} className="grid h-6 place-items-center">
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-neutral-950" : "w-1.5 bg-neutral-300"}`} />
            </button>
          ))}
        </div>
        <span className="font-label text-[11px] tracking-[0.14em] text-neutral-500 uppercase">Swipe →</span>
      </div>
    </div>
  );
}

function Pinned({ list, controls }: { list: Project[]; controls: React.ReactNode }) {
  const n = list.length;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 200, damping: 34, mass: 0.3 });
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const activeRef = useRef(0);
  const pulse = useMotionValue(1);
  useMotionValueEvent(p, "change", (v) => {
    const a = Math.min(n - 1, Math.max(0, Math.floor(v * n * 0.9999)));
    if (a !== activeRef.current) {
      activeRef.current = a;
      // every project's gates swing open afresh, at the same pace as the first time
      pulse.set(0);
      animate(pulse, 1, { duration: 1.25, delay: 0.12, ease: [0.22, 1, 0.36, 1] });
      setSlide(0);
      setActive(a);
    }
  });

  // each project's share of the scroll: open quickly, hold, close (the last one stays open)
  const open = useTransform(p, (v) => {
    const t = Math.min(0.9999, Math.max(0, v)) * n;
    const local = t - Math.floor(t);
    const last = Math.floor(t) >= n - 1;
    const up = Math.min(1, local / 0.22);
    const down = last ? 1 : Math.min(1, (1 - local) / 0.16);
    return Math.max(0, Math.min(up, down));
  });
  const gateOpen = useTransform([open, pulse], ([a, b]: number[]) => Math.min(a, b));
  useMotionValueEvent(gateOpen, "change", (v) => setIsOpen(v > 0.8));

  const project = list[active];
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const stat = (project.impactStats ?? []).find((s) => filled(s.value) && filled(s.label));

  // while the gates stand open, the project's pictures change
  useEffect(() => {
    if (!isOpen || gallery.length < 2) return;
    const id = setInterval(() => setSlide((i) => (i + 1) % gallery.length), 1900);
    return () => clearInterval(id);
  }, [isOpen, gallery.length, active]);
  const current = gallery[Math.min(slide, gallery.length - 1)];

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.45) / n) * (el.offsetHeight - window.innerHeight), behavior: "smooth" });
  };

  return (
    <div ref={ref} style={{ height: `${n * 120 + 20}svh` }} className="relative">
      <div className="sticky top-0 flex h-svh items-center">
        <div className="mx-auto w-full max-w-7xl px-4 pt-20 sm:px-8">
          <div>
            {controls}

            <div className="mt-5 grid gap-6 sm:mt-7 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-10">
              <div className="order-2 flex flex-col justify-center px-1 sm:px-3 lg:order-1">
                <ol className="space-y-0.5">
                  {list.map((pr, i) => (
                    <li key={pr.slug}>
                      <button
                        onClick={() => jump(i)}
                        aria-current={i === active}
                        className={`flex w-full items-baseline gap-3 py-0.5 text-left transition-all duration-500 ${i === active ? "opacity-100" : "opacity-35 hover:opacity-70"}`}
                      >
                        <span className="font-label w-5 shrink-0 text-[11px] text-neutral-500 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        <span className="font-display text-[clamp(1.5rem,3.2vw,2.7rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-neutral-950">{pr.title.split(":")[0]}</span>
                      </button>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 max-w-md">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={project.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                      <p className="font-label text-[11px] tracking-wide text-neutral-500 uppercase">
                        <span className="text-neutral-900">{project.year}</span> · {project.tags.join(" · ")}
                      </p>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-neutral-700">{project.outcome ?? project.description}</p>
                      {stat && (
                        <p className="mt-3 inline-flex items-baseline gap-2 rounded-full bg-white py-1.5 pr-3.5 pl-3 text-neutral-900 ring-1 ring-black/[0.06]">
                          <span className="font-display text-sm font-semibold">{stat.value}</span>
                          <span className="text-xs text-neutral-600">{stat.label}</span>
                        </p>
                      )}
                      <div className="mt-4">
                        <HoleLink href={project.href} data-cursor="Open case study" className="btn btn-dark">
                          {project.href === "/graphic-design" ? "See all graphic work" : "View case study"} <span aria-hidden>→</span>
                        </HoleLink>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <HoleLink href={project.href} data-cursor="Open case study" className="block">
                  <Gate open={gateOpen} variant={active} className="mx-auto aspect-[5/4] w-[min(100%,calc((100svh-12rem)*1.25))]">
                    <AnimatePresence mode="sync">
                      <motion.div key={current} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="absolute inset-0">
                        <FitMedia src={current} backdrop={current.endsWith(".mp4") ? project.image : current} width={project.imageWidth} height={project.imageHeight} alt={project.imageAlt} sizes="(min-width: 1024px) 55vw, 92vw" />
                      </motion.div>
                    </AnimatePresence>
                  </Gate>
                </HoleLink>
                <div className="mt-3 flex justify-center gap-1.5" aria-hidden>
                  {gallery.map((_, k) => (
                    <span key={k} className={`h-1 rounded-full transition-all duration-500 ${k === slide ? "w-6 bg-neutral-950" : "w-1.5 bg-neutral-300"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListView({ list }: { list: Project[] }) {
  const [focus, setFocus] = useState(0);
  const f = list[Math.min(focus, list.length - 1)];
  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <ul className="divide-y divide-neutral-300/70 border-b border-neutral-300/70">
        {list.map((p, i) => (
          <li key={p.slug}>
            <HoleLink href={p.href} data-cursor="Open" onMouseEnter={() => setFocus(i)} onFocus={() => setFocus(i)} className="group flex items-baseline gap-4 py-5 transition-[padding] duration-300 hover:pl-3">
              <span className="font-label w-6 shrink-0 text-[11px] text-neutral-500 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-none font-medium tracking-[-0.035em] text-neutral-950">{p.title.split(":")[0]}</span>
                <span className="font-label mt-2 block text-[11px] tracking-wide text-neutral-500 uppercase">{p.tags.join(" · ")}</span>
              </span>
              <span className="font-label shrink-0 text-[11px] text-neutral-500 tabular-nums">{p.year?.match(/\d{4}/)?.[0]}</span>
              <span aria-hidden className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
            </HoleLink>
          </li>
        ))}
      </ul>
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <CyclingImage key={f.slug} project={f} className="aspect-[4/3] rounded-2xl ring-1 ring-black/[0.06]" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-600">{f.outcome ?? f.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Hall() {
  const [tab, setTab] = useState<Tab["key"]>("UIUX");
  const [view, setView] = useState<View>("showcase");
  const reduce = useReducedMotion();
  const phone = useIsPhone();
  const list = [
    ...(tab === "Graphic Design" ? [graphicReel] : []),
    ...projects.filter((p) => p.category === tab && !p.hideFromHome).sort((a, b) => Number(!!b.featured) - Number(!!a.featured)),
  ];
  const top = useRef<HTMLDivElement>(null);
  const choose = (t: Tab["key"]) => {
    setTab(t);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const chooseView = (v: View) => {
    setView(v);
    // stay in the section: the layouts differ in height, so bring the heading back to the top
    setTimeout(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };
  const controls = <Controls tab={tab} setTab={choose} view={reduce && view === "showcase" ? "grid" : view} setView={chooseView} />;
  const mode: View = reduce && view === "showcase" ? "grid" : view;

  return (
    <section id="works" data-rail="Work" className="relative bg-background pt-12 pb-10 sm:pt-20">
      <div ref={top} className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* an editorial split: the headline on the left, the framing on the right */}
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <p className="font-label text-[11px] tracking-[0.18em] text-neutral-500 uppercase">(02) Down the rabbit hole</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.02] font-medium tracking-[-0.035em] text-neutral-950">
              <Melt as="span" className="block" maxBlur={3.6} slow>
                Behind every gate, a <Em>project</Em>.
              </Melt>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-neutral-600 lg:justify-self-end">
            Choose product work or graphic design, and how you want to look at it: the gates open one by one as you scroll, or see it all at once as a grid or a list.
          </p>
        </div>
      </div>

      {mode === "showcase" ? (
        phone ? <MobileShowcase key={tab} list={list} controls={controls} /> : <Pinned key={tab} list={list} controls={controls} />
      ) : (
        <div className="mx-auto max-w-7xl px-6 pb-14 sm:px-10">
          <div className="mt-10">{controls}</div>
          {mode === "grid" ? (
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((project, i) => (
                <Card key={project.slug} project={project} index={i} total={list.length} />
              ))}
            </div>
          ) : (
            <ListView list={list} />
          )}
        </div>
      )}
    </section>
  );
}
