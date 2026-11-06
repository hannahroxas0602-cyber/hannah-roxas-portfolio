import type { Metadata } from "next";
import { caseStudyTitle, pageMetadata } from "@/app/data/seo";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import HoleLink from "@/app/components/HoleLink";
import Footer from "@/app/components/Footer";
import DemoVideo from "@/app/components/DemoVideo";
import CaseStudyTldr from "@/app/components/CaseStudyTldr";
import CaseStudyRoleImpact from "@/app/components/CaseStudyRoleImpact";
import CaseStudyNav from "@/app/components/CaseStudyNav";
import CaseStudyHighlights from "@/app/components/CaseStudyHighlights";
import CaseStudyMilestones from "@/app/components/CaseStudyMilestones";
import NextProjectPreview from "@/app/components/NextProjectPreview";
import { filled } from "@/app/data/placeholder";
import { readingMinutes } from "@/app/data/readingTime";
import ReadingTime from "@/app/components/ReadingTime";
import {
  continuumHero,
  tldr,
  highlightsSection,
  timelineSection,
  roleAndImpact,
  problemSection,
  decisionsSection,
  stakeholdersSection,
  redesignSection,
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
  { id: "redesign", title: "The Redesign" },
  { id: "design-system", title: "Design System" },
  { id: "next-steps", title: "What's Next" },
];

export const metadata: Metadata = pageMetadata({
  title: caseStudyTitle("Continuum: Surrogacy Platform"),
  description: continuumHero.subtitle,
  path: "/continuum",
  ogTitle: "Continuum: designing surrogacy care after pregnancy confirmation",
  ogDescription:
    "Team research, solo design. One shared timeline and quiet check-ins that keep surrogates, intended parents, and coordinators in sync.",
});

const minutesToRead = readingMinutes(
  continuumHero,
  tldr,
  highlightsSection,
  timelineSection,
  roleAndImpact,
  problemSection,
  decisionsSection,
  stakeholdersSection,
  redesignSection,
  designSystemSection,
  nextStepsSection,
);

// Full class strings so Tailwind can see them; keyed by how many items render.
const metaGridCols: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export default function ContinuumPage() {
  const meta = continuumHero.meta.flatMap((item) =>
    filled(item.value) ? [{ label: item.label, value: item.value }] : [],
  );

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Header />
      <main className="flex w-full max-w-[100rem] flex-1 flex-col gap-12 px-6 sm:px-8 md:flex-row">
        <CaseStudyNav sections={sections} />

        <div className="mx-auto min-w-0 w-full max-w-5xl flex-1 [&>*]:max-w-none">
          {/* Hero / Overview */}
          <section id="overview" className="max-w-4xl pt-16 pb-8 sm:pt-24">
            <HoleLink direction="out"
              href="/"
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
            >
              ← Back to home
            </HoleLink>

            <h1 data-vt-target className="mt-8 font-display text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl">
              {continuumHero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-neutral-700">
              {continuumHero.subtitle}
            </p>

            {/* The picture comes first, so the page opens on the work. */}
            <div className="relative mt-10 mb-2 aspect-[1600/738] w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-neutral-100">
              <Image
                src="/images/continuum/welcome-screen-mockup.png"
                alt="Continuum's welcome screen: three roles to choose from, a support summary and a daily inspiration card"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 1024px, 100vw"
              />
            </div>

            <CaseStudyTldr tldr={tldr} />

            <p className="mt-8 text-sm text-neutral-400">
              {continuumHero.date} · <ReadingTime minutes={minutesToRead} />
            </p>

            <div className="mt-10 grid grid-cols-1 gap-10 border-t border-black/[0.08] pt-10 sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-medium tracking-wide text-neutral-400 uppercase">
                  Project Overview
                </h2>
                <p className="mt-3 text-base leading-relaxed text-neutral-700">
                  {continuumHero.gist.text}
                </p>
              </div>
              <div className="sm:border-l sm:border-black/[0.08] sm:pl-10">
                <h2 className="text-sm font-medium tracking-wide text-neutral-400 uppercase">
                  My Role
                </h2>
                <p className="mt-3 text-base leading-relaxed text-neutral-700">
                  {continuumHero.myRole}
                </p>
              </div>
            </div>

            <dl
              className={`mt-10 grid grid-cols-1 gap-6 border-t border-black/[0.08] pt-8 ${metaGridCols[meta.length]}`}
            >
              {meta.map((item) => (
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
          <CaseStudyMilestones heading={timelineSection.heading} items={timelineSection.items} intro={timelineSection.intro} />

          <CaseStudyRoleImpact heading={roleAndImpact.heading} columns={roleAndImpact.columns} />

          {/* The Problem */}
          <section id="problem" className="max-w-4xl py-16">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {problemSection.heading}
          </h2>

          <div className="relative mt-8 aspect-[2098/1120] w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-neutral-100 shadow-soft">
            <DemoVideo
              src={problemSection.image}
              alt={problemSection.imageAlt}
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
          <h2 className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
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
                <h3 className="font-display text-xl font-semibold">
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
          <h2 className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
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
                    <DemoVideo
                      src={s.demoVideo}
                      alt={s.demoVideoAlt}
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
                  <h3 className="mt-3 font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
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

        {/* The redesign (autumn 2026): showcase pictures of the current prototype */}
        <section id="redesign" className="max-w-5xl scroll-mt-28 py-16 sm:py-20">
          <p className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
            <span aria-hidden className="size-1.5 rounded-full bg-accent-deep" />
            {redesignSection.kicker}
          </p>
          <h2 className="font-display mt-4 text-3xl font-semibold text-neutral-950 sm:text-4xl">
            {redesignSection.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-500">{redesignSection.intro}</p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-black/[0.06] bg-neutral-100 shadow-soft">
            <Image
              src={redesignSection.heroImage}
              alt={redesignSection.heroAlt}
              width={redesignSection.heroWidth}
              height={redesignSection.heroHeight}
              className="h-auto w-full"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {redesignSection.caveats.map((c) => (
              <li key={c} className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs leading-snug text-neutral-600">
                {c}
              </li>
            ))}
          </ul>

          {filled(redesignSection.prototypeUrl) && (
            <a
              href={redesignSection.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-medium text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-600"
            >
              {redesignSection.prototypeLabel} ↗
            </a>
          )}

          <div className="mt-16 space-y-16 sm:space-y-20">
            {redesignSection.shots.map((shot, i) => (
              <figure key={shot.slug} id={shot.slug} className="scroll-mt-28">
                <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-neutral-100 shadow-soft">
                  <Image
                    src={shot.image}
                    alt={shot.alt}
                    width={2400}
                    height={1350}
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 1024px, 100vw"
                  />
                </div>
                <figcaption className="mt-6 grid gap-4 sm:grid-cols-[3rem_1fr] sm:gap-x-6">
                  <span className="font-mono text-xs font-medium tracking-widest text-neutral-400 uppercase sm:pt-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="max-w-2xl">
                    <h3 className="font-display text-xl font-semibold text-neutral-900 sm:text-2xl">{shot.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-neutral-700">{shot.body}</p>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                      <span className="font-semibold text-neutral-700">Why: </span>
                      {shot.why}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Design System */}
        <section id="design-system" className="max-w-4xl py-16">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
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
            <DemoVideo
              src={designSystemSection.image}
              alt={designSystemSection.imageAlt}
              sizes="448px"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* What I'd Do Next */}
        <section id="next-steps" className="max-w-4xl py-16">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
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
