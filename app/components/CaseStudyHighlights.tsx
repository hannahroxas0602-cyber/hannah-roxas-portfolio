import Image from "next/image";

type Mockup = {
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  tabTitle: string;
  url: string;
};

type Stat = {
  value: string;
  label: string;
};

export default function CaseStudyHighlights({
  heading,
  mockup,
  outcomes,
  stats,
  callout,
}: {
  heading: string;
  mockup: Mockup;
  outcomes: string[];
  stats: Stat[];
  callout: string;
}) {
  return (
    <section id="highlights" className="mx-auto max-w-4xl px-6 py-24 sm:px-10 sm:py-32">
      <h2 className="font-[family-name:var(--font-manrope)] text-3xl font-semibold text-neutral-900 sm:text-4xl">
        {heading}
      </h2>

      <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-500">{callout}</p>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-5">
        {/* Browser-chrome mockup card */}
        <div className="overflow-hidden rounded-3xl bg-neutral-50 sm:col-span-3">
          <div className="flex items-center gap-3 px-5 pt-5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-3 py-1 text-xs text-neutral-400">
              <span className="truncate">{mockup.url}</span>
            </div>
          </div>
          <div className="relative aspect-[586/354] w-full">
            <Image
              src={mockup.image}
              alt={mockup.imageAlt}
              fill
              className="object-contain p-6"
              sizes="(min-width: 640px) 45vw, 100vw"
            />
          </div>
        </div>

        {/* Outcome cards */}
        <div className="flex flex-col gap-3 sm:col-span-2">
          {outcomes.map((outcome, i) => (
            <div key={i} className="flex-1 py-2 text-sm leading-relaxed text-neutral-600">
              <p className="mb-1.5 text-xs font-medium tracking-wide text-neutral-400 uppercase">
                Outcome
              </p>
              {outcome}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-wrap gap-x-16 gap-y-8 sm:mt-20">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-[family-name:var(--font-manrope)] text-5xl font-semibold text-neutral-900">
              {stat.value}
            </p>
            <p className="mt-2 max-w-[10rem] text-sm leading-snug text-neutral-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
