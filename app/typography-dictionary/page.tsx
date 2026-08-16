import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {
  typographyHero,
  spreads,
  bookMockup,
  specimens,
  nextProject,
} from "@/app/typography-dictionary/data";

export const metadata: Metadata = {
  title: "Typography Dictionary | Hannah Roxas",
  description: typographyHero.narrative,
};

export default function TypographyDictionaryPage() {
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
              {typographyHero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              {typographyHero.narrative}
            </p>

            <p className="mt-8 text-sm text-neutral-400">{typographyHero.date}</p>

            <dl className="mt-6 grid grid-cols-1 gap-6 border-t border-black/[0.08] pt-8 sm:grid-cols-3">
              {typographyHero.meta.map((item) => (
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

        {/* Spreads */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-4xl px-6 sm:px-10">
            <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
              {spreads.heading}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {spreads.images.map((item) => (
                <div
                  key={item.slug}
                  className="relative aspect-[2575/3175] w-full overflow-hidden rounded-2xl bg-neutral-100"
                >
                  <Image
                    src={item.src}
                    alt={`${spreads.imageAlt} ${item.slug}`}
                    width={spreads.imageWidth}
                    height={spreads.imageHeight}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Book mockup */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-4xl px-6 sm:px-10">
            <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
              {bookMockup.heading}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {bookMockup.images.map((src) => (
                <div
                  key={src}
                  className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100"
                >
                  <Image
                    src={src}
                    alt={bookMockup.imageAlt}
                    width={bookMockup.imageWidth}
                    height={bookMockup.imageHeight}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dictionary specimens */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
              {specimens.heading}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {specimens.images.map((src, i) => (
                <div key={src}>
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
                    <Image
                      src={src}
                      alt={`${specimens.imageAlt} ${specimens.numbers[i]}`}
                      width={specimens.imageWidth}
                      height={specimens.imageHeight}
                      className="h-full w-full object-cover"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-neutral-400">
                    {String(specimens.numbers[i]).padStart(4, "0")}
                  </p>
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
            <div className="relative aspect-[336/498] w-full max-w-xs overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src={nextProject.image}
                alt={nextProject.imageAlt}
                width={nextProject.imageWidth}
                height={nextProject.imageHeight}
                unoptimized
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                sizes="(min-width: 640px) 320px, 100vw"
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
