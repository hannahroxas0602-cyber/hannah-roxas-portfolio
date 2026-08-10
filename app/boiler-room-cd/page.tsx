import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { boilerRoomHero, gallery, nextProject } from "@/app/boiler-room-cd/data";

export const metadata: Metadata = {
  title: "Boiler Room Tokyo CD — Hannah Roxas",
  description: boilerRoomHero.narrative,
};

export default function BoilerRoomCdPage() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-black py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 sm:px-10">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
            >
              ← Back to home
            </Link>

            <h1 className="mt-8 font-[family-name:var(--font-manrope)] text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              {boilerRoomHero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
              {boilerRoomHero.narrative}
            </p>

            <p className="mt-8 text-sm text-neutral-500">{boilerRoomHero.date}</p>

            <dl className="mt-6 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
              {boilerRoomHero.meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-neutral-300">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Gallery */}
        <section className="bg-black pb-16 sm:pb-24">
          <div className="mx-auto max-w-5xl px-6 sm:px-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {gallery.map((item) => (
                <div key={item.slug}>
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-900">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={item.imageWidth}
                      height={item.imageHeight}
                      className="h-full w-full object-cover"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium text-neutral-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Next project */}
        <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
          <p className="text-sm font-medium tracking-wide text-neutral-400 uppercase">
            {nextProject.label}
          </p>

          <Link href={nextProject.href} className="group mt-6 block">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src={nextProject.image}
                alt={nextProject.imageAlt}
                width={nextProject.imageWidth}
                height={nextProject.imageHeight}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>
            <h2 className="mt-5 font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900">
              {nextProject.title}
            </h2>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-neutral-600">
              {nextProject.description}
            </p>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
