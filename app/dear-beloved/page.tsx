import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import NextProjectPreview from "@/app/components/NextProjectPreview";
import { dearBelovedHero, gallery, nextProject } from "@/app/dear-beloved/data";

export const metadata: Metadata = {
  title: "Dear Beloved — Hannah Roxas",
  description: dearBelovedHero.narrative,
};

export default function DearBelovedPage() {
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
              {dearBelovedHero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              {dearBelovedHero.narrative}
            </p>

            <p className="mt-8 text-sm text-neutral-400">{dearBelovedHero.date}</p>

            <dl className="mt-6 grid grid-cols-1 gap-6 border-t border-black/[0.08] pt-8 sm:grid-cols-3">
              {dearBelovedHero.meta.map((item) => (
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
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.images.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[1650/1275] w-full overflow-hidden rounded-lg bg-neutral-100"
                >
                  <Image
                    src={src}
                    alt={`${gallery.imageAlt} ${i + 1}`}
                    width={gallery.imageWidth}
                    height={gallery.imageHeight}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  />
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
