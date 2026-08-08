import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {
  continuumHero,
  roleAndImpact,
  problemSection,
  decisionsSection,
  stakeholdersSection,
  designSystemSection,
  nextStepsSection,
  nextProject,
} from "@/app/continuum/continuum/data";

export const metadata: Metadata = {
  title: "Continuum: Surrogacy Platform — Hannah Roxas",
  description: continuumHero.subtitle,
};

export default function ContinuumPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-6 pt-16 pb-8 sm:px-10 sm:pt-24">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            ← Back to home
          </Link>

          <h1 className="mt-8 font-[family-name:var(--font-manrope)] text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl">
            {continuumHero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-neutral-700">
            {continuumHero.subtitle}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-500">
            <span className="font-medium text-neutral-900">{continuumHero.gist.label}</span>{" "}
            {continuumHero.gist.text}
          </p>

          <p className="mt-8 text-sm text-neutral-400">{continuumHero.date}</p>

          <dl className="mt-6 grid grid-cols-1 gap-6 border-t border-black/[0.08] pt-8 sm:grid-cols-3">
            {continuumHero.meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-medium tracking-wide text-neutral-400 uppercase">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-neutral-700">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* My Role & Impact */}
        <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {roleAndImpact.heading}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {roleAndImpact.columns.map((col) => (
              <div key={col.label}>
                <h3 className="text-sm font-medium tracking-wide text-neutral-400 uppercase">
                  {col.label}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-700">{col.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Problem */}
        <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {problemSection.heading}
          </h2>

          <div className="relative mt-8 aspect-[2098/1120] w-full overflow-hidden rounded-2xl bg-neutral-100">
            <video
              src={problemSection.image}
              aria-label={problemSection.imageAlt}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>

          <p className="mt-8 font-mono text-sm text-neutral-500">{problemSection.flow}</p>

          <div className="mt-6 space-y-4">
            {problemSection.paragraphs.map((p, i) => (
              <p key={i} className="max-w-2xl text-base leading-relaxed text-neutral-700">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* 3 Critical Design Decisions */}
        <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {decisionsSection.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-500">
            {decisionsSection.intro}
          </p>

          <div className="mt-10 space-y-6">
            {decisionsSection.decisions.map((decision) => (
              <div
                key={decision.slug}
                className="rounded-2xl bg-neutral-900 p-8 text-white sm:p-10"
              >
                <h3 className="font-[family-name:var(--font-manrope)] text-xl font-semibold">
                  {decision.title}
                </h3>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-neutral-300">
                  <li>
                    <span className="font-semibold text-white">The Anxiety: </span>
                    {decision.anxiety}
                  </li>
                  <li>
                    <span className="font-semibold text-white">The UI Fix: </span>
                    {decision.fix}
                  </li>
                  <li>
                    <span className="font-semibold text-white">The Tradeoff: </span>
                    {decision.tradeoff}
                  </li>
                </ul>
              </div>
            ))}
          </div>

          <Link
            href={decisionsSection.researchLinkHref}
            className="mt-8 inline-block text-sm font-medium text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-600"
          >
            {decisionsSection.researchLinkLabel}
          </Link>
        </section>

        {/* Designing for Multiple Stakeholders */}
        <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {stakeholdersSection.heading}
          </h2>

          <div className="relative mt-8 aspect-[1536/1024] w-full overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src={stakeholdersSection.image}
              alt={stakeholdersSection.imageAlt}
              width={stakeholdersSection.imageWidth}
              height={stakeholdersSection.imageHeight}
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stakeholdersSection.stakeholders.map((s) => (
              <div key={s.slug}>
                <h3 className="font-[family-name:var(--font-manrope)] text-lg font-semibold text-neutral-900">
                  {s.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-neutral-500">
                  Core need: {s.coreNeed}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-600">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-neutral-300">·</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Design System */}
        <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {designSystemSection.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-500">
            {designSystemSection.intro}
          </p>

          <ul className="mt-8 space-y-4">
            {designSystemSection.principles.map((p, i) => (
              <li key={i} className="text-base leading-relaxed text-neutral-700">
                <span className="font-semibold text-neutral-900">{p.title}</span> {p.body}
              </li>
            ))}
          </ul>

          <div className="relative mt-10 aspect-[1852/898] w-full overflow-hidden rounded-2xl bg-neutral-100">
            <video
              src={designSystemSection.image}
              aria-label={designSystemSection.imageAlt}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* What I'd Do Next */}
        <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {nextStepsSection.heading}
          </h2>

          <ul className="mt-8 space-y-4">
            {nextStepsSection.items.map((item, i) => (
              <li key={i} className="text-base leading-relaxed text-neutral-700">
                <span className="font-semibold text-neutral-900">{item.title}</span> {item.body}
              </li>
            ))}
          </ul>

          <div className="relative mt-10 aspect-[908/902] w-full max-w-md overflow-hidden rounded-2xl bg-neutral-100">
            <video
              src={nextStepsSection.image}
              aria-label={nextStepsSection.imageAlt}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
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
