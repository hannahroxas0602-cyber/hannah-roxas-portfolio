import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {
  notesHero,
  intro,
  surrogacyOverview,
  stakeholderMap,
  problemsHeading,
  problems,
  platformConcept,
  closingReflection,
  closingCta,
} from "@/app/continnum-notes/data";

export const metadata: Metadata = {
  title: "Continuum Research Notes — Hannah Roxas",
  description: notesHero.headline,
};

export default function ContinnumNotesPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-6 pt-16 pb-8 text-center sm:px-10 sm:pt-24">
          <Link
            href="/continuum/continuum"
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            ← Back to Continuum
          </Link>

          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-neutral-400">
            {notesHero.breadcrumb.map((item, i) => (
              <span key={item}>
                {i > 0 && <span className="mr-3 text-neutral-300">/</span>}
                {item}
              </span>
            ))}
          </p>

          <h1 className="mt-6 font-[family-name:var(--font-manrope)] text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            {notesHero.headline}
          </h1>

          <p className="mt-6 text-sm text-neutral-400">{notesHero.date}</p>

          <dl className="mt-6 grid grid-cols-1 gap-6 border-t border-black/[0.08] pt-8 text-left sm:grid-cols-3">
            {notesHero.meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-medium tracking-wide text-neutral-400 uppercase">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-neutral-700">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Intro */}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {intro.heading}
          </h2>
          <div className="mt-6 space-y-4">
            {intro.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-neutral-700">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* What Is Surrogacy? */}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {surrogacyOverview.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-700">
            {surrogacyOverview.intro}
          </p>
          <ul className="mt-4 space-y-2">
            {surrogacyOverview.facts.map((fact, i) => (
              <li key={i} className="text-base leading-relaxed text-neutral-700">
                <span className="font-semibold text-neutral-900">{fact.label}</span> {fact.body}
              </li>
            ))}
          </ul>

          <div className="relative mt-8 aspect-[2200/1462] w-full overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src={surrogacyOverview.image}
              alt={surrogacyOverview.imageAlt}
              width={surrogacyOverview.imageWidth}
              height={surrogacyOverview.imageHeight}
              className="h-full w-full object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
            />
          </div>
        </section>

        {/* Who Holds the Power */}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {stakeholderMap.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-700">
            {stakeholderMap.intro}
          </p>
          <ul className="mt-4 space-y-2">
            {stakeholderMap.stakeholders.map((s, i) => (
              <li key={i} className="text-base leading-relaxed text-neutral-700">
                <span className="font-semibold text-neutral-900">{s.label}</span> {s.body}
              </li>
            ))}
          </ul>
        </section>

        {/* The Hidden Frictions */}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {problemsHeading.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-700">
            {problemsHeading.intro}
          </p>
        </section>

        {/* Problem sections */}
        {problems.map((problem) => (
          <section key={problem.slug} className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
            <h3 className="font-[family-name:var(--font-manrope)] text-xl font-semibold text-neutral-900 sm:text-2xl">
              {problem.number}. {problem.title}
            </h3>

            <p className="mt-6 text-sm font-medium tracking-wide text-neutral-400 uppercase">
              Pain Points
            </p>
            <ul className="mt-3 space-y-2">
              {problem.painPoints.map((point, i) => (
                <li key={i} className="text-base leading-relaxed text-neutral-700">
                  {point}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm font-medium tracking-wide text-neutral-400 uppercase">
              Strategic Design Interventions
            </p>
            <ul className="mt-3 space-y-2">
              {problem.interventions.map((item, i) => (
                <li key={i} className="text-base leading-relaxed text-neutral-700">
                  <span className="font-semibold text-neutral-900">{item.label}</span>{" "}
                  {item.body}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-neutral-500 italic">
              {problem.storyNote}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {problem.gallery.images.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-100"
                >
                  <Image
                    src={src}
                    alt={`${problem.gallery.imageAlt} ${i + 1}`}
                    width={1920}
                    height={1080}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Platform concept */}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {platformConcept.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-700">
            {platformConcept.intro}
          </p>
          <p className="mt-6 text-sm font-medium tracking-wide text-neutral-400 uppercase">
            {platformConcept.capabilitiesLabel}
          </p>
          <ul className="mt-3 space-y-2">
            {platformConcept.capabilities.map((item, i) => (
              <li key={i} className="text-base leading-relaxed text-neutral-700">
                <span className="font-semibold text-neutral-900">{item.label}</span> {item.body}
              </li>
            ))}
          </ul>
        </section>

        {/* Closing reflection */}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {closingReflection.heading}
          </h2>
          <div className="mt-4 space-y-4">
            {closingReflection.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-neutral-700">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mx-auto max-w-3xl px-6 py-16 text-center sm:px-10 sm:py-24">
          <div className="rounded-2xl border border-black/[0.08] px-8 py-12 sm:px-16">
            <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              {closingCta.heading}
            </h2>
            <p className="mt-3 text-base text-neutral-500">{closingCta.subtext}</p>
            <Link
              href={closingCta.href}
              className="mt-8 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
            >
              {closingCta.buttonLabel}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
