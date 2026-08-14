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

          <div className="mt-10 flex items-start gap-4 sm:mt-14 sm:gap-6">
            <span className="font-[family-name:var(--font-manrope)] text-3xl leading-none text-neutral-300 italic sm:text-4xl">
              02
            </span>
            <div>
              <p className="text-sm font-medium tracking-wide text-neutral-500 uppercase">
                {graphicDesignHero.eyebrow}
              </p>
              <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-manrope)] text-5xl leading-[0.95] tracking-tight text-neutral-900 sm:text-7xl">
                {graphicDesignHero.category}
              </h1>
            </div>
          </div>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-600 sm:ml-[3.25rem]">
            {graphicDesignHero.intro}
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
              {galleryProjects.map((project) => (
                <Link key={project.slug} href={project.href} className="group block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      width={project.imageWidth}
                      height={project.imageHeight}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <h3 className="link-underline mt-5 w-fit font-[family-name:var(--font-manrope)] text-xl text-neutral-900">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                    {project.description}
                  </p>
                </Link>
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

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {editedVideos.map((video) => (
                <div
                  key={video.slug}
                  className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100"
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
