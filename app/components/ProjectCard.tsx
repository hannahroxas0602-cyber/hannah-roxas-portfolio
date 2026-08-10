import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/app/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const isExternal = project.external ?? project.href.startsWith("http");

  const media = (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-soft"
      style={{ aspectRatio: project.imageAspect ?? "4/3" }}
    >
      <Image
        src={project.image}
        alt={project.imageAlt}
        width={project.imageWidth}
        height={project.imageHeight}
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 ease-in-out group-hover:bg-black/10" />
    </div>
  );

  const body = (
    <div className="mt-5">
      <h3 className="link-underline w-fit font-[family-name:var(--font-manrope)] text-xl font-semibold text-neutral-900">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );

  const className = "group block";

  if (isExternal) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        data-cursor="Visit site"
      >
        {media}
        {body}
      </a>
    );
  }

  return (
    <Link href={project.href} className={className} data-cursor="View case study">
      {media}
      {body}
    </Link>
  );
}
