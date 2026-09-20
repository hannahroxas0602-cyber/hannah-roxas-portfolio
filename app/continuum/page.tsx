import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CaseStudyNav from "@/app/components/CaseStudyNav";
import CaseStudyHighlights from "@/app/components/CaseStudyHighlights";
import CaseStudyTimeline from "@/app/components/CaseStudyTimeline";
import NextProjectPreview from "@/app/components/NextProjectPreview";
import {
  continuumHero,
  highlightsSection,
  timelineSection,
  roleAndImpact,
  problemSection,
  decisionsSection,
  stakeholdersSection,
  designSystemSection,
  nextStepsSection,
  nextProject,
} from "@/app/continuum/data";

const sections = [
  { id: "overview", title: "Overview" },
  { id: "highlights", title: "Highlights" },
  { id: "timeline", title: "Timeline" },
  { id: "role-impact", title: "My Role & Impact" },
  { id: "problem", title: "The Problem" },
  { id: "decisions", title: "Design Decisions" },
  { id: "stakeholders", title: "Stakeholders" },
  { id: "design-system", title: "Design System" },
  { id: "next-steps", title: "What's Next" },
];

export const metadata: Metadata = {
  title: "Continuum: Surrogacy Platform | Hannah Roxas",
  description: continuumHero.subtitle,
};

export default function ContinuumPage() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 sm:px-10 md:flex-row">
        <CaseStudyNav sections={sections} />

        <div className="min-w-0 flex-1">
          {/* Hero / Overview */}
          <section id="overview" className="max-w-4xl pt-16 pb-8 sm:pt-24">
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

            <p className="mt-8 text-sm text-neutral-400">{continuumHero.date}</p>

            <div className="mt-10 grid grid-cols-1 gap-10 border-t border-black/[0.08] pt-10 sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-medium tracking-wide text-neutral-400 uppercase">
                  Project Overview
                </h2>
                <p className="mt-3 text-base leading-relaxed text-neutral-700">
                  {continuumHero.gist.text}
                </p>
              </div>
              <div className="border-l border-black/[0.08] pl-10">
                <h2 className="text-sm font-medium tracking-wide text-neutral-400 uppercase">
                  My Role
                </h2>
                <p className="mt-3 text-base leading-relaxed text-neutral-700">
                  {roleAndImpact.columns[2]?.body}
                </p>
              </div>
            </div>

            <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-black/[0.08] pt-8 sm:grid-cols-3">
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

          <div className="max-w-4xl">
            <CaseStudyHighlights
              heading={highlightsSection.heading}
              outcomes={highlightsSection.outcomes}
              stats={highlightsSection.stats}
              callout={highlightsSection.callout}
            />
          </div>

          <div className="max-w-4xl">
            <CaseStudyTimeline
              heading={timelineSection.heading}
              totalWeeks={timelineSection.totalWeeks}
              bands={timelineSection.bands}
              tasks={timelineSection.tasks}
            />
          </div>

          {/* My Role & Impact */}
          <section id="role-impact" className="max-w-4xl py-16">
            <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
              {roleAndImpact.heading}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {roleAndImpact.columns.map((col, i) => (
                <div
                  key={col.label}
                  className={`rounded-2xl border p-6 ${
                    i === 2
                      ? "border-black/[0.06] bg-neutral-900"
                      : "border-black/[0.06] bg-white shadow-soft"
                  }`}
                >
                  <h3
                    className={`text-xs font-semibold tracking-widest uppercase ${
                      i === 2 ? "text-white/50" : "text-neutral-400"
                    }`}
                  >
                    {col.label}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      i === 2 ? "text-white/85" : "text-neutral-700"
                    }`}
                  >
                    {col.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* The Problem */}
          <section id="problem" className="max-w-4xl py-16">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {problemSection.heading}
          </h2>

          <div className="relative mt-8 aspect-[2098/1120] w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-neutral-100 shadow-soft">
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

          <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-black/[0.06] bg-neutral-50 px-4 py-3 font-mono text-xs text-neutral-500 sm:text-sm">
            {problemSection.flow.split("--->").map((step, i, arr) => (
              <span key={i} className="flex items-center gap-2">
                <span className="rounded-md bg-white px-2 py-1 text-neutral-700 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
                  {step.trim()}
                </span>
                {i < arr.length - 1 && (
                  <span aria-hidden className="text-neutral-300">
                    →
                  </span>
                )}
              </span>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {problemSection.paragraphs.map((p, i) => (
              <p key={i} className="max-w-2xl text-base leading-relaxed text-neutral-700">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* 3 Critical Design Decisions */}
        <section id="decisions" className="max-w-4xl py-16">
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
        <section id="stakeholders" className="max-w-6xl py-16">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {stakeholdersSection.heading}
          </h2>

          <div className="mt-12 space-y-16 sm:space-y-20">
            {stakeholdersSection.stakeholders.map((s, i) => (
              <div
                key={s.slug}
                className={`flex flex-col items-center gap-8 sm:gap-12 lg:gap-16 ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <div className="relative aspect-[2068/1002] w-full overflow-hidden rounded-2xl bg-neutral-100 lg:w-3/5">
                  {s.demoVideo ? (
                    <video
                      src={s.demoVideo}
                      aria-label={s.demoVideoAlt}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
                      Coming soon
                    </div>
                  )}
                </div>

                <div className="w-full lg:w-2/5">
                  <span className="font-mono text-xs font-medium tracking-widest text-neutral-400 uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-neutral-500">
                    Core need: {s.coreNeed}
                  </p>
                  <ul className="mt-6 space-y-3 text-base leading-relaxed text-neutral-600">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-neutral-300" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Design System */}
        <section id="design-system" className="max-w-4xl py-16">
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

          <div className="relative mt-10 aspect-[908/902] w-full max-w-md overflow-hidden rounded-2xl bg-neutral-100">
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
        <section id="next-steps" className="max-w-4xl py-16">
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
        </section>

        <NextProjectPreview {...nextProject} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
