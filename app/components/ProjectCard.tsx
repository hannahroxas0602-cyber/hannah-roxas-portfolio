"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/app/data/projects";
import { useHoldPreview } from "@/app/hooks/useHoldPreview";

export default function ProjectCard({ project }: { project: Project }) {
  const isExternal = project.external ?? project.href.startsWith("http");
  const { held, handlers } = useHoldPreview();

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
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
          className="touch-always-visible h-full w-full scale-105 object-cover opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />

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
        {...handlers}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={project.href} className={className} data-cursor="View case study" {...handlers}>
      {content}
    </Link>
  );
}
