import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CaseStudyNav from "@/app/components/CaseStudyNav";
import CaseStudyHighlights from "@/app/components/CaseStudyHighlights";
import CaseStudyTimeline from "@/app/components/CaseStudyTimeline";
import NextProjectPreview from "@/app/components/NextProjectPreview";
import {
  goodHero,
  highlightsSection,
  timelineSection,
  roleAndImpact,
  problemSection,
  researchGallery,
  designGoal,
  designSolutions,
  designDecisions,
  nextStepsSection,
  nextProject,
} from "@/app/page/good/data";

const sections = [
  { id: "overview", title: "Overview" },
  { id: "highlights", title: "Highlights" },
  { id: "timeline", title: "Timeline" },
  { id: "role-impact", title: "My Role & Impact" },
  { id: "problem", title: "The Problem" },
  { id: "research", title: "Research" },
  { id: "design-goal", title: "Design Goal" },
  { id: "design-solutions", title: "Design Solutions" },
  { id: "design-decisions", title: "Design Decisions" },
  { id: "next-steps", title: "What's Next" },
];

export const metadata: Metadata = {
  title: "Good Friends Poke — Hannah Roxas",
  description: goodHero.subtitle,
};

export default function GoodFriendsPage() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 gap-12 px-6 sm:px-10">
        <CaseStudyNav sections={sections} />

        <div className="min-w-0 flex-1">
        {/* Hero */}
        <section id="overview" className="max-w-4xl pt-16 pb-8 sm:pt-24">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            ← Back to home
          </Link>

          <h1 className="mt-8 font-[family-name:var(--font-manrope)] text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl">
            {goodHero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-neutral-700">
            {goodHero.subtitle}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-500">
            <span className="font-medium text-neutral-900">{goodHero.gist.label}</span>{" "}
            {goodHero.gist.text}
          </p>

          <p className="mt-8 text-sm text-neutral-400">{goodHero.date}</p>

          <dl className="mt-6 grid grid-cols-1 gap-6 border-t border-black/[0.08] pt-8 sm:grid-cols-3">
            {goodHero.meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-medium tracking-wide text-neutral-400 uppercase">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-neutral-700">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="relative mt-10 aspect-[1086/1246] w-full max-w-md overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src={goodHero.image}
              alt={goodHero.imageAlt}
              width={goodHero.imageWidth}
              height={goodHero.imageHeight}
              priority
              className="h-full w-full object-cover"
              sizes="(min-width: 640px) 448px, 100vw"
            />
          </div>
        </section>

        <div className="max-w-4xl">
          <CaseStudyHighlights
            heading={highlightsSection.heading}
            mockup={highlightsSection.mockup}
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
        <section id="problem" className="max-w-4xl py-16">
          <p className="font-mono text-sm text-neutral-500">{problemSection.flow}</p>

          <div className="mt-6 space-y-4">
            {problemSection.paragraphs.map((p, i) => (
              <p key={i} className="max-w-2xl text-base leading-relaxed text-neutral-700">
                {p}
              </p>
            ))}
          </div>

          <h2 className="mt-10 font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {problemSection.heading}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-700">
            <span className="font-semibold text-neutral-900">How I got insights: </span>
            {problemSection.insights.howWeGotInsights}
          </p>

          <ul className="mt-4 space-y-3">
            {problemSection.insights.items.map((item, i) => (
              <li key={i} className="max-w-2xl text-base leading-relaxed text-neutral-700">
                <span className="font-semibold text-neutral-900">{item.label} </span>
                {item.body}
              </li>
            ))}
          </ul>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-700">
            <span className="font-semibold text-neutral-900">Deliverables: </span>
            {problemSection.insights.deliverables}
          </p>
        </section>

        {/* Research gallery */}
        <section id="research" className="max-w-6xl py-16">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {researchGallery.heading}
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {researchGallery.images.map((src, i) => (
              <div
                key={src}
                className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-100"
              >
                <Image
                  src={src}
                  alt={`${researchGallery.imageAlt} ${i + 1}`}
                  width={researchGallery.imageWidth}
                  height={researchGallery.imageHeight}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Design Goal */}
        <section id="design-goal" className="max-w-4xl py-16">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {designGoal.heading}
          </h2>

          <ul className="mt-6 space-y-2">
            {designGoal.items.map((item, i) => (
              <li key={i} className="flex gap-2 text-base leading-relaxed text-neutral-700">
                <span className="text-neutral-300">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="relative mt-8 aspect-[9388/11623] w-full max-w-sm overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src={designGoal.image}
              alt={designGoal.imageAlt}
              width={designGoal.imageWidth}
              height={designGoal.imageHeight}
              className="h-full w-full object-contain"
              sizes="(min-width: 640px) 384px, 100vw"
            />
          </div>
        </section>

        {/* Design Solutions */}
        <section id="design-solutions" className="max-w-4xl py-16">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {designSolutions.heading}
          </h2>

          <div className="mt-10 space-y-14">
            {designSolutions.categories.map((cat) => (
              <div key={cat.slug}>
                <h3 className="font-[family-name:var(--font-manrope)] text-xl font-semibold text-neutral-900">
                  {cat.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {cat.items.map((item, i) => (
                    <li key={i} className="max-w-2xl text-base leading-relaxed text-neutral-700">
                      <span className="font-semibold text-neutral-900">{item.label} </span>
                      {item.body}
                    </li>
                  ))}
                </ul>
                <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-neutral-100">
                  <Image
                    src={cat.image}
                    alt={cat.imageAlt}
                    width={cat.imageWidth}
                    height={cat.imageHeight}
                    className="h-full w-full object-contain"
                    sizes="(min-width: 1024px) 60vw, 100vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Design Decisions & Interactions */}
        <section id="design-decisions" className="max-w-4xl py-16">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {designDecisions.heading}
          </h2>

          <ul className="mt-6 space-y-3">
            {designDecisions.needs.map((item, i) => (
              <li key={i} className="max-w-2xl text-base leading-relaxed text-neutral-700">
                <span className="font-semibold text-neutral-900">{item.label} </span>
                {item.body}
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-700">
            {designDecisions.bridgeIntro}
          </p>

          <h3 className="mt-8 font-[family-name:var(--font-manrope)] text-xl font-semibold text-neutral-900">
            {designDecisions.touchpointsHeading}
          </h3>

          <ul className="mt-4 space-y-3">
            {designDecisions.touchpoints.map((item, i) => (
              <li key={i} className="max-w-2xl text-base leading-relaxed text-neutral-700">
                <span className="font-semibold text-neutral-900">{item.label} </span>
                {item.body}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {designDecisions.images.map((img) => (
              <div
                key={img.src}
                className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-100"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        </section>

        {/* What I'd Do Next */}
        <section id="next-steps" className="max-w-4xl py-16">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {nextStepsSection.heading}
          </h2>

          <ul className="mt-8 space-y-4">
            {nextStepsSection.items.map((item, i) => (
              <li key={i} className="max-w-2xl text-base leading-relaxed text-neutral-700">
                <span className="font-semibold text-neutral-900">{item.title} </span>
                {item.body}
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
