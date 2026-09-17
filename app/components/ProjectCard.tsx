"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/app/data/projects";
import { useHoldPreview } from "@/app/hooks/useHoldPreview";

const SLIDE_INTERVAL_MS = 1200;

export default function ProjectCard({ project }: { project: Project }) {
  const isExternal = project.external ?? project.href.startsWith("http");
  const { held, handlers } = useHoldPreview();

  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasVideo = gallery.some((src) => src.endsWith(".mp4"));

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

  const content = (
    <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium tracking-wide text-neutral-500 uppercase">
          {project.tags.map((tag, i) => (
            <span key={tag} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden className="text-neutral-300">|</span>}
              {tag}
            </span>
          ))}
        </div>

        <h3 className="link-underline mt-4 w-fit font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
          {project.title}
        </h3>

        {project.year && (
          <p className="mt-3 text-sm font-medium text-neutral-500">{project.year}</p>
        )}

        <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600">
          {project.description}
        </p>

        <span className="link-underline mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-neutral-900">
          {isExternal ? "Visit site" : "Read Case Study"}
          <span aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-2xl bg-neutral-100"
        style={{ aspectRatio: project.imageAspect ?? "4/3" }}
      >
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

        {project.impactStats && project.impactStats.length > 0 && (
          <div
            className={`touch-reveal absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-6 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 ${held ? "is-held" : ""}`}
          >
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {project.impactStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/75">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const className = "group block border-t border-neutral-200 py-10 first:border-t-0 sm:py-12";

  if (isExternal) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        data-cursor="Visit site"
        onMouseEnter={startCycle}
        onMouseLeave={stopCycle}
        {...handlers}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={project.href}
      className={className}
      data-cursor="View case study"
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
      {...handlers}
    >
      {content}
    </Link>
  );
}
