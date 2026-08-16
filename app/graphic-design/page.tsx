import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProjectTile from "@/app/components/ProjectTile";
import ClickToPlayVideo from "@/app/components/ClickToPlayVideo";
import { projects } from "@/app/data/projects";
import { graphicDesignHero, editedVideos, experimentalImages } from "@/app/graphic-design/data";

const graphicDesignProjects = projects.filter((project) => project.category === "Graphic Design");

export const metadata: Metadata = {
  title: "Graphic Design | Hannah Roxas",
  description: graphicDesignHero.category,
};

export default function GraphicDesignPage() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 sm:px-10 sm:pt-20 sm:pb-14">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            ← Back to home
          </Link>

          <p className="mt-8 font-[family-name:var(--font-mono)] text-xs font-medium tracking-widest text-neutral-400 uppercase sm:mt-10">
            {graphicDesignHero.eyebrow}
          </p>
          <h1
            className="mt-3 max-w-2xl font-[family-name:var(--font-manrope)] font-semibold tracking-tight text-neutral-900"
            style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", lineHeight: 1.05 }}
          >
            {graphicDesignHero.category}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-500">
            {graphicDesignHero.intro}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">
            {graphicDesignHero.subcopy}
          </p>
        </section>

        {/* Gallery section: Projects / Edited Videos / Experimental */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            {/* Projects */}
            <div className="flex items-baseline gap-4 border-b border-black/[0.08] pb-4">
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-neutral-400 uppercase">
                01
              </span>
              <h2 className="font-[family-name:var(--font-manrope)] text-3xl text-neutral-900 sm:text-4xl">
                Projects
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {graphicDesignProjects.map((project) => (
                <ProjectTile key={project.slug} project={project} />
              ))}
            </div>

            {/* Edited Videos */}
            <div className="mt-24 flex items-baseline gap-4 border-b border-black/[0.08] pb-4">
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-neutral-400 uppercase">
                02
              </span>
              <h2 className="font-[family-name:var(--font-manrope)] text-3xl text-neutral-900 sm:text-4xl">
                Edited Videos
              </h2>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:h-40 sm:items-end sm:justify-center sm:gap-4 lg:h-48">
              {editedVideos.map((video) => (
                <div key={video.slug} className="h-56 w-full max-w-xs sm:h-full sm:w-auto">
                  <ClickToPlayVideo
                    src={video.src}
                    title={video.title}
                    width={video.width}
                    height={video.height}
                    hasAudio={video.hasAudio}
                    aspectRatio={video.slug === "edited-video-04" ? "16/9" : undefined}
                    className="relative h-full w-full sm:w-auto"
                  />
                </div>
              ))}
            </div>

            {/* Experimental */}
            <div className="mt-24 flex items-baseline gap-4 border-b border-black/[0.08] pb-4">
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-neutral-400 uppercase">
                03
              </span>
              <h2 className="font-[family-name:var(--font-manrope)] text-3xl text-neutral-900 sm:text-4xl">
                Experimental
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {experimentalImages.map((item) => (
                <div
                  key={item.slug}
                  className="relative aspect-[2550/3300] w-full overflow-hidden rounded-xl bg-neutral-100 shadow-sm"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={item.imageWidth}
                    height={item.imageHeight}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
