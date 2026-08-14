import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProjectGrid from "@/app/components/ProjectGrid";
import { projects } from "@/app/data/projects";
import { uiuxHero } from "@/app/uiux/data";

export const metadata: Metadata = {
  title: "UI/UX — Hannah Roxas",
  description: uiuxHero.category,
};

const uiuxProjects = projects.filter((project) => project.tags.includes("UX/UI"));

export default function UiUxPage() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-8 sm:px-10 sm:pt-24">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            ← Back to home
          </Link>

          <div className="mt-10 flex items-start gap-4 sm:mt-14 sm:gap-6">
            <span className="font-[family-name:var(--font-manrope)] text-3xl leading-none text-neutral-300 italic sm:text-4xl">
              01
            </span>
            <div>
              <p className="text-sm font-medium tracking-wide text-neutral-500 uppercase">
                {uiuxHero.eyebrow}
              </p>
              <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-manrope)] text-5xl leading-[0.95] tracking-tight text-neutral-900 sm:text-7xl">
                {uiuxHero.category}
              </h1>
            </div>
          </div>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-600 sm:ml-[3.25rem]">
            {uiuxHero.intro}
          </p>

          <div className="relative mt-12 aspect-[2252/1084] w-full overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src={uiuxHero.image}
              alt={uiuxHero.imageAlt}
              width={uiuxHero.imageWidth}
              height={uiuxHero.imageHeight}
              className="h-full w-full object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </section>

        <ProjectGrid projects={uiuxProjects} title="UI/UX projects" id="uiux-projects" />
      </main>
      <Footer />
    </div>
  );
}
