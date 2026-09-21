import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CaseStudyNav from "@/app/components/CaseStudyNav";
import CaseStudyHighlights from "@/app/components/CaseStudyHighlights";
import NextProjectPreview from "@/app/components/NextProjectPreview";
import {
  learvoHero,
  highlightsSection,
  timelineSection,
  roleAndImpact,
  featuresSection,
  brandIdentitySection,
  nextStepsSection,
  nextProject,
} from "@/app/learvo/data";

const sections = [
  { id: "overview", title: "Overview" },
  { id: "highlights", title: "Highlights" },
  { id: "timeline", title: "Timeline" },
  { id: "role-impact", title: "My Role & Impact" },
  {
    id: "what-i-shipped",
    title: "What I Shipped",
    children: [
      { id: "landing-page", title: "Landing Page Redesign" },
      { id: "onboarding-checklist", title: "Onboarding Checklist" },
      { id: "top-nav", title: "Top Nav" },
      { id: "onboarding-quiz-flow", title: "Onboarding Quiz Flow" },
    ],
  },
  { id: "brand-identity", title: "Brand Identity" },
  { id: "next-steps", title: "What's Next" },
];

export const metadata: Metadata = {
  title: "Learvo | Hannah Roxas",
  description: learvoHero.subtitle,
};

function PlaceholderImage({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-neutral-100">
      <span className="text-xs font-medium tracking-wide text-neutral-400 uppercase">
        [Image placeholder: {label}]
      </span>
    </div>
  );
}

