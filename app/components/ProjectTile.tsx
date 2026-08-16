import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/app/data/projects";

export default function ProjectTile({ project }: { project: Project }) {
  const isExternal = project.external ?? project.href.startsWith("http");

  const content = (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />

        {project.impactStats && project.impactStats.length > 0 && (
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/15 to-transparent p-5 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {project.impactStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-[family-name:var(--font-manrope)] text-xl font-semibold text-white">
                    {stat.value}
                  </div>
                  <div className="text-[11px] leading-snug text-white/75">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <h3 className="link-underline mt-5 w-fit font-[family-name:var(--font-manrope)] text-xl text-neutral-900">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-500">{project.description}</p>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        data-cursor="Visit site"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={project.href} className="group block" data-cursor="View case study">
      {content}
    </Link>
  );
}
