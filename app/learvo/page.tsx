import type { Metadata } from "next";
import { caseStudyTitle, pageMetadata } from "@/app/data/seo";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import HoleLink from "@/app/components/HoleLink";
import Footer from "@/app/components/Footer";
import DemoVideo from "@/app/components/DemoVideo";
import CaseStudyTldr from "@/app/components/CaseStudyTldr";
import CaseStudyMilestones from "@/app/components/CaseStudyMilestones";
import CaseStudyRoleImpact from "@/app/components/CaseStudyRoleImpact";
import Testimonial, { hasTestimonial } from "@/app/components/Testimonial";
import CaseStudyNav from "@/app/components/CaseStudyNav";
import CaseStudyHighlights from "@/app/components/CaseStudyHighlights";
import NextProjectPreview from "@/app/components/NextProjectPreview";
import {
  learvoHero,
  tldr,
  highlightsSection,
  testimonial,
  userResearch,
  timelineSection,
  roleAndImpact,
  featuresSection,
  brandIdentitySection,
  nextStepsSection,
  nextProject,
  type FeatureCategory,
} from "@/app/learvo/data";
import { filled } from "@/app/data/placeholder";
import { publicFileExists } from "@/app/data/publicFile";
import { readingMinutes } from "@/app/data/readingTime";
import ReadingTime from "@/app/components/ReadingTime";

const showTestimonial = hasTestimonial(testimonial);

const researchFindings = userResearch.findings.filter(filled);
const showUserResearch =
  filled(userResearch.method) && researchFindings.length >= 2 && filled(userResearch.changes);

const minutesToRead = readingMinutes(
  learvoHero,
  tldr,
  highlightsSection,
  showTestimonial ? testimonial : null,
  timelineSection,
  roleAndImpact,
  featuresSection,
  brandIdentitySection,
  showUserResearch ? userResearch : null,
  nextStepsSection,
);

function hasBeforeAfter(cat: FeatureCategory) {
  return (
    !!cat.beforeAfter &&
    publicFileExists(cat.beforeAfter.before.src) &&
    publicFileExists(cat.beforeAfter.after.src)
  );
}

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
  ...(showUserResearch ? [{ id: "user-research", title: "What I Learned" }] : []),
  { id: "next-steps", title: "What's Next" },
];

