import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {
  graphicDesignHero,
  galleryProjects,
  editedVideos,
  experimentalImages,
} from "@/app/graphic-design/data";

export const metadata: Metadata = {
  title: "Graphic Design — Hannah Roxas",
  description: graphicDesignHero.category,
};

export default function GraphicDesignPage() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-8 sm:px-10 sm:pt-24">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            ← Back to home
          </Link>

          <p className="mt-8 text-sm font-medium tracking-wide text-neutral-500 uppercase">
            {graphicDesignHero.eyebrow}
          </p>

          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-manrope)] text-4xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
            {graphicDesignHero.category}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
            {graphicDesignHero.intro}
          </p>
        </section>

        {/* Black gallery section: Projects / Edited Videos / Experimental */}
        <section className="bg-black py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            {/* Projects */}
            <h2 className="font-[family-name:var(--font-manrope)] text-3xl font-semibold text-white sm:text-4xl">
              Projects
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {galleryProjects.map((project) => (
                <Link key={project.slug} href={project.href} className="group block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-900">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      width={project.imageWidth}
                      height={project.imageHeight}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <h3 className="mt-5 font-[family-name:var(--font-manrope)] text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {project.description}
                  </p>
                </Link>
              ))}
            </div>

            {/* Edited Videos */}
            <h2 className="mt-24 font-[family-name:var(--font-manrope)] text-3xl font-semibold text-white sm:text-4xl">
              Edited Videos
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {editedVideos.map((video) => (
                <div
                  key={video.slug}
                  className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900"
                >
                  <video
                    src={video.src}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label={video.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Experimental */}
            <h2 className="mt-24 font-[family-name:var(--font-manrope)] text-3xl font-semibold text-white sm:text-4xl">
              Experimental
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {experimentalImages.map((item) => (
                <div
                  key={item.slug}
                  className="relative aspect-[2550/3300] w-full overflow-hidden rounded-xl bg-neutral-900 shadow-lg shadow-black/40"
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
