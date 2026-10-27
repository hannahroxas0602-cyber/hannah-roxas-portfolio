"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HoleLink from "@/app/components/HoleLink";
import Portal from "@/app/components/Portal";
import DemoVideo from "@/app/components/DemoVideo";
import { AnimatePresence, motion } from "motion/react";
import { projects, type Project } from "@/app/data/projects";
import { filled } from "@/app/data/placeholder";
import { Em } from "@/app/components/Em";

type Tab = {
  key: Project["category"];
  label: string;
};

const TABS: Tab[] = [
  { key: "UIUX", label: "UIUX Projects" },
  { key: "Graphic Design", label: "Graphic Design Projects" },
];

const SLIDE_INTERVAL_MS = 1200;

// The featured project uses the site accent (--accent in globals.css): the
// ring, the badge with white text, and the label on the white page.
const FEATURED_RING = "ring-accent-deep/70";
const FEATURED_BG = "bg-accent";
const FEATURED_TEXT = "text-accent-ink";

// Touch screens have no hover, so project cards behave differently there.
const isTouchScreen = () => window.matchMedia("(hover: none)").matches;

function ProjectThumbnail({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const gallery =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.image];
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Touch only: set once the card has been tapped, which reveals the info panel.
  const [previewing, setPreviewing] = useState(false);

  const startCycle = () => {
    // iOS fires mouseenter on tap; changing the image there makes it swallow the tap.
    if (gallery.length <= 1 || isTouchScreen()) return;
    setActiveIndex(1);
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % gallery.length);
    }, SLIDE_INTERVAL_MS);
  };

  const stopCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setActiveIndex(0);
  };

  // On touch screens a tap on the card previews it (info panel, next image) and
  // only the arrow opens the case study. With a mouse the whole card is the link.
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isTouchScreen()) return;
    if ((e.target as HTMLElement).closest("[data-enter]")) return;
    e.preventDefault();
    if (previewing) setActiveIndex((i) => (i + 1) % gallery.length);
    setPreviewing(true);
  };

  useEffect(() => () => stopCycle(), []);

  const hasVideo = gallery.some((src) => src.endsWith(".mp4"));
  const stats = (project.impactStats ?? []).filter(
    (s) => filled(s.value) && filled(s.label),
  );

  // Defer mounting the videos until the card is near the viewport, so the
  // homepage doesn't download every demo up front.
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !hasVideo) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasVideo]);

  return (
    <HoleLink
      ref={cardRef}
      href={project.href}
      data-cursor="Enter →"
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
      onClick={handleClick}
      // Once previewed on touch, the card becomes a one-cell grid holding a 16:9
      // spacer and the info panel, so it is as tall as whichever is taller. On
      // very small phones the panel is taller than 16:9 and would be clipped.
      className={`group relative w-full overflow-hidden rounded-2xl bg-neutral-100 ${
        previewing ? "grid grid-cols-1" : "block aspect-[16/9]"
      } ${project.featured ? `ring-1 ${FEATURED_RING} ring-offset-2 ring-offset-background` : ""}`}
    >
      {/* Once the card is near view, videos stay mounted (and autoplaying) so hover playback starts instantly. */}
      {hasVideo &&
        nearViewport &&
        gallery.map((src, i) =>
          src.endsWith(".mp4") ? (
            <DemoVideo
              key={src}
              src={src}
              alt={project.imageAlt}
              fallbackSrc={project.image}
              sizes="(min-width: 1024px) 45vw, 100vw"
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
              // The first project's image is the page's largest element, so it loads first.
              priority={priority && activeIndex === 0}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {gallery.length > 1 && (
        <div className="absolute top-4 right-4 z-10 flex gap-1.5 [@media(hover:none)]:top-6 [@media(hover:none)]:right-16">
          {gallery.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                i === activeIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* Touch screens: the arrow is what opens the case study (a tap anywhere else previews). */}
      <span
        data-enter
        aria-hidden
        className="touch-only-control absolute top-3 right-3 z-20 h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-xl backdrop-saturate-150"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <Portal />

      {project.featured && (
        <span
          className={`absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-xs font-semibold text-black shadow-md ${FEATURED_BG}`}
        >
          Featured
        </span>
      )}

      {/* Keeps the previewed card at least 16:9 (see the grid note above). */}
      {previewing && (
        <span
          aria-hidden
          className="col-start-1 row-start-1 block aspect-[16/9] w-full"
        />
      )}

      {/* Persistent title chip so the project reads without needing to hover */}
      <span
        data-vt-title
        className={`absolute bottom-4 left-4 z-10 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-0 ${
          // The touch preview panel covers the card; the chip would show through it.
          previewing ? "hidden" : ""
        }`}
      >
        {project.title}
      </span>

      <div
        className={`touch-reveal z-10 flex flex-col items-start justify-end p-2 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 sm:p-3 ${
          previewing
            ? "is-held relative col-start-1 row-start-1 min-w-0 self-end"
            : "absolute inset-0"
        }`}
      >
        {/* A small card in the corner, so most of the preview stays visible: stats on one
            line each, the description capped at two lines. On touch it spans the width. */}
        <div className="w-fit max-w-[min(100%,24rem)] rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 shadow-[0_6px_24px_rgba(0,0,0,0.3)] backdrop-blur-xl backdrop-saturate-150 [@media(hover:none)]:w-full [@media(hover:none)]:max-w-none sm:bg-black/50">
          {stats.length > 0 && (
            // Right padding on touch keeps the stats clear of the corner arrow.
            <div className="flex flex-col gap-0.5 [@media(hover:none)]:pr-11">
              {stats.map((stat, i) => (
                <div
                  key={`${stat.label}-${i}`}
                  className="flex items-baseline gap-2"
                >
                  <span className="font-display text-base leading-tight font-semibold text-white">
                    {stat.value}
                  </span>
                  <span className="text-[11px] leading-tight text-white/75">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <p
            className={`line-clamp-2 text-xs leading-snug text-white/85 ${stats.length > 0 ? "mt-2 border-t border-white/10 pt-2" : ""}`}
          >
            {project.description}
          </p>
        </div>
      </div>
    </HoleLink>
  );
}

export default function ProjectsTabbed({ id = "works" }: { id?: string }) {
  const [activeTab, setActiveTab] = useState<Tab["key"]>("UIUX");
  const visibleProjects = projects
    .filter((p) => p.category === activeTab && !p.hideFromHome)
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <section
      id={id}
      className="mx-auto max-w-7xl scroll-mt-24 px-6 pt-14 pb-16 sm:px-10 sm:pt-20 sm:pb-24 lg:pt-14"
    >
      {/* The heading and tabs are centred, on the same axis as the hero above them; the
          list and the previews sit below in two columns. */}
      <div className="flex flex-col items-center text-center">
        <h2 className="font-display text-3xl font-semibold text-neutral-900 sm:text-4xl">
          <Em>Selected</Em> Projects
        </h2>

        <div className="mt-6 flex gap-8 border-b border-neutral-200">
          {TABS.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`relative -mb-px pb-4 text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-neutral-900"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="projects-tab-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-neutral-900"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-10 sm:mt-14 lg:grid-cols-[2fr_3fr] lg:gap-12">
        <div className="lg:sticky lg:top-24 lg:-mt-4 lg:self-start">
          <div className="flex flex-col">
            {visibleProjects.map((project, i) => (
              <HoleLink
                key={project.slug}
                href={project.href}
                data-cursor="Enter →"
                className="group flex items-baseline gap-4 border-b border-neutral-200 py-6 transition-colors duration-200 hover:border-neutral-300"
              >
                <span className="font-label text-xs font-medium text-neutral-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <span
                    data-vt-title
                    className="link-underline w-fit font-display text-xl font-medium text-neutral-900 transition-colors duration-300 sm:text-2xl"
                  >
                    {project.title}
                  </span>
                  <p className="mt-1.5 text-sm text-neutral-400">
                    {project.featured && (
                      <span className={`mr-2 font-semibold ${FEATURED_TEXT}`}>
                        Featured ·
                      </span>
                    )}
                    {project.tags.join(" · ")}
                    {project.year && ` · ${project.year}`}
                  </p>
                  {project.outcome && (
                    <p className="mt-1.5 max-w-md text-sm leading-snug text-neutral-700">
                      {project.outcome}
                    </p>
                  )}
                </div>
                <span
                  aria-hidden
                  className="cta-swap flex-none justify-items-end text-neutral-300 transition-colors duration-300 group-hover:text-neutral-900"
                >
                  <span>→</span>
                  <span className="text-sm font-medium whitespace-nowrap">
                    Enter →
                  </span>
                </span>
              </HoleLink>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {visibleProjects.map((project, i) => (
            <ProjectThumbnail
              key={project.slug}
              project={project}
              priority={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
