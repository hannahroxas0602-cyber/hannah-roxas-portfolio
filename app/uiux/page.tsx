import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProjectGrid from "@/app/components/ProjectGrid";
import { projects } from "@/app/data/projects";
import { uiuxHero } from "@/app/uiux/data";

export const metadata: Metadata = {
  title: "UI/UX | Hannah Roxas",
  description: uiuxHero.category,
};

const uiuxProjects = projects.filter((project) => project.tags.includes("UX/UI"));

export default function UiUxPage() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 sm:px-10 sm:pt-20 sm:pb-14">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            ← Back to home
          </Link>

          <p className="mt-8 font-[family-name:var(--font-mono)] text-xs font-medium tracking-widest text-neutral-400 uppercase sm:mt-10">
            {uiuxHero.eyebrow}
          </p>
          <h1
            className="mt-3 max-w-none font-[family-name:var(--font-manrope)] font-semibold tracking-tight whitespace-nowrap text-neutral-900"
            style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", lineHeight: 1.05 }}
          >
            {uiuxHero.category}
          </h1>

          <p className="mt-5 max-w-none text-base leading-relaxed whitespace-nowrap text-neutral-500">
            {uiuxHero.intro}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">
            {uiuxHero.subcopy}
          </p>
        </section>

        <ProjectGrid projects={uiuxProjects} title="UI/UX projects" id="uiux-projects" />
      </main>
      <Footer />
    </div>
  );
}
