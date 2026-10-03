"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HoleLink from "@/app/components/HoleLink";
import Portal from "@/app/components/Portal";
import { AnimatePresence, motion } from "motion/react";
import { projects, type Project } from "@/app/data/projects";

type Tab = {
  key: Project["category"];
  label: string;
};

const TABS: Tab[] = [
  { key: "UIUX", label: "UIUX Projects" },
  { key: "Graphic Design", label: "Graphic Design Projects" },
];

const SLIDE_INTERVAL_MS = 1200;

// Touch screens have no hover, so project cards behave differently there.
const isTouchScreen = () => window.matchMedia("(hover: none)").matches;

function ProjectThumbnail({ project }: { project: Project }) {
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
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
      }`}
    >
      {/* Once the card is near view, videos stay mounted and preloaded so hover playback starts instantly. */}
      {hasVideo &&
        nearViewport &&
        gallery.map((src, i) =>
          src.endsWith(".mp4") ? (
            <video
              key={src}
              src={src}
              aria-label={project.imageAlt}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
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

      {/* Keeps the previewed card at least 16:9 (see the grid note above). */}
      {previewing && (
        <span aria-hidden className="col-start-1 row-start-1 block aspect-[16/9] w-full" />
      )}

      {/* Persistent title chip so the project reads without needing to hover */}
      <span
        className={`absolute bottom-4 left-4 z-10 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xl backdrop-saturate-150 ${
          // The touch preview panel covers the card; the chip would show through it.
          previewing ? "hidden" : ""
        }`}
      >
        {project.title}
      </span>

      <div
        className={`touch-reveal z-10 flex flex-col justify-end p-2 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 sm:p-4 ${
          previewing ? "is-held relative col-start-1 row-start-1 min-w-0 self-end" : "absolute inset-0"
        }`}
      >
        <div className="rounded-xl border border-white/15 bg-black/60 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150 sm:rounded-2xl sm:bg-black/45 sm:p-5">
          {project.impactStats && project.impactStats.length > 0 && (
            // Right padding on touch keeps the stats clear of the corner arrow.
            <div className="mb-2 sm:mb-4 [@media(hover:none)]:pr-11">
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 sm:gap-x-8 sm:gap-y-2">
                {project.impactStats.map((stat, i) => (
                  <div key={`${stat.label}-${i}`}>
                    <div className="font-[family-name:var(--font-manrope)] text-lg leading-tight font-semibold text-white sm:text-2xl sm:leading-8">
                      {stat.value}
                    </div>
                    <div className="text-[11px] leading-tight text-white/80 sm:text-xs sm:leading-4">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="max-w-md text-xs leading-snug text-white/90 sm:text-sm sm:leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </HoleLink>
  );
}

export default function ProjectsTabbed({ id = "works" }: { id?: string }) {
  const [activeTab, setActiveTab] = useState<Tab["key"]>("UIUX");
  const visibleProjects = projects.filter((p) => p.category === activeTab && !p.hideFromHome);

  return (
    <section id={id} className="mx-auto max-w-7xl scroll-mt-24 px-6 pt-10 pb-16 sm:px-10 sm:pt-14 sm:pb-24 lg:pt-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:gap-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            <span className="font-[family-name:var(--font-inter)] font-normal italic">Selected</span>{" "}
            Projects
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-500">
            Case studies in how research shaped design decisions.
          </p>

          <div className="mt-8 flex gap-8 border-b border-neutral-200">
            {TABS.map((tab) => {
              const isActive = tab.key === activeTab;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative -mb-px pb-4 text-base font-medium transition-colors duration-200 ${
                    isActive ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
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

          <div className="flex flex-col">
            {visibleProjects.map((project, i) => (
              <HoleLink
                key={project.slug}
                href={project.href}
                data-cursor="Enter →"
                className="group flex items-baseline gap-4 border-b border-neutral-200 py-6 transition-colors duration-200 hover:border-neutral-300"
              >
                <span className="font-[family-name:var(--font-mono)] text-xs font-medium text-neutral-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <span className="link-underline w-fit font-[family-name:var(--font-manrope)] text-xl font-medium text-neutral-900 transition-colors duration-300 sm:text-2xl">
                    {project.title}
                  </span>
                  <p className="mt-1.5 text-sm text-neutral-400">
                    {project.tags.join(" · ")}
                    {project.year && ` · ${project.year}`}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="cta-swap flex-none justify-items-end text-neutral-300 transition-colors duration-300 group-hover:text-neutral-900"
                >
                  <span>→</span>
                  <span className="text-sm font-medium whitespace-nowrap">Enter →</span>
                </span>
              </HoleLink>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {visibleProjects.map((project) => (
            <ProjectThumbnail key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
