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
    <section id="highlights" className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
      <h2 className="font-[family-name:var(--font-manrope)] text-3xl font-semibold text-neutral-900 italic">
        {heading}
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-5">
        {/* Browser-chrome mockup card */}
        <div className="overflow-hidden rounded-2xl bg-neutral-100 sm:col-span-3">
          <div className="flex items-center gap-3 border-b border-black/[0.06] bg-neutral-50 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-white px-3 py-1 text-xs text-neutral-500">
              <span className="truncate">{mockup.url}</span>
            </div>
          </div>
          <div className="relative aspect-[586/354] w-full bg-white">
            <Image
              src={mockup.image}
              alt={mockup.imageAlt}
              fill
              className="object-contain p-4"
              sizes="(min-width: 640px) 45vw, 100vw"
            />
          </div>
        </div>

        {/* Outcome cards */}
        <div className="flex flex-col gap-4 sm:col-span-2">
          {outcomes.map((outcome, i) => (
            <div
              key={i}
              className="flex-1 rounded-2xl bg-neutral-50 p-5 text-sm leading-relaxed text-neutral-700"
            >
              <p className="mb-1.5 text-xs font-medium tracking-wide text-neutral-400 uppercase">
                Outcome
              </p>
              {outcome}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-5">
        <div className="flex items-center rounded-2xl bg-neutral-900 px-6 py-5 text-base font-medium text-white sm:col-span-3">
          {callout}
        </div>
        <div className="flex gap-8 rounded-2xl bg-neutral-50 px-6 py-5 sm:col-span-2">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-[family-name:var(--font-manrope)] text-3xl font-semibold text-neutral-900">
                {stat.value}
              </p>
              <p className="mt-1 text-xs leading-snug text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
