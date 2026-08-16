import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import NextProjectPreview from "@/app/components/NextProjectPreview";
import { boilerRoomHero, gallery, nextProject } from "@/app/boiler-room-cd/data";

export const metadata: Metadata = {
  title: "Boiler Room Tokyo CD | Hannah Roxas",
  description: boilerRoomHero.narrative,
};

export default function BoilerRoomCdPage() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 sm:px-10">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
            >
              ← Back to home
            </Link>

            <h1 className="mt-8 font-[family-name:var(--font-manrope)] text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl">
              {boilerRoomHero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              {boilerRoomHero.narrative}
            </p>

            <p className="mt-8 text-sm text-neutral-400">{boilerRoomHero.date}</p>

            <dl className="mt-6 grid grid-cols-1 gap-6 border-t border-black/[0.08] pt-8 sm:grid-cols-3">
              {boilerRoomHero.meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-medium tracking-wide text-neutral-400 uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-neutral-600">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Gallery */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-5xl px-6 sm:px-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {gallery.map((item) => (
                <div key={item.slug}>
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={item.imageWidth}
                      height={item.imageHeight}
                      className="h-full w-full object-cover"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium text-neutral-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <NextProjectPreview {...nextProject} />
      </main>
      <Footer />
    </div>
  );
}
