import type { Metadata } from "next";
import { caseStudyTitle, pageMetadata } from "@/app/data/seo";
import Image from "next/image";
import Link from "next/link";
import ContinuumProblem from "@/app/continuum/ContinuumProblem";
import ContinuumHero from "@/app/continuum/ContinuumHero";
import Header from "@/app/components/Header";
import HoleLink from "@/app/components/HoleLink";
import Footer from "@/app/components/Footer";
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
  designSystemSection,
  prototypeNote,
  heroLook,
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

function Look({ children }: { children: string }) {
  const [lead, rest] = children.startsWith("Look at:") ? ["Look at:", children.slice(8)] : ["", children];
  return (
    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-500">
      {lead && <span className="font-mono text-xs font-medium tracking-wide text-neutral-900 uppercase">Look at </span>}
      {rest}
    </p>
  );
}

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

            {/* The picture comes first, so the page opens on the work: one phone, with the pieces of the system around it. */}
            <div className="mt-10 mb-2">
              <ContinuumHero />
              <Look>{heroLook}</Look>
            </div>
            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-neutral-400">
              {prototypeNote.text}
              {filled(prototypeNote.url) && (
                <>
                  {" "}
                  <a href={prototypeNote.url} target="_blank" rel="noopener noreferrer" className="font-medium text-neutral-600 underline underline-offset-4">
                    {prototypeNote.label} ↗
                  </a>
                </>
              )}
            </p>

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
          <section id="problem" className="max-w-5xl py-16">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {problemSection.heading}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-700">{problemSection.paragraphs[0]}</p>

          <div className="mt-8">
            <ContinuumProblem />
            <Look>{problemSection.look}</Look>
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
            {problemSection.paragraphs.slice(1).map((p, i) => (
              <p key={i} className="max-w-2xl text-base leading-relaxed text-neutral-700">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* 3 Critical Design Decisions */}
        <section id="decisions" className="max-w-5xl py-16">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {decisionsSection.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-500">
            {decisionsSection.intro}
          </p>

          <div className="mt-10 space-y-8">
            {decisionsSection.decisions.map((decision) => (
              <div key={decision.slug} className="flex flex-col gap-3">
                <div>
                  <Image
                    src={decision.image}
                    alt={decision.imageAlt}
                    width={2400}
                    height={1600}
                    unoptimized
                    className="h-auto w-full mix-blend-multiply"
                    sizes="(min-width: 1024px) 1024px, 100vw"
                  />
                  <Look>{decision.look}</Look>
                </div>
                <div className="rounded-2xl bg-neutral-900 p-8 text-white sm:p-10">
                  <h3 className="font-display text-xl font-semibold">{decision.title}</h3>
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
              <div key={s.slug}>
                <div>
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    width={2400}
                    height={1166}
                    unoptimized
                    className="h-auto w-full mix-blend-multiply"
                    sizes="(min-width: 1024px) 1024px, 100vw"
                  />
                  <Look>{s.look}</Look>
                </div>
                <div className="mt-8 grid items-start gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] sm:gap-12">
                  <div>
                    <span className="font-mono text-xs font-medium tracking-widest text-neutral-400 uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">{s.name}</h3>
                    <p className="mt-2 text-sm font-medium text-neutral-500">Core need: {s.coreNeed}</p>
                  </div>
                  <ul className="space-y-3 text-base leading-relaxed text-neutral-600 sm:pt-[2.15rem]">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-[0.7rem] h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
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
        <section id="design-system" className="max-w-5xl py-16">
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

          <div className="mt-10 space-y-6">
            {designSystemSection.images.map((img) => (
              <div key={img.src}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={designSystemSection.imageWidth}
                  height={designSystemSection.imageHeight}
                  unoptimized
                  className="h-auto w-full mix-blend-multiply"
                  sizes="(min-width: 1024px) 1024px, 100vw"
                />
                <Look>{img.look}</Look>
              </div>
            ))}
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
