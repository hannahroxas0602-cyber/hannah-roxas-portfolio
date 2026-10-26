import type { ReactNode } from "react";

// The shared frame for a case study's overview sections (Highlights, Timeline,
// My Role & Impact): a small kicker chip, the heading, an optional intro line,
// then the content. Every case study uses it, so they all read the same.
export default function CaseStudySection({
  id,
  kicker,
  heading,
  intro,
  children,
}: {
  id: string;
  kicker: string;
  heading: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="max-w-4xl scroll-mt-28 py-16 sm:py-20">
      <p className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
        {kicker}
      </p>
      <h2 className="font-display mt-4 text-3xl font-semibold text-neutral-950 sm:text-4xl">
        {heading}
      </h2>
      {intro && <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-500">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  );
}

// The dark tile every section uses for its one big takeaway.
export const darkTile =
  "relative overflow-hidden rounded-3xl bg-neutral-950 text-white [background-image:radial-gradient(120%_90%_at_100%_0%,color-mix(in_oklab,var(--accent)_32%,transparent),transparent_60%)]";
// The light tile everything else sits in.
export const lightTile = "rounded-3xl border border-black/[0.06] bg-white";
