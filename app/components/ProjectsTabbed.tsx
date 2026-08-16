"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

function ProjectThumbnail({ project }: { project: Project }) {
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = () => {
    if (gallery.length <= 1) return;
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

  useEffect(() => () => stopCycle(), []);

  const hasVideo = gallery.some((src) => src.endsWith(".mp4"));

  return (
    <Link
      href={project.href}
      data-cursor="View case study"
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
      className="group relative block aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100"
    >
      {/* Videos stay mounted and preloaded at all times so hover playback starts instantly. */}
      {hasVideo &&
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
        <div className="absolute top-4 right-4 z-10 flex gap-1.5">
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

      <div className="touch-reveal absolute inset-0 z-10 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
        <div className="rounded-2xl border border-white/15 bg-black/45 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl backdrop-saturate-150">
          {project.impactStats && project.impactStats.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                {project.impactStats.map((stat, i) => (
                  <div key={`${stat.label}-${i}`}>
                    <div className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="max-w-md text-sm leading-relaxed text-white/90">{project.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsTabbed({ id = "works" }: { id?: string }) {
  const [activeTab, setActiveTab] = useState<Tab["key"]>("UIUX");
  const visibleProjects = projects.filter((p) => p.category === activeTab);

  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:gap-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-lg text-neutral-900">
            <span className="font-[family-name:var(--font-inter)] italic">Selected</span>{" "}
            <span className="font-[family-name:var(--font-manrope)] font-semibold">Projects</span>
          </h2>
          <p className="mt-2 max-w-xl text-lg text-neutral-500">
            Case studies in how research and design decisions shaped real outcomes.
          </p>

          <div className="mt-6 flex gap-8 border-b border-neutral-200">
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
            {visibleProjects.map((project) => (
              <Link
                key={project.slug}
                href={project.href}
                data-cursor="View case study"
                className="group block border-b border-neutral-200 py-6"
              >
                <span className="link-underline w-fit font-[family-name:var(--font-manrope)] text-xl font-medium text-neutral-900 transition-colors duration-300 sm:text-2xl">
                  {project.title}
                </span>
              </Link>
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
