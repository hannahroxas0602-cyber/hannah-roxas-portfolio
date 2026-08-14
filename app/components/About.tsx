import { aboutIntro, experience } from "@/app/about/data";

export default function About() {
  return (
    <section id="about1" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16 sm:px-10 sm:py-24">
      <p className="text-lg text-neutral-500">
        <span className="mr-1 font-[family-name:var(--font-mono)] text-sm tracking-wide">
          {aboutIntro.eyebrow}
        </span>
        <span className="text-black">{aboutIntro.title}</span>
      </p>

      <div className="relative mt-14 ml-3 sm:ml-6">
        <div className="absolute top-2 bottom-2 left-0 w-px bg-black/[0.1]" />

        {experience.map((entry) => (
          <div key={entry.slug} className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
            <span className="absolute top-1.5 left-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-black bg-[var(--background)]" />

            <p className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-neutral-400 uppercase">
              {entry.dates}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-manrope)] text-2xl text-black sm:text-3xl">
              {entry.role}
            </h2>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-neutral-500">
              {entry.context}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