export const metadata: Metadata = pageMetadata({
  title: caseStudyTitle("Learvo"),
  description: learvoHero.subtitle,
  path: "/learvo",
  ogTitle: "Learvo: onboarding, navigation, and a landing page, designed and shipped",
  ogDescription:
    "Product designer (intern) at an ed-tech startup. I redesigned the first session, the nav, and the landing page, then shipped the code myself.",
});

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
      {/* The section list hugs the left edge, directly under the logo, and the content is centred
          in the space that is left, so a wide screen is used instead of a narrow column. */}
      <main className="flex w-full max-w-[100rem] flex-1 flex-col gap-12 px-6 sm:px-8 md:flex-row">
        <CaseStudyNav sections={sections} />

        <div className="mx-auto min-w-0 w-full max-w-5xl flex-1 [&>*]:max-w-none">
        {/* Hero */}
        <section id="overview" className="max-w-4xl pt-16 pb-8 sm:pt-24">
          <HoleLink direction="out"
            href="/"
            className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            ← Back to home
          </HoleLink>

          <h1 data-vt-target className="mt-8 font-display text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl">
            {learvoHero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-neutral-700">
            {learvoHero.subtitle}
          </p>

          {/* The picture comes first, so the page opens on the work. */}
          <div
            className="relative mt-10 mb-2 w-full overflow-hidden rounded-2xl bg-neutral-100"
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

          <CaseStudyTldr tldr={tldr} />

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-500">
            <span className="font-medium text-neutral-900">{learvoHero.gist.label}</span>{" "}
            {learvoHero.gist.text}
          </p>

          <p className="mt-8 text-sm text-neutral-400">
            {learvoHero.date} · <ReadingTime minutes={minutesToRead} />
          </p>

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
        </section>

        <div className="max-w-4xl">
          <CaseStudyHighlights
            heading={highlightsSection.heading}
            outcomes={highlightsSection.outcomes}
            stats={highlightsSection.stats}
            callout={highlightsSection.callout}
          />
        </div>

        {/* Testimonial — renders only once a real quote is filled in */}
        {showTestimonial && (
          <section id="testimonial" className="max-w-4xl py-16">
            <Testimonial testimonial={testimonial} />
          </section>
        )}

        <CaseStudyMilestones
          heading={timelineSection.heading}
          items={timelineSection.items}
          intro="6 milestones, Oct 2025 to Sep 2026."
        />

        <CaseStudyRoleImpact heading={roleAndImpact.heading} columns={roleAndImpact.columns} />

        {/* What I Shipped */}
        <section id="what-i-shipped" className="max-w-4xl py-16">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {featuresSection.heading}
          </h2>

          <div className="mt-12 space-y-24">
            {(featuresSection.categories as FeatureCategory[])
              .filter((cat) => !cat.isHidden)
              .map((cat, index) => {
                const showBigImage = !cat.video && !cat.slides;
                return (
              <div
                key={cat.slug}
                id={cat.slug}
                className="scroll-mt-28 border-t border-black/[0.06] pt-16 first:border-t-0 first:pt-0"
              >
                <p className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                  <span aria-hidden className="size-1.5 rounded-full bg-accent-deep" />
                  Shipped {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-4 text-2xl font-semibold text-neutral-900 sm:text-3xl">
                  {cat.title}
                </h3>

                {/* The problem and the call sit side by side, so each feature opens with its
                    reason and its decision in one glance. */}
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <p className="text-base leading-relaxed text-neutral-700">
                    <span className="block text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                      Problem
                    </span>
                    <span className="mt-3 block">{cat.problem}</span>
                  </p>

                  <div className="rounded-2xl border border-black/[0.06] bg-neutral-900 p-6">
                    <h4 className="text-xs font-semibold tracking-widest text-white/50 uppercase">
                      The Call
                    </h4>
                    <p className="mt-3 text-base leading-relaxed text-white/90">{cat.decision}</p>
                  </div>
                </div>

                <ul className="mt-8 space-y-3">
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
                    <DemoVideo
                      src={cat.video.src}
                      alt={cat.imageAlt}
                      fallbackSrc={cat.isPlaceholder ? undefined : cat.image}
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                ) : showBigImage ? (
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
                ) : null}

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

                {cat.beforeAfter && hasBeforeAfter(cat) && (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {([
                      ["Before", cat.beforeAfter.before],
                      ["After", cat.beforeAfter.after],
                    ] as const).map(([label, img]) => (
                      <figure key={label}>
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/[0.06] bg-neutral-50">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-contain"
                            sizes="(min-width: 640px) 45vw, 100vw"
                          />
                        </div>
                        <figcaption className="mt-2 text-sm leading-relaxed text-neutral-500">
                          <span className="font-semibold text-neutral-900">{label}</span>
                          {filled(img.caption) && `: ${img.caption}`}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}

                <p className="mt-10 max-w-2xl border-l-2 border-accent-deep pl-5 font-display text-lg leading-snug text-neutral-900 sm:text-xl">
                  <span className="mb-2 block font-sans text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                    Impact
                  </span>
                  {cat.impact}
                  {filled(cat.impactMetric) && ` ${cat.impactMetric}`}
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
                );
              })}
          </div>
        </section>

        {/* Brand Identity */}
        <section id="brand-identity" className="max-w-4xl py-16">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
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
                  <h3 className="mt-4 font-display text-lg font-semibold text-neutral-900">
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

        {/* What I Learned from Users — renders only once real research is filled in */}
        {showUserResearch && (
          <section id="user-research" className="max-w-4xl py-16">
            <h2 className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
              {userResearch.heading}
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-700">
              <span className="font-semibold text-neutral-900">Method: </span>
              {userResearch.method}
            </p>

            <ul className="mt-6 space-y-3">
              {researchFindings.map((finding, i) => (
                <li key={i} className="flex max-w-2xl gap-3 text-base leading-relaxed text-neutral-700">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-neutral-300" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-2xl rounded-2xl border border-black/[0.06] bg-neutral-50 p-5 text-base leading-relaxed text-neutral-700">
              <span className="font-semibold text-neutral-900">What I changed: </span>
              {userResearch.changes}
            </p>
          </section>
        )}

        {/* What I'd Do Next */}
        <section id="next-steps" className="max-w-4xl py-16">
          <h2 className="font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
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
