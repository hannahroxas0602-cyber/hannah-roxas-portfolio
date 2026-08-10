import { projects as allProjects, type Project } from "@/app/data/projects";
import ProjectCard from "@/app/components/ProjectCard";

type ProjectGridProps = {
  projects?: Project[];
  title?: string;
  id?: string;
};

export default function ProjectGrid({
  projects = allProjects,
  title = "Works",
  id = "works",
}: ProjectGridProps) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
      <div className="flex items-center gap-6">
        <span className="h-px w-14 shrink-0 bg-neutral-400" />
        <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
          {title}
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