export default function LearvoPage() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 sm:px-10 md:flex-row">
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
            {learvoHero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-neutral-700">
            {learvoHero.subtitle}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-500">
            <span className="font-medium text-neutral-900">{learvoHero.gist.label}</span>{" "}
            {learvoHero.gist.text}
          </p>

          <p className="mt-8 text-sm text-neutral-400">{learvoHero.date}</p>

          <dl className="mt-6 grid grid-cols-1 gap-6 border-t border-black/[0.08] pt-8 sm:grid-cols-3">
            {learvoHero.meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-medium tracking-wide text-neutral-400 uppercase">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-neutral-700">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div
            className="relative mt-10 w-full overflow-hidden rounded-2xl bg-neutral-100"
            style={{ aspectRatio: `${learvoHero.imageWidth}/${learvoHero.imageHeight}` }}
          >
            {learvoHero.isPlaceholder ? (
              <PlaceholderImage label="Hero" />
            ) : (
              <Image
                src={learvoHero.image}
                alt={learvoHero.imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 896px, 100vw"
              />
            )}
          </div>
        </section>

        <div className="max-w-4xl">
          <CaseStudyHighlights
            heading={highlightsSection.heading}
            outcomes={highlightsSection.outcomes}
            stats={highlightsSection.stats}
            callout={highlightsSection.callout}
          />
        </div>

        {/* Timeline */}
        <section id="timeline" className="max-w-4xl py-16">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {timelineSection.heading}
          </h2>

          <ol className="mt-8 space-y-6 border-l border-black/[0.08] pl-6">
            {timelineSection.items.map((item) => (
              <li key={item.slug} id={item.slug} className="relative scroll-mt-28">
                <span className="absolute top-1.5 -left-[29px] h-2 w-2 rounded-full bg-neutral-300" />
                <p className="text-xs font-medium tracking-wide text-neutral-400 uppercase">
                  {item.date}
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-manrope)] text-lg font-semibold text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-1 max-w-2xl text-base leading-relaxed text-neutral-700">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* My Role & Impact */}
        <section id="role-impact" className="max-w-4xl py-16">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {roleAndImpact.heading}
          </h2>
          <div className="mt-8 grid grid-cols-1 items-start gap-3 sm:grid-cols-3">
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

        {/* What I Shipped */}
        <section id="what-i-shipped" className="max-w-4xl py-16">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {featuresSection.heading}
          </h2>

          <div className="mt-10 space-y-16">
            {featuresSection.categories
              .filter((cat) => !cat.isHidden)
              .map((cat) => (
              <div
                key={cat.slug}
                id={cat.slug}
                className="scroll-mt-28 border-t border-black/[0.06] pt-12 first:border-t-0 first:pt-0"
              >
                <h3 className="font-[family-name:var(--font-manrope)] text-xl font-semibold text-neutral-900">
                  {cat.title}
                </h3>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-700">
                  <span className="font-semibold text-neutral-900">Problem: </span>
                  {cat.problem}
                </p>

                <div className="mt-6 max-w-2xl rounded-2xl border border-black/[0.06] bg-neutral-900 p-6">
                  <h4 className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                    The Call
                  </h4>
                  <p className="mt-3 text-base leading-relaxed text-white/90">{cat.decision}</p>
                </div>

                <ul className="mt-6 space-y-3">
                  {cat.supportingPoints.map((item, i) => (
                    <li key={i} className="max-w-2xl text-base leading-relaxed text-neutral-700">
                      <span className="font-semibold text-neutral-900">{item.label} </span>
                      {item.body}
                    </li>
                  ))}
                </ul>

                {cat.video ? (
                  <div
                    className="relative mt-6 w-full overflow-hidden rounded-2xl bg-neutral-900"
                    style={{ aspectRatio: `${cat.video.width}/${cat.video.height}` }}
                  >
                    <video
                      src={cat.video.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="relative mt-6 w-full overflow-hidden rounded-2xl"
                    style={{ aspectRatio: `${cat.imageWidth}/${cat.imageHeight}` }}
                  >
                    {cat.isPlaceholder ? (
                      <PlaceholderImage label={cat.title} />
                    ) : (
                      <Image
                        src={cat.image}
                        alt={cat.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 60vw, 100vw"
                      />
                    )}
                  </div>
                )}

                {cat.slides && (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {cat.slides.map((slide) => {
                      const isWide = slide.width / slide.height >= 3;
                      return (
                        <div
                          key={slide.src}
                          className={`relative w-full overflow-hidden rounded-xl border border-black/[0.06] bg-neutral-50 ${
                            isWide ? "sm:col-span-2" : ""
                          }`}
                          style={{ aspectRatio: `${slide.width}/${slide.height}` }}
                        >
                          <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            className="object-contain"
                            sizes={isWide ? "100vw" : "(min-width: 640px) 45vw, 100vw"}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                <p className="mt-6 max-w-2xl rounded-2xl border border-black/[0.06] bg-neutral-50 p-5 text-base leading-relaxed text-neutral-700">
                  <span className="font-semibold text-neutral-900">Impact: </span>
                  {cat.impact}
                </p>

                {cat.slug === "landing-page" && (
                  <Link
                    href={brandIdentitySection.liveLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-neutral-900"
                  >
                    {brandIdentitySection.liveLink.label}
                    <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Brand Identity */}
        <section id="brand-identity" className="max-w-4xl py-16">
          <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {brandIdentitySection.heading}
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-700">
            <span className="font-semibold text-neutral-900">Problem: </span>
            {brandIdentitySection.problem}
          </p>

          <div className="mt-6 max-w-2xl rounded-2xl border border-black/[0.06] bg-neutral-900 p-6">
            <h4 className="text-xs font-semibold tracking-widest text-white/50 uppercase">
              The Call
            </h4>
            <p className="mt-3 text-base leading-relaxed text-white/90">
              {brandIdentitySection.decision}
            </p>
          </div>

          <div className="mt-10 space-y-10">
            {brandIdentitySection.elements
              .filter((el) => !el.isHidden)
              .map((el) => (
                <div key={el.slug} id={el.slug} className="scroll-mt-28">
                  <div
                    className="relative w-full overflow-hidden rounded-2xl"
                    style={{ aspectRatio: `${el.imageWidth}/${el.imageHeight}` }}
                  >
                    {el.isPlaceholder ? (
                      <PlaceholderImage label={el.title} />
                    ) : (
                      <Image
                        src={el.image}
                        alt={el.imageAlt}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    )}
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-manrope)] text-lg font-semibold text-neutral-900">
                    {el.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-700">{el.body}</p>
                </div>
              ))}
          </div>

          <p className="mt-10 max-w-2xl rounded-2xl border border-black/[0.06] bg-neutral-50 p-5 text-base leading-relaxed text-neutral-700">
            <span className="font-semibold text-neutral-900">Impact: </span>
            {brandIdentitySection.impact}
          </p>
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
